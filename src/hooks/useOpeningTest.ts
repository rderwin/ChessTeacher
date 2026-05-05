"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import type { OpeningLine, MoveExplanation } from "@/data/types";
import { playSound, getMoveSound } from "@/lib/sounds";

function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const prefs = JSON.parse(localStorage.getItem("chessteacher_prefs") || "{}");
    return prefs.soundEnabled !== false;
  } catch { return true; }
}

/**
 * A "challenge" line: a sequence of moves where the player must find
 * the correct responses. Built from the main line + variants.
 */
interface ChallengeLine {
  name: string;
  moves: MoveExplanation[];
  startFen?: string;
}

/** Build all challenge lines from an opening (main line + variants) */
function buildChallengeLines(opening: OpeningLine): ChallengeLine[] {
  const lines: ChallengeLine[] = [
    { name: "Main Line", moves: opening.moves },
  ];

  if (opening.variants) {
    for (const v of opening.variants) {
      // Replay main line to branch point to get the FEN
      const chess = new Chess();
      for (let i = 0; i < v.branchesAt; i++) {
        const m = opening.moves[i];
        if (!m) break;
        try { chess.move(m.san); } catch { break; }
      }
      lines.push({
        name: v.name,
        moves: [v.opponentMove, ...v.moves],
        startFen: chess.fen(),
      });
    }
  }

  return lines;
}

export type TestStatus =
  | "picking"      // choosing a random line
  | "playing"      // player's turn
  | "opponent"     // auto-playing opponent
  | "wrong"        // wrong move feedback
  | "line-done"    // finished one line
  | "test-done";   // finished all lines

interface TestState {
  fen: string;
  status: TestStatus;
  currentLineIndex: number;
  currentMoveIndex: number;
  score: number;
  mistakes: number;
  totalPlayerMoves: number;
  wrongSan: string | null;
  expectedSan: string | null;
  expectedWhy: string | null;
  wrongFeedback: string | null;
}

