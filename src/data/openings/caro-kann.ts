import { OpeningLine } from "../types";

export const caroKann: OpeningLine = {
  id: "caro-kann",
  name: "Caro-Kann Defense",
  fullName: "Caro-Kann Defense (Classical Variation)",
  eco: "B18",
  playerColor: "black",
  level: "beginner",
  description:
    "A rock-solid defense against 1.e4 that prioritizes a strong pawn structure and develops the light-squared bishop outside the pawn chain before playing ...e6.",
  history: {
    origin:
      "The Caro-Kann Defense originated in the 1800s and is named after Horatio Caro, an English player based in Berlin, and Marcus Kann, an Austrian master. They analyzed the opening together and published their findings in 1886. It gained mainstream acceptance in the early 20th century as a reliable alternative to the French Defense.",
    nameExplanation:
      "Named after Horatio Caro and Marcus Kann, who jointly analyzed and popularized the opening in the Bruederschaft chess magazine in 1886. The Classical Variation specifically refers to the line where Black develops the bishop to f5 before retreating it to g6 and eventually h7.",
    popularity:
      "One of the most respected defenses against 1.e4 at all levels. It's considered slightly less dynamic than the Sicilian but offers a very solid pawn structure with fewer tactical risks. You'll see it regularly at club level and in grandmaster play.",
    bestFor:
      "Players who want a solid, reliable response to 1.e4 without memorizing long tactical sequences. It teaches the importance of pawn structure, piece development outside the pawn chain, and patient positional play.",
    famousPlayers: ["Anatoly Karpov", "Jose Raul Capablanca", "Viswanathan Anand", "Ding Liren"],
  },
  moves: [
    {
      san: "e4",
      color: "white",
      why: "White occupies the center with a pawn, controlling d5 and f5. This is the most popular first move in chess, opening lines for the queen and light-squared bishop.",
      concepts: ["center-control", "development"],
    },
    {
      san: "c6",
      color: "black",
      why: "The defining move of the Caro-Kann. Black prepares to challenge the center with ...d5 on the next move. Unlike 1...e5, this keeps the pawn structure flexible and ensures the light-squared bishop won't get trapped behind a pawn chain.",
      concepts: ["center-control", "preparation"],
      commonMistakes: [
        {
          san: "d5",
          whyBad:
            "Playing d5 immediately (the Scandinavian Defense) is playable but allows White to capture and force your queen out early after 2.exd5 Qxd5 3.Nc3, losing tempo. The Caro-Kann's c6 prepares ...d5 so you can recapture with the c-pawn instead.",
        },
      ],
    },
    {
      san: "d4",
      color: "white",
      why: "White establishes an ideal pawn center with pawns on e4 and d4, controlling a massive amount of central space. This is the most natural follow-up, claiming the full center before Black can challenge it.",
      concepts: ["center-control", "space"],
    },
    {
      san: "d5",
      color: "black",
      why: "Now Black strikes at the center! With c6 already played, the c-pawn is ready to recapture on d5 if White takes, maintaining a solid pawn structure. This is the whole point of 1...c6 — a supported central challenge.",
      concepts: ["center-control"],
      controls: "e4 pawn — forces White to make a decision about the center",
    },
    {
      san: "Nc3",
      color: "white",
      why: "White defends the e4 pawn with the knight while developing a piece. This is the main line move, leading to the Classical Variation. The knight on c3 adds pressure to d5 and keeps the central tension alive.",
      concepts: ["development", "center-control"],
      controls: "e4, d5 squares",
    },
    {
      san: "dxe4",
      color: "black",
      why: "Black captures on e4, resolving the central tension. This is the most common choice in the Classical Variation — Black takes the pawn knowing White will recapture with the knight, which Black can then challenge with ...Bf5 developing the bishop actively.",
      concepts: ["center-control"],
      commonMistakes: [
        {
          san: "e6",
          whyBad:
            "Playing e6 locks the light-squared bishop inside the pawn chain, which is exactly the problem the Caro-Kann is designed to avoid. The whole point of 1...c6 is to play ...d5 and develop the bishop to f5 BEFORE playing ...e6.",
        },
      ],
    },
    {
      san: "Nxe4",
      color: "white",
      why: "White recaptures with the knight, placing it on a strong central square. The knight on e4 is very active, controlling f6, d6, g5, and c5. Black must now develop carefully to challenge this powerful piece.",
      concepts: ["development", "center-control"],
      controls: "f6, d6, g5, c5 squares",
    },
    {
      san: "Bf5",
      color: "black",
      why: "This is the key move that makes the Caro-Kann special. Black develops the light-squared bishop OUTSIDE the pawn chain before playing ...e6. In the French Defense, this bishop gets trapped behind pawns — here it's free and active. The bishop attacks the knight on e4, forcing it to move.",
      concepts: ["development", "piece-activity"],
      controls: "e4 knight, h3-c8 diagonal",
      commonMistakes: [
        {
          san: "Nd7",
          whyBad:
            "Developing the knight first blocks the bishop on c8. The whole strategic idea of the Caro-Kann Classical is Bf5 first, getting the bishop active before the position closes. Don't block your best piece.",
        },
      ],
    },
    {
      san: "Ng3",
      color: "white",
      why: "The knight retreats to g3, maintaining an eye on the bishop while heading to a square that controls h5 and f5. From g3 the knight also prepares the aggressive h4-h5 push to chase Black's bishop further.",
      concepts: ["development", "piece-activity"],
      controls: "h5, f5, e4 squares",
    },
    {
      san: "Bg6",
      color: "black",
      why: "The bishop retreats to g6, staying on an active diagonal while avoiding the knight's attack. From g6 it still controls key light squares and will eventually settle on h7 after White plays h5. This bishop retreat is a standard part of the Classical Variation's strategy.",
      concepts: ["piece-activity"],
      controls: "Light-square diagonal, eyes on d3 and e4",
    },
    {
      san: "h4",
      color: "white",
      why: "White pushes the h-pawn to chase Black's bishop further with h5. This is a thematic idea in the Classical Caro-Kann — White gains space on the kingside and forces the bishop to retreat again, gaining tempo.",
      concepts: ["space", "tempo", "attack"],
      controls: "g5, h5 squares",
    },
    {
      san: "h6",
      color: "black",
      why: "A crucial prophylactic move! Black plays ...h6 to prevent White's knight from jumping to g5 (which would target f7) and to give the bishop a safe retreat square on h7 once White plays h5. Without ...h6, White could play Ng5 or Bg5 with annoying threats.",
      concepts: ["prophylaxis", "king-safety"],
      prevents: "Ng5 or Bg5 attacking f7 or pinning a future Nf6",
      commonMistakes: [
        {
          san: "Nf6",
          whyBad:
            "Developing the knight before ...h6 allows White to play h5 followed by Bg5 or Ng5 with unpleasant pressure. The prophylactic ...h6 is more accurate, ensuring Black's kingside remains safe before developing further.",
        },
      ],
    },
    {
      san: "Nf3",
      color: "white",
      why: "White develops the kingside knight to its natural square, controlling e5 and d4. This completes minor piece development and prepares to castle or continue the kingside expansion. The knight on f3 supports the d4 pawn and eyes e5.",
      concepts: ["development", "center-control"],
      controls: "e5, d4, g5 squares",
    },
    {
      san: "Nd7",
      color: "black",
      why: "Black develops the knight to d7 rather than c6. This is deliberate — Nd7 keeps the c-file clear for potential ...c5 counterplay against White's d4 pawn, and the knight can later go to f6 or e5. It also supports a future ...e6 and ...Be7 setup.",
      concepts: ["development", "preparation"],
      controls: "Supports ...c5 break, flexible knight placement",
    },
    {
      san: "h5",
      color: "white",
      why: "White fixes the kingside pawn structure, permanently chasing the bishop to h7. The pawn on h5 also weakens Black's g6 square slightly and secures space on the kingside. This is the culmination of White's h-pawn push strategy.",
      concepts: ["space", "attack"],
      controls: "g6 square, locks kingside structure",
    },
    {
      san: "Bh7",
      color: "black",
      why: "The bishop completes its journey to h7, where it's tucked away but still serves a vital role defending the light squares around Black's king. From h7 it prevents any White pieces from landing on key light squares. Black's position is solid and ready for ...Ngf6, ...e6, and ...Be7 to complete development.",
      concepts: ["piece-activity", "king-safety"],
      controls: "Light-square diagonal, defends kingside",
    },
  ],
  summary:
    "The Caro-Kann Classical teaches a critical strategic concept: develop your problem pieces BEFORE locking in your pawn structure. By playing ...c6 and ...d5 before ...e6, Black ensures the light-squared bishop escapes to f5 (and eventually h7) rather than getting buried behind pawns as in the French Defense. The key ideas are solid pawn structure, patient development, and the importance of piece activity even in quiet positions. Black accepts slightly less central space in exchange for a rock-solid position with no weaknesses.",
  variants: [
    {
      id: "advance-variation",
      name: "Advance Variation",
      description:
        "White pushes 3.e5 to grab space immediately, leading to a French Defense-like structure where Black must undermine the center with ...c5 and ...Bf5.",
      branchesAt: 4, // Index 4 = White's 3rd move (main line: Nc3)
      opponentMove: {
        san: "e5",
        color: "white",
        why: "White advances the e-pawn to e5, grabbing space and restricting Black's knight from f6. This creates a pawn chain (d4-e5) similar to the French Defense, but Black's light-squared bishop is not yet locked in — a key advantage of the Caro-Kann move order.",
        concepts: ["space", "center-control"],
        controls: "d6, f6 squares — restricts Black's development",
      },
      moves: [
        {
          san: "Bf5",
          color: "black",
          why: "Immediately developing the bishop outside the pawn chain — this is the move that justifies the Caro-Kann over the French Defense. In the French, this bishop gets trapped behind ...e6, but here it's free and active. The bishop eyes the b1-h7 diagonal.",
          concepts: ["development", "piece-activity"],
          controls: "b1-h7 diagonal",
        },
        {
          san: "Nf3",
          color: "white",
          why: "White develops the knight naturally, supporting the e5 pawn and preparing to castle. The knight controls key central squares and is ready to support any kingside operations.",
          concepts: ["development", "center-control"],
        },
        {
          san: "e6",
          color: "black",
          why: "Now Black plays ...e6, solidifying the pawn structure and opening a diagonal for the dark-squared bishop. The light-squared bishop is already developed, so ...e6 doesn't create the 'bad bishop' problem. This is the ideal Caro-Kann setup.",
          concepts: ["center-control", "pawn-structure"],
          controls: "d5 pawn support",
        },
        {
          san: "Be2",
          color: "white",
          why: "White develops the bishop modestly to e2, preparing to castle kingside. The bishop on e2 supports the h5 push and keeps the position flexible.",
          concepts: ["development", "king-safety"],
        },
        {
          san: "c5",
          color: "black",
          why: "The critical counter-strike! Black attacks the base of White's pawn chain at d4. This is a fundamental concept — attack a pawn chain at its base. If White's d4 collapses, the e5 pawn becomes weak and overextended.",
          concepts: ["center-control", "attack"],
          controls: "d4 pawn — attacks the base of the chain",
          commonMistakes: [
            {
              san: "Nd7",
              whyBad:
                "Developing the knight before ...c5 is too slow. Black needs to immediately challenge White's pawn chain or risk getting squeezed. The ...c5 break is urgent in the Advance Variation.",
            },
          ],
        },
        {
          san: "Be3",
          color: "white",
          why: "White develops the bishop to e3, defending the d4 pawn and completing minor piece development. The bishop on e3 shores up the center and prepares queenside castling or further central operations.",
          concepts: ["development", "center-control"],
        },
        {
          san: "Nc6",
          color: "black",
          why: "The knight develops to c6, adding pressure on d4 and e5. Combined with the ...c5 push, Black is building maximum pressure against White's pawn center. The knight on c6 is perfectly placed for this strategy.",
          concepts: ["development", "center-control"],
          controls: "d4, e5 squares",
        },
        {
          san: "O-O",
          color: "white",
          why: "White castles to safety, connecting the rooks and preparing to fight for the center from a secure position. The king on g1 is well-protected and the rook on f1 supports potential f-file play.",
          concepts: ["king-safety", "development"],
        },
      ],
    },
    {
      id: "exchange-variation",
      name: "Exchange Variation",
      description:
        "White exchanges pawns with 3.exd5, leading to a symmetrical pawn structure. Simple and solid, but Black equalizes easily with accurate play.",
      branchesAt: 4, // Index 4 = White's 3rd move (main line: Nc3)
      opponentMove: {
        san: "exd5",
        color: "white",
        why: "White exchanges pawns immediately, simplifying the center. This leads to a symmetrical structure that is easier to play for White but gives Black a very clear plan. The Exchange Variation is considered less challenging for Black than other lines.",
        concepts: ["center-control"],
        controls: "Opens the center, simplifies the position",
      },
      moves: [
        {
          san: "cxd5",
          color: "black",
          why: "Recapturing with the c-pawn is essential — it maintains the symmetrical pawn structure and opens the c-file for Black's rook. The c-file will become a key source of counterplay for Black in this variation.",
          concepts: ["center-control", "pawn-structure"],
          controls: "Opens c-file for the rook",
          commonMistakes: [
            {
              san: "Qxd5",
              whyBad:
                "Recapturing with the queen exposes it to attack after Nc3, losing tempo. Always recapture with the c-pawn to maintain structure and open the c-file.",
            },
          ],
        },
        {
          san: "Bd3",
          color: "white",
          why: "White develops the bishop to d3, aiming at the kingside and controlling the h7 square. The bishop is well-placed on this diagonal and prepares to castle quickly.",
          concepts: ["development", "piece-activity"],
        },
        {
          san: "Nc6",
          color: "black",
          why: "Black develops the knight to c6, the most natural square. It controls d4 and e5, and prepares to bring the other pieces into the game. In the Exchange Variation, straightforward development leads to equality.",
          concepts: ["development", "center-control"],
          controls: "d4, e5 squares",
        },
        {
          san: "c3",
          color: "white",
          why: "White reinforces the d4 pawn with c3, creating a solid central structure. This prevents any ...Nb4 ideas jumping toward d3 and keeps the center stable.",
          concepts: ["center-control", "pawn-structure"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Developing the kingside knight to f6, where it attacks d5 support squares and prepares castling. The knight is perfectly placed on f6 — it's the best square for it in almost every Caro-Kann line.",
          concepts: ["development", "center-control"],
        },
        {
          san: "Bf4",
          color: "white",
          why: "White develops the dark-squared bishop outside the pawn chain before playing e3. This is an important lesson — get the bishop active before locking it in. Bf4 eyes the b8-h2 diagonal and controls e5.",
          concepts: ["development", "piece-activity"],
        },
        {
          san: "Bf5",
          color: "black",
          why: "Black develops the light-squared bishop to its ideal square, just as in the Classical Variation. The bishop is active on f5, challenging White's bishop on d3 and controlling key light squares. This is the Caro-Kann's signature strength.",
          concepts: ["development", "piece-activity"],
          controls: "h3-c8 diagonal, challenges Bd3",
        },
        {
          san: "Nf3",
          color: "white",
          why: "White completes kingside development with the knight on f3, preparing to castle. Both sides have developed naturally and the position is roughly equal — a testament to the soundness of the Caro-Kann in the Exchange Variation.",
          concepts: ["development", "king-safety"],
        },
      ],
    },
  ],
};
