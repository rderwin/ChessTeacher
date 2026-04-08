"use client";

interface EvalBarProps {
  /** Centipawns from White's perspective */
  evaluation: number;
  /** Non-null if mate detected */
  mate: number | null;
  /** Board orientation — bar flips to match */
  orientation: "white" | "black";
}

function clampEval(cp: number): number {
  // Clamp to ±10 pawns for display, map to 0-100% for White
  const pawns = Math.max(-10, Math.min(10, cp / 100));
  return 50 + pawns * 5; // ±10 maps to 0-100
}

function formatEval(cp: number, mate: number | null): string {
  if (mate !== null) {
    return mate > 0 ? `M${mate}` : `M${Math.abs(mate)}`;
  }
  const pawns = cp / 100;
  if (Math.abs(pawns) < 0.1) return "0.0";
  return pawns > 0 ? `+${pawns.toFixed(1)}` : pawns.toFixed(1);
}

export default function EvalBar({ evaluation, mate, orientation }: EvalBarProps) {
  let whitePercent: number;
  if (mate !== null) {
    whitePercent = mate > 0 ? 100 : 0;
  } else {
    whitePercent = clampEval(evaluation);
  }

  // If viewing from Black's side, flip the bar
  const displayPercent =
    orientation === "white" ? whitePercent : 100 - whitePercent;

  const isWhiteAdvantage = mate !== null ? mate > 0 : evaluation >= 0;
  const evalText = formatEval(evaluation, mate);

  return (
    <div className="flex flex-col items-center w-7 h-full min-h-[320px] rounded-md overflow-hidden border border-stone-700 relative">
      {/* Black side (top when white orientation) */}
      <div
        className="w-full bg-stone-800 transition-all duration-300 ease-out"
        style={{ height: `${100 - displayPercent}%` }}
      />
      {/* White side (bottom when white orientation) */}
      <div
        className="w-full bg-stone-200 transition-all duration-300 ease-out"
        style={{ height: `${displayPercent}%` }}
      />
      {/* Eval text */}
      <span
        className={`absolute text-[10px] font-bold leading-none ${
          isWhiteAdvantage
            ? "bottom-1 text-stone-700"
            : "top-1 text-stone-400"
        }`}
      >
        {evalText}
      </span>
    </div>
  );
}
