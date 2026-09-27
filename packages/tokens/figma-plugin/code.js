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

const GITHUB_TOKEN = /^[A-Za-z0-9_-]+$/;

figma.showUI(__html__, { width: 360, height: 460, themeColors: true });

figma.clientStorage.getAsync("githubToken").then((token) => {
  figma.ui.postMessage({ type: "init", token: acceptedToken(token) });
}).catch((error) => {
  figma.ui.postMessage({
    type: "storage-error",
    message: `Could not read the saved GitHub token. ${error.message || error}`,
  });
});

figma.ui.onmessage = async (message) => {
  if (message.type === "save-token") {
    const token = acceptedToken(message.token);
    if (!token) {
      figma.ui.postMessage({
        type: "storage-error",
        message: "The GitHub token was not saved. Use letters, numbers, underscores, or hyphens.",
      });
      return;
    }
    try {
      await figma.clientStorage.setAsync("githubToken", token);
    } catch (error) {
      figma.ui.postMessage({
        type: "storage-error",
        message: `Could not save the GitHub token. ${error.message || error}`,
      });
    }
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
      const color = hexToFigmaColor(token.hex);
      if (!color) {
        problems.push(`${sync.mode}: ${token.name} has an invalid colour ${token.hex}`);
        continue;
      }
      try {
        variable.setValueForMode(mode.modeId, color);
        updated += 1;
      } catch (error) {
        problems.push(`${sync.mode}: ${token.name} was not updated. ${error.message || error}`);
      }
    }
  }

  return {
    updated,
    missingCount: missing.length,
    missing: missing.slice(0, 6),
    problems,
  };
}

function acceptedToken(value) {
  if (typeof value !== "string") return "";
  const token = value.trim();
  return GITHUB_TOKEN.test(token) ? token : "";
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
  const match = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(String(hex).trim());
  if (!match) return null;
  const raw = match[1];
  const expanded = raw.length <= 4
    ? raw.split("").map((char) => char + char).join("")
    : raw;
  const channel = (start) => parseInt(expanded.slice(start, start + 2), 16) / 255;
  return {
    r: channel(0),
    g: channel(2),
    b: channel(4),
    a: expanded.length === 8 ? channel(6) : 1,
  };
}
