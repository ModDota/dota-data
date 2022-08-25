import got from 'got';
import * as s from '../../src/schema';
import { deserialize, isDuplicateKeyArray, isKvObject, KVObject } from 'valve-kv';

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
    ignoreDuplicates(content);

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

function ignoreDuplicates(object: KVObject) {
  for (const [key, value] of Object.entries(object)) {
    if (Array.isArray(value) && isDuplicateKeyArray(value)) {
      const newValue = value[value.length - 1];
      object[key] = newValue;
      if (isKvObject(newValue)) {
        ignoreDuplicates(newValue);
      }
    } else if (isKvObject(value)) {
      ignoreDuplicates(value);
    }
  }
}
