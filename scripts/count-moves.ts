import { ALL_OPENINGS } from "../src/data/openings/index";

const sorted = [...ALL_OPENINGS].sort((a, b) => a.moves.length - b.moves.length);
console.log("Opening                   | Moves | Player moves | Variants");
console.log("--------------------------|-------|--------------|---------");
for (const op of sorted) {
  const variantCount = op.variants?.length ?? 0;
  const playerMoves = op.moves.filter((m) => m.color === op.playerColor).length;
  console.log(
    `${op.id.padEnd(25)} | ${String(op.moves.length).padStart(5)} | ${String(playerMoves).padStart(12)} | ${variantCount}`,
  );
}
