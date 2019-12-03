import { outputJson } from '../util';
import { generatePanoramaEvents } from './events';

export function generatePanorama() {
  outputJson('panorama/events', generatePanoramaEvents());
}
