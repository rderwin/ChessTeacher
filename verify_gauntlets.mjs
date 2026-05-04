import { Chess } from "chess.js";

const gauntlets = [
  { id: "scholars-mate-classic", pc: "black", setup: ["e4"],
    turns: [
      { responses: ["e5","c5","e6"], bot: "Bc4" },
      { responses: ["Nc6","Nf6","Bc5"], bot: "Qh5" },
      { responses: ["g6","Qe7","Qf6"], bot: "Qf3" },
      { responses: ["Nf6","Qf6"], bot: "Nc3" },
      { responses: ["Bc5","d6","Bb4","h6"], bot: null },
    ]
  },
  { id: "wayward-queen-classic", pc: "black", setup: ["e4"],
    turns: [
      { responses: ["e5","c5"], bot: "Qh5" },
      { responses: ["Nc6","Nf6","g6"], bot: "Bc4" },
      { responses: ["g6","Qe7"], bot: "Qf3" },
      { responses: ["Nf6"], bot: "Ne2" },
      { responses: ["Bc5","d6","Bb4"], bot: null },
    ]
  },
  { id: "scandinavian-punish", pc: "white", setup: [],
    turns: [
      { responses: ["e4","d4"], bot: "d5" },
      { responses: ["exd5","e5","Nc3"], bot: "Qxd5" },
      { responses: ["Nc3","Nf3","d4"], bot: "Qa5" },
      { responses: ["d4","Nf3","Bc4"], bot: "Nf6" },
      { responses: ["Nf3","Bc4","Bd2"], bot: null },
    ]
  },
  { id: "early-qf6-punish", pc: "white", setup: [],
    turns: [
      { responses: ["e4","d4"], bot: "e5" },
      { responses: ["Nf3","Nc3","Bc4"], bot: "Qf6" },
      { responses: ["Nc3","Bc4","d4"], bot: "Nge7" },
      { responses: ["Bc4","d4","O-O"], bot: "Nbc6" },
      { responses: ["O-O","d4","Nd5"], bot: null },
    ]
  },
];

let allOk = true;
for (const g of gauntlets) {
  console.log(`\n=== ${g.id} ===`);
  
  // Build the BEST PATH first (using responses[0] each turn)
  const chess = new Chess();
  for (const m of g.setup) chess.move(m);
  
  for (let i = 0; i < g.turns.length; i++) {
    const t = g.turns[i];
    const fenBefore = chess.fen();
    
    // Verify EACH response is legal at this position
    for (const resp of t.responses) {
      const copy = new Chess(fenBefore);
      try {
        if (!copy.move(resp)) { console.log(`  ❌ turn ${i+1}: "${resp}" returns null`); allOk = false; }
      } catch (e) { console.log(`  ❌ turn ${i+1}: "${resp}" — ${e.message}`); allOk = false; }
    }
    
    // Apply best response
    chess.move(t.responses[0]);
    
    // Apply bot's response if any
    if (t.bot) {
      try {
        if (!chess.move(t.bot)) { console.log(`  ❌ turn ${i+1}: bot "${t.bot}" returns null`); allOk = false; break; }
      } catch (e) { console.log(`  ❌ turn ${i+1}: bot "${t.bot}" — ${e.message}`); allOk = false; break; }
    }
  }
  console.log(`  best path: ${chess.history().join(" ")}`);
}
console.log(allOk ? "\n✅ ALL GAUNTLETS VALID" : "\n❌ FIX NEEDED");
if (!allOk) process.exit(1);
