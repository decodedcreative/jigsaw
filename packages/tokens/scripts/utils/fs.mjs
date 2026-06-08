import fs from "node:fs";

/** @returns {{ data: unknown } | { error: string }} */
export const readJsonFile = (filePath) => {
  try {
    return { data: JSON.parse(fs.readFileSync(filePath, "utf8")) };
  } catch (error) {
    return { error: `Invalid JSON: ${error.message}` };
  }
};
