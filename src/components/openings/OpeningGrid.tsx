"use client";

import { useMemo, useState } from "react";
import { OpeningLine } from "@/data/types";
import OpeningCard from "./OpeningCard";

interface OpeningGridProps {
  openings: OpeningLine[];
}

const LEVELS = [
  {
    key: "beginner" as const,
    label: "Beginner",
    emoji: "🟢",
    description:
      "Great starting points — learn fundamental opening principles.",
  },
  {
    key: "intermediate" as const,
    label: "Intermediate",
    emoji: "🟡",
    description:
      "More complex ideas — build on the basics with deeper strategy.",
  },
  {
    key: "advanced" as const,
    label: "Advanced",
    emoji: "🔴",
    description:
      "Sophisticated systems — for players ready for dynamic, challenging play.",
  },
];

type ColorFilter = "all" | "white" | "black";
type LevelFilter = "all" | "beginner" | "intermediate" | "advanced";

export default function OpeningGrid({ openings }: OpeningGridProps) {
  const [query, setQuery] = useState("");
  const [colorFilter, setColorFilter] = useState<ColorFilter>("all");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");

  const filteredOpenings = useMemo(() => {
    const q = query.trim().toLowerCase();
    return openings.filter((o) => {
      if (colorFilter !== "all" && o.playerColor !== colorFilter) return false;
      if (levelFilter !== "all" && o.level !== levelFilter) return false;
      if (!q) return true;
      return (
        o.name.toLowerCase().includes(q) ||
        o.fullName.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.eco.toLowerCase().includes(q)
      );
    });
  }, [openings, query, colorFilter, levelFilter]);

  const totalFiltered = filteredOpenings.length;
  const anyFilters =
    query.length > 0 || colorFilter !== "all" || levelFilter !== "all";

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search openings by name, ECO code, or description..."
            className="w-full bg-stone-800 border border-stone-700 focus:border-emerald-600 focus:outline-none rounded-xl px-4 py-3 pl-10 text-sm text-stone-100 placeholder:text-stone-500 transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-200 transition-colors text-sm"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterPill
            active={colorFilter === "all"}
            onClick={() => setColorFilter("all")}
            label="All colors"
          />
          <FilterPill
            active={colorFilter === "white"}
            onClick={() => setColorFilter("white")}
            label="♔ White"
          />
          <FilterPill
            active={colorFilter === "black"}
            onClick={() => setColorFilter("black")}
            label="♚ Black"
          />
          <div className="w-px bg-stone-700 mx-1" />
          <FilterPill
            active={levelFilter === "all"}
            onClick={() => setLevelFilter("all")}
            label="All levels"
          />
          <FilterPill
            active={levelFilter === "beginner"}
            onClick={() => setLevelFilter("beginner")}
            label="🟢 Beginner"
          />
          <FilterPill
            active={levelFilter === "intermediate"}
            onClick={() => setLevelFilter("intermediate")}
            label="🟡 Intermediate"
          />
          <FilterPill
            active={levelFilter === "advanced"}
            onClick={() => setLevelFilter("advanced")}
            label="🔴 Advanced"
          />
        </div>

        {anyFilters && (
          <p className="text-xs text-stone-500">
            Showing {totalFiltered} of {openings.length} openings
            {totalFiltered === 0 && (
              <>
                {" "}·{" "}
                <button
                  onClick={() => {
                    setQuery("");
                    setColorFilter("all");
                    setLevelFilter("all");
                  }}
                  className="text-emerald-400 hover:underline"
                >
                  clear filters
                </button>
              </>
            )}
          </p>
        )}
      </div>

      {/* Results */}
      {totalFiltered === 0 ? (
        <div className="bg-stone-800/50 border border-stone-700/50 rounded-xl p-8 text-center">
          <p className="text-stone-400 mb-2">
            No openings match your search.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setColorFilter("all");
              setLevelFilter("all");
            }}
            className="text-sm text-emerald-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : anyFilters ? (
        // Flat list when filtering — group headers don't make sense
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredOpenings.map((o) => (
              <OpeningCard key={o.id} opening={o} />
            ))}
          </div>
        </div>
      ) : (
        // Full grouped view when no filters active
        <div className="space-y-10">
          {LEVELS.map((level) => {
            const levelOpenings = filteredOpenings.filter(
              (o) => o.level === level.key,
            );
            if (levelOpenings.length === 0) return null;

            const white = levelOpenings.filter(
              (o) => o.playerColor === "white",
            );
            const black = levelOpenings.filter(
              (o) => o.playerColor === "black",
            );

            return (
              <div key={level.key}>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span>{level.emoji}</span> {level.label}
                  </h2>
                  <p className="text-sm text-stone-500 mt-1">
                    {level.description}
                  </p>
                </div>

                {white.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-stone-400 mb-2 flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-white border-2 border-stone-400" />
                      White
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {white.map((o) => (
                        <OpeningCard key={o.id} opening={o} />
                      ))}
                    </div>
                  </div>
                )}

                {black.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-stone-400 mb-2 flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-stone-900 border-2 border-stone-500" />
                      Black
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {black.map((o) => (
                        <OpeningCard key={o.id} opening={o} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
        active
          ? "bg-emerald-900/40 border-emerald-600/60 text-emerald-200"
          : "bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-600"
      }`}
    >
      {label}
    </button>
  );
}
