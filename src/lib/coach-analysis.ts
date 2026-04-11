/**
 * Level-aware coaching analysis for Coach Mode.
 * At low difficulties, focuses on fundamentals (hanging pieces, missed captures,
 * castling, development) instead of abstract centipawn-based classifications.
 * Returns specific, actionable feedback with board highlights.
 */

import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import { type MoveClass, classifyMove } from "./classify-moves";
import type { Difficulty } from "@/hooks/useTrainerGame";
import type { CSSProperties } from "react";

// --- Types ---

export type CoachIssueKind =
  | "hanging-piece"
  | "missed-capture"
  | "castle-reminder"
  | "undeveloped-pieces"
  | "good-capture"
  | "good-development"
  | "good-castle";

export interface CoachIssue {
  kind: CoachIssueKind;
  severity: "critical" | "warning" | "info" | "praise";
  message: string;
  highlightSquares: string[];
  highlightColor: string;
}

export interface CoachAnalysisResult {
  issues: CoachIssue[];
  primaryIssue: CoachIssue | null;
  adjustedClassification: MoveClass;
  coachFeedback: string | null;
  coachHighlights: Record<string, CSSProperties>;
}

// --- Constants ---

const PIECE_NAMES: Record<PieceSymbol, string> = {
  p: "pawn",
  n: "knight",
  b: "bishop",
  r: "rook",
  q: "queen",
  k: "king",
};

const PIECE_VALUES: Record<PieceSymbol, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0,
};

const HIGHLIGHT_DANGER = "rgba(239, 68, 68, 0.5)";   // red — hanging piece
const HIGHLIGHT_MISSED = "rgba(34, 197, 94, 0.45)";  // green — missed capture
const HIGHLIGHT_INFO = "rgba(96, 165, 250, 0.35)";   // blue — development

/** Which difficulties get fundamental coaching */
const FUNDAMENTAL_LEVELS = new Set<Difficulty>(["newborn", "puppy", "beginner", "casual"]);

/** Starting squares for minor pieces */
const WHITE_MINORS: Square[] = ["b1", "c1", "f1", "g1"];
const BLACK_MINORS: Square[] = ["b8", "c8", "f8", "g8"];

const ALL_SQUARES: Square[] = [];
for (const file of "abcdefgh") {
  for (const rank of "12345678") {
    ALL_SQUARES.push(`${file}${rank}` as Square);
  }
}

// --- Lenient classification thresholds for low levels ---

function classifyLenient(cpLoss: number, difficulty: Difficulty): MoveClass {
  if (difficulty === "newborn") {
    if (cpLoss <= 0) return "best";
    if (cpLoss <= 20) return "excellent";
    if (cpLoss <= 50) return "good";
    if (cpLoss <= 100) return "inaccuracy";
    if (cpLoss <= 200) return "mistake";
    return "blunder";
  }
  if (difficulty === "puppy") {
    if (cpLoss <= 0) return "best";
    if (cpLoss <= 15) return "excellent";
    if (cpLoss <= 40) return "good";
    if (cpLoss <= 75) return "inaccuracy";
    if (cpLoss <= 150) return "mistake";
    return "blunder";
  }
  if (difficulty === "beginner") {
    if (cpLoss <= 0) return "best";
    if (cpLoss <= 12) return "excellent";
    if (cpLoss <= 30) return "good";
    if (cpLoss <= 60) return "inaccuracy";
    if (cpLoss <= 120) return "mistake";
    return "blunder";
  }
  // casual and above: standard thresholds
  return classifyMove(cpLoss);
}

// --- Detectors ---

function oppositeColor(c: Color): Color {
  return c === "w" ? "b" : "w";
}

