"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import type { Arrow } from "react-chessboard";
import { OpeningLine, MoveExplanation } from "@/data/types";
import {
  validateMoveAgainstLine,
  getSquaresForSan,
  getUserMoveCount,
} from "@/lib/engine";
import { useProgress } from "./useProgress";

export type PracticeStatus =
  | "waiting-for-user"
  | "showing-explanation"
  | "wrong-move"
  | "opponent-moving"
  | "completed";

interface WrongMoveInfo {
  attempted: string;
  correct: MoveExplanation;
  specificFeedback?: string;
}

interface PracticeOptions {
  /** Start from a specific FEN instead of the initial position */
  startFen?: string;
  /** Override the progress key (e.g., for variants: "italian-game:two-knights") */
  progressKey?: string;
}

export function usePracticeSession(opening: OpeningLine, options?: PracticeOptions) {
  const startFen = options?.startFen;
  const chessRef = useRef(startFen ? new Chess(startFen) : new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());
  const [status, setStatus] = useState<PracticeStatus>("waiting-for-user");
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [currentExplanation, setCurrentExplanation] =
    useState<MoveExplanation | null>(null);
  const [wrongMoveInfo, setWrongMoveInfo] = useState<WrongMoveInfo | null>(
    null
  );
  const [highlightSquares, setHighlightSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const { saveProgress } = useProgress(options?.progressKey ?? opening.id);

  const totalMoves = opening.moves.length;
  const userMoveCount = getUserMoveCount(opening);

  const clearHighlights = useCallback(() => {
    setHighlightSquares({});
    setArrows([]);
  }, []);

  const highlightMove = useCallback(
    (san: string) => {
      const squares = getSquaresForSan(san, chessRef.current);
      if (squares) {
        setHighlightSquares({
          [squares.from]: { backgroundColor: "rgba(0, 180, 0, 0.4)" },
          [squares.to]: { backgroundColor: "rgba(0, 180, 0, 0.4)" },
        });
        setArrows([{ startSquare: squares.from, endSquare: squares.to, color: "rgba(0, 180, 0, 0.6)" }]);
      }
    },
    []
  );

  /** Show a subtle guide glow on the piece to move and its destination */
  const showMoveGuide = useCallback(
    (moveIndex: number) => {
      const expected = opening.moves[moveIndex];
      if (!expected || expected.color !== opening.playerColor) return;
      const squares = getSquaresForSan(expected.san, chessRef.current);
      if (squares) {
        setHighlightSquares({
          [squares.from]: { backgroundColor: "rgba(66, 135, 245, 0.25)" },
          [squares.to]: { backgroundColor: "rgba(66, 135, 245, 0.15)" },
        });
      }
    },
    [opening]
  );

  // Play opponent's move automatically
  const playOpponentMove = useCallback(() => {
    const move = opening.moves[currentMoveIndex];
    if (!move || move.color === opening.playerColor) return;

    setStatus("opponent-moving");
    setTimeout(() => {
      try {
        chessRef.current.move(move.san);
        setFen(chessRef.current.fen());
      } catch {
        // Move failed — data issue
      }
      setCurrentExplanation(move);
      setStatus("showing-explanation");
    }, 600);
  }, [currentMoveIndex, opening]);

  // Initialize: if the first move is opponent's, play it; otherwise show guide
  useEffect(() => {
    if (
      currentMoveIndex === 0 &&
      opening.moves[0]?.color !== opening.playerColor
    ) {
      playOpponentMove();
    } else if (currentMoveIndex === 0) {
      showMoveGuide(0);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const makeMove = useCallback(
    (from: string, to: string): boolean => {
      if (status !== "waiting-for-user") return false;
      if (currentMoveIndex >= totalMoves) return false;

      const validation = validateMoveAgainstLine(
        chessRef.current,
        from,
        to,
        opening,
        currentMoveIndex
      );

      if (!validation) return false; // illegal move

      if (validation.correct) {
        // Apply the correct move
        chessRef.current.move({ from, to, promotion: "q" });
        setFen(chessRef.current.fen());
        setCurrentExplanation(validation.explanation);
        setWrongMoveInfo(null);
        clearHighlights();
        setStatus("showing-explanation");
        return true;
      } else {
        // Wrong move
        setWrongMoveInfo({
          attempted: validation.playedSan,
          correct: validation.explanation,
          specificFeedback: validation.specificMistakeFeedback,
        });
        highlightMove(validation.expectedSan);
        setStatus("wrong-move");
        return false;
      }
    },
    [
      status,
      currentMoveIndex,
      totalMoves,
      opening,
      clearHighlights,
      highlightMove,
    ]
  );

  const advance = useCallback(() => {
    const nextIndex = currentMoveIndex + 1;

    if (nextIndex >= totalMoves) {
      setStatus("completed");
      saveProgress(totalMoves, totalMoves);
      return;
    }

    setCurrentMoveIndex(nextIndex);
    setCurrentExplanation(null);
    clearHighlights();

    const nextMove = opening.moves[nextIndex];
    if (nextMove && nextMove.color !== opening.playerColor) {
      // Next is opponent's move — play it automatically
      setStatus("opponent-moving");
      setTimeout(() => {
        try {
          chessRef.current.move(nextMove.san);
          setFen(chessRef.current.fen());
        } catch {
          // Move failed
        }
        setCurrentExplanation(nextMove);
        setStatus("showing-explanation");
      }, 600);
    } else {
      setStatus("waiting-for-user");
      saveProgress(nextIndex, totalMoves);
      showMoveGuide(nextIndex);
    }
  }, [currentMoveIndex, totalMoves, opening, clearHighlights, saveProgress, showMoveGuide]);

  const retry = useCallback(() => {
    setWrongMoveInfo(null);
    clearHighlights();
    setStatus("waiting-for-user");
    showMoveGuide(currentMoveIndex);
  }, [clearHighlights, showMoveGuide, currentMoveIndex]);

  const reset = useCallback(() => {
    chessRef.current = startFen ? new Chess(startFen) : new Chess();
    setFen(chessRef.current.fen());
    setCurrentMoveIndex(0);
    setCurrentExplanation(null);
    setWrongMoveInfo(null);
    clearHighlights();

    if (opening.moves[0]?.color !== opening.playerColor) {
      // First move is opponent's
      setTimeout(() => {
        const move = opening.moves[0];
        setStatus("opponent-moving");
        setTimeout(() => {
          try {
            chessRef.current.move(move.san);
            setFen(chessRef.current.fen());
          } catch {
            // Move failed
          }
          setCurrentExplanation(move);
          setStatus("showing-explanation");
        }, 600);
      }, 100);
    } else {
      setStatus("waiting-for-user");
    }
  }, [opening, clearHighlights]);

  return {
    fen,
    status,
    currentMoveIndex,
    totalMoves,
    userMoveCount,
    currentExplanation,
    wrongMoveInfo,
    highlightSquares,
    arrows,
    makeMove,
    advance,
    retry,
    reset,
    completionPercent: Math.round((currentMoveIndex / totalMoves) * 100),
    opening,
  };
}
