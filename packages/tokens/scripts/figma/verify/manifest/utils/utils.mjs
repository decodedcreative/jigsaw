import path from "node:path";
import { readJsonFile } from "../../../../utils/index.mjs";

export const jsonEquals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** @returns {{ data: unknown, errors: string[] }} */
export const readManifest = (figmaDir, filename) => {
  const { data, error } = readJsonFile(path.join(figmaDir, filename));
  if (error) return { data: undefined, errors: [`${filename}: ${error}`] };
  return { data, errors: [] };
};
