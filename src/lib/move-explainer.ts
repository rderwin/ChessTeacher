import { Chess, type Square, type PieceSymbol, type Color } from "chess.js";
import type { MoveClass } from "./classify-moves";

// --- Helpers ---

const PIECE_NAMES: Record<PieceSymbol, string> = {
  p: "pawn",
  n: "knight",
  b: "bishop",
  r: "rook",
  q: "queen",
  k: "king",
};

const PIECE_VALUES: Record<PieceSymbol, number> = {
  p: 1, n: 3, b: 3, r: 5, q: 9, k: 0,
};

function pieceName(p: PieceSymbol): string {
  return PIECE_NAMES[p] ?? p;
}

function squareName(sq: string): string {
  return sq; // just the algebraic notation
}

function colorName(c: Color): string {
  return c === "w" ? "White" : "Black";
}

function oppositeColor(c: Color): Color {
  return c === "w" ? "b" : "w";
}

interface SquareInfo {
  piece: PieceSymbol;
  color: Color;
}

function getPiece(chess: Chess, sq: string): SquareInfo | null {
  const p = chess.get(sq as Square);
  if (!p) return null;
  return { piece: p.type, color: p.color };
}

/** Check if a square is attacked by the given color */
function isAttacked(chess: Chess, sq: string, byColor: Color): boolean {
  return chess.isAttacked(sq as Square, byColor);
}

/** Count material for a color */
function countMaterial(chess: Chess, color: Color): number {
  const board = chess.board();
  let total = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell && cell.color === color) {
        total += PIECE_VALUES[cell.type];
      }
    }
  }
  return total;
}

/** Count developed minor pieces (knights and bishops not on back rank) */
function countDeveloped(chess: Chess, color: Color): number {
  const board = chess.board();
  const backRank = color === "w" ? 7 : 0; // board[0] is rank 8, board[7] is rank 1
  let count = 0;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = board[row][col];
      if (cell && cell.color === color && (cell.type === "n" || cell.type === "b")) {
        if (row !== backRank) count++;
      }
    }
  }
  return count;
}

/** Check if a side has castled (king not on starting square) */
function hasCastled(chess: Chess, color: Color): boolean {
  const kingSquare = color === "w" ? "e1" : "e8";
  const p = chess.get(kingSquare as Square);
  // If king is not on starting square, it probably castled (or moved)
  return !p || p.type !== "k" || p.color !== color;
}

/** Check if a piece is hanging (attacked by opponent, not adequately defended) */
function isHanging(chess: Chess, sq: string, pieceColor: Color): boolean {
  const opp = oppositeColor(pieceColor);
  if (!isAttacked(chess, sq, opp)) return false;
  if (!isAttacked(chess, sq, pieceColor)) return true;
  // Simplified: if attacked and defended, check if the attacker is worth less
  // This is a rough heuristic
  return false;
}

/** Check center control (d4, d5, e4, e5) */
function centerControl(chess: Chess, color: Color): number {
  const centerSquares = ["d4", "d5", "e4", "e5"];
  let control = 0;
  for (const sq of centerSquares) {
    const p = getPiece(chess, sq);
    if (p && p.color === color && p.piece === "p") control += 2;
    if (isAttacked(chess, sq, color)) control += 1;
  }
  return control;
}

// --- Move description ---

interface MoveDetail {
  san: string;
  from: string;
  to: string;
  piece: PieceSymbol;
  captured?: PieceSymbol;
  isCheck: boolean;
  isCheckmate: boolean;
  isCastle: boolean;
  isPromotion: boolean;
  color: Color;
}

function describeMoveAction(m: MoveDetail): string {
  if (m.isCheckmate) {
    return `${pieceName(m.piece)} to ${squareName(m.to)} is checkmate!`;
  }
  if (m.isCastle) {
    const side = m.to.charAt(0) === "g" ? "kingside" : "queenside";
    return `castles ${side}, improving king safety`;
  }
  if (m.isPromotion) {
    return `pawn promotes on ${squareName(m.to)}`;
  }

  let desc = `${pieceName(m.piece)} to ${squareName(m.to)}`;
  if (m.captured) {
    desc = `${pieceName(m.piece)} captures ${pieceName(m.captured)} on ${squareName(m.to)}`;
  }
  if (m.isCheck) {
    desc += " with check";
  }
  return desc;
}

// --- Positional analysis ---

interface PositionAnalysis {
  materialWhite: number;
  materialBlack: number;
  developedWhite: number;
  developedBlack: number;
  centerWhite: number;
  centerBlack: number;
  whiteCastled: boolean;
  blackCastled: boolean;
}

