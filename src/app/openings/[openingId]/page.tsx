import { notFound } from "next/navigation";
import { getOpeningById, ALL_OPENINGS } from "@/data/openings";
import OpeningPage from "@/components/practice/OpeningPage";

interface Props {
  params: Promise<{ openingId: string }>;
}

export async function generateStaticParams() {
  return ALL_OPENINGS.map((o) => ({ openingId: o.id }));
}

export async function generateMetadata({ params }: Props) {
  const { openingId } = await params;
  const opening = getOpeningById(openingId);
  if (!opening) return { title: "Not Found" };
  return {
    title: `${opening.name} — ChessTeacher`,
    description: opening.description,
  };
}

export default async function OpeningPracticePage({ params }: Props) {
  const { openingId } = await params;
  const opening = getOpeningById(openingId);
  if (!opening) notFound();

  return <OpeningPage opening={opening} />;
}
