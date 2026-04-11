/**
 * Level-aware coaching analysis for Coach Mode.
 *
 * Based on chess pedagogy (Silman's "Reassess Your Chess", Dvoretsky,
 * Seirawan's "Winning Chess" series), each rating range has specific
 * skills to focus on:
 *
 * ~400 (Newborn): Pure material awareness — don't blunder pieces away,
 *   capture undefended pieces. Nothing else matters yet.
 *
 * ~800 (Puppy): Material + fundamentals — castle your king, develop
 *   all pieces before attacking, control the center, don't move the
 *   same piece twice in the opening.
 *
 * ~1300 (Beginner): Fundamentals + basic tactics — recognize when
 *   you've walked into a fork/pin, notice simple combinations.
 *   Start caring about piece activity.
 *
 * ~1600 (Casual): Tactics + positional basics — pawn structure
 *   awareness, don't trade active pieces for passive ones, think
 *   about piece coordination.
 *
 * ~1900+ (Intermediate through Expert): Full centipawn analysis —
 *   these players understand the basics. Just show the eval.
 */

import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import { type MoveClass, classifyMove } from "./classify-moves";
import type { Difficulty } from "@/hooks/useTrainerGame";
import type { CSSProperties } from "react";

// --- Types ---

export interface CoachIssue {
  kind: string;
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
  p: "pawn", n: "knight", b: "bishop", r: "rook", q: "queen", k: "king",
};

const PIECE_VALUES: Record<PieceSymbol, number> = {
  p: 1, n: 3, b: 3, r: 5, q: 9, k: 0,
};

const HIGHLIGHT_DANGER = "rgba(239, 68, 68, 0.5)";
const HIGHLIGHT_MISSED = "rgba(34, 197, 94, 0.45)";
const HIGHLIGHT_INFO = "rgba(96, 165, 250, 0.35)";

const WHITE_HOME: Square[] = ["b1", "c1", "f1", "g1"];
const BLACK_HOME: Square[] = ["b8", "c8", "f8", "g8"];

const ALL_SQUARES: Square[] = [];
for (const file of "abcdefgh") {
  for (const rank of "12345678") {
    ALL_SQUARES.push(`${file}${rank}` as Square);
  }
}

function opp(c: Color): Color { return c === "w" ? "b" : "w"; }

// --- Lenient thresholds per difficulty ---

function classifyLenient(cpLoss: number, difficulty: Difficulty): MoveClass {
  // At low levels, small inaccuracies don't matter — only big blunders do
  if (difficulty === "newborn") {
    if (cpLoss <= 50) return "good";     // anything under half a pawn is fine
    if (cpLoss <= 150) return "inaccuracy";
    if (cpLoss <= 300) return "mistake";  // a full piece or more
    return "blunder";
  }
  if (difficulty === "pup") {
    if (cpLoss <= 30) return "good";
    if (cpLoss <= 100) return "inaccuracy";
    if (cpLoss <= 200) return "mistake";
    return "blunder";
  }
  if (difficulty === "puppy") {
    if (cpLoss <= 25) return "good";
    if (cpLoss <= 75) return "inaccuracy";
    if (cpLoss <= 200) return "mistake";
    return "blunder";
  }
  if (difficulty === "beginner") {
    if (cpLoss <= 0) return "best";
    if (cpLoss <= 15) return "excellent";
    if (cpLoss <= 40) return "good";
    if (cpLoss <= 80) return "inaccuracy";
    if (cpLoss <= 150) return "mistake";
    return "blunder";
  }
  if (difficulty === "casual") {
    if (cpLoss <= 0) return "best";
    if (cpLoss <= 12) return "excellent";
    if (cpLoss <= 30) return "good";
    if (cpLoss <= 60) return "inaccuracy";
    if (cpLoss <= 120) return "mistake";
    return "blunder";
  }
  return classifyMove(cpLoss);
}

// ============================================================
// DETECTORS — each returns a CoachIssue or null
// ============================================================

