"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Chess } from "chess.js";
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
  | "feedback"        // showing the result of their response
  | "continuation"    // auto-playing follow-up moves
  | "lesson"          // showing the key lesson before next drill
  | "finished";       // all drills done

export interface DrillFeedback {
  response: DrillResponse;
  playedSan: string;
  wasCorrect: boolean;
}

export function useQueenDrill(scenarioCount = 8) {
  const chessRef = useRef(new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());
  const [phase, setPhase] = useState<DrillPhase>("setup");
  const [scenarios, setScenarios] = useState<QueenDrillScenario[]>([]);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [feedback, setFeedback] = useState<DrillFeedback | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [setupProgress, setSetupProgress] = useState(0);

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
    setFeedback(null);
    setSetupProgress(0);

    const moves = currentScenario.setupMoves;
    moves.forEach((san, i) => {
      addTimer(() => {
        try {
          chessRef.current.move(san);
        } catch { /* skip */ }
        playSound(getMoveSound(san), isSoundEnabled());
        setFen(chessRef.current.fen());
        setSetupProgress(i + 1);

        // After the last setup move, switch to waiting
        if (i === moves.length - 1) {
          addTimer(() => {
            setPhase("waiting");
          }, 400);
        }
      }, (i + 1) * 600);
    });
  }, [currentScenario, clearTimers, addTimer]);

  // Start the first scenario once scenarios are loaded
  useEffect(() => {
    if (scenarios.length > 0 && scenarioIndex === 0) {
      playSetup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarios]);

  /** Player attempts a move. Returns true if accepted (legal). */
  const makeMove = useCallback(
    (from: string, to: string): boolean => {
      if (phase !== "waiting" || !currentScenario) return false;

      const chess = new Chess(chessRef.current.fen());
      let result;
      try {
        result = chess.move({ from, to, promotion: "q" });
      } catch {
        return false;
      }
      if (!result) return false;

      const playedSan = result.san;

      // Find matching response in scenario data
      const match = currentScenario.responses.find(
        (r) => r.san === playedSan,
      );

      // Apply the move to the board
      chessRef.current.move({ from, to, promotion: "q" });
      playSound(getMoveSound(playedSan), isSoundEnabled());
      setFen(chessRef.current.fen());

      const wasCorrect =
        match?.quality === "best" || match?.quality === "good";

      const drillFeedback: DrillFeedback = {
        response: match ?? {
          san: playedSan,
          quality: "mistake",
          feedback: `That move isn't one of the main responses here. The best answer is ${currentScenario.responses.find((r) => r.quality === "best")?.san ?? "unknown"}.`,
        },
        playedSan,
        wasCorrect,
      };

      setFeedback(drillFeedback);
      setScore((s) => ({
        correct: s.correct + (wasCorrect ? 1 : 0),
        total: s.total + 1,
      }));

      if (wasCorrect) {
        playSound("correct", isSoundEnabled());
      } else {
        playSound("wrong", isSoundEnabled());
      }

      setPhase("feedback");

      // If correct and there are continuation moves, auto-play them
      if (wasCorrect && match?.continuation && match.continuation.length > 0) {
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
                addTimer(() => setPhase("lesson"), 600);
              }
            }, (i + 1) * 700);
          });
        }, 1500);
      } else {
        // No continuation — go to lesson after a beat
        addTimer(() => setPhase("lesson"), wasCorrect ? 2000 : 3000);
      }

      return true;
    },
    [phase, currentScenario, addTimer],
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
    // playSetup will be triggered by the useEffect below
  }, [clearTimers, scenarioIndex, scenarios.length]);

  // When scenarioIndex changes, play the new scenario setup
  useEffect(() => {
    if (scenarioIndex > 0 && scenarios.length > 0) {
      playSetup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioIndex]);

  /** Restart all drills with fresh random scenarios. */
  const restart = useCallback(() => {
    clearTimers();
    const picked = pickRandomScenarios(scenarioCount);
    setScenarios(picked);
    setScenarioIndex(0);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPhase("setup");
  }, [clearTimers, scenarioCount]);

  return {
    fen,
    phase,
    scenario: currentScenario,
    scenarioIndex,
    scenarioCount: scenarios.length,
    setupProgress,
    feedback,
    score,
    makeMove,
    nextScenario,
    restart,
  };
}
