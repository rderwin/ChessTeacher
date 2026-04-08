"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

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

          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
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
                  <button
                    onClick={signOut}
                    className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
                  >
                    Sign out
                  </button>
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
