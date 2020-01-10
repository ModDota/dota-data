import { outputFile, outputJson } from '../util';
import { cssTypes, generateCss } from './css';
import { generatePanoramaEvents } from './events';

export function generatePanorama() {
  outputJson('panorama/events', generatePanoramaEvents());
  outputJson('panorama/css', generateCss());
  outputFile('panorama/css.d.ts', cssTypes);
}
