import Link from "next/link";

export default function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}
