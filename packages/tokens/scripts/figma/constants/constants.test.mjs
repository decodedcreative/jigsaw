import { describe, expect, it } from "vitest";
import {
  CSS_TRANSFORMED_COLOR,
  FIGMA_OUTPUT_ALLOWLIST,
  FIGMA_OUTPUT_DIR,
  METADATA_MANIFEST_FILE,
  SHARED_TOKEN_FILENAME,
  THEMES_MANIFEST_FILE,
  TOKEN_FILE_RE,
  figmaExport,
} from "./index.mjs";

describe("figmaExport", () => {
  it("derives allowlist from manifest filenames", () => {
    expect(FIGMA_OUTPUT_ALLOWLIST).toEqual(new Set(Object.values(figmaExport.manifests)));
  });

  it("keeps named re-exports in sync with the config object", () => {
    expect(FIGMA_OUTPUT_DIR).toBe(figmaExport.outputDir);
    expect(SHARED_TOKEN_FILENAME).toBe(figmaExport.sharedTokenFile);
    expect(THEMES_MANIFEST_FILE).toBe(figmaExport.manifests.themes);
    expect(METADATA_MANIFEST_FILE).toBe(figmaExport.manifests.metadata);
    expect(TOKEN_FILE_RE).toBe(figmaExport.tokenFilePattern);
    expect(CSS_TRANSFORMED_COLOR).toBe(figmaExport.cssTransformedColor);
  });
});
