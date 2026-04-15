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
  | "aborted"
  | null;

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
  };
}

// --- CRUD operations -----------------------------------------------------

/** Create a new game. The creator always plays white in v1. Returns the new game ID. */
export async function createMultiplayerGame(
  creator: MultiplayerPlayer,
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
 */
export async function submitMove(
  game: MultiplayerGame,
  from: string,
  to: string,
  promotion: "q" | "r" | "b" | "n" = "q",
): Promise<void> {
  const applied = applyMoveToGame(game, from, to, promotion);
  await updateDoc(gameDocRef(game.id), {
    fen: applied.nextFen,
    moves: applied.nextMoves,
    turn: applied.nextTurn,
    status: applied.nextStatus,
    result: applied.nextResult,
    endReason: applied.nextEndReason,
    updatedAt: serverTimestamp(),
    // A move always cancels any pending draw offer
    drawOfferedBy: null,
  });
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
