const { getGamePath } = require('steam-game-path');
const path = require('path');
const fs = require('fs-extra');
const readline = require('readline');
const { spawn } = require('child_process');

const addonName = 'dumper';

const dotaPathString = getGamePath(570).game.path;

const addonPath = path.join(dotaPathString, 'game', 'dota_addons', addonName);
if (fs.existsSync(addonPath)) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(`Addon '${addonName}' already exists. the lua files will be overwriten.\nDo you want to continue? (y/n)`, (answer) => {
        rl.close();
        if (answer.trim().toLowerCase() !== 'y') {
            process.exit(1);
        }
    });
}

const win64 = path.join(dotaPathString, 'game', 'bin', 'win64');
const args = ['-novid', '-tools', '-addon', addonName, `+dota_launch_custom_game ${addonName} dota`];

// copy addon_game_mode.lua and addon_init.lua to addonPath
const vscriptPath = path.join(dotaPathString, 'game', 'dota_addons', addonName, 'scripts', 'vscripts');
fs.ensureDirSync(vscriptPath);
fs.copyFileSync(path.join(__dirname, 'addon_game_mode.lua'), path.join(vscriptPath, 'addon_game_mode.lua'));
fs.copyFileSync(path.join(__dirname, 'addon_init.lua'), path.join(vscriptPath, 'addon_init.lua'));


spawn(path.join(win64, 'dota2.exe'), args, { detached: true, cwd: win64 });
spawn(path.join(win64, 'vconsole2.exe'));