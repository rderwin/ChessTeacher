/**
 * Scenario-based quiz questions for the glossary.
 * Each shows a chess situation and asks "what is this called?"
 */

export interface QuizQuestion {
  id: string;
  /** The scenario description — what's happening on the board */
  scenario: string;
  /** Optional FEN to show on a board */
  fen?: string;
  /** The correct glossary term slug */
  answer: string;
  /** 3 wrong answer slugs (distractors) */
  distractors: string[];
  /** Brief explanation shown after answering */
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- Tactics ---
  {
    id: "q-fork-1",
    scenario: "Your knight jumps to e5. From there it attacks both the enemy queen on d3 AND the rook on g4. The opponent can only save one piece.",
    answer: "fork",
    distractors: ["pin", "skewer", "deflection"],
    explanation: "This is a fork — one piece attacks two or more enemy pieces at the same time. Knights are especially good at this because they can attack pieces that can't attack them back.",
  },
  {
    id: "q-fork-2",
    scenario: "Your queen moves to a square that simultaneously checks the king and attacks an undefended rook. The king must move, and you capture the rook next turn.",
    answer: "fork",
    distractors: ["skewer", "discovered-attack", "deflection"],
    explanation: "A queen fork — the queen attacks two pieces at once. When one of the targets is the king (a royal fork), it's especially powerful because the opponent MUST deal with the check.",
  },
  {
    id: "q-pin-1",
    scenario: "Your bishop on g5 is aimed at the enemy knight on f6. The knight can't move because the queen is directly behind it on d8. Moving the knight would expose the queen.",
    answer: "pin",
    distractors: ["skewer", "fork", "discovered-attack"],
    explanation: "This is a pin — the knight is 'pinned' to the queen behind it. If the piece behind were the king, it would be an absolute pin (the knight literally cannot move by the rules).",
  },
  {
    id: "q-pin-2",
    scenario: "A rook on the e-file is staring at the enemy knight on e5. Behind the knight is the enemy king on e8. The knight literally cannot move — it would be illegal.",
    answer: "pin",
    distractors: ["skewer", "fork", "deflection"],
    explanation: "An absolute pin — the knight is pinned to the king, so it cannot legally move at all. This is different from a relative pin (pinned to the queen), where the piece CAN move but shouldn't.",
  },
  {
    id: "q-skewer-1",
    scenario: "Your bishop checks the enemy king from a diagonal. The king moves out of the way, and your bishop captures the rook that was standing behind the king on the same diagonal.",
    answer: "skewer",
    distractors: ["pin", "fork", "discovered-attack"],
    explanation: "A skewer — the more valuable piece (the king) is in front, and when it moves, the less valuable piece behind it (the rook) gets captured. It's like a reverse pin.",
  },
  {
    id: "q-discovered-1",
    scenario: "You move your knight to give check. But the real threat is that moving the knight uncovered your rook, which is now attacking the enemy queen on the same file.",
    answer: "discovered-attack",
    distractors: ["fork", "pin", "zwischenzug"],
    explanation: "A discovered attack — moving one piece reveals an attack from another piece behind it. When the moving piece also gives check (like this knight), it's called a discovered check, which is devastating because the opponent must deal with the check while losing their queen.",
  },
  {
    id: "q-back-rank-1",
    scenario: "The enemy king is on g8, trapped behind its own pawns on f7, g7, and h7. You slide your rook to the 8th rank — the king has no escape squares. Checkmate!",
    answer: "back-rank-mate",
    distractors: ["smothered-mate", "pin", "skewer"],
    explanation: "A back rank mate — the king is trapped on the back rank by its own pawns, and a rook or queen delivers checkmate along the rank. One of the most common tactical patterns in chess!",
  },
  {
    id: "q-smothered-1",
    scenario: "The enemy king is on h8, completely boxed in by its own rook on g8 and pawns on g7 and h7. Your knight on f7 delivers checkmate — the king has zero squares.",
    answer: "smothered-mate",
    distractors: ["back-rank-mate", "fork", "deflection"],
    explanation: "A smothered mate — the king is surrounded ('smothered') by its own pieces, and a knight delivers the final blow. Only a knight can do this because it's the only piece that can check a completely boxed-in king.",
  },
  {
    id: "q-deflection-1",
    scenario: "The enemy queen is the only piece defending the back rank. You sacrifice your bishop, forcing the queen to capture it. Now the back rank is undefended, and your rook delivers checkmate.",
    answer: "deflection",
    distractors: ["decoy", "fork", "zwischenzug"],
    explanation: "A deflection — you forced the defending piece (the queen) away from its protective duty. The sacrifice was the key: giving up material to remove a crucial defender.",
  },
  {
    id: "q-zwischenzug-1",
    scenario: "Your opponent just captured your knight. Instead of recapturing immediately (the 'obvious' move), you play a check first, forcing the king to move. THEN you recapture the piece, coming out ahead.",
    answer: "zwischenzug",
    distractors: ["tempo", "deflection", "discovered-attack"],
    explanation: "A zwischenzug (in-between move) — instead of playing the expected recapture, you insert a stronger move first (usually a check or threat). It's one of the sneakiest tactics in chess!",
  },

