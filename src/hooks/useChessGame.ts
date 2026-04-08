"use client";

import { useState, useRef, useCallback } from "react";
import { Chess } from "chess.js";

export function useChessGame() {
  const chessRef = useRef(new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());

  const makeMove = useCallback(
    (from: string, to: string, promotion?: string) => {
      try {
        const result = chessRef.current.move({ from, to, promotion: promotion || "q" });
        if (result) {
          setFen(chessRef.current.fen());
          return result;
        }
        return null;
      } catch {
        return null;
      }
    },
    []
  );

  const makeSanMove = useCallback((san: string) => {
    try {
      const result = chessRef.current.move(san);
      if (result) {
        setFen(chessRef.current.fen());
        return result;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const undo = useCallback(() => {
    const result = chessRef.current.undo();
    if (result) {
      setFen(chessRef.current.fen());
    }
    return result;
  }, []);

  const reset = useCallback(() => {
    chessRef.current.reset();
    setFen(chessRef.current.fen());
  }, []);

  const isLegal = useCallback((from: string, to: string) => {
    const moves = chessRef.current.moves({ square: from as never, verbose: true });
    return moves.some((m) => m.to === to);
  }, []);

  return { fen, chess: chessRef.current, makeMove, makeSanMove, undo, reset, isLegal };
}
