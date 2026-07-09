#!/usr/bin/env node
/**
 * Build GitHub Release tag + notes for the current @jigsaw-ds/design-system version.
 * Aggregates the matching section from each publishable package CHANGELOG.md.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const PUBLISHABLE_PACKAGES = [
  "packages/design-system",
  "packages/tokens",
  "packages/theme-build",
  "packages/themes/default",
  "packages/themes/portfolio",
];

function readJson(packageRel) {
  return JSON.parse(
    readFileSync(path.join(repoRoot, packageRel, "package.json"), "utf8"),
  );
}

function extractChangelogSection(changelog, version) {
  const heading = `## ${version}`;
  const start = changelog.indexOf(heading);
  if (start === -1) {
    return null;
  }

  const afterHeading = changelog.indexOf("\n", start) + 1;
  const nextHeading = changelog.indexOf("\n## ", afterHeading);
  const section =
    nextHeading === -1
      ? changelog.slice(afterHeading)
      : changelog.slice(afterHeading, nextHeading);

  return section.trim();
}

const version = readJson("packages/design-system").version;
const tag = `v${version}`;
const sections = [];

for (const packageRel of PUBLISHABLE_PACKAGES) {
  const changelogPath = path.join(repoRoot, packageRel, "CHANGELOG.md");
  if (!existsSync(changelogPath)) {
    continue;
  }

  const changelog = readFileSync(changelogPath, "utf8");
  const section = extractChangelogSection(changelog, version);
  if (!section) {
    continue;
  }

  const name = readJson(packageRel).name;
  sections.push(`### ${name}\n\n${section}`);
}

const body =
  sections.length > 0
    ? sections.join("\n\n")
    : [
        `Publish @jigsaw-ds/* packages at **${version}**.`,
        "",
        "Packages:",
        ...PUBLISHABLE_PACKAGES.map((packageRel) => `- ${readJson(packageRel).name}`),
      ].join("\n");

process.stdout.write(JSON.stringify({ version, tag, body }));
