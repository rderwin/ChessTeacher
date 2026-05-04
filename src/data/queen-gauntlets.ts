/**
 * Queen Gauntlet Patterns
 *
 * Each gauntlet is a multi-turn lesson — the bot plays a queen attack over
 * several moves and the player responds to each one.
 *
 * IMPORTANT: only the "best" response per turn advances the gauntlet,
 * because the bot's next move is scripted and only makes sense after the
 * canonical line. Other recognized responses get specific feedback but
 * undo — the player retries with the canonical move. This avoids the
 * "bot plays a now-blundering scripted move" problem that happens if
 * deviations advance the script.
 *
 * On the LAST turn (botResponse: null), any "best" or "good" or "ok"
 * response completes the gauntlet — the lesson's done so flexibility
 * is fine.
 */

export type ResponseQuality = "best" | "good" | "ok";

export interface GauntletResponse {
  san: string;
  quality: ResponseQuality;
  feedback: string;
}

export interface GauntletTurn {
  /** Brief context for what just happened. Shown when the turn starts. */
  context: string;
  /** Acceptable player responses. */
  responses: GauntletResponse[];
  /** Generic feedback for moves not in the responses list. */
  fallbackFeedback: string;
  /** Bot's next move after the player plays the BEST response.
   *  Null on the last turn — any acceptable response ends the gauntlet. */
  botResponse: string | null;
  /** What the bot's next move means and why it continues the attack. */
  botExplanation?: string;
}

export interface QueenGauntlet {
  id: string;
  name: string;
  description: string;
  playerColor: "white" | "black";
  /** Auto-played to reach the start of the gauntlet. */
  setupMoves: string[];
  /** Each turn = one player decision + one bot response (or last turn). */
  turns: GauntletTurn[];
  /** Final summary shown when the gauntlet ends. */
  conclusion: string;
}

