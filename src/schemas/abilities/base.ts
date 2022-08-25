import * as s from '../../schema';
import { createPrecacheBlock } from '../common';
import { resourcePatterns } from '../resources';

export const baseAbility = (schemaName = 'BaseAbility') =>
  s
    .obj(schemaName)
    .field('ID', s.int())
    .field('BaseClass', s.str())
    .field('AbilityTextureName', s.str())
    .field('AbilitySound', s.str())
    .field('AbilityCastAnimation', s.enums('Activity'))
    .field('AbilityCastGestureSlot', s.oneOfLiterals(['DEFAULT', 'ABSOLUTE']))

    .field('AbilityType', s.enums('AbilityType'))
    .field('AbilityBehavior', s.enums('AbilityBehavior').flags())
    .field('AbilityUnitDamageType', s.enums('DamageType'))
    .field('SpellImmunityType', s.enums('SpellImmunityType'))
    .field('AbilityUnitTargetTeam', s.enums('UnitTargetTeam').flags())
    .field('AbilityUnitTargetType', s.enums('UnitTargetType').flags())
    .field('AbilityUnitTargetFlags', s.enums('UnitTargetFlags').flags())

    .field('HasScepterUpgrade', s.binaryBoolean())
    .field('HasShardUpgrade', s.binaryBoolean())
    .field('IsShardUpgrade', s.binaryBoolean())
    .field('IsGrantedByShard', s.binaryBoolean())
    .field('AbilityDraftScepterAbility', s.str().pattern(resourcePatterns.ability))
    .field('AbilityDraftShardAbility', s.str().pattern(resourcePatterns.ability))
    .field('AbilityDraftUltScepterAbility', s.str().pattern(resourcePatterns.ability))
    .field('AbilityDraftUltScepterPreAbility', s.str().pattern(resourcePatterns.ability))
    .field('AbilityDraftUltShardAbility', s.str().pattern(resourcePatterns.ability))
    .field('OnCastbar', s.binaryBoolean())
    .field('OnLearnbar', s.binaryBoolean())
    .field('FightRecapLevel', s.int())

    .field('MaxLevel', s.int())
    .field('AbilityDamage', s.arrayLike().integers())
    .field('AbilityCooldown', s.arrayLike())
    .field('AbilityCharges', s.arrayLike().integers())
    .field('AbilityChargeRestoreTime', s.arrayLike())
    .field('AbilityCastRange', s.arrayLike().integers())
    .field('AbilityCastRangeBuffer', s.arrayLike().integers())
    .field('AbilityCastPoint', s.arrayLike())
    .field('AbilityManaCost', s.arrayLike().integers())

    // TODO: Sort
    .field('AbilityCastPoint', s.arrayLike())
    .field('AbilityModifierSupportValue', s.num().min(0))
    .field('SpellDispellableType', s.enums('SpellDispellableType'))
    .field('AssociatedConsumable', s.int())
    .field('AbilitySharedCooldown', s.str())
    .field('AbilityChannelTime', s.arrayLike())
    .field('AbilityDuration', s.arrayLike())
    .field('LinkedAbility', s.str().pattern(resourcePatterns.ability))
    .field('IsGrantedByScepter', s.binaryBoolean())
    .field('RequiredLevel', s.int().min(0))
    .field('AbilityModifierSupportBonus', s.int().min(0))
    .field('AbilityDraftPreAbility', s.str().pattern(resourcePatterns.ability))
    .field('LevelsBetweenUpgrades', s.int().min(0))
    .field('HotKeyOverride', s.str())
    .field('DisplayAdditionalHeroes', s.binaryBoolean())
    .field('AbilityChannelAnimation', s.enums('Activity'))
    .field('AnimationIgnoresModelScale', s.binaryBoolean())

    // TODO: Test
    .field('IsOnCastBar', s.binaryBoolean())
    .field('IsCastableWhileHidden', s.binaryBoolean())
    .field('AnimationPlaybackRate', s.num())
    .field('AbilityName', s.str().pattern(resourcePatterns.ability))

    .field('ad_linked_abilities', s.str())
    .field('SpecialBonusIntrinsicModifier', s.str())
    .field('LinkedShardAbility', s.str().pattern(resourcePatterns.ability))

    .field(
      'AbilitySpecial',
      s.map(
        s
          .obj('AbilitySpecial')
          .field('var_type', s.enums('SpecialValueFieldType'), { require: true })
          .field('ad_linked_ability', s.str().pattern(resourcePatterns.ability))
          .field('ad_linked_abilities', s.str())
          // TODO: arrayLike string
          .field('linked_ad_abilities', s.str())
          .field('levelkey', s.oneOfLiterals(['quaslevel', 'wexlevel', 'exortlevel']))
          .field('CalculateSpellDamageTooltip', s.binaryBoolean())
          .field('LinkedSpecialBonus', s.str())
          .field('LinkedSpecialBonusField', s.str())
          .field('LinkedSpecialBonusOperation', s.enums('SpecialBonusOperation'))
          .field('DamageTypeTooltip', s.enums('DamageType'))
          .rest(s.arrayLike()),
      ),
    )
    .field(
      'AbilityValues',
      s.map(
        s.oneOf([
          s.arrayLike(),
          s
            .obj('AbilityValue')
            .field('value', s.arrayLike())
            .rest(s.oneOf([s.str(), s.arrayLike()])),
        ]),
      ),
    )

    .field('precache', createPrecacheBlock());

