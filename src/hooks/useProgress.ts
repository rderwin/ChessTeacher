"use client";

import { useState, useCallback, useEffect } from "react";
import {
  OpeningProgress,
  getProgress as getStoredProgress,
  saveProgress as storeProgress,
  getAllProgress as getStoredAllProgress,
} from "@/lib/progress";

export function useProgress(openingId?: string) {
  const [progress, setProgress] = useState<OpeningProgress | null>(null);
  const [allProgress, setAllProgress] = useState<OpeningProgress[]>([]);

  useEffect(() => {
    if (openingId) {
      setProgress(getStoredProgress(openingId));
    }
    setAllProgress(getStoredAllProgress());
  }, [openingId]);

  const saveProgress = useCallback(
    (moveReached: number, totalMoves: number) => {
      if (!openingId) return;
      storeProgress(openingId, moveReached, totalMoves);
      setProgress(getStoredProgress(openingId));
      setAllProgress(getStoredAllProgress());
    },
    [openingId]
  );

  const getCompletionPercent = useCallback(
    (id?: string) => {
      const target = id || openingId;
      if (!target) return 0;
      const p = getStoredProgress(target);
      if (!p || p.totalMoves === 0) return 0;
      return Math.round((p.bestMoveReached / p.totalMoves) * 100);
    },
    [openingId]
  );

  return { progress, allProgress, saveProgress, getCompletionPercent };
}
