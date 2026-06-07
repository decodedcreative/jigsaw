/**
 * Tokens Studio–compatible legacy JSON ({ value, type }).
 * Uses token.original so hex colours and other source literals are preserved
 * (unlike the css transform group which converts colours to RGB tuples).
 */

function resolvePath(token, options) {
  if (options.stripFirstSegment) return token.path.slice(1);
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
    if (!Object.prototype.hasOwnProperty.call(node, key)) node[key] = {};
    node = node[key];
  }
  node[path[path.length - 1]] = leaf;
}

export function figmaTokens({ dictionary, options = {} }) {
  const tree = {};

  for (const token of dictionary.allTokens) {
    const path = resolvePath(token, options);
    setNestedLeaf(tree, path, leafFromToken(token));
  }

  return `${JSON.stringify(tree, null, 2)}\n`;
}
