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
}

export default function PracticeSession({ opening }: PracticeSessionProps) {
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
    advance,
    retry,
    reset,
    completionPercent,
  } = usePracticeSession(opening);

  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    opening.playerColor
  );

  const handlePieceDrop = (from: string, to: string): boolean => {
    return makeMove(from, to);
  };

  const isDisabled =
    status === "opponent-moving" ||
    status === "showing-explanation" ||
    status === "completed";

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1100px] mx-auto">
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
                ? "Make your first move! Drag a piece on the board."
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
            onNext={advance}
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
            onRetry={retry}
          />
        )}

        {status === "completed" && (
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-emerald-300 mb-3">
              Opening Complete!
            </h2>
            <p className="text-stone-300 leading-relaxed mb-4">
              {opening.summary}
            </p>
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
