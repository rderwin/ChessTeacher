"use client";

import Link from "next/link";
import type { PuzzleSet } from "@/data/types";
import { getShortDefinition } from "@/data/glossary";

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
  return (
    <Link
      href={`/puzzles/${set.id}`}
      className="block bg-stone-800 rounded-xl p-5 border border-stone-700 hover:border-stone-500 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
          <span className="mr-2">{set.icon}</span>
          {set.name}
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${DIFF_STYLES[set.difficulty]}`}
        >
          {set.difficulty}
        </span>
      </div>

      <p className="text-sm text-stone-400 mb-3">{set.description}</p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex flex-wrap gap-1.5">
          {set.themes.map((theme) => (
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
          {set.puzzles.length} puzzles
        </span>
      </div>
    </Link>
  );
}
