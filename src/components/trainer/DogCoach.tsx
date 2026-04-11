"use client";

import { useEffect, useState } from "react";
import type { MoveClass } from "@/lib/classify-moves";
import type { Difficulty } from "@/hooks/useTrainerGame";

export type DogMood =
  | "waiting"
  | "thinking"
  | "hint"
  | "brilliant"
  | "best"
  | "excellent"
  | "good"
  | "inaccuracy"
  | "mistake"
  | "blunder"
  | "gameover-win"
  | "gameover-lose"
  | "gameover-draw";

const COMMENTS: Record<DogMood, string[]> = {
  brilliant: [
    "WOOF WOOF! INCREDIBLE! ✨",
    "WHO'S THE GOODEST CHESS PLAYER?! YOU ARE!",
    "*does excited zoomies around the board*",
    "I'M WAGGING SO HARD RIGHT NOW!",
    "THAT WAS LEGENDARY! 🌟",
  ],
  best: [
    "Perfect move! Have a treat! 🦴",
    "*tail wagging intensifies*",
    "That's exactly what I would've sniffed out!",
    "Top dog move right there!",
    "Couldn't have played it better myself! ...if I had thumbs.",
  ],
  excellent: [
    "Ooh that's a tasty move!",
    "*happy panting*",
    "Paw-some play!",
    "Almost purrfect— wait, wrong animal.",
    "Excellent! You deserve belly rubs!",
  ],
  good: [
    "Solid move, good human.",
    "*content tail wag*",
    "That works! Keep fetching those good moves!",
    "Not bad, not bad at all.",
    "I'll allow it. *nods approvingly*",
  ],
  inaccuracy: [
    "*tilts head* Hmm, was there something better?",
    "My nose says there was a tastier move...",
    "*confused whimper*",
    "I buried a better move somewhere around here...",
    "That's... fine. But I've seen better.",
  ],
  mistake: [
    "*covers eyes with paw* Oh no...",
    "That move just ate my homework!",
    "SQUIRREL! Oh wait— bad move!",
    "Even I know that wasn't great, and I eat shoes.",
    "*nervous whimpering*",
  ],
  blunder: [
    "BARK BARK BARK! DANGER!!! 🚨",
    "THE TREAT JAR IS ON FIRE! WHAT WAS THAT?!",
    "*stress howling at the moon*",
    "I need therapy treats after this...",
    "Did you just— no— WHY?!",
    "My tail went between my legs!",
  ],
  hint: [
    "*sniffing around* I might know something...",
    "Need a nudge? I gotchu! 🐾",
    "*wags tail helpfully*",
    "Let me sniff this out for you...",
  ],
  waiting: [
    "*panting* Your move, human!",
    "Go on, make a move! I believe in you!",
    "*wags tail expectantly*",
    "I'm watching... no pressure!",
  ],
  thinking: [
    "*sniffing the board intensely*",
    "Hmm hmm hmm...",
    "Let me sniff out a response...",
    "*chews on a chess piece thoughtfully*",
  ],
  "gameover-win": [
    "YOU WON! WHO'S A GOOD HUMAN?! 🎉",
    "*victory zoomies!!!*",
    "CHAMPION! I'm so proud! 🏆",
    "We did it! Well, you did. I watched. Still counts!",
  ],
  "gameover-lose": [
    "It's okay... *licks your face* We'll get 'em next time!",
    "Even the best dogs lose a toy sometimes. Rematch?",
    "*sad puppy eyes* ...again?",
    "That was a learning experience! (That's what I tell myself when I miss the ball.)",
  ],
  "gameover-draw": [
    "A draw! Everyone gets a treat! 🤝",
    "Tied! Not bad, not bad.",
    "*ambivalent tail wag*",
  ],
};

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function classificationToMood(cls: MoveClass): DogMood {
  return cls as DogMood;
}

// --- Dog breed visual configs ---

export type DogBreed = "puppy" | "pup" | "golden" | "beagle" | "husky" | "shepherd" | "collie" | "wolf";

