import type { PuzzleSet } from "../types";

export const pinsAndSkewers: PuzzleSet = {
  id: "pins-and-skewers",
  name: "Pin to Win",
  description: "Use bishops, rooks, and queens to pin or skewer enemy pieces.",
  icon: "\uD83D\uDCCC",
  themes: ["pin", "skewer"],
  difficulty: "intermediate",
  puzzles: [
    // --- Absolute pins: piece pinned to king (1-4) ---
    {
      // White bishop moves to a4, pinning black knight on d7 to king on e8.
      // Diagonal a4-b5-c6-d7-e8. Bishop on b3 moves to a4.
      // FEN: 4k3/3n4/8/8/8/1B6/8/4K3
      // rank8: 4k3 = ke8. rank7: 3n4 = nd7. rank3: 1B6 = Bb3. rank1: 4K3 = Ke1.
      // Bb3->a4: diagonal (1,1). Legal. a4-d7 clear (b5,c6 empty). d7-e8 diagonal.
      // Nd7 is pinned to ke8. Knight cannot move without exposing king. White wins the knight.
      id: "ps-001",
      fen: "4k3/3n4/8/8/8/1B6/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Ba4"],
      themes: ["pin"],
      rating: 900,
      difficulty: "intermediate",
      hint: "Move your bishop to create a pin along the diagonal.",
      explanation:
        "Ba4 pins the black knight on d7 to the king on e8 along the a4-e8 diagonal. The knight cannot move without exposing the king to check, so White wins the knight.",
      source: "handcrafted",
    },
    {
      // White queen pins black rook to king.
      // Queen on a1 moves to a5, pinning rook on c7 to king on e7... no, a5-c7-e9 doesn't work.
      // Diagonal a1-b2-c3-d4-e5-f6-g7-h8. Rook on d4, king on g7?
      // Let me use a file pin instead: Queen on e1 moves to e3, pinning rook on e5 to king on e8.
      // FEN: 4k3/8/8/4r3/8/8/8/4QK2 w - - 0 1 -- wait, Qe1 and Kf1 on rank 1.
      // rank1: 4QK2 = Qe1, Kf1. Qe1->e3: queen moves up e-file. e2 empty, e3 empty. Legal.
      // Qe3 pins re5 to ke8 on e-file. Path: e3-e4(empty)-e5(rook)-e6-e7-e8(king).
      // Rook can't move off e-file. White wins the rook (threatens Qxe5).
      // But wait, after Qe3, black rook on e5 IS attacked. Can black play ...Re1+? No, rook
      // is pinned to king so it can't move off the e-file. Can it move along the e-file?
      // Re5->e6, e7, e4? e4 is between the queen and the rook, so Re4 blocks the pin.
      // Actually pinned pieces CAN move along the line of the pin. So Re6, Re7, Re4 are legal.
      // Re4 puts it right in front of the queen. Then Qxe4 captures. Or Re7 and Qe7 is blocked by ke8.
      // This gets complicated. Let me simplify: use a position where the pinned piece is immediately captured.
      //
      // Better approach: White bishop on h3 pins black knight on e6 to queen on c8.
      // h3-g4-f5-e6-d7-c8 diagonal. Bishop moves from g2 to h3? Or starts on h3.
      // Let me have the bishop START on f1 and MOVE to create the pin:
      // FEN: 2q1k3/8/4n3/8/8/8/8/4KB2 w - - 0 1
      // Bf1 moves to... where on the c8-h3 diagonal? Bf1 is on f1. f1-e2-d3 or f1-g2-h3.
      // h3-g4-f5-e6-d7-c8 diagonal. Bishop needs to get ON this diagonal.
      // Bf1->g2: (1,1) diagonal. g2 to h3 to ... no, g2 is not on the pin diagonal.
      // Bf1->b5: f1-e2-d3-c4-b5. b5 to e8? b5-c6-d7-e8 (king). What about pinning something on c6 or d7?
      // No pieces there. Skip this idea.
      //
      // Simpler: White Bb1 moves to f5, pinning knight on f5... no, bishop goes TO f5 to pin something on the diagonal beyond.
      // I'll keep this simple with a rook pin on a file.
      //
      // White rook on a3 moves to e3, pinning black knight on e5 to king on e8.
      // FEN: 4k3/8/8/4n3/8/R7/8/4K3 w - - 0 1
      // Ra3->e3: rank move on 3rd rank. b3,c3,d3 empty. Legal.
      // Re3 pins ne5 to ke8 on e-file. Knight cannot move without exposing king. Won.
      id: "ps-003",
      fen: "4k3/8/8/4n3/8/R7/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Re3"],
      themes: ["pin"],
      rating: 950,
      difficulty: "intermediate",
      hint: "Swing your rook to a file where it can pin a piece to the king.",
      explanation:
        "Re3 pins the black knight on e5 to the king on e8 along the e-file. The knight is frozen in place and will be captured, winning material.",
      source: "handcrafted",
    },
    // --- Skewers: attack valuable piece, capture what's behind (5-8) ---
    {
      // White bishop skewers black king and rook.
      // Bishop on a2 moves to d5, checking king on g8... wait, d5-e6-f7-g8 diagonal.
      // (1,1) steps. d5 to g8: (3,3). Yes, same diagonal.
      // FEN: 6k1/8/8/8/8/8/B7/4K3 w - - 0 1
      // But where is the piece behind the king to capture? Need a rook on the same diagonal beyond g8. Can't go beyond g8 on the board.
      // Better: bishop checks king, king moves, bishop captures rook behind.
      // Bishop on a1, skewers king on d4 and rook on g7.
      // a1-b2-c3-d4-e5-f6-g7 diagonal. Bishop moves to b2 (or is already on a1).
      // After Bb2+? No, bishop is on a1. The a1-h8 diagonal: a1-b2-c3-d4-e5-f6-g7-h8.
      // If king is on d4 and rook is on g7: Ba1 already attacks! But does it give check?
      // Actually Ba1 looks at b2,c3,d4. So if kd4, that's check from Ba1. After king moves,
      // bishop captures rook on... wait, a1 doesn't attack g7 in one move. The king is blocking.
      // After the king moves off d4, the diagonal a1-g7 is clear, and Bxg7.
      //
      // FEN: 4k3/6r1/8/8/3K4/8/8/B7 -- wait, this has white king on d4. I want BLACK king.
      //
      // Let me use: White bishop on b1. Black king on e4, black rook on h7.
      // b1-c2-d3-e4-f5-g6-h7 diagonal. All on same diagonal!
      // Bb1 gives check to ke4 (bishop attacks along diagonal).
      // Wait, bishop is on b1. Does Bb1 check ke4? b1-c2-d3-e4: yes, (3,3) diagonal.
      // c2 and d3 must be empty. They are. So Bb1 is ALREADY checking the king. That means
      // the position is illegal (can't have a position where side-not-to-move is in check).
      // I need the bishop to MOVE to create the skewer.
      //
      // Bishop on a2 moves to b1, skewering ke4 and rh7.
      // FEN: 8/7r/8/8/4k3/8/B7/4K3 w - - 0 1
      // Ba2->b1: (1,1) diagonal down-right. Legal.
      // Bb1 checks ke4 via b1-c2-d3-e4. c2, d3 empty. Check!
      // King must move off the diagonal. Then Bxh7 captures rook.
      // After Bb1+, king moves (e.g., Kd5, Kf5, Kf4, Kd4, Ke5, Kd3, Ke3, Kf3).
      // Then Bxh7. But wait: b1 to h7 diagonal: b1-c2-d3-e4-f5-g6-h7. After king moves off e4,
      // the diagonal is clear. Bxh7 captures the rook. Win!
      // Solution: ["Bb1+", "Kd5", "Bxh7"] (or any king move for opponent)
      // Let me pick a likely king move. Kd5 is natural (steps off the diagonal).
      // But Kf5 also works. Kd3 is on the a6-d3... no, d3 is still on the b1-h7 diagonal!
      // d3 is between b1 and h7. So if king goes to d3, it's STILL in check from Bb1.
      // d3: b1-c2-d3, check! So Kd3 is not legal (still in check).
      // Legal moves for ke4 after Bb1+: must leave the b1-h7 diagonal.
      // Squares e4 king can go to: d3(on diagonal-check!), d4, d5, e3, e5, f3(on diagonal?
      //   f3: b1-c2-d3-e4-f5... f3 is NOT on this diagonal. f3 is off. OK f3 is legal.),
      // f4, f5(on diagonal! b1-c2-d3-e4-f5, yes check.). So f5 is illegal.
      // Legal: d4, d5, e3, e5, f3, f4. Let's use Kd5.
      id: "ps-005",
      fen: "8/7r/8/8/4k3/8/B7/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Bb1+", "Kd5", "Bxh7"],
      themes: ["skewer"],
      rating: 1000,
      difficulty: "intermediate",
      hint: "Check the king along a diagonal where a rook hides behind it.",
      explanation:
        "Bb1+ skewers the black king on e4 and the rook on h7 along the same diagonal. The king must step off the diagonal, and then Bxh7 captures the rook.",
      source: "handcrafted",
    },
    {
      // White rook skewers black king and black rook on same file.
      // Rook on a1 checks king on a4, king moves, Rxa8 captures rook.
      // FEN: r7/8/8/8/k7/8/8/R3K3 w - - 0 1
      // Ra1 checks ka4: a1-a2-a3-a4 on a-file. a2,a3 empty. Check!
      // Wait, is ka4 legal? King on a4, rook on a8, white rook on a1, white king on e1.
      // Ra1 checks ka4. But wait - in this position, is Black's king ALREADY in check from Ra1?
      // a1-a2-a3-a4. Yes! King on a4 is in check from Ra1. That's illegal.
      // I need the rook to MOVE to create the skewer.
      // Rook on b1 moves to a1, skewering ka4 and ra8.
      // FEN: r7/8/8/8/k7/8/8/1R2K3 w - - 0 1
      // Rb1->a1: one square left. Legal. Ra1+ checks ka4. King moves (Kb5, Kb4, Kb3, Ka5, Ka3).
      // Then Rxa8.
      // Wait: ka4 after Ra1+. What escapes? a5(on a-file, still check), a3(on a-file, still check),
      // b5, b4, b3. So Kb5, Kb4, or Kb3. Let's use Kb5.
      // After Kb5, Ra1 to a8: Rxa8. Captures rook. Won!
      // But wait: after Kb5, is Ra1-a8 path clear? a1-a2-...-a8. a4 is now empty (king moved). Clear. Legal.
      id: "ps-006",
      fen: "r7/8/8/8/k7/8/8/1R2K3 w - - 0 1",
      playerColor: "white",
      solution: ["Ra1+", "Kb5", "Rxa8"],
      themes: ["skewer"],
      rating: 950,
      difficulty: "intermediate",
      hint: "Place your rook on a file where it attacks the king and a piece beyond.",
      explanation:
        "Ra1+ skewers the black king on a4 and the rook on a8 along the a-file. The king must step away, and Rxa8 captures the rook for free.",
      source: "handcrafted",
    },
    {
      // White queen skewers black king on e5 and bishop on e1.
      // Queen on e8 checks ke5, king moves, Qxe1.
      // Wait, e8-e5-e1 is the e-file. But queen on e8 checking ke5: e8-e7-e6-e5. Legal.
      // Hmm, but e1 is where White's king usually is. Let me place white king elsewhere.
      // FEN: 8/8/8/4k3/8/8/8/K3bQ2 w - - 0 1 -- Qf1 and Ka1, black be1.
      // Qf1 moves to e2, skewering ke5 and be1? e2-e3-e4-e5 on e-file. But Qf1->e2 is diagonal (1,1). Legal.
      // Qe2+ checks ke5 on e-file. King moves. Then Qxe1 (queen on e2 captures bishop on e1).
      // Hmm, that's just one square. Works but not exciting.
      //
      // Better: White queen on h2 skewers black king and black rook.
      // Queen moves to e5, checking king on... no, queen moving to e5 doesn't check.
      //
      // Simplest skewer: Queen on a1. Moves to h8+, checking king on e5 via diagonal.
      // a1-b2-c3-d4-e5 diagonal. So Qa1 moving... wait, queen is ON a1. If it goes to h8,
      // that's a1 to h8 diagonal: a1-b2-c3-d4-e5-f6-g7-h8. King on e5 is IN THE WAY.
      // Queen can't pass through the king.
      //
      // Let me just do a straightforward rook skewer on a rank:
      // White rook on a5 checks black king on e5. Behind king: black rook on h5.
      // Ra5+ checks ke5. King moves up/down. Then Rxh5.
      // FEN: 4k3/8/8/4K2r/8/8/8/R7 -- no, both kings on e. Bad.
      //
      // FEN: 8/4k3/8/4n2r/8/8/8/R3K3 w - - 0 1
      // No, I need the skewer target to be on same line as the check.
      //
      // Simplest approach: queen skewer on diagonal.
      // White queen on a3. Black king on c5. Black rook on f8.
      // Diagonal a3-b4-c5-d6-e7-f8. All same diagonal!
      // Qa3 checks kc5? a3 to c5: (2,2) diagonal. Yes! And c5 to f8: (3,3). Same diagonal.
      // But wait, IS the king in check from Qa3 already? If it's white to move,
      // that means black just moved and left their king in check? Illegal.
      // I need the queen to MOVE to a3 from elsewhere.
      // Queen on b2 moves to a3+.
      // FEN: 5r2/8/8/2k5/8/8/1Q6/4K3 w - - 0 1
      // Qb2->a3: (1,1) diagonal. Legal. Qa3+ checks kc5 on diagonal a3-c5. b4 empty. Check!
      // King moves off diagonal. Then Qxf8 (queen on a3 goes to f8: (5,5) diagonal, path through
      // b4,c5(now empty),d6,e7. All empty after king moves). Captures rook!
      // King escapes from c5: b5, b4(on diagonal a3-c5? b4 is between a3 and c5, so still check), b6, c4, c6, d4, d5, d6(on the diagonal a3-f8: a3-b4-c5-d6. Yes d6 is on it. Check? Queen on a3 to d6 is (3,3). But king must escape CHECK from Qa3. Qa3 attacks along the diagonal. So c5-king on the diagonal a3-h8... king squares: b4 (on diag, still check), d6 (on diag, still check), b5 (off diag), c4 (off diag? a3 to c4: (2,1) not diagonal. Safe), c6, d4 (a3 to d4: (3,1) not diagonal. Safe), d5, b6.
      // Let's use Kb6 as the response.
      // After Kb6, Qa3 to f8: a3-b4-c5-d6-e7-f8. All empty. Qxf8. Won!
      id: "ps-007",
      fen: "5r2/8/8/2k5/8/8/1Q6/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Qa3+", "Kb6", "Qxf8"],
      themes: ["skewer"],
      rating: 1000,
      difficulty: "intermediate",
      hint: "Check the king along a diagonal that leads to a juicy piece.",
      explanation:
        "Qa3+ skewers the black king on c5 and the rook on f8 along the a3-f8 diagonal. The king must step aside, and then Qxf8 captures the rook.",
      source: "handcrafted",
    },
    {
      // Black bishop skewers white king and white rook.
      // Black bishop on f8 moves to c5, checking white king on e3.
      // Diagonal: c5-d4-e3. (2,2) from c5 to e3. Same diagonal.
      // Behind e3: what's on the c5 side? We need the valuable piece on the OTHER side of the king.
      // c5 checks e3. Behind e3 going the other direction: f2-g1.
      // So we need a rook on f2 or g1 behind the king.
      // Bc5+ checks ke3. King moves. Then Bxg1 (bishop goes c5-d4-e3-f2-g1). But king was on e3
      // and moves away, clearing path. Then bishop captures Rg1.
      // FEN: 8/4k3/8/8/8/4K3/8/5bR1 b - - 0 1 -- black bishop on f1? That's between king and rook.
      // I need the bishop to MOVE to create the skewer. Bishop on h6 moves to c1... no.
      // Bishop on a7 moves to c5+ checking ke3. Behind: f2, g1.
      // FEN: 8/b3k3/8/8/8/4K3/8/6R1 b - - 0 1
      // ba7->c5: a7 to c5: (2,2) diagonal. b6 empty. Legal.
      // Bc5+ checks ke3: c5-d4-e3. d4 empty. Check!
      // After king moves (Kd3, Kf4, Kd2, Ke2, Kf2... wait Kf2 is on the diagonal toward g1.
      // c5-d4-e3-f2-g1: Kf2 is on the diagonal. Still check from Bc5? c5 to f2: (3,3) diagonal. Yes.
      // So Kf2 is illegal (still in check). Kd2, Kd3, Kf4, Ke2(c5 to e2: (2,3) NOT diagonal. Safe), Kf3(c5 to f3: (3,2) NOT diagonal. Safe).
      // Let's use Kf4.
      // After Kf4, Bc5 to g1: c5-d4-e3(empty now)-f2-g1. Path clear. Bxg1. Won!
      id: "ps-008",
      fen: "8/b3k3/8/8/8/4K3/8/6R1 b - - 0 1",
      playerColor: "black",
      solution: ["Bc5+", "Kf4", "Bxg1"],
      themes: ["skewer"],
      rating: 1000,
      difficulty: "intermediate",
      hint: "Check the king through a diagonal that also targets a rook.",
      explanation:
        "Bc5+ skewers the white king on e3 and the rook on g1 along the c5-g1 diagonal. Once the king steps away, Bxg1 captures the rook.",
      source: "handcrafted",
    },
    // --- More pins (9-10) ---
    {
      // White bishop on f1 moves to b5, pinning black knight on c6 to king on d7.
      // Diagonal b5-c6-d7: (1,1) steps. Correct.
      // FEN: 8/3k4/2n5/8/8/8/8/4KB2 w - - 0 1
      // rank7: 3k4 = kd7. rank6: 2n5 = nc6. rank1: 4KB2 = Ke1, Bf1.
      // Bf1->b5: f1-e2-d3-c4-b5. (4,4) diagonal. e2,d3,c4 empty. Legal.
      // Bb5 pins nc6 to kd7. Knight loses.
      id: "ps-009",
      fen: "8/3k4/2n5/8/8/8/8/4KB2 w - - 0 1",
      playerColor: "white",
      solution: ["Bb5"],
      themes: ["pin"],
      rating: 900,
      difficulty: "intermediate",
      hint: "Develop your bishop to pin the knight to the king.",
      explanation:
        "Bb5 pins the black knight on c6 to the king on d7. The knight is stuck on the b5-d7 diagonal and will be captured, winning a piece.",
      source: "handcrafted",
    },
    {
      // White rook on g3 moves to g7, pinning black bishop on g7 to king on g8.
      // Wait, the rook captures the bishop: Rxg7+? No, I want a pin, not a capture.
      //
      // White rook on a3 moves to c3, pinning black bishop on c6 to king on c8.
      // c-file pin: Rc3 pins bc6 to kc8.
      // FEN: 2k5/8/2b5/8/8/R7/8/4K3 w - - 0 1
      // Ra3->c3: rank move. b3 empty. Legal. Rc3 pins bc6 to kc8 on c-file.
      // Bishop can't move off c-file without exposing king. Won.
      id: "ps-010",
      fen: "2k5/8/2b5/8/8/R7/8/4K3 w - - 0 1",
      playerColor: "white",
      solution: ["Rc3"],
      themes: ["pin"],
      rating: 950,
      difficulty: "intermediate",
      hint: "Swing the rook to a file that lines up the bishop and king.",
      explanation:
        "Rc3 pins the black bishop on c6 to the king on c8 along the c-file. The bishop is trapped and will be lost, winning a piece for White.",
      source: "handcrafted",
    },
  ],
};
