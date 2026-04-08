import { doc, collection, getDocs, setDoc, deleteDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";

export interface SavedGame {
  id: string;
  pgn: string;
  white: string;
  black: string;
  result: string;
  event: string;
  date: string;
  savedAt: number;
}

const STORAGE_KEY = "chessteacher_saved_games";
const MAX_GAMES = 50;

function getLocalGames(): SavedGame[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalGames(games: SavedGame[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

export async function getSavedGames(uid?: string | null): Promise<SavedGame[]> {
  if (uid) {
    try {
      const ref = collection(db, "users", uid, "savedGames");
      const q = query(ref, orderBy("savedAt", "desc"), limit(MAX_GAMES));
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SavedGame));
    } catch {
      // fall back
    }
  }
  return getLocalGames().sort((a, b) => b.savedAt - a.savedAt);
}

export async function saveGame(game: Omit<SavedGame, "id" | "savedAt">, uid?: string | null): Promise<SavedGame> {
  const id = crypto.randomUUID();
  const saved: SavedGame = { ...game, id, savedAt: Date.now() };

  if (uid) {
    try {
      await setDoc(doc(db, "users", uid, "savedGames", id), saved);
      return saved;
    } catch {
      // fall back
    }
  }

  const local = getLocalGames();
  local.unshift(saved);
  if (local.length > MAX_GAMES) local.length = MAX_GAMES;
  saveLocalGames(local);
  return saved;
}

export async function deleteGame(gameId: string, uid?: string | null) {
  if (uid) {
    try {
      await deleteDoc(doc(db, "users", uid, "savedGames", gameId));
      return;
    } catch {
      // fall back
    }
  }

  const local = getLocalGames().filter((g) => g.id !== gameId);
  saveLocalGames(local);
}
