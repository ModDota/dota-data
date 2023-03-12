import { findSteamAppById } from '@moddota/find-steam-app';

import { generateEvents } from './events';
import { generateEngineEnums } from './engine-enums';
import { generatePanorama } from './panorama';
import { generateVScripts } from './vscripts';

import { validateApi } from './vscripts/api';
import { validateApiTypes } from './vscripts/api-types';
import {
  modifierFunctionMethods,
  validateModifierMethod,
} from './vscripts/api/data/modifier-properties';
import { validateEnums } from './vscripts/enums';

(async () => {
  const dota2Dir = await findSteamAppById(570);

  if (!dota2Dir) {
    throw 'Could not locate a dota 2 installation';
  } else {
    console.log(`Found DotA 2 installation: ${dota2Dir}`);
  }

  console.log('Generating events from VPKs...');

  await generateEvents(dota2Dir);

  console.log('Generating enums from dump...');

  await generateEngineEnums();

  console.log('Generating VScript types...');

  const vscriptsResult = await generateVScripts();

  console.log('Generating Panorama types...');

  await generatePanorama();

  console.log('\nDone!\n');

  console.log('Validating results:\n');

  validateApi();
  validateApiTypes();
  modifierFunctionMethods().forEach(validateModifierMethod);

  validateEnums(vscriptsResult.enumDeclarations);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
