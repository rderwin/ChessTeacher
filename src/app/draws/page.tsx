import Link from "next/link";

const DRAW_RULES = [
  {
    title: "Stalemate",
    description: "If it's your turn but you have no legal moves and you're NOT in check, the game is a draw. This catches many beginners off guard — you can accidentally stalemate a losing opponent!",
    example: "King trapped in the corner with no squares, but not attacked.",
  },
  {
    title: "Threefold Repetition",
    description: "If the same position occurs three times with the same player to move, either player can claim a draw. The positions don't have to be consecutive.",
    example: "Both players shuffle their pieces back and forth to the same squares.",
  },
  {
    title: "Fifty-Move Rule",
    description: "If 50 consecutive moves pass with no pawn move and no capture, either player can claim a draw. This prevents endlessly shuffling pieces.",
    example: "A long endgame where neither side can make progress.",
  },
  {
    title: "Insufficient Material",
    description: "The game is automatically drawn when neither player has enough pieces to force checkmate. No claim needed — it's instant.",
    example: "King vs King, King & Bishop vs King, King & Knight vs King.",
  },
  {
    title: "Draw by Agreement",
    description: "Players can agree to a draw at any time. In competitive play, one player offers and the other accepts. Common when both sides see no way to make progress.",
    example: "Equal position with few pieces — both players agree it's going nowhere.",
  },
];

export default function DrawsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Draw Rules</h1>
        <p className="text-stone-400 text-lg">
          A chess game doesn't always end in checkmate. Understanding draws is
          crucial — knowing these rules can save a losing game or prevent you
          from accidentally letting one slip.
        </p>
      </div>

      <div className="grid gap-4">
        {DRAW_RULES.map((rule, i) => (
          <div
            key={rule.title}
            className="bg-stone-800 rounded-xl p-6 border border-stone-700"
          >
            <div className="flex items-start gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-sm font-bold text-stone-300">
                {i + 1}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">
                  {rule.title}
                </h2>
                <p className="text-stone-300 mb-3">{rule.description}</p>
                <div className="bg-stone-900/50 rounded-lg px-4 py-3 border border-stone-700/50">
                  <p className="text-sm text-stone-400">
                    <span className="text-stone-500 font-medium">Example: </span>
                    {rule.example}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-6 text-center">
        <p className="text-emerald-300 font-medium mb-1">Interactive lessons coming soon</p>
        <p className="text-sm text-stone-400">
          Practice recognizing and avoiding stalemates, learn to claim draws, and test yourself with puzzles.
        </p>
      </div>

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