function analyzePosition(chess: Chess): PositionAnalysis {
  return {
    materialWhite: countMaterial(chess, "w"),
    materialBlack: countMaterial(chess, "b"),
    developedWhite: countDeveloped(chess, "w"),
    developedBlack: countDeveloped(chess, "b"),
    centerWhite: centerControl(chess, "w"),
    centerBlack: centerControl(chess, "b"),
    whiteCastled: hasCastled(chess, "w"),
    blackCastled: hasCastled(chess, "b"),
  };
}

function comparePositions(
  before: PositionAnalysis,
  after: PositionAnalysis,
  color: Color
): string[] {
  const reasons: string[] = [];
  const opp = oppositeColor(color);

  // Material changes
  const myMatBefore = color === "w" ? before.materialWhite : before.materialBlack;
  const myMatAfter = color === "w" ? after.materialWhite : after.materialBlack;
  const oppMatBefore = color === "w" ? before.materialBlack : before.materialWhite;
  const oppMatAfter = color === "w" ? after.materialBlack : after.materialWhite;

  if (oppMatAfter < oppMatBefore) {
    reasons.push("wins material");
  }
  if (myMatAfter < myMatBefore && oppMatAfter >= oppMatBefore) {
    reasons.push("loses material without compensation");
  }

  // Development
  const myDevBefore = color === "w" ? before.developedWhite : before.developedBlack;
  const myDevAfter = color === "w" ? after.developedWhite : after.developedBlack;
  if (myDevAfter > myDevBefore) {
    reasons.push("develops a piece");
  }

  // Center control
  const myCenterBefore = color === "w" ? before.centerWhite : before.centerBlack;
  const myCenterAfter = color === "w" ? after.centerWhite : after.centerBlack;
  if (myCenterAfter > myCenterBefore + 1) {
    reasons.push("improves center control");
  }

  // Castling
  const castledBefore = color === "w" ? before.whiteCastled : before.blackCastled;
  const castledAfter = color === "w" ? after.whiteCastled : after.blackCastled;
  if (!castledBefore && castledAfter) {
    reasons.push("gets the king to safety");
  }

  return reasons;
}

// --- Main explainer ---

export interface MoveExplanation {
  /** What the played move does */
  playedDescription: string;
  /** Why the played move is good/bad */
  playedReasons: string[];
  /** What the best move does (null if played move IS best) */
  bestDescription: string | null;
  /** Why the best move is better */
  bestReasons: string[];
  /** Overall assessment */
  summary: string;
}

/**
 * Generate a human-readable explanation comparing the played move
 * to the engine's best move.
 */
