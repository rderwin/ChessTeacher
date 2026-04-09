"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Chess, type Square } from "chess.js";
import { classifyMove, computeCPLoss, mateToCP, type MoveClass } from "@/lib/classify-moves";

export type Difficulty =
  | "newborn" | "puppy" | "beginner"
  | "casual" | "intermediate" | "advanced" | "expert";

// For weak bots: Stockfish MultiPV gives top N moves, then we pick randomly
// among them. All moves are "reasonable" — just not always the best.
// pickFrom = how many top moves to choose from (1 = always best).
const BOT_CONFIG: Record<Difficulty, { depth: number; elo: number | null; pickFrom: number }> = {
  newborn: { depth: 4, elo: 1320, pickFrom: 5 },    // ~400-600 — picks from top 5
  puppy: { depth: 4, elo: 1320, pickFrom: 3 },      // ~800-1000 — picks from top 3
  beginner: { depth: 4, elo: 1320, pickFrom: 1 },   // ~1300 — engine best at min ELO
  casual: { depth: 6, elo: 1600, pickFrom: 1 },     // ~1600
  intermediate: { depth: 8, elo: 1900, pickFrom: 1 }, // ~1900
  advanced: { depth: 10, elo: 2200, pickFrom: 1 },  // ~2200
  expert: { depth: 14, elo: null, pickFrom: 1 },    // full strength
};

// Depth for evaluating the player's moves (always the same)
const EVAL_DEPTH = 10;

// --- Hint system helpers ---

const PIECE_NAMES: Record<string, string> = {
  p: "pawn", n: "knight", b: "bishop", r: "rook", q: "queen", k: "king",
};

function getAreaName(square: string): string {
  const file = square.charCodeAt(0) - "a".charCodeAt(0);
  if (file <= 2) return "queenside";
  if (file >= 5) return "kingside";
  return "center";
}

const HINT_L1 = [
  "*sniff sniff* Something smells good on the {area}...",
  "My nose is tingling! Check the {area}!",
  "*ears perk up* The {area} has potential...",
  "Woof! I sense opportunity on the {area}!",
];

const HINT_L2 = [
  "Your {piece} on {square} wants to go somewhere! 🐾",
  "*tail wag* What about that {piece}?",
  "I keep sniffing around your {piece} on {square}... 👃",
  "That {piece} looks eager to move!",
];

const HINT_L3 = [
  "Play {san}! I dug it up for you! 🦴",
  "The answer is {san}! My nose never lies! 👃",
  "*drops {san} at your feet* Fetch!",
  "It's {san}! Go go go! 🐕",
];

function pickHint(templates: string[], replacements: Record<string, string>): string {
  let text = templates[Math.floor(Math.random() * templates.length)];
  for (const [key, value] of Object.entries(replacements)) {
    text = text.replaceAll(`{${key}}`, value);
  }
  return text;
}

interface HintData {
  bestMoveUci: string;
  pieceName: string;
  fromSquare: string;
  san: string;
  area: string;
}

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
  hint: string | null;
  hintLevel: number;
}

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

/** Promise-based Stockfish evaluation: returns bestMove + eval.
 *  elo = target rating via UCI_LimitStrength, or null for full strength.
 *  multiPV = return top N candidate moves (for weaker bot variety). */
