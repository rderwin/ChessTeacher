"use client";

import type { PuzzleSet } from "@/data/types";
import PuzzleSetCard from "./PuzzleSetCard";

interface Props {
  sets: PuzzleSet[];
}

export default function PuzzleSetGrid({ sets }: Props) {
  const byDifficulty = {
    beginner: sets.filter((s) => s.difficulty === "beginner"),
    intermediate: sets.filter((s) => s.difficulty === "intermediate"),
    advanced: sets.filter((s) => s.difficulty === "advanced"),
    expert: sets.filter((s) => s.difficulty === "expert"),
  };

  const LABELS: Record<string, { title: string; emoji: string }> = {
    beginner: { title: "Beginner", emoji: "🟢" },
    intermediate: { title: "Intermediate", emoji: "🟡" },
    advanced: { title: "Advanced", emoji: "🔴" },
    expert: { title: "Expert", emoji: "🟣" },
  };

  return (
    <div className="space-y-8">
      {(Object.entries(byDifficulty) as [string, PuzzleSet[]][]).map(
        ([level, levelSets]) =>
          levelSets.length > 0 && (
            <div key={level}>
              <h2 className="text-lg font-semibold text-stone-300 mb-3 flex items-center gap-2">
                <span>{LABELS[level].emoji}</span>
                {LABELS[level].title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {levelSets.map((set) => (
                  <PuzzleSetCard key={set.id} set={set} />
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}
