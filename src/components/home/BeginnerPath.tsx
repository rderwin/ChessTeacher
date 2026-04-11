"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STEPS = [
  {
    step: 1,
    title: "Learn Your First Opening",
    description: "Start with the Italian Game — the most natural way to begin a chess game. Every move teaches a principle.",
    href: "/openings/italian-game",
    emoji: "♟️",
    cta: "Start Learning",
  },
  {
    step: 2,
    title: "Solve Some Puzzles",
    description: "Find checkmate in one move. Simple positions, huge satisfaction. Sound effects and XP included.",
    href: "/puzzles/mate-in-one",
    emoji: "🧩",
    cta: "Try Puzzles",
  },
  {
    step: 3,
    title: "Play Against a Bot",
    description: "Take on an easy bot with a silly dog coach cheering you on (or barking when you blunder).",
    href: "/trainer",
    emoji: "🐕",
    cta: "Play Now",
  },
];

/**
 * Shows a guided 3-step beginner path for new users.
 * Hides itself once the user has any progress saved.
 */
export default function BeginnerPath() {
  const [hasProgress, setHasProgress] = useState(true); // default hidden to avoid flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for any progress indicators
    const openingProgress = localStorage.getItem("chessteacher_progress");
    const puzzleProgress = localStorage.getItem("chessteacher_puzzle_progress");

    const hasOpenings = openingProgress && openingProgress !== "[]" && openingProgress !== "{}";
    const hasPuzzles = puzzleProgress && puzzleProgress !== "{}";

    setHasProgress(!!(hasOpenings || hasPuzzles));
  }, []);

  // Don't render anything until client-side check is done (avoid hydration mismatch)
  if (!mounted || hasProgress) return null;

  return (
    <div className="mb-10">
      <div className="mb-4">
        <span className="text-sm font-medium text-emerald-400 uppercase tracking-wider">
          New to chess?
        </span>
        <h2 className="text-lg text-white font-semibold mt-1">
          Start here — 3 steps to get going
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        {STEPS.map((step) => (
          <Link
            key={step.step}
            href={step.href}
            className="group bg-emerald-950/30 rounded-xl p-5 border border-emerald-800/30 hover:border-emerald-600/50 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{step.emoji}</span>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-950 px-2 py-0.5 rounded-full">
                STEP {step.step}
              </span>
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">
              {step.title}
            </h3>
            <p className="text-xs text-stone-400 mb-3">{step.description}</p>
            <span className="text-xs font-medium text-emerald-400 group-hover:text-emerald-300">
              {step.cta} →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-4 text-xs text-stone-600 text-center">
        Or explore everything below
      </div>
    </div>
  );
}
