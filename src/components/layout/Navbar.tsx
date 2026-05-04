"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePuzzleProgress } from "@/hooks/usePuzzleProgress";

const NAV_LINKS = [
  { href: "/openings", label: "Openings" },
  { href: "/puzzles", label: "Puzzles" },
  { href: "/drills", label: "Drills" },
  { href: "/trainer", label: "Play vs Bot" },
  { href: "/play", label: "Play Online" },
  { href: "/analyze", label: "Analyze" },
];

export default function Navbar() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const { progress } = usePuzzleProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  return (
    <nav className="border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">ChessTeacher</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-stone-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {(progress.level > 1 || progress.totalSolved > 0) && (
            <Link
              href="/account"
              className="group flex items-center gap-1.5 text-xs px-2.5 py-1 bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-stone-600 rounded-full transition-colors"
              title={`Puzzle Rating: ${progress.rating} · Level ${progress.level} · ${progress.xp} XP`}
            >
              <span className="font-bold text-amber-400">
                Lv.{progress.level}
              </span>
              <span className="text-stone-500">·</span>
              <span className="font-semibold text-emerald-400">
                {progress.rating}
              </span>
              {progress.currentStreak >= 3 && (
                <>
                  <span className="text-stone-500">·</span>
                  <span
                    className="font-medium text-orange-400"
                    title={`${progress.currentStreak} puzzle streak`}
                  >
                    🔥{progress.currentStreak}
                  </span>
                </>
              )}
            </Link>
          )}
          {!loading && (
            <>
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="w-7 h-7 rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <span className="text-sm text-stone-300">
                      {user.displayName?.split(" ")[0]}
                    </span>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-stone-800 border border-stone-700 rounded-lg shadow-xl overflow-hidden">
                      <Link
                        href="/account"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-stone-200 hover:bg-stone-700 transition-colors"
                      >
                        Account
                      </Link>
                      <button
                        onClick={() => { setMenuOpen(false); signOut(); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-stone-400 hover:bg-stone-700 hover:text-stone-200 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="text-sm px-3 py-1.5 bg-stone-700 text-stone-200 rounded-lg hover:bg-stone-600 transition-colors"
                >
                  Sign in
                </button>
              )}
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          {!loading && user && user.photoURL && (
            <Link href="/account">
              <img
                src={user.photoURL}
                alt=""
                className="w-7 h-7 rounded-full"
                referrerPolicy="no-referrer"
              />
            </Link>
          )}
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            className="text-stone-400 hover:text-white transition-colors p-1"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileNavOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-900">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="block px-3 py-2.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-stone-800 my-2" />
            {!loading && (
              user ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMobileNavOpen(false)}
                    className="block px-3 py-2.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    Account
                  </Link>
                  <button
                    onClick={() => { setMobileNavOpen(false); signOut(); }}
                    className="w-full text-left px-3 py-2.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setMobileNavOpen(false); signInWithGoogle(); }}
                  className="w-full text-left px-3 py-2.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                >
                  Sign in with Google
                </button>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
