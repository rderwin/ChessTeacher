/**
 * Move classification based on centipawn loss, similar to Chess.com's system.
 * Compares the eval before a move to the eval after — the difference
 * (from the moving side's perspective) determines the classification.
 */

export type MoveClass =
  | "brilliant"
  | "best"
  | "excellent"
  | "good"
  | "inaccuracy"
  | "mistake"
  | "blunder"
  | "book";

export interface MoveClassification {
  classification: MoveClass;
  /** Centipawn loss (0 = best move, positive = worse) */
  cpLoss: number;
  /** Eval after this move from White's perspective */
  evalAfter: number;
  /** Mate after this move from White's perspective, or null */
  mateAfter: number | null;
}

export const MOVE_CLASS_COLORS: Record<MoveClass, string> = {
  brilliant: "text-cyan-400",
  best: "text-emerald-400",
  excellent: "text-emerald-500",
  good: "text-emerald-700",
  inaccuracy: "text-yellow-400",
  mistake: "text-orange-400",
  blunder: "text-red-500",
  book: "text-stone-400",
};

export const MOVE_CLASS_BG: Record<MoveClass, string> = {
  brilliant: "bg-cyan-500/20",
  best: "bg-emerald-500/20",
  excellent: "bg-emerald-500/10",
  good: "bg-emerald-500/5",
  inaccuracy: "bg-yellow-500/20",
  mistake: "bg-orange-500/20",
  blunder: "bg-red-500/20",
  book: "",
};

export const MOVE_CLASS_SYMBOLS: Record<MoveClass, string> = {
  brilliant: "!!",
  best: "",
  excellent: "",
  good: "",
  inaccuracy: "?!",
  mistake: "?",
  blunder: "??",
  book: "",
};

/**
 * Classify a move based on centipawn loss.
 * cpLoss is always >= 0, representing how many centipawns worse
 * the played move is compared to the best move in the position.
 */
export function classifyMove(cpLoss: number): MoveClass {
  if (cpLoss <= 0) return "best";
  if (cpLoss <= 10) return "excellent";
  if (cpLoss <= 25) return "good";
  if (cpLoss <= 50) return "inaccuracy";
  if (cpLoss <= 100) return "mistake";
  return "blunder";
}

/**
 * Convert a mate score to a centipawn-equivalent for comparison.
 * Mate in N is treated as a very large advantage.
 */
export function mateToCP(mate: number): number {
  if (mate > 0) return 10000 - mate * 10; // White mating
  return -10000 - mate * 10; // Black mating (mate is negative)
}

/**
 * Compute centipawn loss for a move.
 * evalBefore and evalAfter are from White's perspective.
 * color is whose move it was ("w" or "b").
 */
export function computeCPLoss(
  evalBefore: number,
  mateBefore: number | null,
  evalAfter: number,
  mateAfter: number | null,
  color: "w" | "b"
): number {
  const cpBefore = mateBefore !== null ? mateToCP(mateBefore) : evalBefore;
  const cpAfter = mateAfter !== null ? mateToCP(mateAfter) : evalAfter;

  // From the moving side's perspective, a good move maintains or improves their position.
  // cpLoss = how much worse the position got for the moving side.
  if (color === "w") {
    // White wants eval to stay high or increase
    return Math.max(0, cpBefore - cpAfter);
  } else {
    // Black wants eval to stay low or decrease
    return Math.max(0, cpAfter - cpBefore);
  }
}
