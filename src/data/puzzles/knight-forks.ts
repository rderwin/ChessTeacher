import type { PuzzleSet } from "../types";

export const knightForks: PuzzleSet = {
  id: "knight-forks",
  name: "Knight Forks 101",
  description: "Find the knight move that attacks two pieces at once.",
  icon: "\uD83C\uDF74",
  themes: ["fork"],
  difficulty: "beginner",
  puzzles: [
    // --- Royal forks: king + queen (1-4) ---
    {
      // White Ne5 -> Nf7+ forks Kh8 and Qd8
      // e5->f7: (1,2) valid. f7 attacks h8 (2,1) and d8 (2,1).
      id: "kf-001",
      fen: "3q3k/8/8/4N3/8/8/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Nf7+", "Kg8", "Nxd8"],
      themes: ["fork"],
      rating: 800,
      difficulty: "beginner",
      hint: "Look for a knight check that also attacks the queen.",
      explanation:
        "Nf7+ is a royal fork. The knight checks the king on h8 and simultaneously attacks the queen on d8. After the king moves, White captures the queen.",
      source: "handcrafted",
    },
    {
      // White Ng4 -> Nf6+ forks Ke8 and Qd7
      // g4->f6: (1,2) valid. f6 attacks e8 (1,2) and d7 (2,1).
      id: "kf-002",
      fen: "4k3/3q4/8/8/6N1/8/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Nf6+", "Ke7", "Nxd7"],
      themes: ["fork"],
      rating: 800,
      difficulty: "beginner",
      hint: "Your knight can land on a square that checks the king and hits the queen.",
      explanation:
        "Nf6+ delivers check to the king on e8 while attacking the queen on d7. The king must move out of check, and White wins the queen with Nxd7.",
      source: "handcrafted",
    },
    {
      // Black Nf4 -> Ne2+ forks Kd4 and Qc1
      // f4->e2: (1,2) valid. e2 attacks d4 (1,2) and c1 (2,1).
      id: "kf-003",
      fen: "4k3/8/8/8/3K1n2/8/8/2Q5 b - - 0 1",
      playerColor: "black",
      solution: ["Ne2+", "Kc5", "Nxc1"],
      themes: ["fork"],
      rating: 900,
      difficulty: "beginner",
      hint: "Your knight can check the king while eyeing the queen.",
      explanation:
        "Ne2+ checks the white king on d4 and attacks the queen on c1. After the king retreats, Black captures the queen.",
      source: "handcrafted",
    },
    {
      // White Nd3 -> Ne5+ forks Kd7 and Qg4
      // d3->e5: (1,2) valid. e5 attacks d7 (1,2) and g4 (2,1).
      id: "kf-004",
      fen: "8/3k4/8/8/6q1/3N4/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Ne5+", "Ke7", "Nxg4"],
      themes: ["fork"],
      rating: 850,
      difficulty: "beginner",
      hint: "Centralize your knight with check.",
      explanation:
        "Ne5+ checks the king on d7 and attacks the queen on g4. The king must deal with the check, allowing White to capture the queen next move.",
      source: "handcrafted",
    },
    // --- King + rook forks (5-8) ---
    {
      // White Nd4 -> Ne6+ forks Kf8 and Rd8
      // d4->e6: (1,2) valid. e6 attacks f8 (1,2) and d8 (1,2).
      id: "kf-005",
      fen: "3r1k2/8/8/8/3N4/8/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Ne6+", "Ke7", "Nxd8"],
      themes: ["fork"],
      rating: 850,
      difficulty: "beginner",
      hint: "Jump your knight forward with check to attack the rook.",
      explanation:
        "Ne6+ checks the king on f8 and attacks the rook on d8. After the king steps away, White captures the rook.",
      source: "handcrafted",
    },
    {
      // White Nb5 -> Nc7+ forks Ke8 and Ra8
      // b5->c7: (1,2) valid. c7 attacks e8 (2,1) and a8 (2,1).
      id: "kf-006",
      fen: "r3k3/8/8/1N6/8/8/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Nc7+", "Kd8", "Nxa8"],
      themes: ["fork"],
      rating: 800,
      difficulty: "beginner",
      hint: "Your knight can invade with check and threaten the corner rook.",
      explanation:
        "Nc7+ checks the king on e8 and attacks the rook on a8. The king must move, and White picks up the rook for free.",
      source: "handcrafted",
    },
    {
      // White Nf3 -> Ne5+ forks Kd7 and Rc4
      // f3->e5: (1,2) valid. e5 attacks d7 (1,2) and c4 (2,1).
      id: "kf-007",
      fen: "8/3k4/8/8/2r5/5N2/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Ne5+", "Kd6", "Nxc4+"],
      themes: ["fork"],
      rating: 900,
      difficulty: "intermediate",
      hint: "A centralized knight with check can win the rook.",
      explanation:
        "Ne5+ checks the king on d7 and attacks the rook on c4. After the king moves, Nxc4+ captures the rook and even delivers another check!",
      source: "handcrafted",
    },
    {
      // Black Ng4 -> Nf2+ forks Ke1 and Rh1
      // g4->f2: (1,2) valid. f2 attacks e1... wait, let me verify.
      // g=7, f=6, diff=1. 4->2=2. (1,2) valid.
      // f2 attacks: d1, d3, e4, g4, h1, h3.
      // Does f2 attack e1? f=6, e=5, diff=1. 2->1=1. (1,1) NOT valid.
      // So f2 does NOT attack e1. Let me pick a different setup.
      //
      // Black Ng4 -> Nf2, forking Kd1 and Rh1.
      // f2 attacks d1 (2,1) and h1 (2,1). Yes!
      id: "kf-008",
      fen: "4k3/8/8/8/6n1/8/8/3K3R b - - 0 1",
      playerColor: "black",
      solution: ["Nf2+", "Ke2", "Nxh1"],
      themes: ["fork"],
      rating: 850,
      difficulty: "beginner",
      hint: "Drop the knight in close to fork the king and rook.",
      explanation:
        "Nf2+ checks the king on d1 and attacks the rook on h1. After the king moves, Black captures the rook.",
      source: "handcrafted",
    },
    // --- Non-check forks: queen + rook (9-10) ---
    {
      // White Nc3 -> Nd5 forks Qf6 and Rb4
      // c3->d5: (1,2) valid. d5 attacks f6 (2,1) and b4 (2,1).
      id: "kf-009",
      fen: "4k3/8/5q2/8/1r6/2N5/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Nd5"],
      themes: ["fork"],
      rating: 900,
      difficulty: "intermediate",
      hint: "One central square attacks two black pieces.",
      explanation:
        "Nd5 forks the queen on f6 and the rook on b4. Black cannot save both pieces, so White wins material.",
      source: "handcrafted",
    },
    {
      // White Nd3 -> Ne5 forks Qc6 and Rf7
      // d3->e5: (1,2) valid. e5 attacks c6 (2,1) and f7 (1,2).
      id: "kf-010",
      fen: "4k3/5r2/2q5/8/8/3N4/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Ne5"],
      themes: ["fork"],
      rating: 900,
      difficulty: "intermediate",
      hint: "A powerful central knight can attack in many directions.",
      explanation:
        "Ne5 attacks both the queen on c6 and the rook on f7 simultaneously. Black must lose one of them.",
      source: "handcrafted",
    }
  ],
};
