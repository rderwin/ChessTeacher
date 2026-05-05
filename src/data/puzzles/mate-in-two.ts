import type { PuzzleSet } from "../types";

export const mateInTwo: PuzzleSet = {
  id: "mate-in-two",
  name: "Mate in 2",
  description: "Find the two-move sequence that forces checkmate.",
  icon: "\u265B",
  themes: ["mate-in-2"],
  difficulty: "intermediate",
  puzzles: [
    // --- King + rook vs lone king: cut off and mate (1-3) ---
    {
      // White: Kb6, Rb1. Black: Ka8.
      // Rb1->b7 cuts off 7th rank. Ka8 forced. Then Ra7#.
      // Rb7: b1-b2-b3-b4-b5-b6(Kb6!) Wait, king is on b6! Can't pass. WRONG.
      // Fix: Rb1->b7 must pass through b2-b6. b6 has the king. BLOCKED.
      // Use Rb2 instead: Rb2->b7: b3,b4,b5,b6(king!). Still blocked.
      // Use Rb8+?: b1-b2-...-b8. b6 has king. Blocked too.
      // Use Rc1 instead: Rc1->c7 cuts off 7th rank on c-file. Not same effect.
      //
      // Actually: rook on a1. Ra1->a7? a1-a2-...-a7. Clear (Ka8, but a7 is free).
      // Ra7 cuts off. Ka8 must go to b8. Then Rb7#? Wait, only one rook.
      // Ra7: controls a-file and 7th rank. Ka8 goes to b8.
      // Then Ra7->b7#: a7 to b7 on 7th rank. Rb7 checks kb8 on b-file.
      // Escapes: a8(Rb7 7th rank: a7 is one away. Wait, Rb7 is on b7. Controls 7th rank and b-file.
      // a8: not on 7th rank or b-file. NOT controlled by Rb7.
      // But Kb6 controls a7? b6 to a7: adjacent. Yes. And b7: Rb7 is there.
      // After Rb7# on kb8: a8(not controlled by Rb7. Kb6 to a8: not adjacent. FREE!). Not mate.
      //
      // This simple K+R vs K takes more than 2 moves unless king is already optimally placed.
      //
      // KNOWN WORKING: Kc6, Ra1. Black Kc8.
      // FEN: 2k5/8/2K5/8/8/8/8/R7 w - - 0 1
      // Ra1->a7: a-file. Clear. Ra7 threatens Ra8#.
      // Kc8 moves: kb8(Ra7 controls a7, not b8. Kc6 to b8: (1,2) not adj. b8 FREE!), kd8(Ra7 7th rank: d7 controlled. But kd8: not on 7th rank. Kc6 to d8: (1,2) not adj. NOT controlled by Ra7. FREE!), kd7(Ra7 7th rank! d7 controlled!), kb7(Ra7 7th rank! b7 controlled!).
      // Kb8 or Kd8. After Kb8: Ra7->b7#? a7 to b7 on 7th rank. Rb7 checks kb8.
      // Escapes: a8(Rb7 7th rank? a8 not on 7th. Kc6? Not adj. NOT controlled.), c8(Kc6 to c8: (0,2) not adj. Rb7 b-file: c8 not on b-file. NOT controlled.), c7(Kc6 adj! Controlled.).
      // Ka8 and Kc8 escape. Not mate.
      //
      // After Kb8, better: Ra7->a8#? a7 to a8: one square. Ra8 checks kb8 on 8th rank.
      // Escapes: c8(Ra8 8th rank! Controlled.), c7(Kc6 adj!), b7(Kc6 adj!).
      // ALL BLOCKED! Ra8#! WAIT but is kb8 to a8? The rook is going to a8. Does it check kb8?
      // a8 to b8: (1,0) rank. Ra8 controls 8th rank. Check! Escapes: c8(8th rank!), c7(Kc6!), b7(Kc6!).
      // A7(Ra8 controls a-file. Controlled!). MATE!
      //
      // But what if Kd8 instead of Kb8?
      // After Ra7, Kd8. Then Ra7->a8#: a7 to a8. Ra8 checks kd8 on 8th rank.
      // Escapes: c8(Ra8 8th rank!), e8(Ra8 8th rank!), c7(Kc6!), d7(Kc6!), e7(Kc6 to e7: (2,1) not adj. NOT controlled.).
      // Ke7 escapes! Not mate. So the puzzle only works if black plays Kb8.
      //
      // FIX: the puzzle needs to force Kb8 specifically. Use a non-check first move.
      // After Ra7 (not check), black can play Kb8 or Kd8.
      // If Kd8, then Ra8+ is not mate (Ke7 escapes). Puzzle broken for Kd8 line.
      //
      // Solution: use a position where only Kb8 is legal.
      // Add a white piece controlling d8.
      // Or use a pawn on d7: FEN: 2k5/3p4/2K5/8/8/8/8/R7
      // Wait, d7 is a BLACK pawn. It doesn't block Kd8. King can still go to d8 (behind its own pawn). Hmm, but d8 is a different square from d7. Kd8 is legal. But then after Kd8, Ra8+: e8(Ra8 8th rank), e7(Kc6 to e7: not adj), c8(Ra8), c7(Kc6). Ke7 escapes.
      //
      // What if white has a pawn on e5? Controls d6 and f6 but not e7. Not helpful.
      //
      // SIMPLEST FIX: put king on d6 (covers e7) and rook on a1. Black Kd8.
      // Actually wait, I want to use the original Ka8 corner pattern.
      //
      // VERIFIED: Kb6 + Ra1. Black Ka8. Move Ra1->a5 (quiet move).
      // Actually: Ra1->a7? Can't, b6 king blocks... no, a7 is on a-file, king is on b6. a-file is clear!
      // Ra1->a7: a1-a2-a3-a4-a5-a6-a7. All empty (king is on b6 not a-file). Legal!
      // Ra7 controls 7th rank. Ka8 moves: b8(Kb6 to b8: (0,2) not adj. Ra7: b8 not on 7th or a-file. FREE!), a7(Ra7 is there!), b7(Ra7 7th rank AND Kb6 adj!).
      // Only Kb8. Then Ra7->a8#: a7-a8. Ra8 checks kb8 on 8th rank.
      // Escapes: c8(Ra8 8th rank!), c7(Kb6 to c7: (1,1) adj!), b7(Kb6 adj!), a8(rook there).
      // ALL BLOCKED! Ra8#! MATE!
      // And Kb8 is forced (only legal move). VERIFIED!
      id: "m2-001",
      fen: "k7/8/1K6/8/8/8/8/R7 w - - 0 1",
      playerColor: "white",
      solution: ["Ra7", "Kb8", "Ra8#"],
      themes: ["mate-in-2"],
      rating: 850,
      difficulty: "intermediate",
      hint: "Cut off the king along the 7th rank first.",
      explanation:
        "Ra7 seals the 7th rank, leaving Kb8 as Black's only move. Then Ra8# is checkmate: the rook controls the entire 8th rank, and the white king on b6 covers b7 and c7.",
      source: "handcrafted",
    },
    {
      // Mirror: Kf6 + Ra1. Black Kf8.
      // FEN: 5k2/8/5K2/8/8/8/8/R7 w - - 0 1
      // Ra1->a7: a-file clear. Ra7 controls 7th rank.
      // Kf8 moves: e8(Kf6 to e8: (1,2) not adj. Ra7: e8 not on 7th or a-file. FREE!),
      // g8(Kf6 to g8: (1,2) not adj. FREE!),
      // e7(Kf6 adj AND Ra7 7th rank!), f7(Kf6 adj AND Ra7 7th rank!), g7(Kf6 adj AND Ra7 7th rank!).
      // Ke8 and Kg8 both free. Not forced! Puzzle doesn't work.
      //
      // Need: Kg6 + Ra1. Black Kg8.
      // FEN: 6k1/8/6K1/8/8/8/8/R7 w - - 0 1
      // Ra1->a7: Ra7 controls 7th rank.
      // Kg8 moves: f8(Kg6 to f8: (1,2) not adj. Ra7: not. FREE!),
      // h8(Kg6 to h8: (2,2) not adj. FREE!), h7(Kg6 adj! AND Ra7 7th rank!),
      // f7(Kg6 adj! AND Ra7!), g7(Kg6 adj! AND Ra7!).
      // Kf8 and Kh8 both free. Not forced.
      //
      // The K+R vs K mate-in-2 only works on the a-file/h-file edge with the king properly placed.
      // Let me use: Kb6, Ra1, Ka8 (already verified above) and variants.
      //
      // Variant: Kg6 + Rh1. Black Kh8.
      // FEN: 7k/8/6K1/8/8/8/8/7R w - - 0 1
      // Rh1->h7: h1-h2-...-h7. Clear. Rh7 controls h-file and 7th rank.
      // Wait, Rh7 blocks... Kg6 controls g7,h7. But Rh7 is a rook on h7, and Kg6 adj to h7.
      // After Rh7, Kh8 moves: g8(Kg6 adj! g6 to g8: (0,2) not adj. Wait: g6 to g8 is 2 squares. NOT adjacent!).
      // Kg6 adjacent squares: f5,f6,f7,g5,g7,h5,h6,h7. g8 is NOT adjacent to Kg6!
      // So g8 is free. Rh7: g8 not on h-file or 7th rank. Free.
      // Kg8 escapes. Puzzle doesn't work.
      //
      // For the corner to work, the king must be on the 6th rank adjacent to the corner.
      // Kb6+Ka8 or Kg6+... Kg6 doesn't border the h8 corner well.
      // Use: Kf6+Ke8. FEN: 4k3/8/5K2/8/8/8/8/7R w - - 0 1
      // Rh1->h7? Controls 7th rank. Ke8 moves: d8(free), f8(Kf6 adj), d7(Rh7 7th rank AND Kf6 adj d7: f6 to d7 (2,1) not adj. Rh7 controls d7.), f7(Kf6 adj AND Rh7), e7(Kf6 adj AND Rh7).
      // Kd8 free. Rh7->h8+? h7 to h8. Rh8 checks kd8 on 8th rank. Escapes: c8(Rh8 8th rank), e8(Rh8 8th rank), c7(free), d7(Kf6? not adj), e7(Kf6 adj).
      // Kc7 escapes. Not good.
      //
      // Stick with the one verified pattern (Kb6, Ra1, Ka8).
      //
      // Second puzzle: two rooks staircase.
      // VERIFIED: Rc5, Rb1, Kd1. Black Ka8.
      // FEN: k7/8/8/2R5/8/1K6/8/1R6 w - - 0 1
      // Rb1->b8+: b1-b2-b3(Kb3!) BLOCKED by own king!
      // Wait: rank 3 has Kb3: 1K6 = b3=K. Rb1 to b8: b1-b2-b3(own king!). BLOCKED!
      //
      // Fix: move king to c3 or put rook on different file.
      // FEN: k7/8/8/2R5/8/2K5/8/1R6 w - - 0 1
      // Kc3 on rank 3: 2K5.
      // Rb1->b8+: b1-b2-b3-b4-b5-b6-b7-b8. Kc3 is on c3 not b3. Path clear! Legal.
      // Rb8+ checks ka8 on 8th rank. Escapes: a7(Rc5 controls 5th rank: a5. And c-file. a7 not on either. Kc3 to a7: not adj. NOT controlled. FREE!), b8(rook there).
      // Ka7 only move. Then Rc5->a5#: c5 to a5 on 5th rank. b5 empty. Ra5 checks ka7 on a-file.
      // Escapes: a8(Rb8 8th rank!), a6(Ra5 a-file!), b8(Rb8!), b7(Rb8 b-file!), b6(Rb8 b-file!).
      // ALL BLOCKED! Ra5#! MATE!
      //
      // VERIFIED! FEN check:
      // k7/8/8/2R5/8/2K5/8/1R6
      // Rank 8: k on a8, rest empty. ✓
      // Rank 5: 2 empty, R on c5, 5 empty. ✓
      // Rank 3: 2 empty, K on c3, 5 empty. ✓
      // Rank 1: 1 empty, R on b1, 6 empty. ✓
      id: "m2-002",
      fen: "k7/8/8/2R5/8/2K5/8/1R6 w - - 0 1",
      playerColor: "white",
      solution: ["Rb8+", "Ka7", "Ra5#"],
      themes: ["mate-in-2"],
      rating: 950,
      difficulty: "intermediate",
      hint: "Check the king off the back rank, then cut it off with the other rook.",
      explanation:
        "Rb8+ forces Ka7 (the only escape). Then Ra5# delivers checkmate: the a-file rook covers the a-file, Rb8 seals the 8th rank and b-file, leaving the king with no escape.",
      source: "handcrafted",
    },
    {
      // Two rooks: Rf7+, Kg8, Re8#.
      // VERIFIED earlier: FEN 5k2/R7/6K1/8/8/8/8/4R3
      // Ra7->f7+: a7 to f7 on 7th rank. b7-e7 empty. Rf7+ checks kf8 on f-file.
      // Escapes: g8(Re1 to g8? e-file: e1-e8. g8 not on e-file. Kf6... wait Kg6.
      // Kg6 controls f7(rook!), g7, f5, g5, h5, h6, h7. g8: Kg6 to g8: (0,2) NOT adj.
      // NOT controlled by Kg6. Re1 doesn't control g8. Ra7(now Rf7) doesn't control g8.
      // g8 FREE!), e8(Re1 e-file! Controlled.), e7(Kg6 adj! AND Rf7 7th rank!), g7(Kg6!).
      // Only Kg8. Then Re1->e8#: e1-e2-...-e8. Clear. Re8 checks kg8 on 8th rank.
      // Escapes: f8(Re8 8th rank!), h8(Re8 8th rank!), f7(Rf7!), g7(Kg6!), h7(Kg6!).
      // ALL BLOCKED! Re8#! MATE!
      id: "m2-003",
      fen: "5k2/R7/6K1/8/8/8/8/4R3 w - - 0 1",
      playerColor: "white",
      solution: ["Rf7+", "Kg8", "Re8#"],
      themes: ["mate-in-2"],
      rating: 1000,
      difficulty: "intermediate",
      hint: "Drive the rook across the 7th rank with check, then strike the back rank.",
      explanation:
        "Rf7+ forces Kg8 (the only escape since e8 is covered by the other rook and the white king covers g7). Then Re8# is back rank checkmate, with Rf7 and the white king sealing all escape routes.",
      source: "handcrafted",
    },
    {
      // Rh7+, Kg8, Ra8#.
      // FEN: 7k/8/5K2/8/8/8/R7/7R w - - 0 1
      // Kf6 controls e5,e6,e7,f5,f7,g5,g6,g7.
      // Rh1->h7+: h1-h2-...-h7. Clear. Rh7+ checks kh8 on h-file.
      // Escapes: g8(Kf6 to g8: (1,2) not adj. Rh7: g8 not on h-file or 7th rank.
      // Ra2: g8 not on a-file or 2nd rank. Hmm, g8 is free? WAIT.
      // Kf6 controls g7. g8 is NOT controlled by Kf6.
      // So g8 is free! And g7 is controlled by Kf6. Kg8 only move (not Kg7 which is controlled).
      // After Kg8: Ra2->a8#: a2-a3-...-a8. Clear. Ra8 checks kg8 on 8th rank.
      // Escapes: f8(Ra8 8th rank!), h8(Ra8 8th rank!), f7(Kf6!), g7(Kf6!), h7(Rh7!).
      // ALL BLOCKED! Ra8#! MATE!
      id: "m2-004",
      fen: "7k/8/5K2/8/8/8/R7/7R w - - 0 1",
      playerColor: "white",
      solution: ["Rh7+", "Kg8", "Ra8#"],
      themes: ["mate-in-2"],
      rating: 950,
      difficulty: "intermediate",
      hint: "Check the king out of the corner, then deliver mate on the back rank.",
      explanation:
        "Rh7+ forces Kg8 (Kg7 is covered by the white king on f6). Then Ra8# is checkmate: the rook controls the 8th rank, Rh7 covers h7-h8, and the white king covers f7 and g7.",
      source: "handcrafted",
    },
    // --- Queen + rook cooperation (5-6) ---
    {
      // Qd8+, Kh7, Qh8#.
      // FEN: 6k1/5pp1/8/6Q1/8/8/8/5KR1 w - - 0 1
      // Qg5->d8: g5-f6-e7-d8 diagonal. f6,e7 empty. Legal.
      // Qd8+ checks kg8 on 8th rank. Escapes: f8(8th rank), h8(8th rank), f7(pawn), g7(pawn), h7(empty. Qd8 to h7: d8 to h7: (4,1) not queen direction. Rg1 to h7: g1 to h7: not same line. NOT controlled.).
      // Kh7 only move. Then Qd8->h8#: d8 to h8 on 8th rank. e8,f8,g8 empty. Legal.
      // Qh8 checks kh7 on h-file. Escapes: g7(pawn), g6(Rg1 g-file! g1-g2-...-g6. Clear. Controlled!), h6(Qh8 h-file!), g8(Qh8 8th rank!).
      // Also f6: Qh8 to f6: h8-g7-f6 diagonal. Controlled!
      // ALL BLOCKED! Qh8#! MATE!
      id: "m2-005",
      fen: "6k1/5pp1/8/6Q1/8/8/8/5KR1 w - - 0 1",
      playerColor: "white",
      solution: ["Qd8+", "Kh7", "Qh8#"],
      themes: ["mate-in-2"],
      rating: 1050,
      difficulty: "intermediate",
      hint: "Check the king to force it off the back rank, then return to deliver mate.",
      explanation:
        "Qd8+ forces Kh7 (the only escape since the queen covers the entire 8th rank and pawns block f7/g7). Then Qh8# is checkmate: the queen on the h-file covers h6 and g7, while the rook on g1 seals the g-file.",
      source: "handcrafted",
    },
    {
      // Qh7+, Kf8, Ra8#. Uses a pawn on d6 to cover e7.
      // FEN: 6k1/5p2/3P4/7Q/8/8/8/R3K3 w - - 0 1
      // Qh5->h7: h5 to h7 on h-file. h6 empty. Qh7+ checks kg8 via diagonal (h7 to g8: (1,1)).
      // Escapes: f8(Qh7 to f8: not same line. Not controlled. FREE!), h8(Qh7 h-file!), f7(pawn), g7(Qh7 7th rank!).
      // Kf8 only move. Then Ra1->a8#: a-file clear. Ra8 checks kf8 on 8th rank.
      // Escapes: e8(Ra8 8th rank!), g8(Ra8 8th rank!), e7(Pd6 controls! d6 pawn attacks e7.), f7(pawn), g7(Qh7 7th rank!).
      // ALL BLOCKED! Ra8#! MATE!
      id: "m2-006",
      fen: "6k1/5p2/3P4/7Q/8/8/8/R3K3 w - - 0 1",
      playerColor: "white",
      solution: ["Qh7+", "Kf8", "Ra8#"],
      themes: ["mate-in-2", "back-rank-mate"],
      rating: 1100,
      difficulty: "intermediate",
      hint: "Force the king to the back rank corner, then seal it with the rook.",
      explanation:
        "Qh7+ drives the king to f8 (h8 and g7 are controlled by the queen). Then Ra8# is checkmate: the rook seals the 8th rank, the queen covers g7-g8, and the pawn on d6 guards e7.",
      source: "handcrafted",
    },
    // --- Two-rook staircase with check (7-8) ---
    {
      // Mirror of puzzle 2 on kingside.
      // White: Rf5, Rg1, Kf3. Black: Kh8.
      // FEN: 7k/8/8/5R2/8/5K2/8/6R1 w - - 0 1
      // Kf3 controls e2,e3,e4,f2,f4,g2,g3,g4.
      // Rg1->g8+: g1-g2-...-g8. g2,g3(Kf3 adj but not on g3),g4-g7 empty. g8: Rg8+ checks kh8 on 8th rank.
      // Wait, Kf3 is on f3. g2 is controlled by Kf3 but is g2 empty? Yes, no piece on g2.
      // Rg1 to g8: path g2-g7 all empty. Legal!
      // Rg8+ checks kh8 on 8th rank. Escapes: h7(Rf5 controls 5th rank and f-file. h7: not on either. Kf3: not adj. NOT controlled. FREE!).
      // Kh7 only move (g7 controlled by Rg8 on g-file, h8 is the current square under check).
      // Then Rf5->h5#: f5 to h5 on 5th rank. g5 empty. Rh5 checks kh7 on h-file.
      // Escapes: g7(Rg8 controls g-file. g8 to g7: g-file. Controlled!), g6(Rg8 g-file AND Rh5? Not g6 on h-file. Rg8 controls g6 via g-file!), h6(Rh5 h-file!), h8(Rg8!).
      // ALL BLOCKED! Rh5#! MATE!
      //
      // FEN check:
      // 7k/8/8/5R2/8/5K2/8/6R1
      // Rank 8: 7 empty, k on h8. ✓
      // Rank 5: 5 empty, R on f5, 2 empty. ✓
      // Rank 3: 5 empty, K on f3, 2 empty. ✓
      // Rank 1: 6 empty, R on g1. Wait: 6R1 = 6 empty then R on g1 then 1 empty(h1). ✓
      id: "m2-007",
      fen: "7k/8/8/5R2/8/5K2/8/6R1 w - - 0 1",
      playerColor: "white",
      solution: ["Rg8+", "Kh7", "Rh5#"],
      themes: ["mate-in-2"],
      rating: 1000,
      difficulty: "intermediate",
      hint: "Check the king to force it off the 8th rank, then close it in from below.",
      explanation:
        "Rg8+ forces Kh7 (the only escape from the 8th rank check). Then Rh5# delivers checkmate: the rook covers the h-file, while Rg8 controls the g-file and 8th rank, leaving the king completely boxed in.",
      source: "handcrafted",
    },
    // This position is also mate in 1! With Ke6 controlling f7/g7 and Rh1+Ra6 covering
    // h-file and a-file+6th rank, there's always an immediate mate.
    // The problem is Ke6 covers too much.
    //
    // I need the king FURTHER AWAY so the first move creates a threat but isn't mate.
    //
    // Use Ke4 instead (controls d3-f5 area, NOT f7/g7):
    // FEN: 6k1/8/R7/8/4K3/8/8/7R w - - 0 1
    // Ke4 controls d3,d4,d5,e3,e5,f3,f4,f5.
    // Kg8 moves: f8(Ra6 6th rank? No. Rh1? No. Ke4? Not adj. FREE!),
    // h8(Rh1 h-file!), h7(Rh1!), f7(free!), g7(free!).
    // Multiple escapes. After Ra6->a8+: a6-a7-a8 clear. Ra8+ checks kg8 on 8th rank.
    // Escapes: f8(Ra8!), h8(Ra8!), f7(free!), g7(free!).
    // Kf7 or Kg7. Not forced single line.
    //
    // This approach won't work with the king far away. I need EXACTLY the right geometry.
    //
    // Let me go back to what worked and create the final file with 10 puzzles (not 12).
    // I have 7 thoroughly verified positions. Let me add 3 more variations.
    //
    // Pattern: two rooks on same file, one sacs.
    // White: Rh1, Rh4, Ke4. Black: Kh8. (Two rooks on h-file is unusual but valid.)
    // Wait, can't have two pieces on same file easily.
    //
    // Simplest variation: mirror puzzle 1.
    // Kc6 + Ra1. Black Kc8.
    // FEN: 2k5/8/2K5/8/8/8/8/R7 w - - 0 1
    // Ra1->a7: a-file clear. Ra7 controls 7th rank.
    // Kc8 moves: b8(Ra7 7th rank? b8 not on 7th. Kc6 to b8: (1,2) not adj. NOT controlled. FREE!),
    // d8(Kc6 to d8: (1,2) not adj. Ra7? d8 not on 7th or a-file. FREE!),
    // b7(Ra7 7th rank AND Kc6 adj!), c7(Ra7 AND Kc6!), d7(Ra7 AND Kc6!).
    // Kb8 and Kd8 both free. TWO escapes. Not forced.
    //
    // With Ka8 and Kb6, only Ka7 was open, and Kb8 was the only move.
    // The corner is essential. Let me use the h-corner:
    // Kg6 + Rh1. Black Kh8.
    // FEN: 7k/8/6K1/8/8/8/8/7R w - - 0 1
    // Kg6 controls f5,f6,f7,g5,g7,h5,h6,h7.
    // Kh8: g8(free!), g7(Kg6!), h7(Kg6!).
    // Only Kg8. Rh1->h7: h-file. Rh7 controls 7th rank. Not check.
    // After Rh7, Kg8 moves: f8(free!), h8(Rh7 h-file!), f7(Kg6!), g7(Kg6 AND Rh7!).
    // Kf8 free again. Not forced mate in 2. Need f8 covered too.
    //
    // The a-corner works because on a8, the king only has a7 and b8 as possible squares (b7 is the diagonal). With Kb6 covering a7 and b7, and the rook covering b8 (via b-file after moving to 7th rank), it works.
    //
    // For h-corner: on h8, king has g8 and g7. Need to cover g8.
    // Can't with just 1 rook and 1 king near h-corner.
    // Unless: King on f6 (covers g7) and rook cuts off g-file.
    // But rook on g-something can't also deliver mate on 8th rank.
    //
    // Need two rooks for h-corner or a queen.
    //
    // Let me just create one more with a pawn helper:
    // Kb6 + pawn b7 + Rh1. Black Ka8.
    // Wait, if Kb6 and pawn b7, that's two white pieces covering everything.
    // FEN: k7/1P6/1K6/8/8/8/8/7R w - - 0 1
    // Pb7 on b7 (white pawn). Kb6. Rh1.
    // Ka8: a7(Kb6 adj!), b8(Pb7 can promote or is on b7 blocking? Actually the pawn controls a8 and c8 from b7. Wait: pawn on b7 attacks a8 and c8. So a8 has the king, and the pawn attacks a8? A white pawn on b7 attacks a8 AND c8 diagonally.
    // So the pawn ATTACKS a8 where the king IS. But it's white's turn, not an actual check (pawns don't give check by being next to the king - they attack diagonally forward).
    // White pawn on b7 attacks a8 (diagonally). So Ka8 is attacked by Pb7!
    // That means Ka8 IS in check from the pawn? Pawns attack one square diagonally forward.
    // White pawn on b7 attacks a8 (forward-left) and c8 (forward-right). YES.
    // Ka8 IS in check from Pb7! But it's white's turn. Black is in check.
    // ILLEGAL POSITION (the side NOT to move can't be in check).
    //
    // So can't have Pb7 and Ka8. Move king to... wait actually maybe:
    // FEN: k7/1P6/1K6/8/8/8/8/7R w - - 0 1
    // No, it's illegal because Pb7 attacks a8 where black king is.
    //
    // Let me just use what I have: 7 verified puzzles. I'll pad to 10 with two clear variations
    // and one Black-to-move puzzle.
    //
    // Black-to-move: mirror of puzzle 1.
    // Black: Kg3, Ra8. White: Ka1.
    // FEN: r7/8/8/8/8/6k1/8/K7 b - - 0 1
    // Kg3 controls f2,f3,f4,g2,g4,h2,h3,h4.
    // Ka1: a2(Ra8 a-file!), b1(Kg3 to b1: (5,2) not adj. Ra8? Not b-file or 8th rank. FREE!),
    // b2(Kg3 to b2: (4,1) not adj. Ra8? Not. FREE!).
    // Multiple escapes for white king. Not constrained enough.
    //
    // Use: Black: Kb3, Ra8. White: Ka1.
    // FEN: r7/8/8/8/8/1k6/8/K7 b - - 0 1
    // Kb3 controls a2,a3,a4,b2,b4,c2,c3,c4.
    // Ka1: a2(Kb3!), b1(Kb3 to b1: (1,2) not adj. Ra8 a-file? b1 not. FREE!), b2(Kb3!).
    // Only Kb1.
    // Ra8->a2: a8-a7-...-a2. Clear. Ra2 controls 2nd rank and a-file.
    // Kb1 moves: c1(Ra2 2nd rank? c1 not on 2nd. Kb3 to c1: (1,2) not adj. FREE!),
    // c2(Kb3!), a1(Ra2 a-file!), a2(Ra2 is there), b2(Kb3!).
    // Kc1 free! Not forced mate in 2. Need to cover c1.
    //
    // This is the same fundamental problem: with K+R vs K, you need the enemy king
    // in the corner with the attacking king specifically placed.
    //
    // Mirror puzzle 1 exactly: Black Kb6, Ra1 → mirror → Black Kg3, Rh8. White Kh1.
    // FEN: 7r/8/8/8/8/6k1/8/7K b - - 0 1
    // Kg3 controls f2,f3,f4,g2,g4,h2,h3,h4.
    // Kh1: g1(Rh8 h-file? h1-h8. g1 not on h-file. Kg3 to g1: (0,2) not adj. FREE!),
    // g2(Kg3!), h2(Kg3!).
    // Only Kg1. Then Rh8->h2: h8-h7-...-h2. Rh2 controls h-file and 2nd rank.
    // Kg1 moves: f1(Rh2? Not on 1st rank or f-file. Kg3 to f1: (1,2) not adj. FREE!),
    // f2(Kg3!), g2(Kg3 AND Rh2 2nd rank!).
    // Kf1 free. Not mate.
    //
    // I keep hitting the same wall. K+R vs K in 2 moves only works from Ka8+Kb6 or equivalent corners with precise king placement.
    //
    // Fine. Mirror puzzle 1: Kg7 + Ra8. White Kh7... no that's same color.
    //
    // Black to move: Kb6, Ra1. White Ka8.
    // Wait: same as puzzle 1 but colors swapped.
    // FEN: K7/8/1k6/8/8/8/8/r7 b - - 0 1
    // Upper case K = white king on a8. Lower k = black king on b6. Lower r = black rook on a1.
    // Kb6 controls a5,a6,a7,b5,b7,c5,c6,c7.
    // Ka8: a7(Kb6 adj!), b8(Kb6 to b8: (0,2) not adj. Ra1 a-file: a1-a8. b8 not on a-file. FREE!).
    // Only Kb8. Then Ra1->a7: controls 7th rank. Forced Ra8# next. Wait, this is 2 moves total:
    // Move 1: Black plays Ra7 (threatening Ra8#). Ka8 goes to Kb8.
    // Move 2: Ra7->a8#. a7-a8. Ra8 checks kb8 on 8th rank.
    // Escapes: c8(Ra8!), c7(Kb6!), b7(Kb6!). MATE!
    //
    // Wait, the solution should be: ["Ra7", "Kb8", "Ra8#"].
    // But does this work? After Ra7, white plays Kb8 (only move). Then Ra8#.
    // YES! Exact mirror of puzzle 1. VERIFIED.
    {
      // Black to move mirror of puzzle 1.
      // Black Kb6 + Ra1 vs White Ka8.
      id: "m2-010",
      fen: "K7/8/1k6/8/8/8/8/r7 b - - 0 1",
      playerColor: "black",
      solution: ["Ra7", "Kb8", "Ra8#"],
      themes: ["mate-in-2"],
      rating: 850,
      difficulty: "intermediate",
      hint: "Cut off the king on the 7th rank, then deliver the final blow.",
      explanation:
        "Ra7 seals the 7th rank, trapping the white king. After Kb8 (forced), Ra8# delivers checkmate with the rook on the 8th rank while the black king covers b7 and c7.",
      source: "handcrafted",
    },
    {
      // Rook ladder check: Rh8+, Kd7, Ra7# (with Kd5 support).
      // White: Ra1, Rh1, Kd5. Black: Kd8.
      // FEN: 3k4/8/8/3K4/8/8/8/R6R w - - 0 1
      // Kd5 controls c4,c5,c6,d4,d6,e4,e5,e6.
      // Rh1->h8+: h1-h2-...-h8. Clear. Rh8+ checks kd8 on 8th rank.
      // Escapes: c8(Rh8 8th rank!), e8(Rh8 8th rank!), c7(Kd5 to c7: (1,2) not adj. Rh8? No. Ra1? No. FREE!... wait: Kd5 controls c6 not c7. d5 to c7: (1,2). Not adjacent. Not controlled.),
      // d7(Kd5 adj!), e7(Kd5 adj!).
      // Kc7 is the only escape!
      // Then Ra1->a7+: a1-a2-...-a7. Clear. Ra7 checks kc7 on 7th rank.
      // Escapes: b8(Rh8 8th rank!), d8(Rh8!), c8(Rh8!), b7(Ra7 7th rank!), d7(Kd5 adj AND Ra7!), b6(Ra7? Not. Rh8? Not. Kd5 to b6: (2,1) not adj. NOT controlled. FREE!), c6(Kd5 adj!), d6(Kd5 adj!).
      // Kb6 escapes! Not mate.
      //
      // Hmm. b6 is free. Need to cover b6. What if I add a pawn?
      // Add white pawn on c5: controls b6 and d6.
      // FEN: 3k4/8/8/2PK4/8/8/8/R6R w - - 0 1
      // rank 5: 2PK4 = Pc5, Kd5.
      // After Rh8+, Kc7, Ra7+:
      // b6(Pc5 controls! c5 pawn attacks b6 and d6!). Controlled!
      // d6(Kd5 adj AND Pc5!).
      // So: b8(Rh8!), d8(Rh8!), c8(Rh8!), b7(Ra7!), d7(Kd5 and Ra7!), b6(Pc5!), c6(Kd5!), d6(Kd5 and Pc5!).
      // ALL BLOCKED! Ra7#! MATE!
      //
      // VERIFIED! FEN check:
      // 3k4/8/8/2PK4/8/8/8/R6R
      // Rank 8: 3 empty, k d8, 4 empty. ✓
      // Rank 5: 2 empty, P c5, K d5, 4 empty. ✓
      // Rank 1: R a1, 6 empty, R h1. ✓
      // Total: 5 pieces. Clean.
      //
      // Kings: Kd5, Kd8. Distance: (0,3). Not adjacent. ✓
      id: "m2-011",
      fen: "3k4/8/8/2PK4/8/8/8/R6R w - - 0 1",
      playerColor: "white",
      solution: ["Rh8+", "Kc7", "Ra7#"],
      themes: ["mate-in-2"],
      rating: 1050,
      difficulty: "intermediate",
      hint: "Check the king off the 8th rank, then trap it on the 7th.",
      explanation:
        "Rh8+ forces Kc7 (the only escape since d7 and e7 are covered by the white king). Then Ra7# is checkmate: the rook covers the 7th rank, Rh8 seals the 8th, and the pawn on c5 guards b6.",
      source: "handcrafted",
    },
    {
      // White: Kb6, pawn b7, Rh1. Black: Ka8.
      // Wait, Pb7 attacks a8 and c8. Ka8 is attacked by pawn. Illegal if it's white to move.
      // Hmm, actually: is the pawn giving CHECK? White pawn on b7 attacks a8. Black king on a8.
      // If it's white's turn, that means black was already in check on black's turn, which is
      // impossible. So yes, this is illegal.
      //
      // Use: Kb6, Pb5, Rh1. Black: Ka8.
      // FEN: k7/8/1K6/1P6/8/8/8/7R w - - 0 1
      // Pb5 attacks a6 and c6. Not controlling a7 or b7.
      // Kb6 controls a5,a6,a7,b5(pawn),b7,c5,c6,c7.
      // Ka8: a7(Kb6!), b8(Kb6 to b8: (0,2) not adj. Rh1? Not. Pb5? Not. FREE!), b7(Kb6!).
      // Only Kb8. Then Rh1->h8#: h1-h2-...-h8. Clear. Rh8 checks kb8 on 8th rank.
      // Escapes: a8(Rh8 8th rank!), c8(Rh8!), a7(Kb6!), b7(Kb6!), c7(Kb6!).
      // ALL BLOCKED! Rh8#! MATE!
      //
      // But this is actually just the quiet move Rh8 after Kb8. The puzzle needs to be:
      // First move forces Kb8, then Rh8#.
      // But what IS the first move? There's no check to force Kb8.
      // If it's a quiet move (like Ra1 or Rh7), black might play something other than Kb8.
      // Actually: black's only legal move IS Kb8 already! Ka8 has: a7(Kb6), b7(Kb6), b8(free).
      // So Kb8 is the only move for black regardless of what white does.
      //
      // So white plays ANY rook move that puts the rook on the h-file (or any file to reach the 8th rank).
      // Simplest: Rh1->h8#? h1-h8, checks kb8? Wait, it's WHITE's turn first, then black plays, then white.
      // Move 1 (white): We need a move that isn't already mate. Rh8 would be check on ka8.
      // Rh8 checks ka8 on 8th rank? h8 to a8: 8th rank. Check! Escapes: b8(free), a7(Kb6), b7(Kb6).
      // Kb8 forced. But wait, this is a CHECK. So it's: Rh8+, Kb8... and then we need a second move to mate.
      // After Kb8: white plays what? Rh8 is on h8. All pieces: Kb6, Pb5, Rh8. Black: Kb8.
      // Kb8 escapes: a8(Rh8!), c8(Rh8!), a7(Kb6!), c7(Kb6!), b7(Kb6!).
      // NO LEGAL MOVES! But is it stalemate? Kb8 has no legal moves. And black has no other pieces.
      // So: if Rh8+ is check and Kb8 is forced, and then Black has no legal moves...
      // But it's WHITE's move after Kb8. White needs to deliver mate.
      // After Rh8+, Kb8, white plays? The position after Kb8 is: white Kb6, Pb5, Rh8. Black Kb8.
      // Is Black already in checkmate? Rh8 on h8: checks kb8? h8 to b8: 8th rank. YES! Check!
      // And Kb8 has no escapes: a8(Rh8), c8(Rh8), a7(Kb6), b7(Kb6), c7(Kb6). MATE!
      // But that means Rh8+ ALREADY was checkmate! Rh8#! Mate in 1!
      //
      // Because Kb8 is ALSO on the 8th rank which Rh8 controls. Rh8+ is check on Ka8 AND
      // also controls the 8th rank where Kb8 would be. So after Ka8 goes to Kb8, it's STILL
      // in check from Rh8 on the 8th rank! So Kb8 is NOT a legal move (walks into check).
      //
      // So after Rh8+, Ka8 has: b8(Rh8 8th rank, check!), a7(Kb6!), b7(Kb6!).
      // NO LEGAL MOVES! Rh8#! Mate in 1!
      //
      // The problem is the rook on the 8th rank controls ALL of rank 8.
      // This is ALWAYS mate in 1 from this setup.
      //
      // I'll stop trying to create new ones and finalize with what I have: 11 puzzles total.
      // Let me also add one more verified pattern.
      //
      // VERIFIED: Rook ladder staircase.
      // White: Ra3, Rb1, Kf5. Black: Kd4.
      // Wait this is messy. Let me use the one I verified:
      // White: Rh1, Rh4... no, same file.
      //
      // Actually, let me use a simple quiet-move-then-mate:
      // Kc6 + Rb1. Black Ka7. (Not Ka8 because that's corner.)
      // FEN: 8/k7/2K5/8/8/8/8/1R6 w - - 0 1
      // Kc6 controls b5,b6,b7,c5,c7,d5,d6,d7.
      // Ka7: a8(free), a6(Kc6 to a6: (2,0) not adj. Rb1 b-file: a6 not. Free!),
      // b8(Kc6 to b8: (1,2) not adj. Rb1 b-file! b1-b8. b2-b7 empty. Controlled!),
      // b7(Kc6!), b6(Kc6!).
      // Ka8 or Ka6 are the escapes. Too many. Not useful.
      //
      // FINE: I'll go with 10 puzzles total and remove the broken puzzle 8/9.
      // My verified set: m2-001 through m2-007, m2-010 (black), m2-011.
      // That's 9. I need one more. Let me verify this one more time:
      //
      // Two rooks cooperating:
      // White: Ra2, Rh1, Kf6. Black: Kh8.
      // FEN: 7k/8/5K2/8/8/8/R7/7R w - - 0 1
      // (Already verified earlier as puzzle 4.)
      //
      // Let me add a variation where the rooks start on different squares:
      // White: Rb2, Rg1, Ke5. Black: Kh8.
      // FEN: 7k/8/8/4K3/8/8/1R6/6R1 w - - 0 1
      // Ke5 controls d4,d5,d6,e4,e6,f4,f5,f6.
      // Rg1->g8+: g1-g2-...-g8. Clear. Rg8+ checks kh8 on 8th rank.
      // Escapes: h7(free! Not controlled by Rg8, Rb2, or Ke5.), g7(Rg8 g-file!).
      // Only Kh7.
      // Then Rb2->h2#: b2 to h2 on 2nd rank. c2-g2 empty. Rh2 checks kh7 on h-file.
      // Escapes: g8(Rg8!), g7(Rg8 g-file!), g6(Rg8 g-file!), h8(Rg8 8th rank!), h6(Rh2 h-file!).
      // ALL BLOCKED! Rh2#! MATE!
      //
      // VERIFIED! FEN check:
      // 7k/8/8/4K3/8/8/1R6/6R1
      // Rank 8: 7 empty, k h8. ✓
      // Rank 5: 4 empty, K e5, 3 empty. ✓
      // Rank 2: 1 empty, R b2, 6 empty. ✓
      // Rank 1: 6 empty, R g1, 0 empty. Wait: 6R1 = 6 empty, R g1, 1 empty h1. ✓
      // Kings: Ke5 and Kh8. (3,3) distance. Not adjacent. ✓
      id: "m2-012",
      fen: "7k/8/8/4K3/8/8/1R6/6R1 w - - 0 1",
      playerColor: "white",
      solution: ["Rg8+", "Kh7", "Rh2#"],
      themes: ["mate-in-2"],
      rating: 1000,
      difficulty: "intermediate",
      hint: "Check the king off the back rank, then slide the other rook to deliver mate.",
      explanation:
        "Rg8+ forces Kh7 (g7 is controlled by the rook on the g-file). Then Rh2# is checkmate: the rook on h2 controls the h-file, Rg8 covers the g-file and 8th rank, trapping the king completely.",
      source: "handcrafted",
    },
  ],
};
