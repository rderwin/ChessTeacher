import { Chess } from "chess.js";
import { OpeningLine, OpeningVariant, MoveExplanation } from "@/data/types";

export interface MoveValidationResult {
  correct: boolean;
  playedSan: string;
  expectedSan: string;
  explanation: MoveExplanation;
  specificMistakeFeedback?: string;
}

export function validateMoveAgainstLine(
  chess: Chess,
  from: string,
  to: string,
  opening: OpeningLine,
  moveIndex: number
): MoveValidationResult | null {
  const expected = opening.moves[moveIndex];
  if (!expected) return null;

  // Try the move on a copy to get the SAN
  const copy = new Chess(chess.fen());
  let result;
  try {
    result = copy.move({ from, to, promotion: "q" });
  } catch {
    return null;
  }
  if (!result) return null;

  const playedSan = result.san;
  const correct = playedSan === expected.san;

  let specificMistakeFeedback: string | undefined;
  if (!correct && expected.commonMistakes) {
    const mistake = expected.commonMistakes.find((m) => m.san === playedSan);
    if (mistake) {
      specificMistakeFeedback = mistake.whyBad;
    }
  }

  return {
    correct,
    playedSan,
    expectedSan: expected.san,
    explanation: expected,
    specificMistakeFeedback,
  };
}

export function getSquaresForSan(
  san: string,
  chess: Chess
): { from: string; to: string } | null {
  const copy = new Chess(chess.fen());
  try {
    const move = copy.move(san);
    if (move) return { from: move.from, to: move.to };
  } catch {
    // invalid move
  }
  return null;
}

export function getUserMoveCount(opening: OpeningLine): number {
  return opening.moves.filter((m) => m.color === opening.playerColor).length;
}

export function getMoveNumber(moveIndex: number): string {
  const fullMoveNumber = Math.floor(moveIndex / 2) + 1;
  const isWhite = moveIndex % 2 === 0;
  return isWhite ? `${fullMoveNumber}.` : `${fullMoveNumber}...`;
}

/**
 * Build the data needed to practice a variant.
 * Replays the main line up to `branchesAt` to compute the starting FEN,
 * then returns the variant moves as a synthetic OpeningLine.
 */
export function buildVariantSession(
  opening: OpeningLine,
  variant: OpeningVariant
): { startFen: string; line: OpeningLine } {
  const chess = new Chess();

  // Replay main line up to the branch point
  for (let i = 0; i < variant.branchesAt; i++) {
    const move = opening.moves[i];
    if (!move) break;
    try {
      chess.move(move.san);
    } catch {
      break;
    }
  }

  const startFen = chess.fen();

  // Build a synthetic OpeningLine with the variant's moves
  const line: OpeningLine = {
    ...opening,
    id: `${opening.id}:${variant.id}`,
    name: variant.name,
    fullName: `${opening.name} — ${variant.name}`,
    description: variant.description,
    moves: [variant.opponentMove, ...variant.moves],
    summary: "",
    variants: undefined,
  };

  return { startFen, line };
}

/**
 * Build a "surprise" line — starts from move 1, plays through the main line,
 * and at one randomly-chosen branch point splices in a variant. The player
 * doesn't know in advance which variant (if any) will be triggered.
 *
 * Returns a synthetic OpeningLine starting from the standard initial
 * position. Also returns the variant name (for post-game debrief) and
 * the move index where the branch occurred.
 */
export function buildSurpriseLine(opening: OpeningLine): {
  line: OpeningLine;
  variantName: string | null;
  branchedAt: number | null;
} {
  const variants = opening.variants ?? [];
  if (variants.length === 0) {
    return { line: opening, variantName: null, branchedAt: null };
  }

  // 30% chance of staying on the main line
  if (Math.random() < 0.3) {
    return { line: opening, variantName: null, branchedAt: null };
  }

  // Pick a random variant
  const variant = variants[Math.floor(Math.random() * variants.length)];

  // Build a synthetic move list: main moves up to branchesAt, then opponentMove
  // (which replaces the main line move at that index), then variant.moves.
  //
  // The deviation move (variant.opponentMove) gets the variant name baked
  // into its `why` text — when the bot plays it, the player sees "[Two
  // Knights Defense] Instead of the quiet Bc5, Black plays Nf6..." and
  // knows what they're up against.
  const mainPrefix = opening.moves.slice(0, variant.branchesAt);
  const labeledOpponentMove: MoveExplanation = {
    ...variant.opponentMove,
    why: `[${variant.name}] ${variant.opponentMove.why}`,
  };
  const synthMoves: MoveExplanation[] = [
    ...mainPrefix,
    labeledOpponentMove,
    ...variant.moves,
  ];

  // Keep the line's name and fullName as the bare opening — DO NOT reveal
  // which variant was picked. The whole point of Surprise Mode is for the
  // player to discover the deviation themselves.
  const line: OpeningLine = {
    ...opening,
    id: `${opening.id}:surprise:${variant.id}`,
    moves: synthMoves,
    variants: undefined,
  };

  return { line, variantName: variant.name, branchedAt: variant.branchesAt };
}
