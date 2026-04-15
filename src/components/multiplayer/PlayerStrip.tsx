"use client";

import type { MultiplayerPlayer } from "@/lib/multiplayer";

interface Props {
  player: MultiplayerPlayer | null;
  isTheirTurn: boolean;
  side: "self" | "opponent";
  placeholder?: string;
}

export default function PlayerStrip({ player, isTheirTurn, placeholder }: Props) {
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
        <p className="text-sm font-medium text-white truncate">{name}</p>
        {isTheirTurn && (
          <p className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Thinking...
          </p>
        )}
      </div>
    </div>
  );
}
