"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InteractiveBoard from "@/components/board/InteractiveBoard";
import Confetti from "@/components/ui/Confetti";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { useSound } from "@/hooks/useSound";
import { useMultiplayerGame } from "@/hooks/useMultiplayerGame";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import {
  createMultiplayerGame,
  getGameShareUrl,
  type MultiplayerGame,
  type MultiplayerPlayer,
} from "@/lib/multiplayer";
import { getMoveSound } from "@/lib/sounds";
import PlayerStrip from "./PlayerStrip";
import GameEndBanner from "./GameEndBanner";
import WaitingForOpponent from "./WaitingForOpponent";
import MultiplayerMoveList from "./MultiplayerMoveList";

interface Props {
  gameId: string;
}

export default function MultiplayerGameView({ gameId }: Props) {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();
  const { show: showToast } = useToast();
  const { play: playFx } = useSound();
  const {
    game,
    loading,
    error,
    playerColor,
    canMove,
    makeMove,
    resign,
    offerDrawAction,
    acceptDrawAction,
    declineDrawAction,
  } = useMultiplayerGame(gameId, { autoJoin: true });

  const [confettiKey, setConfettiKey] = useState(0);
  const [creatingRematch, setCreatingRematch] = useState(false);
  const celebratedRef = useRef<string | null>(null);
  const prevMovesLenRef = useRef(0);

  // Play move sound whenever the move count changes
  useEffect(() => {
    if (!game) return;
    const prev = prevMovesLenRef.current;
    prevMovesLenRef.current = game.moves.length;
    if (game.moves.length > prev && game.moves.length > 0) {
      const lastSan = game.moves[game.moves.length - 1];
      playFx(getMoveSound(lastSan));
    }
  }, [game, playFx]);

  // Fire confetti + toast once when the game finishes in the current player's favor
  useEffect(() => {
    if (!game || game.status !== "completed") return;
    if (celebratedRef.current === game.id) return;
    celebratedRef.current = game.id;

    if (playerColor === "spectator") return;
    if (game.result === "1/2-1/2") {
      showToast({
        kind: "info",
        title: "Game drawn",
        description: game.endReason ?? "Game ended in a draw.",
        icon: "🤝",
      });
      return;
    }
    const youWon =
      (playerColor === "white" && game.result === "1-0") ||
      (playerColor === "black" && game.result === "0-1");
    if (youWon) {
      setConfettiKey((k) => k + 1);
      playFx("complete");
      showToast({
        kind: "success",
        title: "Victory!",
        description: "GG! You won the game.",
        icon: "🏆",
      });
    } else {
      showToast({
        kind: "error",
        title: "You lost",
        description: "GG — better luck next time.",
        icon: "😞",
      });
    }
  }, [game, playerColor, showToast, playFx]);

  const handlePieceDrop = useCallback(
    (from: string, to: string, promotion?: "q" | "r" | "b" | "n"): boolean => {
      if (!canMove) return false;
      // Fire-and-forget — the real state update comes back through the realtime listener
      makeMove(from, to, promotion ?? "q").catch(() => {});
      // Return true optimistically so the piece doesn't snap back during animation
      return true;
    },
    [canMove, makeMove],
  );

  const handleResign = useCallback(async () => {
    if (!game) return;
    const confirmed = window.confirm(
      "Resign this game? Your opponent will win.",
    );
    if (!confirmed) return;
    await resign();
  }, [game, resign]);

  const handleOfferDraw = useCallback(async () => {
    if (!game) return;
    await offerDrawAction();
    showToast({
      kind: "info",
      title: "Draw offered",
      description: "Waiting for your opponent to respond.",
      icon: "🤝",
    });
  }, [game, offerDrawAction, showToast]);

  const handleRematch = useCallback(async () => {
    if (!game || !user) return;
    if (creatingRematch) return;
    setCreatingRematch(true);
    try {
      const player: MultiplayerPlayer = {
        uid: user.uid,
        name: user.displayName ?? "Anonymous",
        photoURL: user.photoURL ?? null,
      };
      const newId = await createMultiplayerGame(player);
      router.push(`/play/${newId}`);
    } catch {
      setCreatingRematch(false);
      showToast({
        kind: "error",
        title: "Couldn't create rematch",
        description: "Try again in a moment.",
      });
    }
  }, [game, user, router, showToast, creatingRematch]);

  // Keyboard: R resigns, D offers draw, B back to lobby
  useKeyboardShortcuts([
    { key: "b", handler: () => router.push("/play") },
  ]);

  // --- Rendering cases -----

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-stone-400">Loading game...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-red-300 mb-2">
            Error loading game
          </h2>
          <p className="text-stone-300">{error}</p>
          <Link
            href="/play"
            className="mt-4 inline-block text-emerald-400 hover:underline"
          >
            ← Back to lobby
          </Link>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-stone-800 border border-stone-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-2">
            Game not found
          </h2>
          <p className="text-stone-400 mb-4">
            This game doesn&apos;t exist or has been deleted.
          </p>
          <Link
            href="/play"
            className="text-emerald-400 hover:underline"
          >
            ← Back to lobby
          </Link>
        </div>
      </div>
    );
  }

  // Require sign-in to participate
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-stone-800 border border-stone-700 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Sign in to join this game
          </h2>
          <p className="text-stone-400 mb-4">
            Online games require a Google account so your opponent knows
            who you are.
          </p>
          <button
            onClick={signInWithGoogle}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // The board orientation shows from the current player's perspective
  const orientation: "white" | "black" =
    playerColor === "black" ? "black" : "white";

  const hasDrawOfferToMe =
    game.status === "active" &&
    game.drawOfferedBy !== null &&
    game.drawOfferedBy !== playerColor &&
    playerColor !== "spectator";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {confettiKey > 0 && <Confetti fireKey={confettiKey} />}

      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/play"
          className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
        >
          ← Back to lobby
        </Link>
        <span className="text-xs text-stone-500">
          Game ID: <code className="text-stone-400">{game.id.slice(0, 8)}</code>
        </span>
      </div>

      {game.status === "waiting" && playerColor === "white" && (
        <WaitingForOpponent game={game} />
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Board + player strips */}
        <div className="shrink-0">
          {/* Opponent strip (top) */}
          <PlayerStrip
            player={orientation === "white" ? game.black : game.white}
            isTheirTurn={
              game.status === "active" &&
              game.turn !== (orientation === "white" ? "white" : "black") &&
              (orientation === "white"
                ? game.turn === "black"
                : game.turn === "white")
            }
            side="opponent"
            placeholder={
              game.status === "waiting"
                ? "Waiting for opponent..."
                : undefined
            }
          />

          <div className="my-2">
            <InteractiveBoard
              fen={game.fen}
              playerColor={orientation}
              onPieceDrop={handlePieceDrop}
              disabled={!canMove || game.status !== "active"}
              enablePromotionPicker
            />
          </div>

          {/* Me strip (bottom) */}
          <PlayerStrip
            player={orientation === "white" ? game.white : game.black}
            isTheirTurn={
              game.status === "active" &&
              game.turn === (orientation === "white" ? "white" : "black")
            }
            side="self"
          />
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {hasDrawOfferToMe && (
            <DrawOfferBanner
              onAccept={acceptDrawAction}
              onDecline={declineDrawAction}
            />
          )}

          {game.status === "active" && playerColor !== "spectator" && (
            <div className="bg-stone-800 border border-stone-700 rounded-xl p-4">
              <p className="text-sm text-stone-400 mb-3">
                {canMove
                  ? "Your move."
                  : "Waiting for opponent..."}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleResign}
                  className="flex-1 px-3 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg text-sm font-medium transition-colors"
                >
                  Resign
                </button>
                <button
                  onClick={handleOfferDraw}
                  disabled={game.drawOfferedBy === playerColor}
                  className="flex-1 px-3 py-2 bg-stone-700 hover:bg-stone-600 disabled:opacity-40 disabled:cursor-not-allowed text-stone-200 rounded-lg text-sm font-medium transition-colors"
                >
                  {game.drawOfferedBy === playerColor
                    ? "Draw offered..."
                    : "Offer draw"}
                </button>
              </div>
            </div>
          )}

          {game.status === "completed" && (
            <GameEndBanner
              game={game}
              playerColor={playerColor}
              onRematch={handleRematch}
              rematchLoading={creatingRematch}
            />
          )}

          {game.status === "aborted" && (
            <div className="bg-stone-800 border border-stone-700 rounded-xl p-4">
              <p className="text-stone-300 font-semibold">Game aborted</p>
              <Link
                href="/play"
                className="mt-2 text-sm text-emerald-400 hover:underline"
              >
                Back to lobby
              </Link>
            </div>
          )}

          <MultiplayerMoveList moves={game.moves} />
        </div>
      </div>
    </div>
  );
}

function DrawOfferBanner({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div className="bg-amber-900/30 border border-amber-700/50 rounded-xl p-4 animate-pop">
      <p className="text-amber-200 font-semibold mb-2">
        🤝 Your opponent offered a draw
      </p>
      <div className="flex gap-2">
        <button
          onClick={onAccept}
          className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Accept draw
        </button>
        <button
          onClick={onDecline}
          className="flex-1 px-3 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg text-sm font-medium transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
