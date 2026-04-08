import Link from "next/link";

const PLANNED_LESSONS = [
  { title: "King & Queen vs King", description: "The most common basic checkmate — learn the technique to force mate efficiently." },
  { title: "King & Rook vs King", description: "Trickier than Q vs K, but essential. Master the box method to push the king to the edge." },
  { title: "King & 2 Bishops vs King", description: "Coordinate your bishops to create a net the king can't escape." },
  { title: "King & Bishop + Knight vs King", description: "The hardest basic checkmate — learn the W-maneuver to drive the king to the corner." },
  { title: "King & 2 Rooks vs King", description: "The ladder mate — alternate rooks to push the king off the board." },
  { title: "King & Pawn vs King", description: "Can you promote? Learn opposition, key squares, and when a pawn ending is won or drawn." },
];

const IMPOSSIBLE_ENDINGS = [
  "King vs King",
  "King & Bishop vs King",
  "King & Knight vs King",
  "King & Bishop vs King & Bishop (same color)",
];

export default function EndgamesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Endgame Practice</h1>
        <p className="text-stone-400 text-lg">
          Learn how to convert winning endgames into checkmate — and recognize which ones are impossible to win.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Checkmate Techniques</h2>
        <div className="grid gap-3">
          {PLANNED_LESSONS.map((lesson) => (
            <div
              key={lesson.title}
              className="bg-stone-800 rounded-xl p-5 border border-stone-700 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-medium text-white mb-1">{lesson.title}</h3>
                <p className="text-sm text-stone-400">{lesson.description}</p>
              </div>
              <span className="shrink-0 text-xs font-medium px-2.5 py-1 bg-stone-700 text-stone-400 rounded-full">
                Coming soon
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Insufficient Material</h2>
        <p className="text-stone-400 text-sm mb-4">
          These endings are automatic draws — neither side can force checkmate no matter what.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {IMPOSSIBLE_ENDINGS.map((ending) => (
            <div
              key={ending}
              className="bg-stone-800/50 rounded-lg p-4 border border-stone-700/50 flex items-center gap-3"
            >
              <span className="text-stone-500 text-lg">=</span>
              <span className="text-sm text-stone-300">{ending}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
