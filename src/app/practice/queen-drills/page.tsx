"use client";

import InteractiveBoard from "@/components/board/InteractiveBoard";
import Confetti from "@/components/ui/Confetti";
import { useQueenDrill, type DrillPhase } from "@/hooks/useQueenDrill";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function QueenDrillsPage() {
  const {
    fen,
    phase,
    scenario,
    scenarioIndex,
    scenarioCount,
    feedback,
    score,
    makeMove,
    nextScenario,
    restart,
  } = useQueenDrill(10);

  const [confettiKey, setConfettiKey] = useState(0);

  const handlePieceDrop = useCallback(
    (from: string, to: string): boolean => {
      return makeMove(from, to);
    },
    [makeMove],
  );

  const orientation = scenario?.playerColor ?? "white";
  const isInteractive = phase === "waiting";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {confettiKey > 0 && <Confetti fireKey={confettiKey} />}

      <div className="mb-6">
        <Link
          href="/openings"
          className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
        >
          ← Back to openings
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2">
          Queen Attack Drills
        </h1>
        <p className="text-stone-400 mt-1">
          Face random queen attacks and learn how to handle each one. The bot
          plays annoying queen moves — you find the best response.
        </p>
      </div>

      {phase === "finished" ? (
        <FinishedScreen score={score} onRestart={() => { restart(); setConfettiKey(0); }} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Board */}
          <div className="shrink-0">
            <InteractiveBoard
              fen={fen}
              playerColor={orientation}
              onPieceDrop={handlePieceDrop}
              disabled={!isInteractive}
            />
          </div>

          {/* Right panel */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-4">
            {/* Progress */}
            <div className="bg-stone-800 border border-stone-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">
                  Scenario {scenarioIndex + 1} / {scenarioCount}
                </h3>
                <ScorePill correct={score.correct} total={score.total} />
              </div>
              <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${((scenarioIndex + (phase === "lesson" ? 1 : 0)) / scenarioCount) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Scenario context */}
            {scenario && (
              <div className="bg-stone-800 border border-stone-700 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" aria-hidden>
                    {scenario.playerColor === "black" ? "🛡️" : "⚔️"}
                  </span>
                  <h2 className="text-base font-bold text-white">
                    {scenario.name}
                  </h2>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {scenario.situation}
                </p>
                {phase === "setup" && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse" />
                    <p className="text-xs text-stone-500">
                      Setting up the position...
                    </p>
                  </div>
                )}
                {phase === "waiting" && (
                  <p className="mt-3 text-xs text-emerald-400 font-medium">
                    Your move — find the best response!
                  </p>
                )}
              </div>
            )}

            {/* Feedback */}
            {feedback && (phase === "feedback" || phase === "continuation" || phase === "lesson") && (
              <div
                className={`rounded-xl p-5 border ${
                  feedback.wasCorrect
                    ? "bg-emerald-950/30 border-emerald-700/50"
                    : "bg-red-950/30 border-red-700/50"
                } animate-in fade-in slide-in-from-right-4 duration-300`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" aria-hidden>
                    {feedback.wasCorrect ? "✅" : "❌"}
                  </span>
                  <span
                    className={`font-semibold text-sm ${
                      feedback.wasCorrect
                        ? "text-emerald-300"
                        : "text-red-300"
                    }`}
                  >
                    {feedback.wasCorrect
                      ? feedback.response.quality === "best"
                        ? "Best move!"
                        : "Good move!"
                      : feedback.response.quality === "blunder"
                        ? "Blunder!"
                        : "Not the best"}
                  </span>
                  <span className="text-sm font-bold text-white ml-auto">
                    {feedback.playedSan}
                  </span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {feedback.response.feedback}
                </p>
                {phase === "continuation" && (
                  <p className="mt-2 text-[10px] text-stone-500">
                    Showing the continuation...
                  </p>
                )}
              </div>
            )}

            {/* Key lesson + next button */}
            {phase === "lesson" && scenario && (
              <div className="bg-amber-950/30 border border-amber-700/40 rounded-xl p-5 animate-pop">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" aria-hidden>💡</span>
                  <span className="text-amber-200 font-semibold text-sm">
                    Key lesson
                  </span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  {scenario.keyLesson}
                </p>
                <button
                  onClick={() => {
                    if (scenarioIndex + 1 >= scenarioCount) {
                      setConfettiKey((k) => k + 1);
                    }
                    nextScenario();
                  }}
                  className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
                >
                  {scenarioIndex + 1 >= scenarioCount
                    ? "See results"
                    : "Next scenario →"}
                </button>
              </div>
            )}

            {/* Best responses reference (shown after feedback) */}
            {scenario && phase === "lesson" && (
              <div className="bg-stone-800/50 border border-stone-700/40 rounded-xl p-4">
                <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">
                  All responses
                </h4>
                <div className="space-y-1.5">
                  {scenario.responses.map((r) => (
                    <div
                      key={r.san}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          r.quality === "best"
                            ? "bg-emerald-400"
                            : r.quality === "good"
                              ? "bg-green-500"
                              : r.quality === "mistake"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                      />
                      <span className="font-mono font-bold text-stone-200 w-8">
                        {r.san}
                      </span>
                      <span className="text-stone-400 truncate">
                        {r.quality === "best"
                          ? "Best"
                          : r.quality === "good"
                            ? "Good"
                            : r.quality === "mistake"
                              ? "Mistake"
                              : "Blunder"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ScorePill({ correct, total }: { correct: number; total: number }) {
  if (total === 0) return null;
  const pct = Math.round((correct / total) * 100);
  return (
    <span
      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
        pct >= 70
          ? "bg-emerald-900/40 border-emerald-700/50 text-emerald-300"
          : pct >= 40
            ? "bg-yellow-900/40 border-yellow-700/50 text-yellow-300"
            : "bg-red-900/40 border-red-700/50 text-red-300"
      }`}
    >
      {correct}/{total} ({pct}%)
    </span>
  );
}

function FinishedScreen({
  score,
  onRestart,
}: {
  score: { correct: number; total: number };
  onRestart: () => void;
}) {
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const message =
    pct >= 80
      ? "Excellent! You're handling queen attacks like a boss."
      : pct >= 50
        ? "Decent! Keep practicing to lock these patterns in."
        : "These are tricky — run the drills again to build the muscle memory.";

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-gradient-to-br from-emerald-900/30 to-stone-900/80 border border-emerald-700/50 rounded-2xl p-8 text-center">
        <span className="text-5xl mb-4 block" aria-hidden>
          {pct >= 80 ? "🏆" : pct >= 50 ? "💪" : "📚"}
        </span>
        <h2 className="text-2xl font-bold text-white mb-2">Drills complete!</h2>
        <p className="text-3xl font-bold text-emerald-400 mb-1">
          {score.correct} / {score.total}
        </p>
        <p className="text-sm text-stone-400 mb-4">{pct}% accuracy</p>
        <p className="text-stone-300 mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRestart}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
          >
            Try again (new scenarios)
          </button>
          <Link
            href="/openings"
            className="px-5 py-2.5 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg font-semibold transition-colors text-center"
          >
            Back to openings
          </Link>
        </div>
      </div>
    </div>
  );
}
