import { outputJson } from '../util';
import { generatePanoramaEvents } from './events';

export async function generatePanorama() {
  await outputJson('panorama/events', await generatePanoramaEvents());
}
