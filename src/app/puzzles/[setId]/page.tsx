import { notFound } from "next/navigation";
import { getPuzzleSetById, ALL_PUZZLE_SETS } from "@/data/puzzles";
import PuzzleSetPage from "./PuzzleSetPage";

interface Props {
  params: Promise<{ setId: string }>;
}

export async function generateStaticParams() {
  return ALL_PUZZLE_SETS.map((s) => ({ setId: s.id }));
}

export async function generateMetadata({ params }: Props) {
  const { setId } = await params;
  const set = getPuzzleSetById(setId);
  if (!set) return { title: "Not Found" };
  return {
    title: `${set.name} — ChessTeacher`,
    description: set.description,
  };
}

export default async function PuzzleSetRoute({ params }: Props) {
  const { setId } = await params;
  const set = getPuzzleSetById(setId);
  if (!set) notFound();

  return <PuzzleSetPage puzzleSet={set} />;
}
