import type { PuzzleSet } from "../types";
import { mateInOne } from "./mate-in-one";
import { mateInTwo } from "./mate-in-two";
import { mateInThree } from "./mate-in-three";
import { knightForks } from "./knight-forks";
import { backRankMates } from "./back-rank-mates";
import { pinsAndSkewers } from "./pins-and-skewers";
import { discoveredAttacks } from "./discovered-attacks";
import { queenSacrifices } from "./queen-sacrifices";
import { trappedPieces } from "./trapped-pieces";

export const ALL_PUZZLE_SETS: PuzzleSet[] = [
  mateInOne,
  knightForks,
  backRankMates,
  mateInTwo,
  pinsAndSkewers,
  discoveredAttacks,
  mateInThree,
  queenSacrifices,
  trappedPieces,
];

export function getPuzzleSetById(id: string): PuzzleSet | undefined {
  return ALL_PUZZLE_SETS.find((s) => s.id === id);
}

export function getAllPuzzles() {
  return ALL_PUZZLE_SETS.flatMap((s) => s.puzzles);
}
