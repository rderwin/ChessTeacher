"use client";

import { useCallback } from "react";
import type { EndgameLesson } from "@/data/endgames";
import InteractiveBoard from "@/components/board/InteractiveBoard";
import { useEndgameSession } from "@/hooks/useEndgameSession";

interface Props {
  lesson: EndgameLesson;
  onBack: () => void;
}

export default function EndgamePractice({ lesson, onBack }: Props) {
  const {
    fen, moveCount, status, currentTip, parMoves,
    makeMove, start, reset,
  } = useEndgameSession(lesson);

  const handleDrop = useCallback(
    (from: string, to: string) => { makeMove(from, to); return true; },
    [makeMove]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Board */}
      <div className="shrink-0">
        <InteractiveBoard
          fen={fen}
          playerColor="white"
          onPieceDrop={handleDrop}
          disabled={status !== "playing"}
        />
      </div>

      {/* Info panel */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="bg-stone-800 rounded-xl border border-stone-700 p-5">
          <h2 className="text-xl font-bold text-white mb-1">{lesson.title}</h2>
          <p className="text-sm text-stone-400 mb-3">{lesson.objective}</p>

          {status === "ready" && (
            <div>
              <p className="text-sm text-stone-300 leading-relaxed mb-4">
                {lesson.explanation}
              </p>
              <button
                onClick={start}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
              >
                Start Practice
              </button>
            </div>
          )}

          {status === "playing" && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-stone-500">
                  Moves: <strong className="text-stone-300">{moveCount}</strong>
                </span>
                <span className="text-stone-700">|</span>
                <span className="text-sm text-stone-500">
                  Par: <strong className={moveCount <= parMoves ? "text-emerald-400" : "text-yellow-400"}>{parMoves}</strong>
                </span>
              </div>
              <div className="bg-stone-900/50 rounded-lg p-3">
                <p className="text-xs text-stone-500 font-medium mb-1">Tip</p>
                <p className="text-sm text-stone-300 leading-relaxed">{currentTip}</p>
              </div>
            </div>
          )}

          {status === "opponent" && (
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Opponent thinking...
            </div>
          )}

          {status === "checkmate" && (
            <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-lg p-4">
              <p className="text-emerald-300 font-bold text-lg mb-1">Checkmate! 🎉</p>
              <p className="text-sm text-stone-300 mb-1">
                Delivered in <strong>{moveCount}</strong> moves
                {moveCount <= parMoves
                  ? <span className="text-emerald-400"> — under par! Excellent technique.</span>
                  : <span className="text-yellow-400"> — try to do it in {parMoves} or fewer next time.</span>
                }
              </p>
              <div className="flex gap-3 mt-3">
                <button onClick={reset} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors text-sm font-medium">
                  Try Again
                </button>
                <button onClick={onBack} className="px-4 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors text-sm">
                  Back to Endgames
                </button>
              </div>
            </div>
          )}

          {status === "stalemate" && (
            <div className="bg-yellow-950/30 border border-yellow-800/50 rounded-lg p-4">
              <p className="text-yellow-300 font-bold text-lg mb-1">Stalemate! 😬</p>
              <p className="text-sm text-stone-300 mb-3">
                The opponent has no legal moves but is NOT in check — that&apos;s a draw.
                Be careful not to take away ALL their squares without giving check!
              </p>
              <div className="flex gap-3">
                <button onClick={reset} className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium">
                  Try Again
                </button>
                <button onClick={onBack} className="px-4 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors text-sm">
                  Back to Endgames
                </button>
              </div>
            </div>
          )}

          {status === "draw" && (
            <div className="bg-stone-700/50 border border-stone-600 rounded-lg p-4">
              <p className="text-stone-300 font-bold text-lg mb-1">Draw</p>
              <p className="text-sm text-stone-400 mb-3">
                The game was drawn (50-move rule or repetition). Try to deliver mate more efficiently!
              </p>
              <div className="flex gap-3">
                <button onClick={reset} className="px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-500 transition-colors text-sm font-medium">
                  Try Again
                </button>
                <button onClick={onBack} className="px-4 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors text-sm">
                  Back to Endgames
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {(status === "playing" || status === "opponent" || status === "ready") && (
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-sm text-stone-500 hover:text-stone-300 transition-colors">
              ← Back to endgames
            </button>
            {status !== "ready" && (
              <button onClick={reset} className="text-sm text-stone-500 hover:text-stone-300 transition-colors">
                Reset
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
