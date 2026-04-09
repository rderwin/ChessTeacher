"use client";

import { useEffect, useState } from "react";
import type { MoveClass } from "@/lib/classify-moves";

export type DogMood =
  | "waiting"
  | "thinking"
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

// --- Dog face expressions ---
interface FaceProps {
  mood: DogMood;
}

function DogFace({ mood }: FaceProps) {
  // Animation class
  let animClass = "";
  if (mood === "brilliant" || mood === "gameover-win") animClass = "animate-bounce";
  else if (mood === "blunder") animClass = "animate-shake";
  else if (mood === "mistake") animClass = "animate-pulse";
  else if (mood === "thinking") animClass = "animate-pulse";

  // Eye style
  let eyeContent: React.ReactNode;
  if (mood === "brilliant" || mood === "gameover-win") {
    eyeContent = <span className="text-yellow-300 text-xs font-bold">★</span>;
  } else if (mood === "blunder") {
    eyeContent = <span className="text-red-400 text-[10px] font-bold">✕</span>;
  } else if (mood === "mistake") {
    eyeContent = (
      <div className="w-2.5 h-2.5 bg-stone-900 rounded-full mt-0.5 ml-0.5" />
    );
  } else if (mood === "inaccuracy") {
    eyeContent = (
      <div className="w-2 h-2 bg-stone-900 rounded-full mt-1 ml-1" />
    );
  } else if (mood === "gameover-lose") {
    eyeContent = (
      <div className="w-1 h-2.5 bg-stone-900 rounded-full mt-0.5 mx-auto" />
    );
  } else {
    eyeContent = (
      <div className="w-2.5 h-2.5 bg-stone-900 rounded-full mt-0.5 ml-0.5" />
    );
  }

  // Mouth
  let mouth: React.ReactNode;
  if (mood === "brilliant" || mood === "best" || mood === "gameover-win") {
    mouth = (
      <div className="relative mt-0.5">
        <div className="w-5 h-2.5 border-b-2 border-stone-900 rounded-b-full" />
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-b-full" />
      </div>
    );
  } else if (mood === "blunder") {
    mouth = <div className="w-3 h-3 border-2 border-stone-900 rounded-full mt-0.5" />;
  } else if (mood === "mistake" || mood === "gameover-lose") {
    mouth = <div className="w-5 h-2.5 border-t-2 border-stone-900 rounded-t-full mt-1" />;
  } else if (mood === "inaccuracy") {
    mouth = <div className="w-5 h-0.5 bg-stone-900 mt-1 rounded-full rotate-6" />;
  } else {
    mouth = <div className="w-5 h-2.5 border-b-2 border-stone-900 rounded-b-full mt-0.5" />;
  }

  // Ear droop for sad moods
  const leftEarRotate =
    mood === "mistake" || mood === "blunder" || mood === "gameover-lose"
      ? "rotate-[-30deg]"
      : "-rotate-12";
  const rightEarRotate =
    mood === "mistake" || mood === "blunder" || mood === "gameover-lose"
      ? "rotate-[30deg]"
      : "rotate-12";

  // Head tilt for inaccuracy
  const headTilt = mood === "inaccuracy" ? "rotate-12" : "";

  return (
    <div className={`${animClass} ${headTilt} transition-transform duration-300`}>
      <div className="w-20 h-20 bg-amber-600 rounded-full relative mx-auto">
        {/* Ears */}
        <div
          className={`absolute -top-2.5 left-1.5 w-5 h-7 bg-amber-700 rounded-t-full ${leftEarRotate} transition-transform duration-300`}
        />
        <div
          className={`absolute -top-2.5 right-1.5 w-5 h-7 bg-amber-700 rounded-t-full ${rightEarRotate} transition-transform duration-300`}
        />
        {/* Eyes */}
        <div className="absolute top-5 left-3.5 w-4 h-4 bg-white rounded-full flex items-center justify-center overflow-hidden">
          {eyeContent}
        </div>
        <div className="absolute top-5 right-3.5 w-4 h-4 bg-white rounded-full flex items-center justify-center overflow-hidden">
          {eyeContent}
        </div>
        {/* Snout */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-6 bg-amber-500 rounded-full flex flex-col items-center">
          <div className="w-3 h-2 bg-stone-900 rounded-full mt-0.5" />
          {mouth}
        </div>
      </div>
    </div>
  );
}

// --- Main component ---

interface DogCoachProps {
  mood: DogMood;
  /** Force a new comment even when mood hasn't changed */
  commentKey?: number;
}

export default function DogCoach({ mood, commentKey = 0 }: DogCoachProps) {
  // Use first comment as stable initial value to avoid hydration mismatch
  // (Math.random differs between server and client)
  const [comment, setComment] = useState(COMMENTS[mood][0]);

  useEffect(() => {
    setComment(pickRandom(COMMENTS[mood]));
  }, [mood, commentKey]);

  return (
    <div className="flex flex-col items-center gap-3">
      <DogFace mood={mood} />
      {/* Speech bubble */}
      <div className="relative bg-stone-700 rounded-xl px-4 py-3 max-w-[260px] w-full">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-700 rotate-45" />
        <p className="text-sm text-stone-200 text-center font-medium leading-snug">
          {comment}
        </p>
      </div>
    </div>
  );
}
