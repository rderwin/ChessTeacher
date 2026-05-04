"use client";

import InteractiveBoard from "@/components/board/InteractiveBoard";
import Confetti from "@/components/ui/Confetti";
import { useQueenDrill } from "@/hooks/useQueenDrill";
import { usePuzzleProgress } from "@/hooks/usePuzzleProgress";
import { useToast } from "@/contexts/ToastContext";
import { useSound } from "@/hooks/useSound";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export default function QueenDrillsPage() {
  const {
    fen,
    phase,
    scenario,
    scenarioIndex,
    scenarioCount,
    attempts,
    score,
    arrows,
    makeMove,
    nextScenario,
    restart,
  } = useQueenDrill(10);

  const [confettiKey, setConfettiKey] = useState(0);
  const logEndRef = useRef<HTMLDivElement | null>(null);
  const { show: showToast } = useToast();
  const { play: playFx } = useSound();
  const { progress, recordPuzzleResult } = usePuzzleProgress();
  const xpAwardedRef = useRef(false);

  // Award XP when drills are finished
  useEffect(() => {
    if (phase !== "finished" || xpAwardedRef.current) return;
    xpAwardedRef.current = true;

    // Award XP for each correct drill as if it were a puzzle
    // Use a synthetic puzzle object just for the XP/progress system
    const drillsCompleted = score.correct;
    if (drillsCompleted > 0) {
      const syntheticPuzzle = {
        id: `drill-queen-${Date.now()}`,
        fen: "",
        playerColor: "white" as const,
        solution: [],
        themes: ["fork" as const],
        rating: 800,
        difficulty: "beginner" as const,
        hint: "",
        explanation: "",
        source: "handcrafted" as const,
      };
      recordPuzzleResult(
        syntheticPuzzle,
        true,
        1,
        0,
      ).then((feedback) => {
        const xpMsg = feedback.xpEarned > 0 ? `+${feedback.xpEarned} XP` : "";
        showToast({
          kind: "success",
          title: `Drills complete! ${xpMsg}`,
          description: `${score.correct}/${score.total} correct, ${score.firstTry} on first try.`,
          icon: "🎯",
        });
        if (feedback.leveledUp) {
          playFx("levelup");
          showToast({
            kind: "levelup",
            title: `Level up! Lv.${feedback.newLevel}`,
            icon: "⭐",
          });
        }
      });
    }
  }, [phase, score, recordPuzzleResult, showToast, playFx]);

  const handlePieceDrop = useCallback(
    (from: string, to: string): boolean => {
      return makeMove(from, to);
    },
    [makeMove],
  );

  // Auto-scroll log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [attempts.length, phase]);

  const orientation = scenario?.playerColor ?? "white";
  const isInteractive = phase === "waiting" || phase === "wrong";
  const latestAttempt = attempts[attempts.length - 1] ?? null;

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
          Queen Attack Drills ♛
        </h1>
        <p className="text-stone-400 mt-1">
          A bot plays annoying queen moves. Find the best response — if you get
          it wrong, you&apos;ll see what you missed and try again.
        </p>
      </div>

      {phase === "finished" ? (
        <FinishedScreen
          score={score}
          onRestart={() => {
            restart();
            setConfettiKey(0);
            xpAwardedRef.current = false;
          }}
        />
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Board */}
          <div className="shrink-0">
            <InteractiveBoard
              fen={fen}
              playerColor={orientation}
              onPieceDrop={handlePieceDrop}
              disabled={!isInteractive}
              arrows={arrows}
            />
          </div>

          {/* Right panel */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-4">
            {/* Progress bar */}
            <div className="bg-stone-800 border border-stone-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">
                  Drill {scenarioIndex + 1} / {scenarioCount}
                </h3>
                {score.total > 0 && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-stone-900 border-stone-700 text-stone-300">
                    {score.correct}/{score.total} ✓
                    {score.firstTry > 0 && (
                      <span className="text-emerald-400 ml-1">
                        ({score.firstTry} first try)
                      </span>
                    )}
                  </span>
                )}
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
                  <span className="text-lg" aria-hidden>♛</span>
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
                      Setting up position...
                    </p>
                  </div>
                )}
                {phase === "waiting" && attempts.length === 0 && (
                  <p className="mt-3 text-sm text-emerald-400 font-medium">
                    ⬆ Your move — find the best response.
                  </p>
                )}
              </div>
            )}

            {/* Scrolling attempt log */}
            <div className="bg-stone-800 border border-stone-700 rounded-xl flex flex-col min-h-0 max-h-[340px]">
              <div className="px-4 pt-3 pb-2 border-b border-stone-700/60 shrink-0">
                <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                  {phase === "wrong"
                    ? "Try again — look at the red arrows on the board"
                    : phase === "correct" || phase === "continuation"
                      ? "Nice — watch the continuation"
                      : phase === "lesson"
                        ? "Key takeaway"
                        : "Your attempts"}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
                {attempts.length === 0 && phase !== "lesson" && (
                  <p className="text-sm text-stone-600 italic">
                    Make a move on the board...
                  </p>
                )}
                {attempts.map((a, i) => (
                  <AttemptCard key={i} attempt={a} scenario={scenario} />
                ))}

                {/* Correct answer feedback */}
                {(phase === "correct" || phase === "continuation") &&
                  latestAttempt?.wasCorrect && (
                    <div className="bg-emerald-950/30 border border-emerald-700/40 rounded-lg px-3 py-2.5 animate-in fade-in slide-in-from-right-4 duration-300">
                      <p className="text-sm text-emerald-200 font-medium mb-1">
                        {latestAttempt.response.quality === "best"
                          ? "✅ Best move!"
                          : "✅ Good move!"}
                      </p>
                      <p className="text-sm text-stone-300 leading-relaxed">
                        {latestAttempt.response.feedback}
                      </p>
                      {phase === "continuation" && (
                        <p className="mt-2 text-[10px] text-stone-500 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse" />
                          Showing the continuation...
                        </p>
                      )}
                    </div>
                  )}

                {/* Key lesson */}
                {phase === "lesson" && scenario && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="bg-amber-950/30 border border-amber-700/40 rounded-lg px-3 py-2.5">
                      <p className="text-xs text-amber-300 font-medium mb-1">
                        💡 Lesson
                      </p>
                      <p className="text-sm text-stone-300 leading-relaxed">
                        {scenario.keyLesson}
                      </p>
                    </div>

                    {/* All responses reference */}
                    <div className="bg-stone-900/50 border border-stone-700/30 rounded-lg px-3 py-2.5">
                      <p className="text-[10px] text-stone-500 uppercase tracking-wider font-medium mb-1.5">
                        All responses
                      </p>
                      {scenario.responses
                        .filter((r) => r.quality === "best" || r.quality === "good")
                        .map((r) => (
                          <p key={r.san} className="text-xs text-stone-400 mb-0.5">
                            <span className="font-bold text-emerald-400">
                              {r.san}
                            </span>{" "}
                            — {r.quality === "best" ? "best" : "good"}
                          </p>
                        ))}
                    </div>

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
                        : "Next drill →"}
                    </button>
                  </div>
                )}

                <div ref={logEndRef} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Shows a single wrong-move attempt in the log. */
