/**
 * Safely removes illegal commonMistake entries using TypeScript AST.
 *   npx tsx scripts/fix-illegal-mistakes.ts
 */

import { Project, SyntaxKind, type ObjectLiteralExpression, type ArrayLiteralExpression, type PropertyAssignment } from "ts-morph";
import { Chess } from "chess.js";
import * as path from "path";
import * as fs from "fs";

const dataDir = path.join(__dirname, "..", "src/data/openings");

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

function getNumberProp(obj: ObjectLiteralExpression, name: string): number | null {
  const prop = obj.getProperty(name);
  if (!prop || prop.getKind() !== SyntaxKind.PropertyAssignment) return null;
  const init = (prop as PropertyAssignment).getInitializer();
  if (!init) return null;
  const n = parseInt(init.getText(), 10);
  return isNaN(n) ? null : n;
}

function getArrayProp(obj: ObjectLiteralExpression, name: string): ObjectLiteralExpression[] {
  const prop = obj.getProperty(name);
  if (!prop || prop.getKind() !== SyntaxKind.PropertyAssignment) return [];
  const init = (prop as PropertyAssignment).getInitializer();
  if (!init || init.getKind() !== SyntaxKind.ArrayLiteralExpression) return [];
  return (init as ArrayLiteralExpression).getElements()
    .filter(e => e.getKind() === SyntaxKind.ObjectLiteralExpression)
    .map(e => e as ObjectLiteralExpression);
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".ts") && f !== "index.ts");
const project = new Project({
  tsConfigFilePath: path.join(__dirname, "..", "tsconfig.json"),
  skipFileDependencyResolution: true,
});

let totalRemoved = 0;
let totalChecked = 0;

for (const file of files) {
  const filepath = path.join(dataDir, file);
  const source = project.addSourceFileAtPath(filepath);
  let removedFromThisFile = 0;

  const exportDecls = source.getVariableDeclarations().filter(v => v.isExported());
  for (const decl of exportDecls) {
    const init = decl.getInitializer();
    if (!init || init.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
    const opening = init as ObjectLiteralExpression;

    const moves = getArrayProp(opening, "moves");
    const replay = new Chess();
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      const moveSan = getStringProp(move, "san");
      if (!moveSan) continue;
      const mistakesProp = move.getProperty("commonMistakes");
      if (mistakesProp && mistakesProp.getKind() === SyntaxKind.PropertyAssignment) {
        const mistakesInit = (mistakesProp as PropertyAssignment).getInitializer();
        if (mistakesInit && mistakesInit.getKind() === SyntaxKind.ArrayLiteralExpression) {
          const mistakesArr = mistakesInit as ArrayLiteralExpression;
          const elements = mistakesArr.getElements();
          for (let j = elements.length - 1; j >= 0; j--) {
            const el = elements[j];
            if (el.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
            const mSan = getStringProp(el as ObjectLiteralExpression, "san");
            if (!mSan) continue;
            totalChecked++;
            const test = new Chess(replay.fen());
            try {
              const r = test.move(mSan);
              if (!r) throw new Error("null");
            } catch {
              mistakesArr.removeElement(j);
              removedFromThisFile++;
            }
          }
        }
      }
      try { replay.move(moveSan); } catch { break; }
    }

    const variants = getArrayProp(opening, "variants");
    for (const variant of variants) {
      const branchesAt = getNumberProp(variant, "branchesAt");
      if (branchesAt === null) continue;
      const v = new Chess();
      let setupOk = true;
      for (let i = 0; i < branchesAt; i++) {
        const m = moves[i];
        if (!m) { setupOk = false; break; }
        const san = getStringProp(m, "san");
        if (!san) { setupOk = false; break; }
        try { v.move(san); } catch { setupOk = false; break; }
      }
      if (!setupOk) continue;

      const opponentMoveProp = variant.getProperty("opponentMove");
      if (!opponentMoveProp || opponentMoveProp.getKind() !== SyntaxKind.PropertyAssignment) continue;
      const opponentInit = (opponentMoveProp as PropertyAssignment).getInitializer();
      if (!opponentInit || opponentInit.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
      const opponentSan = getStringProp(opponentInit as ObjectLiteralExpression, "san");
      if (!opponentSan) continue;
      try { v.move(opponentSan); } catch { continue; }

      const vMoves = getArrayProp(variant, "moves");
      for (let i = 0; i < vMoves.length; i++) {
        const move = vMoves[i];
        const moveSan = getStringProp(move, "san");
        if (!moveSan) continue;
        const mistakesProp = move.getProperty("commonMistakes");
        if (mistakesProp && mistakesProp.getKind() === SyntaxKind.PropertyAssignment) {
          const mistakesInit = (mistakesProp as PropertyAssignment).getInitializer();
          if (mistakesInit && mistakesInit.getKind() === SyntaxKind.ArrayLiteralExpression) {
            const mistakesArr = mistakesInit as ArrayLiteralExpression;
            const elements = mistakesArr.getElements();
            for (let j = elements.length - 1; j >= 0; j--) {
              const el = elements[j];
              if (el.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
              const mSan = getStringProp(el as ObjectLiteralExpression, "san");
              if (!mSan) continue;
              totalChecked++;
              const test = new Chess(v.fen());
              try {
                const r = test.move(mSan);
                if (!r) throw new Error("null");
              } catch {
                mistakesArr.removeElement(j);
                removedFromThisFile++;
              }
            }
          }
        }
        try { v.move(moveSan); } catch { break; }
      }
    }
  }

  if (removedFromThisFile > 0) {
    source.saveSync();
    console.log(`✏️  ${file} — removed ${removedFromThisFile}`);
    totalRemoved += removedFromThisFile;
  }
}

console.log(`\nDone. Checked ${totalChecked} mistakes, removed ${totalRemoved} illegal ones.`);
