"use client";

import { useState } from "react";
import { OpeningLine } from "@/data/types";
import OpeningIntro from "./OpeningIntro";
import PracticeSession from "./PracticeSession";

interface OpeningPageProps {
  opening: OpeningLine;
}

export default function OpeningPage({ opening }: OpeningPageProps) {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="px-4 py-8">
        <OpeningIntro opening={opening} onStart={() => setStarted(true)} />
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <PracticeSession opening={opening} />
    </div>
  );
}
