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

const ALL_SQUARES: Square[] = [];
for (const file of "abcdefgh") {
  for (const rank of "12345678") {
    ALL_SQUARES.push((file + rank) as Square);
  }
}

const CENTER_SQUARES = new Set(["d4", "d5", "e4", "e5"]);
const EXTENDED_CENTER = new Set(["c3", "c4", "c5", "c6", "d3", "d6", "e3", "e6", "f3", "f4", "f5", "f6"]);

function pieceName(p: PieceSymbol): string {
  return PIECE_NAMES[p] ?? p;
}

function oppositeColor(c: Color): Color {
  return c === "w" ? "b" : "w";
}

// --- Move-specific analysis ---

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

/** Get squares attacked by a specific piece on a given square */
function squaresAttackedBy(chess: Chess, sq: Square): Square[] {
  const piece = chess.get(sq);
  if (!piece) return [];
  const attacked: Square[] = [];
  for (const s of ALL_SQUARES) {
    if (s === sq) continue;
    if (chess.isAttacked(s, piece.color)) {
      // Check if removing the piece would stop the attack
      // This is approximate — we check if the piece could move there
      const moves = chess.moves({ square: sq, verbose: true });
      if (moves.some((m) => m.to === s)) {
        attacked.push(s);
      }
    }
  }
  return attacked;
}

/** Count how many center/extended center squares a piece attacks */
function centerSquaresAttacked(chess: Chess, sq: Square): { center: string[]; extended: string[] } {
  const moves = chess.moves({ square: sq, verbose: true });
  const targetSquares = moves.map((m) => m.to);
  const center = targetSquares.filter((s) => CENTER_SQUARES.has(s));
  const extended = targetSquares.filter((s) => EXTENDED_CENTER.has(s));
  return { center, extended };
}

/** Count legal moves for a piece (measure of activity) */
function pieceMobility(chess: Chess, sq: Square): number {
  return chess.moves({ square: sq, verbose: true }).length;
}

/** Check if a piece on this square blocks a friendly central pawn from advancing.
 *  Only flags c, d, e pawns — blocking the f-pawn with Nf3 isn't meaningful. */
function blocksPawn(chess: Chess, sq: Square, color: Color): string | null {
  const file = sq[0];
  // Only care about central/semi-central pawns (c, d, e)
  if (file !== "c" && file !== "d" && file !== "e") return null;
  const rank = parseInt(sq[1]);
  const pawnRank = color === "w" ? rank - 1 : rank + 1;
  if (pawnRank < 1 || pawnRank > 8) return null;
  const pawnSq = (file + pawnRank) as Square;
  const p = chess.get(pawnSq);
  if (p && p.type === "p" && p.color === color) return file;
  return null;
}

/** Check if a piece attacks opponent's king zone (squares around the king) */
function attacksKingZone(chess: Chess, sq: Square, oppColor: Color): boolean {
  // Find opponent's king
  const board = chess.board();
  let kingRow = -1, kingCol = -1;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cell = board[r][c];
      if (cell && cell.type === "k" && cell.color === oppColor) {
        kingRow = r;
        kingCol = c;
      }
    }
  }
  if (kingRow < 0) return false;

  // King zone: squares adjacent to the king
  const moves = chess.moves({ square: sq, verbose: true });
  for (const m of moves) {
    const toFile = m.to.charCodeAt(0) - 97;
    const toRank = 8 - parseInt(m.to[1]);
    if (Math.abs(toFile - kingCol) <= 1 && Math.abs(toRank - kingRow) <= 1) {
      return true;
    }
  }
  return false;
}

/** Check if piece is on an open/semi-open file (for rooks/queens) */
function isOpenFile(chess: Chess, file: string): "open" | "semi-open" | "closed" {
  const board = chess.board();
  const col = file.charCodeAt(0) - 97;
  let whitePawns = 0, blackPawns = 0;
  for (let r = 0; r < 8; r++) {
    const cell = board[r][col];
    if (cell && cell.type === "p") {
      if (cell.color === "w") whitePawns++;
      else blackPawns++;
    }
  }
  if (whitePawns === 0 && blackPawns === 0) return "open";
  if (whitePawns === 0 || blackPawns === 0) return "semi-open";
  return "closed";
}

