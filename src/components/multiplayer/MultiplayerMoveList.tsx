"use client";

import { useEffect, useRef } from "react";

interface Props {
  moves: string[];
}

export default function MultiplayerMoveList({ moves }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [moves.length]);

  const pairs: Array<{ number: number; white?: string; black?: string }> = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }

  return (
    <div className="bg-stone-800 border border-stone-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-stone-400">Moves</h3>
        <span className="text-[10px] text-stone-600 uppercase tracking-wider">
          {moves.length} played
        </span>
      </div>
      {moves.length === 0 ? (
        <p className="text-xs text-stone-600 italic">No moves yet</p>
      ) : (
        <div className="grid grid-cols-[auto_1fr_1fr] gap-x-2 gap-y-1 text-sm font-mono max-h-48 overflow-y-auto pr-1">
          {pairs.map((p) => (
            <div key={p.number} className="contents">
              <span className="text-stone-500 tabular-nums">{p.number}.</span>
              <span className="text-stone-200 px-1.5 py-0.5">
                {p.white ?? ""}
              </span>
              <span className="text-stone-200 px-1.5 py-0.5">
                {p.black ?? ""}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
