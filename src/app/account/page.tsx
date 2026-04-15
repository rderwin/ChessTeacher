"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Chessboard } from "react-chessboard";
import { useAuth } from "@/contexts/AuthContext";
import { usePreferences } from "@/contexts/PreferencesContext";
import { BOARD_THEMES, PIECE_STYLES, getBoardTheme, getPieceStyle } from "@/lib/preferences";
import { getSavedGames, deleteGame } from "@/lib/saved-games";
import type { SavedGame } from "@/lib/saved-games";
import { usePuzzleProgress } from "@/hooks/usePuzzleProgress";
import { getXPForNextLevel } from "@/lib/xp";
import { ACHIEVEMENTS } from "@/data/achievements";
import ActivityHeatmap from "@/components/account/ActivityHeatmap";
import RatingGraph from "@/components/account/RatingGraph";

const PREVIEW_FEN = "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4";

export default function AccountPage() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const { prefs, updatePreferences } = usePreferences();
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const { progress, achievements: unlockedAchievements } = usePuzzleProgress();

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

      {/* Your Progress */}
      <section className="bg-stone-800 rounded-xl p-6 border border-stone-700 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Your Progress</h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="bg-stone-900/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{progress.level}</p>
            <p className="text-xs text-stone-500">Level</p>
          </div>
          <div className="bg-stone-900/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{progress.rating}</p>
            <p className="text-xs text-stone-500">Puzzle Rating</p>
          </div>
          <div className="bg-stone-900/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{progress.totalSolved}</p>
            <p className="text-xs text-stone-500">Puzzles Solved</p>
          </div>
          <div className="bg-stone-900/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">
              {progress.totalAttempted > 0
                ? Math.round((progress.correctFirstAttempt / progress.totalAttempted) * 100)
                : 0}%
            </p>
            <p className="text-xs text-stone-500">Accuracy</p>
          </div>
        </div>

        {/* XP progress bar */}
        {(() => {
          const { needed, total, currentLevelXP } = getXPForNextLevel(progress.xp);
          const range = total - currentLevelXP;
          const filled = progress.xp - currentLevelXP;
          const pct = range > 0 ? Math.min(100, (filled / range) * 100) : 100;
          return (
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>Lv.{progress.level} — {progress.xp} XP</span>
                <span>{needed} XP to Lv.{progress.level + 1}</span>
              </div>
              <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })()}

        {/* Streaks */}
        <div className="flex items-center gap-4 mb-5 text-sm">
          <div className="flex items-center gap-1.5">
            <span>🔥</span>
            <span className="text-stone-300">Streak: <strong>{progress.currentStreak}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🏆</span>
            <span className="text-stone-300">Best: <strong>{progress.bestStreak}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>📅</span>
            <span className="text-stone-300">Daily: <strong>{progress.dailyStreak}</strong></span>
          </div>
        </div>

        {/* Rating graph */}
        <div className="bg-stone-900/50 rounded-lg p-4 mb-4">
          <RatingGraph
            history={progress.ratingHistory}
            currentRating={progress.rating}
          />
        </div>

        {/* Activity heatmap */}
        <div className="bg-stone-900/50 rounded-lg p-4 mb-5">
          <ActivityHeatmap dailyActivity={progress.dailyActivity} />
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-sm font-medium text-stone-400 mb-3">
            Achievements ({unlockedAchievements.length} / {ACHIEVEMENTS.length})
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {ACHIEVEMENTS.map((def) => {
              const unlocked = unlockedAchievements.some((a) => a.id === def.id);
              return (
                <div
                  key={def.id}
                  title={`${def.name}: ${def.description}${unlocked ? " ✓" : ""}`}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                    unlocked
                      ? "bg-amber-950/30 border-amber-700/50"
                      : "bg-stone-900/30 border-stone-800 opacity-40"
                  }`}
                >
                  <span className="text-xl">{def.icon}</span>
                  <span className="text-[9px] text-stone-400 text-center leading-tight truncate w-full">
                    {def.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
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

      {/* Sound */}
      <section className="bg-stone-800 rounded-xl p-6 border border-stone-700 mb-8">
        <h2 className="text-lg font-semibold text-white mb-1">Sound</h2>
        <p className="text-xs text-stone-500 mb-3">
          Play sound effects for correct/wrong moves and achievements.
        </p>
        <button
          onClick={() => updatePreferences({ soundEnabled: !prefs.soundEnabled })}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
            prefs.soundEnabled ? "bg-emerald-600" : "bg-stone-600"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
              prefs.soundEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="ml-3 text-sm text-stone-300">
          {prefs.soundEnabled ? "On" : "Off"}
        </span>
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