/** Analyze what a specific move accomplishes */
function analyzeMoveEffects(
  fenBefore: string,
  detail: MoveDetail,
  posAfter: Chess
): string[] {
  const reasons: string[] = [];
  const chess = new Chess(fenBefore);
  const turn = detail.color;
  const opp = oppositeColor(turn);

  // --- Material ---
  if (detail.captured) {
    if (!detail.captured) {
      // already handled in description
    }
  }

  // --- Piece placement analysis ---
  const toSq = detail.to as Square;

  // Center control from the new square
  const { center: centerAfter } = centerSquaresAttacked(posAfter, toSq);
  if (centerAfter.length >= 2) {
    reasons.push(`controls key center squares ${centerAfter.join(" and ")} from ${detail.to}`);
  } else if (centerAfter.length === 1) {
    reasons.push(`puts pressure on ${centerAfter[0]}`);
  }

  // Piece activity (mobility)
  const mobility = pieceMobility(posAfter, toSq);
  if ((detail.piece === "n" || detail.piece === "b") && mobility >= 6) {
    reasons.push(`the ${pieceName(detail.piece)} is very active on ${detail.to} with ${mobility} possible moves`);
  }

  // King zone pressure
  if (detail.piece !== "k" && detail.piece !== "p" && attacksKingZone(posAfter, toSq, opp)) {
    reasons.push(`puts pressure on the opponent's king`);
  }

  // Pawn blocking (only central pawns)
  const blockedFile = blocksPawn(posAfter, toSq, turn);
  if (blockedFile) {
    reasons.push(`blocks the ${blockedFile}-pawn from advancing`);
  }

  // Rook on open file
  if ((detail.piece === "r" || detail.piece === "q") && !detail.isCastle) {
    const fileStatus = isOpenFile(posAfter, detail.to[0]);
    if (fileStatus === "open") {
      reasons.push(`places the ${pieceName(detail.piece)} on the open ${detail.to[0]}-file`);
    } else if (fileStatus === "semi-open") {
      reasons.push(`places the ${pieceName(detail.piece)} on the semi-open ${detail.to[0]}-file`);
    }
  }

  // Castling
  if (detail.isCastle) {
    reasons.push("gets the king to safety and connects the rooks");
  }

  // Check
  if (detail.isCheck) {
    reasons.push("gives check, gaining a tempo");
  }

  // Development (only for minor pieces leaving back rank)
  const fromRank = parseInt(detail.from[1]);
  const backRank = turn === "w" ? 1 : 8;
  if ((detail.piece === "n" || detail.piece === "b") && fromRank === backRank) {
    reasons.push(`develops the ${pieceName(detail.piece)} into the game`);
  }

  return reasons;
}

// --- Move description ---

function describeMoveAction(m: MoveDetail): string {
  if (m.isCheckmate) {
    return `${pieceName(m.piece)} to ${m.to} is checkmate!`;
  }
  if (m.isCastle) {
    const side = m.to.charAt(0) === "g" ? "kingside" : "queenside";
    return `castles ${side}`;
  }
  if (m.isPromotion) {
    return `pawn promotes on ${m.to}`;
  }

  let desc = `${pieceName(m.piece)} to ${m.to}`;
  if (m.captured) {
    desc = `${pieceName(m.piece)} captures ${pieceName(m.captured)} on ${m.to}`;
  }
  if (m.isCheck) {
    desc += " with check";
  }
  return desc;
}

// --- Position comparison (coarse, for material/castling changes) ---

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

function hasCastled(chess: Chess, color: Color): boolean {
  const kingSquare = color === "w" ? "e1" : "e8";
  const p = chess.get(kingSquare as Square);
  return !p || p.type !== "k" || p.color !== color;
}

function isHanging(chess: Chess, sq: string, pieceColor: Color): boolean {
  const opp = oppositeColor(pieceColor);
  if (!chess.isAttacked(sq as Square, opp)) return false;
  if (!chess.isAttacked(sq as Square, pieceColor)) return true;
  return false;
}

// --- Main explainer ---

export interface MoveExplanation {
  playedDescription: string;
  playedReasons: string[];
  bestDescription: string | null;
  bestReasons: string[];
  summary: string;
}

