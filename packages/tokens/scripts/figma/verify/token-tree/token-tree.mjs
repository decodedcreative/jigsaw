import { isPlainObject } from "../../../utils/index.mjs";
import { CSS_TRANSFORMED_COLOR } from "../../constants/index.mjs";

const isTokenLeaf = (node) => isPlainObject(node) && "value" in node && "type" in node;

const leafErrors = (node, tokenPath) => {
  const errors = [];

  if (!isTokenLeaf(node)) {
    errors.push(`${tokenPath}: token leaf must include both "value" and "type"`);
    return errors;
  }

  if (Object.keys(node).length !== 2) {
    errors.push(`${tokenPath}: leaf must contain only "value" and "type"`);
  }

  if (typeof node.type !== "string" || node.type.length === 0) {
    errors.push(`${tokenPath}: "type" must be a non-empty string`);
  }

  if (typeof node.value !== "string" && typeof node.value !== "number") {
    errors.push(`${tokenPath}: "value" must be a string or number`);
  }

  if (
    node.type === "color" &&
    typeof node.value === "string" &&
    CSS_TRANSFORMED_COLOR.test(node.value)
  ) {
    errors.push(
      `${tokenPath}: color value looks CSS-transformed (${node.value}) — expected hex or literal`,
    );
  }

  return errors;
};

/** @returns {{ tokenCount: number, errors: string[] }} */
export const validateTokenTree = (root) => {
  const errors = [];
  let tokenCount = 0;

  const walk = (node, tokenPath) => {
    if (!isPlainObject(node)) {
      errors.push(`${tokenPath || "(root)"}: expected object`);
      return;
    }

    if ("value" in node || "type" in node) {
      errors.push(...leafErrors(node, tokenPath));
      tokenCount += 1;
      return;
    }

    for (const [key, child] of Object.entries(node)) {
      walk(child, tokenPath ? `${tokenPath}.${key}` : key);
    }
  };

  walk(root, "");
  return { tokenCount, errors };
};
