import dedent from 'dedent';

export const droppedConstants = [
  'SERVER_DLL',
  'CLIENT_DLL',
  'ACD_DOTA_IDLE',
  'NDEBUG_PERSIST_TILL_NEXT_SERVER',
  'ScriptDebugTextTime',
  'ScriptDebugFirstLine',
  'ScriptDebugTextLines',
  'ScriptDebugTextIndent',
  'ScriptDebugWatchFistLine',
];

export const extractedConstants = [
  'DOTA_ITEM_MAX',
  'FIND_UNITS_EVERYWHERE',
  'EF_NODRAW',
  'DOTA_ITEM_INVENTORY_SIZE',
  'DOTA_ITEM_STASH_SIZE',
  'DOTA_ITEM_STASH_MIN',
  'DOTA_ITEM_STASH_MAX',

  'DOTA_HUD_VISIBILITY_COUNT',

  'DOTA_HEROPICK_STATE_COUNT',

  'QUEST_NUM_TEXT_REPLACE_VALUES',

  'MODIFIER_STATE_LAST',

  'MODIFIER_FUNCTION_LAST',

  'DOTA_RUNE_COUNT',

  'DOTA_DEFAULT_UI_ELEMENT_COUNT',

  'MAX_PATTACH_TYPES',

  'DOTA_PLAYER_LOADOUT_START',
  'DOTA_PLAYER_LOADOUT_END',
  'DOTA_LOADOUT_TYPE_COUNT',

  'DOTA_UNIT_ATTACK_CAPABILITY_BIT_COUNT',

  'SUBQUEST_NUM_TEXT_REPLACE_VALUES',

  'DOTA_PROJECTILE_ATTACHMENT_LAST',

  'DOTA_TEAM_FIRST',
  'DOTA_TEAM_COUNT',
  'DOTA_TEAM_CUSTOM_MIN',
  'DOTA_TEAM_CUSTOM_MAX',
  'DOTA_TEAM_CUSTOM_COUNT',
];

export const prefixedEnums = [
  'DOTA_PROJECTILE_ATTACHMENT_',
  'DOTA_UNIT_ORDER_',
  'OVERHEAD_ALERT_',
  'DOTA_CONNECTION_STATE_',
  'FIND_',
  'ACT_',
  'FCVAR_',
  'AE_',
  'DMG_',
  'ACTIVATE_TYPE_',
  'DOTA_GC_TEAM_',
  'DOTA_SHOWGENERICPOPUP_',
  'DOTA_ITEM_TRANSIENT_',
];

export const globalEnums: Record<string, string[]> = {
  // https://github.com/SteamDatabase/GameTracking-Dota2/blob/139b1c542f1fd4c80ca72509d07ae8d0d52d3228/game/core/scripts/vscripts/framework/entities/entitiesinit.lua#L52-L57
  EntityThinkPhase: ['PRESIM', 'PRESENSING', 'POSTSENSING'],
  SourceEngineSoundData: [
    'EMPTY',
    'SINGLE_SHOT',
    'SINGLE_SHOT_NPC',
    'DOUBLE_SHOT',
    'DOUBLE_SHOT_NPC',
    'BURST',
    'RELOAD',
    'RELOAD_NPC',
    'MELEE_MISS',
    'MELEE_HIT',
    'MELEE_HIT_WORLD',
    'SPECIAL1',
    'SPECIAL2',
    'SPECIAL3',
    'TAUNT',
    'FASTRELOAD',
  ],
};

export const enumRenames: Record<string, string> = {
  DOTATeam_t: 'DotaTeam',
  attackfail: 'AttackRecord',
  DOTAScriptInventorySlot_t: 'InventorySlot',
  Attributes: 'Attribute',
  AttributeDerivedStats: 'AttributeDerivedStat',
  DOTA_RUNES: 'RuneType',
  quest_text_replace_values_t: 'QuestTextReplaceValue',
  subquest_text_replace_values_t: 'SubquestTextReplaceValue',
  DOTASlotType_t: 'LoadoutType',
  LuaModifierType: 'LuaModifierMotionType',
  DOTAMinimapEvent_t: 'MinimapEventType',
  EShareAbility: 'ItemShareability',

  FIND_: 'FindOrder',
  ACT_: 'GameActivity',
  FCVAR_: 'ConVarFlags',
  AE_: 'SourceEngineAnimationEvent',
  DMG_: 'SourceEngineDamageTypes',
  ACTIVATE_TYPE_: 'UnknownEnum1',
  DOTA_GC_TEAM_: 'UnknownEnum2',
  DOTA_SHOWGENERICPOPUP_: 'ShowGenericPopupType',
  DOTA_ITEM_TRANSIENT_: 'ItemTransient',
};

export type KeyTransformer = (args: { name: string; originalName: string }) => string;
export const keyTransformers: Record<string, KeyTransformer> = {
  InventorySlot: ({ name }) => name.replace('_SLOT_', '_'),
  HeroPickState: ({ originalName }) =>
    originalName.replace('DOTA_HEROPICK_STATE_', '').replace('DOTA_HERO_PICK_STATE_', ''),
  SubquestTextReplaceValue: ({ name }) => name.replace('_VALUE', ''),
  LuaModifierMotionType: ({ name }) => name.replace('MOTION_', ''),
  FindOrder: ({ name }) => (name === 'ANY_ORDER' ? 'ANY' : name),
};

