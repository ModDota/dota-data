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
  'radiant_melee_mars_shieldbash',
  'debut_end',
  'debut_start',
  'stub',
  'dd330_basket_keepalive',
  'dd330_basket_start',
  'snapfire_debut_dd330_start',
  'snapfire_debut_dd330_keepalive',
];

export const extractedConstants = [
  'DOTA_ITEM_INVENTORY_SIZE',
  'DOTA_ITEM_MAX',
  'DOTA_ITEM_STASH_MAX',
  'DOTA_ITEM_STASH_MIN',
  'DOTA_ITEM_STASH_SIZE',
  'DOTA_MAX_ABILITIES',
  'FIND_UNITS_EVERYWHERE',
  'SPAWN_GROUP_HANDLE_INVALID',
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

export const prefixedEnums: Record<string, string | RegExp> = {
  // Exist in Panorama
  DOTA_GC_TEAM: 'DOTA_GC_TEAM_',
  DOTA_OVERHEAD_ALERT: 'OVERHEAD_ALERT_',
  DOTAConnectionState_t: 'DOTA_CONNECTION_STATE_',
  dotaunitorder_t: 'DOTA_UNIT_ORDER_',
  GameActivity_t: 'ACT_',
  DOTAScriptInventorySlot_t: /DOTA_(ITEM_|STASH_SLOT_)/,

  // No known original names, so using normalized ones
  ActivateType: 'ACTIVATE_TYPE_',
  ConVarFlags: 'FCVAR_',
  EntityEffects: 'EF_',
  FindOrder: 'FIND_',
  ShowGenericPopupType: 'DOTA_SHOWGENERICPOPUP_',
  SourceEngineAnimationEvent: 'AE_',
  SourceEngineDamageTypes: 'DMG_',
  PseudoRandom: 'DOTA_PSEUDO_RANDOM_',
};

export const enumValueDescriptions = {
  // https://wiki.garrysmod.com/page/Enums/FCVAR
  ConVarFlags: {
    FCVAR_PROTECTED: dedent`
      Makes the ConVar value hidden from all clients (for example sv_password).
      Reported as "prot" by cvarlist.
    `,
    FCVAR_SPONLY: dedent`
      Executing the command or changing the ConVar is only allowed in singleplayer.
      Reported as "sp" by cvarlist.
    `,
    FCVAR_ARCHIVE: dedent`
      Save the ConVar value into config.cfg.
      Reported as "a" by cvarlist, except Lua ConVars.
    `,
    FCVAR_NOTIFY: dedent`
      For serverside ConVars, notifies all players with blue chat text when the value gets changed.
      Reported as "nf" by cvarlist.
    `,
    FCVAR_USERINFO: dedent`
      For clientside commands, sends the value to the server.
      Reported as "user" by cvarlist.
    `,
    FCVAR_UNLOGGED: dedent`
      Don't log the ConVar changes to console/log files/users.
      Reported as "log" by cvarlist.
    `,
    FCVAR_REPLICATED: dedent`
      For serverside ConVars, it will send its value to all clients. The ConVar with the same name must also exist on the client!
      Reported as "rep" by cvarlist.
    `,
    FCVAR_CHEAT: dedent`
      Requires sv_cheats to be enabled to change the ConVar or run the command.
      Reported as "cheat" by cvarlist.
    `,
    FCVAR_DEMO: dedent`
      Force the ConVar to be recorded by demo recordings.
      Reported as "demo" by cvarlist.
    `,
    FCVAR_DONTRECORD: dedent`
      Opposite of FCVAR_DEMO, ensures the ConVar is not recorded in demos.
      Reported as "norecord" by cvarlist.
    `,
    FCVAR_NOT_CONNECTED: dedent`
      Makes the ConVar not changeable while connected to a server or in singleplayer.
    `,
  },

  // https://wiki.garrysmod.com/page/Enums/DMG
  SourceEngineDamageTypes: {
    __self: 'https://developer.valvesoftware.com/wiki/Damage_types',

    DMG_GENERIC: 'Generic damage.',
    DMG_CRUSH: 'Caused by physics interaction. Ignored by airboat drivers.',
    DMG_BULLET: 'Bullet damage.',
    DMG_SLASH: 'Sharp objects, such as Manhacks or other NPCs attacks.',
    DMG_BURN: 'Damage from fire.',
    DMG_VEHICLE:
      'Hit by a vehicle. This will need to be set for passengers of some vehicle to receive damage.',
    DMG_FALL: 'Fall damage.',
    DMG_BLAST: 'Explosion damage. Will be ignored by most vehicle passengers.',
    DMG_CLUB: 'Crowbar damage.',
    DMG_SHOCK: 'Electrical damage, shows smoke at the damage position.',
    DMG_SONIC: 'Sonic damage,used by the Gargantua and Houndeye NPCs.',
    DMG_ENERGYBEAM: 'Laser.',
    DMG_PREVENT_PHYSICS_FORCE: 'Prevent a physics force.',
    DMG_NEVERGIB: 'Never creates gibs. Used by the crossbow.',
    DMG_ALWAYSGIB: 'Always create gibs.',
    DMG_DROWN: 'Drown damage.',
    DMG_PARALYZE: 'Same as DMG_POISON.',
    DMG_NERVEGAS: 'Neurotoxin damage.',
    DMG_POISON: 'Poison damage.',
    DMG_RADIATION: 'Radiation. Will be ignored by most vehicle passengers.',
    DMG_DROWNRECOVER: 'Damage applied to the player to restore health after drowning.',
    DMG_ACID: 'Toxic chemicals or acid burns.',
    DMG_SLOWBURN: 'In an oven.',
    DMG_REMOVENORAGDOLL: "Don't create a ragdoll on death.",
    DMG_PHYSGUN: 'Damage done by the gravity gun.',
    DMG_PLASMA: 'Plasma.',
  },
  SourceEngineSoundData: {
    __self: 'https://developer.valvesoftware.com/wiki/Weapon_script#SoundData',
  },
  SourceEngineAnimationEvent: {
    __self: 'https://developer.valvesoftware.com/wiki/Animation_Events#Server_events',
  },
};
