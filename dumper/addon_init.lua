ADDON_LOADED = ADDON_LOADED ~= nil or false
if not ADDON_LOADED then return end

local function buildFunctionSignature(name, desc)
  local args = {}
  for i = 0, #desc - 1 do
    table.insert(args, { name = desc[i][2] ~= "" and desc[i][2] or nil, type = desc[i][1] })
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
    table.insert(bindings, binding)
  end

  for className, cdesc in pairs(CDesc) do
    local members = {}
    for name, fdesc in pairs(cdesc.FDesc) do
      table.insert(members, buildFunctionSignature(name, fdesc))
    end
    table.sort(members, function(a, b) return a.name < b.name end)

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

    table.insert(bindings, binding)
  end

  for key, value in pairs(_G) do
    if not CDesc[key] and not FDesc[key] then
      if type(value) == "number" then
        local enum, desc = (function()
          for enumName, edesc in pairs(EDesc) do
            for valueName, vdesc in pairs(edesc) do
              if key == valueName then
                return enumName, vdesc ~= "" and vdesc or nil
              end
            end
          end
        end)()
        table.insert(bindings, {
          kind = "constant",
          name = key,
          value = value,
          enum = enum,
          description = desc,
        })
      else
          -- Rest are:
          -- - Instances of classes (handled in class definition)
          -- - Standard Lua globals
          -- - Engine globals, that are wrapped in core scripts anyway
          -- - Global functions from core scripts, that aren't useful because they are mostly automatically converted from Squirrel and aren't used in dota
      end
    end
  end

  table.sort(bindings, function(a, b)
    if a.kind < b.kind then
      return false
    elseif a.kind > b.kind then
      return true
    else
      return a.name < b.name
    end
  end)

  return bindings
end

-- These calls define globals
CreateHTTPRequest("GET", "")
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
