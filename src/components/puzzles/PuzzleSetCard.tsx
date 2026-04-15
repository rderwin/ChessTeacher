"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { PuzzleSet } from "@/data/types";
import { getShortDefinition } from "@/data/glossary";
import { usePuzzleProgress } from "@/hooks/usePuzzleProgress";

const DIFF_STYLES = {
  beginner: "bg-green-600/20 text-green-300 border-green-500/30",
  intermediate: "bg-yellow-600/20 text-yellow-300 border-yellow-500/30",
  advanced: "bg-red-600/20 text-red-300 border-red-500/30",
  expert: "bg-purple-600/20 text-purple-300 border-purple-500/30",
};

interface Props {
  set: PuzzleSet;
}

export default function PuzzleSetCard({ set }: Props) {
  const { progress, loading } = usePuzzleProgress();

  const { solvedCount, percent, isComplete } = useMemo(() => {
    const solvedMap = progress.solvedPuzzleIds ?? {};
    const solved = set.puzzles.filter((p) => solvedMap[p.id]).length;
    const pct = set.puzzles.length > 0
      ? Math.round((solved / set.puzzles.length) * 100)
      : 0;
    return {
      solvedCount: solved,
      percent: pct,
      isComplete: solved >= set.puzzles.length && set.puzzles.length > 0,
    };
  }, [progress.solvedPuzzleIds, set.puzzles]);

  return (
    <Link
      href={`/puzzles/${set.id}`}
      className={`block bg-stone-800 rounded-xl p-5 border transition-all group ${
        isComplete
          ? "border-emerald-700/60 shadow-[0_0_20px_rgba(16,185,129,0.08)]"
          : "border-stone-700 hover:border-stone-500"
      }`}
    >
      <div className="flex items-start justify-between mb-2 gap-3">
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2 min-w-0">
          <span className="shrink-0">{set.icon}</span>
          <span className="truncate">{set.name}</span>
          {isComplete && (
            <span
              className="text-emerald-400 shrink-0"
              title="Set complete!"
              aria-label="Set complete"
            >
              ✓
            </span>
          )}
        </h3>
        <span
          className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${DIFF_STYLES[set.difficulty]}`}
        >
          {set.difficulty}
        </span>
      </div>

      <p className="text-sm text-stone-400 mb-3">{set.description}</p>

      <div className="flex items-center justify-between text-sm mb-2">
        <div className="flex flex-wrap gap-1.5">
          {set.themes.slice(0, 3).map((theme) => (
            <span
              key={theme}
              title={getShortDefinition(theme)}
              className="text-[10px] px-2 py-0.5 rounded-full bg-stone-700 text-stone-400 cursor-help"
            >
              {theme.replace(/-/g, " ")}
            </span>
          ))}
        </div>
        <span className="text-stone-500 whitespace-nowrap ml-2">
          {loading
            ? `${set.puzzles.length} puzzles`
            : solvedCount > 0
              ? `${solvedCount}/${set.puzzles.length} solved`
              : `${set.puzzles.length} puzzles`}
        </span>
      </div>

      {solvedCount > 0 && (
        <div className="h-1 bg-stone-900/80 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isComplete ? "bg-emerald-400" : "bg-emerald-600"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </Link>
  );
}
