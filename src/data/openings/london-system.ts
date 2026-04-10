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
};
