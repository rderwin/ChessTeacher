import { ALL_PUZZLE_SETS } from "@/data/puzzles";
import PuzzleSetGrid from "@/components/puzzles/PuzzleSetGrid";

export const metadata = {
  title: "Puzzles — ChessTeacher",
};

export default function PuzzlesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Tactical Puzzles
        </h1>
        <p className="text-stone-400">
          Sharpen your tactical vision. Find the best move in each position.
        </p>
      </div>

      <PuzzleSetGrid sets={ALL_PUZZLE_SETS} />
    </div>
  );
}
