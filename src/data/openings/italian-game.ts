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
};
