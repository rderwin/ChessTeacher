import { OpeningLine } from "../types";

export const englishOpening: OpeningLine = {
  id: "english-opening",
  name: "English Opening",
  fullName: "English Opening (Symmetrical Variation)",
  eco: "A30",
  playerColor: "white",
  level: "intermediate",
  description: "A flexible flank opening where White controls the center from the side with c4 instead of occupying it directly. Leads to rich strategic positions.",
  history: {
    origin: "Named after Howard Staunton, who used it extensively in the 1843 London tournament. Botvinnik adopted it as a major weapon in the 1950s-60s, proving it was world-championship caliber.",
    nameExplanation: "Named after the English master Howard Staunton, who championed it in the mid-19th century. It's a 'flank' opening — controlling the center indirectly rather than occupying it.",
    popularity: "Very popular at the top level and increasingly common at club level. Players who want to avoid heavy e4 or d4 theory love the English for its flexibility.",
    bestFor: "Strategic players who enjoy maneuvering and transpositional possibilities. The English teaches you to control the center without occupying it — a key advanced concept.",
    famousPlayers: ["Mikhail Botvinnik", "Anatoly Karpov", "Magnus Carlsen", "Vladimir Kramnik"],
  },
  moves: [
    {
      san: "c4",
      color: "white",
      why: "The English! White controls d5 from the side instead of occupying the center with e4 or d4. This flexible move keeps all options open — White can transpose into d4 openings, play g3 with a fianchetto, or build a reversed Sicilian.",
      concepts: ["center-control", "preparation"],
      controls: "d5 square",
      commonMistakes: [
        { san: "e4", whyBad: "e4 is a completely different opening (King's Pawn). c4 is the English — indirect central control is the whole concept." },
        { san: "d4", whyBad: "d4 is the Queen's Pawn opening. c4 is the English — it controls d5 from the flank and gives you more flexibility in choosing your setup later." },
        { san: "Nf3", whyBad: "Nf3 is the Reti Opening — similar in spirit but c4 is more committal in a good way. It immediately stakes a claim on d5 and defines the English character." },
      ],
    },
    { san: "c5", color: "black", why: "The Symmetrical English — Black mirrors White's strategy, controlling d4 from the flank. This leads to complex strategic battles where both sides maneuver for small advantages.", concepts: ["center-control"] },
    {
      san: "Nf3",
      color: "white",
      why: "Flexible development. The knight goes to its best square while White delays committing to a pawn structure. Nf3 keeps the option of d4, g3, or e3.",
      concepts: ["development"],
      commonMistakes: [
        { san: "d4", whyBad: "d4 immediately leads to a Benoni or Maroczy structure. Nf3 keeps more flexibility — don't commit too early in the English." },
        { san: "e4", whyBad: "e4 gives away the English character entirely. With c4 already played, you want to control d5 indirectly. e4 makes this look like a confused Sicilian." },
        { san: "Nc3", whyBad: "Nc3 is fine but Nf3 is more flexible — it doesn't block the f-pawn (useful for f4 ideas) and develops the kingside for castling. In the English, flexibility is king." },
      ],
    },
    { san: "Nf6", color: "black", why: "Mirror development. Black keeps things flexible too, controlling d5 and e4.", concepts: ["development", "center-control"] },
    {
      san: "Nc3",
      color: "white",
      why: "Develop the second knight and increase control of d5. White is building up slowly before deciding on a pawn structure.",
      concepts: ["development", "center-control"],
      commonMistakes: [
        { san: "d4", whyBad: "d4 commits to a central structure too early. The English thrives on flexibility — Nc3 develops a piece and controls d5 without locking in the pawns." },
        { san: "g3", whyBad: "g3 is part of the plan but Nc3 is more urgent. Develop pieces before starting the fianchetto. The knight needs to be out to support the center." },
        { san: "e3", whyBad: "e3 is passive at this stage. Nc3 adds a piece to the game and fights for d5. Don't make quiet pawn moves when you can develop with purpose." },
      ],
    },
    { san: "d5", color: "black", why: "Black strikes in the center! This is the most dynamic approach — challenging White's c4 pawn directly rather than playing passively.", concepts: ["center-control", "attack"] },
    {
      san: "cxd5",
      color: "white",
      why: "Capture to open the position. After Nxd5, Black has a centralized knight but White has more space and flexibility.",
      concepts: ["center-control"],
      commonMistakes: [
        { san: "e3", whyBad: "e3 ignores Black's central strike. After ...dxc4, Black has won the pawn fight. When your c4 pawn is challenged by ...d5, you must either take or support — don't ignore it." },
        { san: "d3", whyBad: "d3 is too passive. cxd5 opens the position and lets your pieces come alive. In the English, you need to react decisively when Black strikes in the center." },
      ],
    },
    { san: "Nxd5", color: "black", why: "Recapture with the knight, landing on a powerful central square. The knight on d5 is well-placed but can be challenged.", concepts: ["center-control", "piece-activity"] },
    {
      san: "e3",
      color: "white",
      why: "A quiet but useful move — opens the diagonal for the bishop while supporting d4 if needed later. White is in no rush.",
      concepts: ["development", "preparation"],
      commonMistakes: [
        { san: "d4", whyBad: "d4 immediately challenges the knight but opens lines before you're fully developed. e3 prepares Bc4 first, which puts real pressure on the Nd5. Preparation before action." },
        { san: "g3", whyBad: "g3 with a fianchetto is a valid plan but e3+Bc4 is more direct here. The bishop on c4 targets the Nd5 immediately rather than taking two moves to fianchetto. Be efficient." },
      ],
    },
    { san: "Nc6", color: "black", why: "Develop another piece and control e5 and d4. Black has solid central presence.", concepts: ["development", "center-control"] },
    {
      san: "Bc4",
      color: "white",
      why: "Target the knight on d5 and develop the bishop actively. The bishop eyes the a2-g8 diagonal which can become dangerous.",
      concepts: ["development", "piece-activity", "attack"],
      commonMistakes: [
        { san: "Be2", whyBad: "Be2 is passive — it doesn't put any pressure on the Nd5. Bc4 directly challenges the centralized knight AND develops to an active diagonal. Active bishops beat passive ones." },
        { san: "Bb5", whyBad: "Bb5 pins the Nc6 but doesn't challenge the strong Nd5. Bc4 is more targeted — it puts pressure where it matters most. Attack the strongest enemy piece." },
      ],
    },
    { san: "Nb6", color: "black", why: "Retreat the knight to avoid the bishop's pressure. From b6, the knight eyes d5 again and supports a7.", concepts: ["piece-activity"] },
    {
      san: "Bb3",
      color: "white",
      why: "Keep the bishop on the strong diagonal. From b3, it still eyes f7 and controls d5. Patient positioning.",
      concepts: ["piece-activity"],
      commonMistakes: [
        { san: "Be2", whyBad: "Retreating to e2 wastes the bishop on a dead diagonal. Bb3 keeps the bishop active, still targeting f7 and controlling d5. Never retreat a bishop to a passive square when an active one is available." },
        { san: "d4", whyBad: "d4 is premature — your position isn't ready for a central push yet. Bb3 keeps the bishop active and you can consider d4 after castling. Don't rush structural commitments." },
      ],
    },
    { san: "e6", color: "black", why: "Solidify the center and prepare bishop development. A typical setup — solid and reliable.", concepts: ["center-control", "development"] },
    {
      san: "O-O",
      color: "white",
      why: "Castle and connect the rooks. White has completed basic development with a flexible, harmonious position.",
      concepts: ["king-safety", "development"],
      commonMistakes: [
        { san: "d4", whyBad: "d4 before castling opens the center with your king still exposed. Get the king safe first — the central break can wait. Castle when you can!" },
        { san: "Qe2", whyBad: "Moving the queen before castling is wasteful. O-O gets the king safe and the rook active. Don't delay castling for queen moves." },
      ],
    },
    { san: "Be7", color: "black", why: "Develop the last minor piece and prepare to castle. Black has a comfortable, if slightly passive, position.", concepts: ["development", "king-safety"] },
  ],
  summary: "The English Opening teaches INDIRECT center control — the concept that you don't have to occupy the center to control it. With c4, White influences d5 without committing pawns to the center early. The resulting positions reward patience and maneuvering over memorized theory.",
  variants: [
    {
      id: "reversed-sicilian",
      name: "Reversed Sicilian (1...e5)",
      description: "Black plays e5, giving White a Sicilian Defense with an extra tempo. Leads to strategic middlegames.",
      branchesAt: 1,
      opponentMove: { san: "e5", color: "black", why: "The most popular reply. Black occupies the center with a pawn, treating the position like a Sicilian Defense with colors reversed. White effectively has a Sicilian with an extra tempo.", concepts: ["center-control"] },
      moves: [
        {
          san: "Nc3",
          color: "white",
          why: "Develop naturally. White can now play g3 and Bg2 for a fianchetto setup, or d3 for a more modest approach.",
          concepts: ["development"],
          commonMistakes: [
            { san: "e4", whyBad: "e4 gives up the whole point of the English. You'd be better off playing 1.e4 directly. Keep the English structure with Nc3, g3, Bg2." },
            { san: "d3", whyBad: "d3 is too passive this early. Nc3 develops a piece and supports a future d4 or e4. Don't lock yourself into a cramped position." },
          ],
        },
        { san: "Nf6", color: "black", why: "Develop and control d5. A flexible response.", concepts: ["development", "center-control"] },
        {
          san: "g3",
          color: "white",
          why: "Prepare the fianchetto! The bishop on g2 will be a monster on the long diagonal, controlling the entire center from afar.",
          concepts: ["development", "preparation"],
          commonMistakes: [
            { san: "d4", whyBad: "d4 commits to a central structure. The English with g3+Bg2 is about controlling the center from the flank — the fianchettoed bishop does this beautifully." },
            { san: "e4", whyBad: "e4 changes the character completely. g3+Bg2 is the classic English fianchetto — the bishop on g2 controls the long diagonal and influences the center indirectly." },
          ],
        },
        { san: "d5", color: "black", why: "Strike the center while White is fianchettoing. Black tries to seize space.", concepts: ["center-control", "space"] },
        {
          san: "cxd5",
          color: "white",
          why: "Capture and open lines. The position becomes a reversed Sicilian with dynamic play for both sides.",
          concepts: ["center-control"],
          commonMistakes: [
            { san: "Bg2", whyBad: "Bg2 ignores the d5 tension. After ...d4, Black gains space and kicks your knight. Capture on d5 first to resolve the tension favorably, then fianchetto." },
          ],
        },
        { san: "Nxd5", color: "black", why: "Centralize the knight. The battle for d5 is the key theme.", concepts: ["center-control", "piece-activity"] },
      ],
    },
    {
      id: "anglo-indian",
      name: "Anglo-Indian (1...Nf6)",
      description: "Black plays Nf6, keeping options open. Can transpose into many d4 openings or stay in English territory.",
      branchesAt: 1,
      opponentMove: { san: "Nf6", color: "black", why: "The most flexible reply. Black develops without committing to any pawn structure. This can transpose into King's Indian, Nimzo-Indian, or stay purely English depending on how play develops.", concepts: ["development"] },
      moves: [
        {
          san: "Nc3",
          color: "white",
          why: "Keep things flexible. Both sides are developing without committing.",
          concepts: ["development"],
          commonMistakes: [
            { san: "d4", whyBad: "d4 transposes into Queen's Pawn openings. If you played c4, stick with the English character — Nc3 keeps flexibility for a Botvinnik setup with e4." },
            { san: "g3", whyBad: "g3 is fine but Nc3 is more useful right now. Develop the knight before the fianchetto — the knight actively controls d5 and supports e4." },
          ],
        },
        { san: "e6", color: "black", why: "Prepare d5 with solid pawn support. This can lead to a Queen's Gambit Declined if White plays d4.", concepts: ["center-control", "preparation"] },
        {
          san: "e4",
          color: "white",
          why: "Grab the full center! With Nc3 already out, e4 is well supported. White gets a Botvinnik-style setup.",
          concepts: ["center-control", "space"],
          commonMistakes: [
            { san: "d4", whyBad: "d4 is the Queen's Gambit approach. e4 is more ambitious — seizing the full center and creating a Botvinnik setup. When you can grab e4 safely, do it." },
            { san: "e3", whyBad: "e3 is too timid when you can play e4. With Nc3 already supporting it, e4 grabs maximum space. Don't settle for small when big is available." },
          ],
        },
        { san: "d5", color: "black", why: "Challenge the center immediately. Black fights for equality.", concepts: ["center-control", "attack"] },
        {
          san: "e5",
          color: "white",
          why: "Advance and gain space. The position resembles an Advanced French with colors reversed.",
          concepts: ["space"],
          commonMistakes: [
            { san: "exd5", whyBad: "Taking on d5 opens the position and gives Black easy play with ...exd5. e5 gains space and cramps Black's position — the pawn chain c4-e5 is very powerful." },
            { san: "cxd5", whyBad: "cxd5 exd5 leads to an isolated d-pawn position that's more comfortable for Black. e5 keeps the space advantage and maintains the pawn chain." },
          ],
        },
        { san: "Ne4", color: "black", why: "The knight jumps to an active square, challenging White's center from within.", concepts: ["piece-activity", "center-control"] },
      ],
    },
  ],
};
