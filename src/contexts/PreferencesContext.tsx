"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import {
  UserPreferences,
  BoardTheme,
  PieceStyle,
  getPreferences,
  savePreferences as storPrefs,
  getBoardTheme,
  getPieceStyle,
} from "@/lib/preferences";

interface PreferencesContextType {
  prefs: UserPreferences;
  boardTheme: BoardTheme;
  pieceStyle: PieceStyle;
  updatePreferences: (partial: Partial<UserPreferences>) => void;
}

const defaults: PreferencesContextType = {
  prefs: { boardTheme: "classic", pieceStyle: "default", chessComUsername: "", soundEnabled: true },
  boardTheme: getBoardTheme("classic"),
  pieceStyle: getPieceStyle("default"),
  updatePreferences: () => {},
};

const PreferencesContext = createContext<PreferencesContextType>(defaults);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const uid = user?.uid || null;
  const [prefs, setPrefs] = useState<UserPreferences>(defaults.prefs);

  useEffect(() => {
    let cancelled = false;
    getPreferences(uid).then((p) => {
      if (!cancelled) setPrefs(p);
    });
    return () => { cancelled = true; };
  }, [uid]);

  const updatePreferences = useCallback(
    (partial: Partial<UserPreferences>) => {
      setPrefs((prev) => {
        const next = { ...prev, ...partial };
        storPrefs(next, uid);
        return next;
      });
    },
    [uid]
  );

  return (
    <PreferencesContext.Provider
      value={{
        prefs,
        boardTheme: getBoardTheme(prefs.boardTheme),
        pieceStyle: getPieceStyle(prefs.pieceStyle),
        updatePreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
