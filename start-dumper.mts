/*
 * Utility script that automatically starts dota with the dumper addon.
 * npm run start:dumper
 */
import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as net from "net";

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
const args = ['-novid', '-tools', '-consolelog', '-w 1200', '-h 1080', '-addon', ADDON_NAME, `+dota_launch_custom_game ${ADDON_NAME} dota`];

const p1 = spawn(path.join(dotaBinDir, "dota2.exe"), args, { cwd: dotaBinDir });
//const p2 = spawn(path.join(dotaBinDir, "vconsole2.exe"));

p1.stdout.on("data", data => console.log("dota2.exe", data.toString()));
//p2.stdout.on("data", data => console.log("vconsole2.exe", data.toString()));

//const socket = new Socket
const socket = new net.Socket();

socket.on("connect", () => {
  console.log("connected!");
  setTimeout(() => {
    console.log("quitting");
    execute(socket, "quit");
  }, 20000);
});
socket.on("error", (err) => console.log("error", err));
socket.on("data", data => console.log(data.toString()));

setTimeout(() => {
  socket.connect({ port: 29000 });
}, 2000);

function execute(socket: net.Socket, command: string)
{
  const type = "CMND".split("").map(c => c.charCodeAt(0));
  const version = [0x00, 0xd4, 0x00, 0x00];
  const length = command.length + 12 + 1;
  const byteBuffer = new Uint8Array([...type, ...version, ...encodeUint16(length), ...encodeUint16(0)]);

  var headerBuffer = Buffer.from(byteBuffer, 0, 12);
  var commandBuffer = Buffer.from(command + "\0", "ascii");

  const bufferToSend = Buffer.concat([headerBuffer, commandBuffer], length);

  console.log(bufferToSend.join(", "));

  socket.write(bufferToSend, err => {
    console.log(err);
  });
}

function encodeUint16(v: number): number[]
{
  return [(v >> 8)  % 256, v % 256];
}
