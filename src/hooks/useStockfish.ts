"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export interface EngineEval {
  /** Best move in UCI notation (e.g. "e2e4") */
  bestMove: string;
  /** Centipawns from the side-to-move's perspective */
  evaluation: number;
  /** Search depth reached */
  depth: number;
  /** Non-null if forced mate detected */
  mate: number | null;
  /** Principal variation in UCI notation */
  pv: string[];
  /** Whether the engine is still searching */
  searching: boolean;
}

export function useStockfish(depth = 16) {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const searchIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const worker = new Worker("/stockfish/stockfish-18-lite-single.js");
    workerRef.current = worker;

    const initHandler = (e: MessageEvent) => {
      const line = typeof e.data === "string" ? e.data : String(e.data);
      if (line === "readyok") {
        worker.removeEventListener("message", initHandler);
        setIsReady(true);
      }
    };
    worker.addEventListener("message", initHandler);
    worker.postMessage("uci");
    worker.postMessage("isready");

    return () => {
      worker.postMessage("quit");
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  /**
   * Evaluate a position. Calls `onUpdate` with streaming results as the
   * engine searches deeper. Returns a cancel function.
   *
   * Rapid calls are safe — each call bumps a search ID, and stale
   * results from previous searches are silently discarded.
   */
  const evaluate = useCallback(
    (fen: string, onUpdate: (result: EngineEval) => void): (() => void) => {
      const worker = workerRef.current;
      if (!worker) return () => {};

      // Bump search ID — any messages from older searches will be ignored
      const id = ++searchIdRef.current;

      // Stop any in-progress search. We send stop + isready to drain
      // any pending bestmove from the old search before starting new one.
      worker.postMessage("stop");

      let lastEval = 0;
      let lastDepth = 0;
      let lastMate: number | null = null;
      let lastPv: string[] = [];
      let started = false;

      const handler = (e: MessageEvent) => {
        // If a newer search was started, remove this handler
        if (searchIdRef.current !== id) {
          worker.removeEventListener("message", handler);
          return;
        }

        const line: string =
          typeof e.data === "string" ? e.data : String(e.data);

        // Wait for readyok before we know the engine is clear
        if (!started) {
          if (line === "readyok") {
            started = true;
            worker.postMessage(`position fen ${fen}`);
            worker.postMessage(`go depth ${depth}`);
          }
          return;
        }

        if (line.startsWith("info") && line.includes(" score ")) {
          const depthMatch = line.match(/depth (\d+)/);
          const cpMatch = line.match(/score cp (-?\d+)/);
          const mateMatch = line.match(/score mate (-?\d+)/);
          const pvMatch = line.match(/ pv (.+)/);

          if (depthMatch) lastDepth = parseInt(depthMatch[1]);
          if (cpMatch) {
            lastEval = parseInt(cpMatch[1]);
            lastMate = null;
          }
          if (mateMatch) lastMate = parseInt(mateMatch[1]);
          if (pvMatch) lastPv = pvMatch[1].split(" ");

          if (lastDepth >= 4) {
            onUpdate({
              bestMove: lastPv[0] ?? "",
              evaluation: lastEval,
              depth: lastDepth,
              mate: lastMate,
              pv: lastPv,
              searching: true,
            });
          }
        }

        if (line.startsWith("bestmove")) {
          worker.removeEventListener("message", handler);
          const bestMove = line.split(" ")[1] ?? "";
          onUpdate({
            bestMove,
            evaluation: lastEval,
            depth: lastDepth,
            mate: lastMate,
            pv: lastPv,
            searching: false,
          });
        }
      };

      worker.addEventListener("message", handler);
      // Send isready — once we get readyok, the old search is fully drained
      worker.postMessage("isready");

      return () => {
        // Invalidate this search so the handler self-removes
        if (searchIdRef.current === id) {
          searchIdRef.current++;
        }
        worker.removeEventListener("message", handler);
        worker.postMessage("stop");
      };
    },
    [depth]
  );

  const stop = useCallback(() => {
    searchIdRef.current++;
    workerRef.current?.postMessage("stop");
  }, []);

  return { isReady, evaluate, stop };
}
