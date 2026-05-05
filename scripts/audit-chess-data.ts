/**
 * Comprehensive audit of all chess data files.
 *   npx tsx scripts/audit-chess-data.ts
 *
 * Checks:
 *  - Openings: main line is fully legal from start position
 *  - Openings: each variant replays main line to branchesAt, then variant moves are legal
 *  - Openings: every commonMistake SAN is a LEGAL move from its position (so the validator
 *    can match it against the player's move)
 *  - Puzzles: solution sequence is fully legal from the FEN
 *  - Endgames: starting FEN is a valid position
 *  - Queen gauntlets: setup + canonical best path is fully legal
 */

import { Chess } from "chess.js";
import { ALL_OPENINGS } from "../src/data/openings";
import { ALL_PUZZLE_SETS } from "../src/data/puzzles";
import { ENDGAME_LESSONS as ENDGAMES } from "../src/data/endgames";
import { QUEEN_GAUNTLETS } from "../src/data/queen-gauntlets";

interface Issue {
  category: string;
  id: string;
  detail: string;
}

const issues: Issue[] = [];
let checks = 0;

function tryMove(chess: Chess, san: string): { ok: boolean; err?: string } {
  try {
    const r = chess.move(san);
    return { ok: !!r };
  } catch (e) {
    return { ok: false, err: e instanceof Error ? e.message : String(e) };
  }
}

// ============ OPENINGS ============
console.log("=== AUDITING OPENINGS ===\n");
for (const opening of ALL_OPENINGS) {
  // 1. Main line is fully legal
  const main = new Chess();
  for (let i = 0; i < opening.moves.length; i++) {
    checks++;
    const move = opening.moves[i];
    const r = tryMove(main, move.san);
    if (!r.ok) {
      issues.push({
        category: "opening main line",
        id: opening.id,
        detail: `move ${i} (${move.color}) "${move.san}" illegal — ${r.err}`,
      });
      break;
    }
    // Verify color matches whose turn it is BEFORE the move
    const expectedColor = i % 2 === 0 ? "white" : "black";
    if (move.color !== expectedColor) {
      issues.push({
        category: "opening main line",
        id: opening.id,
        detail: `move ${i} "${move.san}" labeled ${move.color} but it's ${expectedColor}'s turn`,
      });
    }
  }

  // 2. Common mistakes on each move must be legal at THAT POSITION
  // (BEFORE applying the move — they're alternatives the player might try)
  const replay = new Chess();
  for (let i = 0; i < opening.moves.length; i++) {
    const move = opening.moves[i];
    if (move.commonMistakes) {
      for (const mistake of move.commonMistakes) {
        checks++;
        const test = new Chess(replay.fen());
        const r = tryMove(test, mistake.san);
        if (!r.ok) {
          issues.push({
            category: "opening commonMistake",
            id: `${opening.id}#${i}`,
            detail: `mistake "${mistake.san}" on move ${i} (instead of "${move.san}") is ILLEGAL — ${r.err}. Player will never match this since chess.js rejects it.`,
          });
        }
      }
    }
    // Apply the actual move and continue
    try { replay.move(move.san); } catch { break; }
  }
  // (the above logic was already correct; replay.fen() is the position BEFORE move i)

  // 3. Variants — replay main line to branchesAt, then play variant
  if (opening.variants) {
    for (const variant of opening.variants) {
      const v = new Chess();
      let setupOk = true;
      for (let i = 0; i < variant.branchesAt; i++) {
        const m = opening.moves[i];
        if (!m) {
          issues.push({
            category: "variant",
            id: `${opening.id}:${variant.id}`,
            detail: `branchesAt=${variant.branchesAt} but main line only has ${opening.moves.length} moves`,
          });
          setupOk = false;
          break;
        }
        checks++;
        const r = tryMove(v, m.san);
        if (!r.ok) { setupOk = false; break; }
      }
      if (!setupOk) continue;

      // Play opponentMove then variant.moves
      checks++;
      const opp = tryMove(v, variant.opponentMove.san);
      if (!opp.ok) {
        issues.push({
          category: "variant",
          id: `${opening.id}:${variant.id}`,
          detail: `opponentMove "${variant.opponentMove.san}" illegal at branchesAt=${variant.branchesAt} — ${opp.err}`,
        });
        continue;
      }
      // Verify opponent move is opposite of player color
      // (For the variant, the opponentMove replaces the move at branchesAt
      // which has color depending on whose turn it is.)

      for (let i = 0; i < variant.moves.length; i++) {
        const m = variant.moves[i];
        // Test commonMistakes BEFORE applying the move (since they're
        // alternatives the player might play instead of m)
        if (m.commonMistakes) {
          for (const mistake of m.commonMistakes) {
            checks++;
            const test = new Chess(v.fen());
            const rr = tryMove(test, mistake.san);
            if (!rr.ok) {
              issues.push({
                category: "variant commonMistake",
                id: `${opening.id}:${variant.id}#${i}`,
                detail: `mistake "${mistake.san}" instead of "${m.san}" — ILLEGAL: ${rr.err}`,
              });
            }
          }
        }
        checks++;
        const r = tryMove(v, m.san);
        if (!r.ok) {
          issues.push({
            category: "variant",
            id: `${opening.id}:${variant.id}`,
            detail: `move ${i} "${m.san}" illegal — ${r.err}`,
          });
          break;
        }
      }
    }
  }
}

