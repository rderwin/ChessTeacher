"use client";

import { useState } from "react";
import type { MultiplayerGame } from "@/lib/multiplayer";
import { getGameShareUrl } from "@/lib/multiplayer";

interface Props {
  game: MultiplayerGame;
}

export default function WaitingForOpponent({ game }: Props) {
  const [copied, setCopied] = useState(false);
  const url = getGameShareUrl(game.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently ignore — user can select the input text manually
    }
  };

  return (
    <div className="mb-4 bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-700/40 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <h3 className="text-emerald-200 font-semibold">
          Waiting for opponent...
        </h3>
      </div>
      <p className="text-sm text-stone-300 mb-3">
        Share this link with your opponent. Whoever opens it first plays Black.
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          readOnly
          onFocus={(e) => e.target.select()}
          className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-stone-200 font-mono focus:outline-none focus:border-emerald-600"
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
