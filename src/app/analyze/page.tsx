"use client";

import { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useAuth } from "@/contexts/AuthContext";
import { parsePgn } from "@/lib/pgn";
import type { ParsedGame } from "@/lib/pgn";
import { saveGame, getSavedGames } from "@/lib/saved-games";
import type { SavedGame } from "@/lib/saved-games";

const SAMPLE_PGN = `[Event "Example Game"]
[White "Player 1"]
[Black "Player 2"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 1-0`;

const HIGHLIGHT_FROM = { backgroundColor: "rgba(255, 255, 0, 0.4)" };
const HIGHLIGHT_TO = { backgroundColor: "rgba(255, 255, 0, 0.4)" };

export default function AnalyzePage() {
  const { boardTheme, pieceStyle } = usePreferences();
  const { user } = useAuth();
  const [pgnInput, setPgnInput] = useState("");
  const [game, setGame] = useState<ParsedGame | null>(null);
  const [activePgn, setActivePgn] = useState("");
  const [moveIndex, setMoveIndex] = useState(-1); // -1 = starting position
  const [error, setError] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(true);

  // Load saved games on mount
  useEffect(() => {
    setLoadingSaved(true);
    getSavedGames(user?.uid).then((games) => {
      setSavedGames(games);
      setLoadingSaved(false);
    });
  }, [user?.uid]);

  const loadPgn = useCallback((pgn: string) => {
    setError(null);
    setSaved(false);
    try {
      const parsed = parsePgn(pgn);
      if (parsed.moves.length === 0) {
        setError("No moves found in PGN.");
        return;
      }
      setGame(parsed);
      setActivePgn(pgn);
      setMoveIndex(-1);
      if (parsed.headers["Black"]?.toLowerCase().includes("you")) {
        setOrientation("black");
      } else {
        setOrientation("white");
      }
    } catch {
      setError("Invalid PGN. Check the format and try again.");
    }
  }, []);

  const handleSaveGame = useCallback(async () => {
    if (!game || saving) return;
    setSaving(true);
    try {
      const newGame = await saveGame(
        {
          pgn: activePgn,
          white: game.headers["White"] ?? "White",
          black: game.headers["Black"] ?? "Black",
          result: game.result,
          event: game.headers["Event"] ?? "",
          date: game.headers["Date"] ?? "",
        },
        user?.uid
      );
      setSaved(true);
      setSavedGames((prev) => [newGame, ...prev]);
    } finally {
      setSaving(false);
    }
  }, [game, activePgn, saving, user?.uid]);

  const currentFen = game
    ? moveIndex === -1
      ? game.startFen
      : game.moves[moveIndex].fen
    : "start";

  const currentMove = game && moveIndex >= 0 ? game.moves[moveIndex] : null;

  const goTo = useCallback(
    (index: number) => {
      if (!game) return;
      setMoveIndex(Math.max(-1, Math.min(index, game.moves.length - 1)));
    },
    [game]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!game) return;
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setMoveIndex((i) => Math.max(-1, i - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setMoveIndex((i) =>
          game ? Math.min(game.moves.length - 1, i + 1) : i
        );
      } else if (e.key === "Home") {
        e.preventDefault();
        setMoveIndex(-1);
      } else if (e.key === "End") {
        e.preventDefault();
        setMoveIndex(game ? game.moves.length - 1 : -1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [game]);

  const squareStyles: Record<string, React.CSSProperties> = {};
  if (currentMove) {
    squareStyles[currentMove.from] = HIGHLIGHT_FROM;
    squareStyles[currentMove.to] = HIGHLIGHT_TO;
  }

  const pieceFilter = [pieceStyle.filter, pieceStyle.shadow]
    .filter((v) => v !== "none")
    .join(" ");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Game Analyzer</h1>
      <p className="text-stone-400 mb-6">
        Paste a PGN to replay any game move by move.
      </p>

      {!game ? (
        <div className="max-w-2xl">
          <textarea
            value={pgnInput}
            onChange={(e) => setPgnInput(e.target.value)}
            placeholder="Paste PGN here..."
            className="w-full h-48 bg-stone-800 border border-stone-700 rounded-xl p-4 text-sm text-stone-200 font-mono placeholder:text-stone-600 focus:outline-none focus:border-stone-500 resize-none"
          />
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => loadPgn(pgnInput)}
              disabled={!pgnInput.trim()}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Load Game
            </button>
            <button
              onClick={() => {
                setPgnInput(SAMPLE_PGN);
                loadPgn(SAMPLE_PGN);
              }}
              className="px-6 py-2.5 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors"
            >
              Try Example
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Board */}
          <div className="shrink-0">
            <div
              className="w-full max-w-[480px] aspect-square"
              style={
                pieceFilter
                  ? ({ filter: pieceFilter } as React.CSSProperties)
                  : undefined
              }
            >
              <Chessboard
                options={{
                  position: currentFen,
                  boardOrientation: orientation,
                  allowDragging: false,
                  squareStyles,
                  animationDurationInMs: 200,
                  boardStyle: {
                    borderRadius: "4px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  },
                  darkSquareStyle: { backgroundColor: boardTheme.darkSquare },
                  lightSquareStyle: {
                    backgroundColor: boardTheme.lightSquare,
                  },
                }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => goTo(-1)}
                disabled={moveIndex === -1}
                className="px-3 py-2 bg-stone-800 text-stone-300 rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-30"
                title="Start (Home)"
              >
                ⏮
              </button>
              <button
                onClick={() => goTo(moveIndex - 1)}
                disabled={moveIndex === -1}
                className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-30"
                title="Previous (←)"
              >
                ◀
              </button>
              <span className="text-sm text-stone-500 w-20 text-center">
                {moveIndex === -1
                  ? "Start"
                  : `${Math.ceil((moveIndex + 1) / 2)}. ${
                      game.moves[moveIndex].color === "w" ? "" : "..."
                    }${game.moves[moveIndex].san}`}
              </span>
              <button
                onClick={() => goTo(moveIndex + 1)}
                disabled={moveIndex === game.moves.length - 1}
                className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-30"
                title="Next (→)"
              >
                ▶
              </button>
              <button
                onClick={() => goTo(game.moves.length - 1)}
                disabled={moveIndex === game.moves.length - 1}
                className="px-3 py-2 bg-stone-800 text-stone-300 rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-30"
                title="End (End)"
              >
                ⏭
              </button>
              <button
                onClick={() =>
                  setOrientation((o) =>
                    o === "white" ? "black" : "white"
                  )
                }
                className="ml-2 px-3 py-2 bg-stone-800 text-stone-300 rounded-lg hover:bg-stone-700 transition-colors"
                title="Flip board"
              >
                🔄
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex-1 min-w-0">
            {/* Game info */}
            {(game.headers["White"] || game.headers["Black"]) && (
              <div className="bg-stone-800 rounded-xl p-4 border border-stone-700 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-white font-medium">
                      {game.headers["White"] ?? "White"}
                    </span>
                    <span className="text-stone-500 mx-2">vs</span>
                    <span className="text-white font-medium">
                      {game.headers["Black"] ?? "Black"}
                    </span>
                  </div>
                  <span className="text-stone-400">{game.result}</span>
                </div>
                {game.headers["Event"] && (
                  <p className="text-xs text-stone-500 mt-1">
                    {game.headers["Event"]}
                    {game.headers["Date"] ? ` — ${game.headers["Date"]}` : ""}
                  </p>
                )}
              </div>
            )}

            {/* Move list */}
            <div className="bg-stone-800 rounded-xl border border-stone-700 p-4 mb-4">
              <h3 className="text-sm font-medium text-stone-400 mb-3">
                Moves
              </h3>
              <div className="flex flex-wrap gap-x-1 gap-y-1">
                {game.moves.map((move, i) => (
                  <span key={i} className="inline-flex items-center">
                    {move.color === "w" && (
                      <span className="text-stone-600 text-xs mr-0.5 font-mono">
                        {move.moveNumber}.
                      </span>
                    )}
                    <button
                      onClick={() => goTo(i)}
                      className={`text-sm px-1.5 py-0.5 rounded transition-colors ${
                        i === moveIndex
                          ? "bg-emerald-600 text-white"
                          : "text-stone-300 hover:bg-stone-700"
                      }`}
                    >
                      {move.san}
                    </button>
                  </span>
                ))}
                <span className="text-xs text-stone-500 self-center ml-1">
                  {game.result}
                </span>
              </div>
            </div>

            {/* Engine analysis stub */}
            <div className="bg-stone-900/50 border border-stone-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-stone-400">
                  Engine Analysis
                </span>
                <span className="text-[10px] font-medium px-1.5 py-0.5 bg-stone-700 text-stone-400 rounded-full">
                  Coming soon
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Move-by-move evaluation, best move suggestions, blunder
                detection, and accuracy scores.
              </p>
            </div>

            {/* Save & back */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => {
                  setGame(null);
                  setActivePgn("");
                  setMoveIndex(-1);
                  setPgnInput("");
                  setError(null);
                  setSaved(false);
                }}
                className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
              >
                ← Load a different game
              </button>
              <button
                onClick={handleSaveGame}
                disabled={saved || saving}
                className={`text-sm px-4 py-1.5 rounded-lg transition-colors ${
                  saved
                    ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700"
                    : "bg-stone-700 text-stone-300 hover:bg-stone-600"
                } disabled:cursor-not-allowed`}
              >
                {saving ? "Saving..." : saved ? "Saved" : "Save Game"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Games — shown on input screen */}
      {!game && (
        <div className="max-w-2xl mt-10">
          <h2 className="text-lg font-semibold text-white mb-3">Saved Games</h2>
          {loadingSaved ? (
            <p className="text-sm text-stone-500">Loading...</p>
          ) : savedGames.length === 0 ? (
            <p className="text-sm text-stone-500">
              No saved games yet. Load a PGN and click &quot;Save Game&quot; to keep it here.
            </p>
          ) : (
            <div className="grid gap-2">
              {savedGames.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setPgnInput(g.pgn);
                    loadPgn(g.pgn);
                    setSaved(true);
                  }}
                  className="flex items-center justify-between bg-stone-800 rounded-lg p-3 border border-stone-700 hover:border-stone-600 transition-colors text-left"
                >
                  <div>
                    <span className="text-sm text-white font-medium">
                      {g.white}
                    </span>
                    <span className="text-stone-500 text-sm mx-1.5">vs</span>
                    <span className="text-sm text-white font-medium">
                      {g.black}
                    </span>
                    {g.event && (
                      <span className="text-xs text-stone-500 ml-2">{g.event}</span>
                    )}
                  </div>
                  <span className="text-xs text-stone-400">{g.result}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
