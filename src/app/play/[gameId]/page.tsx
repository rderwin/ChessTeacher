"use client";

import { use } from "react";
import MultiplayerGameView from "@/components/multiplayer/MultiplayerGameView";

export default function PlayGamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = use(params);
  return <MultiplayerGameView gameId={gameId} />;
}