/** Detect player pieces that are attacked but not defended */
function detectHangingPieces(chess: Chess, playerColor: Color): CoachIssue | null {
  const enemy = opp(playerColor);
  let worstSq: string | null = null;
  let worstVal = 0;
  let worstName = "";

  for (const sq of ALL_SQUARES) {
    const piece = chess.get(sq);
    if (!piece || piece.color !== playerColor || piece.type === "k") continue;
    if (!chess.isAttacked(sq, enemy)) continue;
    if (chess.isAttacked(sq, playerColor)) continue; // defended

    if (PIECE_VALUES[piece.type] > worstVal) {
      worstVal = PIECE_VALUES[piece.type];
      worstSq = sq;
      worstName = PIECE_NAMES[piece.type];
    }
  }

  if (!worstSq) return null;

  if (worstVal >= 3) {
    return {
      kind: "hanging-piece",
      severity: "critical",
      message: `Your ${worstName} on ${worstSq} is hanging! They can take it for free!`,
      highlightSquares: [worstSq],
      highlightColor: HIGHLIGHT_DANGER,
    };
  }
  if (worstVal >= 1) {
    return {
      kind: "hanging-pawn",
      severity: "warning",
      message: `Your pawn on ${worstSq} is undefended — careful!`,
      highlightSquares: [worstSq],
      highlightColor: HIGHLIGHT_DANGER,
    };
  }
  return null;
}

/** Detect opponent pieces that were free but player didn't capture */
function detectMissedCaptures(
  chessBefore: Chess, playerColor: Color, playerMoveTo: string
): CoachIssue | null {
  const enemy = opp(playerColor);
  let bestSq: string | null = null;
  let bestVal = 0;
  let bestName = "";

  for (const sq of ALL_SQUARES) {
    const piece = chessBefore.get(sq);
    if (!piece || piece.color !== enemy || piece.type === "k") continue;
    if (!chessBefore.isAttacked(sq, playerColor)) continue;
    if (chessBefore.isAttacked(sq, enemy)) continue; // defended

    if (PIECE_VALUES[piece.type] > bestVal) {
      bestVal = PIECE_VALUES[piece.type];
      bestSq = sq;
      bestName = PIECE_NAMES[piece.type];
    }
  }

  if (bestSq && bestSq !== playerMoveTo && bestVal >= 3) {
    return {
      kind: "missed-capture",
      severity: "warning",
      message: `Their ${bestName} on ${bestSq} was free — you could've grabbed it!`,
      highlightSquares: [bestSq],
      highlightColor: HIGHLIGHT_MISSED,
    };
  }
  return null;
}

/** Remind to castle if king is still in center after move 6 */
function detectCastleNeeded(
  chessBefore: Chess, playerColor: Color, moveCount: number, moveSan: string
): CoachIssue | null {
  if (moveCount < 6) return null;
  if (moveSan === "O-O" || moveSan === "O-O-O") return null;

  const kingSq = playerColor === "w" ? "e1" : "e8";
  const king = chessBefore.get(kingSq as Square);
  if (!king || king.type !== "k" || king.color !== playerColor) return null;

  const moves = chessBefore.moves();
  if (!moves.some((m) => m === "O-O" || m === "O-O-O")) return null;

  return {
    kind: "castle-reminder",
    severity: "info",
    message: moveCount >= 10
      ? "Your king is still in the center! Castle as soon as you can — it's getting dangerous."
      : "Don't forget to castle! Your king is safer tucked behind the pawns.",
    highlightSquares: [kingSq],
    highlightColor: HIGHLIGHT_INFO,
  };
}

