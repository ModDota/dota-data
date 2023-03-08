import _ from 'lodash';
import { dotaLanguages } from '../src/localization';
import { getDotaDirectoryContents } from '../src/utils/github';

let actualLanguages: string[];
beforeAll(async () => {
  actualLanguages = _.uniq(
    (
      await getDotaDirectoryContents(
        'resource/localization',
        'https://api.github.com/repos/dotabuff/d2vpkr/contents/dota',
      )
    )
      .filter((x) => x.type === 'file' && /dota_.*\.txt/.test(x.name))
      .map((x) => x.name.match(/^.+_(.+)\.txt$/)![1]),
  );
});

test('`dotaLanguages` should include all languages', () => {
  expect(dotaLanguages).toEqual(actualLanguages);
});
