import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const figmaDir = path.join(packageRoot, "../dist/figma");

const EXPECTED_FILES = {
  "shared.tokens.json": { leafCount: 96, sample: (json) => json.spacing?.["4"]?.value === "1rem" },
  "default-base.tokens.json": {
    leafCount: 35,
    sample: (json) => json.color?.navy?.["500"]?.value === "#627d98",
  },
  "default-light.tokens.json": {
    leafCount: 64,
    sample: (json) => json.color?.interactive?.secondary?.value === "transparent",
  },
  "default-dark.tokens.json": {
    leafCount: 64,
    sample: (json) => json.color?.surface?.primary?.value === "#0a1929",
  },
  "portfolio.tokens.json": {
    leafCount: 84,
    sample: (json) => json.color?.surface?.primary?.value === "#1a2332",
  },
};

function countLeaves(obj) {
  if (obj && typeof obj === "object" && "value" in obj && "type" in obj) return 1;
  return Object.values(obj ?? {}).reduce((total, value) => total + countLeaves(value), 0);
}

let failed = false;

for (const [filename, { leafCount, sample }] of Object.entries(EXPECTED_FILES)) {
  const filePath = path.join(figmaDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing ${filename}`);
    failed = true;
    continue;
  }

  let json;
  try {
    json = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Invalid JSON in ${filename}:`, error.message);
    failed = true;
    continue;
  }

  const actualCount = countLeaves(json);
  if (actualCount !== leafCount) {
    console.error(`${filename}: expected ${leafCount} tokens, got ${actualCount}`);
    failed = true;
  }

  if (!sample(json)) {
    console.error(`${filename}: sample value check failed`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log(`Verified ${Object.keys(EXPECTED_FILES).length} Figma token files in dist/figma/`);
