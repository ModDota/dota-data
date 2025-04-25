import fs from 'fs-extra';
import path from 'path';

export * from './export-types';
export * from './normalization';

const dump = fs.readFileSync(path.join(__dirname, '../../dumper/dump'), 'utf8');
export function readDump(name: string) {
  // Find the line starting with "$> name" possibly followed by other characters
  const startMarker = `$> ${name}`;
  const startIndex = dump.indexOf(startMarker);
  if (startIndex === -1) {
    console.error(`Couldn't find dump marker "${startMarker}"`);
    throw new Error(`Couldn't find dump marker "${startMarker}"`);
  }
  
  console.log(`Found dump marker "${startMarker}" at position ${startIndex}`);

  // Find the start of the actual content (after the marker line)
  const contentStartIndex = dump.indexOf('\n', startIndex) + 1;
  if (contentStartIndex === 0) { // Handle case where marker is the last line
      console.warn(`Marker "${startMarker}" is the last line in the dump file.`);
      return '';
  }

  // Find the end of the content (start of the next marker or end of file)
  const nextMarkerIndex = dump.indexOf('\n$> ', contentStartIndex);
  let contentEndIndex = (nextMarkerIndex === -1) ? dump.length : nextMarkerIndex;

  console.log(`Content for "${name}" starts at ${contentStartIndex} and ends at ${contentEndIndex}`);
  let value = dump.substring(contentStartIndex, contentEndIndex);

  // Special handling for different dump types
  if (name === 'cl_panorama_script_help' || name === 'cl_panorama_script_help *' || name === 'cl_panorama_typescript_declarations') {
    console.log(`Processing Panorama API dump (first 200 chars):\n${value.substring(0, 200)}...`);
    // For Panorama API, we expect TypeScript declarations
    // No special processing needed, just return the TypeScript declarations as-is
  } else if (value.trim().startsWith('Initializing')) {
    // Cut off initializing scripting VM line for JSON content
    console.log(`Dump section "${name}" starts with 'Initializing', looking for JSON content`);
    const jsonStart = value.indexOf('[');
    if (jsonStart !== -1) {
        console.log(`Found JSON start at position ${jsonStart} within the content`);
        value = value.slice(jsonStart);
    } else {
        // Handle cases where 'Initializing' is present but '[' is not
        console.warn(`Dump section "${name}" starts with 'Initializing' but no '[' found.`);
        value = ''; // Or handle as appropriate
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (value == null) throw new Error(`Couldn't find dump content for "${name}"`); // Should not happen with the new logic if marker exists
  
  console.log(`Successfully extracted content for "${name}" (length: ${value.trim().length})`);
  return value.trim();
}

const FILES = path.join(__dirname, '../../files');
export const outputFile = (name: string, data: string) =>
  fs.outputFileSync(path.join(FILES, name), `${data.trimEnd()}\n`);
export const outputJson = (name: string, data: any) =>
  fs.outputJsonSync(path.join(FILES, `${name}.json`), data, { spaces: 2 });
