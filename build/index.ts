import _ from 'lodash';
import { generateEngineEnums } from './engine-enums';
// import { generateEvents } from './events';
import { generatePanorama } from './panorama';
// import { generateResources } from './resources';
import { generateVScripts } from './vscripts';

function generateScriptTypes() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./script-types');
}

const generators: Record<string, () => void | Promise<void>> = {
  engineEnums: generateEngineEnums,
  // events: generateEvents,
  panorama: generatePanorama,
  // resources: generateResources,
  scriptTypes: generateScriptTypes,
  vscripts: generateVScripts,
};

(async () => {
  let generatorNames =
    process.env.DOTA_DATA_GENERATORS != null
      ? process.env.DOTA_DATA_GENERATORS.split(',')
      : Object.keys(generators);

  const includesScriptTypes = generatorNames.includes('scriptTypes');
  if (includesScriptTypes) {
    generatorNames = _.without(generatorNames, 'scriptTypes');
  }

  await Promise.all(
    generatorNames.map(async (name) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (generators[name] == null) throw new Error(`Unknown generator name "${name}"`);
      await generators[name]();
    }),
  );

  if (includesScriptTypes) {
    generateScriptTypes();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
