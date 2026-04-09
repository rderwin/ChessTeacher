import type { PuzzleProgressData, UnlockedAchievement } from "@/data/types";

interface CheckContext {
  progress: PuzzleProgressData;
  /** Whether the most recent solve was first-attempt */
  solvedFirstAttempt: boolean;
  /** Solve time in ms for the most recent puzzle */
  solveTimeMs: number;
  /** Whether the user just completed a full set with no mistakes */
  perfectSet: boolean;
}

type AchievementChecker = (ctx: CheckContext) => boolean;

const CHECKS: Record<string, AchievementChecker> = {
  // Milestones
  "first-puzzle": ({ progress }) => progress.totalSolved >= 1,
  "10-puzzles": ({ progress }) => progress.totalSolved >= 10,
  "50-puzzles": ({ progress }) => progress.totalSolved >= 50,
  "100-puzzles": ({ progress }) => progress.totalSolved >= 100,
  "500-puzzles": ({ progress }) => progress.totalSolved >= 500,
  "1000-puzzles": ({ progress }) => progress.totalSolved >= 1000,

  // Theme mastery
  "fork-master": ({ progress }) => (progress.themeCounts.fork ?? 0) >= 50,
  "pin-expert": ({ progress }) => (progress.themeCounts.pin ?? 0) >= 30,
  "back-rank-expert": ({ progress }) =>
    (progress.themeCounts["back-rank-mate"] ?? 0) >= 25,
  "mate-specialist": ({ progress }) => {
    const mateThemes = ["mate-in-1", "mate-in-2", "mate-in-3", "smothered-mate", "back-rank-mate"] as const;
    let total = 0;
    for (const theme of mateThemes) {
      total += progress.themeCounts[theme] ?? 0;
    }
    return total >= 50;
  },
  "skewer-savant": ({ progress }) => (progress.themeCounts.skewer ?? 0) >= 20,
  "discovery-expert": ({ progress }) =>
    (progress.themeCounts["discovered-attack"] ?? 0) >= 20,

  // Streak
  "streak-5": ({ progress }) => progress.bestStreak >= 5,
  "streak-10": ({ progress }) => progress.bestStreak >= 10,
  "streak-20": ({ progress }) => progress.bestStreak >= 20,
  "daily-7": ({ progress }) => progress.dailyStreak >= 7,
  "daily-30": ({ progress }) => progress.dailyStreak >= 30,

  // Rating
  "rating-1000": ({ progress }) => progress.rating >= 1000,
  "rating-1200": ({ progress }) => progress.rating >= 1200,
  "rating-1400": ({ progress }) => progress.rating >= 1400,
  "rating-1600": ({ progress }) => progress.rating >= 1600,
  "rating-1800": ({ progress }) => progress.rating >= 1800,
  "rating-2000": ({ progress }) => progress.rating >= 2000,

  // Special
  "perfect-set": ({ perfectSet }) => perfectSet,
  "speed-demon": ({ solveTimeMs }) => solveTimeMs > 0 && solveTimeMs < 5000,
  "night-owl": () => {
    const hour = new Date().getHours();
    return hour >= 0 && hour < 5;
  },
};

/**
 * Check which achievements should be newly unlocked given current progress.
 * Returns an array of newly unlocked achievement IDs.
 */
export function checkAchievements(
  progress: PuzzleProgressData,
  existingUnlocked: UnlockedAchievement[],
  options: {
    solvedFirstAttempt: boolean;
    solveTimeMs: number;
    perfectSet: boolean;
  },
): string[] {
  const alreadyUnlocked = new Set(existingUnlocked.map((a) => a.id));
  const ctx: CheckContext = {
    progress,
    solvedFirstAttempt: options.solvedFirstAttempt,
    solveTimeMs: options.solveTimeMs,
    perfectSet: options.perfectSet,
  };

  const newlyUnlocked: string[] = [];

  for (const [id, check] of Object.entries(CHECKS)) {
    if (alreadyUnlocked.has(id)) continue;
    if (check(ctx)) {
      newlyUnlocked.push(id);
    }
  }

  return newlyUnlocked;
}
