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
]]

function Activate()
  Convars:RegisterCommand("dump_vscripts", function()
    SendToServerConsole(SCRIPT)
  end, "", 0)
  GameRules:GetGameModeEntity():SetContextThink("", function() SendToServerConsole(SCRIPT) end, 1)
end
