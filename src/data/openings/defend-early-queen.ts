import { OpeningLine } from "../types";

export const defendEarlyQueen: OpeningLine = {
  id: "defend-early-queen",
  name: "Defending the Early Queen",
  fullName: "Complete Guide to Defending Early Queen Attacks",
  eco: "C20",
  playerColor: "black",
  level: "beginner",
  description:
    "Every beginner's nightmare: your opponent brings the queen out early, threatens your f7 pawn, and you panic. This lesson teaches the correct defensive patterns against Scholar's Mate, the Wayward Queen, and every variation in between.",
  history: {
    origin:
      "Early queen attacks have existed as long as chess itself. Scholar's Mate was documented by Francesc Vicent in 1495 — over 500 years ago. It's the #1 trap that catches beginners, and the defensive patterns have been refined by teachers ever since.",
    nameExplanation:
      "Called 'Scholar's Mate' because it was seen as the kind of thing a beginning student ('scholar') would fall for. The 'Wayward Queen' name describes the queen wandering into enemy territory without support. Both share the same theme: premature queen deployment.",
    popularity:
      "You WILL face this constantly below 1000 rating. Probably the single most common thing beginners lose to. Learning the defense turns these into free wins — an early queen is a mistake by White, not a threat.",
    bestFor:
      "Every beginner who's lost to Qh5 or Qf3 and doesn't know why. Teaches the core defensive principle: defend WITH pieces that also attack the queen. Develop, don't panic.",
    famousPlayers: ["Ben Finegold (teaches this every stream)", "Every chess coach ever"],
  },
  moves: [
    {
      san: "e4",
      color: "white",
      why: "White plays the most popular first move, claiming the center.",
      concepts: ["center-control", "development"],
    },
    {
      san: "e5",
      color: "black",
      why: "The classical response — claim equal central space. This is the starting point for most early queen attacks because it keeps the position open and the f7 square is only defended by the king.",
      concepts: ["center-control"],
      commonMistakes: [
        {
          san: "e6",
          whyBad:
            "The French Defense avoids early queen attacks somewhat, but also blocks your bishop. Against beginners, e5 is fine — they'll blunder the attack away. Learn to defend, don't hide.",
        },
        {
          san: "c5",
          whyBad:
            "The Sicilian is complex and has its own theory. For defending against early queen attacks, e5 gives you the cleanest patterns to learn. Master this first, then branch out.",
        },
      ],
    },
    {
      san: "Bc4",
      color: "white",
      why: "White develops the bishop aiming at f7. This is part of the Scholar's Mate setup — the bishop and queen will both target f7, where only the king defends.",
      concepts: ["development", "attack"],
    },
    {
      san: "Nc6",
      color: "black",
      why: "Develop the knight to defend e5 and control the center. Don't worry about the bishop yet — just develop naturally. The knight on c6 is a strong defensive piece that will also support counter-attacks.",
      concepts: ["development", "center-control"],
      commonMistakes: [
        {
          san: "Nf6",
          whyBad:
            "Developing the king's knight first LOOKS good, but it doesn't defend e5. White could play Ng5 targeting f7 with tempo. Nc6 defends e5 AND develops — always prefer moves that do two things.",
        },
        {
          san: "Bc5",
          whyBad:
            "Developing the bishop BEFORE defending e5 is risky — White could play Nf3 attacking your pawn, forcing you to scramble. Nc6 defends e5 first, then you can develop pieces.",
        },
        {
          san: "d6",
          whyBad:
            "d6 defends e5 with a pawn, which is passive and blocks your own bishop. Nc6 does the same defensive job AND develops a piece. Pieces are better defenders than pawns.",
        },
      ],
    },
    {
      san: "Qh5",
      color: "white",
      why: "SCHOLAR'S MATE SETUP! White brings the queen out threatening Qxf7# — the bishop on c4 supports the queen, so f7 is under double attack. This is the trap that catches thousands of beginners. But it's a BLUFF — Black has a clear defense.",
      concepts: ["attack"],
      controls: "f7 square with bishop support",
      prevents: "Nothing — the queen is actually vulnerable",
    },
    {
      san: "g6",
      color: "black",
      why: "THE KEY DEFENSIVE MOVE. g6 does TWO critical things: (1) it attacks the queen, forcing it to move, and (2) it blocks the diagonal to f7. The queen can't take f7 anymore because the pawn on g6 is in the way. This single move defuses the entire Scholar's Mate threat.",
      concepts: ["development", "attack", "king-safety"],
      controls: "Attacks Qh5, blocks f7 diagonal",
      prevents: "Qxf7 mate threat",
      commonMistakes: [
        {
          san: "Nf6",
          whyBad:
            "DISASTER! Nf6 attacks the queen BUT White plays Qxf7# — CHECKMATE! The knight on f6 blocks your king's escape, the bishop on c4 supports the queen, and the f7 pawn was only defended by the king. This is EXACTLY how Scholar's Mate works. NEVER play Nf6 here.",
        },
        {
          san: "Qe7",
          whyBad:
            "Qe7 defends f7 but blocks your bishop and puts your queen on a passive square. You're defending TOO MUCH. g6 is active — it attacks the queen AND defends f7 at the same time. Active defense beats passive defense.",
        },
        {
          san: "Qf6",
          whyBad:
            "Qf6 defends f7 but develops YOUR queen early — the same mistake you're trying to avoid! Now your queen is the target. g6 defends with a pawn that was going to move anyway and doesn't expose anything.",
        },
        {
          san: "d6",
          whyBad:
            "d6 doesn't defend f7 at all! The queen still takes f7 and it's checkmate. g6 is the ONLY active defense that both attacks the queen and blocks the diagonal to f7.",
        },
      ],
    },
    {
      san: "Qf3",
      color: "white",
      why: "White retreats the queen to f3, still eyeing f7. But now you've gained a tempo — White spent two moves on the queen while you've developed. The threat is still there but you can defuse it.",
      concepts: ["attack"],
    },
    {
      san: "Nf6",
      color: "black",
      why: "NOW Nf6 is safe and strong! The queen is on f3, not h5, so Qxf7 isn't mate anymore (there's no discovered attack and your king has escape squares). More importantly, Nf6 attacks the queen AGAIN, forcing it to move a third time. Every move you make develops while White keeps wasting tempo.",
      concepts: ["development", "attack", "tempo"],
      controls: "Attacks Qf3, controls e4 and d5",
      commonMistakes: [
        {
          san: "Qe7",
          whyBad:
            "Defending f7 passively with the queen is wrong — now YOUR queen is stuck on a bad square. Nf6 attacks White's queen AND develops. Always prefer active development over passive defense when you can.",
        },
        {
          san: "Bc5",
          whyBad:
            "Bc5 develops but doesn't attack the queen. Nf6 forces the queen to move AGAIN, gaining another tempo. Keep chasing the queen — every queen move is a move White isn't developing pieces.",
        },
        {
          san: "d6",
          whyBad:
            "d6 is too slow. Nf6 is the sharpest move — it attacks the queen, defends e4, and develops a piece. When you can gain a tempo by attacking an enemy piece, DO IT.",
        },
      ],
    },
    {
      san: "Qb3",
      color: "white",
      why: "The queen runs again, this time to b3 where it still eyes f7 (together with Bc4). White is desperate — three queen moves, zero minor pieces developed besides the bishop.",
      concepts: ["attack"],
    },
    {
      san: "Nd4",
      color: "black",
      why: "The knight leaps to d4, attacking the queen ONCE AGAIN! This also threatens Nxc2+ forking the rook. White is forced to react — you've turned their attack into your attack. Counting: White has made 3 queen moves + 1 bishop move = 4 moves, 1 piece developed. You've made 3 developing moves. You're winning.",
      concepts: ["attack", "piece-activity", "tempo"],
      commonMistakes: [
        {
          san: "Qe7",
          whyBad:
            "Defending f7 for the third time is too passive. Nd4 is the KILLER move — it attacks the queen AND threatens Nxc2+ winning material. When you can counter-attack, always prefer that to defense.",
        },
        {
          san: "O-O",
          whyBad:
            "Castling is good in general but Nd4 is more forcing. It attacks the queen and creates concrete threats. Castle next move after White deals with the knight. Priority: active moves first, then king safety.",
        },
        {
          san: "d6",
          whyBad:
            "d6 is passive. You have a chance to launch a tactical counter-attack with Nd4 — don't waste it. The queen on b3 is exposed and the knight jump creates multiple threats.",
        },
      ],
    },
    {
      san: "Qd3",
      color: "white",
      why: "White retreats AGAIN to defend c2. That's four queen moves! Meanwhile your position is active and coordinated. The 'attack' has turned into a retreat.",
      concepts: ["tempo"],
    },
    {
      san: "d5",
      color: "black",
      why: "Strike the center while White is unorganized. You attack the bishop on c4 and claim central space. White is so far behind in development they can barely cope.",
      concepts: ["center-control", "attack"],
      commonMistakes: [
        {
          san: "Nxc2+",
          whyBad:
            "Grabbing the rook looks tempting but you're losing a knight for a rook — a small gain. d5 is MUCH stronger: it attacks the bishop AND opens your position with a commanding development lead. Strategy beats tactics here.",
        },
        {
          san: "O-O",
          whyBad:
            "Castling is fine but d5 is more aggressive. You're winning — press the advantage! When you have a huge development lead, open the position to maximize your piece activity.",
        },
      ],
    },
    {
      san: "Bxd5",
      color: "white",
      why: "White takes the pawn, but it's a trap...",
      concepts: ["center-control"],
    },
    {
      san: "Nxd5",
      color: "black",
      why: "Recapture with the knight, landing on a dominant central square. Your position is now completely winning — you have three developed pieces, a central knight, and White's queen is STILL running around. This is the reward for correct defense against the early queen.",
      concepts: ["center-control", "piece-activity"],
      commonMistakes: [
        {
          san: "exd5",
          whyBad:
            "Recapturing with the e-pawn is OK but the knight on d5 is MUCH more active than a pawn. Pieces in the center are worth their weight in gold. Always prefer a centralized piece to a pawn when you have the choice.",
        },
      ],
    },
  ],
  summary:
    "The GOLDEN RULE for defending early queen attacks: DON'T PANIC. The queen alone is powerful but not a winning force. Every move you make should develop a piece, and ideally ALSO attack the queen. Scholar's Mate is stopped with g6 (attacks queen + blocks f7 diagonal). After that, Nf6 attacks the queen again. Keep developing, keep chasing the queen, and watch your opponent waste move after move while you build a winning position. The punishment for early queen play is automatic — just develop correctly and you win.",
  variants: [
    {
      id: "wayward-queen-2nd-move",
      name: "Wayward Queen (2.Qh5)",
      description: "White skips the bishop and plays Qh5 on move 2. Even worse for White — no bishop support means no mate threat yet.",
      branchesAt: 2,
      opponentMove: {
        san: "Qh5",
        color: "white",
        why: "The Wayward Queen Attack. White brings the queen out on move 2 threatening Qxe5+ and eventually Qxf7+. This is MORE desperate than Scholar's Mate — there's no bishop supporting the queen yet. Easy to defend.",
        concepts: ["attack"],
      },
      moves: [
        {
          san: "Nc6",
          color: "black",
          why: "Defend e5 with the knight. The queen is threatening Qxe5, so defend the pawn while developing. Nc6 is perfect — it defends AND develops a piece. Don't panic and push pawns to stop the queen — just develop.",
          concepts: ["development", "center-control"],
          commonMistakes: [
            {
              san: "g6",
              whyBad:
                "g6 attacks the queen but LEAVES e5 HANGING! After Qxe5+, you lose the pawn AND your queen gets exposed defending it. Defend e5 first with Nc6, THEN think about chasing the queen.",
            },
            {
              san: "Qe7",
              whyBad:
                "Defending e5 with your queen is passive and bad. You're bringing YOUR queen out early to stop White's queen — you're making the same mistake! Use a piece (Nc6) to defend, not your queen.",
            },
            {
              san: "d6",
              whyBad:
                "d6 defends e5 with a pawn, which is passive. Nc6 is much better — it defends AND develops a knight to its best square. Always prefer piece defense over pawn defense.",
            },
          ],
        },
        {
          san: "Bc4",
          color: "white",
          why: "White adds the bishop to attack f7, trying to recreate the Scholar's Mate threat. But you're ready for it.",
          concepts: ["development", "attack"],
        },
        {
          san: "g6",
          color: "black",
          why: "NOW play g6 — it attacks the queen AND blocks the f7 diagonal at the same time. Both threats neutralized in one move. The queen has to move again, losing more tempo.",
          concepts: ["development", "attack"],
          commonMistakes: [
            {
              san: "Nf6",
              whyBad:
                "NOT THIS! Nf6 walks into Qxf7# — Scholar's Mate! With the bishop on c4, you must play g6 first to block the diagonal. NEVER play Nf6 when White has Bc4 + Qh5 together.",
            },
            {
              san: "Qf6",
              whyBad:
                "Bringing your queen out to defend is the same mistake White made. g6 is much better — it defends actively with a pawn that was going to move anyway. Save your queen for later.",
            },
          ],
        },
        {
          san: "Qf3",
          color: "white",
          why: "The queen retreats but still attacks f7 via the diagonal (f3-a8 through the bishop's support).",
          concepts: ["attack"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Now Nf6 is safe — the queen on f3 can't deliver mate. This attacks the queen AGAIN and defends against Qxf7 (because after Qxf7, the knight recaptures). Three queen moves for White, three developing moves for you.",
          concepts: ["development", "attack"],
        },
        {
          san: "g4",
          color: "white",
          why: "White lashes out with a desperate pawn push, trying to chase your knight. But this weakens the king forever.",
          concepts: ["attack"],
        },
        {
          san: "Nd4",
          color: "black",
          why: "Counter-attack! The knight jumps to d4 attacking the queen. Black has 3 pieces developed vs White's 1 piece — White is lost.",
          concepts: ["attack", "piece-activity"],
        },
      ],
    },
    {
      id: "parham-attack",
      name: "Parham Attack (3.Qh5)",
      description: "White plays Bc4 then Qh5 — the textbook Scholar's Mate setup. The most common beginner trap.",
      branchesAt: 4,
      opponentMove: {
        san: "Qh5",
        color: "white",
        why: "The direct Scholar's Mate attempt. White has Bc4 + Qh5 aiming at f7, threatening checkmate next move. You MUST defend with g6, not any other move.",
        concepts: ["attack"],
      },
      moves: [
        {
          san: "g6",
          color: "black",
          why: "The ONLY correct move. g6 attacks the queen and blocks the f7 diagonal simultaneously. This is the move you MUST memorize — it's the difference between winning and getting checkmated in 4 moves.",
          concepts: ["development", "attack", "king-safety"],
          commonMistakes: [
            {
              san: "Nf6",
              whyBad:
                "CHECKMATE! Qxf7#. The knight on f6 blocks your king's escape and the bishop on c4 supports the queen. This is how Scholar's Mate works and why it catches so many beginners. g6 is the ONLY move that saves you.",
            },
            {
              san: "d6",
              whyBad:
                "d6 doesn't defend f7! Qxf7# is still mate. The only way to stop the mate is to block the diagonal (with g6) or defend f7 multiple times. d6 does neither.",
            },
            {
              san: "Qe7",
              whyBad:
                "Qe7 defends f7 but blocks your bishop and exposes your queen. You'll be stuck defensively while White keeps the initiative. g6 is MUCH better — it's active defense that attacks the queen.",
            },
          ],
        },
        {
          san: "Qf3",
          color: "white",
          why: "The queen retreats while still attacking f7. White is hoping you'll panic and make a mistake.",
          concepts: ["attack"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Now Nf6 is SAFE because the queen is on f3, not h5. It attacks the queen and defends e4. White is now forced to move the queen a THIRD time.",
          concepts: ["development", "attack"],
        },
        {
          san: "Qb3",
          color: "white",
          why: "Another queen move, still targeting f7.",
          concepts: ["attack"],
        },
        {
          san: "Nd4",
          color: "black",
          why: "Devastating counter-attack! The knight attacks the queen AND threatens Nxc2+ forking the rook. White is in panic mode.",
          concepts: ["attack", "piece-activity"],
        },
        {
          san: "Bxf7+",
          color: "white",
          why: "White sacrifices the bishop in desperation — but this loses material for nothing.",
          concepts: ["attack"],
        },
        {
          san: "Ke7",
          color: "black",
          why: "King takes the bishop. Yes, you lose castling rights, but you're up a piece and White's attack is over. White has 0 pieces developed while you have 3. Totally winning.",
          concepts: ["king-safety"],
          commonMistakes: [
            {
              san: "Kxf7",
              whyBad:
                "Kxf7 is OK but Ke7 is SAFER — it avoids any discovered check ideas and keeps the king more protected. Kxf7 also loses the queen after Qxd4+. Always check if moving the king exposes it to more threats.",
            },
          ],
        },
      ],
    },
    {
      id: "qf3-attack",
      name: "Qf3 Attack",
      description: "White plays Qf3 instead of Qh5 — a sneakier attempt, but equally bad.",
      branchesAt: 4,
      opponentMove: {
        san: "Qf3",
        color: "white",
        why: "The Qf3 attack — still targeting f7, but from a slightly different square. Not as obviously bad as Qh5 because the queen isn't quite as exposed, but it's still an early queen move that you can punish.",
        concepts: ["attack"],
      },
      moves: [
        {
          san: "Nf6",
          color: "black",
          why: "Nf6 works here because the queen is on f3, not h5 — no mate threat on f7 yet (the knight on f6 defends h7 and supports the position). This attacks the queen AND develops.",
          concepts: ["development", "attack"],
          commonMistakes: [
            {
              san: "g6",
              whyBad:
                "g6 isn't needed here because there's no mate threat — the queen on f3 can't deliver Scholar's Mate alone. Save the pawn move for when you need it. Nf6 develops AND attacks the queen.",
            },
            {
              san: "Qe7",
              whyBad:
                "Defensive queen moves are wrong. Nf6 develops a piece AND attacks the queen. Don't defend when you can counter-attack.",
            },
          ],
        },
        {
          san: "Qb3",
          color: "white",
          why: "Queen moves to attack f7 from a different angle, still supported by Bc4.",
          concepts: ["attack"],
        },
        {
          san: "Na5",
          color: "black",
          why: "Attack the queen with the knight! Yes, the knight is on the rim, but it forces the queen to move again and threatens to exchange the bishop. You're gaining tempo after tempo.",
          concepts: ["attack", "tempo"],
          commonMistakes: [
            {
              san: "Qe7",
              whyBad:
                "Defending is passive. Na5 is active — it attacks the queen AND the bishop. When you can counter-attack, always prefer it to defense.",
            },
          ],
        },
        {
          san: "Bxf7+",
          color: "white",
          why: "White sacrifices the bishop hoping for complications.",
          concepts: ["attack"],
        },
        {
          san: "Ke7",
          color: "black",
          why: "King takes the bishop safely. You're up a piece. White's 'attack' was an illusion.",
          concepts: ["king-safety"],
        },
        {
          san: "Qb5+",
          color: "white",
          why: "Desperate check.",
          concepts: ["attack"],
        },
        {
          san: "Kxf7",
          color: "black",
          why: "Block the check with the king — you're fine. Totally winning position.",
          concepts: ["king-safety"],
        },
      ],
    },
    {
      id: "englund-queen",
      name: "Englund Queen Attack (vs 1.d4)",
      description: "White plays 1.d4 and you blunder into 1...e5?! — the Englund Gambit. After 2.dxe5, you try to get the pawn back with Qe7. Not recommended but instructive.",
      branchesAt: 0,
      opponentMove: {
        san: "d4",
        color: "white",
        why: "White plays the Queen's Pawn opening.",
        concepts: ["center-control"],
      },
      moves: [
        {
          san: "d5",
          color: "black",
          why: "The safest response. Match White's center claim. Don't play 1...e5?! (the Englund Gambit) — it's unsound against a decent opponent. d5 gives you a solid Queen's Gambit Declined structure.",
          concepts: ["center-control"],
          commonMistakes: [
            {
              san: "e5",
              whyBad:
                "The Englund Gambit (1...e5?!) is a dubious gambit where you sacrifice a pawn for tricks. Against someone who knows it, you just lose the pawn for nothing. d5 is the safe, principled move.",
            },
            {
              san: "Nf6",
              whyBad:
                "Nf6 is fine (leads to Indian defenses) but more complex than d5. For learning to defend against early queens, d5 keeps things simple.",
            },
          ],
        },
        {
          san: "Qd3",
          color: "white",
          why: "A weird early queen move, trying to support e4.",
          concepts: ["attack"],
        },
        {
          san: "Nc6",
          color: "black",
          why: "Develop the knight, attacking the queen! Even in d4 openings, you punish the early queen the same way — develop with tempo against it.",
          concepts: ["development", "attack"],
          commonMistakes: [
            {
              san: "Nf6",
              whyBad:
                "Nf6 develops but doesn't attack the queen. Nc6 attacks the queen directly — whenever you can attack an enemy piece WHILE developing, do it.",
            },
            {
              san: "e6",
              whyBad:
                "e6 is passive. Nc6 is active — it attacks the queen and prepares your own counterplay. Don't miss chances to gain tempo.",
            },
          ],
        },
        {
          san: "Qg3",
          color: "white",
          why: "The queen flees to g3.",
          concepts: ["tempo"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Develop your other knight. You're now two pieces ahead in development while White has only moved pawns and a queen. Perfect position.",
          concepts: ["development"],
        },
      ],
    },
    {
      id: "qg4-caro-kann",
      name: "Qg4 Attack (vs Caro-Kann/French)",
      description: "After you play a solid pawn structure (French/Caro-Kann style), White sometimes plays Qg4 attacking g7. Here's how to handle it.",
      branchesAt: 2,
      opponentMove: {
        san: "Nc3",
        color: "white",
        why: "Normal development. White is preparing Qg4 in some variations.",
        concepts: ["development"],
      },
      moves: [
        {
          san: "dxe4",
          color: "black",
          why: "Capture the center pawn, leading to an open position.",
          concepts: ["center-control"],
        },
        {
          san: "Nxe4",
          color: "white",
          why: "Standard recapture.",
          concepts: ["development"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Develop the knight, attacking the white knight on e4. This also defends against any Qg4 tricks since Nf6 controls g4.",
          concepts: ["development", "attack"],
          commonMistakes: [
            {
              san: "Bf5",
              whyBad:
                "Bf5 develops but allows Qg4 attacking your bishop AND g7 at the same time. Nf6 is safer because it controls g4 and prevents the queen sortie.",
            },
          ],
        },
        {
          san: "Nxf6+",
          color: "white",
          why: "White trades knights.",
          concepts: ["center-control"],
        },
        {
          san: "gxf6",
          color: "black",
          why: "Recapture with the g-pawn. Yes, this damages your kingside pawn structure, but it opens the g-file for your rook and prevents Qg4 ideas. Sometimes accepting structural damage is better than letting the opponent attack your king.",
          concepts: ["pawn-structure", "king-safety"],
          commonMistakes: [
            {
              san: "exf6",
              whyBad:
                "exf6 keeps the kingside pawn structure but allows Qg4 attacking g7. gxf6 looks ugly but it's actually safer because it opens the g-file for defense and removes the Qg4 threat entirely.",
            },
          ],
        },
      ],
    },
  ],
};
