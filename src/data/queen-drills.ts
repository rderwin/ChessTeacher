/**
 * Queen Attack Drill Scenarios
 *
 * Each scenario starts from a specific position where the opponent just made
 * an annoying queen move. The player needs to find the best response. Multiple
 * responses are evaluated with specific feedback.
 *
 * These cover the most common queen attacks beginners face online.
 */

export interface DrillResponse {
  san: string;
  quality: "best" | "good" | "mistake" | "blunder";
  feedback: string;
  /** Follow-up moves after this response (alternating opponent/player). */
  continuation?: string[];
}

export interface QueenDrillScenario {
  id: string;
  name: string;
  /** What the opponent just did and why it's scary/annoying. */
  situation: string;
  playerColor: "white" | "black";
  /** Moves played automatically to reach the critical position. */
  setupMoves: string[];
  /** The position to solve (after setup moves). Player moves next. */
  responses: DrillResponse[];
  /** One-sentence takeaway. */
  keyLesson: string;
}

export const QUEEN_DRILL_SCENARIOS: QueenDrillScenario[] = [
  // ===== BLACK defending against White's queen =====
  {
    id: "scholars-mate-qh5",
    name: "Scholar's Mate: Qh5 + Bc4",
    situation: "White played Qh5 aiming at f7 with Bc4 already out. This is the classic Scholar's Mate attempt — if you don't block it, Qxf7# is checkmate!",
    playerColor: "black",
    setupMoves: ["e4", "e5", "Bc4", "Nc6", "Qh5"],
    responses: [
      { san: "g6", quality: "best", feedback: "Perfect! g6 blocks the queen's attack on f7 AND forces the queen to retreat. The queen will waste another tempo moving, and you'll develop naturally. This is the simplest, cleanest defense.", continuation: ["Qf3", "Nf6"] },
      { san: "Qe7", quality: "good", feedback: "This defends f7 with the queen, but it blocks your dark-square bishop and is a bit passive. g6 is stronger because it develops your position while defending." },
      { san: "Qf6", quality: "mistake", feedback: "Qf6 blocks the queen's diagonal but puts YOUR queen in a terrible spot — it blocks your knight from going to f6 (its best square) and the queen is exposed. Prefer g6." },
      { san: "Nf6", quality: "blunder", feedback: "DANGER! After Nf6, White plays Qxf7# — that's CHECKMATE. The queen takes f7 protected by the bishop on c4. Always check if f7 is safe before developing!" },
      { san: "d6", quality: "mistake", feedback: "d6 doesn't defend f7 at all. White can play Qxf7+ and win your rook after Kd7. You need to directly address the threat to f7 — g6 is the clean solution." },
      { san: "Nh6", quality: "mistake", feedback: "Nh6 defends f7 but puts the knight on a terrible square at the edge of the board. Knights on the rim are dim! g6 is much better — it blocks the attack and keeps your pieces flexible." },
    ],
    keyLesson: "Against Scholar's Mate: play g6 to block the queen and force it to retreat. Never play Nf6 when the bishop aims at f7!",
  },
  {
    id: "early-qh5-no-bishop",
    name: "Wayward Queen: 1.e4 e5 2.Qh5",
    situation: "White brought the queen out on move 2! No bishop support yet, so there's no immediate mate threat — but Qxe5+ could win your pawn. Stay calm and develop.",
    playerColor: "black",
    setupMoves: ["e4", "e5", "Qh5"],
    responses: [
      { san: "Nc6", quality: "best", feedback: "Excellent! Nc6 defends the e5 pawn AND develops a piece. The queen on h5 isn't actually threatening anything dangerous without the bishop on c4. Just develop normally.", continuation: ["Bc4", "g6"] },
      { san: "Nf6", quality: "good", feedback: "Nf6 attacks the queen directly, but after Qxe5+ you lose a pawn and the right to castle (Kd8 or Be7). Nc6 is better because it defends e5 while developing." },
      { san: "g6", quality: "good", feedback: "g6 chases the queen, but you don't need to chase it yet — it's not threatening mate without a bishop on c4. Nc6 develops while defending e5, which is more efficient." },
      { san: "d6", quality: "mistake", feedback: "d6 defends e5 but doesn't develop a piece. Nc6 does both — it defends e5 AND gets a knight into the game. Always prefer moves that develop AND defend." },
      { san: "Qe7", quality: "mistake", feedback: "Qe7 defends but blocks your bishop and is passive. The queen on h5 isn't threatening mate without a bishop — just develop normally with Nc6." },
      { san: "Ke7", quality: "blunder", feedback: "Moving your king loses castling rights forever! There's no reason to do this. Nc6 defends e5 naturally and you keep all your options open." },
    ],
    keyLesson: "When the queen comes out early without bishop support, don't panic — just develop pieces that also defend. Nc6 defends e5 while developing.",
  },
  {
    id: "parham-attack",
    name: "Parham Attack: Qh5 + Bc4 battery",
    situation: "White has Qh5 and Bc4 pointing at f7 — the classic battery. But you've already played Nc6. Now you MUST defend f7 or it's mate!",
    playerColor: "black",
    setupMoves: ["e4", "e5", "Qh5", "Nc6", "Bc4"],
    responses: [
      { san: "g6", quality: "best", feedback: "g6 is the key move — it blocks Qxf7# completely by taking away the queen's access to f7. Now the queen has to move (wasting tempo) and you'll follow up with Nf6 developing with attack on the queen.", continuation: ["Qf3", "Nf6"] },
      { san: "Qe7", quality: "good", feedback: "Qe7 defends f7, but your queen is passive on e7 blocking the bishop. g6 is cleaner — it forces the queen back and lets you develop the knight to f6 next." },
      { san: "Qf6", quality: "mistake", feedback: "Qf6 blocks the queen's diagonal but puts your queen on f6 where it blocks your knight. After Qxf6 Nxf6, you've traded queens and your position is fine — but why trade when g6 gives you the advantage?" },
      { san: "Nf6", quality: "blunder", feedback: "CHECKMATE! After Nf6, Qxf7# is mate. The bishop on c4 supports the queen. Always check f7 safety before moving the knight!" },
      { san: "d6", quality: "blunder", feedback: "d6 doesn't defend f7! White plays Qxf7+ picking up your rook. You MUST block the f7 threat directly — g6 is the answer." },
      { san: "Nd4", quality: "mistake", feedback: "Nd4 attacks the queen, which is tempting, but Qxf7# is still mate! You must defend f7 FIRST, then counterattack. g6 blocks the mate and then you can develop aggressively." },
    ],
    keyLesson: "When there's a Qh5+Bc4 battery, g6 is almost always the answer. Block the queen's path to f7 before doing anything else.",
  },
  {
    id: "qf3-attack",
    name: "Queen on f3: Targeting f7",
    situation: "White played Qf3, aiming at f7 from a different angle. Less common than Qh5 but the same idea — threaten the weak f7 square.",
    playerColor: "black",
    setupMoves: ["e4", "e5", "Bc4", "Nc6", "Qf3"],
    responses: [
      { san: "Nf6", quality: "best", feedback: "Nf6 is perfect here! Unlike the Qh5 line, the queen on f3 is NOT supported by the bishop for Qxf7# (the knight on f6 blocks). So Nf6 develops AND is totally safe. The knight also eyes d5 and attacks e4.", continuation: ["d3", "Na5"] },
      { san: "g6", quality: "good", feedback: "g6 is safe and solid, but less active than Nf6. Since the queen is on f3 (not h5), there's no immediate Qxf7 mate threat. Nf6 is more aggressive — it develops with tempo." },
      { san: "Nd4", quality: "good", feedback: "Nd4 attacks the queen and is playable! After Qd1 (or Qf1), you've forced the queen to waste more time. But Nf6 is simpler and develops more naturally." },
      { san: "d6", quality: "mistake", feedback: "d6 is too passive. Nf6 develops a piece AND is completely safe since the queen on f3 can't take f7 through the knight. Develop pieces, don't push pawns defensively." },
      { san: "Qf6", quality: "mistake", feedback: "Trading queens with Qf6 isn't bad, but you're giving up the chance to punish White's bad queen development. After the queen trade, the position is equal. Nf6 keeps the advantage." },
    ],
    keyLesson: "Queen on f3 (not h5) means Nf6 is usually safe and strong — the knight blocks the queen's path to f7. Develop naturally and let them waste time with the queen.",
  },
  {
    id: "fried-liver-setup",
    name: "Fried Liver: Ng5 attacking f7",
    situation: "White played Ng5 targeting the weak f7 pawn. This isn't a queen attack but it's the same idea — attacking f7 early. If you're not careful, Nxf7 forks your queen and rook!",
    playerColor: "black",
    setupMoves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5"],
    responses: [
      { san: "d5", quality: "best", feedback: "d5! The best defense is a counterattack in the center. After exd5 Nxd5 (or Na5), you fight for the initiative. d5 blocks the bishop's diagonal and opens lines for your pieces.", continuation: ["exd5", "Na5"] },
      { san: "Bc5", quality: "good", feedback: "Bc5 develops and defends — the bishop can support f7 indirectly. But d5 is sharper because it counterattacks in the center. Top players almost always play d5 here." },
      { san: "d6", quality: "mistake", feedback: "d6 defends passively but doesn't challenge White's aggression. After d6, White can play d3 and maintain pressure on f7. d5 is the principled counterattack that seizes the initiative." },
      { san: "h6", quality: "mistake", feedback: "h6 kicks the knight, but after Nxf7! White sacrifices — Kxf7 and then Qf3+ or Bc4+ leads to a vicious attack. Don't kick the knight without d5 first!" },
      { san: "Qe7", quality: "mistake", feedback: "Qe7 defends f7 but blocks your dark-square bishop and is passive. d5 is much stronger — it counterattacks and opens the game while you have equal development." },
    ],
    keyLesson: "Against Ng5 (or any attack on f7), counterattack with d5! Don't just defend passively — strike in the center.",
  },
  // ===== WHITE punishing Black's queen =====
  {
    id: "scandinavian-qxd5",
    name: "Scandinavian: Black takes with queen",
    situation: "Black played 1...d5 and recaptured with the queen on d5. The queen is exposed in the center — attack it to gain development tempo!",
    playerColor: "white",
    setupMoves: ["e4", "d5", "exd5", "Qxd5"],
    responses: [
      { san: "Nc3", quality: "best", feedback: "Nc3 is the textbook punishment! The knight develops to its ideal square AND attacks the queen — Black MUST move the queen again, losing another tempo. You gain a free developing move.", continuation: ["Qa5", "d4"] },
      { san: "Nf3", quality: "good", feedback: "Nf3 develops a piece but doesn't attack the queen. Nc3 is better because it's a 'free' tempo — you develop AND force the queen to move. When the opponent's queen is exposed, always target it." },
      { san: "d4", quality: "good", feedback: "d4 grabs the center and is playable, but Nc3 is sharper. A pawn move doesn't develop a piece — Nc3 develops AND attacks the queen simultaneously." },
      { san: "c4", quality: "mistake", feedback: "c4 attacks the queen but weakens the d4 square and doesn't develop a piece. Nc3 is much better — it develops AND attacks. Pieces before pawns!" },
      { san: "Bc4", quality: "mistake", feedback: "Bc4 develops but doesn't hit the queen. When the opponent has their queen in the center, EVERY developing move should target the queen if possible. Nc3 does that." },
    ],
    keyLesson: "When the opponent's queen is in the center, develop pieces that ATTACK it. Each time the queen moves, you gain a free tempo of development.",
  },
  {
    id: "black-early-qa5",
    name: "Black plays ...Qa5: Misplaced queen",
    situation: "After 1.d4 d5 2.Nf3, Black played Qa5?! — bringing the queen out early to 'pressure' the queenside. Just develop normally.",
    playerColor: "white",
    setupMoves: ["d4", "d5", "Nf3", "Qa5"],
    responses: [
      { san: "Nc3", quality: "best", feedback: "Nc3 develops naturally. The queen on a5 isn't threatening anything real — don't try to chase it, just develop. The queen will become a target later when you play Bd2.", continuation: ["e5", "e3"] },
      { san: "Bd2", quality: "good", feedback: "Bd2 develops and attacks the queen directly, but it's a bit early for the bishop — Nc3 first, then Bd2 later has more punch because you develop two pieces before chasing." },
      { san: "c4", quality: "good", feedback: "c4 challenges the center and is fine, but Nc3 develops a piece first. Center pawns are important but developing pieces that can later attack the wandering queen is the priority." },
      { san: "a3", quality: "mistake", feedback: "a3 does nothing productive. The queen on a5 isn't threatening anything — don't waste tempo on defensive pawn moves. Just develop with Nc3." },
      { san: "Qd3", quality: "mistake", feedback: "Don't bring YOUR queen out to match theirs! That's exactly the mistake you're trying to punish. Keep developing minor pieces — Nc3 is natural and strong." },
    ],
    keyLesson: "When the opponent's queen is out of position but not threatening anything, just develop normally. Don't try to chase it immediately — it'll become a target later.",
  },
  {
    id: "center-counter-qd6",
    name: "Scandinavian: Queen retreats to d6",
    situation: "After 1.e4 d5 2.exd5 Qxd5 3.Nc3, Black played Qd6. The queen is slightly less exposed now but still in the center. Keep developing with tempo.",
    playerColor: "white",
    setupMoves: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qd6"],
    responses: [
      { san: "d4", quality: "best", feedback: "d4 seizes the center with a pawn. You already have Nc3 developed — now d4 gives you a strong central pawn duo and opens the way for Bf4 or Bg5 to develop with threats.", continuation: ["Nf6", "Nf3"] },
      { san: "Nf3", quality: "good", feedback: "Nf3 develops another piece and is solid. But d4 is slightly better because it grabs central space first — you can play Nf3 next." },
      { san: "d3", quality: "mistake", feedback: "d3 is too passive — it doesn't contest the center. d4 grabs space and opens diagonals for your bishops. When you're ahead in development, play aggressively in the center." },
      { san: "Bc4", quality: "good", feedback: "Bc4 develops actively but d4 first is slightly more precise — it claims the center before committing the bishop. You want to know where the center pawns land before deciding the bishop's diagonal." },
    ],
    keyLesson: "After chasing the queen with Nc3, follow up with d4 to build a big center. When you're ahead in development, seize central space — it restricts your opponent's options.",
  },
  {
    id: "qh4-after-e5",
    name: "Black's ...Qh4: Annoying but unsound",
    situation: "After 1.e4 e5 2.Nf3, Black played Qh4?! — it looks scary (targeting e4 and possibly f2) but the queen is offside and vulnerable to Nc3 or even g3.",
    playerColor: "white",
    setupMoves: ["e4", "e5", "Nf3", "Qh4"],
    responses: [
      { san: "Nc3", quality: "best", feedback: "Nc3 defends e4 AND develops a piece. The queen on h4 is annoying but can't do any real damage — if Qxe4+?? then Be2 and the queen is in big trouble. Just develop!", continuation: ["Bb4", "Be2"] },
      { san: "Be2", quality: "good", feedback: "Be2 develops the bishop and prepares castling. It's solid but Nc3 is slightly better because it immediately defends e4 while also preparing d4." },
      { san: "g3", quality: "good", feedback: "g3 kicks the queen immediately, but slightly weakens your kingside pawn structure. Nc3 is more natural — it defends e4 without weakening anything." },
      { san: "d3", quality: "mistake", feedback: "d3 defends e4 but blocks your dark-square bishop. Nc3 is much better — it defends e4 while developing a piece. Don't use pawns when pieces will do the job better." },
      { san: "Nxe5", quality: "mistake", feedback: "Nxe5 grabs a pawn but falls into Black's trap: Qxe4+ forks the king and rook! Don't grab material when your king is exposed." },
    ],
    keyLesson: "Against ...Qh4, don't panic and don't grab the e5 pawn. Develop with Nc3 (defends e4) and the queen will have to retreat eventually — every retreat is a wasted move for Black.",
  },
  {
    id: "early-queen-trade-or-not",
    name: "Should you trade queens?",
    situation: "After 1.e4 e5 2.Nf3 Nc6 3.Bc4, Black played Qf6?! — it defends e5 but blocks the knight. You could trade queens... but should you?",
    playerColor: "white",
    setupMoves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Qf6"],
    responses: [
      { san: "d3", quality: "best", feedback: "d3 is calm and strong — you keep developing. Black's queen on f6 blocks their own knight from the best square. Don't trade queens when the opponent's queen is HELPING you by being misplaced!", continuation: ["Nge7", "O-O"] },
      { san: "Nc3", quality: "best", feedback: "Nc3 develops another piece. There's no need to trade queens — Black's queen on f6 is misplaced because it blocks the g8-knight. Just keep developing and the queen will be a liability.", continuation: ["Nge7", "d3"] },
      { san: "O-O", quality: "good", feedback: "Castling is never bad, but Nc3 or d3 first develops your position further while the opponent is tangled. The queen on f6 prevents Nf6, so Black will have to waste time with Nge7." },
      { san: "Qe2", quality: "mistake", feedback: "Don't bring your queen out when you can develop minor pieces! Nc3 or d3 are much more useful. Your queen is fine on d1 for now." },
    ],
    keyLesson: "Don't rush to trade queens when the opponent's queen is misplaced. A badly placed queen helps YOU — it blocks their own development and wastes their tempos.",
  },
  {
    id: "queens-gambit-qa5-check",
    name: "Queen's Gambit: ...Qa5+ trick",
    situation: "After 1.d4 d5 2.c4 dxc4, Black plays Qa5+ trying to win the c4 pawn for good. Block the check and recover the pawn.",
    playerColor: "white",
    setupMoves: ["d4", "d5", "c4", "dxc4", "Qa5+"],
    responses: [
      { san: "Bd2", quality: "best", feedback: "Bd2 blocks the check AND develops a piece. Now the queen on a5 is attacked and will have to move. After Qd8 (or similar), you play e3 and Bxc4 winning the pawn back with a great position.", continuation: ["Qd8", "e3"] },
      { san: "Nc3", quality: "good", feedback: "Nc3 blocks the check and develops, but the knight might be better placed elsewhere later. Bd2 is slightly more flexible and also attacks the queen." },
      { san: "Nd2", quality: "good", feedback: "Nd2 blocks the check but puts the knight on a passive square. Bd2 is better because the bishop is active there and attacks the queen on a5." },
      { san: "Qd2", quality: "mistake", feedback: "Blocking with the queen allows Qxd2+ and you've traded queens early, losing the chance to build an initiative. Bd2 keeps your queen for the middlegame." },
    ],
    keyLesson: "When checked by the queen, block with a piece that DEVELOPS while also putting the queen under pressure. Bd2 is the classic response — block + develop + attack.",
  },
  {
    id: "caro-kann-qg4",
    name: "Caro-Kann: White's Qg4 attacking g7",
    situation: "In the Caro-Kann (1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4), White jumped to Qg4 attacking g7. How do you defend the pawn without messing up your position?",
    playerColor: "black",
    setupMoves: ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Nd7", "Qg4"],
    responses: [
      { san: "Ngf6", quality: "best", feedback: "Ngf6! The knight attacks the queen AND defends g7 through e8 indirectly. After Nxf6+ Nxf6, the queen has to move and you've developed naturally. This is the main line for a reason.", continuation: ["Nxf6+", "Nxf6"] },
      { san: "e6", quality: "good", feedback: "e6 defends g7 by opening the dark-square bishop's diagonal. It's solid but slightly passive — Ngf6 is sharper because it develops while defending." },
      { san: "g6", quality: "mistake", feedback: "g6 weakens your kingside badly. The pawn on g6 can become a target, and the dark squares around your king are weak. Ngf6 is much better — defend with pieces, not pawns." },
      { san: "Nf8", quality: "mistake", feedback: "Nf8 is way too passive — the knight retreats to a starting square. Ngf6 develops a new piece to a strong central square while handling the queen threat." },
    ],
    keyLesson: "Defend with pieces that develop, not with weakening pawn moves. Ngf6 does everything — develops, defends, and attacks the queen.",
  },
];

/** Pick N random scenarios from the pool, avoiding repeats. */
export function pickRandomScenarios(count: number, excludeIds?: Set<string>): QueenDrillScenario[] {
  let pool = QUEEN_DRILL_SCENARIOS;
  if (excludeIds && excludeIds.size > 0) {
    pool = pool.filter((s) => !excludeIds.has(s.id));
  }
  // If we've exhausted the pool, reset
  if (pool.length === 0) pool = QUEEN_DRILL_SCENARIOS;
  // Shuffle and take N
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
