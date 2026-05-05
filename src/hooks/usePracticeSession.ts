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

// ---------------------------------------------------------------------------
// The side-panel is a scrolling log. Each entry stays visible forever so the
// player can read explanations at their own pace.
// ---------------------------------------------------------------------------

export type LogEntryKind = "player-move" | "opponent-move" | "wrong-move" | "correction";

export interface MoveLogEntry {
  id: number;
  kind: LogEntryKind;
  /** The explanation for the correct move (or the opponent's move). */
  explanation: MoveExplanation;
  /** Move number label (e.g. "1." or "1...") */
  moveNum: string;
  /** For wrong-move entries: what the player actually tried. */
  attempted?: string;
  /** For wrong-move entries: specific feedback if the mistake is in the data. */
  specificFeedback?: string;
  /** Escalating hint level: 1 = concept, 2 = piece type, 3 = full SAN. */
  hintLevel?: 1 | 2 | 3;
  /** Hint text shown alongside the wrong-move card. */
  hintText?: string;
}

export type PracticeStatus =
  | "waiting-for-user"
  | "opponent-moving"
  | "wrong-move"
  | "completed";

interface PracticeOptions {
  startFen?: string;
  progressKey?: string;
  /** When true, suppress the blue move-guide highlights — used by Surprise Mode
   *  where the player should figure out the right move without hints. */
  hideMoveGuides?: boolean;
  /** When true, wrong moves don't auto-correct — the player has to figure
   *  out and play the right move themselves, with escalating hints after
   *  each wrong attempt. */
  noAutoCorrect?: boolean;
}

export interface MoveLogEntryExtra {
  /** For wrong-move entries: how many wrong attempts so far. */
  attemptNumber?: number;
  /** Escalating hint level: 0 (none) → 1 (concept) → 2 (piece) → 3 (full move) */
  hintLevel?: 0 | 1 | 2 | 3;
}

// Animation delay before the opponent's piece slides (gives a visual beat)
const OPPONENT_ANIMATION_MS = 400;
// How long the wrong-move feedback sits before auto-playing the correct move
const WRONG_MOVE_PAUSE_MS = 2200;

let logIdCounter = 0;

