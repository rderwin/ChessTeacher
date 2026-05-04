"use client";

import { useEffect, useRef, useState } from "react";
import { OpeningLine } from "@/data/types";
import { usePracticeSession, type MoveLogEntry } from "@/hooks/usePracticeSession";
import InteractiveBoard from "@/components/board/InteractiveBoard";
import BoardControls from "@/components/board/BoardControls";
import ProgressBar from "./ProgressBar";
import MoveHistory from "./MoveHistory";
import Confetti from "@/components/ui/Confetti";
import { useToast } from "@/contexts/ToastContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import Link from "next/link";
import { getMoveNumber } from "@/lib/engine";

// --- Concept pill helpers ------------------------------------------------

const CONCEPT_LABELS: Record<string, string> = {
  "center-control": "Center Control",
  development: "Development",
  "king-safety": "King Safety",
  space: "Space",
  "pawn-structure": "Pawn Structure",
  "piece-activity": "Piece Activity",
  tempo: "Tempo",
  prophylaxis: "Prophylaxis",
  attack: "Attack",
  preparation: "Preparation",
};

const CONCEPT_COLORS: Record<string, string> = {
  "center-control": "bg-blue-600/20 text-blue-300 border-blue-500/30",
  development: "bg-green-600/20 text-green-300 border-green-500/30",
  "king-safety": "bg-yellow-600/20 text-yellow-300 border-yellow-500/30",
  space: "bg-purple-600/20 text-purple-300 border-purple-500/30",
  "pawn-structure": "bg-orange-600/20 text-orange-300 border-orange-500/30",
  "piece-activity": "bg-cyan-600/20 text-cyan-300 border-cyan-500/30",
  tempo: "bg-red-600/20 text-red-300 border-red-500/30",
  prophylaxis: "bg-pink-600/20 text-pink-300 border-pink-500/30",
  attack: "bg-rose-600/20 text-rose-300 border-rose-500/30",
  preparation: "bg-amber-600/20 text-amber-300 border-amber-500/30",
};

// -------------------------------------------------------------------------

interface PracticeSessionProps {
  opening: OpeningLine;
  startFen?: string;
  progressKey?: string;
  onShowVariants?: () => void;
}

export default function PracticeSession({
  opening,
  startFen,
  progressKey,
  onShowVariants,
}: PracticeSessionProps) {
  const {
    fen,
    status,
    currentMoveIndex,
    totalMoves,
    moveLog,
    highlightSquares,
    arrows,
    makeMove,
    reset,
    completionPercent,
  } = usePracticeSession(opening, { startFen, progressKey });

  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    opening.playerColor,
  );
  const { show: showToast } = useToast();
  const [confettiKey, setConfettiKey] = useState(0);
  const celebratedRef = useRef(false);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  useKeyboardShortcuts([
    { key: "r", handler: reset },
    {
      key: "f",
      handler: () =>
        setBoardOrientation((o) => (o === "white" ? "black" : "white")),
    },
    ...(onShowVariants ? [{ key: "v", handler: onShowVariants }] : []),
  ]);

  useEffect(() => {
    if (status === "completed" && !celebratedRef.current) {
      celebratedRef.current = true;
      setConfettiKey((k) => k + 1);
      showToast({
        kind: "success",
        title: `Opening complete: ${opening.name}`,
        description: "Nice work! Every move practiced and understood.",
        icon: "🎉",
      });
    }
    if (status !== "completed") {
      celebratedRef.current = false;
    }
  }, [status, showToast, opening.name]);

  // Auto-scroll to the bottom of the log when new entries arrive
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [moveLog.length]);

  const handlePieceDrop = (from: string, to: string): boolean => {
    return makeMove(from, to);
  };

  const isDisabled = status === "opponent-moving" || status === "completed";

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto">
      {confettiKey > 0 && status === "completed" && (
        <Confetti fireKey={confettiKey} />
      )}

      {/* Left: Board */}
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-white">{opening.fullName}</h1>
          <p className="text-stone-400 text-sm mt-1">
            Playing as{" "}
            <span
              className={
                opening.playerColor === "white"
                  ? "text-stone-200"
                  : "text-stone-300"
              }
            >
              {opening.playerColor}
            </span>
          </p>
        </div>

        <InteractiveBoard
          fen={fen}
          playerColor={boardOrientation}
          onPieceDrop={handlePieceDrop}
          highlightSquares={highlightSquares}
          arrows={arrows}
          disabled={isDisabled}
        />

        <BoardControls
          onReset={reset}
          onFlip={() =>
            setBoardOrientation((o) => (o === "white" ? "black" : "white"))
          }
        />
      </div>

      {/* Right: Scrolling explanation log */}
      <div className="flex-1 min-w-[300px] flex flex-col gap-4">
        <ProgressBar
          currentMove={currentMoveIndex}
          totalMoves={totalMoves}
          percent={completionPercent}
        />

        {/* Scrolling move log */}
        <div className="bg-stone-800 rounded-xl border border-stone-700 flex flex-col min-h-0 max-h-[420px]">
          <div className="px-4 pt-3 pb-2 border-b border-stone-700/60 shrink-0">
            <h3 className="text-sm font-medium text-stone-400 flex items-center justify-between">
              <span>
                {status === "waiting-for-user"
                  ? "Your turn — make your move"
                  : status === "opponent-moving"
                    ? "Opponent is thinking..."
                    : status === "wrong-move"
                      ? "Not quite — try the highlighted move"
                      : status === "completed"
                        ? "Opening complete!"
                        : ""}
              </span>
              <span className="text-[10px] text-stone-600 uppercase tracking-wider">
                {currentMoveIndex} / {totalMoves}
              </span>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {moveLog.length === 0 && (
              <p className="text-sm text-stone-500 italic">
                {currentMoveIndex === 0 && opening.playerColor === "white"
                  ? "Make your first move! Click a piece, then click its destination."
                  : "Your turn — make your next move."}
              </p>
            )}
            {moveLog.map((entry) => (
              <LogCard key={entry.id} entry={entry} playerColor={opening.playerColor} />
            ))}
            <div ref={logEndRef} />
          </div>
        </div>

        {/* Completed panel */}
        {status === "completed" && (
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-6 animate-pop">
            <h2 className="text-xl font-bold text-emerald-300 mb-3">
              Opening Complete! 🎉
            </h2>
            <p className="text-stone-300 leading-relaxed mb-4">
              {opening.summary}
            </p>
            <div className="bg-stone-800/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-stone-300 mb-2">
                What&apos;s next?
              </p>
              <ul className="text-sm text-stone-400 space-y-1.5">
                {opening.variants &&
                  opening.variants.length > 0 &&
                  onShowVariants && (
                    <li>
                      →{" "}
                      <button
                        onClick={onShowVariants}
                        className="text-emerald-400 hover:underline"
                      >
                        Explore variants
                      </button>{" "}
                      — learn what to do when your opponent plays something
                      different
                    </li>
                  )}
                <li>
                  →{" "}
                  <Link
                    href="/puzzles/mate-in-one"
                    className="text-emerald-400 hover:underline"
                  >
                    Try tactical puzzles
                  </Link>{" "}
                  — test your pattern recognition
                </li>
                <li>
                  →{" "}
                  <Link
                    href="/trainer"
                    className="text-emerald-400 hover:underline"
                  >
                    Play a game
                  </Link>{" "}
                  — put what you learned into practice
                </li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="px-4 py-2.5 bg-stone-700 text-white rounded-lg hover:bg-stone-600 transition-colors font-medium"
              >
                Practice Again
              </button>
              <Link
                href="/openings"
                className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
              >
                More Openings
              </Link>
            </div>
          </div>
        )}

        <MoveHistory opening={opening} currentMoveIndex={currentMoveIndex} />
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// LogCard renders a single entry in the scrolling move log.
// -------------------------------------------------------------------------

