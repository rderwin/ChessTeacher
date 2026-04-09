import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface BoardTheme {
  id: string;
  name: string;
  lightSquare: string;
  darkSquare: string;
}

export interface PieceStyle {
  id: string;
  name: string;
  filter: string;
  shadow: string;
}

export const BOARD_THEMES: BoardTheme[] = [
  { id: "classic", name: "Classic Wood", lightSquare: "#F0D9B5", darkSquare: "#B58863" },
  { id: "emerald", name: "Emerald", lightSquare: "#FFFFDD", darkSquare: "#86A666" },
  { id: "ocean", name: "Ocean", lightSquare: "#DEE3E6", darkSquare: "#8CA2AD" },
  { id: "midnight", name: "Midnight", lightSquare: "#C3C8D5", darkSquare: "#5D6B82" },
  { id: "coral", name: "Coral", lightSquare: "#F0D8C4", darkSquare: "#C87C5B" },
  { id: "ice", name: "Ice", lightSquare: "#E8EDF9", darkSquare: "#B0BCD9" },
];

export const PIECE_STYLES: PieceStyle[] = [
  { id: "default", name: "Standard", filter: "none", shadow: "none" },
  { id: "shadow", name: "Drop Shadow", filter: "none", shadow: "drop-shadow(2px 2px 2px rgba(0,0,0,0.4))" },
  { id: "sharp", name: "High Contrast", filter: "contrast(1.2) saturate(1.1)", shadow: "none" },
  { id: "vintage", name: "Vintage", filter: "sepia(0.3) contrast(1.05)", shadow: "none" },
  { id: "neon", name: "Neon Glow", filter: "brightness(1.1) saturate(1.3)", shadow: "drop-shadow(0 0 3px rgba(0,200,100,0.3))" },
];

export interface UserPreferences {
  boardTheme: string;
  pieceStyle: string;
  chessComUsername: string;
  soundEnabled: boolean;
}

const DEFAULT_PREFS: UserPreferences = {
  boardTheme: "classic",
  pieceStyle: "default",
  chessComUsername: "",
  soundEnabled: true,
};

const STORAGE_KEY = "chessteacher_preferences";

function getLocalPrefs(): UserPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

function saveLocalPrefs(prefs: UserPreferences) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export async function getPreferences(uid?: string | null): Promise<UserPreferences> {
  if (uid) {
    try {
      const snap = await getDoc(doc(db, "users", uid, "settings", "preferences"));
      if (snap.exists()) return { ...DEFAULT_PREFS, ...snap.data() } as UserPreferences;
    } catch {
      // fall back
    }
  }
  return getLocalPrefs();
}

export async function savePreferences(prefs: UserPreferences, uid?: string | null) {
  if (uid) {
    try {
      await setDoc(doc(db, "users", uid, "settings", "preferences"), prefs);
      return;
    } catch {
      // fall back
    }
  }
  saveLocalPrefs(prefs);
}

export function getBoardTheme(id: string): BoardTheme {
  return BOARD_THEMES.find((t) => t.id === id) || BOARD_THEMES[0];
}

export function getPieceStyle(id: string): PieceStyle {
  return PIECE_STYLES.find((s) => s.id === id) || PIECE_STYLES[0];
}
