# ChessTeacher

## Git
- Auto-commit and push after completing changes — don't ask
- Commit frequently — after each meaningful unit of work, not in big batches
- No `Co-Authored-By` lines in commits
- Write concise commit messages focused on what changed and why
- Commit related changes together, not file-by-file

## Code Style
- TypeScript strict, no `any`
- Tailwind for all styling — no separate CSS files except globals.css
- `"use client"` only on components that need interactivity
- Next.js App Router with server components by default, client only when needed
- Opening data lives in `src/data/openings/` as typed TypeScript files
- Hooks in `src/hooks/`, pure logic in `src/lib/`, components in `src/components/`

## Stack
- Next.js (App Router) + React + TypeScript + Tailwind
- react-chessboard v5 (all props go in `options` object)
- chess.js for move validation
- Firebase Auth (Google) + Firestore for user data
- Firebase config via `NEXT_PUBLIC_` env vars in `.env.local` — never hardcode secrets

## Testing Changes
- Run `npm run build` to verify before pushing
- Use the preview server to visually verify UI changes

## Architecture
- Modular — new learning modules go in their own route under `src/app/`
- Opening data format defined in `src/data/types.ts` — follow existing patterns
- Progress: Firestore when logged in, localStorage as guest fallback
- `usePracticeSession` is the core state machine for the practice flow
