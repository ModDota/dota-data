import * as fs from 'fs-extra';

export async function tryReadJson(filePath: string) {
  try {
    return await fs.readJson(filePath);
  } catch {}
}
