import { outputFile, outputJson } from '../util';
import { apiTypes, generateApi } from './api';
import { enumsTypes, generateEnums } from './enums';
import { generateModifierProperties, modifierPropertyTypes } from './modifier-properties';

export async function generateVScripts() {
  const { declarations, replacements } = await generateEnums();
  await Promise.all([
    outputJson('vscripts/enums', declarations),
    outputFile('vscripts/enums.d.ts', enumsTypes),
    outputJson('vscripts/api', await generateApi(replacements)),
    outputFile('vscripts/api.d.ts', apiTypes),
    outputJson('vscripts/modifier-properties', await generateModifierProperties()),
    outputFile('vscripts/modifier-properties.d.ts', modifierPropertyTypes),
  ]);
}
