import { schemas } from '../../src/schemas';
import { createIntegrationTest } from './_util';

describe('integration', () => {
  createIntegrationTest({
    name: 'standard abilities',
    schema: schemas.npc_abilities,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir/scripts/npc/npc_abilities.txt',

    ignore: [
      'earth_spirit_boulder_smash.AbilityUnitTargetFlag is unknown', // Should be AbilityUnitTargetFlags instead
      'satyr_soulstealer_mana_burn.Modelscale is unknown', // Model scale is a unit flag?
      'abyssal_underlord_portal_warp.AbilityBehavior[2] should be a AbilityBehavior enum', // DOTA_ABILITY_BEHAVIOR_NOASSIST
      'special_bonus_unique_warlock_1.base_class is unknown', // Should be BaseClass instead
    ],
  });

  createIntegrationTest({
    name: 'standard items',
    schema: schemas.items,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir/scripts/npc/items.txt',

    ignore: [
      // TODO: Allow trailing `;`?
      `item_recipe_fallen_sky not matches any of:
  1. item_recipe_fallen_sky.ItemRequirements.01 should match pattern: /^(\\w+\\*?;)*\\w+\\*?$/
  2. item_recipe_fallen_sky.ItemRecipe should be "0"
     item_recipe_fallen_sky.ItemResult is unknown
     item_recipe_fallen_sky.ItemRequirements is unknown`,
    ],
  });

  createIntegrationTest({
    name: 'cavern abilities',
    schema: schemas.npc_abilities_custom,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/cavern/scripts/npc/npc_abilities_custom.txt',
  });

  createIntegrationTest({
    name: 'cavern items',
    schema: schemas.npc_items_custom,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/cavern/scripts/npc/npc_items_custom.txt',
  });

  createIntegrationTest({
    name: 'dungeon abilities',
    schema: schemas.npc_abilities_custom,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/dungeon/scripts/npc/npc_abilities_custom.txt',

    ignore: [
      'holdout_focusfire.ItemBaseLevel is unknown',
      'large_frostbitten_icicle.AbilityCastAnimation should be a Activity enum',
      'siltbreaker_go_phase_two.AbilityCastAnimation should be a Activity enum',
      'siltbreaker_go_phase_three.AbilityCastAnimation should be a Activity enum',
      'big_bear_battle_cry.AbilityBehavior[1] should be a AbilityBehavior enum',
    ],
  });
});
