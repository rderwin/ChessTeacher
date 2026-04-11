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

export type DogBreed = "puppy" | "golden" | "beagle" | "husky" | "shepherd" | "collie" | "wolf";

interface BreedConfig {
  name: string;
  emoji: string;
  size: string; // text size class for the emoji
  accessory?: string; // emoji accessory
}

const BREEDS: Record<DogBreed, BreedConfig> = {
  puppy:    { name: "Puppy",             emoji: "🐶", size: "text-6xl" },
  golden:   { name: "Golden Retriever",  emoji: "🐕", size: "text-6xl", accessory: "🎾" },
  beagle:   { name: "Beagle",           emoji: "🐕", size: "text-6xl" },
  husky:    { name: "Husky",            emoji: "🐺", size: "text-6xl" },
  shepherd: { name: "German Shepherd",   emoji: "🐕‍🦺", size: "text-6xl" },
  collie:   { name: "Border Collie",     emoji: "🦮", size: "text-6xl", accessory: "🎓" },
  wolf:     { name: "Alpha Wolf",        emoji: "🐺", size: "text-7xl", accessory: "👑" },
};

export function getBreedForDifficulty(difficulty: Difficulty): DogBreed {
  switch (difficulty) {
    case "newborn": return "puppy";
    case "puppy": return "golden";
    case "beginner": return "beagle";
    case "casual": return "husky";
    case "intermediate": return "shepherd";
    case "advanced": return "collie";
    case "expert": return "wolf";
  }
}

// --- Dog face with emoji + mood effects ---

interface FaceProps {
  mood: DogMood;
  breed?: DogBreed;
}

function DogFace({ mood, breed = "golden" }: FaceProps) {
  const config = BREEDS[breed];

  // Animation
  let animClass = "";
  if (mood === "brilliant" || mood === "gameover-win") animClass = "animate-bounce";
  else if (mood === "blunder") animClass = "animate-shake";
  else if (mood === "mistake") animClass = "animate-pulse";
  else if (mood === "thinking") animClass = "animate-pulse";

  // Head tilt
  const tilt = mood === "inaccuracy" ? "rotate-12" : mood === "hint" ? "-rotate-6" : "";

  // Mood overlay effect
  let moodOverlay: React.ReactNode = null;
  let glowClass = "";

  if (mood === "brilliant" || mood === "gameover-win") {
    glowClass = "drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]";
    moodOverlay = (
      <div className="absolute -top-1 -right-1 text-lg animate-bounce">✨</div>
    );
  } else if (mood === "blunder") {
    glowClass = "drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]";
    moodOverlay = (
      <div className="absolute -top-1 -right-1 text-lg animate-bounce">💀</div>
    );
  } else if (mood === "mistake") {
    glowClass = "drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]";
    moodOverlay = (
      <div className="absolute -top-1 -right-1 text-sm">😬</div>
    );
  } else if (mood === "best" || mood === "excellent") {
    glowClass = "drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]";
    moodOverlay = (
      <div className="absolute -top-1 -right-1 text-sm">⭐</div>
    );
  } else if (mood === "gameover-lose") {
    moodOverlay = (
      <div className="absolute -top-1 -right-1 text-sm">😢</div>
    );
  } else if (mood === "hint") {
    moodOverlay = (
      <div className="absolute -top-1 -right-1 text-sm">💡</div>
    );
  }

  return (
    <div className={`${animClass} ${tilt} transition-transform duration-300`}>
      <div className="relative inline-block mx-auto">
        {/* Main emoji */}
        <span className={`${config.size} ${glowClass} select-none transition-all duration-300`}>
          {config.emoji}
        </span>

        {/* Accessory (graduation cap, crown, tennis ball) */}
        {config.accessory && (
          <span className="absolute -top-3 -right-2 text-xl select-none pointer-events-none">
            {config.accessory}
          </span>
        )}

        {/* Mood overlay */}
        {moodOverlay}
      </div>

      {/* Breed label */}
      <p className="text-[10px] text-stone-500 text-center mt-0.5">{config.name}</p>
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
