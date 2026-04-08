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

const EMPTY_EVAL: EngineEval = {
  bestMove: "",
  evaluation: 0,
  depth: 0,
  mate: null,
  pv: [],
  searching: true,
};

export function useStockfish(depth = 16) {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const activeHandlerRef = useRef<((e: MessageEvent) => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const worker = new Worker("/stockfish/stockfish-18-lite-single.js");
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent) => {
      const line: string =
        typeof e.data === "string" ? e.data : String(e.data);
      if (line === "readyok") {
        setIsReady(true);
      }
    };

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
   * engine searches deeper, then a final result when `bestmove` arrives.
   * Returns a cancel function.
   */
  const evaluate = useCallback(
    (fen: string, onUpdate: (result: EngineEval) => void): (() => void) => {
      const worker = workerRef.current;
      if (!worker) return () => {};

      // Remove any previous handler
      if (activeHandlerRef.current) {
        worker.removeEventListener("message", activeHandlerRef.current);
        worker.postMessage("stop");
      }

      let lastEval = 0;
      let lastDepth = 0;
      let lastMate: number | null = null;
      let lastPv: string[] = [];
      let cancelled = false;

      const handler = (e: MessageEvent) => {
        if (cancelled) return;
        const line: string =
          typeof e.data === "string" ? e.data : String(e.data);

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

          // Stream intermediate results at every few depths
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
          if (activeHandlerRef.current === handler) {
            activeHandlerRef.current = null;
          }
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

      activeHandlerRef.current = handler;
      worker.addEventListener("message", handler);
      worker.postMessage("ucinewgame");
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(`go depth ${depth}`);

      return () => {
        cancelled = true;
        worker.removeEventListener("message", handler);
        if (activeHandlerRef.current === handler) {
          activeHandlerRef.current = null;
        }
        worker.postMessage("stop");
      };
    },
    [depth]
  );

  const stop = useCallback(() => {
    const worker = workerRef.current;
    if (!worker) return;
    if (activeHandlerRef.current) {
      worker.removeEventListener("message", activeHandlerRef.current);
      activeHandlerRef.current = null;
    }
    worker.postMessage("stop");
  }, []);

  return { isReady, evaluate, stop };
}
