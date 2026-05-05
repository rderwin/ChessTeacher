/**
 * Fixes illegal variants. Two strategies:
 *  1. If variant.opponentMove is illegal at branchesAt → DELETE the variant.
 *  2. If a variant.moves[i] is illegal → TRUNCATE moves to before the bad move.
 *     (The variant still works as a shorter line.)
 *
 *   npx tsx scripts/fix-illegal-variants.ts
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

function getArrayProp(obj: ObjectLiteralExpression, name: string): { arr: ArrayLiteralExpression | null; elements: ObjectLiteralExpression[] } {
  const prop = obj.getProperty(name);
  if (!prop || prop.getKind() !== SyntaxKind.PropertyAssignment) return { arr: null, elements: [] };
  const init = (prop as PropertyAssignment).getInitializer();
  if (!init || init.getKind() !== SyntaxKind.ArrayLiteralExpression) return { arr: null, elements: [] };
  const arr = init as ArrayLiteralExpression;
  return {
    arr,
    elements: arr.getElements()
      .filter(e => e.getKind() === SyntaxKind.ObjectLiteralExpression)
      .map(e => e as ObjectLiteralExpression),
  };
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".ts") && f !== "index.ts");
const project = new Project({
  tsConfigFilePath: path.join(__dirname, "..", "tsconfig.json"),
  skipFileDependencyResolution: true,
});

let totalDeleted = 0;
let totalTruncated = 0;

for (const file of files) {
  const filepath = path.join(dataDir, file);
  const source = project.addSourceFileAtPath(filepath);
  let changedThisFile = false;

  const exportDecls = source.getVariableDeclarations().filter(v => v.isExported());
  for (const decl of exportDecls) {
    const init = decl.getInitializer();
    if (!init || init.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
    const opening = init as ObjectLiteralExpression;
    const { elements: moves } = getArrayProp(opening, "moves");
    const { arr: variantsArr, elements: variants } = getArrayProp(opening, "variants");
    if (!variantsArr) continue;

    // Iterate in REVERSE so removals don't shift indices
    for (let vi = variants.length - 1; vi >= 0; vi--) {
      const variant = variants[vi];
      const variantId = getStringProp(variant, "id") ?? "(unknown)";
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

      // Try opponentMove
      const opponentMoveProp = variant.getProperty("opponentMove");
      if (!opponentMoveProp || opponentMoveProp.getKind() !== SyntaxKind.PropertyAssignment) continue;
      const opponentInit = (opponentMoveProp as PropertyAssignment).getInitializer();
      if (!opponentInit || opponentInit.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
      const opponentSan = getStringProp(opponentInit as ObjectLiteralExpression, "san");
      if (!opponentSan) continue;

      let opponentOk = true;
      try { v.move(opponentSan); } catch { opponentOk = false; }

      if (!opponentOk) {
        // DELETE the entire variant
        variantsArr.removeElement(vi);
        console.log(`🗑️  ${file} — DELETED variant "${variantId}" (opponentMove "${opponentSan}" illegal)`);
        totalDeleted++;
        changedThisFile = true;
        continue;
      }

      // Walk through variant.moves — truncate at the first illegal move
      const { arr: vMovesArr, elements: vMoves } = getArrayProp(variant, "moves");
      if (!vMovesArr) continue;
      let badIdx = -1;
      for (let i = 0; i < vMoves.length; i++) {
        const m = vMoves[i];
        const san = getStringProp(m, "san");
        if (!san) { badIdx = i; break; }
        try { v.move(san); } catch { badIdx = i; break; }
      }
      if (badIdx >= 0) {
        // Truncate from badIdx onwards. Remove in reverse.
        for (let i = vMoves.length - 1; i >= badIdx; i--) {
          vMovesArr.removeElement(i);
        }
        console.log(`✂️  ${file} — TRUNCATED variant "${variantId}" at move ${badIdx} (was illegal)`);
        totalTruncated++;
        changedThisFile = true;
      }
    }
  }

  if (changedThisFile) source.saveSync();
}

console.log(`\nDeleted ${totalDeleted} broken variants, truncated ${totalTruncated}.`);
