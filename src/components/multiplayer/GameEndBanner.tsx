"use client";

import Link from "next/link";
import type { MultiplayerGame } from "@/lib/multiplayer";

interface Props {
  game: MultiplayerGame;
  playerColor: "white" | "black" | "spectator";
  onRematch: () => void;
  rematchLoading: boolean;
}

const END_REASON_LABELS: Record<string, string> = {
  checkmate: "by checkmate",
  stalemate: "by stalemate",
  resignation: "by resignation",
  "draw-agreed": "by agreement",
  threefold: "by threefold repetition",
  insufficient: "by insufficient material",
  "fifty-move": "by the 50-move rule",
  aborted: "— game aborted",
};

export default function GameEndBanner({
  game,
  playerColor,
  onRematch,
  rematchLoading,
}: Props) {
  const isDraw = game.result === "1/2-1/2";
  const iWon =
    (playerColor === "white" && game.result === "1-0") ||
    (playerColor === "black" && game.result === "0-1");
  const iLost =
    !isDraw && !iWon && playerColor !== "spectator";

  const title = isDraw
    ? "Draw"
    : iWon
      ? "🏆 You won!"
      : iLost
        ? "You lost"
        : game.result === "1-0"
          ? "White won"
          : "Black won";

  const subtitle = game.endReason
    ? END_REASON_LABELS[game.endReason] ?? ""
    : "";

  const color = isDraw
    ? "from-stone-800/90 to-stone-900/90 border-stone-600/60 text-stone-200"
    : iWon
      ? "from-emerald-900/40 to-emerald-950/40 border-emerald-700/60 text-emerald-100"
      : "from-red-900/40 to-red-950/40 border-red-700/60 text-red-100";

  return (
    <div
      className={`bg-gradient-to-br ${color} border rounded-xl p-5 animate-pop`}
    >
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      {subtitle && <p className="text-sm opacity-80 mb-4">{subtitle}</p>}

      <div className="flex flex-wrap gap-2">
        {playerColor !== "spectator" && (
          <button
            onClick={onRematch}
            disabled={rematchLoading}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            {rematchLoading ? "Creating..." : "New game"}
          </button>
        )}
        <Link
          href="/play"
          className="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-stone-100 rounded-lg text-sm font-semibold transition-colors"
        >
          Back to lobby
        </Link>
      </div>
    </div>
  );
}
