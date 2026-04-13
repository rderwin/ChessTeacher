import { OpeningLine } from "../types";

export const colleSystem: OpeningLine = {
  id: "colle-system",
  name: "Colle System",
  fullName: "Colle System",
  eco: "D05",
  playerColor: "white",
  level: "beginner",
  description:
    "A rock-solid system opening where White builds a d4-e3-c3 pawn pyramid, develops pieces to natural squares, then breaks open the center with e4. The same setup works against almost anything Black plays.",
  history: {
    origin:
      "Named after Belgian master Edgard Colle (1897–1932), who used this setup to devastating effect in the 1920s, scoring brilliant attacking wins against much stronger opposition. Colle tragically died young at 34, but his opening system lived on as one of the most reliable setups for club players. It saw a resurgence in the 2000s as grandmasters like Artur Yusupov demonstrated its strategic depth.",
    nameExplanation:
      "Named directly after Edgard Colle, who popularized and systematized this particular setup. It's called a \"system\" rather than an \"opening\" because the moves can be played in almost any order — the key is the resulting pawn structure (d4+e3+c3) and piece placement (Bd3+Nbd2+O-O), not the precise move order.",
    popularity:
      "Extremely popular at the club level because it's easy to learn and hard to refute. Less common at the grandmaster level because strong players can equalize with accurate play, but it still appears occasionally even at the top. If you play 1.d4, you will face this setup frequently.",
    bestFor:
      "Players who want a reliable, low-theory opening where you can focus on understanding piece placement and attacking plans rather than memorizing long forcing lines. It teaches the concept of building a position before striking — the e4 break is the reward for patient preparation.",
    famousPlayers: ["Edgard Colle", "Artur Yusupov", "Ulf Andersson", "Nigel Short"],
  },
  moves: [
    {
      san: "d4",
      color: "white",
      why: "Claims central space and opens the diagonal for the dark-squared bishop. In the Colle System, d4 is the foundation stone — everything else is built around supporting and exploiting this pawn. Unlike 1.e4 openings, 1.d4 leads to a slower, more strategic game where preparation matters more than tactics.",
      concepts: ["center-control", "development"],
      controls: "c5, e5 squares",
      commonMistakes: [
        { san: "e4", whyBad: "e4 leads to open, tactical games (Italian, Ruy Lopez, etc.). We're learning the Colle System which starts with d4 — a patient, strategic approach. d4 is the foundation of the pyramid." },
        { san: "Nf3", whyBad: "Nf3 is flexible but delays claiming the center with a pawn. d4 grabs space immediately and the pawn is already defended by the queen. Claim the center first, then develop pieces." },
      ],
    },
    {
      san: "d5",
      color: "black",
      why: "Black mirrors White's central claim, establishing a solid presence in the center. This symmetrical pawn structure is the starting point for the Colle — White's plan doesn't depend on what Black does, which is the beauty of a system opening.",
      concepts: ["center-control"],
      controls: "c4, e4 squares",
    },
    {
      san: "Nf3",
      color: "white",
      why: "Develops the knight to its best square, supporting d4 and controlling e5. In the Colle, Nf3 is played early to solidify the center before committing to the pawn structure. The knight also prepares kingside castling and will later support the e4 break.",
      concepts: ["development", "center-control"],
      controls: "e5, d4 squares",
      commonMistakes: [
        {
          san: "c4",
          whyBad: "c4 turns this into a Queen's Gambit — a completely different opening with much more theory. The whole point of the Colle is to avoid c4 and instead build the e3+c3 pyramid. Stick to the system!",
        },
        {
          san: "Nc3",
          whyBad: "Nc3 blocks the c-pawn from going to c3. In the Colle, c3 is essential for the pyramid structure (c3-d4-e3). The queenside knight goes to d2 in this system — never block your own pawns.",
        },
        {
          san: "Bf4",
          whyBad: "Bf4 is the London System, not the Colle. In the Colle, the bishop stays on c1 initially (or goes to d2) and the plan revolves around the e4 break with Bd3 aiming at h7. Different system, different plan.",
        },
      ],
    },
    {
      san: "Nf6",
      color: "black",
      why: "Black develops the kingside knight to its most natural square, attacking e4 and preparing to castle. This is the most common response — developing a piece while maintaining central influence.",
      concepts: ["development", "center-control"],
      controls: "e4, d5 squares",
    },
    {
      san: "e3",
      color: "white",
      why: "The signature move of the Colle System. While e3 looks modest — it blocks in the dark-squared bishop — it solidifies the d4 pawn and prepares the critical Bd3 development. The dark-squared bishop will develop later to d2 or b2. The real idea is that e3 sets up the eventual e4 pawn break, which will blow the center open when you're fully developed.",
      concepts: ["center-control", "preparation"],
      controls: "d4 pawn is now rock-solid",
      prevents: "Any immediate attacks on d4",
      commonMistakes: [
        {
          san: "Bf4",
          whyBad: "Bf4 develops the bishop before playing e3, but this is the London System, not the Colle. In the Colle, we deliberately play e3 first because we want Bd3 (not Bf4) and the bishop will go to d2 or stay home until the e4 break opens lines for it.",
        },
        {
          san: "Bg5",
          whyBad: "Bg5 pins the knight and is a fine move in other openings, but in the Colle we want the quiet e3 setup. Playing Bg5 commits the bishop early and can lead to different strategic ideas than the Colle's patient buildup.",
        },
      ],
    },
    {
      san: "e6",
      color: "black",
      why: "Black reinforces d5 and opens the diagonal for the dark-squared bishop. Like White's e3, this is solid but blocks in the light-squared bishop on c8 — a common problem in these d4/d5 structures that Black must solve later.",
      concepts: ["center-control", "development"],
      controls: "d5 pawn reinforced",
    },
    {
      san: "Bd3",
      color: "white",
      why: "The bishop goes to its ideal square in the Colle. From d3, it aims at the kingside (h7 in particular, which becomes a target after castling) and also supports the future e4 push. Bd3 is one of the key pieces in the Colle attack — once e4 happens, this bishop comes alive on the b1-h7 diagonal.",
      concepts: ["development", "attack"],
      controls: "h7 square, b1-h7 diagonal",
      commonMistakes: [
        { san: "Be2", whyBad: "Be2 is the passive alternative — the bishop has no target on e2 and just occupies space. Bd3 aims at h7 with real attacking potential. The whole Colle attack depends on the Bd3+e4 combo. Active bishops win games." },
        { san: "c3", whyBad: "c3 is part of the plan but Bd3 is more urgent right now. The bishop needs to get to d3 before you castle — the f1 square might be needed later. Develop pieces before making pawn moves." },
        { san: "Nbd2", whyBad: "Nbd2 is coming soon but Bd3 should come first. The bishop has only one ideal square (d3), while the knight can wait. Develop the piece with fewer good options first." },
      ],
    },
    {
      san: "c5",
      color: "black",
      why: "Black strikes at White's center with the standard c5 break. This is the most principled response — challenging the d4 pawn before White completes development and launches the e4 break. Black aims to open the position while White is still setting up.",
      concepts: ["center-control"],
      controls: "Attacks d4 pawn",
    },
    {
      san: "c3",
      color: "white",
      why: "Completes the famous Colle pyramid: d4+e3+c3. The c3 pawn reinforces d4 against Black's c5 pressure, making the center rock-solid. Now White can continue developing without worrying about the center collapsing. The pyramid is unbreakable — White chooses when to open the position with e4.",
      concepts: ["center-control", "pawn-structure"],
      controls: "d4 pawn doubly reinforced",
      prevents: "Black from successfully undermining d4 with cxd4",
      commonMistakes: [
        {
          san: "e4",
          whyBad: "Playing e4 prematurely before completing development is a classic beginner mistake in the Colle. You haven't castled yet and the knight isn't on d2 to support e4 properly. After dxe4, Bxe4 Nxe4 leaves you without a key attacking piece. Patience — develop first, then break!",
        },
        {
          san: "dxc5",
          whyBad: "Trading your central pawn for Black's side pawn gives up the pyramid for nothing. c3 reinforces the center and maintains the solid structure. Keep your strong center — don't trade it away.",
        },
        {
          san: "Nbd2",
          whyBad: "Nbd2 is part of the plan but c3 first is more urgent. Black is pressing d4 with ...c5, and without c3, your center could collapse. Secure the structure, THEN develop the knight.",
        },
      ],
    },
    {
      san: "Nc6",
      color: "black",
      why: "Black develops the queenside knight to a natural square, adding more pressure to d4 and e5. The knight on c6 is well-placed in these structures, supporting the c5 push and controlling central squares.",
      concepts: ["development", "center-control"],
      controls: "d4, e5 squares",
    },
    {
      san: "Nbd2",
      color: "white",
      why: "The knight goes to d2 rather than c3 — this is a key Colle idea. From d2, the knight supports the e4 break directly (the knight can recapture on e4 if needed) and doesn't block the c-pawn. The knight may also reroute to f1-g3 or e5 later. Everything is geared toward making e4 happen.",
      concepts: ["development", "preparation"],
      controls: "e4 square, supports the break",
      commonMistakes: [
        {
          san: "Nc3",
          whyBad: "Nc3 blocks the c-pawn (which is already on c3 supporting d4) and the knight doesn't support e4 as well from c3. On d2, the knight is perfectly placed to enable the e4 push and can reroute flexibly.",
        },
        {
          san: "O-O",
          whyBad: "Castling is close but Nbd2 first is more precise. The knight needs to support e4, and you want it in place before committing the king. Once you castle, e4 should be ready to go — so get the knight there first.",
        },
        {
          san: "Qe2",
          whyBad: "Don't bring the queen out early! Qe2 blocks the bishop on c1 and doesn't help with the e4 break. Nbd2 quietly prepares e4 without exposing any pieces to attack. Develop knights, not queens.",
        },
      ],
    },
    {
      san: "Bd6",
      color: "black",
      why: "Black develops the dark-squared bishop to d6, an active square where it eyes the kingside and supports the e5 square. The bishop is well-placed here, though it does block the d-file for Black's queen.",
      concepts: ["development", "piece-activity"],
      controls: "h2 square, kingside diagonal",
    },
    {
      san: "O-O",
      color: "white",
      why: "Castle immediately! The king is safe and the rook joins the fight on f1, where it will support the e4 break. This completes the Colle setup: d4+e3+c3 pyramid, Bd3, Nbd2, O-O. Now White is ready for the thematic e4 push, which will open the center with all pieces aimed at Black's king.",
      concepts: ["king-safety", "development"],
      controls: "King safe, rook activated on f1",
      commonMistakes: [
        { san: "e4", whyBad: "e4 before castling is premature — your king is still in the center! If the position opens up after dxe4, your uncastled king becomes a liability. Castle first, break second. King safety before tactics." },
        { san: "Qc2", whyBad: "Don't move the queen when you should be castling. O-O gets the king safe and activates the rook on f1 for the e4 break. The queen can come to c2 later if needed." },
      ],
    },
    {
      san: "O-O",
      color: "black",
      why: "Black also castles to safety. Both sides have completed their basic development. The critical moment is approaching — White will look to play e4 and open the position, while Black needs to find a way to challenge White's plan.",
      concepts: ["king-safety"],
    },
    {
      san: "dxc5",
      color: "white",
      why: "White captures on c5, opening the d-file and clearing the way for the e4 break. By exchanging on c5 now, White forces Black to recapture with the bishop, which loses time if White then plays e4 with tempo. This is a practical decision — simplify the center tension to prepare the breakthrough.",
      concepts: ["center-control", "tempo"],
      controls: "Opens d-file, prepares e4",
      commonMistakes: [
        { san: "e4", whyBad: "e4 with the tension still on d4 is risky. After ...cxd4 cxd4 dxe4, your center is shattered. Resolve the c5 tension first with dxc5, THEN play e4 into a cleaner position. One break at a time." },
        { san: "Re1", whyBad: "Re1 is a useful move eventually but doesn't address the c5 pressure. dxc5 simplifies favorably — Black must recapture with the bishop (moving it again), giving you time for e4. Act decisively." },
      ],
    },
    {
      san: "Bxc5",
      color: "black",
      why: "Black recaptures with the bishop, maintaining piece activity. The bishop on c5 is still well-placed, but Black has lost the central tension — White now has a clear plan to play e4 and seize the initiative.",
      concepts: ["piece-activity", "development"],
      controls: "Active bishop on c5",
    },
  ],
  summary:
    "The Colle System teaches the power of patient preparation and systematic development. The d4+e3+c3 pawn pyramid gives you an unshakable center, while Bd3+Nbd2+O-O creates a harmonious piece setup aimed at the kingside. The key strategic idea is the e4 pawn break — every move in the Colle builds toward this moment. When e4 finally comes, the position opens up and your pieces (especially the Bd3 on the b1-h7 diagonal) spring to life. It's a perfect opening for beginners because the plan is always the same: build the pyramid, develop, castle, then break with e4.",
  variants: [
    {
      id: "colle-zukertort",
      name: "Colle-Zukertort Variation",
      description: "White fianchettoes the dark-squared bishop to b2 instead of leaving it passive, adding pressure along the a1-h8 diagonal and supercharging the e4 break.",
      branchesAt: 4, // Index 4 = White's 3rd move (main line: e3)
      opponentMove: {
        san: "b3",
        color: "white",
        why: "Instead of the classic e3, White plays b3 first to fianchetto the dark-squared bishop. The bishop on b2 will control the long diagonal a1-h8, adding extra firepower to the eventual e4 break. This is a more active version of the Colle that avoids the 'bad bishop' problem.",
        concepts: ["development", "piece-activity"],
        controls: "a1-h8 long diagonal",
      },
      moves: [
        {
          san: "e6",
          color: "black",
          why: "Black continues with normal development, reinforcing d5. The b3 move doesn't change Black's basic plan of solid central control.",
          concepts: ["center-control"],
        },
        {
          san: "Bb2",
          color: "white",
          why: "The bishop takes its place on the long diagonal. From b2, it adds pressure to e5 and supports a future e4 push even more effectively than in the standard Colle. The bishop is active from the start rather than being blocked behind e3.",
          concepts: ["development", "piece-activity"],
          controls: "a1-h8 diagonal, e5 square",
          commonMistakes: [
            { san: "e3", whyBad: "e3 before Bb2 blocks the bishop behind the pawn. You played b3 specifically to fianchetto — finish the plan! Get the bishop to b2, THEN play e3." },
            { san: "Nbd2", whyBad: "Nbd2 is premature — complete the fianchetto first. The bishop on b2 is the whole point of playing b3. Don't leave plans half-finished." },
          ],
        },
        {
          san: "Be7",
          color: "black",
          why: "Black develops the bishop modestly to e7, preparing to castle. This is a solid choice that avoids any tactical tricks on the a1-h8 diagonal.",
          concepts: ["development", "king-safety"],
        },
        {
          san: "e3",
          color: "white",
          why: "Now e3, completing the familiar Colle structure but with the bishop already active on b2. This is the best of both worlds — the solid e3 pyramid with an active dark-squared bishop.",
          concepts: ["center-control", "preparation"],
          commonMistakes: [
            { san: "c4", whyBad: "c4 changes the entire character to a Queen's Gambit. The Colle-Zukertort is about the e3 pyramid + fianchetto bishop. Stick to the system you've started." },
            { san: "Nc3", whyBad: "Nc3 blocks the c-pawn from going to c3. Even in the Zukertort variation, you may want c3 later. Keep the c-file flexible with e3 first." },
          ],
        },
        {
          san: "O-O",
          color: "black",
          why: "Black castles to safety. The position is calm but White has a clear plan of Bd3, Nbd2, O-O, then e4.",
          concepts: ["king-safety"],
        },
        {
          san: "Bd3",
          color: "white",
          why: "The light-squared bishop takes its optimal post, eyeing the kingside. Together with the Bb2, White now has two bishops actively placed — a significant upgrade over the standard Colle where the dark-squared bishop often sits passively.",
          concepts: ["development", "attack"],
          controls: "h7 square, b1-h7 diagonal",
          commonMistakes: [
            { san: "Be2", whyBad: "Be2 wastes the bishop on a passive diagonal. Bd3 targets h7 and supports e4. In the Colle, the bishop on d3 is the main attacking piece — don't put it somewhere useless." },
            { san: "Nbd2", whyBad: "Nbd2 is part of the plan but Bd3 first is more precise. The bishop has one ideal square (d3); get it there while you can. The knight can wait." },
          ],
        },
        {
          san: "c5",
          color: "black",
          why: "The standard central break, challenging d4. Black needs to act in the center before White's pieces become overwhelming.",
          concepts: ["center-control"],
          controls: "Attacks d4",
        },
        {
          san: "O-O",
          color: "white",
          why: "Castle and prepare to unleash the e4 break. With both bishops active and the center secured, the Colle-Zukertort setup is complete and White is ready to strike.",
          concepts: ["king-safety", "preparation"],
          commonMistakes: [
            { san: "e4", whyBad: "e4 before castling leaves your king in the center. The position is about to open up — get the king safe first! Castle, THEN break with e4." },
            { san: "Nbd2", whyBad: "Nbd2 develops but castling is more urgent. Your king needs to be safe before you start the e4 push. King safety always comes before the central break." },
          ],
        },
      ],
    },
    {
      id: "colle-early-e4",
      name: "Premature ...c5 Line",
      description: "Black challenges the center early with ...c5, and White gets a quick chance to achieve the e4 break ahead of schedule.",
      branchesAt: 5, // Index 5 = Black's 3rd move (main line: e6)
      opponentMove: {
        san: "c5",
        color: "black",
        why: "Black strikes at d4 immediately rather than playing the quiet ...e6. This is more aggressive — Black wants to challenge White's center before the pyramid is fully built. But it can give White chances to reach the e4 break faster.",
        concepts: ["center-control", "attack"],
        controls: "Attacks d4 pawn",
      },
      moves: [
        {
          san: "Bd3",
          color: "white",
          why: "Continue developing on schedule. The bishop goes to d3 regardless of Black's plan — this is the beauty of the Colle system. You don't need to react to Black's moves; you just keep building your position.",
          concepts: ["development", "attack"],
          controls: "h7 square, b1-h7 diagonal",
          commonMistakes: [
            { san: "dxc5", whyBad: "Trading your strong central pawn for Black's flank pawn gives up the center. Keep developing — Bd3 ignores Black's c5 and sticks to the Colle plan. Don't let your opponent dictate the pace." },
            { san: "c3", whyBad: "c3 before Bd3 works but is less flexible. Get the bishop to d3 first — it's the key attacking piece in the Colle. The pyramid can be completed later." },
          ],
        },
        {
          san: "Nc6",
          color: "black",
          why: "Black develops the knight, adding pressure to d4 and e5. Natural and strong development.",
          concepts: ["development", "center-control"],
          controls: "d4, e5 squares",
        },
        {
          san: "O-O",
          color: "white",
          why: "Castle and get the king safe. The rook on f1 will support the e4 push. White continues the system regardless of what Black does — that's the Colle way.",
          concepts: ["king-safety", "development"],
          commonMistakes: [
            { san: "c3", whyBad: "c3 is needed eventually but castling first is more urgent. Get the king safe before building the pyramid — you don't want to be caught in the center if the position opens up." },
            { san: "e4", whyBad: "Way too early! You haven't castled or completed development. e4 with an uncastled king is asking for trouble. Safety first, breaks second." },
          ],
        },
        {
          san: "e6",
          color: "black",
          why: "Black reinforces d5 and opens the diagonal for the dark-squared bishop. A flexible move that keeps Black's options open.",
          concepts: ["center-control", "development"],
        },
        {
          san: "Nbd2",
          color: "white",
          why: "The knight comes to d2, its standard Colle square. Everything is pointing toward e4. The setup is nearly complete.",
          concepts: ["development", "preparation"],
          controls: "e4 square",
          commonMistakes: [
            { san: "Nc3", whyBad: "Nc3 blocks the c-pawn if you haven't played c3 yet, and doesn't support e4 as effectively. Nbd2 is the Colle knight — it directly enables the e4 break." },
            { san: "Re1", whyBad: "Re1 is a good move eventually but the knight needs to get to d2 first to support e4. Complete development before improving rook placement." },
          ],
        },
        {
          san: "Bd6",
          color: "black",
          why: "Black places the bishop actively, eyeing the kingside. A natural developing move.",
          concepts: ["development", "piece-activity"],
        },
        {
          san: "e4",
          color: "white",
          why: "The Colle break arrives! With all pieces developed and the king safe, e4 strikes at the heart of Black's position. After dxe4, Nxe4 the position opens up and White's pieces come alive — the Bd3 targets h7, the knight on e4 is powerful, and the rook on f1 joins the attack through the open f-file.",
          concepts: ["center-control", "attack", "space"],
          controls: "Opens the position for White's pieces",
          commonMistakes: [
            { san: "Re1", whyBad: "Re1 improves the rook but delays the break. Everything is ready for e4 NOW — all pieces are developed, king is safe, knight on d2 supports it. Execute the plan when it's ready!" },
            { san: "c3", whyBad: "c3 is extra reinforcement but unnecessary — e4 is already fully supported by Nbd2 and Nf3. Don't over-prepare. When your position is ready for the break, take it." },
          ],
        },
        {
          san: "dxe4",
          color: "black",
          why: "Black captures, but this opens lines for White's pieces. The Bd3 now has a clear view of h7, and the knight can jump to e4 with strong central control.",
          concepts: ["center-control"],
        },
      ],
    },
  ],
};
