import { schemas } from '../../src/schemas';
import { createIntegrationTest } from './_util';

describe('integration', () => {
  createIntegrationTest({
    name: 'standard abilities',
    schema: schemas.npc_abilities,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir/scripts/npc/npc_abilities.txt',

    ignore: [
      'earth_spirit_boulder_smash.AbilityUnitTargetFlag is unknown', // Should be AbilityUnitTargetFlags instead
      'lone_druid_true_form_battle_cry.AbilityBehavior[1] should be a AbilityBehavior enum', // DOTA_ABILITY_TYPE_ULTIMATE
      'meepo_poof.AbilityBehavior[1] should be a AbilityBehavior enum', // Extra |, empty string ability behavior
      'satyr_soulstealer_mana_burn.Modelscale is unknown', // Model scale is a unit flag?
      'tinker_keen_teleport.AbilityBehavior[2] should be a AbilityBehavior enum', // DOTA_ABILITY_BEHAVIOR_NOASSIST
      'abyssal_underlord_portal_warp.AbilityBehavior[2] should be a AbilityBehavior enum', // DOTA_ABILITY_BEHAVIOR_NOASSIST
      'ogre_magi_ignite.AbilitySpecial.06.var_type should be a SpecialValueFieldType enum', // FIELD_INT, should be FIELD_INTEGER
      'elder_titan_move_spirit.AbilityBehavior[1] should be a AbilityBehavior enum', // DOTA_ABILITY_BEHAVIOR_POINT_TARGET, should be DOTA_ABILITY_BEHAVIOR_POINT_TARGET
      'special_bonus_unique_warlock_1.base_class is unknown', // Should be BaseClass instead
    ],
  });

  createIntegrationTest({
    name: 'standard items',
    schema: schemas.items,
    url: 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir/scripts/npc/items.txt',

    ignore: [
      'item_tpscroll.AbilityBehavior[2] should be a AbilityBehavior enum',
      // Item removed and cost made an empty string
      'item_recipe_hood_of_defiance.ItemCost should be an integer',
      // TODO they used .mdl here, should we allow it?
      'item_recipe_iron_talon.Model should match pattern: /^models\\/.+\\.vmdl$/',
      // TODO: Should flag enums allow empty string?
      'item_ring_of_aquila.ItemShareability should be a ItemShareability enum',

      // TODO: Allow trailing `;`?
      `item_recipe_trident not matches any of:
  1. item_recipe_trident.ItemRecipe should be "0"
     item_recipe_trident.ItemResult is unknown
     item_recipe_trident.ItemRequirements is unknown
  2. item_recipe_trident.ItemRequirements.01 should match pattern: /^(\\w+\\*?;)*\\w+\\*?$/
     item_recipe_trident.ItemRequirements.02 should match pattern: /^(\\w+\\*?;)*\\w+\\*?$/
     item_recipe_trident.ItemRequirements.03 should match pattern: /^(\\w+\\*?;)*\\w+\\*?$/
     item_recipe_trident.ItemRequirements.04 should match pattern: /^(\\w+\\*?;)*\\w+\\*?$/`,

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
