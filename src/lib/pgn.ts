import { Chess } from "chess.js";

export interface ParsedMove {
  san: string;
  fen: string;
  moveNumber: number;
  color: "w" | "b";
  from: string;
  to: string;
  captured?: string;
  isCheck: boolean;
  isCheckmate: boolean;
}

export interface ParsedGame {
  headers: Record<string, string>;
  moves: ParsedMove[];
  startFen: string;
  result: string;
}

export function parsePgn(pgn: string): ParsedGame {
  const chess = new Chess();
  chess.loadPgn(pgn);

  const headers: Record<string, string> = {};
  const headerObj = chess.header();
  for (const key of Object.keys(headerObj)) {
    const val = headerObj[key];
    if (val != null) headers[key] = val;
  }

  const history = chess.history({ verbose: true });
  const result = headers["Result"] ?? "*";

  // Replay to collect FENs at each position
  chess.reset();
  const startFen = chess.fen();
  const moves: ParsedMove[] = [];

  for (const move of history) {
    chess.move(move.san);
    moves.push({
      san: move.san,
      fen: chess.fen(),
      moveNumber: Math.ceil(moves.length / 2) + (moves.length % 2 === 0 ? 1 : 0),
      color: move.color,
      from: move.from,
      to: move.to,
      captured: move.captured,
      isCheck: chess.isCheck(),
      isCheckmate: chess.isCheckmate(),
    });
  }

  return { headers, moves, startFen, result };
}