/** Find player pieces that are attacked but not defended */
function findHangingPieces(chess: Chess, playerColor: Color): CoachIssue | null {
  const opp = oppositeColor(playerColor);
  let worstSquare: string | null = null;
  let worstValue = 0;
  let worstName = "";

  for (const sq of ALL_SQUARES) {
    const piece = chess.get(sq);
    if (!piece || piece.color !== playerColor || piece.type === "k") continue;

    const attacked = chess.isAttacked(sq, opp);
    if (!attacked) continue;

    // Check if defended
    const defended = chess.isAttacked(sq, playerColor);
    if (!defended && PIECE_VALUES[piece.type] > worstValue) {
      worstValue = PIECE_VALUES[piece.type];
      worstSquare = sq;
      worstName = PIECE_NAMES[piece.type];
    }
  }

  if (worstSquare && worstValue >= 3) {
    return {
      kind: "hanging-piece",
      severity: "critical",
      message: `Your ${worstName} on ${worstSquare} is hanging! They can take it for free!`,
      highlightSquares: [worstSquare],
      highlightColor: HIGHLIGHT_DANGER,
    };
  }

  // Also flag hanging pawns if nothing bigger
  if (worstSquare && worstValue >= 1) {
    return {
      kind: "hanging-piece",
      severity: "warning",
      message: `Your ${worstName} on ${worstSquare} is undefended — watch out!`,
      highlightSquares: [worstSquare],
      highlightColor: HIGHLIGHT_DANGER,
    };
  }

  return null;
}

/** Find opponent pieces that were free to capture but the player didn't take them */
function findMissedCaptures(
  chessBefore: Chess,
  playerColor: Color,
  playerMoveTo: string
): CoachIssue | null {
  const opp = oppositeColor(playerColor);
  let bestSquare: string | null = null;
  let bestValue = 0;
  let bestName = "";

  for (const sq of ALL_SQUARES) {
    const piece = chessBefore.get(sq);
    if (!piece || piece.color !== opp || piece.type === "k") continue;

    // Is this piece attacked by the player?
    const attacked = chessBefore.isAttacked(sq, playerColor);
    if (!attacked) continue;

    // Is this piece defended by the opponent?
    const defended = chessBefore.isAttacked(sq, opp);
    if (!defended && PIECE_VALUES[piece.type] > bestValue) {
      bestValue = PIECE_VALUES[piece.type];
      bestSquare = sq;
      bestName = PIECE_NAMES[piece.type];
    }
  }

  // Only flag if the player didn't capture it (moved somewhere else)
  if (bestSquare && bestSquare !== playerMoveTo && bestValue >= 3) {
    return {
      kind: "missed-capture",
      severity: "warning",
      message: `Their ${bestName} on ${bestSquare} was free — you could've grabbed it!`,
      highlightSquares: [bestSquare],
      highlightColor: HIGHLIGHT_MISSED,
    };
  }

  return null;
}

/** Check if player should castle */
function checkCastling(chess: Chess, playerColor: Color, moveCount: number): CoachIssue | null {
  if (moveCount < 6) return null;

  const kingSquare = playerColor === "w" ? "e1" : "e8";
  const king = chess.get(kingSquare as Square);

  // King is still on starting square = hasn't castled
  if (!king || king.type !== "k" || king.color !== playerColor) return null;

  // Check if castling is still possible in the moves
  const moves = chess.moves();
  const canCastle = moves.some((m) => m === "O-O" || m === "O-O-O");

  if (!canCastle) return null;

  return {
    kind: "castle-reminder",
    severity: "info",
    message: "Don't forget to castle! Your king is safer behind the pawns.",
    highlightSquares: [],
    highlightColor: "",
  };
}

/** Check if too many pieces are undeveloped */
function checkDevelopment(chess: Chess, playerColor: Color, moveCount: number): CoachIssue | null {
  if (moveCount < 4) return null;

  const startingSquares = playerColor === "w" ? WHITE_MINORS : BLACK_MINORS;
  const undeveloped: string[] = [];

  for (const sq of startingSquares) {
    const piece = chess.get(sq);
    if (piece && piece.color === playerColor && (piece.type === "n" || piece.type === "b")) {
      undeveloped.push(sq);
    }
  }

  if (undeveloped.length >= 3) {
    return {
      kind: "undeveloped-pieces",
      severity: "info",
      message: "Your knights and bishops are still on the back rank — get them into the game!",
      highlightSquares: undeveloped,
      highlightColor: HIGHLIGHT_INFO,
    };
  }

  return null;
}

