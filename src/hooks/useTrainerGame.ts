"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { classifyMove, computeCPLoss, mateToCP, type MoveClass } from "@/lib/classify-moves";

export type Difficulty = "beginner" | "intermediate" | "advanced";

const BOT_DEPTH: Record<Difficulty, number> = {
  beginner: 2,
  intermediate: 5,
  advanced: 10,
};

// Depth for evaluating the player's moves (always the same)
const EVAL_DEPTH = 10;

export interface TrainerMove {
  san: string;
  color: "w" | "b";
  classification?: MoveClass;
}

export interface TrainerState {
  fen: string;
  moves: TrainerMove[];
  playerColor: "w" | "b";
  isPlayerTurn: boolean;
  botThinking: boolean;
  evaluating: boolean;
  lastClassification: MoveClass | null;
  moveCount: number;
  gameOver: boolean;
  gameResult: string | null;
  /** Incremented each move to trigger new dog comments */
  moveKey: number;
}

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

/** Promise-based Stockfish evaluation: returns bestMove + eval */
function sfEval(
  worker: Worker,
  fen: string,
  depth: number
): Promise<{ bestMove: string; cp: number; mate: number | null }> {
  return new Promise((resolve) => {
    let lastCp = 0;
    let lastMate: number | null = null;
    let bestMove = "";
    let started = false;

    const handler = (e: MessageEvent) => {
      const line = typeof e.data === "string" ? e.data : String(e.data);

      if (!started) {
        if (line === "readyok") {
          started = true;
          worker.postMessage(`position fen ${fen}`);
          worker.postMessage(`go depth ${depth}`);
        }
        return;
      }

      if (line.startsWith("info") && line.includes(" score ")) {
        const cpMatch = line.match(/score cp (-?\d+)/);
        const mateMatch = line.match(/score mate (-?\d+)/);
        const pvMatch = line.match(/ pv (\S+)/);
        if (cpMatch) {
          lastCp = parseInt(cpMatch[1]);
          lastMate = null;
        }
        if (mateMatch) lastMate = parseInt(mateMatch[1]);
        if (pvMatch) bestMove = pvMatch[1];
      }

      if (line.startsWith("bestmove")) {
        worker.removeEventListener("message", handler);
        const bm = line.split(" ")[1] ?? "";
        if (bm && bm !== "(none)") bestMove = bm;
        resolve({ bestMove, cp: lastCp, mate: lastMate });
      }
    };

    worker.addEventListener("message", handler);
    worker.postMessage("stop");
    worker.postMessage("isready");
  });
}

