"use client";

import { OpeningLine } from "@/data/types";

interface MoveHistoryProps {
  opening: OpeningLine;
  currentMoveIndex: number;
}

export default function MoveHistory({
  opening,
  currentMoveIndex,
}: MoveHistoryProps) {
  const movePairs: Array<{
    number: number;
    white?: { san: string; index: number };
    black?: { san: string; index: number };
  }> = [];

  for (let i = 0; i < opening.moves.length; i += 2) {
    const pair: (typeof movePairs)[0] = {
      number: Math.floor(i / 2) + 1,
    };
    if (opening.moves[i]) {
      pair.white = { san: opening.moves[i].san, index: i };
    }
    if (opening.moves[i + 1]) {
      pair.black = { san: opening.moves[i + 1].san, index: i + 1 };
    }
    movePairs.push(pair);
  }

  return (
    <div className="bg-stone-800 rounded-xl p-4 border border-stone-700">
      <h3 className="text-sm font-medium text-stone-400 mb-3">Moves</h3>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {movePairs.map((pair) => (
          <div key={pair.number} className="flex text-sm font-mono">
            <span className="w-8 text-stone-500 shrink-0">{pair.number}.</span>
            {pair.white && (
              <span
                className={`w-16 shrink-0 ${
                  pair.white.index < currentMoveIndex
                    ? "text-stone-200"
                    : pair.white.index === currentMoveIndex
                    ? "text-emerald-400 font-bold"
                    : "text-stone-600"
                }`}
              >
                {pair.white.index <= currentMoveIndex ? pair.white.san : "..."}
              </span>
            )}
            {pair.black && (
              <span
                className={`w-16 shrink-0 ${
                  pair.black.index < currentMoveIndex
                    ? "text-stone-200"
                    : pair.black.index === currentMoveIndex
                    ? "text-emerald-400 font-bold"
                    : "text-stone-600"
                }`}
              >
                {pair.black.index <= currentMoveIndex ? pair.black.san : "..."}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
