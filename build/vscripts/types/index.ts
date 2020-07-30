import * as typesTypes from './types';

export { types as typesTypes } from './types';

export const typesDeclarations: typesTypes.Declaration[] = [];

typesDeclarations.push({
  kind: 'object',
  name: 'Quaternion',
  description: 'Invalid type.', // VScript Lua: Unhandled variant type quaternion.
  fields: [],
});

typesDeclarations.push({
  kind: 'object',
  name: 'LocalTime',
  fields: [
    { name: 'Minutes', types: ['int'] },
    { name: 'Seconds', types: ['int'] },
    { name: 'Hours', types: ['int'] },
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'CScriptHTTPResponse',
  fields: [
    { name: 'Body', types: ['string'] },
    { name: 'Request', types: ['CScriptHTTPRequest'] },
    { name: 'StatusCode', types: ['uint'] },
  ],
});

typesDeclarations.push({
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

typesDeclarations.push({
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

typesDeclarations.push({
  kind: 'object',
  name: 'EntityBounds',
  fields: [
    { name: 'Mins', types: ['Vector'] },
    { name: 'Maxs', types: ['Vector'] },
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'CombatAnalyzerQueryResult',
  fields: [{ name: 'query_id', types: ['CombatAnalyzerQueryID'] }],
});

typesDeclarations.push({
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

const traceCollideableInputs: typesTypes.ObjectField[] = [
  { name: 'startpos', types: ['Vector'] },
  { name: 'endpos', types: ['Vector'] },
  { name: 'ent', types: ['CBaseEntity'] },
  { name: 'mins', types: ['unknown', 'nil'] },
  { name: 'maxs', types: ['unknown', 'nil'] },
];

typesDeclarations.push({
  kind: 'object',
  name: 'TraceCollideableInputs',
  fields: traceCollideableInputs,
});

typesDeclarations.push({
  kind: 'object',
  name: 'TraceCollideableOutputs',
  fields: [
    ...traceCollideableInputs,
    { name: 'hit', types: ['bool'] },
    { name: 'pos', types: ['Vector'] },
    { name: 'normal', types: ['Vector'] },
    { name: 'fraction', types: ['float'] },
  ],
});

const traceHullInputs: typesTypes.ObjectField[] = [
  { name: 'startpos', types: ['Vector'] },
  { name: 'endpos', types: ['Vector'] },
  { name: 'min', types: ['unknown'] },
  { name: 'max', types: ['unknown'] },
  { name: 'mask', types: ['unknown', 'nil'] },
  { name: 'ignore', types: ['unknown', 'nil'] },
];

typesDeclarations.push({
  kind: 'object',
  name: 'TraceHullInputs',
  fields: traceHullInputs,
});

typesDeclarations.push({
  kind: 'object',
  name: 'TraceHullOutputs',
  fields: [
    ...traceHullInputs,
    { name: 'hit', types: ['bool'] },
    { name: 'startsolid', types: ['bool'] },
    { name: 'pos', types: ['Vector'] },
    { name: 'normal', types: ['Vector'] },
    { name: 'fraction', types: ['float'] },
    { name: 'enthit', types: ['CBaseEntity', 'nil'] },
  ],
});

const traceLineInputs: typesTypes.ObjectField[] = [
  { name: 'startpos', types: ['Vector'] },
  { name: 'endpos', types: ['Vector'] },
  { name: 'mask', types: ['unknown', 'nil'] },
  { name: 'ignore', types: ['unknown', 'nil'] },
];

typesDeclarations.push({
  kind: 'object',
  name: 'TraceLineInputs',
  fields: traceLineInputs,
});

typesDeclarations.push({
  kind: 'object',
  name: 'TraceLineOutputs',
  fields: [
    ...traceLineInputs,
    { name: 'hit', types: ['bool'] },
    { name: 'startsolid', types: ['bool'] },
    { name: 'pos', types: ['Vector'] },
    { name: 'normal', types: ['Vector'] },
    { name: 'fraction', types: ['float'] },
    { name: 'enthit', types: ['CBaseEntity', 'nil'] },
  ],
});

const projectileOptionsBase = (): typesTypes.ObjectField[] => [
  { name: 'EffectName', types: ['string', 'nil'] },
  { name: 'Ability', types: ['CDOTABaseAbility', 'nil'] },
  { name: 'Source', types: ['CDOTA_BaseNPC', 'nil'] },
];

const projectileOptionsVision = (): typesTypes.ObjectField[] => [
  { name: 'bProvidesVision', types: ['bool', 'nil'] },
  { name: 'iVisionRadius', types: ['uint', 'nil'] },
  { name: 'iVisionTeamNumber', types: ['DOTATeam_t', 'nil'] },
];

const projectileOptionsExtraData = (): typesTypes.ObjectField => ({
  name: 'ExtraData',
  types: ['Record<string, string | number | boolean>', 'nil'],
  description:
    'Extra data associated with projectile instance, that is passed to `OnProjectileThink_ExtraData` and `OnProjectileHit_ExtraData`.',
});

typesDeclarations.push({
  kind: 'object',
  name: 'CreateLinearProjectileOptions',
  fields: [
    ...projectileOptionsBase(),

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

    ...projectileOptionsVision(),
    projectileOptionsExtraData(),
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'CreateTrackingProjectileOptions',
  fields: [
    ...projectileOptionsBase(),

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
        'When enabled replaces existing projectile from the ability. Does not destroy particle.\n@default false',
    },

    // Appearance
    { name: 'iSourceAttachment', types: ['DOTAProjectileAttachment_t', 'nil'] },
    { name: 'bDrawsOnMinimap', types: ['bool', 'nil'], description: '@default false' },
    { name: 'bVisibleToEnemies', types: ['bool', 'nil'], description: '@default true' },

    ...projectileOptionsVision(),
    projectileOptionsExtraData(),
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'AbilityTuningValueFilterEvent',
  fields: [
    { name: 'entindex_caster_const', types: ['EntityIndex'] },
    { name: 'entindex_ability_const', types: ['EntityIndex'] },
    { name: 'value_name_const', types: ['string'] },
    { name: 'value', types: ['int'] },
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'BountyRunePickupFilterEvent',
  fields: [
    { name: 'player_id_const', types: ['PlayerID'] },
    { name: 'xp_bounty', types: ['int'] },
    { name: 'gold_bounty', types: ['int'] },
  ],
});

typesDeclarations.push({
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

typesDeclarations.push({
  kind: 'object',
  name: 'ExecuteOrderFilterEvent',
  fields: [
    // TODO: Add a type for string map
    { name: 'units', types: ['Record<string, EntityIndex>'] },
    { name: 'entindex_target', types: ['EntityIndex'] },
    { name: 'entindex_ability', types: ['EntityIndex'] },
    { name: 'issuer_player_id_const', types: ['PlayerID'] },
    { name: 'sequence_number_const', types: ['uint'] },
    { name: 'queue', types: ['0', '1'] },
    { name: 'order_type', types: ['dotaunitorder_t'] },
    { name: 'position_x', types: ['float'] },
    { name: 'position_y', types: ['float'] },
    { name: 'position_z', types: ['float'] },
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'HealingFilterEvent',
  fields: [
    { name: 'entindex_target_const', types: ['EntityIndex'] },
    { name: 'heal', types: ['int'] },
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'ItemAddedToInventoryFilterEvent',
  fields: [
    { name: 'inventory_parent_entindex_const', types: ['EntityIndex'] },
    { name: 'item_parent_entindex_const', types: ['EntityIndex'] },
    { name: 'item_entindex_const', types: ['EntityIndex'] },
    { name: 'suggested_slot', types: ['-1', 'DOTAScriptInventorySlot_t'] },
  ],
});

typesDeclarations.push({
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

typesDeclarations.push({
  kind: 'object',
  name: 'ModifyExperienceFilterEvent',
  fields: [
    { name: 'hero_entindex_const', types: ['EntityIndex'] },
    { name: 'player_id_const', types: ['PlayerID'] },
    { name: 'reason_const', types: ['EDOTA_ModifyXP_Reason'] },
    { name: 'experience', types: ['int'] },
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'ModifyGoldFilterEvent',
  fields: [
    { name: 'player_id_const', types: ['PlayerID'] },
    { name: 'reason_const', types: ['EDOTA_ModifyGold_Reason'] },
    { name: 'reliable', types: ['0', '1'] },
    { name: 'gold', types: ['uint'] },
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'RuneSpawnFilterEvent',
  fields: [
    { name: 'spawner_entindex_const', types: ['EntityIndex'] },
    { name: 'rune_type', types: ['DOTA_RUNES'] },
  ],
});

typesDeclarations.push({
  kind: 'object',
  name: 'TrackingProjectileFilterEvent',
  fields: [
    { name: 'entindex_source_const', types: ['EntityIndex'] },
    { name: 'entindex_target_const', types: ['EntityIndex'] },
    { name: 'entindex_ability_const', types: ['EntityIndex'] },
    { name: 'is_attack', types: ['0', '1'] },
    { name: 'dodgeable', types: ['0', '1'] },
    // FIXME: Always was 0 on tests
    { name: 'max_impact_time', types: ['int'] },
    { name: 'move_speed', types: ['int'] },
    { name: 'expire_time', types: ['int'] },
  ],
});

typesDeclarations.push({
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
  ],
});

const unitEventFields: typesTypes.ObjectField[] = [
  { name: 'new_pos', types: ['Vector'] },
  { name: 'order_type', types: ['dotaunitorder_t'] },
  { name: 'unit', types: ['CDOTA_BaseNPC'] },
];

typesDeclarations.push({
  kind: 'object',
  name: 'ModifierUnitEvent',
  fields: unitEventFields,
});

typesDeclarations.push({
  kind: 'object',
  name: 'ModifierAbilityEvent',
  fields: [
    ...unitEventFields,
    { name: 'ability', types: ['CDOTABaseAbility'] },
    { name: 'target', types: ['CDOTA_BaseNPC', 'nil'] },
  ],
});
