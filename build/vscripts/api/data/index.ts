import dedent from 'dedent';
import * as apiTypes from '../types';
import { moddotaDump } from './moddota-dump';
import { array, binaryBoolean, ExtensionClass, ExtensionFunction, func, literal } from './utils';

const abilityPrecacheFunction: apiTypes.ClassMember = {
  kind: 'function',
  name: 'Precache',
  available: 'server',
  abstract: true,
  returns: ['nil'],
  args: [{ name: 'context', types: ['CScriptPrecacheContext'] }],
};

const abilitySpawnFunction: apiTypes.ClassMember = {
  kind: 'function',
  name: 'Spawn',
  available: 'both',
  abstract: true,
  description: 'Called when ability entity is created, after Init.',
  returns: ['nil'],
  args: [],
};

// https://github.com/SteamDatabase/GameTracking-Dota2/blob/master/game/core/scripts/vscripts/utils/vscriptinit.lua
// https://github.com/SteamDatabase/GameTracking-Dota2/blob/master/game/dota/scripts/vscripts/game/gameinit.lua
// TODO: Potentially useful functions:
// EntFire
// EntFireByHandle
// ScriptDebug*
// SpawnGroupEntityFilter

export const classExtensions: Record<string, ExtensionClass> = {
  CScriptHTTPRequest: {
    description:
      'Note: Actual `CScriptHTTPRequest` global exists only after CreateHTTPRequest is called.',
  },
  CEntityInstance: {
    members: [
      {
        kind: 'function',
        name: 'IsNull',
        available: 'both',
        description: 'Has underlying C++ entity object been deleted?',
        returns: ['bool'],
        args: [],
      },
    ],
  },
  CBaseEntity: {
    members: [
      {
        kind: 'function',
        name: 'IsBaseNPC',
        available: 'both',
        description: 'Is this entity an CDOTA_BaseNPC?',
        returns: ['bool'],
        args: [],
      },
      {
        kind: 'function',
        name: 'SetThink',
        available: 'both',
        description:
          'Set a think function on this entity. Uses `CBaseEntity:SetContextThink` internally.\nNote: optional parameters can be given in any order.',
        returns: ['nil'],
        args: [
          {
            name: 'functionName',
            types: [func([['entity', 'CBaseEntity']], ['float', 'nil']), 'string'],
            description:
              'If `context` is provided, think function would perform a dynamic lookup on `context` table. Otherwise searches for that function name in caller scope.',
          },
          { name: 'context', types: ['table', 'nil'] },
          {
            name: 'contextName',
            types: ['string', 'nil'],
            description: "Defaults to `functionName` if it's a string.",
          },
          {
            name: 'initialDelay',
            types: ['float', 'nil'],
            description: 'Defaults to 0 (next game frame).',
          },
        ],
      },
      {
        kind: 'function',
        name: 'StopThink',
        available: 'both',
        description:
          'Stops thinker created with `CBaseEntity.SetThink`.\nAlias for `CBaseEntity:SetContextThink(contextName, nil, 0)`.',
        returns: ['nil'],
        args: [{ name: 'contextName', types: ['string'] }],
      },
      {
        kind: 'function',
        name: 'IsInstance',
        available: 'both',
        returns: ['bool'],
        args: [{ name: 'classOrClassName', types: ['string', 'table'] }],
      },
    ],
  },
  CDOTA_Ability_Lua: {
    members: [
      {
        kind: 'function',
        name: 'Init',
        available: 'both',
        abstract: true,
        description: 'Called first when ability entity is created.',
        returns: ['nil'],
        args: [],
      },
      abilityPrecacheFunction,
      abilitySpawnFunction,
    ],
  },
  CDOTA_Item_Lua: {
    members: [abilityPrecacheFunction, abilitySpawnFunction],
  },
  CDOTA_Modifier_Lua: {
    members: [
      {
        kind: 'function',
        name: 'DeclareFunctions',
        available: 'both',
        abstract: true,
        description: 'Return a list of modifier functions this modifier implements.',
        returns: [{ kind: 'array', types: ['modifierfunction'] }],
        args: [],
      },
      {
        kind: 'function',
        name: 'CheckState',
        available: 'both',
        abstract: true,
        description: 'Return a map of enabled/disabled states.',
        returns: [{ kind: 'table', key: ['modifierstate'], value: ['bool'] }],
        args: [],
      },
    ],
  },
};

