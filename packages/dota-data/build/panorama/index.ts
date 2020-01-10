import { outputFile, outputJson } from '../util';
import { cssTypes, generateCss } from './css';
import { enums, enumsTypes } from './enums';
import { generatePanoramaEvents, panoramaEventsTypes } from './events';

export function generatePanorama() {
  outputJson('panorama/css', generateCss());
  outputFile('panorama/css.d.ts', cssTypes);
  outputJson('panorama/enums', enums);
  outputFile('panorama/enums.d.ts', enumsTypes);
  outputJson('panorama/events', generatePanoramaEvents());
  outputFile('panorama/events.d.ts', panoramaEventsTypes);
}
