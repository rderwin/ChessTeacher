"use client";

interface ProgressBarProps {
  currentMove: number;
  totalMoves: number;
  percent: number;
}

export default function ProgressBar({
  currentMove,
  totalMoves,
  percent,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-stone-400 mb-1">
        <span>
          Move {Math.min(currentMove + 1, totalMoves)} of {totalMoves}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-stone-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
