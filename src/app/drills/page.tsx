import Link from "next/link";

export const metadata = {
  title: "Drills — ChessTeacher",
};

const DRILLS = [
  {
    href: "/practice/queen-drills",
    title: "Queen Gauntlet",
    description:
      "Play full mini-games against an opponent doing a queen attack — Scholar's Mate, Wayward Queen, Scandinavian, and more. Coach evaluates EVERY move, wrong moves undo so you can try again.",
    icon: "♛",
    scenarios: 4,
    colorClass: "from-rose-600/10 to-red-700/10 hover:border-rose-500/40",
  },
];

export default function DrillsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Drills</h1>
        <p className="text-stone-400">
          Scenario-based practice. A bot plays common attacks and tricky
          situations — you learn to respond correctly through repetition.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DRILLS.map((drill) => (
          <Link
            key={drill.href}
            href={drill.href}
            className={`group bg-gradient-to-br ${drill.colorClass} bg-stone-800/40 rounded-xl p-6 border border-stone-700/60 hover:bg-stone-800/70 transition-all`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl" aria-hidden>
                {drill.icon}
              </span>
              <div>
                <h2 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {drill.title}
                </h2>
                <p className="text-xs text-stone-500">
                  {drill.scenarios} mini-games
                </p>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              {drill.description}
            </p>
          </Link>
        ))}

        {/* Placeholder for future drills */}
        <div className="bg-stone-800/20 rounded-xl p-6 border border-dashed border-stone-700/40 flex items-center justify-center">
          <p className="text-sm text-stone-600 text-center">
            More drills coming soon — endgame patterns, tactical motifs, and
            opening traps.
          </p>
        </div>
      </div>
    </div>
  );
}