/** Positive reinforcement for good beginner moves */
function checkPositiveMove(
  chessBefore: Chess,
  chessAfter: Chess,
  playerColor: Color,
  moveSan: string,
  moveTo: string,
): CoachIssue | null {
  // Castled this move
  if (moveSan === "O-O" || moveSan === "O-O-O") {
    return {
      kind: "good-castle",
      severity: "praise",
      message: "Great castle! Your king is much safer now 🏰",
      highlightSquares: [],
      highlightColor: "",
    };
  }

  // Captured a hanging piece
  const opp = oppositeColor(playerColor);
  const capturedPiece = chessBefore.get(moveTo as Square);
  if (capturedPiece && capturedPiece.color === opp) {
    const wasDefended = chessBefore.isAttacked(moveTo as Square, opp);
    if (!wasDefended && PIECE_VALUES[capturedPiece.type] >= 3) {
      return {
        kind: "good-capture",
        severity: "praise",
        message: `Nice! You grabbed their free ${PIECE_NAMES[capturedPiece.type]}! 🦴`,
        highlightSquares: [],
        highlightColor: "",
      };
    }
  }

  // Developed a piece from back rank
  const startingSquares = playerColor === "w" ? WHITE_MINORS : BLACK_MINORS;
  if (startingSquares.includes(moveTo as Square) === false) {
    // Check if a minor piece left a starting square
    const movedPiece = chessAfter.get(moveTo as Square);
    if (movedPiece && (movedPiece.type === "n" || movedPiece.type === "b")) {
      // This could be development — but only flag if we haven't found issues
      return {
        kind: "good-development",
        severity: "praise",
        message: `Good development! Getting pieces into the game is key 💪`,
        highlightSquares: [],
        highlightColor: "",
      };
    }
  }

  return null;
}

// --- Main Analysis Function ---

export interface CoachMoveInput {
  from: string;
  to: string;
  san: string;
}

export function analyzeForCoaching(
  chessBefore: Chess,
  chessAfter: Chess,
  move: CoachMoveInput,
  playerColor: Color,
  moveCount: number,
  cpLoss: number,
  rawClassification: MoveClass,
  difficulty: Difficulty
): CoachAnalysisResult {
  // For high difficulties, return raw classification with no coaching overrides
  if (!FUNDAMENTAL_LEVELS.has(difficulty)) {
    return {
      issues: [],
      primaryIssue: null,
      adjustedClassification: rawClassification,
      coachFeedback: null,
      coachHighlights: {},
    };
  }

  const adjustedClassification = classifyLenient(cpLoss, difficulty);
  const issues: CoachIssue[] = [];

  // Run detectors in priority order
  const hanging = findHangingPieces(chessAfter, playerColor);
  if (hanging) issues.push(hanging);

  const missed = findMissedCaptures(chessBefore, playerColor, move.to);
  if (missed) issues.push(missed);

  // Castling check — use chessBefore since the player just moved
  // (if they could have castled but didn't)
  const castleCheck = checkCastling(chessBefore, playerColor, moveCount);
  if (castleCheck && move.san !== "O-O" && move.san !== "O-O-O") {
    issues.push(castleCheck);
  }

  const devCheck = checkDevelopment(chessAfter, playerColor, moveCount);
  if (devCheck) issues.push(devCheck);

  // Check for positive reinforcement (only if no warnings/critical issues)
  const criticalIssues = issues.filter((i) => i.severity === "critical" || i.severity === "warning");
  if (criticalIssues.length === 0) {
    const positive = checkPositiveMove(chessBefore, chessAfter, playerColor, move.san, move.to);
    if (positive) issues.push(positive);
  }

  // Pick the primary issue (first by priority, which is the order they're pushed)
  const primaryIssue = issues.length > 0 ? issues[0] : null;

  // Build highlights
  const coachHighlights: Record<string, CSSProperties> = {};
  if (primaryIssue) {
    for (const sq of primaryIssue.highlightSquares) {
      coachHighlights[sq] = { backgroundColor: primaryIssue.highlightColor };
    }
  }

  // For praise messages on good moves, override the classification mood
  // but keep it as a "good" or "best" classification
  let coachFeedback: string | null = null;
  if (primaryIssue) {
    if (primaryIssue.severity === "praise") {
      // Only show praise if the move was actually decent (not a blunder that happened to capture)
      if (adjustedClassification === "best" || adjustedClassification === "excellent" || adjustedClassification === "good") {
        coachFeedback = primaryIssue.message;
      }
    } else {
      // Always show warnings/critical feedback
      coachFeedback = primaryIssue.message;
    }
  }

  return {
    issues,
    primaryIssue,
    adjustedClassification,
    coachFeedback,
    coachHighlights,
  };
}
