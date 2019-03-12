import _ from 'lodash';

const typePrefixes = ['b', 'h', 'v', 'n', 'p', 'i', 'f', 'fl', 'sz', 'psz'];
const typePrefixesRegexp = new RegExp(`^(${typePrefixes.join('|')})(?=[A-Z])`);
export function formatArgumentName(name: string | null | undefined, index: number) {
  if (name == null || name === '') return `arg${index + 1}`;
  if (typePrefixesRegexp.test(name)) name = name.replace(typePrefixesRegexp, '');

  if (name.toLowerCase() === 'class') return 'className';
  if (name.toLowerCase() === 'default') return 'defaultValue';
  if (name.toLowerCase() === 'function') return 'func';

  name = name.replace(/(?<=[a-z])ID/g, 'Id').replace(/^ID/g, 'id');
  name = name.toUpperCase() === name ? name.toLowerCase() : _.lowerFirst(name);

  return name;
}

export function formatDescription(description: string) {
  if (description === '') return;
  if (!description.endsWith('.')) description = description + '.';
  return _.upperFirst(description);
}

const argumentNameRegExp1 = /^\( (.+?) \)(?: - )?/;
const argumentNameRegExp2 = /^\((.+?)\) - /;
const argumentNameRegExp3 = /^\(([a-zA-Z,?]+ [a-zA-Z ,?]+)\)/;
const argumentNameRegExp4 = /\( (.+) \)\.?$/;
const argumentNameRegExp5 = /\( ?([a-zA-Z]+,[a-zA-Z ,]+) ?\)\.?$/;
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
    match(argumentNameRegExp1, splitArgumentMatch1to5) ||
    match(argumentNameRegExp2, splitArgumentMatch1to5) ||
    match(argumentNameRegExp3, splitArgumentMatch1to5) ||
    match(argumentNameRegExp4, splitArgumentMatch1to5) ||
    match(argumentNameRegExp5, splitArgumentMatch1to5) ||
    match(createArgumentNameRegExp6(funcName), s => s.split(', '))
  );
}
