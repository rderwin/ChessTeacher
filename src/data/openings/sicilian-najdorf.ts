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
  history: {
    origin:
      "The Sicilian Defense has been known since the 16th century, but the Najdorf Variation was developed in the 1940s by Argentine grandmaster Miguel Najdorf. It quickly became the weapon of choice for aggressive players seeking winning chances with Black. Bobby Fischer adopted it as his main defense, and it has been the most analyzed opening in chess ever since.",
    nameExplanation:
      "The \"Sicilian\" name comes from the Italian chess player Pietro Carrera from Sicily, who analyzed 1...c5 in the 1600s. The \"Najdorf\" variation is named after Miguel Najdorf, a Polish-Argentine grandmaster who popularized the key move 5...a6. This modest-looking pawn move unlocks an incredibly rich and combative system.",
    popularity:
      "The single most popular defense to 1.e4 at the professional level. It has more published theory than any other opening. At the amateur level it's also extremely common, though the depth of theory can be daunting — which is exactly why practicing it here is so valuable.",
    bestFor:
      "Ambitious players who want to fight for a win with Black. The Najdorf rewards deep preparation and tactical skill. It teaches you about imbalances, opposite-side attacks, and how a seemingly small move like ...a6 can have enormous strategic consequences.",
    famousPlayers: ["Bobby Fischer", "Garry Kasparov", "Viswanathan Anand", "Fabiano Caruana"],
  },
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
      commonMistakes: [
        {
          san: "Nc6",
          whyBad:
            "Nc6 commits the knight too early and leads to entirely different Sicilian systems (Classical or Sveshnikov). In the Najdorf, Black delays ...Nc6 to preserve flexibility for the ...a6 and ...b5 queenside expansion plan.",
        },
        {
          san: "e6",
          whyBad:
            "Playing ...e6 heads toward the Scheveningen or Taimanov, not the Najdorf. The move ...d6 is the Najdorf move order — it keeps the position flexible and avoids committing the pawn structure too early.",
        },
      ],
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
      commonMistakes: [
        {
          san: "Nf6",
          whyBad:
            "Developing the knight before capturing on d4 lets White push d5, seizing the center and cramping Black's position. Capture on d4 first to ensure the asymmetrical Sicilian structure Black wants.",
        },
        {
          san: "Nc6",
          whyBad:
            "Developing the knight allows White to maintain the d4 pawn with c3, keeping a strong center. Capture on d4 now to open the c-file and create the structural imbalance that fuels Black's counterplay.",
        },
      ],
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
      commonMistakes: [
        {
          san: "b5",
          whyBad:
            "Launching queenside expansion before castling is reckless. Your king is still in the center and White can exploit this with sharp central play. Castle first to secure the king, then expand with ...b5 when you're safe.",
        },
        {
          san: "Nc6",
          whyBad:
            "Developing another piece before castling leaves the king in danger too long. With opposite-side castling approaching, every tempo matters for king safety. Castle now and activate the rook on f8.",
        },
      ],
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
      commonMistakes: [
        {
          san: "Nc6",
          whyBad:
            "While Nc6 develops a piece, it blocks the c-file which is critical for Black's rook counterplay. Be6 is more precise — it controls d5, eyes a2 (where White's king is heading), and prepares ...b5 without blocking anything.",
        },
        {
          san: "b5",
          whyBad:
            "Pushing ...b5 without the bishop on e6 to support it leaves the pawn weak and d5 uncontrolled. Develop Be6 first to guard d5 and support the ...b5 advance — preparation before pawn breaks.",
        },
      ],
    },
    {
      san: "O-O-O",
      color: "white",
      why: "White castles queenside, completing the English Attack formation. The position now features opposite-side castling, which means both players will attack the opponent's king as aggressively as possible. White's plan is straightforward: g4-g5 to open lines on the kingside. The rook on d1 is already on the half-open d-file, adding central pressure.",
      concepts: ["king-safety", "attack"],
      controls: "Connects rooks, activates the d1 rook on the half-open file",
    },
    {
      san: "Nbd7",
      color: "black",
      why: "Develop the queenside knight to d7. From d7 the knight has multiple jobs: it can support the e5 pawn, help defend after f3+g4 advances, jump to b6 (covering the queenside), or eventually maneuver to f8 if the kingside needs reinforcement. This is a flexible defensive setup before launching the queenside attack with ...b5.",
      concepts: ["development"],
      commonMistakes: [
        { san: "b5", whyBad: "b5 launches the attack but you still have an undeveloped knight on b8! Develop FIRST, attack SECOND. Nbd7 brings the last piece into the game before pushing pawns." },
        { san: "Nc6", whyBad: "Nc6 blocks the c-file (your main attacking file!). Nbd7 keeps the c-file clear for your rook and provides flexibility to defend the kingside if needed." },
        { san: "a5", whyBad: "a5 prepares b4 but the queenside expansion needs the knight ready first. Nbd7 develops AND prepares ...b5 with full piece support." },
      ],
    },
    {
      san: "g4",
      color: "white",
      why: "The pawn storm begins! g4 starts the kingside attack — White will follow with g5 to evict Black's f6 knight, then h4-h5 to crash through to the king. In opposite-side castling positions, you must attack faster than your opponent. Pawn storms aren't optional; they're mandatory.",
      concepts: ["attack", "space"],
      controls: "f5, h5 squares — preparing g5 advance",
      commonMistakes: [
        { san: "Kb1", whyBad: "Kb1 is a typical 'tucking the king' move, but timing matters — start the attack first! Black's pawn storm with ...b5 is just as fast. Kb1 can come AFTER you've started g4. Attack now, secure the king later." },
        { san: "h4", whyBad: "h4 supports g5 but g4 must come FIRST — the pawn march is g4 → g5 → h4 → h5. Move order is critical in pawn storms. Get g4 on the board immediately." },
      ],
    },
    {
      san: "b5",
      color: "black",
      why: "Black's counter-attack begins! ...b5 launches the queenside pawn storm with the same intensity White is showing on the kingside. The plan: ...b5-b4 to evict White's knight on c3, opening lines for Black's pieces against White's king. This is THE Najdorf race: who attacks faster wins.",
      concepts: ["attack", "space"],
      controls: "c4, a4 squares; prepares b4",
      commonMistakes: [
        { san: "Nb6", whyBad: "Nb6 looks defensive but it BLOCKS your b-pawn! The whole queenside attack depends on ...b5-b4. Knight on b6 stops the attack before it starts. Push the pawn first; the knight stays flexible on d7." },
        { san: "h6", whyBad: "h6 is a defensive move when you should be ATTACKING. In opposite-side castling, defense alone loses — you must counterattack. ...b5 is the only way to win the race." },
        { san: "Re8", whyBad: "Re8 develops the rook but it's too slow! The c-file (semi-open for Black) is the main attacking file, and ...b5 is the move that opens it for your rook. Pawns first, pieces follow." },
      ],
    },
    {
      san: "g5",
      color: "white",
      why: "Push the pawn! g5 attacks the f6 knight, forcing it to move. After Ne8 (or Nh5), Black's pieces are pushed back and White's pawns roll forward. The kingside attack gains momentum with every move. Keep pushing — momentum matters more than positional perfection.",
      concepts: ["attack", "tempo"],
      commonMistakes: [
        { san: "Nxb5", whyBad: "Nxb5?? axb5 wins a piece — the knight on c3 isn't defended after the trade. Don't grab pawns when you have a kingside attack going! g5 is the move." },
        { san: "Bxb5", whyBad: "Bxb5?? axb5 — same problem, you lose the bishop. Sacrifices are powerful but they need to LEAD somewhere. g5 is more direct." },
        { san: "Rg1", whyBad: "Rg1 supports the future g5 push but g5 NOW is even better. Black's knight is on f6 — kick it immediately and gain tempo. Don't waste moves preparing what's already prepared." },
      ],
    },
    {
      san: "b4",
      color: "black",
      why: "Push the pawn! ...b4 attacks the c3 knight, forcing it to move. White's queenside is unraveling at the same rate as Black's kingside. Both attacks barrel forward simultaneously — this is what the Najdorf middlegame looks like at the highest level. May the better calculator win.",
      concepts: ["attack", "tempo"],
      commonMistakes: [
        { san: "Ne8", whyBad: "Ne8 is forced eventually (when g5 attacks the f6 knight) but ...b4 first gains tempo on White's queenside. Order matters: push your attack while reacting to White's." },
        { san: "Rb8", whyBad: "Rb8 supports the b-file but ...b4 is the active move — push the pawn NOW with tempo on the c3 knight. The race demands every tempo for attack." },
      ],
    },
    {
      san: "Ne2",
      color: "white",
      why: "The knight retreats to e2 (best square — keeps c3 unblocked, eyes the kingside via Nf4 or g3). Note: White could also try Nd5 or Na4, but Ne2 is the most solid retreat. From e2 the knight can later jump to f4 or d4 supporting the attack.",
      concepts: ["piece-activity"],
      commonMistakes: [
        { san: "Nd5", whyBad: "Nd5 looks aggressive but Black plays Nxd5! exd5 Bxd5 — Black just gives up the knight for a bishop and a pawn. The d5 outpost requires preparation. Ne2 is safer." },
        { san: "Na4", whyBad: "Na4 puts the knight on the rim — bad position, far from the king. Ne2 keeps the knight central and ready to redeploy to f4 (a great kingside square)." },
        { san: "Nb1", whyBad: "Nb1 retreats further than necessary — the knight is buried. Ne2 keeps it active and ready to rejoin the attack." },
      ],
    },
    {
      san: "Ne8",
      color: "black",
      why: "Forced retreat — the f6 knight had to move because of g5. From e8 it has options: regroup to c7 (queenside defense), back to f6 if g5 is exchanged, or even f6-h7-g5 (rare but possible). The knight is awkward but alive. Now Black focuses on opening the queenside.",
      concepts: ["piece-activity"],
      commonMistakes: [
        { san: "Nh5", whyBad: "Nh5 also retreats but the knight on h5 is exposed and can be kicked by g4 or even captured. Ne8 is safer and more flexible." },
        { san: "Nxe4", whyBad: "Nxe4 fxe4 — wait, you don't have an f-pawn to recapture? Actually fxe4 is possible (the f-pawn captures back). But you've sacrificed a knight for a pawn, which is bad. Ne8 is forced." },
      ],
    },
    {
      san: "h4",
      color: "white",
      why: "More fuel for the fire! h4 prepares h5 to swap pawns and rip open the h-file. White is playing on autopilot now — every move advances the attack. Black has no time to consolidate; the assault is too fast.",
      concepts: ["attack", "space"],
      commonMistakes: [
        { san: "Nf4", whyBad: "Nf4 is a thematic Najdorf move (the knight from e2 to f4) but you have a pawn storm to push! h4 keeps the attack rolling. Pieces support pawns in this race." },
        { san: "Bh3", whyBad: "Bh3 develops the bishop but the attack is on the OTHER side. Bishop moves don't help the kingside attack — pawn moves do. h4 is the only forward move." },
      ],
    },
    {
      san: "a5",
      color: "black",
      why: "Continue the queenside attack! ...a5 prepares to push more pawns and supports b4. Black's queenside is opening up just as White's kingside opens. The race continues. From here, the position is double-edged — both attacks are real, both kings are in danger. This is the Najdorf in its most beautiful, terrifying form. You've reached the heart of the English Attack middlegame: the moment where calculation, courage, and concrete tactics decide everything. Welcome to one of chess's most violent middlegames.",
      concepts: ["attack", "space"],
      commonMistakes: [
        { san: "Bf6", whyBad: "Bf6 defends but the Najdorf isn't a defensive opening. ...a5 keeps the attack going. Defense alone loses in opposite-side castling." },
        { san: "Rb8", whyBad: "Rb8 is fine but ...a5 is more dynamic — push the queenside pawns NOW while White's king is still on the c-file. Activity, activity, activity." },
      ],
    },
  ],
  summary:
    "The Sicilian Najdorf teaches the art of asymmetrical chess. From move one, Black avoids symmetry with 1...c5 to create an unbalanced pawn structure where both sides have distinct plans. The prophylactic ...a6 is the soul of the variation -- it prevents White's pieces from reaching b5 while preparing queenside expansion with ...b5 and the central strike ...e5. After the English Attack setup (Be3, f3, Qd2, O-O-O), the position becomes a fierce race: White storms the kingside with g4-g5 while Black counterattacks on the queenside with ...b5 and targets the exposed white king. The key strategic lesson is that preparation (prophylaxis with ...a6 before the ambitious ...e5) and piece coordination (Be7 for safety, Be6 for control of d5) allow Black to play aggressively without overextending. Understanding when to play ...d5 or ...b5 as a pawn break, and keeping the balance between defense and attack, is the essence of the Najdorf.",
  variants: [
    {
      id: "bg5-najdorf",
      name: "6.Bg5 (Main Line)",
      description: "White plays the ultra-sharp Bg5 instead of Be3, pinning the knight and creating immediate tactical tension.",
      branchesAt: 10,
      opponentMove: {
        san: "Bg5",
        color: "white",
        why: "The classical and most aggressive 6th move. Bg5 pins the knight on f6, which is the key defender of d5 and e4. White threatens to win the e-pawn if Black isn't careful, and the pin creates constant tactical tension. This leads to some of the sharpest positions in all of chess.",
        concepts: ["attack", "piece-activity", "development"],
        controls: "f6 knight pinned to queen, h4-d8 diagonal",
      },
      moves: [
        {
          san: "e6",
          color: "black",
          why: "Reinforcing d5 and breaking the pin's influence on f6 (the knight can now move since the queen is shielded). This is the Najdorf main line — solid and flexible. Black prepares to develop the bishop and castle.",
          concepts: ["center-control", "prophylaxis"],
          commonMistakes: [
            {
              san: "e5",
              whyBad: "After e5 with the bishop on g5, the pin on f6 becomes very dangerous. Nf5 is a powerful response, and Black's knight is awkwardly pinned. e6 is more flexible here.",
            },
          ],
        },
        {
          san: "f4",
          color: "white",
          why: "White plays aggressively, supporting e5 and preparing a kingside attack. The position is now a razor's edge — both sides must play precisely. This is the Poisoned Pawn variation territory.",
          concepts: ["attack", "space"],
        },
        {
          san: "Be7",
          color: "black",
          why: "Develop the bishop and prepare to castle. Be7 is the safest square — it unpins the knight and gets the king to safety. The alternative Qb6 (the Poisoned Pawn) grabs b2 but is extremely risky.",
          concepts: ["development", "king-safety"],
          commonMistakes: [
            {
              san: "Qb6",
              whyBad:
                "The famous Poisoned Pawn variation! Qb6 grabs the b2 pawn but the queen gets trapped in a whirlwind of tactics. For beginners, Be7 is far safer — it unpins the knight and prepares castling without taking extreme risks.",
            },
            {
              san: "Nbd7",
              whyBad:
                "Nbd7 blocks the dark-squared bishop and doesn't unpin the knight on f6. Be7 is essential — it breaks the pin, develops a piece, and prepares castling all in one move.",
            },
          ],
        },
        {
          san: "Qf3",
          color: "white",
          why: "The queen develops to f3, supporting e4 and preparing to potentially swing to h3 or g3 for a kingside attack. White's pieces are gathering for a storm.",
          concepts: ["attack", "piece-activity"],
        },
        {
          san: "Qc7",
          color: "black",
          why: "The queen goes to c7, supporting e5 and connecting the rooks. It also eyes the c-file, which is the highway for Black's counterplay after queenside castling by White.",
          concepts: ["piece-activity", "preparation"],
          commonMistakes: [
            {
              san: "O-O",
              whyBad:
                "Castling immediately is premature — you need the queen on c7 first to support the e5 push and control the c-file. Qc7 is a multi-purpose move that coordinates your pieces before committing the king.",
            },
            {
              san: "Nc6",
              whyBad:
                "Nc6 blocks the c-file which is Black's main source of counterplay. Qc7 occupies the c-file strategically, supports a future ...e5 advance, and keeps the knight's options open.",
            },
          ],
        },
        {
          san: "O-O-O",
          color: "white",
          why: "Opposite-side castling! White castles queenside, setting up the classic battle: White attacks the kingside with pawns (g4-g5), Black counterattacks on the queenside with b5. This is the most exciting type of chess position.",
          concepts: ["king-safety", "attack"],
        },
      ],
    },
    {
      id: "f3-najdorf",
      name: "6.f3 (English Attack)",
      description: "White plays f3 first — a flexible move preparing Be3 and a slow kingside buildup. Very popular at the top level.",
      branchesAt: 10,
      opponentMove: {
        san: "f3",
        color: "white",
        why: "A modern favorite. f3 supports e4 rock-solidly and prepares Be3 followed by Qd2, O-O-O, and g4. It's less committal than Bg5 — White keeps all options open while building a slow but powerful attack.",
        concepts: ["center-control", "preparation"],
        controls: "e4 pawn — super-solid support",
      },
      moves: [
        {
          san: "e5",
          color: "black",
          why: "Strike immediately! With White spending a tempo on f3 (which doesn't develop a piece), Black seizes the chance to grab space in the center. The knight on d4 is challenged and must move.",
          concepts: ["center-control", "space", "tempo"],
          commonMistakes: [
            {
              san: "e6",
              whyBad: "e6 is solid but passive against f3. Since White played f3 (a slow move), Black should punish it with the aggressive e5, grabbing space while White is still setting up.",
            },
          ],
        },
        {
          san: "Nb3",
          color: "white",
          why: "The knight retreats to b3, a safe square where it supports d4 and eyes c5. From b3, the knight has a clear future: it can re-enter the game via c5 or d4 later.",
          concepts: ["piece-activity"],
        },
        {
          san: "Be6",
          color: "black",
          why: "Develop the bishop actively. Be6 controls d5, eyes a2, and prepares queenside castling or a b5 push. The bishop on e6 is a strong piece in the Najdorf.",
          concepts: ["development", "piece-activity"],
          commonMistakes: [
            {
              san: "Be7",
              whyBad:
                "Developing the kingside bishop first is less urgent. Be6 is more important because it controls the critical d5 square and pressures a2 where White's king will castle. Prioritize the bishop that serves both attack and defense.",
            },
            {
              san: "b5",
              whyBad:
                "Pushing ...b5 without Be6 to support it leaves d5 unguarded and the b5 pawn can become weak. Develop Be6 first to control d5, then ...b5 will be a powerful advance with proper piece support.",
            },
          ],
        },
        {
          san: "Be3",
          color: "white",
          why: "Now the bishop comes to e3 — the English Attack setup is taking shape. Be3, Qd2, O-O-O, and then the g4-g5 pawn storm. Classic Sicilian warfare.",
          concepts: ["development", "preparation"],
        },
        {
          san: "Be7",
          color: "black",
          why: "Prepare to castle kingside. Be7 is flexible — it can also reroute to f6 or g5 later if needed. Black is getting ready for the opposite-side castling battle.",
          concepts: ["development", "king-safety"],
          commonMistakes: [
            {
              san: "h5",
              whyBad:
                "Trying to slow White's g4 advance with ...h5 weakens the kingside before you've even castled. Develop the bishop to e7 and castle first — then worry about defensive pawn moves if needed.",
            },
          ],
        },
        {
          san: "Qd2",
          color: "white",
          why: "The queen goes to d2, connecting the rooks and preparing O-O-O. Once White castles queenside, the g-pawn and h-pawn will march forward for the kingside attack.",
          concepts: ["development", "preparation", "attack"],
        },
      ],
    },
    // ============ More White responses to 5...a6 ============
    {
      id: "english-attack",
      name: "English Attack (6.Be3)",
      description: "White's most aggressive response — pawn-storm Black's king with f3, g4, h4. Stay calm, expand on the queenside.",
      branchesAt: 10,
      opponentMove: { san: "Be3", color: "white", why: "The English Attack — White prepares Qd2, O-O-O, then storms with f3-g4-h4.", concepts: ["attack"] },
      moves: [
        { san: "e5", color: "black", why: "Push back — challenge the d4 knight, kick it off its dominant square.", concepts: ["center-control"] },
        { san: "Nb3", color: "white", why: "Knight retreats.", concepts: ["piece-activity"] },
        { san: "Be6", color: "black", why: "Develop the bishop, prepare ...Nbd7 and queenside expansion.", concepts: ["development"] },
        { san: "f3", color: "white", why: "Prepare the pawn storm.", concepts: ["preparation"] },
        { san: "Nbd7", color: "black", why: "Develop, prepare ...b5.", concepts: ["development"] },
        { san: "g4", color: "white", why: "The pawn storm starts!", concepts: ["attack"] },
      ],
    },
    {
      id: "fischer-sozin",
      name: "Fischer-Sozin (6.Bc4)",
      description: "Bobby Fischer's favorite — White develops the bishop aggressively eyeing f7. As Black, block with ...e6 then expand.",
      branchesAt: 10,
      opponentMove: { san: "Bc4", color: "white", why: "Fischer's preferred line — bishop on c4 eyes f7.", concepts: ["attack"] },
      moves: [
        { san: "e6", color: "black", why: "Block the bishop's diagonal.", concepts: ["pawn-structure"] },
        { san: "Bb3", color: "white", why: "Reroute to b3.", concepts: ["piece-activity"] },
        { san: "b5", color: "black", why: "Queenside expansion — the Najdorf signature.", concepts: ["space"] },
        { san: "O-O", color: "white", why: "Castle.", concepts: ["king-safety"] },
        { san: "Be7", color: "black", why: "Develop.", concepts: ["development"] },
        { san: "Qf3", color: "white", why: "Build for kingside attack.", concepts: ["preparation"] },
        { san: "Qb6", color: "black", why: "Active queen play.", concepts: ["development"] },
      ],
    },
    {
      id: "classical-be2",
      name: "Classical Be2 (6.Be2)",
      description: "Calm Classical setup — solid, positional, less theory. Push back with ...e5 to challenge the center.",
      branchesAt: 10,
      opponentMove: { san: "Be2", color: "white", why: "The Classical Be2 — solid and positional, less theoretical.", concepts: ["development"] },
      moves: [
        { san: "e5", color: "black", why: "Challenge the center.", concepts: ["center-control"] },
        { san: "Nb3", color: "white", why: "Retreat.", concepts: ["piece-activity"] },
        { san: "Be7", color: "black", why: "Develop.", concepts: ["development"] },
        { san: "O-O", color: "white", why: "Castle.", concepts: ["king-safety"] },
        { san: "O-O", color: "black", why: "Castle.", concepts: ["king-safety"] },
        { san: "f4", color: "white", why: "Active kingside play.", concepts: ["space"] },
        { san: "exf4", color: "black", why: "Capture, opening the e-file.", concepts: ["piece-activity"] },
      ],
    },
  ],
};
