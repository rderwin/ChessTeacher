"use client";

import { useState, useMemo } from "react";
import type { OpeningLine, OpeningVariant } from "@/data/types";
import { buildVariantSession } from "@/lib/engine";
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
  | { type: "drill"; variantId: string };

export default function OpeningPage({ opening }: OpeningPageProps) {
  const [mode, setMode] = useState<Mode>({ type: "intro" });
  const { getCompletionPercent } = useProgress(opening.id);
  const mainLineComplete = getCompletionPercent() >= 100;

  const variantSession = useMemo(() => {
    if (mode.type !== "variant") return null;
    return buildVariantSession(opening, mode.variant);
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

  if (mode.type === "intro") {
    return (
      <div className="px-4 py-8">
        <OpeningIntro
          opening={opening}
          onStart={() => setMode({ type: "main-line" })}
          onTest={() => setMode({ type: "test" })}
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
