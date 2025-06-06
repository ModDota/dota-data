import _ from 'lodash';
import * as s from '../../schema-builder';
import { resourcePatterns } from '../resources';
import { baseUnit } from './units';

const baseHero = () =>
  baseUnit()
    .field('Enabled', s.binaryBoolean())
    .field('CMEnabled', s.binaryBoolean())
    .field(
      'HeroID',
      s.int().min(1).max(255), // TODO: check
    )
    .field(
      'HeroOrderID',
      s.int(), // TODO: check
    )
    .field(
      'SimilarHeroes',
      s.str(), // TODO: check
    )

    .fieldsAfter('Model', [
      ['Model1', s.str().pattern(resourcePatterns.models)],
      ['Model2', s.str().pattern(resourcePatterns.models)],
      ['Model3', s.str().pattern(resourcePatterns.models)],

      // TODO: Currently used only for Invoker
      [
        'Persona',
        s.obj().rest(
          s
            .obj('Persona')
            .field('name', s.str().pattern(resourcePatterns.npc))
            .field('token', s.str())
            .field('token_english', s.str())
            .field('Model', s.str().pattern(resourcePatterns.models), {
              description: 'For tools only.',
            })
            .field('ModelScale', s.num())
            .field('mvp_map_override', s.str()),
          'number',
        ),
      ],
    ])

    .fieldsAfter('Ability25', [
      ['AbilityTalentStart', s.int().min(0)],
      ['AbilityDraftDisabled', s.binaryBoolean()],
      ['AbilityDraftIgnoreCount', s.int().max(25)],
      ['AbilityDraftAbilities', s.obj().rest(s.str(), /^Ability\d+$/)],
      ['AbilityDraftUniqueAbilities', s.obj().rest(s.str(), /^Ability\d+$/)],
    ])

    .field(
      'Facets',
      s.obj().rest(
        s
          .obj('Facet')
          .field('Icon', s.str())
          .field('Color', s.str())
          .field('GradientID', s.int().min(0))
          .field('AbilityIconReplacements', s.obj().rest(s.str(), 'string'))
          .field('KeyValueOverrides', s.obj().rest(s.num(), 'string'))
          .field('Deprecated', s.anyBoolean())
          .field('MaxHeroAttributeLevel', s.int())
          .field(
            'Abilities',
            s.obj().rest(
              s
                .obj('FacetAbility')
                .field('AbilityName', s.str())
                .field('AbilityIndex', s.int())
                .field('ReplaceAbility', s.str())
                .field('AutoLevelAbility', s.oneOfLiterals(['true', 'false'])),
            ),
          ),
      ),
    )

    .field('new_player_enable', s.binaryBoolean())
    .field('NameAliases', s.str())
    .field('workshop_guide_name', s.str())
    .field('NewHero', s.binaryBoolean())
    .field('ReleaseTimestamp', s.int().min(0))
    .field('Legs', s.int().min(0))
    .field('Team', s.oneOfLiterals(['Good', 'Bad']))
    .field('Complexity', s.int())
    .field('Role', s.str().pattern(/^(\w+,)*\w+$/))
    // TODO: Merge with arrayLike
    .field('Rolelevels', s.oneOf([s.int(), s.str().pattern(/^(\d+,)*\d+$/)]))
    .field(
      'GibType',
      s.oneOfLiterals([
        'default',
        'ethereal',
        'goo',
        'motor',
        'ice',
        'fire',
        'electric',
        'wood',
        'stone',
      ]),
    )
    .field('GibTintColor', s.arrayLike().integers().min(4).max(4))

    .field('LastHitChallengeRival', s.str().pattern(resourcePatterns.hero))
    .field('HeroGlowColor', s.vector().integers())
    .field('BotImplemented', s.binaryBoolean())
    .field('BotForceSelection', s.binaryBoolean())
    .field('Press', s.binaryBoolean())
    .field('HeroPool1', s.binaryBoolean())
    .field('HeroPool2', s.binaryBoolean())
    .field('HeroUnlockOrder', s.int().min(0))
    .field('CMTournamentIgnore', s.binaryBoolean())
    .field('NoCombine', s.binaryBoolean())
    .field('ARDMDisabled', s.binaryBoolean())

    .field('AttackSpeedActivityModifiers', s.map(s.int().min(0)))
    .field('MovementSpeedActivityModifiers', s.map(s.int().min(0)))
    .field('AttackRangeActivityModifiers', s.map(s.int().min(0)))

    // 7.32e
    .field('RandomEnabled', s.binaryBoolean())
    .field(
      'AbilityPreview',
      s
        .obj('AbilityPreview')
        .field('resource', s.str().pattern(resourcePatterns.resource))
        .field('movie', s.str().pattern(resourcePatterns.heroMovie)),
    )

    .field(
      'ItemSlots',
      s.obj().rest(
        s
          .obj('ItemSlot')
          .field('SlotIndex', s.int().min(0), { require: true })
          .field('SlotName', s.str(), { require: true })
          .field('SlotText', s.str(), { require: true })
          .field('no_import', s.binaryBoolean())
          .field('TextureWidth', s.int().min(0))
          .field('TextureHeight', s.int().min(0))
          .field('MaxPolygonsLOD0', s.int())
          .field('MaxPolygonsLOD1', s.int())
          .field('MaxBonesLOD0', s.int())
          .field('MaxBonesLOD1', s.int())
          .field('DisplayInLoadout', s.binaryBoolean())
          .field(
            'LoadoutPreviewMode',
            s.oneOfLiterals(['hero_model_override', 'hero', 'particle', 'transformation']),
          )
          .field('CanBeUsedAsGeneratingSlot', s.binaryBoolean())
          .field('ShowItemOnGeneratedUnits', s.binaryBoolean())
          .field('GeneratesUnits', s.obj().rest(s.str().pattern(resourcePatterns.npc), 'number')),
        'number',
      ),
    )

    .field(
      'Bot',
      s
        .obj()
        .field('SupportsEasyMode', s.binaryBoolean())
        .field('Loadout', s.obj().rest(s.enums('BotItemType').flags(), 'string'))
        .field('Build', s.obj().rest(s.str(), 'number'))
        .field('HeroType', s.enums('Bot').flags())
        .field('AggressionFactor', s.num().min(0).max(1))
        .field(
          'LaningInfo',
          s
            .obj('LaningInfoFlags')
            .field('SoloDesire', s.int().min(0))
            .field('RequiresBabysit', s.int().min(0))
            .field('ProvidesBabysit', s.int().min(0))
            .field('SurvivalRating', s.int().min(0))
            .field('RequiresFarm', s.int().min(0))
            .field('ProvidesSetup', s.int().min(0))
            .field('RequiresSetup', s.int().min(0)),
        ),
    )
    .field('showcase_attachments', s.obj().rest(s.int(), 'string'))
    .field('HUD', s.anything())
    .field('Adjectives', s.obj().rest(s.int(), 'string'))

    .fieldsAfter('VoiceFile', [
      ['PickSound', s.str()],
      ['BanSound', s.str()],
      ['HeroSelectSoundEffect', s.str()],
      ['VoiceBackgroundSound', s.str()],
    ]);

export const hero = baseHero();
export const heroCustom = baseHero().field('override_hero', s.str(), {
  description: 'A standard name of the hero that would be overriden.',
});
