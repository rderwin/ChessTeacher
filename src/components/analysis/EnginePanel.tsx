"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useStockfish } from "@/hooks/useStockfish";
import type { EngineEval } from "@/hooks/useStockfish";

interface EnginePanelProps {
  fen: string;
  /** Whose turn it is in this position */
  turn: "w" | "b";
  /** Callback with normalized eval (White's perspective) when engine updates */
  onEval?: (evaluation: number, mate: number | null) => void;
}

function formatEval(cp: number, mate: number | null): string {
  if (mate !== null) {
    return mate > 0 ? `#${mate}` : `#${Math.abs(mate)}`;
  }
  const pawns = cp / 100;
  if (Math.abs(pawns) < 0.1) return "0.0";
  return pawns > 0 ? `+${pawns.toFixed(1)}` : pawns.toFixed(1);
}

function classifyEval(cp: number, mate: number | null): {
  label: string;
  color: string;
} {
  if (mate !== null) {
    return mate > 0
      ? { label: "White wins", color: "text-white" }
      : { label: "Black wins", color: "text-stone-400" };
  }
  const pawns = Math.abs(cp / 100);
  if (pawns < 0.3) return { label: "Equal", color: "text-stone-400" };
  if (pawns < 1.0)
    return cp > 0
      ? { label: "White is slightly better", color: "text-stone-300" }
      : { label: "Black is slightly better", color: "text-stone-300" };
  if (pawns < 3.0)
    return cp > 0
      ? { label: "White is better", color: "text-white" }
      : { label: "Black is better", color: "text-stone-400" };
  return cp > 0
    ? { label: "White is winning", color: "text-white" }
    : { label: "Black is winning", color: "text-stone-400" };
}

export default function EnginePanel({ fen, turn, onEval }: EnginePanelProps) {
  const { isReady, evaluate } = useStockfish(16);
  const [result, setResult] = useState<EngineEval | null>(null);
  const fenRef = useRef(fen);
  const onEvalRef = useRef(onEval);
  onEvalRef.current = onEval;

  const normalize = useCallback(
    (raw: EngineEval, t: "w" | "b") => ({
      ...raw,
      evaluation: t === "b" ? -raw.evaluation : raw.evaluation,
      mate: raw.mate !== null ? (t === "b" ? -raw.mate : raw.mate) : null,
    }),
    []
  );

  useEffect(() => {
    fenRef.current = fen;
    if (!isReady) return;

    setResult(null);

    // Small debounce for rapid navigation
    const timer = setTimeout(() => {
      const cancel = evaluate(fen, (raw) => {
        if (fenRef.current !== fen) return;
        const normalized = normalize(raw, turn);
        setResult(normalized);
        onEvalRef.current?.(normalized.evaluation, normalized.mate);
      });

      return () => cancel();
    }, 80);

    return () => clearTimeout(timer);
  }, [fen, isReady, evaluate, turn, normalize]);

  if (!isReady) {
    return (
      <div className="bg-stone-800 rounded-xl border border-stone-700 p-4 min-h-[100px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-sm text-stone-400">
            Loading Stockfish engine...
          </span>
        </div>
      </div>
    );
  }

  const evalInfo = result ? classifyEval(result.evaluation, result.mate) : null;

  return (
    <div className="bg-stone-800 rounded-xl border border-stone-700 p-4 min-h-[100px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              !result || result.searching
                ? "bg-amber-500 animate-pulse"
                : "bg-emerald-500"
            }`}
          />
          <span className="text-sm font-medium text-stone-300">
            Stockfish 18
          </span>
        </div>
        {result && (
          <span className="text-xs text-stone-500">
            depth {result.depth}
            {result.searching ? "..." : ""}
          </span>
        )}
      </div>

      {result ? (
        <div>
          {/* Eval score */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-bold text-white font-mono">
              {formatEval(result.evaluation, result.mate)}
            </span>
            <span className={`text-sm ${evalInfo?.color}`}>
              {evalInfo?.label}
            </span>
          </div>

          {/* Best move + line */}
          {result.bestMove && (
            <div className="text-xs text-stone-400">
              <span className="text-stone-500">Best:</span>{" "}
              <span className="font-mono text-stone-300">
                {result.bestMove}
              </span>
              {result.pv.length > 1 && (
                <span className="ml-2 text-stone-600 font-mono">
                  {result.pv.slice(1, 6).join(" ")}
                  {result.pv.length > 6 ? " ..." : ""}
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-500">Analyzing position...</span>
        </div>
      )}
    </div>
  );
}
