#!/usr/bin/env node
/**
 * Test the published packages the way an app gets them (JSW-130).
 *
 * `validate:packages` builds apps/web inside the workspace, where npm links
 * the packages' source folders, so a file missing from a package's `files`
 * or an undeclared dependency can still pass. This script:
 *
 * 1. Packs every publishable package with `npm pack`.
 * 2. Copies apps/web to a temporary folder outside the repo, and points its
 *    `@jigsaw-ds/*` dependencies, and npm `overrides` for packages that
 *    depend on each other, at the tarballs.
 * 3. Installs, builds and starts the copy with Next.js.
 * 4. Opens every page in Chromium and fails on: a page that doesn't load, an
 *    uncaught error, a console error, a class with no CSS rule, or a link to
 *    a page that doesn't exist.
 *
 *   node scripts/test-packed.mjs              # builds the packages first
 *   node scripts/test-packed.mjs --skip-build # packages are already built
 *   node scripts/test-packed.mjs --keep       # keep the temporary folder
 */
import { execFileSync, spawn } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { publishablePackagePaths } from "./lib/publishable-packages.mjs";
import { classesWithoutCss, pageRoutes } from "./lib/packed-app-checks.mjs";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const args = new Set(process.argv.slice(2));
const PORT = Number(process.env.TEST_PACKED_PORT ?? 3123);
const baseUrl = `http://localhost:${PORT}`;

function run(command, commandArgs, cwd) {
  console.log(
    `\n$ ${[command, ...commandArgs].join(" ")}  (in ${path.relative(repoRoot, cwd) || "."})`,
  );
  execFileSync(command, commandArgs, { cwd, stdio: "inherit" });
}

function packPackages(packageDirs, destination) {
  const tarballs = {};
  for (const packageRel of packageDirs) {
    const packageDir = path.join(repoRoot, packageRel);
    const { name } = JSON.parse(
      readFileSync(path.join(packageDir, "package.json"), "utf8"),
    );
    const output = execFileSync(
      "npm",
      ["pack", "--json", "--pack-destination", destination],
      {
        cwd: packageDir,
        encoding: "utf8",
      },
    );
    const [{ filename }] = JSON.parse(output.slice(output.indexOf("[")));
    tarballs[name] = path.join(destination, filename);
    console.log(`packed ${name} → ${filename}`);
  }
  return tarballs;
}

function copyApp(destination) {
  const source = path.join(repoRoot, "apps/web");
  cpSync(source, destination, {
    recursive: true,
    filter: (file) =>
      !/(^|[/\\])(node_modules|\.next)([/\\]|$)/.test(
        path.relative(source, file),
      ),
  });
}

/** Points every `@jigsaw-ds/*` dependency, direct or transitive, at its tarball. */
function useTarballs(appDir, tarballs) {
  const manifestPath = path.join(appDir, "package.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const fileSpec = (name) => `file:${tarballs[name]}`;
  for (const field of ["dependencies", "devDependencies"]) {
    for (const name of Object.keys(manifest[field] ?? {})) {
      if (name.startsWith("@jigsaw-ds/")) {
        if (!tarballs[name])
          throw new Error(
            `apps/web depends on ${name}, which isn't a publishable package`,
          );
        manifest[field][name] = fileSpec(name);
      }
    }
  }
  manifest.overrides = Object.fromEntries(
    Object.keys(tarballs).map((name) => [name, fileSpec(name)]),
  );
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

function startServer(appDir) {
  // Its own process group, so stopping it also stops the Next.js process npx starts.
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: appDir,
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
  });
  server.stdout.on("data", (chunk) => process.stdout.write(`[next] ${chunk}`));
  server.stderr.on("data", (chunk) => process.stderr.write(`[next] ${chunk}`));
  return server;
}

async function waitForServer(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.status < 500) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(
    `Next.js didn't start on ${baseUrl} within ${timeoutMs / 1000}s`,
  );
}

