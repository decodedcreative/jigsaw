/**
 * Types for `public-entries.mjs`, which is consumed by `tsup.config.ts` and
 * `src/package-exports.test.ts`.
 */

/** A public package entry point discovered under `src`. */
export interface PublicEntry {
  /** Package subpath without the leading `./`, e.g. `button`. */
  subpath: string;
  /** Entry source file, relative to the package root. */
  source: string;
  /** Output directory under `dist`. */
  distDir: string;
  /** Entry key for the declaration-only tsup build. */
  dtsEntryKey: string;
}

/** Conditional `import` / `require` target pair for one subpath. */
export interface ConditionalExport {
  import: { types: string; default: string };
  require: { types: string; default: string };
}

export type PackageExports = Record<string, string | ConditionalExport>;

export function listPublicEntries(): PublicEntry[];

export function getDtsEntryRecord(): Record<string, string>;

export function buildPackageExports(): PackageExports;

export function syncPackageExports(options?: { write?: boolean }): {
  changed: boolean;
  exports: PackageExports;
  entries: PublicEntry[];
  packageJsonPath: string;
};
