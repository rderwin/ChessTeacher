"use client";

import type { OpeningLine, OpeningVariant } from "@/data/types";
import { useProgress } from "@/hooks/useProgress";
import { getMoveNumber } from "@/lib/engine";

interface Props {
  opening: OpeningLine;
  variant: OpeningVariant;
  onStart: () => void;
}

export default function VariantCard({ opening, variant, onStart }: Props) {
  const { getCompletionPercent } = useProgress(`${opening.id}:${variant.id}`);
  const percent = getCompletionPercent();
  const branchMove = opening.moves[variant.branchesAt];
  const moveNum = getMoveNumber(variant.branchesAt);

  return (
    <button
      onClick={onStart}
      className="w-full text-left bg-stone-800 rounded-xl p-4 border border-stone-700 hover:border-stone-500 transition-all group"
    >
      <div className="flex items-start justify-between mb-1.5">
        <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
          {variant.name}
        </h4>
        {percent > 0 && (
          <span className="text-xs text-emerald-400 font-medium">{percent}%</span>
        )}
      </div>

      <p className="text-sm text-stone-400 mb-2">{variant.description}</p>

      <p className="text-xs text-stone-500">
        After {moveNum} {branchMove?.san ?? "..."}, opponent plays{" "}
        <span className="text-stone-300 font-mono">{variant.opponentMove.san}</span>
        {" "}instead of{" "}
        <span className="text-stone-500 font-mono">{opening.moves[variant.branchesAt]?.san}</span>
      </p>

      {percent > 0 && (
        <div className="mt-2 w-full h-1 bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </button>
  );
}
