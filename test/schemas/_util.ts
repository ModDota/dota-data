import * as s from '../../src/schema-builder';
import { deserialize, isDuplicateKeyArray, isKvObject, KVObject } from 'valve-kv';
import got from "got";

export interface CreateIntegrationTestOptions {
  name: string;
  schema: s.RootSchema;
  url: string;
  ignore?: string[];
}

export function createIntegrationTest({
  name,
  url,
  schema,
  ignore = [],
}: CreateIntegrationTestOptions) {
  test(name, async () => {
    const body = deserialize((await got(url)).body);
    const content = getFirstRoot(body);
    delete content.Version;
    parseNumbersRecursive(content);
    const duplicates = ignoreDuplicates(content);

    // eslint-disable-next-line no-void
    void duplicates;
    // Uncomment to print out duplicate keys:
    // if (duplicates.length > 0) {
    //   const filteredDuplicates = duplicates.filter(
    //     (d) => !d.includes('.Bot.Loadout.') && !d.includes('.AbilityPreview.'),
    //   );

    //   const filePath = url.split('pak01_dir/')[1] ?? url.split('master')[1];
    //   console.log(`Found duplicate keys in: ${filePath}\n\n${filteredDuplicates.join('\n')}`);
    // }

    const validationResult = schema.validateRoot(content);
    expect(validationResult).toEqual(
      [...ignore].sort((a, b) => validationResult.indexOf(a) - validationResult.indexOf(b)),
    );
  });
}

const getFirstRoot = (object: KVObject): KVObject => object[Object.keys(object)[0]] as KVObject;

function parseNumbersRecursive(object: KVObject) {
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'string' && value.length > 0) {
      const numberValue = Number(value);
      if (!Number.isNaN(numberValue)) {
        object[key] = numberValue;
      }
    } else if (isKvObject(value)) {
      parseNumbersRecursive(value);
    }
  }
}

function ignoreDuplicates(object: KVObject, path?: string): string[] {
  const duplicates = [];
  for (const [key, value] of Object.entries(object)) {
    const keyPath = path ? `${path}.${key}` : key;
    if (Array.isArray(value) && isDuplicateKeyArray(value)) {
      duplicates.push(keyPath);
      const newValue = value[value.length - 1];
      object[key] = newValue;
      if (isKvObject(newValue)) {
        ignoreDuplicates(newValue, keyPath);
      }
    } else if (isKvObject(value)) {
      duplicates.push(...ignoreDuplicates(value, keyPath));
    }
  }

  return duplicates;
}
