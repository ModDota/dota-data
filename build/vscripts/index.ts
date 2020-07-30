import { outputFile, outputJson } from '../util';
import { apiDeclarations, apiTypes } from './api';
import { enumDeclarations, enumsTypes } from './enums';
import { typesDeclarations, typesTypes } from './types';

export function generateVScripts() {
  outputJson('vscripts/enums', enumDeclarations);
  outputFile('vscripts/enums.d.ts', enumsTypes);
  outputJson('vscripts/api', apiDeclarations);
  outputFile('vscripts/api.d.ts', apiTypes);
  outputJson('vscripts/types', typesDeclarations);
  outputFile('vscripts/types.d.ts', typesTypes);
}
