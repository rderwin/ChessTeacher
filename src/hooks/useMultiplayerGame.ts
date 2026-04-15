"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  type MultiplayerGame,
  type MultiplayerPlayer,
  subscribeToGame,
  submitMove,
  joinMultiplayerGame,
  resignGame,
  offerDraw,
  acceptDraw,
  declineDraw,
  getPlayerColor,
  isPlayersTurn,
} from "@/lib/multiplayer";

interface UseMultiplayerGameResult {
  game: MultiplayerGame | null;
  loading: boolean;
  error: string | null;
  /** True when the realtime listener is disconnected or the browser is offline. */
  disconnected: boolean;
  /** "white" | "black" | "spectator" — which side the current user controls */
  playerColor: "white" | "black" | "spectator";
  /** Whether it's the current user's turn and they can move */
  canMove: boolean;
  /** Attempt to make a move. Returns true on success. */
  makeMove: (from: string, to: string, promotion?: "q" | "r" | "b" | "n") => Promise<boolean>;
  /** Join the game as the black player (if waiting and joinable). */
  join: () => Promise<void>;
  /** Resign as the current player. */
  resign: () => Promise<void>;
  /** Offer a draw. */
  offerDrawAction: () => Promise<void>;
  /** Accept a pending draw offer from the opponent. */
  acceptDrawAction: () => Promise<void>;
  /** Decline a pending draw offer from the opponent. */
  declineDrawAction: () => Promise<void>;
}

/**
 * Subscribes to a multiplayer game in realtime and exposes helpers to act on it.
 * Auto-joins the game as the black player if the current user isn't already
 * a participant and the game is waiting for an opponent.
 */
export function useMultiplayerGame(
  gameId: string | null,
  opts?: { autoJoin?: boolean },
): UseMultiplayerGameResult {
  const { user } = useAuth();
  const [game, setGame] = useState<MultiplayerGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [disconnected, setDisconnected] = useState(false);
  const autoJoin = opts?.autoJoin ?? true;

  // Subscribe to realtime updates
  useEffect(() => {
    if (!gameId) {
      setGame(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setDisconnected(false);
    const unsub = subscribeToGame(
      gameId,
      (next) => {
        setGame(next);
        setLoading(false);
        setDisconnected(false);
      },
      (err) => {
        // Firestore raises this when the listener hits a network error.
        // Firebase auto-retries internally, so we just surface a banner and
        // wait for the next snapshot to clear it.
        setError(err.message);
        setDisconnected(true);
      },
    );
    return () => unsub();
  }, [gameId]);

  // Watch the browser's online/offline state as an extra signal. Firestore
  // listeners don't always emit an error promptly when the network drops,
  // so this provides a faster visible cue.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOffline = () => setDisconnected(true);
    const onOnline = () => {
      // Don't immediately clear the disconnected flag — wait for the next
      // successful snapshot. But if Firestore is still responsive, the
      // snapshot handler will clear it.
      setDisconnected(!navigator.onLine);
    };
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    // Prime from current state
    if (!navigator.onLine) setDisconnected(true);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  // Auto-join as the black player if the game is waiting and we're not in it yet
  useEffect(() => {
    if (!autoJoin || !user || !game || !gameId) return;
    if (game.status !== "waiting") return;
    if (game.white?.uid === user.uid) return;
    if (game.black) return;

    const joiner: MultiplayerPlayer = {
      uid: user.uid,
      name: user.displayName ?? "Anonymous",
      photoURL: user.photoURL ?? null,
    };
    joinMultiplayerGame(gameId, joiner).catch((err) => {
      setError(err instanceof Error ? err.message : "Failed to join game");
    });
  }, [autoJoin, user, game, gameId]);

  const playerColor = game ? getPlayerColor(game, user?.uid) : "spectator";
  const canMove = game ? isPlayersTurn(game, user?.uid) : false;

  const makeMove = useCallback(
    async (
      from: string,
      to: string,
      promotion: "q" | "r" | "b" | "n" = "q",
    ): Promise<boolean> => {
      if (!game || !user) return false;
      if (!isPlayersTurn(game, user.uid)) return false;
      try {
        await submitMove(game, from, to, promotion);
        return true;
      } catch {
        return false;
      }
    },
    [game, user],
  );

  const resign = useCallback(async () => {
    if (!game || !user) return;
    const color = getPlayerColor(game, user.uid);
    if (color === "spectator") return;
    if (game.status !== "active" && game.status !== "waiting") return;
    await resignGame(game.id, color);
  }, [game, user]);

  const offerDrawAction = useCallback(async () => {
    if (!game || !user) return;
    const color = getPlayerColor(game, user.uid);
    if (color === "spectator") return;
    if (game.status !== "active") return;
    await offerDraw(game.id, color);
  }, [game, user]);

  const acceptDrawAction = useCallback(async () => {
    if (!game) return;
    if (game.status !== "active") return;
    await acceptDraw(game.id);
  }, [game]);

  const declineDrawAction = useCallback(async () => {
    if (!game) return;
    if (game.status !== "active") return;
    await declineDraw(game.id);
  }, [game]);

  return {
    game,
    loading,
    error,
    disconnected,
    playerColor,
    canMove,
    makeMove,
    join: async () => {
      if (!user || !game) return;
      const joiner: MultiplayerPlayer = {
        uid: user.uid,
        name: user.displayName ?? "Anonymous",
        photoURL: user.photoURL ?? null,
      };
      await joinMultiplayerGame(game.id, joiner);
    },
    resign,
    offerDrawAction,
    acceptDrawAction,
    declineDrawAction,
  };
}
