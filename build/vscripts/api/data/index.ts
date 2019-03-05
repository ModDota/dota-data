import dedent from 'dedent';
import { Class, FunctionDeclaration, FunctionType, Interface, Type } from '../types';
import { moddotaDump } from './moddota-dump';
import { ExtensionClass, ExtensionFunction, func } from './utils';

export const classExtensions: Record<string, ExtensionClass> = {
  CScriptHTTPRequest: {
    description:
      'Note: Actual `CScriptHTTPRequest` global exists only after CreateHTTPRequest is called.',
  },
};

export const functionExtensions: Record<string, ExtensionFunction> = {
  ...moddotaDump,
  '_G.SetRenderingEnabled': { deprecated: 'Instantly crashes the game.' },
  'CEntityInstance.entindex': { deprecated: 'Use GetEntityIndex instead.' },
  'CDOTA_PlayerResource.GetPlayer': {
    description:
      'Returns player entity for a player with specified id.' +
      ' Player entity represents a single connection, so a different entity might be returned.' +
      ' When player is disconnected nil would be returned.',
    returns: ['CDOTAPlayer', 'nil'],
  },

  // Invalid parameter strings
  '_G.UnitFilter': {
    description: 'Check if a unit passes a set of filters.',
    returns: 'UnitFilterResult',
    args: {
      0: ['npc', 'CDOTA_BaseNPC'],
      1: ['teamFilter', 'UnitTargetTeam'],
      2: ['typeFilter', 'UnitTargetType'],
      3: ['flagFilter', 'UnitTargetFlags'],
      4: ['team', 'DotaTeam'],
    },
  },

  'CDOTAGamerules.GetPlayerCustomGameAccountRecord': {
    deprecated: 'Unreleased.',
    description:
      "Gets the player's custom game account record, as it looked at the start of this session.",
    args: { 0: ['playerId'] },
  },
  'CDOTAGamerules.SetCustomGameAccountRecordSaveFunction': {
    deprecated: 'Unreleased.',
    description:
      'Sets a callback to handle saving custom game account records (callback is passed a Player ID and should return a flat simple table).',
  },

  'CDOTAGameManager.GetHeroDataByName_Script': { args: { 0: ['heroName'] } },
  'CDOTAGameManager.GetHeroIDByName': { args: { 0: ['heroName'] } },
  'CDOTAGameManager.GetHeroNameByID': { args: { 0: ['heroId'] } },
  'CDOTAGameManager.GetHeroNameForUnitName': { args: { 0: ['unitName'] } },
  'CDOTAGameManager.GetHeroUnitNameByID': { args: { 0: ['heroId'] } },

  'CScriptParticleManager.GetParticleReplacement': { args: { 0: ['particleName'] /* TODO: 1 */ } },
  'CScriptParticleManager.SetParticleControlFallback': {
    args: { 0: ['particle', 'ParticleID'], '1': ['controlPoint'] },
  },
  'CScriptParticleManager.SetParticleControlOrientationFLU': {
    args: { 0: ['particle', 'ParticleID'], '1': ['controlPoint'] },
  },
  'CScriptParticleManager.SetParticleFoWProperties': {
    description: '',
    args: {
      0: ['particle', 'ParticleID'],
      1: ['controlPoint'],
      2: ['controlPoint2'],
      3: ['radius'],
    },
  },
  'CScriptParticleManager.SetParticleShouldCheckFoW': {
    description: '',
    args: { 0: ['particle', 'ParticleID'], 1: ['checkFoW'] },
  },

  'CScriptPrecacheContext.AddResource': { args: { 0: ['resource'] } },
  'CScriptPrecacheContext.GetValue': { args: { 0: ['key'] } },

  '_G.PrintLinkedConsoleMessage': { args: { 0: ['message'], 1: ['tooltip'] } },
  '_G.ShowCustomHeaderMessage': { args: { 0: ['message'] } },

  '_G.EmitAnnouncerSound': { args: { 0: ['soundName'] } },
  '_G.EmitAnnouncerSoundForPlayer': { args: { 0: ['soundName'], 1: ['playerId'] } },
  '_G.EmitAnnouncerSoundForTeam': { args: { 0: ['soundName'], 1: ['team', 'DotaTeam'] } },
  '_G.EmitAnnouncerSoundForTeamOnLocation': {
    args: { 0: ['soundName'], 1: ['team', 'DotaTeam'], 2: ['location'] },
  },
  '_G.EmitGlobalSound': { args: { 0: ['soundName'] } },
  '_G.EmitSoundOn': { args: { '0': ['soundName'], '1': ['entity', 'CBaseEntity'] } },
  '_G.EmitSoundOnClient': { args: { '0': ['soundName'] /* TODO: */ } },
  '_G.EmitSoundOnLocationWithCaster': { args: { 2: [null, 'CDOTA_BaseNPC'] } },
  '_G.StartSoundEventFromPosition': { args: { 0: ['soundName'], 1: ['position'] } },
  '_G.StartSoundEventFromPositionReliable': { args: { 0: ['soundName'], 1: ['position'] } },
  '_G.StartSoundEventFromPositionUnreliable': { args: { 0: ['soundName'], 1: ['position'] } },
  'CBaseEntity.EmitSoundParams': { args: { 0: ['soundName'] } },
  'GridNav.IsNearbyTree': { args: { 2: ['checkFullTreeRadius'] } },
  'CDOTA_BaseNPC_Hero.AddExperience': {
    description: '',
    args: { 0: ['xp'], '1': [null, 'ModifyXpReason'] },
  },
  '_G.ListenToGameEvent': {
    returns: 'EventListenerID',
    args: {
      0: ['eventName'],
      1: ['listener', func([['event', 'table']], 'nil')],
      2: ['context', '*this'],
    },
  },
  '_G.ApplyDamage': {
    args: { 0: ['options', 'ApplyDamageOptions'] },
  },
  'CDOTA_PlayerResource.WhoSelectedHero': { returns: 'PlayerID' }, // TODO:
  'CDOTA_PlayerResource.ReplaceHeroWith': { returns: 'CDOTA_BaseNPC_Hero' },
  '_G.DestroyDamageInfo': { args: { 0: ['damageInfo', 'CTakeDamageInfo'] } },
  '_G.CreateDamageInfo': {
    returns: ['CTakeDamageInfo'],
    // TODO: args
  },
  'CBaseEntity.TakeDamage': { args: { 0: ['damageInfo', 'CTakeDamageInfo'] } },
  // 'CDOTAPlayer.SetTeam': {
  // TODO: Warning: Updating player's entity team not updates team slot. Prefer using `PlayerResource.SetCustomTeamAssignment` instead.
  // },

  // https://partner.steamgames.com/doc/api/ISteamHTTP
  'CScriptHTTPRequest.Send': {
    args: { 0: ['callback', func([['response', 'CScriptHTTPResponse']], 'nil')] },
  },
  'CScriptHTTPRequest.SetHTTPRequestAbsoluteTimeoutMS': { args: { 0: ['milliseconds'] } },
  'CScriptHTTPRequest.SetHTTPRequestGetOrPostParameter': { args: { 0: ['name'], 1: ['value'] } },
  'CScriptHTTPRequest.SetHTTPRequestHeaderValue': { args: { 0: ['name'], 1: ['value'] } },
  'CScriptHTTPRequest.SetHTTPRequestNetworkActivityTimeout': { args: { 0: ['seconds'] } }, // TODO: check time units
  'CScriptHTTPRequest.SetHTTPRequestRawPostBody': { args: { 0: ['contentType'], 1: ['body'] } },

  // Filters
  'CDOTABaseGameMode.SetAbilityTuningValueFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'AbilityTuningValueFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetBountyRunePickupFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'BountyRunePickupFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetDamageFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'DamageFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetExecuteOrderFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ExecuteOrderFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetHealingFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'HealingFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetItemAddedToInventoryFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ItemAddedToInventoryFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetModifierGainedFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ModifierGainedFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetModifyExperienceFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ModifyExperienceFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetModifyGoldFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ModifyGoldFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetRuneSpawnFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'RuneSpawnFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },
  'CDOTABaseGameMode.SetTrackingProjectileFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'TrackingProjectileFilterEvent']], 'bool')],
      '1': [null, '*this'],
    },
  },

  // Remove parameters
  'CDOTA_MapTree.CutDown': { description: 'Cuts down this tree.' },
  'CDOTA_MapTree.CutDownRegrowAfter': { description: 'Cuts down this tree.' },
  'GridNav.FindPathLength': {
    description:
      'Find a path between the two points an return the length of the path. ' +
      'If there is not a path between the points the returned value will be -1.',
  },
  '_G.EmitSoundOnLocationForAllies': {
    description: 'Emit a sound on a location from a unit, only for players allied with that unit.',
    args: { 0: ['location'], 1: ['soundName'], 2: ['caster', 'CBaseEntity'] },
  },
  '_G.ScreenShake': {
    description: 'Start a screenshake.',
    args: {
      '0': ['center'],
      '1': ['amplitude'],
      '2': ['frequency'],
      '3': ['duration'],
      '4': ['radius'],
      '5': ['eCommand', ['0', '1'], 'SHAKE_START = 0, SHAKE_STOP = 1'],
      '6': ['airShake'],
    },
  },
  'CDOTA_Buff.AddParticle': {
    description: '',
    args: { 0: ['index'] },
  },
  // May return nil?
  '_G.HasRoomForItem': { description: '' },
  'CDOTA_BaseNPC_Hero.KilledHero': {
    description: '',
    args: { '0': [null, 'CDOTA_BaseNPC_Hero'], '1': [null, 'CDOTA_BaseNPC'] },
  },
  'CDOTA_BaseNPC_Hero.ModifyGold': { description: 'Gives this hero some gold.' },
  'CDOTA_BaseNPC_Hero.SpendGold': { description: '', args: { '1': [null, 'ModifyGoldReason'] } },
  'CDOTA_Buff.HasFunction': { args: { 0: [null, ['ModifierProperty', 'ModifierEvent']] } },

  'CDOTA_Item_DataDriven.ApplyDataDrivenModifier': {
    returns: 'CDOTA_Buff',
    args: {
      '0': [null, 'CDOTA_BaseNPC'],
      '1': [null, 'CDOTA_BaseNPC'],
      '3': [null, ['table', 'nil']],
    },
  },
  'CDOTA_Ability_DataDriven.ApplyDataDrivenModifier': {
    returns: 'CDOTA_Buff',
    args: {
      '0': [null, 'CDOTA_BaseNPC'],
      '1': [null, 'CDOTA_BaseNPC'],
      '3': [null, ['table', 'nil']],
    },
  },
};

