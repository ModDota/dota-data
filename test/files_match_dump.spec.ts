import * as fs from 'fs/promises';
import * as path from 'path';

import { generateVScripts } from '../build/vscripts';
import { generatePanorama } from '../build/panorama';

test('generated files match dump', async () => {
  // Note: If this test fails that means there are changes in the generated files that are not in the dump.
  // This means that the next time the dump is run, these changes will be overwritten and removed
  // THIS SHOULD NEVER HAPPEN only data as seen by the dumper should be in the files/.jsons

  // Read current generated file content
  const fileContents = new Map<string, string>();
  for await (const f of walk('files')) {
    if (f.endsWith('.json')) {
      fileContents.set(f, (await fs.readFile(f)).toString());
    }
  }

  // Re-run the code generation
  await generateVScripts();
  await generatePanorama();

  // Check if newly generated files match old file content
  for (const [file, oldContent] of fileContents) {
    const newContent = (await fs.readFile(file)).toString();
    expect(newContent.replace(/\r\n/g, '\n')).toEqual(oldContent.replace(/\r\n/g, '\n'));
    // Write back old content
    await fs.writeFile(file, oldContent);
  }
});

async function* walk(dir: string): AsyncGenerator<string> {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}
