"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import type { Arrow } from "react-chessboard";
import { playSound, getMoveSound } from "@/lib/sounds";
import {
  type QueenGauntlet,
  type GauntletResponse,
  pickRandomGauntlets,
} from "@/data/queen-gauntlets";

function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const prefs = JSON.parse(localStorage.getItem("chessteacher_prefs") || "{}");
    return prefs.soundEnabled !== false;
  } catch { return true; }
}

export type GauntletPhase =
  | "setup"          // auto-playing setup moves
  | "waiting"        // waiting for player's correct move
  | "wrong"          // player made wrong move, will undo
  | "correct"        // showing correct-move feedback
  | "bot-moving"     // bot is animating its response
  | "done"           // gauntlet finished
  | "all-finished";  // all gauntlets in the session done

export interface LogEntry {
  id: number;
  kind: "bot-move" | "player-good" | "player-wrong" | "context";
  san?: string;
  text: string;
}

let logIdCounter = 0;

export function useQueenGauntlet(gauntletCount = 4) {
  const chessRef = useRef(new Chess());
  /** FEN at the start of the current player turn — used to undo wrong moves. */
  const turnFenRef = useRef("");

  const [fen, setFen] = useState(chessRef.current.fen());
  const [phase, setPhase] = useState<GauntletPhase>("setup");
  const [gauntlets, setGauntlets] = useState<QueenGauntlet[]>([]);
  const [gauntletIndex, setGauntletIndex] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [arrows, setArrows] = useState<Arrow[]>([]);

  // Per-game stats for the active gauntlet
  const [turnAttempts, setTurnAttempts] = useState(0);
  const [stats, setStats] = useState({ correct: 0, firstTry: 0, totalTurns: 0 });

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);
  const addTimer = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);
  useEffect(() => () => clearTimers(), [clearTimers]);

  const currentGauntlet = gauntlets[gauntletIndex] ?? null;
  const currentTurn = currentGauntlet?.turns[turnIndex] ?? null;

  const pushLog = useCallback((entry: Omit<LogEntry, "id">) => {
    setLog((prev) => [...prev, { ...entry, id: ++logIdCounter }]);
  }, []);

  // Initialize gauntlets
  useEffect(() => {
    setGauntlets(pickRandomGauntlets(gauntletCount));
  }, [gauntletCount]);

  // Setup: play setupMoves, then enter waiting phase
  const startGauntlet = useCallback(() => {
    if (!currentGauntlet) return;
    clearTimers();

    chessRef.current = new Chess();
    setFen(chessRef.current.fen());
    setLog([]);
    setArrows([]);
    setTurnIndex(0);
    setTurnAttempts(0);
    setPhase("setup");

    const moves = currentGauntlet.setupMoves;
    if (moves.length === 0) {
      // No setup — straight to player's first turn
      turnFenRef.current = chessRef.current.fen();
      const firstTurn = currentGauntlet.turns[0];
      pushLog({ kind: "context", text: firstTurn.context });
      addTimer(() => setPhase("waiting"), 200);
      return;
    }

    moves.forEach((san, i) => {
      addTimer(() => {
        try { chessRef.current.move(san); } catch { /* skip */ }
        playSound(getMoveSound(san), isSoundEnabled());
        setFen(chessRef.current.fen());
        pushLog({ kind: "bot-move", san, text: `Opponent played ${san}.` });
        if (i === moves.length - 1) {
          turnFenRef.current = chessRef.current.fen();
          const firstTurn = currentGauntlet.turns[0];
          pushLog({ kind: "context", text: firstTurn.context });
          addTimer(() => setPhase("waiting"), 350);
        }
      }, (i + 1) * 550);
    });
  }, [currentGauntlet, clearTimers, addTimer, pushLog]);

  // Start when a gauntlet becomes available
  useEffect(() => {
    if (gauntlets.length > 0 && phase === "setup") {
      startGauntlet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gauntlets, gauntletIndex]);

  /** Player attempts a move. */
  const makeMove = useCallback(
    (from: string, to: string): boolean => {
      if (!currentGauntlet || !currentTurn) return false;
      if (phase !== "waiting" && phase !== "wrong") return false;

      // Restore the turn position (in case a previous wrong move is on screen)
      chessRef.current = new Chess(turnFenRef.current);

      const test = new Chess(turnFenRef.current);
      let result;
      try {
        result = test.move({ from, to, promotion: "q" });
      } catch { return false; }
      if (!result) return false;

      const playedSan = result.san;
      const match = currentTurn.responses.find((r) => r.san === playedSan);
      const isLastTurn = currentTurn.botResponse === null;

      // The gauntlet only advances if:
      //   - This is the LAST turn (any recognized response works), OR
      //   - The player played the "best" canonical move (so the bot's
      //     scripted next move makes sense in the resulting position).
      // Other recognized moves get specific feedback but UNDO so the
      // player retries with the canonical move. This prevents the bot
      // from playing a now-blundering scripted move.
      const advances = match && (isLastTurn || match.quality === "best");

      if (advances) {
        // Correct! Apply, advance.
        chessRef.current.move({ from, to, promotion: "q" });
        playSound(getMoveSound(playedSan), isSoundEnabled());
        playSound("correct", isSoundEnabled());
        setFen(chessRef.current.fen());
        setArrows([]);

        const wasFirstTry = turnAttempts === 0;
        setStats((s) => ({
          correct: s.correct + 1,
          firstTry: s.firstTry + (wasFirstTry ? 1 : 0),
          totalTurns: s.totalTurns + 1,
        }));

        const prefix =
          match.quality === "best"
            ? "✅ Best!"
            : match.quality === "good"
              ? "👍 Good!"
              : "OK.";
        pushLog({
          kind: "player-good",
          san: playedSan,
          text: `${prefix} ${match.feedback}`,
        });

        setPhase("correct");

        // Bot's response (or end of gauntlet)
        if (currentTurn.botResponse) {
          addTimer(() => {
            setPhase("bot-moving");
            addTimer(() => {
              try { chessRef.current.move(currentTurn.botResponse!); } catch { /* skip */ }
              playSound(getMoveSound(currentTurn.botResponse!), isSoundEnabled());
              setFen(chessRef.current.fen());
              pushLog({
                kind: "bot-move",
                san: currentTurn.botResponse!,
                text: currentTurn.botExplanation
                  ? `Opponent: ${currentTurn.botResponse} — ${currentTurn.botExplanation}`
                  : `Opponent played ${currentTurn.botResponse}.`,
              });

              // Advance to next turn
              addTimer(() => {
                const nextIdx = turnIndex + 1;
                turnFenRef.current = chessRef.current.fen();
                setTurnIndex(nextIdx);
                setTurnAttempts(0);
                if (nextIdx < currentGauntlet.turns.length) {
                  pushLog({
                    kind: "context",
                    text: currentGauntlet.turns[nextIdx].context,
                  });
                  setPhase("waiting");
                } else {
                  setPhase("done");
                }
              }, 600);
            }, 350);
          }, 1500);
        } else {
          // No bot response — gauntlet over
          addTimer(() => setPhase("done"), 1500);
        }
        return true;
      } else {
        // Move not advancing — either recognized but non-canonical, or
        // unrecognized. Show on the board briefly, then undo.
        chessRef.current.move({ from, to, promotion: "q" });
        playSound("wrong", isSoundEnabled());
        setFen(chessRef.current.fen());
        setTurnAttempts((n) => n + 1);

        const feedback = match
          ? match.feedback
          : currentTurn.fallbackFeedback;
        const prefix = match ? "🔄" : "❌";

        pushLog({
          kind: "player-wrong",
          san: playedSan,
          text: `${prefix} ${playedSan} — ${feedback}`,
        });

        addTimer(() => {
          chessRef.current = new Chess(turnFenRef.current);
          setFen(turnFenRef.current);
          setPhase("wrong");
        }, 1200);

        return false;
      }
    },
    [currentGauntlet, currentTurn, phase, turnIndex, turnAttempts, addTimer, pushLog],
  );

  /** Move to the next gauntlet. */
  const nextGauntlet = useCallback(() => {
    clearTimers();
    const next = gauntletIndex + 1;
    if (next >= gauntlets.length) {
      setPhase("all-finished");
      return;
    }
    setGauntletIndex(next);
    setPhase("setup");
  }, [clearTimers, gauntletIndex, gauntlets.length]);

  /** Restart with new random gauntlets. */
  const restart = useCallback(() => {
    clearTimers();
    setGauntlets(pickRandomGauntlets(gauntletCount));
    setGauntletIndex(0);
    setTurnIndex(0);
    setTurnAttempts(0);
    setStats({ correct: 0, firstTry: 0, totalTurns: 0 });
    setLog([]);
    setArrows([]);
    setPhase("setup");
  }, [clearTimers, gauntletCount]);

  return {
    fen,
    phase,
    gauntlet: currentGauntlet,
    gauntletIndex,
    gauntletCount: gauntlets.length,
    currentTurn,
    turnIndex,
    log,
    arrows,
    stats,
    makeMove,
    nextGauntlet,
    restart,
  };
}
