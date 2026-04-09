export type PieceColor = "white" | "black";

export type StrategicConcept =
  | "center-control"
  | "development"
  | "king-safety"
  | "space"
  | "pawn-structure"
  | "piece-activity"
  | "tempo"
  | "prophylaxis"
  | "attack"
  | "preparation";

export interface MoveExplanation {
  san: string;
  color: PieceColor;
  why: string;
  concepts: StrategicConcept[];
  controls?: string;
  prevents?: string;
  commonMistakes?: Array<{
    san: string;
    whyBad: string;
  }>;
}

export interface OpeningHistory {
  origin: string;
  nameExplanation: string;
  popularity: string;
  bestFor: string;
  famousPlayers: string[];
}

export interface OpeningLine {
  id: string;
  name: string;
  fullName: string;
  eco: string;
  playerColor: PieceColor;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  history: OpeningHistory;
  moves: MoveExplanation[];
  summary: string;
}

// --- Puzzles ---

export type PuzzleTheme =
  | "fork"
  | "pin"
  | "skewer"
  | "discovered-attack"
  | "back-rank-mate"
  | "smothered-mate"
  | "mate-in-1"
  | "mate-in-2"
  | "mate-in-3"
  | "deflection"
  | "decoy"
  | "overloaded-piece"
  | "trapped-piece"
  | "zwischenzug"
  | "endgame-tactic";

export type PuzzleDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export interface Puzzle {
  id: string;
  /** FEN of the starting position */
  fen: string;
  /** Which side the player controls */
  playerColor: PieceColor;
  /** Solution as alternating player/opponent moves in SAN */
  solution: string[];
  /** Theme tags */
  themes: PuzzleTheme[];
  /** Difficulty rating (600-2400 range) */
  rating: number;
  difficulty: PuzzleDifficulty;
  /** Short hint shown on request */
  hint: string;
  /** Explanation shown after solving */
  explanation: string;
  /** Source attribution */
  source: "handcrafted" | "lichess";
}

export interface PuzzleSet {
  id: string;
  name: string;
  description: string;
  icon: string;
  themes: PuzzleTheme[];
  difficulty: PuzzleDifficulty;
  puzzles: Puzzle[];
}
