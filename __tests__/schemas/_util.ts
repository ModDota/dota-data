import got from 'got';
import vdf from 'vdf-extra';
import { RootSchema } from '../../src/schema';

export async function integrationTest(schema: RootSchema, source: string, allowed: string[] = []) {
  const content = vdf.parse<any>((await got(source)).body);
  delete content.Version;
  const validationResult = schema.validateRoot(content);

  // (await import('fs-extra')).outputFileSync(
  //   'integration-results.txt',
  //   validationResult.filter(x => !allowed.includes(x)).join('\n'),
  // );

  allowed.forEach(x => expect(validationResult).toContain(x));
  expect(validationResult).toHaveLength(allowed.length);
}
