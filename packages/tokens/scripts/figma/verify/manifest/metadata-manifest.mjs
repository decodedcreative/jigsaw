import { METADATA_MANIFEST_FILE } from "../../constants/index.mjs";
import { discoverFigmaTokenSetOrder } from "../../discovery/index.mjs";
import { setNameToFilename } from "../../names/index.mjs";
import { jsonEquals, readManifest } from "./utils/index.mjs";

/** @returns {string[]} */
const validateTokenSetOrderReferences = (tokenSetOrder, tokenFileSet) =>
  tokenSetOrder.flatMap((setName) => {
    const filename = setNameToFilename(setName);
    return tokenFileSet.has(filename)
      ? []
      : [
          `${METADATA_MANIFEST_FILE}: tokenSetOrder references missing set "${setName}" (${filename})`,
        ];
  });

/** @returns {string[]} */
export const validateMetadataManifest = (figmaDir, tokenFileSet) => {
  const { data: metadata, errors: readErrors } = readManifest(figmaDir, METADATA_MANIFEST_FILE);
  if (readErrors.length > 0) return readErrors;

  if (!Array.isArray(metadata?.tokenSetOrder)) {
    return [`${METADATA_MANIFEST_FILE}: expected tokenSetOrder array`];
  }

  const expectedOrder = discoverFigmaTokenSetOrder();
  if (!jsonEquals(metadata.tokenSetOrder, expectedOrder)) {
    return [`${METADATA_MANIFEST_FILE}: tokenSetOrder does not match discoverFigmaTokenSetOrder()`];
  }

  return validateTokenSetOrderReferences(metadata.tokenSetOrder, tokenFileSet);
};
