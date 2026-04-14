"use client";

import { useState, useEffect, useCallback } from "react";
import { Chess, type Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { usePreferences } from "@/contexts/PreferencesContext";
import { getAllPuzzles } from "@/data/puzzles";
import type { Puzzle } from "@/data/types";
import { useSound } from "@/hooks/useSound";

/**
 * Pick a deterministic "daily" puzzle based on the date.
 * Same puzzle all day, new one tomorrow.
 */
function getDailyPuzzle(): Puzzle {
  const puzzles = getAllPuzzles();
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return puzzles[seed % puzzles.length];
}

export default function DailyPuzzle() {
  const { boardTheme } = usePreferences();
  const { play } = useSound();
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [fen, setFen] = useState("");
  const [status, setStatus] = useState<"playing" | "correct" | "wrong" | "solved">("playing");
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const p = getDailyPuzzle();
    setPuzzle(p);
    setFen(p.fen);
  }, []);

  const handleDrop = useCallback(
    ({ sourceSquare, targetSquare }: { piece: unknown; sourceSquare: string; targetSquare: string | null }) => {
      if (!puzzle || !targetSquare || status !== "playing") return false;

      const expectedSan = puzzle.solution[solutionIndex];
      if (!expectedSan) return false;

      const chess = new Chess(fen);
      try {
        const result = chess.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
        if (!result) return false;

        const normalize = (s: string) => s.replace(/[+#]/g, "");
        if (normalize(result.san) === normalize(expectedSan)) {
          // Correct!
          const newFen = chess.fen();
          setFen(newFen);

          const nextIdx = solutionIndex + 1;
          if (nextIdx >= puzzle.solution.length) {
            setStatus("solved");
            play("complete");
            return true;
          }

          // Auto-play opponent response
          setSolutionIndex(nextIdx);
          play("correct");

          const opponentSan = puzzle.solution[nextIdx];
          if (opponentSan) {
            setTimeout(() => {
              const chess2 = new Chess(newFen);
              try {
                chess2.move(opponentSan);
                setFen(chess2.fen());
                setSolutionIndex(nextIdx + 1);
              } catch { /* bad data */ }
            }, 500);
          }
          return true;
        } else {
          setStatus("wrong");
          play("wrong");
          setTimeout(() => setStatus("playing"), 1500);
          return false;
        }
      } catch {
        return false;
      }
    },
    [puzzle, fen, solutionIndex, status, play]
  );

  const handleClick = useCallback(
    ({ square }: { piece: unknown; square: string | null }) => {
      if (!square || !puzzle) return;

      const playerColor = puzzle.playerColor === "white" ? "w" : "b";

      // If a piece is already selected, try to move it
      if (selectedSquare && selectedSquare !== square) {
        const success = handleDrop({
          piece: null,
          sourceSquare: selectedSquare,
          targetSquare: square,
        });
        setSelectedSquare(null);
        if (success) return;

        // Check if we clicked another friendly piece — re-select
        try {
          const chess = new Chess(fen);
          const piece = chess.get(square as Square);
          if (piece && piece.color === playerColor) {
            setSelectedSquare(square);
          }
        } catch { /* ignore */ }
        return;
      }

      // Deselect if clicking same square
      if (selectedSquare === square) {
        setSelectedSquare(null);
        return;
      }

      // Select a friendly piece
      try {
        const chess = new Chess(fen);
        const piece = chess.get(square as Square);
        if (piece && piece.color === playerColor) {
          setSelectedSquare(square);
        }
      } catch { /* ignore */ }
    },
    [selectedSquare, fen, puzzle, handleDrop]
  );

  // Clear selection when the board changes
  useEffect(() => {
    setSelectedSquare(null);
  }, [fen]);

  if (!mounted || !puzzle) return null;

  const orientation = puzzle.playerColor === "white" ? "white" : "black";

  return (
    <div className="bg-stone-800/50 rounded-xl border border-stone-700/50 p-4 mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Daily Puzzle</h3>
          <p className="text-[11px] text-stone-500">
            {status === "solved" ? "Solved! ✓" : `Find the best move for ${puzzle.playerColor}`}
          </p>
        </div>
        {status === "wrong" && (
          <span className="text-xs text-red-400 font-medium">Try again!</span>
        )}
        {status === "solved" && (
          <span className="text-xs text-emerald-400 font-medium">🎉 Nice!</span>
        )}
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-48 sm:w-56 aspect-square shrink-0">
          <Chessboard
            options={{
              position: fen,
              boardOrientation: orientation,
              onPieceDrop: handleDrop,
              onSquareClick: handleClick,
              onPieceClick: ({ square }: { piece: unknown; square: string | null }) =>
                handleClick({ piece: null, square: square ?? null }),
              squareStyles: selectedSquare
                ? { [selectedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" } }
                : {},
              allowDragging: status === "playing",
              animationDurationInMs: 200,
              boardStyle: { borderRadius: "4px" },
              darkSquareStyle: { backgroundColor: boardTheme.darkSquare },
              lightSquareStyle: { backgroundColor: boardTheme.lightSquare },
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs text-stone-500 mb-2">
            Rating: <span className="text-stone-300">{puzzle.rating}</span>
          </div>
          {status === "solved" && (
            <p className="text-xs text-stone-400 leading-relaxed">
              {puzzle.explanation}
            </p>
          )}
          {status === "playing" && (
            <p className="text-xs text-stone-500 leading-relaxed">
              {puzzle.hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
