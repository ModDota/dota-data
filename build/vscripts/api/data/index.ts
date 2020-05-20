import dedent from 'dedent';
import * as apiTypes from '../types';
import { moddotaDump } from './moddota-dump';
import { array, ExtensionClass, ExtensionFunction, func } from './utils';

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
        name: 'IsInstance',
        available: 'both',
        returns: ['bool'],
        args: [{ name: 'classOrClassName', types: ['string', 'table'] }],
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
      // TODO: Optional?
      2: ['playerId', ['PlayerID', 'nil']],
    },
  },
  '_G.PrecacheUnitByNameSync': {
    args: {
      0: ['unitName'],
      1: ['context', 'CScriptPrecacheContext'],
      // TODO: Optional?
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
      '5': ['command', ['0', '1'], 'SHAKE_START = 0, SHAKE_STOP = 1'],
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
  'CBaseFlex.GetCurrentScene': { returns: ['CSceneEntity', 'nil'] },
  'CBaseFlex.GetSceneByIndex': { returns: ['CSceneEntity', 'nil'] },
  'GridNav.GetAllTreesAroundPoint': { returns: array('CDOTA_MapTree') },
  'CDOTA_Item.GetItemSlot': { returns: ['-1', 'DOTAScriptInventorySlot_t'] },
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
};

export const extraDeclarations = (() => {
  const context: apiTypes.Declaration[] = [];
  const scope = (scopeName: string) => {
    const currentScope: apiTypes.ClassDeclaration = { kind: 'class', name: scopeName, members: [] };
    context.push(currentScope);
    const scopeContext = {
      call(fn: apiTypes.FunctionType) {
        currentScope.call = fn;
        return this;
      },

      desc(description: string) {
        currentScope.description = description;
        return this;
      },

      func(funcName: string, client = false) {
        const fn: apiTypes.FunctionDeclaration = {
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
          arg(name: string, types: apiTypes.Type[], description?: string) {
            fn.args.push({ name, types, description });
            return this;
          },
          ret(types: apiTypes.Type[]) {
            fn.returns = types;
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
    name: 'LocalTime',
    members: [
      { kind: 'field', name: 'Minutes', types: ['int'] },
      { kind: 'field', name: 'Seconds', types: ['int'] },
      { kind: 'field', name: 'Hours', types: ['int'] },
    ],
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
      { kind: 'field', name: 'damage_type', types: ['DAMAGE_TYPES'] },
      { kind: 'field', name: 'damage_flags', types: ['DOTADamageFlag_t', 'nil'] },
      { kind: 'field', name: 'ability', types: ['CDOTABaseAbility', 'nil'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'CreateIllusionsModifierKeys',
    members: [
      { kind: 'field', name: 'outgoing_damage', types: ['float', 'nil'] },
      { kind: 'field', name: 'incoming_damage', types: ['float', 'nil'] },
      { kind: 'field', name: 'bounty_base', types: ['float', 'nil'] },
      { kind: 'field', name: 'bounty_growth', types: ['float', 'nil'] },
      { kind: 'field', name: 'outgoing_damage_structure', types: ['float', 'nil'] },
      { kind: 'field', name: 'outgoing_damage_roshan', types: ['float', 'nil'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'EntityBounds',
    members: [
      { kind: 'field', name: 'Mins', types: ['Vector'] },
      { kind: 'field', name: 'Maxs', types: ['Vector'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'CombatAnalyzerQueryResult',
    members: [{ kind: 'field', name: 'query_id', types: ['CombatAnalyzerQueryID'] }],
  });

  const projectileOptionsBase = (): apiTypes.Field[] => [
    { kind: 'field', name: 'EffectName', types: ['string', 'nil'] },
    { kind: 'field', name: 'Ability', types: ['CDOTABaseAbility', 'nil'] },
    { kind: 'field', name: 'Source', types: ['CDOTA_BaseNPC', 'nil'] },
  ];

  const projectileOptionsVision = (): apiTypes.Field[] => [
    { kind: 'field', name: 'bProvidesVision', types: ['bool', 'nil'] },
    { kind: 'field', name: 'iVisionRadius', types: ['uint', 'nil'] },
    { kind: 'field', name: 'iVisionTeamNumber', types: ['DOTATeam_t', 'nil'] },
  ];

  const projectileOptionsExtraData = (): apiTypes.Field => ({
    kind: 'field',
    name: 'ExtraData',
    types: ['Record<string, string | number | boolean>', 'nil'],
    description:
      'Extra data associated with projectile instance, that is passed to `OnProjectileThink_ExtraData` and `OnProjectileHit_ExtraData`.',
  });

  context.push({
    kind: 'interface',
    name: 'CreateLinearProjectileOptions',
    members: [
      ...projectileOptionsBase(),

      // Movement
      { kind: 'field', name: 'vSpawnOrigin', types: ['Vector', 'nil'] },
      { kind: 'field', name: 'vVelocity', types: ['Vector', 'nil'] },
      {
        kind: 'field',
        name: 'vAcceleration',
        types: ['Vector', 'nil'],
        description: 'Velocity change per second.',
      },
      { kind: 'field', name: 'fMaxSpeed', types: ['float', 'nil'] },

      // Behavior
      { kind: 'field', name: 'fDistance', types: ['float', 'nil'] },
      { kind: 'field', name: 'fStartRadius', types: ['float', 'nil'] },
      { kind: 'field', name: 'fEndRadius', types: ['float', 'nil'] },
      { kind: 'field', name: 'fExpireTime', types: ['float', 'nil'] },
      { kind: 'field', name: 'iUnitTargetTeam', types: ['DOTA_UNIT_TARGET_TEAM', 'nil'] },
      { kind: 'field', name: 'iUnitTargetFlags', types: ['DOTA_UNIT_TARGET_FLAGS', 'nil'] },
      { kind: 'field', name: 'iUnitTargetType', types: ['DOTA_UNIT_TARGET_TYPE', 'nil'] },
      { kind: 'field', name: 'bIgnoreSource', types: ['bool', 'nil'] },
      { kind: 'field', name: 'bHasFrontalCone', types: ['bool', 'nil'] },

      // Appearance
      {
        kind: 'field',
        name: 'bDrawsOnMinimap',
        types: ['bool', 'nil'],
        description: '@default false',
      },
      {
        kind: 'field',
        name: 'bVisibleToEnemies',
        types: ['bool', 'nil'],
        description: 'Makes it invisible for all teams.',
      },

      ...projectileOptionsVision(),
      projectileOptionsExtraData(),
    ],
  });

  context.push({
    kind: 'interface',
    name: 'CreateTrackingProjectileOptions',
    members: [
      ...projectileOptionsBase(),

      // Movement
      { kind: 'field', name: 'vSourceLoc', types: ['Vector', 'nil'] },
      { kind: 'field', name: 'Target', types: ['CDOTA_BaseNPC', 'nil'] },
      { kind: 'field', name: 'iMoveSpeed', types: ['int', 'nil'] },

      // Behavior
      { kind: 'field', name: 'flExpireTime', types: ['float', 'nil'] },
      { kind: 'field', name: 'bDodgeable', types: ['bool', 'nil'] },
      { kind: 'field', name: 'bIsAttack', types: ['bool', 'nil'] },
      {
        kind: 'field',
        name: 'bReplaceExisting',
        types: ['bool', 'nil'],
        description:
          'When enabled replaces existing projectile from the ability. Does not destroy particle.\n@default false',
      },

      // Appearance
      { kind: 'field', name: 'iSourceAttachment', types: ['DOTAProjectileAttachment_t', 'nil'] },
      {
        kind: 'field',
        name: 'bDrawsOnMinimap',
        types: ['bool', 'nil'],
        description: '@default false',
      },
      {
        kind: 'field',
        name: 'bVisibleToEnemies',
        types: ['bool', 'nil'],
        description: '@default true',
      },

      ...projectileOptionsVision(),
      projectileOptionsExtraData(),
    ],
  });

  context.push({
    kind: 'interface',
    name: 'AbilityTuningValueFilterEvent',
    members: [
      { kind: 'field', name: 'entindex_caster_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'entindex_ability_const', types: ['EntityIndex'] },
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
      { kind: 'field', name: 'entindex_attacker_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'entindex_victim_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'entindex_inflictor_const', types: ['EntityIndex', 'nil'] },
      { kind: 'field', name: 'damagetype_const', types: ['DAMAGE_TYPES'] },
      { kind: 'field', name: 'damage', types: ['float'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ExecuteOrderFilterEvent',
    members: [
      // TODO: Add a type for string map
      { kind: 'field', name: 'units', types: ['Record<string, EntityIndex>'] },
      { kind: 'field', name: 'entindex_target', types: ['EntityIndex'] },
      { kind: 'field', name: 'entindex_ability', types: ['EntityIndex'] },
      { kind: 'field', name: 'issuer_player_id_const', types: ['PlayerID'] },
      { kind: 'field', name: 'sequence_number_const', types: ['uint'] },
      { kind: 'field', name: 'queue', types: ['0', '1'] },
      { kind: 'field', name: 'order_type', types: ['dotaunitorder_t'] },
      { kind: 'field', name: 'position_x', types: ['float'] },
      { kind: 'field', name: 'position_y', types: ['float'] },
      { kind: 'field', name: 'position_z', types: ['float'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'HealingFilterEvent',
    members: [
      { kind: 'field', name: 'entindex_target_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'heal', types: ['int'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ItemAddedToInventoryFilterEvent',
    members: [
      { kind: 'field', name: 'inventory_parent_entindex_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'item_parent_entindex_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'item_entindex_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'suggested_slot', types: ['-1', 'DOTAScriptInventorySlot_t'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ModifierGainedFilterEvent',
    members: [
      { kind: 'field', name: 'entindex_caster_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'entindex_parent_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'entindex_ability_const', types: ['EntityIndex'] },
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
      { kind: 'field', name: 'hero_entindex_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'player_id_const', types: ['PlayerID'] },
      { kind: 'field', name: 'reason_const', types: ['EDOTA_ModifyXP_Reason'] },
      { kind: 'field', name: 'experience', types: ['int'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'ModifyGoldFilterEvent',
    members: [
      { kind: 'field', name: 'player_id_const', types: ['PlayerID'] },
      { kind: 'field', name: 'reason_const', types: ['EDOTA_ModifyGold_Reason'] },
      { kind: 'field', name: 'reliable', types: ['0', '1'] },
      { kind: 'field', name: 'gold', types: ['uint'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'RuneSpawnFilterEvent',
    members: [
      { kind: 'field', name: 'spawner_entindex_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'rune_type', types: ['DOTA_RUNES'] },
    ],
  });

  context.push({
    kind: 'interface',
    name: 'TrackingProjectileFilterEvent',
    members: [
      { kind: 'field', name: 'entindex_source_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'entindex_target_const', types: ['EntityIndex'] },
      { kind: 'field', name: 'entindex_ability_const', types: ['EntityIndex'] },
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
    .arg('b', ['Vector', 'float'])
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
