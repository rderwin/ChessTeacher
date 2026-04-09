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
      fen: "6k1/5pp1/8/8/8/8/8/4K2Q w - - 0 1",
      playerColor: "white",
      solution: ["Qh8#"],
      themes: ["mate-in-1", "back-rank-mate"],
      rating: 600,
      difficulty: "beginner",
      hint: "Use the open h-file to deliver a back rank mate.",
      explanation:
        "Qh8# slides the queen along the h-file to the 8th rank. The black king on g8 is trapped: f8 and h8 are controlled by the queen on the 8th rank, and f7/g7 are blocked by its own pawns.",
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
    // --- Queen mates supported by king (4-6) ---
    {
      id: "m1-004",
      fen: "k7/8/KQ6/8/8/8/8/8 w - - 0 1",
      playerColor: "white",
      solution: ["Qb8#"],
      themes: ["mate-in-1"],
      rating: 650,
      difficulty: "beginner",
      hint: "Use your queen to deliver check while the king cuts off escape.",
      explanation:
        "Qb8# puts the king in check from b8. The white king on a6 controls a7 and b7, leaving the black king with no escape squares.",
      source: "handcrafted",
    },
    {
      id: "m1-005",
      fen: "8/8/8/8/8/k7/8/KQ6 w - - 0 1",
      playerColor: "white",
      solution: ["Qb3#"],
      themes: ["mate-in-1"],
      rating: 700,
      difficulty: "beginner",
      hint: "The queen can cut off the king from all directions.",
      explanation:
        "Qb3# delivers check along the b-file. The white king on a1 covers a2 and b2. The queen on b3 covers a3, a4, b4, leaving no escape for the black king.",
      source: "handcrafted",
    },
    {
      id: "m1-006",
      fen: "8/8/8/8/8/8/1k6/KR6 w - - 0 1",
      playerColor: "white",
      solution: ["Rb2#"],
      themes: ["mate-in-1"],
      rating: 700,
      difficulty: "beginner",
      hint: "Pin the enemy king against the edge with your rook.",
      explanation:
        "Rb2# delivers check along the 2nd rank. The black king on b2 is checked, but it is actually the rook moving to b2 giving check. The king on a1 prevents Ka2, and the rook controls the entire 2nd rank and b-file.",
      source: "handcrafted",
    },
    // --- Rook mates with king support (7-9) ---
    {
      id: "m1-007",
      fen: "1k6/8/1K6/8/8/8/8/R7 w - - 0 1",
      playerColor: "white",
      solution: ["Ra8#"],
      themes: ["mate-in-1"],
      rating: 650,
      difficulty: "beginner",
      hint: "The rook can reach the 8th rank in one move.",
      explanation:
        "Ra8# places the rook on the back rank with check. The white king on b6 covers a7, b7, and c7. The rook controls the entire 8th rank, including c8. The black king is completely trapped.",
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
        "Rf8# delivers checkmate. The rook controls the entire 8th rank, and the white king on d6 covers c7, d7, and e7, leaving no escape for the black king.",
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
    // --- Two-rook ladder mate (10) ---
    {
      id: "m1-010",
      fen: "k7/8/8/8/8/8/1R6/1R1K4 w - - 0 1",
      playerColor: "white",
      solution: ["Ra1#"],
      themes: ["mate-in-1"],
      rating: 700,
      difficulty: "beginner",
      hint: "Use both rooks to create a barrier the king can't cross.",
      explanation:
        "Ra1# delivers check along the a-file. The rook on b2 controls the entire b-file (including b8 and b7), cutting off all escape. The black king on a8 has nowhere to go.",
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
    // --- Pawn promotion mates (13-14) ---
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
        "f8=Q# promotes the f-pawn to a queen on f8, delivering check. The new queen controls the entire 8th rank (including h8) and the f-file (including f7). With g7 occupied by a white pawn and h7 by a black pawn, the king has no escape.",
      source: "handcrafted",
    },
    {
      id: "m1-014",
      fen: "2k5/3P4/2K5/8/8/8/8/8 w - - 0 1",
      playerColor: "white",
      solution: ["d8=Q#"],
      themes: ["mate-in-1"],
      rating: 800,
      difficulty: "beginner",
      hint: "Promote with check while the king has no room.",
      explanation:
        "d8=Q# promotes the d-pawn to a queen, delivering check from d8. The white king on c6 controls b7 and d7. The new queen controls the entire 8th rank (including b8). The black king on c8 is completely boxed in.",
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
