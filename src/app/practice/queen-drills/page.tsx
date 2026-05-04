"use client";

import InteractiveBoard from "@/components/board/InteractiveBoard";
import Confetti from "@/components/ui/Confetti";
import { useQueenGauntlet } from "@/hooks/useQueenGauntlet";
import { usePuzzleProgress } from "@/hooks/usePuzzleProgress";
import { useToast } from "@/contexts/ToastContext";
import { useSound } from "@/hooks/useSound";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export default function QueenGauntletPage() {
  const {
    fen,
    phase,
    gauntlet,
    gauntletIndex,
    gauntletCount,
    log,
    arrows,
    stats,
    makeMove,
    nextGauntlet,
    restart,
  } = useQueenGauntlet(4);

  const [confettiKey, setConfettiKey] = useState(0);
  const logEndRef = useRef<HTMLDivElement | null>(null);
  const { show: showToast } = useToast();
  const { play: playFx } = useSound();
  const { recordPuzzleResult } = usePuzzleProgress();
  const xpAwardedRef = useRef(false);

  const handleDrop = useCallback(
    (from: string, to: string): boolean => makeMove(from, to),
    [makeMove],
  );

  // Auto-scroll log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [log.length, phase]);

  // Award XP when all gauntlets finished
  useEffect(() => {
    if (phase !== "all-finished" || xpAwardedRef.current) return;
    xpAwardedRef.current = true;

    const synthetic = {
      id: `gauntlet-${Date.now()}`,
      fen: "",
      playerColor: "white" as const,
      solution: [],
      themes: ["fork" as const],
      rating: 1000,
      difficulty: "intermediate" as const,
      hint: "",
      explanation: "",
      source: "handcrafted" as const,
    };
    recordPuzzleResult(synthetic, true, 1, 0).then((feedback) => {
      const xpMsg = feedback.xpEarned > 0 ? `+${feedback.xpEarned} XP` : "";
      showToast({
        kind: "success",
        title: `Queen gauntlets complete! ${xpMsg}`,
        description: `${stats.correct} correct moves, ${stats.firstTry} on first try.`,
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
      setConfettiKey((k) => k + 1);
    });
  }, [phase, stats, recordPuzzleResult, showToast, playFx]);

  const orientation = gauntlet?.playerColor ?? "white";
  const isInteractive = phase === "waiting" || phase === "wrong";

  if (phase === "all-finished") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        {confettiKey > 0 && <Confetti fireKey={confettiKey} />}
        <div className="bg-gradient-to-br from-emerald-900/30 to-stone-900/80 border border-emerald-700/50 rounded-2xl p-8 text-center">
          <span className="text-5xl mb-4 block" aria-hidden>🏆</span>
          <h2 className="text-2xl font-bold text-white mb-2">
            All gauntlets complete!
          </h2>
          <p className="text-3xl font-bold text-emerald-400 mb-1">
            {stats.firstTry} / {stats.totalTurns}
          </p>
          <p className="text-sm text-stone-400 mb-6">moves on first try</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                restart();
                xpAwardedRef.current = false;
                setConfettiKey(0);
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
            >
              Play again (new gauntlets)
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link
          href="/drills"
          className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
        >
          ← Back to drills
        </Link>
        <h1 className="text-2xl font-bold text-white mt-1">
          Queen Gauntlet ♛
        </h1>
        <p className="text-sm text-stone-400">
          Play against an opponent doing a queen attack. Coach evaluates every
          move — wrong moves undo so you can try again.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Board */}
        <div className="shrink-0">
          <InteractiveBoard
            fen={fen}
            playerColor={orientation}
            onPieceDrop={handleDrop}
            disabled={!isInteractive}
            arrows={arrows}
          />
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-[300px] flex flex-col gap-4">
          {/* Header */}
          <div className="bg-stone-800 border border-stone-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-base font-bold text-white">
                  {gauntlet?.name ?? "Loading..."}
                </h2>
                <p className="text-xs text-stone-500">
                  Game {gauntletIndex + 1} of {gauntletCount} · Playing{" "}
                  {gauntlet?.playerColor === "black" ? "Black" : "White"}
                </p>
              </div>
              {stats.totalTurns > 0 && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-900 border border-stone-700 text-stone-300">
                  {stats.firstTry}/{stats.totalTurns} ⭐
                </span>
              )}
            </div>
            {gauntlet && (
              <p className="text-sm text-stone-300 leading-relaxed">
                {gauntlet.description}
              </p>
            )}
          </div>

          {/* Status indicator */}
          <div className="bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5">
            <p className="text-xs text-stone-400">
              {phase === "setup" && (
                <>
                  <span className="inline-block w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse mr-1.5 align-middle" />
                  Setting up the position...
                </>
              )}
              {phase === "waiting" && (
                <span className="text-emerald-400 font-medium">
                  Your move — make it on the board.
                </span>
              )}
              {phase === "wrong" && (
                <span className="text-red-400 font-medium">
                  Try a different move — see the feedback below.
                </span>
              )}
              {phase === "correct" && "Great move! Watch what the opponent does..."}
              {phase === "bot-moving" && (
                <>
                  <span className="inline-block w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse mr-1.5 align-middle" />
                  Opponent is moving...
                </>
              )}
              {phase === "done" && "Gauntlet complete!"}
            </p>
          </div>

          {/* Scrolling log */}
          <div className="bg-stone-800 border border-stone-700 rounded-xl flex flex-col min-h-0 max-h-[420px]">
            <div className="px-4 pt-3 pb-2 border-b border-stone-700/60 shrink-0">
              <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                Move log
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
              {log.length === 0 && (
                <p className="text-sm text-stone-600 italic px-1">
                  The game will start in a moment...
                </p>
              )}
              {log.map((entry) => (
                <LogEntryCard key={entry.id} entry={entry} />
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          {/* Done — next gauntlet CTA */}
          {phase === "done" && gauntlet && (
            <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-xl p-5 animate-pop">
              <p className="text-emerald-200 font-semibold mb-2">
                ✓ Gauntlet complete!
              </p>
              <p className="text-sm text-stone-300 leading-relaxed mb-4">
                {gauntlet.conclusion}
              </p>
              <button
                onClick={nextGauntlet}
                className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
              >
                {gauntletIndex + 1 >= gauntletCount
                  ? "See final results →"
                  : "Next opponent →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LogEntryCard({ entry }: { entry: { kind: string; san?: string; text: string } }) {
  if (entry.kind === "context") {
    return (
      <div className="px-2 py-1.5 text-xs text-stone-500 italic border-l-2 border-stone-700">
        {entry.text}
      </div>
    );
  }
  if (entry.kind === "bot-move") {
    return (
      <div className="bg-stone-900/60 border border-stone-700/40 rounded-lg px-3 py-2 animate-in fade-in slide-in-from-right-4 duration-300">
        <p className="text-xs text-stone-400 leading-snug">
          <span className="font-mono font-bold text-stone-200 mr-1">
            {entry.san}
          </span>
          {entry.text.replace(/^Opponent (played |: )/, "")}
        </p>
      </div>
    );
  }
  if (entry.kind === "player-good") {
    return (
      <div className="bg-emerald-950/30 border border-emerald-700/40 rounded-lg px-3 py-2 animate-in fade-in slide-in-from-right-4 duration-300">
        <p className="text-sm text-stone-200 leading-snug">
          <span className="font-mono font-bold text-emerald-400 mr-1">
            {entry.san}
          </span>
          {entry.text}
        </p>
      </div>
    );
  }
  // player-wrong
  return (
    <div className="bg-red-950/30 border border-red-700/40 rounded-lg px-3 py-2 animate-in fade-in slide-in-from-right-4 duration-300">
      <p className="text-sm text-stone-200 leading-snug">
        <span className="font-mono font-bold text-red-400 mr-1">
          {entry.san}
        </span>
        {entry.text}
      </p>
    </div>
  );
}
