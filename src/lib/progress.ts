import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface OpeningProgress {
  openingId: string;
  bestMoveReached: number;
  totalMoves: number;
  completedAt?: string;
  attempts: number;
}

// --- localStorage (guest fallback) ---

const STORAGE_KEY = "chessteacher_progress";

function getLocalProgressData(): Record<string, OpeningProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalProgressData(data: Record<string, OpeningProgress>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// --- Firestore (logged-in users) ---

function progressDocRef(uid: string, openingId: string) {
  return doc(db, "users", uid, "progress", openingId);
}

function progressCollectionRef(uid: string) {
  return collection(db, "users", uid, "progress");
}

// --- Unified API ---

export async function getProgress(
  openingId: string,
  uid?: string | null
): Promise<OpeningProgress | null> {
  if (uid) {
    try {
      const snap = await getDoc(progressDocRef(uid, openingId));
      return snap.exists() ? (snap.data() as OpeningProgress) : null;
    } catch {
      // Fall back to local
    }
  }
  return getLocalProgressData()[openingId] || null;
}

export async function saveProgress(
  openingId: string,
  moveReached: number,
  totalMoves: number,
  uid?: string | null
) {
  const existing = uid
    ? await getProgress(openingId, uid)
    : getLocalProgressData()[openingId] || null;

  const isComplete = moveReached >= totalMoves;
  const bestMoveReached = existing
    ? Math.max(existing.bestMoveReached, moveReached)
    : moveReached;

  const progress: OpeningProgress = {
    openingId,
    bestMoveReached,
    totalMoves,
    completedAt: isComplete ? new Date().toISOString() : existing?.completedAt,
    attempts: (existing?.attempts || 0) + 1,
  };

  if (uid) {
    try {
      await setDoc(progressDocRef(uid, openingId), progress);
      return;
    } catch {
      // Fall back to local
    }
  }

  const all = getLocalProgressData();
  all[openingId] = progress;
  saveLocalProgressData(all);
}

export async function getAllProgress(
  uid?: string | null
): Promise<OpeningProgress[]> {
  if (uid) {
    try {
      const snap = await getDocs(progressCollectionRef(uid));
      return snap.docs.map((d) => d.data() as OpeningProgress);
    } catch {
      // Fall back to local
    }
  }
  return Object.values(getLocalProgressData());
}

export async function migrateLocalToFirestore(uid: string) {
  const local = getLocalProgressData();
  const entries = Object.values(local);
  if (entries.length === 0) return;

  for (const entry of entries) {
    const existing = await getProgress(entry.openingId, uid);
    if (!existing || entry.bestMoveReached > existing.bestMoveReached) {
      await setDoc(progressDocRef(uid, entry.openingId), entry);
    }
  }

  // Clear localStorage after migration
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
