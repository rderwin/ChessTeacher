"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  createMultiplayerGame,
  listUserGames,
  TIME_CONTROLS,
  type MultiplayerPlayer,
  type MultiplayerGame,
} from "@/lib/multiplayer";

export default function PlayLobbyPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [creating, setCreating] = useState(false);
  const [joinId, setJoinId] = useState("");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [recentGames, setRecentGames] = useState<MultiplayerGame[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [selectedTcId, setSelectedTcId] = useState<string>("5+3");

  // Load the user's recent games
  useEffect(() => {
    if (!user) {
      setRecentGames([]);
      setLoadingRecent(false);
      return;
    }
    setLoadingRecent(true);
    listUserGames(user.uid, 5)
      .then(setRecentGames)
      .catch(() => setRecentGames([]))
      .finally(() => setLoadingRecent(false));
  }, [user]);

  const handleCreateGame = async () => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    setCreating(true);
    try {
      const player: MultiplayerPlayer = {
        uid: user.uid,
        name: user.displayName ?? "Anonymous",
        photoURL: user.photoURL ?? null,
      };
      const selectedTc = TIME_CONTROLS.find((t) => t.id === selectedTcId);
      const gameId = await createMultiplayerGame(player, selectedTc?.tc ?? null);
      router.push(`/play/${gameId}`);
    } catch (e) {
      setJoinError(
        e instanceof Error ? e.message : "Failed to create game",
      );
      setCreating(false);
    }
  };

  const handleJoinById = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError(null);
    const trimmed = joinId.trim();
    if (!trimmed) return;
    // Accept either a raw ID or a full URL
    const match = trimmed.match(/\/play\/([^/?#]+)/);
    const id = match ? match[1] : trimmed;
    router.push(`/play/${id}`);
  };

  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-stone-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Play Online</h1>
        <p className="text-stone-400">
          Challenge a friend to a real-time chess game. Create a game and
          share the link — whoever opens it plays Black.
        </p>
      </div>

      {!user ? (
        <div className="bg-stone-800 border border-stone-700 rounded-xl p-6 text-center">
          <p className="text-stone-300 mb-4">
            Sign in with Google to play online against friends.
          </p>
          <button
            onClick={signInWithGoogle}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Create a game */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-700/40 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">♔</span>
              <h2 className="text-lg font-semibold text-white">
                Create a game
              </h2>
            </div>
            <p className="text-sm text-stone-400 mb-4">
              You&apos;ll play White. Share the link with your opponent and
              they&apos;ll join as Black.
            </p>

            {/* Time control picker */}
            <label className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block mb-2">
              Time control
            </label>
            <div className="grid grid-cols-5 gap-1.5 mb-4">
              {TIME_CONTROLS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTcId(t.id)}
                  className={`px-1.5 py-1.5 rounded-md text-[11px] font-medium border transition-colors ${
                    selectedTcId === t.id
                      ? "bg-emerald-700/50 border-emerald-500/60 text-white"
                      : "bg-stone-900/60 border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-600"
                  }`}
                  title={`${t.category}${t.tc ? "" : " — no timer"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleCreateGame}
              disabled={creating}
              className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
            >
              {creating ? "Creating..." : "Create new game"}
            </button>
          </div>

          {/* Join by ID */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-700/40 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">♚</span>
              <h2 className="text-lg font-semibold text-white">
                Join a game
              </h2>
            </div>
            <p className="text-sm text-stone-400 mb-4">
              Paste a game link or ID your friend shared with you.
            </p>
            <form onSubmit={handleJoinById} className="space-y-2">
              <input
                type="text"
                value={joinId}
                onChange={(e) => setJoinId(e.target.value)}
                placeholder="Game ID or link"
                className="w-full bg-stone-900 border border-stone-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2 text-sm text-stone-100 placeholder:text-stone-600 transition-colors"
              />
              <button
                type="submit"
                disabled={!joinId.trim()}
                className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Join game
              </button>
            </form>
            {joinError && (
              <p className="mt-2 text-xs text-red-400">{joinError}</p>
            )}
          </div>
        </div>
      )}

      {/* Recent games */}
      {user && (
        <div className="bg-stone-800 border border-stone-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-3">
            Your recent games
          </h2>
          {loadingRecent ? (
            <p className="text-sm text-stone-500">Loading...</p>
          ) : recentGames.length === 0 ? (
            <p className="text-sm text-stone-500">
              No games yet. Create your first game above!
            </p>
          ) : (
            <div className="space-y-2">
              {recentGames.map((g) => (
                <GameRow key={g.id} game={g} currentUid={user.uid} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GameRow({
  game,
  currentUid,
}: {
  game: MultiplayerGame;
  currentUid: string;
}) {
  const youArewhite = game.white?.uid === currentUid;
  const opponent = youArewhite ? game.black : game.white;
  const opponentName = opponent?.name ?? "Waiting for opponent...";

  const statusLabel = (() => {
    if (game.status === "waiting") return "Waiting for opponent";
    if (game.status === "aborted") return "Aborted";
    if (game.status === "active") {
      return game.turn === (youArewhite ? "white" : "black")
        ? "Your turn"
        : "Their turn";
    }
    // completed
    if (game.result === "1/2-1/2") return "Draw";
    const youWon =
      (youArewhite && game.result === "1-0") ||
      (!youArewhite && game.result === "0-1");
    return youWon ? "You won" : "You lost";
  })();

  const statusColor = (() => {
    if (game.status === "waiting") return "text-stone-400";
    if (game.status === "active") {
      return game.turn === (youArewhite ? "white" : "black")
        ? "text-emerald-400"
        : "text-stone-400";
    }
    if (game.status === "aborted") return "text-stone-500";
    if (game.result === "1/2-1/2") return "text-stone-300";
    const youWon =
      (youArewhite && game.result === "1-0") ||
      (!youArewhite && game.result === "0-1");
    return youWon ? "text-emerald-400" : "text-red-400";
  })();

  return (
    <Link
      href={`/play/${game.id}`}
      className="flex items-center justify-between bg-stone-900/60 hover:bg-stone-900 border border-stone-700/60 hover:border-stone-600 rounded-lg px-3 py-2.5 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`inline-block w-3 h-3 rounded-full border-2 shrink-0 ${
            youArewhite
              ? "bg-white border-stone-400"
              : "bg-stone-950 border-stone-500"
          }`}
        />
        <div className="min-w-0">
          <p className="text-sm text-stone-200 truncate">
            vs {opponentName}
          </p>
          <p className="text-[11px] text-stone-500">
            {game.moves.length} moves
          </p>
        </div>
      </div>
      <span className={`text-xs font-medium shrink-0 ${statusColor}`}>
        {statusLabel}
      </span>
    </Link>
  );
}
