"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import type { Arrow } from "react-chessboard";
import { playSound, getMoveSound } from "@/lib/sounds";
import {
  type QueenDrillScenario,
  type DrillResponse,
  pickRandomScenarios,
} from "@/data/queen-drills";

function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const prefs = JSON.parse(localStorage.getItem("chessteacher_prefs") || "{}");
    return prefs.soundEnabled !== false;
  } catch { return true; }
}

export type DrillPhase =
  | "setup"           // auto-playing the setup moves
  | "waiting"         // player's turn to respond
  | "wrong"           // wrong answer — board reverts, try again
  | "correct"         // got it right — showing feedback
  | "continuation"    // auto-playing follow-up moves
  | "lesson"          // key lesson before next drill
  | "finished";       // all drills done

export interface DrillAttempt {
  san: string;
  response: DrillResponse;
  wasCorrect: boolean;
}

export function useQueenDrill(scenarioCount = 10) {
  const chessRef = useRef(new Chess());
  /** FEN of the critical position (after setup, before player moves). */
  const criticalFenRef = useRef("");
  const [fen, setFen] = useState(chessRef.current.fen());
  const [phase, setPhase] = useState<DrillPhase>("setup");
  const [scenarios, setScenarios] = useState<QueenDrillScenario[]>([]);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [attempts, setAttempts] = useState<DrillAttempt[]>([]);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [arrows, setArrows] = useState<Arrow[]>([]);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const currentScenario = scenarios[scenarioIndex] ?? null;

  // Initialize with random scenarios
  useEffect(() => {
    const picked = pickRandomScenarios(scenarioCount);
    setScenarios(picked);
  }, [scenarioCount]);

  // Play setup moves for the current scenario
  const playSetup = useCallback(() => {
    if (!currentScenario) return;
    clearTimers();
    chessRef.current = new Chess();
    setFen(chessRef.current.fen());
    setPhase("setup");
    setAttempts([]);
    setArrows([]);

    const moves = currentScenario.setupMoves;
    moves.forEach((san, i) => {
      addTimer(() => {
        try {
          chessRef.current.move(san);
        } catch { /* skip */ }
        playSound(getMoveSound(san), isSoundEnabled());
        setFen(chessRef.current.fen());

        if (i === moves.length - 1) {
          // Save the critical position FEN for reverting after wrong moves
          criticalFenRef.current = chessRef.current.fen();
          addTimer(() => {
            setPhase("waiting");
          }, 350);
        }
      }, (i + 1) * 550);
    });
  }, [currentScenario, clearTimers, addTimer]);

  // Start the first scenario once scenarios are loaded
  useEffect(() => {
    if (scenarios.length > 0 && scenarioIndex === 0) {
      playSetup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarios]);

  /** Player attempts a move. Returns true if it was legal. */
  const makeMove = useCallback(
    (from: string, to: string): boolean => {
      if ((phase !== "waiting" && phase !== "wrong") || !currentScenario) {
        return false;
      }

      // Make sure we're at the critical position (revert any prior wrong moves)
      chessRef.current = new Chess(criticalFenRef.current);

      const chess = new Chess(criticalFenRef.current);
      let result;
      try {
        result = chess.move({ from, to, promotion: "q" });
      } catch {
        return false;
      }
      if (!result) return false;

      const playedSan = result.san;

      // Find matching response in scenario data
      const match = currentScenario.responses.find((r) => r.san === playedSan);
      const isCorrect = match?.quality === "best" || match?.quality === "good";

      const attempt: DrillAttempt = {
        san: playedSan,
        response: match ?? {
          san: playedSan,
          quality: "mistake",
          feedback: `Not the best response here. Look for a move that directly addresses the queen's threat.`,
        },
        wasCorrect: isCorrect,
      };

      setAttempts((prev) => [...prev, attempt]);

      if (isCorrect) {
        // Apply the correct move to the board
        chessRef.current.move({ from, to, promotion: "q" });
        playSound(getMoveSound(playedSan), isSoundEnabled());
        setFen(chessRef.current.fen());
        setArrows([]);
        playSound("correct", isSoundEnabled());

        setScore((s) => ({
          correct: s.correct + (attempts.length === 0 ? 1 : 0), // only first-try counts
          total: s.total + (attempts.length === 0 ? 1 : 0),
        }));

        setPhase("correct");

        // Play continuation if available
        if (match?.continuation && match.continuation.length > 0) {
          addTimer(() => {
            setPhase("continuation");
            match.continuation!.forEach((san, i) => {
              addTimer(() => {
                try {
                  chessRef.current.move(san);
                } catch { /* skip */ }
                playSound(getMoveSound(san), isSoundEnabled());
                setFen(chessRef.current.fen());

                if (i === match.continuation!.length - 1) {
                  addTimer(() => setPhase("lesson"), 500);
                }
              }, (i + 1) * 650);
            });
          }, 1200);
        } else {
          addTimer(() => setPhase("lesson"), 1500);
        }
      } else {
        // WRONG — show the move briefly, then revert the board
        chessRef.current.move({ from, to, promotion: "q" });
        setFen(chessRef.current.fen());
        playSound("wrong", isSoundEnabled());

        // Count as incorrect on first attempt
        if (attempts.length === 0) {
          setScore((s) => ({ correct: s.correct, total: s.total + 1 }));
        }

        // After a beat, revert the board and show threat arrows
        addTimer(() => {
          chessRef.current = new Chess(criticalFenRef.current);
          setFen(criticalFenRef.current);

          // Show threat arrows so they can SEE the danger
          const threatArrows: Arrow[] = currentScenario.threatArrows.map((a) => ({
            startSquare: a.from,
            endSquare: a.to,
            color: "rgba(239, 68, 68, 0.7)",
          }));
          setArrows(threatArrows);
          setPhase("wrong");
        }, 800);
      }

      return true;
    },
    [phase, currentScenario, attempts, addTimer],
  );

  /** Move to the next scenario. */
  const nextScenario = useCallback(() => {
    clearTimers();
    const next = scenarioIndex + 1;
    if (next >= scenarios.length) {
      setPhase("finished");
      return;
    }
    setScenarioIndex(next);
  }, [clearTimers, scenarioIndex, scenarios.length]);

  // When scenarioIndex changes, play the new scenario
  useEffect(() => {
    if (scenarioIndex > 0 && scenarios.length > 0) {
      playSetup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioIndex]);

  /** Restart with fresh random scenarios. */
  const restart = useCallback(() => {
    clearTimers();
    const picked = pickRandomScenarios(scenarioCount);
    setScenarios(picked);
    setScenarioIndex(0);
    setScore({ correct: 0, total: 0 });
    setAttempts([]);
    setArrows([]);
    setPhase("setup");
  }, [clearTimers, scenarioCount]);

  return {
    fen,
    phase,
    scenario: currentScenario,
    scenarioIndex,
    scenarioCount: scenarios.length,
    attempts,
    score,
    arrows,
    makeMove,
    nextScenario,
    restart,
  };
}
