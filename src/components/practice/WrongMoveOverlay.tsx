"use client";

import { MoveExplanation } from "@/data/types";
import { getMoveNumber } from "@/lib/engine";

interface WrongMoveOverlayProps {
  attempted: string;
  correct: MoveExplanation;
  moveIndex: number;
  specificFeedback?: string;
}

export default function WrongMoveOverlay({
  attempted,
  correct,
  moveIndex,
  specificFeedback,
}: WrongMoveOverlayProps) {
  const moveNum = getMoveNumber(moveIndex);

  return (
    <div className="bg-red-950/50 border border-red-800/50 rounded-xl p-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-red-300 font-medium text-sm">Not quite!</span>
      </div>

      <p className="text-stone-300 mb-3">
        You played <span className="font-bold text-red-300">{attempted}</span>.
        The recommended move is{" "}
        <span className="font-bold text-emerald-300">
          {moveNum} {correct.san}
        </span>
        .
      </p>

      {specificFeedback && (
        <div className="bg-stone-800/50 rounded-lg p-3 mb-3 border border-stone-700/50">
          <p className="text-sm text-stone-300 italic">{specificFeedback}</p>
        </div>
      )}

      <div className="bg-stone-800/50 rounded-lg p-3 mb-3 border border-stone-700/50">
        <p className="text-sm font-medium text-stone-400 mb-1">
          Why {correct.san}?
        </p>
        <p className="text-sm text-stone-300">{correct.why}</p>
      </div>

      <p className="text-xs text-stone-500 text-center">
        Just make a move on the board to try again — no button needed
      </p>
    </div>
  );
}
