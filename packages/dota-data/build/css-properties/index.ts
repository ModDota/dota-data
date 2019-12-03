import _ from 'lodash';
import { outputFile, outputJson, readDump } from '../util';
import { Property, types } from './types';

const EXAMPLES_REGEXP = /\n\n<b>Examples?:<\/b><pre>(.+)<\/pre>$/s;

export function generateCssProperties() {
  const result = readDump('dump_panorama_css_properties')
    .trim()
    .slice(4)
    .split(/\n=== /)
    .map(x =>
      x
        .trim()
        .replace(/<br>/g, '\n')
        .replace(/ {2,}/, ' ')
        .split('\n')
        .map(l => l.trim()),
    )
    .map(([rule, ...restLines]): [string, Property] => {
      rule = rule.slice(0, -4);
      const info = _.unescape(restLines.join('\n'));
      const description = info.replace(EXAMPLES_REGEXP, '');
      const examples = (info.match(EXAMPLES_REGEXP)?.[1] ?? '')
        .split('\n')
        .filter(x => x !== '')
        .reduceRight<string[]>(
          (accumulator, v) =>
            v.startsWith('//')
              ? [..._.initial(accumulator), `${v}\n${_.last(accumulator)}`]
              : [...accumulator, v],
          [],
        )
        .reverse();

      const property: Property = { description, examples };
      return [rule, property];
    });

  outputJson('css-properties', Object.fromEntries(result));
  outputFile('css-properties.d.ts', types);
}
