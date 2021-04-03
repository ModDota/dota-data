import assert from 'assert';
import { binaryBoolean, literal } from '../api/data/utils';
import { checkTypes } from '../validation';
import * as apiTypesTypes from './types';

export { types as apiTypesTypes } from './types';

export const apiTypesDeclarations: apiTypesTypes.Declaration[] = [];

apiTypesDeclarations.push({ kind: 'primitive', name: 'bool' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'ehandle' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'float' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'double' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'handle' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'int' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'nil' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'string' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'table' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'uint' });
apiTypesDeclarations.push({ kind: 'primitive', name: 'unknown' });
apiTypesDeclarations.push({
  kind: 'primitive',
  name: 'Quaternion',
  // VScript Lua: Unhandled variant type quaternion.
  description: 'There is no known way to create values of this type.',
});
apiTypesDeclarations.push({
  kind: 'primitive',
  name: 'Vector2D',
  description: 'There is no known way to create values of this type.',
});

apiTypesDeclarations.push({ kind: 'nominal', name: 'CombatAnalyzerQueryID', baseType: 'int' });
apiTypesDeclarations.push({ kind: 'nominal', name: 'CustomGameEventListenerID', baseType: 'int' });
apiTypesDeclarations.push({ kind: 'nominal', name: 'EntityIndex', baseType: 'int' });
apiTypesDeclarations.push({ kind: 'nominal', name: 'EventListenerID', baseType: 'int' });
apiTypesDeclarations.push({ kind: 'nominal', name: 'ParticleID', baseType: 'int' });
apiTypesDeclarations.push({ kind: 'nominal', name: 'PlayerID', baseType: 'int' });
apiTypesDeclarations.push({ kind: 'nominal', name: 'ProjectileID', baseType: 'int' });
apiTypesDeclarations.push({ kind: 'nominal', name: 'SpawnGroupHandle', baseType: 'int' });
apiTypesDeclarations.push({ kind: 'nominal', name: 'ViewerID', baseType: 'int' });

