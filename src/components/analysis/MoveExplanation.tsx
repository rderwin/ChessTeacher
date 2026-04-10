"use client";

import { useMemo } from "react";
import type { MoveClassification, MoveClass } from "@/lib/classify-moves";
import {
  MOVE_CLASS_COLORS,
  MOVE_CLASS_SYMBOLS,
} from "@/lib/classify-moves";
import { explainMove, type MoveExplanation as Explanation } from "@/lib/move-explainer";

function formatEval(cp: number, mate: number | null): string {
  if (mate !== null) {
    return mate > 0 ? `M${mate}` : `−M${Math.abs(mate)}`;
  }
  const pawns = cp / 100;
  return pawns >= 0 ? `+${pawns.toFixed(1)}` : `${pawns.toFixed(1)}`;
}

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
    <div className="bg-stone-800 rounded-xl border border-stone-700 p-3 max-w-full sm:max-w-[520px]">
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

      {/* Eval comparison when showing best */}
      {showingBest && hasBetter && (
        <div className="mt-2.5 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-stone-700/60">
            <span className="text-stone-500">Your move</span>
            <span className="font-mono font-semibold text-stone-300">
              {formatEval(classification.evalAfter, classification.mateAfter)}
            </span>
          </div>
          <span className="text-stone-600">→</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-950/40">
            <span className="text-stone-500">Best move</span>
            <span className="font-mono font-semibold text-emerald-400">
              {formatEval(classification.evalBefore, classification.mateBefore)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
