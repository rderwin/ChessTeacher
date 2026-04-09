import type { PuzzleSet } from "../types";

export const backRankMates: PuzzleSet = {
  id: "back-rank-mates",
  name: "Back Rank Mates",
  description: "Exploit a king trapped behind its own pawns.",
  icon: "\uD83C\uDFF0",
  themes: ["back-rank-mate"],
  difficulty: "beginner",
  puzzles: [
    // --- Rook delivers mate on open back rank (1-4) ---
    {
      // White Rd1 -> Rd8#. King g8 trapped by f7,g7,h7.
      // FEN rank8: 6k1 = ...empty...kg. (g8=k, h8=empty? No: 6=a-f empty, k=g8, 1=h8 empty)
      // rank2: empty. rank1: 3RK3 = a1-c1 empty, Rd1, Ke1, f1-h1 empty.
      // Rd1->d8: open d-file, legal. d8 checks g8? Rook on d8 controls entire 8th rank.
      // g8 king escapes: f8(8th rank-controlled), h8(8th rank-controlled), f7(own pawn), g7(own pawn), h7(own pawn). No escape. Checkmate.
      id: "br-001",
      fen: "6k1/5ppp/8/8/8/8/8/3RK3 w - - 0 1",
      playerColor: "white",
      solution: ["Rd8#"],
      themes: ["back-rank-mate"],
      rating: 600,
      difficulty: "beginner",
      hint: "The d-file is wide open to the 8th rank.",
      explanation:
        "Rd8# slides the rook to the 8th rank. The king on g8 is trapped behind its own pawns on f7, g7, h7, and the rook controls every square on the 8th rank.",
      source: "handcrafted",
    },
    {
      // White Ra1 -> Ra8#. King g8 trapped by f7,g7,h7.
      // rank1: R3K3 = Ra1, b1-d1 empty, Ke1, f1-h1 empty.
      // Ra1->a8: open a-file, legal. Rook on a8 controls entire 8th rank.
      // Same logic as puzzle 1 but rook on a-file.
      id: "br-002",
      fen: "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
      playerColor: "white",
      solution: ["Ra8#"],
      themes: ["back-rank-mate"],
      rating: 600,
      difficulty: "beginner",
      hint: "The king is trapped behind its own pawns. Use the open file.",
      explanation:
        "Ra8# delivers checkmate on the back rank. The rook controls the entire 8th rank, and the black king on g8 cannot escape because f7, g7, and h7 are blocked by its own pawns.",
      source: "handcrafted",
    },
    {
      // White Re7 -> Re8#. King g8 trapped by f7,g7,h7.
      // FEN: 6k1/4Rppp/8/8/8/8/8/4K3
      // rank8: 6k1 = g8=king. rank7: 4Rppp = e7=Rook, f7=p, g7=p, h7=p.
      // Re7->e8: one square forward on e-file. Legal (e8 is empty).
      // Re8 checks g8: rook on 8th rank controls entire rank.
      // Escapes: f8(8th rank), h8(8th rank), f7(pawn), g7(pawn), h7(pawn). All blocked. Mate.
      id: "br-003",
      fen: "6k1/4Rppp/8/8/8/8/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Re8#"],
      themes: ["back-rank-mate"],
      rating: 650,
      difficulty: "beginner",
      hint: "Your rook is one square away from the back rank.",
      explanation:
        "Re8# pushes the rook to the 8th rank with checkmate. The king on g8 is hemmed in by its own pawns on f7, g7, h7 and the rook seals off the entire back rank.",
      source: "handcrafted",
    },
    {
      // White Rd7 -> Rd8#. King g8 trapped by f7,g7,h7.
      // FEN: 6k1/3R1ppp/8/8/8/8/8/4K3
      // rank7: 3R1ppp = d7=Rook, e7=empty, f7=p, g7=p, h7=p.
      // Rd7->d8: one square up. d8 is empty. Legal.
      // Rook on d8 controls entire 8th rank. Same mate pattern.
      id: "br-004",
      fen: "6k1/3R1ppp/8/8/8/8/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Rd8#"],
      themes: ["back-rank-mate"],
      rating: 650,
      difficulty: "beginner",
      hint: "Slide one square to the back rank.",
      explanation:
        "Rd8# delivers checkmate. The rook advances one square to the 8th rank, and the black king on g8 has no escape with pawns on f7, g7, h7 blocking all retreat squares.",
      source: "handcrafted",
    },
    // --- Queen delivers back rank mate (5-6) ---
    {
      // White Qh1 -> Qh8#. King g8 trapped. No h-pawn so h-file open.
      // FEN: 6k1/5pp1/8/8/8/8/8/4K2Q
      // rank8: g8=king. rank7: 5pp1 = f7=p, g7=p, h7=empty.
      // rank1: 4K2Q = Ke1, Qh1.
      // Qh1->h8: open h-file, legal. Queen on h8 checks g8.
      // Escapes: f8(queen controls diag a3-f8? No, queen on h8 controls 8th rank: a8-h8. f8 controlled.)
      // h7 is empty but queen on h8 controls h7 too. g7=pawn. f7=pawn. f8=8th rank. All blocked. Mate.
      id: "br-005",
      fen: "6k1/5pp1/8/8/8/8/8/4K2Q w - - 0 1",
      playerColor: "white",
      solution: ["Qh8#"],
      themes: ["back-rank-mate"],
      rating: 650,
      difficulty: "beginner",
      hint: "The h-file is open. Use your queen to invade.",
      explanation:
        "Qh8# delivers checkmate. The queen slides up the open h-file to the 8th rank. The king on g8 is blocked by pawns on f7 and g7, and the queen controls the entire 8th rank plus f8.",
      source: "handcrafted",
    },
    {
      // White Qa2 -> Qa8#. King g8 trapped by f7,g7,h7.
      // FEN: 6k1/5ppp/8/8/8/8/Q7/4K3
      // rank2: Q7 = Qa2. rank1: 4K3 = Ke1.
      // Qa2->a8: open a-file and a2-a8 path clear. Legal.
      // Qa8 controls entire 8th rank. Same pattern. Mate.
      id: "br-006",
      fen: "6k1/5ppp/8/8/8/8/Q7/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Qa8#"],
      themes: ["back-rank-mate"],
      rating: 650,
      difficulty: "beginner",
      hint: "Your queen can sweep across to the back rank.",
      explanation:
        "Qa8# sends the queen to the far corner of the 8th rank. The rook-like power of the queen seals the entire back rank, and the king on g8 is trapped behind its own pawns.",
      source: "handcrafted",
    },
    // --- Back rank mate with capture (7) ---
    {
      // White Ra1 captures black rook on a8: Rxa8#.
      // FEN: r5k1/5ppp/8/8/8/8/8/R3K3
      // rank8: r5k1 = ra8, b-f8 empty, kg8, h8 empty.
      // rank1: R3K3 = Ra1, Ke1.
      // Ra1 x a8: captures black rook. Legal. Rook on a8 controls 8th rank.
      // g8 king: f8(8th rank), h8(8th rank), f7(pawn), g7(pawn), h7(pawn). All blocked. Mate.
      id: "br-007",
      fen: "r5k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
      playerColor: "white",
      solution: ["Rxa8#"],
      themes: ["back-rank-mate"],
      rating: 700,
      difficulty: "beginner",
      hint: "Capture on the back rank to deliver mate.",
      explanation:
        "Rxa8# captures the black rook and delivers checkmate in one stroke. The white rook now controls the entire 8th rank, trapping the king behind its wall of pawns.",
      source: "handcrafted",
    },
    // --- Back rank mate with rook on f8 blocking (8) ---
    {
      // FEN: 5rk1/5ppp/8/8/8/8/8/R3K3
      // rank8: 5rk1 = rf8, kg8, h8 empty. Black's own rook on f8 blocks that escape.
      // Ra1->a8: open a-file. Legal. Ra8 controls 8th rank.
      // g8 king escapes: f8(own rook), h8(Ra8 controls), f7(pawn), g7(pawn), h7(pawn). Mate!
      id: "br-008",
      fen: "5rk1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
      playerColor: "white",
      solution: ["Ra8#"],
      themes: ["back-rank-mate"],
      rating: 700,
      difficulty: "beginner",
      hint: "Black's own rook helps trap its king.",
      explanation:
        "Ra8# is checkmate. The black king on g8 is trapped by its own pieces: the rook on f8 blocks that escape square, pawns cover f7/g7/h7, and the white rook controls the entire 8th rank.",
      source: "handcrafted",
    },
    // --- Queen on 7th rank stepping to 8th (9) ---
    {
      // White Qe7 -> Qe8#. King g8 trapped by f7,g7,h7.
      // FEN: 6k1/4Qppp/8/8/8/8/8/4K3
      // rank7: 4Qppp = Qe7, f7=p, g7=p, h7=p.
      // Qe7->e8: one square. e8 is empty. Legal.
      // Qe8 checks g8: queen controls 8th rank, plus diagonals.
      // Escapes: f8(queen on 8th rank), h8(queen on 8th rank), f7(pawn), g7(pawn), h7(pawn), h7(pawn). Mate.
      id: "br-009",
      fen: "6k1/4Qppp/8/8/8/8/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Qe8#"],
      themes: ["back-rank-mate"],
      rating: 650,
      difficulty: "beginner",
      hint: "Your queen is one step from the back rank.",
      explanation:
        "Qe8# advances the queen to the 8th rank. The queen commands the entire rank plus diagonals, leaving the king on g8 with no escape behind its pawn wall.",
      source: "handcrafted",
    },
    // --- Black to move back rank mate (10) ---
    {
      // Black rook delivers back rank mate on white king.
      // FEN: 4k3/8/8/8/8/8/PPP5/R1K2r2
      // rank1: R1K2r2 = Ra1, b1=empty, Kc1, d1-e1 empty, rf1, g1-h1 empty.
      // rank2: PPP5 = Pa2, Pb2, Pc2, d2-h2 empty.
      // Black's rf1 -> ...Rd1#? No, wait. rf1 is on f1. Can it go to a1? Ra1 blocks. b1? b1 is empty.
      // Actually let me think: Black rook on f1. White king on c1. Pawns on a2,b2,c2 trap white king.
      // ...Rf1-c1? No, king is on c1.
      // ...Rf1-b1? Nope, a1 has white rook, and b1... rook on b1 doesn't check c1.
      // Wait, I need the rook to check on the 1st rank. Rc1+? King is ON c1.
      // Let me redo: White king on g1, pawns on f2,g2,h2. Black rook on a1.
      // FEN: 4k3/8/8/8/8/8/5PPP/r5K1
      // rank1: r5K1 = ra1, b1-f1 empty, Kg1, h1 empty.
      // rank2: 5PPP = f2=P, g2=P, h2=P.
      // ...Ra1-a1 is where it already is. Need rook on a different file.
      // Black rook on d8: FEN: 3rk3/8/8/8/8/8/5PPP/6K1
      // ...Rd1#. Rook d8->d1. Kg1 is checked. f1(rook controls 1st rank), h1(rook controls), f2(pawn), g2(pawn), h2(pawn). Mate!
      id: "br-010",
      fen: "3rk3/8/8/8/8/8/5PPP/6K1 b - - 0 1",
      playerColor: "black",
      solution: ["Rd1#"],
      themes: ["back-rank-mate"],
      rating: 650,
      difficulty: "beginner",
      hint: "The white king is trapped behind its own pawns too.",
      explanation:
        "Rd1# is a back rank mate in reverse. The black rook sweeps to the 1st rank, and the white king on g1 is trapped behind its own pawns on f2, g2, h2 with no escape.",
      source: "handcrafted",
    },
  ],
};
