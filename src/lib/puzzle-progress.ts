import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { INITIAL_RATING } from "./puzzle-rating";
import type { PuzzleProgressData, UnlockedAchievement } from "@/data/types";

// --- Default data ---

export const DEFAULT_PUZZLE_PROGRESS: PuzzleProgressData = {
  rating: INITIAL_RATING,
  xp: 0,
  level: 1,
  totalSolved: 0,
  totalAttempted: 0,
  correctFirstAttempt: 0,
  currentStreak: 0,
  bestStreak: 0,
  dailyStreak: 0,
  lastPuzzleDate: "",
  lastDailyDate: "",
  themeCounts: {},
  totalTimeMs: 0,
  dailyActivity: {},
  ratingHistory: [],
  solvedPuzzleIds: {},
  fastestSolveMs: undefined,
};

// --- localStorage (guest fallback) ---

const PROGRESS_KEY = "chessteacher_puzzle_progress";
const ACHIEVEMENTS_KEY = "chessteacher_puzzle_achievements";

function getLocalProgress(): PuzzleProgressData {
  if (typeof window === "undefined") return DEFAULT_PUZZLE_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw
      ? { ...DEFAULT_PUZZLE_PROGRESS, ...JSON.parse(raw) }
      : DEFAULT_PUZZLE_PROGRESS;
  } catch {
    return DEFAULT_PUZZLE_PROGRESS;
  }
}

function saveLocalProgress(data: PuzzleProgressData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function getLocalAchievements(): UnlockedAchievement[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalAchievements(achievements: UnlockedAchievement[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
}

// --- Firestore refs ---

function progressDocRef(uid: string) {
  return doc(db, "users", uid, "puzzleData", "progress");
}

function achievementsDocRef(uid: string) {
  return doc(db, "users", uid, "puzzleData", "achievements");
}

// --- Unified API ---

export async function getPuzzleProgress(
  uid?: string | null,
): Promise<PuzzleProgressData> {
  if (uid) {
    try {
      const snap = await getDoc(progressDocRef(uid));
      if (snap.exists()) {
        return { ...DEFAULT_PUZZLE_PROGRESS, ...snap.data() } as PuzzleProgressData;
      }
    } catch {
      // fall back to local
    }
  }
  return getLocalProgress();
}

export async function savePuzzleProgress(
  data: PuzzleProgressData,
  uid?: string | null,
) {
  if (uid) {
    try {
      await setDoc(progressDocRef(uid), data);
      return;
    } catch {
      // fall back to local
    }
  }
  saveLocalProgress(data);
}

export async function getUnlockedAchievements(
  uid?: string | null,
): Promise<UnlockedAchievement[]> {
  if (uid) {
    try {
      const snap = await getDoc(achievementsDocRef(uid));
      if (snap.exists()) {
        return (snap.data().items ?? []) as UnlockedAchievement[];
      }
    } catch {
      // fall back to local
    }
  }
  return getLocalAchievements();
}

export async function saveUnlockedAchievements(
  achievements: UnlockedAchievement[],
  uid?: string | null,
) {
  if (uid) {
    try {
      await setDoc(achievementsDocRef(uid), { items: achievements });
      return;
    } catch {
      // fall back to local
    }
  }
  saveLocalAchievements(achievements);
}

export async function migratePuzzleProgressToFirestore(uid: string) {
  const localProgress = getLocalProgress();
  const localAchievements = getLocalAchievements();

  // Only migrate if there's local data
  if (localProgress.totalAttempted > 0) {
    const existing = await getPuzzleProgress(uid);
    // Keep whichever has more puzzles solved
    if (localProgress.totalSolved > existing.totalSolved) {
      await savePuzzleProgress(localProgress, uid);
    }
  }

  if (localAchievements.length > 0) {
    const existing = await getUnlockedAchievements(uid);
    // Merge: keep all unique achievements
    const merged = [...existing];
    const existingIds = new Set(existing.map((a) => a.id));
    for (const a of localAchievements) {
      if (!existingIds.has(a.id)) {
        merged.push(a);
      }
    }
    await saveUnlockedAchievements(merged, uid);
  }

  // Clear local data after migration
  if (typeof window !== "undefined") {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(ACHIEVEMENTS_KEY);
  }
}
