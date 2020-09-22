import { outputFile, outputJson } from '../util';
import { apiDeclarations, apiTypes, validateApi } from './api';
import { apiTypesDeclarations, apiTypesTypes, validateApiTypes } from './api-types';
import { enumDeclarations, enumsTypes } from './enums';

export function generateVScripts() {
  validateApi();
  validateApiTypes();

  outputJson('vscripts/api', apiDeclarations);
  outputFile('vscripts/api.d.ts', apiTypes);
  outputJson('vscripts/api-types', apiTypesDeclarations);
  outputFile('vscripts/api-types.d.ts', apiTypesTypes);
  outputJson('vscripts/enums', enumDeclarations);
  outputFile('vscripts/enums.d.ts', enumsTypes);
}
