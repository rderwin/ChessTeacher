/**
 * Queen Gauntlet Patterns
 *
 * Each gauntlet is a multi-turn sequence — the bot plays a queen attack
 * over several moves, and the player responds to each one. Wrong moves
 * undo, correct moves advance the bot to its next move.
 */

export type ResponseQuality = "best" | "good" | "ok";

export interface GauntletResponse {
  san: string;
  quality: ResponseQuality;
  feedback: string;
}

export interface GauntletTurn {
  /** Brief context for what just happened (the bot's last move). */
  context: string;
  /** Optional warning highlighting the immediate threat. Only shown if a
   *  player makes a wrong move first — it's not a spoiler. */
  threat?: string;
  /** Acceptable player responses. Anything else counts as a mistake. */
  responses: GauntletResponse[];
  /** Generic feedback for any move not in the responses list. */
  fallbackFeedback: string;
  /** Bot's next move after the player plays correctly. Null if last turn. */
  botResponse: string | null;
  /** What the bot is trying to do with that response. */
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
    // Bot opens with 1.e4 — player responds first
    setupMoves: ["e4"],
    turns: [
      {
        context: "White just played 1.e4. Choose your response.",
        responses: [
          { san: "e5", quality: "best", feedback: "1...e5 — solid, classical. You fight for the center directly. This is what lets us learn the Scholar's Mate defense." },
          { san: "c5", quality: "ok", feedback: "1...c5 (Sicilian) is a great move generally, but it dodges the Scholar's Mate lesson. For this drill, play 1...e5." },
          { san: "e6", quality: "ok", feedback: "1...e6 (French) is solid but passive. For learning Scholar's Mate defense, 1...e5 is better." },
        ],
        fallbackFeedback: "Play 1...e5 to enter the position where Scholar's Mate happens.",
        botResponse: "Bc4",
        botExplanation: "White plays 2.Bc4 — the Italian Bishop. It's already eyeing f7 (your weakest square). The Scholar's Mate plan is starting.",
      },
      {
        context: "White played 2.Bc4 — eyeing f7. Develop normally.",
        responses: [
          { san: "Nc6", quality: "best", feedback: "2...Nc6 — develops a piece AND defends e5. Perfectly natural." },
          { san: "Nf6", quality: "good", feedback: "2...Nf6 attacks e4 and develops. Solid alternative." },
          { san: "Bc5", quality: "good", feedback: "2...Bc5 — mirrors White's setup. The Italian Game line." },
        ],
        fallbackFeedback: "Develop a piece. 2...Nc6 is the standard move — it defends e5 and develops the knight.",
        botResponse: "Qh5",
        botExplanation: "White plays 3.Qh5! The Scholar's Mate move. The queen and bishop both aim at f7 — Qxf7# is checkmate!",
      },
      {
        context: "3.Qh5 — the queen threatens Qxf7# checkmate. STOP THE MATE.",
        threat: "Qxf7# is checkmate! The queen on h5 takes f7 supported by the bishop on c4.",
        responses: [
          { san: "g6", quality: "best", feedback: "g6! Perfect — blocks the queen's path to f7 AND attacks the queen. White must retreat." },
          { san: "Qe7", quality: "good", feedback: "Qe7 defends f7 but blocks your bishop. g6 is sharper because it forces the queen to move." },
          { san: "Qf6", quality: "ok", feedback: "Qf6 defends f7 but blocks your knight from f6. Playable but cramped — g6 is cleaner." },
        ],
        fallbackFeedback: "f7 is about to be CHECKMATED. You need to physically block the queen's path or defend f7 directly. The cleanest move is g6.",
        botResponse: "Qf3",
        botExplanation: "White retreats to Qf3 — still threatening Qxf7# (queen + bishop battery). Don't relax!",
      },
      {
        context: "Qf3 — same threat from a new angle. Defend f7 again.",
        threat: "Qxf7# is STILL the threat — queen on f3 attacks f7, supported by the bishop.",
        responses: [
          { san: "Nf6", quality: "best", feedback: "Nf6! Develops AND defends f7 by blocking the queen's diagonal. Now the queen has nothing." },
          { san: "Qf6", quality: "ok", feedback: "Qf6 defends but offers a queen trade. Nf6 is better — it develops and defends." },
        ],
        fallbackFeedback: "f7 is still under fire. Block the queen's path to f7 — Nf6 develops AND defends. That's the best move.",
        botResponse: "Nc3",
        botExplanation: "White finally develops a piece. The Scholar's Mate is dead — now you have a great position because White wasted moves on the queen.",
      },
      {
        context: "Nc3 — White's threat is gone. Time to capitalize on your development lead.",
        responses: [
          { san: "Bc5", quality: "best", feedback: "Bc5 develops actively and points at f2. You have full development, White wasted moves on the queen — you're winning the opening!" },
          { san: "d6", quality: "good", feedback: "d6 supports e5 and opens the bishop. Solid." },
          { san: "Bb4", quality: "good", feedback: "Bb4 pins the knight to the queen — sharp move!" },
          { san: "h6", quality: "ok", feedback: "h6 prepares g5 if needed but is slow. More active development is better." },
        ],
        fallbackFeedback: "Develop a piece actively. Bc5 is the most natural move — develops and attacks f2.",
        botResponse: null,
      },
    ],
    conclusion:
      "You survived the Scholar's Mate! The key lesson: g6 stops Qh5+Bc4 mate, then Nf6 stops Qf3+Bc4 mate. Once the queen retreats, you have a development lead because White wasted moves on the queen.",
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
        context: "1.e4 — choose your response.",
        responses: [
          { san: "e5", quality: "best", feedback: "1...e5 — fight for the center. This sets up the Wayward Queen scenario." },
          { san: "c5", quality: "ok", feedback: "1...c5 is a great Sicilian but it bypasses this drill. Play 1...e5." },
        ],
        fallbackFeedback: "Play 1...e5 to enter the Wayward Queen line.",
        botResponse: "Qh5",
        botExplanation: "White plays 2.Qh5?! — bringing the queen out way too early. Threatens Qxe5+ but no mate yet (no bishop on c4).",
      },
      {
        context: "2.Qh5?! threatens to take e5 with check, but it's an over-eager move. Develop calmly.",
        threat: "Qxe5+ wins the e5 pawn with check. Defend the pawn.",
        responses: [
          { san: "Nc6", quality: "best", feedback: "Nc6! Defends e5 AND develops a piece. Without a bishop on c4, there's no mate threat — just develop." },
          { san: "Nf6", quality: "good", feedback: "Nf6 attacks the queen, but Qxe5+ wins your pawn with check (and you lose castling). Nc6 is better." },
          { san: "g6", quality: "ok", feedback: "g6 chases the queen but isn't necessary — there's no mate threat. Nc6 develops while defending." },
        ],
        fallbackFeedback: "e5 is hanging — defend it. The simple move is Nc6: defends e5 and develops a knight.",
        botResponse: "Bc4",
        botExplanation: "Now White brings out the bishop — Bc4. Queen on h5, bishop on c4 — that's the Scholar's Mate battery! Watch f7!",
      },
      {
        context: "Bc4! Now the Scholar's Mate threat is REAL. Defend f7 or get mated.",
        threat: "Qxf7# is checkmate! Queen on h5, bishop on c4 — both attacking f7.",
        responses: [
          { san: "g6", quality: "best", feedback: "g6! Blocks the queen's path to f7 perfectly. Forces White's queen to retreat." },
          { san: "Qe7", quality: "good", feedback: "Qe7 defends f7 with your queen. g6 is more active — kicks the queen back." },
        ],
        fallbackFeedback: "f7 is about to be checkmated! You MUST block the queen's path. g6 is the answer.",
        botResponse: "Qf3",
        botExplanation: "White retreats to Qf3 — still threatening f7 from a new angle.",
      },
      {
        context: "Qf3 keeps the f7 pressure with the bishop on c4.",
        threat: "Qxf7# is still threatened — queen + bishop both target f7.",
        responses: [
          { san: "Nf6", quality: "best", feedback: "Nf6! Develops AND defends f7 by blocking the diagonal. The attack is dead." },
        ],
        fallbackFeedback: "Block the queen's path to f7. Nf6 develops the knight AND defends.",
        botResponse: "Ne2",
        botExplanation: "White plays a passive Ne2. You've completely defused the queen attack!",
      },
      {
        context: "Ne2 — White's plan failed. You have a development lead.",
        responses: [
          { san: "Bc5", quality: "best", feedback: "Bc5 — actively developed, eyeing f2. You're better here because White wasted three moves on the queen." },
          { san: "d6", quality: "good", feedback: "d6 supports e5 and opens the bishop. Solid." },
          { san: "Bb4", quality: "ok", feedback: "Bb4 develops but Bc5 is more active." },
        ],
        fallbackFeedback: "Develop actively — you're ahead in development. Bc5 is the strongest move.",
        botResponse: null,
      },
    ],
    conclusion:
      "Wayward Queen defused! Key idea: when the queen comes out without bishop support, just develop normally (Nc6 defends e5 perfectly). When the bishop comes to c4, play g6 to block, then Nf6 to fully develop. The queen wastes tempos and you get a winning opening.",
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
        context: "Open the game.",
        responses: [
          { san: "e4", quality: "best", feedback: "1.e4 — the king pawn opening. This sets up the Scandinavian." },
          { san: "d4", quality: "ok", feedback: "1.d4 is fine but it skips the Scandinavian lesson. Play 1.e4." },
        ],
        fallbackFeedback: "Play 1.e4 to enter the Scandinavian.",
        botResponse: "d5",
        botExplanation: "Black plays the Scandinavian — 1...d5, attacking your e-pawn directly.",
      },
      {
        context: "1...d5 — Black challenges your e-pawn. Capture it.",
        responses: [
          { san: "exd5", quality: "best", feedback: "exd5 — take the pawn. Now Black has to recapture, and they often do it with the queen." },
          { san: "e5", quality: "ok", feedback: "e5 advances but isn't as forcing. Taking the pawn is more direct." },
          { san: "Nc3", quality: "ok", feedback: "Nc3 lets Black exchange on e4. Just take the pawn with exd5 — simpler." },
        ],
        fallbackFeedback: "Capture the d5 pawn — exd5 is the principled move.",
        botResponse: "Qxd5",
        botExplanation: "Black recaptures with the queen — Qxd5! The queen is now in the center, exposed to attack.",
      },
      {
        context: "Black's queen is in the center on d5. Punish it!",
        responses: [
          { san: "Nc3", quality: "best", feedback: "Nc3! Develops a piece AND attacks the queen. You gain a free tempo — Black MUST move the queen again." },
          { san: "Nf3", quality: "good", feedback: "Nf3 develops but doesn't attack the queen. Nc3 is the textbook move — develop with tempo." },
          { san: "d4", quality: "ok", feedback: "d4 grabs the center but doesn't attack the queen. Nc3 develops AND attacks." },
        ],
        fallbackFeedback: "Develop a piece that attacks the queen. Nc3 is perfect — develops AND forces the queen to move.",
        botResponse: "Qa5",
        botExplanation: "Black's queen retreats to Qa5 — still active but out of the center.",
      },
      {
        context: "Qa5 — the queen is on the side now. Build your center.",
        responses: [
          { san: "d4", quality: "best", feedback: "d4! Build the perfect center. You have Nc3 already — d4 grabs space and you'll castle quickly. Black is way behind." },
          { san: "Nf3", quality: "good", feedback: "Nf3 develops naturally. d4 is slightly better — claim the center while Black is undeveloped." },
          { san: "Bc4", quality: "good", feedback: "Bc4 is active but d4 first claims the center." },
        ],
        fallbackFeedback: "Grab the center with d4 while Black is busy with their queen.",
        botResponse: "Nf6",
        botExplanation: "Black finally develops a piece — Nf6.",
      },
      {
        context: "Nf6 develops Black. Continue developing your perfect setup.",
        responses: [
          { san: "Nf3", quality: "best", feedback: "Nf3 — develops the second knight. Two knights, big center, queen still wandering. You're winning." },
          { san: "Bc4", quality: "good", feedback: "Bc4 develops the bishop actively. Nf3 first is slightly better but Bc4 is fine." },
          { san: "Bd2", quality: "good", feedback: "Bd2 develops AND attacks the queen on a5! The queen will have to move AGAIN." },
        ],
        fallbackFeedback: "Develop another piece. Nf3 is the most natural follow-up.",
        botResponse: null,
      },
    ],
    conclusion:
      "Beautiful Scandinavian punishment! Key pattern: when an opponent's queen is in the center, develop pieces that ATTACK it. Each time the queen moves, you get a free developing move. Build your center with d4, develop both knights, and Black is way behind.",
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
        context: "Open the game.",
        responses: [
          { san: "e4", quality: "best", feedback: "1.e4 — classical king pawn opening." },
          { san: "d4", quality: "ok", feedback: "d4 is solid but for this lesson play 1.e4." },
        ],
        fallbackFeedback: "Play 1.e4 to enter the line.",
        botResponse: "e5",
        botExplanation: "Black mirrors with 1...e5.",
      },
      {
        context: "1...e5 — develop a piece.",
        responses: [
          { san: "Nf3", quality: "best", feedback: "Nf3! Attacks e5 and develops the knight to its best square." },
          { san: "Nc3", quality: "good", feedback: "Nc3 develops but Nf3 is more active — it puts immediate pressure on e5." },
          { san: "Bc4", quality: "good", feedback: "Bc4 develops the bishop early. Nf3 is more flexible." },
        ],
        fallbackFeedback: "Develop a piece. Nf3 is the most natural — develops AND attacks e5.",
        botResponse: "Qf6",
        botExplanation: "Black plays 2...Qf6?! — defending e5 with the queen. But this BLOCKS their own knight from f6 (its best square)!",
      },
      {
        context: "2...Qf6 is awkward — Black's queen blocks their own knight. Develop normally and let the queen be a liability.",
        responses: [
          { san: "Nc3", quality: "best", feedback: "Nc3! Develops naturally. Don't trade queens — Black's queen on f6 is BLOCKING their own development. The longer it sits there, the better for you." },
          { san: "Bc4", quality: "best", feedback: "Bc4! Develops actively, eyeing f7. Black's awkward queen makes their development hard." },
          { san: "d4", quality: "good", feedback: "d4 challenges the center directly. Black's queen on f6 makes ...exd4 awkward." },
        ],
        fallbackFeedback: "Develop a piece. Don't trade queens — Black's misplaced queen helps YOU.",
        botResponse: "Nge7",
        botExplanation: "Black has to develop the knight to e7 (the awkward square) because f6 is blocked by the queen. Their position is already cramped.",
      },
      {
        context: "Nge7 — Black's knight is passive. Continue developing.",
        responses: [
          { san: "Bc4", quality: "best", feedback: "Bc4 — eyes f7, develops actively. Black's awkward setup makes everything hard for them." },
          { san: "d4", quality: "good", feedback: "d4 grabs the center. Black has to deal with central pressure on top of their awkward queen." },
          { san: "Be2", quality: "ok", feedback: "Be2 develops the bishop but Bc4 is more active — eyes f7." },
        ],
        fallbackFeedback: "Develop a piece. Bc4 is excellent — eyes f7 and develops actively.",
        botResponse: "Nbc6",
        botExplanation: "Black slowly develops the other knight. They're way behind.",
      },
      {
        context: "Nbc6 — Black has both knights out but everything is awkward. Castle and dominate.",
        responses: [
          { san: "O-O", quality: "best", feedback: "O-O — castle! Your king is safe, your rook is connected, and Black's awkward queen still hangs around. You're clearly better." },
          { san: "d4", quality: "good", feedback: "d4 challenges the center but castling first is safer — get the king tucked away before opening the position." },
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

/** Pick N random gauntlets without repeats. */
export function pickRandomGauntlets(count: number): QueenGauntlet[] {
  const shuffled = [...QUEEN_GAUNTLETS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