export const enumValueDescriptions = {
  // https://wiki.garrysmod.com/page/Enums/FCVAR
  ConVarFlags: {
    UNREGISTERED: dedent`
      If this is set, the convar will become anonymous and won't show up in the 'find' results.
    `,
    PROTECTED: dedent`
      Makes the ConVar value hidden from all clients (for example sv_password).
      Reported as "prot" by cvarlist.
    `,
    SPONLY: dedent`
      Executing the command or changing the ConVar is only allowed in singleplayer.
      Reported as "sp" by cvarlist.
    `,
    ARCHIVE: dedent`
      Save the ConVar value into config.cfg.
      Reported as "a" by cvarlist, except Lua ConVars.
    `,
    NOTIFY: dedent`
      For serverside ConVars, notifies all players with blue chat text when the value gets changed.
      Reported as "nf" by cvarlist.
    `,
    USERINFO: dedent`
      For clientside commands, sends the value to the server.
      Reported as "user" by cvarlist.
    `,
    PRINTABLEONLY: dedent`
      Forces the ConVar to only have printable characters (no control characters).
      Reported as "print" by cvarlist.
    `,
    UNLOGGED: dedent`
      Don't log the ConVar changes to console/log files/users.
      Reported as "log" by cvarlist.
    `,
    NEVER_AS_STRING: dedent`
      Tells the engine to never print this variable as a string since it contains control sequences.
      Reported as "numeric" by cvarlist.
    `,
    REPLICATED: dedent`
      For serverside ConVars, it will send its value to all clients. The ConVar with the same name must also exist on the client!
      Reported as "rep" by cvarlist.
    `,
    CHEAT: dedent`
      Requires sv_cheats to be enabled to change the ConVar or run the command.
      Reported as "cheat" by cvarlist.
    `,
    DEMO: dedent`
      Force the ConVar to be recorded by demo recordings.
      Reported as "demo" by cvarlist.
    `,
    DONTRECORD: dedent`
      Opposite of FCVAR_DEMO, ensures the ConVar is not recorded in demos.
      Reported as "norecord" by cvarlist.
    `,
    NOT_CONNECTED: dedent`
      Makes the ConVar not changeable while connected to a server or in singleplayer.
    `,
  },

  // https://wiki.garrysmod.com/page/Enums/DMG
  SourceEngineDamageTypes: {
    __self: 'https://developer.valvesoftware.com/wiki/Damage_types',

    GENERIC: 'Generic damage.',
    CRUSH: 'Caused by physics interaction. Ignored by airboat drivers.',
    BULLET: 'Bullet damage.',
    SLASH: 'Sharp objects, such as Manhacks or other NPCs attacks.',
    BURN: 'Damage from fire.',
    VEHICLE:
      'Hit by a vehicle. This will need to be set for passengers of some vehicle to receive damage.',
    FALL: 'Fall damage.',
    BLAST: 'Explosion damage. Will be ignored by most vehicle passengers.',
    CLUB: 'Crowbar damage.',
    SHOCK: 'Electrical damage, shows smoke at the damage position.',
    SONIC: 'Sonic damage,used by the Gargantua and Houndeye NPCs.',
    ENERGYBEAM: 'Laser.',
    PREVENT_PHYSICS_FORCE: 'Prevent a physics force.',
    NEVERGIB: 'Never creates gibs. Used by the crossbow.',
    ALWAYSGIB: 'Always create gibs.',
    DROWN: 'Drown damage.',
    PARALYZE: 'Same as DMG_POISON.',
    NERVEGAS: 'Neurotoxin damage.',
    POISON: 'Poison damage.',
    RADIATION: 'Radiation. Will be ignored by most vehicle passengers.',
    DROWNRECOVER: 'Damage applied to the player to restore health after drowning.',
    ACID: 'Toxic chemicals or acid burns.',
    SLOWBURN: 'In an oven.',
    REMOVENORAGDOLL: "Don't create a ragdoll on death.",
    PHYSGUN: 'Damage done by the gravity gun.',
    PLASMA: 'Plasma.',
    AIRBOAT: 'Airboat gun damage.',
    DISSOLVE:
      'Forces the entity to dissolve on death. This is what the combine ball uses when it hits a target.',
    BLAST_SURFACE: "This won't hurt the player underwater.",
    DIRECT: 'Direct damage to the entity that does not go through any damage value modifications.',
    BUCKSHOT: 'The pellets fired from a shotgun.',
  },
  SourceEngineSoundData: {
    __self: 'https://developer.valvesoftware.com/wiki/Weapon_script#SoundData',
  },
  SourceEngineAnimationEvent: {
    __self: 'https://developer.valvesoftware.com/wiki/Animation_Events#Server_events',
  },
};
