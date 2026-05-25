import StyleDictionary from "style-dictionary";
import config from "../sd.config.mjs";

const configs = Array.isArray(config) ? config : [config];

for (const entry of configs) {
  const dictionary = new StyleDictionary(entry);
  await dictionary.buildAllPlatforms();
}
