import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const figmaDir = path.join(packageRoot, "../dist/figma");

/** Token set files: `{slug}.tokens.json` (kebab-case). Matches sd.config.mjs figma destinations. */
const TOKEN_FILE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.tokens\.json$/;

function discoverTokenFiles() {
  if (!fs.existsSync(figmaDir)) {
    return { files: [], errors: [`Missing output directory: ${figmaDir}`] };
  }

  const entries = fs.readdirSync(figmaDir, { withFileTypes: true });
  const matched = [];
  const skipped = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (TOKEN_FILE_PATTERN.test(entry.name)) {
      matched.push(entry.name);
    } else {
      skipped.push(entry.name);
    }
  }

  matched.sort();
  const errors = [];

  if (matched.length === 0) {
    errors.push(`No *.tokens.json files found in ${figmaDir}`);
  }

  for (const name of skipped) {
    errors.push(`Unexpected file in dist/figma/: ${name} (expected {slug}.tokens.json)`);
  }

  return { files: matched, errors };
}

/** Style Dictionary css/color transform — colours should stay as source literals. */
const CSS_TRANSFORMED_COLOR = /^rgba?\(\d+\s*,/;

function validateNode(node, tokenPath, errors) {
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    errors.push(`${tokenPath || "(root)"}: expected object`);
    return 0;
  }

  const hasValue = "value" in node;
  const hasType = "type" in node;

  if (hasValue !== hasType) {
    errors.push(`${tokenPath}: token leaf must include both "value" and "type"`);
    return 0;
  }

  if (hasValue) {
    const keys = Object.keys(node);
    if (keys.length !== 2) {
      errors.push(`${tokenPath}: leaf must contain only "value" and "type"`);
      return 0;
    }

    if (typeof node.type !== "string" || node.type.length === 0) {
      errors.push(`${tokenPath}: "type" must be a non-empty string`);
      return 0;
    }

    if (typeof node.value !== "string" && typeof node.value !== "number") {
      errors.push(`${tokenPath}: "value" must be a string or number`);
      return 0;
    }

    if (
      node.type === "color" &&
      typeof node.value === "string" &&
      CSS_TRANSFORMED_COLOR.test(node.value)
    ) {
      errors.push(
        `${tokenPath}: color value looks CSS-transformed (${node.value}) — expected hex or literal`,
      );
      return 0;
    }

    return 1;
  }

  let count = 0;
  for (const [key, child] of Object.entries(node)) {
    const childPath = tokenPath ? `${tokenPath}.${key}` : key;
    count += validateNode(child, childPath, errors);
  }
  return count;
}

function validateFile(filename) {
  const filePath = path.join(figmaDir, filename);
  if (!fs.existsSync(filePath)) {
    return { errors: [`Missing ${filename}`], leafCount: 0 };
  }

  let json;
  try {
    json = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return { errors: [`Invalid JSON in ${filename}: ${error.message}`], leafCount: 0 };
  }

  const errors = [];
  const leafCount = validateNode(json, "", errors);

  if (leafCount === 0 && errors.length === 0) {
    errors.push(`${filename}: expected at least one token`);
  }

  return { errors, leafCount };
}

const { files: tokenFiles, errors: discoveryErrors } = discoverTokenFiles();

let failed = discoveryErrors.length > 0;
if (failed) {
  for (const message of discoveryErrors) {
    console.error(message);
  }
}

let totalLeaves = 0;

for (const filename of tokenFiles) {
  const { errors, leafCount } = validateFile(filename);
  if (errors.length > 0) {
    for (const message of errors) {
      console.error(message.startsWith(filename) ? message : `${filename}: ${message}`);
    }
    failed = true;
    continue;
  }
  totalLeaves += leafCount;
}

if (failed) {
  process.exit(1);
}

console.log(
  `Verified ${tokenFiles.length} Figma token files in dist/figma/ (${totalLeaves} tokens)`,
);
