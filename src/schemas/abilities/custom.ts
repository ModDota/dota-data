import * as s from '../../schema-builder';
import { resourcePatterns } from '../resources';
import { baseAbility, baseItem } from './base';

const makeLuaCustomAbility = (item: boolean) =>
  (item ? baseItem('LuaItem') : baseAbility('LuaAbility'))
    .field(
      'BaseClass',
      item
        ? s.literal('item_lua')
        : s.oneOf([s.literal('ability_lua'), s.literal('ability_datadriven'), s.str()]),
    )
    .fieldAfter('BaseClass', 'ScriptFile', s.str().pattern(resourcePatterns.lua));

const makeDatadrivenCustomAbility = (item: boolean) =>
  (item ? baseItem('DatadrivenItem') : baseAbility('DatadrivenAbility'))
    .field('BaseClass', s.literal(item ? 'item_datadriven' : 'ability_datadriven'), {
      require: true,
    })
    // TODO: AoERadius?
    .field('AOERadius', s.oneOf([s.int().min(0), s.str().pattern(resourcePatterns.special)]))
    .field('Modifiers', s.anything())
    .field('OnSpellStart', s.anything())
    .field('OnProjectileHitUnit', s.anything())
    .field('OnProjectileFinish', s.anything())
    .field('OnChannelFinish', s.anything())
    .field('OnOwnerDied', s.anything());

export const luaCustomAbility = makeLuaCustomAbility(false);
export const datadrivenCustomAbility = makeDatadrivenCustomAbility(false);

export const luaCustomItem = makeLuaCustomAbility(true);
export const datadrivenCustomItem = makeDatadrivenCustomAbility(true);
export const baseRecipeItem = () =>
  baseItem('RecipeItem')
    .field('BaseClass', s.literal('item_datadriven'))
    .field('ItemRecipe', s.literal(1))
    .field('ItemResult', s.str())
    .field('ItemRequirements', s.map(s.str().pattern(/^(\w+\*?;)*\w+\*?$/)));
