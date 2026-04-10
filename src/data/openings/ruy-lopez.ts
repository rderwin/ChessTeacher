import { OpeningLine } from "../types";

export const ruyLopez: OpeningLine = {
  id: "ruy-lopez",
  name: "Ruy Lopez",
  fullName: "Ruy Lopez (Spanish Opening)",
  eco: "C60",
  playerColor: "white",
  level: "intermediate",
  description:
    "The most deeply analyzed opening in chess history, where White's bishop pins the knight defending e5, creating long-term strategic pressure against Black's center.",
  history: {
    origin:
      "Named after Ruy Lopez de Segura, a 16th-century Spanish priest and chess enthusiast who analyzed it in his 1561 treatise. Though the moves were known earlier, Lopez was the first to study the opening systematically. It became the dominant choice for White after 1.e4 e5 in the mid-1800s and has remained so ever since — over 450 years of continuous top-level play.",
    nameExplanation:
      "Called the \"Ruy Lopez\" after its analyst, or the \"Spanish Opening\" after his nationality. The main line covered here is the \"Morphy Defense\" (3...a6), named after Paul Morphy who demonstrated that this move — seemingly losing a tempo — actually gives Black the most flexible and resilient setup.",
    popularity:
      "The single most analyzed opening in all of chess. At the highest levels, it has been a cornerstone of 1.e4 play for over a century. It appears constantly in world championship matches and elite tournaments. At the amateur level, understanding the Ruy Lopez teaches you how strategic pressure works over many moves.",
    bestFor:
      "Positional players who enjoy long-term strategic pressure rather than quick tactical fireworks. The Ruy Lopez rewards patience — you build advantages gradually by restricting Black's options, maintaining tension, and preparing a central break with d4 at the perfect moment.",
    famousPlayers: ["Bobby Fischer", "Anatoly Karpov", "Fabiano Caruana", "Viswanathan Anand"],
  },
  moves: [
    {
      san: "e4",
      color: "white",
      why: "Stakes an immediate claim to the center by occupying e4 with a pawn. This controls the critical d5 and f5 squares, limiting Black's options for central counterplay. It also opens diagonals for your queen and light-squared bishop — development starts with this single move.",
      concepts: ["center-control", "development"],
      controls: "d5, f5 squares",
    },
    {
      san: "e5",
      color: "black",
      why: "Black mirrors White's strategy, fighting for equal central space. The pawn on e5 controls d4 and f4, preventing White from dominating the center unchallenged.",
      concepts: ["center-control"],
      controls: "d4, f4 squares",
    },
    {
      san: "Nf3",
      color: "white",
      why: "Develops a knight to its most natural square while attacking Black's e5 pawn. This is the principle of 'every move should do two things' — you develop AND create a threat. Black must now respond to the pressure on e5 before freely continuing development.",
      concepts: ["development", "attack", "center-control"],
      controls: "e5 pawn, d4 square",
      prevents: "Black from comfortably playing d5 or developing without addressing e5",
      commonMistakes: [
        {
          san: "Bc4",
          whyBad:
            "Bc4 develops a piece but doesn't create an immediate threat against e5. Nf3 is more precise because it forces Black to defend, giving you tempo. Always prefer moves that develop WITH a threat.",
        },
      ],
    },
    {
      san: "Nc6",
      color: "black",
      why: "The most natural defense of e5. The knight develops to c6 where it controls the key d4 and e5 squares. Defending with a piece (rather than a pawn like ...d6) keeps Black's position flexible and active.",
      concepts: ["development", "center-control"],
      controls: "d4, e5 squares",
    },
    {
      san: "Bb5",
      color: "white",
      why: "The defining move of the Ruy Lopez. Instead of targeting f7 directly (Bc4), the bishop pins the knight that defends e5. This creates indirect pressure on e5 — if the knight ever moves or gets exchanged, the e5 pawn falls. The brilliance is that White doesn't need to capture on c6 immediately; the THREAT of capturing is what gives White long-term strategic leverage.",
      concepts: ["development", "attack", "piece-activity"],
      controls: "c6 knight, e5 pawn indirectly, a4-e8 diagonal",
      prevents: "Black from moving the Nc6 without losing the e5 pawn",
      commonMistakes: [
        {
          san: "Bc4",
          whyBad:
            "Bc4 leads to the Italian Game — a fine opening, but Bb5 is considered more strategically sophisticated. Bb5 creates long-term pressure on e5 through the pin on Nc6, while Bc4 targets f7 which Black can defend. The Ruy Lopez gives White a slower but more enduring advantage.",
        },
        {
          san: "d4",
          whyBad:
            "Premature — after exd4, Nxd4 Nxd4, Qxd4, you've traded pieces and given Black easy development. The Ruy Lopez philosophy is to build pressure gradually, not rush into exchanges.",
        },
      ],
    },
    {
      san: "a6",
      color: "black",
      why: "The Morphy Defense — Black asks the bishop a direct question: 'Where are you going?' This seemingly modest pawn move is actually deeply strategic. It forces the bishop to declare its intentions and prepares ...b5 to push the bishop further back, while gaining space on the queenside.",
      concepts: ["tempo", "space"],
      controls: "b5 square, challenges the Bb5",
    },
    {
      san: "Ba4",
      color: "white",
      why: "The bishop retreats but maintains its pressure on the c6 knight along the diagonal. This is a key Ruy Lopez concept — the bishop isn't running away, it's repositioning while keeping the same strategic threat. From a4, it still pins the knight to the king (or queen after ...Be7). White preserves the tension rather than resolving it with Bxc6, which would give Black the bishop pair and a solid center.",
      concepts: ["piece-activity", "prophylaxis"],
      controls: "c6 knight via a4-e8 diagonal",
      prevents: "The pin on Nc6 from being broken cheaply",
      commonMistakes: [
        {
          san: "Bxc6",
          whyBad:
            "Capturing on c6 relieves all the tension! After ...dxc6, Black gets the bishop pair, a strong center, and easy development. The whole point of the Ruy Lopez is maintaining this pressure — Bxc6 gives up your strategic asset for nothing. Only exchange when you get something concrete in return.",
        },
      ],
    },
    {
      san: "Nf6",
      color: "black",
      why: "Black develops the kingside knight to its best square, attacking White's e4 pawn and preparing to castle. The knight on f6 also supports a future ...d5 central break. Black is following sound development principles while White's bishop on a4 has spent two moves to stay on the same diagonal.",
      concepts: ["development", "attack"],
      controls: "e4, d5 squares",
    },
    {
      san: "O-O",
      color: "white",
      why: "White castles kingside, tucking the king to safety and connecting the rooks. This is also a subtle attacking move — by castling, the rook on f1 now supports a future f2-f4 push or can swing to e1 to add pressure to the e-file. Castling before opening the center is a critical principle: secure your king first, then fight for the center.",
      concepts: ["king-safety", "development"],
      controls: "Activates the Rf1 for future play on the e-file or f-file",
      commonMistakes: [
        {
          san: "d3",
          whyBad:
            "d3 is too slow and passive — it blocks in the c1-bishop and misses the chance to castle while the position is still calm. Castle first, then you can choose between d3 (solid) or d4 (ambitious) depending on how Black responds.",
        },
      ],
    },
    {
      san: "Be7",
      color: "black",
      why: "Black develops the bishop to a modest but solid square, preparing to castle kingside. The bishop on e7 breaks the pin along the a4-e8 diagonal (the king will no longer be behind the knight after castling). This is the Closed Ruy Lopez setup — solid and resilient, with counterplay coming later.",
      concepts: ["development", "king-safety"],
      controls: "Breaks the a4-e8 pin, clears the path for castling",
    },
    {
      san: "Re1",
      color: "white",
      why: "The rook moves to e1, directly supporting the e4 pawn and eyeing the entire e-file. This is prophylactic and ambitious at once — the rook defends e4 so the knight on f3 is free to reposition, and it prepares for the eventual central break with d4. When the center opens, this rook will be a powerhouse on the open e-file, especially against Black's king or the e5 pawn.",
      concepts: ["development", "prophylaxis", "preparation"],
      controls: "e-file, supports e4 pawn",
      prevents: "Tactics against the e4 pawn, and prepares d4 break",
    },
    {
      san: "b5",
      color: "black",
      why: "Black kicks the bishop further away, gaining queenside space. After ...b5, the bishop must retreat to b3, where it no longer pressures c6 along the same diagonal. Black is fighting for the initiative on the queenside and gaining room for pieces like ...Bb7 later. This is the typical Morphy Defense plan — chase the bishop, then counter in the center.",
      concepts: ["space", "tempo"],
      controls: "a4 square, pushes the bishop back",
    },
    {
      san: "Bb3",
      color: "white",
      why: "The bishop retreats to b3, and while it's been pushed back twice, it actually lands on an excellent diagonal. From b3, the bishop targets the d5 square and the f7 pawn — two critical points in Black's position. The bishop has traded queenside influence for central and kingside potential. This is a key lesson: a retreat isn't always a concession if the piece lands on a better square.",
      concepts: ["piece-activity", "prophylaxis"],
      controls: "d5 square, f7 pawn, a2-g8 diagonal",
    },
    {
      san: "d6",
      color: "black",
      why: "Black solidifies the e5 pawn with ...d6, creating a firm central structure. This is the hallmark of the Closed Ruy Lopez — a solid but slightly passive pawn chain. The pawn on d6 also opens the diagonal for the c8-bishop, though developing it remains a long-term challenge in this setup.",
      concepts: ["center-control", "pawn-structure"],
      controls: "e5 pawn, c5 and e5 squares",
    },
    {
      san: "c3",
      color: "white",
      why: "Prepares the powerful d4 central break — the strategic goal of the entire Ruy Lopez. With c3 played, d4 will come with full pawn support: if Black takes exd4, White recaptures cxd4 maintaining an ideal pawn center. This is the culmination of White's opening strategy — every piece is developed, the king is safe, and now it's time to fight for the center. Patience has paid off.",
      concepts: ["center-control", "preparation"],
      controls: "d4 square",
      prevents: "Black from comfortably maintaining the center after d4",
      commonMistakes: [
        {
          san: "d4",
          whyBad:
            "Playing d4 without c3 preparation means after exd4, Nxd4 Nxd4, Qxd4, you've made exchanges that ease Black's cramped position. With c3 first, cxd4 keeps a strong pawn duo. Preparation before execution — the Ruy Lopez demands patience.",
        },
        {
          san: "d3",
          whyBad:
            "d3 is the slow, solid approach — it's not bad, but it surrenders the chance for a powerful pawn center. The whole point of the Ruy Lopez middlegame is the d4 break. c3 followed by d4 is White's main plan and the most principled continuation.",
        },
      ],
    },
    {
      san: "O-O",
      color: "black",
      why: "Black castles kingside, completing development of the king and connecting the rooks. Both sides now have their kings safely castled and their major pieces ready for the middlegame. The stage is set for the critical d4 break and the strategic battle that defines the Ruy Lopez.",
      concepts: ["king-safety", "development"],
      controls: "Activates the Rf8, completes kingside development",
    },
  ],
  summary:
    "The Ruy Lopez teaches the art of long-term strategic pressure. Unlike openings that seek immediate tactical confrontation, here you learned to build an advantage gradually — pinning the knight with Bb5, maintaining tension rather than releasing it, retreating the bishop to better diagonals, and patiently preparing the d4 central break with c3. The key lesson is that the THREAT of action (capturing on c6, breaking with d4) is often more powerful than executing it prematurely. This is the foundation of positional chess.",
};
