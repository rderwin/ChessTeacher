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

export interface OpeningLine {
  id: string;
  name: string;
  fullName: string;
  eco: string;
  playerColor: PieceColor;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  moves: MoveExplanation[];
  summary: string;
}