export function explainMove(
  fenBefore: string,
  playedSan: string,
  bestMoveUci: string,
  classification: MoveClass,
  cpLoss: number
): MoveExplanation {
  const chess = new Chess(fenBefore);
  const turn = chess.turn();

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

  // Play the move
  const posAfterPlayed = new Chess(fenBefore);
  posAfterPlayed.move(playedSan);
  playedDetail.isCheck = posAfterPlayed.isCheck();
  playedDetail.isCheckmate = posAfterPlayed.isCheckmate();

  const playedDescription = describeMoveAction(playedDetail);
  const playedReasons = analyzeMoveEffects(fenBefore, playedDetail, posAfterPlayed);

  // Material loss check
  const matBefore = countMaterial(chess, turn);
  const matAfterPlayed = countMaterial(posAfterPlayed, turn);
  const oppMatBefore = countMaterial(chess, oppositeColor(turn));
  const oppMatAfterPlayed = countMaterial(posAfterPlayed, oppositeColor(turn));
  if (matAfterPlayed < matBefore && oppMatAfterPlayed >= oppMatBefore) {
    playedReasons.unshift("loses material without compensation");
  }
  if (oppMatAfterPlayed < oppMatBefore) {
    playedReasons.unshift("wins material");
  }

  // Hanging piece check
  if (isHanging(posAfterPlayed, playedVerbose.to, turn)) {
    playedReasons.push(
      `leaves the ${pieceName(playedDetail.piece)} undefended on ${playedVerbose.to}`
    );
  }

  // Check if the played move IS the best move
  const playedUci = playedVerbose.from + playedVerbose.to + (playedVerbose.promotion ?? "");
  const isBest = playedUci === bestMoveUci || classification === "best";

  let bestDescription: string | null = null;
  let bestReasons: string[] = [];

  if (!isBest && bestMoveUci && bestMoveUci.length >= 4) {
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
        bestReasons = analyzeMoveEffects(fenBefore, bestDetail, bestChess);

        // Material
        const oppMatAfterBest = countMaterial(bestChess, oppositeColor(turn));
        if (oppMatAfterBest < oppMatBefore && oppMatAfterPlayed >= oppMatBefore) {
          bestReasons.unshift(
            `captures the ${pieceName(bestDetail.captured!)} which you left on the board`
          );
        }
      }
    } catch {
      // Best move couldn't be parsed
    }
  }

  // Filter out identical reasons
  const uniqueBestReasons = bestReasons.filter((r) => !playedReasons.includes(r));
  const uniquePlayedReasons = playedReasons.filter((r) => !bestReasons.includes(r));

  // Build summary
  let summary: string;
  if (isBest || classification === "excellent") {
    if (playedDetail.isCheckmate) {
      summary = "Checkmate! The game is over.";
    } else if (playedReasons.length > 0) {
      summary = `This is a strong move — it ${playedReasons.slice(0, 2).join(" and ")}.`;
    } else {
      summary = "This is the best move in the position.";
    }
  } else if (classification === "good") {
    if (bestDescription && uniqueBestReasons.length > 0) {
      summary = `A solid move. Slightly better was ${bestDescription} — it ${uniqueBestReasons[0]}.`;
    } else if (bestDescription) {
      summary = `A solid move. The engine slightly prefers ${bestDescription} — the difference is small and positional.`;
    } else {
      summary = "A solid move, close to the engine's top choice.";
    }
    if (uniquePlayedReasons.length > 0) {
      const downside = uniquePlayedReasons.find(
        (r) => r.includes("blocks") || r.includes("leaves") || r.includes("loses")
      );
      if (downside) {
        summary += ` Your move ${downside}.`;
      }
    }
  } else if (classification === "inaccuracy") {
    if (uniquePlayedReasons.length > 0 && bestDescription) {
      const downside = uniquePlayedReasons.find(
        (r) => r.includes("blocks") || r.includes("leaves") || r.includes("loses")
      );
      if (downside) {
        summary = `A slightly imprecise move — it ${downside}. Better was ${bestDescription}.`;
      } else if (uniqueBestReasons.length > 0) {
        summary = `A slightly imprecise move. Better was ${bestDescription} which ${uniqueBestReasons[0]}.`;
      } else {
        summary = `A slightly imprecise move. The engine prefers ${bestDescription}.`;
      }
    } else if (bestDescription && uniqueBestReasons.length > 0) {
      summary = `A slightly imprecise move. Better was ${bestDescription} which ${uniqueBestReasons[0]}.`;
    } else if (bestDescription) {
      summary = `A slightly imprecise move. The engine prefers ${bestDescription} — the advantage is subtle and positional.`;
    } else {
      summary = "A slightly imprecise move.";
    }
  } else if (classification === "mistake") {
    const lossText = `(${(cpLoss / 100).toFixed(1)} pawns)`;
    summary = `This is a mistake ${lossText}.`;
    const downside = uniquePlayedReasons.find(
      (r) => r.includes("loses") || r.includes("leaves") || r.includes("blocks")
    );
    if (downside) {
      summary += ` It ${downside}.`;
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
    const downside = uniquePlayedReasons.find(
      (r) => r.includes("loses") || r.includes("leaves") || r.includes("undefended")
    );
    if (downside) {
      summary += ` It ${downside}.`;
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
