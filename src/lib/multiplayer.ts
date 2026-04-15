"use client";

import {
  doc,
  addDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  collection,
  serverTimestamp,
  Timestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { Chess } from "chess.js";
import { db } from "./firebase";

// --- Types ---------------------------------------------------------------

export type MultiplayerStatus =
  | "waiting"
  | "active"
  | "completed"
  | "aborted";

export type MultiplayerResult = "1-0" | "0-1" | "1/2-1/2" | null;

export type MultiplayerEndReason =
  | "checkmate"
  | "stalemate"
  | "resignation"
  | "draw-agreed"
  | "threefold"
  | "insufficient"
  | "fifty-move"
  | "timeout"
  | "aborted"
  | null;

/** Time control format. A value of null means untimed. */
export interface TimeControl {
  /** Starting time per side in milliseconds. */
  initialMs: number;
  /** Fischer increment added after each move, in milliseconds. */
  incrementMs: number;
}

export const TIME_CONTROLS: Array<{
  id: string;
  label: string;
  category: "bullet" | "blitz" | "rapid" | "classical" | "unlimited";
  tc: TimeControl | null;
}> = [
  { id: "1+0", label: "1 min", category: "bullet", tc: { initialMs: 60_000, incrementMs: 0 } },
  { id: "2+1", label: "2 | 1", category: "bullet", tc: { initialMs: 120_000, incrementMs: 1_000 } },
  { id: "3+0", label: "3 min", category: "blitz", tc: { initialMs: 180_000, incrementMs: 0 } },
  { id: "3+2", label: "3 | 2", category: "blitz", tc: { initialMs: 180_000, incrementMs: 2_000 } },
  { id: "5+0", label: "5 min", category: "blitz", tc: { initialMs: 300_000, incrementMs: 0 } },
  { id: "5+3", label: "5 | 3", category: "blitz", tc: { initialMs: 300_000, incrementMs: 3_000 } },
  { id: "10+0", label: "10 min", category: "rapid", tc: { initialMs: 600_000, incrementMs: 0 } },
  { id: "15+10", label: "15 | 10", category: "rapid", tc: { initialMs: 900_000, incrementMs: 10_000 } },
  { id: "30+0", label: "30 min", category: "classical", tc: { initialMs: 1_800_000, incrementMs: 0 } },
  { id: "unlimited", label: "Unlimited", category: "unlimited", tc: null },
];

export interface MultiplayerPlayer {
  uid: string;
  name: string;
  photoURL: string | null;
}

export interface RatingDelta {
  /** White's rating before this game. */
  whiteBefore: number;
  /** White's rating after this game. */
  whiteAfter: number;
  /** Black's rating before this game. */
  blackBefore: number;
  /** Black's rating after this game. */
  blackAfter: number;
}

export interface MultiplayerGame {
  id: string;
  /** White player — creator of the game */
  white: MultiplayerPlayer | null;
  /** Black player — joiner */
  black: MultiplayerPlayer | null;
  /** Current FEN string */
  fen: string;
  /** Move history in SAN */
  moves: string[];
  /** Current game status */
  status: MultiplayerStatus;
  /** Final result if completed */
  result: MultiplayerResult;
  /** Why the game ended */
  endReason: MultiplayerEndReason;
  /** Whose turn it is */
  turn: "white" | "black";
  /** Server timestamps */
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  /** Draw offer state — who offered, if any */
  drawOfferedBy: "white" | "black" | null;
  /** Rematch offer — who offered, if any */
  rematchOfferedBy: "white" | "black" | null;
  /** Game ID of the rematch, if created */
  rematchGameId: string | null;
  /** Rating deltas — written once when the game completes, then read by both clients. */
  ratingDelta: RatingDelta | null;
  /** Time control, or null for untimed games */
  timeControl: TimeControl | null;
  /** Remaining time for white in ms (null = untimed) */
  whiteTimeMs: number | null;
  /** Remaining time for black in ms (null = untimed) */
  blackTimeMs: number | null;
  /** Wall-clock millis when the current side started thinking. Null for untimed / pre-start. */
  turnStartedAt: number | null;
}

// --- Collection helpers --------------------------------------------------

const GAMES_COLLECTION = "multiplayerGames";

function gameDocRef(gameId: string) {
  return doc(db, GAMES_COLLECTION, gameId);
}

function gamesCollectionRef() {
  return collection(db, GAMES_COLLECTION);
}

// --- Serialization -------------------------------------------------------

interface FirestoreGameDoc {
  white: MultiplayerPlayer | null;
  black: MultiplayerPlayer | null;
  fen: string;
  moves: string[];
  status: MultiplayerStatus;
  result: MultiplayerResult;
  endReason: MultiplayerEndReason;
  turn: "white" | "black";
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  drawOfferedBy: "white" | "black" | null;
  rematchOfferedBy: "white" | "black" | null;
  rematchGameId: string | null;
  ratingDelta: RatingDelta | null;
  timeControl: TimeControl | null;
  whiteTimeMs: number | null;
  blackTimeMs: number | null;
  turnStartedAt: number | null;
}

function docToGame(id: string, data: FirestoreGameDoc): MultiplayerGame {
  return {
    id,
    white: data.white ?? null,
    black: data.black ?? null,
    fen: data.fen,
    moves: data.moves ?? [],
    status: data.status,
    result: data.result ?? null,
    endReason: data.endReason ?? null,
    turn: data.turn,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
    drawOfferedBy: data.drawOfferedBy ?? null,
    rematchOfferedBy: data.rematchOfferedBy ?? null,
    rematchGameId: data.rematchGameId ?? null,
    ratingDelta: data.ratingDelta ?? null,
    timeControl: data.timeControl ?? null,
    whiteTimeMs: data.whiteTimeMs ?? null,
    blackTimeMs: data.blackTimeMs ?? null,
    turnStartedAt: data.turnStartedAt ?? null,
  };
}

// --- CRUD operations -----------------------------------------------------

/** Create a new game. The creator always plays white in v1. Returns the new game ID. */
export async function createMultiplayerGame(
  creator: MultiplayerPlayer,
  timeControl: TimeControl | null = null,
): Promise<string> {
  const chess = new Chess();
  const payload: Omit<FirestoreGameDoc, "createdAt" | "updatedAt"> & {
    createdAt: ReturnType<typeof serverTimestamp>;
    updatedAt: ReturnType<typeof serverTimestamp>;
  } = {
    white: creator,
    black: null,
    fen: chess.fen(),
    moves: [],
    status: "waiting",
    result: null,
    endReason: null,
    turn: "white",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    drawOfferedBy: null,
    rematchOfferedBy: null,
    rematchGameId: null,
    ratingDelta: null,
    timeControl,
    whiteTimeMs: timeControl ? timeControl.initialMs : null,
    blackTimeMs: timeControl ? timeControl.initialMs : null,
    turnStartedAt: null, // populated when black joins
  };
  const ref = await addDoc(gamesCollectionRef(), payload);
  return ref.id;
}

/** Write the rating delta to the game doc. Called once after a completed game. */
export async function setGameRatingDelta(
  gameId: string,
  delta: RatingDelta,
): Promise<void> {
  await updateDoc(gameDocRef(gameId), {
    ratingDelta: delta,
    updatedAt: serverTimestamp(),
  });
}

/** Fetch a game once (not realtime). */
export async function getMultiplayerGame(
  gameId: string,
): Promise<MultiplayerGame | null> {
  const snap = await getDoc(gameDocRef(gameId));
  if (!snap.exists()) return null;
  return docToGame(snap.id, snap.data() as FirestoreGameDoc);
}

/** Join an existing waiting game as the black player. Errors if already full or not waiting. */
export async function joinMultiplayerGame(
  gameId: string,
  joiner: MultiplayerPlayer,
): Promise<void> {
  const ref = gameDocRef(gameId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    throw new Error("Game not found");
  }
  const data = snap.data() as FirestoreGameDoc;

  // If joiner is already a participant, that's fine — they're just rejoining
  if (data.white?.uid === joiner.uid || data.black?.uid === joiner.uid) {
    return;
  }

  if (data.status !== "waiting" || data.black) {
    throw new Error("Game is not available to join");
  }

  await updateDoc(ref, {
    black: joiner,
    status: "active",
    // Start white's clock the moment the second player joins
    turnStartedAt: Date.now(),
    updatedAt: serverTimestamp(),
  });
}

/** Result of a validated move ready to be written to Firestore. */
interface MoveApplicationResult {
  nextFen: string;
  nextMoves: string[];
  nextTurn: "white" | "black";
  nextStatus: MultiplayerStatus;
  nextResult: MultiplayerResult;
  nextEndReason: MultiplayerEndReason;
}

/**
 * Apply a move to a local Chess instance derived from the game's FEN and
 * return what Firestore should be updated with. Throws on illegal moves.
 */
export function applyMoveToGame(
  game: MultiplayerGame,
  from: string,
  to: string,
  promotion: "q" | "r" | "b" | "n" = "q",
): MoveApplicationResult {
  const chess = new Chess(game.fen);
  const result = chess.move({ from, to, promotion });
  if (!result) {
    throw new Error("Illegal move");
  }

  const nextMoves = [...game.moves, result.san];
  const nextFen = chess.fen();
  const nextTurn = chess.turn() === "w" ? "white" : "black";

  let nextStatus: MultiplayerStatus = "active";
  let nextResult: MultiplayerResult = null;
  let nextEndReason: MultiplayerEndReason = null;

  if (chess.isCheckmate()) {
    nextStatus = "completed";
    // The player who just moved wins — that's the opposite of current turn
    nextResult = chess.turn() === "b" ? "1-0" : "0-1";
    nextEndReason = "checkmate";
  } else if (chess.isStalemate()) {
    nextStatus = "completed";
    nextResult = "1/2-1/2";
    nextEndReason = "stalemate";
  } else if (chess.isThreefoldRepetition()) {
    nextStatus = "completed";
    nextResult = "1/2-1/2";
    nextEndReason = "threefold";
  } else if (chess.isInsufficientMaterial()) {
    nextStatus = "completed";
    nextResult = "1/2-1/2";
    nextEndReason = "insufficient";
  } else if (chess.isDraw()) {
    // Catches 50-move rule and other draw conditions
    nextStatus = "completed";
    nextResult = "1/2-1/2";
    nextEndReason = "fifty-move";
  }

  return {
    nextFen,
    nextMoves,
    nextTurn,
    nextStatus,
    nextResult,
    nextEndReason,
  };
}

/**
 * Submit a move to Firestore. Validates locally first. Callers should only
 * call this when it's their turn.
 *
 * For timed games:
 *  - The moving player's elapsed time (now - turnStartedAt) is subtracted
 *    from their clock, plus the Fischer increment added back.
 *  - If their clock is zero or negative, the move is rejected as a timeout.
 *  - The new turnStartedAt is set to the current wall clock.
 */
export async function submitMove(
  game: MultiplayerGame,
  from: string,
  to: string,
  promotion: "q" | "r" | "b" | "n" = "q",
): Promise<void> {
  const applied = applyMoveToGame(game, from, to, promotion);

  const movingColor = game.turn;
  const now = Date.now();

  // Default update payload — no clock changes
  const update: Record<string, unknown> = {
    fen: applied.nextFen,
    moves: applied.nextMoves,
    turn: applied.nextTurn,
    status: applied.nextStatus,
    result: applied.nextResult,
    endReason: applied.nextEndReason,
    updatedAt: serverTimestamp(),
    drawOfferedBy: null,
  };

  if (game.timeControl) {
    const elapsed = game.turnStartedAt ? now - game.turnStartedAt : 0;
    const currentClock =
      movingColor === "white" ? game.whiteTimeMs ?? 0 : game.blackTimeMs ?? 0;
    const remaining = currentClock - elapsed;

    if (remaining <= 0) {
      // Flag fall — mover loses
      update.status = "completed";
      update.result = movingColor === "white" ? "0-1" : "1-0";
      update.endReason = "timeout";
      if (movingColor === "white") {
        update.whiteTimeMs = 0;
      } else {
        update.blackTimeMs = 0;
      }
    } else {
      // Apply the move and add the increment
      const withIncrement = remaining + game.timeControl.incrementMs;
      if (movingColor === "white") {
        update.whiteTimeMs = withIncrement;
      } else {
        update.blackTimeMs = withIncrement;
      }
      // Start the next player's clock (if the game didn't just end)
      update.turnStartedAt =
        applied.nextStatus === "active" ? now : null;
    }
  }

  await updateDoc(gameDocRef(game.id), update);
}

/** Claim victory on time when the opponent's clock has flagged. */
export async function claimTimeout(game: MultiplayerGame): Promise<void> {
  if (!game.timeControl || game.status !== "active") return;
  if (!game.turnStartedAt) return;
  const now = Date.now();
  const elapsed = now - game.turnStartedAt;
  const runningClock =
    game.turn === "white" ? game.whiteTimeMs ?? 0 : game.blackTimeMs ?? 0;
  if (runningClock - elapsed > 0) return; // not flagged yet

  const update: Record<string, unknown> = {
    status: "completed",
    result: game.turn === "white" ? "0-1" : "1-0",
    endReason: "timeout",
    updatedAt: serverTimestamp(),
  };
  if (game.turn === "white") {
    update.whiteTimeMs = 0;
  } else {
    update.blackTimeMs = 0;
  }
  await updateDoc(gameDocRef(game.id), update);
}

/**
 * Compute the effective remaining clocks as the client should display them.
 * The "running" side's clock decreases in real time since turnStartedAt.
 */
export function getEffectiveClocks(game: MultiplayerGame): {
  whiteMs: number | null;
  blackMs: number | null;
} {
  if (!game.timeControl) {
    return { whiteMs: null, blackMs: null };
  }
  const whiteStored = game.whiteTimeMs ?? game.timeControl.initialMs;
  const blackStored = game.blackTimeMs ?? game.timeControl.initialMs;

  // Only tick the clock if the game is actively running with a start timestamp
  if (game.status !== "active" || !game.turnStartedAt) {
    return { whiteMs: whiteStored, blackMs: blackStored };
  }
  const elapsed = Date.now() - game.turnStartedAt;
  if (game.turn === "white") {
    return {
      whiteMs: Math.max(0, whiteStored - elapsed),
      blackMs: blackStored,
    };
  } else {
    return {
      whiteMs: whiteStored,
      blackMs: Math.max(0, blackStored - elapsed),
    };
  }
}

/** Resign the game for the given color. */
export async function resignGame(
  gameId: string,
  resigningColor: "white" | "black",
): Promise<void> {
  await updateDoc(gameDocRef(gameId), {
    status: "completed",
    result: resigningColor === "white" ? "0-1" : "1-0",
    endReason: "resignation",
    updatedAt: serverTimestamp(),
  });
}

/** Offer a draw. The opponent can accept or decline on their next move. */
export async function offerDraw(
  gameId: string,
  offeringColor: "white" | "black",
): Promise<void> {
  await updateDoc(gameDocRef(gameId), {
    drawOfferedBy: offeringColor,
    updatedAt: serverTimestamp(),
  });
}

/** Decline a pending draw offer. */
export async function declineDraw(gameId: string): Promise<void> {
  await updateDoc(gameDocRef(gameId), {
    drawOfferedBy: null,
    updatedAt: serverTimestamp(),
  });
}

/** Accept a pending draw offer, ending the game in a draw. */
export async function acceptDraw(gameId: string): Promise<void> {
  await updateDoc(gameDocRef(gameId), {
    status: "completed",
    result: "1/2-1/2",
    endReason: "draw-agreed",
    drawOfferedBy: null,
    updatedAt: serverTimestamp(),
  });
}

/** Abort a waiting game (no opponent ever joined). */
export async function abortGame(gameId: string): Promise<void> {
  await updateDoc(gameDocRef(gameId), {
    status: "aborted",
    endReason: "aborted",
    updatedAt: serverTimestamp(),
  });
}

/** Subscribe to realtime updates for a game document. Returns an unsubscribe fn. */
export function subscribeToGame(
  gameId: string,
  onUpdate: (game: MultiplayerGame | null) => void,
  onError?: (err: Error) => void,
): () => void {
  return onSnapshot(
    gameDocRef(gameId),
    (snap) => {
      if (!snap.exists()) {
        onUpdate(null);
        return;
      }
      onUpdate(docToGame(snap.id, snap.data() as FirestoreGameDoc));
    },
    (err) => {
      if (onError) onError(err);
    },
  );
}

/** List the user's recent multiplayer games (participating as white or black). */
export async function listUserGames(
  uid: string,
  max = 10,
): Promise<MultiplayerGame[]> {
  const coll = gamesCollectionRef();
  // We need to query for games where either white.uid or black.uid equals uid.
  // Firestore can't OR two fields directly, so run two queries and merge.
  const whiteQ = query(
    coll,
    where("white.uid", "==", uid),
    orderBy("updatedAt", "desc"),
    limit(max),
  );
  const blackQ = query(
    coll,
    where("black.uid", "==", uid),
    orderBy("updatedAt", "desc"),
    limit(max),
  );
  const [whiteSnap, blackSnap] = await Promise.all([
    getDocs(whiteQ),
    getDocs(blackQ),
  ]);
  const games = new Map<string, MultiplayerGame>();
  whiteSnap.forEach((d) =>
    games.set(d.id, docToGame(d.id, d.data() as FirestoreGameDoc)),
  );
  blackSnap.forEach((d) =>
    games.set(d.id, docToGame(d.id, d.data() as FirestoreGameDoc)),
  );
  return Array.from(games.values())
    .sort((a, b) => {
      const ta = a.updatedAt?.toMillis() ?? 0;
      const tb = b.updatedAt?.toMillis() ?? 0;
      return tb - ta;
    })
    .slice(0, max);
}

// --- Helpers for the UI --------------------------------------------------

export function getPlayerColor(
  game: MultiplayerGame,
  uid: string | undefined,
): "white" | "black" | "spectator" {
  if (!uid) return "spectator";
  if (game.white?.uid === uid) return "white";
  if (game.black?.uid === uid) return "black";
  return "spectator";
}

export function isPlayersTurn(
  game: MultiplayerGame,
  uid: string | undefined,
): boolean {
  if (!uid) return false;
  if (game.status !== "active") return false;
  const color = getPlayerColor(game, uid);
  if (color === "spectator") return false;
  return game.turn === color;
}

/** Generate a shareable URL for a game. */
export function getGameShareUrl(gameId: string): string {
  if (typeof window === "undefined") return `/play/${gameId}`;
  return `${window.location.origin}/play/${gameId}`;
}
