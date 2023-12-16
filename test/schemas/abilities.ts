import { schemas } from '../../src/schemas';
import { createIntegrationTest } from './_util';

describe('integration', () => {
  createIntegrationTest({
    name: 'standard abilities',
    schema: schemas.npc_abilities,
    url: 'https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_abilities.txt',

    ignore: [
      'satyr_soulstealer_mana_burn.Modelscale is unknown', // Model scale is a unit flag?
      'twin_gate_portal_warp.AbilityBehavior[2] should be a AbilityBehavior enum but is: DOTA_ABILITY_BEHAVIOR_NOASSIST',
      'black_dragon_splash_attack.AbilitySpecial.range.var_type is missing',
      'black_dragon_splash_attack.AbilitySpecial.damage_percent should be an object',
    ],
  });

  createIntegrationTest({
    name: 'standard items',
    schema: schemas.items,
    url: 'https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/items.txt',

    ignore: [
      'item_tpscroll.AbilityBehavior[2] should be a AbilityBehavior enum but is: DOTA_ABILITY_BEHAVIOR_NOASSIST',
      'item_soul_ring.AbilityBehavior[2] should be a AbilityBehavior enum but is: DOTA_ABILITY_BEHAVIOR_USE_HP',
      // TODO they used .mdl here, should we allow it?
      'item_recipe_iron_talon.Model should match pattern: /^models\\/.+\\.vmdl$/ but is: models/props_gameplay/recipe.mdl',
      // TODO: Should flag enums allow empty string?
      'item_ring_of_aquila.ItemShareability should be a ItemShareability enum but is: ',

      // TODO: Allow trailing `;`?
      `item_recipe_trident does not match any of:
  1. item_recipe_trident.ItemRecipe should be "0"
     item_recipe_trident.ItemResult is unknown
     item_recipe_trident.ItemRequirements is unknown
  2. item_recipe_trident.ItemRequirements.01 should match pattern: /^(\\w+\\*?;)*\\w+\\*?$/ but is: item_kaya;item_sange;item_yasha;
     item_recipe_trident.ItemRequirements.02 should match pattern: /^(\\w+\\*?;)*\\w+\\*?$/ but is: item_kaya_and_sange;item_yasha;
     item_recipe_trident.ItemRequirements.03 should match pattern: /^(\\w+\\*?;)*\\w+\\*?$/ but is: item_sange_and_yasha;item_kaya;
     item_recipe_trident.ItemRequirements.04 should match pattern: /^(\\w+\\*?;)*\\w+\\*?$/ but is: item_yasha_and_kaya;item_sange;`,
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
      'big_bear_battle_cry.AbilityBehavior[1] should be a AbilityBehavior enum but is: DOTA_ABILITY_TYPE_ULTIMATE',
    ],
  });
});