export const QUEEN_GAUNTLETS: QueenGauntlet[] = [
  {
    id: "scholars-mate-classic",
    name: "Scholar's Mate",
    description:
      "White is going for the classic 4-move checkmate. Defend f7 and punish the early queen.",
    playerColor: "black",
    setupMoves: ["e4"],
    turns: [
      {
        context: "White just played 1.e4. Play 1...e5 to enter the Scholar's Mate position.",
        responses: [
          { san: "e5", quality: "best", feedback: "1...e5 — fight for the center. This is the position where Scholar's Mate happens." },
          { san: "c5", quality: "good", feedback: "1...c5 (Sicilian) is great in real games, but it bypasses Scholar's Mate. Play 1...e5 to learn the defense." },
          { san: "e6", quality: "good", feedback: "1...e6 (French) is fine but doesn't lead to Scholar's Mate. Play 1...e5 for this drill." },
          { san: "Nf6", quality: "good", feedback: "1...Nf6 (Alekhine's) is interesting but skips the lesson. Play 1...e5 here." },
        ],
        fallbackFeedback: "For this drill, play 1...e5 — that's the position where Scholar's Mate is set up.",
        botResponse: "Bc4",
        botExplanation: "White plays 2.Bc4 — the Italian Bishop. It's eyeing f7 (your weakest square). Scholar's Mate is starting.",
      },
      {
        context: "White played 2.Bc4 — eyeing f7. Develop with Nc6 to defend e5.",
        responses: [
          { san: "Nc6", quality: "best", feedback: "2...Nc6 — develops AND defends e5. Now we're in the position where 3.Qh5 becomes dangerous." },
          { san: "Nf6", quality: "good", feedback: "2...Nf6 is actually a solid alternative (it would block the Scholar's Mate later). But for THIS drill, play 2...Nc6 — that's the position where the mate threat is real." },
          { san: "Bc5", quality: "good", feedback: "2...Bc5 (the main Italian line) is fine but skips the Scholar's Mate position. Play 2...Nc6 to face the queen attack." },
          { san: "d6", quality: "ok", feedback: "2...d6 is passive. Develop a knight — play 2...Nc6." },
        ],
        fallbackFeedback: "Play 2...Nc6 to develop AND defend e5. Then White will try Scholar's Mate.",
        botResponse: "Qh5",
        botExplanation: "White plays 3.Qh5! The Scholar's Mate move. Queen + bishop both aim at f7 — Qxf7# is checkmate!",
      },
      {
        context: "3.Qh5 — checkmate threat on f7. STOP THE MATE.",
        responses: [
          { san: "g6", quality: "best", feedback: "g6! Perfect — blocks the queen's path to f7 AND attacks the queen. White must retreat." },
          { san: "Qe7", quality: "good", feedback: "Qe7 defends f7 but blocks your bishop. The clean answer is g6 — it forces the queen to move." },
          { san: "Qf6", quality: "ok", feedback: "Qf6 defends f7 but blocks your knight from f6 (its best square). g6 is the cleaner defense." },
          { san: "Nf6", quality: "good", feedback: "Nf6 is actually a brilliant defense in real games — it blocks the queen's path AND defends f7. But for THIS drill, play g6 to learn the queen-chasing tempo move (g6 attacks the queen)." },
          { san: "Nh6", quality: "ok", feedback: "Nh6 defends f7 but the knight is bad on the rim. g6 is much better." },
        ],
        fallbackFeedback: "f7 is about to be checkmated! Block the queen's path with g6 — it also attacks the queen.",
        botResponse: "Qf3",
        botExplanation: "White retreats to Qf3 — same threat from a different angle (queen + bishop still target f7).",
      },
      {
        context: "Qf3 — same f7 threat. Defend again.",
        responses: [
          { san: "Nf6", quality: "best", feedback: "Nf6! Develops AND defends f7 by blocking the diagonal. The mate threat is dead." },
          { san: "Qf6", quality: "good", feedback: "Qf6 defends and offers a queen trade. Nf6 is better — it develops AND defends." },
          { san: "Nh6", quality: "ok", feedback: "Nh6 defends but the knight is awkward. Nf6 is much stronger." },
        ],
        fallbackFeedback: "The f7 threat is still live. Block the queen's path with Nf6 — develops the knight too.",
        botResponse: "Nc3",
        botExplanation: "White finally develops a piece. The Scholar's Mate is dead — and you have a development lead because White wasted moves on the queen.",
      },
      {
        context: "Nc3 — Scholar's Mate failed. Develop actively to use your lead.",
        responses: [
          { san: "Bc5", quality: "best", feedback: "Bc5 — develops actively, eyes f2. You're winning the opening because White wasted moves on the queen." },
          { san: "d6", quality: "good", feedback: "d6 supports e5 and opens the bishop. Solid finish." },
          { san: "Bb4", quality: "good", feedback: "Bb4 pins the knight to the queen — sharp move!" },
          { san: "Be7", quality: "ok", feedback: "Be7 develops passively. Bc5 is more active." },
          { san: "h6", quality: "ok", feedback: "h6 is too slow — develop a piece. Bc5 is the most active option." },
        ],
        fallbackFeedback: "Develop a piece. Bc5 is the most natural — develops actively and points at f2.",
        botResponse: null,
      },
    ],
    conclusion:
      "Scholar's Mate defused! Pattern: g6 stops Qh5+Bc4 mate, then Nf6 stops Qf3+Bc4 mate. Once the queen retreats, you have a development lead because White wasted three moves on the queen.",
  },
  {
    id: "wayward-queen-classic",
    name: "Wayward Queen",
    description:
      "White brings the queen out on move 2 (no bishop yet). Defend smartly without panicking.",
    playerColor: "black",
    setupMoves: ["e4"],
    turns: [
      {
        context: "1.e4 — play 1...e5 to face the Wayward Queen.",
        responses: [
          { san: "e5", quality: "best", feedback: "1...e5 — fight for the center. This sets up the Wayward Queen scenario." },
          { san: "c5", quality: "good", feedback: "1...c5 (Sicilian) is excellent generally but bypasses this drill. Play 1...e5." },
          { san: "Nf6", quality: "good", feedback: "1...Nf6 (Alekhine's) is interesting but skips the lesson. Play 1...e5." },
        ],
        fallbackFeedback: "Play 1...e5 to enter the Wayward Queen position.",
        botResponse: "Qh5",
        botExplanation: "White plays 2.Qh5?! — bringing the queen out way too early. Threatens Qxe5+ but no mate yet (no bishop on c4).",
      },
      {
        context: "2.Qh5?! threatens to take e5 with check, but no mate threat. Defend e5 calmly.",
        responses: [
          { san: "Nc6", quality: "best", feedback: "Nc6! Defends e5 AND develops. Without a bishop on c4, there's no mate threat — just develop." },
          { san: "Nf6", quality: "good", feedback: "Nf6 attacks the queen, but Qxe5+ wins your pawn with check (you lose castling). Nc6 is safer." },
          { san: "g6", quality: "good", feedback: "g6 chases the queen but isn't necessary — there's no mate threat. Nc6 develops while defending." },
          { san: "d6", quality: "ok", feedback: "d6 defends e5 but doesn't develop. Nc6 does both." },
        ],
        fallbackFeedback: "e5 is hanging — defend it. Nc6 defends AND develops a knight.",
        botResponse: "Bc4",
        botExplanation: "Now White brings out the bishop — Bc4. Queen on h5 + bishop on c4 = the Scholar's Mate battery! Watch f7!",
      },
      {
        context: "Bc4! Now the Scholar's Mate threat is REAL.",
        responses: [
          { san: "g6", quality: "best", feedback: "g6! Blocks the queen's path to f7 perfectly. White must retreat." },
          { san: "Qe7", quality: "good", feedback: "Qe7 defends f7 but blocks your bishop. g6 is more active — kicks the queen back." },
          { san: "Qf6", quality: "ok", feedback: "Qf6 defends but blocks your knight from f6. g6 is the cleaner defense." },
        ],
        fallbackFeedback: "f7 is about to be checkmated! Block the queen's path with g6.",
        botResponse: "Qf3",
        botExplanation: "White retreats to Qf3 — still threatening f7 from a new angle.",
      },
      {
        context: "Qf3 keeps the f7 pressure with the bishop on c4.",
        responses: [
          { san: "Nf6", quality: "best", feedback: "Nf6! Develops AND blocks the queen's diagonal to f7. The attack is dead." },
          { san: "Qf6", quality: "good", feedback: "Qf6 defends and offers a queen trade. Nf6 is better — develops AND defends." },
        ],
        fallbackFeedback: "Block the queen's path to f7. Nf6 develops the knight AND defends.",
        botResponse: "Ne2",
        botExplanation: "White plays a passive Ne2. You've completely defused the queen attack!",
      },
      {
        context: "Ne2 — White's plan failed. Develop actively.",
        responses: [
          { san: "Bc5", quality: "best", feedback: "Bc5 — actively developed, eyeing f2. You're better here." },
          { san: "d6", quality: "good", feedback: "d6 supports e5 and opens the bishop. Solid." },
          { san: "Bb4", quality: "ok", feedback: "Bb4 develops but Bc5 is more active." },
          { san: "Be7", quality: "ok", feedback: "Be7 is too passive — Bc5 is the active square." },
        ],
        fallbackFeedback: "Develop actively — Bc5 is strong, eyes f2.",
        botResponse: null,
      },
    ],
    conclusion:
      "Wayward Queen defused! Key idea: when the queen comes out without bishop support, just develop normally (Nc6 defends e5 perfectly). When the bishop joins on c4, play g6 to block, then Nf6 to fully develop.",
  },
  {
    id: "scandinavian-punish",
    name: "Punish the Scandinavian Queen",
    description:
      "Black plays the Scandinavian and recaptures with the queen. Punish their queen development with tempo moves.",
    playerColor: "white",
    setupMoves: [],
    turns: [
      {
        context: "Open the game with 1.e4.",
        responses: [
          { san: "e4", quality: "best", feedback: "1.e4 — the king pawn opening. This sets up the Scandinavian." },
          { san: "d4", quality: "good", feedback: "1.d4 is solid but it skips the Scandinavian lesson. Play 1.e4." },
        ],
        fallbackFeedback: "Play 1.e4 to enter the Scandinavian.",
        botResponse: "d5",
        botExplanation: "Black plays the Scandinavian — 1...d5, attacking your e-pawn directly.",
      },
      {
        context: "1...d5 — capture the pawn with exd5.",
        responses: [
          { san: "exd5", quality: "best", feedback: "exd5 — take the pawn. Now Black has to recapture, often with the queen." },
          { san: "e5", quality: "good", feedback: "e5 advances but Black can play c5 and you've avoided the Scandinavian. Take the pawn." },
          { san: "Nc3", quality: "good", feedback: "Nc3 lets Black exchange. Just take the pawn with exd5." },
        ],
        fallbackFeedback: "Capture the d5 pawn — exd5 is the principled move.",
        botResponse: "Qxd5",
        botExplanation: "Black recaptures with the queen — Qxd5! The queen is now in the center, exposed.",
      },
      {
        context: "Black's queen is in the center on d5. Punish it!",
        responses: [
          { san: "Nc3", quality: "best", feedback: "Nc3! Develops AND attacks the queen. Free tempo — Black MUST move the queen again." },
          { san: "Nf3", quality: "good", feedback: "Nf3 develops but doesn't attack the queen. Nc3 is the textbook move." },
          { san: "d4", quality: "ok", feedback: "d4 grabs the center but doesn't develop a piece. Nc3 develops AND attacks." },
        ],
        fallbackFeedback: "Develop a piece that ATTACKS the queen. Nc3 is perfect.",
        botResponse: "Qa5",
        botExplanation: "Black's queen retreats to Qa5 — still active but out of the center.",
      },
      {
        context: "Qa5 — build your center.",
        responses: [
          { san: "d4", quality: "best", feedback: "d4! Build the perfect center. You'll castle quickly. Black is way behind." },
          { san: "Nf3", quality: "good", feedback: "Nf3 develops naturally. d4 is slightly better — claim the center." },
          { san: "Bc4", quality: "good", feedback: "Bc4 is active but d4 first claims the center." },
        ],
        fallbackFeedback: "Grab the center with d4.",
        botResponse: "Nf6",
        botExplanation: "Black finally develops — Nf6.",
      },
      {
        context: "Nf6 — continue your perfect setup.",
        responses: [
          { san: "Nf3", quality: "best", feedback: "Nf3 — develops the second knight. Two knights, big center, queen still wandering. You're winning." },
          { san: "Bc4", quality: "good", feedback: "Bc4 develops actively. Nf3 first is slightly more natural." },
          { san: "Bd2", quality: "good", feedback: "Bd2 develops AND attacks the queen on a5! Very sharp." },
          { san: "Be2", quality: "ok", feedback: "Be2 develops but is passive. Nf3 is more central." },
        ],
        fallbackFeedback: "Develop another piece. Nf3 is the most natural — develops and supports d4.",
        botResponse: null,
      },
    ],
    conclusion:
      "Beautiful Scandinavian punishment! Pattern: when the opponent's queen is in the center, develop pieces that ATTACK it. Each forced queen retreat = a free tempo. Build d4 + Nc3 + Nf3 and Black is way behind.",
  },
  {
    id: "early-qf6-punish",
    name: "Punish Black's ...Qf6",
    description:
      "Black plays a misguided early ...Qf6 — the queen blocks their own knight. Build a development lead.",
    playerColor: "white",
    setupMoves: [],
    turns: [
      {
        context: "Open with 1.e4.",
        responses: [
          { san: "e4", quality: "best", feedback: "1.e4 — classical king pawn opening." },
          { san: "d4", quality: "good", feedback: "d4 is solid but for this lesson play 1.e4." },
        ],
        fallbackFeedback: "Play 1.e4 to enter the line.",
        botResponse: "e5",
        botExplanation: "Black mirrors with 1...e5.",
      },
      {
        context: "1...e5 — develop a piece that attacks e5.",
        responses: [
          { san: "Nf3", quality: "best", feedback: "Nf3! Attacks e5 and develops. This is what makes Black play Qf6 to defend." },
          { san: "Nc3", quality: "good", feedback: "Nc3 develops but doesn't attack e5 — Black has no reason to play Qf6. For this drill, play Nf3." },
          { san: "Bc4", quality: "good", feedback: "Bc4 develops the bishop early. For this drill (...Qf6 punishment), play Nf3 first to threaten e5." },
        ],
        fallbackFeedback: "Play Nf3 — it attacks e5 and provokes Black's awkward Qf6 defense.",
        botResponse: "Qf6",
        botExplanation: "Black plays 2...Qf6?! — defending e5 with the queen. But this BLOCKS their own knight from f6 (its best square)!",
      },
      {
        context: "2...Qf6 is awkward. Don't trade queens — let Black's queen be a liability.",
        responses: [
          { san: "Nc3", quality: "best", feedback: "Nc3! Develops naturally. Black's queen on f6 is BLOCKING their own development. Don't trade — let it stay there." },
          { san: "d4", quality: "good", feedback: "d4 challenges the center. Black's awkward queen makes ...exd4 awkward too. Solid." },
          { san: "Bc4", quality: "good", feedback: "Bc4 develops actively. Nc3 first is slightly more natural." },
          { san: "d3", quality: "ok", feedback: "d3 is too passive. Develop a piece — Nc3 is best." },
        ],
        fallbackFeedback: "Develop a piece. Nc3 is the most natural — don't trade queens, let Black's queen block their own development.",
        botResponse: "Nge7",
        botExplanation: "Black's knight has to go to e7 (awkward) because f6 is blocked by the queen. Their position is cramped.",
      },
      {
        context: "Nge7 — Black's knight is passive. Continue developing.",
        responses: [
          { san: "Bc4", quality: "best", feedback: "Bc4 — eyes f7, develops actively. Black's awkward setup makes everything hard for them." },
          { san: "d4", quality: "good", feedback: "d4 grabs the center. Black has to deal with central pressure on top of their awkward queen." },
          { san: "Be2", quality: "ok", feedback: "Be2 develops but Bc4 is more active — eyes f7." },
        ],
        fallbackFeedback: "Develop a piece actively. Bc4 is excellent — eyes f7 and develops.",
        botResponse: "Nbc6",
        botExplanation: "Black slowly develops the other knight. They're way behind.",
      },
      {
        context: "Nbc6 — Black has both knights out but everything is awkward. Castle.",
        responses: [
          { san: "O-O", quality: "best", feedback: "O-O — castle! King safe, rook connected. Black's awkward queen still hangs around. You're clearly better." },
          { san: "d4", quality: "good", feedback: "d4 challenges the center but castling first is safer." },
          { san: "Nd5", quality: "good", feedback: "Nd5! Forces the queen to move yet again — annoying for Black." },
        ],
        fallbackFeedback: "Castle to get your king safe — O-O.",
        botResponse: null,
      },
    ],
    conclusion:
      "When the opponent's queen is misplaced (like Qf6 blocking their own knight), don't trade queens — let it stay there as a liability. Just develop normally and you'll have a permanent advantage.",
  },
];

export function pickRandomGauntlets(count: number): QueenGauntlet[] {
  const shuffled = [...QUEEN_GAUNTLETS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
