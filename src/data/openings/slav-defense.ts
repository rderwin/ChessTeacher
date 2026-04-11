import { OpeningLine } from "../types";

export const slavDefense: OpeningLine = {
  id: "slav-defense",
  name: "Slav Defense",
  fullName: "Slav Defense (Main Line with 5...Bf5)",
  eco: "D10",
  playerColor: "black",
  level: "beginner",
  description:
    "A rock-solid response to the Queen's Gambit where Black defends d5 with the c-pawn, keeping the light-squared bishop free to develop outside the pawn chain.",
  history: {
    origin:
      "The Slav Defense became prominent in the 1920s and 1930s when Slavic players — particularly from Czechoslovakia and Russia — developed it as a reliable alternative to the Queen's Gambit Declined. It was a key weapon in multiple world championship matches, including Alekhine-Euwe (1935) and Kramnik-Topalov (2006).",
    nameExplanation:
      "Named after the Slavic chess players who popularized and refined it in the early 20th century. The defining idea is 2...c6 — defending the d5 pawn with the c-pawn instead of the e-pawn. This seemingly small difference has huge strategic implications because it keeps the light-squared bishop free.",
    popularity:
      "One of the top two or three responses to 1.d4 d5 2.c4 at every level of chess. It's especially popular among players who want a solid, reliable defense without the \"problem bishop\" that plagues the Queen's Gambit Declined. You'll face the Queen's Gambit constantly as a 1.d4 player, so having the Slav ready is essential.",
    bestFor:
      "Players who want a rock-solid foundation as Black against 1.d4. The Slav teaches the importance of move order, how small structural decisions (c6 vs e6) create completely different games, and why keeping pieces active matters more than grabbing space.",
    famousPlayers: ["Vladimir Kramnik", "Viswanathan Anand", "Max Euwe", "Veselin Topalov"],
  },
  moves: [
    {
      san: "d4",
      color: "white",
      why: "White opens with the queen's pawn, immediately claiming central space and controlling the e5 and c5 squares. This is the starting move of all Queen's Gambit systems and sets the stage for a strategic, positional battle.",
      concepts: ["center-control", "space"],
      controls: "e5, c5 squares",
    },
    {
      san: "d5",
      color: "black",
      why: "Black plants a pawn in the center to directly contest White's control of d4. By occupying d5, you stake an equal claim to the center and prevent White from building an unchallenged pawn duo with e4. This is the most principled response — fight for the center from the very first move.",
      concepts: ["center-control"],
      controls: "e4, c4 squares",
      commonMistakes: [
        {
          san: "Nf6",
          whyBad:
            "While Nf6 is a fine move in many openings, playing ...d5 first is more direct. It immediately stakes a claim in the center with a pawn, which is stronger than contesting it with a piece alone. Delaying ...d5 may allow White to play e4 and seize a large center.",
        },
      ],
    },
    {
      san: "c4",
      color: "white",
      why: "The Queen's Gambit. White offers the c-pawn to lure Black's d5 pawn away from the center. If Black captures with dxc4, White gains a strong central pawn on d4 versus nothing, and can later recapture the pawn. This is not a true gambit — White almost always recovers the pawn.",
      concepts: ["center-control", "space"],
      controls: "d5 square — pressuring Black's central pawn",
    },
    {
      san: "c6",
      color: "black",
      why: "This is the defining move of the Slav Defense. Instead of defending d5 with ...e6 (which would trap the light-squared bishop behind its own pawns), you support d5 with the c-pawn. The critical advantage is that the c8-bishop remains free to develop to f5 or g4 later. This is the Slav's key strategic idea — solid central defense without blocking your bishop.",
      concepts: ["center-control", "pawn-structure", "preparation"],
      controls: "d5 square — reinforces the center",
      prevents: "White from winning the d5 pawn with cxd5 followed by easy recapture pressure",
      commonMistakes: [
        {
          san: "e6",
          whyBad:
            "While ...e6 also defends d5, it locks the light-squared bishop behind the pawn chain on e6/d5. In the Queen's Gambit Declined, this bishop often becomes a passive piece for the entire game. The Slav's ...c6 avoids this problem entirely.",
        },
        {
          san: "dxc4",
          whyBad:
            "Capturing immediately with ...dxc4 without first playing ...c6 gives up the center too easily. White will play e4 next and dominate the center. In the Slav, you only capture on c4 later when you can hold the extra pawn or have already developed your bishop.",
        },
      ],
    },
    {
      san: "Nf3",
      color: "white",
      why: "White develops the knight to its most natural square, supporting the d4 pawn and controlling e5. This is a flexible developing move that prepares kingside castling while maintaining pressure on the center.",
      concepts: ["development", "center-control"],
      controls: "e5, d4 squares",
    },
    {
      san: "Nf6",
      color: "black",
      why: "Develop your knight to its best square, attacking White's e4 square to prevent White from easily pushing e4 and building a dominant center. The knight on f6 also prepares kingside castling and is a natural developing move that follows the principle of developing knights before bishops.",
      concepts: ["development", "center-control", "prophylaxis"],
      controls: "e4, d5 squares",
      prevents: "White from easily pushing e4 to dominate the center",
    },
    {
      san: "Nc3",
      color: "white",
      why: "White develops the queenside knight, adding another attacker to the d5 pawn. With pieces on c3, Nf3, and the pawn on c4, White is building coordinated pressure against Black's center. This is typical Queen's Gambit strategy — probe d5 until Black must make a concession.",
      concepts: ["development", "center-control"],
      controls: "d5, e4 squares",
    },
    {
      san: "dxc4",
      color: "black",
      why: "Now is the right time to capture on c4. With your knight already on f6 preventing e4, and the c6 pawn ready to support a later ...b5, you take the pawn and prepare to develop your light-squared bishop to f5 before White can reclaim the pawn. This is the mainline Slav — you temporarily accept a structural change to gain quick piece activity.",
      concepts: ["pawn-structure", "piece-activity", "tempo"],
      controls: "Opens the c-file and frees the c8-bishop's path to f5",
      commonMistakes: [
        {
          san: "Bf5",
          whyBad:
            "Developing the bishop before capturing on c4 allows White to play cxd5 cxd5 (or push c5), and the Slav's main idea of capturing on c4 and then developing Bf5 is lost. The move order matters — capture first, then develop the bishop.",
        },
      ],
    },
    {
      san: "a4",
      color: "white",
      why: "White prevents Black from holding the extra c4 pawn with ...b5. Without this move, Black could play ...b5 followed by ...Bb7, keeping the pawn and developing at the same time. By playing a4, White ensures the pawn on c4 will be recovered.",
      concepts: ["prophylaxis", "pawn-structure"],
      controls: "b5 square",
      prevents: "Black from playing ...b5 to hold the extra pawn",
    },
    {
      san: "Bf5",
      color: "black",
      why: "This is the payoff for the entire Slav setup. Your light-squared bishop develops to an active square outside the pawn chain — something that would have been impossible had you played ...e6 earlier. From f5, the bishop controls the important e4 square, develops with purpose, and is free from being blocked by your own pawns. This is the Slav's signature move and the reason the opening exists.",
      concepts: ["development", "piece-activity", "center-control"],
      controls: "e4, d3, g6 squares along the h7-b1 diagonal",
      prevents: "White from easily achieving e4 central expansion",
    },
    {
      san: "e3",
      color: "white",
      why: "White opens the diagonal for the f1-bishop so it can recapture on c4. The pawn on e3 also reinforces the d4 pawn, creating a solid central structure. While somewhat modest, this is the main line — White will recover the c4 pawn with the bishop and then castle.",
      concepts: ["development", "preparation", "pawn-structure"],
      controls: "d4 square — reinforces the center",
    },
    {
      san: "e6",
      color: "black",
      why: "Now that the bishop is already developed to f5, playing ...e6 is safe and good. It supports the d5 square, opens the f8-bishop's diagonal so it can develop and you can castle kingside, and creates a solid pawn triangle with c6 and e6. The key point: the light-squared bishop is already outside the chain, so ...e6 doesn't create a 'bad bishop' problem.",
      concepts: ["development", "king-safety", "pawn-structure"],
      controls: "d5 square — completes the pawn support structure",
      prevents: "Any tactics against d5 or f7, solidifying the center",
    },
    {
      san: "Bxc4",
      color: "white",
      why: "White recovers the pawn while developing the bishop to an active diagonal. From c4, the bishop eyes f7 and controls the important d5 square. White has now recovered the material and has a natural development advantage with an active bishop.",
      concepts: ["development", "piece-activity"],
      controls: "d5, f7 squares along the a2-g8 diagonal",
    },
    {
      san: "Bb4",
      color: "black",
      why: "Pin the knight on c3 to the king on e1. This is an active developing move that puts immediate pressure on White's position. The knight on c3 is an important defender of the center, and by pinning it, you reduce White's control. The bishop on b4 is also well-placed to provoke weaknesses if White plays Bd2 or tries to break the pin.",
      concepts: ["development", "piece-activity", "attack"],
      controls: "Pins Nc3 to the king along the a5-e1 diagonal",
      prevents: "Nc3 from freely operating to control d5 and e4",
      commonMistakes: [
        {
          san: "Be7",
          whyBad:
            "Be7 is passive — it develops the bishop but to a square where it does nothing active. Bb4 pins the knight, creates pressure, and forces White to react. In the Slav, you have already achieved an excellent light-squared bishop on f5, so your dark-squared bishop should also seek an active role.",
        },
      ],
    },
    {
      san: "O-O",
      color: "white",
      why: "White castles to safety, connecting the rooks and getting the king out of the center before the position opens further. The king is now safe on g1, and the rook on f1 can later swing to the center or support an f-file or e-file push.",
      concepts: ["king-safety", "development"],
      controls: "Activates the rook and secures the king",
    },
    {
      san: "O-O",
      color: "black",
      why: "Castle immediately to tuck your king away to safety. Both sides have now castled kingside, and the game transitions into a strategic middlegame. Your position is fundamentally sound: a solid pawn structure with c6 and e6, an active bishop on f5 outside the chain, and the pin on c3 creating lasting pressure.",
      concepts: ["king-safety", "development"],
      controls: "Secures the king and activates the h8 rook",
    },
    {
      san: "Qe2",
      color: "white",
      why: "White unpins the knight by moving the queen to e2, where it also connects to the c4 bishop's defense and eyes the e-file. The queen supports a potential e4 push in the future and clears the d1 square for a rook.",
      concepts: ["piece-activity", "preparation"],
      controls: "e-file, supports potential e4 advance",
    },
    {
      san: "Nbd7",
      color: "black",
      why: "Develop your last minor piece. The knight heads to d7 rather than a6 because from d7 it supports the e5 and c5 breaks that are central to Black's middlegame plan. A future ...e5 or ...c5 pawn push will challenge White's d4 pawn and fight for central equality. The knight on d7 can also reroute to b6 to pressure c4, or to f8 and then e6 for kingside defense.",
      concepts: ["development", "preparation", "piece-activity"],
      controls: "e5, c5 squares — prepares key central breaks",
      prevents: "White from dominating the center unchallenged in the middlegame",
      commonMistakes: [
        {
          san: "Na6",
          whyBad:
            "Na6 places the knight on the rim where it has limited influence. While it could reroute to b4 or c5, Nbd7 is more flexible and immediately supports the critical ...e5 and ...c5 breaks. Knights on the rim are dim — central squares are almost always better.",
        },
      ],
    },
  ],
  summary:
    "The Slav Defense teaches you the importance of pawn structure decisions in the opening. Its central lesson is that how you defend the center matters as much as whether you defend it — by choosing ...c6 over ...e6, you keep the light-squared bishop free to develop actively to f5. The key strategic sequence is: support d5 with ...c6, wait for the right moment to capture ...dxc4, develop the bishop to f5 before playing ...e6, and then complete development with active piece placement like ...Bb4 (pinning the knight) and ...Nbd7 (preparing central breaks). The Slav shows that solid play and active play are not opposites — a rock-solid pawn structure can coexist with energetic piece development if you plan your move order carefully.",
  variants: [
    {
      id: "exchange-slav",
      name: "Exchange Slav (3.cxd5)",
      description: "White captures on d5 immediately, leading to a symmetrical but slightly favorable position.",
      branchesAt: 4,
      opponentMove: { san: "cxd5", color: "white", why: "The Exchange Slav — White simplifies immediately. After cxd5 cxd5, the position is symmetrical and both sides have open c-files. White has a tiny edge from the extra tempo but Black equalizes easily. Often used by players who want a safe, quiet game.", concepts: ["center-control"] },
      moves: [
        { san: "cxd5", color: "black", why: "Recapture with the c-pawn toward the center. The position is now symmetrical with both sides having d-pawns and open c-files.", concepts: ["center-control", "pawn-structure"] },
        { san: "Nc3", color: "white", why: "Develop naturally. White's plan is to use the slight tempo advantage to create small problems for Black.", concepts: ["development"] },
        { san: "Nf6", color: "black", why: "Develop the knight and control e4. Black has no problems in this symmetrical position.", concepts: ["development", "center-control"] },
        { san: "Bf4", color: "white", why: "Develop the bishop actively before e3. A classic London/Exchange Slav idea — get the dark-squared bishop outside the pawn chain.", concepts: ["development", "piece-activity"], commonMistakes: [{ san: "e3", whyBad: "e3 before Bf4 traps the dark-squared bishop. Always develop the bishop outside first — the same principle as the London System." }] },
        { san: "Nc6", color: "black", why: "Develop and add more pressure on d4. Black is playing symmetrically and has no weaknesses.", concepts: ["development", "center-control"] },
        { san: "e3", color: "white", why: "Now e3 is safe — the bishop is already out. A solid, if unambitious, White setup.", concepts: ["center-control"] },
      ],
    },
    {
      id: "semi-slav",
      name: "Semi-Slav (with ...e6)",
      description: "Black plays e6 alongside c6, creating a super-solid but slightly passive pawn triangle. The 'problem bishop' returns but the center is rock-solid.",
      branchesAt: 5,
      opponentMove: { san: "e6", color: "black", why: "The Semi-Slav! Black reinforces d5 with BOTH c6 and e6, creating an incredibly solid pawn triangle. The downside: the light-squared bishop is now blocked behind e6 (the same problem as the QGD). But the upside: d5 is defended three times and the position is nearly impregnable. Black plans to break out with ...dxc4 and ...b5 (the Meran) or ...e5.", concepts: ["center-control", "pawn-structure"] },
      moves: [
        { san: "Nc3", color: "white", why: "Develop and add pressure to d5. White plans e4 to blow open the center before Black can solidify.", concepts: ["development", "center-control"] },
        { san: "Nbd7", color: "black", why: "Develop the knight and prepare ...dxc4 followed by ...b5 (the Meran system) or ...e5. Nbd7 also avoids blocking the c-pawn.", concepts: ["development", "preparation"] },
        { san: "Bd3", color: "white", why: "Develop the bishop toward the kingside. White prepares e4 to challenge the center.", concepts: ["development", "piece-activity"] },
        { san: "dxc4", color: "black", why: "Take the pawn! This is the Meran system — Black captures on c4 and follows up with ...b5, trying to hold the extra pawn or expand on the queenside.", concepts: ["center-control"], commonMistakes: [{ san: "Be7", whyBad: "Be7 is too passive. The Meran idea (dxc4 + b5) gives Black active counterplay. Don't just develop quietly — fight for the initiative!" }] },
        { san: "Bxc4", color: "white", why: "Recapture with the bishop, which is now actively placed on the a2-g8 diagonal.", concepts: ["development", "piece-activity"] },
        { san: "b5", color: "black", why: "The Meran! Black pushes b5, attacking the bishop and preparing ...Bb7 to develop the 'problem bishop' via b7. This is one of the most dynamic ideas in the Semi-Slav — Black sacrifices pawn structure for active play.", concepts: ["space", "attack", "piece-activity"] },
      ],
    },
  ],
};
