import { OpeningLine } from "../types";

export const italianGame: OpeningLine = {
  id: "italian-game",
  name: "Italian Game",
  fullName: "Italian Game (Giuoco Piano)",
  eco: "C50",
  playerColor: "white",
  level: "beginner",
  description:
    "A classical opening that develops pieces toward the center and targets the vulnerable f7 square.",
  history: {
    origin:
      "One of the oldest recorded openings in chess, the Italian Game dates back to the 15th century and was analyzed extensively by Italian masters like Gioacchino Greco in the 1620s. It was the dominant opening for centuries before the Ruy Lopez overtook it in popularity during the mid-1800s. It has seen a massive revival at the top level since the 2010s.",
    nameExplanation:
      "Called the \"Italian Game\" because it was developed and popularized by Italian chess players during the Renaissance. The variation name \"Giuoco Piano\" is Italian for \"quiet game,\" reflecting its initially calm, positional character before the center explodes open.",
    popularity:
      "Extremely popular at all levels. It's one of the first openings most players learn and has been a favorite of world champions from Morphy to Carlsen. At the amateur level, you'll face it constantly after 1.e4 e5.",
    bestFor:
      "Players who want to learn classical opening principles — develop pieces, control the center, and attack weaknesses. It teaches you WHY these principles matter because every move has a clear purpose.",
    famousPlayers: ["Magnus Carlsen", "Garry Kasparov", "Paul Morphy", "Gioacchino Greco"],
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
            "Bc4 develops a piece but doesn't create an immediate threat. Nf3 is more precise because it forces Black to defend e5, giving you tempo. Always prefer moves that develop WITH a threat.",
        },
        {
          san: "d4",
          whyBad:
            "While d4 fights for the center, it's premature — after exd4, you've traded a central pawn and White has no immediate way to recapture favorably. Develop pieces first, then open the center.",
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
      san: "Bc4",
      color: "white",
      why: "This is the defining move of the Italian Game. The bishop takes aim at f7 — the weakest point in Black's position because it's only defended by the king. From c4, the bishop also controls the critical d5 square, making it harder for Black to free their position with ...d5. You're also one step closer to kingside castling.",
      concepts: ["development", "attack", "king-safety"],
      controls: "f7 square, d5 square, a2-g8 diagonal",
      prevents:
        "Black from easily achieving ...d5 central break",
      commonMistakes: [
        {
          san: "Bb5",
          whyBad:
            "Bb5 (the Ruy Lopez) is also a great opening, but in the Italian Game we prefer Bc4 because it directly targets f7 and controls d5. Bb5 puts pressure on the knight defending e5, which is a different strategic idea.",
        },
      ],
    },
    {
      san: "Bc5",
      color: "black",
      why: "Black develops symmetrically, placing the bishop on an active diagonal that targets White's f2 — the mirror-image weakness. The bishop on c5 is aggressively placed and also discourages White from playing d4 immediately.",
      concepts: ["development", "piece-activity"],
      controls: "f2 square, a7-g1 diagonal",
    },
    {
      san: "c3",
      color: "white",
      why: "Prepares the powerful d4 pawn push. By playing c3 first, when you later play d4 you can recapture with the c-pawn if Black takes, maintaining a strong pawn center. This is a key idea: preparation before execution. The center is where the battle is won.",
      concepts: ["center-control", "preparation"],
      controls: "d4 square",
      prevents: "Nothing immediate, but sets up a powerful central expansion",
      commonMistakes: [
        {
          san: "d3",
          whyBad:
            "d3 is too passive — it blocks in the light-squared bishop and gives up the fight for a big center. c3 preparing d4 is much more ambitious and puts real pressure on Black.",
        },
      ],
    },
    {
      san: "Nf6",
      color: "black",
      why: "Black develops the kingside knight to its best square, attacking White's e4 pawn. This is a mirror of White's Nf3 — develop with a threat. The knight on f6 also prepares kingside castling.",
      concepts: ["development", "attack"],
      controls: "e4, d5 squares",
    },
    {
      san: "d4",
      color: "white",
      why: "Now the preparation pays off! With c3 already played, you strike at the center with d4. This challenges Black's bishop on c5 and e5 pawn simultaneously. If Black takes on d4, you recapture with cxd4 keeping a massive pawn center (pawns on d4 and e4). This is the ideal position — central dominance with active pieces.",
      concepts: ["center-control", "space", "tempo"],
      controls: "c5, e5 squares — attacks bishop and pawn",
      prevents: "Black from maintaining a comfortable setup",
    },
    {
      san: "exd4",
      color: "black",
      why: "Black captures to relieve the central tension. Holding onto e5 was becoming difficult with the d4 pawn attacking it and Nf3 also pressuring it. This is often the most practical response.",
      concepts: ["center-control"],
      controls: "Opens the center",
    },
    {
      san: "cxd4",
      color: "white",
      why: "Recapturing with the c-pawn gives you the ideal pawn center — pawns on d4 and e4 control a huge amount of space. Your pieces are all developed or ready to develop, and you can castle kingside on the next move. This is a textbook example of why preparation (c3) before action (d4) is so powerful.",
      concepts: ["center-control", "space"],
      controls: "c5, d5, e5, f5 squares — a wall of central control",
    },
    {
      san: "Bb4+",
      color: "black",
      why: "Black throws in a check to disrupt White's coordination. The bishop retreats from the center but gains a tempo by checking the king. White must deal with the check before continuing their plan.",
      concepts: ["tempo", "piece-activity"],
      controls: "Gives check, forces White to respond",
    },
    {
      san: "Bd2",
      color: "white",
      why: "Blocks the check while developing the bishop. After Black trades or retreats, you'll castle and have a powerful position — two central pawns, actively placed pieces, and a safe king. This is the reward for understanding the Italian Game's strategic ideas.",
      concepts: ["development", "king-safety"],
      controls: "Blocks check, develops the last minor piece",
    },
  ],
  summary:
    "The Italian Game teaches the most fundamental principles of chess openings: control the center with pawns, develop pieces to active squares that create threats, prepare pawn breaks before executing them (c3 then d4), and target weak points like f7. The key strategic idea is building a strong pawn center (e4 + d4) while keeping pieces active and aimed at the opponent's weaknesses.",
  variants: [
    {
      id: "two-knights",
      name: "Two Knights Defense",
      description: "Black develops the knight to f6 instead of the bishop to c5 — a more aggressive, tactical response that invites sharp play.",
      branchesAt: 5, // Index 5 = Black's 3rd move (main line: Bc5)
      opponentMove: {
        san: "Nf6",
        color: "black",
        why: "Instead of the quiet Bc5, Black immediately counterattacks the e4 pawn. This is more aggressive — Black dares White to go after f7 with Ng5, leading to sharp tactical play.",
        concepts: ["development", "attack", "center-control"],
        controls: "e4 pawn, d5 square",
      },
      moves: [
        {
          san: "Ng5",
          color: "white",
          why: "The most critical response — the knight lunges at f7, creating a double attack with the bishop on c4. Black must react precisely or face a devastating assault. This is the sharpest line against the Two Knights.",
          concepts: ["attack"],
          controls: "f7 square (double attack with Bc4)",
          commonMistakes: [
            {
              san: "d3",
              whyBad: "d3 is passive and lets Black equalize easily. Ng5 puts maximum pressure on f7 and tests Black's knowledge of the sharp theory.",
            },
          ],
        },
        {
          san: "d5",
          color: "black",
          why: "The only good defense! Black counterattacks in the center, striking at both the bishop on c4 and the pawn on e4. This pawn sacrifice (after exd5) leads to open, dynamic play where Black gets active piece play for the material.",
          concepts: ["center-control", "attack"],
          controls: "Attacks Bc4 and e4 simultaneously",
        },
        {
          san: "exd5",
          color: "white",
          why: "Accept the pawn. After exd5, you're up a pawn but Black will get rapid development and attacking chances. The key is to hold onto the extra material while weathering Black's initiative.",
          concepts: ["center-control"],
        },
        {
          san: "Na5",
          color: "black",
          why: "The Traxler-style Na5 attacks the bishop on c4, forcing it to move. Black wants to recapture on d5 and get active piece play. The knight on a5 looks offside but it serves a crucial purpose — eliminating the dangerous Italian bishop.",
          concepts: ["attack", "piece-activity"],
          controls: "Attacks Bc4",
        },
        {
          san: "Bb5+",
          color: "white",
          why: "An important intermezzo (in-between move). Instead of retreating passively, you check the king first, gaining a tempo. After Black blocks, you can then retreat the bishop safely.",
          concepts: ["tempo", "attack"],
          commonMistakes: [
            {
              san: "Bd3",
              whyBad: "Bd3 retreats without gaining anything. Bb5+ gains a crucial tempo by forcing Black to deal with check before continuing their attack.",
            },
          ],
        },
        {
          san: "c6",
          color: "black",
          why: "Blocking the check with c6. This pawn move also attacks the bishop on b5 and prepares to recapture on d5 with the c-pawn, which would give Black a strong central pawn.",
          concepts: ["development"],
          controls: "Blocks check, attacks Bb5",
        },
        {
          san: "dxc6",
          color: "white",
          why: "Take the pawn! After dxc6, you have two extra pawns. Black will recapture with bxc6 and have active piece play to compensate, but material is material.",
          concepts: ["center-control"],
        },
        {
          san: "bxc6",
          color: "black",
          why: "Recapturing with the b-pawn opens the b-file for Black's rook and gives Black a half-open file. Black now has excellent piece activity and open lines to compensate for the sacrificed pawns.",
          concepts: ["piece-activity", "attack"],
        },
      ],
    },
    {
      id: "evans-gambit",
      name: "Evans Gambit",
      description: "Instead of the quiet c3, White sacrifices a pawn with b4! to rip open the center with maximum aggression.",
      branchesAt: 6, // Index 6 = White's 4th move (main line: c3)
      opponentMove: {
        san: "b4",
        color: "white",
        why: "The Evans Gambit! White sacrifices the b-pawn to lure Black's bishop away from c5, gaining a huge tempo advantage for rapid central expansion with c3 and d4. This is one of the most romantic gambits in chess — pure attacking chess.",
        concepts: ["attack", "tempo", "center-control"],
        controls: "Attacks Bc5, gains time for d4",
      },
      moves: [
        {
          san: "Bxb4",
          color: "black",
          why: "Black accepts the gambit. Declining with Bb6 is possible but passive — accepting is the principled response. Black now has an extra pawn but White will get rapid development.",
          concepts: ["center-control"],
        },
        {
          san: "c3",
          color: "white",
          why: "Immediately kicking the bishop and preparing the powerful d4. The whole point of the Evans Gambit — you sacrificed a pawn to play c3+d4 with maximum force, building an ideal pawn center while Black wastes time moving the bishop.",
          concepts: ["center-control", "tempo"],
          controls: "d4 square, attacks Bb4",
          commonMistakes: [
            {
              san: "d4",
              whyBad: "d4 immediately looks aggressive but after exd4, you can't recapture favorably. c3 first gains a tempo on the bishop AND prepares d4 with the c-pawn ready to recapture.",
            },
          ],
        },
        {
          san: "Ba5",
          color: "black",
          why: "The bishop retreats to a5, staying on the a5-e1 diagonal to maintain some pressure. This is the main line — Ba5 keeps the bishop active rather than retreating to the passive e7 square.",
          concepts: ["piece-activity"],
        },
        {
          san: "d4",
          color: "white",
          why: "NOW d4! With c3 already played, if Black takes exd4, you recapture cxd4 with a perfect pawn center (e4+d4). This is the payoff of the Evans Gambit — a dominant center and rapid development, all for one pawn.",
          concepts: ["center-control", "attack"],
          controls: "Central domination with e4+d4",
        },
        {
          san: "exd4",
          color: "black",
          why: "Black takes, opening the center. After cxd4, White has the ideal pawn center but Black has an extra pawn and can try to hold on defensively.",
          concepts: ["center-control"],
        },
        {
          san: "O-O",
          color: "white",
          why: "Castle immediately! Don't recapture on d4 yet. By castling, you get your king to safety and bring the rook to the center. The d4 pawn can be recaptured later — development and king safety come first in gambit play.",
          concepts: ["king-safety", "development"],
          commonMistakes: [
            {
              san: "cxd4",
              whyBad: "Recapturing immediately is natural but misses the point. O-O develops with tempo — you'll pick up d4 later while your pieces pour into the center. In gambits, speed beats material.",
            },
          ],
        },
        {
          san: "d6",
          color: "black",
          why: "Reinforcing the center and opening a diagonal for the bishop. Black aims for solid development rather than trying to hold the extra pawn at all costs.",
          concepts: ["center-control", "development"],
        },
        {
          san: "cxd4",
          color: "white",
          why: "Now recapture, establishing the powerful d4+e4 pawn center. With your king safely castled and rook on f1 ready to swing to the center, White has excellent attacking chances.",
          concepts: ["center-control"],
        },
      ],
    },
  ],
};
