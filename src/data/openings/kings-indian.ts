import { OpeningLine } from "../types";

export const kingsIndian: OpeningLine = {
  id: "kings-indian",
  name: "King's Indian Defense",
  fullName: "King's Indian Defense (Classical Variation)",
  eco: "E90",
  playerColor: "black",
  level: "advanced",
  description:
    "A hypermodern defense where Black allows White to build a massive pawn center, then counterattacks it with explosive pawn breaks. The fianchettoed bishop on g7 becomes a long-range weapon aimed at White's queenside.",
  history: {
    origin:
      "Developed during the hypermodern revolution of the 1920s, when players like Nimzowitsch and Reti challenged the dogma that you must occupy the center with pawns. The King's Indian became a world-class weapon in the 1950s through David Bronstein and Efim Geller, who showed that Black could allow a big center and then blow it apart. Bobby Fischer and Garry Kasparov later elevated it to legendary status, using it to win some of the most brilliant attacking games in chess history.",
    nameExplanation:
      "Called \"Indian\" because Black develops the kingside bishop via fianchetto (g6 + Bg7), a setup that originated in Indian chess traditions. The \"King's\" prefix distinguishes it from the Queen's Indian Defense, where the queenside bishop is fianchettoed instead. Together, the name describes Black's signature kingside fianchetto formation.",
    popularity:
      "One of the most popular defenses against 1.d4 at every level. At the club level it rewards aggressive players who love kingside attacks. At the elite level, it remains a respected weapon — Radjabov and Nakamura regularly employ it. White players must be well-prepared because the resulting positions are sharp and double-edged.",
    bestFor:
      "Players who enjoy dynamic, unbalanced positions and are willing to suffer a space disadvantage in exchange for explosive counterattacking chances. It teaches patience, pawn break timing, and the power of a fianchettoed bishop. Not for the faint-hearted — you need to understand when to strike.",
    famousPlayers: ["Garry Kasparov", "Bobby Fischer", "Efim Geller", "Teimour Radjabov", "Hikaru Nakamura"],
  },
  moves: [
    {
      san: "d4",
      color: "white",
      why: "White opens with the queen's pawn, immediately claiming central space and opening a diagonal for the dark-squared bishop. The pawn on d4 controls e5 and c5, making it harder for Black to fight for the center immediately. This is the starting move of most positional openings.",
      concepts: ["center-control", "development"],
      controls: "e5, c5 squares",
    },
    {
      san: "Nf6",
      color: "black",
      why: "Black develops a knight to its best square while attacking the e4 square, preventing White from easily establishing the ideal e4+d4 pawn center. This is the hypermodern approach — control the center with pieces first rather than occupying it with pawns. It also keeps Black's options flexible; from here, many different Indian defenses are possible.",
      concepts: ["development", "center-control", "prophylaxis"],
      controls: "e4, d5 squares",
      prevents: "White from freely playing e4 without preparation",
      commonMistakes: [
        {
          san: "d5",
          whyBad:
            "Playing ...d5 immediately leads to Queen's Gambit structures, not the King's Indian. The whole point of the KID is to let White build a center and then attack it later. Nf6 is the hypermodern approach — control the center with pieces first.",
        },
        {
          san: "d6",
          whyBad:
            "While ...d6 is a King's Indian move, playing it before Nf6 lets White push e4 freely without any opposition. Nf6 first prevents e4 from coming easily, keeping the tension and preserving your options.",
        },
      ],
    },
    {
      san: "c4",
      color: "white",
      why: "White reinforces control of d5 and grabs extra queenside space. The c4 pawn supports a future e4 push to build the full broad center. Together, d4 and c4 form the backbone of White's classical approach — maximum central control before developing pieces.",
      concepts: ["center-control", "space"],
      controls: "d5, b5 squares",
    },
    {
      san: "g6",
      color: "black",
      why: "The signature move of the King's Indian. Black prepares to fianchetto the dark-squared bishop to g7, where it will become a powerful long-range piece aimed at the center and queenside along the h8-a1 diagonal. Rather than fighting for the center now, Black builds a flexible structure that can explode into activity later with ...e5 or ...c5 pawn breaks.",
      concepts: ["development", "preparation", "piece-activity"],
      controls: "Prepares Bg7 fianchetto",
      commonMistakes: [
        {
          san: "d5",
          whyBad:
            "Playing ...d5 immediately transposes to a Gruenfeld or closes the center prematurely. In the King's Indian, Black wants to keep the tension and play ...d6 followed by ...e5, attacking the center with pieces backing up the pawn break. Closing the center now gives up Black's dynamic counterplay.",
        },
      ],
    },
    {
      san: "Nc3",
      color: "white",
      why: "White develops the knight to its natural square, reinforcing control of d5 and e4. The knight on c3 is perfectly placed to support the upcoming e4 push, which will give White a commanding pawn center. Development and central control go hand in hand.",
      concepts: ["development", "center-control"],
      controls: "d5, e4 squares",
    },
    {
      san: "Bg7",
      color: "black",
      why: "The King's Indian bishop takes its throne. From g7, this bishop is a monster — it surveys the entire h8-a1 diagonal, pressuring d4 and aiming deep into White's queenside. For now it appears blocked by Black's own pawns, but once Black plays ...e5 and the center opens, this bishop can become the most powerful piece on the board. It also provides excellent defense for the kingside.",
      concepts: ["development", "piece-activity", "king-safety"],
      controls: "h8-a1 diagonal, pressures d4",
      commonMistakes: [
],
    },
    {
      san: "e4",
      color: "white",
      why: "White achieves the ideal broad pawn center with pawns on c4, d4, and e4. This is a massive space advantage — White controls nearly every important central square. Most classical players would consider this a dream setup. But in the King's Indian, Black has a plan to undermine it all.",
      concepts: ["center-control", "space"],
      controls: "d5, f5 squares — completes the pawn armada",
    },
    {
      san: "d6",
      color: "black",
      why: "Black solidifies the position and prepares the critical ...e5 pawn break. The pawn on d6 supports a future e5 push and keeps the center flexible. It may look passive, but this is the calm before the storm — Black is coiling like a spring, ready to strike at White's center with ...e5 followed by ...f5.",
      concepts: ["preparation", "center-control", "pawn-structure"],
      controls: "e5, c5 squares",
      prevents: "White from expanding further without consequence",
      commonMistakes: [
        {
          san: "e5",
          whyBad:
            "Playing ...e5 before ...d6 allows dxe5 Ng4 (or ...Nxe4 Nxe4 and White is better). Black needs ...d6 first to make ...e5 a solid pawn break. Preparation before execution — the pawn on d6 ensures that after ...e5, Black can recapture with the d-pawn if White takes, maintaining central presence.",
        },
      ],
    },
    {
      san: "Nf3",
      color: "white",
      why: "White develops the kingside knight to its best square, supporting d4 and preparing to castle. The knight on f3 is a flexible piece that can later relocate to d2 or e1 to support a c5 queenside advance. White is methodically completing development before the central battle begins.",
      concepts: ["development", "king-safety"],
      controls: "e5, d4 squares",
    },
    {
      san: "O-O",
      color: "black",
      why: "Black castles kingside, tucking the king into safety behind the fianchettoed bishop. This is essential before launching the ...e5 break — you never want your king in the center when the position opens up. The rook also moves to f8, where it will support the future ...f5 pawn storm. Castling here is both defensive and offensive preparation.",
      concepts: ["king-safety", "preparation"],
      controls: "Secures king, activates rook on f8",
      commonMistakes: [
        {
          san: "e5",
          whyBad:
            "Playing ...e5 before castling is dangerous — the center could open with your king still in the middle. Castle first to secure the king, then strike with ...e5 when you're safe. Never open the position with your king exposed.",
        },
        {
          san: "Nc6",
          whyBad:
            "Developing the knight before castling delays king safety. In the King's Indian, you need the king tucked behind the fianchettoed bishop before the center explodes. Castle first, develop later.",
        },
      ],
    },
    {
      san: "Be2",
      color: "white",
      why: "White develops the bishop to a modest but solid square, completing minor piece development and preparing to castle. Be2 is the hallmark of the Classical Variation — the bishop doesn't commit aggressively (unlike Bd3 or Bc4) but keeps the position flexible. White plans to castle, then decide between a queenside expansion with c5 or a kingside stance.",
      concepts: ["development", "king-safety"],
      controls: "Completes kingside development, prepares O-O",
    },
    {
      san: "e5",
      color: "black",
      why: "The critical moment — Black strikes at the heart of White's center! This is the move the entire King's Indian setup has been building toward. By playing ...e5, Black challenges d4 and opens lines for the g7 bishop, which now has a clear diagonal toward White's queenside. The position becomes sharp and double-edged: Black aims for a kingside attack with ...f5, while White will push for a queenside advance with c5.",
      concepts: ["center-control", "piece-activity", "attack"],
      controls: "d4, f4 squares — challenges White's center",
      prevents: "White from maintaining an unchallenged pawn center",
      commonMistakes: [
        {
          san: "c6",
          whyBad:
            "Playing ...c6 is too slow and passive. The King's Indian demands the aggressive ...e5 break to challenge d4 and activate the g7 bishop. Without ...e5, Black's position remains cramped with no counterplay.",
        },
        {
          san: "Nbd7",
          whyBad:
            "Developing another piece instead of striking with ...e5 lets White consolidate the center further. This is the moment to challenge the center — Black has been preparing for this move since move 1. Don't delay the key break.",
        },
      ],
    },
    {
      san: "O-O",
      color: "white",
      why: "White castles, bringing the king to safety before the real fight begins. With the center under tension (pawns clashing on d4 and e5), both sides need their kings safe. The rook on f1 will also be useful — it can swing to e1 to support the e4 pawn or later shift to support a queenside offensive.",
      concepts: ["king-safety", "development"],
      controls: "Secures king, connects rooks",
    },
    {
      san: "Nc6",
      color: "black",
      why: "Black develops the last minor piece, adding pressure to d4. The knight on c6 forces White to make a decision about the center — maintain the tension, push d5, or exchange on e5. This is a critical juncture in the King's Indian. The knight also eyes the e5 square if White exchanges, and can reroute to various squares depending on White's plan.",
      concepts: ["development", "center-control", "attack"],
      controls: "d4, e5 squares — increases pressure on the center",
      commonMistakes: [
        {
          san: "Nbd7",
          whyBad:
            "Nbd7 is passive and doesn't put any pressure on d4. Nc6 is the correct square — it directly attacks d4, forces White to make a decision about the center, and the knight is more actively placed. In the KID, you need maximum pressure on d4.",
        }
      ],
    },
    {
      san: "d5",
      color: "white",
      why: "White closes the center, locking in a space advantage. This is the Classical main line — White decides to push past rather than exchange on e5. With d5, the position splits into two distinct battlefields: White will expand on the queenside with c5 and b4, while Black will launch a kingside pawn storm with ...f5 and ...f4. It's a race, and both sides know it.",
      concepts: ["space", "pawn-structure", "preparation"],
      controls: "c6, e6 squares — gains space, locks the center",
    },
    {
      san: "Ne7",
      color: "black",
      why: "The knight retreats to e7, but this is far from passive — it's a key repositioning move. From e7, the knight supports the crucial ...f5 pawn break (the f-pawn can advance without the knight blocking it on c6) and can later hop to g6 or f5 to join the kingside attack. The knight also no longer blocks the c-pawn, so ...c6 or ...c5 becomes possible if Black wants queenside counterplay. This is the starting position of one of chess's most thrilling middlegame battles.",
      concepts: ["piece-activity", "preparation", "attack"],
      controls: "f5, g6, c6 squares — repositions for the kingside storm",
      commonMistakes: [
        {
          san: "Na5",
          whyBad:
            "While ...Na5 targets the c4 pawn, it puts the knight on the rim where it's poorly placed and can be kicked by b3. The knight on e7 is far more useful — it supports ...f5, the key pawn break that drives Black's entire kingside attack. Piece activity toward the attacking zone matters more than winning a pawn on c4.",
        },
      ],
    },
  ],
  summary:
    "The King's Indian Defense is a masterclass in dynamic counterplay and delayed gratification. Black deliberately allows White to build an imposing pawn center (c4-d4-e4), then systematically undermines it with ...e5 and later ...f5. The fianchettoed bishop on g7 is the soul of the position — once the center opens or closes, it becomes a devastating long-range weapon. After White plays d5 and the center locks, the game splits into a thrilling race: White attacks on the queenside (c5, b4, a4), while Black launches a kingside pawn storm (...f5, ...f4, ...g5). Understanding this opening teaches patience, the art of the counterattack, and why piece placement can be more important than raw space.",
  variants: [
    {
      id: "samisch",
      name: "Sämisch Variation (5.f3)",
      description: "White plays f3 for rock-solid central control, preparing Be3 and Qd2 with a kingside or queenside attack.",
      branchesAt: 8,
      opponentMove: { san: "f3", color: "white", why: "The Sämisch! White bolts the e4 pawn in place with f3, creating an ultra-solid center. White plans Be3, Qd2, and either O-O-O with a kingside pawn storm or O-O with a slow squeeze. Black must time ...e5 and ...f5 perfectly.", concepts: ["center-control", "preparation"] },
      moves: [
        { san: "O-O", color: "black", why: "Castle first — you need the king safe before the fireworks start.", concepts: ["king-safety"], commonMistakes: [{ san: "e5", whyBad: "Striking the center before castling is reckless. The Samisch leads to very sharp positions — your king must be safe before any central confrontation. Castle first, attack second." }, { san: "c5", whyBad: "Opening the queenside before castling exposes your king to danger. Get your king to safety behind the fianchettoed bishop first, then choose the right pawn break." }] },
        { san: "Be3", color: "white", why: "Develop the bishop and prepare Qd2. The Sämisch setup is taking shape.", concepts: ["development", "preparation"] },
        { san: "e5", color: "black", why: "The key break! Challenge d4 even though White's center looks massive. Without ...e5, Black's position becomes too passive.", concepts: ["center-control", "attack"], commonMistakes: [{ san: "c5", whyBad: "c5 is the wrong break in the Sämisch. Black needs e5 to activate the g7 bishop and create kingside counterplay. c5 plays into White's hands." }] },
        { san: "d5", color: "white", why: "Close the center. Now it's a race: White on the queenside (c5), Black on the kingside (f5, g5).", concepts: ["space", "center-control"] },
        { san: "Nh5", color: "black", why: "The knight heads to f4 via h5, a powerful outpost. From f4, it attacks d3 and supports the ...f5 break.", concepts: ["piece-activity", "preparation"], commonMistakes: [{ san: "Ne8", whyBad: "Ne8 is too passive — the knight retreats backward with no clear plan. Nh5 heads to the powerful f4 outpost where it supports the ...f5 break and pressures d3. Aim forward, not backward." }] },
        { san: "Qd2", color: "white", why: "Connect the rooks and prepare O-O-O. The race is about to begin.", concepts: ["development", "attack"] },
      ],
    },
    {
      id: "four-pawns",
      name: "Four Pawns Attack (5.f4)",
      description: "White plays the ultra-aggressive f4, building four abreast center pawns. High risk, high reward for both sides.",
      branchesAt: 8,
      opponentMove: { san: "f4", color: "white", why: "The Four Pawns Attack — White goes ALL IN on the center with c4-d4-e4-f4! This is the most aggressive possible approach against the King's Indian. White has a massive space advantage but the center can become overextended.", concepts: ["center-control", "space", "attack"] },
      moves: [
        { san: "O-O", color: "black", why: "Castle immediately. With White's center so far advanced, the position could blow open at any moment — you need the king safe.", concepts: ["king-safety"], commonMistakes: [{ san: "c5", whyBad: "Challenging the center before castling is risky when White has four center pawns — the position could explode open with your king still in the middle. Safety first, then counterattack." }, { san: "e5", whyBad: "Playing ...e5 into White's four-pawn center before castling invites a sharp exchange that leaves your king exposed. Castle first to stay safe, then choose the right moment to strike." }] },
        { san: "Nf3", color: "white", why: "Develop and support the center. White has four center pawns but needs pieces to hold them.", concepts: ["development"] },
        { san: "c5", color: "black", why: "Strike at the center! c5 challenges d4 and d5, trying to undermine the four-pawn wall. This is the critical response — Black must counterattack before White consolidates.", concepts: ["center-control", "attack"], commonMistakes: [{ san: "e5", whyBad: "e5 runs into dxe5 dxe5 fxe5, and White's center is very strong. c5 first challenges the base of the chain." }] },
        { san: "d5", color: "white", why: "White closes the center, committing to a kingside attack with the f-pawn and pieces.", concepts: ["space"] },
        { san: "e6", color: "black", why: "Attack the d5 pawn from a different angle. Black wants to open lines against White's over-extended center.", concepts: ["center-control", "attack"], commonMistakes: [{ san: "b5", whyBad: "Queenside expansion with ...b5 is too slow here. You need to attack the overextended center directly with ...e6, striking at d5. White's four-pawn center is the weakness — target it before it consolidates." }, { san: "Bg4", whyBad: "Developing the bishop doesn't challenge the center. You must play ...e6 now to undermine d5 while White's center is stretched thin. Piece moves can wait — the pawn break is urgent." }] },
        { san: "Be2", color: "white", why: "Develop and prepare to castle. White must play carefully — the four-pawn center is powerful but fragile.", concepts: ["development", "king-safety"] },
      ],
    },
  ],
};
