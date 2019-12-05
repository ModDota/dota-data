import _ from 'lodash';
import { dotaLanguages } from '../src/localization';
import { getDotaDirectoryContents } from '../src/utils/github';

let actualLanguages: string[];
beforeAll(async () => {
  actualLanguages = _.uniq(
    (await getDotaDirectoryContents('pak01_dir/resource/localization'))
      .filter(x => x.type === 'file')
      .map(x => x.name.match(/^.+_(.+)\.txt$/)![1]),
  );
});

test('`dotaLanguages` should include all languages', () => {
  expect(dotaLanguages).toEqual(actualLanguages);
});
