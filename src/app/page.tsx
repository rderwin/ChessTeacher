import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Learn Chess by <span className="text-emerald-400">Doing</span>
        </h1>
        <p className="text-xl text-stone-400 mb-8 leading-relaxed">
          Master openings through interactive practice. Play the moves yourself,
          and understand <em>why</em> each move matters — not just what to play.
        </p>

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

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-stone-800/50 rounded-xl p-5 border border-stone-700/50">
            <h3 className="font-semibold text-white mb-2">Hands-On Learning</h3>
            <p className="text-sm text-stone-400">
              Play every move on an interactive board. No passive reading — you
              learn by doing.
            </p>
          </div>
          <div className="bg-stone-800/50 rounded-xl p-5 border border-stone-700/50">
            <h3 className="font-semibold text-white mb-2">
              Understand the Why
            </h3>
            <p className="text-sm text-stone-400">
              Every move comes with a rich explanation of the strategic
              concepts behind it.
            </p>
          </div>
          <div className="bg-stone-800/50 rounded-xl p-5 border border-stone-700/50">
            <h3 className="font-semibold text-white mb-2">
              Learn from Mistakes
            </h3>
            <p className="text-sm text-stone-400">
              Play a wrong move? Get targeted feedback explaining why the
              correct move is better.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
