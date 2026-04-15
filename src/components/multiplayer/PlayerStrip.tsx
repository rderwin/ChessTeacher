"use client";

import type { MultiplayerPlayer } from "@/lib/multiplayer";

interface Props {
  player: MultiplayerPlayer | null;
  isTheirTurn: boolean;
  side: "self" | "opponent";
  placeholder?: string;
  /** Optional rating to display next to the name. */
  rating?: number | null;
  /** Optional running clock in ms. When set, shows a monospaced time. */
  clockMs?: number | null;
  /** True to style the clock as urgent (red, bold). */
  clockUrgent?: boolean;
}

function formatClock(ms: number): string {
  if (ms < 0) ms = 0;
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlayerStrip({
  player,
  isTheirTurn,
  placeholder,
  rating,
  clockMs,
  clockUrgent,
}: Props) {
  const name = player?.name ?? placeholder ?? "Unknown";
  const photo = player?.photoURL;

  return (
    <div
      className={`flex items-center gap-3 bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 ${
        isTheirTurn ? "ring-1 ring-emerald-500/60" : ""
      }`}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt=""
          className="w-8 h-8 rounded-full shrink-0"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-sm shrink-0">
          ?
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate flex items-center gap-2">
          <span className="truncate">{name}</span>
          {typeof rating === "number" && (
            <span className="text-[10px] font-semibold text-stone-400 bg-stone-900 px-1.5 py-0.5 rounded">
              {rating}
            </span>
          )}
        </p>
        {isTheirTurn && (
          <p className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Thinking...
          </p>
        )}
      </div>
      {typeof clockMs === "number" && (
        <div
          className={`font-mono text-xl tabular-nums shrink-0 px-2.5 py-1 rounded-lg border ${
            clockUrgent
              ? "bg-red-900/50 border-red-600/60 text-red-200 animate-pulse"
              : isTheirTurn
                ? "bg-stone-900 border-emerald-700/50 text-emerald-100"
                : "bg-stone-900 border-stone-700/60 text-stone-300"
          }`}
          aria-label={`Time remaining: ${formatClock(clockMs)}`}
        >
          {formatClock(clockMs)}
        </div>
      )}
    </div>
  );
}
