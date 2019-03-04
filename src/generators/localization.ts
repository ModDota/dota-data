import dedent from 'dedent';
import _ from 'lodash';
import vdf from 'vdf-extra';
import { getDotaDirectoryContents, getDotaVdfFile, outputFile, outputJson, remove } from '../utils';

const index = (langs: string[]) => `Object.defineProperty(exports, "__esModule", { value: true });
exports.languages = [
  ${langs.map(x => `"${x}"`).join(',\n  ')},
];`;

const indexTypes = (languages: string[]) => `export type DotaLanguage =
  | ${languages.map(x => `'${x}'`).join('\n  | ')};
export declare const languages: DotaLanguage[];`;

export const removeLocalization = () => remove('localization');
export async function generateLocalization({ languages }: { languages?: string[] } = {}) {
  const resourceFiles = _.mapValues(
    _.groupBy(
      (await getDotaDirectoryContents('pak01_dir/resource/localization'))
        .filter(x => x.type === 'file')
        .map(x => x.name.replace(/\.txt$/, ''))
        .map(x => x.split(/_(?=[^_]+$)/))
        .map(([type, language]) => ({ type, language })),
      x => x.language,
    ),
    x => x.map(t => t.type),
  );

  delete resourceFiles.korean;

  const fetchedLanguages = Object.keys(resourceFiles);
  await Promise.all([
    outputFile('localization/index.js', index(fetchedLanguages)),
    outputFile('localization/index.d.ts', indexTypes(fetchedLanguages)),
    ...(languages != null ? languages : fetchedLanguages).map(async language => {
      const values = await Promise.all(
        resourceFiles[language].map(async type =>
          getDotaVdfFile(`pak01_dir/resource/localization/${type}_${language}.txt`),
        ),
      );

      const result = _.omitBy(
        Object.assign({}, ...values.map(x => x.Tokens)),
        // EXTRA_VALUES appears because there are some repeated tokens in valve files
        (_value, key: string | typeof vdf.EXTRA_VALUES) =>
          typeof key !== 'string' || key.startsWith('[english]'),
      );

      await outputJson(`localization/${language}`, result);
      await outputFile(
        `localization/${language}.d.ts`,
        dedent`
          declare const file: Record<string, string>;
          export = file;
        `,
      );
    }),
  ]);
}
