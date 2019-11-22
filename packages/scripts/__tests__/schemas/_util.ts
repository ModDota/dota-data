import got from 'got';
import vdf from 'vdf-extra';
import { RootSchema } from '../../src/schema';

export interface CreateIntegrationTestOptions {
  name: string;
  schema: RootSchema;
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
    const content = vdf.parse<any>((await got(url)).body);
    delete content.Version;

    const validationResult = schema.validateRoot(content);
    expect(validationResult).toEqual(
      [...ignore].sort((a, b) => validationResult.indexOf(a) - validationResult.indexOf(b)),
    );
  });
}