interface BreedStyle {
  name: string;
  // Head
  headW: number; headH: number;
  headColor: string; headGradient?: string;
  headRadius: string;
  // Face marking (white patch on face)
  facePatch?: { color: string; w: number; h: number; bottom: number; radius: string };
  // Ears
  earW: number; earH: number;
  earColor: string;
  earShape: "floppy" | "perky" | "pointed";
  earInnerColor?: string;
  // Snout
  snoutW: number; snoutH: number;
  snoutColor: string; snoutRadius: string;
  // Eyes
  eyeSize: number;
  eyeColor?: string; // iris color for huskies
  eyeSpacing: number; // from center
  eyeTop: number;
  // Accessory
  accessory?: "collar" | "bandana" | "glasses" | "mortarboard" | "crown";
  accessoryColor?: string;
}

const BREEDS: Record<DogBreed, BreedStyle> = {
  puppy: {
    name: "Puppy", headW: 80, headH: 76, headColor: "#f6c36c", headGradient: "linear-gradient(180deg, #f6c36c 60%, #e8a83e 100%)",
    headRadius: "50%",
    facePatch: { color: "#fde8c4", w: 40, h: 36, bottom: 2, radius: "50% 50% 45% 45%" },
    earW: 22, earH: 34, earColor: "#d4943a", earShape: "floppy",
    snoutW: 36, snoutH: 24, snoutColor: "#fde8c4", snoutRadius: "50%",
    eyeSize: 18, eyeSpacing: 14, eyeTop: 24,
  },
  pup: {
    name: "Corgi", headW: 84, headH: 78, headColor: "#e8a83e", headGradient: "linear-gradient(180deg, #e8a83e 50%, #d4943a 100%)",
    headRadius: "48% 48% 46% 46%",
    facePatch: { color: "#fde8c4", w: 42, h: 38, bottom: 2, radius: "50% 50% 44% 44%" },
    earW: 24, earH: 30, earColor: "#c17f2a", earShape: "perky", earInnerColor: "#d4943a",
    snoutW: 38, snoutH: 24, snoutColor: "#fde8c4", snoutRadius: "50%",
    eyeSize: 16, eyeSpacing: 14, eyeTop: 25,
    accessory: "collar", accessoryColor: "#f59e0b",
  },
  golden: {
    name: "Golden Retriever", headW: 88, headH: 82, headColor: "#d4943a", headGradient: "linear-gradient(180deg, #d4943a 50%, #c17f2a 100%)",
    headRadius: "50% 50% 45% 45%",
    facePatch: { color: "#f0c97a", w: 44, h: 38, bottom: 0, radius: "50% 50% 40% 40%" },
    earW: 24, earH: 38, earColor: "#b87425", earShape: "floppy", earInnerColor: "#c98a35",
    snoutW: 40, snoutH: 26, snoutColor: "#f0c97a", snoutRadius: "50%",
    eyeSize: 15, eyeSpacing: 15, eyeTop: 26,
    accessory: "collar", accessoryColor: "#dc2626",
  },
  beagle: {
    name: "Beagle", headW: 86, headH: 80, headColor: "#c17f2a", headGradient: "linear-gradient(180deg, #8B5E3C 0%, #c17f2a 40%, #c17f2a 100%)",
    headRadius: "50% 50% 48% 48%",
    facePatch: { color: "#faf0e2", w: 42, h: 42, bottom: 0, radius: "45% 45% 40% 40%" },
    earW: 26, earH: 42, earColor: "#5c3a1e", earShape: "floppy", earInnerColor: "#7a5030",
    snoutW: 38, snoutH: 24, snoutColor: "#faf0e2", snoutRadius: "50%",
    eyeSize: 15, eyeSpacing: 14, eyeTop: 24,
    accessory: "collar", accessoryColor: "#2563eb",
  },
  husky: {
    name: "Husky", headW: 90, headH: 84, headColor: "#94a3b8", headGradient: "linear-gradient(180deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)",
    headRadius: "48% 48% 44% 44%",
    facePatch: { color: "#f1f5f9", w: 50, h: 48, bottom: 0, radius: "40% 40% 45% 45%" },
    earW: 22, earH: 30, earColor: "#475569", earShape: "perky", earInnerColor: "#94a3b8",
    snoutW: 38, snoutH: 24, snoutColor: "#f1f5f9", snoutRadius: "50%",
    eyeSize: 15, eyeColor: "#38bdf8", eyeSpacing: 16, eyeTop: 26,
    accessory: "bandana", accessoryColor: "#dc2626",
  },
  shepherd: {
    name: "German Shepherd", headW: 92, headH: 86, headColor: "#92400e", headGradient: "linear-gradient(180deg, #451a03 0%, #78350f 30%, #92400e 60%, #b45309 100%)",
    headRadius: "46% 46% 42% 42%",
    facePatch: { color: "#d4943a", w: 46, h: 44, bottom: 0, radius: "42% 42% 38% 38%" },
    earW: 24, earH: 34, earColor: "#451a03", earShape: "perky", earInnerColor: "#78350f",
    snoutW: 42, snoutH: 28, snoutColor: "#d4943a", snoutRadius: "45% 45% 50% 50%",
    eyeSize: 14, eyeSpacing: 16, eyeTop: 28,
    accessory: "glasses",
  },
  collie: {
    name: "Border Collie", headW: 90, headH: 84, headColor: "#1e1e1e", headGradient: "linear-gradient(180deg, #111 0%, #292929 60%, #333 100%)",
    headRadius: "48% 48% 44% 44%",
    facePatch: { color: "#f5f5f5", w: 44, h: 50, bottom: -2, radius: "35% 35% 45% 45%" },
    earW: 22, earH: 28, earColor: "#111", earShape: "perky", earInnerColor: "#333",
    snoutW: 40, snoutH: 26, snoutColor: "#f5f5f5", snoutRadius: "50%",
    eyeSize: 15, eyeSpacing: 15, eyeTop: 24,
    accessory: "mortarboard",
  },
  wolf: {
    name: "Alpha Wolf", headW: 96, headH: 92, headColor: "#4a4a52", headGradient: "linear-gradient(180deg, #333338 0%, #4a4a52 50%, #5a5a62 100%)",
    headRadius: "44% 44% 40% 40%",
    facePatch: { color: "#8a8a92", w: 48, h: 46, bottom: 0, radius: "38% 38% 44% 44%" },
    earW: 26, earH: 38, earColor: "#333338", earShape: "pointed", earInnerColor: "#5a5a62",
    snoutW: 44, snoutH: 30, snoutColor: "#8a8a92", snoutRadius: "40% 40% 50% 50%",
    eyeSize: 14, eyeSpacing: 17, eyeTop: 30,
    accessory: "crown",
  },
};

