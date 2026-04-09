import type { PuzzleSet } from "../types";

export const mateInOne: PuzzleSet = {
  id: "mate-in-one",
  name: "Mate in 1",
  description: "Find the single move that delivers checkmate.",
  icon: "\u265A",
  themes: ["mate-in-1"],
  difficulty: "beginner",
  puzzles: [
    // --- Back rank mates (1-3) ---
    {
      id: "m1-001",
      fen: "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
      playerColor: "white",
      solution: ["Ra8#"],
      themes: ["mate-in-1", "back-rank-mate"],
      rating: 600,
      difficulty: "beginner",
      hint: "The king is trapped behind its own pawns.",
      explanation:
        "Ra8# delivers checkmate on the back rank. The black king on g8 cannot escape because f7, g7, and h7 are blocked by its own pawns, and the rook controls the entire 8th rank.",
      source: "handcrafted",
    },
    {
      id: "m1-002",
      fen: "6k1/5ppp/8/8/8/8/8/3QK3 w - - 0 1",
      playerColor: "white",
      solution: ["Qd8#"],
      themes: ["mate-in-1", "back-rank-mate"],
      rating: 600,
      difficulty: "beginner",
      hint: "The d-file is wide open to the back rank.",
      explanation:
        "Qd8# slides the queen to the 8th rank. The black king on g8 is trapped behind its own pawns on f7, g7, and h7, with no escape from the queen controlling the entire back rank.",
      source: "handcrafted",
    },
    {
      id: "m1-003",
      fen: "6k1/5ppp/8/8/8/8/Q7/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Qa8#"],
      themes: ["mate-in-1", "back-rank-mate"],
      rating: 650,
      difficulty: "beginner",
      hint: "The queen can sweep across to the back rank.",
      explanation:
        "Qa8# places the queen on the 8th rank. The king on g8 cannot escape: every square on the 8th rank is controlled by the queen, and f7, g7, h7 are blocked by its own pawns.",
      source: "handcrafted",
    },
    // --- Queen mates supported by king (4-5) ---
    {
      id: "m1-004",
      fen: "k7/8/1K6/8/8/8/8/6Q1 w - - 0 1",
      playerColor: "white",
      solution: ["Qg8#"],
      themes: ["mate-in-1"],
      rating: 700,
      difficulty: "beginner",
      hint: "Use the queen to seal the back rank while your king cuts off escape.",
      explanation:
        "Qg8# delivers check on the 8th rank. The white king on b6 controls a7 and b7, and the queen controls the entire 8th rank including b8. The black king on a8 is completely trapped.",
      source: "handcrafted",
    },
    {
      id: "m1-005",
      fen: "Q7/8/8/8/8/6K1/6P1/7k w - - 0 1",
      playerColor: "white",
      solution: ["Qa1#"],
      themes: ["mate-in-1"],
      rating: 700,
      difficulty: "beginner",
      hint: "Drive the queen to the back rank while your king and pawn block escape.",
      explanation:
        "Qa1# delivers check on the 1st rank. The white king on g3 covers g2 and h2. The pawn on g2 blocks that square. The queen controls the entire 1st rank, leaving the black king on h1 with no escape.",
      source: "handcrafted",
    },
    // --- Rook mates with king support (6-9) ---
    {
      id: "m1-006",
      fen: "R7/8/8/8/8/6K1/8/7k w - - 0 1",
      playerColor: "white",
      solution: ["Ra1#"],
      themes: ["mate-in-1"],
      rating: 650,
      difficulty: "beginner",
      hint: "Swing the rook down to the 1st rank.",
      explanation:
        "Ra1# delivers check along the 1st rank. The white king on g3 controls g2 and h2, and the rook controls the entire 1st rank, trapping the black king on h1.",
      source: "handcrafted",
    },
    {
      id: "m1-007",
      fen: "k7/8/K7/8/8/8/8/7R w - - 0 1",
      playerColor: "white",
      solution: ["Rh8#"],
      themes: ["mate-in-1"],
      rating: 650,
      difficulty: "beginner",
      hint: "The rook can reach the 8th rank from the other side of the board.",
      explanation:
        "Rh8# delivers check on the 8th rank. The white king on a6 controls a7 and b7. The rook controls the entire 8th rank including b8. The black king on a8 has nowhere to go.",
      source: "handcrafted",
    },
    {
      id: "m1-008",
      fen: "3k4/8/3K4/8/8/8/8/5R2 w - - 0 1",
      playerColor: "white",
      solution: ["Rf8#"],
      themes: ["mate-in-1"],
      rating: 650,
      difficulty: "beginner",
      hint: "Drive the rook to the back rank.",
      explanation:
        "Rf8# delivers checkmate. The rook controls the entire 8th rank, and the white king on d6 covers c7, d7, and e7, leaving no escape for the black king on d8.",
      source: "handcrafted",
    },
    {
      id: "m1-009",
      fen: "4k3/8/4K3/8/8/8/8/6R1 w - - 0 1",
      playerColor: "white",
      solution: ["Rg8#"],
      themes: ["mate-in-1"],
      rating: 650,
      difficulty: "beginner",
      hint: "One rook move seals the back rank.",
      explanation:
        "Rg8# places the rook on the 8th rank with check. The white king on e6 covers d7, e7, and f7. The rook controls d8, f8, and the rest of the 8th rank. No escape for the black king.",
      source: "handcrafted",
    },
    // --- Bishop+queen battery: Scholar's Mate (10) ---
    {
      id: "m1-010",
      fen: "rnbqkb1r/pppp1ppp/5n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
      playerColor: "white",
      solution: ["Qxf7#"],
      themes: ["mate-in-1"],
      rating: 800,
      difficulty: "beginner",
      hint: "The f7 pawn is only defended by the king. Can you exploit that?",
      explanation:
        "Qxf7# captures the f7 pawn with the queen, delivering check. The bishop on c4 protects the queen on f7. The black king cannot escape: e7 is covered by the queen, f8 is covered by the queen along the f-file, and d8 is blocked by the black queen.",
      source: "handcrafted",
    },
    // --- Rook back rank mate (11) ---
    {
      id: "m1-011",
      fen: "6k1/5ppp/8/8/8/8/8/3RK3 w - - 0 1",
      playerColor: "white",
      solution: ["Rd8#"],
      themes: ["mate-in-1", "back-rank-mate"],
      rating: 650,
      difficulty: "beginner",
      hint: "The d-file is wide open to the 8th rank.",
      explanation:
        "Rd8# slides the rook to the 8th rank. The black king on g8 is trapped behind its own pawns on f7, g7, and h7, and the rook controls the entire back rank.",
      source: "handcrafted",
    },
    // --- Smothered mate with knight (12) ---
    {
      id: "m1-012",
      fen: "6rk/6pp/7N/8/8/8/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Nf7#"],
      themes: ["mate-in-1", "smothered-mate"],
      rating: 900,
      difficulty: "beginner",
      hint: "The king is completely surrounded by its own pieces.",
      explanation:
        "Nf7# is a classic smothered mate. The knight hops to f7, delivering check to the king on h8. The black king is smothered by its own pieces: the rook on g8 blocks g8, and the pawns on g7 and h7 block the remaining squares.",
      source: "handcrafted",
    },
    // --- Pawn promotion to mate (13) ---
    {
      id: "m1-013",
      fen: "6k1/5PPp/8/8/8/8/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["f8=Q#"],
      themes: ["mate-in-1"],
      rating: 850,
      difficulty: "beginner",
      hint: "One of your pawns can promote with check.",
      explanation:
        "f8=Q# promotes the f-pawn to a queen on f8, delivering check. The new queen controls the entire 8th rank (including h8) and the f-file. With g7 occupied by a white pawn and h7 by a black pawn, the king on g8 has no escape.",
      source: "handcrafted",
    },
    // --- Knight-assisted queen mate (14) ---
    {
      id: "m1-014",
      fen: "6k1/7p/5Q2/6N1/8/8/8/4KR2 w - - 0 1",
      playerColor: "white",
      solution: ["Qf8#"],
      themes: ["mate-in-1"],
      rating: 900,
      difficulty: "beginner",
      hint: "The queen can deliver check while the knight and rook control key squares.",
      explanation:
        "Qf8# delivers check to the king on g8. The rook on f1 protects the queen via the f-file. The knight on g5 covers the key escape squares e6 and h7. The h7 pawn blocks its own square, leaving the black king completely trapped.",
      source: "handcrafted",
    },
    // --- Black to move: rook + king (15) ---
    {
      id: "m1-015",
      fen: "4K3/8/4k3/8/8/8/8/r7 b - - 0 1",
      playerColor: "black",
      solution: ["Ra8#"],
      themes: ["mate-in-1"],
      rating: 650,
      difficulty: "beginner",
      hint: "Drive your rook to the back rank.",
      explanation:
        "Ra8# delivers checkmate. The rook controls the entire 8th rank, and the black king on e6 covers d7, e7, and f7, leaving the white king on e8 with no escape.",
      source: "handcrafted",
    },
  ],
};
