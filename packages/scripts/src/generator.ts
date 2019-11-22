import dedent from 'dedent';
import _ from 'lodash';
import vdf from 'vdf-extra';
import { schemas } from './schemas';
import { getDotaVdfFile, outputFile, outputJson, remove } from './utils';

// TODO: Remove
const sortNumericKeys = (object: Record<string, any>) =>
  _.fromPairs(
    Object.entries(object)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([key, value]) => [Number(key), value]),
  );

function transformAbilities(content: any) {
  _.each(content, a => {
    if (a.AbilitySpecial) a.AbilitySpecial = sortNumericKeys(a.AbilitySpecial);
    if (a.ItemRequirements) a.ItemRequirements = sortNumericKeys(a.ItemRequirements);
  });

  return content;
}

const LINKS = [
  {
    name: 'npc_units',
    path: 'scripts/npc/npc_units.txt',
    types: schemas.npc_units.toTypeScriptRoot('file').content,
  },
  {
    name: 'npc_heroes',
    path: 'scripts/npc/npc_heroes.txt',
    types: schemas.npc_heroes.toTypeScriptRoot('file').content,
  },
  {
    name: 'portraits',
    path: 'pak01_dir/scripts/npc/portraits.txt',
    types: schemas.portraits.toTypeScriptRoot('file').content,
  },
  {
    name: 'items',
    path: 'pak01_dir/scripts/npc/items.txt',
    types: schemas.items.toTypeScriptRoot('file').content,
    transform: transformAbilities,
  },
  {
    name: 'npc_abilities',
    path: 'scripts/npc/npc_abilities.txt',
    types: schemas.npc_abilities.toTypeScriptRoot('file').content,
    transform: transformAbilities,
  },
  {
    name: 'emoticons',
    path: 'pak01_dir/scripts/emoticons.txt',
    types: dedent`
      declare namespace emoticons {
          type Emoticon = {
              id: number;
              aliases: string[];
              image: string;
              frameDuration: number;
              team?: number;
              quality?: number;
          };
      }

      declare const emoticons: emoticons.Emoticon[];
      export = emoticons;
    `,
    transform: (content: any) =>
      Object.entries(content).map(([id, v]: any) => ({
        id: Number(id),
        image: v.image_name,
        frameDuration: v.ms_per_frame,
        team: v.teamId,
        quality: v.quality,
        aliases: Object.values(v.aliases),
      })),
  },
  {
    name: 'shops',
    path: 'pak01_dir/scripts/shops.txt',
    types: dedent`
      declare const shops: Record<string, string[]>;
      export = shops;
    `,
    transform: (content: any): any =>
      _.mapValues(content, group => vdf.entries(group).map(([, value]) => value)),
  },
];

export const getScripts = () =>
  Promise.all(
    LINKS.map(async ({ name, path, types, transform }) => {
      let content = await getDotaVdfFile(path);
      delete content.Version;
      if (transform) content = transform(content);

      return {
        name,
        content,
        types: `${types}\ndeclare const file: file.Root;\nexport = file;\n`,
      };
    }),
  );

export const cleanupScripts = () =>
  Promise.all(_.flatMap(LINKS, x => [remove(`${x.name}.json`), remove(`${x.name}.d.ts`)]));

export async function generateScripts() {
  await Promise.all(
    (await getScripts()).map(({ name, content, types }) =>
      Promise.all([outputJson(name, content), outputFile(`${name}.d.ts`, types)]),
    ),
  );
}
