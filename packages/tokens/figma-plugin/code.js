const SYNCS = [
  {
    file: "default-light.tokens.json",
    collection: "Default",
    mode: "Default Light",
  },
  {
    file: "default-dark.tokens.json",
    collection: "Default",
    mode: "Default Dark",
  },
  {
    file: "portfolio.tokens.json",
    collection: "Theme",
    mode: "Portfolio",
  },
];

figma.showUI(__html__, { width: 360, height: 460, themeColors: true });

figma.clientStorage.getAsync("githubToken").then((token) => {
  figma.ui.postMessage({ type: "init", token: token || "" });
});

figma.ui.onmessage = async (message) => {
  if (message.type === "save-token") {
    await figma.clientStorage.setAsync("githubToken", message.token);
    return;
  }

  if (message.type !== "apply") return;

  try {
    const result = await applyTokenFiles(message.files);
    figma.ui.postMessage({ type: "result", result });
  } catch (error) {
    figma.ui.postMessage({
      type: "result",
      result: { updated: 0, missingCount: 0, missing: [], problems: [String(error)] },
    });
  }
};

async function applyTokenFiles(files) {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const variables = await figma.variables.getLocalVariablesAsync();
  const colorsByCollection = new Map();

  for (const variable of variables) {
    if (variable.resolvedType !== "COLOR") continue;
    const list = colorsByCollection.get(variable.variableCollectionId) || [];
    list.push(variable);
    colorsByCollection.set(variable.variableCollectionId, list);
  }

  let updated = 0;
  const missing = [];
  const problems = [];

  for (const sync of SYNCS) {
    const tree = files[sync.file];
    if (!tree) {
      problems.push(`No data for ${sync.file}`);
      continue;
    }

    const collection = collections.find(
      (item) => item.name.toLowerCase() === sync.collection.toLowerCase(),
    );
    if (!collection) {
      problems.push(
        `No collection named ${sync.collection}. Found: ${collections.map((item) => item.name).join(", ") || "none"}`,
      );
      continue;
    }

    const mode = collection.modes.find(
      (item) => item.name.toLowerCase() === sync.mode.toLowerCase(),
    );
    if (!mode) {
      problems.push(
        `No mode named ${sync.mode} on ${collection.name}. Found: ${collection.modes.map((item) => item.name).join(", ")}`,
      );
      continue;
    }

    const byName = new Map(
      (colorsByCollection.get(collection.id) || []).map((variable) => [variable.name, variable]),
    );

    for (const token of flattenColors(tree)) {
      const variable = byName.get(token.name);
      if (!variable) {
        missing.push(`${sync.mode}: ${token.name}`);
        continue;
      }
      variable.setValueForMode(mode.modeId, hexToFigmaColor(token.hex));
      updated += 1;
    }
  }

  return {
    updated,
    missingCount: missing.length,
    missing: missing.slice(0, 6),
    problems,
  };
}

function flattenColors(node, prefix = []) {
  const tokens = [];
  for (const [key, value] of Object.entries(node)) {
    const path = [...prefix, key];
    if (value && typeof value === "object" && "value" in value && "type" in value) {
      if (value.type === "color" && typeof value.value === "string" && value.value.startsWith("#")) {
        tokens.push({ name: path.join("/"), hex: value.value });
      }
      continue;
    }
    if (value && typeof value === "object") tokens.push(...flattenColors(value, path));
  }
  return tokens;
}

function hexToFigmaColor(hex) {
  const raw = hex.slice(1);
  const expand = raw.length === 3 || raw.length === 4
    ? raw.split("").map((char) => char + char).join("")
    : raw;
  const channel = (start) => parseInt(expand.slice(start, start + 2), 16) / 255;
  return {
    r: channel(0),
    g: channel(2),
    b: channel(4),
    a: expand.length === 8 ? channel(6) : 1,
  };
}
