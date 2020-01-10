import { outputFile, outputJson } from '../util';
import { cssTypes, generateCss } from './css';
import { generatePanoramaEvents, panoramaEventsTypes } from './events';

export function generatePanorama() {
  outputJson('panorama/css', generateCss());
  outputFile('panorama/css.d.ts', cssTypes);
  outputJson('panorama/events', generatePanoramaEvents());
  outputFile('panorama/events.d.ts', panoramaEventsTypes);
}
