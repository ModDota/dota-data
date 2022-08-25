import { schemas } from '../../src/schemas';
import { createIntegrationTest } from './_util';

describe('integration', () => {
  createIntegrationTest({
    name: 'standard units',
    schema: schemas.npc_units,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir/scripts/npc/npc_units.txt',
  });

  createIntegrationTest({
    name: 'standard heroes',
    schema: schemas.npc_heroes,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir/scripts/npc/npc_heroes.txt',

    ignore: [
      'npc_dota_hero_slardar.VersusScale should be a number',
      'npc_dota_hero_naga_siren.Team is not one of: "Good", "Bad"',
      'npc_dota_hero_lion.TurnRate is unknown',
      'npc_dota_hero_primal_beast.PickSound should be a string',
      'npc_dota_hero_primal_beast.BanSound should be a string',
      'npc_dota_hero_primal_beast.RareIdleExpression is unknown',
      'npc_dota_hero_primal_beast.ShowcasePlayIdleExpression is unknown',
    ],
  });
});