  // --- Strategy ---
  {
    id: "q-development-1",
    scenario: "It's move 6 and you have three pieces developed (knight, bishop, and castled). Your opponent has only moved pawns — no pieces are off their starting squares yet.",
    answer: "development",
    distractors: ["tempo", "space", "center-control"],
    explanation: "Your opponent has neglected development — getting pieces off their starting squares to active positions. Every piece still on its home square is essentially not playing. Development speed is critical in the opening.",
  },
  {
    id: "q-tempo-1",
    scenario: "You develop your bishop to c4, attacking f7. Your opponent plays h6 (a move that doesn't develop anything). You've effectively gained time because your opponent wasted a move.",
    answer: "tempo",
    distractors: ["development", "prophylaxis", "space"],
    explanation: "You gained a tempo — a unit of time/moves. Your opponent's h6 didn't improve their position, while your Bc4 developed with a threat. Gaining tempi through threats is a key opening concept.",
  },
  {
    id: "q-prophylaxis-1",
    scenario: "You play ...a6 — a quiet pawn move that doesn't develop anything. But it prevents the opponent's knight from jumping to b5 and their bishop from checking on b5, which would have been very annoying.",
    answer: "prophylaxis",
    distractors: ["tempo", "development", "pawn-structure"],
    explanation: "Prophylaxis — a preventive move that stops the opponent's plan before they can execute it. ...a6 in the Sicilian Najdorf is one of the most famous prophylactic moves in chess.",
  },
  {
    id: "q-fianchetto-1",
    scenario: "You push your g-pawn one square, then place your bishop on g2. The bishop now controls the entire long diagonal from h1 to a8, influencing the center from the corner.",
    answer: "fianchetto",
    distractors: ["development", "center-control", "king-safety"],
    explanation: "A fianchetto — developing the bishop to the second rank of the knight file (g2 or b2 for White). The bishop becomes a long-range sniper on the diagonal. Used in the King's Indian, Catalan, and many modern openings.",
  },
  {
    id: "q-opposition-1",
    scenario: "It's a king and pawn endgame. Your king is on e4 and the enemy king is on e6 — directly facing each other with one square between them. It's your opponent's turn, so they must step aside and you can advance.",
    answer: "opposition",
    distractors: ["tempo", "space", "zwischenzug"],
    explanation: "The opposition — when two kings face each other with one square between them, the player who does NOT have to move has the advantage. The other king must step aside. This concept decides the outcome of many king and pawn endgames.",
  },

  // --- Rules ---
  {
    id: "q-stalemate-1",
    scenario: "You have a queen and king against a lone king. It's the opponent's turn but their king has NO legal moves — every square around it is covered. But the king is NOT in check. The game is a draw!",
    answer: "stalemate",
    distractors: ["checkmate", "check", "opposition"],
    explanation: "Stalemate — the player has no legal moves but is NOT in check. This is an immediate draw, no matter the material difference. Always be careful with a big advantage — accidentally stalemating your opponent throws away the win!",
  },
  {
    id: "q-en-passant-1",
    scenario: "Your pawn is on d4. The opponent advances their e-pawn two squares from e7 to e5, landing right beside your pawn. On your next move (and only your next move), you can capture it as if it only moved one square.",
    answer: "en-passant",
    distractors: ["promotion", "check", "deflection"],
    explanation: "En passant (French for 'in passing') — a special pawn capture that can only happen immediately after an opponent's pawn moves two squares forward and lands beside yours. It's one of the most misunderstood rules in chess!",
  },
  {
    id: "q-promotion-1",
    scenario: "Your pawn has reached the 8th rank — the very end of the board. It must now transform into a queen, rook, bishop, or knight of your choice.",
    answer: "promotion",
    distractors: ["en-passant", "castling", "check"],
    explanation: "Promotion — a pawn that reaches the opposite end of the board MUST be promoted to a queen, rook, bishop, or knight. Almost always a queen (the strongest piece), but occasionally a knight is chosen for a surprise checkmate!",
  },
];

/** Pick N random questions, shuffled */
export function getRandomQuestions(count: number): QuizQuestion[] {
  const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
