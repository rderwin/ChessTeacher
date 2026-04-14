import { OpeningLine } from "../types";

export const grunfeld: OpeningLine = {
  id: "grunfeld-defense",
  name: "Grunfeld Defense",
  fullName: "Grunfeld Defense (Exchange Variation)",
  eco: "D85",
  playerColor: "black",
  level: "advanced",
  description:
    "A hypermodern masterpiece where Black deliberately gives White a massive pawn center, then systematically destroys it with piece pressure and pawn breaks. The fianchettoed bishop on g7 becomes a battering ram aimed at the center.",
  history: {
    origin:
      "Introduced by Austrian grandmaster Ernst Grunfeld in 1922, when he played 1.d4 Nf6 2.c4 g6 3.Nc3 d5 against future world champion Alexander Alekhine in Vienna. The opening was revolutionary — at a time when central occupation was considered essential, Grunfeld invited White to build a huge center and then proved it could be attacked and destroyed. The Grunfeld became a cornerstone of hypermodern theory and has been a world championship weapon ever since.",
    nameExplanation:
      "Named after Ernst Grunfeld (1893-1962), the Austrian-born grandmaster who first played it in serious competition. The Exchange Variation specifically refers to the line where White captures on d5 with the knight (cxd5 Nxd5) and then plays e4, accepting the challenge of building the big center that Black will target.",
    popularity:
      "One of the most important defenses in modern chess. It is extremely popular at the grandmaster level because it leads to rich, theoretically complex positions where both sides have clear plans. At the club level it demands concrete knowledge — Black must know how to attack the center precisely, or White's space advantage becomes overwhelming. It has been a decisive weapon in multiple world championship matches.",
    bestFor:
      "Players who enjoy concrete, tactical positions with clear strategic targets. The Grunfeld teaches you to think dynamically — piece activity and initiative can be more important than material or space. It requires comfort with allowing your opponent to look dominant on the surface while you prepare to tear their position apart.",
    famousPlayers: ["Garry Kasparov", "Peter Svidler", "Alexander Grischuk", "Bobby Fischer", "Viswanathan Anand"],
  },
  moves: [
    {
      san: "d4",
      color: "white",
      why: "White claims central space with the queen's pawn, controlling e5 and c5. This is the standard starting move for queen's pawn openings, aiming to build a broad center.",
      concepts: ["center-control", "development"],
      controls: "e5, c5 squares",
    },
    {
      san: "Nf6",
      color: "black",
      why: "Black develops the knight to its most natural square, controlling e4 and d5. This flexible move prevents White from freely playing e4 and keeps Black's options open for several different defense systems.",
      concepts: ["development", "center-control"],
      controls: "e4, d5 squares",
      prevents: "White from easily establishing e4+d4 center",
      commonMistakes: [
        {
          san: "d5",
          whyBad:
            "Playing ...d5 immediately leads to the Queen's Gambit, not the Grunfeld. The Grunfeld requires Nf6 and g6 first to set up the fianchetto before striking with ...d5. Move order defines the opening.",
        },
        {
          san: "g6",
          whyBad:
            "Playing ...g6 before Nf6 lets White play e4 freely, establishing a massive center. Nf6 first controls e4 and prevents that expansion, then ...g6 can come on the next move.",
        },
      ],
    },
    {
      san: "c4",
      color: "white",
      why: "White strengthens control of d5 and expands on the queenside. The c4 pawn supports a future e4 push and, together with d4, creates the foundation for a powerful broad center. This is the starting position for most 1.d4 theory.",
      concepts: ["center-control", "space"],
      controls: "d5, b5 squares",
    },
    {
      san: "g6",
      color: "black",
      why: "Black prepares the kingside fianchetto, signaling a hypermodern approach. The bishop will go to g7 where it will become a devastating weapon along the long diagonal. But unlike the King's Indian (where Black plays ...d6), the Grunfeld will feature an early ...d5, directly challenging White's center. The combination of g6 + d5 is the Grunfeld's signature.",
      concepts: ["development", "preparation", "piece-activity"],
      controls: "Prepares Bg7 fianchetto",
      commonMistakes: [
        {
          san: "d6",
          whyBad:
            "Playing ...d6 instead of ...g6 would transpose into a King's Indian Defense, which is a completely different opening with a different strategic plan. In the Grunfeld, Black wants to play ...d5 (not ...d6) to immediately challenge the center. The g6+d5 combination is what defines the Grunfeld.",
        },
      ],
    },
    {
      san: "Nc3",
      color: "white",
      why: "White develops the knight and reinforces control of both d5 and e4. The knight on c3 is the key defender of White's center — it supports the upcoming e4 push and guards d5 against Black's planned ...d5 break. This is the most natural and flexible development.",
      concepts: ["development", "center-control"],
      controls: "d5, e4 squares",
    },
    {
      san: "d5",
      color: "black",
      why: "The defining move of the Grunfeld Defense! Black strikes at the center immediately rather than playing ...Bg7 first. This bold pawn thrust challenges White's c4 pawn and dares White to capture and build a big center. Black is saying: 'Go ahead, take the center — I'll destroy it.' This is the fundamental difference from the King's Indian, where Black plays ...d6 and attacks the center later.",
      concepts: ["center-control", "attack"],
      controls: "c4, e4 squares — directly challenges White's center",
      prevents: "White from building a comfortable center unchallenged",
      commonMistakes: [
        {
          san: "Bg7",
          whyBad:
            "Playing ...Bg7 before ...d5 allows White to play e4, establishing the full center without the tension of dealing with ...d5. In the Grunfeld, the timing of ...d5 is critical — it must come before White can consolidate. After ...Bg7, White gets the King's Indian structure on their own terms.",
        },
      ],
    },
    {
      san: "cxd5",
      color: "white",
      why: "White accepts the challenge and captures on d5. This is the start of the Exchange Variation, the most critical test of the Grunfeld. White plans to play e4 next, building the ideal pawn center (d4+e4) that Black will spend the entire game attacking.",
      concepts: ["center-control", "pawn-structure"],
      controls: "Opens the center, wins a tempo after Nxd5",
    },
    {
      san: "Nxd5",
      color: "black",
      why: "Black recaptures with the knight, putting it on a central square where it attacks c3 and prepares to be kicked by e4. This is all part of the plan — Black wants White to play e4 because it overextends the center. The knight will be pushed back, but Black's pieces will be mobilized against the very center White is building.",
      concepts: ["development", "center-control"],
      controls: "c3, e3, b4, f4 squares — centralized knight",
      commonMistakes: [
        {
          san: "Qxd5",
          whyBad:
            "Recapturing with the queen exposes it to tempo attacks — White plays Nc3 or e4 gaining time by hitting the queen. In the Grunfeld, the knight on d5 is the correct recapture because it provokes e4, creating the overextended center Black wants to attack.",
        },
        {
          san: "Bg7",
          whyBad:
            "Developing the bishop before recapturing leaves White with an extra pawn on d5. Black must take back immediately with Nxd5 to maintain material equality and set up the thematic Nxc3 exchange that damages White's pawn structure.",
        },
      ],
    },
    {
      san: "e4",
      color: "white",
      why: "White pushes the knight back and establishes the powerful d4+e4 pawn center. On the surface, this looks dominant — White has two central pawns supported by a knight, controlling a wall of squares. But this is exactly what Black provoked. The center is a target, and Black's entire strategy revolves around demolishing it with ...c5, ...Bg7, ...Nc6, and piece pressure.",
      concepts: ["center-control", "space", "tempo"],
      controls: "d5, f5 squares — imposing but targetable center",
    },
    {
      san: "Nxc3",
      color: "black",
      why: "Black captures the knight, forcing White to recapture and make a structural decision. This exchange is strategically important: after bxc3, White gets a broad pawn center (c3+d4+e4) but the c3 pawn is somewhat weak and the pawn structure is less flexible. Black has traded a knight for disrupting White's pawn structure — a classic Grunfeld trade-off.",
      concepts: ["pawn-structure", "attack"],
      controls: "Disrupts White's pawn structure",
      commonMistakes: [
        {
          san: "Nb6",
          whyBad:
            "Retreating the knight to b6 wastes the opportunity to damage White's pawn structure. After ...Nxc3 bxc3, White's queenside pawns are doubled and the c3 pawn becomes a target. ...Nb6 lets White keep a perfect pawn structure with a huge center — exactly what Black should avoid in the Grunfeld.",
        },
      ],
    },
    {
      san: "bxc3",
      color: "white",
      why: "White recaptures with the b-pawn, maintaining the broad center. Now White has pawns on c3, d4, and e4 — an impressive wall but one that requires constant defense. The c3 pawn in particular can become a long-term weakness. White's plan is to develop pieces quickly (Nf3, Bc4 or Be2, O-O) and use the center for a kingside attack before Black can organize the counter-assault.",
      concepts: ["center-control", "pawn-structure"],
      controls: "d4 square — reinforces the center but creates weaknesses",
    },
    {
      san: "Bg7",
      color: "black",
      why: "The bishop finally takes its throne on g7, and what a position it occupies! From g7, the bishop stares down the entire a1-h8 diagonal, directly targeting the d4 pawn — the base of White's center. This bishop is the soul of the Grunfeld. Combined with ...c5 and ...Nc6, it will create unbearable pressure on White's central pawns. The bishop also provides excellent king safety after castling.",
      concepts: ["development", "piece-activity", "attack"],
      controls: "a1-h8 diagonal — devastating pressure on d4",
      commonMistakes: [
        {
          san: "c5",
          whyBad:
            "Striking at d4 before developing the bishop misses the point. The Bg7 fianchetto is the cornerstone of the Grunfeld — the bishop on g7 provides the sustained diagonal pressure that makes ...c5 truly devastating. Without the bishop in place, ...c5 lacks teeth and White can comfortably recapture.",
        },
        {
          san: "O-O",
          whyBad:
            "Castling before Bg7 makes no sense — the bishop hasn't even left the back rank yet. Bg7 first completes the fianchetto, activates the most important piece in the Grunfeld, and prepares castling on the very next move if needed.",
        },
      ],
    },
    {
      san: "Nf3",
      color: "white",
      why: "White develops the knight to support d4 and prepare castling. The knight on f3 is essential for holding the center together — without it, d4 would be under enormous pressure from the g7 bishop and Black's upcoming ...c5. White must develop quickly to maintain the center's integrity.",
      concepts: ["development", "center-control", "king-safety"],
      controls: "d4, e5 squares — supports the center",
    },
    {
      san: "c5",
      color: "black",
      why: "Black strikes at the base of White's center! The c5 pawn attacks d4 directly, combining with the g7 bishop's pressure on the same pawn. This is the first wave of the Grunfeld counterattack — Black is already threatening to undermine the center that White spent several moves building. White must decide how to handle the tension.",
      concepts: ["center-control", "attack", "piece-activity"],
      controls: "d4 square — undermines the center",
      commonMistakes: [
        {
          san: "O-O",
          whyBad:
            "Castling before playing ...c5 gives White time to consolidate with Be3, Qd2, and Rd1. The timing of ...c5 is crucial in the Grunfeld — Black must challenge d4 immediately while White's pieces are still uncoordinated. Delay allows White to fortify the center.",
        },
      ],
    },
    {
      san: "Be3",
      color: "white",
      why: "White develops the bishop to defend d4 and prepare Qd2. The bishop on e3 is a key defender of the center — it reinforces d4 against the combined assault of ...c5 and the g7 bishop. White is racing to complete development and castle before Black's pressure becomes too much.",
      concepts: ["development", "center-control"],
      controls: "d4, c5 squares — defends the center",
    },
    {
      san: "Qa5",
      color: "black",
      why: "The queen enters the game with a double threat: it attacks the c3 pawn (a structural weakness from the bxc3 recapture) and pins it against the king along the a5-e1 diagonal. This is a classic Grunfeld move — the queen adds pressure on the queenside while the g7 bishop handles the center. White is now under pressure on multiple fronts and must play precisely to hold everything together.",
      concepts: ["attack", "piece-activity"],
      controls: "c3 pawn — exploits the structural weakness",
      prevents: "White from comfortably consolidating the center",
      commonMistakes: [
        {
          san: "Nc6",
          whyBad:
            "Nc6 develops a piece but doesn't create the immediate double-threat that Qa5 does. The queen on a5 simultaneously hits c3 and pins it, forcing White into defensive contortions. Nc6 is a good move in other Grunfeld lines, but here Qa5 exploits the structural weakness created by bxc3 right now.",
        },
        {
          san: "O-O",
          whyBad:
            "Castling is safe but passive — it gives White time to consolidate with Qd2 and Rd1, stabilizing the center. Qa5 is more urgent because it strikes while the c3 pawn is undefended and White's pieces are still uncoordinated. The initiative matters more than king safety at this moment.",
        },
      ],
    },
  ],
  summary:
    "The Grunfeld Defense is chess's ultimate test of dynamic versus static advantages. Black deliberately invites White to build a massive d4+e4 pawn center, then systematically attacks it with the fianchettoed bishop on g7, the ...c5 pawn break, and piece pressure on the queenside. White's broad center (c3+d4+e4) looks imposing but is a target — the c3 pawn is weak, d4 is under constant fire, and maintaining the center requires precise piece coordination. Black's strategy teaches a profound lesson: a pawn center is only as strong as the pieces defending it. When Black's pieces coordinate against the center (Bg7 targeting d4, ...c5 undermining d4, ...Qa5 hitting c3, ...Nc6 adding pressure), even the most impressive-looking center can crumble. This is hypermodern chess at its best — control through pressure, not occupation.",
  variants: [
    {
      id: "russian-system",
      name: "Russian System (7.Nf3 c5 8.Rb1)",
      description: "White protects the b2 pawn with the rook before developing, avoiding the ...Qa5 pressure and preparing a solid center.",
      branchesAt: 14,
      opponentMove: {
        san: "Rb1",
        color: "white",
        why: "The Russian System! Instead of Be3, White tucks the rook to b1, pre-emptively defending the b2 pawn and removing the ...Qa5+...Qxa2 threat. This is a sophisticated positional idea — White sacrifices a tempo on the rook move to avoid the disruptive ...Qa5 lines and maintain a more harmonious position.",
        concepts: ["prophylaxis", "preparation"],
        controls: "b2 pawn — removes queenside pressure",
      },
      moves: [
        {
          san: "O-O",
          color: "black",
          why: "With the Qa5 plan less effective, Black castles and prepares to increase pressure on d4 with ...Nc6 and ...cxd4. King safety first, then counterattack.",
          concepts: ["king-safety", "preparation"],
          commonMistakes: [
            {
              san: "Qa5",
              whyBad:
                "The whole point of White's Rb1 is to neutralize Qa5 — the b2 pawn is defended and ...Qxa2 would trap the queen after Ra1. Castling is the correct response, securing the king before resuming the counterattack with ...Nc6.",
            },
            {
              san: "b6",
              whyBad:
                "Fianchettoing the queenside bishop is too slow here. Black needs to castle immediately and then pressure d4 with ...Nc6. Spending time on ...b6 and ...Bb7 lets White consolidate the center with Be2 and O-O unchallenged.",
            },
          ],
        },
        {
          san: "Be2",
          color: "white",
          why: "White develops calmly and prepares to castle. The Russian System is about solid development and maintaining the center without tactical complications.",
          concepts: ["development", "king-safety"],
        },
        {
          san: "Nc6",
          color: "black",
          why: "The knight develops to its natural square, adding another attacker to d4. With the g7 bishop and the knight both targeting d4, and ...cxd4 ready, the pressure on White's center is mounting.",
          concepts: ["development", "center-control", "attack"],
          controls: "d4, e5 squares",
          commonMistakes: [
            {
              san: "cxd4",
              whyBad:
                "Capturing on d4 too early releases the tension without maximum pressure. By developing Nc6 first, Black adds another attacker to d4 before exchanging, making the recapture more problematic for White. Timing the exchange correctly is key in the Grunfeld.",
            },
            {
              san: "Nd7",
              whyBad:
                "Nd7 blocks the c8 bishop and doesn't pressure d4 nearly as effectively as Nc6. The knight on c6 hits both d4 and e5, creating the multi-piece siege on White's center that defines the Grunfeld counterattack.",
            },
          ],
        },
        {
          san: "d5",
          color: "white",
          why: "White pushes the d-pawn to relieve the pressure. This closes the center but gives Black the e5 square as a powerful outpost. The character of the game changes from a dynamic center to a more strategic battle.",
          concepts: ["center-control", "space"],
          controls: "c6, e6 squares",
          commonMistakes: [
            {
              san: "dxc5",
              whyBad:
                "Exchanging on c5 surrenders the center entirely. Black recaptures with excellent piece activity and the g7 bishop becomes a monster on the open diagonal. White should push d5 or maintain the tension — never release it by capturing on c5.",
            },
          ],
        },
        {
          san: "Ne5",
          color: "black",
          why: "The knight occupies the powerful e5 outpost, a direct consequence of White's d5 push. From e5, the knight is centralized and dominates — it attacks c4, d3, f3, and g4 while being very hard to dislodge. This is the payoff for Black's patient pressure.",
          concepts: ["piece-activity", "center-control"],
          controls: "c4, d3, f3, g4 — dominant central outpost",
          commonMistakes: [
            {
              san: "Na5",
              whyBad:
                "Na5 heads to the rim where the knight is passive and only targets c4. Ne5 is far superior — the knight sits in the center, controls four key squares, and is nearly impossible to dislodge. A knight on the rim is dim; a knight on e5 is a monster.",
            },
            {
              san: "Nb4",
              whyBad:
                "Nb4 looks active but the knight can be easily kicked with a3 and lacks a stable square. Ne5 gives the knight a permanent outpost that White cannot challenge with pawns. The e5 square is the strategic prize created by White's d5 advance.",
            },
          ],
        },
        {
          san: "O-O",
          color: "white",
          why: "White castles, completing development. The position is complex with chances for both sides — White has space and the passed d-pawn, Black has the e5 outpost and piece activity.",
          concepts: ["king-safety"],
        },
      ],
    },
    {
      id: "classical-exchange",
      name: "Classical Exchange (7.Be3 c5 8.Qd2)",
      description: "White develops the queen to d2 early, connecting rooks, supporting Be3, and preparing O-O-O for a kingside attack.",
      branchesAt: 14,
      opponentMove: {
        san: "Qd2",
        color: "white",
        why: "White plays Qd2 to connect the rooks and support the bishop on e3. This setup often leads to opposite-side castling with O-O-O, where White launches a kingside pawn storm while Black attacks on the queenside. It is one of the sharpest and most combative approaches against the Grunfeld.",
        concepts: ["development", "attack", "preparation"],
        controls: "Supports Be3, prepares O-O-O",
      },
      moves: [
        {
          san: "Nc6",
          color: "black",
          why: "Develop the knight and add more pressure to d4. With ...c5 and ...Nc6 both targeting d4, White's center is under serious siege. The knight on c6 also controls e5 and a5.",
          concepts: ["development", "center-control", "attack"],
          controls: "d4, e5 squares",
          commonMistakes: [
            {
              san: "O-O",
              whyBad:
                "Castling before Nc6 is passive — it doesn't add pressure to d4. Black needs to pile up on White's center with Nc6 before White can consolidate with Rd1 and stabilize. Every tempo matters in the Grunfeld counterattack.",
            },
            {
              san: "Qa5",
              whyBad:
                "Qa5 is premature here because White has Qd2 already placed to defend c3 and connect with Rc1. Nc6 first adds a real attacker to d4, and the Qa5 idea can come later at a more opportune moment after the knight develops.",
            },
          ],
        },
        {
          san: "Rc1",
          color: "white",
          why: "White places the rook on the c-file, supporting the c3 pawn and preparing to castle queenside. The rook on c1 also eyes c5 if Black exchanges on d4.",
          concepts: ["development", "preparation"],
          controls: "c-file, supports c3",
        },
        {
          san: "cxd4",
          color: "black",
          why: "Black captures, opening lines against White's center and the c3 pawn. After cxd4, White must recapture with a piece or the c-pawn, and Black's g7 bishop roars to life on the open diagonal.",
          concepts: ["center-control", "piece-activity"],
          controls: "Opens the long diagonal for Bg7",
          commonMistakes: [
            {
              san: "O-O",
              whyBad:
                "Castling instead of capturing allows White to play d5, pushing the Nc6 away and seizing space on White's terms. The timing of ...cxd4 is crucial — it must happen now while Nc6 is in place to maximize the opening of the long diagonal for the g7 bishop.",
            },
            {
              san: "Qa5",
              whyBad:
                "Qa5 before cxd4 puts the queen out before the center is opened. After ...cxd4, the g7 bishop becomes a monster on the long diagonal — that positional transformation should come first. Then ...Qa5 can follow with even greater effect.",
            },
          ],
        },
        {
          san: "cxd4",
          color: "white",
          why: "Recapture with the pawn, maintaining the central presence. White still has the d4+e4 duo, but now the dark squares around White's center (c3, d4) are more exposed without the c3 pawn.",
          concepts: ["center-control"],
        },
        {
          san: "Qa5",
          color: "black",
          why: "The queen comes to a5 with pressure against White's position. It eyes the a2 pawn, threatens to harass White's kingside setup, and pins the d2 queen to defensive duties. This is typical Grunfeld counterplay — combining queen activity with the g7 bishop's diagonal pressure.",
          concepts: ["attack", "piece-activity"],
          controls: "a2 pawn, creates threats against White's position",
          commonMistakes: [
            {
              san: "O-O",
              whyBad:
                "Castling passively allows White to consolidate with O-O-O and launch a kingside attack. ...Qa5 is more dynamic — it creates immediate threats that force White to respond, keeping the initiative on Black's side.",
            },
          ],
        },
        {
          san: "d5",
          color: "white",
          why: "White pushes d5 to gain space and deflect the c6 knight. This stabilizes the center but gives Black active piece play and the e5 square. The battle shifts from center control to a strategic fight over key squares.",
          concepts: ["space", "center-control"],
          controls: "c6 — displaces Black's knight",
        },
      ],
    },
  ],
};
