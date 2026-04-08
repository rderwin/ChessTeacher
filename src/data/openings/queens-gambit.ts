import { OpeningLine } from "../types";

export const queensGambit: OpeningLine = {
  id: "queens-gambit",
  name: "Queen's Gambit Declined",
  fullName: "Queen's Gambit Declined — Orthodox Defense",
  eco: "D06",
  playerColor: "white",
  level: "beginner",
  description:
    "A classical 1.d4 opening where White offers a pawn to seize central control. Black declines with ...e6, leading to a rich strategic battle over the center and the c- and d-files.",
  moves: [
    {
      san: "d4",
      color: "white",
      why: "Opens the game by occupying the center with a pawn supported by the queen. Unlike 1.e4, the d4 pawn is already defended the moment it lands, so it cannot be easily challenged. This move also frees the dark-squared bishop and begins the fight for long-term central dominance.",
      concepts: ["center-control", "development"],
      controls: "c5, e5 squares",
    },
    {
      san: "d5",
      color: "black",
      why: "Black immediately stakes an equal claim in the center, preventing White from freely expanding with e4. The pawn on d5 mirrors White's central influence and keeps the position symmetrical for now.",
      concepts: ["center-control"],
      controls: "c4, e4 squares",
    },
    {
      san: "c4",
      color: "white",
      why: "This is the Queen's Gambit — White offers the c4 pawn to lure Black's d5 pawn away from the center. If Black captures with ...dxc4, White gains a powerful pawn center with a future e4. Even if Black declines, the tension on d5 limits Black's freedom and gives White a lasting initiative.",
      concepts: ["center-control", "space", "tempo"],
      controls: "d5 pawn — challenges Black's central foothold",
      commonMistakes: [
        {
          san: "e4",
          whyBad:
            "After 1.d4 d5, playing 2.e4 immediately is the Blackmar-Diemer Gambit — a real pawn sacrifice. White gives up a full pawn without the positional pressure that 2.c4 creates. The Queen's Gambit is not a true gambit because White can always regain the pawn.",
        },
      ],
    },
    {
      san: "e6",
      color: "black",
      why: "Black declines the gambit by reinforcing d5 with the e-pawn. This is solid and reliable: the d5 pawn is now firmly defended, and Black's position has no weaknesses. The cost is that the light-squared bishop on c8 is locked behind the e6 pawn — solving this 'problem bishop' becomes Black's long-term project.",
      concepts: ["center-control", "pawn-structure"],
      controls: "d5 square — adds a second defender",
      prevents: "White from easily winning the d5 square",
    },
    {
      san: "Nc3",
      color: "white",
      why: "Develops the knight to its most natural square and adds a third attacker to the d5 pawn. White is systematically piling up pressure on d5 — the c4 pawn attacks it, and now the Nc3 does too. This forces Black to keep defending carefully and limits the types of plans Black can pursue.",
      concepts: ["development", "center-control", "attack"],
      controls: "d5, e4 squares",
      commonMistakes: [
        {
          san: "Nf3",
          whyBad:
            "Nf3 is a fine developing move, but it does not increase pressure on d5. Playing Nc3 first is more precise because it immediately adds an attacker to the key central square. Nf3 will come soon, but Nc3 takes priority in this structure.",
        },
      ],
    },
    {
      san: "Nf6",
      color: "black",
      why: "Black develops the kingside knight to its best square, adding a third defender of d5 and preparing to castle kingside. The knight on f6 is a workhorse in this opening — it controls e4, prevents White from pushing e4 freely, and is essential for king safety.",
      concepts: ["development", "center-control", "king-safety"],
      controls: "d5, e4 squares",
    },
    {
      san: "Bg5",
      color: "white",
      why: "Pins the f6 knight against the queen. This is a powerful strategic move because the knight on f6 is one of the key defenders of d5. By pinning it, White threatens to eventually capture on f6 and destroy Black's pawn structure, or at least force Black to make concessions. This move also develops the bishop to an active square outside the pawn chain.",
      concepts: ["piece-activity", "attack", "development"],
      controls: "f6 knight — pins it to the queen",
      prevents: "Black from freely using the Nf6 to support central breaks",
    },
    {
      san: "Be7",
      color: "black",
      why: "Black unpins the knight by developing the bishop to e7, where it breaks the Bg5 pin. While Be7 is modest compared to a more aggressive square, it is the most solid choice — it prepares castling immediately and keeps the position flexible. Black avoids weakening the kingside pawn structure that would result from ...h6 and ...g5.",
      concepts: ["development", "king-safety"],
      controls: "Breaks the pin on f6",
      prevents: "Doubled pawns after a future Bxf6",
    },
    {
      san: "e3",
      color: "white",
      why: "Solidifies the d4 pawn and opens a diagonal for the light-squared bishop to develop to d3. This is a patient, positional move — White is not in a rush. The pawn on e3 creates a sturdy pawn duo (d4 + e3) that holds the center firmly. White's plan is piece pressure and slow buildup, not a quick attack.",
      concepts: ["center-control", "preparation", "pawn-structure"],
      controls: "d4, f4 squares — reinforces the center",
      commonMistakes: [
        {
          san: "e4",
          whyBad:
            "Pushing e4 immediately looks aggressive but after ...dxe4 Nxe4 Nxe4 Bxe7 Qxe7, the position simplifies and White has lost the tension on d5 that is the backbone of the Queen's Gambit. Slow preparation with e3 maintains lasting pressure.",
        },
      ],
    },
    {
      san: "O-O",
      color: "black",
      why: "Black castles to safety before the center opens up. This is one of the most important principles in the Queen's Gambit — get the king safe early because the center can become a battleground. Castling also connects the rooks, preparing them for action on the central files.",
      concepts: ["king-safety", "development"],
      controls: "Activates the rook on f8",
    },
    {
      san: "Nf3",
      color: "white",
      why: "Develops the last kingside minor piece, supporting d4 and preparing to castle. The knight on f3 controls e5, which matters because if White later plays for e4, Black might try to occupy e5 as an outpost. With every piece finding its ideal square, White completes a textbook development scheme.",
      concepts: ["development", "center-control"],
      controls: "d4, e5 squares",
    },
    {
      san: "Nbd7",
      color: "black",
      why: "Black develops the queenside knight behind the f6 knight rather than to c6. This is a hallmark of the Orthodox QGD — the knight on d7 avoids blocking the c-pawn, which Black may later need to push ...c5 or ...c6 to challenge White's center. The knight on d7 also provides additional defense of the f6 knight and can reroute to f8 or b6.",
      concepts: ["development", "preparation", "pawn-structure"],
      controls: "Supports f6 and keeps the c-pawn flexible",
      prevents: "Blocking the c-pawn advance that Black needs for counterplay",
    },
    {
      san: "Rc1",
      color: "white",
      why: "Places the rook on the half-open c-file, anticipating the central exchanges that are coming. When Black eventually plays ...dxc4, the c-file will open fully and this rook will be perfectly positioned. This is a prophylactic move — preparing for the future rather than reacting to it. Strong players place their rooks on files that will open.",
      concepts: ["piece-activity", "prophylaxis", "preparation"],
      controls: "c-file — prepares for the opening of the file",
    },
    {
      san: "c6",
      color: "black",
      why: "Black reinforces d5 yet again with the c-pawn, creating the classic QGD pawn triangle (c6-d5-e6). This structure is extremely solid — d5 is now defended by three pawns. The c6 pawn also prepares a potential ...dxc4 followed by ...b5, trying to hold onto the extra pawn or create queenside counterplay.",
      concepts: ["pawn-structure", "center-control", "prophylaxis"],
      controls: "d5, b5 squares — creates a defensive fortress",
    },
    {
      san: "Bd3",
      color: "white",
      why: "Develops the last minor piece to its ideal diagonal, aiming at the kingside. From d3, the bishop eyes h7 and supports a future e4 advance. This also clears the back rank so White can castle. The bishop on d3 is a key attacking piece in many QGD lines — combined with Bg5, White builds pressure on both sides of the board.",
      concepts: ["development", "attack", "king-safety"],
      controls: "h7 square, b1-h7 diagonal",
    },
    {
      san: "dxc4",
      color: "black",
      why: "Black releases the central tension by capturing on c4. This is a critical decision — Black gives up the strong d5 pawn but gains the c4 pawn and opens lines for counterplay. The idea is that holding d5 passively was becoming harder with all of White's pieces trained on it, so Black opts to change the structure and fight for activity.",
      concepts: ["center-control", "piece-activity", "pawn-structure"],
      controls: "Opens the position — changes the strategic character",
    },
    {
      san: "Bxc4",
      color: "white",
      why: "Recaptures with the bishop, which lands on an even more aggressive diagonal than d3 — now targeting f7 through the a2-g8 line. White has achieved the ideal Queen's Gambit outcome: a strong pawn on d4, active pieces on excellent squares, and pressure against Black's position. The bishop on c4, knight on c3, and rook on c1 all coordinate beautifully, while Black still needs to solve the problem of the passive bishop on c8.",
      concepts: ["development", "piece-activity", "attack"],
      controls: "f7 square, a2-g8 diagonal — maximum piece coordination",
    },
  ],
  summary:
    "The Queen's Gambit teaches the art of patient, strategic pressure. White builds a strong pawn center with d4, uses c4 to challenge Black's hold on d5, and develops every piece to its ideal square before forcing concessions. The key lessons are: pile up pressure on a key square (d5) from multiple directions, develop with purpose rather than speed alone, place rooks on files that will open, and understand that slow preparation (e3, Rc1, Bd3) creates lasting advantages that quick attacks cannot. Black's challenge — the trapped light-squared bishop on c8 — illustrates why pawn structure decisions (like ...e6) carry long-term consequences.",
};