export function useOpeningTest(opening: OpeningLine) {
  const lines = useRef(buildChallengeLines(opening)).current;
  const shuffledOrder = useRef(
    [...Array(lines.length).keys()].sort(() => Math.random() - 0.5)
  ).current;

  const chessRef = useRef(new Chess());

  const [state, setState] = useState<TestState>({
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    status: "picking",
    currentLineIndex: 0,
    currentMoveIndex: 0,
    score: 0,
    mistakes: 0,
    totalPlayerMoves: 0,
    wrongSan: null,
    expectedSan: null,
    expectedWhy: null,
    wrongFeedback: null,
  });

  const getCurrentLine = useCallback((): ChallengeLine => {
    const idx = shuffledOrder[state.currentLineIndex] ?? 0;
    return lines[idx];
  }, [lines, shuffledOrder, state.currentLineIndex]);

  /** Start (or continue to) the next line */
  const startNextLine = useCallback(() => {
    if (state.currentLineIndex >= lines.length) {
      setState((s) => ({ ...s, status: "test-done" }));
      return;
    }

    const line = getCurrentLine();
    const startFen = line.startFen;
    chessRef.current = startFen ? new Chess(startFen) : new Chess();

    setState((s) => ({
      ...s,
      fen: chessRef.current.fen(),
      status: "playing",
      currentMoveIndex: 0,
      wrongSan: null,
      expectedSan: null,
      expectedWhy: null,
      wrongFeedback: null,
    }));

    // If first move is opponent's, auto-play it
    const firstMove = line.moves[0];
    if (firstMove && firstMove.color !== opening.playerColor) {
      setTimeout(() => {
        try {
          chessRef.current.move(firstMove.san);
          playSound(getMoveSound(firstMove.san), isSoundEnabled());
        } catch { /* bad data */ }
        setState((s) => ({
          ...s,
          fen: chessRef.current.fen(),
          currentMoveIndex: 1,
          status: "playing",
        }));
      }, 500);
    }
  }, [state.currentLineIndex, getCurrentLine, opening.playerColor, lines.length]);

  /** Player attempts a move */
  const makeMove = useCallback((from: string, to: string): boolean => {
    // Allow moves in "playing" OR "wrong" state — wrong state lets the
    // player retry by just making another move without waiting.
    if (state.status !== "playing" && state.status !== "wrong") return false;

    const line = getCurrentLine();
    const expected = line.moves[state.currentMoveIndex];
    if (!expected) return false;

    // Try the move on a copy to get SAN
    const copy = new Chess(chessRef.current.fen());
    let playedSan: string;
    try {
      const result = copy.move({ from, to, promotion: "q" });
      if (!result) return false;
      playedSan = result.san;
    } catch { return false; }

    const normalize = (s: string) => s.replace(/[+#]/g, "");
    const correct = normalize(playedSan) === normalize(expected.san);

    if (correct) {
      // Apply move
      chessRef.current.move({ from, to, promotion: "q" });
      playSound(getMoveSound(expected.san), isSoundEnabled());

      const nextIdx = state.currentMoveIndex + 1;

      setState((s) => ({
        ...s,
        fen: chessRef.current.fen(),
        score: s.score + 1,
        totalPlayerMoves: s.totalPlayerMoves + 1,
        currentMoveIndex: nextIdx,
        wrongSan: null,
        expectedSan: null,
        expectedWhy: null,
        wrongFeedback: null,
      }));

      // Check if line is done
      if (nextIdx >= line.moves.length) {
        playSound("complete", isSoundEnabled());
        setState((s) => ({ ...s, status: "line-done" }));
        return true;
      }

      // Auto-play opponent's response
      const nextMove = line.moves[nextIdx];
      if (nextMove && nextMove.color !== opening.playerColor) {
        setState((s) => ({ ...s, status: "opponent" }));
        setTimeout(() => {
          try {
            chessRef.current.move(nextMove.san);
            playSound(getMoveSound(nextMove.san), isSoundEnabled());
          } catch { /* bad data */ }

          const afterIdx = nextIdx + 1;
          if (afterIdx >= line.moves.length) {
            playSound("complete", isSoundEnabled());
            setState((s) => ({
              ...s,
              fen: chessRef.current.fen(),
              currentMoveIndex: afterIdx,
              status: "line-done",
            }));
          } else {
            setState((s) => ({
              ...s,
              fen: chessRef.current.fen(),
              currentMoveIndex: afterIdx,
              status: "playing",
            }));
          }
        }, 600);
      }

      return true;
    } else {
      // Wrong move
      playSound("wrong", isSoundEnabled());

      // Check if they played a commonMistake
      let feedback: string | null = null;
      if (expected.commonMistakes) {
        const mistake = expected.commonMistakes.find(
          (m) => normalize(m.san) === normalize(playedSan)
        );
        if (mistake) feedback = mistake.whyBad;
      }

      setState((s) => ({
        ...s,
        status: "wrong",
        mistakes: s.mistakes + 1,
        totalPlayerMoves: s.totalPlayerMoves + 1,
        wrongSan: playedSan,
        expectedSan: expected.san,
        expectedWhy: expected.why,
        wrongFeedback: feedback,
      }));

      return false;
    }
  }, [state.status, state.currentMoveIndex, getCurrentLine, opening.playerColor]);

  /** Retry after wrong move */
  const retry = useCallback(() => {
    setState((s) => ({ ...s, status: "playing", wrongSan: null }));
  }, []);

  /** Move to next line */
  const nextLine = useCallback(() => {
    setState((s) => ({
      ...s,
      currentLineIndex: s.currentLineIndex + 1,
      status: "picking",
    }));
  }, []);

  /**
   * Auto-advance: after a wrong move, briefly show feedback then auto-retry.
   * After a line is done, briefly show the result then go to the next line.
   * No buttons needed — flow is smooth.
   */
  const wrongTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineDoneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (state.status === "wrong") {
      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current);
      wrongTimerRef.current = setTimeout(() => {
        retry();
      }, 2800); // give time to read the feedback
    }
    if (state.status === "line-done") {
      if (lineDoneTimerRef.current) clearTimeout(lineDoneTimerRef.current);
      lineDoneTimerRef.current = setTimeout(() => {
        nextLine();
      }, 2200);
    }
    return () => {
      if (wrongTimerRef.current && state.status !== "wrong") {
        clearTimeout(wrongTimerRef.current);
        wrongTimerRef.current = null;
      }
      if (lineDoneTimerRef.current && state.status !== "line-done") {
        clearTimeout(lineDoneTimerRef.current);
        lineDoneTimerRef.current = null;
      }
    };
  }, [state.status, retry, nextLine]);

  /** Restart the whole test */
  const restart = useCallback(() => {
    chessRef.current = new Chess();
    setState({
      fen: chessRef.current.fen(),
      status: "picking",
      currentLineIndex: 0,
      currentMoveIndex: 0,
      score: 0,
      mistakes: 0,
      totalPlayerMoves: 0,
      wrongSan: null,
      expectedSan: null,
      expectedWhy: null,
      wrongFeedback: null,
    });
  }, []);

  return {
    ...state,
    lineName: getCurrentLine().name,
    totalLines: lines.length,
    lineNumber: state.currentLineIndex + 1,
    accuracy: state.totalPlayerMoves > 0
      ? Math.round((state.score / state.totalPlayerMoves) * 100)
      : 100,
    makeMove,
    retry,
    nextLine,
    startNextLine,
    restart,
    playerColor: opening.playerColor,
  };
}
