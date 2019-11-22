import { getOldMetadata, update } from '.';

(async () => {
  const envForce = process.env.DOTA_DATA_FORCE;
  const updated = await update(envForce === '1');
  const { version, commit } = await getOldMetadata();
  console.log(
    updated ? `Updated data to commit ${commit}` : `Data is up to date (v${version}, ${commit})`,
  );
})().catch(error => {
  console.error(error);
  process.exit(1);
});
