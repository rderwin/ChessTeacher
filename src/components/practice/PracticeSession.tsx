"use client";

import { useState } from "react";
import { OpeningLine } from "@/data/types";
import { usePracticeSession } from "@/hooks/usePracticeSession";
import InteractiveBoard from "@/components/board/InteractiveBoard";
import BoardControls from "@/components/board/BoardControls";
import ExplanationPanel from "./ExplanationPanel";
import WrongMoveOverlay from "./WrongMoveOverlay";
import ProgressBar from "./ProgressBar";
import MoveHistory from "./MoveHistory";
import Link from "next/link";

interface PracticeSessionProps {
  opening: OpeningLine;
  /** Start from a specific FEN (for variants) */
  startFen?: string;
  /** Override the progress key (for variants) */
  progressKey?: string;
  /** Navigate to variant selection */
  onShowVariants?: () => void;
}

export default function PracticeSession({ opening, startFen, progressKey, onShowVariants }: PracticeSessionProps) {
  const {
    fen,
    status,
    currentMoveIndex,
    totalMoves,
    currentExplanation,
    wrongMoveInfo,
    highlightSquares,
    arrows,
    makeMove,
    reset,
    completionPercent,
  } = usePracticeSession(opening, { startFen, progressKey });

  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    opening.playerColor
  );

  const handlePieceDrop = (from: string, to: string): boolean => {
    return makeMove(from, to);
  };

  // Only disable the board when the opponent is moving or game is over.
  // Wrong-move state KEEPS the board active so the player can just click
  // another move to retry (no "Try Again" button needed).
  const isDisabled =
    status === "opponent-moving" ||
    status === "completed";

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto">
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

      {/* Right: Info Panel */}
      <div className="flex-1 min-w-[300px] flex flex-col gap-4">
        <ProgressBar
          currentMove={currentMoveIndex}
          totalMoves={totalMoves}
          percent={completionPercent}
        />

        {/* Status-dependent content */}
        {status === "waiting-for-user" && !currentExplanation && (
          <div className="bg-stone-800 rounded-xl p-5 border border-stone-700">
            <p className="text-stone-300">
              {currentMoveIndex === 0 && opening.playerColor === "white"
                ? "Make your first move! Click a piece, then click its destination."
                : "Your turn — make your next move."}
            </p>
          </div>
        )}

        {status === "opponent-moving" && (
          <div className="bg-stone-800 rounded-xl p-5 border border-stone-700">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse" />
              <p className="text-stone-400">Opponent is thinking...</p>
            </div>
          </div>
        )}

        {status === "showing-explanation" && currentExplanation && (
          <ExplanationPanel
            explanation={currentExplanation}
            moveIndex={currentMoveIndex}
            isOpponentMove={
              currentExplanation.color !== opening.playerColor
            }
          />
        )}

        {status === "wrong-move" && wrongMoveInfo && (
          <WrongMoveOverlay
            attempted={wrongMoveInfo.attempted}
            correct={wrongMoveInfo.correct}
            moveIndex={currentMoveIndex}
            specificFeedback={wrongMoveInfo.specificFeedback}
          />
        )}

        {status === "completed" && (
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-300 mb-3">
              Opening Complete! 🎉
            </h2>
            <p className="text-stone-300 leading-relaxed mb-4">
              {opening.summary}
            </p>

            {/* What's next suggestions */}
            <div className="bg-stone-800/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-stone-300 mb-2">What&apos;s next?</p>
              <ul className="text-sm text-stone-400 space-y-1.5">
                {opening.variants && opening.variants.length > 0 && onShowVariants && (
                  <li>
                    → <button onClick={onShowVariants} className="text-emerald-400 hover:underline">Explore variants</button> — learn what to do when your opponent plays something different
                  </li>
                )}
                <li>
                  → <Link href="/puzzles/mate-in-one" className="text-emerald-400 hover:underline">Try tactical puzzles</Link> — test your pattern recognition
                </li>
                <li>
                  → <Link href="/trainer" className="text-emerald-400 hover:underline">Play a game</Link> — put what you learned into practice against a bot
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