export const baseItem = (name = 'BaseItem') =>
  baseAbility(name)
    .fieldsAfter('AbilityTextureName', [
      ['Model', s.str().pattern(resourcePatterns.models)],
      ['ModelAlternate', s.str().pattern(resourcePatterns.models)],
      ['skin', s.int().min(0)],
      ['Effect', s.str().pattern(resourcePatterns.particles)],
    ])

    .field('ItemCost', s.int())
    .field('ItemShopTags', s.str())
    .field('ItemQuality', s.str())
    .field('ItemAliases', s.str())
    .field('SideShop', s.binaryBoolean())
    .field('SecretShop', s.binaryBoolean())
    .field('GlobalShop', s.binaryBoolean())
    .field('ItemGloballyCombinable', s.binaryBoolean())
    .field('ItemIsNeutralDrop', s.binaryBoolean())
    .field('ItemPurchasable', s.binaryBoolean())

    .field('ItemSellable', s.binaryBoolean())
    .field('ItemInitiallySellable', s.binaryBoolean())
    .field('ItemDisassembleRule', s.str())
    .field('ItemDeclarations', s.str())
    .field('ItemSupport', s.binaryBoolean())
    .field('ItemKillable', s.binaryBoolean())
    .field('ItemDroppable', s.binaryBoolean())
    .field('ItemShareability', s.enums('ItemShareability'))

    // Stocks
    .field('ItemStockMax', s.int().min(0))
    .field('ItemStockInitial', s.int().min(0))
    .field('ItemStockTime', s.num().min(0))
    .field('ItemInitialStockTime', s.num().min(0))
    // TODO: Test and add description
    .field('BonusDelayedStockCount', s.int())

    .field('ItemStackable', s.binaryBoolean())
    .field('ItemStackableMax', s.int().min(0))
    .field('ItemPermanent', s.binaryBoolean())
    .field('ItemInitialCharges', s.int())
    .field('ItemHideCharges', s.binaryBoolean())
    .field('ItemRequiresCharges', s.binaryBoolean())

    .field('IsTempestDoubleClonable', s.binaryBoolean())

    .field('ShouldBeSuggested', s.binaryBoolean())
    .field('ShouldBeInitiallySuggested', s.binaryBoolean())
    .field('AbilityOvershootCastRange', s.int().min(0))
    .field('ItemLevelByGameTime', s.int().min(0))

    // Sounds
    .field('UIPickupSound', s.str())
    .field('UIDropSound', s.str())
    .field('WorldDropSound', s.str())

    // Upgrades
    .field('MaxUpgradeLevel', s.int().min(0))
    .field('ItemBaseLevel', s.int().min(1))
    // TODO:
    .field('UpgradesItems', s.str().pattern(/^(\w+;)*\w+$/))
    .field('UpgradeRecipe', s.str().pattern(resourcePatterns.item))

    // TODO: Used only in base
    .field('ItemRecipe', s.literal(0))
    .field('ItemCombinable', s.binaryBoolean())
    .field('ItemDisassemblable', s.binaryBoolean())
    .field('ItemDeclaresPurchase', s.binaryBoolean())

    // TODO: sort
    .field('ItemAlertable', s.binaryBoolean())
    .field('ItemDisplayCharges', s.binaryBoolean())
    .field('IsObsolete', s.binaryBoolean())
    .field('PlayerSpecificCooldown', s.binaryBoolean())
    .field('ItemContributesToNetWorthWhenDropped', s.binaryBoolean())
    .field('AllowedInBackpack', s.binaryBoolean())
    .field('ActiveDescriptionLine', s.int().min(1))
    .field('ItemCastOnPickup', s.binaryBoolean())
    .field('PingOverrideText', s.str())
    .field('InvalidHeroes', s.str().pattern(resourcePatterns.hero))
    .field('DisplayOverheadAlertOnReceived', s.literal(0))
    .field('ItemInitialStockTimeTurbo', s.num().min(0))

    // TODO: Used only in `seasonal_ti9_banner`
    .field('UnlockMinEffectIndex', s.int().min(0))
    .field('UnlockMaxEffectIndex', s.int().min(0))
    .field('EventID', s.int().min(0));
