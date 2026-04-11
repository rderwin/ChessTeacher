"use client";

import { useState, useCallback, useMemo } from "react";
import { getRandomQuestions, type QuizQuestion } from "@/data/glossary-quiz";
import { getGlossaryEntry } from "@/data/glossary";
import { useSound } from "@/hooks/useSound";

const QUIZ_SIZE = 10;

interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  streak: number;
  bestStreak: number;
  answered: string | null; // the slug they picked, or null if not yet answered
  finished: boolean;
}

function shuffleOptions(answer: string, distractors: string[]): string[] {
  const all = [answer, ...distractors];
  return all.sort(() => Math.random() - 0.5);
}

export default function GlossaryQuiz() {
  const { play } = useSound();
  const [state, setState] = useState<QuizState>(() => ({
    questions: getRandomQuestions(QUIZ_SIZE),
    currentIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    answered: null,
    finished: false,
  }));

  const question = state.questions[state.currentIndex];

  const options = useMemo(
    () => (question ? shuffleOptions(question.answer, question.distractors) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.currentIndex]
  );

  const handleAnswer = useCallback(
    (slug: string) => {
      if (state.answered) return;

      const correct = slug === question.answer;
      if (correct) {
        play("correct");
      } else {
        play("wrong");
      }

      setState((s) => ({
        ...s,
        answered: slug,
        score: correct ? s.score + 1 : s.score,
        streak: correct ? s.streak + 1 : 0,
        bestStreak: correct ? Math.max(s.bestStreak, s.streak + 1) : s.bestStreak,
      }));
    },
    [state.answered, question, play]
  );

  const handleNext = useCallback(() => {
    setState((s) => {
      const nextIndex = s.currentIndex + 1;
      if (nextIndex >= s.questions.length) {
        play("complete");
        return { ...s, finished: true };
      }
      return { ...s, currentIndex: nextIndex, answered: null };
    });
  }, [play]);

  const handleRestart = useCallback(() => {
    play("correct");
    setState({
      questions: getRandomQuestions(QUIZ_SIZE),
      currentIndex: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      answered: null,
      finished: false,
    });
  }, [play]);

  // Finished state
  if (state.finished) {
    const pct = Math.round((state.score / state.questions.length) * 100);
    return (
      <div className="bg-stone-800 rounded-xl border border-stone-700 p-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          {pct >= 90 ? "🏆 Perfect!" : pct >= 70 ? "🌟 Great job!" : pct >= 50 ? "👍 Not bad!" : "📚 Keep studying!"}
        </h3>
        <p className="text-lg text-stone-300 mb-1">
          {state.score} / {state.questions.length} correct ({pct}%)
        </p>
        {state.bestStreak >= 3 && (
          <p className="text-sm text-amber-400 mb-4">
            🔥 Best streak: {state.bestStreak} in a row
          </p>
        )}
        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!question) return null;

  const isCorrect = state.answered === question.answer;
  const answerEntry = state.answered ? getGlossaryEntry(question.answer) : null;

  return (
    <div className="bg-stone-800 rounded-xl border border-stone-700 p-6">
      {/* Progress + Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-stone-500">
            {state.currentIndex + 1} / {state.questions.length}
          </span>
          <span className="text-emerald-400 font-medium">
            Score: {state.score}
          </span>
          {state.streak >= 2 && (
            <span className="text-amber-400">
              🔥 {state.streak}
            </span>
          )}
        </div>
        {/* Progress bar */}
        <div className="w-24 h-1.5 bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all"
            style={{ width: `${((state.currentIndex + (state.answered ? 1 : 0)) / state.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Scenario */}
      <div className="bg-stone-900/50 rounded-lg p-4 mb-5">
        <p className="text-xs text-stone-500 font-medium mb-2 uppercase tracking-wider">
          What tactic or concept is this?
        </p>
        <p className="text-stone-200 leading-relaxed">
          {question.scenario}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {options.map((slug) => {
          const entry = getGlossaryEntry(slug);
          if (!entry) return null;

          let btnClass = "border-stone-600 text-stone-300 hover:border-stone-400 hover:bg-stone-700/50";
          if (state.answered) {
            if (slug === question.answer) {
              btnClass = "border-emerald-500 bg-emerald-950/40 text-emerald-300";
            } else if (slug === state.answered) {
              btnClass = "border-red-500 bg-red-950/40 text-red-300";
            } else {
              btnClass = "border-stone-700 text-stone-600 opacity-50";
            }
          }

          return (
            <button
              key={slug}
              onClick={() => handleAnswer(slug)}
              disabled={!!state.answered}
              className={`px-4 py-3 rounded-lg border text-left transition-all ${btnClass} ${
                state.answered ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className="font-medium">{entry.term}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {state.answered && (
        <div className={`rounded-lg p-4 mb-4 ${
          isCorrect
            ? "bg-emerald-950/30 border border-emerald-800/50"
            : "bg-red-950/30 border border-red-800/50"
        }`}>
          <p className={`font-medium mb-1 ${isCorrect ? "text-emerald-300" : "text-red-300"}`}>
            {isCorrect ? "Correct! ✓" : `Not quite — it's ${answerEntry?.term ?? question.answer}`}
          </p>
          <p className="text-sm text-stone-400">{question.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {state.answered && (
        <button
          onClick={handleNext}
          className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium"
        >
          {state.currentIndex < state.questions.length - 1 ? "Next Question →" : "See Results"}
        </button>
      )}
    </div>
  );
}
