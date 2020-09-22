import _ from 'lodash';
import { DumpConstant, serverDump } from '../../dump';
import * as apiTypes from '../types';
import { binaryBoolean } from './utils';

type ArgumentType = 'void' | 'unit' | 'ability' | 'attack';
type ReturnsType = 'void' | 'number' | 'string' | 'binary' | ({} & string);

export const modifiersData: Record<string, [ArgumentType, ReturnsType, string?]> = {
  GetAbsoluteNoDamageMagical: ['attack', 'binary'],
  GetAbsoluteNoDamagePhysical: ['attack', 'binary'],
  GetAbsoluteNoDamagePure: ['attack', 'binary'],
  GetAbsorbSpell: ['ability', 'binary'],
  GetActivityTranslationModifiers: ['void', 'string'],
  GetAlwaysAllowAttack: ['void', 'binary'],
  GetAttackSound: ['void', 'string'],
  GetBonusDayVision: ['void', 'number'],
  GetBonusNightVision: ['void', 'number'],
  GetBonusNightVisionUnique: ['void', 'number'],
  GetBonusVisionPercentage: ['void', 'number'],
  GetDisableAutoAttack: ['void', 'binary'],
  GetDisableHealing: ['void', 'binary'],
  GetFixedDayVision: ['void', 'number'],
  GetFixedNightVision: ['void', 'number'],
  GetForceDrawOnMinimap: ['void', 'binary'],
  GetIsIllusion: ['void', 'binary'],
  GetMinHealth: ['void', 'number'],
  GetModifierAbilityLayout: ['void', 'number'],
  GetModifierAttackPointConstant: ['void', 'number'],
  GetModifierAttackRangeBonus: ['void', 'number'],
  GetModifierAttackRangeBonusUnique: ['void', 'number'],
  GetModifierAttackRangeOverride: ['void', 'number'],
  GetModifierAttackSpeedBaseOverride: ['void', 'number'],
  GetModifierAttackSpeedBonus_Constant: ['void', 'number'],
  GetModifierAvoidDamage: ['attack', 'number'],
  GetModifierAvoidSpell: ['attack', 'binary'],
  GetModifierBaseAttack_BonusDamage: ['void', 'number'],
  GetModifierBaseAttackTimeConstant: ['void', 'number'],
  GetModifierBaseDamageOutgoing_Percentage: ['attack', 'number'],
  GetModifierBaseDamageOutgoing_PercentageUnique: ['attack', 'number'],
  GetModifierBaseRegen: ['void', 'number'],
  GetModifierBonusStats_Agility: ['void', 'number'],
  GetModifierBonusStats_Intellect: ['void', 'number'],
  GetModifierBonusStats_Strength: ['void', 'number'],
  GetModifierBountyCreepMultiplier: ['void', 'number'],
  GetModifierBountyOtherMultiplier: ['void', 'number'],
  GetModifierCanAttackTrees: ['void', 'binary'],
  GetModifierCastRangeBonus: ['ability', 'number'],
  GetModifierCastRangeBonusStacking: ['ability', 'number'],
  GetModifierCastRangeBonusTarget: ['ability', 'number'],
  GetModifierChangeAbilityValue: ['void', 'void'],
  GetModifierConstantDeathGoldCost: ['void', 'number'],
  GetModifierConstantHealthRegen: ['void', 'number'],
  GetModifierConstantManaRegen: ['void', 'number'],
  GetModifierConstantManaRegenUnique: ['void', 'number'],
  GetModifierConstantRespawnTime: ['void', 'number'],
  GetModifierCooldownReduction_Constant: ['ability', 'number'],
  GetModifierDamageOutgoing_Percentage_Illusion: ['attack', 'number'],
  GetModifierDamageOutgoing_Percentage: ['attack', 'number'],
  GetModifierDisableTurning: ['void', 'binary'],
  GetModifierDodgeProjectile: ['void', 'binary'],
  GetModifierEvasion_Constant: ['attack', 'number'],
  GetModifierExtraHealthBonus: ['void', 'number'],
  GetModifierExtraHealthPercentage: ['void', 'number'],
  GetModifierExtraManaBonus: ['void', 'number'],
  GetModifierExtraStrengthBonus: ['void', 'number'],
  GetModifierFixedAttackRate: ['void', 'number'],
  GetModifierHealthBonus: ['void', 'number'],
  GetModifierHealthRegenPercentage: ['void', 'number'],
  GetModifierHealthRegenPercentageUnique: ['void', 'number'],
  GetModifierHPRegenAmplify_Percentage: ['void', 'number'],
  GetModifierIgnoreCastAngle: ['void', 'binary'],
  GetModifierIgnoreCooldown: ['void', 'binary'],
  GetModifierIgnoreMovespeedLimit: ['void', 'binary'],
  GetModifierIgnorePhysicalArmor: ['attack', 'number'],
  GetModifierIllusionLabel: ['void', 'binary'],
  GetModifierIncomingDamage_Percentage: ['attack', 'number'],
  GetModifierIncomingPhysicalDamage_Percentage: ['attack', 'number'],
  GetModifierIncomingPhysicalDamageConstant: ['attack', 'number'],
  GetModifierIncomingSpellDamageConstant: ['attack', 'number'],
  GetModifierInvisibilityLevel: ['void', 'number'],
  GetModifierMagical_ConstantBlock: ['attack', 'number'],
  GetModifierMagicalResistanceBonus: ['attack', 'number'],
  GetModifierMagicalResistanceDecrepifyUnique: ['attack', 'number'],
  GetModifierMagicalResistanceDirectModification: ['attack', 'number'],
  GetModifierMagicDamageOutgoing_Percentage: ['attack', 'number'],
  GetModifierManaBonus: ['void', 'number'],
  GetModifierMaxAttackRange: ['void', 'number'],
  GetModifierMiss_Percentage: ['void', 'number'],
  GetModifierModelChange: ['void', 'string'],
  GetModifierModelScale: ['void', 'number'],
  GetModifierMoveSpeed_Absolute: ['void', 'number'],
  GetModifierMoveSpeed_AbsoluteMin: ['void', 'number'],
  GetModifierMoveSpeed_Limit: ['void', 'number'],
  GetModifierMoveSpeed_Max: ['void', 'number'],
  GetModifierMoveSpeedBonus_Constant_Unique_2: ['void', 'number'],
  GetModifierMoveSpeedBonus_Constant: ['void', 'number'],
  GetModifierMoveSpeedBonus_Percentage_Unique_2: ['void', 'number'],
  GetModifierMoveSpeedBonus_Percentage_Unique: ['void', 'number'],
  GetModifierMoveSpeedBonus_Percentage: ['void', 'number'],
  GetModifierMoveSpeedBonus_Special_Boots_2: ['void', 'number'],
  GetModifierMoveSpeedBonus_Special_Boots: ['void', 'number'],
  GetModifierMoveSpeedOverride: ['void', 'number'],
  GetModifierMPRegenAmplify_Percentage: ['void', 'number'],
  GetModifierMPRestoreAmplify_Percentage: [
    'void',
    'number',
    'Total amplify value is clamped to 0.',
  ],
  GetModifierNegativeEvasion_Constant: ['void', 'number'],
  GetModifierOverrideAttackDamage: ['void', 'number'],
  GetModifierPercentageCasttime: ['ability', 'number'],
  GetModifierPercentageCooldown: ['ability', 'number'],
  GetModifierPercentageCooldownStacking: ['ability', 'number'],
  GetModifierPercentageExpRateBoost: ['void', 'number'],
  GetModifierPercentageManacost: ['ability', 'number'],
  GetModifierPercentageManacostStacking: ['void', 'number'],
  GetModifierPercentageRespawnTime: ['void', 'number'],
  GetModifierPersistentInvisibility: ['void', 'number'],
  GetModifierPhysical_ConstantBlock: ['attack', 'number'],
  GetModifierPhysical_ConstantBlockSpecial: ['void', 'number'],
  GetModifierPhysical_ConstantBlockUnavoidablePreArmor: ['attack', 'number'],
  GetModifierPhysicalArmorBase_Percentage: ['void', 'number', 'Values above 100% are ignored.'],
  GetModifierPhysicalArmorBonus: ['attack', 'number'],
  GetModifierPhysicalArmorBonusUnique: ['attack', 'number'],
  GetModifierPhysicalArmorBonusUniqueActive: ['attack', 'number'],
  GetModifierPreAttack_BonusDamage_Proc: ['void', 'number'],
  GetModifierPreAttack_BonusDamage: ['void', 'number'],
  GetModifierPreAttack_BonusDamagePostCrit: ['attack', 'number'],
  GetModifierPreAttack_CriticalStrike: ['attack', 'number'],
  GetModifierPreAttack_Target_CriticalStrike: ['void', 'number'],
  GetModifierPreAttack: ['attack', 'number'],
  GetModifierProcAttack_BonusDamage_Magical: ['attack', 'number'],
  GetModifierProcAttack_BonusDamage_Physical: ['attack', 'number'],
  GetModifierProcAttack_BonusDamage_Pure: ['attack', 'number'],
  GetModifierProcAttack_Feedback: ['attack', 'number'],
  GetModifierProjectileName: ['void', 'string'],
  GetModifierProjectileSpeedBonus: ['void', 'number'],
  GetModifierProvidesFOWVision: ['void', 'binary'],
  GetModifierScepter: ['void', 'void', 'Always applies scepter when this property is active'],
  GetModifierSpellAmplify_Percentage: ['attack', 'number'],
  GetModifierSpellAmplify_PercentageUnique: ['void', 'number'],
  GetModifierSpellsRequireHP: ['void', 'number'],
  GetModifierStackingRespawnTime: ['void', 'number'],
  GetModifierStatusResistance: ['void', 'number'],
  GetModifierStatusResistanceCaster: ['unit', 'number'],
  GetModifierStatusResistanceStacking: ['void', 'number'],
  GetModifierSuperIllusion: ['void', 'binary'],
  GetModifierSuperIllusionWithUltimate: ['void', 'binary'],
  GetModifierTempestDouble: ['void', 'binary'],
  GetModifierTotal_ConstantBlock: ['attack', 'number'],
  GetModifierTotalDamageOutgoing_Percentage: ['attack', 'number'],
  GetModifierTotalPercentageManaRegen: ['void', 'number'],
  GetModifierTurnRate_Override: ['void', 'number'],
  GetModifierTurnRate_Percentage: ['void', 'number'],
  GetModifierUnitDisllowUpgrading: ['void', 'binary'],
  GetModifierUnitStatsNeedsRefresh: ['void', 'binary'],
  GetOverrideAnimation: ['void', 'GameActivity_t'],
  GetOverrideAnimationRate: ['void', 'number'],
  GetOverrideAnimationWeight: ['void', 'number'],
  GetOverrideAttackMagical: ['void', 'binary'],
  GetReflectSpell: ['ability', 'binary'],
  GetUnitLifetimeFraction: ['void', 'number'],
  GetVisualZDelta: ['void', 'number'],
  OnAbilityEndChannel: ['ability', 'void'],
  OnAbilityExecuted: ['ability', 'void'],
  OnAbilityFullyCast: ['ability', 'void'],
  OnAbilityStart: ['ability', 'void'],
  OnAttack: ['attack', 'void'],
  OnAttackAllied: ['attack', 'void', "Happens even if attack can't be issued."],
  OnAttackCancelled: ['attack', 'void'],
  OnAttacked: ['attack', 'void'],
  OnAttackFail: ['attack', 'void'],
  OnAttackFinished: ['attack', 'void'],
  OnAttackLanded: ['attack', 'void'],
  OnAttackRecord: ['attack', 'void'],
  OnAttackRecordDestroy: ['attack', 'void'],
  OnAttackStart: ['attack', 'void'],
  OnBreakInvisibility: ['void', 'void'],
  OnBuildingKilled: ['attack', 'void'],
  OnDamageCalculated: ['attack', 'void'],
  OnDeath: ['attack', 'void'],
  OnDominated: ['unit', 'void'],
  OnHealReceived: ['unit', 'void'],
  OnHealthGained: ['unit', 'void'],
  OnHeroKilled: ['attack', 'void'],
  OnManaGained: ['unit', 'void'],
  OnModelChanged: ['unit', 'void'],
  OnModifierAdded: ['void', 'void'],
  OnOrder: ['unit', 'void'],
  OnProjectileDodge: ['attack', 'void'],
  OnRespawn: ['unit', 'void'],
  OnSetLocation: ['unit', 'void'],
  OnSpellTargetReady: ['void', 'void'],
  OnSpentMana: ['ability', 'void'],
  OnStateChanged: ['unit', 'void'],
  OnTakeDamage: ['attack', 'void'],
  OnTakeDamageKillCredit: ['attack', 'void'],
  OnTeleported: ['unit', 'void'],
  OnTeleporting: ['unit', 'void'],
  OnTooltip: ['void', 'number'],
  OnTooltip2: ['void', 'number'],
  OnUnitMoved: ['unit', 'void'],
  PreserveParticlesOnModelChanged: ['void', 'binary'],
  ReincarnateTime: ['void', 'number'],
};

