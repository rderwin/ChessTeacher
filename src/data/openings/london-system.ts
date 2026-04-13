import { OpeningLine } from "../types";

export const londonSystem: OpeningLine = {
  id: "london-system",
  name: "London System",
  fullName: "London System",
  eco: "D00",
  playerColor: "white",
  level: "beginner",
  description:
    "A solid, low-theory system where White develops the dark-squared bishop to f4 before playing e3, builds a sturdy pyramid pawn structure, and gets a reliable position against virtually any Black setup.",
  history: {
    origin:
      "Named after the 1922 London tournament where several strong players employed 1.d4 and 2.Bf4 as a system. It remained a sideline for decades until the 2000s, when Gata Kamsky and Baadur Jobava revitalized it at the top level. Magnus Carlsen then brought it into the mainstream by using it repeatedly in world championship matches and super-tournaments, cementing it as a legitimate weapon at all levels.",
    nameExplanation:
      "Called the \"London System\" because of the 1922 London tournament where the Bf4 setup was prominently featured. Unlike most openings named after a single game, it's named after the entire tournament, reflecting that multiple players adopted the same system independently.",
    popularity:
      "Extremely popular at club level and increasingly common at the top. It's one of the most recommended openings for beginners because you can play the same setup regardless of what Black does. Online chess has made it even more widespread since players can learn one system and use it every game as White.",
    bestFor:
      "Players who want a reliable, low-theory opening they can play against anything Black throws at them. Instead of memorizing 20 different lines, you learn one system of development. It teaches the value of solid piece placement and pawn structure over tactical complications.",
    famousPlayers: ["Magnus Carlsen", "Gata Kamsky", "Baadur Jobava", "Richard Rapport"],
  },
  moves: [
    {
      san: "d4",
      color: "white",
      why: "Claims the center with a pawn on d4, controlling the key e5 and c5 squares. Unlike 1.e4, this move doesn't immediately open diagonals for attacking pieces — instead it signals a more strategic, positional approach. The d4 pawn will become the foundation of White's pyramid structure.",
      concepts: ["center-control", "space"],
      controls: "e5, c5 squares",
      commonMistakes: [
        { san: "e4", whyBad: "e4 is also a great first move, but it leads to open, tactical games (Italian, Ruy Lopez, etc.). We're learning the London System which starts with d4 — a more strategic, positional approach. Both are equally valid." },
        { san: "Nf3", whyBad: "Nf3 is flexible but delays claiming the center with a pawn. d4 stakes an immediate central claim and controls key squares. Grab space with a pawn first, then develop pieces." },
        { san: "c4", whyBad: "c4 (the English Opening) is fine but leads to completely different structures. The London System's identity comes from d4 + Bf4 — c4 leads to Queen's Gambit territory instead." },
      ],
    },
    {
      san: "d5",
      color: "black",
      why: "Black mirrors the central claim, establishing a pawn on d5 to contest the center. This is the most solid response, preventing White from playing e4 easily and ensuring Black gets fair central space.",
      concepts: ["center-control"],
      controls: "e4, c4 squares",
    },
    {
      san: "Bf4",
      color: "white",
      why: "The signature move of the London System — the dark-squared bishop MUST come out before e3, or it gets permanently trapped behind its own pawns. From f4, the bishop controls the important e5 square and sits on an active diagonal where it influences the center and kingside. This is the move that defines the entire opening.",
      concepts: ["development", "piece-activity", "center-control"],
      controls: "e5 square, c1-h6 diagonal",
      prevents: "Black from easily occupying e5 with a knight or pawn",
      commonMistakes: [
        {
          san: "e3",
          whyBad:
            "Playing e3 before Bf4 is the single biggest mistake in the London System. It locks the dark-squared bishop behind the e3 pawn with no good diagonal. The bishop would be stuck on c1 doing nothing for the entire game. Always remember: Bf4 THEN e3, never the reverse.",
        },
        {
          san: "Nf3",
          whyBad:
            "While Nf3 is a fine developing move, playing it before Bf4 allows Black to play ...Nh5 attacking the bishop later with tempo. Getting Bf4 in first establishes the bishop before Black can challenge it efficiently.",
        },
      ],
    },
    {
      san: "Nf6",
      color: "black",
      why: "Black develops the kingside knight to its most natural square, attacking the e4 square and preparing to castle. The knight also eyes the h5 square, where it could later challenge White's bishop on f4.",
      concepts: ["development", "center-control"],
      controls: "e4, d5 squares",
    },
    {
      san: "e3",
      color: "white",
      why: "Now that the bishop is safely on f4, e3 solidifies the center by supporting the d4 pawn. This creates the first two stones of the pyramid structure (d4 and e3). The pawn on e3 is not passive — it's a structural choice that gives White an incredibly solid, hard-to-break center while opening the diagonal for the light-squared bishop.",
      concepts: ["center-control", "pawn-structure", "development"],
      controls: "d4 support, f4 square",
      prevents: "Black from undermining d4 easily",
      commonMistakes: [
        { san: "c4", whyBad: "c4 is aggressive but commits the c-pawn too early. In the London, c3 is the key move to complete the pyramid (c3-d4-e3). If you play c4, you can never build that rock-solid triangle. Preparation before ambition." },
        { san: "Nc3", whyBad: "Nc3 develops a piece but BLOCKS the c-pawn from going to c3. The London pyramid needs c3 — if the knight sits on c3, you'll never complete the structure. The knight goes to d2 in this system." },
        { san: "e4", whyBad: "e4 looks aggressive but leaves d4 underprotected and opens lines your position isn't ready for. e3 is more solid — it supports d4, completes the pyramid foundation, and keeps things under control. The London is about structure, not aggression." },
      ],
    },
    {
      san: "c5",
      color: "black",
      why: "Black strikes at White's d4 pawn from the side, the standard way to challenge a d4 center. This is the most principled response — if Black doesn't fight for the center now, White will consolidate with c3 and have a risk-free space advantage.",
      concepts: ["center-control", "space"],
      controls: "d4 pawn, b4 square",
    },
    {
      san: "c3",
      color: "white",
      why: "Completes the famous London System pyramid — pawns on c3, d4, and e3 form an incredibly resilient triangular structure. The c3 pawn gives d4 extra support, making it nearly impossible for Black to break down the center. This structure is the backbone of the entire system and the reason the London is so solid.",
      concepts: ["center-control", "pawn-structure"],
      controls: "d4 support, b4 square",
      prevents: "Black from successfully undermining d4 with ...c5 or ...Qb6 pressure",
      commonMistakes: [
        {
          san: "dxc5",
          whyBad:
            "Capturing on c5 surrenders your strong central pawn and gives Black exactly what they want — an open position where White's solid but slow setup doesn't shine. The whole point of the pyramid (c3-d4-e3) is to maintain the center, not trade it away.",
        },
        {
          san: "Nc3",
          whyBad:
            "Developing the knight to c3 blocks the c-pawn from going to c3, ruining the pyramid structure. In the London System, the c-pawn belongs on c3 to support d4, so the queenside knight goes to d2 instead.",
        },
      ],
    },
    {
      san: "Nc6",
      color: "black",
      why: "Black develops the queenside knight to its natural square, adding more pressure to d4 and controlling the e5 square. The knight on c6 coordinates with the c5 pawn to maintain tension against White's center.",
      concepts: ["development", "center-control"],
      controls: "d4, e5 squares",
    },
    {
      san: "Nd2",
      color: "white",
      why: "The knight goes to d2 instead of c3 for a very specific reason — c3 is occupied by the pawn (the pyramid!). From d2, the knight will reroute to f3 where it supports d4 and aims at the kingside. Nd2 also keeps the queen's connection to the a4 and b3 squares open, and the knight itself can sometimes swing to b3 to pressure c5.",
      concepts: ["development", "preparation"],
      controls: "Supports e4 push, reroutes to f3",
      prevents: "Nothing directly, but the knight from d2 is incredibly flexible",
      commonMistakes: [
        {
          san: "Nc3",
          whyBad:
            "Again, Nc3 blocks the c3 pawn. If you've already played c3, then Nc3 is simply illegal. The whole London structure depends on the c-pawn being on c3, so the knight must go to d2. This is a fundamental pattern to internalize.",
        },
        {
          san: "Bd3",
          whyBad:
            "Bd3 develops but the knight should come first. Nd2 keeps options open — the knight can reroute to f3, b3, or even e4 later. Develop knights before bishops when possible because knights have fewer good squares.",
        },
        {
          san: "Qc2",
          whyBad:
            "Don't bring the queen out early! Qc2 looks like it prepares e4, but the queen becomes a target for Black's minor pieces. Nd2 quietly prepares the same e4 push without exposing your queen.",
        },
      ],
    },
    {
      san: "e6",
      color: "black",
      why: "Black solidifies the d5 pawn with e6, creating a strong central chain. This is the most solid setup — the d5-e6 structure is rock-solid. The downside is that Black's light-squared bishop is now locked behind the e6 pawn, a common issue in closed d4 openings.",
      concepts: ["center-control", "pawn-structure"],
      controls: "d5 support, f5 square",
    },
    {
      san: "Ngf3",
      color: "white",
      why: "The second knight develops to its ideal square. With Nd2 already placed, Ngf3 completes the minor piece development on the kingside and adds another defender to d4. The knight on f3 also supports a future e4 push if the position calls for it, and prepares kingside castling.",
      concepts: ["development", "center-control", "king-safety"],
      controls: "e5, d4 squares",
      commonMistakes: [
        { san: "Bd3", whyBad: "Bd3 develops but doesn't help with castling as directly. Ngf3 is more urgent — it completes kingside development, supports d4, controls e5, and prepares O-O. Develop the knight before the bishop here." },
        { san: "Be2", whyBad: "Be2 is passive — the bishop sits on a dead diagonal doing nothing. The bishop belongs on d3 where it targets h7 and supports e4. But first finish with Ngf3 to prepare castling." },
        { san: "h3", whyBad: "h3 is a waste of time. No Black piece is threatening to come to g4 yet, and even if it did, you have more important moves. Don't play prophylactic pawn moves when you still have pieces to develop." },
      ],
    },
    {
      san: "Bd6",
      color: "black",
      why: "Black develops the dark-squared bishop to an active diagonal, and importantly offers a trade of dark-squared bishops. If White's Bf4 is traded off, Black removes one of the key pieces of the London System. The bishop on d6 also supports the e5 square, a potential outpost for Black's pieces.",
      concepts: ["development", "piece-activity"],
      controls: "e5 square, b8-h2 diagonal",
    },
    {
      san: "Bg3",
      color: "white",
      why: "White retreats the bishop to g3 rather than allowing the trade on f4. This is a critical decision — the dark-squared bishop is the soul of the London System, and keeping it alive maintains long-term pressure on the h2-b8 diagonal. From g3 the bishop remains active, eyeing the e5 square and potentially supporting a kingside attack later.",
      concepts: ["piece-activity", "prophylaxis"],
      controls: "e5 square, h2-b8 diagonal",
      prevents: "Black from trading off the London bishop, which would ease their position significantly",
      commonMistakes: [
        { san: "Bxd6", whyBad: "Trading your London bishop voluntarily is a strategic mistake! The dark-squared bishop is your most important piece in this system. After Bxd6 Qxd6, Black gets a great queen position and you've given up the piece your entire opening revolves around." },
        { san: "Be5", whyBad: "Be5 looks aggressive but the bishop is exposed and will be chased with ...f6 or ...Nd7. Bg3 is safer — the bishop stays active on the diagonal but can't be easily attacked. Don't overextend pieces." },
        { san: "O-O", whyBad: "Castling before dealing with the bishop threat is sloppy. After ...Bxf4 exf4, your pawn structure is wrecked with a doubled f-pawn. Handle the bishop situation first (Bg3), THEN castle." },
      ],
    },
    {
      san: "O-O",
      color: "black",
      why: "Black castles kingside to bring the king to safety and connect the rooks. With pieces developed and the center stable, this is the natural moment to castle. The rook on f8 will also be useful if Black opens the f-file later.",
      concepts: ["king-safety", "development"],
      controls: "King safety, rook activation",
    },
    {
      san: "Bd3",
      color: "white",
      why: "The light-squared bishop develops to d3, completing the London System's bishop pair development pattern. From d3, the bishop points at the kingside along the b1-h7 diagonal, creating latent threats against Black's castled king. It also supports a future e4 pawn break. With Bd3, White is now ready to castle and has a fully coordinated position.",
      concepts: ["development", "attack", "king-safety"],
      controls: "h7 square, b1-h7 diagonal",
      commonMistakes: [
        { san: "Be2", whyBad: "Be2 is the classic passive bishop mistake. On e2, the bishop has no target and just blocks your pieces. On d3, it aims directly at h7 — a real attacking threat against Black's castled king. Active vs passive is a huge difference." },
        { san: "O-O", whyBad: "Castling is close to happening, but developing Bd3 first is more accurate. The bishop needs to get to d3 before you castle — once you castle, you might need the f1 square for rook maneuvers. Develop first, castle when ready." },
        { san: "Qc2", whyBad: "Don't bring the queen out early when you still have a bishop to develop! Bd3 develops a piece AND creates the Bxh7+ threat. Qc2 does support e4 but the queen is exposed to attacks from Black's pieces." },
      ],
    },
    {
      san: "b6",
      color: "black",
      why: "Black prepares to fianchetto the light-squared bishop to b7, solving the problem of the bishop being locked behind e6. From b7, the bishop will pressure the long diagonal and target e4, challenging White's center from a distance.",
      concepts: ["development", "piece-activity"],
      controls: "Prepares Bb7 on the long diagonal",
    },
  ],
  summary:
    "The London System teaches you to think in terms of a SETUP rather than memorized moves. The key principles are: develop the dark-squared bishop to f4 BEFORE playing e3 (or it gets locked in forever), build the unbreakable c3-d4-e3 pyramid, route the queenside knight through d2 (since c3 is taken by the pawn), and develop both bishops to active diagonals (Bf4 and Bd3). The London is ideal for learning because it shows how a coherent system of development — where every piece has a clear destination — can give you a solid, playable position against virtually any opponent.",
  variants: [
    {
      id: "kings-indian-setup",
      name: "King's Indian Setup",
      description: "Black fianchettoes with g6 instead of playing d5 — aiming for a King's Indian structure against the London.",
      branchesAt: 1,
      opponentMove: {
        san: "g6",
        color: "black",
        why: "Instead of contesting the center with d5, Black fianchettoes the kingside bishop. The idea: the bishop on g7 will be a powerful piece aimed at the center and queenside. Black delays central confrontation in favor of piece development.",
        concepts: ["development", "piece-activity"],
      },
      moves: [
        {
          san: "Bf4",
          color: "white",
          why: "Same principle — get the bishop out before e3. Whether Black plays d5 or g6, the London setup is the same. That's the beauty of a system opening.",
          concepts: ["development", "piece-activity"],
          commonMistakes: [
            { san: "e3", whyBad: "e3 before Bf4 traps the dark-squared bishop behind its own pawns permanently. This is the number one London System mistake — always get the bishop out FIRST, regardless of what Black plays." },
            { san: "c4", whyBad: "c4 changes the character of the game entirely — you'd be entering Queen's Gambit territory. The London's strength is that you play the same setup every game. Stick to the system: Bf4 first." },
          ],
        },
        {
          san: "Bg7",
          color: "black",
          why: "Complete the fianchetto. The bishop on g7 is a monster on the long diagonal, eyeing b2 and the queenside. Black's plan is to play d6, Nf6, O-O, and then challenge with c5 or e5.",
          concepts: ["development", "piece-activity"],
        },
        {
          san: "e3",
          color: "white",
          why: "The bishop is out, so e3 is safe now. Build the pyramid. Against the fianchetto, White doesn't need to rush — the London setup works against everything.",
          concepts: ["center-control", "pawn-structure"],
          commonMistakes: [
            {
              san: "c3",
              whyBad: "c3 before e3 is premature here. You haven't secured the dark-squared bishop yet, and e3 is more important for the pawn pyramid. c3 comes later.",
            },
          ],
        },
        {
          san: "d6",
          color: "black",
          why: "A flexible move supporting e5 while keeping the center fluid. Black prepares Nf6 and castling, planning to break with c5 or e5 later.",
          concepts: ["center-control", "preparation"],
        },
        {
          san: "Nf3",
          color: "white",
          why: "Develop the knight to its natural square. Controls e5 and supports d4. The London setup continues regardless of what Black does — that's its main selling point.",
          concepts: ["development"],
          commonMistakes: [
            { san: "Nc3", whyBad: "Nc3 blocks the c-pawn from going to c3 later. In the London, c3 is essential for the pyramid. The knight should go to d2, and the kingside knight to f3." },
            { san: "Bd3", whyBad: "Bd3 is premature — finish knight development first. Nf3 controls e5 (critical against the fianchetto), supports d4, and prepares castling. Knights before bishops." },
          ],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Develop the knight, prepare to castle. Black's setup is very flexible and can transpose into many structures depending on how White continues.",
          concepts: ["development", "king-safety"],
        },
      ],
    },
    {
      id: "early-c5",
      name: "Early ...c5 Challenge",
      description: "Black plays c5 early to immediately challenge White's d4 center before the London setup is complete.",
      branchesAt: 3,
      opponentMove: {
        san: "c5",
        color: "black",
        why: "An aggressive response! Black immediately challenges d4 before White can solidify with e3 and c3. This forces White to make a decision about the center right away.",
        concepts: ["center-control", "attack"],
        controls: "d4 pawn — direct challenge",
      },
      moves: [
        {
          san: "e3",
          color: "white",
          why: "Calmly reinforce d4. The London doesn't panic when challenged — you just build the pyramid. If Black takes on d4, you recapture with exd4 and have a solid center.",
          concepts: ["center-control", "pawn-structure"],
          commonMistakes: [
            {
              san: "dxc5",
              whyBad: "Capturing on c5 gives up your central pawn for a flank pawn. You'd lose your strong d4 presence for nothing. Keep the tension — let Black decide whether to trade.",
            },
            {
              san: "c3",
              whyBad: "c3 before e3 leaves d4 only supported by the queen. e3 first gives d4 solid pawn support and starts the pyramid. The order matters: e3 first, c3 next.",
            },
          ],
        },
        {
          san: "Nc6",
          color: "black",
          why: "Develop the knight and add more pressure to d4. Black is building up force against the center before White can consolidate.",
          concepts: ["development", "center-control"],
        },
        {
          san: "c3",
          color: "white",
          why: "Extra support for d4 and the pyramid is complete: c3-d4-e3. This structure is nearly unbreakable. Even if Black plays cxd4, you recapture cxd4 or exd4 and maintain the center.",
          concepts: ["center-control", "pawn-structure"],
          commonMistakes: [
            { san: "Nc3", whyBad: "The c3 square belongs to the pawn in the London System. Nc3 blocks the entire pyramid structure. Route the knight through d2 instead." },
            { san: "Nf3", whyBad: "Nf3 develops but c3 is more urgent here. Black is pressing d4 with ...c5 and ...Nc6 — you need the pyramid completed before it collapses. Secure the structure first, then develop." },
          ],
        },
        {
          san: "Qb6",
          color: "black",
          why: "The queen puts pressure on b2 and d4 simultaneously. This is a common idea in the London — Black targets the b2 pawn which can become weak in some lines.",
          concepts: ["attack", "piece-activity"],
        },
        {
          san: "Qb3",
          color: "white",
          why: "Meet the queen with the queen! Qb3 defends b2 and offers a queen trade. If Black trades, the b-file opens for your rook. If they decline, the queens stare each other down.",
          concepts: ["prophylaxis", "development"],
          commonMistakes: [
            { san: "Qc2", whyBad: "Qc2 defends b2 but passively. Qb3 is better because it directly confronts Black's queen, offers an exchange that favors White (opening the b-file for your rook), and puts pressure on the b7 pawn." },
            { san: "Rb1", whyBad: "Rb1 defends b2 but wastes a whole rook on a passive task. Qb3 defends AND creates counterplay. Don't use your most powerful pieces for defensive chores when the queen can do it while attacking." },
          ],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Continue development. Black has created some pressure but White's position is solid. The battle will be about whether Black can crack the London pyramid.",
          concepts: ["development"],
        },
      ],
    },
  ],
};
