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
      commonMistakes: [
        { san: "d4", whyBad: "d4 is a fine first move but leads to Queen's Gambit/London territory. We're learning the Ruy Lopez which starts with e4 — the king pawn opening leads to sharper, more tactical positions." },
        { san: "Nf3", whyBad: "Nf3 is flexible but delays the central claim. e4 grabs space immediately AND opens the bishop's diagonal. Claim the center with a pawn when you can." },
      ],
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
        {
          san: "d4",
          whyBad: "d4 immediately is the Center Game — after exd4 Qxd4, your queen is exposed. Nf3 develops with a threat first, and d4 can come later after proper preparation.",
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
        {
          san: "Be2",
          whyBad: "Retreating to e2 throws away all the pressure you've built. Ba4 maintains the pin on the c6 knight along the diagonal. The bishop is not retreating — it's repositioning while keeping the same strategic threat.",
        },
        {
          san: "Bc4",
          whyBad: "Bc4 targets f7 but gives up the pin on the c6 knight entirely. Ba4 keeps the pressure on e5 through the pin — the indirect threat is more powerful than a direct one here.",
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
        {
          san: "Nc3",
          whyBad: "Nc3 develops but blocks the c-pawn from going to c3. In the Ruy Lopez, c3 is essential to prepare d4. If the knight sits on c3, the whole d4 plan falls apart. Castle first, then prepare c3+d4.",
        },
        {
          san: "Bxc6",
          whyBad: "Still too early to capture! Maintain the tension. Castling gets the king safe AND keeps all the pressure on. The threat of Bxc6 is more powerful than actually doing it.",
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
      commonMistakes: [
        { san: "d3", whyBad: "d3 is passive and commits too early. Re1 supports e4 while keeping ALL options open — d3, d4, c3+d4. The Ruy Lopez is about flexibility and not committing prematurely." },
        { san: "d4", whyBad: "d4 without c3 preparation means after exd4 Nxd4, you move the knight twice. Re1 first supports e4, then c3 prepares d4 properly. Patience is the Ruy Lopez way." },
        { san: "Nc3", whyBad: "Nc3 blocks the c-pawn! You need c3 to prepare d4 — the whole plan. Re1 is more useful right now: it supports e4 and prepares the central break properly." },
      ],
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
      commonMistakes: [
],
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
  variants: [
    {
      id: "berlin",
      name: "Berlin Defense",
      description: "Black plays Nf6 instead of a6, inviting the famous 'Berlin Wall' endgame that frustrated even Kasparov.",
      branchesAt: 5,
      opponentMove: {
        san: "Nf6",
        color: "black",
        why: "The Berlin Defense! Instead of asking the bishop 'where are you going?' with a6, Black immediately counter-attacks e4. This leads to a famous endgame variation where queens come off early — it's solid, drawish, and incredibly hard for White to break down.",
        concepts: ["development", "center-control"],
        controls: "e4 pawn — direct counter-attack",
      },
      moves: [
        {
          san: "O-O",
          color: "white",
          why: "Castle first before dealing with the e4 pressure. The king is safe and the rook comes to e1 to defend e4. A calm, classical response.",
          concepts: ["king-safety", "development"],
          commonMistakes: [
            {
              san: "Bxc6",
              whyBad: "Taking on c6 immediately gives Black the bishop pair and a solid center. Better to castle first and keep the tension — the threat of Bxc6 is stronger than the execution.",
            },
          ],
        },
        {
          san: "Nxe4",
          color: "black",
          why: "Black takes the e4 pawn! This looks bold, but it's perfectly sound. After White recaptures, the game heads into a famous endgame where Black is very solid, if slightly passive.",
          concepts: ["center-control"],
        },
        {
          san: "d4",
          color: "white",
          why: "Strike back in the center immediately. This opens lines and challenges Black's knight on e4. White aims to exploit the temporary awkwardness of Black's pieces.",
          concepts: ["center-control", "attack"],
          commonMistakes: [
            { san: "Re1", whyBad: "Re1 attacks the knight but d4 is more energetic. d4 opens the center AND attacks the knight simultaneously — two purposes in one move. Strike while the iron is hot." },
            { san: "Nxe5", whyBad: "Nxe5 wins a pawn but after ...Nd6, Black recovers well. d4 is more principled — it opens the center for your better-developed pieces. Strategy over grabbing pawns." },
          ],
        },
        {
          san: "Nd6",
          color: "black",
          why: "The knight retreats to d6, blocking the d-file but attacking the bishop on b5. This is the key move of the Berlin — it looks ugly but it's strategically correct.",
          concepts: ["piece-activity"],
        },
        {
          san: "Bxc6",
          color: "white",
          why: "Now is the right time to capture. After dxc6, Black has doubled pawns but active pieces. The ensuing endgame is the 'Berlin Wall' — extremely hard for White to win despite the structural advantage.",
          concepts: ["pawn-structure"],
          commonMistakes: [
            { san: "dxe5", whyBad: "dxe5 Nxb5 loses the bishop for nothing. Bxc6 first damages the pawn structure, THEN you can take on e5. Move order is critical — capture on c6 before Black can win the bishop." },
            { san: "Nxe5", whyBad: "Nxe5 Nxe5 dxe5 and Black's knight on e4 is very strong. Bxc6 first is more precise — damage the structure, then fight for the center." },
          ],
        },
        {
          san: "dxc6",
          color: "black",
          why: "Recapture toward the center. Black now has doubled c-pawns but the bishop pair and an active position. Kramnik used this to dethrone Kasparov in 2000 — it's THAT solid.",
          concepts: ["pawn-structure", "piece-activity"],
        },
      ],
    },
    {
      id: "exchange",
      name: "Exchange Variation",
      description: "White captures Bxc6 immediately instead of retreating to a4 — the simplest and most direct approach.",
      branchesAt: 6,
      opponentMove: {
        san: "Bxc6",
        color: "white",
        why: "The Exchange Variation! White gives up the bishop pair to damage Black's pawn structure immediately. After dxc6, Black has doubled c-pawns — a long-term weakness. Fischer loved this variation and won many games exploiting the structural advantage in the endgame.",
        concepts: ["pawn-structure", "attack"],
        controls: "Damages Black's queenside pawns permanently",
      },
      moves: [
        {
          san: "dxc6",
          color: "black",
          why: "Recapture toward the center. Black gets doubled c-pawns but keeps the bishop pair and central presence. The alternative bxc6 is also played but gives White an easier game.",
          concepts: ["pawn-structure", "center-control"],
        },
        {
          san: "d3",
          color: "white",
          why: "A quiet move that prepares to develop the bishop. White's plan is simple: trade pieces, reach an endgame, and exploit Black's doubled pawns. Fischer's approach — slow, patient, deadly.",
          concepts: ["preparation", "development"],
          commonMistakes: [
            {
              san: "d4",
              whyBad: "d4 is too committal here. After exd4, the center opens and Black's bishops become very active. d3 is more flexible — White keeps options open and prepares a slow squeeze.",
            },
          ],
        },
        {
          san: "f6",
          color: "black",
          why: "Securing the e5 pawn so it can't be challenged easily. Black prepares to develop the knight to e7 and the bishop to e6, building a solid position despite the structural weakness.",
          concepts: ["center-control", "prophylaxis"],
        },
        {
          san: "Be3",
          color: "white",
          why: "Develop the bishop actively. It eyes the a7 pawn and supports a potential c4-c5 advance later. White's plan is methodical: complete development, then exploit the pawn structure.",
          concepts: ["development", "piece-activity"],
          commonMistakes: [
            { san: "Bg5", whyBad: "Bg5 pins the f6 pawn but there's no knight to pin here. Be3 is more useful — it develops toward the queenside where the action will be. Develop pieces where they have targets." },
            { san: "Bf4", whyBad: "Bf4 is less active than Be3 in this structure. Be3 supports c4 ideas and pressures a7. Place bishops where they work with your pawn structure." },
          ],
        },
        {
          san: "Ne7",
          color: "black",
          why: "The knight goes to e7 rather than f6 (which would block the f-pawn). From e7 it can go to g6, supporting the kingside, or to d5 if the center opens.",
          concepts: ["development", "piece-activity"],
        }
      ],
    },
    // ============ Black's responses to 3.Bb5 — additional defenses ============
    {
      id: "berlin-defense",
      name: "Berlin Defense (3...Nf6)",
      description: "Black plays the rock-solid Berlin Defense. Famously played by Kramnik against Kasparov. Solid endgame strategy required.",
      branchesAt: 5,
      opponentMove: { san: "Nf6", color: "black", why: "The Berlin — extremely solid. Black is willing to play a difficult endgame.", concepts: ["development"] },
      moves: [
        { san: "O-O", color: "white", why: "Castle. The main line of the Berlin involves the wild ...Nxe4.", concepts: ["king-safety"] },
        { san: "Nxe4", color: "black", why: "Black grabs the e-pawn temporarily — a key Berlin idea.", concepts: ["attack"] },
        { san: "d4", color: "white", why: "Open the center to challenge the e4 knight.", concepts: ["center-control"] },
        { san: "Nd6", color: "black", why: "The knight retreats to d6, attacking your bishop.", concepts: ["piece-activity"] },
        { san: "Bxc6", color: "white", why: "Take the knight — leads to the famous Berlin Wall endgame after dxc6 dxe5.", concepts: ["piece-activity"] },
        { san: "dxc6", color: "black", why: "Recapture.", concepts: ["pawn-structure"] },
        { san: "dxe5", color: "white", why: "Open the center. The Berlin endgame — technical but slight White edge.", concepts: ["center-control"] },
        { san: "Nf5", color: "black", why: "Black activates the knight.", concepts: ["piece-activity"] },
      ],
    },
    {
      id: "steinitz-defense",
      name: "Steinitz Defense (3...d6)",
      description: "Black plays the solid but passive ...d6. Build a big center and use your space.",
      branchesAt: 5,
      opponentMove: { san: "d6", color: "black", why: "The Steinitz Defense — solid but very passive. Black gives up central space.", concepts: ["pawn-structure"] },
      moves: [
        { san: "d4", color: "white", why: "Strike the center while Black is passive.", concepts: ["center-control"] },
        { san: "exd4", color: "black", why: "Black captures.", concepts: ["center-control"] },
        { san: "Nxd4", color: "white", why: "Recapture with the knight.", concepts: ["center-control"] },
        { san: "Nf6", color: "black", why: "Develop.", concepts: ["development"] },
        { san: "Nc3", color: "white", why: "Develop.", concepts: ["development"] },
        { san: "Bd7", color: "black", why: "Develop the bishop.", concepts: ["development"] },
        { san: "Bg5", color: "white", why: "Pin the f6 knight.", concepts: ["attack"] },
      ],
    },
    {
      id: "schliemann-jaenisch",
      name: "Schliemann/Jaenisch (3...f5!?)",
      description: "Black plays the wild ...f5 attacking e4. Sharp tactical line — know the standard refutation.",
      branchesAt: 5,
      opponentMove: { san: "f5", color: "black", why: "The Schliemann — Black plays sharply, attacking e4. Risky but theoretically sound.", concepts: ["attack"] },
      moves: [
        { san: "Nc3", color: "white", why: "Defend e4 with development.", concepts: ["development"] },
        { san: "fxe4", color: "black", why: "Black takes the pawn.", concepts: ["attack"] },
        { san: "Nxe4", color: "white", why: "Recapture.", concepts: ["piece-activity"] },
        { san: "d5", color: "black", why: "Black challenges the knight.", concepts: ["center-control"] },
        { san: "Nxe5", color: "white", why: "Sacrifice for an attack — modern refutation.", concepts: ["attack"] },
        { san: "dxe4", color: "black", why: "Black takes back.", concepts: ["piece-activity"] },
        { san: "Nxc6", color: "white", why: "Capture — winning material in the complications.", concepts: ["attack"] },
        { san: "Qg5", color: "black", why: "Black tries to muddy waters.", concepts: ["attack"] },
      ],
    },
    {
      id: "classical-bc5",
      name: "Classical Defense (3...Bc5)",
      description: "Black plays 3...Bc5 mirroring with an active bishop. Develop with c3 and d4 ideas.",
      branchesAt: 5,
      opponentMove: { san: "Bc5", color: "black", why: "The Classical — Black mirrors. Old-school but playable.", concepts: ["development"] },
      moves: [
        { san: "O-O", color: "white", why: "Castle.", concepts: ["king-safety"] },
        { san: "Nf6", color: "black", why: "Develop.", concepts: ["development"] },
        { san: "c3", color: "white", why: "Prepare d4.", concepts: ["preparation"] },
        { san: "O-O", color: "black", why: "Castle.", concepts: ["king-safety"] },
        { san: "d4", color: "white", why: "Strike the center.", concepts: ["center-control"] },
        { san: "Bb6", color: "black", why: "Retreat the bishop.", concepts: ["development"] },
        { san: "Bg5", color: "white", why: "Pin the knight.", concepts: ["attack"] },
      ],
    },
    {
      id: "birds-defense",
      name: "Bird's Defense (3...Nd4)",
      description: "Black trades knights with ...Nd4. Take and play normally — Black gets doubled d-pawns.",
      branchesAt: 5,
      opponentMove: { san: "Nd4", color: "black", why: "Bird's Defense — Black trades knights, accepting doubled d-pawns.", concepts: ["piece-activity"] },
      moves: [
        { san: "Nxd4", color: "white", why: "Trade the knights.", concepts: ["piece-activity"] },
        { san: "exd4", color: "black", why: "Recapture with the pawn.", concepts: ["pawn-structure"] },
        { san: "O-O", color: "white", why: "Castle.", concepts: ["king-safety"] },
        { san: "Bc5", color: "black", why: "Develop.", concepts: ["development"] },
        { san: "d3", color: "white", why: "Open the bishop's diagonal.", concepts: ["development"] },
        { san: "c6", color: "black", why: "Support the d4 pawn.", concepts: ["pawn-structure"] },
        { san: "Bc4", color: "white", why: "Reroute the bishop to a more active diagonal.", concepts: ["piece-activity"] },
      ],
    },
    {
      id: "smyslov-defense",
      name: "Smyslov Defense (3...g6)",
      description: "Black plays the hypermodern ...g6. Punish with d4 and a strong center.",
      branchesAt: 5,
      opponentMove: { san: "g6", color: "black", why: "The Smyslov — Black plays a fianchetto setup. Passive.", concepts: ["development"] },
      moves: [
        { san: "d4", color: "white", why: "Take the center.", concepts: ["center-control"] },
        { san: "exd4", color: "black", why: "Capture.", concepts: ["center-control"] },
        { san: "Nxd4", color: "white", why: "Recapture.", concepts: ["center-control"] },
        { san: "Bg7", color: "black", why: "Complete the fianchetto.", concepts: ["development"] },
        { san: "Nc3", color: "white", why: "Develop.", concepts: ["development"] },
        { san: "Nge7", color: "black", why: "Develop the knight (since g7 is taken by the bishop).", concepts: ["development"] },
      ],
    },
  ],
};
