ADDON_LOADED = ADDON_LOADED ~= nil or false
if not ADDON_LOADED then return end

local jsonorder_function_argument = {__jsonorder = {"name", "type"}}
local jsonorder_function = { __jsonorder = {"args", "description", "kind", "name", "returns"}}
local jsonorder_class = {__jsonorder = {"extend","instance", "kind", "members", "name"}}
local jsonorder_constant = {__jsonorder = { "description", "enum", "kind", "name", "value" }}

local function compareName(a, b) return a.name < b.name end
local function compareKindAndName(a, b)
  if a.kind < b.kind then
    return false
  elseif a.kind > b.kind then
    return true
  else
    return a.name < b.name
  end
end

local function findEnumAndDesc(key)
  for enumName, edesc in pairs(EDesc) do
    for valueName, vdesc in pairs(edesc) do
      if key == valueName then
        return enumName, vdesc ~= "" and vdesc or nil
      end
    end
  end
end

local function buildFunctionSignature(name, desc)
  local args = {}
  for i = 0, #desc - 1 do
    local arg = { name = desc[i][2] ~= "" and desc[i][2] or nil, type = desc[i][1] }
    setmetatable(arg, jsonorder_function_argument)
    table.insert(args, arg)
  end

  return {
    name = name,
    description = desc.desc ~= "" and desc.desc or nil,
    args = args,
    returns = desc.returnType,
  }
end

local function findGlobal(value)
  for k, v in pairs(_G) do
    if v == value then
      return k
    end
  end
end

local function findInstance(value)
  for k, v in pairs(_G) do
    if getmetatable(v) and #k > 1 and not CDesc[k] and getmetatable(v).__index == value then
      return k
    end
  end
end

local function dumpScriptBindings()
  local bindings = {}

  for name, fdesc in pairs(FDesc) do
    local binding = buildFunctionSignature(name, fdesc)
    binding.kind = "function"
    setmetatable(binding, jsonorder_function)
    table.insert(bindings, binding)
  end

  for className, cdesc in pairs(CDesc) do
    local members = {}
    for name, fdesc in pairs(cdesc.FDesc) do
      local signature = buildFunctionSignature(name, fdesc)
      setmetatable(signature, jsonorder_function)

      table.insert(members, signature)
    end
    table.sort(members, compareName)

    local meta = getmetatable(cdesc)
    local binding = {
      kind = "class",
      name = className,
      members = members,
      extend = meta.__index and findGlobal(meta.__index) or nil
    }

    if _G[className] ~= cdesc then
      binding.instance = className
    else
      binding.instance = findInstance(cdesc)
    end

    setmetatable(binding, jsonorder_class)

    table.insert(bindings, binding)
  end

  for key, value in pairs(_G) do
    if not CDesc[key] and not FDesc[key] then
      if type(value) == "number" then
        local enum, desc = findEnumAndDesc(key)

        local binding = {
          kind = "constant",
          name = key,
          value = value,
          enum = enum,
          description = desc,
        }

        setmetatable(binding, jsonorder_constant)

        table.insert(bindings, binding)
      else
          -- Rest are:
          -- - Instances of classes (handled in class definition)
          -- - Standard Lua globals
          -- - Engine globals, that are wrapped in core scripts anyway
          -- - Global functions from core scripts, that aren't useful because they are mostly automatically converted from Squirrel and aren't used in dota
      end
    end
  end

  table.sort(bindings, compareKindAndName)

  return bindings
end

-- These calls define globals
CreateHTTPRequest("GET", "")
CreateUniformRandomStream(0)
if IsServer() then CreateDamageInfo(nil, nil, Vector(), Vector(), 0, 0) end

for line in json.encode(dumpScriptBindings(), { indent = true }):gmatch("[^\n]+") do
  print(line)
end

-- if NAMES then
--   for n in pairs(_G) do
--     if not NAMES[n] then print("NEW GLOBAL: ", n) end
--     NAMES[n] = true
--   end
-- else
--   NAMES = {}
--   for n in pairs(_G) do NAMES[n] = true end
-- end
