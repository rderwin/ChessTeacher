"use client";

import { useEffect, useMemo } from "react";

interface ConfettiProps {
  /** Fire the confetti when this key changes (useful for triggering on state change). */
  fireKey: number | string;
  /** Number of pieces — default 80 */
  count?: number;
  /** Duration in ms — default 2500 */
  durationMs?: number;
}

const COLORS = [
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#3b82f6", // blue
  "#eab308", // yellow
];

interface Piece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotate: number;
  drift: number;
}

/**
 * Cheap, dependency-free confetti overlay. Renders a burst of falling
 * colored squares starting from the top of the viewport. Fires once
 * per fireKey change.
 */
export default function Confetti({
  fireKey,
  count = 80,
  durationMs = 2500,
}: ConfettiProps) {
  const pieces = useMemo<Piece[]>(() => {
    // Re-derive on fireKey change
    void fireKey;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 400,
      duration: durationMs - 400 + Math.random() * 600,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
      drift: (Math.random() - 0.5) * 140,
    }));
  }, [fireKey, count, durationMs]);

  // Auto-remove by relying on parent re-mount via fireKey
  useEffect(() => {
    // noop — animations run once because we keyframe via the `style` prop
  }, [fireKey]);

  return (
    <div
      key={fireKey}
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
      aria-hidden
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size * 0.4}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.duration}ms`,
            ["--drift" as string]: `${p.drift}px`,
            ["--rotate" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
