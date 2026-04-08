import { OpeningLine } from "../types";

export const sicilianNajdorf: OpeningLine = {
  id: "sicilian-najdorf",
  name: "Sicilian Najdorf",
  fullName: "Sicilian Defense, Najdorf Variation (English Attack)",
  eco: "B90",
  playerColor: "black",
  level: "intermediate",
  description:
    "The most combative and theoretically rich reply to 1.e4. Black fights for an asymmetrical game from move one, unbalancing the pawn structure to create dynamic counterplay on the queenside while White attacks on the kingside.",
  moves: [
    {
      san: "e4",
      color: "white",
      why: "White opens with the most classical first move, seizing space in the center and opening lines for the queen and light-squared bishop. The pawn on e4 controls d5 and f5, setting the stage for a direct fight over the central squares.",
      concepts: ["center-control", "development"],
      controls: "d5, f5 squares",
    },
    {
      san: "c5",
      color: "black",
      why: "The Sicilian Defense. Rather than mirroring White with 1...e5, Black immediately fights for the d4 square from the flank. This creates an asymmetrical pawn structure from the very first move, which is the hallmark of the Sicilian: Black accepts a slight lag in development in exchange for long-term structural imbalance and queenside counterplay.",
      concepts: ["center-control", "pawn-structure"],
      controls: "d4 square",
      commonMistakes: [
        {
          san: "e5",
          whyBad:
            "While perfectly playable, 1...e5 leads to symmetrical positions where White's first-move advantage is easier to maintain. The Sicilian's 1...c5 deliberately avoids symmetry, giving Black better winning chances at the cost of more complexity.",
        },
      ],
    },
    {
      san: "Nf3",
      color: "white",
      why: "White develops the knight to its best square, preparing to recapture on d4 after the inevitable central exchange. The knight on f3 also prevents Black from gaining time with moves like ...Qb6 or ...Qa5 and keeps open the option of various anti-Sicilian systems.",
      concepts: ["development", "center-control"],
      controls: "d4, e5 squares",
    },
    {
      san: "d6",
      color: "black",
      why: "Black reinforces control of the e5 square and prepares the ...Nf6 development. This is the key move distinguishing the major Sicilian systems. By playing ...d6 before ...Nc6 or ...e6, Black keeps the position flexible and heads toward the Najdorf. The pawn on d6 also opens the diagonal for the dark-squared bishop, which will later develop actively.",
      concepts: ["center-control", "preparation"],
      controls: "e5 square",
      prevents: "White from occupying e5 with a piece early on",
    },
    {
      san: "d4",
      color: "white",
      why: "White strikes at the center, knowing Black will capture and create an open d-file. This is the mainline of the Open Sicilian: White sacrifices the symmetry of the pawn structure to gain a lead in development and central space. After the exchange on d4, White will have a half-open d-file and a pawn on e4 versus Black's d6, creating the classic Sicilian tension.",
      concepts: ["center-control", "space", "development"],
      controls: "c5, e5 squares",
    },
    {
      san: "cxd4",
      color: "black",
      why: "Black captures, which is virtually forced and also desirable. The exchange creates an asymmetrical pawn structure that defines the entire Sicilian: White gets a central pawn majority (e4 vs. d6), while Black gets a queenside pawn majority (a and b pawns against White's a-pawn after later exchanges). This structural imbalance is the engine of Black's counterplay.",
      concepts: ["center-control", "pawn-structure"],
      controls: "Opens the c-file for the future rook",
    },
    {
      san: "Nxd4",
      color: "white",
      why: "White recaptures with the knight, which is centrally placed on d4 controlling a constellation of important squares. The knight on d4 is a powerful piece that eyes c6, e6, b5, and f5. White has achieved the Open Sicilian structure: a space advantage with e4 against d6 and a lead in development.",
      concepts: ["development", "center-control", "piece-activity"],
      controls: "c6, e6, b5, f5 squares",
    },
    {
      san: "Nf6",
      color: "black",
      why: "Black develops the knight to its most active square, immediately pressuring White's e4 pawn. This is the most flexible developing move: the knight on f6 contests d5 and e4, develops toward the kingside for future castling, and does not commit Black's structure. Nearly every Sicilian system features an early ...Nf6 to challenge White's center.",
      concepts: ["development", "attack", "center-control"],
      controls: "d5, e4 squares",
      commonMistakes: [
        {
          san: "Nc6",
          whyBad:
            "Developing the queen's knight first with 2...Nc6 leads to entirely different systems (Classical or Scheveningen). In the Najdorf, Black delays ...Nc6 to keep open the option of ...a6 and queenside expansion. Move order matters enormously in the Sicilian.",
        },
      ],
    },
    {
      san: "Nc3",
      color: "white",
      why: "White develops the second knight to defend e4, completing development of both knights before the bishops. The knight on c3 supports the e4 pawn and controls the key d5 square, preventing Black from freeing the position with an easy ...d5 break.",
      concepts: ["development", "center-control"],
      controls: "d5, e4 squares",
      prevents: "Black from easily achieving the ...d5 pawn break",
    },
    {
      san: "a6",
      color: "black",
      why: "The signature move of the Najdorf Variation. This modest-looking pawn move is one of the most profound ideas in all of opening theory. It serves multiple purposes: it prepares a future ...e5 by first removing the possibility of Nb5 or Bb5 check, it sets up queenside expansion with ...b5, and it gives the black king an escape square on a7 in some lines. Bobby Fischer played the Najdorf his entire career, and Garaudy Kasparov made it his main weapon against 1.e4.",
      concepts: ["prophylaxis", "preparation", "space"],
      controls: "b5 square",
      prevents: "Nb5 jumping to d5 or c7, and Bb5+ disrupting development",
      commonMistakes: [
        {
          san: "e5",
          whyBad:
            "Playing ...e5 immediately without ...a6 allows Bb5+, which is awkward for Black. After ...a6 is played, the threat of Bb5 is eliminated and ...e5 becomes a powerful central thrust. Prophylaxis before aggression is the Najdorf philosophy.",
        },
      ],
    },
    {
      san: "Be3",
      color: "white",
      why: "White develops the dark-squared bishop to e3, beginning the English Attack setup. The bishop supports d4 and eyes the a7-g1 diagonal, which becomes relevant in many attacking lines. Be3 is the first step of an aggressive plan: White intends f3, Qd2, O-O-O, and a kingside pawn storm with g4 and h4.",
      concepts: ["development", "attack", "preparation"],
      controls: "a7-g1 diagonal, supports d4 square",
    },
    {
      san: "e5",
      color: "black",
      why: "Now that ...a6 has neutralized Nb5, Black strikes at the center with the powerful ...e5 advance. This gains space, kicks the white knight from its dominant d4 post, and establishes a pawn on e5 that restricts White's pieces. The pawn structure becomes fixed in the center (White's e4 vs. Black's d6 and e5), steering the game toward a classic battle: White attacks on the kingside, Black counterattacks on the queenside.",
      concepts: ["center-control", "space", "tempo"],
      controls: "d4, f4 squares — drives the knight away",
      prevents: "White from maintaining the powerful knight on d4",
      commonMistakes: [
        {
          san: "e6",
          whyBad:
            "While ...e6 leads to the Scheveningen setup and is perfectly valid, the Najdorf's ...e5 is more ambitious. It gains more space, challenges the knight directly, and fits the fighting spirit of the Najdorf. After ...e6, Black's light-squared bishop is more restricted.",
        },
      ],
    },
    {
      san: "Nb3",
      color: "white",
      why: "The knight retreats to b3, the best available square. From b3 it still watches d4 and supports a potential Na5 maneuver to target Black's queenside. The knight also stays out of the way of White's f-pawn, which will advance to f3 as part of the English Attack plan.",
      concepts: ["piece-activity", "preparation"],
      controls: "d4, c5, a5 squares",
    },
    {
      san: "Be7",
      color: "black",
      why: "Black develops the bishop to a modest but highly functional square. On e7, the bishop prepares immediate kingside castling and does not block any of Black's key plans. While less aggressive than ...Bc5 or ...Bb4, the bishop on e7 keeps Black's structure flexible: it can later redeploy to f6 to support the center or stay on e7 where it anchors the kingside defensive structure during White's pawn storm.",
      concepts: ["development", "king-safety", "preparation"],
      controls: "d6-f8 diagonal, prepares castling",
      commonMistakes: [
        {
          san: "b5",
          whyBad:
            "While ...b5 is a thematic Najdorf move, playing it before completing kingside development is premature. The king is still in the center and White could exploit this with Be2 and O-O followed by sharp central action. Finish development first, then expand.",
        },
      ],
    },
    {
      san: "f3",
      color: "white",
      why: "A critical move in the English Attack. The pawn on f3 reinforces e4, creating a rock-solid pawn chain, and prepares the queen to go to d2 without blocking the f-pawn. Most importantly, f3 sets the stage for a later g4-g5 kingside pawn storm, which is White's primary attacking plan. The position is heading toward opposite-side castling, where both sides race to attack the other's king.",
      concepts: ["pawn-structure", "preparation", "attack"],
      controls: "e4, g4 squares — shores up the center and prepares the advance",
      prevents: "Black from undermining e4 with tricks like ...Ng4 or ...d5",
    },
    {
      san: "O-O",
      color: "black",
      why: "Black castles kingside without delay, getting the king to safety before the position explodes. With White about to castle queenside and launch a kingside pawn storm, Black must have the king tucked away first. Castling also activates the rook on f8, which will later support the ...d5 or ...f5 central breaks that are Black's main sources of counterplay.",
      concepts: ["king-safety", "development"],
      controls: "Activates the f8 rook",
    },
    {
      san: "Qd2",
      color: "white",
      why: "The queen moves to d2, connecting the rooks and preparing to castle queenside. From d2, the queen also forms a battery with the bishop on e3 along the dark-square diagonal, creating latent threats. After O-O-O, White will have a clear plan: push g4-g5 to open lines against the black king. This is the full English Attack setup.",
      concepts: ["development", "attack", "preparation"],
      controls: "Links with Be3 on the dark diagonal",
    },
    {
      san: "Be6",
      color: "black",
      why: "Black develops the final minor piece to an excellent square. The bishop on e6 serves multiple purposes: it controls d5, preventing White from using that outpost for a knight; it eyes the a2-g8 diagonal, putting indirect pressure on the queenside where White is about to castle; and it prepares ...b5 queenside expansion by supporting the b5 pawn advance. This is a model Najdorf move -- every piece serves both defense and attack.",
      concepts: ["development", "piece-activity", "prophylaxis"],
      controls: "d5, a2-g8 diagonal",
      prevents: "White from establishing a piece on d5",
    },
    {
      san: "O-O-O",
      color: "white",
      why: "White castles queenside, completing the English Attack formation. The position now features opposite-side castling, which means both players will attack the opponent's king as aggressively as possible. White's plan is straightforward: g4-g5 to open lines on the kingside. The rook on d1 is already on the half-open d-file, adding central pressure.",
      concepts: ["king-safety", "attack"],
      controls: "Connects rooks, activates the d1 rook on the half-open file",
    },
  ],
  summary:
    "The Sicilian Najdorf teaches the art of asymmetrical chess. From move one, Black avoids symmetry with 1...c5 to create an unbalanced pawn structure where both sides have distinct plans. The prophylactic ...a6 is the soul of the variation -- it prevents White's pieces from reaching b5 while preparing queenside expansion with ...b5 and the central strike ...e5. After the English Attack setup (Be3, f3, Qd2, O-O-O), the position becomes a fierce race: White storms the kingside with g4-g5 while Black counterattacks on the queenside with ...b5 and targets the exposed white king. The key strategic lesson is that preparation (prophylaxis with ...a6 before the ambitious ...e5) and piece coordination (Be7 for safety, Be6 for control of d5) allow Black to play aggressively without overextending. Understanding when to play ...d5 or ...b5 as a pawn break, and keeping the balance between defense and attack, is the essence of the Najdorf.",
};