/** Flag undeveloped minor pieces past move 4 */
function detectUndeveloped(
  chess: Chess, playerColor: Color, moveCount: number
): CoachIssue | null {
  if (moveCount < 4) return null;

  const homeSquares = playerColor === "w" ? WHITE_HOME : BLACK_HOME;
  const stuck: string[] = [];

  for (const sq of homeSquares) {
    const piece = chess.get(sq);
    if (piece && piece.color === playerColor && (piece.type === "n" || piece.type === "b")) {
      stuck.push(sq);
    }
  }

  if (stuck.length >= 3) {
    return {
      kind: "undeveloped",
      severity: "info",
      message: "Your knights and bishops are still on the back rank — get them into the game before attacking!",
      highlightSquares: stuck,
      highlightColor: HIGHLIGHT_INFO,
    };
  }
  if (stuck.length >= 2 && moveCount >= 8) {
    return {
      kind: "undeveloped",
      severity: "info",
      message: `You still have ${stuck.length} pieces undeveloped. Try to get all your pieces active!`,
      highlightSquares: stuck,
      highlightColor: HIGHLIGHT_INFO,
    };
  }
  return null;
}

/** Detect moving a piece to the edge (a/h file, rank 1/8) when center was available */
function detectEdgeMove(
  chessAfter: Chess, playerColor: Color, moveTo: string, moveCount: number
): CoachIssue | null {
  if (moveCount < 3 || moveCount > 15) return null; // only during opening/early middlegame

  const file = moveTo[0];
  const rank = moveTo[1];
  const piece = chessAfter.get(moveTo as Square);
  if (!piece || piece.color !== playerColor) return null;
  if (piece.type === "r" || piece.type === "k" || piece.type === "p") return null; // rooks belong on edges

  const isEdge = file === "a" || file === "h" || rank === "1" || rank === "8";
  if (!isEdge) return null;

  return {
    kind: "edge-move",
    severity: "info",
    message: `A ${PIECE_NAMES[piece.type]} on the edge controls fewer squares. Pieces are stronger in the center!`,
    highlightSquares: [moveTo],
    highlightColor: HIGHLIGHT_INFO,
  };
}

/** Positive reinforcement */
function detectGoodMove(
  chessBefore: Chess, chessAfter: Chess, playerColor: Color,
  moveSan: string, moveTo: string, moveFrom: string
): CoachIssue | null {
  // Castled
  if (moveSan === "O-O" || moveSan === "O-O-O") {
    return { kind: "good-castle", severity: "praise",
      message: "Great castle! Your king is much safer now 🏰",
      highlightSquares: [], highlightColor: "" };
  }

  // Captured a hanging piece
  const enemy = opp(playerColor);
  const capturedPiece = chessBefore.get(moveTo as Square);
  if (capturedPiece && capturedPiece.color === enemy) {
    const wasDefended = chessBefore.isAttacked(moveTo as Square, enemy);
    if (!wasDefended && PIECE_VALUES[capturedPiece.type] >= 3) {
      return { kind: "good-capture", severity: "praise",
        message: `Nice! You grabbed their free ${PIECE_NAMES[capturedPiece.type]}! Free material is the best material 🦴`,
        highlightSquares: [], highlightColor: "" };
    }
  }

  // Developed a piece from home rank
  const homeSquares = playerColor === "w" ? WHITE_HOME : BLACK_HOME;
  if (homeSquares.includes(moveFrom as Square)) {
    const movedPiece = chessAfter.get(moveTo as Square);
    if (movedPiece && (movedPiece.type === "n" || movedPiece.type === "b")) {
      return { kind: "good-development", severity: "praise",
        message: "Good development! Getting pieces off the back rank is key 💪",
        highlightSquares: [], highlightColor: "" };
    }
  }

  // Moved to center (d4/d5/e4/e5 area)
  const centerSquares = ["d4", "d5", "e4", "e5", "c4", "c5", "f4", "f5"];
  if (centerSquares.includes(moveTo)) {
    const piece = chessAfter.get(moveTo as Square);
    if (piece && piece.color === playerColor && piece.type !== "k") {
      return { kind: "good-center", severity: "praise",
        message: "Strong central placement! Pieces in the center control the most squares.",
        highlightSquares: [], highlightColor: "" };
    }
  }

  return null;
}

