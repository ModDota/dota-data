import { getOldMetadata, update } from '.';

(async () => {
  const envForce = process.env.DOTA_DATA_FORCE;
  const envLanguages = process.env.DOTA_DATA_LANGUAGES;
  const languages = envLanguages != null ? envLanguages.split(/\s*,\s*/) : undefined;

  const updated = await update({ languages }, envForce === '1');
  const { version, commit } = await getOldMetadata();
  console.log(
    updated ? `Updated data to commit ${commit}` : `Data is up to date (v${version}, ${commit})`,
  );
})().catch(err => {
  console.error(err);
  process.exit(1);
});
