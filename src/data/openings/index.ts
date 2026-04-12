import { OpeningLine } from "../types";
import { modernBenoni } from "./benoni";
import { caroKann } from "./caro-kann";
import { catalan } from "./catalan";
import { colleSystem } from "./colle-system";
import { dutchDefense } from "./dutch-defense";
import { englishOpening } from "./english-opening";
import { frenchDefense } from "./french-defense";
import { grunfeld } from "./grunfeld";
import { italianGame } from "./italian-game";
import { kingsIndian } from "./kings-indian";
import { londonSystem } from "./london-system";
import { nimzoIndian } from "./nimzo-indian";
import { pircDefense } from "./pirc-defense";
import { punishEarlyQueen } from "./punish-early-queen";
import { queensGambit } from "./queens-gambit";
import { ruyLopez } from "./ruy-lopez";
import { sicilianNajdorf } from "./sicilian-najdorf";
import { scotchGame } from "./scotch-game";
import { slavDefense } from "./slav-defense";
import { trompowsky } from "./trompowsky";

export const ALL_OPENINGS: OpeningLine[] = [
  modernBenoni,
  caroKann,
  catalan,
  punishEarlyQueen,
  colleSystem,
  dutchDefense,
  englishOpening,
  grunfeld,
  italianGame,
  scotchGame,
  frenchDefense,
  kingsIndian,
  londonSystem,
  nimzoIndian,
  pircDefense,
  queensGambit,
  ruyLopez,
  sicilianNajdorf,
  slavDefense,
  trompowsky,
];

export function getOpeningById(id: string): OpeningLine | undefined {
  return ALL_OPENINGS.find((o) => o.id === id);
}

export function getOpeningsByColor(
  color: "white" | "black"
): OpeningLine[] {
  return ALL_OPENINGS.filter((o) => o.playerColor === color);
}
