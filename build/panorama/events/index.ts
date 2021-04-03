import { formatArgumentName, readDump } from '../../util';
import { additions, override } from './data';
import { PanoramaEvent, PanoramaEventArgument } from './types';

export { types as panoramaEventsTypes } from './types';

function parseDefinition(definition: string) {
  const [, name, parameters] = definition.match(/^(.+)\((.*)\)$/)!;
  if (parameters === '') return { name, args: [] };

  const args = parameters
    .split(', ')
    .map((x) => x.replace(/^class /, '').split(' '))
    .map(
      ([type, n], i): PanoramaEventArgument => ({
        name: formatArgumentName(n, i),
        type,
      }),
    );

  return { name, args };
}

export function generatePanoramaEvents() {
  const dump = readDump('dump_panorama_events');

  const eventDefinitions = dump
    .split('|-')
    .map((c) => c.trim())
    .slice(1) // Split events and skip header
    .map((d) => d.split(/\r?\n/).map((l) => l.slice(2).trim())); // Split each event into its lines and cut off leading |

  const result = Object.fromEntries(
    eventDefinitions.map(([definition, panelEvent, description]) => {
      const { name, args } = parseDefinition(definition.slice(6, -7));
      const event: PanoramaEvent = { description, panelEvent: panelEvent === 'Yes', args };
      return [name, event];
    }),
  );

  override(result);
  return { ...result, ...additions };
}
