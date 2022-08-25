import _ from 'lodash';
import * as s from '../../schema';
import { createPrecacheBlock } from '../common';
import { resourcePatterns } from '../resources';

export const baseUnit = () =>
  s
    .obj('BaseUnit')

    // General
    .field('BaseClass', s.str(), {
      // TODO:
      // require: true,
      description: 'A base class that custom unit will extend.',
    })
    .field('ScriptFile', s.str(), {
      description:
        'Path to the vscripts file, that would be executed for each spawned unit. ' +
        "Unit is available in file's scope under `thisEntity` variable name.",
    })
    .field('include_keys_from', s.str().pattern(resourcePatterns.npc))

    // TODO:
    .field('wearable', s.int())
    .field('OverrideWearableClass', s.str())
    .field('skin', s.int())

    // Appearance
    .field('Model', s.str())
    .field('ModelScale', s.num())
    .field('MaxModelScaleMultiplier', s.num())
    .field('VersusScale', s.num())
    // TODO: `LoadoutScale` is used for Warlock's golem
    .field('LoadoutScale', s.num())
    .field('SpectatorLoadoutScale', s.num().min(0))
    .field('AlternateLoadoutScale', s.num())
    .field('TransformedLoadoutScale', s.num())

    .field('IdleExpression', s.str().pattern(resourcePatterns.scenes))
    // TODO: Hero-only?
    .field('Portrait', s.str().pattern(/^vgui\/.+$/))
    .field('DrawParticlesWhileHidden', s.binaryBoolean())
    .field('AnimationModifier', s.str())
    .field('MinimapIcon', s.str())
    .field('MinimapIconSize', s.int())
    .field('UnitLabel', s.str())
    .field('Level', s.int())

    // Sounds
    .field('GameSoundsFile', s.str().pattern(resourcePatterns.soundevents))
    .field('SoundSet', s.oneOf([s.str(), s.literal(0)]), {
      description: 'Name of sound event group.',
    })
    .field('IdleSoundLoop', s.str())
    .field('VoiceFile', s.str().pattern(resourcePatterns.soundevents))

    // Precache
    .field('particle_folder', s.str().pattern(resourcePatterns.particlesFolder))
    .field('precache', createPrecacheBlock())

    // Bounds
    .field('BoundsHullName', s.enums('HullSize'))
    .field('ProjectileCollisionSize', s.int())
    .field('RingRadius', s.int())
    .field('HealthBarOffset', s.int(), {
      description:
        'The height from the ground at which the health bar should be placed. ' +
        'By default this value is set to "-1" to use the models default height.',
    })

    // Flags
    .field('IsSummoned', s.binaryBoolean())
    .field('IsNeutralUnitType', s.binaryBoolean())
    .field('IsAncient', s.binaryBoolean())
    .field('IsBoss', s.binaryBoolean())
    .field('IsRoshan', s.binaryBoolean())
    .field('IsOther', s.binaryBoolean(), {
      deprecated: "Used only in one unit - Undying's Tombstone",
    })
    .field('CanBeDominated', s.binaryBoolean())
    .field('ConsideredHero', s.binaryBoolean())
    .field('HasInventory', s.binaryBoolean())
    .field('ImmuneToOmnislash', s.binaryBoolean())

    // TODO: These fields appear only in custom files. Should be checked that they really work
    // https://github.com/SteamDatabase/GameTracking-Dota2/search?q=DisableDamageDisplay
    .field('DisableDamageDisplay', s.binaryBoolean())
    .field('VisbibleInPortraitOnly', s.binaryBoolean())
    .field('LimitPathingSearchDepth', s.num())
    .field('IsBossMonster', s.binaryBoolean())

    // AI
    .field('WakesNeutrals', s.binaryBoolean())
    .field('AutoAttacksByDefault', s.binaryBoolean())
    .field('UseNeutralCreepBehavior', s.binaryBoolean())
    .field('RunAIWhenControllableByPlayer', s.binaryBoolean(), { deprecated: 'Unused.' })
    .field('AttackDesire', s.num(), {
      description: 'How much bots want to attack them vs other non-hero things',
    })
    .field('PathfindingSearchDepthScale', s.num())

    // Selection
    .field('SelectionGroup', s.str())
    .field('SelectOnSpawn', s.binaryBoolean())
    .field('IgnoreAddSummonedToSelection', s.binaryBoolean())

    // Abilities
    .field('AbilityLayout', s.int().min(4).max(6))
    .field('Ability1', s.anything())
    .fieldsAfter(
      'Ability1',
      _.range(25, 0).map((i) => [
        `Ability${i}`,
        s.str(),
        { description: `An ability that goes to unit's ${i} slot.` },
      ]),
    )

    // Armor
    .field('ArmorPhysical', s.num())
    .field('MagicalResistance', s.int())

    // Attack
    .field('AttackCapabilities', s.enums('UnitAttackCapability'))
    .field('AttackDamageMin', s.int())
    .field('AttackDamageMax', s.int())
    .field('AttackDamageType', s.literal('DAMAGE_TYPE_ArmorPhysical'), {
      deprecated: 'The only valid value is default',
    })
    .field('BaseAttackSpeed', s.int(), {
      description: 'https://dota2.gamepedia.com/Attack_speed#Initial_Attack_Speed',
    })
    .field('AttackRate', s.num(), { description: 'Base attack time of the unit.' })
    .field('AttackAnimationPoint', s.num(), {
      description: 'Normalized time in animation cycle to attack.',
    })
    .field('AttackAcquisitionRange', s.int())
    .field('AttackRange', s.int())
    .field('AttackRangeBuffer', s.int())
    .field('ProjectileModel', s.oneOf([s.str().pattern(resourcePatterns.particles), s.literal('')]))
    .field('ProjectileSpeed', s.oneOf([s.int(), s.literal('')]))

    // Attributes
    .field('AttributePrimary', s.enums('Attribute'))
    .field('AttributeBaseStrength', s.int())
    .field('AttributeStrengthGain', s.num())
    .field('AttributeBaseIntelligence', s.int())
    .field('AttributeIntelligenceGain', s.num())
    .field('AttributeBaseAgility', s.int())
    .field('AttributeAgilityGain', s.num())

    // Bounty
    .field('BountyXP', s.int(), { description: "Experience granted on unit's death." })
    .field('BountyGoldMin', s.int(), {
      description: "Min gold granted to the killer on unit's death.",
    })
    .field('BountyGoldMax', s.int(), {
      description: "Max gold granted to the killer on unit's death.",
    })

    // Movement
    .field('MovementCapabilities', s.enums('UnitMoveCapability'))
    .field('MovementSpeed', s.int())
    .field('MovementTurnRate', s.num())
    .field('HasAggressiveStance', s.binaryBoolean(), {
      description: 'Plays alternate idle/run animation when near enemies',
    })
    .field('FollowRange', s.int(), { description: 'Distance to keep when following' })

    // Status
    .field('StatusHealth', s.int(), { description: 'Base health.' })
    .field('StatusHealthRegen', s.num(), { description: 'Health regeneration rate.' })
    .field('StatusMana', s.int(), { description: 'Base mana' })
    .field('StatusManaRegen', s.num(), { description: 'Mana regeneration rate.' })
    .field('StatusStartingMana', s.int(), {
      description: 'Amount of mana unit spawns with. -1 means default to full mana.',
    })

    // Team
    .field('TeamName', s.enums('Team'))
    .field('CombatClassAttack', s.enums('CombatClassAttack'))
    .field('CombatClassDefend', s.enums('CombatClassDefend'))
    .field('UnitRelationshipClass', s.enums('NpcUnitRelationshipType'), { deprecated: 'Unused.' })

    // Vision
    .field('VisionDaytimeRange', s.int(), {
      description: 'Range of vision during day light.',
    })
    .field('VisionNighttimeRange', s.int(), {
      description: 'Range of vision at night time.',
    })

    .field(
      'AttackRangeActivityModifiers',
      s
        .obj('AttackRangeActivityModifiersBlock')
        .field('attack_normal_range', s.num())
        .field('attack_long_range', s.num()),
    )

    .field(
      'Creature',
      s
        .obj('CreatureBlock')
        // TODO:
        .field('AttachWearables', s.map(s.obj('CreatureWearable').field('ItemDef', s.int())))
        .field('HPGain', s.int())
        // TODO: int in dota files, float in frostivus_2017
        .field('DamageGain', s.num())
        .field('ArmorGain', s.int())
        .field('ManaGain', s.int())
        .field('MagicResistGain', s.int())
        .field('MoveSpeedGain', s.int())
        .field('BountyGain', s.int())
        .field('XPGain', s.int())
        .field('DisableClumpingBehavior', s.binaryBoolean())
        .field('CanRespawn', s.binaryBoolean())
        .field('DisableResistance', s.num()) // int?
        .field('DefaultState', s.str())
        .field('States', s.anything())
        .field('OffensiveAbilities', s.anything())
        .field('DefensiveAbilities', s.anything())
        .field('EscapeAbilities', s.anything())
        .field(
          'EquippedItems',
          s.map(
            s
              .obj('CreatureEquippedItem')
              .field('Item', s.str(), { require: true })
              .field('Charges', s.int()),
          ),
        ),
      { description: "Valid only when BaseClass is 'npc_dota_creature' or it's subclass." },
    );

export const unitCustom = baseUnit().field('vscripts', s.str().pattern(resourcePatterns.lua), {
  description: "Path to the unit's script file",
});
