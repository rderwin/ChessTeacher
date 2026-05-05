import { OpeningLine } from "../types";

export const modernBenoni: OpeningLine = {
  id: "modern-benoni",
  name: "Modern Benoni",
  fullName: "Modern Benoni Defense",
  eco: "A60",
  playerColor: "black",
  level: "intermediate",
  description:
    "A combative defense where Black immediately challenges White's d5 pawn chain with ...c5 and ...e6, creating an asymmetric pawn structure that leads to sharp, unbalanced middlegames. Black gets a queenside pawn majority and active piece play; White gets a central space advantage.",
  history: {
    origin:
      "The Modern Benoni emerged in the mid-20th century as an aggressive alternative to more solid defenses against 1.d4. While the name 'Benoni' (Hebrew for 'son of sorrow') dates back to a 1825 publication by Aaron Reinganum, the modern form with ...c5 and ...e6 was forged into a top-level weapon by Mikhail Tal in the 1960s. Tal's dazzling tactical play showed that Black's apparently compromised pawn structure harbored enormous dynamic potential. Garry Kasparov later adopted it in critical world championship matches, and Veselin Topalov used it to devastating effect in the 2000s.",
    nameExplanation:
      "The name 'Benoni' comes from the Hebrew 'Ben-Oni' meaning 'son of my sorrow,' taken from the title of a 1825 chess book. The 'Modern' prefix distinguishes it from the Old Benoni (1.d4 c5), since the modern treatment with ...Nf6, ...c5, and ...e6 creates a fundamentally different type of game with the characteristic pawn structure.",
    popularity:
      "Popular among aggressive players at all levels. At the club level, it rewards tactical alertness and understanding of pawn breaks. At the elite level, it remains a respected weapon though it requires precise knowledge — White can get a dangerous initiative if Black plays passively. It tends to appear in cycles at the top level, with periods of heavy use followed by quieter spells.",
    bestFor:
      "Players who enjoy dynamic, double-edged positions and are comfortable playing with less central space in exchange for active piece play and a queenside pawn majority. It teaches pawn structure imbalances, the importance of pawn breaks (...b5 and ...f5), and how to generate counterplay against a spatial advantage.",
    famousPlayers: ["Mikhail Tal", "Garry Kasparov", "Veselin Topalov", "Vugar Gashimov"],
  },
  moves: [
    {
      san: "d4",
      color: "white",
      why: "White claims the center with the queen's pawn, controlling e5 and c5 while opening the diagonal for the dark-squared bishop. This is the standard start for positional and semi-positional openings.",
      concepts: ["center-control", "development"],
      controls: "e5, c5 squares",
    },
    {
      san: "Nf6",
      color: "black",
      why: "Black develops a knight to its ideal square, controlling e4 and d5. This prevents White from freely establishing the broad e4+d4 center and keeps Black's options open — from here, many Indian defenses are possible depending on White's next move.",
      concepts: ["development", "center-control"],
      controls: "e4, d5 squares",
      prevents: "White from easily playing e4",
      commonMistakes: [
        {
          san: "c5",
          whyBad:
            "Playing ...c5 immediately (the Old Benoni) without Nf6 first lets White respond with d5 followed by e4 and Nc3 with a huge center and easy development. Nf6 first controls e4 and forces White to commit before you play ...c5.",
        },
        {
          san: "d5",
          whyBad:
            "Playing ...d5 leads to the Queen's Gambit family, not the Benoni. The Benoni requires Nf6 first to control e4, then ...c5 to challenge d4 and create the characteristic asymmetric structure.",
        },
      ],
    },
    {
      san: "c4",
      color: "white",
      why: "White reinforces control of d5 and grabs queenside space. Together with d4, these two pawns form a powerful central duo that constrains Black's options for central counterplay.",
      concepts: ["center-control", "space"],
      controls: "d5, b5 squares",
    },
    {
      san: "c5",
      color: "black",
      why: "The defining move of the Benoni complex! Black immediately challenges White's d4 pawn from the flank. This is a committal decision — Black accepts a structural concession (after d5, White gets a passed d-pawn potential) in exchange for dynamic play. The c5 pawn creates an asymmetric tension that will define the entire middlegame.",
      concepts: ["center-control", "attack"],
      controls: "d4 square — challenges White's center directly",
      commonMistakes: [
        {
          san: "e6",
          whyBad:
            "Playing ...e6 before ...c5 allows White to play calmly with Nc3 and e4, building the ideal center without any challenge. The point of the Benoni is to force d5 immediately with ...c5, creating the asymmetric pawn structure Black needs for counterplay.",
        },
        {
          san: "g6",
          whyBad:
            "Playing ...g6 first would transpose into a King's Indian setup rather than a Benoni. The whole point of the Modern Benoni is the immediate ...c5 challenge to d4, followed by ...e6 to chip away at d5 and create the characteristic pawn structure.",
        },
      ],
    },
    {
      san: "d5",
      color: "white",
      why: "White pushes the pawn forward rather than exchanging. This is the critical choice that creates the Benoni pawn structure — White gets a space advantage and a potentially passed d-pawn, but Black gets a queenside pawn majority (pawns on a7, b7, c5 vs. White's a2, b2) and targets for counterplay. White's d5 pawn can be either a strength or a weakness depending on who plays better.",
      concepts: ["space", "center-control", "pawn-structure"],
      controls: "c6, e6 squares — gains significant space",
      commonMistakes: [
        {
          san: "dxc5",
          whyBad:
            "Exchanging on c5 releases all the central tension and gives Black easy equality. After ...e6 or ...Na6 recapturing the pawn, Black has a perfectly comfortable position with no weaknesses. White should push d5 to maintain the space advantage and create the asymmetric battle.",
        },
      ],
    },
    {
      san: "e6",
      color: "black",
      why: "Black immediately undermines the d5 pawn. This is the hallmark of the Modern Benoni — rather than accepting the locked center, Black challenges it with ...e6 to open the e-file and the a8-h1 diagonal for the light-squared bishop. After the exchange on d5, Black will have a semi-open e-file and active piece play to compensate for White's space advantage.",
      concepts: ["center-control", "attack", "piece-activity"],
      controls: "d5 pawn — challenges the center",
      commonMistakes: [
        {
          san: "g6",
          whyBad:
            "Fianchettoing before playing ...e6 lets White consolidate the d5 pawn with e4 and Nc3 without any challenge. Play ...e6 NOW to undermine d5 — the fianchetto can wait until after you've created the Benoni pawn structure.",
        },
        {
          san: "d6",
          whyBad:
            "Playing ...d6 first delays the critical ...e6 challenge to d5. White gets extra time to consolidate with e4 and Nc3. The Modern Benoni demands immediate central challenge with ...e6 to open lines for your pieces.",
        },
      ],
    },
    {
      san: "Nc3",
      color: "white",
      why: "White develops the knight to its natural square, reinforcing the d5 pawn and controlling e4. The knight on c3 is key to maintaining the d5 outpost. White wants to keep the center stable while developing pieces to optimal squares.",
      concepts: ["development", "center-control"],
      controls: "d5, e4 squares",
    },
    {
      san: "exd5",
      color: "black",
      why: "Black captures on d5 to create the classic Benoni pawn structure. After cxd5, the position features: White has a d5 pawn and central space; Black has a queenside pawn majority and semi-open e-file. This exchange is essential — Black needs open lines for the pieces to compensate for the space deficit. Delaying this capture lets White consolidate too comfortably.",
      concepts: ["center-control", "pawn-structure"],
      controls: "Opens e-file, creates the Benoni structure",
      commonMistakes: [
        {
          san: "d6",
          whyBad:
            "Delaying the capture with ...d6 lets White consolidate with e4, building an overwhelming center. You must capture on d5 now to open the e-file and create the Benoni pawn structure that gives you counterplay.",
        }
      ],
    },
    {
      san: "cxd5",
      color: "white",
      why: "White recaptures with the c-pawn, establishing the classic Benoni pawn formation. The d5 pawn is both a strength and a target — it controls c6 and e6, cramping Black, but it can also become a weakness if Black manages to blockade and attack it. White now aims to develop harmoniously and use the space advantage.",
      concepts: ["center-control", "space", "pawn-structure"],
      controls: "c6, e6 squares — strong outpost pawn",
    },
    {
      san: "d6",
      color: "black",
      why: "Black solidifies the pawn chain and prepares the kingside fianchetto. The pawn on d6 supports the c5 pawn and controls e5, creating a solid foundation. Black's plan revolves around the ...b5 pawn break on the queenside (using the pawn majority) and ...f5 on the kingside (to challenge e4). Everything flows from this flexible setup.",
      concepts: ["pawn-structure", "preparation"],
      controls: "e5, c5 squares",
      commonMistakes: [
        {
          san: "g6",
          whyBad:
            "Fianchettoing before ...d6 leaves the c5 pawn unsupported and the d6 square weak. Play ...d6 first to create a solid pawn chain, then fianchetto. Structure before development.",
        },
        {
          san: "Be7",
          whyBad:
            "Be7 is passive — the bishop belongs on g7 in the Benoni where it pressures the long diagonal. Play ...d6 first to solidify the structure, then ...g6 and ...Bg7 for the active fianchetto.",
        },
      ],
    },
    {
      san: "e4",
      color: "white",
      why: "White claims the full center with e4, establishing the powerful d5+e4 pawn duo. This gives White a massive space advantage and prepares Nf3, Be2, and O-O for rapid development. The e4 pawn controls d5 and f5, making it harder for Black to achieve the ...f5 break.",
      concepts: ["center-control", "space"],
      controls: "d5, f5 squares — commanding space advantage",
    },
    {
      san: "g6",
      color: "black",
      why: "Black prepares the kingside fianchetto, placing the bishop on g7 where it will be a powerful piece aimed at the center and queenside along the long diagonal. The fianchettoed bishop will pressure d4 and support both the ...b5 and ...f5 pawn breaks. This is Black's most flexible development scheme in the Modern Benoni.",
      concepts: ["development", "preparation", "piece-activity"],
      controls: "Prepares Bg7 fianchetto",
      commonMistakes: [
        {
          san: "Be7",
          whyBad:
            "Be7 is the classical setup but far less dynamic than the fianchetto. The bishop on g7 pressures the entire a1-h8 diagonal — in the Benoni, this diagonal is Black's main source of counterplay. Be7 is passive by comparison.",
        },
        {
          san: "b5",
          whyBad:
            "Launching the queenside break before completing development is premature. Prepare with ...g6 and ...Bg7 first, then ...a6 and ...b5 will be far more effective with the bishop supporting from g7.",
        },
      ],
    },
    {
      san: "Nf3",
      color: "white",
      why: "White develops the knight to its best square, supporting d4 and e5 while preparing kingside castling. The knight on f3 also keeps an eye on e5, a key square in the Benoni. White is building a solid, space-dominant position.",
      concepts: ["development", "center-control", "king-safety"],
      controls: "e5, d4 squares",
    },
    {
      san: "Bg7",
      color: "black",
      why: "The bishop takes its fianchetto post, becoming a powerhouse on the long diagonal. From g7, it pressures the entire a1-h8 diagonal, particularly the d4 square and White's queenside. Combined with ...O-O, this completes Black's kingside development. The bishop will come alive once Black achieves ...b5 or ...f5, opening lines toward White's position.",
      concepts: ["development", "piece-activity"],
      controls: "a1-h8 diagonal, pressures d4 and White's queenside",
      commonMistakes: [
        {
          san: "Nbd7",
          whyBad:
            "Developing the knight before completing the fianchetto delays the g7 bishop, which is Black's most important piece in the Benoni. Get Bg7 out first — it controls the critical long diagonal.",
        },
        {
          san: "a6",
          whyBad:
            "Preparing ...b5 before the bishop is on g7 is the wrong order. The fianchetto bishop supports the ...b5 break from the diagonal. Complete the setup with Bg7 first, then prepare ...b5.",
        },
      ],
    },
    {
      san: "Be2",
      color: "white",
      why: "White develops the bishop to a solid, flexible square and prepares to castle. Be2 is the most common choice in the Modern Benoni — it doesn't commit the bishop aggressively but completes development efficiently. From e2, the bishop supports both kingside castling and can later relocate to f3 if needed to defend d5.",
      concepts: ["development", "king-safety"],
      controls: "Completes kingside development, prepares O-O",
    },
    {
      san: "O-O",
      color: "black",
      why: "Black castles kingside, securing the king before launching queenside and central counterplay. With the king safe, Black can focus on the two main plans: the ...b5 pawn break (leveraging the queenside pawn majority to undermine White's center) and the ...f5 break (challenging e4 and opening the f-file). The rook on f8 will support ...f5, and the king is well-protected behind the fianchettoed bishop.",
      concepts: ["king-safety", "preparation"],
      controls: "Secures king, activates rook on f8",
      commonMistakes: [
        {
          san: "a6",
          whyBad:
            "Preparing ...b5 before castling leaves the king in the center. In the sharp Benoni positions, king safety is essential before starting any counterplay. Castle first, then launch the ...b5 break.",
        },
        {
          san: "Nbd7",
          whyBad:
            "Developing another piece before castling delays king safety. The Benoni can become very sharp very quickly — get the king to g8 behind the fianchettoed bishop before anything else.",
        },
      ],
    },
  ],
  summary:
    "The Modern Benoni creates one of chess's sharpest asymmetric battles. Black deliberately concedes central space with ...c5 and ...e6 to create a specific pawn structure where both sides have clear plans: White has a central space advantage and the powerful d5 pawn, while Black has a queenside pawn majority and dynamic piece play. Black's two key pawn breaks are ...b5 (exploiting the queenside majority to undermine d5) and ...f5 (challenging e4 and opening the kingside). The fianchettoed bishop on g7 is Black's most important piece — it pressures the long diagonal and comes alive when lines open. Success in the Benoni requires understanding pawn structure imbalances, timing pawn breaks precisely, and maintaining piece activity to compensate for less space.",
  variants: [
    {
      id: "fianchetto-variation",
      name: "Fianchetto Variation",
      description: "White develops the bishop to g2 via fianchetto instead of placing it on e2, aiming for long-term positional pressure along the a8-h1 diagonal.",
      branchesAt: 12,
      opponentMove: {
        san: "g3",
        color: "white",
        why: "White opts for a positional approach with the fianchetto. Instead of the standard Nf3, White prepares Bg2 to create a powerful bishop on the long diagonal that mirrors Black's g7 bishop. This is a more restrained but strategically deep approach — White aims for long-term pressure rather than a direct central buildup.",
        concepts: ["development", "piece-activity", "preparation"],
        controls: "Prepares Bg2 fianchetto",
      },
      moves: [
        {
          san: "Bg7",
          color: "black",
          why: "Black completes the fianchetto as planned. Now both sides will have fianchettoed bishops staring at each other across the long diagonals, creating an interesting strategic battle.",
          concepts: ["development", "piece-activity"],
          controls: "a1-h8 diagonal",
          commonMistakes: [
            {
              san: "a6",
              whyBad:
                "Preparing ...b5 before completing the fianchetto is premature. The g7 bishop supports the whole queenside counterplay from the diagonal. Complete the fianchetto first, then prepare ...b5.",
            },
            {
              san: "Be7",
              whyBad:
                "Be7 is passive and wastes the g6 preparation. You played ...g6 to fianchetto — follow through with Bg7 for the powerful long-diagonal pressure that defines the Benoni.",
            },
          ],
        },
        {
          san: "Bg2",
          color: "white",
          why: "The bishop takes its fianchetto post. From g2, it pressures the a8-h1 diagonal and reinforces the d5 pawn. White's setup is less aggressive but very solid — the bishop on g2 is hard to dislodge and provides lasting pressure.",
          concepts: ["development", "piece-activity", "center-control"],
          controls: "a8-h1 diagonal, reinforces d5",
        },
        {
          san: "O-O",
          color: "black",
          why: "Castle immediately. Black needs the king safe before launching the ...b5 or ...a6-b5 pawn breaks on the queenside.",
          concepts: ["king-safety"],
          commonMistakes: [
            {
              san: "a6",
              whyBad:
                "Preparing ...b5 before castling is risky — the king needs to be safe first. Castle now, then prepare the queenside counterplay from a secure position.",
            },
            {
              san: "Nbd7",
              whyBad:
                "Developing before castling delays king safety. In the Benoni, the priority is always king safety first, then counterplay. Castle immediately.",
            },
          ],
        },
        {
          san: "Nf3",
          color: "white",
          why: "White develops the knight and prepares to castle. The fianchetto setup is now complete and White will aim for O-O followed by a slow positional squeeze.",
          concepts: ["development", "king-safety"],
          controls: "e5, d4 squares",
        },
        {
          san: "a6",
          color: "black",
          why: "Preparing the critical ...b5 pawn break. In the fianchetto variation, ...b5 is even more important because White's setup is positional — Black must create queenside counterplay before White can consolidate the space advantage.",
          concepts: ["preparation", "attack"],
          controls: "b5 square — prepares the key break",
          commonMistakes: [
            {
              san: "Nbd7",
              whyBad:
                "Developing the knight before preparing ...b5 is too slow. White will castle and consolidate the space advantage. Black must prioritize the ...a6-b5 break to generate counterplay while White is still developing.",
            },
          ],
        },
        {
          san: "O-O",
          color: "white",
          why: "White castles, completing development. The position is set for a strategic battle where White will try to use the space advantage while Black pushes for ...b5.",
          concepts: ["king-safety", "development"],
        },
        {
          san: "Nbd7",
          color: "black",
          why: "Now the knight develops, heading to c5 or e5 depending on the position. The knight on d7 supports the ...b5 break and can reroute to active squares once the queenside opens up.",
          concepts: ["development", "preparation"],
          controls: "Supports ...b5, eyes c5 and e5",
          commonMistakes: [
            {
              san: "b5",
              whyBad:
                "Pushing ...b5 without piece support is premature. Develop Nbd7 first to support the break and have the knight ready to reroute to c5 or e5 once the queenside opens.",
            }
          ],
        },
      ],
    },
    {
      id: "knights-tour",
      name: "Knight's Tour Variation (Nc3-d2-c4)",
      description: "White maneuvers the c3 knight to c4 via d2, targeting d6 and supporting a queenside advance with a4-a5.",
      branchesAt: 14,
      opponentMove: {
        san: "Nd2",
        color: "white",
        why: "Instead of Be2, White begins an ambitious knight maneuver. The knight heads from c3 to d2 and then to c4, where it will put pressure on Black's d6 pawn — a chronic weakness in the Benoni structure. This is a sophisticated positional plan that tests Black's understanding of the position.",
        concepts: ["piece-activity", "attack", "preparation"],
        controls: "Knight reroutes toward c4, targeting d6",
      },
      moves: [
        {
          san: "O-O",
          color: "black",
          why: "Castle first to get the king safe. Black will need to respond actively once the knight reaches c4, so completing development is urgent.",
          concepts: ["king-safety"],
          commonMistakes: [
            {
              san: "Nbd7",
              whyBad:
                "Developing before castling leaves the king in danger. White's knight is heading to c4 where it will create immediate threats — you need the king safe on g8 before dealing with that pressure.",
            },
            {
              san: "a6",
              whyBad:
                "Preparing ...b5 before castling ignores king safety. Castle first, then prepare counterplay. White's knight maneuver to c4 is coming fast and you need a safe king to handle it.",
            },
          ],
        },
        {
          san: "Nc4",
          color: "white",
          why: "The knight arrives on its dream square. From c4, it attacks d6, controls e5 and a5, and supports a potential a4-a5 queenside advance. This is one of White's most dangerous setups against the Benoni.",
          concepts: ["piece-activity", "attack"],
          controls: "d6, e5, a5 squares",
        },
        {
          san: "Nbd7",
          color: "black",
          why: "Develop the knight and prepare to challenge White's powerful c4 knight. The knight on d7 can go to b6 to exchange the c4 knight, or to e5 to contest the center.",
          concepts: ["development", "piece-activity"],
          controls: "Prepares ...Nb6 or ...Ne5",
          commonMistakes: [
            {
              san: "Na6",
              whyBad:
                "Na6 is less flexible than Nbd7. From d7, the knight can go to both b6 (to challenge the c4 knight) and e5 (a powerful central outpost). Na6 only aims at c7 or b4.",
            },
            {
              san: "a6",
              whyBad:
                "Preparing ...b5 while White has a knight on c4 is the wrong priority. You need to challenge the c4 knight first with Nbd7 followed by ...Nb6 or ...Ne5. Address the immediate threat before expanding.",
            },
          ],
        },
        {
          san: "Bf4",
          color: "white",
          why: "Develop the bishop to an active square where it pressures d6. Combined with the c4 knight, White has serious pressure on Black's d6 weakness.",
          concepts: ["development", "attack"],
          controls: "d6 pawn — double pressure",
        },
        {
          san: "Ne5",
          color: "black",
          why: "The knight leaps to the powerful e5 outpost, challenging White's control and activating Black's pieces. From e5, the knight is centralized, attacks c4 and d3, and supports the ...f5 break.",
          concepts: ["piece-activity", "center-control"],
          controls: "c4, d3, f3 squares — powerful central outpost",
          commonMistakes: [
            {
              san: "Nb6",
              whyBad:
                "While Nb6 challenges the c4 knight, Ne5 is even stronger. The e5 outpost gives the knight maximum central influence, attacking c4, d3, and f3. A centralized knight is worth more than one on the edge.",
            },
            {
              san: "Re8",
              whyBad:
                "A rook move is too passive when you have the chance to plant a knight on e5. Seize the powerful outpost now — the knight on e5 is the best piece on the board and supports the ...f5 break.",
            },
          ],
        },
        {
          san: "Be2",
          color: "white",
          why: "Complete development and prepare castling. White maintains pressure on d6 while keeping the position under control.",
          concepts: ["development", "king-safety"],
        },
      ],
    },
  ],
};