export function getBreedForDifficulty(difficulty: Difficulty): DogBreed {
  switch (difficulty) {
    case "newborn": return "puppy";
    case "pup": return "pup";
    case "puppy": return "golden";
    case "beginner": return "beagle";
    case "casual": return "husky";
    case "intermediate": return "shepherd";
    case "advanced": return "collie";
    case "expert": return "wolf";
  }
}

// --- SVG-enhanced dog face ---

interface FaceProps {
  mood: DogMood;
  breed?: DogBreed;
}

function DogFace({ mood, breed = "golden" }: FaceProps) {
  const b = BREEDS[breed];

  // Animation
  let animClass = "";
  if (mood === "brilliant" || mood === "gameover-win") animClass = "animate-bounce";
  else if (mood === "blunder") animClass = "animate-shake";
  else if (mood === "mistake") animClass = "animate-pulse";
  else if (mood === "thinking") animClass = "animate-pulse";

  const tilt = mood === "inaccuracy" ? "rotate-12" : mood === "hint" ? "-rotate-6" : "";
  const sad = mood === "mistake" || mood === "blunder" || mood === "gameover-lose";

  // Eye expression
  let leftPupilX = 0, leftPupilY = 0;
  let pupilSize = b.eyeSize * 0.55;
  let eyeShape: "normal" | "star" | "x" | "narrow" | "wide" = "normal";

  if (mood === "brilliant" || mood === "gameover-win") eyeShape = "star";
  else if (mood === "blunder") eyeShape = "x";
  else if (mood === "gameover-lose") eyeShape = "narrow";
  else if (mood === "inaccuracy") { leftPupilX = 1; leftPupilY = 1; pupilSize = b.eyeSize * 0.45; }
  else if (mood === "hint") { leftPupilX = 2; leftPupilY = -1; }

  // Mouth expression — computed after layout constants below
  // (mx, my are set after cx/headY are defined)
  const _headY = 18;
  const _w = b.headW + 20;
  const _cx = _w / 2;
  let mouthPath: string;
  const mx = _cx;
  const my = _headY + b.headH - 14;
  if (mood === "brilliant" || mood === "best" || mood === "gameover-win") {
    mouthPath = `M${mx - 8},${my} Q${mx},${my + 10} ${mx + 8},${my}`; // big smile
  } else if (mood === "blunder") {
    mouthPath = `M${mx - 5},${my + 2} A5,5 0 1,0 ${mx + 5},${my + 2} A5,5 0 1,0 ${mx - 5},${my + 2}`; // O shape
  } else if (sad) {
    mouthPath = `M${mx - 7},${my + 3} Q${mx},${my - 4} ${mx + 7},${my + 3}`; // frown
  } else if (mood === "inaccuracy") {
    mouthPath = `M${mx - 6},${my + 1} L${mx + 6},${my - 1}`; // flat/crooked
  } else {
    mouthPath = `M${mx - 6},${my} Q${mx},${my + 6} ${mx + 6},${my}`; // mild smile
  }

  // Ear transforms
  const earBaseY = -4;
  let leftEarAngle = 0, rightEarAngle = 0;
  if (sad) {
    leftEarAngle = b.earShape === "floppy" ? -45 : -25;
    rightEarAngle = b.earShape === "floppy" ? 45 : 25;
  } else if (b.earShape === "floppy") {
    leftEarAngle = -25; rightEarAngle = 25;
  } else if (b.earShape === "pointed") {
    leftEarAngle = -8; rightEarAngle = 8;
  } else {
    leftEarAngle = -15; rightEarAngle = 15;
  }

  const w = b.headW + 20;
  const h = b.headH + 30;
  const cx = w / 2;
  const headX = cx - b.headW / 2;
  const headY = 18;

  function renderEye(ex: number, ey: number) {
    const r = b.eyeSize / 2;
    if (eyeShape === "star") {
      return (
        <g>
          <circle cx={ex} cy={ey} r={r} fill="white" />
          <text x={ex} y={ey + 4} textAnchor="middle" fontSize={b.eyeSize * 0.7} fill="#facc15" fontWeight="bold">★</text>
        </g>
      );
    }
    if (eyeShape === "x") {
      return (
        <g>
          <circle cx={ex} cy={ey} r={r} fill="white" />
          <line x1={ex - 3} y1={ey - 3} x2={ex + 3} y2={ey + 3} stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={ex + 3} y1={ey - 3} x2={ex - 3} y2={ey + 3} stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" />
        </g>
      );
    }
    if (eyeShape === "narrow") {
      return (
        <g>
          <ellipse cx={ex} cy={ey} rx={r} ry={r * 0.4} fill="white" />
          <ellipse cx={ex} cy={ey} rx={pupilSize * 0.5} ry={pupilSize * 0.3} fill="#1a1a1a" />
        </g>
      );
    }
    return (
      <g>
        <circle cx={ex} cy={ey} r={r} fill="white" />
        <circle cx={ex + leftPupilX} cy={ey + leftPupilY} r={pupilSize} fill={b.eyeColor || "#1a1a1a"} />
        {b.eyeColor && <circle cx={ex + leftPupilX - 1} cy={ey + leftPupilY - 1} r={pupilSize * 0.3} fill="white" opacity={0.6} />}
        <circle cx={ex + leftPupilX + r * 0.2} cy={ey + leftPupilY - r * 0.2} r={pupilSize * 0.2} fill="white" opacity={0.8} />
      </g>
    );
  }

  function renderEar(side: "left" | "right") {
    const angle = side === "left" ? leftEarAngle : rightEarAngle;
    const earX = side === "left" ? headX + 4 : headX + b.headW - b.earW - 4;
    const pivotX = earX + b.earW / 2;
    const pivotY = headY + 6;

    let path: string;
    if (b.earShape === "floppy") {
      const flip = side === "left" ? -1 : 1;
      path = `M${earX},${earBaseY + headY + 8} Q${earX + b.earW / 2 + flip * 4},${earBaseY + headY - b.earH * 0.2} ${earX + b.earW},${earBaseY + headY + 8} Q${earX + b.earW + flip * 3},${earBaseY + headY + b.earH * 0.7} ${earX + b.earW / 2},${earBaseY + headY + b.earH}`;
    } else if (b.earShape === "pointed") {
      path = `M${earX},${earBaseY + headY + 10} L${earX + b.earW / 2},${earBaseY + headY - b.earH + 10} L${earX + b.earW},${earBaseY + headY + 10} Z`;
    } else {
      path = `M${earX},${earBaseY + headY + 8} Q${earX + b.earW / 2},${earBaseY + headY - b.earH + 12} ${earX + b.earW},${earBaseY + headY + 8} Z`;
    }

    return (
      <g transform={`rotate(${angle}, ${pivotX}, ${pivotY})`} className="transition-transform duration-300">
        <path d={path} fill={b.earColor} />
        {b.earInnerColor && (
          <path d={path} fill={b.earInnerColor} opacity={0.4} transform={`scale(0.7) translate(${earX * 0.15}, ${(earBaseY + headY) * 0.15})`} style={{ transformOrigin: `${pivotX}px ${pivotY}px` }} />
        )}
      </g>
    );
  }

  // Accessory
  let accessoryEl: React.ReactNode = null;
  if (b.accessory === "collar") {
    accessoryEl = (
      <g>
        <ellipse cx={cx} cy={headY + b.headH - 4} rx={b.headW * 0.4} ry={5} fill={b.accessoryColor || "#dc2626"} />
        <circle cx={cx} cy={headY + b.headH} r={3} fill="#fbbf24" />
      </g>
    );
  } else if (b.accessory === "bandana") {
    accessoryEl = (
      <g>
        <path d={`M${cx - b.headW * 0.35},${headY + b.headH - 8} Q${cx},${headY + b.headH + 8} ${cx + b.headW * 0.35},${headY + b.headH - 8}`} fill={b.accessoryColor || "#dc2626"} />
        <path d={`M${cx - 4},${headY + b.headH + 2} L${cx},${headY + b.headH + 12} L${cx + 4},${headY + b.headH + 2}`} fill={b.accessoryColor || "#dc2626"} />
      </g>
    );
  } else if (b.accessory === "glasses") {
    const gy = headY + b.eyeTop;
    const gl = cx - b.eyeSpacing - 1;
    const gr = cx + b.eyeSpacing + 1;
    accessoryEl = (
      <g>
        <circle cx={gl} cy={gy} r={b.eyeSize / 2 + 3} fill="none" stroke="#78716c" strokeWidth={1.5} />
        <circle cx={gr} cy={gy} r={b.eyeSize / 2 + 3} fill="none" stroke="#78716c" strokeWidth={1.5} />
        <line x1={gl + b.eyeSize / 2 + 3} y1={gy} x2={gr - b.eyeSize / 2 - 3} y2={gy} stroke="#78716c" strokeWidth={1.5} />
        <line x1={gl - b.eyeSize / 2 - 3} y1={gy} x2={gl - b.eyeSize / 2 - 8} y2={gy - 4} stroke="#78716c" strokeWidth={1.2} />
        <line x1={gr + b.eyeSize / 2 + 3} y1={gy} x2={gr + b.eyeSize / 2 + 8} y2={gy - 4} stroke="#78716c" strokeWidth={1.2} />
      </g>
    );
  } else if (b.accessory === "mortarboard") {
    accessoryEl = (
      <g>
        <polygon points={`${cx},${headY - 14} ${cx - 22},${headY - 2} ${cx},${headY + 4} ${cx + 22},${headY - 2}`} fill="#1e293b" />
        <rect x={cx - 12} y={headY - 4} width={24} height={6} rx={2} fill="#334155" />
        <line x1={cx + 16} y1={headY - 2} x2={cx + 20} y2={headY + 10} stroke="#fbbf24" strokeWidth={1.5} />
        <circle cx={cx + 20} cy={headY + 12} r={2} fill="#fbbf24" />
      </g>
    );
  } else if (b.accessory === "crown") {
    accessoryEl = (
      <g>
        <polygon points={`${cx - 18},${headY - 2} ${cx - 14},${headY - 16} ${cx - 6},${headY - 6} ${cx},${headY - 20} ${cx + 6},${headY - 6} ${cx + 14},${headY - 16} ${cx + 18},${headY - 2}`} fill="#fbbf24" stroke="#d97706" strokeWidth={1} />
        <circle cx={cx} cy={headY - 6} r={2} fill="#ef4444" />
        <circle cx={cx - 10} cy={headY - 6} r={1.5} fill="#3b82f6" />
        <circle cx={cx + 10} cy={headY - 6} r={1.5} fill="#22c55e" />
      </g>
    );
  }

  // Tongue for happy moods
  const showTongue = mood === "brilliant" || mood === "best" || mood === "gameover-win";

  return (
    <div className={`${animClass} ${tilt} transition-transform duration-300 flex flex-col items-center relative`}>
      <svg width={w} height={h + 12} viewBox={`0 0 ${w} ${h + 12}`} className="overflow-visible">
        {/* Ears (behind head) */}
        {renderEar("left")}
        {renderEar("right")}

        {/* Head */}
        <ellipse
          cx={cx} cy={headY + b.headH / 2}
          rx={b.headW / 2} ry={b.headH / 2}
          fill={b.headColor}
          style={b.headGradient ? { fill: "url(#headGrad_" + breed + ")" } : undefined}
        />
        {b.headGradient && (
          <defs>
            <linearGradient id={"headGrad_" + breed} x1="0" y1="0" x2="0" y2="1">
              {b.headGradient.match(/#[0-9a-fA-F]{6}/g)?.map((c, i, arr) => (
                <stop key={i} offset={`${(i / (arr.length - 1)) * 100}%`} stopColor={c} />
              ))}
            </linearGradient>
          </defs>
        )}

        {/* Face patch / marking */}
        {b.facePatch && (
          <ellipse
            cx={cx}
            cy={headY + b.headH - b.facePatch.bottom - b.facePatch.h / 2}
            rx={b.facePatch.w / 2}
            ry={b.facePatch.h / 2}
            fill={b.facePatch.color}
          />
        )}

        {/* Snout */}
        <ellipse
          cx={cx} cy={headY + b.headH - b.snoutH / 2 - 4}
          rx={b.snoutW / 2} ry={b.snoutH / 2}
          fill={b.snoutColor}
        />

        {/* Nose */}
        <ellipse cx={cx} cy={headY + b.headH - b.snoutH - 2} rx={5} ry={3.5} fill="#1a1a1a" />
        <ellipse cx={cx - 1} cy={headY + b.headH - b.snoutH - 3} rx={1.5} ry={1} fill="#555" opacity={0.5} />

        {/* Mouth */}
        <path d={mouthPath} fill="none" stroke="#1a1a1a" strokeWidth={1.8} strokeLinecap="round" />

        {/* Tongue */}
        {showTongue && (
          <ellipse cx={cx} cy={my + 7} rx={4} ry={6} fill="#f472b6" />
        )}

        {/* Eyes */}
        {renderEye(cx - b.eyeSpacing, headY + b.eyeTop)}
        {renderEye(cx + b.eyeSpacing, headY + b.eyeTop)}

        {/* Eyebrows for some moods */}
        {(mood === "blunder" || mood === "mistake") && (
          <>
            <line x1={cx - b.eyeSpacing - 5} y1={headY + b.eyeTop - b.eyeSize / 2 - 4} x2={cx - b.eyeSpacing + 5} y2={headY + b.eyeTop - b.eyeSize / 2 - 2} stroke="#1a1a1a" strokeWidth={2} strokeLinecap="round" />
            <line x1={cx + b.eyeSpacing + 5} y1={headY + b.eyeTop - b.eyeSize / 2 - 4} x2={cx + b.eyeSpacing - 5} y2={headY + b.eyeTop - b.eyeSize / 2 - 2} stroke="#1a1a1a" strokeWidth={2} strokeLinecap="round" />
          </>
        )}

        {/* Accessory */}
        {accessoryEl}
      </svg>

      {/* Breed label */}
      <p className="absolute -bottom-1 text-[10px] text-stone-500 text-center w-full">{b.name}</p>
    </div>
  );
}

// --- Main component ---

interface DogCoachProps {
  mood: DogMood;
  /** Force a new comment even when mood hasn't changed */
  commentKey?: number;
  /** Override the speech bubble with a specific hint */
  hint?: string | null;
  /** Dog breed based on difficulty */
  breed?: DogBreed;
}

export default function DogCoach({ mood, commentKey = 0, hint, breed }: DogCoachProps) {
  // Use first comment as stable initial value to avoid hydration mismatch
  // (Math.random differs between server and client)
  const [comment, setComment] = useState(COMMENTS[mood][0]);

  useEffect(() => {
    if (!hint) {
      setComment(pickRandom(COMMENTS[mood]));
    }
  }, [mood, commentKey, hint]);

  return (
    <div className="flex flex-col items-center gap-3">
      <DogFace mood={mood} breed={breed} />
      {/* Speech bubble — fixed height so buttons below never shift */}
      <div className="relative bg-stone-700 rounded-xl px-4 max-w-[260px] w-full h-24 flex items-center justify-center overflow-hidden">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-700 rotate-45" />
        <p className="text-sm text-stone-200 text-center font-medium leading-snug">
          {hint || comment}
        </p>
      </div>
    </div>
  );
}