function LogCard({
  entry,
  playerColor,
}: {
  entry: MoveLogEntry;
  playerColor: "white" | "black";
}) {
  if (entry.kind === "wrong-move") {
    return (
      <div className="bg-red-950/30 border border-red-800/40 rounded-lg px-3 py-2.5 text-sm animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
          <span className="text-red-300 font-medium text-xs">Not quite</span>
        </div>
        <p className="text-stone-300">
          You played{" "}
          <span className="font-bold text-red-300">{entry.attempted}</span>.
          The best move is{" "}
          <span className="font-bold text-emerald-300">
            {entry.moveNum} {entry.explanation.san}
          </span>
          .
        </p>
        {entry.specificFeedback && (
          <p className="text-xs text-stone-400 mt-1 italic">
            {entry.specificFeedback}
          </p>
        )}
        <p className="text-xs text-stone-500 mt-1.5">
          Try the highlighted move — or wait and the correct move will play
          automatically.
        </p>
      </div>
    );
  }

  if (entry.kind === "correction") {
    return (
      <div className="bg-stone-900/50 border border-stone-700/40 rounded-lg px-3 py-2 text-sm animate-in fade-in slide-in-from-right-4 duration-300">
        <p className="text-stone-400 text-xs">
          ↳ Auto-played{" "}
          <span className="font-medium text-stone-300">
            {entry.moveNum} {entry.explanation.san}
          </span>{" "}
          — {entry.explanation.why}
        </p>
      </div>
    );
  }

  // player-move or opponent-move
  const isOpponent = entry.kind === "opponent-move";

  return (
    <div
      className={`rounded-lg px-3 py-2.5 text-sm animate-in fade-in slide-in-from-right-4 duration-300 ${
        isOpponent
          ? "bg-stone-900/60 border border-stone-700/40"
          : "bg-emerald-950/20 border border-emerald-800/30"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-bold text-white">
          {entry.moveNum} {entry.explanation.san}
        </span>
        {isOpponent && (
          <span className="text-[10px] bg-stone-700 text-stone-400 px-1.5 py-0.5 rounded">
            Opponent
          </span>
        )}
      </div>
      <p className="text-stone-300 leading-relaxed text-[13px]">
        {entry.explanation.why}
      </p>

      {entry.explanation.concepts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {entry.explanation.concepts.map((c) => (
            <span
              key={c}
              className={`text-[10px] px-2 py-0.5 rounded-full border ${
                CONCEPT_COLORS[c] ??
                "bg-stone-600/20 text-stone-300 border-stone-500/30"
              }`}
            >
              {CONCEPT_LABELS[c] ?? c}
            </span>
          ))}
        </div>
      )}

      {entry.explanation.controls && (
        <p className="text-xs text-stone-500 mt-1.5">
          <span className="font-medium">Controls:</span>{" "}
          {entry.explanation.controls}
        </p>
      )}
      {entry.explanation.prevents && (
        <p className="text-xs text-stone-500 mt-0.5">
          <span className="font-medium">Prevents:</span>{" "}
          {entry.explanation.prevents}
        </p>
      )}
    </div>
  );
}
