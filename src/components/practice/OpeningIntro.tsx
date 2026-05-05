"use client";

import { OpeningLine } from "@/data/types";

interface OpeningIntroProps {
  opening: OpeningLine;
  onStart: () => void;
  onTest?: () => void;
  onSurprise?: () => void;
}

export default function OpeningIntro({ opening, onStart, onTest, onSurprise }: OpeningIntroProps) {
  const { history } = opening;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-sm text-stone-500 font-mono">{opening.eco}</span>
        <h1 className="text-3xl font-bold text-white mt-1">{opening.fullName}</h1>
        <p className="text-stone-400 mt-2">{opening.description}</p>
      </div>

      <div className="space-y-6">
        <section className="bg-stone-800 rounded-xl p-5 border border-stone-700">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-2">
            Origins
          </h2>
          <p className="text-stone-200 leading-relaxed">{history.origin}</p>
        </section>

        <section className="bg-stone-800 rounded-xl p-5 border border-stone-700">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-2">
            Why is it called that?
          </h2>
          <p className="text-stone-200 leading-relaxed">
            {history.nameExplanation}
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <section className="bg-stone-800 rounded-xl p-5 border border-stone-700">
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-2">
              How popular?
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              {history.popularity}
            </p>
          </section>

          <section className="bg-stone-800 rounded-xl p-5 border border-stone-700">
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-2">
              Best for
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              {history.bestFor}
            </p>
          </section>
        </div>

        <section className="bg-stone-800 rounded-xl p-5 border border-stone-700">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-2">
            Famous players
          </h2>
          <div className="flex flex-wrap gap-2">
            {history.famousPlayers.map((player) => (
              <span
                key={player}
                className="text-sm px-3 py-1 bg-stone-700 text-stone-200 rounded-full"
              >
                {player}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          <button
            onClick={onStart}
            className="bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl px-5 py-4 transition-colors text-left"
          >
            <p className="font-semibold text-base">📘 Practice with Guides</p>
            <p className="text-xs text-emerald-100 mt-1 opacity-90">
              Walk through the main line. Hints, explanations, and move arrows help you learn.
            </p>
          </button>

          {onSurprise && (
            <button
              onClick={onSurprise}
              className="bg-blue-700 hover:bg-blue-600 text-white rounded-xl px-5 py-4 transition-colors text-left"
            >
              <p className="font-semibold text-base">🎲 Surprise Mode</p>
              <p className="text-xs text-blue-100 mt-1 opacity-90">
                You play your side, the bot plays the opponent — and surprises you with random
                variants. Wrong moves get explained.
              </p>
            </button>
          )}

          {onTest && (
            <button
              onClick={onTest}
              className="bg-amber-700 hover:bg-amber-600 text-white rounded-xl px-5 py-4 transition-colors text-left"
            >
              <p className="font-semibold text-base">🎯 Test Yourself</p>
              <p className="text-xs text-amber-100 mt-1 opacity-90">
                You play every move (both sides), shuffled through main + all variants. No hints.
              </p>
            </button>
          )}
        </div>
        <p className="text-sm text-stone-500 mt-4 text-center">
          Playing as{" "}
          <span className="text-stone-300">{opening.playerColor}</span>
          {" / "}
          {opening.moves.length} moves
          {opening.variants && opening.variants.length > 0 && (
            <span> + {opening.variants.length} variants</span>
          )}
        </p>
      </div>
    </div>
  );
}
