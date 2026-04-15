"use client";

import { useMemo } from "react";

interface RatingGraphProps {
  /** Array of { date, rating } entries, oldest first. */
  history: Array<{ date: string; rating: number }>;
  currentRating: number;
}

const WIDTH = 500;
const HEIGHT = 120;
const PAD_X = 8;
const PAD_Y = 12;

/**
 * Lightweight SVG sparkline-style rating graph. Shows the trend of the
 * user's puzzle rating over time.
 */
export default function RatingGraph({
  history,
  currentRating,
}: RatingGraphProps) {
  const { path, minRating, maxRating, points } = useMemo(() => {
    if (history.length === 0) {
      return {
        path: "",
        minRating: currentRating,
        maxRating: currentRating,
        points: [] as Array<{ x: number; y: number; date: string; rating: number }>,
      };
    }
    // Ensure we have at least two points for a line
    const data = history.length === 1
      ? [{ date: history[0].date, rating: history[0].rating }, history[0]]
      : history;
    const values = data.map((d) => d.rating);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    // Add a tiny padding so flat lines still draw
    const range = Math.max(1, maxVal - minVal);

    const plotW = WIDTH - PAD_X * 2;
    const plotH = HEIGHT - PAD_Y * 2;
    const stepX = data.length > 1 ? plotW / (data.length - 1) : 0;

    const pts = data.map((d, i) => {
      const x = PAD_X + i * stepX;
      const y = PAD_Y + plotH - ((d.rating - minVal) / range) * plotH;
      return { x, y, date: d.date, rating: d.rating };
    });

    const pathStr = pts
      .map((p, i) => (i === 0 ? `M${p.x.toFixed(1)},${p.y.toFixed(1)}` : `L${p.x.toFixed(1)},${p.y.toFixed(1)}`))
      .join(" ");

    return {
      path: pathStr,
      minRating: minVal,
      maxRating: maxVal,
      points: pts,
    };
  }, [history, currentRating]);

  if (history.length === 0) {
    return (
      <div className="text-xs text-stone-500 italic">
        Solve some puzzles to see your rating history graph.
      </div>
    );
  }

  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const delta = lastPoint.rating - firstPoint.rating;
  const trendColor = delta >= 0 ? "text-emerald-400" : "text-red-400";
  const strokeColor = delta >= 0 ? "#10b981" : "#ef4444";
  const fillColor = delta >= 0 ? "#10b98120" : "#ef444420";

  // Build a filled area underneath the line
  const areaPath = `${path} L ${lastPoint.x.toFixed(1)},${HEIGHT - PAD_Y} L ${firstPoint.x.toFixed(1)},${HEIGHT - PAD_Y} Z`;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-stone-400">
          Rating over time
        </h3>
        <p className={`text-xs ${trendColor} font-medium`}>
          {delta >= 0 ? "+" : ""}
          {delta} ({minRating}–{maxRating})
        </p>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        {/* Area fill */}
        <path d={areaPath} fill={fillColor} />
        {/* Line */}
        <path d={path} stroke={strokeColor} strokeWidth={2} fill="none" />
        {/* Endpoint dot */}
        <circle cx={lastPoint.x} cy={lastPoint.y} r={3} fill={strokeColor} />
      </svg>
    </div>
  );
}
