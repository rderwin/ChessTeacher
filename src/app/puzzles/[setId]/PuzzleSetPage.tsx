"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { PuzzleSet } from "@/data/types";
import PuzzleBoard from "@/components/puzzles/PuzzleBoard";

interface Props {
  puzzleSet: PuzzleSet;
}

export default function PuzzleSetPage({ puzzleSet }: Props) {
  const router = useRouter();
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  // Key forces usePuzzleSession to reinitialize when puzzle changes
  const [sessionKey, setSessionKey] = useState(0);

  const handleNextPuzzle = useCallback(() => {
    if (puzzleIndex < puzzleSet.puzzles.length - 1) {
      setPuzzleIndex((i) => i + 1);
      setSessionKey((k) => k + 1);
    }
  }, [puzzleIndex, puzzleSet.puzzles.length]);

  const handleBackToSet = useCallback(() => {
    router.push("/puzzles");
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        {puzzleSet.icon} {puzzleSet.name}
      </h1>
      <p className="text-stone-400 mb-6">{puzzleSet.description}</p>

      <PuzzleBoard
        key={sessionKey}
        puzzleSet={puzzleSet}
        puzzleIndex={puzzleIndex}
        onNextPuzzle={handleNextPuzzle}
        onBackToSet={handleBackToSet}
      />
    </div>
  );
}
