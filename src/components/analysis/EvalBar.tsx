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
  // Clamp to ±10 pawns, map to 0–100% White
  const pawns = Math.max(-10, Math.min(10, cp / 100));
  return 50 + pawns * 5;
}

function formatEval(cp: number, mate: number | null): string {
  if (mate !== null) {
    return mate > 0 ? `M${mate}` : `M${Math.abs(mate)}`;
  }
  const pawns = Math.abs(cp / 100);
  if (pawns < 0.1) return "0.0";
  return pawns.toFixed(1);
}

export default function EvalBar({ evaluation, mate, orientation }: EvalBarProps) {
  let whitePercent: number;
  if (mate !== null) {
    whitePercent = mate > 0 ? 98 : 2;
  } else {
    whitePercent = clampEval(evaluation);
  }

  // When viewing from Black's side, flip so Black is at the bottom
  const displayPercent =
    orientation === "white" ? whitePercent : 100 - whitePercent;

  const isWhiteAdvantage = mate !== null ? mate > 0 : evaluation >= 0;
  const evalText = formatEval(evaluation, mate);

  return (
    <div className="flex flex-col w-8 rounded overflow-hidden select-none self-stretch">
      {/* Black region (top when White orientation) */}
      <div
        className="w-full bg-[#312e2b] transition-all duration-500 ease-out"
        style={{ height: `${100 - displayPercent}%` }}
      >
        {/* Show eval on black side when black is ahead */}
        {!isWhiteAdvantage && (
          <div className="flex items-start justify-center pt-1 h-full">
            <span className="text-[11px] font-bold text-[#999] leading-none">
              {evalText}
            </span>
          </div>
        )}
      </div>
      {/* White region (bottom when White orientation) */}
      <div
        className="w-full bg-[#e8e6e1] transition-all duration-500 ease-out"
        style={{ height: `${displayPercent}%` }}
      >
        {/* Show eval on white side when white is ahead */}
        {isWhiteAdvantage && (
          <div className="flex items-end justify-center pb-1 h-full">
            <span className="text-[11px] font-bold text-[#555] leading-none">
              {evalText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