// ============================================================
// MAIN ANALYSIS — selects detectors per difficulty level
// ============================================================

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
  // --- Intermediate and up: pure centipawn analysis, no coaching overlays ---
  if (difficulty === "intermediate" || difficulty === "advanced" || difficulty === "expert") {
    return {
      issues: [], primaryIssue: null,
      adjustedClassification: rawClassification,
      coachFeedback: null, coachHighlights: {},
    };
  }

  const adjusted = classifyLenient(cpLoss, difficulty);
  const issues: CoachIssue[] = [];

  // ================================================================
  // ~400 NEWBORN: Material awareness + basic forks/pins
  // Per Heisman & chess.com: "avoid hanging pieces, basic forks,
  // pins, skewers, center basics." Focus is reactive — point out
  // what went wrong with material, not positional stuff.
  // ================================================================
  if (difficulty === "newborn") {
    const hanging = detectHangingPieces(chessAfter, playerColor);
    if (hanging) issues.push(hanging);

    const missed = detectMissedCaptures(chessBefore, playerColor, move.to);
    if (missed) issues.push(missed);

    // Flag big missed tactics (piece-level) — forks/pins taught from day 1
    if (issues.length === 0 && cpLoss >= 250) {
      issues.push({
        kind: "missed-tactic", severity: "warning",
        message: "There was a way to win material here — look for forks and pins!",
        highlightSquares: [], highlightColor: "",
      });
    }

    // Gentle center nudge
    const edge = detectEdgeMove(chessAfter, playerColor, move.to, moveCount);
    if (edge && issues.length === 0) issues.push(edge);

    // Praise captures, center play, AND development (they need to learn all of it)
    if (issues.length === 0) {
      const good = detectGoodMove(chessBefore, chessAfter, playerColor, move.san, move.to, move.from);
      if (good) issues.push(good);
    }
  }

  // ================================================================
  // ~600 PUP: Material + development + castling + one-move threats
  // Per chess.com: "stop material loss, one-move threats, basic
  // forks/pins, opening principles, basic mates." Building habits.
  // ================================================================
  else if (difficulty === "pup") {
    const hanging = detectHangingPieces(chessAfter, playerColor);
    if (hanging) issues.push(hanging);

    const missed = detectMissedCaptures(chessBefore, playerColor, move.to);
    if (missed) issues.push(missed);

    const castle = detectCastleNeeded(chessBefore, playerColor, moveCount, move.san);
    if (castle) issues.push(castle);

    const dev = detectUndeveloped(chessAfter, playerColor, moveCount);
    if (dev) issues.push(dev);

    const edge = detectEdgeMove(chessAfter, playerColor, move.to, moveCount);
    if (edge && issues.length === 0) issues.push(edge);

    // Flag big missed tactics (piece-level)
    if (issues.length === 0 && cpLoss >= 200) {
      issues.push({
        kind: "missed-tactic", severity: "warning",
        message: "There was a much better move — look for pieces you can win!",
        highlightSquares: [], highlightColor: "",
      });
    }

    // Praise all good moves
    if (issues.filter(i => i.severity !== "info").length === 0) {
      const good = detectGoodMove(chessBefore, chessAfter, playerColor, move.san, move.to, move.from);
      if (good) issues.push(good);
    }
  }

  // ================================================================
  // ~800 PUPPY: Board awareness — safety-check every move
  // Per Heisman: "ensure selected move is safe by checking for
  // opponent's tactics." Daily tactics, coordinate pieces.
  // ================================================================
  else if (difficulty === "puppy") {
    const hanging = detectHangingPieces(chessAfter, playerColor);
    if (hanging) issues.push(hanging);

    const missed = detectMissedCaptures(chessBefore, playerColor, move.to);
    if (missed) issues.push(missed);

    const castle = detectCastleNeeded(chessBefore, playerColor, moveCount, move.san);
    if (castle) issues.push(castle);

    const dev = detectUndeveloped(chessAfter, playerColor, moveCount);
    if (dev) issues.push(dev);

    const edge = detectEdgeMove(chessAfter, playerColor, move.to, moveCount);
    if (edge && issues.length === 0) issues.push(edge);

    // At 800, should be solving daily tactics — flag missed combos
    if (issues.length === 0 && cpLoss >= 150) {
      issues.push({
        kind: "missed-tactic", severity: "warning",
        message: "You missed a tactic here — always check for forks, pins, and captures before moving!",
        highlightSquares: [], highlightColor: "",
      });
    }

    // Praise
    if (issues.filter(i => i.severity !== "info").length === 0) {
      const good = detectGoodMove(chessBefore, chessAfter, playerColor, move.san, move.to, move.from);
      if (good) issues.push(good);
    }
  }

  // ================================================================
  // ~1300 BEGINNER: Opening principles, daily tactics, piece activity
  // Per chess.com/Heisman: "controlling center, developing pieces,
  // king safety, practice tactics daily." Solid fundamentals.
  // ================================================================
  else if (difficulty === "beginner") {
    const hanging = detectHangingPieces(chessAfter, playerColor);
    if (hanging) issues.push(hanging);

    const missed = detectMissedCaptures(chessBefore, playerColor, move.to);
    if (missed) issues.push(missed);

    const castle = detectCastleNeeded(chessBefore, playerColor, moveCount, move.san);
    if (castle) issues.push(castle);

    const dev = detectUndeveloped(chessAfter, playerColor, moveCount);
    if (dev) issues.push(dev);

    // Flag tactical misses — these players should see 2-move combinations
    if (issues.length === 0 && cpLoss >= 100) {
      issues.push({
        kind: "missed-tactic", severity: "warning",
        message: "There was a stronger move — think about what pieces you can attack with two moves in a row.",
        highlightSquares: [], highlightColor: "",
      });
    }

    // Praise
    if (issues.filter(i => i.severity !== "info").length === 0) {
      const good = detectGoodMove(chessBefore, chessAfter, playerColor, move.san, move.to, move.from);
      if (good) issues.push(good);
    }
  }

  // ================================================================
  // ~1600 CASUAL: Pawn structure, middlegame plans, deeper combos
  // Per Silman: "understand imbalances." Per chess.com: "build a
  // repertoire, learn pawn structures, analyze your own games."
  // ================================================================
  else if (difficulty === "casual") {
    // Only flag hanging pieces (shouldn't happen at 1600 but still)
    const hanging = detectHangingPieces(chessAfter, playerColor);
    if (hanging && hanging.severity === "critical") issues.push(hanging);

    // Flag positional/tactical misses
    if (issues.length === 0 && cpLoss >= 100) {
      issues.push({
        kind: "missed-tactic", severity: "warning",
        message: "There was a stronger plan — consider pawn structure, piece coordination, and tactical threats.",
        highlightSquares: [], highlightColor: "",
      });
    }
  }

  // Pick primary issue
  const primaryIssue = issues.length > 0 ? issues[0] : null;

  // Build highlights
  const coachHighlights: Record<string, CSSProperties> = {};
  if (primaryIssue) {
    for (const sq of primaryIssue.highlightSquares) {
      coachHighlights[sq] = { backgroundColor: primaryIssue.highlightColor };
    }
  }

  // Build feedback message
  let coachFeedback: string | null = null;
  if (primaryIssue) {
    if (primaryIssue.severity === "praise") {
      // Only show praise for decent moves
      if (adjusted === "best" || adjusted === "excellent" || adjusted === "good") {
        coachFeedback = primaryIssue.message;
      }
    } else {
      coachFeedback = primaryIssue.message;
    }
  }

  return {
    issues, primaryIssue,
    adjustedClassification: adjusted,
    coachFeedback, coachHighlights,
  };
}
