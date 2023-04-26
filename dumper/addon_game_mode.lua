local panoramaScopes = {
  "GameEvents",
  "CustomNetTables",
  "SteamUGC",
  "SteamFriends",
  "SteamUtils",
  "Buffs",
  "Players",
  "Entities",
  "Abilities",
  "Items",
  "Game",
  "GameUI",
  "Particles",
  "EventData",
  "LocalInventory",
  "$",
  "DOTAHeroModelOverlay",
  "DOTAPlay",
  "Panel",
  "Label",
  "ToggleButton",
  "TabButton",
  "DOTAMapUpdate2023Page",
  "DOTADashboard",
  "PageManager",
  "DOTAHomePage",
  "Movie",
  "DOTAAvatarImage",
  "CustomUIElement",
  "DOTAHudPreGame",
  "SteamUGCQuery",
  "SteamUGCMatchingUGCType",
  "SteamUniverse",
  "DOTA_GameState",
  "DOTA_GC_TEAM",
  "DOTA_GameMode",
  "DOTAConnectionState_t",
  "dotaunitorder_t",
  "DOTA_OVERHEAD_ALERT",
  "DOTA_HeroPickState",
  "DOTATeam_t",
  "DOTA_RUNES",
  "DOTA_UNIT_TARGET_TEAM",
  "DOTA_UNIT_TARGET_TYPE",
  "DOTA_UNIT_TARGET_FLAGS",
  "DOTALimits_t",
  "DOTAInventoryFlags_t",
  "EDOTA_ModifyGold_Reason",
  "DOTAUnitAttackCapability_t",
  "DOTAUnitMoveCapability_t",
  "EShareAbility",
  "DOTAMusicStatus_t",
  "DOTA_ABILITY_BEHAVIOR",
  "DAMAGE_TYPES",
  "ABILITY_TYPES",
  "SPELL_IMMUNITY_TYPES",
  "DOTADamageFlag_t",
  "EDOTA_ModifyXP_Reason",
  "GameActivity_t",
  "DOTAMinimapEvent_t",
  "DOTASlotType_t",
  "modifierfunction",
  "modifierstate",
  "DOTAModifierAttribute_t",
  "Attributes",
  "ParticleAttachment_t",
  "DOTA_MOTION_CONTROLLER_PRIORITY",
  "DOTASpeechType_t",
  "DOTAAbilitySpeakTrigger_t",
  "DotaCustomUIType_t",
  "DotaDefaultUIElement_t",
  "PlayerUltimateStateOrTime_t",
  "PlayerOrderIssuer_t",
  "OrderQueueBehavior_t",
  "CLICK_BEHAVIORS",
  "AbilityLearnResult_t",
  "DOTAKeybindCommand_t",
  "DOTA_SHOP_TYPE",
}

SCRIPT = [[
  clear
  echoln $> dump_panorama_css_properties
  dump_panorama_css_properties
  echoln $> dump_panorama_events
  dump_panorama_events
  echoln $> cl_panorama_script_help *
  cl_panorama_script_help *
  echoln $> script_reload
  script_reload
  echoln $> cl_script_reload
  cl_script_reload
  echoln $> cl_panorama_typescript_declarations
]]

for _, scope in pairs(panoramaScopes) do
  SCRIPT = SCRIPT .. "\ncl_panorama_typescript_declarations " .. scope
end

SCRIPT = SCRIPT .. "\necholn ===ENDOFDUMP"

function Activate()
  Convars:RegisterCommand("dump_vscripts", function()
    SendToServerConsole(SCRIPT)
  end, "", 0)
  GameRules:GetGameModeEntity():SetContextThink("", function() SendToServerConsole(SCRIPT) end, 1)
end
