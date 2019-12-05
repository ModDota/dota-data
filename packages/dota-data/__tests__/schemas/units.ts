import { schemas } from '../../src/schemas';
import { createIntegrationTest } from './_util';

describe('integration', () => {
  createIntegrationTest({
    name: 'standard units',
    schema: schemas.npc_units,
    url:
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/scripts/npc/npc_units.txt',
  });

  createIntegrationTest({
    name: 'standard heroes',
    schema: schemas.npc_heroes,
    url:
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/scripts/npc/npc_heroes.txt',

    ignore: [
      'npc_dota_hero_slardar.VersusScale should be a number',
      'npc_dota_hero_omniknight.VersusScale should be a number',
      'npc_dota_hero_naga_siren.Team is not one of: "Good", "Bad"',
    ],
  });

  createIntegrationTest({
    name: 'frostivus_2017 units',
    schema: schemas.npc_units_custom,
    url:
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/frostivus_2017/scripts/npc/npc_units_custom.txt',
  });

  createIntegrationTest({
    name: 'frostivus_2017 heroes',
    schema: schemas.npc_heroes_custom,
    url:
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/frostivus_2017/scripts/npc/npc_heroes_custom.txt',
  });
});
