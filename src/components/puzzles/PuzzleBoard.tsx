"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Puzzle, PuzzleSet } from "@/data/types";
import InteractiveBoard from "@/components/board/InteractiveBoard";
import { usePuzzleSession, type PuzzleStatus } from "@/hooks/usePuzzleSession";
import { useSound } from "@/hooks/useSound";
import { usePuzzleProgress, type PuzzleResultFeedback } from "@/hooks/usePuzzleProgress";
import { getAchievement } from "@/data/achievements";
import { getXPForNextLevel } from "@/lib/xp";

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
    solveTimeMs,
    makeMove,
    retry,
    showHint,
    dismissHint,
    reset,
  } = usePuzzleSession(puzzle);

  const { play: playFx } = useSound();
  const { progress, recordPuzzleResult } = usePuzzleProgress();
  const [lastResult, setLastResult] = useState<PuzzleResultFeedback | null>(null);
  const resultRecordedRef = useRef(false);
  const prevStatusRef = useRef<PuzzleStatus>(status);

  // Reset result tracking when puzzle changes
  useEffect(() => {
    resultRecordedRef.current = false;
    setLastResult(null);
  }, [puzzleIndex]);

  useEffect(() => {
    const prev = prevStatusRef.current;
    prevStatusRef.current = status;
    if (prev === status) return;

    if (status === "correct-move") playFx("correct");
    else if (status === "wrong-move") playFx("wrong");
    else if (status === "completed") {
      playFx("complete");

      // Record puzzle result
      if (!resultRecordedRef.current) {
        resultRecordedRef.current = true;
        const isLastPuzzle = puzzleIndex === puzzleSet.puzzles.length - 1;
        const perfectSet = isLastPuzzle && attemptsUsed === 0;

        recordPuzzleResult(puzzle, true, attemptsUsed + 1, solveTimeMs ?? 0, {
          perfectSet,
        }).then((feedback) => {
          setLastResult(feedback);
          if (feedback.newAchievements.length > 0) {
            playFx("achievement");
          } else if (feedback.leveledUp) {
            playFx("levelup");
          }
        });
      }
    }
  }, [status, playFx, puzzle, attemptsUsed, solveTimeMs, puzzleIndex, puzzleSet.puzzles.length, recordPuzzleResult]);

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
              Puzzle: <strong className="text-stone-300">{puzzle.rating}</strong>
            </span>
            <span className="text-stone-600">|</span>
            <span>
              You: <strong className="text-stone-300">{progress.rating}</strong>
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
            <p className="text-sm text-stone-300 mb-3">{puzzle.explanation}</p>

            {/* XP / Rating / Level feedback */}
            {lastResult && (
              <div className="mb-4 space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {lastResult.xpEarned > 0 && (
                    <span className="px-2.5 py-1 bg-amber-900/40 border border-amber-700/50 rounded-lg text-amber-300 font-medium">
                      +{lastResult.xpEarned} XP
                    </span>
                  )}
                  <span
                    className={`px-2.5 py-1 rounded-lg font-medium ${
                      lastResult.ratingDelta >= 0
                        ? "bg-emerald-900/40 border border-emerald-700/50 text-emerald-300"
                        : "bg-red-900/40 border border-red-700/50 text-red-300"
                    }`}
                  >
                    Rating: {lastResult.newRating}{" "}
                    ({lastResult.ratingDelta >= 0 ? "+" : ""}
                    {lastResult.ratingDelta})
                  </span>
                  {lastResult.leveledUp && (
                    <span className="px-2.5 py-1 bg-purple-900/40 border border-purple-700/50 rounded-lg text-purple-300 font-medium">
                      Level up! Lv.{lastResult.newLevel}
                    </span>
                  )}
                </div>

                {/* XP progress bar */}
                {(() => {
                  const { needed, total, currentLevelXP } = getXPForNextLevel(
                    progress.xp,
                  );
                  const range = total - currentLevelXP;
                  const filled = progress.xp - currentLevelXP;
                  const pct = range > 0 ? Math.min(100, (filled / range) * 100) : 100;
                  return (
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span>Lv.{progress.level}</span>
                        <span>{needed} XP to next level</span>
                      </div>
                      <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* New achievements */}
                {lastResult.newAchievements.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {lastResult.newAchievements.map((id) => {
                      const def = getAchievement(id);
                      if (!def) return null;
                      return (
                        <div
                          key={id}
                          className="flex items-center gap-2 px-3 py-2 bg-yellow-900/30 border border-yellow-700/50 rounded-lg"
                        >
                          <span className="text-lg">{def.icon}</span>
                          <div>
                            <p className="text-yellow-300 font-medium text-sm">
                              {def.name}
                            </p>
                            <p className="text-xs text-stone-400">
                              {def.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Streak display */}
            {progress.currentStreak >= 3 && (
              <p className="text-sm text-amber-400 mb-2">
                🔥 {progress.currentStreak} in a row! Keep it going!
              </p>
            )}

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
