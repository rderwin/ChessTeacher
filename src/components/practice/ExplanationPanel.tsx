"use client";

import { MoveExplanation } from "@/data/types";
import { getMoveNumber } from "@/lib/engine";

const CONCEPT_LABELS: Record<string, string> = {
  "center-control": "Center Control",
  development: "Development",
  "king-safety": "King Safety",
  space: "Space",
  "pawn-structure": "Pawn Structure",
  "piece-activity": "Piece Activity",
  tempo: "Tempo",
  prophylaxis: "Prophylaxis",
  attack: "Attack",
  preparation: "Preparation",
};

const CONCEPT_COLORS: Record<string, string> = {
  "center-control": "bg-blue-600/20 text-blue-300 border-blue-500/30",
  development: "bg-green-600/20 text-green-300 border-green-500/30",
  "king-safety": "bg-yellow-600/20 text-yellow-300 border-yellow-500/30",
  space: "bg-purple-600/20 text-purple-300 border-purple-500/30",
  "pawn-structure": "bg-orange-600/20 text-orange-300 border-orange-500/30",
  "piece-activity": "bg-cyan-600/20 text-cyan-300 border-cyan-500/30",
  tempo: "bg-red-600/20 text-red-300 border-red-500/30",
  prophylaxis: "bg-pink-600/20 text-pink-300 border-pink-500/30",
  attack: "bg-rose-600/20 text-rose-300 border-rose-500/30",
  preparation: "bg-amber-600/20 text-amber-300 border-amber-500/30",
};

interface ExplanationPanelProps {
  explanation: MoveExplanation;
  moveIndex: number;
  onNext: () => void;
  isOpponentMove?: boolean;
}

export default function ExplanationPanel({
  explanation,
  moveIndex,
  onNext,
  isOpponentMove = false,
}: ExplanationPanelProps) {
  const moveNum = getMoveNumber(moveIndex);

  return (
    <div className="bg-stone-800 rounded-xl p-5 border border-stone-700 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xl font-bold text-white">
          {moveNum} {explanation.san}
        </span>
        {isOpponentMove && (
          <span className="text-xs bg-stone-600 text-stone-300 px-2 py-0.5 rounded">
            Opponent
          </span>
        )}
      </div>

      <p className="text-stone-200 leading-relaxed mb-4">{explanation.why}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {explanation.concepts.map((concept) => (
          <span
            key={concept}
            className={`text-xs px-2.5 py-1 rounded-full border ${
              CONCEPT_COLORS[concept] || "bg-stone-600/20 text-stone-300 border-stone-500/30"
            }`}
          >
            {CONCEPT_LABELS[concept] || concept}
          </span>
        ))}
      </div>

      {explanation.controls && (
        <div className="text-sm text-stone-400 mb-2">
          <span className="text-stone-500 font-medium">Controls: </span>
          {explanation.controls}
        </div>
      )}

      {explanation.prevents && (
        <div className="text-sm text-stone-400 mb-4">
          <span className="text-stone-500 font-medium">Prevents: </span>
          {explanation.prevents}
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full mt-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  );
}
