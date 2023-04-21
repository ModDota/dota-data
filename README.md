# dota-data

Auto-generated Dota 2 resource dumps.

Data from this package is available on [ModDota API](http://moddota.com/api) page (previously [dota.tools](https://dota.tools/)).

## To update from a new dump

### For contributors:

#### If you want to update from an API dump

1. Check out this repository
2. Install with `npm ci`
3. Run `npm run auto-dump` and wait for the script to finish and dota to close.
4. Run `npm run build` to generate all package files.
5. Commit changes
6. Create a pull request

#### If you are updating the API manually

1. Edit the corresponding `.ts` files (i.e. `modifier-properties.ts`)
2. Run `npm ci` then `npm run build` in the root of the repository
3. You should now have corresponding `.json` files re-generated (i.e. `api.json`)
4. Commit changes
5. Create a pull request

### For maintainers:

1. Run `npm version minor`
2. Push with tags
3. `yarn --frozen-lockfile`
4. `yarn build`
5. `yarn publish --access public`