function AttemptCard({
  attempt,
  scenario,
}: {
  attempt: { san: string; response: { quality: string; feedback: string }; wasCorrect: boolean };
  scenario: { threat: string } | null;
}) {
  if (attempt.wasCorrect) return null; // Correct moves are shown in the main feedback panel

  return (
    <div className="bg-red-950/30 border border-red-700/40 rounded-lg px-3 py-2.5 animate-in fade-in slide-in-from-right-4 duration-300">
      <p className="text-xs text-red-300 font-medium mb-1">
        ❌ {attempt.san} — not quite
      </p>
      <p className="text-sm text-stone-300 leading-relaxed">
        {attempt.response.feedback}
      </p>
      {scenario?.threat && (
        <p className="mt-1.5 text-xs text-red-200/80 leading-relaxed">
          ⚠️ {scenario.threat}
        </p>
      )}
      <p className="mt-1.5 text-xs text-stone-500">
        Try again — the red arrows on the board show the threat.
      </p>
    </div>
  );
}

function FinishedScreen({
  score,
  onRestart,
}: {
  score: { correct: number; firstTry: number; total: number };
  onRestart: () => void;
}) {
  const pct =
    score.total > 0 ? Math.round((score.firstTry / score.total) * 100) : 0;
  const message =
    pct >= 80
      ? "Excellent! You know how to handle queen attacks."
      : pct >= 50
        ? "Getting there — run the drills again to lock these in."
        : "These are tricky! The more you practice, the easier they get.";

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
        <p className="text-sm text-stone-400 mb-1">scenarios solved</p>
        {score.firstTry > 0 && (
          <p className="text-sm text-amber-400">
            ⭐ {score.firstTry} on first try ({pct}%)
          </p>
        )}
        <p className="text-stone-300 mt-4 mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRestart}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
          >
            New drills (randomized)
          </button>
          <Link
            href="/drills"
            className="px-5 py-2.5 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg font-semibold transition-colors text-center"
          >
            Back to drills
          </Link>
        </div>
      </div>
    </div>
  );
}
