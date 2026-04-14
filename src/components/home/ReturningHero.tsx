"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePuzzleProgress } from "@/hooks/usePuzzleProgress";
import { useProgress } from "@/hooks/useProgress";
import { getXPForNextLevel } from "@/lib/xp";
import { ALL_OPENINGS } from "@/data/openings";
import { ALL_PUZZLE_SETS } from "@/data/puzzles";

/**
 * Personalized hero that shows for returning users with progress. Displays
 * rating, level, XP bar, streak, and a quick "continue where you left off"
 * CTA based on the most recent activity.
 *
 * Hides itself for new users with no progress (BeginnerPath takes over).
 */
export default function ReturningHero() {
  const { user } = useAuth();
  const { progress, loading: puzzleLoading } = usePuzzleProgress();
  const { allProgress } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || puzzleLoading) return null;

  const hasPuzzleProgress =
    progress.totalSolved > 0 || progress.xp > 0 || progress.level > 1;
  const hasOpeningProgress = allProgress.length > 0;
  const hasAnyProgress = hasPuzzleProgress || hasOpeningProgress;

  // Let BeginnerPath handle brand new users
  if (!hasAnyProgress) return null;

  // Pick an in-progress opening for the "continue" CTA. Prefer one that's
  // started but not yet complete.
  const inProgress = allProgress.find(
    (p) => p.bestMoveReached > 0 && p.bestMoveReached < p.totalMoves,
  );
  const mostRecentOpening = inProgress
    ? ALL_OPENINGS.find((o) => o.id === inProgress.openingId)
    : null;

  // XP progress bar values
  const { needed, total, currentLevelXP } = getXPForNextLevel(progress.xp);
  const range = total - currentLevelXP;
  const filled = Math.max(0, progress.xp - currentLevelXP);
  const xpPct = range > 0 ? Math.min(100, (filled / range) * 100) : 100;

  const openingsCompleted = allProgress.filter(
    (p) => p.totalMoves > 0 && p.bestMoveReached >= p.totalMoves,
  ).length;
  const openingsTotal = ALL_OPENINGS.length;
  const puzzleSetsTotal = ALL_PUZZLE_SETS.length;

  const displayName = user?.displayName?.split(" ")[0] ?? "Player";

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-2xl border border-stone-700/50 p-6 shadow-xl">
        {/* Header row: greeting + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-1">
              Welcome back{user ? `, ${displayName}` : ""}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {progress.currentStreak >= 3
                ? `🔥 ${progress.currentStreak} in a row — keep it going!`
                : mostRecentOpening
                  ? `Pick up where you left off`
                  : `Ready for today's training?`}
            </h2>
          </div>
          {mostRecentOpening && (
            <Link
              href={`/openings/${mostRecentOpening.id}`}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm transition-colors shadow-lg"
            >
              Continue {mostRecentOpening.name}
              <span aria-hidden>→</span>
            </Link>
          )}
          {!mostRecentOpening && (
            <Link
              href="/puzzles"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm transition-colors shadow-lg"
            >
              Daily puzzles <span aria-hidden>→</span>
            </Link>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <StatTile
            label="Rating"
            value={progress.rating.toString()}
            hint="Puzzle Elo"
            accent="emerald"
          />
          <StatTile
            label="Level"
            value={`Lv.${progress.level}`}
            hint={`${needed} XP to next`}
            accent="purple"
          />
          <StatTile
            label="Solved"
            value={progress.totalSolved.toString()}
            hint={
              progress.bestStreak > 0
                ? `Best streak: ${progress.bestStreak}`
                : "Tactical wins"
            }
            accent="amber"
          />
          <StatTile
            label="Openings"
            value={`${openingsCompleted}/${openingsTotal}`}
            hint={`${puzzleSetsTotal} puzzle sets`}
            accent="blue"
          />
        </div>

        {/* XP bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span>
              Lv.{progress.level} progress — {progress.xp} XP
            </span>
            <span>
              {Math.round(xpPct)}% to Lv.{progress.level + 1}
            </span>
          </div>
          <div className="h-2 bg-stone-800 rounded-full overflow-hidden border border-stone-700/50">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-700"
              style={{ width: `${xpPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent: "emerald" | "amber" | "purple" | "blue";
}) {
  const accentMap: Record<typeof accent, string> = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    purple: "text-purple-400",
    blue: "text-blue-400",
  };

  return (
    <div className="bg-stone-900/60 rounded-xl border border-stone-700/50 p-3">
      <p className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">
        {label}
      </p>
      <p className={`text-2xl font-bold ${accentMap[accent]} leading-tight`}>
        {value}
      </p>
      <p className="text-[11px] text-stone-500 leading-tight mt-0.5 truncate">
        {hint}
      </p>
    </div>
  );
}
