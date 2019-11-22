import { schemas } from '../src';
import { integrationTest } from './_util';

describe('abilities', () => {
  test('integration (standard abilities)', () =>
    integrationTest(
      schemas.npc_abilities,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/scripts/npc/npc_abilities.txt',
      [
        'lone_druid_true_form_battle_cry.AbilityBehavior[1] should be a AbilityBehavior enum',
        'meepo_poof.AbilityBehavior[1] should be a AbilityBehavior enum',
        'earth_spirit_boulder_smash.AbilityUnitTargetFlag is unknown',
        'satyr_soulstealer_mana_burn.Modelscale is unknown',

        // Incorrect spacing, TODO: allow?
        'tiny_tree_channel.AbilityBehavior[0] should be a AbilityBehavior enum',
        'templar_assassin_trap_teleport.AbilityBehavior[3] should be a AbilityBehavior enum',
        'clinkz_scepter.AbilityBehavior[2] should be a AbilityBehavior enum',
      ],
    ));

  test('integration (standard items)', () =>
    integrationTest(
      schemas.items,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir/scripts/npc/items.txt',
      [
        'item_tpscroll.AbilityBehavior[2] should be a AbilityBehavior enum',
        // TODO: Is Nf valid for floats or it's a typo?
        'item_armlet.AbilitySpecial.11.toggle_cooldown[0] should be a number',
        'item_recipe_iron_talon.Model should match pattern: /^models\\/.+\\.vmdl$/',
        // TODO: Should flag enums allow empty string?
        'item_ring_of_aquila.ItemShareability should be a ItemShareability enum',
      ],
    ));

  test('integration (frostivus_2017 abilities)', () =>
    integrationTest(
      schemas.npc_abilities_custom,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/frostivus_2017/scripts/npc/npc_abilities_custom.txt',
      [
        'furion_teleport_lua.AbilityBehavior[0] should be a AbilityBehavior enum',
        'mirana_arrow_lua.AbilityBehavior[0] should be a AbilityBehavior enum',
      ],
    ));

  test('integration (frostivus_2017 items)', () =>
    integrationTest(
      schemas.npc_items_custom,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/frostivus_2017/scripts/npc/npc_items_custom.txt',
      ['item_containers_lua_pack.ItemCanChangeContainer is unknown'],
    ));

  test('integration (cavern abilities)', () =>
    integrationTest(
      schemas.npc_abilities_custom,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/cavern/scripts/npc/npc_abilities_custom.txt',
    ));

  test('integration (cavern items)', () =>
    integrationTest(
      schemas.npc_items_custom,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/cavern/scripts/npc/npc_items_custom.txt',
    ));

  test('integration (dungeon abilities)', () =>
    integrationTest(
      schemas.npc_abilities_custom,
      'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota_addons/dungeon/scripts/npc/npc_abilities_custom.txt',
      [
        'holdout_focusfire.ItemBaseLevel is unknown',
        'large_frostbitten_icicle.AbilityCastAnimation should be a Activity enum',
        'siltbreaker_go_phase_two.AbilityCastAnimation should be a Activity enum',
        'siltbreaker_go_phase_three.AbilityCastAnimation should be a Activity enum',
        'big_bear_battle_cry.AbilityBehavior[1] should be a AbilityBehavior enum',
      ],
    ));
});
