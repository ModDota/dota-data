import got from 'got';
import _ from 'lodash';
import { outputJson } from './util';

// TODO: Consider using GetCustomAttributeDerivedStatValue
const url =
  'https://dota2.gamepedia.com/api.php?format=json&formatversion=2&action=query&prop=revisions&rvprop=content&titles=Module:Attribute%20bonuses/data';

export async function generateAttributes() {
  const data: string = (await got(url, { json: true })).body.query.pages[0].revisions[0].content;
  const values = _.fromPairs(
    data
      .split('\n')
      .map(x => x.match(/\['(.+)'\] = (.+),/))
      .filter(<T>(x: T | null): x is T => x != null)
      .map(([, key, value]): [string, number] => [_.camelCase(key), Number(value)]),
  );

  const getBonuses = (bonuses: string[]): Record<string, number> =>
    _.fromPairs(
      bonuses.map(
        (bonus): [string, number] => {
          const propName = `bonus${_.upperFirst(bonus)}`;
          if (values[propName] == null) throw new Error(`Couldn't find attribute "${bonus}"`);
          return [bonus, values[propName]];
        },
      ),
    );

  await outputJson('attributes', {
    strength: getBonuses(['health', 'healthRegenerationFlat', 'magicResistance']),
    agility: getBonuses(['armor', 'attackSpeed', 'movementSpeed']),
    intelligence: getBonuses(['mana', 'manaRegenerationFlat', 'spellDamage']),
  });
}
