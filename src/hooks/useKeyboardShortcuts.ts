"use client";

import { useEffect } from "react";

export interface Shortcut {
  /** Key to listen for (e.g. "r", "h", "ArrowRight"). Case-insensitive for letters. */
  key: string;
  /** Function to run when the key is pressed. */
  handler: () => void;
  /** Ignore when typing into an input, textarea, or contenteditable (default true). */
  ignoreInputs?: boolean;
  /** Require the given modifier. Default none. */
  modifier?: "ctrl" | "meta" | "shift" | "alt";
}

/**
 * Lightweight keyboard shortcut hook. Registers listeners on mount and
 * cleans them up on unmount.
 *
 * Typing in inputs/textareas is ignored by default so shortcuts don't
 * hijack normal text entry.
 */
export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    if (shortcuts.length === 0) return;

    function isEditable(el: EventTarget | null): boolean {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
      if (el.isContentEditable) return true;
      return false;
    }

    function onKeyDown(e: KeyboardEvent) {
      for (const s of shortcuts) {
        const ignoreInputs = s.ignoreInputs ?? true;
        if (ignoreInputs && isEditable(e.target)) continue;

        // Match the key (case-insensitive for letters)
        const key = e.key;
        const same =
          key.length === 1
            ? key.toLowerCase() === s.key.toLowerCase()
            : key === s.key;
        if (!same) continue;

        // Modifier checks
        if (s.modifier === "ctrl" && !e.ctrlKey) continue;
        if (s.modifier === "meta" && !e.metaKey) continue;
        if (s.modifier === "shift" && !e.shiftKey) continue;
        if (s.modifier === "alt" && !e.altKey) continue;

        // Skip if any unrelated modifier is active (prevents clashes with
        // browser shortcuts like Ctrl+R)
        if (
          !s.modifier &&
          (e.ctrlKey || e.metaKey || e.altKey)
        ) {
          continue;
        }

        e.preventDefault();
        s.handler();
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcuts]);
}