async function checkPages(routes) {
  const failures = [];
  const browser = await chromium.launch();
  const linkStatus = new Map();

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      const problems = [];
      page.on("pageerror", (error) =>
        problems.push(`uncaught error: ${error.message}`),
      );
      page.on("console", (message) => {
        if (message.type() === "error")
          problems.push(`console error: ${message.text()}`);
      });

      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
      });
      if (!response || response.status() >= 400) {
        problems.push(`responded ${response?.status() ?? "with nothing"}`);
      }

      const { classes, selectorText, links } = await page.evaluate(() => {
        const rules = [];
        const collect = (list) => {
          for (const rule of Array.from(list)) {
            if ("selectorText" in rule && rule.selectorText)
              rules.push(rule.selectorText);
            if ("cssRules" in rule && rule.cssRules) collect(rule.cssRules);
          }
        };
        for (const sheet of Array.from(document.styleSheets)) {
          try {
            collect(sheet.cssRules);
          } catch {
            // A cross-origin sheet can't be read; the app serves its own CSS.
          }
        }
        const classes = new Set();
        for (const element of Array.from(
          document.querySelectorAll("[class]"),
        )) {
          const value = element.getAttribute("class") ?? "";
          for (const token of value.split(/\s+/)) if (token) classes.add(token);
        }
        const links = Array.from(document.querySelectorAll("a[href]"))
          .map((anchor) => anchor.getAttribute("href") ?? "")
          .filter((href) => href.startsWith("/") && !href.startsWith("//"));
        return { classes: Array.from(classes), selectorText: rules, links };
      });

      for (const name of classesWithoutCss(classes, selectorText)) {
        problems.push(`class with no CSS rule: ${name}`);
      }

      for (const href of new Set(links)) {
        const target = href.split(/[?#]/)[0] || "/";
        if (!linkStatus.has(target)) {
          const linkResponse = await fetch(`${baseUrl}${target}`);
          linkStatus.set(target, linkResponse.status);
        }
        if (linkStatus.get(target) >= 400)
          problems.push(
            `link to a missing page: ${href} (${linkStatus.get(target)})`,
          );
      }

      console.log(`${problems.length ? "✗" : "✓"} ${route}`);
      for (const problem of problems) console.log(`    ${problem}`);
      failures.push(...problems.map((problem) => `${route}: ${problem}`));
      await page.close();
    }
  } finally {
    await browser.close();
  }
  return failures;
}

async function main() {
  const packageDirs = publishablePackagePaths(repoRoot);
  if (!args.has("--skip-build")) {
    for (const packageRel of packageDirs)
      run("npm", ["run", "build"], path.join(repoRoot, packageRel));
  }

  const workDir = mkdtempSync(path.join(os.tmpdir(), "jigsaw-packed-"));
  const tarballDir = path.join(workDir, "tarballs");
  const appDir = path.join(workDir, "web");
  console.log(`\nWorking in ${workDir}`);

  let server;
  try {
    mkdirSync(tarballDir, { recursive: true });
    const tarballs = packPackages(packageDirs, tarballDir);
    copyApp(appDir);
    useTarballs(appDir, tarballs);
    run(
      "npm",
      ["install", "--no-audit", "--no-fund", "--loglevel=error"],
      appDir,
    );
    run("npx", ["next", "build"], appDir);

    const routes = pageRoutes(
      JSON.parse(
        readFileSync(
          path.join(appDir, ".next/app-path-routes-manifest.json"),
          "utf8",
        ),
      ),
    );
    console.log(`\nChecking ${routes.length} pages: ${routes.join(", ")}`);

    server = startServer(appDir);
    await waitForServer();
    const failures = await checkPages(routes);

    if (failures.length) {
      console.error(
        `\ntest-packed: ${failures.length} problem(s) across ${routes.length} pages`,
      );
      process.exitCode = 1;
    } else {
      console.log(`\ntest-packed: all ${routes.length} pages passed`);
    }
  } finally {
    if (server?.pid) {
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        // Already stopped.
      }
    }
    if (args.has("--keep")) console.log(`Kept ${workDir}`);
    else rmSync(workDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
