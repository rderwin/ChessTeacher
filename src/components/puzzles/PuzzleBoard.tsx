"use client";

import { useCallback } from "react";
import type { Puzzle, PuzzleSet } from "@/data/types";
import InteractiveBoard from "@/components/board/InteractiveBoard";
import { usePuzzleSession, type PuzzleStatus } from "@/hooks/usePuzzleSession";

interface Props {
  puzzleSet: PuzzleSet;
  puzzleIndex: number;
  onNextPuzzle: () => void;
  onBackToSet: () => void;
}

function StatusBadge({ status }: { status: PuzzleStatus }) {
  const map: Record<PuzzleStatus, { text: string; cls: string }> = {
    "waiting-for-user": { text: "Your move", cls: "bg-stone-700 text-stone-300" },
    "correct-move": { text: "Correct!", cls: "bg-emerald-600 text-white" },
    "opponent-moving": { text: "Opponent responds...", cls: "bg-stone-700 text-stone-400" },
    "wrong-move": { text: "Wrong move!", cls: "bg-red-600 text-white" },
    "showing-hint": { text: "Hint", cls: "bg-amber-600 text-white" },
    completed: { text: "Solved!", cls: "bg-emerald-600 text-white" },
  };
  const info = map[status];
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${info.cls}`}>
      {info.text}
    </span>
  );
}

export default function PuzzleBoard({
  puzzleSet,
  puzzleIndex,
  onNextPuzzle,
  onBackToSet,
}: Props) {
  const puzzle = puzzleSet.puzzles[puzzleIndex];
  const {
    fen,
    status,
    attemptsUsed,
    hintShown,
    playerMoveCount,
    makeMove,
    retry,
    showHint,
    dismissHint,
    reset,
  } = usePuzzleSession(puzzle);

  const orientation = puzzle.playerColor === "white" ? "white" : "black";
  const isInteractive =
    status === "waiting-for-user" || status === "showing-hint";

  const handleDrop = useCallback(
    (from: string, to: string) => makeMove(from, to),
    [makeMove]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Board */}
      <div className="shrink-0">
        <InteractiveBoard
          fen={fen}
          playerColor={orientation}
          onPieceDrop={handleDrop}
          disabled={!isInteractive}
        />
      </div>

      {/* Right panel */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Header */}
        <div className="bg-stone-800 rounded-xl border border-stone-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">
              Puzzle {puzzleIndex + 1} of {puzzleSet.puzzles.length}
            </h3>
            <StatusBadge status={status} />
          </div>

          <div className="flex items-center gap-3 text-sm text-stone-400 mb-3">
            <span>
              Rating: <strong className="text-stone-300">{puzzle.rating}</strong>
            </span>
            <span className="text-stone-600">|</span>
            <span>
              Moves: <strong className="text-stone-300">{playerMoveCount}</strong>
            </span>
            {attemptsUsed > 0 && (
              <>
                <span className="text-stone-600">|</span>
                <span className="text-red-400">
                  {attemptsUsed} wrong {attemptsUsed === 1 ? "attempt" : "attempts"}
                </span>
              </>
            )}
          </div>

          {/* Play as indicator */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span
              className={`w-3 h-3 rounded-full border-2 ${
                puzzle.playerColor === "white"
                  ? "bg-white border-stone-400"
                  : "bg-stone-900 border-stone-500"
              }`}
            />
            Find the best move for {puzzle.playerColor}
          </div>
        </div>

        {/* Status-specific content */}
        {status === "wrong-move" && (
          <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-4">
            <p className="text-red-300 font-medium mb-2">Not quite!</p>
            <p className="text-sm text-stone-400">
              That&apos;s not the best move here. Look again at the position.
            </p>
            <button
              onClick={retry}
              className="mt-3 px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-600 transition-colors text-sm"
            >
              Try again
            </button>
          </div>
        )}

        {status === "showing-hint" && (
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-4">
            <p className="text-amber-300 font-medium mb-1">Hint</p>
            <p className="text-sm text-stone-300">{puzzle.hint}</p>
            <button
              onClick={dismissHint}
              className="mt-3 px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-600 transition-colors text-sm"
            >
              Got it
            </button>
          </div>
        )}

        {status === "completed" && (
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-4">
            <p className="text-emerald-300 font-medium text-lg mb-2">
              Puzzle solved! 🎉
            </p>
            <p className="text-sm text-stone-300 mb-4">{puzzle.explanation}</p>
            <div className="flex gap-3">
              {puzzleIndex < puzzleSet.puzzles.length - 1 ? (
                <button
                  onClick={onNextPuzzle}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
                >
                  Next Puzzle →
                </button>
              ) : (
                <button
                  onClick={onBackToSet}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
                >
                  Set Complete! 🏆 Back to Puzzles
                </button>
              )}
              <button
                onClick={reset}
                className="px-4 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {(status === "waiting-for-user" || status === "correct-move" || status === "opponent-moving") && (
          <div className="flex items-center gap-3">
            {!hintShown && (
              <button
                onClick={showHint}
                disabled={status !== "waiting-for-user"}
                className="px-4 py-2 bg-amber-700 text-amber-100 rounded-lg hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Hint 💡
              </button>
            )}
            <button
              onClick={reset}
              className="px-4 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors text-sm"
            >
              Reset
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={onBackToSet}
            className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
          >
            ← Back to puzzles
          </button>
          {/* Puzzle selector dots */}
          <div className="flex gap-1.5 ml-auto">
            {puzzleSet.puzzles.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === puzzleIndex
                    ? "bg-emerald-500"
                    : i < puzzleIndex
                    ? "bg-emerald-800"
                    : "bg-stone-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