export const functionExtensions: Record<string, ExtensionFunction> = {
  ...moddotaDump,
  '_G.SetRenderingEnabled': { deprecated: 'Instantly crashes the game.' },
  'CDOTA_PlayerResource.GetPlayer': {
    description:
      'Returns player entity for a player with specified id.' +
      ' Player entity represents a single connection, so a different entity might be returned.' +
      ' When player is disconnected nil would be returned.',
    returns: ['CDOTAPlayer', 'nil'],
  },
  'CDOTAPlayer.GetPlayerID': { returns: 'PlayerID' },

  // Invalid parameter strings
  '_G.UnitFilter': {
    description: 'Check if a unit passes a set of filters.',
    returns: 'UnitFilterResult',
    args: {
      0: ['npc', 'CDOTA_BaseNPC'],
      1: ['teamFilter', 'DOTA_UNIT_TARGET_TEAM'],
      2: ['typeFilter', 'DOTA_UNIT_TARGET_TYPE'],
      3: ['flagFilter', 'DOTA_UNIT_TARGET_FLAGS'],
      4: ['team', 'DOTATeam_t'],
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

  'CScriptParticleManager.GetParticleReplacement': {
    args: {
      0: ['particleName'],
      // TODO: It accepts any table, but creatures with equipped wearables don't get replacement
      1: ['hero', ['CDOTA_BaseNPC_Hero', 'nil']],
    },
  },
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
  '_G.PrecacheEntityFromTable': { args: { 2: ['context', 'CScriptPrecacheContext'] } },
  '_G.PrecacheEntityListFromTable': { args: { 1: ['context', 'CScriptPrecacheContext'] } },
  '_G.PrecacheItemByNameAsync': {
    args: { 0: ['itemName'], 1: ['callback', func([['precacheId', 'int']], 'nil')] },
  },
  '_G.PrecacheItemByNameSync': {
    args: { 0: ['itemName'], 1: ['context', 'CScriptPrecacheContext'] },
  },
  '_G.PrecacheModel': { args: { 1: [null, 'CScriptPrecacheContext'] } },
  '_G.PrecacheResource': { args: { 2: ['context', 'CScriptPrecacheContext'] } },
  '_G.PrecacheUnitByNameAsync': {
    args: {
      0: ['unitName'],
      1: ['callback', func([['precacheId', 'int']], 'nil')],
      2: ['playerId', ['PlayerID', 'nil']],
    },
  },
  '_G.PrecacheUnitByNameSync': {
    args: {
      0: ['unitName'],
      1: ['context', 'CScriptPrecacheContext'],
      2: ['playerId', ['PlayerID', 'nil']],
    },
  },
  '_G.PrecacheUnitFromTableAsync': {
    args: { 1: ['callback', func([['precacheId', 'int']], 'nil')] },
  },
  '_G.PrecacheUnitFromTableSync': { args: { 1: ['context', 'CScriptPrecacheContext'] } },

  '_G.PrintLinkedConsoleMessage': { args: { 0: ['message'], 1: ['tooltip'] } },
  '_G.ShowCustomHeaderMessage': { args: { 0: ['message'] } },

  '_G.EmitAnnouncerSound': { args: { 0: ['soundName'] } },
  '_G.EmitAnnouncerSoundForPlayer': { args: { 0: ['soundName'], 1: ['playerId'] } },
  '_G.EmitAnnouncerSoundForTeam': { args: { 0: ['soundName'], 1: ['team', 'DOTATeam_t'] } },
  '_G.EmitAnnouncerSoundForTeamOnLocation': {
    args: { 0: ['soundName'], 1: ['team', 'DOTATeam_t'], 2: ['location'] },
  },
  '_G.EmitGlobalSound': { args: { 0: ['soundName'] } },
  '_G.EmitSoundOn': { args: { '0': ['soundName'], '1': ['entity', 'CBaseEntity'] } },
  '_G.EmitSoundOnClient': { args: { '0': ['soundName'] /* TODO: */ } },
  '_G.EmitSoundOnLocationWithCaster': { args: { 2: [null, 'CDOTA_BaseNPC'] } },
  '_G.StartSoundEventFromPosition': { args: { 0: ['soundName'], 1: ['position'] } },
  '_G.StartSoundEventFromPositionReliable': { args: { 0: ['soundName'], 1: ['position'] } },
  '_G.StartSoundEventFromPositionUnreliable': { args: { 0: ['soundName'], 1: ['position'] } },
  'CBaseEntity.EmitSoundParams': { args: { 0: ['soundName'] } },
  'CDOTA_BaseNPC_Hero.AddExperience': {
    description: '',
    args: { 1: [null, 'EDOTA_ModifyXP_Reason'] },
  },
  '_G.ListenToGameEvent': {
    returns: 'EventListenerID',
    args: {
      0: ['eventName'],
      1: ['listener', func([['event', 'table']], 'nil')],
      2: ['context', ['table', 'nil']],
    },
  },
  '_G.StopListeningToGameEvent': { args: { 0: ['listenerId', 'EventListenerID'] } },
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
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetBountyRunePickupFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'BountyRunePickupFilterEvent']], 'bool')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetDamageFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'DamageFilterEvent']], 'bool')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetExecuteOrderFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ExecuteOrderFilterEvent']], 'bool')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetHealingFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'HealingFilterEvent']], 'bool')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetItemAddedToInventoryFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ItemAddedToInventoryFilterEvent']], 'bool')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetModifierGainedFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ModifierGainedFilterEvent']], 'bool')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetModifyExperienceFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ModifyExperienceFilterEvent']], 'bool')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetModifyGoldFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'ModifyGoldFilterEvent']], 'bool')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetRuneSpawnFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'RuneSpawnFilterEvent']], 'bool')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.SetTrackingProjectileFilter': {
    args: {
      '0': ['filterFunc', func([['event', 'TrackingProjectileFilterEvent']], 'bool')],
      '1': [null, 'table'],
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
      '5': ['command', binaryBoolean, 'SHAKE_START = 0, SHAKE_STOP = 1'],
      '6': ['airShake'],
    },
  },
  'CDOTA_Buff.AddParticle': {
    description: '',
    args: { 0: ['index'] },
  },
  // TODO: DOTAInventoryFlags_t?
  'CDOTA_BaseNPC_Hero.HasRoomForItem': { description: '' },
  '_G.CreateIllusions': {
    description:
      'Create illusions of the passed hero that belong to passed unit using passed modifier data.',
    returns: array('CDOTA_BaseNPC_Hero'),
    args: {
      0: ['owner', 'CBaseEntity'],
      1: ['heroToCopy', 'CDOTA_BaseNPC_Hero'],
      2: ['modifierKeys', 'CreateIllusionsModifierKeys'],
      3: ['numIllusions'],
      4: ['padding'],
      5: ['scramblePosition'],
      6: ['findClearSpace'],
    },
  },
  'CDOTA_BaseNPC_Hero.KilledHero': {
    description: '',
    args: { '0': [null, 'CDOTA_BaseNPC_Hero'], '1': [null, ['CDOTABaseAbility', 'nil']] },
  },
  'CDOTA_BaseNPC_Hero.ModifyGold': {
    description: 'Gives this hero some gold.',
    args: { '2': [null, 'EDOTA_ModifyGold_Reason'] },
  },
  'CDOTA_BaseNPC_Hero.SpendGold': {
    description: '',
    args: { '1': [null, 'EDOTA_ModifyGold_Reason'] },
  },
  'CDOTA_Buff.HasFunction': { args: { 0: [null, 'modifierfunction'] } },

  'CDOTA_Item_DataDriven.ApplyDataDrivenModifier': {
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
  'CDOTA_Item_DataDriven.ApplyDataDrivenThinker': {
    returns: 'CDOTA_Buff',
    args: {
      '0': [null, 'CDOTA_BaseNPC'],
      '3': [null, ['table', 'nil']],
    },
  },
  'CDOTA_Ability_DataDriven.ApplyDataDrivenThinker': {
    returns: 'CDOTA_Buff',
    args: {
      '0': [null, 'CDOTA_BaseNPC'],
      '3': [null, ['table', 'nil']],
    },
  },

  'CBaseEntity.GetBounds': { returns: 'EntityBounds' },
  '_G.CreateTempTree': { returns: 'CBaseAnimating' },
  '_G.CreateTempTreeWithModel': { returns: 'CBaseAnimating' },
  '_G.CreateSceneEntity': { returns: 'CSceneEntity' },
  '_G.PlayerInstanceFromIndex': {
    returns: ['CDOTAPlayer', 'nil'],
    args: { 0: ['entityIndex', 'EntityIndex'] },
  },
  'CEntityInstance.entindex': { returns: 'EntityIndex' },
  'CEntityInstance.GetEntityIndex': { returns: 'EntityIndex' },
  '_G.GetEntityIndexForTreeId': { returns: 'EntityIndex', args: { 0: ['treeId'] } },
  '_G.GetTreeIdForEntityIndex': { args: { 0: ['entityIndex', 'EntityIndex'] } },
  'CDOTABaseAbility.GetSpecialValueFor': { returns: 'float' },
  'CDOTABaseAbility.GetLevelSpecialValueFor': { returns: 'float' },
  'CDOTABaseAbility.GetLevelSpecialValueNoOverride': {
    description:
      "Gets a value from this ability's special value block for passed level, ignoring MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL.",
    returns: 'float',
  },
  'CBaseFlex.GetCurrentScene': { returns: ['CSceneEntity', 'nil'] },
  'CBaseFlex.GetSceneByIndex': { returns: ['CSceneEntity', 'nil'] },
  'GridNav.GetAllTreesAroundPoint': { returns: array('CDOTA_MapTree') },
  'CDOTA_Item.GetItemSlot': { returns: [literal(-1), 'DOTAScriptInventorySlot_t'] },
  '_G.CreateTrigger': { returns: 'CBaseTrigger' },
  '_G.CreateTriggerRadiusApproximate': { returns: 'CBaseTrigger' },
  'CDOTA_ShopTrigger.GetShopType': { returns: 'DOTA_SHOP_TYPE' },
  'CDOTA_ShopTrigger.SetShopType': { args: { 0: [null, 'DOTA_SHOP_TYPE'] } },
  'CDOTA_BaseNPC_Shop.GetShopType': { returns: 'DOTA_SHOP_TYPE' },
  'CDOTA_BaseNPC_Shop.SetShopType': { args: { 0: [null, 'DOTA_SHOP_TYPE'] } },
  'CDOTA_BaseNPC.IsInRangeOfShop': {
    description: 'Ask whether this unit is in range of the specified shop.',
    args: { 0: [null, 'DOTA_SHOP_TYPE'] },
  },
  'CBaseEntity.GetChildren': { returns: array('CBaseEntity') },
  // TODO:
  'CBaseEntity.SetParent': { args: { 0: [null, 'CBaseEntity'] } },
  'CDOTA_BaseNPC.RemoveAbilityByHandle': { args: { 0: [null, 'CDOTABaseAbility'] } },
  'CDOTABaseGameMode.AddRealTimeCombatAnalyzerQuery': {
    args: { 1: [null, 'CDOTAPlayer'] },
    returns: 'CombatAnalyzerQueryID',
  },
  'CDOTABaseGameMode.ListenForQueryProgressChanged': {
    args: {
      '0': [null, func([['result', 'CombatAnalyzerQueryResult']], 'nil')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.ListenForQueryFailed': {
    args: {
      '0': [null, func([['result', 'CombatAnalyzerQueryResult']], 'nil')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.ListenForQuerySucceeded': {
    args: {
      '0': [null, func([['result', 'CombatAnalyzerQueryResult']], 'nil')],
      '1': [null, 'table'],
    },
  },
  'CDOTABaseGameMode.RemoveRealTimeCombatAnalyzerQuery': {
    args: { 0: [null, 'CombatAnalyzerQueryID'] },
  },
  'CDOTAGamerules.AddBotPlayerWithEntityScript': {
    returns: ['CDOTA_BaseNPC_Hero', 'nil'],
    args: {
      0: ['heroName'],
      1: ['playerName'],
      2: ['team', 'DOTATeam_t'],
      3: [
        'entityScript',
        null,
        'Path to a script file executed in the context of spawned hero entity.',
      ],
    },
  },

  'CDOTATutorial.IsItemInWhiteList': { args: { '0': ['itemName'] } },
  'CDOTATutorial.AddShopWhitelistItem': { args: { '0': ['itemName'] } },
  'CDOTATutorial.RemoveShopWhitelistItem': { args: { '0': ['itemName'] } },
  'CDOTATutorial.SetWhiteListEnabled': { args: { '0': ['whiteListEnabled'] } },
  'CDOTAGamerules.IsItemInWhiteList': { args: { 0: ['itemName'] } },
  'CDOTAGamerules.AddItemToWhiteList': { args: { 0: ['itemName'] } },
  'CDOTAGamerules.RemoveItemFromWhiteList': { args: { 0: ['itemName'] } },
  'CDOTAGamerules.SetWhiteListEnabled': { args: { 0: ['whiteListEnabled'] } },
  '_G.Msg': { args: { 0: ['message'] } },
  '_G.Warning': { args: { 0: ['message'] } },
  // TODO: `position` or `location`?
  '_G.ResolveNPCPositions': { args: { 0: ['location'], 1: ['radius'] } },
  'CEnvProjectedTexture.SetVolumetrics': { description: 'Turn on/off light volumetrics.' },
  '_G.GetLobbyEventGameDetails': { description: '' },
  'CBaseEntity.AddEffects': { args: { 0: [null, 'EntityEffects'] } },
  'CBaseEntity.RemoveEffects': { args: { 0: [null, 'EntityEffects'] } },
  '_G.IsMarkedForDeletion': { args: { 0: ['entity', 'CBaseEntity'] } },
  'CDOTAPlayer.CheckForCourierSpawning': { args: { 0: [null, 'CDOTA_BaseNPC_Hero'] } },
  'CDOTA_Item_Lua.CanUnitPickUp': {
    args: { 0: [null, 'CDOTA_BaseNPC', 'Unit trying to pick up the item.'] },
  },
  '_G.AppendToLogFile': {
    description: '',
    deprecated: 'AppendToLogFile is deprecated. Print to the console for logging instead.',
  },
  '_G.InitLogFile': {
    description: '',
    deprecated: 'InitLogFile is deprecated. Print to the console for logging instead.',
  },
  '_G.GetDedicatedServerKey': {
    deprecated: 'This function is unsafe. Prefer using `GetDedicatedServerKeyV2` instead.',
  },
  'CDOTA_BaseNPC.AddActivityModifier': {
    args: { 0: [null, null, "The name of the activity modifier to add, e.g. 'haste'."] },
  },
  'CBaseEntity.GetContext': { returns: ['string', 'float', 'nil'] },
  'CBaseEntity.SetContextThink': {
    args: { 1: [null, [func([['entity', 'CBaseEntity']], ['float', 'nil']), 'nil']] },
  },
  'CDOTA_Buff.GetAuraOwner': {
    description:
      'Returns the owner of the aura modifier, that applied this modifier. Always `nil` on the client.',
    returns: ['CDOTA_BaseNPC', 'nil'],
  },
  '_G.SpawnDOTAShopTriggerRadiusApproximate': { returns: 'CDOTA_ShopTrigger' },
  '_G.LocalTime': { returns: 'LocalTime' },
  '_G.GetListenServerHost': {
    // TODO: Nullable?
    returns: 'CDOTAPlayer',
  },
  'CDOTAGamerules.RemoveFakeClient': { args: { 0: ['playerId'] } },
  'CDOTAGamerules.SetGameTimeFrozen': { args: { 0: ['frozen'] } },
  '_G.CreateRune': { returns: 'CBaseAnimating', args: { 1: [null, 'DOTA_RUNES'] } },
  '_G.DropNeutralItemAtPositionForHero': {
    returns: 'CDOTA_Item_Physical',
    args: {
      0: ['itemName', null, 'Can be any item name, it does not have to be neutral.'],
      1: ['location'],
      2: ['unit', 'CDOTA_BaseNPC'],
      3: ['tier', null, 'Zero-based tier number.'],
    },
  },
  '_G.FindSpawnEntityForTeam': {
    returns: ['CBaseEntity', 'nil'],
    args: { 0: ['team', 'DOTATeam_t'] },
  },
  '_G.GetXPNeededToReachNextLevel': { args: { 0: ['level'] } },
  '_G.GetLocalPlayerID': { returns: 'PlayerID' },
  '_G.GetLocalPlayerTeam': { returns: 'DOTATeam_t' },
  'CDOTAGamerules.GetAnnouncer': {
    returns: ['CDOTA_BaseNPC', 'nil'],
    args: { 0: ['team', 'DOTATeam_t'] },
  },
  'CDOTA_BaseNPC_Hero.IncrementAssists': { args: { 0: [null, 'PlayerID'] } },
  'CDOTA_BaseNPC_Hero.IncrementDeaths': { args: { 0: [null, 'PlayerID'] } },
  'CDOTA_BaseNPC_Hero.IncrementKills': { args: { 0: [null, 'PlayerID'] } },
  'CDOTA_PlayerResource.GetDamageDoneToHero': { args: { '1': [null, 'PlayerID'] } },
  '_G.DebugCreateUnit': {
    args: {
      0: ['playerOwner', 'CDOTAPlayer'],
      1: ['unitName'],
      2: ['team', 'DOTATeam_t'],
      // TODO: 3?
      4: ['callback', func([['unit', 'CDOTA_BaseNPC']], 'nil')],
    },
  },
  '_G.CenterCameraOnUnit': { args: { 1: [null, ['CBaseEntity', 'nil']] } },
  '_G.RollPseudoRandomPercentage': {
    description: '',
    args: {
      0: ['chance'],
      1: [
        'pseudoRandomId',
        'PseudoRandom',
        'Any number can be specified. Using DOTA_PSEUDO_RANDOM_NONE makes it act as a pure RNG.',
      ],
      2: ['unit', 'CDOTA_BaseNPC'],
    },
  },
  'CLogicRelay.Trigger': {
    args: {
      0: [null, ['CBaseEntity', 'nil']],
      1: [null, ['CBaseEntity', 'nil']],
    },
  },
  'CDOTABaseGameMode.AllocateFowBlockerRegion': { returns: 'CFoWBlockerRegion' },
  '_G.DOTA_SpawnMapAtPosition': {
    returns: 'SpawnGroupHandle',
    args: {
      0: ['mapName', null, 'A map name without extension, relative to "maps" directory.'],
      1: [
        'location',
        null,
        'The value of x and y must be multiple the grid size 64.\nTo avoid GridNav conflicts, tiles on these coordinates on the base map must be empty.',
      ],
      2: [
        'deferCompletion',
        null,
        'If true, to finish map loading you need to call ManuallyTriggerSpawnGroupCompletion(spawnGroupHandle).',
      ],
      3: [
        'onReadyToSpawn',
        func([['spawnGroupHandle', 'SpawnGroupHandle']], 'nil'),
        'Called only when deferCompletion is true.',
      ],
      4: ['onSpawnComplete', func([['spawnGroupHandle', 'SpawnGroupHandle']], 'nil')],
      5: ['context', ['table', 'nil']],
    },
  },
  '_G.GetAbilityTextureNameForAbility': {
    args: { 0: ['abilityName'] },
  },
  '_G.IsUnitInValidPosition': {
    args: { 0: ['unit', 'CBaseEntity'] },
  },
  'CDOTAGamerules.IncreaseItemStock': {
    description: "Increase an item's stock count, clamped to item max.",
    args: {
      0: ['team', 'DOTATeam_t'],
      1: ['itemName'],
      2: ['count', null, 'Negative values decrease stock count.'],
      3: [
        'playerId',
        null,
        'Values other than -1 work only for items with "PlayerSpecificCooldown" property.',
      ],
    },
  },
  'CDOTA_PlayerResource.AddNeutralItemToStash': {
    args: {
      1: [null, 'DOTATeam_t'],
      2: [null, 'CDOTA_Item'],
    },
  },
  'CDOTA_PlayerResource.GetLiveSpectatorTeam': {
    returns: ['DOTATeam_t', literal(-1)],
  },
  'CDOTA_BaseNPC.QueueConcept': {
    args: {
      2: [
        null,
        func(
          [
            ['didActuallySpeak', 'bool'],
            ['callbackInfo', 'table'],
          ],
          'nil',
        ),
      ],
      3: [null, 'table'],
      4: [null, 'table'],
    },
  },
  'CDOTA_BaseNPC.QueueTeamConcept': {
    args: {
      2: [
        null,
        func(
          [
            ['didActuallySpeak', 'bool'],
            ['callbackInfo', 'table'],
          ],
          'nil',
        ),
      ],
      3: [null, 'table'],
      4: [null, 'table'],
    },
  },
  'CDOTA_BaseNPC.QueueTeamConceptNoSpectators': {
    args: {
      2: [
        null,
        func(
          [
            ['didActuallySpeak', 'bool'],
            ['callbackInfo', 'table'],
          ],
          'nil',
        ),
      ],
      3: [null, 'table'],
      4: [null, 'table'],
    },
  },
  '_G.CreateModifierThinker': {
    args: {
      '0': [null, ['CDOTA_BaseNPC', 'nil']],
      '1': [null, ['CDOTABaseAbility', 'nil']],
      '3': [null, ['table', 'nil']],
      '5': [null, 'DOTATeam_t'],
    },
    returns: 'CDOTA_BaseNPC'
  },
  '_G.CreateUniformRandomStream': { returns: 'CScriptUniformRandomStream' },
  '_G.ExecuteOrderFromTable': { args: { 0: ['order', 'ExecuteOrderOptions'] } },
  '_G.TraceCollideable': { description: '', args: { 0: ['query', 'TraceCollideableInputs'] } },
  '_G.TraceHull': { description: '', args: { 0: ['query', 'TraceHullInputs'] } },
  '_G.TraceLine': { description: '', args: { 0: ['query', 'TraceLineInputs'] } },
  'CBaseEntity.SetAngularVelocity': { description: 'Set the local angular velocity.' }, // Remove argument names
  'CBaseModelEntity.SetSkin': { description: '' }, // Remove argument type and function name
  'CDOTAGamerules.AddEventMetadataLeaderboardEntry': {
    args: {
      0: ['nameSuffix'],
      1: ['stars'],
      2: ['maxStars'],
      3: ['extraData1'],
      4: ['extraData2'],
      5: ['extraData3'],
      6: ['extraData4'],
      7: ['extraData5'],
      8: ['extraData6'],
    },
  },
  'CDOTAGamerules.AddEventMetadataLeaderboardEntryRawScore': {
    args: {
      0: ['nameSuffix'],
      1: ['score'],
      2: ['extraData1'],
      3: ['extraData2'],
      4: ['extraData3'],
      5: ['extraData4'],
      6: ['extraData5'],
      7: ['extraData6'],
    },
  },
  'CDOTAPlayer.SpawnCourierAtPosition': { returns: 'CDOTA_Unit_Courier' },
  '_G.GetActiveSpawnGroupHandle': { returns: 'SpawnGroupHandle' },
  '_G.ManuallyTriggerSpawnGroupCompletion': { args: { 0: ['handle', 'SpawnGroupHandle'] } },
  '_G.UnloadSpawnGroupByHandle': { args: { 0: ['handle', 'SpawnGroupHandle'] } },
  'CBaseEntity.GetSpawnGroupHandle': { returns: 'SpawnGroupHandle' },
  'CDOTABaseAbility.RefreshIntrinsicModifier': {
    returns: 'bool',
    description: 'Returns true if ability has intrinsic modifier.',
  },
  'CDOTABaseAbility.GetBehavior': { returns: 'DOTA_ABILITY_BEHAVIOR' },
  'CDOTABaseAbility.GetBehaviorInt': { returns: 'DOTA_ABILITY_BEHAVIOR' },
  'CDOTA_BaseNPC.RemoveAllModifiers': {
    description: '',
    args: {
      0: [null, [literal(0), literal(1), literal(2)], '0=all, 1=enemy, 2=ally'],
    },
  },
  'CDOTAGamerules.GetBannedHeroes': { returns: array('string') },
  'ProjectileManager.IsValidProjectile': { args: { 0: ['value'] } },
  '_G.IsMangoTree': { args: { 0: ['entity', 'CBaseEntity'] } },
  '_G.GetPotentialNeutralItemDrop': { args: { 0: ['tier'], 1: ['team', 'DOTATeam_t'] } },
  'CDOTA_BaseNPC_Hero.GetReplicatingOtherHero': {
    description: 'If hero is under Replicate effect, returns original hero entity.',
    returns: ['CDOTA_BaseNPC_Hero', 'nil'],
  },
  'CDOTA_BaseNPC_Hero.ModifyGoldFiltered': {
    // TODO: Detect "Args: " pattern?
    description: 'Gives this hero some gold, using the gold filter if extra filtering is on.',
    args: { 1: ['reliable'], 2: [null, 'EDOTA_ModifyGold_Reason'] },
  },
  'CDOTAGamerules.ModifyGoldFiltered': {
    args: {
      0: ['playerId'],
      1: ['goldChange'],
      2: ['reliable'],
      3: ['reason', 'EDOTA_ModifyGold_Reason'],
    },
  },
  'CDOTAGamerules.ExecuteTeamPing': {
    args: {
      0: ['team', 'DOTATeam_t'],
      1: ['xCoord'],
      2: ['yCoord'],
      3: ['entity', ['CBaseEntity', 'nil']],
      4: [
        'type',
        [literal(0), literal(1), literal(2), literal(3), literal(4), literal(5), literal(6)],
      ],
    },
  },
  'CDOTAGamerules.GetItemStockCount': {
    args: {
      0: ['team', 'DOTATeam_t'],
      1: ['itemName'],
      2: ['playerId', null, 'Used only for items with "PlayerSpecificCooldown"'],
    },
  },
  'CDOTAGamerules.GetItemStockDuration': {
    args: {
      0: ['team', 'DOTATeam_t'],
      1: ['itemName'],
      2: ['playerId', null, 'Used only for items with "PlayerSpecificCooldown"'],
    },
  },
  'CDOTAGamerules.GetItemStockTime': {
    args: {
      0: ['team', 'DOTATeam_t'],
      1: ['itemName'],
      2: ['playerId', null, 'Used only for items with "PlayerSpecificCooldown"'],
    },
  },
  'CDOTAGamerules.SetItemStockCount': {
    args: {
      0: ['count'],
      1: ['team', 'DOTATeam_t'],
      2: ['itemName'],
      3: ['playerId', null, 'Used only for items with "PlayerSpecificCooldown"'],
    },
  },
  'CDOTAGamerules.SetGlyphCooldown': {
    args: {
      0: ['team', 'DOTATeam_t'],
      1: ['cooldown'],
    },
  },
};

export const extraDeclarations = (() => {
  const context: apiTypes.Declaration[] = [];

  context.push({
    kind: 'function',
    name: 'DeepPrintTable',
    description: 'Print out a table (and subtables) to the console.',
    available: 'both',
    args: [{ name: 'table', types: ['table', 'nil'] }],
    returns: ['nil'],
  });

  context.push({
    kind: 'function',
    name: 'Dynamic_Wrap',
    description: 'A function to re-lookup a function by name every time.',
    available: 'both',
    args: [
      { name: 'context', types: ['table'] },
      { name: 'name', types: ['string'] },
    ],
    returns: ['unknown'],
  });

  context.push({
    kind: 'class',
    name: 'Vector',
    clientName: 'Vector',
    description: '3D Vector class.',
    call: {
      kind: 'function',
      returns: ['Vector'],
      args: [
        { name: 'x', types: ['float', 'nil'] },
        { name: 'y', types: ['float', 'nil'] },
        { name: 'z', types: ['float', 'nil'] },
      ],
    },
    members: [
      { kind: 'field', name: 'x', types: ['float'], description: 'X-axis' },
      { kind: 'field', name: 'y', types: ['float'], description: 'Y-axis' },
      { kind: 'field', name: 'z', types: ['float'], description: 'Z-axis' },
      {
        kind: 'function',
        name: '__add',
        available: 'both',
        args: [{ name: 'b', types: ['Vector'] }],
        returns: ['Vector'],
        description: 'Overloaded +. Adds vectors together.',
      },
      {
        kind: 'function',
        name: '__div',
        available: 'both',
        args: [{ name: 'b', types: ['Vector'] }],
        returns: ['Vector'],
        description: 'Overloaded /. Divides vectors.',
      },
      {
        kind: 'function',
        name: '__eq',
        available: 'both',
        args: [{ name: 'b', types: ['Vector'] }],
        returns: ['bool'],
        description: 'Overloaded ==. Tests for Equality.',
      },
      {
        kind: 'function',
        name: '__len',
        available: 'both',
        args: [],
        returns: ['float'],
        description: 'Overloaded # returns the length of the vector.',
      },
      {
        kind: 'function',
        name: '__mul',
        available: 'both',
        args: [{ name: 'b', types: ['Vector', 'float'] }],
        returns: ['Vector'],
        description:
          'Overloaded * returns the vectors multiplied together. Can also be used to multiply with scalars.',
      },
      {
        kind: 'function',
        name: '__sub',
        available: 'both',
        args: [{ name: 'b', types: ['Vector'] }],
        returns: ['Vector'],
        description: 'Overloaded -. Subtracts vectors.',
      },
      {
        kind: 'function',
        name: '__tostring',
        available: 'both',
        args: [],
        returns: ['string'],
        description: 'Overloaded .. Converts vectors to strings.',
      },
      {
        kind: 'function',
        name: '__unm',
        available: 'both',
        args: [],
        returns: ['Vector'],
        description: 'Overloaded - operator. Reverses the vector.',
      },
      {
        kind: 'function',
        name: 'Cross',
        available: 'both',
        args: [{ name: 'b', types: ['Vector'] }],
        returns: ['Vector'],
        description: 'Cross product of two vectors.',
      },
      {
        kind: 'function',
        name: 'Dot',
        available: 'both',
        args: [{ name: 'b', types: ['Vector'] }],
        returns: ['float'],
        description: 'Dot product of two vectors.',
      },
      {
        kind: 'function',
        name: 'Length',
        available: 'both',
        args: [],
        returns: ['float'],
        description: 'Length of the Vector.',
      },
      {
        kind: 'function',
        name: 'Length2D',
        available: 'both',
        args: [],
        returns: ['float'],
        description: 'Length of the Vector in the XY plane.',
      },
      {
        kind: 'function',
        name: 'Normalized',
        available: 'both',
        args: [],
        returns: ['Vector'],
        description: 'Returns the vector normalized.',
      },
      {
        kind: 'function',
        name: 'Lerp',
        available: 'both',
        args: [
          { name: 'b', types: ['Vector'] },
          { name: 't', types: ['float'], description: 'Interpolant' },
        ],
        returns: ['Vector'],
        // https://docs.unity3d.com/ScriptReference/Vector3.Lerp.html
        description: dedent`
          Linearly interpolates between two vectors.
          This is most commonly used to find a point some fraction of the way along a line between two endpoints.
          Same as \`this + (b - this) * t\`.
        `,
      },
    ],
  });

  context.push({
    kind: 'class',
    name: 'QAngle',
    clientName: 'QAngle',
    description: 'QAngle class.',
    call: {
      kind: 'function',
      returns: ['QAngle'],
      args: [
        { name: 'x', types: ['float', 'nil'], description: 'Pitch +down/-up.' },
        { name: 'y', types: ['float', 'nil'], description: 'Yaw +left/-right.' },
        { name: 'z', types: ['float', 'nil'], description: 'Roll +right/-left.' },
      ],
    },
    members: [
      { kind: 'field', name: 'x', types: ['float'], description: 'Pitch angle' },
      { kind: 'field', name: 'y', types: ['float'], description: 'Yaw angle' },
      { kind: 'field', name: 'z', types: ['float'], description: 'Roll angle' },
      {
        kind: 'function',
        name: '__add',
        available: 'both',
        args: [{ name: 'b', types: ['QAngle'] }],
        returns: ['QAngle'],
        description: 'Overloaded +. Adds angles together.',
      },
      {
        kind: 'function',
        name: '__eq',
        available: 'both',
        args: [{ name: 'b', types: ['QAngle'] }],
        returns: ['bool'],
        description: 'Overloaded ==. Tests for Equality.',
      },
      {
        kind: 'function',
        name: '__tostring',
        available: 'both',
        args: [],
        returns: ['string'],
        description: 'Overloaded .. Converts the QAngles to strings.',
      },
      {
        kind: 'function',
        name: 'Forward',
        available: 'both',
        args: [],
        returns: ['Vector'],
        description: 'Returns the forward vector.',
      },
      {
        kind: 'function',
        name: 'Left',
        available: 'both',
        args: [],
        returns: ['Vector'],
        description: 'Returns the left vector.',
      },
      {
        kind: 'function',
        name: 'Up',
        available: 'both',
        args: [],
        returns: ['Vector'],
        description: 'Returns the up vector.',
      },
    ],
  });

  // https://developer.valvesoftware.com/wiki/Destinations/Scripting/API#Uint64
  context.push({
    kind: 'class',
    name: 'Uint64',
    description: 'Integer with binary operations.',
    members: [
      {
        kind: 'function',
        name: '__eq',
        available: 'server',
        args: [{ name: 'b', types: ['Uint64'] }],
        returns: ['bool'],
      },
      {
        kind: 'function',
        name: '__tostring',
        available: 'server',
        args: [],
        returns: ['string'],
        description: 'Overloaded .. Converts Uint64s to strings.',
      },
      {
        kind: 'function',
        name: 'BitwiseAnd',
        available: 'server',
        args: [{ name: 'operand', types: ['Uint64'] }],
        returns: ['Uint64'],
        description: 'Performs bitwise AND between two integers.',
      },
      {
        kind: 'function',
        name: 'BitwiseOr',
        available: 'server',
        args: [{ name: 'operand', types: ['Uint64'] }],
        returns: ['Uint64'],
        description: 'Performs bitwise OR between two integers.',
      },
      {
        kind: 'function',
        name: 'BitwiseXor',
        available: 'server',
        args: [{ name: 'operand', types: ['Uint64'] }],
        returns: ['Uint64'],
        description: 'Performs bitwise XOR between two integers.',
      },
      {
        kind: 'function',
        name: 'BitwiseNot',
        available: 'server',
        args: [],
        returns: ['Uint64'],
        description: 'Performs bitwise NOT.',
      },
      {
        kind: 'function',
        name: 'SetBit',
        available: 'server',
        args: [{ name: 'bitvalue', types: ['int'] }],
        returns: ['nil'],
        description: 'Sets the specified bit.',
      },
      {
        kind: 'function',
        name: 'ClearBit',
        available: 'server',
        args: [{ name: 'bitvalue', types: ['int'] }],
        returns: ['int'],
        description: 'Clears the specified bit.',
      },
      {
        kind: 'function',
        name: 'IsBitSet',
        available: 'server',
        args: [{ name: 'bitvalue', types: ['int'] }],
        returns: ['int', 'nil'],
        description: 'Checks if bit is set.',
      },
      {
        kind: 'function',
        name: 'ToggleBit',
        available: 'server',
        args: [{ name: 'bitvalue', types: ['int'] }],
        returns: ['int'],
        description: 'Toggles the specified bit.',
      },
      {
        kind: 'function',
        name: 'ToHexString',
        available: 'server',
        args: [],
        returns: ['string'],
        description: 'Returns a hexadecimal string representation of the integer.',
      },
    ],
  });

  return context;
})();
