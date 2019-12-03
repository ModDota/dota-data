import { generateAttributes } from './attributes';
import { generateCssProperties } from './css-properties';
import { generateEngineEnums } from './engine-enums';
import { generateEvents } from './events';
import { generatePanorama } from './panorama';
import { generateResources } from './resources';
import { generateVScripts } from './vscripts';

const generators: Record<string, () => void | Promise<void>> = {
  attributes: generateAttributes,
  cssProperties: generateCssProperties,
  engineEnums: generateEngineEnums,
  events: generateEvents,
  panorama: generatePanorama,
  resources: generateResources,
  vscripts: generateVScripts,
};

(async () => {
  const generatorNames =
    process.env.DOTA_DATA_GENERATORS != null
      ? process.env.DOTA_DATA_GENERATORS.split(',')
      : Object.keys(generators);

  await Promise.all(
    generatorNames.map(async name => {
      if (generators[name] == null) throw new Error(`Unknown generator name "${name}"`);
      await generators[name]();
    }),
  );
})().catch(error => {
  console.error(error);
  process.exit(1);
});
