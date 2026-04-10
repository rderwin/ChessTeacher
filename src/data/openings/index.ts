import { OpeningLine } from "../types";
import { italianGame } from "./italian-game";
import { londonSystem } from "./london-system";
import { queensGambit } from "./queens-gambit";
import { ruyLopez } from "./ruy-lopez";
import { sicilianNajdorf } from "./sicilian-najdorf";
import { slavDefense } from "./slav-defense";

export const ALL_OPENINGS: OpeningLine[] = [
  italianGame,
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
