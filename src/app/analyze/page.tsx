"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useAuth } from "@/contexts/AuthContext";
import { parsePgn } from "@/lib/pgn";
import type { ParsedGame } from "@/lib/pgn";
import { saveGame, getSavedGames } from "@/lib/saved-games";
import type { SavedGame } from "@/lib/saved-games";
import EvalBar from "@/components/analysis/EvalBar";
import EnginePanel from "@/components/analysis/EnginePanel";
import { useGameAnalysis, type GameAnalysis } from "@/hooks/useGameAnalysis";
import {
  MOVE_CLASS_COLORS,
  MOVE_CLASS_BG,
  MOVE_CLASS_SYMBOLS,
  type MoveClass,
} from "@/lib/classify-moves";
import MoveExplanationPanel from "@/components/analysis/MoveExplanation";

const SAMPLE_PGN = `[Event "Example Game"]
[White "Player 1"]
[Black "Player 2"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 1-0`;

const HIGHLIGHT_FROM: React.CSSProperties = { backgroundColor: "rgba(255, 255, 0, 0.4)" };
const HIGHLIGHT_TO: React.CSSProperties = { backgroundColor: "rgba(255, 255, 0, 0.4)" };
const BEST_FROM: React.CSSProperties = { backgroundColor: "rgba(16, 185, 129, 0.45)" };
const BEST_TO: React.CSSProperties = { backgroundColor: "rgba(16, 185, 129, 0.45)" };

const BADGE_STYLES: Record<MoveClass, { bg: string; text: string; symbol: string } | null> = {
  brilliant: { bg: "bg-cyan-500", text: "text-white", symbol: "!!" },
  best:      { bg: "bg-emerald-500", text: "text-white", symbol: "★" },
  excellent: { bg: "bg-emerald-600", text: "text-white", symbol: "!" },
  good:      null, // no badge for good moves
  inaccuracy:{ bg: "bg-yellow-500", text: "text-black", symbol: "?!" },
  mistake:   { bg: "bg-orange-500", text: "text-white", symbol: "?" },
  blunder:   { bg: "bg-red-600", text: "text-white", symbol: "??" },
  book:      null,
};