export function getEnumDescription(functionName?: string) {
  if (!functionName || functionName === 'Unused') return undefined;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const description = modifiersData[functionName]?.[2];
  return description
    ? `${description}\n\nMethod Name: \`${functionName}\`.`
    : `Method Name: \`${functionName}\``;
}

export const modifierFunctionMethods: apiTypes.ClassMethod[] = serverDump
  .filter((x): x is DumpConstant => x.kind === 'constant')
  .filter((x): x is typeof x & { enum: string } => x.enum === 'modifierfunction')
  .filter((x): x is typeof x & { description: string } => x.description != null)
  .filter((x) => x.description !== 'Unused')
  .map(
    (x): apiTypes.ClassMethod => {
      const functionName = x.description;

      if (!(functionName in modifiersData)) {
        console.warn(`Untyped modifier field: ${functionName}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const [argument, returns, description] = modifiersData[functionName] ?? ['void', 'void'];

      const args: apiTypes.FunctionParameter[] = [];
      if (argument !== 'void') {
        args.push({ name: 'event', types: [`Modifier${_.capitalize(argument)}Event`] });
      }

      return {
        kind: 'function',
        name: functionName,
        available: 'both',
        abstract: true,
        description,
        args,
        returns:
          returns === 'binary'
            ? binaryBoolean
            : returns === 'number'
            ? ['float']
            : returns === 'void'
            ? ['nil']
            : [returns],
      };
    },
  );
