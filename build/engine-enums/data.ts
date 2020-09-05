import { EngineEnumMember } from './types';

export interface ExtractionRule {
  name?: string;
  prefix?: string;
  filter?(x: string): boolean;
  map?(x: string): string;
  transform?(x: EngineEnumMember[]): EngineEnumMember[];
}

export const extracted: ExtractionRule[] = [
  { prefix: 'DOTA_PSEUDO_RANDOM_' },
  { prefix: 'DOTA_ORB_PRIORITY_' },
  { prefix: 'DOTA_ORB_LABEL_' },
  { prefix: 'DOTA_ATTRIBUTE_' },
  { prefix: 'DOTA_TEAM_' },
  { prefix: 'DOTA_COMBAT_CLASS_ATTACK_' },
  { prefix: 'DOTA_COMBAT_CLASS_DEFEND_' },
  { prefix: 'DOTA_NPC_UNIT_RELATIONSHIP_TYPE_' },
  { prefix: 'DOTA_HULL_SIZE_' },
  { prefix: 'DOTA_ITEM_QUALITY_' },
  {
    name: 'UnitAttackCapability',
    prefix: 'DOTA_UNIT_CAP_',
    filter: (x) => !x.startsWith('DOTA_UNIT_CAP_MOVE_'),
  },
  { name: 'Activity', prefix: 'ACT_' },
  { name: 'FieldType', prefix: 'FIELD_' },
  { name: 'SpecialBonusOperation', prefix: 'SPECIAL_BONUS_' },
  { name: 'UnitMoveCapability', prefix: 'DOTA_UNIT_CAP_MOVE_' },
  {
    name: 'Bot',
    prefix: 'DOTA_BOT_',
    filter: (x) => !x.startsWith('DOTA_BOT_MODE'),
    transform: (x) => [...x, { name: 'DOTA_BOT_SUPPORT', shortName: 'SUPPORT' }],
  },
  { name: 'SpellImmunityType', prefix: 'SPELL_IMMUNITY_' },
  { prefix: 'DAMAGE_TYPE_' },
  { prefix: 'DOTA_ABILITY_BEHAVIOR_' },
  {
    name: 'UnitTargetType',
    prefix: 'DOTA_UNIT_TARGET_',
    filter: (x) =>
      !x.startsWith('DOTA_UNIT_TARGET_TEAM_') && !x.startsWith('DOTA_UNIT_TARGET_FLAG_'),
  },
  { prefix: 'DOTA_UNIT_TARGET_TEAM_' },
  { prefix: 'DOTA_ABILITY_TYPE_' },
  {
    name: 'BotItemType',
    prefix: 'ITEM_',
    filter: (x) =>
      !x.startsWith('ITEM_FLAG_') &&
      !x.startsWith('ITEM_FULLY_') &&
      !x.startsWith('ITEM_SLOT_TYPE_') &&
      !x.endsWith('_SHAREABLE'),
  },
  {
    name: 'ItemShareability',
    prefix: 'ITEM_',
    filter: (x) => x.includes('_SHAREABLE'),
    transform(enums) {
      for (const member of enums) {
        member.shortName = member.shortName.replace('_SHAREABLE', '');
      }

      return enums;
    },
  },
  { name: 'SpellDispellableType', prefix: 'SPELL_DISPELLABLE_' },
  { name: 'UnitTargetFlags', prefix: 'DOTA_UNIT_TARGET_FLAG_' },
];
