"use client";

import { CSSProperties, useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import type { Arrow } from "react-chessboard";
import { Chess } from "chess.js";
import { usePreferences } from "@/contexts/PreferencesContext";

interface InteractiveBoardProps {
  fen: string;
  playerColor: "white" | "black";
  onPieceDrop: (from: string, to: string) => boolean;
  highlightSquares?: Record<string, CSSProperties>;
  arrows?: Arrow[];
  disabled?: boolean;
}

const SELECTED_STYLE: CSSProperties = {
  backgroundColor: "rgba(255, 255, 0, 0.4)",
};
const LEGAL_MOVE_STYLE: CSSProperties = {
  background: "radial-gradient(circle, rgba(0,0,0,0.2) 25%, transparent 25%)",
};
const LEGAL_CAPTURE_STYLE: CSSProperties = {
  background: "radial-gradient(circle, rgba(0,0,0,0.2) 85%, transparent 85%)",
};

export default function InteractiveBoard({
  fen,
  playerColor,
  onPieceDrop,
  highlightSquares = {},
  arrows = [],
  disabled = false,
}: InteractiveBoardProps) {
  const { boardTheme, pieceStyle } = usePreferences();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [clickStyles, setClickStyles] = useState<Record<string, CSSProperties>>(
    {}
  );

  // Clear selection when fen changes (move was made) or when disabled
  useEffect(() => {
    setSelectedSquare(null);
    setClickStyles({});
  }, [fen, disabled]);

  const getLegalMoveStyles = useCallback(
    (square: string): Record<string, CSSProperties> => {
      const chess = new Chess(fen);
      const moves = chess.moves({ square: square as never, verbose: true });
      const styles: Record<string, CSSProperties> = {
        [square]: SELECTED_STYLE,
      };
      for (const move of moves) {
        styles[move.to] = move.captured ? LEGAL_CAPTURE_STYLE : LEGAL_MOVE_STYLE;
      }
      return styles;
    },
    [fen]
  );

  const handleSquareClick = useCallback(
    ({ square }: { piece: unknown; square: string }) => {
      if (disabled) return;

      // If a piece is already selected and we click a target square, try the move
      if (selectedSquare && selectedSquare !== square) {
        const success = onPieceDrop(selectedSquare, square);
        if (success) {
          setSelectedSquare(null);
          setClickStyles({});
          return;
        }
        // If the move failed, check if we clicked a different own piece to reselect
        const chess = new Chess(fen);
        const piece = chess.get(square as never);
        if (piece && piece.color === (playerColor === "white" ? "w" : "b")) {
          setSelectedSquare(square);
          setClickStyles(getLegalMoveStyles(square));
          return;
        }
        // Otherwise deselect
        setSelectedSquare(null);
        setClickStyles({});
        return;
      }

      // If clicking the same square, deselect
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setClickStyles({});
        return;
      }

      // Select a new piece
      const chess = new Chess(fen);
      const piece = chess.get(square as never);
      if (piece && piece.color === (playerColor === "white" ? "w" : "b")) {
        setSelectedSquare(square);
        setClickStyles(getLegalMoveStyles(square));
      }
    },
    [disabled, selectedSquare, fen, playerColor, onPieceDrop, getLegalMoveStyles]
  );

  const mergedStyles = { ...clickStyles, ...highlightSquares };

  const pieceFilter = [pieceStyle.filter, pieceStyle.shadow]
    .filter((v) => v !== "none")
    .join(" ");

  return (
    <div
      className="w-full max-w-full sm:max-w-[560px] aspect-square"
      style={pieceFilter ? { filter: pieceFilter } as React.CSSProperties : undefined}
    >
      <Chessboard
        options={{
          position: fen,
          boardOrientation: playerColor,
          onPieceDrop: ({ sourceSquare, targetSquare }) => {
            if (!targetSquare) return false;
            return onPieceDrop(sourceSquare, targetSquare);
          },
          onSquareClick: handleSquareClick,
          onPieceClick: ({ square }) => {
            handleSquareClick({ piece: null, square: square || "" });
          },
          squareStyles: mergedStyles,
          arrows,
          allowDragging: !disabled,
          animationDurationInMs: 300,
          boardStyle: {
            borderRadius: "4px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          },
          darkSquareStyle: { backgroundColor: boardTheme.darkSquare },
          lightSquareStyle: { backgroundColor: boardTheme.lightSquare },
        }}
      />
    </div>
  );
}
