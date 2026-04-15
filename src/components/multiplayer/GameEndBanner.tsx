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
  timeout: "on time",
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

  // Rating delta for the current player, if available
  const delta = game.ratingDelta;
  const myDelta = delta && playerColor !== "spectator"
    ? playerColor === "white"
      ? { before: delta.whiteBefore, after: delta.whiteAfter }
      : { before: delta.blackBefore, after: delta.blackAfter }
    : null;
  const myChange = myDelta ? myDelta.after - myDelta.before : null;

  return (
    <div
      className={`bg-gradient-to-br ${color} border rounded-xl p-5 animate-pop`}
    >
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      {subtitle && <p className="text-sm opacity-80 mb-3">{subtitle}</p>}

      {myDelta && myChange !== null && (
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-stone-900/60 rounded-full border border-stone-700/60">
          <span className="text-xs text-stone-400">Rating:</span>
          <span className="font-mono font-semibold text-stone-200">
            {myDelta.before} → {myDelta.after}
          </span>
          <span
            className={`text-xs font-semibold ${
              myChange > 0
                ? "text-emerald-400"
                : myChange < 0
                  ? "text-red-400"
                  : "text-stone-400"
            }`}
          >
            ({myChange >= 0 ? "+" : ""}
            {myChange})
          </span>
        </div>
      )}

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
