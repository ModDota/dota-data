# dota-data

Auto-generated Dota 2 resource dumps.

Data from this package is available on [ModDota API](http://moddota.com/api) page (previously [dota.tools](https://dota.tools/)).

## To update from a new dump

### For contributors:

#### If you want to update from an API dump

1. Check out this repository
2. Create a new DOTA addon through the addon tool, call it `dumper` for example
3. Copy `.lua` scripts from `dumper` directory of this repository to
   `dota 2 beta\game\dota_addons\dumper\scripts\vscripts`
4. Launch `dumper` addon
5. In `vconsole` do `dota_launch_custom_game dumper test_basic`
6. Proceed through the game setup screen
7. Copy-paste the console output (starting with `$> dump_panorama_css_properties`) into `dumper/dump` in this repository
8. Run `yarn install` then `yarn build` in the root of the repository
9. Commit changes
10. Create a pull request

#### If you are updating the API manually

1. Edit the corresponding `.ts` files (i.e. `modifier-properties.ts`)
2. Run `yarn install` then `yarn build` in the root of the repository
3. You should now have corresponding `.json` files re-generated (i.e. `api.json`)
4. Commit changes
5. Create a pull request

### For maintainers:

1. Run `npm version minor`
2. Push with tags
