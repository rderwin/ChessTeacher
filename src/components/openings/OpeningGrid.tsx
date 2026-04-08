"use client";

import { OpeningLine } from "@/data/types";
import OpeningCard from "./OpeningCard";

interface OpeningGridProps {
  openings: OpeningLine[];
}

export default function OpeningGrid({ openings }: OpeningGridProps) {
  const whiteOpenings = openings.filter((o) => o.playerColor === "white");
  const blackOpenings = openings.filter((o) => o.playerColor === "black");

  return (
    <div className="space-y-8">
      {whiteOpenings.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-stone-300 mb-3 flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-white border-2 border-stone-400" />
            White Repertoire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whiteOpenings.map((o) => (
              <OpeningCard key={o.id} opening={o} />
            ))}
          </div>
        </div>
      )}

      {blackOpenings.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-stone-300 mb-3 flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-stone-900 border-2 border-stone-500" />
            Black Repertoire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blackOpenings.map((o) => (
              <OpeningCard key={o.id} opening={o} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
