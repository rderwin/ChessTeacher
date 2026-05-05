"use client";

import { useCallback, useEffect } from "react";
import type { OpeningLine } from "@/data/types";
import InteractiveBoard from "@/components/board/InteractiveBoard";
import { useOpeningTest } from "@/hooks/useOpeningTest";

interface Props {
  opening: OpeningLine;
  onBack: () => void;
  /** If set, drill ONLY this variant (no random shuffling). */
  focusVariantId?: string;
}

export default function OpeningTest({ opening, onBack, focusVariantId }: Props) {
  const test = useOpeningTest(opening, focusVariantId);

  // Auto-start the first line
  useEffect(() => {
    if (test.status === "picking") {
      test.startNextLine();
    }
  }, [test.status]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDrop = useCallback(
    (from: string, to: string) => test.makeMove(from, to),
    [test.makeMove] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const orientation = opening.playerColor === "white" ? "white" : "black";
  // Keep board interactive in "wrong" state too — player can play another
  // move immediately to retry without waiting for the auto-retry timer.
  const isInteractive = test.status === "playing" || test.status === "wrong";
  // Test mode = drill BOTH sides (player plays every move for muscle memory)
  const allowAnyMover = true;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Board */}
      <div className="shrink-0">
        <InteractiveBoard
          fen={test.fen}
          playerColor={orientation}
          onPieceDrop={handleDrop}
          disabled={!isInteractive}
          allowAnyMover={allowAnyMover}
        />
      </div>

      {/* Right panel */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Header */}
        <div className="bg-stone-800 rounded-xl border border-stone-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white">
              Test Mode — {opening.name}
            </h2>
            <span className="text-xs px-2 py-1 bg-amber-900/50 text-amber-300 rounded-full font-medium">
              No hints!
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-stone-400">
              Line: <strong className="text-white">{test.lineNumber}/{test.totalLines}</strong>
            </span>
            <span className="text-stone-400">
              Current: <strong className="text-white">{test.lineName}</strong>
            </span>
          </div>

          {/* Score bar */}
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span className="text-emerald-400">
              ✓ {test.score} correct
            </span>
            <span className="text-red-400">
              ✗ {test.mistakes} wrong
            </span>
            <span className={`font-bold ${test.accuracy >= 80 ? "text-emerald-400" : test.accuracy >= 50 ? "text-yellow-400" : "text-red-400"}`}>
              {test.accuracy}% accuracy
            </span>
          </div>
        </div>

        {/* Status panels */}
        {test.status === "playing" && (
          <div className="bg-stone-800 rounded-xl border border-stone-700 p-4">
            <p className="text-sm text-stone-300">
              Find the best move for {opening.playerColor}. No guides — you&apos;re on your own!
            </p>
          </div>
        )}

        {test.status === "opponent" && (
          <div className="bg-stone-800 rounded-xl border border-stone-700 p-4">
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Opponent responding...
            </div>
          </div>
        )}

        {test.status === "wrong" && (
          <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-4 animate-in fade-in duration-200">
            <p className="text-red-300 font-medium mb-2">
              You played <span className="font-bold">{test.wrongSan}</span> — the best move was{" "}
              <span className="font-bold text-emerald-300">{test.expectedSan}</span>
            </p>

            {test.wrongFeedback && (
              <div className="bg-stone-800/50 rounded-lg p-3 mb-2 border border-stone-700/50">
                <p className="text-xs text-stone-500 mb-1">Why not {test.wrongSan}?</p>
                <p className="text-sm text-stone-300">{test.wrongFeedback}</p>
              </div>
            )}

            {test.expectedWhy && (
              <div className="bg-stone-800/50 rounded-lg p-3 mb-2 border border-stone-700/50">
                <p className="text-xs text-stone-500 mb-1">Why {test.expectedSan}?</p>
                <p className="text-sm text-stone-300">{test.expectedWhy}</p>
              </div>
            )}

            <p className="text-xs text-stone-500 italic mt-2 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse" />
              Auto-retrying in a moment — or just play another move now
            </p>
          </div>
        )}

        {test.status === "line-done" && (
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-4 animate-pop">
            <p className="text-emerald-300 font-medium text-lg mb-2">
              Line complete! ✓
            </p>
            <p className="text-sm text-stone-400 mb-2">
              Finished &quot;{test.lineName}&quot;
              {test.lineNumber < test.totalLines && ` — ${test.totalLines - test.lineNumber} more to go`}
            </p>
            <p className="text-xs text-stone-500 italic flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              {test.lineNumber < test.totalLines
                ? "Loading next line..."
                : "Loading results..."}
            </p>
          </div>
        )}

        {test.status === "test-done" && (
          <div className="bg-stone-800 rounded-xl border border-stone-700 p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              {test.accuracy >= 90 ? "🏆 Mastered!" : test.accuracy >= 70 ? "🌟 Great job!" : test.accuracy >= 50 ? "👍 Getting there!" : "📚 Keep practicing!"}
            </h3>
            <p className="text-lg text-stone-300 mb-1">
              {test.score} / {test.score + test.mistakes} correct ({test.accuracy}%)
            </p>
            <p className="text-sm text-stone-500 mb-4">
              Tested on {test.totalLines} line{test.totalLines > 1 ? "s" : ""}: main line + variants
            </p>

            {test.accuracy < 90 && (
              <p className="text-sm text-stone-400 mb-4">
                {test.accuracy < 50
                  ? "Go back to practice mode and review the lines. Focus on understanding WHY each move is played."
                  : test.accuracy < 70
                  ? "You know the moves but some are shaky. Practice the variants — that's where the tricky decisions are."
                  : "Almost there! The moves you missed are probably in the variants. Review those and try again."}
              </p>
            )}

            <div className="flex gap-3 justify-center">
              <button
                onClick={test.restart}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
              >
                Test Again
              </button>
              <button
                onClick={onBack}
                className="px-5 py-2.5 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors"
              >
                Back to Opening
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {test.status !== "test-done" && (
          <button
            onClick={onBack}
            className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
          >
            ← Back to {opening.name}
          </button>
        )}
      </div>
    </div>
  );
}
