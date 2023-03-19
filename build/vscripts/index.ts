import { outputFile, outputJson } from '../util';
import { apiDeclarations, apiTypes, validateApi } from './api';
import { apiTypesDeclarations, apiTypesTypes, validateApiTypes } from './api-types';
import { generateEnumDeclarations, enumsTypes } from './enums';

export async function generateVScripts() {
  outputJson('vscripts/api', apiDeclarations());
  outputFile('vscripts/api.d.ts', apiTypes);
  outputJson('vscripts/api-types', apiTypesDeclarations);
  outputFile('vscripts/api-types.d.ts', apiTypesTypes);
  const enumDeclarations = generateEnumDeclarations();
  outputJson('vscripts/enums', enumDeclarations.enumDeclarations);
  outputFile('vscripts/enums.d.ts', enumsTypes);

  return {
    enumDeclarations,
  };
}
