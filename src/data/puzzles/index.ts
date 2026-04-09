import type { PuzzleSet } from "../types";
import { mateInOne } from "./mate-in-one";
import { mateInTwo } from "./mate-in-two";
import { knightForks } from "./knight-forks";
import { backRankMates } from "./back-rank-mates";
import { pinsAndSkewers } from "./pins-and-skewers";
import { discoveredAttacks } from "./discovered-attacks";

export const ALL_PUZZLE_SETS: PuzzleSet[] = [
  mateInOne,
  knightForks,
  backRankMates,
  mateInTwo,
  pinsAndSkewers,
  discoveredAttacks,
];

export function getPuzzleSetById(id: string): PuzzleSet | undefined {
  return ALL_PUZZLE_SETS.find((s) => s.id === id);
}

export function getAllPuzzles() {
  return ALL_PUZZLE_SETS.flatMap((s) => s.puzzles);
}
