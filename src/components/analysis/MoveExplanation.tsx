"use client";

import { useMemo } from "react";
import type { MoveClassification, MoveClass } from "@/lib/classify-moves";
import {
  MOVE_CLASS_COLORS,
  MOVE_CLASS_SYMBOLS,
} from "@/lib/classify-moves";
import { explainMove, type MoveExplanation as Explanation } from "@/lib/move-explainer";

const CLASS_LABELS: Record<MoveClass, string> = {
  brilliant: "Brilliant",
  best: "Best move",
  excellent: "Excellent",
  good: "Good",
  inaccuracy: "Inaccuracy",
  mistake: "Mistake",
  blunder: "Blunder",
  book: "Book",
};

interface Props {
  fenBefore: string;
  playedSan: string;
  classification: MoveClassification;
  moveColor: "w" | "b";
  showingBest: boolean;
  onShowBest: () => void;
  onHideBest: () => void;
}

export default function MoveExplanationPanel({
  fenBefore,
  playedSan,
  classification,
  showingBest,
  onShowBest,
  onHideBest,
}: Props) {
  const explanation: Explanation | null = useMemo(() => {
    try {
      return explainMove(
        fenBefore,
        playedSan,
        classification.bestMoveUci,
        classification.classification,
        classification.cpLoss
      );
    } catch {
      return null;
    }
  }, [fenBefore, playedSan, classification]);

  if (!explanation) return null;

  const cls = classification.classification;
  const isBestOrExcellent = cls === "best" || cls === "excellent" || cls === "brilliant";
  const hasBetter = !isBestOrExcellent && explanation.bestDescription;
  const symbol = MOVE_CLASS_SYMBOLS[cls];

  return (
    <div className="bg-stone-800 rounded-xl border border-stone-700 p-3 max-w-[520px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${MOVE_CLASS_COLORS[cls]}`}>
            {symbol && <span className="mr-1">{symbol}</span>}
            {CLASS_LABELS[cls]}
          </span>
          <span className="text-xs text-stone-500">
            {playedSan}
            {classification.cpLoss > 0 && (
              <span className="ml-1">
                ({(classification.cpLoss / 100).toFixed(1)} pawns)
              </span>
            )}
          </span>
        </div>
        {hasBetter && (
          <button
            onClick={showingBest ? onHideBest : onShowBest}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
              showingBest
                ? "bg-emerald-600 text-white hover:bg-emerald-500"
                : "bg-stone-700 text-stone-300 hover:bg-stone-600"
            }`}
          >
            {showingBest ? "Show played" : "Show best"}
          </button>
        )}
      </div>

      <p className="text-sm text-stone-300 leading-relaxed mt-2">
        {showingBest && explanation.bestDescription
          ? `Better was: ${explanation.bestDescription}${
              explanation.bestReasons.length > 0
                ? ` — ${explanation.bestReasons.slice(0, 2).join(" and ")}`
                : ""
            }.`
          : explanation.summary}
      </p>

      {!showingBest && explanation.playedReasons.length > 0 && (
        <ul className="mt-1.5 space-y-0.5">
          {explanation.playedReasons.map((reason, i) => (
            <li key={i} className="text-xs text-stone-400 flex items-start gap-1.5">
              <span className="text-stone-600 mt-0.5">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      )}

      {showingBest && explanation.bestReasons.length > 0 && (
        <ul className="mt-1.5 space-y-0.5">
          {explanation.bestReasons.map((reason, i) => (
            <li key={i} className="text-xs text-stone-400 flex items-start gap-1.5">
              <span className="text-emerald-600 mt-0.5">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
