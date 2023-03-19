import * as s from '../../src/schema-builder';
import { hero, heroCustom } from './heroes';
import { baseUnit, unitCustom } from './units';

export const units = s.root().rest(baseUnit());
export const unitsCustom = s.root().rest(unitCustom);
export const heroes = s.root().rest(hero);
export const heroesCustom = s.root().rest(heroCustom);
