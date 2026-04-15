# ChessTeacher

A hands-on chess learning app. Play the moves yourself and understand *why* each one matters.

## Features

### Play Online (Multiplayer)
Real-time chess against a friend. Create a game, share the link, and whoever opens it plays Black. Built on Firestore realtime listeners — no separate server needed. Includes:
- Shareable invite links with copy-to-clipboard
- Live board sync across both players
- Move sounds, turn indicators, victory confetti
- Resign, draw offers, accept/decline
- Rematch button and "recent games" list on the lobby
- Auto game-end detection (checkmate, stalemate, threefold, insufficient material, 50-move)

Requires Firestore rules to be deployed — see [Firestore setup](#firestore-setup) below.

### Coach Mode
Play against bots at 8 difficulty levels (~400 to full Stockfish) with a dog coach that watches every move. Different breeds per level — from a tiny puppy for beginners to a crowned wolf for experts. The coach gives specific, actionable feedback based on your level:

- **Beginners (~400-800)**: "Your rook on a1 is hanging!" / "Their bishop was free — grab it!" / "Don't forget to castle!"
- **Intermediate (~1300-1600)**: Fork/pin detection, missed tactic display with the actual best move, pawn structure warnings
- **Advanced (~1900+)**: Full centipawn analysis

Includes progressive hints (vague → specific → exact move → play it for me), undo, and a game summary with accuracy stats after each game.

### Tactical Puzzles
9 themed puzzle sets (~91 puzzles) across beginner to advanced:
- Mate in 1, 2, 3
- Knight Forks, Pins & Skewers, Discovered Attacks
- Back Rank Mates, Queen Sacrifices, Trapped Pieces

Full progression system: XP, levels, puzzle rating (Elo), 25 achievements, daily streaks, sound effects. Daily puzzle on the home page.

### Opening Repertoire
15 openings with interactive practice — play the moves on the board and learn why each one matters:

| White | Black |
|-------|-------|
| Italian Game | Caro-Kann Defense |
| Scotch Game | Sicilian Najdorf |
| London System | French Defense |
| English Opening | Slav Defense |
| Ruy Lopez | Dutch Defense |
| Queen's Gambit | Pirc Defense |
| Catalan | King's Indian |
| | Nimzo-Indian |

Each opening has 2 variants (e.g., Two Knights Defense, Evans Gambit for the Italian) that unlock after completing the main line. Blue move guide highlights show which piece to move and where.

### Endgame Practice
Interactive practice against Stockfish for essential checkmate patterns:
- King + Queen vs King
- King + Rook vs King (box method)
- King + 2 Rooks vs King (ladder mate)
- King + Pawn vs King (opposition)

### Game Analyzer
Paste a PGN to replay any game with Stockfish 18 analysis, move-by-move classification (brilliant/best/excellent/good/inaccuracy/mistake/blunder), eval bar, and move explanations. Chess.com username integration for auto board orientation.

### Chess Glossary
26 terms across tactics, strategy, and rules — searchable with a scenario-based quiz mode ("Here's a situation — what is this called?").

### For Beginners
- Guided 3-step pathway on the home page for new users
- Concept tooltips on puzzle theme tags
- "What's next?" suggestions after completing openings/puzzles
- Progress dashboard on account page with XP bar, achievements, streaks

## Tech Stack

- **Next.js 16** (App Router) + React 19 + TypeScript (strict)
- **Tailwind CSS** for styling
- **react-chessboard v5** for board UI
- **chess.js** for move validation and position analysis
- **Stockfish 18 WASM** via Web Worker for bot play + evaluation
- **Firebase Auth** (Google) + **Firestore** for user data
- **Web Audio API** for synthesized sound effects
- localStorage fallback for guest progress

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires Firebase config in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Firestore setup

Security rules for user progress and multiplayer games live in `firestore.rules`.
Deploy them once with the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase use --add  # link this directory to your Firebase project
firebase deploy --only firestore:rules
```

The rules allow signed-in users to read any game, create a game as the white player, and update games they participate in (or join a waiting game as black). No game deletion is allowed — games are permanent.
