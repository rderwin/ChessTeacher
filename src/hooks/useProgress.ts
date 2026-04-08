"use client";

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  OpeningProgress,
  getProgress as fetchProgress,
  saveProgress as storeProgress,
  getAllProgress as fetchAllProgress,
  migrateLocalToFirestore,
} from "@/lib/progress";

export function useProgress(openingId?: string) {
  const { user } = useAuth();
  const uid = user?.uid || null;

  const [progress, setProgress] = useState<OpeningProgress | null>(null);
  const [allProgress, setAllProgress] = useState<OpeningProgress[]>([]);

  // Load progress (and migrate localStorage → Firestore on first login)
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (uid) {
        await migrateLocalToFirestore(uid);
      }

      if (openingId) {
        const p = await fetchProgress(openingId, uid);
        if (!cancelled) setProgress(p);
      }

      const all = await fetchAllProgress(uid);
      if (!cancelled) setAllProgress(all);
    }

    load();
    return () => { cancelled = true; };
  }, [openingId, uid]);

  const saveProgress = useCallback(
    async (moveReached: number, totalMoves: number) => {
      if (!openingId) return;
      await storeProgress(openingId, moveReached, totalMoves, uid);
      const p = await fetchProgress(openingId, uid);
      setProgress(p);
      const all = await fetchAllProgress(uid);
      setAllProgress(all);
    },
    [openingId, uid]
  );

  const getCompletionPercent = useCallback(
    (id?: string) => {
      const target = id || openingId;
      if (!target) return 0;
      const found = allProgress.find((p) => p.openingId === target);
      if (!found || found.totalMoves === 0) return 0;
      return Math.round((found.bestMoveReached / found.totalMoves) * 100);
    },
    [openingId, allProgress]
  );

  return { progress, allProgress, saveProgress, getCompletionPercent };
}