function sfEval(
  worker: Worker,
  fen: string,
  depth: number,
  elo: number | null = null,
  multiPV = 1
): Promise<{ bestMove: string; cp: number; mate: number | null; alternatives: string[] }> {
  return new Promise((resolve) => {
    let lastCp = 0;
    let lastMate: number | null = null;
    let bestMove = "";
    let started = false;
    const pvMoves = new Map<number, string>(); // multipv index → first move of that PV

    const handler = (e: MessageEvent) => {
      const line = typeof e.data === "string" ? e.data : String(e.data);

      if (!started) {
        if (line === "readyok") {
          started = true;
          if (elo !== null) {
            worker.postMessage(`setoption name UCI_LimitStrength value true`);
            worker.postMessage(`setoption name UCI_Elo value ${elo}`);
          } else {
            worker.postMessage(`setoption name UCI_LimitStrength value false`);
          }
          worker.postMessage(`setoption name MultiPV value ${multiPV}`);
          worker.postMessage(`position fen ${fen}`);
          worker.postMessage(`go depth ${depth}`);
        }
        return;
      }

      if (line.startsWith("info") && line.includes(" score ")) {
        const cpMatch = line.match(/score cp (-?\d+)/);
        const mateMatch = line.match(/score mate (-?\d+)/);
        const pvMatch = line.match(/ pv (\S+)/);
        const mpvMatch = line.match(/multipv (\d+)/);
        const mpvIndex = mpvMatch ? parseInt(mpvMatch[1]) : 1;

        if (mpvIndex === 1) {
          if (cpMatch) { lastCp = parseInt(cpMatch[1]); lastMate = null; }
          if (mateMatch) lastMate = parseInt(mateMatch[1]);
        }
        if (pvMatch) {
          if (mpvIndex === 1) bestMove = pvMatch[1];
          pvMoves.set(mpvIndex, pvMatch[1]);
        }
      }

      if (line.startsWith("bestmove")) {
        worker.removeEventListener("message", handler);
        const bm = line.split(" ")[1] ?? "";
        if (bm && bm !== "(none)") bestMove = bm;

        // Reset MultiPV to 1 for subsequent eval/hint calls
        if (multiPV > 1) {
          worker.postMessage(`setoption name MultiPV value 1`);
        }

        // Collect alternative moves (PV 2, 3, ... N)
        const alternatives: string[] = [];
        for (let i = 2; i <= multiPV; i++) {
          const m = pvMoves.get(i);
          if (m) alternatives.push(m);
        }

        resolve({ bestMove, cp: lastCp, mate: lastMate, alternatives });
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
    hint: null,
    hintLevel: 0,
  });

  const chessRef = useRef(new Chess());
  const workerRef = useRef<Worker | null>(null);
  const busyRef = useRef(false);
  const difficultyRef = useRef<Difficulty>("intermediate");
  const hintDataRef = useRef<HintData | null>(null);

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
        hint: null,
        hintLevel: 0,
      });

      hintDataRef.current = null;

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
    const { depth, elo, pickFrom } = BOT_CONFIG[difficultyRef.current];

    try {
      const result = await sfEval(worker, fen, depth, elo, pickFrom);
      if (!result.bestMove || result.bestMove === "(none)") {
        busyRef.current = false;
        return;
      }

      // For weaker bots, randomly pick from top N engine moves
      let chosenMove = result.bestMove;
      if (pickFrom > 1 && result.alternatives.length > 0) {
        const candidates = [result.bestMove, ...result.alternatives];
        chosenMove = candidates[Math.floor(Math.random() * candidates.length)];
      }

      const from = chosenMove.slice(0, 2);
      const to = chosenMove.slice(2, 4);
      const promotion = chosenMove.length > 4 ? chosenMove[4] : undefined;

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
      hintDataRef.current = null;

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
        hint: null,
        hintLevel: 0,
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
    hintDataRef.current = null;

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
        hint: null,
        hintLevel: 0,
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
        hint: null,
        hintLevel: 0,
      }));
    }
  }, [state.moves.length, state.playerColor]);

  /** Progressive hint: vague area → which piece → exact move */
  const requestHint = useCallback(async () => {
    const worker = workerRef.current;
    const chess = chessRef.current;
    if (!worker || busyRef.current || state.gameOver) return;
    if (chess.turn() !== state.playerColor) return;

    if (state.hintLevel === 0) {
      // Level 1: evaluate position and give vague area hint
      busyRef.current = true;
      setState((s) => ({ ...s, evaluating: true }));

      try {
        const result = await sfEval(worker, chess.fen(), EVAL_DEPTH);
        if (!result.bestMove || result.bestMove === "(none)") {
          setState((s) => ({ ...s, evaluating: false }));
          return;
        }

        const from = result.bestMove.slice(0, 2);
        const to = result.bestMove.slice(2, 4);
        const promotion = result.bestMove.length > 4 ? result.bestMove[4] : undefined;
        const piece = chess.get(from as Square);
        const pieceName = piece ? PIECE_NAMES[piece.type] || "piece" : "piece";
        const area = getAreaName(to);

        // Get SAN for level 3
        const tempChess = new Chess(chess.fen());
        let san = `${from}${to}`;
        try {
          const m = tempChess.move({ from, to, promotion } as Parameters<typeof tempChess.move>[0]);
          if (m) san = m.san;
        } catch { /* use UCI fallback */ }

        hintDataRef.current = { bestMoveUci: result.bestMove, pieceName, fromSquare: from, san, area };

        const hint = pickHint(HINT_L1, { area });
        setState((s) => ({
          ...s,
          evaluating: false,
          hint,
          hintLevel: 1,
          moveKey: s.moveKey + 1,
        }));
      } finally {
        busyRef.current = false;
      }
    } else if (state.hintLevel === 1 && hintDataRef.current) {
      // Level 2: which piece
      const { pieceName, fromSquare } = hintDataRef.current;
      const hint = pickHint(HINT_L2, { piece: pieceName, square: fromSquare });
      setState((s) => ({ ...s, hint, hintLevel: 2, moveKey: s.moveKey + 1 }));
    } else if (state.hintLevel === 2 && hintDataRef.current) {
      // Level 3: exact move
      const { san } = hintDataRef.current;
      const hint = pickHint(HINT_L3, { san });
      setState((s) => ({ ...s, hint, hintLevel: 3, moveKey: s.moveKey + 1 }));
    }
  }, [state.gameOver, state.playerColor, state.hintLevel]);

  /** Auto-play the engine's best move for the player */
  const playForMe = useCallback(async () => {
    const worker = workerRef.current;
    const chess = chessRef.current;
    if (!worker || busyRef.current || state.gameOver) return;
    if (chess.turn() !== state.playerColor) return;

    // If we already have a hint evaluated, use it
    if (hintDataRef.current) {
      const { bestMoveUci } = hintDataRef.current;
      const from = bestMoveUci.slice(0, 2);
      const to = bestMoveUci.slice(2, 4);
      const promotion = bestMoveUci.length > 4 ? bestMoveUci[4] : undefined;
      hintDataRef.current = null;
      await makeMove(from, to, promotion);
      return;
    }

    // Otherwise evaluate fresh
    busyRef.current = true;
    setState((s) => ({ ...s, evaluating: true }));

    try {
      const result = await sfEval(worker, chess.fen(), EVAL_DEPTH);
      if (!result.bestMove || result.bestMove === "(none)") {
        setState((s) => ({ ...s, evaluating: false }));
        return;
      }
      setState((s) => ({ ...s, evaluating: false }));
      busyRef.current = false;

      const from = result.bestMove.slice(0, 2);
      const to = result.bestMove.slice(2, 4);
      const promotion = result.bestMove.length > 4 ? result.bestMove[4] : undefined;
      await makeMove(from, to, promotion);
    } catch {
      busyRef.current = false;
      setState((s) => ({ ...s, evaluating: false }));
    }
  }, [state.gameOver, state.playerColor, makeMove]);

  return { state, makeMove, startNewGame, undoMove, requestHint, playForMe };
}
