import { OpeningLine } from "../types";

export const italianGameBlack: OpeningLine = {
  id: "italian-game-black",
  name: "Italian Game (as Black)",
  fullName: "Italian Game — Black's Defense (Giuoco Piano)",
  eco: "C53",
  playerColor: "black",
  level: "beginner",
  description:
    "How to handle the Italian Game when White plays it against you. Mirror White's setup, equalize in the center, and reach an equal middlegame with active piece play.",
  history: {
    origin:
      "When facing the Italian Game (1.e4 e5 2.Nf3 Nc6 3.Bc4), Black has several solid responses going back to the Renaissance. The classical answer is 3...Bc5 (the symmetric Giuoco Piano), and 3...Nf6 (Two Knights Defense) is more aggressive. This lesson teaches the mainline 3...Bc5 — a setup every chess player needs to know because the Italian Game is one of the most common openings you'll face.",
    nameExplanation:
      "Same name as the White-side opening because both sides are playing the Italian Game position. \"Giuoco Piano\" means \"quiet game\" — the symmetric setup leads to a quiet, positional struggle where both sides have similar plans and the better player typically wins on understanding rather than tricks.",
    popularity:
      "Essential at every level. You'll face the Italian Game in roughly half of your games as Black after 1.e4 e5 — knowing how to defend it is as important as knowing how to play it. At higher levels, Black has many sophisticated treatments (3...Bc5 with the modern slow approach, the Two Knights with 4...d5, etc.) but the basic plan stays the same.",
    bestFor:
      "Every Black player who plays 1...e5 against 1.e4. Teaches symmetric development, the importance of the bishop check on b4, the central break with ...d5, and how to equalize against a popular White system.",
    famousPlayers: ["Magnus Carlsen", "Fabiano Caruana", "Garry Kasparov", "Bobby Fischer"],
  },
  moves: [
    {
      san: "e4",
      color: "white",
      why: "White opens with the King's Pawn — most popular opening move at all levels.",
      concepts: ["center-control", "development"],
    },
    {
      san: "e5",
      color: "black",
      why: "Mirror White's central claim. Playing 1...e5 is the classical response — you fight for the center directly and keep the most options open. This is where the Italian Game can begin.",
      concepts: ["center-control"],
      controls: "d4, f4 squares",
      commonMistakes: [
        {
          san: "c5",
          whyBad:
            "1...c5 (Sicilian) is a great move and Black's most popular response, but it's a completely different opening — White can't play the Italian against you. For learning the Italian Game defense, play 1...e5 to enter the position where it occurs.",
        },
        {
          san: "e6",
          whyBad:
            "1...e6 (French Defense) leads to a totally different game. To learn how to handle the Italian Game, you need to play 1...e5.",
        },
      ],
    },
    {
      san: "Nf3",
      color: "white",
      why: "White develops the knight to its best square AND attacks your e5 pawn. Now you must defend e5 before doing anything else.",
      concepts: ["development", "attack"],
    },
    {
      san: "Nc6",
      color: "black",
      why: "Defend e5 by developing a knight. Nc6 puts the knight on its best square AND defends — two purposes in one move. This is far better than a passive defense like ...d6.",
      concepts: ["development", "center-control"],
      controls: "d4, e5 squares",
      commonMistakes: [
        {
          san: "d6",
          whyBad:
            "...d6 defends e5 but doesn't develop a piece. Nc6 does both. Always prefer developing moves that also defend or attack.",
        },
        {
          san: "f6",
          whyBad:
            "Never play ...f6 in the opening! It weakens the king diagonally (the e8-h5 diagonal opens up — Qh5 ideas become scary) AND it doesn't develop a piece. Nc6 is much better.",
        },
        {
          san: "Qf6",
          whyBad:
            "Bringing the queen out to f6 looks like it defends e5, but it blocks your knight from going to its best square (f6) and the queen is exposed. Develop minor pieces first.",
        },
      ],
    },
    {
      san: "Bc4",
      color: "white",
      why: "White plays the Italian Bishop — aiming straight at f7, your weakest square. This is the defining move of the Italian Game. Now you have to choose your defensive setup.",
      concepts: ["development", "attack"],
      controls: "f7 square, a2-g8 diagonal",
    },
    {
      san: "Bc5",
      color: "black",
      why: "Mirror White's setup with Bc5 — the bishop targets f2 (White's mirror weakness) and develops to its most active square. This is the Giuoco Piano (Italian for \"quiet game\") — both sides have symmetric, classical setups.",
      concepts: ["development", "piece-activity"],
      controls: "f2 square, a7-g1 diagonal",
      commonMistakes: [
        {
          san: "Nf6",
          whyBad:
            "...Nf6 is the Two Knights Defense — also great! But it leads to sharp tactical play (after 4.Ng5 you face the Fried Liver attack). For this lesson we're learning the calmer Bc5 approach. Both are good.",
        },
        {
          san: "Be7",
          whyBad:
            "...Be7 (Hungarian Defense) is solid but passive — the bishop sits on a defensive square. Bc5 puts the bishop on an active diagonal pointing at f2.",
        },
        {
          san: "h6",
          whyBad:
            "...h6 wastes a tempo on a pawn move when you should be developing pieces. White will get a huge development lead. Develop the bishop to c5.",
        },
      ],
    },
    {
      san: "c3",
      color: "white",
      why: "White prepares d4 (the central break). The c3 pawn supports d4 — when White plays d4 and you take, c3 lets White recapture with the pawn keeping a strong center.",
      concepts: ["center-control", "preparation"],
    },
    {
      san: "Nf6",
      color: "black",
      why: "Develop your kingside knight, attacking e4. Now White has a problem — the e4 pawn isn't defended and you're threatening Nxe4 next move. White will have to address this.",
      concepts: ["development", "attack"],
      controls: "e4 pawn, d5 square",
      commonMistakes: [
        {
          san: "d6",
          whyBad:
            "...d6 is too slow. Nf6 develops a piece AND attacks e4 — White has to react. Always make moves that develop AND threaten when you can.",
        },
        {
          san: "Qe7",
          whyBad:
            "...Qe7 brings the queen out too early and blocks your bishop. Develop knights first.",
        },
      ],
    },
    {
      san: "d4",
      color: "white",
      why: "White plays the central break — the move c3 was preparing. Now there's tension in the center with d4 attacking e5 (and your bishop on c5).",
      concepts: ["center-control", "attack"],
    },
    {
      san: "exd4",
      color: "black",
      why: "Capture! Don't let White consolidate with both center pawns side by side. After exd4, the central tension is released and White will have to recapture.",
      concepts: ["center-control"],
      commonMistakes: [
        {
          san: "Bb6",
          whyBad:
            "Retreating the bishop is too passive. Take on d4 to release the tension — you don't want White's pawn duo. After exd4 cxd4, you'll have ...Bb4+ as a tactic.",
        },
        {
          san: "Bb4",
          whyBad:
            "...Bb4+ here doesn't work because there's no check (White's c3 pawn blocks the diagonal). Take on d4 first, THEN ...Bb4+ becomes a real threat after cxd4.",
        },
      ],
    },
    {
      san: "cxd4",
      color: "white",
      why: "White recaptures with the c-pawn, building the ideal pawn center (e4 + d4). This is the moment of decision for Black.",
      concepts: ["center-control"],
    },
    {
      san: "Bb4+",
      color: "black",
      why: "The KEY move! Bb4+ checks White's king and forces White to deal with the check before continuing. This disrupts White's coordination AND prepares to trade off your bishop, simplifying the position.",
      concepts: ["tempo", "attack"],
      controls: "Gives check, forces White to respond",
      commonMistakes: [
        {
          san: "Bb6",
          whyBad:
            "Retreating the bishop loses the chance to gain tempo with check. Bb4+ is much sharper — it forces White to spend a tempo blocking the check.",
        },
        {
          san: "Nxe4",
          whyBad:
            "Tempting because it grabs a pawn, but after Bxf7+ Kxf7 Qb3+ White wins back the piece with a strong attack. Bb4+ first is the safe, principled move.",
        },
      ],
    },
    {
      san: "Bd2",
      color: "white",
      why: "White blocks the check with the bishop. Other options like Nbd2 or Nc3 also work but Bd2 is the main line.",
      concepts: ["development"],
    },
    {
      san: "Bxd2+",
      color: "black",
      why: "Trade bishops! Capturing on d2 simplifies the position and removes a potentially dangerous attacking piece. With fewer pieces on the board, your defensive task becomes easier.",
      concepts: ["piece-activity"],
      commonMistakes: [
        {
          san: "Nxe4",
          whyBad:
            "...Nxe4 grabs the pawn but allows Bxb4 Nxb4 and now your knight on b4 is offside. Trading bishops first is much safer.",
        },
      ],
    },
    {
      san: "Nbxd2",
      color: "white",
      why: "White recaptures with the queen-side knight (\"Nb-d2\" — the knight from b1). Notice it's the queen-side knight because the king-side knight is on f3.",
      concepts: ["development"],
    },
    {
      san: "d5",
      color: "black",
      why: "The freeing pawn break! d5 challenges White's e4 pawn and opens up your position. This is the key move that gives Black equality — after exd5 Nxd5, your knight is well-placed in the center.",
      concepts: ["center-control", "attack"],
      controls: "e4, c4 squares",
      commonMistakes: [
        {
          san: "O-O",
          whyBad:
            "Castling first is fine but ...d5 is more active. The break ...d5 is the whole point of Black's setup — without it, White keeps a permanent space advantage.",
        },
        {
          san: "Nxe4",
          whyBad:
            "...Nxe4 grabs the pawn but Black gets behind in development after Nxe4 d5 Bd3 — White's pieces are too active. Better to play ...d5 first to prepare the capture.",
        },
      ],
    },
    {
      san: "exd5",
      color: "white",
      why: "White takes — forced or White loses the e4 pawn for nothing.",
      concepts: ["center-control"],
    },
    {
      san: "Nxd5",
      color: "black",
      why: "Recapture with the knight, putting it on a beautiful central square. Your knight on d5 is more active than a pawn would be there. Black has equalized — fully developed pieces, central knight, safe king coming up.",
      concepts: ["piece-activity", "center-control"],
      commonMistakes: [
        {
          san: "Qxd5",
          whyBad:
            "Taking with the queen is wrong — Nxd5 is much better. The knight on d5 is a permanent piece in a great square; the queen on d5 is exposed and will be chased.",
        },
      ],
    },
    {
      san: "O-O",
      color: "white",
      why: "White castles to safety. The opening battle is largely over — both sides have completed development and have a roughly equal middlegame ahead.",
      concepts: ["king-safety"],
    },
    {
      san: "O-O",
      color: "black",
      why: "Castle! Get your king to safety. With both sides castled, both kings safe, you have an equal position with active piece play. The opening was a success — you've reached a level position from a popular White system.",
      concepts: ["king-safety"],
      commonMistakes: [
        {
          san: "Bf5",
          whyBad:
            "Developing the bishop is good but castle FIRST. Always get your king to safety before activating other pieces — a king in the center is a recipe for tactical disasters.",
        },
      ],
    },
  ],
  summary:
    "When facing the Italian Game as Black: mirror White's development with ...Nc6 and ...Bc5, develop ...Nf6 attacking e4 to gain a tempo, capture on d4 when White breaks with c3+d4, throw in ...Bb4+ to disrupt White's coordination, trade bishops with ...Bxd2+, then play the freeing ...d5 break. The KEY move is ...Bb4+ which gains a tempo, and the KEY pawn break is ...d5 which equalizes the center. This is the most-played black opening at all levels for a reason — it's solid, principled, and reaches a balanced middlegame.",
  variants: [
    {
      id: "two-knights-defense",
      name: "Two Knights Defense",
      description: "Instead of the symmetric ...Bc5, play the more aggressive ...Nf6 attacking e4. Leads to sharp tactical play after 4.Ng5.",
      branchesAt: 5,
      opponentMove: {
        san: "Nf6",
        color: "black",
        why: "The Two Knights Defense! Instead of the quiet Bc5, you attack White's e4 pawn immediately. This dares White to play the sharp 4.Ng5 attacking f7 — but you have a great defense ready.",
        concepts: ["development", "attack"],
      },
      moves: [
        {
          san: "Ng5",
          color: "white",
          why: "White lunges at f7 with both queen-side bishop and knight. Looks scary but you have a great defense.",
          concepts: ["attack"],
        },
        {
          san: "d5",
          color: "black",
          why: "The KEY defensive move! d5 counterattacks in the center, hitting White's bishop on c4. Don't try to defend f7 directly — counterattack instead.",
          concepts: ["center-control", "attack"],
          commonMistakes: [
            {
              san: "Nxe4",
              whyBad:
                "...Nxe4?? loses to Nxf7! Kxf7 Qf3+ winning everything. The d5 counterattack is the only good move.",
            },
            {
              san: "h6",
              whyBad:
                "...h6 attacks the knight but Nxf7! is a piece sacrifice that wins. Don't kick the knight — counter-attack with d5.",
            },
          ],
        },
        {
          san: "exd5",
          color: "white",
          why: "White takes the d5 pawn but now the bishop on c4 is hanging.",
          concepts: ["center-control"],
        },
        {
          san: "Na5",
          color: "black",
          why: "The Traxler-style move — attack the bishop on c4. The knight on a5 looks offside but its goal is to eliminate White's strong Italian bishop.",
          concepts: ["attack", "piece-activity"],
          commonMistakes: [
            {
              san: "Nxd5",
              whyBad:
                "...Nxd5 invites Nxf7 Kxf7 Qf3+ winning the knight. Na5 is the safer move — kick the bishop first.",
            },
          ],
        },
        {
          san: "Bb5+",
          color: "white",
          why: "White checks instead of retreating, gaining a tempo.",
          concepts: ["tempo"],
        },
        {
          san: "c6",
          color: "black",
          why: "Block the check with the c-pawn. This pawn move also attacks the bishop on b5 and prepares to recapture on d5 with the c-pawn next.",
          concepts: ["development"],
        },
        {
          san: "dxc6",
          color: "white",
          why: "White takes the pawn, getting up two pawns in material.",
          concepts: ["center-control"],
        },
        {
          san: "bxc6",
          color: "black",
          why: "Recapture with the b-pawn, opening the b-file for your rook AND maintaining a strong central pawn presence. You're down two pawns but you have great piece activity, an open b-file, and White's pieces are awkward (knight on g5, bishop on b5 about to be hit).",
          concepts: ["piece-activity", "attack"],
        },
        {
          san: "Be2",
          color: "white",
          why: "White retreats the bishop to safety.",
          concepts: ["king-safety"],
        },
        {
          san: "h6",
          color: "black",
          why: "NOW you can kick the knight! With the white bishop retreated, the f7 sacrifice no longer works. The knight on g5 has to go back.",
          concepts: ["attack"],
        },
      ],
    },
    {
      id: "hungarian-defense",
      name: "Hungarian Defense",
      description: "The solid 3...Be7 instead of the active Bc5 — quieter, more positional, less risky for Black.",
      branchesAt: 5,
      opponentMove: {
        san: "Be7",
        color: "black",
        why: "The Hungarian Defense. Instead of the active Bc5, you play the more modest Be7 — defends the kingside and avoids tactical complications. A solid choice if you want a quiet game.",
        concepts: ["development", "king-safety"],
      },
      moves: [
        {
          san: "d4",
          color: "white",
          why: "White plays for a big center.",
          concepts: ["center-control"],
        },
        {
          san: "exd4",
          color: "black",
          why: "Capture to release the tension. With Be7 instead of Bc5, ...exd4 doesn't have the same Bb4+ resource as the main Italian, but it's still the right idea.",
          concepts: ["center-control"],
        },
        {
          san: "Nxd4",
          color: "white",
          why: "White recaptures with the knight (no c3 played, so no cxd4).",
          concepts: ["center-control"],
        },
        {
          san: "d6",
          color: "black",
          why: "Solidify your structure with d6. This supports e5 (if needed later) and opens the c8 bishop. The Hungarian leads to slower, more strategic games.",
          concepts: ["pawn-structure", "development"],
        },
        {
          san: "O-O",
          color: "white",
          why: "White castles to safety.",
          concepts: ["king-safety"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Develop the knight. With your structure solid, you can take time to complete development.",
          concepts: ["development"],
        },
        {
          san: "Nc3",
          color: "white",
          why: "White develops the queen's knight.",
          concepts: ["development"],
        },
        {
          san: "O-O",
          color: "black",
          why: "Castle. Both sides have completed development — solid, equal middlegame ahead.",
          concepts: ["king-safety"],
        },
      ],
    },
  ],
};
