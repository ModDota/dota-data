# dota-data

Auto-generated Dota 2 resource dumps.

Data from this package is available on [ModDota API](http://moddota.com/api) page (previously [dota.tools](https://dota.tools/)).

## To update from a new dump

### For contributors:

#### If you want to update from an API dump

1. Check out this repository
2. Run `yarn install` in the root of the repository
3. Run `yarn dump`
4. Proceed through the game setup screen
5. Copy-paste the console output (starting with `$> dump_panorama_css_properties`) into `dumper/dump` in this repository
6. Run `yarn build`
7. Commit changes
8. Create a pull request

#### If you are updating the API manually

1. Edit the corresponding `.ts` files (i.e. `modifier-properties.ts`)
2. Run `yarn install` then `yarn build` in the root of the repository
3. You should now have corresponding `.json` files re-generated (i.e. `api.json`)
4. Commit changes
5. Create a pull request

### For maintainers:

11. Run `npm version minor`
12. Push with tags
