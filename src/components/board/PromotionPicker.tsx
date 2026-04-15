"use client";

import { useEffect } from "react";

export type PromotionPiece = "q" | "r" | "b" | "n";

interface Props {
  color: "white" | "black";
  onPick: (piece: PromotionPiece) => void;
  onCancel: () => void;
}

/**
 * Modal that appears when a player needs to choose a promotion piece.
 * Shows Q/R/B/N as clickable tiles and auto-confirms on click.
 */
export default function PromotionPicker({ color, onPick, onCancel }: Props) {
  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const isWhite = color === "white";

  // Unicode chess pieces
  const pieces: Array<{ id: PromotionPiece; label: string; glyph: string }> = [
    { id: "q", label: "Queen", glyph: isWhite ? "♕" : "♛" },
    { id: "r", label: "Rook", glyph: isWhite ? "♖" : "♜" },
    { id: "b", label: "Bishop", glyph: isWhite ? "♗" : "♝" },
    { id: "n", label: "Knight", glyph: isWhite ? "♘" : "♞" },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-stone-950/70 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label="Choose promotion piece"
    >
      <div
        className="bg-stone-800 border border-stone-600 rounded-2xl shadow-2xl p-5 animate-pop max-w-sm w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-semibold text-white mb-3 text-center">
          Promote pawn to...
        </p>
        <div className="grid grid-cols-4 gap-2">
          {pieces.map((p) => (
            <button
              key={p.id}
              onClick={() => onPick(p.id)}
              className="flex flex-col items-center gap-1 bg-stone-900 hover:bg-stone-700 border border-stone-700 hover:border-emerald-500 rounded-lg p-3 transition-colors"
              aria-label={p.label}
            >
              <span
                className={`text-5xl leading-none ${isWhite ? "text-white" : "text-stone-300"}`}
                aria-hidden
              >
                {p.glyph}
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                {p.label}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={onCancel}
          className="w-full mt-3 text-xs text-stone-500 hover:text-stone-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
