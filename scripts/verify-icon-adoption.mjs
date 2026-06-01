#!/usr/bin/env node
/**
 * JSW-43 — verify Icon adoption across the monorepo.
 *
 * Fails when:
 * - Inline <svg> appears outside the documented exception list
 * - Raw Phosphor icon JSX (e.g. <XIcon />) appears outside Icon internals
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;

function loadSvgExceptions() {
  const source = readFileSync(join(ROOT, "icon-svg-exceptions.ts"), "utf8");
  return [...source.matchAll(/"((?:packages|apps)\/[^"]+\.tsx)"/g)].map((m) => m[1]);
}

const SVG_EXCEPTIONS = new Set(loadSvgExceptions());

const SCAN_ROOTS = ["apps/web", "apps/storybook/stories", "packages/design-system/src"];

const PHOSPHOR_IMPORT = /@phosphor-icons\/react/;

/** Custom components — not raw Phosphor glyphs. */
const ALLOWED_ICON_COMPONENT_TAGS = new Set([
  "NotificationTypeIcon",
  "ToastIcon",
  "GoogleIcon",
  "GitHubIcon",
]);

const RAW_PHOSPHOR_ICON_JSX = /<([A-Z][a-zA-Z]*Icon)\b/g;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === "dist") continue;
      walk(path, files);
    } else if (/\.tsx?$/.test(name)) {
      files.push(path);
    }
  }
  return files;
}

function rel(path) {
  return relative(ROOT, path).replaceAll("\\", "/");
}

function checkSvgExceptions() {
  const violations = [];
  for (const root of SCAN_ROOTS) {
    for (const file of walk(join(ROOT, root))) {
      const content = readFileSync(file, "utf8");
      if (!content.includes("<svg")) continue;
      const path = rel(file);
      if (!SVG_EXCEPTIONS.has(path)) {
        violations.push(path);
      }
    }
  }
  return violations;
}

function isPhosphorIconInternals(path) {
  return path.includes("/components/icon/Icon.tsx");
}

function checkRawPhosphorJsx() {
  const violations = [];
  for (const root of SCAN_ROOTS) {
    for (const file of walk(join(ROOT, root))) {
      const path = rel(file);
      if (isPhosphorIconInternals(path)) continue;

      const content = readFileSync(file, "utf8");
      if (!PHOSPHOR_IMPORT.test(content)) continue;

      for (const match of content.matchAll(RAW_PHOSPHOR_ICON_JSX)) {
        const tag = match[1];
        if (tag === "Icon") continue;
        if (ALLOWED_ICON_COMPONENT_TAGS.has(tag)) continue;
        violations.push(`${path}: <${tag} />`);
      }
    }
  }
  return [...new Set(violations)];
}

const svgViolations = checkSvgExceptions();
const phosphorViolations = checkRawPhosphorJsx();

let failed = false;

if (svgViolations.length > 0) {
  failed = true;
  console.error("Unexpected inline <svg> (not in icon-svg-exceptions.ts):\n");
  for (const v of svgViolations) console.error(`  - ${v}`);
  console.error();
}

if (phosphorViolations.length > 0) {
  failed = true;
  console.error("Raw Phosphor icon JSX (use <Icon icon={…} /> instead):\n");
  for (const v of phosphorViolations) console.error(`  - ${v}`);
  console.error();
}

if (failed) {
  process.exit(1);
}

console.log("Icon adoption verification passed.");
console.log(`  SVG exceptions: ${SVG_EXCEPTIONS.size} files`);
console.log(`  Scanned: ${SCAN_ROOTS.join(", ")}`);
