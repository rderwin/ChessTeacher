"use client";

import { useState } from "react";
import { ENDGAME_LESSONS, type EndgameLesson } from "@/data/endgames";
import EndgamePractice from "@/components/endgames/EndgamePractice";

const IMPOSSIBLE_ENDINGS = [
  "King vs King",
  "King & Bishop vs King",
  "King & Knight vs King",
  "King & Bishop vs King & Bishop (same color)",
];

export default function EndgamesPage() {
  const [activeLesson, setActiveLesson] = useState<EndgameLesson | null>(null);

  if (activeLesson) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <EndgamePractice
          key={activeLesson.id}
          lesson={activeLesson}
          onBack={() => setActiveLesson(null)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Endgame Practice</h1>
        <p className="text-stone-400 text-lg">
          Learn how to convert winning endgames into checkmate — practice against the engine until you can do it every time.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Checkmate Techniques</h2>
        <div className="grid gap-3">
          {ENDGAME_LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className="w-full text-left bg-stone-800 rounded-xl p-5 border border-stone-700 hover:border-stone-500 transition-all group"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-stone-400">{lesson.description}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <span className="text-xs text-stone-500">
                    Par: {lesson.parMoves} moves
                  </span>
                  <span className="text-xs text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">
                    Practice →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Impossible Endings</h2>
        <p className="text-stone-400 text-sm mb-4">
          These endings are automatic draws — neither side can force checkmate no matter what.
          Recognizing them saves you from playing on in a hopeless position.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {IMPOSSIBLE_ENDINGS.map((ending) => (
            <div
              key={ending}
              className="bg-stone-800/50 rounded-lg p-4 border border-stone-700/50 flex items-center gap-3"
            >
              <span className="text-stone-500 text-lg">=</span>
              <span className="text-sm text-stone-300">{ending}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