export function explainMove(
  fenBefore: string,
  playedSan: string,
  bestMoveUci: string,
  classification: MoveClass,
  cpLoss: number
): MoveExplanation {
  const chess = new Chess(fenBefore);
  const turn = chess.turn();

  // Analyze the played move
  const playedVerbose = chess.moves({ verbose: true }).find((m) => m.san === playedSan);
  if (!playedVerbose) {
    return {
      playedDescription: playedSan,
      playedReasons: [],
      bestDescription: null,
      bestReasons: [],
      summary: "Unable to analyze this move.",
    };
  }

  const playedDetail: MoveDetail = {
    san: playedSan,
    from: playedVerbose.from,
    to: playedVerbose.to,
    piece: playedVerbose.piece,
    captured: playedVerbose.captured,
    isCheck: false,
    isCheckmate: false,
    isCastle: playedVerbose.flags.includes("k") || playedVerbose.flags.includes("q"),
    isPromotion: playedVerbose.flags.includes("p"),
    color: turn,
  };

  // Play the move to check for check/mate
  const posBefore = analyzePosition(chess);
  const chessCopy = new Chess(fenBefore);
  chessCopy.move(playedSan);
  playedDetail.isCheck = chessCopy.isCheck();
  playedDetail.isCheckmate = chessCopy.isCheckmate();
  const posAfterPlayed = analyzePosition(chessCopy);

  const playedDescription = describeMoveAction(playedDetail);
  const playedReasons = comparePositions(posBefore, posAfterPlayed, turn);

  // Check if the played move IS the best move
  const playedUci = playedVerbose.from + playedVerbose.to + (playedVerbose.promotion ?? "");
  const isBest = playedUci === bestMoveUci || classification === "best";

  let bestDescription: string | null = null;
  let bestReasons: string[] = [];

  if (!isBest && bestMoveUci && bestMoveUci.length >= 4) {
    // Analyze the best move
    const bestChess = new Chess(fenBefore);
    const from = bestMoveUci.slice(0, 2);
    const to = bestMoveUci.slice(2, 4);
    const promotion = bestMoveUci.length > 4 ? bestMoveUci[4] : undefined;

    try {
      const bestResult = bestChess.move({ from, to, promotion } as Parameters<typeof bestChess.move>[0]);
      if (bestResult) {
        const bestDetail: MoveDetail = {
          san: bestResult.san,
          from: bestResult.from,
          to: bestResult.to,
          piece: bestResult.piece,
          captured: bestResult.captured,
          isCheck: bestChess.isCheck(),
          isCheckmate: bestChess.isCheckmate(),
          isCastle: bestResult.flags.includes("k") || bestResult.flags.includes("q"),
          isPromotion: bestResult.flags.includes("p"),
          color: turn,
        };
        bestDescription = describeMoveAction(bestDetail);
        const posAfterBest = analyzePosition(bestChess);
        bestReasons = comparePositions(posBefore, posAfterBest, turn);

        // Add reasons based on what the best move achieves that the played doesn't
        if (bestDetail.captured && !playedDetail.captured) {
          bestReasons.push(
            `captures the ${pieceName(bestDetail.captured)} which you left on the board`
          );
        }
        if (bestDetail.isCheck && !playedDetail.isCheck) {
          bestReasons.push("gives check, gaining tempo");
        }

        // Check if played move leaves a piece hanging
        const hangingCheck = new Chess(fenBefore);
        hangingCheck.move(playedSan);
        if (isHanging(hangingCheck, playedVerbose.to, turn)) {
          playedReasons.push(
            `leaves the ${pieceName(playedDetail.piece)} undefended on ${squareName(playedVerbose.to)}`
          );
        }
      }
    } catch {
      // Best move couldn't be parsed
    }
  }

  // Filter out reasons that are the same for both moves (e.g. both "develop a piece")
  // so we only highlight what's actually different
  const uniqueBestReasons = bestReasons.filter(
    (r) => !playedReasons.includes(r)
  );
  const uniquePlayedReasons = playedReasons.filter(
    (r) => !bestReasons.includes(r)
  );

  // Build summary
  let summary: string;
  if (isBest || classification === "excellent") {
    if (playedDetail.isCheckmate) {
      summary = "Checkmate! The game is over.";
    } else if (playedReasons.length > 0) {
      summary = `This is a strong move — it ${playedReasons.join(" and ")}.`;
    } else {
      summary = "This is the best move in the position.";
    }
  } else if (classification === "good") {
    if (bestDescription && uniqueBestReasons.length > 0) {
      summary = `A solid move. Slightly better was ${bestDescription} which ${uniqueBestReasons[0]}.`;
    } else if (bestDescription) {
      summary = `A solid move, close to the engine's top choice. The engine slightly prefers ${bestDescription} — the difference is small.`;
    } else {
      summary = "A solid move, close to the engine's top choice.";
    }
  } else if (classification === "inaccuracy") {
    if (bestDescription && uniqueBestReasons.length > 0) {
      summary = `A slightly imprecise move. Better was ${bestDescription} which ${uniqueBestReasons[0]}.`;
    } else if (bestDescription) {
      summary = `A slightly imprecise move. The engine prefers ${bestDescription} — the advantage is subtle and positional.`;
    } else {
      summary = "A slightly imprecise move.";
    }
  } else if (classification === "mistake") {
    const lossText = `(${(cpLoss / 100).toFixed(1)} pawns)`;
    summary = `This is a mistake ${lossText}.`;
    if (uniquePlayedReasons.some((r) => r.includes("loses material"))) {
      summary += " It loses material.";
    }
    if (bestDescription) {
      summary += ` The best move was ${bestDescription}`;
      if (uniqueBestReasons.length > 0) {
        summary += ` — it ${uniqueBestReasons.slice(0, 2).join(" and ")}`;
      }
      summary += ".";
    }
  } else if (classification === "blunder") {
    const lossText = `(${(cpLoss / 100).toFixed(1)} pawns)`;
    summary = `This is a serious blunder ${lossText}!`;
    if (uniquePlayedReasons.some((r) => r.includes("loses material"))) {
      summary += " It loses significant material.";
    } else if (uniquePlayedReasons.some((r) => r.includes("undefended"))) {
      summary += ` The ${pieceName(playedDetail.piece)} is left hanging.`;
    }
    if (bestDescription) {
      summary += ` The best move was ${bestDescription}`;
      if (uniqueBestReasons.length > 0) {
        summary += ` which ${uniqueBestReasons.slice(0, 2).join(" and ")}`;
      }
      summary += ".";
    }
  } else {
    summary = describeMoveAction(playedDetail) + ".";
  }

  return {
    playedDescription,
    playedReasons: uniquePlayedReasons,
    bestDescription,
    bestReasons: uniqueBestReasons,
    summary,
  };
}
