import { schemas } from '../../src/schemas';
import { createIntegrationTest } from './_util';

describe('integration', () => {
  createIntegrationTest({
    name: 'standard abilities',
    schema: schemas.npc_abilities,
    url: 'https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_abilities.txt',

    ignore: [
      'default_attack should be an object',
      'courier_dequeue_pickup_from_stash.AbilityValues should be an object',
      'miniboss_minion_following_movement.AbilityValues should be an object',
      'gyrocopter_side_gunner.AbilityValues should be an object',
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
});
