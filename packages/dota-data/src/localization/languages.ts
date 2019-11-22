export type DotaLanguage =
  | 'brazilian'
  | 'bulgarian'
  | 'czech'
  | 'danish'
  | 'dutch'
  | 'english'
  | 'finnish'
  | 'french'
  | 'german'
  | 'greek'
  | 'hungarian'
  | 'italian'
  | 'japanese'
  | 'koreana'
  | 'latam'
  | 'norwegian'
  | 'polish'
  | 'portuguese'
  | 'romanian'
  | 'russian'
  | 'schinese'
  | 'spanish'
  | 'swedish'
  | 'tchinese'
  | 'thai'
  | 'turkish'
  | 'ukrainian'
  | 'vietnamese';

export const dotaLanguages: readonly DotaLanguage[] = [
  'brazilian',
  'bulgarian',
  'czech',
  'danish',
  'dutch',
  'english',
  'finnish',
  'french',
  'german',
  'greek',
  'hungarian',
  'italian',
  'japanese',
  'koreana',
  'latam',
  'norwegian',
  'polish',
  'portuguese',
  'romanian',
  'russian',
  'schinese',
  'spanish',
  'swedish',
  'tchinese',
  'thai',
  'turkish',
  'ukrainian',
  'vietnamese',
];

export const isDotaLanguage = (value: string): value is DotaLanguage =>
  dotaLanguages.includes(value as any);

export interface LanguageData {
  code: string;
  english: string;
  native: string;
}

// https://partner.steamgames.com/doc/store/localization#supported_languages
export const dotaLanguagesData: Record<DotaLanguage, LanguageData> = {
  brazilian: { code: 'pt-BR', english: 'Portuguese-Brazil', native: 'Português-Brasil' },
  bulgarian: { code: 'bg', english: 'Bulgarian', native: 'български език' },
  czech: { code: 'cs', english: 'Czech', native: 'čeština' },
  danish: { code: 'da', english: 'Danish', native: 'Dansk' },
  dutch: { code: 'nl', english: 'Dutch', native: 'Nederlands' },
  english: { code: 'en', english: 'English', native: 'English' },
  finnish: { code: 'fi', english: 'Finnish', native: 'Suomi' },
  french: { code: 'fr', english: 'French', native: 'Français' },
  german: { code: 'de', english: 'German', native: 'Deutsch' },
  greek: { code: 'el', english: 'Greek', native: 'Ελληνικά' },
  hungarian: { code: 'hu', english: 'Hungarian', native: 'Magyar' },
  italian: { code: 'it', english: 'Italian', native: 'Italiano' },
  japanese: { code: 'ja', english: 'Japanese', native: '日本語' },
  koreana: { code: 'ko', english: 'Korean', native: '한국어' },
  latam: { code: 'es-419', english: 'Spanish-Latin America', native: 'Español-Latinoamérica' },
  norwegian: { code: 'no', english: 'Norwegian', native: 'Norsk' },
  polish: { code: 'pl', english: 'Polish', native: 'Polski' },
  portuguese: { code: 'pt', english: 'Portuguese', native: 'Português' },
  romanian: { code: 'ro', english: 'Romanian', native: 'Română' },
  russian: { code: 'ru', english: 'Russian', native: 'Русский' },
  schinese: { code: 'zh-CN', english: 'Chinese (Simplified)', native: '简体中文' },
  spanish: { code: 'es', english: 'Spanish-Spain', native: 'Español-España' },
  swedish: { code: 'sv', english: 'Swedish', native: 'Svenska' },
  tchinese: { code: 'zh-TW', english: 'Chinese (Traditional)', native: '繁體中文' },
  thai: { code: 'th', english: 'Thai', native: 'ไทย' },
  turkish: { code: 'tr', english: 'Turkish', native: 'Türkçe' },
  ukrainian: { code: 'uk', english: 'Ukrainian', native: 'Українська' },
  vietnamese: { code: 'vn', english: 'Vietnamese', native: 'Tiếng Việt' },
};
