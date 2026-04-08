"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ParsedGame } from "@/lib/pgn";
import {
  classifyMove,
  computeCPLoss,
  type MoveClassification,
} from "@/lib/classify-moves";

export interface GameAnalysis {
  /** Classification for each move (same indices as game.moves) */
  moves: MoveClassification[];
  /** How many positions have been analyzed so far */
  progress: number;
  /** Total positions to analyze */
  total: number;
  /** Whether analysis is running */
  analyzing: boolean;
  /** Whether analysis is complete */
  complete: boolean;
}

const INITIAL: GameAnalysis = {
  moves: [],
  progress: 0,
  total: 0,
  analyzing: false,
  complete: false,
};

/**
 * Runs Stockfish on every position in a game to classify each move.
 * Uses a dedicated worker so it doesn't interfere with the live
 * position-by-position analysis panel.
 */
export function useGameAnalysis() {
  const [analysis, setAnalysis] = useState<GameAnalysis>(INITIAL);
  const workerRef = useRef<Worker | null>(null);
  const cancelRef = useRef(false);

  // Clean up worker on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage("quit");
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const analyzeGame = useCallback((game: ParsedGame) => {
    // Cancel any existing analysis
    cancelRef.current = true;
    if (workerRef.current) {
      workerRef.current.postMessage("quit");
      workerRef.current.terminate();
    }

    cancelRef.current = false;

    const worker = new Worker("/stockfish/stockfish-18-lite-single.js");
    workerRef.current = worker;

    // All positions: start + after each move
    const fens = [game.startFen, ...game.moves.map((m) => m.fen)];
    const totalPositions = fens.length;
    const evals: { cp: number; mate: number | null; bestMove: string }[] = [];
    let currentPos = 0;

    setAnalysis({
      moves: [],
      progress: 0,
      total: game.moves.length,
      analyzing: true,
      complete: false,
    });

    function evaluateNext() {
      if (cancelRef.current || currentPos >= totalPositions) {
        if (!cancelRef.current) {
          // Build classifications from evals
          const classifications: MoveClassification[] = [];
          for (let i = 0; i < game.moves.length; i++) {
            const before = evals[i];
            const after = evals[i + 1];
            if (!before || !after) continue;

            const cpLoss = computeCPLoss(
              before.cp,
              before.mate,
              after.cp,
              after.mate,
              game.moves[i].color
            );

            classifications.push({
              classification: classifyMove(cpLoss),
              cpLoss,
              evalAfter: after.cp,
              mateAfter: after.mate,
              bestMoveUci: before.bestMove,
            });
          }

          setAnalysis({
            moves: classifications,
            progress: game.moves.length,
            total: game.moves.length,
            analyzing: false,
            complete: true,
          });
        }
        return;
      }

      const fen = fens[currentPos];
      const turn = fen.split(" ")[1]; // "w" or "b"

      let lastCp = 0;
      let lastMate: number | null = null;
      let lastBestMove = "";

      const handler = (e: MessageEvent) => {
        const line: string =
          typeof e.data === "string" ? e.data : String(e.data);

        if (line.startsWith("info") && line.includes(" score ")) {
          const cpMatch = line.match(/score cp (-?\d+)/);
          const mateMatch = line.match(/score mate (-?\d+)/);
          const pvMatch = line.match(/ pv (\S+)/);
          if (cpMatch) {
            lastCp = parseInt(cpMatch[1]);
            lastMate = null;
          }
          if (mateMatch) lastMate = parseInt(mateMatch[1]);
          if (pvMatch) lastBestMove = pvMatch[1];
        }

        if (line.startsWith("bestmove")) {
          worker.removeEventListener("message", handler);
          const bm = line.split(" ")[1] ?? "";
          if (bm) lastBestMove = bm;

          // Normalize to White's perspective
          const normalizedCp = turn === "b" ? -lastCp : lastCp;
          const normalizedMate =
            lastMate !== null ? (turn === "b" ? -lastMate : lastMate) : null;

          evals.push({ cp: normalizedCp, mate: normalizedMate, bestMove: lastBestMove });
          currentPos++;

          setAnalysis((prev) => ({
            ...prev,
            progress: Math.min(currentPos - 1, game.moves.length),
          }));

          // Continue to next position
          evaluateNext();
        }
      };

      worker.addEventListener("message", handler);
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage("go depth 12"); // Lower depth for speed across many positions
    }

    // Wait for engine ready
    const readyHandler = (e: MessageEvent) => {
      const line = typeof e.data === "string" ? e.data : String(e.data);
      if (line === "readyok") {
        worker.removeEventListener("message", readyHandler);
        evaluateNext();
      }
    };
    worker.addEventListener("message", readyHandler);
    worker.postMessage("uci");
    worker.postMessage("isready");
  }, []);

  const reset = useCallback(() => {
    cancelRef.current = true;
    if (workerRef.current) {
      workerRef.current.postMessage("quit");
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setAnalysis(INITIAL);
  }, []);

  return { analysis, analyzeGame, reset };
}
