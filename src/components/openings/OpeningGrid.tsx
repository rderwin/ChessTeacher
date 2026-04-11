"use client";

import { OpeningLine } from "@/data/types";
import OpeningCard from "./OpeningCard";

interface OpeningGridProps {
  openings: OpeningLine[];
}

const LEVELS = [
  { key: "beginner" as const, label: "Beginner", emoji: "🟢", description: "Great starting points — learn fundamental opening principles." },
  { key: "intermediate" as const, label: "Intermediate", emoji: "🟡", description: "More complex ideas — build on the basics with deeper strategy." },
  { key: "advanced" as const, label: "Advanced", emoji: "🔴", description: "Sophisticated systems — for players ready for dynamic, challenging play." },
];

export default function OpeningGrid({ openings }: OpeningGridProps) {
  return (
    <div className="space-y-10">
      {LEVELS.map((level) => {
        const levelOpenings = openings.filter((o) => o.level === level.key);
        if (levelOpenings.length === 0) return null;

        const white = levelOpenings.filter((o) => o.playerColor === "white");
        const black = levelOpenings.filter((o) => o.playerColor === "black");

        return (
          <div key={level.key}>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span>{level.emoji}</span> {level.label}
              </h2>
              <p className="text-sm text-stone-500 mt-1">{level.description}</p>
            </div>

            {white.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-stone-400 mb-2 flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-white border-2 border-stone-400" />
                  White
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {white.map((o) => (
                    <OpeningCard key={o.id} opening={o} />
                  ))}
                </div>
              </div>
            )}

            {black.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-stone-400 mb-2 flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-stone-900 border-2 border-stone-500" />
                  Black
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {black.map((o) => (
                    <OpeningCard key={o.id} opening={o} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
