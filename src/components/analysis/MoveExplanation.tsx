"use client";

import { useState, useMemo } from "react";
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
}

export default function MoveExplanationPanel({
  fenBefore,
  playedSan,
  classification,
}: Props) {
  const [showBest, setShowBest] = useState(false);

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
    <div className="bg-stone-800 rounded-xl border border-stone-700 p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-sm font-semibold ${MOVE_CLASS_COLORS[cls]}`}>
          {symbol && <span className="mr-1">{symbol}</span>}
          {CLASS_LABELS[cls]}
        </span>
        <span className="text-xs text-stone-500">
          {playedSan}
          {classification.cpLoss > 0 && (
            <span className="ml-1">
              ({(classification.cpLoss / 100).toFixed(1)} pawns lost)
            </span>
          )}
        </span>
      </div>

      <p className="text-sm text-stone-300 leading-relaxed">
        {explanation.summary}
      </p>

      {explanation.playedReasons.length > 0 && (
        <ul className="mt-2 space-y-0.5">
          {explanation.playedReasons.map((reason, i) => (
            <li key={i} className="text-xs text-stone-400 flex items-start gap-1.5">
              <span className="text-stone-600 mt-0.5">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      )}

      {hasBetter && (
        <div className="mt-3">
          {!showBest ? (
            <button
              onClick={() => setShowBest(true)}
              className="text-xs px-3 py-1.5 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors"
            >
              Show best move
            </button>
          ) : (
            <div className="bg-stone-900/50 rounded-lg p-3 border border-stone-700/50">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-medium text-emerald-400">
                  Better was:
                </span>
                <span className="text-sm text-white font-medium">
                  {explanation.bestDescription}
                </span>
              </div>
              {explanation.bestReasons.length > 0 && (
                <ul className="space-y-0.5">
                  {explanation.bestReasons.map((reason, i) => (
                    <li
                      key={i}
                      className="text-xs text-stone-400 flex items-start gap-1.5"
                    >
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
