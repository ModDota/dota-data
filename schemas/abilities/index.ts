import * as s from '../../src/schema-builder';
import { baseAbility, baseItem } from './base';
import {
  baseRecipeItem,
  datadrivenCustomAbility,
  datadrivenCustomItem,
  luaCustomAbility,
  luaCustomItem,
} from './custom';

export const abilities = s
  .root()
  .field('ability_base', baseItem())
  .rest(s.oneOf([baseAbility(), baseRecipeItem()]));
export const abilitiesOverride = s.root().rest(s.oneOf([baseAbility(), baseItem()]));
export const abilitiesCustom = s
  .root()
  .rest(s.oneOf([baseAbility(), luaCustomAbility, datadrivenCustomAbility]));

export const items = s.root().rest(s.oneOf([baseItem(), baseRecipeItem()]));
export const itemsCustom = s
  .root()
  .rest(s.oneOf([baseItem(), baseRecipeItem(), luaCustomItem, datadrivenCustomItem]));
