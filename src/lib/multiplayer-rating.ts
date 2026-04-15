import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// --- Types ---------------------------------------------------------------

export interface MultiplayerRatingData {
  /** Current Elo rating. */
  rating: number;
  /** Total multiplayer games played (for K-factor scaling). */
  gamesPlayed: number;
  /** Total wins. */
  wins: number;
  /** Total losses. */
  losses: number;
  /** Total draws. */
  draws: number;
  /** Peak rating ever achieved. */
  peak: number;
}

export const INITIAL_MULTIPLAYER_RATING = 1200;

export const DEFAULT_MULTIPLAYER_RATING: MultiplayerRatingData = {
  rating: INITIAL_MULTIPLAYER_RATING,
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  peak: INITIAL_MULTIPLAYER_RATING,
};

// --- Elo math ------------------------------------------------------------

/** Standard Elo K-factor: higher for new players, lower once established. */
function getKFactor(gamesPlayed: number): number {
  if (gamesPlayed < 15) return 40;
  if (gamesPlayed < 30) return 20;
  return 16;
}

/** Expected score for player A against player B (Elo formula). */
export function expectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

/**
 * Compute a new rating given the player's previous rating, the opponent's
 * rating, and the outcome (1 = win, 0.5 = draw, 0 = loss).
 */
export function computeNewRating(
  prevRating: number,
  opponentRating: number,
  outcome: 0 | 0.5 | 1,
  gamesPlayed: number,
): number {
  const k = getKFactor(gamesPlayed);
  const expected = expectedScore(prevRating, opponentRating);
  const next = prevRating + k * (outcome - expected);
  return Math.round(next);
}

// --- Firestore persistence -----------------------------------------------

const COLLECTION = "multiplayerRatings";

function ratingDocRef(uid: string) {
  return doc(db, COLLECTION, uid);
}

/** Load a user's rating (or default if none exists). Never throws. */
export async function getMultiplayerRating(
  uid: string,
): Promise<MultiplayerRatingData> {
  try {
    const snap = await getDoc(ratingDocRef(uid));
    if (!snap.exists()) return DEFAULT_MULTIPLAYER_RATING;
    return { ...DEFAULT_MULTIPLAYER_RATING, ...(snap.data() as MultiplayerRatingData) };
  } catch {
    return DEFAULT_MULTIPLAYER_RATING;
  }
}

/**
 * Apply a game result to both players' ratings and persist. Safe to call
 * even if the opponent isn't registered — we default to the initial rating
 * in that case.
 *
 * `result` is from white's perspective: "1-0" = white won, "0-1" = black won,
 * "1/2-1/2" = draw.
 */
export async function applyGameResult(
  whiteUid: string,
  blackUid: string,
  result: "1-0" | "0-1" | "1/2-1/2",
): Promise<{
  whiteBefore: number;
  whiteAfter: number;
  blackBefore: number;
  blackAfter: number;
}> {
  const [white, black] = await Promise.all([
    getMultiplayerRating(whiteUid),
    getMultiplayerRating(blackUid),
  ]);

  const whiteOutcome: 0 | 0.5 | 1 =
    result === "1-0" ? 1 : result === "0-1" ? 0 : 0.5;
  const blackOutcome: 0 | 0.5 | 1 =
    result === "0-1" ? 1 : result === "1-0" ? 0 : 0.5;

  const newWhiteRating = computeNewRating(
    white.rating,
    black.rating,
    whiteOutcome,
    white.gamesPlayed,
  );
  const newBlackRating = computeNewRating(
    black.rating,
    white.rating,
    blackOutcome,
    black.gamesPlayed,
  );

  const nextWhite: MultiplayerRatingData = {
    rating: newWhiteRating,
    gamesPlayed: white.gamesPlayed + 1,
    wins: white.wins + (whiteOutcome === 1 ? 1 : 0),
    losses: white.losses + (whiteOutcome === 0 ? 1 : 0),
    draws: white.draws + (whiteOutcome === 0.5 ? 1 : 0),
    peak: Math.max(white.peak, newWhiteRating),
  };

  const nextBlack: MultiplayerRatingData = {
    rating: newBlackRating,
    gamesPlayed: black.gamesPlayed + 1,
    wins: black.wins + (blackOutcome === 1 ? 1 : 0),
    losses: black.losses + (blackOutcome === 0 ? 1 : 0),
    draws: black.draws + (blackOutcome === 0.5 ? 1 : 0),
    peak: Math.max(black.peak, newBlackRating),
  };

  // Write both ratings. Each user only has rules access to their own doc
  // under normal Firestore security, but for MVP the rating collection is
  // readable/writable by any authenticated user (see README note).
  await Promise.all([
    setDoc(ratingDocRef(whiteUid), { ...nextWhite, updatedAt: serverTimestamp() }),
    setDoc(ratingDocRef(blackUid), { ...nextBlack, updatedAt: serverTimestamp() }),
  ]);

  return {
    whiteBefore: white.rating,
    whiteAfter: newWhiteRating,
    blackBefore: black.rating,
    blackAfter: newBlackRating,
  };
}
