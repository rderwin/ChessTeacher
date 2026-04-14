"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Chess, type Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useSound } from "@/hooks/useSound";
import { useToast } from "@/contexts/ToastContext";
import { getAllPuzzles } from "@/data/puzzles";
import type { Puzzle } from "@/data/types";
import Confetti from "@/components/ui/Confetti";

/**
 * Pick a deterministic "daily" puzzle based on the date.
 * Same puzzle all day, new one tomorrow.
 */
function getDailyPuzzle(): Puzzle {
  const puzzles = getAllPuzzles();
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  return puzzles[seed % puzzles.length];
}

type Status = "playing" | "wrong" | "solved";

export default function DailyPuzzle() {
  const { boardTheme } = usePreferences();
  const { play } = useSound();
  const { show: showToast } = useToast();

  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [fen, setFen] = useState("");
  const [status, setStatus] = useState<Status>("playing");
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const celebratedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const p = getDailyPuzzle();
    setPuzzle(p);
    setFen(p.fen);
  }, []);

  const handleDrop = useCallback(
    ({
      sourceSquare,
      targetSquare,
    }: {
      piece: unknown;
      sourceSquare: string;
      targetSquare: string | null;
    }) => {
      if (!puzzle || !targetSquare || status === "solved") return false;

      const expectedSan = puzzle.solution[solutionIndex];
      if (!expectedSan) return false;

      const chess = new Chess(fen);
      try {
        const result = chess.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });
        if (!result) return false;

        const normalize = (s: string) => s.replace(/[+#]/g, "");
        if (normalize(result.san) === normalize(expectedSan)) {
          // Correct!
          const newFen = chess.fen();
          setFen(newFen);
          setStatus("playing"); // clear any prior "wrong"

          const nextIdx = solutionIndex + 1;
          if (nextIdx >= puzzle.solution.length) {
            setStatus("solved");
            play("complete");
            if (!celebratedRef.current) {
              celebratedRef.current = true;
              setConfettiKey((k) => k + 1);
              showToast({
                kind: "success",
                title: "Daily puzzle solved!",
                description: "Come back tomorrow for a new one.",
                icon: "🎯",
              });
            }
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
              } catch {
                /* bad data */
              }
            }, 450);
          }
          return true;
        } else {
          setStatus("wrong");
          play("wrong");
          setTimeout(() => setStatus("playing"), 1200);
          return false;
        }
      } catch {
        return false;
      }
    },
    [puzzle, fen, solutionIndex, status, play, showToast],
  );

  const handleClick = useCallback(
    ({ square }: { piece: unknown; square: string | null }) => {
      if (!square || !puzzle || status === "solved") return;

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
        } catch {
          /* ignore */
        }
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
      } catch {
        /* ignore */
      }
    },
    [selectedSquare, fen, puzzle, status, handleDrop],
  );

  // Clear selection when the board changes
  useEffect(() => {
    setSelectedSquare(null);
  }, [fen]);

  const resetPuzzle = useCallback(() => {
    if (!puzzle) return;
    setFen(puzzle.fen);
    setSolutionIndex(0);
    setStatus("playing");
    setSelectedSquare(null);
    celebratedRef.current = false;
  }, [puzzle]);

  if (!mounted || !puzzle) return null;

  const orientation = puzzle.playerColor === "white" ? "white" : "black";
  const totalMoves = Math.ceil(puzzle.solution.length / 2);
  const solvedMoves = Math.floor(solutionIndex / 2);

  return (
    <div className="relative bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-2xl border border-stone-700/60 shadow-xl p-5 sm:p-6 mb-8 overflow-hidden">
      {confettiKey > 0 && status === "solved" && (
        <Confetti fireKey={confettiKey} />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden>
              🎯
            </span>
            <h3 className="text-lg font-bold text-white">Daily Puzzle</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-300 border border-amber-700/40">
              Rating {puzzle.rating}
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            {status === "solved"
              ? "Solved for today — come back tomorrow for a new one!"
              : status === "wrong"
                ? "Not quite — look again."
                : `Find the best move for ${puzzle.playerColor}`}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] text-stone-500 uppercase tracking-wider">
            Progress
          </div>
          <div className="text-sm font-semibold text-stone-200">
            {solvedMoves}/{totalMoves}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        <div className="w-full max-w-[320px] sm:w-64 aspect-square shrink-0">
          <Chessboard
            options={{
              position: fen,
              boardOrientation: orientation,
              onPieceDrop: handleDrop,
              onSquareClick: handleClick,
              squareStyles: selectedSquare
                ? {
                    [selectedSquare]: {
                      backgroundColor: "rgba(255, 255, 0, 0.4)",
                    },
                  }
                : {},
              allowDragging: status !== "solved",
              animationDurationInMs: 220,
              boardStyle: {
                borderRadius: "6px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              },
              darkSquareStyle: { backgroundColor: boardTheme.darkSquare },
              lightSquareStyle: { backgroundColor: boardTheme.lightSquare },
            }}
          />
        </div>

        <div className="flex-1 min-w-0 w-full">
          {status === "solved" ? (
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4 animate-pop">
              <p className="text-emerald-300 font-semibold text-sm mb-2">
                🎉 Nice work!
              </p>
              <p className="text-sm text-stone-300 leading-relaxed">
                {puzzle.explanation}
              </p>
              <button
                onClick={resetPuzzle}
                className="mt-3 text-xs text-stone-400 hover:text-stone-200 transition-colors"
              >
                Replay this puzzle
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-stone-900/60 border border-stone-700/40 rounded-xl p-3.5">
                <p className="text-[10px] text-stone-500 uppercase tracking-wider font-medium mb-1">
                  Hint
                </p>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {puzzle.hint}
                </p>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">
                Click a piece, then click where it should go. Wrong moves just
                try again — no retry button needed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
