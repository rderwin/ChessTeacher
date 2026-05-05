/**
 * Removes puzzles with illegal solutions.
 *
 *   npx tsx scripts/fix-illegal-puzzles.ts
 */

import { Project, SyntaxKind, type ObjectLiteralExpression, type ArrayLiteralExpression, type PropertyAssignment, type StringLiteral } from "ts-morph";
import { Chess } from "chess.js";
import * as path from "path";
import * as fs from "fs";

const dataDir = path.join(__dirname, "..", "src/data/puzzles");

function getStringProp(obj: ObjectLiteralExpression, name: string): string | null {
  const prop = obj.getProperty(name);
  if (!prop || prop.getKind() !== SyntaxKind.PropertyAssignment) return null;
  const init = (prop as PropertyAssignment).getInitializer();
  if (!init) return null;
  if (init.getKind() === SyntaxKind.StringLiteral || init.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral) {
    return init.getText().slice(1, -1);
  }
  return null;
}

function getStringArrayProp(obj: ObjectLiteralExpression, name: string): string[] | null {
  const prop = obj.getProperty(name);
  if (!prop || prop.getKind() !== SyntaxKind.PropertyAssignment) return null;
  const init = (prop as PropertyAssignment).getInitializer();
  if (!init || init.getKind() !== SyntaxKind.ArrayLiteralExpression) return null;
  return (init as ArrayLiteralExpression).getElements()
    .filter(e => e.getKind() === SyntaxKind.StringLiteral)
    .map(e => (e as StringLiteral).getText().slice(1, -1));
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".ts") && f !== "index.ts");
const project = new Project({
  tsConfigFilePath: path.join(__dirname, "..", "tsconfig.json"),
  skipFileDependencyResolution: true,
});

let totalDeleted = 0;
let totalChecked = 0;

for (const file of files) {
  const filepath = path.join(dataDir, file);
  const source = project.addSourceFileAtPath(filepath);
  let deletedFromThisFile = 0;

  const exportDecls = source.getVariableDeclarations().filter(v => v.isExported());
  for (const decl of exportDecls) {
    const init = decl.getInitializer();
    if (!init || init.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
    const set = init as ObjectLiteralExpression;

    const puzzlesProp = set.getProperty("puzzles");
    if (!puzzlesProp || puzzlesProp.getKind() !== SyntaxKind.PropertyAssignment) continue;
    const puzzlesInit = (puzzlesProp as PropertyAssignment).getInitializer();
    if (!puzzlesInit || puzzlesInit.getKind() !== SyntaxKind.ArrayLiteralExpression) continue;
    const puzzlesArr = puzzlesInit as ArrayLiteralExpression;
    const elements = puzzlesArr.getElements()
      .filter(e => e.getKind() === SyntaxKind.ObjectLiteralExpression)
      .map(e => e as ObjectLiteralExpression);

    // Iterate in reverse so removals don't shift indices
    for (let i = elements.length - 1; i >= 0; i--) {
      const puzzle = elements[i];
      const id = getStringProp(puzzle, "id") ?? "(unknown)";
      const fen = getStringProp(puzzle, "fen");
      const solution = getStringArrayProp(puzzle, "solution");
      if (!fen || !solution) continue;

      totalChecked++;
      let chess: Chess;
      try {
        chess = new Chess(fen);
      } catch {
        puzzlesArr.removeElement(i);
        console.log(`🗑️  ${file} — DELETED puzzle "${id}" (invalid FEN)`);
        deletedFromThisFile++;
        continue;
      }

      let bad = false;
      for (let j = 0; j < solution.length; j++) {
        try {
          const r = chess.move(solution[j]);
          if (!r) { bad = true; break; }
        } catch {
          bad = true;
          break;
        }
      }

      if (bad) {
        puzzlesArr.removeElement(i);
        console.log(`🗑️  ${file} — DELETED puzzle "${id}" (illegal solution: ${solution.join(" ")})`);
        deletedFromThisFile++;
      }
    }
  }

  if (deletedFromThisFile > 0) {
    source.saveSync();
    totalDeleted += deletedFromThisFile;
  }
}

console.log(`\nChecked ${totalChecked} puzzles, deleted ${totalDeleted}.`);
