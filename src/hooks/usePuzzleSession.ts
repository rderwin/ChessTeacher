"use client";

import { useState, useCallback, useRef } from "react";
import { Chess } from "chess.js";
import type { Puzzle } from "@/data/types";
import {
  validatePuzzleMove,
  isLastPlayerMove,
  getPlayerMoveCount,
} from "@/lib/puzzle-engine";

export type PuzzleStatus =
  | "waiting-for-user"
  | "correct-move" // brief flash before opponent responds
  | "opponent-moving"
  | "wrong-move"
  | "showing-hint"
  | "completed";

interface PuzzleSessionState {
  fen: string;
  status: PuzzleStatus;
  solutionIndex: number;
  attemptsUsed: number;
  hintShown: boolean;
  startTime: number;
  /** Time in ms when puzzle was completed */
  solveTimeMs: number | null;
}

export function usePuzzleSession(puzzle: Puzzle) {
  const chessRef = useRef(new Chess(puzzle.fen));

  const [state, setState] = useState<PuzzleSessionState>({
    fen: puzzle.fen,
    status: "waiting-for-user",
    solutionIndex: 0,
    attemptsUsed: 0,
    hintShown: false,
    startTime: Date.now(),
    solveTimeMs: null,
  });

  const playerMoveCount = getPlayerMoveCount(puzzle);

  /** Play the opponent's response move from the solution */
  const playOpponentMove = useCallback(
    (nextIndex: number) => {
      const opponentSan = puzzle.solution[nextIndex];
      if (!opponentSan) return;

      setState((s) => ({ ...s, status: "opponent-moving" }));

      setTimeout(() => {
        try {
          chessRef.current.move(opponentSan);
        } catch {
          // bad solution data — skip
        }

        const afterIndex = nextIndex + 1;
        setState((s) => ({
          ...s,
          fen: chessRef.current.fen(),
          solutionIndex: afterIndex,
          status: "waiting-for-user",
        }));
      }, 600);
    },
    [puzzle.solution]
  );

  /** Player attempts a move */
  const makeMove = useCallback(
    (from: string, to: string): boolean => {
      if (state.status !== "waiting-for-user") return false;

      const result = validatePuzzleMove(
        chessRef.current,
        from,
        to,
        puzzle,
        state.solutionIndex
      );

      if (!result) return false; // illegal

      if (result.correct) {
        // Apply the correct move
        try {
          chessRef.current.move({ from, to, promotion: "q" });
        } catch {
          return false;
        }

        const newFen = chessRef.current.fen();
        const wasLast = isLastPlayerMove(puzzle, state.solutionIndex);

        if (wasLast) {
          // Puzzle complete!
          setState((s) => ({
            ...s,
            fen: newFen,
            status: "completed",
            solveTimeMs: Date.now() - s.startTime,
          }));
        } else {
          // Show brief correct flash, then play opponent's response
          setState((s) => ({
            ...s,
            fen: newFen,
            status: "correct-move",
          }));

          const nextIndex = state.solutionIndex + 1;
          setTimeout(() => {
            playOpponentMove(nextIndex);
          }, 400);
        }

        return true;
      } else {
        // Wrong move
        setState((s) => ({
          ...s,
          status: "wrong-move",
          attemptsUsed: s.attemptsUsed + 1,
        }));
        return false;
      }
    },
    [state.status, state.solutionIndex, puzzle, playOpponentMove]
  );

  /** Retry after wrong move */
  const retry = useCallback(() => {
    setState((s) => ({ ...s, status: "waiting-for-user" }));
  }, []);

  /** Show the hint */
  const showHint = useCallback(() => {
    setState((s) => ({ ...s, hintShown: true, status: "showing-hint" }));
  }, []);

  /** Dismiss hint and return to playing */
  const dismissHint = useCallback(() => {
    setState((s) => ({ ...s, status: "waiting-for-user" }));
  }, []);

  /** Reset the puzzle from scratch */
  const reset = useCallback(() => {
    chessRef.current = new Chess(puzzle.fen);
    setState({
      fen: puzzle.fen,
      status: "waiting-for-user",
      solutionIndex: 0,
      attemptsUsed: 0,
      hintShown: false,
      startTime: Date.now(),
      solveTimeMs: null,
    });
  }, [puzzle.fen]);

  return {
    fen: state.fen,
    status: state.status,
    solutionIndex: state.solutionIndex,
    attemptsUsed: state.attemptsUsed,
    hintShown: state.hintShown,
    solveTimeMs: state.solveTimeMs,
    playerMoveCount,
    puzzle,
    makeMove,
    retry,
    showHint,
    dismissHint,
    reset,
  };
}