export const attachedTypes = (() => {
  const context: (FunctionDeclaration | Class | Interface)[] = [];
  const scope = (scopeName: string) => {
    const currentScope: Class = { kind: 'class', name: scopeName, members: [] };
    context.push(currentScope);
    const scopeContext = {
      call(fn: FunctionType) {
        currentScope.call = fn;
        return this;
      },

      desc(description: string) {
        currentScope.description = description;
        return this;
      },

      func(funcName: string, client = false) {
        const fn: FunctionDeclaration = {
          kind: 'function',
          name: funcName,
          available: client ? 'both' : 'server',
          args: [],
          returns: [],
        };
        currentScope.members.push(fn);
        return {
          desc(description: string) {
            fn.description = description;
            return this;
          },
          arg(name: string, types: Type[], description?: string) {
            fn.args.push({ name, types, description });
            return this;
          },
          ret(type: Type[]) {
            fn.returns = type;
            return this;
          },
          end: () => scopeContext,
        };
      },

      field(name: string, type: string, description?: string) {
        currentScope.members.push({ kind: 'field', name, types: [type], description });
        return this;
      },
    };

    return scopeContext;
  };

  context.push({
    kind: 'interface',
    name: 'Quaternion',
    description: 'Invalid type.', // VScript Lua: Unhandled variant type quaternion.
    members: [],
  });

  context.push({
    kind: 'interface',
    name: 'CScriptHTTPResponse',
    members: [
      { kind: 'field', name: 'Body', types: ['string'] },
      { kind: 'field', name: 'Request', types: ['CScriptHTTPRequest'] },
      { kind: 'field', name: 'StatusCode', types: ['uint'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ApplyDamageOptions',
    members: [
      { kind: 'field', name: 'victim', types: ['CDOTA_BaseNPC'] },
      { kind: 'field', name: 'attacker', types: ['CDOTA_BaseNPC'] },
      { kind: 'field', name: 'damage', types: ['float'] },
      { kind: 'field', name: 'damage_type', types: ['DamageTypes'] },
      { kind: 'field', name: 'damage_flags', types: ['DamageFlag', 'nil'] },
      { kind: 'field', name: 'ability', types: ['CDOTABaseAbility', 'nil'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'AbilityTuningValueFilterEvent',
    members: [
      { kind: 'field', name: 'entindex_caster_const', types: ['int'] },
      { kind: 'field', name: 'entindex_ability_const', types: ['int'] },
      { kind: 'field', name: 'value_name_const', types: ['string'] },
      { kind: 'field', name: 'value', types: ['int'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'BountyRunePickupFilterEvent',
    members: [
      { kind: 'field', name: 'player_id_const', types: ['PlayerID'] },
      { kind: 'field', name: 'xp_bounty', types: ['int'] },
      { kind: 'field', name: 'gold_bounty', types: ['int'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'DamageFilterEvent',
    members: [
      { kind: 'field', name: 'entindex_attacker_const', types: ['int'] },
      { kind: 'field', name: 'entindex_victim_const', types: ['int'] },
      { kind: 'field', name: 'damagetype_const', types: ['DamageTypes'] },
      { kind: 'field', name: 'damage', types: ['float'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ExecuteOrderFilterEvent',
    members: [
      // TODO: Add a type for string map
      { kind: 'field', name: 'units', types: ['Record<string, number>'] },
      { kind: 'field', name: 'entindex_target', types: ['int'] },
      { kind: 'field', name: 'entindex_ability', types: ['int'] },
      { kind: 'field', name: 'issuer_player_id_const', types: ['PlayerID'] },
      { kind: 'field', name: 'sequence_number_const', types: ['uint'] },
      { kind: 'field', name: 'queue', types: ['0', '1'] },
      { kind: 'field', name: 'order_type', types: ['UnitOrder'] },
      { kind: 'field', name: 'position_x', types: ['float'] },
      { kind: 'field', name: 'position_y', types: ['float'] },
      { kind: 'field', name: 'position_z', types: ['float'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'HealingFilterEvent',
    members: [
      { kind: 'field', name: 'entindex_target_const', types: ['uint'] },
      { kind: 'field', name: 'heal', types: ['int'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ItemAddedToInventoryFilterEvent',
    members: [
      { kind: 'field', name: 'inventory_parent_entindex_const', types: ['int'] },
      { kind: 'field', name: 'item_parent_entindex_const', types: ['int'] },
      { kind: 'field', name: 'item_entindex_const', types: ['int'] },
      { kind: 'field', name: 'suggested_slot', types: ['-1', 'InventorySlot'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ModifierGainedFilterEvent',
    members: [
      { kind: 'field', name: 'entindex_caster_const', types: ['int'] },
      { kind: 'field', name: 'entindex_parent_const', types: ['int'] },
      { kind: 'field', name: 'entindex_ability_const', types: ['int'] },
      { kind: 'field', name: 'name_const', types: ['string'] },
      {
        kind: 'field',
        name: 'duration',
        types: ['int'],
        description:
          '-1 means forever. All other values less or equal to 0 would be equal to 1 frame.',
      },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ModifyExperienceFilterEvent',
    members: [
      { kind: 'field', name: 'player_id_const', types: ['PlayerID'] },
      { kind: 'field', name: 'reason_const', types: ['ModifyXpReason'] },
      { kind: 'field', name: 'experience', types: ['int'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ModifyGoldFilterEvent',
    members: [
      { kind: 'field', name: 'player_id_const', types: ['PlayerID'] },
      { kind: 'field', name: 'reason_const', types: ['ModifyGoldReason'] },
      { kind: 'field', name: 'reliable', types: ['0', '1'] },
      { kind: 'field', name: 'gold', types: ['uint'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'RuneSpawnFilterEvent',
    members: [
      { kind: 'field', name: 'spawner_entindex_const', types: ['int'] },
      { kind: 'field', name: 'rune_type', types: ['RuneType'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'TrackingProjectileFilterEvent',
    members: [
      { kind: 'field', name: 'entindex_source_const', types: ['int'] },
      { kind: 'field', name: 'entindex_target_const', types: ['int'] },
      { kind: 'field', name: 'entindex_ability_const', types: ['int'] },
      { kind: 'field', name: 'is_attack', types: ['0', '1'] },
      { kind: 'field', name: 'dodgeable', types: ['0', '1'] },
      // FIXME: Always was 0 on tests
      { kind: 'field', name: 'max_impact_time', types: ['int'] },
      { kind: 'field', name: 'move_speed', types: ['int'] },
      { kind: 'field', name: 'expire_time', types: ['int'] },
    ],
  });

  scope('Vector')
    .desc('3D Vector class.')
    .call({
      returns: ['Vector'],
      args: [
        { name: 'x', types: ['float', 'nil'] },
        { name: 'y', types: ['float', 'nil'] },
        { name: 'z', types: ['float', 'nil'] },
      ],
    })
    .field('x', 'float', 'X-axis')
    .field('y', 'float', 'Y-axis')
    .field('z', 'float', 'Z-axis')

    .func('__add')
    .desc('Overloaded +. Adds vectors together.')
    .arg('b', ['Vector'])
    .ret(['Vector'])
    .end()

    .func('__div')
    .desc('Overloaded /. Divides vectors.')
    .arg('b', ['Vector'])
    .ret(['Vector'])
    .end()

    .func('__eq')
    .desc('Overloaded ==. Tests for Equality.')
    .arg('b', ['Vector'])
    .ret(['bool'])
    .end()

    .func('__len')
    .desc('Overloaded # returns the length of the vector.')
    .ret(['float'])
    .end()

    .func('__mul')
    .desc(
      'Overloaded * returns the vectors multiplied together. Can also be used to multiply with scalars.',
    )
    .arg('b', ['Vector'])
    .ret(['Vector'])
    .end()

    .func('__sub')
    .desc('Overloaded -. Subtracts vectors.')
    .arg('b', ['Vector'])
    .ret(['Vector'])
    .end()

    .func('__tostring')
    .desc('Overloaded .. Converts vectors to strings.')
    .ret(['string'])
    .end()

    .func('__unm')
    .desc('Overloaded - operator. Reverses the vector.')
    .ret(['Vector'])
    .end()

    .func('Cross')
    .desc('Cross product of two vectors.')
    .arg('b', ['Vector'])
    .ret(['Vector'])
    .end()

    .func('Dot')
    .desc('Dot product of two vectors.')
    .arg('b', ['Vector'])
    .ret(['float'])
    .end()

    .func('Length')
    .desc('Length of the Vector.')
    .ret(['float'])
    .end()

    .func('Length2D')
    .desc('Length of the Vector in the XY plane.')
    .ret(['float'])
    .end()

    .func('Normalized')
    .desc('Returns the vector normalized.')
    .ret(['Vector'])
    .end()

    // https://docs.unity3d.com/ScriptReference/Vector3.Lerp.html
    .func('Lerp')
    .desc(
      dedent`
        Linearly interpolates between two vectors.
        This is most commonly used to find a point some fraction of the way along a line between two endpoints.
        Same as \`this + (b - this) * t\`.
      `,
    )
    .arg('b', ['Vector'])
    .arg('t', ['float'], 'Interpolant')
    .ret(['Vector']);

  scope('QAngle')
    .desc('QAngle class.')
    .call({
      returns: ['QAngle'],
      args: [
        { name: 'x', types: ['float', 'nil'], description: 'Pitch +down/-up.' },
        { name: 'y', types: ['float', 'nil'], description: 'Yaw +left/-right.' },
        { name: 'z', types: ['float', 'nil'], description: 'Roll +right/-left.' },
      ],
    })
    .field('x', 'float', 'Pitch angle')
    .field('y', 'float', 'Yaw angle')
    .field('z', 'float', 'Roll angle')

    .func('__add')
    .desc('Overloaded +. Adds angles together.')
    .arg('b', ['QAngle'])
    .ret(['QAngle'])
    .end()

    .func('__eq')
    .desc('Overloaded ==. Tests for Equality.')
    .arg('b', ['QAngle'])
    .ret(['bool'])
    .end()

    .func('__tostring')
    .desc('Overloaded .. Converts the QAngles to strings.')
    .ret(['string'])
    .end()

    .func('Forward')
    .desc('Returns the forward vector.')
    .ret(['Vector'])
    .end()

    .func('Left')
    .desc('Returns the left vector.')
    .ret(['Vector'])
    .end()

    .func('Up')
    .desc('Returns the up vector.')
    .ret(['Vector'])
    .end();

  // https://developer.valvesoftware.com/wiki/Destinations/Scripting/API#Uint64
  scope('Uint64')
    .desc('Integer with binary operations.')

    .func('__eq')
    .arg('b', ['Uint64'])
    .ret(['bool'])
    .end()

    .func('__tostring')
    .desc('Overloaded .. Converts Uint64s to strings.')
    .ret(['string'])
    .end()

    .func('BitwiseAnd')
    .desc('Performs bitwise AND between two integers.')
    .arg('operand', ['Uint64'])
    .ret(['Uint64'])
    .end()

    .func('BitwiseOr')
    .desc('Performs bitwise OR between two integers.')
    .arg('operand', ['Uint64'])
    .ret(['Uint64'])
    .end()

    .func('BitwiseXor')
    .desc('Performs bitwise XOR between two integers.')
    .arg('operand', ['Uint64'])
    .ret(['Uint64'])
    .end()

    .func('BitwiseNot')
    .desc('Performs bitwise NOT.')
    .ret(['Uint64'])
    .end()

    .func('SetBit')
    .desc('Sets the specified bit.')
    .arg('bitvalue', ['int'])
    .ret(['nil'])
    .end()

    .func('ClearBit')
    .desc('Clears the specified bit.')
    .arg('bitvalue', ['int'])
    .ret(['int'])
    .end()

    .func('IsBitSet')
    .desc('Checks if bit is set.')
    .arg('bitvalue', ['int'])
    .ret(['int', 'nil'])
    .end()

    .func('ToggleBit')
    .desc('Toggles the specified bit.')
    .arg('bitvalue', ['int'])
    .ret(['int'])
    .end()

    .func('ToHexString')
    .desc('Returns a hexadecimal string representation of the integer.')
    .ret(['string'])
    .end();

  return context;
})();
