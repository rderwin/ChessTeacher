import Link from "next/link";
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

      {/* Queen Attack Drills — below the main grid */}
      <Link
        href="/practice/queen-drills"
        className="block mt-10 bg-gradient-to-br from-rose-900/30 to-red-950/30 border border-rose-700/40 hover:border-rose-500/50 rounded-xl p-5 group transition-all"
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl" aria-hidden>♛</span>
          <h2 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
            Queen Attack Drills
          </h2>
        </div>
        <p className="text-sm text-stone-400">
          Face different early queen attacks — Scholar&apos;s Mate, Wayward Queen, Parham, Scandinavian,
          and more. The bot plays the annoying moves, you learn to handle them.
        </p>
      </Link>
    </div>
  );
}
