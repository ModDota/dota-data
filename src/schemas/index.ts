import { abilities, abilitiesCustom, abilitiesOverride, items, itemsCustom } from './abilities';
import { portraits } from './portraits';
import { heroes, heroesCustom, units, unitsCustom } from './units';

export { precacheTypes, resourcePatterns } from './resources';

export const schemas = {
  npc_abilities: abilities,
  npc_abilities_custom: abilitiesCustom,
  npc_abilities_override: abilitiesOverride,
  items,
  npc_items_custom: itemsCustom,

  portraits,

  npc_units: units,
  npc_units_custom: unitsCustom,
  npc_heroes: heroes,
  npc_heroes_custom: heroesCustom,
};
