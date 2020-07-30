import _ from 'lodash';

const typePrefixes = ['b', 'e', 'h', 'v', 'n', 'p', 'i', 'f', 'fl', 'sz', 'psz'];
const typePrefixesRegexp = new RegExp(`^(${typePrefixes.join('|')})(?=[A-Z])`);
export const formatArgumentName = (name: string | null | undefined, index: number) =>
  name != null ? _.camelCase(name.replace(typePrefixesRegexp, '')) : `arg${index + 1}`;

export function formatDescription(description: string) {
  if (description === '') return;
  if (!/[!.?]$/.test(description)) description += '.';
  return _.upperFirst(description);
}

const argumentNameRegExp1 = /^\( (.+?) \)(?: - )?/;
const argumentNameRegExp2 = /^\((.+?)\) - /;
const argumentNameRegExp3 = /^\(([,?A-Za-z]+ [ ,?A-Za-z]+)\)/;
const argumentNameRegExp4 = /\( (.+) \)\.?$/;
const argumentNameRegExp5 = /\( ?([A-Za-z]+,[ ,A-Za-z]+) ?\)\.?$/;
const splitArgumentMatch1to5 = (m: string) =>
  m
    .split(',')
    .map(v => v.trim())
    .map(v => (v.includes(' ') ? v.split(' ')[1] : v));
const createArgumentNameRegExp6 = (n: string) => new RegExp(String.raw`^${n}\(\s*(.*?)\s*\) ?: `);

const argumentTypeRegExp1 = /^\(([a-z]+(,|))+\)\s+/;
const internalNameRegExp1 = /^#.+:/;
export function clearDescription(functionName: string, description?: string) {
  if (description == null) return;
  description = description
    .replace(argumentNameRegExp1, '')
    .replace(argumentNameRegExp2, '')
    .replace(argumentNameRegExp3, '')
    .replace(argumentNameRegExp4, '')
    .replace(argumentNameRegExp5, '')
    .replace(createArgumentNameRegExp6(functionName), '')
    .replace(argumentTypeRegExp1, '')
    .replace(internalNameRegExp1, '')
    .trim();

  return formatDescription(description);
}

const outdatedDescriptionNameFuncs = new Set([
  'AddEventMetadataLeaderboardEntry',
  'AddEventMetadataLeaderboardEntryRawScore',
  'CommandLineFloat',
  'CommandLineInt',
  'CommandLineStr',
  'CreateDamageInfo',
  'CreateTrigger',
  'DebugDrawBox',
  'DebugDrawLine_vCol',
  'DoCleaveAttack',
  'GetDOTATime',
]);
export function extractNamesFromDescription(funcName: string, description?: string) {
  if (description == null || outdatedDescriptionNameFuncs.has(funcName)) return;
  const match = (matcher: RegExp, split: (match: string) => string[]) => {
    const m = description.match(matcher);
    if (m && m[1].length > 0) return split(m[1]);
  };

  return (
    match(argumentNameRegExp1, splitArgumentMatch1to5) ??
    match(argumentNameRegExp2, splitArgumentMatch1to5) ??
    match(argumentNameRegExp3, splitArgumentMatch1to5) ??
    match(argumentNameRegExp4, splitArgumentMatch1to5) ??
    match(argumentNameRegExp5, splitArgumentMatch1to5) ??
    match(createArgumentNameRegExp6(funcName), s => s.split(', '))
  );
}
