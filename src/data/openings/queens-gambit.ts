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
  history: {
    origin:
      "The Queen's Gambit is one of the oldest known chess openings, with references dating back to a 1490 manuscript. It became a cornerstone of competitive chess in the late 19th century and dominated world championship matches throughout the 20th century. The Netflix series 'The Queen's Gambit' (2020) brought it into mainstream pop culture.",
    nameExplanation:
      "Called a \"gambit\" because White offers the c4 pawn — but it's not a true sacrifice. If Black takes with ...dxc4, White can almost always win the pawn back while gaining a superior center. The \"Queen's\" part refers to the queenside (c and d files) where the action happens, as opposed to kingside openings like 1.e4.",
    popularity:
      "One of the most popular openings in chess history. It's the backbone of nearly every 1.d4 player's repertoire and has been played in countless world championship matches. At the club level, you'll encounter it in almost every tournament.",
    bestFor:
      "Players who enjoy strategic, positional chess. The Queen's Gambit teaches patience — you build pressure slowly, improve your pieces, and squeeze your opponent. It's less about tactics and more about understanding pawn structures and piece placement.",
    famousPlayers: ["Anatoly Karpov", "Boris Spassky", "Ding Liren", "Gukesh Dommaraju"],
  },
  moves: [
    {
      san: "d4",
      color: "white",
      why: "Opens the game by occupying the center with a pawn supported by the queen. Unlike 1.e4, the d4 pawn is already defended the moment it lands, so it cannot be easily challenged. This move also frees the dark-squared bishop and begins the fight for long-term central dominance.",
      concepts: ["center-control", "development"],
      controls: "c5, e5 squares",
      commonMistakes: [
        { san: "e4", whyBad: "e4 is also a great first move but leads to open, tactical games. We're learning the Queen's Gambit which starts with d4 — a more strategic approach. Both are valid; d4 tends toward positional play." },
        { san: "c4", whyBad: "c4 first (the English Opening) is playable but less direct. d4 claims the center immediately and keeps the option of c4 on the next move. Grab the center first, then expand." },
        { san: "Nf3", whyBad: "Nf3 is flexible but delays the central pawn claim. d4 stakes your claim immediately — the pawn controls e5 and c5 and can't be easily challenged since the queen already defends it." },
      ],
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
        {
          san: "Bf4",
          whyBad: "Bf4 is the London System — a perfectly good opening, but a completely different strategy. c4 challenges d5 directly and creates dynamic tension. The Queen's Gambit is about fighting for the center with pawns, not settling for a system setup.",
        },
        {
          san: "Nc3",
          whyBad: "Nc3 develops but doesn't challenge Black's center. c4 immediately strikes at d5, forcing Black to make a decision. Always challenge the opponent's central pawns when you can — don't just develop passively.",
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
        {
          san: "cxd5",
          whyBad: "Taking on d5 too early (before developing) releases the tension and lets Black equalize with ...exd5 or ...Nxd5. Keep the pawn on c4 to maintain pressure — the threat is stronger than the execution.",
        }
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
      commonMistakes: [
        { san: "Bf4", whyBad: "Bf4 develops but doesn't create any pressure on Black's position. Bg5 pins the knight that defends d5 — that's a concrete threat. Always choose the move that creates problems for your opponent." },
        { san: "e3", whyBad: "e3 right away locks the dark-squared bishop behind the pawn chain. Get the bishop OUT first (Bg5), THEN play e3. Same principle as the London System — bishop before e3, always." },
      ],
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
        {
          san: "Qc2",
          whyBad: "Don't bring the queen out when you have minor pieces to develop. e3 quietly strengthens the center and prepares Bd3. The queen on c2 is a target for Black's pieces — develop quietly first.",
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
      commonMistakes: [
        { san: "Bd3", whyBad: "Bd3 develops but the knight should come first. Nf3 prepares castling (king safety is urgent!) and controls e5. Knights before bishops — especially when you need to castle." },
        { san: "f3", whyBad: "f3 looks like it prepares e4, but it weakens the kingside horribly and takes away the knight's best square. Nf3 does the same job of supporting e4 while developing a piece. Never weaken your king position for a pawn push." },
      ],
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
      commonMistakes: [
        { san: "Bd3", whyBad: "Bd3 develops but Rc1 is more urgent here. The c-file is about to open and the rook needs to be there. The bishop can wait one move — positional priorities matter." },
        { san: "cxd5", whyBad: "Taking on d5 prematurely releases the tension. Black recaptures with ...exd5 or ...Nxd5 and gets easy play. Keep the pressure with Rc1 — the threat of taking on d5 is stronger when your rook is already on the c-file." },
      ],
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
      commonMistakes: [
        { san: "Be2", whyBad: "Be2 is passive — the bishop sits on a dead diagonal with no targets. Bd3 aims at h7, creating real attacking potential against Black's castled king. Active bishops win games; passive bishops watch." },
        { san: "cxd5", whyBad: "Still premature to release the tension. Bd3 develops your last minor piece and prepares castling. Once fully developed, THEN you can consider exchanges. Complete development first." }
      ],
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
      commonMistakes: [
        { san: "O-O", whyBad: "Castling before recapturing lets Black hold the extra pawn with ...b5. Always recapture material first — Bxc4 wins the pawn back AND improves the bishop's position. Don't let your opponent keep free material." },
        { san: "Qc2", whyBad: "The queen doesn't recapture the pawn and doesn't develop a piece. Bxc4 wins back the pawn while placing the bishop on a deadly diagonal targeting f7. Recapture with a developing move." },
      ],
    },
    {
      san: "Nd5",
      color: "black",
      why: "Black plays the Lasker Defense — Nd5 attacks the Bg5 and threatens to simplify the position by trading pieces. The idea: Black is cramped, so trading pieces relieves pressure. After Bxe7, Black's queen recaptures and Black has solved the dark-squared bishop problem.",
      concepts: ["piece-activity", "attack"],
      commonMistakes: [
        { san: "b5", whyBad: "b5 attacks the bishop but is too aggressive — White just retreats with Bd3 or Be2 and Black has weakened the queenside for nothing. Nd5 is the principled move: attack AND prepare exchanges." },
        { san: "Nb6", whyBad: "Nb6 attacks the bishop on c4 but the knight is poorly placed on b6 — out of play. Nd5 is centralized and active, hitting g5 with much more impact." },
      ],
    },
    {
      san: "Bxe7",
      color: "white",
      why: "Take the bishop — you must, or Black plays Nxg5 winning a piece. This is a forced exchange. The good news: trading the dark-squared bishops simplifies the position, and you keep your space advantage and active pieces.",
      concepts: ["piece-activity"],
      commonMistakes: [
        { san: "Bh4", whyBad: "Bh4 retreats the bishop to keep it on the board, but Black plays Nxc3 and gains tempo. Bxe7 is forced — accept the trade and move on." },
        { san: "Bf4", whyBad: "Bf4 also retreats but the bishop is offside and Black gains time. Always make the principled trade when forced — don't play for cheap tricks." },
      ],
    },
    {
      san: "Qxe7",
      color: "black",
      why: "Recapture with the queen. The queen lands on a fine square (e7), and Black's position is much freer now that one pair of minor pieces has been traded. This is the whole point of the Lasker Defense: trade pieces to relieve cramped positions.",
      concepts: ["piece-activity"],
      commonMistakes: [
        { san: "Nxe7", whyBad: "Nxe7 misplaces the centralized knight — it was great on d5! Always recapture with the LEAST active piece. Qxe7 keeps the knight on its strong central square." },
      ],
    },
    {
      san: "O-O",
      color: "white",
      why: "Finally castle! White has been so active that castling kept getting deferred — but now is the time. King safety locked in, and your rook on f1 will support kingside pressure or swing to d1 later. Both kings are now safe and the real maneuvering middlegame begins.",
      concepts: ["king-safety"],
      commonMistakes: [
        { san: "Nxd5", whyBad: "Nxd5 trades knights but Black plays exd5 and now the bishop on c4 is staring at... a pawn. You've also opened the e-file for Black's queen and rook. Castle first, keep the tension." },
        { san: "Qe2", whyBad: "Qe2 is a fine move eventually, but king safety is non-negotiable. Always castle when the position allows it — your king is the most valuable piece." },
      ],
    },
    {
      san: "Nxc3",
      color: "black",
      why: "Trade off the c3 knight to further simplify. After this exchange, Black has reduced White's piece activity and equalized material. The Lasker Defense plan complete: trade two pairs of minor pieces (dark-squared bishops + a knight pair) to alleviate cramping.",
      concepts: ["piece-activity"],
      commonMistakes: [
        { san: "b6", whyBad: "b6 preparing Bb7 is good but premature — White can play Nxd5 first and then your simplification plan loses one of its main exchanges. Trade pieces first, develop pieces second." },
        { san: "c5", whyBad: "c5 is the OTHER freeing maneuver but right now Nxc3 is the principled move — trade pieces first, then break with c5 once the position is simpler. Move order matters." },
      ],
    },
    {
      san: "Rxc3",
      color: "white",
      why: "Recapture with the rook (not the b-pawn). Rxc3 keeps the pawn structure intact AND puts the rook on a semi-open file pointing at Black's queenside. The rook can later swing to a3, b3, or stay aimed at c-file targets. This is the modern, flexible recapture.",
      concepts: ["piece-activity", "pawn-structure"],
      controls: "Semi-open c-file",
      commonMistakes: [
        { san: "bxc3", whyBad: "bxc3 doubles your pawns and creates structural weaknesses. Rxc3 keeps the pawns intact AND keeps the rook active. In Queen's Gambit middlegames, your pawn structure is your long-term advantage — don't damage it without good reason." },
      ],
    },
    {
      san: "b6",
      color: "black",
      why: "Finally — the famous Queen's Gambit Declined problem solved! b6 prepares Bb7, FINALLY developing the c8 bishop after 13 moves of being stuck. The bishop will sit on b7 supporting d5 and pointing at the long diagonal. This is the standard freeing maneuver: trade pieces, then develop the bad bishop via b6+Bb7.",
      concepts: ["development", "preparation"],
      commonMistakes: [
        { san: "c5", whyBad: "c5 is the OTHER freeing maneuver but right now b6 is more accurate — your light-squared bishop has been bottled up forever and needs to come out FIRST. After Bb7 is developed, then think about c5." },
        { san: "e5", whyBad: "e5 challenges the center but White has Nxe5 (defended by the rook on c3? no wait — Nxe5 captures the pawn). Actually Black has fewer pieces defending e5 than White has attacking it. Don't open lines until your pieces are coordinated." },
      ],
    },
    {
      san: "Qe2",
      color: "white",
      why: "Centralize the queen and connect the rooks. From e2 the queen supports a possible e4 advance and watches the e-file. Now both rooks can come to central files (Rfd1) and you have a fully coordinated army. This is patient, positional chess: every piece on a useful square.",
      concepts: ["piece-activity", "preparation"],
      commonMistakes: [
        { san: "e4", whyBad: "e4 immediately is too rushed — the bishop on c4 is undefended, and after exchanges Black can target it. Build up first with Qe2 supporting e4, THEN push the pawn." },
        { san: "d5", whyBad: "d5 is a thematic break but timing matters. Right now Black hasn't yet played Bb7, so d5 doesn't have its full impact. Wait, develop, then strike." },
      ],
    },
    {
      san: "Bb7",
      color: "black",
      why: "The bishop reaches its best diagonal at last! From b7 it watches the long h1-a8 diagonal and supports the d5 square (in case of a future ...c5 break). Black is now FULLY developed for the first time in the game. The position is balanced — White has slightly more space, Black has solid structure.",
      concepts: ["development", "piece-activity"],
      controls: "Long diagonal h1-a8",
      commonMistakes: [
        { san: "Ba6", whyBad: "Ba6 trades the bishop for White's bishop on c4 — but in queenless middlegames the bishop pair matters less. Bb7 is more flexible and keeps options open. Don't trade automatically." },
        { san: "c5", whyBad: "c5 before developing Bb7 wastes a tempo — your bishop is your worst piece and needs to come out FIRST. Always develop the worst piece before pawn breaks." },
      ],
    },
    {
      san: "Rfd1",
      color: "white",
      why: "Both rooks centralized — Rfd1 brings the king's rook to d1 to add pressure on the d-file. White is fully developed with EVERY piece on a great square: bishop on c4, knight on f3, queen on e2, rooks on c3 and d1, king safe on g1. The opening is complete and you've built the dream Queen's Gambit setup. Now the middlegame plan: prepare e4 to expand, or exchange on d5 at the right moment, or maneuver pieces toward Black's king. You've earned a balanced-but-pleasant middlegame — this is what good opening play looks like.",
      concepts: ["piece-activity", "preparation"],
      controls: "d-file fully covered",
      commonMistakes: [
        { san: "e4", whyBad: "e4 NOW is finally well-supported, but Rfd1 is more flexible — keep your options open. The pawn break is stronger when ALL pieces are perfectly placed first. One more move of preparation never hurts." },
        { san: "Bb3", whyBad: "Retreating the bishop doesn't improve anything — it's already on a great square. Rfd1 makes a real improvement (rook on the d-file) instead of moving for the sake of moving." },
      ],
    },
  ],
  summary:
    "The Queen's Gambit teaches the art of patient, strategic pressure. White builds a strong pawn center with d4, uses c4 to challenge Black's hold on d5, and develops every piece to its ideal square before forcing concessions. The key lessons are: pile up pressure on a key square (d5) from multiple directions, develop with purpose rather than speed alone, place rooks on files that will open, and understand that slow preparation (e3, Rc1, Bd3) creates lasting advantages that quick attacks cannot. Black's challenge — the trapped light-squared bishop on c8 — illustrates why pawn structure decisions (like ...e6) carry long-term consequences.",
  variants: [
    {
      id: "qga",
      name: "Queen's Gambit Accepted",
      description: "Black takes the pawn with dxc4 — accepting the gambit. White gets a free central majority but must win the pawn back.",
      branchesAt: 3,
      opponentMove: {
        san: "dxc4",
        color: "black",
        why: "Black accepts the gambit pawn. This gives up central space (no more pawn on d5) but wins a pawn. White will easily recover it, so Black's real goal is to develop quickly while White spends time recapturing.",
        concepts: ["center-control"],
        controls: "Wins the c4 pawn, but concedes the center",
      },
      moves: [
        {
          san: "e4",
          color: "white",
          why: "Immediately seize the full center! With Black's d-pawn gone, e4 goes unchallenged. White now has the ideal d4+e4 pawn center — exactly what the gambit was designed to achieve. The c4 pawn will be recovered later.",
          concepts: ["center-control", "space"],
          controls: "d5, f5 — massive central influence",
          commonMistakes: [
            {
              san: "e3",
              whyBad: "e3 is too timid. With Black's d-pawn gone from d5, you should grab the full center with e4. Don't waste this opportunity for a passive pawn move.",
            },
            {
              san: "Nf3",
              whyBad: "Nf3 develops but misses the chance for e4. With no Black pawn on d5, e4 goes in with tempo. Seize the full center NOW — you won't get this opportunity again.",
            },
          ],
        },
        {
          san: "e5",
          color: "black",
          why: "Black tries to block the center and prevent White from steamrolling with e5 themselves. However, this weakens the d5 square since the e-pawn no longer controls it.",
          concepts: ["center-control"],
        },
        {
          san: "Bxc4",
          color: "white",
          why: "Recover the pawn while developing the bishop to an active diagonal aimed at f7. You now have the d4+e4 center AND all your pieces are coming out. This is why the QGA is considered slightly better for White.",
          concepts: ["development", "attack"],
          controls: "f7 square, a2-g8 diagonal",
          commonMistakes: [
            { san: "Nc3", whyBad: "Nc3 develops but doesn't recover the pawn. Bxc4 wins the pawn back AND puts the bishop on a great diagonal. Always recapture material when you can do it while developing." },
            { san: "Nf3", whyBad: "Nf3 is natural but the pawn on c4 is hanging — grab it back with Bxc4 first. If you develop the knight, Black consolidates the extra pawn with ...b5." },
          ],
        },
        {
          san: "Nc6",
          color: "black",
          why: "Develop the knight to its natural square, defending e5 and putting pressure on d4. Black needs to catch up in development after spending a tempo capturing on c4.",
          concepts: ["development", "center-control"],
        },
        {
          san: "Nf3",
          color: "white",
          why: "Develop with a threat — the knight attacks e5 and supports d4. Classic opening principle: every move should develop AND create pressure.",
          concepts: ["development", "attack"],
          commonMistakes: [
            { san: "d5", whyBad: "d5 pushes the pawn forward but closes the center and your bishop on c4 loses its diagonal. Keep the center open when you have better development — open positions favor the side with more active pieces." },
            { san: "f4", whyBad: "f4 looks aggressive but weakens the kingside and doesn't develop a piece. Nf3 develops AND attacks e5. Don't make weakening pawn moves when you have pieces to develop." },
          ],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Counter-attacking e4. Black develops the knight and fights for the center, hoping to equalize despite having given up the d5 pawn earlier.",
          concepts: ["development", "center-control"],
        },
      ],
    },
    {
      id: "slav",
      name: "Slav Defense Setup",
      description: "Black plays c6 instead of e6 — defending d5 without locking in the light-squared bishop.",
      branchesAt: 3,
      opponentMove: {
        san: "c6",
        color: "black",
        why: "The Slav Defense! Black defends d5 with the c-pawn instead of the e-pawn. The huge advantage: the light-squared bishop on c8 is NOT blocked. Black can develop it to f5 or g4, solving the main problem of the QGD (the 'bad bishop').",
        concepts: ["center-control", "pawn-structure"],
        controls: "d5 square — supported without blocking the bishop",
      },
      moves: [
        {
          san: "Nc3",
          color: "white",
          why: "Develop the knight and add more pressure to d5. With Black's pawn on c6, the c-file tension is slightly different — but the strategic goal is the same: challenge d5 and prepare e4.",
          concepts: ["development", "center-control"],
          commonMistakes: [
            {
              san: "cxd5",
              whyBad: "Taking on d5 too early releases all the tension. After cxd5 cxd5, the position is symmetrical and drawish. Keep the tension with Nc3 — that's how White maintains the initiative.",
            },
            {
              san: "Nf3",
              whyBad: "Nf3 is a good move but Nc3 is more precise here. Nc3 adds direct pressure to d5, which is the key square in the Queen's Gambit. Develop with a threat first.",
            },
          ],
        },
        {
          san: "Nf6",
          color: "black",
          why: "Develop the knight and defend d5 a third time. Black's position is very solid — d5 is defended by c6, Nf6, and potentially the queen. The key difference from the QGD: the c8 bishop can still develop actively.",
          concepts: ["development", "center-control"],
        },
        {
          san: "Nf3",
          color: "white",
          why: "Continue natural development. The knight controls e5 and supports d4. White is building up slowly before deciding how to challenge Black's solid setup.",
          concepts: ["development"],
          commonMistakes: [
            { san: "e4", whyBad: "e4 looks tempting but after ...dxe4 Nxe4 Nxe4, you've simplified too early. The Slav is about slow pressure — keep building up pieces before releasing the tension." },
            { san: "Bg5", whyBad: "Bg5 pins the knight but Black hasn't castled yet, so the pin is less effective. Nf3 develops naturally and prepares for a flexible plan. Don't commit to a pin when it can be easily broken." },
          ],
        },
        {
          san: "Bf5",
          color: "black",
          why: "This is the whole point of the Slav! The bishop develops OUTSIDE the pawn chain to f5, where it's active and not blocked by the e6 pawn. Compare this to the QGD where the bishop is stuck behind e6 — night and day difference.",
          concepts: ["development", "piece-activity"],
          controls: "Active on the a2-g8 diagonal, not trapped",
        },
        {
          san: "cxd5",
          color: "white",
          why: "Now that Black has committed the bishop to f5, it's a good time to capture. After cxd5 cxd5, the c-file opens and White can plant a rook there. The bishop on f5 is good but Black's queenside is slightly weakened.",
          concepts: ["center-control", "preparation"],
          commonMistakes: [
            { san: "Qb3", whyBad: "Qb3 attacks b7 but Black just plays ...Qb6 and offers a queen trade. Don't bring the queen out early to grab a wing pawn — cxd5 opens the c-file which is strategically more valuable." },
            { san: "Nh4", whyBad: "Nh4 tries to trade the bishop on f5 but moves an already-developed knight to the rim. 'A knight on the rim is dim.' After ...Bg6, the knight is stranded. Don't chase pieces with your already-developed knight." },
          ],
        },
        {
          san: "cxd5",
          color: "black",
          why: "Recapture with the c-pawn, maintaining the central structure. The d5 pawn is solidly defended by the knight on f6 and the position is very playable for both sides.",
          concepts: ["center-control", "pawn-structure"],
        },
      ],
    },
    // ============ Black's responses to 2.c4 ============
    {
      id: "albin-counter",
      name: "Albin Counter-Gambit (2...e5)",
      description: "Black plays 2...e5 sacrificing a pawn for active play. Take the pawn but be careful — Black gets dynamic pieces.",
      branchesAt: 3,
      opponentMove: { san: "e5", color: "black", why: "The Albin Counter-Gambit — Black sacrifices a pawn to disrupt White's setup and gain piece activity.", concepts: ["attack"] },
      moves: [
        { san: "dxe5", color: "white", why: "Take the pawn — you're up material and Black's gambit isn't worth a full pawn.", concepts: ["center-control"] },
        { san: "d4", color: "black", why: "Black pushes a passed pawn — this is the point of the gambit, the d-pawn becomes annoying.", concepts: ["space"] },
        { san: "Nf3", color: "white", why: "Develop the knight, supporting e5 and preventing ...d3 nonsense.", concepts: ["development"] },
        { san: "Nc6", color: "black", why: "Black develops, eyeing the e5 pawn.", concepts: ["development"] },
        { san: "g3", color: "white", why: "Fianchetto setup — the bishop on g2 will be a tower of strength on the long diagonal.", concepts: ["development"] },
        { san: "Be6", color: "black", why: "Black develops the bishop.", concepts: ["development"] },
        { san: "Bg2", color: "white", why: "Complete the fianchetto. The bishop pressures Black's queenside.", concepts: ["development"] },
      ],
    },
    {
      id: "chigorin",
      name: "Chigorin Defense (2...Nc6)",
      description: "Black plays 2...Nc6, an aggressive but slightly suspect response. Develop calmly and use your central advantage.",
      branchesAt: 3,
      opponentMove: { san: "Nc6", color: "black", why: "The Chigorin — Black develops actively but allows White to ruin the queenside pawn structure with cxd5.", concepts: ["development"] },
      moves: [
        { san: "Nf3", color: "white", why: "Develop naturally. cxd5 is also possible but Nf3 keeps options.", concepts: ["development"] },
        { san: "Bg4", color: "black", why: "Black pins the knight to the queen — a typical Chigorin idea.", concepts: ["attack"] },
        { san: "Nc3", color: "white", why: "Develop the queenside knight.", concepts: ["development"] },
        { san: "e6", color: "black", why: "Black solidifies.", concepts: ["pawn-structure"] },
        { san: "Bg5", color: "white", why: "Pin the king-side knight (when developed) and develop the bishop.", concepts: ["development", "attack"] },
      ],
    },
    {
      id: "marshall-defense",
      name: "Marshall Defense (2...Nf6)",
      description: "Black plays 2...Nf6 immediately. Capture on d5 to win a pawn temporarily and gain a strong center.",
      branchesAt: 3,
      opponentMove: { san: "Nf6", color: "black", why: "The Marshall Defense — uncommon and dubious. White can capture on d5 and Black has no good way to recover the pawn cleanly.", concepts: ["development"] },
      moves: [
        { san: "cxd5", color: "white", why: "Take the pawn! Black's setup doesn't recover it well.", concepts: ["center-control"] },
        { san: "Nxd5", color: "black", why: "Black recaptures with the knight (the only practical option).", concepts: ["piece-activity"] },
        { san: "Nf3", color: "white", why: "Develop and prepare e4 to gain space.", concepts: ["development"] },
        { san: "Bf5", color: "black", why: "Black develops the bishop actively.", concepts: ["development"] },
        { san: "Nc3", color: "white", why: "Attack the d5 knight, forcing it to commit.", concepts: ["development", "attack"] },
        { san: "e6", color: "black", why: "Black supports the d5 knight.", concepts: ["pawn-structure"] },
      ],
    },
    {
      id: "baltic-defense",
      name: "Baltic Defense (2...Bf5)",
      description: "Black plays 2...Bf5 trying to develop the bishop early. Capture on d5 — Black has to make awkward concessions.",
      branchesAt: 3,
      opponentMove: { san: "Bf5", color: "black", why: "The Baltic — Black develops the bishop before resolving central tension. White can profit.", concepts: ["development"] },
      moves: [
        { san: "cxd5", color: "white", why: "Capture! Black has to either give up the bishop or block awkwardly with ...Bxb1.", concepts: ["center-control"] },
        { san: "Bxb1", color: "black", why: "Black trades bishop for knight to recover the pawn.", concepts: ["piece-activity"] },
        { san: "Rxb1", color: "white", why: "Recapture with the rook. Black got the pawn back but lost the bishop pair.", concepts: ["piece-activity"] },
        { san: "Qxd5", color: "black", why: "Black's queen recaptures the d5 pawn.", concepts: ["center-control"] },
        { san: "Nf3", color: "white", why: "Develop with tempo on the queen.", concepts: ["development"] },
        { san: "Nf6", color: "black", why: "Black develops.", concepts: ["development"] },
      ],
    },
    {
      id: "qgd-tarrasch",
      name: "QGD Tarrasch (3...c5)",
      description: "Black plays the Tarrasch — accepting an isolated d-pawn for active piece play. Capture and apply pressure on d5.",
      branchesAt: 3,
      opponentMove: { san: "e6", color: "black", why: "Standard QGD setup with ...e6.", concepts: ["development"] },
      moves: [
        { san: "Nc3", color: "white", why: "Develop the queenside knight.", concepts: ["development"] },
        { san: "c5", color: "black", why: "The Tarrasch! Black challenges the center directly. They're willing to accept an isolated d-pawn for piece activity.", concepts: ["attack"] },
        { san: "cxd5", color: "white", why: "Capture, exposing Black's d-pawn.", concepts: ["center-control"] },
        { san: "exd5", color: "black", why: "Black recaptures, accepting the isolated d5 pawn.", concepts: ["pawn-structure"] },
        { san: "Nf3", color: "white", why: "Develop and prepare to pressure d5.", concepts: ["development"] },
        { san: "Nc6", color: "black", why: "Black develops.", concepts: ["development"] },
      ],
    },
    {
      id: "qgd-cambridge-springs",
      name: "QGD Cambridge Springs (4...Nbd7 5.e3 c6 6.Nf3 Qa5)",
      description: "Black plays the tricky Cambridge Springs with ...Qa5. Watch out — Black threatens ...Bxc3+ winning material!",
      branchesAt: 3,
      opponentMove: { san: "e6", color: "black", why: "Standard QGD setup.", concepts: ["development"] },
      moves: [
        { san: "Nc3", color: "white", why: "Develop.", concepts: ["development"] },
        { san: "Nf6", color: "black", why: "Develop.", concepts: ["development"] },
        { san: "Bg5", color: "white", why: "Pin the f6 knight.", concepts: ["development", "attack"] },
        { san: "Nbd7", color: "black", why: "Develop the queen-side knight.", concepts: ["development"] },
        { san: "e3", color: "white", why: "Open the bishop's diagonal.", concepts: ["development"] },
        { san: "c6", color: "black", why: "Solidify before Qa5.", concepts: ["pawn-structure"] },
        { san: "Nf3", color: "white", why: "Develop.", concepts: ["development"] },
        { san: "Qa5", color: "black", why: "The Cambridge Springs idea — pin the c3 knight, threaten Bb4 and Ne4 ideas.", concepts: ["attack"] },
      ],
    },
    {
      id: "slav-exchange",
      name: "Slav Exchange (after 2...c6 3.cxd5)",
      description: "Black plays the Slav. White trades on d5 for a symmetric, solid position. No tricks.",
      branchesAt: 3,
      opponentMove: { san: "c6", color: "black", why: "The Slav Defense — Black supports d5 with the c-pawn, keeping the bishop on c8 free.", concepts: ["pawn-structure"] },
      moves: [
        { san: "cxd5", color: "white", why: "The Exchange Variation — symmetric and solid. Aim for a tiny edge through better piece play.", concepts: ["center-control"] },
        { san: "cxd5", color: "black", why: "Black recaptures.", concepts: ["pawn-structure"] },
        { san: "Nc3", color: "white", why: "Develop.", concepts: ["development"] },
        { san: "Nf6", color: "black", why: "Develop.", concepts: ["development"] },
        { san: "Nf3", color: "white", why: "Continue developing.", concepts: ["development"] },
        { san: "Nc6", color: "black", why: "Develop.", concepts: ["development"] },
        { san: "Bf4", color: "white", why: "Develop the bishop to f4 — a key Slav Exchange move targeting the c7 square.", concepts: ["development"] },
      ],
    },
  ],
};
