import { Chess } from "chess.js";

const scenarios = [
  { id: "scholars-mate-qh5", setup: ["e4","e5","Bc4","Nc6","Qh5"], pc: "black",
    responses: ["g6","Qe7","Qf6","Nf6","d6","Nh6"], conts: { "g6": ["Qf3","Nf6"] } },
  { id: "early-qh5-no-bishop", setup: ["e4","e5","Qh5"], pc: "black",
    responses: ["Nc6","Nf6","g6","d6","Ke7"], conts: { "Nc6": ["Bc4","g6"] } },
  { id: "parham-attack", setup: ["e4","e5","Qh5","Nc6","Bc4"], pc: "black",
    responses: ["g6","Qe7","Nf6","d6","Nd4"], conts: { "g6": ["Qf3","Nf6"] } },
  { id: "qf3-attack", setup: ["e4","e5","Bc4","Nc6","Qf3"], pc: "black",
    responses: ["Nf6","g6","Nd4","d6"], conts: { "Nf6": ["d3","Na5"] } },
  { id: "scandinavian-qxd5", setup: ["e4","d5","exd5","Qxd5"], pc: "white",
    responses: ["Nc3","Nf3","d4","c4"], conts: { "Nc3": ["Qa5","d4"] } },
  { id: "scandinavian-qa5-side", setup: ["e4","d5","exd5","Qxd5","Nc3","Qa5"], pc: "white",
    responses: ["d4","Nf3","Bd2","a3"], conts: { "d4": ["Nf6","Nf3"] } },
  { id: "center-counter-qd6", setup: ["e4","d5","exd5","Qxd5","Nc3","Qd6"], pc: "white",
    responses: ["d4","Nf3","Bc4","d3"], conts: { "d4": ["Nf6","Nf3"] } },
  { id: "qh4-after-e5", setup: ["e4","e5","Nf3","Qh4"], pc: "white",
    responses: ["Nc3","Be2","g3","d3","Nxe5"], conts: { "Nc3": ["Bb4","Be2"] } },
  { id: "early-queen-trade-or-not", setup: ["e4","e5","Nf3","Nc6","Bc4","Qf6"], pc: "white",
    responses: ["d3","Nc3","O-O","Qe2"], conts: { "d3": ["Nge7","O-O"], "Nc3": ["Nge7","d3"] } },
  { id: "scandinavian-qd6-e5", setup: ["e4","d5","exd5","Qxd5","Nc3","Qd6","d4","Nf6"], pc: "white",
    responses: ["Nf3","Bf4","e5","Be2"], conts: { "Nf3": ["a6","Bf4"], "Bf4": ["Qb4","a3"] } },
  { id: "caro-kann-qg4", setup: ["e4","c6","d4","d5","Nc3","dxe4","Nxe4","Nd7","Qg4"], pc: "black",
    responses: ["Ngf6","e6","g6"], conts: { "Ngf6": ["Nxf6+","Nxf6"] } },
];

let allOk = true;
for (const s of scenarios) {
  const chess = new Chess();
  let fail = false;
  
  for (let i = 0; i < s.setup.length; i++) {
    try {
      if (!chess.move(s.setup[i])) { console.log(`❌ ${s.id} SETUP[${i}] "${s.setup[i]}" null`); fail = true; break; }
    } catch (e) { console.log(`❌ ${s.id} SETUP[${i}] "${s.setup[i]}" — ${e.message}`); fail = true; allOk = false; break; }
  }
  if (fail) continue;
  
  const fen = chess.fen();
  const turn = chess.turn();
  const exp = s.pc === "white" ? "w" : "b";
  if (turn !== exp) { console.log(`❌ ${s.id} TURN: ${turn} but expected ${exp}`); allOk = false; continue; }
  
  let respFail = false;
  for (const r of s.responses) {
    try { if (!new Chess(fen).move(r)) { console.log(`❌ ${s.id} RESP "${r}" null`); respFail = true; } }
    catch (e) { console.log(`❌ ${s.id} RESP "${r}" — ${e.message}`); respFail = true; }
  }
  if (respFail) allOk = false;
  
  for (const [after, moves] of Object.entries(s.conts)) {
    const c = new Chess(fen);
    try { c.move(after); } catch { continue; }
    for (let i = 0; i < moves.length; i++) {
      try { if (!c.move(moves[i])) { console.log(`❌ ${s.id} CONT ${after}→[${i}] "${moves[i]}" null`); allOk = false; break; } }
      catch (e) { console.log(`❌ ${s.id} CONT ${after}→[${i}] "${moves[i]}" — ${e.message}`); allOk = false; break; }
    }
  }
  
  console.log(`✅ ${s.id} — ${s.setup.length} setup, ${s.responses.length} responses, turn=${turn}`);
}
console.log(allOk ? "\n✅ ALL 11 SCENARIOS PASS" : "\n❌ FAILURES FOUND");
if (!allOk) process.exit(1);