apiTypesDeclarations.push({
  kind: 'object',
  name: 'LocalTime',
  fields: [
    { name: 'Minutes', types: ['int'] },
    { name: 'Seconds', types: ['int'] },
    { name: 'Hours', types: ['int'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'CScriptHTTPResponse',
  fields: [
    { name: 'Body', types: ['string'] },
    { name: 'Request', types: ['CScriptHTTPRequest'] },
    { name: 'StatusCode', types: ['uint'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ApplyDamageOptions',
  fields: [
    { name: 'victim', types: ['CDOTA_BaseNPC'] },
    { name: 'attacker', types: ['CDOTA_BaseNPC'] },
    { name: 'damage', types: ['float'] },
    { name: 'damage_type', types: ['DAMAGE_TYPES'] },
    { name: 'damage_flags', types: ['DOTADamageFlag_t', 'nil'] },
    { name: 'ability', types: ['CDOTABaseAbility', 'nil'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'CreateIllusionsModifierKeys',
  fields: [
    { name: 'outgoing_damage', types: ['float', 'nil'] },
    { name: 'incoming_damage', types: ['float', 'nil'] },
    { name: 'bounty_base', types: ['float', 'nil'] },
    { name: 'bounty_growth', types: ['float', 'nil'] },
    { name: 'outgoing_damage_structure', types: ['float', 'nil'] },
    { name: 'outgoing_damage_roshan', types: ['float', 'nil'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'EntityBounds',
  fields: [
    { name: 'Mins', types: ['Vector'] },
    { name: 'Maxs', types: ['Vector'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'CombatAnalyzerQueryResult',
  fields: [{ name: 'query_id', types: ['CombatAnalyzerQueryID'] }],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ExecuteOrderOptions',
  fields: [
    { name: 'UnitIndex', types: ['EntityIndex'] },
    { name: 'OrderType', types: ['dotaunitorder_t'] },
    {
      name: 'TargetIndex',
      types: ['EntityIndex', 'nil'],
      description: 'Only used when targeting units.',
    },
    {
      name: 'AbilityIndex',
      types: ['EntityIndex', 'nil'],
      description: 'Only used when casting abilities.',
    },
    {
      name: 'Position',
      types: ['Vector', 'nil'],
      description: 'Only used when targeting the ground.',
    },
    {
      name: 'Queue',
      types: ['bool', 'nil'],
      description: 'Used for queueing up abilities.',
    },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'TraceCollideableInputs',
  fields: [
    { name: 'startpos', types: ['Vector'] },
    { name: 'endpos', types: ['Vector'] },
    { name: 'ent', types: ['CBaseEntity'] },
    { name: 'mins', types: ['unknown', 'nil'] },
    { name: 'maxs', types: ['unknown', 'nil'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'TraceCollideableOutputs',
  extend: ['TraceCollideableInputs'],
  fields: [
    { name: 'hit', types: ['bool'] },
    { name: 'pos', types: ['Vector'] },
    { name: 'normal', types: ['Vector'] },
    { name: 'fraction', types: ['float'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'TraceHullInputs',
  fields: [
    { name: 'startpos', types: ['Vector'] },
    { name: 'endpos', types: ['Vector'] },
    { name: 'min', types: ['unknown'] },
    { name: 'max', types: ['unknown'] },
    { name: 'mask', types: ['unknown', 'nil'] },
    { name: 'ignore', types: ['unknown', 'nil'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'TraceHullOutputs',
  extend: ['TraceHullInputs'],
  fields: [
    { name: 'hit', types: ['bool'] },
    { name: 'startsolid', types: ['bool'] },
    { name: 'pos', types: ['Vector'] },
    { name: 'normal', types: ['Vector'] },
    { name: 'fraction', types: ['float'] },
    { name: 'enthit', types: ['CBaseEntity', 'nil'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'TraceLineInputs',
  fields: [
    { name: 'startpos', types: ['Vector'] },
    { name: 'endpos', types: ['Vector'] },
    { name: 'mask', types: ['unknown', 'nil'] },
    { name: 'ignore', types: ['unknown', 'nil'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'TraceLineOutputs',
  extend: ['TraceLineInputs'],
  fields: [
    { name: 'hit', types: ['bool'] },
    { name: 'startsolid', types: ['bool'] },
    { name: 'pos', types: ['Vector'] },
    { name: 'normal', types: ['Vector'] },
    { name: 'fraction', types: ['float'] },
    { name: 'enthit', types: ['CBaseEntity', 'nil'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'CreateBaseProjectileOptions',
  fields: [
    // Base
    { name: 'EffectName', types: ['string', 'nil'] },
    { name: 'Ability', types: ['CDOTABaseAbility', 'nil'] },
    { name: 'Source', types: ['CDOTA_BaseNPC', 'nil'] },

    // Vision
    { name: 'bProvidesVision', types: ['bool', 'nil'] },
    { name: 'iVisionRadius', types: ['uint', 'nil'] },
    { name: 'iVisionTeamNumber', types: ['DOTATeam_t', 'nil'] },

    {
      name: 'ExtraData',
      types: ['table', 'nil'],
      description:
        'Extra data associated with projectile instance, that is passed to `OnProjectileThink_ExtraData` and `OnProjectileHit_ExtraData`.',
    },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'CreateLinearProjectileOptions',
  extend: ['CreateBaseProjectileOptions'],
  fields: [
    // Movement
    { name: 'vSpawnOrigin', types: ['Vector', 'nil'] },
    { name: 'vVelocity', types: ['Vector', 'nil'] },
    { name: 'vAcceleration', types: ['Vector', 'nil'], description: 'Velocity change per second.' },
    { name: 'fMaxSpeed', types: ['float', 'nil'] },

    // Behavior
    { name: 'fDistance', types: ['float', 'nil'] },
    { name: 'fStartRadius', types: ['float', 'nil'] },
    { name: 'fEndRadius', types: ['float', 'nil'] },
    { name: 'fExpireTime', types: ['float', 'nil'] },
    { name: 'iUnitTargetTeam', types: ['DOTA_UNIT_TARGET_TEAM', 'nil'] },
    { name: 'iUnitTargetFlags', types: ['DOTA_UNIT_TARGET_FLAGS', 'nil'] },
    { name: 'iUnitTargetType', types: ['DOTA_UNIT_TARGET_TYPE', 'nil'] },
    { name: 'bIgnoreSource', types: ['bool', 'nil'] },
    { name: 'bHasFrontalCone', types: ['bool', 'nil'] },

    // Appearance
    { name: 'bDrawsOnMinimap', types: ['bool', 'nil'], description: '@default false' },
    {
      name: 'bVisibleToEnemies',
      types: ['bool', 'nil'],
      description: 'Makes it invisible for all teams.',
    },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'CreateTrackingProjectileOptions',
  extend: ['CreateBaseProjectileOptions'],
  fields: [
    // Movement
    { name: 'vSourceLoc', types: ['Vector', 'nil'] },
    { name: 'Target', types: ['CDOTA_BaseNPC', 'nil'] },
    { name: 'iMoveSpeed', types: ['int', 'nil'] },

    // Behavior
    { name: 'flExpireTime', types: ['float', 'nil'] },
    { name: 'bDodgeable', types: ['bool', 'nil'] },
    { name: 'bIsAttack', types: ['bool', 'nil'] },
    {
      name: 'bReplaceExisting',
      types: ['bool', 'nil'],
      description:
        'When enabled replaces existing projectile from the ability. Does not destroy the particle.\n@default false',
    },
    // https://github.com/SteamDatabase/GameTracking-Dota2/blob/54e1f818cd61c23874f09d52f0c2b8b87b24e709/game/dota_addons/aghanim/scripts/vscripts/abilities/creatures/aghanim_staff_beams.lua#L72-L73
    { name: 'bIgnoreObstructions', types: ['bool', 'nil'] },
    { name: 'bSuppressTargetCheck', types: ['bool', 'nil'] },

    // Appearance
    { name: 'iSourceAttachment', types: ['DOTAProjectileAttachment_t', 'nil'] },
    { name: 'bDrawsOnMinimap', types: ['bool', 'nil'], description: '@default false' },
    { name: 'bVisibleToEnemies', types: ['bool', 'nil'], description: '@default true' },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'AbilityTuningValueFilterEvent',
  fields: [
    { name: 'entindex_caster_const', types: ['EntityIndex'] },
    { name: 'entindex_ability_const', types: ['EntityIndex'] },
    { name: 'value_name_const', types: ['string'] },
    { name: 'value', types: ['int'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'BountyRunePickupFilterEvent',
  fields: [
    { name: 'player_id_const', types: ['PlayerID'] },
    { name: 'xp_bounty', types: ['int'] },
    { name: 'gold_bounty', types: ['int'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'DamageFilterEvent',
  fields: [
    { name: 'entindex_attacker_const', types: ['EntityIndex'] },
    { name: 'entindex_victim_const', types: ['EntityIndex'] },
    { name: 'entindex_inflictor_const', types: ['EntityIndex', 'nil'] },
    { name: 'damagetype_const', types: ['DAMAGE_TYPES'] },
    { name: 'damage', types: ['float'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ExecuteOrderFilterEvent',
  fields: [
    { name: 'units', types: [{ kind: 'table', key: ['string'], value: ['EntityIndex'] }] },
    { name: 'entindex_target', types: ['EntityIndex'] },
    { name: 'entindex_ability', types: ['EntityIndex'] },
    { name: 'issuer_player_id_const', types: ['PlayerID'] },
    { name: 'sequence_number_const', types: ['uint'] },
    { name: 'queue', types: binaryBoolean },
    { name: 'order_type', types: ['dotaunitorder_t'] },
    { name: 'position_x', types: ['float'] },
    { name: 'position_y', types: ['float'] },
    { name: 'position_z', types: ['float'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'HealingFilterEvent',
  fields: [
    { name: 'entindex_target_const', types: ['EntityIndex'] },
    { name: 'heal', types: ['int'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ItemAddedToInventoryFilterEvent',
  fields: [
    { name: 'inventory_parent_entindex_const', types: ['EntityIndex'] },
    { name: 'item_parent_entindex_const', types: ['EntityIndex'] },
    { name: 'item_entindex_const', types: ['EntityIndex'] },
    { name: 'suggested_slot', types: [literal(-1), 'DOTAScriptInventorySlot_t'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ModifierGainedFilterEvent',
  fields: [
    { name: 'entindex_caster_const', types: ['EntityIndex'] },
    { name: 'entindex_parent_const', types: ['EntityIndex'] },
    { name: 'entindex_ability_const', types: ['EntityIndex'] },
    { name: 'name_const', types: ['string'] },
    {
      name: 'duration',
      types: ['int'],
      description:
        '-1 means forever. All other values less or equal to 0 would be equal to 1 frame.',
    },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ModifyExperienceFilterEvent',
  fields: [
    { name: 'hero_entindex_const', types: ['EntityIndex'] },
    { name: 'player_id_const', types: ['PlayerID'] },
    { name: 'reason_const', types: ['EDOTA_ModifyXP_Reason'] },
    { name: 'experience', types: ['int'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ModifyGoldFilterEvent',
  fields: [
    { name: 'player_id_const', types: ['PlayerID'] },
    { name: 'reason_const', types: ['EDOTA_ModifyGold_Reason'] },
    { name: 'reliable', types: binaryBoolean },
    { name: 'gold', types: ['uint'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'RuneSpawnFilterEvent',
  fields: [
    { name: 'spawner_entindex_const', types: ['EntityIndex'] },
    { name: 'rune_type', types: ['DOTA_RUNES'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'TrackingProjectileFilterEvent',
  fields: [
    { name: 'entindex_source_const', types: ['EntityIndex'] },
    { name: 'entindex_target_const', types: ['EntityIndex'] },
    { name: 'entindex_ability_const', types: ['EntityIndex'] },
    { name: 'is_attack', types: binaryBoolean },
    { name: 'dodgeable', types: binaryBoolean },
    // FIXME: Always was 0 on tests
    { name: 'max_impact_time', types: ['int'] },
    { name: 'move_speed', types: ['int'] },
    { name: 'expire_time', types: ['int'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ModifierAttackEvent',
  fields: [
    { name: 'attacker', types: ['CDOTA_BaseNPC'] },
    { name: 'damage', types: ['float'] },
    { name: 'damage_type', types: ['DAMAGE_TYPES'] },
    { name: 'damage_category', types: ['DamageCategory_t'] },
    { name: 'damage_flags', types: ['DOTADamageFlag_t'] },
    { name: 'inflictor', types: ['CDOTABaseAbility', 'nil'] },
    { name: 'original_damage', types: ['float'] },
    { name: 'ranged_attack', types: ['bool'] },
    { name: 'target', types: ['CDOTA_BaseNPC'] },
    { name: 'unit', types: ['CDOTA_BaseNPC', 'nil'] },
    { name: 'no_attack_cooldown', types: ['bool'] },
    { name: 'record', types: ['int'] }, // TODO: Add attack record type?
    { name: 'fail_type', types: ['attackfail'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ModifierUnitEvent',
  fields: [
    { name: 'new_pos', types: ['Vector'] },
    { name: 'order_type', types: ['dotaunitorder_t'] },
    { name: 'unit', types: ['CDOTA_BaseNPC'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'ModifierAbilityEvent',
  extend: ['ModifierUnitEvent'],
  fields: [
    { name: 'ability', types: ['CDOTABaseAbility'] },
    { name: 'target', types: ['CDOTA_BaseNPC', 'nil'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'SpawnEntityFromTableOptions',
  fields: [
    { name: 'origin', types: ['string', 'Vector', 'nil'] },
    { name: 'angles', types: ['string', 'QAngle', 'nil'] },
    { name: 'scales', types: ['string', 'Vector', 'nil'] },
    { name: 'targetname', types: ['string', 'nil'] },
    { name: 'vscripts', types: ['string', 'nil'] },
  ],
});

apiTypesDeclarations.push({
  kind: 'object',
  name: 'CreateUnitFromTableOptions',
  extend: ['SpawnEntityFromTableOptions'],
  fields: [
    { name: 'MapUnitName', types: ['string'] },
    { name: 'teamnumber', types: ['DOTATeam_t', 'nil'] },
    { name: 'modelscale', types: ['int', 'nil'] },
    {
      name: 'initial_waypoint',
      types: ['string', 'nil'],
      description: 'targetname of path_corner or path_track',
    },
    { name: 'EnableAutoStyles', types: ['string', 'nil'] },
    { name: 'rendercolor', types: ['string', 'nil'], description: 'RGB, example: "255 255 255"' },
    { name: 'skin', types: ['int', 'nil'] },
    { name: 'NeverMoveToClearSpace', types: ['bool', 'nil'] },
  ],
});

export function validateApiTypes() {
  for (const declaration of apiTypesDeclarations) {
    switch (declaration.kind) {
      case 'object':
        if (declaration.extend !== undefined) {
          assert(declaration.extend.length > 0);
          for (const extendedName of declaration.extend) {
            assert(
              apiTypesDeclarations.some((t) => t.kind === 'object' && t.name === extendedName),
              `${declaration.name}.extend: ${extendedName} must be an object type.`,
            );
          }
        }

        for (const field of declaration.fields) {
          checkTypes(`${declaration.name}.${field.name}`, field.types);
        }

        break;

      case 'nominal':
        assert(
          apiTypesDeclarations.some(
            (t) =>
              (t.kind === 'primitive' || t.kind === 'nominal') && t.name === declaration.baseType,
          ),
          `${declaration.name}.baseType: ${declaration.baseType} must be a primitive or nominal type.`,
        );

        break;
    }
  }
}
