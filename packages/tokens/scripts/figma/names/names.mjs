import { SHARED_TOKEN_FILENAME } from "../constants/index.mjs";

/** Tokens Studio set id: `{slug}.tokens.json` → `{slug}.tokens` */
export const tokenSetName = (filename) => filename.replace(/\.tokens\.json$/, ".tokens");

/** Tokens Studio filename for a token set name. */
export const setNameToFilename = (setName) => `${setName}.json`;

/** Style Dictionary / Tokens Studio export filename for a slug (kebab-case, no extension). */
export const tokenFilename = (slug) => `${slug}.tokens.json`;

export const SHARED_SET = tokenSetName(SHARED_TOKEN_FILENAME);
