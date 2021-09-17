import { schemas } from '../../src/schemas';
import { createIntegrationTest } from './_util';

describe('integration', () => {
  createIntegrationTest({
    name: 'standard',
    schema: schemas.portraits,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir/scripts/npc/portraits.txt',

    ignore: [
      'models/heroes/antimage_female/antimage_female.vmdl.PortraitBackgroundTexture should match pattern: /^materials\\/.+\\.vmat$/',
      'models/items/wards/f2p_ward/f2p_ward.vmdl.PortraitPosition is unknown',
      'models/items/wards/f2p_ward/f2p_ward.vmdl.PortraitLookAt is unknown',
      'models/items/wards/f2p_ward/f2p_ward.vmdl.PortraitFOV is unknown',
      'models/courier/f2p_courier/f2p_courier.vmdl.PortraitPosition is unknown',
      'models/courier/f2p_courier/f2p_courier.vmdl.PortraitLookAt is unknown',
      'models/courier/f2p_courier/f2p_courier.vmdl.PortraitFOV is unknown',
      'models/heroes/techies/techies.vmdl.PortraitAmbientColor[0] should be an integer',
      'models/heroes/techies/techies.vmdl.PortraitAmbientColor[1] should be an integer',
      'models/heroes/techies/techies.vmdl.PortraitAmbientColor[2] should be an integer',
      'models/heroes/techies/techies.vmdl.PortraitBackgroundColor4 has 2 elements when at least 3 is expected',
      'models/heroes/techies/techies.vmdl.PortraitBackgroundColor4[1] should be a number',
      'models/items/techies/bigshot/bigshot_remotebomb.vmdl.PortraitFOV is unknown',
    ],
  });
});