export function useTrainerGame() {
  const [state, setState] = useState<TrainerState>({
    fen: INITIAL_FEN,
    moves: [],
    playerColor: "w",
    isPlayerTurn: true,
    botThinking: false,
    evaluating: false,
    lastClassification: null,
    moveCount: 0,
    gameOver: false,
    gameResult: null,
    moveKey: 0,
  });

  const chessRef = useRef(new Chess());
  const workerRef = useRef<Worker | null>(null);
  const busyRef = useRef(false);
  const difficultyRef = useRef<Difficulty>("intermediate");

  // Init worker
  useEffect(() => {
    const worker = new Worker("/stockfish/stockfish-18-lite-single.js");
    workerRef.current = worker;

    // Send UCI init
    worker.postMessage("uci");
    worker.postMessage("isready");

    return () => {
      worker.postMessage("quit");
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const startNewGame = useCallback(
    (playerColor: "w" | "b", difficulty: Difficulty) => {
      difficultyRef.current = difficulty;
      const chess = new Chess();
      chessRef.current = chess;
      busyRef.current = false;

      const isPlayerTurn = playerColor === "w";

      setState({
        fen: INITIAL_FEN,
        moves: [],
        playerColor,
        isPlayerTurn,
        botThinking: !isPlayerTurn,
        evaluating: false,
        lastClassification: null,
        moveCount: 0,
        gameOver: false,
        gameResult: null,
        moveKey: 0,
      });

      // If player is Black, bot needs to make the first move
      if (!isPlayerTurn) {
        setTimeout(() => playBotMove(), 300);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const checkGameOver = useCallback((): string | null => {
    const chess = chessRef.current;
    if (chess.isCheckmate()) {
      const loser = chess.turn(); // side to move is the loser
      return loser === "w" ? "0-1" : "1-0";
    }
    if (chess.isStalemate()) return "½-½ (stalemate)";
    if (chess.isDraw()) return "½-½ (draw)";
    return null;
  }, []);

  const playBotMove = useCallback(async () => {
    const worker = workerRef.current;
    if (!worker || busyRef.current) return;
    busyRef.current = true;

    setState((s) => ({ ...s, botThinking: true }));

    const fen = chessRef.current.fen();
    const depth = BOT_DEPTH[difficultyRef.current];

    try {
      const result = await sfEval(worker, fen, depth);
      if (!result.bestMove || result.bestMove === "(none)") {
        busyRef.current = false;
        return;
      }

      const from = result.bestMove.slice(0, 2);
      const to = result.bestMove.slice(2, 4);
      const promotion = result.bestMove.length > 4 ? result.bestMove[4] : undefined;

      const moveResult = chessRef.current.move({
        from,
        to,
        promotion,
      } as Parameters<typeof chessRef.current.move>[0]);

      if (!moveResult) {
        busyRef.current = false;
        return;
      }

      const gameResult = checkGameOver();

      setState((s) => ({
        ...s,
        fen: chessRef.current.fen(),
        moves: [...s.moves, { san: moveResult.san, color: moveResult.color }],
        isPlayerTurn: true,
        botThinking: false,
        gameOver: gameResult !== null,
        gameResult,
        moveKey: s.moveKey + 1,
      }));
    } finally {
      busyRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkGameOver]);

  /** Called when the player drops a piece */
  const makeMove = useCallback(
    async (from: string, to: string, promotion?: string) => {
      const chess = chessRef.current;
      const worker = workerRef.current;

      // Don't allow moves when it's not the player's turn or game is over
      if (busyRef.current || state.gameOver) return false;
      if (chess.turn() !== state.playerColor) return false;

      const fenBefore = chess.fen();
      const turnBefore = chess.turn();

      // Try to make the move — chess.js throws on invalid moves
      let moveResult;
      try {
        moveResult = chess.move({
          from,
          to,
          promotion: promotion || "q",
        } as Parameters<typeof chess.move>[0]);
      } catch {
        return false;
      }
      if (!moveResult) return false;

      busyRef.current = true;

      // Update board immediately
      const fenAfter = chess.fen();
      const gameResult = checkGameOver();

      setState((s) => ({
        ...s,
        fen: fenAfter,
        moves: [...s.moves, { san: moveResult.san, color: moveResult.color }],
        isPlayerTurn: false,
        evaluating: true,
        gameOver: gameResult !== null,
        gameResult,
        moveCount: s.moveCount + 1,
      }));

      // Evaluate the player's move
      if (worker) {
        try {
          const evalResult = await sfEval(worker, fenBefore, EVAL_DEPTH);

          // Normalize to White's perspective
          const normalizedCp =
            turnBefore === "b" ? -evalResult.cp : evalResult.cp;
          const normalizedMate =
            evalResult.mate !== null
              ? turnBefore === "b"
                ? -evalResult.mate
                : evalResult.mate
              : null;

          // Eval after the move: evaluate current position
          const afterResult = await sfEval(worker, fenAfter, EVAL_DEPTH);
          const afterCp =
            chess.turn() === "b" ? -afterResult.cp : afterResult.cp;
          const afterMate =
            afterResult.mate !== null
              ? chess.turn() === "b"
                ? -afterResult.mate
                : afterResult.mate
              : null;

          // Handle terminal positions
          let finalAfterCp = afterCp;
          let finalAfterMate = afterMate;
          if (gameResult !== null) {
            if (chess.isCheckmate()) {
              finalAfterCp = chess.turn() === "w" ? -10000 : 10000;
              finalAfterMate = null;
            } else {
              finalAfterCp = 0;
              finalAfterMate = null;
            }
          }

          const cpLoss = computeCPLoss(
            normalizedCp,
            normalizedMate,
            finalAfterCp,
            finalAfterMate,
            turnBefore
          );

          const classification = classifyMove(cpLoss);

          setState((s) => {
            const moves = [...s.moves];
            const lastPlayerMove = moves.length - (gameResult ? 1 : 1);
            if (lastPlayerMove >= 0 && moves[lastPlayerMove]) {
              moves[lastPlayerMove] = {
                ...moves[lastPlayerMove],
                classification,
              };
            }
            return {
              ...s,
              moves,
              evaluating: false,
              lastClassification: classification,
              moveKey: s.moveKey + 1,
            };
          });
        } catch {
          setState((s) => ({ ...s, evaluating: false }));
        }
      }

      // If game isn't over, let bot play
      if (!gameResult) {
        busyRef.current = false;
        await playBotMove();
      } else {
        busyRef.current = false;
      }

      return true;
    },
    [state.gameOver, state.playerColor, checkGameOver, playBotMove]
  );

  /** Undo the last move pair (player + bot response) */
  const undoMove = useCallback(() => {
    if (busyRef.current || state.moves.length === 0) return;
    const chess = chessRef.current;

    // Undo bot's response if it was the last move
    if (chess.turn() === state.playerColor && state.moves.length >= 2) {
      chess.undo(); // undo bot move
      chess.undo(); // undo player move
      setState((s) => ({
        ...s,
        fen: chess.fen(),
        moves: s.moves.slice(0, -2),
        isPlayerTurn: true,
        lastClassification: null,
        gameOver: false,
        gameResult: null,
        moveKey: s.moveKey + 1,
      }));
    } else if (chess.turn() !== state.playerColor && state.moves.length >= 1) {
      // Just undo the player's move (bot hasn't responded yet)
      chess.undo();
      setState((s) => ({
        ...s,
        fen: chess.fen(),
        moves: s.moves.slice(0, -1),
        isPlayerTurn: true,
        lastClassification: null,
        gameOver: false,
        gameResult: null,
        moveKey: s.moveKey + 1,
      }));
    }
  }, [state.moves.length, state.playerColor]);

  return { state, makeMove, startNewGame, undoMove };
}
