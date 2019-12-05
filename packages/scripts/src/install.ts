import { getOldMetadata, update } from '.';

(async () => {
  const force = process.env.DOTA_DATA_FORCE === '1';
  const updated = await update(force);
  const { version, commit } = await getOldMetadata();
  console.log(
    updated ? `Updated data to commit ${commit}` : `Data is up to date (v${version}, ${commit})`,
  );
})().catch(error => {
  console.error(error);
  process.exit(1);
});
