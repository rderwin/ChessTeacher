import { Chess } from "chess.js";

// Helper to sanity-check candidate move sequences before adding them to data files.
// Pass a starting FEN (or empty string for default) and a list of SAN moves.
// Prints each move number and the resulting FEN, and stops at the first illegal move.

function verify(label: string, startFen: string, sans: string[]): void {
  console.log(`\n=== ${label} ===`);
  const chess = startFen ? new Chess(startFen) : new Chess();
  console.log(`start: ${chess.fen()}`);
  for (let i = 0; i < sans.length; i++) {
    const san = sans[i];
    const turn = chess.turn() === "w" ? "white" : "black";
    let move;
    try {
      move = chess.move(san);
    } catch (e) {
      console.log(`  ${i + 1}. ${san}  ❌ ILLEGAL — ${(e as Error).message}`);
      console.log(`  current FEN: ${chess.fen()}`);
      return;
    }
    if (!move) {
      console.log(`  ${i + 1}. ${san}  ❌ chess.js returned null`);
      console.log(`  current FEN: ${chess.fen()}`);
      return;
    }
    console.log(`  ${i + 1}. ${san}  (${turn}) ✓`);
  }
  console.log(`final: ${chess.fen()}`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  // Default: verify Italian Game extension
  verify(
    "Italian Game extension",
    "",
    [
      "e4", "e5",
      "Nf3", "Nc6",
      "Bc4", "Bc5",
      "c3", "Nf6",
      "d4", "exd4",
      "cxd4", "Bb4+",
      "Bd2", "Bxd2+",
      "Nbxd2", "d5",
      "exd5", "Nxd5",
      "O-O",
      // Extension below — middlegame plan
      "O-O",
      "Re1",
      "Bf5",
      "Nb3",
      "Qd7",
      "h3",
      "Rad8",
      "Qd3",
      "Bg6",
      "Rad1",
    ],
  );

  verify(
    "Sicilian Najdorf English Attack extension",
    "",
    [
      "e4", "c5",
      "Nf3", "d6",
      "d4", "cxd4",
      "Nxd4", "Nf6",
      "Nc3", "a6",
      "Be3", "e5",
      "Nb3", "Be7",
      "f3", "O-O",
      "Qd2", "Be6",
      "O-O-O",
      // Extension
      "Nbd7",
      "g4",
      "b5",
      "g5",
      "b4",
      "Ne2",
      "Ne8",
      "h4",
      "a5",
    ],
  );

  verify(
    "French Defense Winawer extension",
    "",
    [
      "e4", "e6",
      "d4", "d5",
      "Nc3", "Bb4",
      "e5", "c5",
      "a3", "Bxc3+",
      "bxc3", "Ne7",
      "Qg4", "Qc7",
      // Extension - Winawer mainline
      "Qxg7",
      "Rg8",
      "Qxh7",
      "cxd4",
      "Ne2",
      "Nbc6",
      "f4",
      "Bd7",
      "Qd3",
    ],
  );

  verify(
    "Caro-Kann Classical extension",
    "",
    [
      "e4", "c6",
      "d4", "d5",
      "Nc3", "dxe4",
      "Nxe4", "Bf5",
      "Ng3", "Bg6",
      "h4", "h6",
      "Nf3", "Nd7",
      // Extension - Classical Caro-Kann mainline
      "h5",
      "Bh7",
      "Bd3",
      "Bxd3",
      "Qxd3",
      "Ngf6",
      "Bd2",
      "e6",
      "O-O-O",
    ],
  );

  verify(
    "London System extension",
    "",
    [
      "d4", "d5",
      "Bf4", "Nf6",
      "e3", "c5",
      "c3", "Nc6",
      "Nd2", "e6",
      "Ngf3", "Bd6",
      "Bg3", "O-O",
      "Bd3", "b6",
      // Extension
      "O-O", "Bb7",
      "Ne5", "Rc8",
      "Qe2", "Ne7",
      "f4", "cxd4",
      "exd4", "Nf5",
    ],
  );

  verify(
    "Ruy Lopez Closed extension",
    "",
    [
      "e4", "e5",
      "Nf3", "Nc6",
      "Bb5", "a6",
      "Ba4", "Nf6",
      "O-O", "Be7",
      "Re1", "b5",
      "Bb3", "d6",
      "c3", "O-O",
      // Extension — Closed Ruy Lopez
      "h3", "Na5",
      "Bc2", "c5",
      "d4", "Qc7",
      "Nbd2", "cxd4",
      "cxd4", "Nc6",
      "d5",
    ],
  );

  verify(
    "Queens Gambit Lasker Defense extension",
    "",
    [
      "d4", "d5",
      "c4", "e6",
      "Nc3", "Nf6",
      "Bg5", "Be7",
      "e3", "O-O",
      "Nf3", "Nbd7",
      "Rc1", "c6",
      "Bd3", "dxc4",
      "Bxc4",
      // Extension
      "Nd5",
      "Bxe7",
      "Qxe7",
      "O-O",
      "Nxc3",
      "Rxc3",
      "b6",
      "Qe2",
      "Bb7",
      "Rfd1",
    ],
  );
}
