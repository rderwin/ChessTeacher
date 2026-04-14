"use client";

import { OpeningLine } from "@/data/types";

interface OpeningIntroProps {
  opening: OpeningLine;
  onStart: () => void;
  onTest?: () => void;
}

export default function OpeningIntro({ opening, onStart, onTest }: OpeningIntroProps) {
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

      <div className="mt-8 text-center">
        <div className="flex gap-3 justify-center">
          <button
            onClick={onStart}
            className="px-8 py-3.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-colors text-lg font-medium"
          >
            Practice with Guides
          </button>
          {onTest && (
            <button
              onClick={onTest}
              className="px-8 py-3.5 bg-amber-700 text-white rounded-xl hover:bg-amber-600 transition-colors text-lg font-medium"
            >
              Test Yourself
            </button>
          )}
        </div>
        <p className="text-sm text-stone-500 mt-3">
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
