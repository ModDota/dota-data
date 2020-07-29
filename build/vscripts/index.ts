import { outputFile, outputJson } from '../util';
import { apiDeclarations, apiTypes } from './api';
import { enumDeclarations, enumsTypes } from './enums';

export function generateVScripts() {
  outputJson('vscripts/enums', enumDeclarations);
  outputFile('vscripts/enums.d.ts', enumsTypes);
  outputJson('vscripts/api', apiDeclarations);
  outputFile('vscripts/api.d.ts', apiTypes);
}
