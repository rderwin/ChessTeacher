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

interface BreedStyle {
  name: string;
  headColor: string;
  earColor: string;
  snoutColor: string;
  headSize: string;
  eyeSize: string;
  earStyle: "floppy" | "perky" | "pointed";
  /** Extra CSS classes for the head */
  headExtra?: string;
  /** Accessories rendered on top */
  accessory?: "none" | "collar" | "bowtie" | "glasses" | "crown";
}

const BREED_STYLES: Record<DogBreed, BreedStyle> = {
  puppy: {
    name: "Puppy",
    headColor: "bg-amber-400",
    earColor: "bg-amber-500",
    snoutColor: "bg-amber-300",
    headSize: "w-[72px] h-[72px]",
    eyeSize: "w-5 h-5",
    earStyle: "floppy",
  },
  golden: {
    name: "Golden Retriever",
    headColor: "bg-amber-500",
    earColor: "bg-amber-600",
    snoutColor: "bg-amber-400",
    headSize: "w-20 h-20",
    eyeSize: "w-4 h-4",
    earStyle: "floppy",
    accessory: "collar",
  },
  beagle: {
    name: "Beagle",
    headColor: "bg-amber-600",
    earColor: "bg-amber-800",
    snoutColor: "bg-amber-500",
    headSize: "w-20 h-20",
    eyeSize: "w-4 h-4",
    earStyle: "floppy",
    accessory: "collar",
  },
  husky: {
    name: "Husky",
    headColor: "bg-slate-400",
    earColor: "bg-slate-500",
    snoutColor: "bg-white",
    headSize: "w-[84px] h-[84px]",
    eyeSize: "w-4 h-4",
    earStyle: "perky",
    accessory: "bowtie",
  },
  shepherd: {
    name: "German Shepherd",
    headColor: "bg-amber-700",
    earColor: "bg-amber-900",
    snoutColor: "bg-amber-600",
    headSize: "w-[88px] h-[84px]",
    eyeSize: "w-4 h-4",
    earStyle: "perky",
    accessory: "glasses",
  },
  collie: {
    name: "Border Collie",
    headColor: "bg-stone-800",
    earColor: "bg-stone-900",
    snoutColor: "bg-white",
    headSize: "w-[88px] h-[84px]",
    eyeSize: "w-[18px] h-[18px]",
    earStyle: "perky",
    accessory: "glasses",
  },
  wolf: {
    name: "Alpha Wolf",
    headColor: "bg-slate-600",
    earColor: "bg-slate-700",
    snoutColor: "bg-slate-400",
    headSize: "w-24 h-[92px]",
    eyeSize: "w-[18px] h-[18px]",
    earStyle: "pointed",
    accessory: "crown",
  },
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

// --- Dog face expressions ---

interface FaceProps {
  mood: DogMood;
  breed?: DogBreed;
}

function DogFace({ mood, breed = "golden" }: FaceProps) {
  const style = BREED_STYLES[breed];

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

  // Ear shape based on breed
  const earBaseClass = "absolute -top-2.5 w-5 transition-transform duration-300";
  let leftEarRotate: string;
  let rightEarRotate: string;
  let earHeight = "h-7";
  let earRounding = "rounded-t-full";

  if (mood === "mistake" || mood === "blunder" || mood === "gameover-lose") {
    leftEarRotate = "rotate-[-30deg]";
    rightEarRotate = "rotate-[30deg]";
  } else if (style.earStyle === "floppy") {
    leftEarRotate = "rotate-[-20deg]";
    rightEarRotate = "rotate-[20deg]";
    earHeight = "h-8";
  } else if (style.earStyle === "pointed") {
    leftEarRotate = "-rotate-6";
    rightEarRotate = "rotate-6";
    earHeight = "h-9";
    earRounding = "rounded-t-[60%]";
  } else {
    // perky
    leftEarRotate = "-rotate-12";
    rightEarRotate = "rotate-12";
  }

  // Head tilt
  const headTilt = mood === "inaccuracy" ? "rotate-12" : mood === "hint" ? "-rotate-6" : "";

  // Accessory
  let accessory: React.ReactNode = null;
  if (style.accessory === "glasses") {
    accessory = (
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[70%] flex items-center justify-center z-20 pointer-events-none">
        <div className="flex items-center gap-0.5">
          <div className="w-4 h-3 border border-stone-300 rounded-full" />
          <div className="w-1.5 h-[1px] bg-stone-300" />
          <div className="w-4 h-3 border border-stone-300 rounded-full" />
        </div>
      </div>
    );
  } else if (style.accessory === "crown") {
    accessory = (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-xl">
        👑
      </div>
    );
  } else if (style.accessory === "bowtie") {
    accessory = (
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-xs">
        🎀
      </div>
    );
  } else if (style.accessory === "collar") {
    accessory = (
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[60%] h-1.5 bg-red-500 rounded-full z-10" />
    );
  }

  return (
    <div className={`${animClass} ${headTilt} transition-transform duration-300`}>
      <div className={`${style.headSize} ${style.headColor} rounded-full relative mx-auto`}>
        {/* Ears */}
        <div
          className={`${earBaseClass} left-1.5 ${earHeight} ${style.earColor} ${earRounding} ${leftEarRotate}`}
        />
        <div
          className={`${earBaseClass} right-1.5 ${earHeight} ${style.earColor} ${earRounding} ${rightEarRotate}`}
        />
        {/* Eyes */}
        <div className={`absolute top-5 left-3.5 ${style.eyeSize} bg-white rounded-full flex items-center justify-center overflow-hidden`}>
          {eyeContent}
        </div>
        <div className={`absolute top-5 right-3.5 ${style.eyeSize} bg-white rounded-full flex items-center justify-center overflow-hidden`}>
          {eyeContent}
        </div>
        {/* Snout */}
        <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-6 ${style.snoutColor} rounded-full flex flex-col items-center`}>
          <div className="w-3 h-2 bg-stone-900 rounded-full mt-0.5" />
          {mouth}
        </div>
        {/* Accessory */}
        {accessory}
      </div>
      {/* Breed label */}
      <p className="text-[10px] text-stone-600 text-center mt-1">{style.name}</p>
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
