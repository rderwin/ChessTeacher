"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
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

        <div className="flex items-center gap-6">
          <Link
            href="/openings"
            className="text-sm text-stone-400 hover:text-white transition-colors"
          >
            Openings
          </Link>
          <Link
            href="/endgames"
            className="text-sm text-stone-400 hover:text-white transition-colors"
          >
            Endgames
          </Link>
          <Link
            href="/draws"
            className="text-sm text-stone-400 hover:text-white transition-colors"
          >
            Draws
          </Link>
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
                    <span className="text-sm text-stone-300 hidden sm:inline">
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
      </div>
    </nav>
  );
}
