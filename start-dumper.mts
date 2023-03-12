/*
 * Utility script that automatically starts dota with the dumper addon
 */
import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";

import { findSteamAppById } from "@moddota/find-steam-app";

const ADDON_NAME = "dumper";

const dota2Dir = await findSteamAppById(570);

if (!dota2Dir) {
  throw 'Could not locate a dota 2 installation';
} else {
  console.log(`Found DotA 2 installation: ${dota2Dir}`);
}

console.log("Copying dumper addon...");

const addonPath = path.join(dota2Dir, "game", "dota_addons", ADDON_NAME);
if (!fs.existsSync(addonPath))
{
    fs.mkdirSync(addonPath);
}

const vscriptsPath = path.join(addonPath, "scripts", "vscripts");
fs.copyFileSync(path.join("dumper", "addon_game_mode.lua"), path.join(vscriptsPath, "addon_game_mode.lua"));
fs.copyFileSync(path.join("dumper", "addon_init.lua"), path.join(vscriptsPath, "addon_init.lua"));

console.log("Starting dumper...");

const dotaBinDir = path.join(dota2Dir, "game", "bin", "win64");
const args = ['-novid', '-tools', '-addon', ADDON_NAME, `+dota_launch_custom_game ${ADDON_NAME} dota`];

spawn(path.join(dotaBinDir, "dota2.exe"), args, { detached: true, cwd: dotaBinDir });
spawn(path.join(dotaBinDir, "vconsole2.exe"));
