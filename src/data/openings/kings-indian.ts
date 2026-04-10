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
        {
          san: "Bg4",
          whyBad:
            "Developing the light-squared bishop to g4 before completing the fianchetto misses the whole point of the King's Indian. The g7 bishop is the cornerstone of Black's position. Also, after Be2, the bishop on g4 has no great prospects and may be forced to retreat, wasting time.",
        },
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
};
