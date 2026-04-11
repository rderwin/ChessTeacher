export interface EndgameLesson {
  id: string;
  title: string;
  description: string;
  objective: string;
  /** Starting FEN — player (White) has the extra material */
  fen: string;
  /** Max moves to deliver checkmate (for rating) */
  parMoves: number;
  /** Tips shown during practice */
  tips: string[];
  /** Detailed explanation shown before starting */
  explanation: string;
}

export const ENDGAME_LESSONS: EndgameLesson[] = [
  {
    id: "kq-vs-k",
    title: "King & Queen vs King",
    description: "The most common basic checkmate — learn the technique to force mate efficiently.",
    objective: "Deliver checkmate with King + Queen vs lone King",
    fen: "8/8/8/4k3/8/8/8/4K2Q w - - 0 1",
    parMoves: 10,
    tips: [
      "Use the queen to cut off the enemy king's escape squares",
      "Push the enemy king toward the edge of the board",
      "Bring your own king up to help — the queen needs the king's support for checkmate",
      "Don't accidentally stalemate! Always leave the opponent at least one square (but make sure it's not an escape)",
      "The checkmate happens on the edge — the king gets trapped against the side of the board",
    ],
    explanation: "The King + Queen vs King checkmate is the most fundamental endgame technique. The queen is powerful enough to control many squares at once, but she can't deliver checkmate alone — your king must help. The method: use the queen to restrict the enemy king, drive it toward an edge, bring your king up to support, and deliver mate. Watch out for stalemate — if you take away ALL the enemy king's squares without giving check, it's a draw!",
  },
  {
    id: "kr-vs-k",
    title: "King & Rook vs King",
    description: "Trickier than Q vs K — learn the 'box method' to push the king to the edge.",
    objective: "Deliver checkmate with King + Rook vs lone King",
    fen: "8/8/8/4k3/8/8/8/R3K3 w - - 0 1",
    parMoves: 16,
    tips: [
      "Use the rook to create a 'box' — cut off the king from part of the board",
      "Shrink the box by moving the rook to the next rank/file when safe",
      "Bring your king up to opposition — face the enemy king with one square between",
      "The key technique: get opposition, then use the rook to check and push the king back one more rank",
      "If the enemy king approaches the rook, just move the rook to the other side of the board",
    ],
    explanation: "The King + Rook vs King checkmate uses the 'box method.' The rook creates an invisible wall that the enemy king can't cross (by controlling an entire rank or file). You gradually shrink this box, pushing the king toward the edge. Your king helps by taking opposition (facing the enemy king with one square between). When the enemy king reaches the edge, you deliver checkmate by placing the rook on the back rank while your king covers the escape squares.",
  },
  {
    id: "k2r-vs-k",
    title: "King & 2 Rooks vs King",
    description: "The ladder mate — alternate rooks to push the king off the board.",
    objective: "Deliver checkmate with King + 2 Rooks vs lone King",
    fen: "8/8/8/4k3/8/8/8/R3K2R w - - 0 1",
    parMoves: 8,
    tips: [
      "This is the easiest checkmate — you don't even need your king!",
      "Alternate rooks: one checks on a rank, the enemy king moves, the other checks on the next rank",
      "This is called the 'ladder' or 'staircase' mate — each rook climbs one step",
      "If the king attacks one rook, just move it far away on the same rank",
    ],
    explanation: "The Ladder Mate with two rooks is the simplest forced checkmate pattern. The technique: place one rook to check the king on a rank, the king is forced to move forward or backward. Then place the OTHER rook on the next rank — another check. Keep alternating ('climbing the ladder') until the king reaches the edge where it's checkmate. You don't even need your king for this one!",
  },
  {
    id: "kp-vs-k",
    title: "King & Pawn vs King",
    description: "Can you promote? Learn opposition, key squares, and when a pawn ending is won or drawn.",
    objective: "Promote the pawn (or recognize it's a draw)",
    fen: "8/8/8/8/4P3/8/4K3/4k3 w - - 0 1",
    parMoves: 20,
    tips: [
      "The key concept: OPPOSITION. When two kings face each other with one square between, whoever does NOT have to move has the advantage",
      "Your king must get IN FRONT of the pawn — the king leads, the pawn follows",
      "If the opponent's king is directly in front of the pawn, you might need to gain a tempo to outflank",
      "Edge pawns (a and h file) are often drawn because the king gets trapped on the edge",
      "If in doubt, try to get your king to the 6th rank in front of the pawn — that's usually winning",
    ],
    explanation: "King + Pawn vs King is one of the most important endgames in chess. The outcome depends on a concept called opposition — when two kings face each other with one square between, the player who does NOT have to move has the advantage (the other king must step aside). The winning technique: get your king IN FRONT of the pawn, gain opposition, and escort the pawn to promotion. Sometimes it's a draw — you need to recognize those positions too.",
  },
];

export function getEndgameById(id: string): EndgameLesson | undefined {
  return ENDGAME_LESSONS.find((l) => l.id === id);
}
