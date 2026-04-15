"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { Puzzle, PuzzleProgressData, UnlockedAchievement } from "@/data/types";
import {
  getPuzzleProgress,
  savePuzzleProgress,
  getUnlockedAchievements,
  saveUnlockedAchievements,
  DEFAULT_PUZZLE_PROGRESS,
} from "@/lib/puzzle-progress";
import { calculateXPEarned, getLevelForXP } from "@/lib/xp";
import { calculateNewRating } from "@/lib/puzzle-rating";
import { checkAchievements } from "@/lib/achievements";

export interface PuzzleResultFeedback {
  xpEarned: number;
  newRating: number;
  ratingDelta: number;
  newAchievements: string[];
  leveledUp: boolean;
  newLevel: number;
}

export function usePuzzleProgress() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [progress, setProgress] = useState<PuzzleProgressData>(DEFAULT_PUZZLE_PROGRESS);
  const [achievements, setAchievements] = useState<UnlockedAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  // Load progress on mount / auth change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([getPuzzleProgress(uid), getUnlockedAchievements(uid)]).then(
      ([prog, ach]) => {
        if (!cancelled) {
          setProgress(prog);
          setAchievements(ach);
          setLoading(false);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [uid]);

  const recordPuzzleResult = useCallback(
    async (
      puzzle: Puzzle,
      solved: boolean,
      attempts: number,
      timeMs: number,
      options?: { perfectSet?: boolean },
    ): Promise<PuzzleResultFeedback> => {
      const today = new Date().toISOString().slice(0, 10);
      const firstAttempt = solved && attempts <= 1;

      // Update streak
      let newStreak = solved ? progress.currentStreak + 1 : 0;
      const bestStreak = Math.max(progress.bestStreak, newStreak);

      // Daily streak
      let dailyStreak = progress.dailyStreak;
      const lastDaily = progress.lastDailyDate;
      if (lastDaily !== today) {
        // Check if yesterday was the last daily
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);
        if (lastDaily === yesterdayStr) {
          dailyStreak += 1;
        } else if (lastDaily !== "") {
          dailyStreak = 1; // streak broken
        } else {
          dailyStreak = 1; // first day
        }
      }

      // XP
      const xpEarned = solved
        ? calculateXPEarned(puzzle.difficulty, firstAttempt, newStreak)
        : 0;
      const newXP = progress.xp + xpEarned;
      const oldLevel = progress.level;
      const newLevel = getLevelForXP(newXP);
      const leveledUp = newLevel > oldLevel;

      // Rating
      const ratingResult = calculateNewRating(
        progress.rating,
        puzzle.rating,
        solved,
        attempts,
        progress.totalAttempted,
      );

      // Theme counts
      const newThemeCounts = { ...progress.themeCounts };
      if (solved) {
        for (const theme of puzzle.themes) {
          newThemeCounts[theme] = (newThemeCounts[theme] ?? 0) + 1;
        }
      }

      // Daily activity
      const newDailyActivity = { ...progress.dailyActivity };
      newDailyActivity[today] = (newDailyActivity[today] ?? 0) + 1;

      // Rating history (keep one entry per day, max 90 days)
      let newRatingHistory = [...progress.ratingHistory];
      const lastEntry = newRatingHistory[newRatingHistory.length - 1];
      if (lastEntry && lastEntry.date === today) {
        lastEntry.rating = ratingResult.newRating;
      } else {
        newRatingHistory.push({ date: today, rating: ratingResult.newRating });
      }
      if (newRatingHistory.length > 90) {
        newRatingHistory = newRatingHistory.slice(-90);
      }

      // Track per-puzzle solves so set cards can show completion
      const solvedIds = { ...(progress.solvedPuzzleIds ?? {}) };
      let newTotalSolved = progress.totalSolved;
      if (solved && !solvedIds[puzzle.id]) {
        solvedIds[puzzle.id] = new Date().toISOString();
        newTotalSolved = progress.totalSolved + 1;
      } else if (solved) {
        // Already solved before, keep totalSolved unchanged (don't double-count)
        newTotalSolved = progress.totalSolved;
      }

      // Fastest solve tracking
      let fastestSolveMs = progress.fastestSolveMs;
      if (solved && firstAttempt && timeMs > 0) {
        if (fastestSolveMs === undefined || timeMs < fastestSolveMs) {
          fastestSolveMs = timeMs;
        }
      }

      const updatedProgress: PuzzleProgressData = {
        rating: ratingResult.newRating,
        xp: newXP,
        level: newLevel,
        totalSolved: newTotalSolved,
        totalAttempted: progress.totalAttempted + 1,
        correctFirstAttempt: progress.correctFirstAttempt + (firstAttempt ? 1 : 0),
        currentStreak: newStreak,
        bestStreak,
        dailyStreak,
        lastPuzzleDate: today,
        lastDailyDate: today,
        themeCounts: newThemeCounts,
        totalTimeMs: progress.totalTimeMs + timeMs,
        dailyActivity: newDailyActivity,
        ratingHistory: newRatingHistory,
        solvedPuzzleIds: solvedIds,
        fastestSolveMs,
      };

      // Check achievements
      const newAchievementIds = solved
        ? checkAchievements(updatedProgress, achievements, {
            solvedFirstAttempt: firstAttempt,
            solveTimeMs: timeMs,
            perfectSet: options?.perfectSet ?? false,
          })
        : [];

      const newAchievementEntries: UnlockedAchievement[] = newAchievementIds.map(
        (id) => ({
          id,
          unlockedAt: new Date().toISOString(),
        }),
      );
      const updatedAchievements = [...achievements, ...newAchievementEntries];

      // Save
      setProgress(updatedProgress);
      setAchievements(updatedAchievements);

      await Promise.all([
        savePuzzleProgress(updatedProgress, uid),
        newAchievementEntries.length > 0
          ? saveUnlockedAchievements(updatedAchievements, uid)
          : Promise.resolve(),
      ]);

      return {
        xpEarned,
        newRating: ratingResult.newRating,
        ratingDelta: ratingResult.ratingDelta,
        newAchievements: newAchievementIds,
        leveledUp,
        newLevel,
      };
    },
    [progress, achievements, uid],
  );

  return {
    progress,
    achievements,
    recordPuzzleResult,
    loading,
  };
}
