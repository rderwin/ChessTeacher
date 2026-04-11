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