export default function AnalyzePage() {
  const { prefs, boardTheme, pieceStyle } = usePreferences();
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
  const [currentEval, setCurrentEval] = useState<{ evaluation: number; mate: number | null }>({
    evaluation: 0,
    mate: null,
  });
  const { analysis, analyzeGame, reset: resetAnalysis } = useGameAnalysis();
  // 0 = showing played move, 1 = transitioning via fenBefore, 2 = showing best move
  const [bestViewStep, setBestViewStep] = useState<0 | 1 | 2>(0);
  const bestTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showingBest = bestViewStep === 2;

  const handleShowBest = useCallback(() => {
    if (bestTimerRef.current) clearTimeout(bestTimerRef.current);
    setBestViewStep(1); // animate undo of played move
    bestTimerRef.current = setTimeout(() => {
      setBestViewStep(2); // then animate best move
    }, 300);
  }, []);

  const handleHideBest = useCallback(() => {
    if (bestTimerRef.current) clearTimeout(bestTimerRef.current);
    setBestViewStep(1); // animate undo of best move
    bestTimerRef.current = setTimeout(() => {
      setBestViewStep(0); // then animate played move back
    }, 300);
  }, []);

  const resetBestView = () => {
    if (bestTimerRef.current) clearTimeout(bestTimerRef.current);
    setBestViewStep(0);
  };

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
    resetAnalysis();
    try {
      const parsed = parsePgn(pgn);
      if (parsed.moves.length === 0) {
        setError("No moves found in PGN.");
        return;
      }
      setGame(parsed);
      setActivePgn(pgn);
      setMoveIndex(-1);
      // Auto-orient board: if we know the user's chess.com username, put their color on bottom
      const username = prefs.chessComUsername.toLowerCase();
      if (username && parsed.headers["Black"]?.toLowerCase().includes(username)) {
        setOrientation("black");
      } else if (username && parsed.headers["White"]?.toLowerCase().includes(username)) {
        setOrientation("white");
      } else {
        setOrientation("white");
      }
      // Auto-start full game analysis
      analyzeGame(parsed);
    } catch {
      setError("Invalid PGN. Check the format and try again.");
    }
  }, [resetAnalysis, analyzeGame, prefs.chessComUsername]);

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
      if (bestTimerRef.current) clearTimeout(bestTimerRef.current);
      setBestViewStep(0);
      setMoveIndex(Math.max(-1, Math.min(index, game.moves.length - 1)));
    },
    [game]
  );

  // Keyboard navigation
  const resetBestRef = useRef(resetBestView);
  resetBestRef.current = resetBestView;
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!game) return;
      if (e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        resetBestRef.current();
        setMoveIndex((i) => Math.max(-1, i - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        resetBestRef.current();
        setMoveIndex((i) =>
          game ? Math.min(game.moves.length - 1, i + 1) : i
        );
      } else if (e.key === "Home") {
        e.preventDefault();
        resetBestRef.current();
        setMoveIndex(-1);
      } else if (e.key === "End") {
        e.preventDefault();
        resetBestRef.current();
        setMoveIndex(game ? game.moves.length - 1 : -1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [game]);

  // Derive turn from FEN (active color field)
  const currentTurn: "w" | "b" =
    currentFen !== "start" && currentFen.split(" ")[1] === "b" ? "b" : "w";

  // Compute best-move FEN + squares when showing best
  const bestMoveUci = analysis.complete && moveIndex >= 0 && analysis.moves[moveIndex]
    ? analysis.moves[moveIndex].bestMoveUci
    : "";

  const fenBefore = game
    ? moveIndex === 0
      ? game.startFen
      : moveIndex > 0
      ? game.moves[moveIndex - 1].fen
      : game.startFen
    : "";

  // Compute the best move result FEN (always available when we have data)
  const bestMoveData = useMemo(() => {
    if (!fenBefore || !bestMoveUci || bestMoveUci.length < 4) return null;
    try {
      const chess = new Chess(fenBefore);
      const from = bestMoveUci.slice(0, 2);
      const to = bestMoveUci.slice(2, 4);
      const promotion = bestMoveUci.length > 4 ? bestMoveUci[4] : undefined;
      chess.move({ from, to, promotion } as Parameters<typeof chess.move>[0]);
      return { fen: chess.fen(), from, to };
    } catch {
      return null;
    }
  }, [fenBefore, bestMoveUci]);

  // Three-step board display:
  // step 0 → played move (currentFen)
  // step 1 → intermediate (fenBefore) — the position before the move
  // step 2 → best move played on fenBefore
  const displayFen =
    bestViewStep === 2 && bestMoveData
      ? bestMoveData.fen
      : bestViewStep === 1 && fenBefore
      ? fenBefore
      : currentFen;

  const squareStyles: Record<string, React.CSSProperties> = {};
  if (bestViewStep === 2 && bestMoveData) {
    squareStyles[bestMoveData.from] = BEST_FROM;
    squareStyles[bestMoveData.to] = BEST_TO;
  } else if (bestViewStep === 0 && currentMove) {
    squareStyles[currentMove.from] = HIGHLIGHT_FROM;
    squareStyles[currentMove.to] = HIGHLIGHT_TO;
  }
  // step 1 = no highlights (brief transition)

  // Badge overlay for move classification
  const badge = analysis.complete && moveIndex >= 0 && currentMove
    ? analysis.moves[moveIndex]
    : null;
  const badgeClass = badge ? badge.classification : null;

  // Eval bar: use pre-computed analysis evals (instant) when available
  const barEval = useMemo(() => {
    // Showing best move → show what the eval would have been
    if (bestViewStep === 2 && badge) {
      return { evaluation: badge.evalBefore, mate: badge.mateBefore };
    }
    // Analysis complete → use stored evals for instant navigation
    if (analysis.complete && analysis.moves.length > 0) {
      if (moveIndex >= 0 && analysis.moves[moveIndex]) {
        return { evaluation: analysis.moves[moveIndex].evalAfter, mate: analysis.moves[moveIndex].mateAfter };
      }
      // Starting position: use eval before first move
      if (moveIndex === -1 && analysis.moves[0]) {
        return { evaluation: analysis.moves[0].evalBefore, mate: analysis.moves[0].mateBefore };
      }
    }
    // Fallback to live engine
    return currentEval;
  }, [bestViewStep, badge, analysis.complete, analysis.moves, moveIndex, currentEval]);
  // Compute badge position as grid coords (0-7) from the destination square
  const badgeSquare = currentMove?.to;
  let badgeCol = 0;
  let badgeRow = 0;
  if (badgeSquare) {
    const file = badgeSquare.charCodeAt(0) - 97; // a=0, h=7
    const rank = parseInt(badgeSquare[1]) - 1;    // 1=0, 8=7
    if (orientation === "white") {
      badgeCol = file;
      badgeRow = 7 - rank;
    } else {
      badgeCol = 7 - file;
      badgeRow = rank;
    }
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
          {/* Board + Eval Bar */}
          <div className="shrink-0">
            <div className="flex gap-2 items-stretch max-w-[520px]">
              <EvalBar
                evaluation={barEval.evaluation}
                mate={barEval.mate}
                orientation={orientation}
              />
              <div
                className="flex-1 aspect-square relative"
                style={
                  pieceFilter
                    ? ({ filter: pieceFilter } as React.CSSProperties)
                    : undefined
                }
              >
                <Chessboard
                  options={{
                    position: displayFen,
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
                {/* Move classification badge overlay */}
                {bestViewStep === 0 && badgeClass && BADGE_STYLES[badgeClass] && (
                  <div
                    className="absolute pointer-events-none z-10"
                    style={{
                      left: `${(badgeCol / 8) * 100 + 1.5}%`,
                      top: `${(badgeRow / 8) * 100 + 1}%`,
                    }}
                  >
                    <div
                      className={`${BADGE_STYLES[badgeClass]!.bg} ${BADGE_STYLES[badgeClass]!.text} rounded-full w-6 h-6 flex items-center justify-center text-xs font-black shadow-lg border-2 border-stone-900/50`}
                    >
                      {BADGE_STYLES[badgeClass]!.symbol}
                    </div>
                  </div>
                )}
              </div>
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

            {/* Move explanation — below board */}
            {analysis.complete && moveIndex >= 0 && analysis.moves[moveIndex] && game && (
              <div className="mt-3">
                <MoveExplanationPanel
                  fenBefore={fenBefore}
                  playedSan={game.moves[moveIndex].san}
                  classification={analysis.moves[moveIndex]}
                  moveColor={game.moves[moveIndex].color}
                  showingBest={showingBest}
                  onShowBest={handleShowBest}
                  onHideBest={handleHideBest}
                />
              </div>
            )}
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
                    {prefs.chessComUsername && game.headers["White"]?.toLowerCase().includes(prefs.chessComUsername.toLowerCase()) && (
                      <span className="text-emerald-400 text-xs ml-1">(you)</span>
                    )}
                    <span className="text-stone-500 mx-2">vs</span>
                    <span className="text-white font-medium">
                      {game.headers["Black"] ?? "Black"}
                    </span>
                    {prefs.chessComUsername && game.headers["Black"]?.toLowerCase().includes(prefs.chessComUsername.toLowerCase()) && (
                      <span className="text-emerald-400 text-xs ml-1">(you)</span>
                    )}
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

            {/* Analysis progress */}
            {analysis.analyzing && (
              <div className="bg-stone-800 rounded-xl border border-stone-700 p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-stone-300">
                    Analyzing game...
                  </span>
                  <span className="text-xs text-stone-500">
                    {analysis.progress}/{analysis.total}
                  </span>
                </div>
                <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{
                      width: `${
                        analysis.total
                          ? (analysis.progress / analysis.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Summary panel — shown when analysis is complete */}
            {analysis.complete && <AnalysisSummary analysis={analysis} />}

            {/* Move list */}
            <div className="bg-stone-800 rounded-xl border border-stone-700 p-4 mb-4">
              <h3 className="text-sm font-medium text-stone-400 mb-3">
                Moves
              </h3>
              <div className="flex flex-wrap gap-x-1 gap-y-1">
                {game.moves.map((move, i) => {
                  const mc = analysis.complete ? analysis.moves[i] : null;
                  const sym = mc ? MOVE_CLASS_SYMBOLS[mc.classification] : "";
                  const colorCls = mc
                    ? MOVE_CLASS_COLORS[mc.classification]
                    : "";
                  const bgCls = mc ? MOVE_CLASS_BG[mc.classification] : "";

                  return (
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
                            : mc
                            ? `${colorCls} ${bgCls} hover:brightness-125`
                            : "text-stone-300 hover:bg-stone-700"
                        }`}
                      >
                        {move.san}
                        {sym && (
                          <span className="text-[10px] ml-0.5">{sym}</span>
                        )}
                      </button>
                    </span>
                  );
                })}
                <span className="text-xs text-stone-500 self-center ml-1">
                  {game.result}
                </span>
              </div>
            </div>

            {/* Engine analysis — disabled while full-game analysis runs */}
            {!analysis.analyzing && (
              <EnginePanel
                fen={currentFen}
                turn={currentTurn}
                onEval={(evaluation, mate) => setCurrentEval({ evaluation, mate })}
              />
            )}
            {analysis.analyzing && (
              <div className="bg-stone-800 rounded-xl border border-stone-700 p-4 min-h-[100px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-sm text-stone-400">
                    Engine busy analyzing full game...
                  </span>
                </div>
              </div>
            )}

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
                  resetAnalysis();
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

// --- Summary component ---

const SUMMARY_ROWS: { key: MoveClass; label: string; dot: string }[] = [
  { key: "brilliant", label: "Brilliant", dot: "bg-cyan-400" },
  { key: "best", label: "Best", dot: "bg-emerald-400" },
  { key: "excellent", label: "Excellent", dot: "bg-emerald-500" },
  { key: "good", label: "Good", dot: "bg-emerald-700" },
  { key: "inaccuracy", label: "Inaccuracy", dot: "bg-yellow-400" },
  { key: "mistake", label: "Mistake", dot: "bg-orange-400" },
  { key: "blunder", label: "Blunder", dot: "bg-red-500" },
];

function AnalysisSummary({ analysis }: { analysis: GameAnalysis }) {
  // Split by color
  const white: Record<MoveClass, number> = { brilliant: 0, best: 0, excellent: 0, good: 0, inaccuracy: 0, mistake: 0, blunder: 0, book: 0 };
  const black: Record<MoveClass, number> = { brilliant: 0, best: 0, excellent: 0, good: 0, inaccuracy: 0, mistake: 0, blunder: 0, book: 0 };

  analysis.moves.forEach((m, i) => {
    const bucket = i % 2 === 0 ? white : black;
    bucket[m.classification]++;
  });

  return (
    <div className="bg-stone-800 rounded-xl border border-stone-700 p-4 mb-4">
      <h3 className="text-sm font-medium text-stone-400 mb-3">
        Game Summary
      </h3>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-1.5 text-xs">
        <span />
        <span className="text-stone-400 font-medium text-center">White</span>
        <span className="text-stone-400 font-medium text-center">Black</span>
        {SUMMARY_ROWS.map((row) => (
          <div key={row.key} className="contents">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${row.dot}`} />
              <span className="text-stone-300">{row.label}</span>
            </div>
            <span className="text-stone-200 text-center font-mono">
              {white[row.key] || "—"}
            </span>
            <span className="text-stone-200 text-center font-mono">
              {black[row.key] || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
