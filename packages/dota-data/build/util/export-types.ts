import fs from 'fs-extra';
import _ from 'lodash';

const exportRegex = /(?<=\/\/ EXPORT START\n)(.)+\n(?=\/\/ EXPORT END)/s;
const getExportedChunk = (fileName: string) => {
  const fileContent = fs.readFileSync(fileName, 'utf8');
  const matches = fileContent.match(exportRegex);
  if (matches == null) throw new Error('File has no exported chunk');
  return matches[0].trim();
};

export const exportNamespacedRoot = (
  fileName: string,
  namespace: string,
  root: string,
) => `declare namespace ${namespace} {
  ${getExportedChunk(fileName)
    .replace(/declare /, '')
    .replace(/\n/g, '\n  ')}
}

declare const ${namespace}: ${root};
export = ${namespace};
`;
