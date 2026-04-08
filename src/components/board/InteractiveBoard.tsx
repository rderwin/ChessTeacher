"use client";

import { CSSProperties } from "react";
import { Chessboard } from "react-chessboard";
import type { Arrow } from "react-chessboard";

interface InteractiveBoardProps {
  fen: string;
  playerColor: "white" | "black";
  onPieceDrop: (from: string, to: string) => boolean;
  highlightSquares?: Record<string, CSSProperties>;
  arrows?: Arrow[];
  disabled?: boolean;
}

export default function InteractiveBoard({
  fen,
  playerColor,
  onPieceDrop,
  highlightSquares = {},
  arrows = [],
  disabled = false,
}: InteractiveBoardProps) {
  return (
    <div className="w-full max-w-[560px] aspect-square">
      <Chessboard
        options={{
          position: fen,
          boardOrientation: playerColor,
          onPieceDrop: ({ sourceSquare, targetSquare }) => {
            if (!targetSquare) return false;
            return onPieceDrop(sourceSquare, targetSquare);
          },
          squareStyles: highlightSquares,
          arrows,
          allowDragging: !disabled,
          animationDurationInMs: 300,
          boardStyle: {
            borderRadius: "4px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          },
          darkSquareStyle: { backgroundColor: "#B58863" },
          lightSquareStyle: { backgroundColor: "#F0D9B5" },
        }}
      />
    </div>
  );
}
