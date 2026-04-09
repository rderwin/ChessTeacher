/**
 * Pure logic for puzzle move validation.
 * No React — just chess.js + puzzle data.
 */

import { Chess } from "chess.js";
import type { Puzzle } from "@/data/types";

export interface PuzzleMoveResult {
  correct: boolean;
  playedSan: string;
  expectedSan: string;
}

/**
 * Validate a player's move against the puzzle solution.
 * solutionIndex is the current position in the solution array.
 */
export function validatePuzzleMove(
  chess: Chess,
  from: string,
  to: string,
  puzzle: Puzzle,
  solutionIndex: number
): PuzzleMoveResult | null {
  const expectedSan = puzzle.solution[solutionIndex];
  if (!expectedSan) return null;

  // Try the player's move on a copy to get SAN
  const copy = new Chess(chess.fen());
  let playedSan: string;
  try {
    const result = copy.move({ from, to, promotion: "q" });
    if (!result) return null;
    playedSan = result.san;
  } catch {
    return null; // illegal move
  }

  // Normalize — strip check/mate symbols for comparison
  const normalize = (san: string) => san.replace(/[+#]/g, "");
  const correct = normalize(playedSan) === normalize(expectedSan);

  return { correct, playedSan, expectedSan };
}

/**
 * Count how many of the solution moves the player makes
 * (even-indexed: 0, 2, 4...).
 */
export function getPlayerMoveCount(puzzle: Puzzle): number {
  return Math.ceil(puzzle.solution.length / 2);
}

/**
 * Check if the given solutionIndex is the last player move.
 */
export function isLastPlayerMove(puzzle: Puzzle, solutionIndex: number): boolean {
  // Player moves are at even indices. The last player move is the last
  // even index in the solution. After it, there might be one more
  // opponent move (odd index) or nothing.
  const lastPlayerIndex =
    puzzle.solution.length % 2 === 1
      ? puzzle.solution.length - 1 // odd length → last is player move
      : puzzle.solution.length - 2; // even length → second-to-last is player move
  return solutionIndex >= lastPlayerIndex;
}
