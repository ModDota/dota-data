import { outputFile, outputJson } from '../util';
import { cssTypes, generateCss } from './css';
import { enums, enumsTypes } from './enums';
import { generatePanoramaEvents, panoramaEventsTypes } from './events';
import { generatePanoramaApi, getPanoramaApiTypes } from './api';
import { generateClDumpApi } from './cl_dump_api';

export function generatePanorama() {
  outputJson('panorama/css', generateCss());
  outputFile('panorama/css.d.ts', cssTypes);
  outputJson('panorama/enums', enums);
  outputFile('panorama/enums.d.ts', enumsTypes);
  outputJson('panorama/events', generatePanoramaEvents());
  outputFile('panorama/events.d.ts', panoramaEventsTypes);

  outputJson('panorama/api', generatePanoramaApi());
  outputFile('panorama/api.d.ts', getPanoramaApiTypes());
  
  // 生成原始的cl_panorama_typescript_declarations内容
  generateClDumpApi();
}
