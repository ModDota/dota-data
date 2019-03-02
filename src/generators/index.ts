import { generateLocalization, removeLocalization } from './localization';
import { cleanupScripts, generateScripts } from './scripts';

export const cleanup = () => Promise.all([removeLocalization(), cleanupScripts()]);
export const generators = {
  localization: generateLocalization,
  scripts: generateScripts,
};