export function usePracticeSession(opening: OpeningLine, options?: PracticeOptions) {
  const startFen = options?.startFen;
  const hideMoveGuides = options?.hideMoveGuides ?? false;
  const noAutoCorrect = options?.noAutoCorrect ?? false;
  const chessRef = useRef(startFen ? new Chess(startFen) : new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());
  const [status, setStatus] = useState<PracticeStatus>("waiting-for-user");
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [moveLog, setMoveLog] = useState<MoveLogEntry[]>([]);
  const [highlightSquares, setHighlightSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const { saveProgress } = useProgress(options?.progressKey ?? opening.id);

  const opponentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tracks consecutive wrong attempts at the CURRENT move position.
  // Resets to 0 when the player plays the correct move.
  const wrongAttemptsRef = useRef(0);

  const clearTimers = useCallback(() => {
    if (opponentTimerRef.current) {
      clearTimeout(opponentTimerRef.current);
      opponentTimerRef.current = null;
    }
    if (wrongTimerRef.current) {
      clearTimeout(wrongTimerRef.current);
      wrongTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const totalMoves = opening.moves.length;
  const userMoveCount = getUserMoveCount(opening);

  const clearHighlights = useCallback(() => {
    setHighlightSquares({});
    setArrows([]);
  }, []);

  const showMoveGuide = useCallback(
    (moveIndex: number) => {
      // Skip showing hints in "no hints" modes (Surprise Mode)
      if (hideMoveGuides) return;
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
    [opening, hideMoveGuides],
  );

  const movesPlayed = useCallback(
    () => chessRef.current.history().length,
    [],
  );

  const getMoveNum = useCallback(
    (moveIndex: number): string => {
      const fullMoveNumber = Math.floor(moveIndex / 2) + 1;
      const isWhite = moveIndex % 2 === 0;
      return isWhite ? `${fullMoveNumber}.` : `${fullMoveNumber}...`;
    },
    [],
  );

  /** Push an entry to the scrolling log. */
  const pushLog = useCallback(
    (entry: Omit<MoveLogEntry, "id">) => {
      const id = ++logIdCounter;
      setMoveLog((prev) => [...prev, { ...entry, id }]);
    },
    [],
  );

  // --- Core flow functions -----------------------------------------------
  // These are stored via refs so they can mutually recurse without stale
  // closure issues.

  const playOpponentAndContinueRef = useRef<() => void>(() => {});
  const readyForPlayerRef = useRef<(idx: number) => void>(() => {});

  /** Set up the board for the player's next move. */
  const readyForPlayer = useCallback(
    (idx: number) => {
      clearTimers();
      if (idx >= totalMoves) {
        setStatus("completed");
        saveProgress(totalMoves, totalMoves);
        return;
      }
      setCurrentMoveIndex(idx);
      setStatus("waiting-for-user");
      saveProgress(idx, totalMoves);
      showMoveGuide(idx);
    },
    [clearTimers, totalMoves, saveProgress, showMoveGuide],
  );
  readyForPlayerRef.current = readyForPlayer;

  /** Play the opponent's move, log it, then advance to the next player turn. */
  const playOpponentAndContinue = useCallback(() => {
    clearTimers();
    const idx = movesPlayed();
    const move = opening.moves[idx];
    if (!move || move.color === opening.playerColor) {
      // Not actually the opponent's turn — go to player
      readyForPlayerRef.current(idx);
      return;
    }

    setStatus("opponent-moving");
    clearHighlights();

    opponentTimerRef.current = setTimeout(() => {
      try {
        chessRef.current.move(move.san);
      } catch { /* bad data */ }
      playSound(getMoveSound(move.san), isSoundEnabled());
      setFen(chessRef.current.fen());

      const nextIdx = movesPlayed();
      setCurrentMoveIndex(nextIdx);

      // Add the opponent's move to the scrolling log
      pushLog({
        kind: "opponent-move",
        explanation: move,
        moveNum: getMoveNum(idx),
      });

      // If the next move is ALSO the opponent's (rare), chain
      const nextMove = opening.moves[nextIdx];
      if (nextMove && nextMove.color !== opening.playerColor) {
        // Tiny delay then chain
        opponentTimerRef.current = setTimeout(() => {
          playOpponentAndContinueRef.current();
        }, OPPONENT_ANIMATION_MS);
      } else {
        readyForPlayerRef.current(nextIdx);
      }
    }, OPPONENT_ANIMATION_MS);
  }, [clearTimers, movesPlayed, opening, clearHighlights, pushLog, getMoveNum]);
  playOpponentAndContinueRef.current = playOpponentAndContinue;

  // Initialize: if the first move is opponent's, play it; otherwise show guide
  useEffect(() => {
    if (
      currentMoveIndex === 0 &&
      opening.moves[0]?.color !== opening.playerColor
    ) {
      playOpponentAndContinue();
    } else if (currentMoveIndex === 0) {
      showMoveGuide(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeMove = useCallback(
    (from: string, to: string): boolean => {
      if (status === "opponent-moving" || status === "completed") return false;

      const idx = movesPlayed();
      if (idx >= totalMoves) return false;

      const expected = opening.moves[idx];
      if (!expected || expected.color !== opening.playerColor) return false;

      const validation = validateMoveAgainstLine(
        chessRef.current,
        from,
        to,
        opening,
        idx,
      );
      if (!validation) return false;

      if (validation.correct) {
        // Cancel any pending wrong-move auto-play
        clearTimers();
        wrongAttemptsRef.current = 0;

        try {
          chessRef.current.move({ from, to, promotion: "q" });
        } catch {
          return false;
        }
        playSound(getMoveSound(validation.expectedSan), isSoundEnabled());
        setFen(chessRef.current.fen());
        setCurrentMoveIndex(movesPlayed());
        clearHighlights();

        // Add explanation to the scrolling log — it stays there for the
        // player to read at their own pace.
        pushLog({
          kind: "player-move",
          explanation: validation.explanation,
          moveNum: getMoveNum(idx),
        });

        saveProgress(movesPlayed(), totalMoves);

        // Immediately queue the opponent's response (or completion)
        const nextIdx = movesPlayed();
        if (nextIdx >= totalMoves) {
          setStatus("completed");
          saveProgress(totalMoves, totalMoves);
        } else {
          const nextMove = opening.moves[nextIdx];
          if (nextMove && nextMove.color !== opening.playerColor) {
            playOpponentAndContinueRef.current();
          } else {
            readyForPlayerRef.current(nextIdx);
          }
        }
        return true;
      } else {
        // Wrong move — add to log so the player sees the explanation.
        clearTimers();
        wrongAttemptsRef.current += 1;

        if (noAutoCorrect) {
          // Escalating hints — each wrong attempt reveals more.
          //   1st mistake: just the explanation card (no hint)
          //   2nd mistake: name the concept they're missing
          //   3rd mistake: highlight the source square (which piece to move)
          //   4th+ mistake: highlight both squares + arrow (full reveal)
          const attemptsCount = wrongAttemptsRef.current;
          let hintLevel: 1 | 2 | 3 | undefined;
          let hintText: string | undefined;
          const expSan = validation.expectedSan;
          const squares = getSquaresForSan(expSan, chessRef.current);

          if (attemptsCount >= 4 && squares) {
            hintLevel = 3;
            hintText = `The move is ${getMoveNum(idx)} ${expSan}.`;
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
          } else if (attemptsCount === 3 && squares) {
            hintLevel = 2;
            // Name the piece type for clarity
            const pieceMap: Record<string, string> = {
              N: "knight", B: "bishop", R: "rook", Q: "queen", K: "king",
            };
            const firstChar = expSan[0];
            const pieceName = pieceMap[firstChar] ?? "pawn";
            hintText = `Hint: it's a ${pieceName} move. The piece is highlighted.`;
            setHighlightSquares({
              [squares.from]: { backgroundColor: "rgba(66, 135, 245, 0.4)" },
            });
            setArrows([]);
          } else if (attemptsCount === 2) {
            hintLevel = 1;
            // Concept-based hint pulled from the explanation's concepts list
            const concepts = validation.explanation.concepts ?? [];
            const labels: Record<string, string> = {
              "center-control": "central control",
              development: "developing a piece",
              "king-safety": "king safety",
              space: "gaining space",
              "pawn-structure": "pawn structure",
              "piece-activity": "piece activity",
              tempo: "tempo (forcing moves)",
              prophylaxis: "prophylaxis",
              attack: "attacking",
              preparation: "preparation",
            };
            const conceptText = concepts
              .slice(0, 2)
              .map((c) => labels[c] ?? c)
              .join(" + ");
            hintText = conceptText
              ? `Hint: think about ${conceptText}.`
              : `Hint: the right move pursues a different idea.`;
            setHighlightSquares({});
            setArrows([]);
          } else {
            // 1st wrong attempt — no hint beyond the explanation card
            setHighlightSquares({});
            setArrows([]);
          }

          pushLog({
            kind: "wrong-move",
            explanation: validation.explanation,
            moveNum: getMoveNum(idx),
            attempted: validation.playedSan,
            specificFeedback: validation.specificMistakeFeedback,
            hintLevel,
            hintText,
          });

          setStatus("wrong-move");
          // Board stays at the pre-move position; player retries. No timer.
          return false;
        }

        // Default behavior: log the wrong move + auto-correct path
        pushLog({
          kind: "wrong-move",
          explanation: validation.explanation,
          moveNum: getMoveNum(idx),
          attempted: validation.playedSan,
          specificFeedback: validation.specificMistakeFeedback,
        });

        setStatus("wrong-move");

        // Otherwise: highlight the correct move and auto-play it after a pause.
        const squares = getSquaresForSan(validation.expectedSan, chessRef.current);
        if (squares) {
          setHighlightSquares({
            [squares.from]: { backgroundColor: "rgba(0, 180, 0, 0.4)" },
            [squares.to]: { backgroundColor: "rgba(0, 180, 0, 0.4)" },
          });
          setArrows([{
            startSquare: squares.from,
            endSquare: squares.to,
            color: "rgba(0, 180, 0, 0.6)",
          }]);
        }

        wrongTimerRef.current = setTimeout(() => {
          try {
            chessRef.current.move(validation.expectedSan);
          } catch {
            return;
          }
          playSound(getMoveSound(validation.expectedSan), isSoundEnabled());
          setFen(chessRef.current.fen());
          setCurrentMoveIndex(movesPlayed());
          clearHighlights();

          pushLog({
            kind: "correction",
            explanation: validation.explanation,
            moveNum: getMoveNum(idx),
          });

          saveProgress(movesPlayed(), totalMoves);

          const nextIdx = movesPlayed();
          if (nextIdx >= totalMoves) {
            setStatus("completed");
            saveProgress(totalMoves, totalMoves);
          } else {
            const nextMove = opening.moves[nextIdx];
            if (nextMove && nextMove.color !== opening.playerColor) {
              playOpponentAndContinueRef.current();
            } else {
              readyForPlayerRef.current(nextIdx);
            }
          }
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
      clearTimers,
      pushLog,
      getMoveNum,
      saveProgress,
    ],
  );

  const reset = useCallback(() => {
    clearTimers();
    chessRef.current = startFen ? new Chess(startFen) : new Chess();
    setFen(chessRef.current.fen());
    setCurrentMoveIndex(0);
    setMoveLog([]);
    clearHighlights();

    if (opening.moves[0]?.color !== opening.playerColor) {
      setTimeout(() => playOpponentAndContinueRef.current(), 80);
    } else {
      setStatus("waiting-for-user");
      setTimeout(() => showMoveGuide(0), 80);
    }
  }, [opening, clearHighlights, clearTimers, startFen, showMoveGuide]);

  // --- Legacy compat fields (still used by PracticeSession rendering) ----
  // currentExplanation = the last log entry's explanation (for ExplanationPanel compat)
  const lastLogEntry = moveLog[moveLog.length - 1] ?? null;
  const currentExplanation = lastLogEntry?.explanation ?? null;
  const wrongMoveInfo = lastLogEntry?.kind === "wrong-move"
    ? {
        attempted: lastLogEntry.attempted ?? "",
        correct: lastLogEntry.explanation,
        specificFeedback: lastLogEntry.specificFeedback,
      }
    : null;

  return {
    fen,
    status,
    currentMoveIndex,
    totalMoves,
    userMoveCount,
    currentExplanation,
    wrongMoveInfo,
    moveLog,
    highlightSquares,
    arrows,
    makeMove,
    reset,
    completionPercent: Math.round((currentMoveIndex / totalMoves) * 100),
    opening,
  };
}
