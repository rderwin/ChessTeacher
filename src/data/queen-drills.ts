/**
 * Queen Attack Drill Scenarios
 *
 * Each scenario starts from a position where the opponent made an annoying
 * queen move. The player needs to find the best response. Wrong answers
 * undo and let you try again — the drill only advances on a correct move.
 */

export interface DrillResponse {
  san: string;
  quality: "best" | "good" | "mistake" | "blunder";
  feedback: string;
  /** Follow-up moves after this response (alternating opponent/player). */
  continuation?: string[];
}

export interface ThreatArrow {
  from: string;
  to: string;
}

export interface QueenDrillScenario {
  id: string;
  name: string;
  /** What the opponent just did and why it's scary/annoying. */
  situation: string;
  /** What the opponent is threatening — shown as text AND arrows. */
  threat: string;
  /** Arrows to draw showing the threat (e.g., queen → target square). */
  threatArrows: ThreatArrow[];
  playerColor: "white" | "black";
  /** Moves played automatically to reach the critical position. */
  setupMoves: string[];
  /** Accepted correct answers (best or good). */
  responses: DrillResponse[];
  /** One-sentence takeaway. */
  keyLesson: string;
}

export const QUEEN_DRILL_SCENARIOS: QueenDrillScenario[] = [
  {
    id: "scholars-mate-qh5",
    name: "Scholar's Mate: Qh5 + Bc4",
    situation: "White played Qh5 with the bishop already on c4. This is Scholar's Mate — the queen and bishop both aim at f7.",
    threat: "Qxf7# is checkmate! The queen takes f7, protected by the bishop on c4.",
    threatArrows: [{ from: "h5", to: "f7" }, { from: "c4", to: "f7" }],
    playerColor: "black",
    setupMoves: ["e4", "e5", "Bc4", "Nc6", "Qh5"],
    responses: [
      { san: "g6", quality: "best", feedback: "g6 blocks the queen's path to f7 and forces it to retreat. The queen will waste another move, and you develop naturally.", continuation: ["Qf3", "Nf6"] },
      { san: "Qe7", quality: "good", feedback: "Qe7 defends f7 but blocks your bishop. g6 is cleaner because it forces the queen back." },
      { san: "Qf6", quality: "mistake", feedback: "Qf6 blocks the diagonal but puts your queen where the knight wants to go (f6). Your development will be cramped." },
      { san: "Nf6", quality: "blunder", feedback: "After Nf6, Qxf7# is CHECKMATE. The bishop on c4 supports the queen. Always check if f7 is defended before developing the knight!" },
      { san: "d6", quality: "mistake", feedback: "d6 doesn't block f7 at all. Qxf7+ still comes — you'd lose the rook. You need to directly block the queen's path with g6." },
      { san: "Nh6", quality: "mistake", feedback: "Nh6 defends f7 but the knight is terrible on the rim. g6 is much better — blocks the attack AND keeps your pieces flexible." },
    ],
    keyLesson: "Against Qh5 + Bc4 aiming at f7: play g6 to block the queen. Never play Nf6 when the bishop eyes f7!",
  },
  {
    id: "early-qh5-no-bishop",
    name: "Wayward Queen: 1.e4 e5 2.Qh5",
    situation: "White brought the queen out on move 2 — no bishop on c4 yet. There's no immediate mate threat, but Qxe5+ would win your pawn.",
    threat: "Qxe5+ wins the e5 pawn with check. You need to defend e5.",
    threatArrows: [{ from: "h5", to: "e5" }],
    playerColor: "black",
    setupMoves: ["e4", "e5", "Qh5"],
    responses: [
      { san: "Nc6", quality: "best", feedback: "Nc6 defends e5 AND develops a piece. Without a bishop on c4, there's no mate threat — just develop normally.", continuation: ["Bc4", "g6"] },
      { san: "Nf6", quality: "good", feedback: "Nf6 attacks the queen, but after Qxe5+ you lose a pawn and castling rights. Nc6 is better because it defends e5 while developing." },
      { san: "g6", quality: "good", feedback: "g6 chases the queen but you don't need to — without the bishop, there's no mate. Nc6 develops while defending e5, which is more efficient." },
      { san: "d6", quality: "mistake", feedback: "d6 defends e5 but doesn't develop a piece. Nc6 does both — always prefer developing moves." },
      { san: "Ke7", quality: "blunder", feedback: "Moving the king loses castling rights forever! Nc6 defends e5 naturally and keeps all your options." },
    ],
    keyLesson: "When the queen comes out early without bishop support, don't panic. Nc6 defends e5 while developing — no need to chase the queen yet.",
  },
  {
    id: "parham-attack",
    name: "Parham Attack: Qh5 + Bc4 battery",
    situation: "White has the Qh5 and Bc4 battery — both aimed straight at f7. You've developed Nc6 but you MUST defend f7 right now or it's mate.",
    threat: "Qxf7# is mate! The queen takes f7 supported by the bishop. This is your last chance to stop it.",
    threatArrows: [{ from: "h5", to: "f7" }, { from: "c4", to: "f7" }],
    playerColor: "black",
    setupMoves: ["e4", "e5", "Qh5", "Nc6", "Bc4"],
    responses: [
      { san: "g6", quality: "best", feedback: "g6 blocks Qxf7# completely by shutting the queen out. Now the queen must retreat (wasting tempo) and you'll develop Nf6 next, attacking the queen again.", continuation: ["Qf3", "Nf6"] },
      { san: "Qe7", quality: "good", feedback: "Qe7 defends f7, but your queen is passive on e7, blocking the bishop. g6 is cleaner — forces the queen back and keeps your pieces active." },
      { san: "Nf6", quality: "blunder", feedback: "CHECKMATE! After Nf6, Qxf7# is instant mate. The bishop on c4 supports the queen on f7. You MUST block the queen's path first!" },
      { san: "d6", quality: "blunder", feedback: "d6 doesn't stop Qxf7#! The queen still takes f7 with the bishop's support. You need g6 to physically block the queen's diagonal." },
      { san: "Nd4", quality: "mistake", feedback: "Nd4 attacks the queen — tempting! But Qxf7# is STILL mate. You must defend f7 FIRST, then counterattack. g6 blocks the mate." },
    ],
    keyLesson: "When Qh5 + Bc4 create a battery on f7, play g6. Block the queen's path BEFORE doing anything else.",
  },
  {
    id: "qf3-attack",
    name: "Queen on f3: Targeting f7",
    situation: "White played Qf3 — a different angle of attack on f7 with the bishop on c4. Less common than Qh5 but the same idea.",
    threat: "Qxf7# if you don't defend. The queen and bishop both target f7.",
    threatArrows: [{ from: "f3", to: "f7" }, { from: "c4", to: "f7" }],
    playerColor: "black",
    setupMoves: ["e4", "e5", "Bc4", "Nc6", "Qf3"],
    responses: [
      { san: "Nf6", quality: "best", feedback: "Nf6 is safe here! The knight blocks the queen's line to f7 from f3 (unlike when the queen is on h5). It develops AND defends. Plus it eyes d5 and pressures e4.", continuation: ["d3", "Na5"] },
      { san: "g6", quality: "good", feedback: "g6 is safe and solid, but less active than Nf6. Since the queen is on f3 (not h5), the knight on f6 blocks the diagonal. Nf6 is sharper." },
      { san: "Nd4", quality: "good", feedback: "Nd4 attacks the queen and is playable! After Qd1, you've forced the queen to waste time. But Nf6 develops more naturally." },
      { san: "d6", quality: "mistake", feedback: "d6 is too passive — Nf6 develops while blocking the queen's path. Always develop pieces when you can." },
    ],
    keyLesson: "Queen on f3 (not h5) means Nf6 is safe and strong — the knight blocks the queen's path to f7 from that angle.",
  },
  {
    id: "scandinavian-qxd5",
    name: "Scandinavian: Black takes with queen",
    situation: "Black played 1...d5 and recaptured with the queen on d5. The queen is sitting in the middle of the board — a huge target for your knights.",
    threat: "No immediate threat — Black's queen is just poorly placed. Punish it by developing WITH TEMPO.",
    threatArrows: [],
    playerColor: "white",
    setupMoves: ["e4", "d5", "exd5", "Qxd5"],
    responses: [
      { san: "Nc3", quality: "best", feedback: "Nc3 develops AND attacks the queen! Black MUST move the queen again, losing another tempo. You get a free developing move.", continuation: ["Qa5", "d4"] },
      { san: "Nf3", quality: "good", feedback: "Nf3 develops but doesn't attack the queen. Nc3 is better — it gains a free tempo by forcing the queen to move." },
      { san: "d4", quality: "good", feedback: "d4 grabs the center but doesn't develop a piece. Nc3 develops AND attacks — two purposes in one move." },
      { san: "c4", quality: "mistake", feedback: "c4 attacks the queen but weakens d4. Nc3 is much better — it develops a piece AND attacks the queen." },
    ],
    keyLesson: "When the opponent's queen is in the center, develop pieces that ATTACK it. Each forced queen retreat = a free tempo for you.",
  },
  {
    id: "scandinavian-qa5-side",
    name: "Scandinavian: Queen hides on a5",
    situation: "After 1.e4 d5 2.exd5 Qxd5 3.Nc3, Black retreated to Qa5 — staying active but out of the center. Keep developing and grab the center.",
    threat: "No real threat — the queen on a5 pins along the a5-e1 diagonal loosely but you can block with Bd2 later. Just develop.",
    threatArrows: [],
    playerColor: "white",
    setupMoves: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5"],
    responses: [
      { san: "d4", quality: "best", feedback: "d4 grabs the center powerfully. Black spent two moves on the queen while you developed Nc3 AND grabbed central space. You're already winning the opening.", continuation: ["Nf6", "Nf3"] },
      { san: "Nf3", quality: "good", feedback: "Nf3 develops naturally. But d4 is slightly stronger since it immediately claims the center while Black is behind in development." },
      { san: "Bc4", quality: "good", feedback: "Bc4 develops the bishop actively, aiming at f7. But d4 is slightly more urgent — claim the center first, then develop the bishop." },
      { san: "a3", quality: "mistake", feedback: "a3 wastes time. The queen on a5 isn't threatening anything concrete. Grab the center with d4 while Black's pieces are undeveloped." },
    ],
    keyLesson: "After Nc3 chases the queen, follow up with d4 for a big center. Don't waste time on prophylactic pawn moves when you can grab space.",
  },
  {
    id: "center-counter-qd6",
    name: "Scandinavian: Queen retreats to d6",
    situation: "After 1.e4 d5 2.exd5 Qxd5 3.Nc3, Black retreated to Qd6. The queen is less exposed now but still blocking Black's development. Keep building.",
    threat: "No immediate threat. Black has moved the queen twice and has zero pieces developed. Seize the center.",
    threatArrows: [],
    playerColor: "white",
    setupMoves: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qd6"],
    responses: [
      { san: "d4", quality: "best", feedback: "d4 seizes the center. You already have Nc3 — now d4 gives you a powerful pawn duo and opens diagonals for your bishops.", continuation: ["Nf6", "Nf3"] },
      { san: "Nf3", quality: "good", feedback: "Nf3 develops and is solid. But d4 is slightly stronger — it grabs central space while you have the development lead." },
      { san: "Bc4", quality: "good", feedback: "Bc4 develops actively but d4 first is more precise — claim the center before committing the bishop." },
      { san: "d3", quality: "mistake", feedback: "d3 is too timid. You're ahead in development — grab space with d4! When you're up in tempi, play aggressively in the center." },
    ],
    keyLesson: "After chasing the queen with Nc3, follow up with d4 for a strong center. Development lead + central space = winning formula.",
  },
  {
    id: "qh4-after-bc4",
    name: "Black's ...Qh4: Threatening e4 and f2",
    situation: "After 1.e4 e5 2.Bc4, Black played Qh4 — targeting your e4 pawn AND the f2 square. The queen can't be captured, so you need to defend calmly.",
    threat: "Qxe4+ grabs the e4 pawn with check, and Qxf2# is a future mating idea if you're careless.",
    threatArrows: [{ from: "h4", to: "e4" }, { from: "h4", to: "f2" }],
    playerColor: "white",
    setupMoves: ["e4", "e5", "Bc4", "Qh4"],
    responses: [
      { san: "Qe2", quality: "best", feedback: "Qe2 defends BOTH e4 and f2 in one move. It also offers a queen trade — if Black takes, they've wasted all that queen development for nothing. After Qxe2+ Nxe2, you're fine.", continuation: ["d6", "Nf3"] },
      { san: "Nc3", quality: "good", feedback: "Nc3 defends e4 and develops. But f2 is still weak — if Black eventually plays Bc5, the f2 pressure builds. Qe2 covers both threats." },
      { san: "Nf3", quality: "good", feedback: "Nf3 attacks the queen and develops, but after Qxe4+ you lose the pawn with check. Qe2 is safer — it defends everything first." },
      { san: "Kf1", quality: "mistake", feedback: "Kf1 defends f2 but gives up castling rights forever. That's too high a price. Qe2 defends both threats without any structural cost." },
      { san: "d3", quality: "good", feedback: "d3 defends e4 solidly. But Qe2 is more active — it also covers f2 and threatens to trade queens, punishing Black's early queen development." },
    ],
    keyLesson: "When the queen targets multiple squares, find a move that defends all of them at once. Qe2 covers both e4 and f2 while offering a queen trade.",
  },
  {
    id: "early-queen-trade-or-not",
    name: "Should you trade queens?",
    situation: "After 1.e4 e5 2.Nf3 Nc6 3.Bc4, Black played Qf6 — it 'defends' e5 but blocks their own knight from f6. Should you trade queens?",
    threat: "No threat — the queen on f6 is actually HELPING you by blocking Black's knight development. Don't trade it off!",
    threatArrows: [],
    playerColor: "white",
    setupMoves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Qf6"],
    responses: [
      { san: "d3", quality: "best", feedback: "d3 keeps developing quietly. Black's queen on f6 is a LIABILITY — it blocks the g8-knight. Don't trade queens when the opponent's queen is misplaced!", continuation: ["Nge7", "O-O"] },
      { san: "Nc3", quality: "best", feedback: "Nc3 develops another piece. No need to trade — Black's queen blocks their own knight from f6, causing cramped development. Just keep building.", continuation: ["Nge7", "d3"] },
      { san: "O-O", quality: "good", feedback: "Castling is fine but Nc3 or d3 first squeeze more advantage from Black's awkward queen." },
      { san: "Qe2", quality: "mistake", feedback: "Don't bring your queen out when minor pieces still need development. Nc3 or d3 are more useful moves." },
    ],
    keyLesson: "Don't rush to trade queens when the opponent's queen is badly placed. A misplaced queen helps YOU by blocking their own development.",
  },
  {
    id: "scandinavian-qd6-e5",
    name: "Scandinavian: Push them back with e5",
    situation: "After 1.e4 d5 2.exd5 Qxd5 3.Nc3 Qd6 4.d4, Black played Nf6. You have a big center — can you push the queen AGAIN?",
    threat: "No direct threat. But your d4+Nc3 center is strong and you can push e5 to attack the knight AND the queen on d6 at the same time.",
    threatArrows: [],
    playerColor: "white",
    setupMoves: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qd6", "d4", "Nf6"],
    responses: [
      { san: "Nf3", quality: "best", feedback: "Nf3 develops the last minor piece before pushing. You'll castle next, then e5 will be devastating — it attacks the knight AND the queen simultaneously.", continuation: ["a6", "Bf4"] },
      { san: "Bf4", quality: "best", feedback: "Bf4 develops AND attacks the queen on d6! The queen must move AGAIN — that's the 4th queen move while you're building a perfect position.", continuation: ["Qb4", "a3"] },
      { san: "Bd3", quality: "good", feedback: "Bd3 develops the bishop actively, eyeing h7. But Bf4 is sharper — it attacks the queen directly while developing. Develop with threats when possible." },
      { san: "Be2", quality: "mistake", feedback: "Be2 is passive. Bf4 is much better — it develops AND attacks the queen. When you can develop with a threat, always prefer that." },
    ],
    keyLesson: "Keep developing pieces that attack the wandering queen. Every queen move Black makes is a move NOT spent developing knights and bishops.",
  },
  {
    id: "caro-kann-qg4",
    name: "Caro-Kann: White's Qg4 attacking g7",
    situation: "In the Caro-Kann, White played Qg4 attacking your g7 pawn. If you move the knight from d7, g7 falls. How do you defend without messing up?",
    threat: "Qxg7 grabs the g7 pawn and threatens your rook on h8. You need to defend g7 while keeping your development on track.",
    threatArrows: [{ from: "g4", to: "g7" }],
    playerColor: "black",
    setupMoves: ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Nd7", "Qg4"],
    responses: [
      { san: "Ngf6", quality: "best", feedback: "Ngf6! The knight develops to its ideal square AND defends g7 through the e8 square. After Nxf6+ Nxf6, the queen must retreat and you're developed naturally.", continuation: ["Nxf6+", "Nxf6"] },
      { san: "e6", quality: "good", feedback: "e6 defends g7 by opening the dark-square bishop's diagonal. Solid but slightly passive — Ngf6 is sharper because it develops while defending." },
      { san: "g6", quality: "mistake", feedback: "g6 weakens your kingside permanently. The dark squares around your king become targets. Defend with pieces (Ngf6), not weakening pawn moves." },
    ],
    keyLesson: "Defend with developing moves, not weakening pawn pushes. Ngf6 develops, defends g7, and keeps your structure intact.",
  },
];

/** Pick N random scenarios. */
export function pickRandomScenarios(count: number, excludeIds?: Set<string>): QueenDrillScenario[] {
  let pool = QUEEN_DRILL_SCENARIOS;
  if (excludeIds && excludeIds.size > 0) {
    pool = pool.filter((s) => !excludeIds.has(s.id));
  }
  if (pool.length === 0) pool = QUEEN_DRILL_SCENARIOS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
