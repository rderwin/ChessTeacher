export interface OpeningProgress {
  openingId: string;
  bestMoveReached: number;
  totalMoves: number;
  completedAt?: string;
  attempts: number;
}

const STORAGE_KEY = "chessteacher_progress";

function getAllProgressData(): Record<string, OpeningProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllProgressData(data: Record<string, OpeningProgress>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getProgress(openingId: string): OpeningProgress | null {
  const all = getAllProgressData();
  return all[openingId] || null;
}

export function saveProgress(
  openingId: string,
  moveReached: number,
  totalMoves: number
) {
  const all = getAllProgressData();
  const existing = all[openingId];

  const isComplete = moveReached >= totalMoves;
  const bestMoveReached = existing
    ? Math.max(existing.bestMoveReached, moveReached)
    : moveReached;

  all[openingId] = {
    openingId,
    bestMoveReached,
    totalMoves,
    completedAt: isComplete
      ? new Date().toISOString()
      : existing?.completedAt,
    attempts: (existing?.attempts || 0) + 1,
  };

  saveAllProgressData(all);
}

export function getAllProgress(): OpeningProgress[] {
  return Object.values(getAllProgressData());
}
