"use client";

import { CSSProperties, useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import type { Arrow } from "react-chessboard";
import { Chess } from "chess.js";
import { usePreferences } from "@/contexts/PreferencesContext";
import PromotionPicker, {
  type PromotionPiece,
} from "./PromotionPicker";

interface InteractiveBoardProps {
  fen: string;
  playerColor: "white" | "black";
  /**
   * Called with (from, to, promotion). Returns true if the move was accepted
   * (optimistic). When `enablePromotionPicker` is true, the promotion param
   * reflects the user's chosen piece; otherwise it defaults to "q".
   */
  onPieceDrop: (
    from: string,
    to: string,
    promotion?: PromotionPiece,
  ) => boolean;
  highlightSquares?: Record<string, CSSProperties>;
  arrows?: Arrow[];
  disabled?: boolean;
  /**
   * If true, promotion moves will open a picker modal letting the player
   * choose Q/R/B/N. If false (default), promotes to queen automatically so
   * practice/puzzle flows with pre-determined moves keep working.
   */
  enablePromotionPicker?: boolean;
  /**
   * If true, the player can select pieces of EITHER color (whichever side
   * is to move). Used in test mode where the player drills both sides.
   * Board orientation stays fixed by `playerColor`.
   */
  allowAnyMover?: boolean;
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

/** Return true if moving a pawn from `from` to `to` would be a promotion. */
function isPromotionMove(fen: string, from: string, to: string): boolean {
  try {
    const chess = new Chess(fen);
    const piece = chess.get(from as never);
    if (!piece || piece.type !== "p") return false;
    const targetRank = to[1];
    if (piece.color === "w" && targetRank === "8") return true;
    if (piece.color === "b" && targetRank === "1") return true;
    return false;
  } catch {
    return false;
  }
}

export default function InteractiveBoard({
  fen,
  playerColor,
  onPieceDrop,
  highlightSquares = {},
  arrows = [],
  disabled = false,
  enablePromotionPicker = false,
  allowAnyMover = false,
}: InteractiveBoardProps) {
  const { boardTheme, pieceStyle } = usePreferences();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [clickStyles, setClickStyles] = useState<Record<string, CSSProperties>>(
    {}
  );

  // Pending promotion move — shown when the picker is open
  const [pendingPromotion, setPendingPromotion] = useState<{
    from: string;
    to: string;
  } | null>(null);

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

  /** Wrap onPieceDrop so promotion moves open the picker instead of firing immediately. */
  const submitMove = useCallback(
    (from: string, to: string): boolean => {
      if (enablePromotionPicker && isPromotionMove(fen, from, to)) {
        setPendingPromotion({ from, to });
        // Clear selection so the board visually settles
        setSelectedSquare(null);
        setClickStyles({});
        // Return false so the Chessboard snaps back (we'll apply the real
        // move after the user picks a piece)
        return false;
      }
      return onPieceDrop(from, to);
    },
    [enablePromotionPicker, fen, onPieceDrop],
  );

  const handleSquareClick = useCallback(
    ({ square }: { piece: unknown; square: string }) => {
      if (disabled) return;
      if (pendingPromotion) return; // ignore clicks while the picker is open

      // Compute the color we're allowed to select. Normally the player's
      // color, but in `allowAnyMover` mode (test/drill) it's whichever side
      // is to move.
      const chessForSelectability = new Chess(fen);
      const requiredColor = allowAnyMover
        ? chessForSelectability.turn()
        : (playerColor === "white" ? "w" : "b");

      // If a piece is already selected and we click a target square, try the move
      if (selectedSquare && selectedSquare !== square) {
        const success = submitMove(selectedSquare, square);
        if (success) {
          setSelectedSquare(null);
          setClickStyles({});
          return;
        }
        // If the move failed, check if we clicked a different own piece to reselect
        const chess = new Chess(fen);
        const piece = chess.get(square as never);
        if (piece && piece.color === requiredColor) {
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
      if (piece && piece.color === requiredColor) {
        setSelectedSquare(square);
        setClickStyles(getLegalMoveStyles(square));
      }
    },
    [
      disabled,
      pendingPromotion,
      selectedSquare,
      fen,
      playerColor,
      allowAnyMover,
      submitMove,
      getLegalMoveStyles,
    ],
  );

  // Click selection / legal move dots must override the practice-session
  // move guide highlights, otherwise selecting a piece that's currently
  // being hinted shows no visible selection feedback.
  const mergedStyles = { ...highlightSquares, ...clickStyles };

  const pieceFilter = [pieceStyle.filter, pieceStyle.shadow]
    .filter((v) => v !== "none")
    .join(" ");

  const handlePromotionPick = useCallback(
    (piece: PromotionPiece) => {
      if (!pendingPromotion) return;
      onPieceDrop(pendingPromotion.from, pendingPromotion.to, piece);
      setPendingPromotion(null);
    },
    [pendingPromotion, onPieceDrop],
  );

  return (
    <>
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
              return submitMove(sourceSquare, targetSquare);
            },
            // Only wire onSquareClick — react-chessboard also fires this when
            // you click a square that contains a piece. Wiring onPieceClick as
            // well would cause every piece click to fire twice and immediately
            // deselect whatever was just selected.
            onSquareClick: handleSquareClick,
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

      {pendingPromotion && (
        <PromotionPicker
          color={playerColor}
          onPick={handlePromotionPick}
          onCancel={() => setPendingPromotion(null)}
        />
      )}
    </>
  );
}
