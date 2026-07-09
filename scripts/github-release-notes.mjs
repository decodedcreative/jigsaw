#!/usr/bin/env node
/**
 * Build GitHub Release tag + notes for a @jigsaw-ds/* package version.
 * Aggregates the matching section from each publishable package CHANGELOG.md.
 *
 * Usage:
 *   node scripts/github-release-notes.mjs
 *   node scripts/github-release-notes.mjs --notes-file release-notes.md --tag-file tag.txt
 *   node scripts/github-release-notes.mjs --require-changelog --version 0.2.0
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
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

function getArg(args, flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

function readJson(packageRel) {
  const filePath = path.join(repoRoot, packageRel, "package.json");
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Failed to read ${filePath}: ${error.message}`);
  }
}

function readChangelog(packageRel) {
  const filePath = path.join(repoRoot, packageRel, "CHANGELOG.md");
  try {
    return readFileSync(filePath, "utf8");
  } catch (error) {
    throw new Error(`Failed to read ${filePath}: ${error.message}`);
  }
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

export function buildReleaseNotes(version) {
  const tag = `v${version}`;
  const sections = [];

  for (const packageRel of PUBLISHABLE_PACKAGES) {
    const changelogPath = path.join(repoRoot, packageRel, "CHANGELOG.md");
    if (!existsSync(changelogPath)) {
      continue;
    }

    const changelog = readChangelog(packageRel);
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

  return { version, tag, body, hasChangelogEntries: sections.length > 0 };
}

function main() {
  const args = process.argv.slice(2);
  const explicitVersion = getArg(args, "--version");
  const requireChangelog = args.includes("--require-changelog");
  const notesFile = getArg(args, "--notes-file");
  const tagFile = getArg(args, "--tag-file");

  const version = explicitVersion ?? readJson("packages/design-system").version;
  const { tag, body, hasChangelogEntries } = buildReleaseNotes(version);

  if (requireChangelog && !hasChangelogEntries) {
    console.error(
      `No CHANGELOG.md entries found for version ${version} in publishable packages`,
    );
    process.exit(1);
  }

  if (notesFile) {
    writeFileSync(notesFile, body);
  }
  if (tagFile) {
    writeFileSync(tagFile, tag);
  }
  if (!notesFile && !tagFile) {
    process.stdout.write(JSON.stringify({ version, tag, body, hasChangelogEntries }));
  }
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  main();
}
