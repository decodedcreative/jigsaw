import StyleDictionary from "style-dictionary";
import config from "../sd.config.mjs";

const dictionary = new StyleDictionary(config);
await dictionary.buildAllPlatforms();
