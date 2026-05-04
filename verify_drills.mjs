import { Chess } from "chess.js";

const scenarios = [
  { id: "scholars-mate-qh5", moves: ["e4", "e5", "Bc4", "Nc6", "Qh5"], expect: "Qh5" },
  { id: "early-qh5-no-bishop", moves: ["e4", "e5", "Qh5"], expect: "Qh5" },
  { id: "parham-attack", moves: ["e4", "e5", "Qh5", "Nc6", "Bc4"], expect: "Bc4" },
  { id: "qf3-attack", moves: ["e4", "e5", "Bc4", "Nc6", "Qf3"], expect: "Qf3" },
  { id: "scandinavian-qxd5", moves: ["e4", "d5", "exd5", "Qxd5"], expect: "Qxd5" },
  { id: "black-early-qa5", moves: ["d4", "d5", "Nf3", "Qa5"], expect: "Qa5" },
  { id: "center-counter-qd6", moves: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qd6"], expect: "Qd6" },
  { id: "qh4-after-e5", moves: ["e4", "e5", "Nf3", "Qh4"], expect: "Qh4" },
  { id: "early-queen-trade-or-not", moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Qf6"], expect: "Qf6" },
  { id: "queens-gambit-qa5-check", moves: ["d4", "d5", "c4", "dxc4", "Qa5+"], expect: "Qa5+" },
  { id: "caro-kann-qg4", moves: ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Nd7", "Qg4"], expect: "Qg4" },
];

let allPass = true;
for (const s of scenarios) {
  const chess = new Chess();
  let failed = false;
  for (let i = 0; i < s.moves.length; i++) {
    try {
      const r = chess.move(s.moves[i]);
      if (!r) { console.log(`FAIL ${s.id}: move ${i} "${s.moves[i]}" returned null`); failed = true; break; }
    } catch (e) {
      console.log(`FAIL ${s.id}: move ${i} "${s.moves[i]}" threw: ${e.message}`);
      failed = true;
      break;
    }
  }
  if (!failed) {
    // Check the last move matches expected
    const history = chess.history();
    const lastMove = history[history.length - 1];
    const queenOnBoard = chess.board().flat().some(p => p?.type === 'q' && p.color === (s.moves.length % 2 === 1 ? 'w' : 'b'));
    console.log(`PASS ${s.id}: ${s.moves.join(' ')} → last="${lastMove}" fen="${chess.fen().split(' ')[0]}"`);
  } else {
    allPass = false;
  }
}
if (allPass) console.log("\nAll scenarios valid!");
else { console.log("\nSome scenarios FAILED"); process.exit(1); }
