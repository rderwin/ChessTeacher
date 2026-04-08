"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Chessboard } from "react-chessboard";
import { useAuth } from "@/contexts/AuthContext";
import { usePreferences } from "@/contexts/PreferencesContext";
import { BOARD_THEMES, PIECE_STYLES, getBoardTheme, getPieceStyle } from "@/lib/preferences";
import { getSavedGames, deleteGame } from "@/lib/saved-games";
import type { SavedGame } from "@/lib/saved-games";

const PREVIEW_FEN = "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4";

export default function AccountPage() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const { prefs, updatePreferences } = usePreferences();
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);

  useEffect(() => {
    setLoadingGames(true);
    getSavedGames(user?.uid).then((games) => {
      setSavedGames(games);
      setLoadingGames(false);
    });
  }, [user?.uid]);

  const handleDelete = async (id: string) => {
    await deleteGame(id, user?.uid);
    setSavedGames((prev) => prev.filter((g) => g.id !== id));
  };

  const currentTheme = getBoardTheme(prefs.boardTheme);
  const currentPieceStyle = getPieceStyle(prefs.pieceStyle);
  const pieceFilter = [currentPieceStyle.filter, currentPieceStyle.shadow]
    .filter((v) => v !== "none")
    .join(" ");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Account</h1>

      {/* Profile Section */}
      <section className="bg-stone-800 rounded-xl p-6 border border-stone-700 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
        {user ? (
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt=""
                className="w-14 h-14 rounded-full"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="flex-1">
              <p className="text-white font-medium">{user.displayName}</p>
              <p className="text-sm text-stone-400">{user.email}</p>
            </div>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors text-sm"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-stone-400">
              Sign in to save your preferences and progress across devices.
            </p>
            <button
              onClick={signInWithGoogle}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors text-sm shrink-0"
            >
              Sign in with Google
            </button>
          </div>
        )}
      </section>

      {/* Chess.com Username */}
      <section className="bg-stone-800 rounded-xl p-6 border border-stone-700 mb-8">
        <h2 className="text-lg font-semibold text-white mb-1">Chess.com Username</h2>
        <p className="text-xs text-stone-500 mb-3">
          Set this so the analyzer knows which side is yours and auto-orients the board.
        </p>
        <input
          type="text"
          value={prefs.chessComUsername ?? ""}
          onChange={(e) => updatePreferences({ chessComUsername: e.target.value.trim() })}
          placeholder="e.g. hikaru"
          className="w-64 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-emerald-600 transition-colors"
        />
      </section>

      {/* Board Preview */}
      <section className="bg-stone-800 rounded-xl p-6 border border-stone-700 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Preview</h2>
        <div className="flex justify-center">
          <div
            className="w-[320px] aspect-square"
            style={pieceFilter ? { filter: pieceFilter } : undefined}
          >
            <Chessboard
              options={{
                position: PREVIEW_FEN,
                allowDragging: false,
                showNotation: true,
                animationDurationInMs: 300,
                boardStyle: {
                  borderRadius: "4px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                },
                darkSquareStyle: { backgroundColor: currentTheme.darkSquare },
                lightSquareStyle: { backgroundColor: currentTheme.lightSquare },
              }}
            />
          </div>
        </div>
      </section>

      {/* Board Theme */}
      <section className="bg-stone-800 rounded-xl p-6 border border-stone-700 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Board Theme</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BOARD_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => updatePreferences({ boardTheme: theme.id })}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                prefs.boardTheme === theme.id
                  ? "border-emerald-500 bg-emerald-950/30"
                  : "border-stone-600 hover:border-stone-500"
              }`}
            >
              <div className="flex shrink-0 rounded overflow-hidden">
                <div
                  className="w-6 h-6"
                  style={{ backgroundColor: theme.lightSquare }}
                />
                <div
                  className="w-6 h-6"
                  style={{ backgroundColor: theme.darkSquare }}
                />
              </div>
              <span className="text-sm text-stone-200">{theme.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Saved Games */}
      <section className="bg-stone-800 rounded-xl p-6 border border-stone-700 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Saved Games</h2>
          <Link
            href="/analyze"
            className="text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            Open Analyzer
          </Link>
        </div>
        {loadingGames ? (
          <p className="text-sm text-stone-500">Loading...</p>
        ) : savedGames.length === 0 ? (
          <p className="text-sm text-stone-500">
            No saved games yet.{" "}
            <Link href="/analyze" className="text-emerald-400 hover:underline">
              Analyze a game
            </Link>{" "}
            and save it to see it here.
          </p>
        ) : (
          <div className="grid gap-2">
            {savedGames.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between bg-stone-900/50 rounded-lg p-3 border border-stone-700/50"
              >
                <Link
                  href={`/analyze`}
                  className="flex-1 min-w-0 hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-white font-medium truncate">
                      {g.white}
                    </span>
                    <span className="text-stone-500 text-xs">vs</span>
                    <span className="text-sm text-white font-medium truncate">
                      {g.black}
                    </span>
                    <span className="text-xs text-stone-500 ml-1">{g.result}</span>
                  </div>
                  {g.event && (
                    <p className="text-xs text-stone-500 truncate">{g.event}{g.date ? ` — ${g.date}` : ""}</p>
                  )}
                </Link>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="ml-3 shrink-0 text-xs text-stone-600 hover:text-red-400 transition-colors"
                  title="Remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Piece Style */}
      <section className="bg-stone-800 rounded-xl p-6 border border-stone-700">
        <h2 className="text-lg font-semibold text-white mb-4">Piece Style</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PIECE_STYLES.map((style) => {
            const filter = [style.filter, style.shadow]
              .filter((v) => v !== "none")
              .join(" ");

            return (
              <button
                key={style.id}
                onClick={() => updatePreferences({ pieceStyle: style.id })}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  prefs.pieceStyle === style.id
                    ? "border-emerald-500 bg-emerald-950/30"
                    : "border-stone-600 hover:border-stone-500"
                }`}
              >
                <span
                  className="text-2xl shrink-0"
                  style={filter ? { filter } : undefined}
                >
                  &#9816;
                </span>
                <span className="text-sm text-stone-200">{style.name}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
