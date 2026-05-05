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
      commonMistakes: [
        { san: "d4", whyBad: "d4 is also a great first move (leads to the Queen's Gambit, London, etc.), but we're learning the Italian Game which starts with e4. Both are equally valid — e4 leads to more open, tactical games." },
        { san: "Nf3", whyBad: "Nf3 is fine but delays claiming the center. e4 grabs space immediately AND opens your bishop's diagonal. Always claim the center with a pawn when you can do it safely." },
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
            "Bb5 (the Ruy Lopez) is also excellent — it's actually the most popular move here! But in the Italian Game we play Bc4 because it directly targets f7 (the weakest square) and controls d5. Bb5 pins the knight instead, which is a different strategic plan. Both are strong.",
        },
        {
          san: "d4",
          whyBad: "d4 right away leads to the Scotch Game — playable but different. In the Italian, we develop the bishop first to aim at f7, THEN prepare d4 later with c3. Piece development before pawn pushes.",
        },
        {
          san: "Nc3",
          whyBad: "Nc3 develops a piece but doesn't create a specific threat. Bc4 is better here because it targets the f7 weakness AND develops — every move should have a purpose beyond just 'getting a piece out.'",
        },
        {
          san: "Be2",
          whyBad: "Be2 is too passive — the bishop sits on a boring diagonal doing nothing. Bc4 is active: it targets f7 (weak square), controls d5 (key central square), and prepares castling. Always put bishops on ACTIVE diagonals.",
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
            "d3 is too passive — it blocks in the light-squared bishop on c4 and gives up the fight for d4. c3 preparing d4 is much more ambitious. Think: if I play d3, when will I ever get d4? With c3, d4 comes next move with full support.",
        },
        {
          san: "d4",
          whyBad:
            "d4 immediately looks strong but after exd4, you have to recapture Nxd4 (the knight moves AGAIN, wasting a tempo) or lose the pawn. c3 FIRST means after d4 exd4 cxd4, you keep a pawn center. Preparation before action!",
        },
        {
          san: "O-O",
          whyBad:
            "Castling is always a good move, but c3 is more urgent here. If you castle first, Black might play d5 challenging your center before you're ready. c3 prepares d4 which is the whole plan. Castle AFTER you've set up the center.",
        },
        {
          san: "Nc3",
          whyBad:
            "Nc3 develops but BLOCKS the c-pawn! You need c3 to prepare d4. If the knight is on c3, you can never play c3. Move order matters — c3 first, then develop the knight to d2 or a different route.",
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
      commonMistakes: [
        { san: "O-O", whyBad: "Castling is always tempting but d4 is the PLAN we've been building toward. c3 was played specifically to make d4 work. If you castle now, Black consolidates and your c3 was wasted. Execute the plan!" },
        { san: "Qe2", whyBad: "Moving the queen this early clutters the position and blocks your bishop. d4 is the natural continuation — it's what c3 prepared. Don't get distracted by queen moves in the opening." },
      ],
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
      commonMistakes: [
        { san: "Nxd4", whyBad: "Nxd4 recaptures but moves your already-developed knight AGAIN (it was perfect on f3). After cxd4, you keep the knight on f3 AND get a big pawn center. Don't move a piece twice when a pawn can do the job better." },
        { san: "e5", whyBad: "e5 attacks the knight but ignores the d4 pawn. After Nxd4, you've lost a pawn for nothing. Always recapture material first, THEN attack." },
      ],
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
      commonMistakes: [
        { san: "Nc3", whyBad: "Nc3 blocks the check but puts the knight on c3 where it blocks your c-pawn (which already moved to d4). Bd2 is better because the bishop develops to a useful square AND blocks the check. Two birds, one stone." },
        { san: "Kf1", whyBad: "Moving the king loses castling rights forever. Bd2 blocks the check AND develops a piece. Never give up castling when you don't have to — it's too valuable." },
      ],
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
    {
      id: "hungarian-defense",
      name: "Hungarian Defense (3...Be7)",
      description: "Black plays the solid but passive ...Be7 instead of the active Bc5. They want to avoid theory and play a quiet game. Punish them with central space.",
      branchesAt: 5,
      opponentMove: {
        san: "Be7",
        color: "black",
        why: "The Hungarian Defense — a passive but solid system. Black retreats the bishop to a defensive square, avoiding the Italian Game's main lines. Black is fine but you'll get more space because of their lack of activity.",
        concepts: ["development", "king-safety"],
      },
      moves: [
        {
          san: "d4",
          color: "white",
          why: "Strike in the center! Black's bishop on e7 doesn't contest d4, so push the d-pawn for a big center.",
          concepts: ["center-control"],
          commonMistakes: [
            {
              san: "c3",
              whyBad:
                "c3 prepares d4 but is too slow against the Hungarian — Black's passive setup means you can play d4 directly without preparation. Take the space NOW.",
            },
          ],
        },
        {
          san: "exd4",
          color: "black",
          why: "Black captures to relieve the central pressure.",
          concepts: ["center-control"],
        },
        {
          san: "Nxd4",
          color: "white",
          why: "Recapture with the knight — the knight on d4 is strong, controlling key central squares.",
          concepts: ["center-control", "piece-activity"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Black develops the knight, attacking your e4 pawn.",
          concepts: ["development", "attack"],
        },
        {
          san: "Nc3",
          color: "white",
          why: "Develop AND defend e4 in one move. The knight on c3 supports the center and prepares queenside development.",
          concepts: ["development", "center-control"],
        },
        {
          san: "O-O",
          color: "black",
          why: "Black castles, getting the king to safety.",
          concepts: ["king-safety"],
        },
        {
          san: "O-O",
          color: "white",
          why: "Castle. Both sides are now safely castled. You have more space and active pieces — Black's Hungarian setup is solid but passive.",
          concepts: ["king-safety"],
        },
        {
          san: "d6",
          color: "black",
          why: "Black plays d6 to support a future ...e5 break or just shore up the center.",
          concepts: ["pawn-structure"],
        },
        {
          san: "Re1",
          color: "white",
          why: "Bring the rook to the active e-file. With Black's passive setup, your rook will dominate this open line.",
          concepts: ["piece-activity"],
        },
        {
          san: "Bd7",
          color: "black",
          why: "Black develops the queen-side bishop modestly.",
          concepts: ["development"],
        },
      ],
    },
    {
      id: "paris-defense",
      name: "Paris Defense (3...d6)",
      description: "Black plays ...d6 immediately, the Semi-Italian or Paris Defense. Very passive — you can play freely and dictate the game.",
      branchesAt: 5,
      opponentMove: {
        san: "d6",
        color: "black",
        why: "The Paris Defense / Semi-Italian. Black goes for a solid but passive setup, planning to develop pieces behind the d6 pawn. This is one of the easiest variations to play against — Black has no real plan.",
        concepts: ["pawn-structure"],
      },
      moves: [
        {
          san: "d4",
          color: "white",
          why: "Take the center. With Black committed to a passive setup, just grab maximum space.",
          concepts: ["center-control"],
        },
        {
          san: "exd4",
          color: "black",
          why: "Black captures.",
          concepts: ["center-control"],
        },
        {
          san: "Nxd4",
          color: "white",
          why: "Recapture with the knight, putting it on a strong central square.",
          concepts: ["center-control", "piece-activity"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Black develops the knight.",
          concepts: ["development"],
        },
        {
          san: "Nc3",
          color: "white",
          why: "Develop and defend e4.",
          concepts: ["development"],
        },
        {
          san: "Be7",
          color: "black",
          why: "Black continues with a passive setup.",
          concepts: ["development"],
        },
        {
          san: "O-O",
          color: "white",
          why: "Castle and prepare to dominate the center.",
          concepts: ["king-safety"],
        },
        {
          san: "O-O",
          color: "black",
          why: "Black castles too.",
          concepts: ["king-safety"],
        },
        {
          san: "Re1",
          color: "white",
          why: "Activate the rook on the open e-file. You have a great position — bigger center, more active pieces, more space.",
          concepts: ["piece-activity"],
        },
      ],
    },
    {
      id: "shilling-gambit",
      name: "Shilling Gambit Trap! (3...Nd4)",
      description: "BEWARE: a famous beginner trap. Black plays Nd4 hoping for 4.Nxe5?? Qg5! winning material. Spot the trap and just take the knight.",
      branchesAt: 5,
      opponentMove: {
        san: "Nd4",
        color: "black",
        why: "The Blackburne Shilling Gambit! This is a TRAP — Black hopes you'll play 4.Nxe5?? Qg5! threatening both Qxg2 and Qxe5. After 5.Nxf7 Qxg2 6.Rf1 Qxe4+ Black wins everything. DO NOT TAKE the e5 pawn here.",
        concepts: ["attack"],
      },
      moves: [
        {
          san: "Nxd4",
          color: "white",
          why: "Just take the knight! 4.Nxd4 is the simplest response — capture the offered piece. Black's tactical idea relies on you taking on e5 first; if you take the knight, the trap evaporates.",
          concepts: ["piece-activity"],
          commonMistakes: [
            {
              san: "Nxe5",
              whyBad:
                "DON'T! Nxe5?? falls into the Shilling Gambit trap. After 4.Nxe5 Qg5! Black threatens both Qxg2 (winning the rook) AND Qxe5. White can't defend both. Just play Nxd4 to escape the trap.",
            },
            {
              san: "c3",
              whyBad:
                "c3 attacks the Nd4 but Black can just retreat the knight or play Nxf3+. It's playable but Nxd4 is much simpler — just take the piece.",
            },
            {
              san: "O-O",
              whyBad:
                "O-O is illegal here — there's a knight blocking f1-h1. Even if it weren't, Nxd4 takes a free piece. Always look for free material first!",
            },
          ],
        },
        {
          san: "exd4",
          color: "black",
          why: "Black recaptures, but now they're down a piece and a tempo. The 'gambit' has failed.",
          concepts: ["center-control"],
        },
        {
          san: "O-O",
          color: "white",
          why: "Castle and develop. You're up material and Black has nothing to show for it.",
          concepts: ["king-safety"],
        },
        {
          san: "d6",
          color: "black",
          why: "Black tries to consolidate.",
          concepts: ["pawn-structure"],
        },
        {
          san: "d3",
          color: "white",
          why: "Solid development, opening your bishop's diagonal.",
          concepts: ["development"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Black develops.",
          concepts: ["development"],
        },
        {
          san: "Re1",
          color: "white",
          why: "Activate the rook. You're winning easily.",
          concepts: ["piece-activity"],
        },
      ],
    },
    {
      id: "g6-irregular",
      name: "Black plays ...g6 (Hypermodern)",
      description: "Black tries a hypermodern fianchetto setup with g6 instead of developing the bishop to c5. Slow and passive — punish with d4.",
      branchesAt: 5,
      opponentMove: {
        san: "g6",
        color: "black",
        why: "Black goes for a fianchetto setup. This is fine in some openings (like the Pirc) but here it's slow — you've already developed two pieces and Black is just pushing pawns.",
        concepts: ["pawn-structure"],
      },
      moves: [
        {
          san: "d4",
          color: "white",
          why: "Strike in the center while Black is pushing pawns. Take the space they're giving you.",
          concepts: ["center-control"],
        },
        {
          san: "exd4",
          color: "black",
          why: "Capture.",
          concepts: ["center-control"],
        },
        {
          san: "Nxd4",
          color: "white",
          why: "Recapture, knight in the center.",
          concepts: ["center-control"],
        },
        {
          san: "Bg7",
          color: "black",
          why: "Black completes the fianchetto.",
          concepts: ["development"],
        },
        {
          san: "Nc3",
          color: "white",
          why: "Develop and defend e4.",
          concepts: ["development"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Develop the knight.",
          concepts: ["development"],
        },
        {
          san: "O-O",
          color: "white",
          why: "Castle.",
          concepts: ["king-safety"],
        },
        {
          san: "O-O",
          color: "black",
          why: "Black castles.",
          concepts: ["king-safety"],
        },
        {
          san: "Re1",
          color: "white",
          why: "Activate the rook on the open e-file. You have a development lead and central control.",
          concepts: ["piece-activity"],
        },
      ],
    },
    {
      id: "bb6-retreat",
      name: "Black retreats Bb6 (after cxd4)",
      description: "After 6.cxd4, Black retreats Bb6 instead of the active Bb4+. Punish with d5 to grab space and harass their pieces.",
      branchesAt: 11,
      opponentMove: {
        san: "Bb6",
        color: "black",
        why: "Black plays it safe with a bishop retreat, missing the chance to gain a tempo with Bb4+. You get a free hand to expand in the center.",
        concepts: ["pawn-structure"],
      },
      moves: [
        {
          san: "d5",
          color: "white",
          why: "PUSH! Take maximum space and kick Black's c6 knight while their pieces are passive.",
          concepts: ["space", "attack"],
        },
        {
          san: "Ne7",
          color: "black",
          why: "Black retreats the knight to e7. The knight is awkward here.",
          concepts: ["development"],
        },
        {
          san: "e5",
          color: "white",
          why: "Push e5 to lock down even more space and attack Black's f6 knight (if developed) or restrict the position.",
          concepts: ["space", "attack"],
        },
        {
          san: "Ng4",
          color: "black",
          why: "Black tries to relocate the knight.",
          concepts: ["piece-activity"],
        },
        {
          san: "Bd3",
          color: "white",
          why: "Develop the bishop to a more active square — Bd3 supports e4-e5 push and aims at the kingside.",
          concepts: ["development"],
        },
        {
          san: "O-O",
          color: "black",
          why: "Black castles, accepting a cramped position.",
          concepts: ["king-safety"],
        },
        {
          san: "O-O",
          color: "white",
          why: "Castle. You have a winning amount of space and Black's pieces are passive.",
          concepts: ["king-safety"],
        },
      ],
    },
    {
      id: "nxe4-pawn-grab",
      name: "Black grabs e4 pawn (...Nxe4)",
      description: "Instead of Bb4+, Black plays Nxe4 trying to win a pawn. Punish with d5 attacking the c6 knight while their knight is offside.",
      branchesAt: 11,
      opponentMove: {
        san: "Nxe4",
        color: "black",
        why: "Black greedily grabs the e4 pawn. This is a mistake — the knight on e4 will be exposed and you'll get massive compensation through better development.",
        concepts: ["attack"],
      },
      moves: [
        {
          san: "d5",
          color: "white",
          why: "d5! Attack the c6 knight while Black's e4 knight is hanging in the center. Black has to handle two pieces under fire.",
          concepts: ["attack", "tempo"],
          commonMistakes: [
            {
              san: "Bxf7+",
              whyBad:
                "Bxf7+ Kxf7 and Black is up a piece. The trap doesn't work cleanly here without preparation. d5 is the safe, strong response.",
            },
          ],
        },
        {
          san: "Ne7",
          color: "black",
          why: "Black retreats to e7. The knight is awkward but at least safe.",
          concepts: ["development"],
        },
        {
          san: "Qe2",
          color: "white",
          why: "Pin the e4 knight to the king! Now Black has to give back the pawn. Qe2 is the key — pin and recover material.",
          concepts: ["attack", "piece-activity"],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Black retreats the knight to f6 to break the pin.",
          concepts: ["development"],
        },
        {
          san: "Nc3",
          color: "white",
          why: "Develop and threaten d5-d6 ideas. You have a great position — the development lead and active pieces compensate for the missing pawn.",
          concepts: ["development"],
        },
        {
          san: "d6",
          color: "black",
          why: "Black tries to consolidate.",
          concepts: ["pawn-structure"],
        },
        {
          san: "Bg5",
          color: "white",
          why: "Pin the f6 knight to the queen. You have a powerful initiative.",
          concepts: ["attack", "piece-activity"],
        },
      ],
    },
    {
      id: "h6-wasted-tempo",
      name: "Black plays ...h6 (wasted tempo)",
      description: "Black plays the slow ...h6, wasting a move. Punish with rapid development and a big center.",
      branchesAt: 5,
      opponentMove: {
        san: "h6",
        color: "black",
        why: "Black plays h6 'just in case' — but it doesn't develop anything and gives you a free tempo. You're already two pieces ahead in development.",
        concepts: ["pawn-structure"],
      },
      moves: [
        { san: "O-O", color: "white", why: "Castle immediately. You're ahead in development — get the king safe and prepare to expand.", concepts: ["king-safety"] },
        { san: "Nf6", color: "black", why: "Black finally develops the knight.", concepts: ["development"] },
        { san: "d4", color: "white", why: "Strike in the center. Black's wasted tempo means you can claim space without preparation.", concepts: ["center-control"] },
        { san: "exd4", color: "black", why: "Capture.", concepts: ["center-control"] },
        { san: "Nxd4", color: "white", why: "Recapture with the knight.", concepts: ["center-control"] },
        { san: "d6", color: "black", why: "Black tries to consolidate.", concepts: ["pawn-structure"] },
        { san: "Nc3", color: "white", why: "Develop and protect e4.", concepts: ["development"] },
        { san: "Be7", color: "black", why: "Black develops passively.", concepts: ["development"] },
      ],
    },
    {
      id: "qe7-early-queen",
      name: "Black plays ...Qe7 (queen out early)",
      description: "Black brings the queen out on move 3 — premature and easy to punish. Just develop and let them waste time.",
      branchesAt: 5,
      opponentMove: {
        san: "Qe7",
        color: "black",
        why: "Black brings the queen out way too early. The queen is in the way of their pieces and exposed. You don't even need to chase it — just develop and let them suffer.",
        concepts: ["development"],
      },
      moves: [
        { san: "d3", color: "white", why: "Solid — keep developing. Black's queen on e7 blocks their bishop.", concepts: ["development"] },
        { san: "Nf6", color: "black", why: "Black develops the knight.", concepts: ["development"] },
        { san: "O-O", color: "white", why: "Castle.", concepts: ["king-safety"] },
        { san: "d6", color: "black", why: "Black plays d6.", concepts: ["pawn-structure"] },
        { san: "Nc3", color: "white", why: "Develop the queen-side knight.", concepts: ["development"] },
        { san: "Bd7", color: "black", why: "Black develops the bishop modestly.", concepts: ["development"] },
      ],
    },
    {
      id: "early-d6-decline",
      name: "Black declines d4 with ...d6",
      description: "After 5.d4, Black plays ...d6 instead of capturing. They're going for a slow, defensive setup. Castle and dominate.",
      branchesAt: 9,
      opponentMove: {
        san: "d6",
        color: "black",
        why: "Black declines to capture, choosing a passive defense. You get a free hand to expand — Black has no real plan.",
        concepts: ["pawn-structure"],
      },
      moves: [
        { san: "O-O", color: "white", why: "Castle. You have a big center and Black is passive — get your king safe and start attacking.", concepts: ["king-safety"] },
        { san: "O-O", color: "black", why: "Black castles.", concepts: ["king-safety"] },
        { san: "Re1", color: "white", why: "Activate the rook on the e-file. The pressure on e5 is key.", concepts: ["piece-activity"] },
        { san: "h6", color: "black", why: "Black plays a useless waiting move.", concepts: ["pawn-structure"] },
        { san: "h3", color: "white", why: "Prepare to build with Bg5 ideas.", concepts: ["preparation"] },
      ],
    },
    {
      id: "bxd4-blunder",
      name: "Black BLUNDERS with Bxd4??",
      description: "BEWARE: Black plays Bxd4? thinking they can capture the pawn. Refute with Nxd4! winning a piece.",
      branchesAt: 9,
      opponentMove: {
        san: "Bxd4",
        color: "black",
        why: "Black BLUNDERS by capturing with the bishop! The bishop on c5 takes on d4 — but it's defended by Nf3. Black just lost a piece.",
        concepts: ["attack"],
      },
      moves: [
        {
          san: "Nxd4",
          color: "white",
          why: "Take the bishop! You're up a full piece. This is the kind of free material you must spot.",
          concepts: ["attack"],
          commonMistakes: [
            { san: "cxd4", whyBad: "Don't recapture with the pawn first! Nxd4 takes the bishop directly. Always look for free pieces FIRST." },
          ],
        },
        { san: "exd4", color: "black", why: "Black recaptures the knight, but they've still lost a piece.", concepts: ["center-control"] },
        { san: "O-O", color: "white", why: "Castle. You're up a piece — just play solidly to convert.", concepts: ["king-safety"] },
        { san: "O-O", color: "black", why: "Black castles, hoping for some attack.", concepts: ["king-safety"] },
        { san: "Re1", color: "white", why: "Activate the rook. Up a piece, you're winning easily.", concepts: ["piece-activity"] },
      ],
    },
    {
      id: "d6-after-c3",
      name: "Black plays ...d6 instead of ...Nf6",
      description: "After 4.c3, Black plays the slow ...d6 instead of attacking with ...Nf6. Just develop — they have no plan.",
      branchesAt: 7,
      opponentMove: {
        san: "d6",
        color: "black",
        why: "Black plays a slow, passive move. They've given up the chance to attack your e4 pawn with Nf6. You can develop freely.",
        concepts: ["pawn-structure"],
      },
      moves: [
        { san: "d4", color: "white", why: "Take the center! Black's passive setup means you can claim everything.", concepts: ["center-control"] },
        { san: "Bb6", color: "black", why: "Black retreats the bishop to keep the pin off the knight.", concepts: ["development"] },
        { san: "Nbd2", color: "white", why: "Develop the knight (not Nc3 because we want to keep c3 for the pawn).", concepts: ["development"] },
        { san: "Nf6", color: "black", why: "Black finally plays Nf6.", concepts: ["development"] },
        { san: "O-O", color: "white", why: "Castle. You have central dominance.", concepts: ["king-safety"] },
      ],
    },
    {
      id: "qf6-after-c3",
      name: "Black plays ...Qf6 (queen out)",
      description: "After 4.c3, Black brings the queen to f6 — very awkward, blocks their own knight. Just develop and use the lead.",
      branchesAt: 7,
      opponentMove: {
        san: "Qf6",
        color: "black",
        why: "Black plays Qf6 — but this BLOCKS their knight from f6 (its best square). Black has a permanent positional disadvantage now.",
        concepts: ["development"],
      },
      moves: [
        { san: "d3", color: "white", why: "Don't trade queens. Black's misplaced queen helps YOU.", concepts: ["development"] },
        { san: "Nge7", color: "black", why: "The knight is forced to e7, an awkward square.", concepts: ["development"] },
        { san: "O-O", color: "white", why: "Castle.", concepts: ["king-safety"] },
        { san: "O-O", color: "black", why: "Black castles.", concepts: ["king-safety"] },
        { san: "Re1", color: "white", why: "Activate the rook. You have a structural advantage that won't go away.", concepts: ["piece-activity"] },
      ],
    },
    {
      id: "bb6-after-cxd4",
      name: "Black retreats Bb6 (instead of Bb4+)",
      description: "After 6.cxd4, Black plays the safe Bb6 instead of the active Bb4+. You get to keep a strong center.",
      branchesAt: 11,
      opponentMove: {
        san: "Bb6",
        color: "black",
        why: "Black retreats the bishop to b6 — solid but you keep the strong center. No tempo lost for you, no check to deal with.",
        concepts: ["pawn-structure"],
      },
      moves: [
        { san: "Nc3", color: "white", why: "Develop the queen-side knight.", concepts: ["development"] },
        { san: "O-O", color: "black", why: "Black castles.", concepts: ["king-safety"] },
        { san: "O-O", color: "white", why: "Castle yourself.", concepts: ["king-safety"] },
        { san: "Re8", color: "black", why: "Black activates the rook.", concepts: ["piece-activity"] },
        { san: "Bg5", color: "white", why: "Develop the bishop with a pin on f6.", concepts: ["attack", "piece-activity"] },
      ],
    },
    {
      id: "early-h3-prep",
      name: "Slower Italian: Black plays ...h6 after Bc5",
      description: "Black plays a slow ...h6 instead of developing the knight. This gives you time to develop perfectly.",
      branchesAt: 7,
      opponentMove: {
        san: "h6",
        color: "black",
        why: "Black plays a slow waiting move. You get a free tempo to develop ideally.",
        concepts: ["pawn-structure"],
      },
      moves: [
        { san: "d4", color: "white", why: "Take the center! No need for c3 preparation when Black is wasting moves.", concepts: ["center-control"] },
        { san: "exd4", color: "black", why: "Black captures.", concepts: ["center-control"] },
        { san: "cxd4", color: "white", why: "Recapture with the c-pawn for a perfect center.", concepts: ["center-control"] },
        { san: "Bb6", color: "black", why: "Black retreats the bishop.", concepts: ["development"] },
        { san: "Nc3", color: "white", why: "Develop and dominate.", concepts: ["development"] },
      ],
    },
  ],
};
