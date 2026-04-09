import Link from "next/link";

const MODULES = [
  {
    title: "Coach Mode 🐕",
    href: "/trainer",
    description: "Play against bots while a furry coach watches every move — and yells at you when you blunder.",
    ready: true,
  },
  {
    title: "Puzzles",
    href: "/puzzles",
    description: "Sharpen your tactical vision with themed puzzle sets — forks, pins, mates, and more.",
    ready: true,
  },
  {
    title: "Openings",
    href: "/openings",
    description: "Master chess openings through interactive practice. Play the moves and understand why each one matters.",
    ready: true,
  },
  {
    title: "Analyze",
    href: "/analyze",
    description: "Paste a PGN to replay any game with Stockfish analysis, move classification, and explanations.",
    ready: true,
  },
  {
    title: "Endgames",
    href: "/endgames",
    description: "Learn essential checkmate techniques and recognize which endings are impossible to win.",
    ready: false,
  },
  {
    title: "Draw Rules",
    href: "/draws",
    description: "Understand stalemate, threefold repetition, the 50-move rule, and other ways games end in draws.",
    ready: false,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Learn Chess by <span className="text-emerald-400">Doing</span>
        </h1>
        <p className="text-xl text-stone-400 mb-10 leading-relaxed">
          Master chess through interactive practice. Play the moves yourself,
          and understand <em>why</em> each move matters — not just what to play.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
          {MODULES.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="group bg-stone-800/50 rounded-xl p-5 border border-stone-700/50 hover:border-stone-600 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {mod.title}
                </h3>
                {!mod.ready && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 bg-stone-700 text-stone-400 rounded-full">
                    Soon
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-400">{mod.description}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/openings"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-colors text-lg font-medium"
        >
          Start Practicing
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
