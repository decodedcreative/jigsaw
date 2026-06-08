import { describe, expect, it } from "vitest";
import {
  SHARED_SET,
  setNameToFilename,
  tokenFilename,
  tokenSetName,
} from "./index.mjs";

describe("tokenSetName", () => {
  it("strips .tokens.json suffix", () => {
    expect(tokenSetName("shared.tokens.json")).toBe("shared.tokens");
    expect(tokenSetName("default-light.tokens.json")).toBe("default-light.tokens");
  });
});

describe("tokenFilename", () => {
  it("builds export filenames from slugs", () => {
    expect(tokenFilename("shared")).toBe("shared.tokens.json");
    expect(tokenFilename("default-light")).toBe("default-light.tokens.json");
  });
});

describe("setNameToFilename", () => {
  it("appends .json to token set names", () => {
    expect(setNameToFilename("shared.tokens")).toBe("shared.tokens.json");
  });
});

describe("SHARED_SET", () => {
  it("matches shared export filename", () => {
    expect(SHARED_SET).toBe("shared.tokens");
  });
});
