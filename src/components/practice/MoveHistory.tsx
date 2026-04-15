"use client";

import { useEffect, useRef } from "react";
import { OpeningLine } from "@/data/types";

interface MoveHistoryProps {
  opening: OpeningLine;
  currentMoveIndex: number;
}

export default function MoveHistory({
  opening,
  currentMoveIndex,
}: MoveHistoryProps) {
  const activeRowRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll the active move into view
  useEffect(() => {
    activeRowRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [currentMoveIndex]);

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
      <h3 className="text-sm font-medium text-stone-400 mb-3 flex items-center justify-between">
        <span>Moves</span>
        <span className="text-[10px] text-stone-600 uppercase tracking-wider">
          {currentMoveIndex} / {opening.moves.length}
        </span>
      </h3>
      <div className="grid grid-cols-[auto_1fr_1fr] gap-x-2 gap-y-1 text-sm font-mono max-h-56 overflow-y-auto pr-1">
        {movePairs.map((pair) => {
          const whiteIsActive = pair.white?.index === currentMoveIndex;
          const blackIsActive = pair.black?.index === currentMoveIndex;
          const isActiveRow = whiteIsActive || blackIsActive;
          return (
            <div
              key={pair.number}
              ref={isActiveRow ? activeRowRef : undefined}
              className="contents"
            >
              <span className="text-stone-500 tabular-nums">
                {pair.number}.
              </span>
              {pair.white && (
                <MoveCell
                  san={pair.white.san}
                  moveIndex={pair.white.index}
                  currentMoveIndex={currentMoveIndex}
                />
              )}
              {!pair.white && <span />}
              {pair.black && (
                <MoveCell
                  san={pair.black.san}
                  moveIndex={pair.black.index}
                  currentMoveIndex={currentMoveIndex}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MoveCell({
  san,
  moveIndex,
  currentMoveIndex,
}: {
  san: string;
  moveIndex: number;
  currentMoveIndex: number;
}) {
  const played = moveIndex < currentMoveIndex;
  const isCurrent = moveIndex === currentMoveIndex;
  return (
    <span
      className={`px-1.5 py-0.5 rounded transition-colors ${
        isCurrent
          ? "bg-emerald-900/50 text-emerald-200 font-bold"
          : played
            ? "text-stone-200"
            : "text-stone-600"
      }`}
    >
      {played || isCurrent ? san : "···"}
    </span>
  );
}
