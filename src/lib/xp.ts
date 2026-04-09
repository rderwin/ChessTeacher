import type { PuzzleDifficulty } from "@/data/types";

const DIFFICULTY_MULTIPLIER: Record<PuzzleDifficulty, number> = {
  beginner: 1,
  intermediate: 1.5,
  advanced: 2,
  expert: 3,
};

const BASE_XP = 10;
const FIRST_ATTEMPT_BONUS = 5;
const STREAK_BONUS = 5;
const STREAK_INTERVAL = 5;

/**
 * Calculate XP earned from solving a puzzle.
 */
export function calculateXPEarned(
  difficulty: PuzzleDifficulty,
  firstAttempt: boolean,
  currentStreak: number,
): number {
  let xp = Math.round(BASE_XP * DIFFICULTY_MULTIPLIER[difficulty]);

  if (firstAttempt) {
    xp += FIRST_ATTEMPT_BONUS;
  }

  // Streak bonus: +5 for every 5-streak milestone
  if (currentStreak > 0 && currentStreak % STREAK_INTERVAL === 0) {
    xp += STREAK_BONUS;
  }

  return xp;
}

/**
 * Level thresholds: L(n) = floor(50 * n * (n - 1))
 * L1 = 0, L2 = 100, L3 = 300, L4 = 600, L5 = 1000, etc.
 */
function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(50 * level * (level - 1));
}

/**
 * Determine the level for a given total XP.
 */
export function getLevelForXP(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

/**
 * Get the XP required to reach the next level from current XP.
 * Returns { needed, total } where needed is remaining XP and total is the next threshold.
 */
export function getXPForNextLevel(currentXP: number): {
  needed: number;
  total: number;
  currentLevelXP: number;
} {
  const currentLevel = getLevelForXP(currentXP);
  const nextLevelXP = xpForLevel(currentLevel + 1);
  const currentLevelXP = xpForLevel(currentLevel);
  return {
    needed: nextLevelXP - currentXP,
    total: nextLevelXP,
    currentLevelXP,
  };
}
