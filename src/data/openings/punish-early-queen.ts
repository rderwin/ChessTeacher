import { OpeningLine } from "../types";

export const punishEarlyQueen: OpeningLine = {
  id: "punish-early-queen",
  name: "Punishing the Early Queen",
  fullName: "How to Beat the Early Queen Attack",
  eco: "D00",
  playerColor: "white",
  level: "beginner",
  description:
    "Beginners love bringing their queen out early. Here's how to punish it — develop pieces that attack the queen, gain tempo, and build a winning position while they waste moves running away.",
  history: {
    origin: "The 'early queen' attack is one of the oldest beginner traps in chess. Players as far back as the 1800s wrote about how to punish premature queen development. Every strong player learned this lesson early in their chess journey.",
    nameExplanation: "Not a formal opening name — this is a practical lesson about handling a very common beginner situation. When your opponent plays Qh5 or Qf3 early, most beginners panic. This teaches you to stay calm and profit.",
    popularity: "You will face this constantly at beginner level (400-1000). It's probably the #1 thing beginners lose to. Once you learn the pattern, these games become free wins.",
    bestFor: "Every beginner who keeps losing to early queen attacks. The key principle: develop pieces WITH TEMPO by attacking the queen. Every time the queen runs, you gain a move.",
    famousPlayers: ["Every chess teacher ever", "Bobby Fischer (showed this to students)", "Ben Finegold (teaches this constantly)"],
  },
  moves: [
    {
      san: "d4",
      color: "white",
      why: "Claim the center. A solid start that controls e5 and c5. We're playing a queen's pawn opening.",
      concepts: ["center-control"],
      controls: "e5, c5 squares",
      commonMistakes: [
        {
          san: "e4",
          whyBad:
            "e4 is a perfectly fine opening move, but this lesson teaches the d4 approach against early queen attacks. d4 leads to positions where Black's premature queen is particularly awkward since the center becomes closed enough that tempo matters enormously.",
        },
        {
          san: "Nf3",
          whyBad:
            "Nf3 is a solid move but d4 is more direct — it immediately stakes a claim in the center. In this lesson we want to build a strong d4+e4 pawn center, and d4 is the first step in that plan.",
        },
      ],
    },
    {
      san: "d5",
      color: "black",
      why: "Black mirrors — a normal response. But watch what they do next...",
      concepts: ["center-control"],
    },
    {
      san: "Nf3",
      color: "white",
      why: "Develop a piece and support d4. Standard opening play — pieces before pawns.",
      concepts: ["development", "center-control"],
      commonMistakes: [
        {
          san: "c4",
          whyBad:
            "c4 is a pawn move, not a piece move. In the opening, develop pieces first! Nf3 gets a knight out, supports d4, and controls e5. Follow the golden rule: knights and bishops before pawns and queens.",
        },
        {
          san: "e4",
          whyBad:
            "e4 grabs more center but it's too early without piece support. After ...dxe4 you'd need to spend time winning the pawn back. Nf3 develops a piece first — the e4 push will be much stronger later when Nc3 is in place to support it.",
        },
      ],
    },
    {
      san: "Qd6",
      color: "black",
      why: "Here it is — the early queen! Black develops the queen instead of a minor piece. This looks scary because the queen is powerful, but it's actually a MISTAKE. The queen is a target — every piece you develop can attack it, gaining free tempi.",
      concepts: ["development"],
    },
    {
      san: "Nc3",
      color: "white",
      why: "Develop with PURPOSE. The knight comes out to its best square AND it puts indirect pressure on d5. Meanwhile, Black's queen is going to get pushed around. Key principle: DON'T PANIC when you see the queen. Just develop normally and look for chances to attack it.",
      concepts: ["development", "center-control", "tempo"],
      controls: "d5, e4 squares",
      commonMistakes: [
        {
          san: "Bg5",
          whyBad: "Trying to pin the queen to the king doesn't work — the queen isn't a knight. Just develop normally. Nc3 is perfect because it develops AND pressures d5.",
        },
        {
          san: "c4",
          whyBad: "c4 is fine positionally but doesn't develop a piece. In the opening, pieces first! Nc3 develops AND fights for the center.",
        },
      ],
    },
    {
      san: "Qf4",
      color: "black",
      why: "The queen moves AGAIN. That's now 2 moves spent on the queen while you've developed 2 pieces. Black is falling behind in development — every queen move is a move NOT spent developing knights and bishops.",
      concepts: ["tempo"],
    },
    {
      san: "e4",
      color: "white",
      why: "Seize the center! With Nc3 supporting, e4 goes in strongly. Now you have pawns on d4 AND e4 — the ideal pawn center. Black can't match this because they've been moving the queen instead of developing pieces. If dxe4, Nxe4 with a great position.",
      concepts: ["center-control", "space", "development"],
      controls: "d5, f5 — massive central influence",
      commonMistakes: [
        {
          san: "Bd3",
          whyBad: "Bd3 develops but blocks the d-pawn. e4 is stronger because it opens the center while you're ahead in development. When you have more pieces out, OPEN THE POSITION — it favors the better-developed side.",
        },
      ],
    },
    {
      san: "Qd6",
      color: "black",
      why: "The queen retreats — that's 3 queen moves and ZERO piece development. Meanwhile you have 2 knights, a central pawn duo, and can develop freely. Black is already in big trouble. This is why early queen attacks don't work against good development.",
      concepts: ["tempo"],
    },
    {
      san: "e5",
      color: "white",
      why: "Push the queen AGAIN! e5 attacks the queen with a pawn, gaining another tempo. The queen has to move a 4th time while you keep building your position. This is the punishment for early queen development — death by a thousand paper cuts (tempi).",
      concepts: ["attack", "tempo", "space"],
      controls: "f6, d6 — restricts the queen even more",
      commonMistakes: [
        {
          san: "exd5",
          whyBad: "Taking on d5 is fine but e5 is BETTER because it attacks the queen immediately. When you can develop/advance WITH a threat, always prefer that over a quiet move.",
        },
      ],
    },
    {
      san: "Qb4",
      color: "black",
      why: "The queen runs to b4, maybe hoping to pick up the b2 pawn. But look at the position: Black has moved the queen FOUR TIMES and has ZERO other pieces developed. You have knights, center pawns, and it's your turn to keep building.",
      concepts: ["tempo"],
    },
    {
      san: "Bd2",
      color: "white",
      why: "Develop AND attack the queen AGAIN. Bd2 develops the bishop while threatening the queen on b4. The queen must move a 5th time! Every single move you make is productive (developing a piece to a good square) while every single opponent move is reactive (running the queen). This is how you win the opening.",
      concepts: ["development", "attack", "tempo"],
      commonMistakes: [
        {
          san: "a3",
          whyBad: "a3 chases the queen but doesn't develop a piece. Bd2 does BOTH — develops and attacks. Always prefer moves that accomplish two things at once.",
        },
      ],
    },
    {
      san: "Qb6",
      color: "black",
      why: "Queen move #5. Zero development. Zero pieces out. Meanwhile you're about to castle with a massive lead. The game is essentially over — you're up 4-5 tempi in development.",
      concepts: ["tempo"],
    },
    {
      san: "Bd3",
      color: "white",
      why: "Develop the last minor piece before castling. The bishop goes to d3, an active diagonal pointing at the kingside. Notice: you've developed FOUR pieces (Nf3, Nc3, Bd2, Bd3) while Black has developed ZERO (only queen moves). This is a dream position.",
      concepts: ["development", "piece-activity"],
      controls: "h7 square, b1-h7 diagonal",
      commonMistakes: [
        {
          san: "O-O",
          whyBad:
            "Castling before Bd3 wastes the chance to develop the last minor piece first. Get ALL your minor pieces out, then castle. Bd3 is the final piece of the development puzzle — it aims at h7 and prepares castling on the very next move.",
        },
        {
          san: "Be2",
          whyBad:
            "Be2 develops but the bishop is passive there — it doesn't aim at anything. Bd3 is much more aggressive, pointing directly at h7 on the kingside. When you're this far ahead in development, put your pieces on active squares to maximize the punishment.",
        },
      ],
    },
    {
      san: "Nc6",
      color: "black",
      why: "Black finally develops a piece. But it's too little too late — you're about to castle and have a massive development lead. The position is already lost for the early queen player.",
      concepts: ["development"],
    },
    {
      san: "O-O",
      color: "white",
      why: "Castle! King is safe, rook is activated, and you've completed development while Black has ONE piece out (and a queen that wasted 5 moves). This is the reward for staying calm and developing with tempo against an early queen. You're winning.",
      concepts: ["king-safety", "development"],
      commonMistakes: [
        {
          san: "e6",
          whyBad:
            "Pushing pawns instead of castling is a beginner habit. You've developed all your pieces — now get the king to safety! O-O tucks the king away and activates the rook. Don't keep pushing pawns when you can castle.",
        },
        {
          san: "Qe2",
          whyBad:
            "Bringing your own queen out early is exactly the mistake you're punishing your opponent for! O-O is the natural completion of development. The queen can join the attack later — right now, king safety comes first.",
        },
      ],
    },
    {
      san: "e6",
      color: "black",
      why: "Black tries to develop the bishop, but the position is already dire. You're fully developed, castled, with a strong center. Black is cramped with a useless queen and 5 tempi behind. Game over — your pieces will crash through.",
      concepts: ["development"],
    },
  ],
  summary:
    "The #1 lesson here: DON'T PANIC when you see an early queen. Instead, DEVELOP WITH TEMPO — every piece you bring out should threaten the queen, forcing it to move again. Each queen move wastes a turn. By the time they realize the queen can't do everything alone, you'll have 4 pieces out, a strong center, and a castled king while they have nothing. The queen is powerful but ALONE it can't beat a coordinated army. Stay calm, develop pieces, attack the queen, and profit.",
  variants: [
    {
      id: "scholars-mate-defense",
      name: "Defending Scholar's Mate",
      description: "They play Qh5 early aiming for the f7 square — the 'Scholar's Mate' attempt. Here's how to shut it down and punish it.",
      branchesAt: 3,
      opponentMove: {
        san: "Qh5",
        color: "black",
        why: "Scholar's Mate attempt! The queen comes to h5, threatening Qxe4+ or aiming at f7. Beginners panic here, but it's easily stopped. The queen is way out of position and vulnerable.",
        concepts: ["attack"],
      },
      moves: [
        {
          san: "Nc3",
          color: "white",
          why: "Develop AND defend e4 at the same time. The knight blocks any Qxe4 threats. Now the queen on h5 is just sitting there accomplishing nothing while you develop for free.",
          concepts: ["development", "center-control"],
          commonMistakes: [
            {
              san: "g3",
              whyBad: "g3 chases the queen but weakens your kingside permanently. Nc3 is much better — it develops a piece AND defends. Don't weaken your pawns to chase a queen that's going to run anyway.",
            },
          ],
        },
        {
          san: "Qf5",
          color: "black",
          why: "The queen retreats to f5 — another wasted move. Black has now spent 2 moves on the queen while you have 2 developed knights.",
          concepts: ["tempo"],
        },
        {
          san: "e4",
          color: "white",
          why: "Attack the queen AGAIN while seizing the center! The queen must move a 3rd time. You're building a monster center and developing while they flail.",
          concepts: ["center-control", "attack", "tempo"],
          commonMistakes: [
            {
              san: "Bd3",
              whyBad:
                "Bd3 develops but doesn't attack the queen. e4 is a double-purpose move — it seizes the center AND forces the queen to move again. Always prefer moves that develop AND attack the wandering queen simultaneously.",
            },
            {
              san: "d5",
              whyBad:
                "Pushing d5 closes the center when you want to OPEN it. You're ahead in development, so open positions favor you. e4 grabs central space while keeping things dynamic and forcing the queen to keep running.",
            },
          ],
        },
        {
          san: "Qf6",
          color: "black",
          why: "Queen moves again. 3 queen moves, 0 pieces developed. You're crushing it.",
          concepts: ["tempo"],
        },
        {
          san: "e5",
          color: "white",
          why: "Push the queen AGAIN with a pawn! e5 attacks f6 and gains space. The queen has nowhere comfortable to go.",
          concepts: ["attack", "space", "tempo"],
          commonMistakes: [
            {
              san: "exd5",
              whyBad:
                "Capturing on d5 doesn't attack the queen. The whole point is to keep chasing the queen and gaining tempi. e5 hits the queen directly AND gains space. Always prefer attacking the queen over making neutral pawn trades.",
            },
            {
              san: "Bf4",
              whyBad:
                "Bf4 develops but doesn't threaten the queen on f6. e5 is stronger because it attacks the queen with a pawn while advancing in the center. When the opponent's queen is out early, every move should either develop OR attack the queen — ideally both.",
            },
          ],
        },
        {
          san: "Qg6",
          color: "black",
          why: "4th queen move. At this point you're so far ahead in development that the game is essentially won. Develop, castle, attack.",
          concepts: ["tempo"],
        },
        {
          san: "Bd3",
          color: "white",
          why: "Develop AND attack the queen AGAIN (Bd3 eyes g6 through the e-file). The pattern repeats: you develop pieces that happen to hit the queen. Free tempi, every time.",
          concepts: ["development", "attack", "tempo"],
          commonMistakes: [
            {
              san: "Be2",
              whyBad:
                "Be2 develops but doesn't put pressure on the queen on g6. Bd3 is aggressive — it aims at g6 and threatens to create problems. When you can develop AND attack the queen, always choose the attacking square.",
            },
            {
              san: "Bc4",
              whyBad:
                "Bc4 targets f7 but doesn't threaten the queen on g6. Bd3 is better in this specific position because it directly pressures the queen's current location while still developing to an active diagonal. Target the queen, not some future tactic.",
            },
          ],
        },
        {
          san: "Qg4",
          color: "black",
          why: "5th queen move. This is a textbook example of why the early queen doesn't work. Just castle and win.",
          concepts: ["tempo"],
        },
      ],
    },
    {
      id: "wayward-queen",
      name: "Wayward Queen (1...Qa5)",
      description: "Some beginners play Qa5 early to 'attack' the a2 or e1 squares. Here's how to ignore it and build a winning position.",
      branchesAt: 3,
      opponentMove: {
        san: "Qa5",
        color: "black",
        why: "The 'Wayward Queen' — Black plays Qa5 hoping to cause trouble on the a5-e1 diagonal or grab the a2 pawn. But the queen is poorly placed here and easily ignored.",
        concepts: ["attack"],
      },
      moves: [
        {
          san: "Nc3",
          color: "white",
          why: "Just develop. Nc3 blocks any Qe1 nonsense and develops naturally. Don't try to 'punish' the queen immediately — just build your position. The punishment IS your superior development.",
          concepts: ["development", "center-control"],
          commonMistakes: [
            {
              san: "a3",
              whyBad:
                "a3 tries to chase the queen but doesn't develop a piece. The queen on a5 isn't actually threatening anything dangerous. Nc3 develops naturally and the queen will have to move on its own eventually. Develop, don't chase.",
            },
            {
              san: "Bd2",
              whyBad:
                "Bd2 attacks the queen but it's the wrong move order. You want Nc3 first for central control and development, then Bd2 later when it has maximum effect. Develop knights before bishops — they have fewer good squares.",
            },
          ],
        },
        {
          san: "e5",
          color: "black",
          why: "Black tries to fight for the center, but they're a tempo behind because of the queen move.",
          concepts: ["center-control"],
        },
        {
          san: "e4",
          color: "white",
          why: "Challenge the center directly. You have more pieces ready to support the center battle.",
          concepts: ["center-control", "space"],
          commonMistakes: [
            {
              san: "e3",
              whyBad:
                "e3 is too passive. Black wasted a tempo on Qa5, so you should punish that by grabbing maximum central space with e4. When your opponent wastes time, seize the center aggressively — e4 is bold and justified by your development lead.",
            },
            {
              san: "Bf4",
              whyBad:
                "Bf4 develops but doesn't seize the center. e4 is stronger because it grabs space and opens lines while you're ahead in development. The bishop can develop to d2 later where it will also attack the misplaced queen.",
            },
          ],
        },
        {
          san: "Nc6",
          color: "black",
          why: "Finally a developing move. But White is already ahead — 2 pieces out plus a strong center.",
          concepts: ["development"],
        },
        {
          san: "Bd2",
          color: "white",
          why: "Develop AND attack the queen! Bd2 hits Qa5. The queen must move again, losing another tempo.",
          concepts: ["development", "attack", "tempo"],
          commonMistakes: [
            {
              san: "Bg5",
              whyBad:
                "Bg5 develops the bishop actively but doesn't attack the queen on a5. Bd2 is the key move here because it simultaneously develops AND forces the queen to waste another move. Two birds, one stone — that's the pattern against early queens.",
            },
            {
              san: "Be3",
              whyBad:
                "Be3 develops to an active square but again doesn't hit the queen. The whole lesson is about developing WITH TEMPO by attacking the queen. Bd2 does exactly that — the queen on a5 is hit and must retreat.",
            },
          ],
        },
        {
          san: "Qd8",
          color: "black",
          why: "The queen slinks back home. All that for nothing — Black wasted 2 moves (Qa5, Qd8) and is behind in development. Classic early queen failure.",
          concepts: ["tempo"],
        },
      ],
    },
    {
      id: "scandinavian-queen",
      name: "Scandinavian Queen (1.e4 d5 2.exd5 Qxd5 3.Nc3)",
      description: "Black plays the Scandinavian and recaptures with the queen. Punish it with Nc3, gaining tempo on the queen immediately.",
      branchesAt: 0,
      opponentMove: {
        san: "e4",
        color: "white",
        why: "You play e4 (not d4 in this line). Then Black responds with d5, the Scandinavian Defense.",
        concepts: ["center-control"],
      },
      moves: [
        {
          san: "d5",
          color: "black",
          why: "The Scandinavian Defense! Black challenges the e-pawn immediately. This is a legitimate opening, but most beginners follow it up with a risky early queen move.",
          concepts: ["center-control"],
        },
        {
          san: "exd5",
          color: "white",
          why: "Capture the pawn. Straightforward — you gain a pawn in the center and force Black to recapture.",
          concepts: ["center-control"],
          commonMistakes: [
            {
              san: "e5",
              whyBad: "Pushing e5 instead of taking is possible but slow — it loses the chance to force Black's queen into a bad square. Take the pawn and let Black come get it with their queen, then punish.",
            },
            {
              san: "Nc3",
              whyBad: "Developing without capturing lets Black take on e4 first. Always capture when you can gain material without downside — the d5 pawn is free here.",
            },
          ],
        },
        {
          san: "Qxd5",
          color: "black",
          why: "Black recaptures with the queen. This is the most common beginner move (and the Mieses variation at top level). Now the queen is out in the center and exposed.",
          concepts: ["attack"],
        },
        {
          san: "Nc3",
          color: "white",
          why: "HUGE move — develop the knight AND attack the queen! The knight to c3 hits d5 with tempo. Black must move the queen AGAIN, losing another move. This is the textbook punishment.",
          concepts: ["development", "tempo", "center-control"],
          controls: "d5 square, pressures the queen",
          commonMistakes: [
            {
              san: "Nf3",
              whyBad: "Nf3 develops a piece but doesn't attack the queen. Nc3 is better because it's a 'free' tempo — you develop AND force Black to spend another move running the queen.",
            },
            {
              san: "d4",
              whyBad: "d4 is fine but it's a pawn move. Nc3 is sharper — it develops AND pressures the queen. Develop pieces before pawns when you can gain tempo.",
            },
          ],
        },
        {
          san: "Qa5",
          color: "black",
          why: "The queen retreats to a5, the main line. Black has now moved the queen twice (Qxd5, Qa5) while you've developed a knight. Your lead is growing.",
          concepts: ["tempo"],
        },
        {
          san: "d4",
          color: "white",
          why: "Now claim the center. You have piece pressure, a safer king, and a developing lead. d4 builds a strong pawn center while Black's queen sits on a5 doing nothing useful.",
          concepts: ["center-control", "space"],
          commonMistakes: [
            {
              san: "Nf3",
              whyBad: "Nf3 also develops, but d4 is stronger because it seizes the center. With the queen on a5 out of the action, you should grab space before Black gets organized.",
            },
            {
              san: "Bc4",
              whyBad: "Bc4 develops but doesn't grab the center. d4 first, THEN Bc4. Center pawns before bishops is a classical principle, and it's especially valid when your opponent is out of position.",
            },
          ],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Black finally develops a piece. But you're already ahead — pawns on d4 and d5-space (well, e-file), a developed knight, and your queen safe.",
          concepts: ["development"],
        },
        {
          san: "Nf3",
          color: "white",
          why: "Complete your knight development. Nf3 supports d4 and eyes e5. You're building a dream position: strong center, both knights out, castling next.",
          concepts: ["development"],
        },
        {
          san: "c6",
          color: "black",
          why: "Black prepares to develop the bishop by giving the queen a retreat square on c7. Normal Scandinavian treatment — but you're still a tempo ahead.",
          concepts: ["preparation"],
        },
        {
          san: "Bc4",
          color: "white",
          why: "Develop the bishop to an active diagonal. Bc4 aims at f7 (a classic target) and prepares castling next move. You have a beautiful position.",
          concepts: ["development", "piece-activity"],
        },
      ],
    },
  ],
};
