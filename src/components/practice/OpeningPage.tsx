"use client";

import { useState, useMemo } from "react";
import type { OpeningLine, OpeningVariant } from "@/data/types";
import { buildVariantSession, buildSurpriseLine } from "@/lib/engine";
import { useProgress } from "@/hooks/useProgress";
import OpeningIntro from "./OpeningIntro";
import PracticeSession from "./PracticeSession";
import VariantCard from "./VariantCard";
import OpeningTest from "./OpeningTest";

interface OpeningPageProps {
  opening: OpeningLine;
}

type Mode =
  | { type: "intro" }
  | { type: "main-line" }
  | { type: "variant"; variant: OpeningVariant }
  | { type: "test" }
  | { type: "drill"; variantId: string }
  | { type: "surprise"; sessionKey: number };

export default function OpeningPage({ opening }: OpeningPageProps) {
  const [mode, setMode] = useState<Mode>({ type: "intro" });
  const { getCompletionPercent } = useProgress(opening.id);
  const mainLineComplete = getCompletionPercent() >= 100;

  const variantSession = useMemo(() => {
    if (mode.type !== "variant") return null;
    return buildVariantSession(opening, mode.variant);
  }, [mode, opening]);

  // For Surprise Mode: build a synthetic line that starts from move 1 and
  // randomly diverges into a variant at one branch point. The player has
  // NO ADVANCE WARNING which variant — they discover it as the bot plays.
  const surprise = useMemo(() => {
    if (mode.type !== "surprise") return null;
    return buildSurpriseLine(opening);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, opening]);

  if (mode.type === "test") {
    return (
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <OpeningTest opening={opening} onBack={() => setMode({ type: "intro" })} />
      </div>
    );
  }

  if (mode.type === "drill") {
    return (
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <OpeningTest
          opening={opening}
          focusVariantId={mode.variantId}
          onBack={() => setMode({ type: "intro" })}
        />
      </div>
    );
  }

  if (mode.type === "surprise" && surprise) {
    const reRoll = () =>
      setMode({ type: "surprise", sessionKey: mode.sessionKey + 1 });
    return (
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setMode({ type: "intro" })}
            className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
          >
            ← Back to {opening.name}
          </button>
          <button
            onClick={reRoll}
            className="text-sm px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            🎲 New game
          </button>
        </div>
        <div className="mb-4 bg-blue-950/30 border border-blue-800/50 rounded-xl px-4 py-3">
          <p className="text-sm text-blue-200">
            <span className="font-semibold">🎲 Surprise Mode</span> —
            play your moves. The opponent might follow the main line or
            switch to a variant at any point. No hints. Wrong moves get
            explained so you can learn what to do next time.
          </p>
        </div>
        <PracticeSession
          // sessionKey forces a fresh game on re-roll
          key={`surprise-${mode.sessionKey}`}
          opening={surprise.line}
          progressKey={`${opening.id}:surprise`}
          hideMoveGuides
          noAutoCorrect
        />
      </div>
    );
  }

  if (mode.type === "intro") {
    return (
      <div className="px-4 py-8">
        <OpeningIntro
          opening={opening}
          onStart={() => setMode({ type: "main-line" })}
          onTest={() => setMode({ type: "test" })}
          onSurprise={
            opening.variants && opening.variants.length > 0
              ? () => setMode({ type: "surprise", sessionKey: 0 })
              : undefined
          }
        />

        {/* Variants section — always shown if variants exist */}
        {opening.variants && opening.variants.length > 0 && (
          <div className="max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-bold text-white mb-2">
              Variants
            </h2>
            <p className="text-sm text-stone-400 mb-4">
              {mainLineComplete
                ? "You've mastered the main line. Now learn what to do when your opponent deviates."
                : "What if your opponent plays something different? Practice these common alternatives."}
            </p>
            <div className="bg-stone-800/30 border border-stone-700/50 rounded-lg p-3 mb-4 text-xs text-stone-400">
              <strong className="text-stone-300">Learn</strong> = guided practice with hints and explanations.
              <strong className="text-emerald-400 ml-2">Drill 🎯</strong> = test mode for muscle memory — play every move yourself, no hints.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opening.variants.map((v) => (
                <VariantCard
                  key={v.id}
                  opening={opening}
                  variant={v}
                  onLearn={() => setMode({ type: "variant", variant: v })}
                  onDrill={() => setMode({ type: "drill", variantId: v.id })}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (mode.type === "variant" && variantSession) {
    return (
      <div className="px-4 py-8">
        <button
          onClick={() => setMode({ type: "intro" })}
          className="text-sm text-stone-500 hover:text-stone-300 transition-colors mb-4"
        >
          ← Back to {opening.name}
        </button>
        <PracticeSession
          key={variantSession.line.id}
          opening={variantSession.line}
          startFen={variantSession.startFen}
          progressKey={variantSession.line.id}
        />
      </div>
    );
  }

  // Main line practice
  return (
    <div className="px-4 py-8">
      <PracticeSession
        opening={opening}
        onShowVariants={opening.variants?.length ? () => setMode({ type: "intro" }) : undefined}
      />
    </div>
  );
}
