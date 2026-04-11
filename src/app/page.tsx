import Link from "next/link";
import BeginnerPath from "@/components/home/BeginnerPath";
import DailyPuzzle from "@/components/home/DailyPuzzle";

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
    title: "Glossary",
    href: "/glossary",
    description: "Look up chess terms — forks, pins, fianchetto, en passant, and 20+ concepts explained simply.",
    ready: true,
  },
  {
    title: "Endgames",
    href: "/endgames",
    description: "Practice essential checkmates (K+Q, K+R, ladder mate) against Stockfish until you can do them every time.",
    ready: true,
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

        {/* Beginner pathway — shows for new users, hides once they have progress */}
        <BeginnerPath />

        {/* Daily puzzle — a quick puzzle right on the home page */}
        <DailyPuzzle />

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
      </div>
    </div>
  );
}
