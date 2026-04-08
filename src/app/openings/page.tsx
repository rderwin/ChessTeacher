import { ALL_OPENINGS } from "@/data/openings";
import OpeningGrid from "@/components/openings/OpeningGrid";

export const metadata = {
  title: "Openings — ChessTeacher",
};

export default function OpeningsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Opening Repertoire
        </h1>
        <p className="text-stone-400">
          Choose an opening to practice. Play the moves yourself and learn why
          each one works.
        </p>
      </div>

      <OpeningGrid openings={ALL_OPENINGS} />
    </div>
  );
}
