"use client";

import { useCallback } from "react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { playSound, type SoundEffect } from "@/lib/sounds";

export function useSound() {
  const { prefs } = usePreferences();

  const play = useCallback(
    (effect: SoundEffect) => {
      playSound(effect, prefs.soundEnabled ?? true);
    },
    [prefs.soundEnabled],
  );

  return { play };
}
