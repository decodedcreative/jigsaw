/**
 * Tokens Studio–compatible legacy JSON ({ value, type }).
 * Uses token.original so hex colours and other source literals are preserved
 * (unlike the css transform group which converts colours to RGB tuples).
 */

function resolvePath(token, options) {
  if (options.stripFirstSegment) return token.path.slice(1);
  // Portfolio merges base + semantic in one file; only semantic paths are prefixed.
  const prefixes = options.stripModePrefixes ?? [];
  if (prefixes.includes(token.path[0])) return token.path.slice(1);
  return token.path;
}

function leafFromToken(token) {
  const original = token.original ?? token;
  const value = original.value ?? original.$value ?? token.value;
  const type = original.type ?? original.$type ?? token.$type ?? token.type;
  return { value, type };
}

function setNestedLeaf(tree, path, leaf) {
  let node = tree;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (Object.prototype.hasOwnProperty.call(node, key)) {
      const existing = node[key];
      if (existing && typeof existing === "object" && "value" in existing && "type" in existing) {
        throw new Error(
          `Token path conflict at "${path.slice(0, i + 1).join(".")}": cannot nest under an existing token leaf`,
        );
      }
    } else {
      node[key] = {};
    }
    node = node[key];
  }
  const leafKey = path[path.length - 1];
  if (
    Object.prototype.hasOwnProperty.call(node, leafKey) &&
    node[leafKey] &&
    typeof node[leafKey] === "object" &&
    !("value" in node[leafKey])
  ) {
    throw new Error(
      `Token path conflict at "${path.join(".")}": cannot replace an existing token group`,
    );
  }
  node[leafKey] = leaf;
}

export function figmaTokens({ dictionary, options = {} }) {
  const tree = {};

  for (const token of dictionary.allTokens) {
    const path = resolvePath(token, options);
    setNestedLeaf(tree, path, leafFromToken(token));
  }

  return `${JSON.stringify(tree, null, 2)}\n`;
}
