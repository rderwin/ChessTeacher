"use client";

import Link from "next/link";
import { OpeningLine } from "@/data/types";
import { useProgress } from "@/hooks/useProgress";

interface OpeningCardProps {
  opening: OpeningLine;
}

const LEVEL_STYLES = {
  beginner: "bg-green-600/20 text-green-300 border-green-500/30",
  intermediate: "bg-yellow-600/20 text-yellow-300 border-yellow-500/30",
  advanced: "bg-red-600/20 text-red-300 border-red-500/30",
};

export default function OpeningCard({ opening }: OpeningCardProps) {
  const { getCompletionPercent } = useProgress(opening.id);
  const percent = getCompletionPercent();

  return (
    <Link
      href={`/openings/${opening.id}`}
      className="block bg-stone-800 rounded-xl p-5 border border-stone-700 hover:border-stone-500 transition-all hover:bg-stone-750 group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
          {opening.name}
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${
            LEVEL_STYLES[opening.level]
          }`}
        >
          {opening.level}
        </span>
      </div>

      <p className="text-sm text-stone-400 mb-3">{opening.description}</p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-3 h-3 rounded-full border-2 ${
              opening.playerColor === "white"
                ? "bg-white border-stone-400"
                : "bg-stone-900 border-stone-500"
            }`}
          />
          <span className="text-stone-500">
            Play as {opening.playerColor}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-stone-500">{opening.eco}</span>
          {percent > 0 && (
            <span className="text-emerald-400 font-medium">{percent}%</span>
          )}
        </div>
      </div>

      {percent > 0 && (
        <div className="mt-3 w-full h-1.5 bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </Link>
  );
}
