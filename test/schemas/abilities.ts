import { schemas } from '../../src/schemas';
import { createIntegrationTest } from './_util';

describe('integration', () => {
  createIntegrationTest({
    name: 'standard abilities',
    schema: schemas.npc_abilities,
    url: 'https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_abilities.txt',

    ignore: [
      'satyr_soulstealer_mana_burn.Modelscale is unknown', // Model scale is a unit flag?
    ],
  });

  createIntegrationTest({
    name: 'standard items',
    schema: schemas.items,
    url: 'https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/items.txt',

    ignore: [
      // TODO they used .mdl here, should we allow it?
      'item_recipe_iron_talon.Model should match pattern: /^models\\/.+\\.vmdl$/ but is: models/props_gameplay/recipe.mdl',
      // TODO: Should flag enums allow empty string?
      'item_ring_of_aquila.ItemShareability should be a ItemShareability enum but is: ',

      `item_recipe_grandmasters_glaive does not match any of:
  1. item_recipe_grandmasters_glaive.ItemRequirements should be an object
  2. item_recipe_grandmasters_glaive.ItemRecipe should be "0"
     item_recipe_grandmasters_glaive.ItemResult is unknown
     item_recipe_grandmasters_glaive.ItemRequirements is unknown`,

      `item_recipe_poor_mans_shield does not match any of:
  1. item_recipe_poor_mans_shield.ItemRequirements should be an object
  2. item_recipe_poor_mans_shield.ItemRecipe should be "0"
     item_recipe_poor_mans_shield.ItemResult is unknown
     item_recipe_poor_mans_shield.ItemRequirements is unknown`,

      `item_recipe_hood_of_defiance does not match any of:
  1. item_recipe_hood_of_defiance.ItemRequirements should be an object
  2. item_recipe_hood_of_defiance.ItemRecipe should be "0"
     item_recipe_hood_of_defiance.ItemResult is unknown
     item_recipe_hood_of_defiance.ItemRequirements is unknown`,

      `item_recipe_ring_of_aquila does not match any of:
  1. item_recipe_ring_of_aquila.ItemRequirements should be an object
  2. item_recipe_ring_of_aquila.ItemRecipe should be "0"
     item_recipe_ring_of_aquila.ItemResult is unknown
     item_recipe_ring_of_aquila.ItemRequirements is unknown`,

      `item_recipe_fallen_sky does not match any of:
  1. item_recipe_fallen_sky.ItemRequirements should be an object
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
      'large_frostbitten_icicle.AbilityCastAnimation should be a Activity enum but is: ACT_DOTA_ABILITY_1', // Should be ACT_DOTA_CAST_ABILITY_1
      'siltbreaker_go_phase_two.AbilityCastAnimation should be a Activity enum but is: ACT_DOTA_CAST_ABILITY_9', // There are only 7 CAST_ABILITY
      'siltbreaker_go_phase_three.AbilityCastAnimation should be a Activity enum but is: ACT_DOTA_CAST_ABILITY_9', // There are only 7 CAST_ABILITY
    ],
  });
});
