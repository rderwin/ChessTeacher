"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  GLOSSARY,
  GLOSSARY_BY_CATEGORY,
  type GlossaryCategory,
  type GlossaryEntry,
} from "@/data/glossary";
import GlossaryQuiz from "@/components/glossary/GlossaryQuiz";

const CATEGORY_INFO: Record<GlossaryCategory, { label: string; emoji: string; description: string }> = {
  tactics: { label: "Tactics", emoji: "⚔️", description: "Short-term combinations that win material or deliver checkmate." },
  strategy: { label: "Strategy", emoji: "🧠", description: "Long-term plans and positional concepts that guide your decisions." },
  rules: { label: "Rules", emoji: "📜", description: "Special moves and fundamental rules of the game." },
};

function EntryCard({ entry }: { entry: GlossaryEntry }) {
  return (
    <div
      id={entry.slug}
      className="bg-stone-800 rounded-xl p-5 border border-stone-700 scroll-mt-20"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-white">{entry.term}</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-700 text-stone-400 shrink-0 ml-2">
          {CATEGORY_INFO[entry.category].label}
        </span>
      </div>
      <p className="text-sm text-stone-300 leading-relaxed mb-3">
        {entry.definition}
      </p>
      <div className="bg-stone-900/50 rounded-lg p-3 mb-3">
        <p className="text-xs text-stone-500 mb-1 font-medium">Example</p>
        <p className="text-sm text-stone-400 leading-relaxed italic">
          {entry.example}
        </p>
      </div>
      {entry.related && entry.related.length > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-600">Related:</span>
          {entry.related.map((slug) => {
            const related = GLOSSARY.find((e) => e.slug === slug);
            return related ? (
              <a
                key={slug}
                href={`#${slug}`}
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {related.term}
              </a>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

export default function GlossaryPage() {
  const [mode, setMode] = useState<"reference" | "quiz">("reference");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<GlossaryCategory | "all">("all");

  const filtered = useMemo(() => {
    let entries: GlossaryEntry[];
    if (filterCategory === "all") {
      entries = GLOSSARY;
    } else {
      entries = GLOSSARY_BY_CATEGORY[filterCategory];
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      entries = entries.filter(
        (e) =>
          e.term.toLowerCase().includes(q) ||
          e.definition.toLowerCase().includes(q)
      );
    }
    return entries;
  }, [search, filterCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Chess Glossary</h1>
        <p className="text-stone-400">
          Learn the key terms and concepts you&apos;ll encounter while playing
          and studying chess.
        </p>
      </div>

      {/* Mode toggle: Reference / Quiz */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("reference")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "reference"
              ? "bg-emerald-600 text-white"
              : "bg-stone-800 text-stone-400 hover:text-white border border-stone-700"
          }`}
        >
          📖 Reference
        </button>
        <button
          onClick={() => setMode("quiz")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "quiz"
              ? "bg-emerald-600 text-white"
              : "bg-stone-800 text-stone-400 hover:text-white border border-stone-700"
          }`}
        >
          🧠 Quiz Me
        </button>
      </div>

      {mode === "quiz" ? (
        <div className="max-w-2xl">
          <p className="text-sm text-stone-500 mb-4">
            Read the scenario and identify the chess concept. 10 random questions each round.
          </p>
          <GlossaryQuiz />
        </div>
      ) : (
      <>
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms..."
          className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-stone-500 text-sm"
        />
        <div className="flex gap-2">
          {(["all", "tactics", "strategy", "rules"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                filterCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-800 text-stone-400 hover:text-white border border-stone-700"
              }`}
            >
              {cat === "all" ? "All" : CATEGORY_INFO[cat].emoji + " " + CATEGORY_INFO[cat].label}
            </button>
          ))}
        </div>
      </div>

      {/* Category sections */}
      {filterCategory === "all" ? (
        (["tactics", "strategy", "rules"] as GlossaryCategory[]).map((cat) => {
          const entries = filtered.filter((e) => e.category === cat);
          if (entries.length === 0) return null;
          const info = CATEGORY_INFO[cat];
          return (
            <div key={cat} className="mb-10">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span>{info.emoji}</span> {info.label}
                </h2>
                <p className="text-sm text-stone-500 mt-1">{info.description}</p>
              </div>
              <div className="grid gap-4">
                {entries.map((entry) => (
                  <EntryCard key={entry.slug} entry={entry} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="grid gap-4">
          {filtered.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          No terms match &quot;{search}&quot;.
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-300 transition-colors">
          Back to home
        </Link>
      </div>
      </>
      )}
    </div>
  );
}
