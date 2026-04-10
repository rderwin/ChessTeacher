import { OpeningLine } from "../types";
import { frenchDefense } from "./french-defense";
import { italianGame } from "./italian-game";
import { kingsIndian } from "./kings-indian";
import { londonSystem } from "./london-system";
import { queensGambit } from "./queens-gambit";
import { ruyLopez } from "./ruy-lopez";
import { sicilianNajdorf } from "./sicilian-najdorf";
import { slavDefense } from "./slav-defense";

export const ALL_OPENINGS: OpeningLine[] = [
  italianGame,
  frenchDefense,
  kingsIndian,
  londonSystem,
  queensGambit,
  ruyLopez,
  sicilianNajdorf,
  slavDefense,
];

export function getOpeningById(id: string): OpeningLine | undefined {
  return ALL_OPENINGS.find((o) => o.id === id);
}

export function getOpeningsByColor(
  color: "white" | "black"
): OpeningLine[] {
  return ALL_OPENINGS.filter((o) => o.playerColor === color);
}
