"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import type { EndgameLesson } from "@/data/endgames";

export type EndgameStatus =
  | "ready"         // explanation shown, not started
  | "playing"       // player's turn
  | "opponent"      // Stockfish thinking for the losing side
  | "checkmate"     // player delivered mate!
  | "stalemate"     // oops — accidental draw
  | "draw";         // 50-move rule or other draw

interface EndgameState {
  fen: string;
  moveCount: number;
  status: EndgameStatus;
  tipIndex: number;
}

export function useEndgameSession(lesson: EndgameLesson) {
  const chessRef = useRef(new Chess(lesson.fen));
  const workerRef = useRef<Worker | null>(null);
  const busyRef = useRef(false);

  const [state, setState] = useState<EndgameState>({
    fen: lesson.fen,
    moveCount: 0,
    status: "ready",
    tipIndex: 0,
  });

  // Init Stockfish worker
  useEffect(() => {
    const w = new Worker("/stockfish/stockfish-18-lite-single.js");
    w.postMessage("uci");
    workerRef.current = w;
    return () => { w.postMessage("quit"); w.terminate(); };
  }, []);

  /** Start practice */
  const start = useCallback(() => {
    setState((s) => ({ ...s, status: "playing" }));
  }, []);

  /** Make the opponent respond with Stockfish (playing badly — it's trying to survive) */
  const playOpponent = useCallback(async () => {
    const worker = workerRef.current;
    const chess = chessRef.current;
    if (!worker || busyRef.current) return;

    busyRef.current = true;
    setState((s) => ({ ...s, status: "opponent" }));

    return new Promise<void>((resolve) => {
      let bestMove = "";
      let started = false;

      const handler = (e: MessageEvent) => {
        const line = typeof e.data === "string" ? e.data : String(e.data);

        if (!started && line === "readyok") {
          started = true;
          // Play at low depth — the losing side should try but not be too good
          worker.postMessage(`setoption name UCI_LimitStrength value true`);
          worker.postMessage(`setoption name UCI_Elo value 1320`);
          worker.postMessage(`position fen ${chess.fen()}`);
          worker.postMessage(`go depth 4`);
          return;
        }

        if (line.startsWith("bestmove")) {
          worker.removeEventListener("message", handler);
          const bm = line.split(" ")[1];
          if (bm && bm !== "(none)") bestMove = bm;

          if (bestMove && bestMove.length >= 4) {
            const from = bestMove.slice(0, 2);
            const to = bestMove.slice(2, 4);
            const promotion = bestMove.length > 4 ? bestMove[4] : undefined;
            try {
              chess.move({ from, to, promotion } as Parameters<typeof chess.move>[0]);
            } catch { /* invalid */ }
          }

          // Check for terminal
          let newStatus: EndgameStatus = "playing";
          if (chess.isCheckmate()) newStatus = "checkmate";
          else if (chess.isStalemate()) newStatus = "stalemate";
          else if (chess.isDraw()) newStatus = "draw";

          setState((s) => ({
            ...s,
            fen: chess.fen(),
            status: newStatus,
          }));

          busyRef.current = false;
          resolve();
        }
      };

      worker.addEventListener("message", handler);
      worker.postMessage("stop");
      worker.postMessage("isready");
    });
  }, []);

  /** Player makes a move */
  const makeMove = useCallback(async (from: string, to: string): Promise<boolean> => {
    const chess = chessRef.current;
    if (state.status !== "playing" || busyRef.current) return false;

    try {
      const result = chess.move({ from, to, promotion: "q" } as Parameters<typeof chess.move>[0]);
      if (!result) return false;
    } catch {
      return false;
    }

    const newMoveCount = state.moveCount + 1;

    // Check terminal
    if (chess.isCheckmate()) {
      setState((s) => ({
        ...s, fen: chess.fen(), moveCount: newMoveCount, status: "checkmate",
        tipIndex: Math.min(s.tipIndex + 1, lesson.tips.length - 1),
      }));
      return true;
    }
    if (chess.isStalemate()) {
      setState((s) => ({ ...s, fen: chess.fen(), moveCount: newMoveCount, status: "stalemate" }));
      return true;
    }
    if (chess.isDraw()) {
      setState((s) => ({ ...s, fen: chess.fen(), moveCount: newMoveCount, status: "draw" }));
      return true;
    }

    setState((s) => ({
      ...s, fen: chess.fen(), moveCount: newMoveCount,
      tipIndex: Math.min(s.tipIndex + 1, lesson.tips.length - 1),
    }));

    // Opponent responds
    await playOpponent();
    return true;
  }, [state.status, state.moveCount, playOpponent, lesson.tips.length]);

  /** Reset */
  const reset = useCallback(() => {
    chessRef.current = new Chess(lesson.fen);
    busyRef.current = false;
    setState({ fen: lesson.fen, moveCount: 0, status: "ready", tipIndex: 0 });
  }, [lesson.fen]);

  return {
    fen: state.fen,
    moveCount: state.moveCount,
    status: state.status,
    currentTip: lesson.tips[state.tipIndex],
    parMoves: lesson.parMoves,
    makeMove,
    start,
    reset,
  };
}
