import { schemas } from '../src';
import { integrationTest } from './_util';

describe('units', () => {
  test('integration (standard units)', () =>
    integrationTest(
      schemas.npc_units,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/scripts/npc/npc_units.txt',
    ));

  test('integration (standard heroes)', () =>
    integrationTest(
      schemas.npc_heroes,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/scripts/npc/npc_heroes.txt',
      ['npc_dota_hero_naga_siren.Team is not one of: "Good", "Bad"'],
    ));

  test('integration (frostivus_2017 units)', () =>
    integrationTest(
      schemas.npc_units_custom,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/frostivus_2017/scripts/npc/npc_units_custom.txt',
    ));

  test('integration (frostivus_2017 heroes)', () =>
    integrationTest(
      schemas.npc_heroes_custom,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/frostivus_2017/scripts/npc/npc_heroes_custom.txt',
    ));
});
