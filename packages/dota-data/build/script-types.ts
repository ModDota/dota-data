import fs from 'fs-extra';
import path from 'path';
import * as s from '../src/schema';
import { schemas } from '../src/schemas';

const schemaToTypes = (schema: s.RootSchema) =>
  schema.toTypeScriptRoot().content.replace(/^type/gm, 'export declare type');

const types = {
  units: schemaToTypes(schemas.npc_units),
  heroes: schemaToTypes(schemas.npc_heroes),
  portraits: schemaToTypes(schemas.portraits),
  items: schemaToTypes(schemas.items),
  abilities: schemaToTypes(schemas.npc_abilities),
  shops: 'export declare type Root = Record<string, string[]>;\n',
  emoticons: `export declare type Emoticon = {
    id: number;
    aliases: string[];
    image: string;
    frameDuration: number;
    team?: number;
    quality?: number;
};

export declare type Root = Emoticon[];
`,
};

for (const [fileName, content] of Object.entries(types)) {
  const outputRoot = path.resolve(__dirname, '../lib/scripts');
  fs.outputFileSync(path.join(outputRoot, `${fileName}.generated.d.ts`), content);
}
