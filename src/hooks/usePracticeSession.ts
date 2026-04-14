"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import type { Arrow } from "react-chessboard";
import { OpeningLine, MoveExplanation } from "@/data/types";
import { playSound, getMoveSound } from "@/lib/sounds";

function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const prefs = JSON.parse(localStorage.getItem("chessteacher_prefs") || "{}");
    return prefs.soundEnabled !== false;
  } catch { return true; }
}
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

// --- Timing constants ---------------------------------------------------
// Explanation panels update instantly when a move plays. These delays are
// ONLY the minimum pause between moves so the player can perceive what
// just happened before the opponent responds. Keep them short.
const PLAYER_EXPLANATION_MS = 550;   // pause after player's correct move
const OPPONENT_EXPLANATION_MS = 550; // pause after opponent's auto move
const OPPONENT_ANIMATION_MS = 350;   // delay before opponent plays (for animation feel)
const WRONG_MOVE_PAUSE_MS = 1800;    // show wrong-move feedback, then auto-play correct

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

  // Timers for auto-advance flow — tracked so they can be cancelled if the
  // player makes another move early.
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const opponentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongMoveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (opponentTimerRef.current) {
      clearTimeout(opponentTimerRef.current);
      opponentTimerRef.current = null;
    }
    if (wrongMoveTimerRef.current) {
      clearTimeout(wrongMoveTimerRef.current);
      wrongMoveTimerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

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
        setArrows([
          {
            startSquare: squares.from,
            endSquare: squares.to,
            color: "rgba(0, 180, 0, 0.6)",
          },
        ]);
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

  /** Number of moves played since the Chess instance was created. This
   *  equals the index of the next move to apply from opening.moves. */
  const movesPlayed = useCallback(
    () => chessRef.current.history().length,
    [],
  );

  // Forward-declare so functions can call each other via refs
  const advanceAfterPlayerRef = useRef<() => void>(() => {});
  const playOpponentMoveRef = useRef<() => void>(() => {});

  /** Play the opponent's move at the current chess state and advance. */
  const playOpponentMove = useCallback(() => {
    clearTimers();
    const idx = movesPlayed();
    const move = opening.moves[idx];
    if (!move || move.color === opening.playerColor) return;

    setStatus("opponent-moving");
    setWrongMoveInfo(null);
    clearHighlights();

    opponentTimerRef.current = setTimeout(() => {
      try {
        chessRef.current.move(move.san);
      } catch {
        // bad data — skip
      }
      playSound(getMoveSound(move.san), isSoundEnabled());
      setFen(chessRef.current.fen());
      setCurrentExplanation(move);
      setCurrentMoveIndex(movesPlayed());
      setStatus("showing-explanation");

      // After a short pause, ready for the player's next move
      advanceTimerRef.current = setTimeout(() => {
        const nextIdx = movesPlayed();
        if (nextIdx >= totalMoves) {
          setStatus("completed");
          saveProgress(totalMoves, totalMoves);
          return;
        }

        const nextMove = opening.moves[nextIdx];
        if (nextMove && nextMove.color !== opening.playerColor) {
          // Two opponent moves in a row (rare) — chain
          playOpponentMoveRef.current();
        } else {
          setStatus("waiting-for-user");
          saveProgress(nextIdx, totalMoves);
          showMoveGuide(nextIdx);
        }
      }, OPPONENT_EXPLANATION_MS);
    }, OPPONENT_ANIMATION_MS);
  }, [
    clearTimers,
    movesPlayed,
    opening,
    totalMoves,
    clearHighlights,
    saveProgress,
    showMoveGuide,
  ]);
  playOpponentMoveRef.current = playOpponentMove;

  /** After the player's correct move, brief pause then kick off whatever's next. */
  const advanceAfterPlayer = useCallback(() => {
    clearTimers();
    const nextIdx = movesPlayed();

    if (nextIdx >= totalMoves) {
      setStatus("completed");
      saveProgress(totalMoves, totalMoves);
      return;
    }

    const nextMove = opening.moves[nextIdx];
    if (nextMove && nextMove.color !== opening.playerColor) {
      playOpponentMoveRef.current();
    } else {
      // Player's turn again (e.g. two player moves in a row shouldn't happen,
      // but handle gracefully)
      setStatus("waiting-for-user");
      saveProgress(nextIdx, totalMoves);
      showMoveGuide(nextIdx);
    }
  }, [clearTimers, movesPlayed, totalMoves, opening, saveProgress, showMoveGuide]);
  advanceAfterPlayerRef.current = advanceAfterPlayer;

  /** Auto-play the correct move on the board after a wrong attempt, so the
   *  player sees what they SHOULD have played without needing to click "try again". */
  const autoPlayCorrectMove = useCallback(
    (expectedSan: string, explanation: MoveExplanation) => {
      clearTimers();
      try {
        chessRef.current.move(expectedSan);
      } catch {
        return;
      }
      playSound(getMoveSound(expectedSan), isSoundEnabled());
      setFen(chessRef.current.fen());
      setCurrentExplanation(explanation);
      setCurrentMoveIndex(movesPlayed());
      setWrongMoveInfo(null);
      clearHighlights();
      setStatus("showing-explanation");
      saveProgress(movesPlayed(), totalMoves);

      advanceTimerRef.current = setTimeout(() => {
        advanceAfterPlayerRef.current();
      }, PLAYER_EXPLANATION_MS);
    },
    [clearTimers, movesPlayed, clearHighlights, saveProgress, totalMoves],
  );

  const makeMove = useCallback(
    (from: string, to: string): boolean => {
      // Opponent is mid-animation or game is over — no input
      if (status === "opponent-moving" || status === "completed") return false;

      const idx = movesPlayed();
      if (idx >= totalMoves) return false;

      const expected = opening.moves[idx];
      // If it's somehow the opponent's turn, ignore input
      if (!expected || expected.color !== opening.playerColor) return false;

      const validation = validateMoveAgainstLine(
        chessRef.current,
        from,
        to,
        opening,
        idx,
      );

      if (!validation) return false; // illegal

      if (validation.correct) {
        // Cancel any pending wrong-move auto-play — player fixed it themselves
        clearTimers();

        try {
          chessRef.current.move({ from, to, promotion: "q" });
        } catch {
          return false;
        }
        playSound(getMoveSound(validation.expectedSan), isSoundEnabled());
        setFen(chessRef.current.fen());
        setCurrentExplanation(validation.explanation);
        setCurrentMoveIndex(movesPlayed());
        setWrongMoveInfo(null);
        clearHighlights();
        setStatus("showing-explanation");
        saveProgress(movesPlayed(), totalMoves);

        // Brief pause then advance to opponent / completion
        advanceTimerRef.current = setTimeout(() => {
          advanceAfterPlayerRef.current();
        }, PLAYER_EXPLANATION_MS);

        return true;
      } else {
        // Wrong move — show feedback, then auto-play the correct move so the
        // player sees what they should have played. No "try again" button
        // needed, and the flow keeps moving.
        clearTimers();
        setWrongMoveInfo({
          attempted: validation.playedSan,
          correct: validation.explanation,
          specificFeedback: validation.specificMistakeFeedback,
        });
        highlightMove(validation.expectedSan);
        setStatus("wrong-move");

        wrongMoveTimerRef.current = setTimeout(() => {
          autoPlayCorrectMove(
            validation.expectedSan,
            validation.explanation,
          );
        }, WRONG_MOVE_PAUSE_MS);
        return false;
      }
    },
    [
      status,
      movesPlayed,
      totalMoves,
      opening,
      clearHighlights,
      highlightMove,
      clearTimers,
      saveProgress,
      autoPlayCorrectMove,
    ],
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    chessRef.current = startFen ? new Chess(startFen) : new Chess();
    setFen(chessRef.current.fen());
    setCurrentMoveIndex(0);
    setCurrentExplanation(null);
    setWrongMoveInfo(null);
    clearHighlights();

    if (opening.moves[0]?.color !== opening.playerColor) {
      // First move is opponent's — play it
      setTimeout(() => playOpponentMoveRef.current(), 80);
    } else {
      setStatus("waiting-for-user");
      setTimeout(() => showMoveGuide(0), 80);
    }
  }, [opening, clearHighlights, clearTimers, startFen, showMoveGuide]);

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
    reset,
    completionPercent: Math.round((currentMoveIndex / totalMoves) * 100),
    opening,
  };
}