// ============ PUZZLES ============
console.log("=== AUDITING PUZZLES ===\n");
for (const set of ALL_PUZZLE_SETS) {
  for (const puzzle of set.puzzles) {
    let chess: Chess;
    try {
      chess = new Chess(puzzle.fen);
    } catch (e) {
      issues.push({
        category: "puzzle FEN",
        id: `${set.id}/${puzzle.id}`,
        detail: `invalid FEN: ${e instanceof Error ? e.message : e}`,
      });
      continue;
    }
    for (let i = 0; i < puzzle.solution.length; i++) {
      checks++;
      const r = tryMove(chess, puzzle.solution[i]);
      if (!r.ok) {
        issues.push({
          category: "puzzle solution",
          id: `${set.id}/${puzzle.id}`,
          detail: `move ${i} "${puzzle.solution[i]}" illegal — ${r.err}. FEN at fault: ${chess.fen()}`,
        });
        break;
      }
    }
  }
}

// ============ ENDGAMES ============
console.log("=== AUDITING ENDGAMES ===\n");
for (const e of ENDGAMES) {
  checks++;
  try {
    new Chess(e.fen);
  } catch (err) {
    issues.push({
      category: "endgame FEN",
      id: e.id,
      detail: `invalid FEN: ${err instanceof Error ? err.message : err}`,
    });
  }
}

// ============ QUEEN GAUNTLETS ============
console.log("=== AUDITING QUEEN GAUNTLETS ===\n");
for (const g of QUEEN_GAUNTLETS) {
  const chess = new Chess();
  let bad = false;
  for (const m of g.setupMoves) {
    checks++;
    const r = tryMove(chess, m);
    if (!r.ok) {
      issues.push({ category: "gauntlet setup", id: g.id, detail: `"${m}" illegal — ${r.err}` });
      bad = true; break;
    }
  }
  if (bad) continue;

  for (let i = 0; i < g.turns.length; i++) {
    const t = g.turns[i];
    const fen = chess.fen();
    const isLast = t.botResponse === null;
    const hasBest = t.responses.some(r => r.quality === "best");
    if (!isLast && !hasBest) {
      issues.push({
        category: "gauntlet structure",
        id: g.id,
        detail: `turn ${i + 1} has no 'best' response — gauntlet can't advance`,
      });
    }
    // Verify each response is legal at this position
    for (const r of t.responses) {
      checks++;
      const test = new Chess(fen);
      const result = tryMove(test, r.san);
      if (!result.ok) {
        issues.push({
          category: "gauntlet response",
          id: g.id,
          detail: `turn ${i + 1}: response "${r.san}" illegal — ${result.err}`,
        });
      }
    }
    // Apply best (canonical path)
    const best = t.responses.find(r => r.quality === "best");
    if (best) {
      try { chess.move(best.san); }
      catch (e) {
        issues.push({ category: "gauntlet path", id: g.id, detail: `can't apply best ${best.san}: ${e instanceof Error ? e.message : e}` });
        break;
      }
    } else if (!isLast) break;
    if (t.botResponse) {
      checks++;
      const r = tryMove(chess, t.botResponse);
      if (!r.ok) {
        issues.push({ category: "gauntlet bot", id: g.id, detail: `turn ${i+1} bot "${t.botResponse}" illegal — ${r.err}` });
        break;
      }
    }
  }
}

// ============ REPORT ============
console.log(`\n=== AUDIT REPORT ===`);
console.log(`Performed ${checks} checks.\n`);
if (issues.length === 0) {
  console.log("✅ ALL CLEAR — no issues found");
} else {
  console.log(`❌ Found ${issues.length} issue(s):\n`);
  const byCategory = new Map<string, Issue[]>();
  for (const issue of issues) {
    if (!byCategory.has(issue.category)) byCategory.set(issue.category, []);
    byCategory.get(issue.category)!.push(issue);
  }
  for (const [cat, list] of byCategory) {
    console.log(`--- ${cat} (${list.length}) ---`);
    for (const issue of list) {
      console.log(`  [${issue.id}] ${issue.detail}`);
    }
    console.log();
  }
  process.exit(1);
}
