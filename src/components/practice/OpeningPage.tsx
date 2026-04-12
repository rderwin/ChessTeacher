"use client";

import { useState, useMemo } from "react";
import type { OpeningLine, OpeningVariant } from "@/data/types";
import { buildVariantSession } from "@/lib/engine";
import { useProgress } from "@/hooks/useProgress";
import OpeningIntro from "./OpeningIntro";
import PracticeSession from "./PracticeSession";
import VariantCard from "./VariantCard";

interface OpeningPageProps {
  opening: OpeningLine;
}

type Mode =
  | { type: "intro" }
  | { type: "main-line" }
  | { type: "variant"; variant: OpeningVariant };

export default function OpeningPage({ opening }: OpeningPageProps) {
  const [mode, setMode] = useState<Mode>({ type: "intro" });
  const { getCompletionPercent } = useProgress(opening.id);
  const mainLineComplete = getCompletionPercent() >= 100;

  const variantSession = useMemo(() => {
    if (mode.type !== "variant") return null;
    return buildVariantSession(opening, mode.variant);
  }, [mode, opening]);

  if (mode.type === "intro") {
    return (
      <div className="px-4 py-8">
        <OpeningIntro opening={opening} onStart={() => setMode({ type: "main-line" })} />

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opening.variants.map((v) => (
                <VariantCard
                  key={v.id}
                  opening={opening}
                  variant={v}
                  onStart={() => setMode({ type: "variant", variant: v })}
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
