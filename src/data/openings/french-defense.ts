import { OpeningLine } from "../types";

export const frenchDefense: OpeningLine = {
  id: "french-defense",
  name: "French Defense",
  fullName: "French Defense (Winawer Variation)",
  eco: "C15",
  playerColor: "black",
  level: "intermediate",
  description:
    "A solid, counterattacking defense where Black builds a pawn chain on e6-d5 and fights for the center with c5. The Winawer Variation sharpens the struggle by pinning White's knight and provoking structural concessions from both sides.",
  history: {
    origin:
      "The French Defense takes its name from a correspondence match between the cities of Paris and London in 1834, where the Parisian team employed 1...e6 to great effect. The Winawer Variation (3...Bb4) was pioneered by the Polish master Szymon Winawer in the late 19th century, and it became one of the sharpest and most theoretically rich lines in the entire opening.",
    nameExplanation:
      "Called the \"French Defense\" because it was used by the French team in the 1834 Paris vs. London match. The Winawer Variation is named after Szymon Winawer, a leading Polish player of the 1880s who championed the bold 3...Bb4 pin.",
    popularity:
      "A staple at all levels of chess. The French is the third most popular reply to 1.e4 (after 1...e5 and the Sicilian). The Winawer is its sharpest mainline and a favorite weapon of players who enjoy complex strategic battles with clear plans for both sides.",
    bestFor:
      "Players who want to learn strategic pawn play, structural sacrifices, and long-term planning. The French teaches you how to fight for the center without occupying it immediately, and the Winawer specifically shows how giving up the bishop pair can be compensated by superior pawn structure and piece activity.",
    famousPlayers: ["Mikhail Botvinnik", "Viktor Korchnoi", "Wolfgang Uhlmann", "Alexander Morozevich"],
  },
  moves: [
    {
      san: "e4",
      color: "white",
      why: "White claims the center with the king's pawn, controlling d5 and f5 while opening lines for the queen and light-squared bishop. This is the most popular first move in chess, setting the stage for open, tactical play.",
      concepts: ["center-control", "development"],
      controls: "d5, f5 squares",
    },
    {
      san: "e6",
      color: "black",
      why: "The defining move of the French Defense. Rather than directly challenging e4, Black prepares to play ...d5 on the next move with full pawn support. The pawn on e6 creates a solid foundation — it's harder to attack than an e5 pawn, and Black's center will be well-fortified.",
      concepts: ["center-control", "preparation"],
      controls: "d5 square — prepares the central challenge",
      commonMistakes: [
        {
          san: "e5",
          whyBad:
            "While 1...e5 is perfectly playable, it leads to open games where White often gets easy attacking chances. The French with ...e6 is chosen specifically to build a solid pawn chain and fight for the center on Black's own terms, not White's.",
        },
      ],
    },
    {
      san: "d4",
      color: "white",
      why: "White establishes the ideal pawn center with pawns on e4 and d4, controlling a massive swath of central squares. This two-pawn center is the gold standard — it restricts Black's pieces and gives White a natural space advantage.",
      concepts: ["center-control", "space"],
      controls: "c5, d5, e5, f5 squares",
    },
    {
      san: "d5",
      color: "black",
      why: "Now Black strikes at the heart of White's center. The pawn on d5 directly challenges e4, forcing White to make a decision: advance, capture, or defend. This is the key confrontation in the French — Black refuses to let White hold the ideal center unchallenged. The e6 pawn provides rock-solid support.",
      concepts: ["center-control", "attack"],
      controls: "c4, e4 squares — directly attacks White's center",
    },
    {
      san: "Nc3",
      color: "white",
      why: "White defends the e4 pawn with a natural developing move. The knight on c3 reinforces the center while developing toward the action. White now threatens to maintain the strong e4-d4 pawn duo.",
      concepts: ["development", "center-control"],
      controls: "e4, d5 squares",
    },
    {
      san: "Bb4",
      color: "black",
      why: "This is the Winawer — the sharpest and most combative response. The bishop pins the knight that defends e4, creating immediate tactical tension. If White's knight moves or is exchanged, the e4 pawn falls. Black is willing to trade this bishop for the knight, accepting doubled pawns for White in exchange for destroying White's pawn structure and gaining central pressure.",
      concepts: ["piece-activity", "attack", "pawn-structure"],
      controls: "Pins Nc3 to the king, threatens the e4 pawn indirectly",
      prevents: "White from comfortably maintaining the e4-d4 center",
      commonMistakes: [
        {
          san: "Nf6",
          whyBad:
            "While 3...Nf6 (the Classical French) is a solid alternative, it allows White to advance 4.e5 with a comfortable space advantage. The Winawer 3...Bb4 is more aggressive — it forces White to make immediate concessions in pawn structure rather than letting White dictate the pace.",
        },
      ],
    },
    {
      san: "e5",
      color: "white",
      why: "White advances the pawn to avoid the tension and grab space. The e5 pawn locks the center and gains territory on the kingside, cramping Black's position. However, this creates a fixed pawn chain (d4-e5) that Black will target with ...c5 — the classic French Defense plan.",
      concepts: ["space", "center-control"],
      controls: "d6, f6 squares — cramps Black's kingside",
      prevents: "Black from developing the knight to f6",
    },
    {
      san: "c5",
      color: "black",
      why: "The essential counterattack against White's pawn chain. In the French Defense, the golden rule is: attack the base of the pawn chain. White's chain runs d4-e5, and d4 is the base. By playing ...c5, Black immediately strikes at d4, threatening to undermine White's entire central structure. This is one of the most important strategic ideas in all of chess.",
      concepts: ["center-control", "attack", "pawn-structure"],
      controls: "d4 square — attacks the base of White's pawn chain",
      commonMistakes: [
        {
          san: "Ne7",
          whyBad:
            "Developing the knight first looks natural, but it misses the critical timing for ...c5. White can consolidate with a3 and solidify the center. The pawn break ...c5 must come quickly to prevent White from locking down the position — you challenge the chain first, then develop behind it.",
        },
      ],
    },
    {
      san: "a3",
      color: "white",
      why: "White forces the question on Black's bishop. The bishop on b4 is pinning the knight and creating tactical pressure, so White asks: will you trade it or retreat? This move also prepares to recapture on c3 with the b-pawn if Black takes, which would give White a strong central pawn mass.",
      concepts: ["tempo", "prophylaxis"],
      controls: "b4 square — forces Black to commit the bishop",
      prevents: "Black from maintaining the pin indefinitely",
    },
    {
      san: "Bxc3+",
      color: "black",
      why: "Black takes the knight, giving up the bishop pair but inflicting permanent damage on White's pawn structure. After bxc3, White will have doubled c-pawns that are weak and hard to advance. This trade is the heart of the Winawer philosophy: structural damage to the opponent is worth the bishop. Black's remaining pieces will thrive in the position that emerges.",
      concepts: ["pawn-structure", "attack"],
      controls: "Destroys White's queenside pawn structure",
      commonMistakes: [
        {
          san: "Ba5",
          whyBad:
            "Retreating the bishop preserves the piece but wastes a crucial tempo. White plays b4, trapping the bishop on a5 or forcing ...cxb4 which helps White's center. The whole point of 3...Bb4 was to trade it for structural damage — retreating undoes that plan and leaves Black passive.",
        },
      ],
    },
    {
      san: "bxc3",
      color: "white",
      why: "White recaptures with the b-pawn, accepting doubled c-pawns. The c3 pawn now reinforces d4, making White's center harder to break down. White's strategic compensation is clear: a strong central pawn chain and the bishop pair. The downside is the weakened queenside pawn structure that Black can target later.",
      concepts: ["pawn-structure", "center-control"],
      controls: "d4 square — reinforces the center",
    },
    {
      san: "Ne7",
      color: "black",
      why: "The knight develops to e7 rather than the blocked f6 square (which is controlled by White's e5 pawn). From e7, the knight has flexible options: it can go to f5 to pressure d4, to g6 to support a kingside defense, or to c6 to add more pressure on the center. This flexible placement is a hallmark of French Defense strategy.",
      concepts: ["development", "piece-activity"],
      controls: "f5, g6, c6 squares — flexible knight placement",
    },
    {
      san: "Qg4",
      color: "white",
      why: "White's queen lunges to g4, creating a direct threat against the g7 pawn. With the dark-squared bishop already traded away, Black's kingside is weakened on the dark squares. This aggressive move forces Black to make an important decision about how to defend the kingside while continuing their own plans.",
      concepts: ["attack", "piece-activity"],
      controls: "g7 pawn — threatens to win material",
      prevents: "Black from castling kingside comfortably",
    },
    {
      san: "Qc7",
      color: "black",
      why: "Black defends indirectly by placing the queen on c7, where it serves multiple purposes. It adds pressure on the e5 pawn (threatening to win it), supports the ...c5 break that is already undermining d4, and prepares to castle queenside where the king will be safer. This is a model multi-purpose move — every good move should accomplish more than one thing.",
      concepts: ["piece-activity", "attack", "king-safety"],
      controls: "e5 pawn, c5 support — multifunctional queen placement",
    },
    {
      san: "Qxg7",
      color: "white",
      why: "White grabs the g7 pawn, winning material. This is consistent with the aggressive approach — White has won a pawn and disrupted Black's kingside pawn cover. However, the queen is now far from the center and will need time to return, giving Black compensation through faster development and central pressure.",
      concepts: ["attack", "tempo"],
      controls: "Takes g7 — material gain but queen displacement",
    },
    {
      san: "Rg8",
      color: "black",
      why: "Black chases the queen with the rook, gaining a vital tempo. The rook activates on the open g-file where it will pressure White's position for the rest of the game. Black has sacrificed a pawn but gained significant compensation: the rook is powerfully placed, the queen will gain more tempo by attacking the displaced White queen, and Black's pieces are coming to life. This is the essence of the Winawer — material sacrifice for dynamic piece play and initiative.",
      concepts: ["tempo", "piece-activity", "attack"],
      controls: "g-file — rook activates with tempo on the queen",
    },
  ],
  summary:
    "The French Defense Winawer teaches the critical strategic concept of attacking pawn chains at their base (...c5 against the d4-e5 chain). The Winawer variation adds another layer: trading a bishop for a knight to inflict permanent pawn structure damage, then exploiting those weaknesses with active piece play. Black sacrifices the g7 pawn to activate the rook on the g-file and seize the initiative. The key lessons are that pawn structure matters more than the bishop pair, tempo and activity can compensate for material, and every move should serve multiple purposes.",
};
