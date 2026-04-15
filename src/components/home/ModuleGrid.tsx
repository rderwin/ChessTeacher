"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { usePuzzleProgress } from "@/hooks/usePuzzleProgress";
import { ALL_OPENINGS } from "@/data/openings";
import { ALL_PUZZLE_SETS } from "@/data/puzzles";

interface ModuleCard {
  id: string;
  title: string;
  href: string;
  description: string;
  icon: string;
  colorClass: string;
}

const MODULES: ModuleCard[] = [
  {
    id: "play",
    title: "Play Online",
    href: "/play",
    description:
      "Challenge a friend to a real-time game. Create a room and share the link — they'll join as Black.",
    icon: "🌐",
    colorClass: "from-cyan-600/10 to-sky-700/10 hover:border-cyan-500/40",
  },
  {
    id: "trainer",
    title: "Coach Mode",
    href: "/trainer",
    description:
      "Play against bots while a furry coach watches every move — and yells at you when you blunder.",
    icon: "🐕",
    colorClass: "from-amber-600/10 to-orange-700/10 hover:border-amber-500/40",
  },
  {
    id: "puzzles",
    title: "Puzzles",
    href: "/puzzles",
    description:
      "Sharpen your tactical vision with themed puzzle sets — forks, pins, mates, and more.",
    icon: "🧩",
    colorClass: "from-emerald-600/10 to-green-700/10 hover:border-emerald-500/40",
  },
  {
    id: "openings",
    title: "Openings",
    href: "/openings",
    description:
      "Master chess openings through interactive practice. Play the moves and understand why each one matters.",
    icon: "♟️",
    colorClass: "from-blue-600/10 to-indigo-700/10 hover:border-blue-500/40",
  },
  {
    id: "analyze",
    title: "Analyze",
    href: "/analyze",
    description:
      "Paste a PGN to replay any game with Stockfish analysis, move classification, and explanations.",
    icon: "🔍",
    colorClass: "from-purple-600/10 to-fuchsia-700/10 hover:border-purple-500/40",
  },
  {
    id: "endgames",
    title: "Endgames",
    href: "/endgames",
    description:
      "Practice essential checkmates (K+Q, K+R, ladder mate) against Stockfish until you can do them every time.",
    icon: "♔",
    colorClass: "from-rose-600/10 to-red-700/10 hover:border-rose-500/40",
  },
  {
    id: "glossary",
    title: "Glossary",
    href: "/glossary",
    description:
      "Look up chess terms — forks, pins, fianchetto, en passant, and 25+ concepts explained simply.",
    icon: "📖",
    colorClass: "from-stone-500/10 to-stone-700/10 hover:border-stone-400/40",
  },
];

export default function ModuleGrid() {
  const [mounted, setMounted] = useState(false);
  const { allProgress } = useProgress();
  const { progress: puzzleProgress } = usePuzzleProgress();

  useEffect(() => {
    setMounted(true);
  }, []);

  const openingsCompleted = mounted
    ? allProgress.filter(
        (p) => p.totalMoves > 0 && p.bestMoveReached >= p.totalMoves,
      ).length
    : 0;
  const openingsTotal = ALL_OPENINGS.length;
  const puzzleSetsTotal = ALL_PUZZLE_SETS.length;

  const progressFor = (id: string): { label: string; percent: number } | null => {
    if (!mounted) return null;
    if (id === "openings") {
      const pct = Math.round((openingsCompleted / openingsTotal) * 100);
      return { label: `${openingsCompleted}/${openingsTotal} mastered`, percent: pct };
    }
    if (id === "puzzles") {
      const solved = puzzleProgress.totalSolved;
      return {
        label: solved > 0 ? `${solved} solved · ${puzzleSetsTotal} sets` : `${puzzleSetsTotal} sets`,
        percent: Math.min(100, Math.round((solved / 50) * 100)),
      };
    }
    return null;
  };

  return (
    <div>
      <h2 className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-3">
        All modules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MODULES.map((mod) => {
          const prog = progressFor(mod.id);
          return (
            <Link
              key={mod.id}
              href={mod.href}
              className={`group bg-gradient-to-br ${mod.colorClass} bg-stone-800/40 rounded-xl p-5 border border-stone-700/60 transition-all hover:bg-stone-800/70`}
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl leading-none shrink-0" aria-hidden>
                  {mod.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-stone-400 mt-1 leading-snug">
                    {mod.description}
                  </p>
                </div>
              </div>
              {prog && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span>{prog.label}</span>
                    {prog.percent > 0 && <span>{prog.percent}%</span>}
                  </div>
                  <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
