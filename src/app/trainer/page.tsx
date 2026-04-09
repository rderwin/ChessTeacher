"use client";

import { useState, useCallback } from "react";
import { Chess, type Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useTrainerGame, type Difficulty } from "@/hooks/useTrainerGame";
import DogCoach, { type DogMood, classificationToMood } from "@/components/trainer/DogCoach";
import { MOVE_CLASS_COLORS, MOVE_CLASS_SYMBOLS } from "@/lib/classify-moves";

const DIFFICULTIES: { id: Difficulty; label: string; desc: string }[] = [
  { id: "beginner", label: "Puppy", desc: "Easy (~800)" },
  { id: "intermediate", label: "Good Boy", desc: "Medium (~1400)" },
  { id: "advanced", label: "Top Dog", desc: "Hard (~2000)" },
];

export default function TrainerPage() {
  const { boardTheme, pieceStyle } = usePreferences();
  const { state, makeMove, startNewGame, undoMove, requestHint, playForMe } = useTrainerGame();
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [playerColor, setPlayerColor] = useState<"w" | "b">("w");
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const handleDrop = useCallback(
    ({ sourceSquare, targetSquare }: { piece: unknown; sourceSquare: string; targetSquare: string | null }) => {
      if (!targetSquare) return false;
      setSelectedSquare(null);
      makeMove(sourceSquare, targetSquare);
      return true;
    },
    [makeMove]
  );

  // Click-to-move: first click selects, second click moves
  const handleSquareClick = useCallback(
    ({ square }: { piece: unknown; square: string | null }) => {
      if (!square || !state.isPlayerTurn || state.gameOver) return;

      if (selectedSquare) {
        // Second click — deselect if same square
        if (selectedSquare === square) {
          setSelectedSquare(null);
          return;
        }
        // If clicking another friendly piece, re-select it instead
        try {
          const chess = new Chess(state.fen);
          const piece = chess.get(square as Square);
          if (piece && piece.color === state.playerColor) {
            setSelectedSquare(square);
            return;
          }
        } catch { /* ignore */ }
        // Otherwise try to move
        makeMove(selectedSquare, square);
        setSelectedSquare(null);
      } else {
        // First click — select if it's the player's piece
        try {
          const chess = new Chess(state.fen);
          const piece = chess.get(square as Square);
          if (piece && piece.color === state.playerColor) {
            setSelectedSquare(square);
          }
        } catch {
          // invalid square
        }
      }
    },
    [selectedSquare, state.fen, state.isPlayerTurn, state.gameOver, state.playerColor, makeMove]
  );

  const handleNewGame = useCallback(() => {
    startNewGame(playerColor, difficulty);
    setGameStarted(true);
  }, [startNewGame, playerColor, difficulty]);

  // Determine dog mood
  let dogMood: DogMood = "waiting";
  if (!gameStarted) {
    dogMood = "waiting";
  } else if (state.gameOver) {
    if (state.gameResult?.includes("½")) {
      dogMood = "gameover-draw";
    } else {
      const playerWon =
        (state.playerColor === "w" && state.gameResult === "1-0") ||
        (state.playerColor === "b" && state.gameResult === "0-1");
      dogMood = playerWon ? "gameover-win" : "gameover-lose";
    }
  } else if (state.botThinking) {
    dogMood = "thinking";
  } else if (state.evaluating) {
    dogMood = "thinking";
  } else if (state.hint) {
    dogMood = "hint";
  } else if (state.lastClassification) {
    dogMood = classificationToMood(state.lastClassification);
  }

  const orientation = state.playerColor === "w" ? "white" : "black";

  const pieceFilter = [pieceStyle.filter, pieceStyle.shadow]
    .filter((v) => v !== "none")
    .join(" ");

  // Build square styles for click-to-move selection + legal move hints
  const squareStyles: Record<string, React.CSSProperties> = {};
  if (selectedSquare) {
    squareStyles[selectedSquare] = { backgroundColor: "rgba(255, 255, 0, 0.4)" };
    try {
      const chess = new Chess(state.fen);
      const legalMoves = chess.moves({ square: selectedSquare as Square, verbose: true });
      for (const m of legalMoves) {
        const hasTarget = chess.get(m.to as Square);
        squareStyles[m.to] = hasTarget
          ? { backgroundColor: "rgba(255, 255, 0, 0.3)" } // capture
          : { background: "radial-gradient(circle, rgba(0,0,0,0.2) 20%, transparent 20%)" }; // dot
      }
    } catch { /* ignore */ }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Coach Mode 🐕</h1>
      <p className="text-stone-400 mb-6">
        Play against a bot while your furry coach watches every move.
      </p>

      {!gameStarted ? (
        <div className="max-w-lg">
          {/* Setup screen */}
          <div className="bg-stone-800 rounded-xl border border-stone-700 p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Game Setup
            </h2>

            {/* Color picker */}
            <div className="mb-5">
              <label className="text-sm text-stone-400 mb-2 block">
                Play as
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPlayerColor("w")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                    playerColor === "w"
                      ? "border-emerald-500 bg-emerald-950/30 text-white"
                      : "border-stone-600 text-stone-400 hover:border-stone-500"
                  }`}
                >
                  <span className="text-lg">♔</span> White
                </button>
                <button
                  onClick={() => setPlayerColor("b")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                    playerColor === "b"
                      ? "border-emerald-500 bg-emerald-950/30 text-white"
                      : "border-stone-600 text-stone-400 hover:border-stone-500"
                  }`}
                >
                  <span className="text-lg">♚</span> Black
                </button>
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-6">
              <label className="text-sm text-stone-400 mb-2 block">
                Opponent Strength
              </label>
              <div className="flex gap-2">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`flex-1 px-3 py-2.5 rounded-lg border transition-all text-center ${
                      difficulty === d.id
                        ? "border-emerald-500 bg-emerald-950/30 text-white"
                        : "border-stone-600 text-stone-400 hover:border-stone-500"
                    }`}
                  >
                    <div className="text-sm font-medium">{d.label}</div>
                    <div className="text-[10px] text-stone-500">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNewGame}
              className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-semibold text-lg"
            >
              Start Game 🎮
            </button>
          </div>

          {/* Preview dog */}
          <div className="flex justify-center">
            <DogCoach mood="waiting" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Board */}
          <div className="shrink-0">
            <div
              className="aspect-square max-w-[520px]"
              style={
                pieceFilter
                  ? ({ filter: pieceFilter } as React.CSSProperties)
                  : undefined
              }
            >
              <Chessboard
                options={{
                  position: state.fen,
                  boardOrientation: orientation,
                  onPieceDrop: handleDrop,
                  onSquareClick: handleSquareClick,
                  onPieceClick: handleSquareClick,
                  squareStyles,
                  allowDragging: state.isPlayerTurn && !state.gameOver,
                  animationDurationInMs: 200,
                  boardStyle: {
                    borderRadius: "4px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  },
                  darkSquareStyle: {
                    backgroundColor: boardTheme.darkSquare,
                  },
                  lightSquareStyle: {
                    backgroundColor: boardTheme.lightSquare,
                  },
                }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Dog Coach + action buttons */}
            <div className="bg-stone-800 rounded-xl border border-stone-700 p-5">
              <DogCoach mood={dogMood} commentKey={state.moveKey} hint={state.hint} />

              {/* Action buttons — always rendered, disabled when not applicable */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={requestHint}
                  disabled={!state.isPlayerTurn || state.gameOver || state.hintLevel >= 3 || state.evaluating}
                  className="px-3 py-1.5 bg-amber-700 text-amber-100 rounded-lg hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {state.evaluating && state.isPlayerTurn
                    ? "Sniffing... 🐕"
                    : state.hintLevel === 0
                    ? "Hint 💡"
                    : state.hintLevel < 3
                    ? "More help..."
                    : "No more hints"}
                </button>
                <button
                  onClick={playForMe}
                  disabled={!state.isPlayerTurn || state.gameOver || state.evaluating || state.botThinking}
                  className="px-3 py-1.5 bg-stone-700 text-stone-400 rounded-lg hover:bg-stone-600 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Play for me 🐾
                </button>
                <button
                  onClick={() => { undoMove(); setSelectedSquare(null); }}
                  disabled={!state.isPlayerTurn || state.gameOver || state.moves.length === 0}
                  className="px-3 py-1.5 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Undo
                </button>
              </div>
            </div>

            {/* Move list */}
            {state.moves.length > 0 && (
              <div className="bg-stone-800 rounded-xl border border-stone-700 p-4">
                <h3 className="text-sm font-medium text-stone-400 mb-3">
                  Moves
                </h3>
                <div className="flex flex-wrap gap-x-1 gap-y-1 max-h-48 overflow-y-auto">
                  {state.moves.map((move, i) => {
                    const isWhite = move.color === "w";
                    const cls = move.classification;
                    const sym = cls ? MOVE_CLASS_SYMBOLS[cls] : "";
                    const colorCls = cls ? MOVE_CLASS_COLORS[cls] : "";
                    const isPlayer = move.color === state.playerColor;

                    return (
                      <span key={i} className="inline-flex items-center">
                        {isWhite && (
                          <span className="text-stone-600 text-xs mr-0.5 font-mono">
                            {Math.ceil((i + 1) / 2)}.
                          </span>
                        )}
                        <span
                          className={`text-sm px-1.5 py-0.5 rounded ${
                            isPlayer && cls
                              ? colorCls
                              : "text-stone-300"
                          }`}
                        >
                          {move.san}
                          {sym && (
                            <span className="text-[10px] ml-0.5">{sym}</span>
                          )}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGameStarted(false)}
                className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
              >
                ← New game
              </button>
              {state.gameOver && (
                <button
                  onClick={handleNewGame}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors text-sm font-medium"
                >
                  Rematch
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
