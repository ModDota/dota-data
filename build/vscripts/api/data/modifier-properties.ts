import _ from 'lodash';
import { DumpConstant, serverDump } from '../../dump';
import * as apiTypes from '../types';
import { binaryBoolean } from './utils';

type ArgumentType =
  | null
  | 'ModifierUnitEvent'
  | 'ModifierAbilityEvent'
  | 'ModifierAttackEvent'
  | 'ModifierInstanceEvent'
  | 'ModifierOverrideAbilitySpecialEvent';

// TODO: Use more specific number types
const anyNumber = ['float'];

const modifiersData: Record<string, [ArgumentType, apiTypes.Type[], string?]> = {
  GetAbsoluteNoDamageMagical: ['ModifierAttackEvent', binaryBoolean],
  GetAbsoluteNoDamagePhysical: ['ModifierAttackEvent', binaryBoolean],
  GetAbsoluteNoDamagePure: ['ModifierAttackEvent', binaryBoolean],
  GetAbsorbSpell: ['ModifierAbilityEvent', binaryBoolean],
  GetActivityTranslationModifiers: [null, ['string']],
  GetAlwaysAllowAttack: [null, binaryBoolean],
  GetAttackSound: [null, ['string']],
  GetBonusDayVision: [null, anyNumber],
  GetBonusNightVision: [null, anyNumber],
  GetBonusNightVisionUnique: [null, anyNumber],
  GetBonusVisionPercentage: [null, anyNumber],
  GetDisableAutoAttack: [null, binaryBoolean],
  GetDisableHealing: [null, binaryBoolean],
  GetFixedDayVision: [null, anyNumber],
  GetFixedNightVision: [null, anyNumber],
  GetForceDrawOnMinimap: [null, binaryBoolean],
  GetIsIllusion: [null, binaryBoolean],
  GetMinHealth: [null, anyNumber],
  GetModifierAbilityLayout: [null, anyNumber],
  GetModifierAttackPointConstant: [null, anyNumber],
  GetModifierAttackRangeBonus: [null, anyNumber],
  GetModifierAttackRangeBonusUnique: [null, anyNumber],
  GetModifierAttackRangeOverride: [null, anyNumber],
  GetModifierAttackSpeedBaseOverride: [null, anyNumber],
  GetModifierAttackSpeedBonus_Constant: [null, anyNumber],
  GetModifierAvoidDamage: ['ModifierAttackEvent', anyNumber],
  GetModifierAvoidSpell: ['ModifierAttackEvent', binaryBoolean],
  GetModifierBaseAttack_BonusDamage: [null, anyNumber],
  GetModifierBaseAttackTimeConstant: [null, anyNumber],
  GetModifierBaseDamageOutgoing_Percentage: ['ModifierAttackEvent', anyNumber],
  GetModifierBaseDamageOutgoing_PercentageUnique: ['ModifierAttackEvent', anyNumber],
  GetModifierBaseRegen: [null, anyNumber],
  GetModifierBonusStats_Agility: [null, anyNumber],
  GetModifierBonusStats_Intellect: [null, anyNumber],
  GetModifierBonusStats_Strength: [null, anyNumber],
  GetModifierBountyCreepMultiplier: [null, anyNumber],
  GetModifierBountyOtherMultiplier: [null, anyNumber],
  GetModifierCanAttackTrees: [null, binaryBoolean],
  GetModifierCastRangeBonus: ['ModifierAbilityEvent', anyNumber],
  GetModifierCastRangeBonusStacking: ['ModifierAbilityEvent', anyNumber],
  GetModifierCastRangeBonusTarget: ['ModifierAbilityEvent', anyNumber],
  GetModifierChangeAbilityValue: [null, ['nil']],
  GetModifierConstantDeathGoldCost: [null, anyNumber],
  GetModifierConstantHealthRegen: [null, anyNumber],
  GetModifierConstantManaRegen: [null, anyNumber],
  GetModifierConstantManaRegenUnique: [null, anyNumber],
  GetModifierConstantRespawnTime: [null, anyNumber],
  GetModifierCooldownReduction_Constant: ['ModifierAbilityEvent', anyNumber],
  GetModifierDamageOutgoing_Percentage_Illusion: ['ModifierAttackEvent', anyNumber],
  GetModifierDamageOutgoing_Percentage: ['ModifierAttackEvent', anyNumber],
  GetModifierDisableTurning: [null, binaryBoolean],
  GetModifierDodgeProjectile: [null, binaryBoolean],
  GetModifierEvasion_Constant: ['ModifierAttackEvent', anyNumber],
  GetModifierExtraHealthBonus: [null, anyNumber],
  GetModifierExtraHealthPercentage: [null, anyNumber],
  GetModifierExtraManaBonus: [null, anyNumber],
  GetModifierExtraStrengthBonus: [null, anyNumber],
  GetModifierFixedAttackRate: [null, anyNumber],
  GetModifierHealthBonus: [null, anyNumber],
  GetModifierHealthRegenPercentage: [null, anyNumber],
  GetModifierHealthRegenPercentageUnique: [null, anyNumber],
  GetModifierHPRegenAmplify_Percentage: [null, anyNumber],
  GetModifierIgnoreCastAngle: [null, binaryBoolean],
  GetModifierIgnoreCooldown: [null, binaryBoolean],
  GetModifierIgnoreMovespeedLimit: [null, binaryBoolean],
  GetModifierIgnorePhysicalArmor: ['ModifierAttackEvent', anyNumber],
  GetModifierIllusionLabel: [null, binaryBoolean],
  GetModifierIncomingDamage_Percentage: ['ModifierAttackEvent', anyNumber],
  GetModifierIncomingPhysicalDamage_Percentage: ['ModifierAttackEvent', anyNumber],
  GetModifierIncomingPhysicalDamageConstant: ['ModifierAttackEvent', anyNumber],
  GetModifierIncomingSpellDamageConstant: ['ModifierAttackEvent', anyNumber],
  GetModifierInvisibilityLevel: [null, anyNumber],
  GetModifierMagical_ConstantBlock: ['ModifierAttackEvent', anyNumber],
  GetModifierMagicalResistanceBonus: ['ModifierAttackEvent', anyNumber],
  GetModifierMagicalResistanceDecrepifyUnique: ['ModifierAttackEvent', anyNumber],
  GetModifierMagicalResistanceDirectModification: ['ModifierAttackEvent', anyNumber],
  GetModifierMagicDamageOutgoing_Percentage: ['ModifierAttackEvent', anyNumber],
  GetModifierManaBonus: [null, anyNumber],
  GetModifierMaxAttackRange: [null, anyNumber],
  GetModifierMiss_Percentage: [null, anyNumber],
  GetModifierModelChange: [null, ['string']],
  GetModifierModelScale: [null, anyNumber],
  GetModifierMoveSpeed_Absolute: [null, anyNumber],
  GetModifierMoveSpeed_AbsoluteMin: [null, anyNumber],
  GetModifierMoveSpeed_Limit: [null, anyNumber],
  GetModifierMoveSpeed_Max: [null, anyNumber],
  GetModifierMoveSpeedBonus_Constant_Unique_2: [null, anyNumber],
  GetModifierMoveSpeedBonus_Constant: [null, anyNumber],
  GetModifierMoveSpeedBonus_Percentage_Unique_2: [null, anyNumber],
  GetModifierMoveSpeedBonus_Percentage_Unique: [null, anyNumber],
  GetModifierMoveSpeedBonus_Percentage: [null, anyNumber],
  GetModifierMoveSpeedBonus_Special_Boots_2: [null, anyNumber],
  GetModifierMoveSpeedBonus_Special_Boots: [null, anyNumber],
  GetModifierMoveSpeedOverride: [null, anyNumber],
  GetModifierMPRegenAmplify_Percentage: [null, anyNumber],
  GetModifierMPRestoreAmplify_Percentage: [null, anyNumber, 'Total amplify value is clamped to 0.'],
  GetModifierNegativeEvasion_Constant: [null, anyNumber],
  GetModifierOverrideAbilitySpecial: ['ModifierOverrideAbilitySpecialEvent', binaryBoolean],
  GetModifierOverrideAbilitySpecialValue: ['ModifierOverrideAbilitySpecialEvent', anyNumber],
  GetModifierOverrideAttackDamage: [null, anyNumber],
  GetModifierPercentageCasttime: ['ModifierAbilityEvent', anyNumber],
  GetModifierPercentageCooldown: ['ModifierAbilityEvent', anyNumber],
  GetModifierPercentageCooldownStacking: ['ModifierAbilityEvent', anyNumber],
  GetModifierPercentageExpRateBoost: [null, anyNumber],
  GetModifierPercentageManacost: ['ModifierAbilityEvent', anyNumber],
  GetModifierPercentageManacostStacking: [null, anyNumber],
  GetModifierPercentageRespawnTime: [null, anyNumber],
  GetModifierPersistentInvisibility: [null, anyNumber],
  GetModifierPhysical_ConstantBlock: ['ModifierAttackEvent', anyNumber],
  GetModifierPhysical_ConstantBlockSpecial: [null, anyNumber],
  GetModifierPhysical_ConstantBlockUnavoidablePreArmor: ['ModifierAttackEvent', anyNumber],
  GetModifierPhysicalArmorBase_Percentage: [null, anyNumber, 'Values above 100% are ignored.'],
  GetModifierPhysicalArmorBonus: ['ModifierAttackEvent', anyNumber],
  GetModifierPhysicalArmorBonusUnique: ['ModifierAttackEvent', anyNumber],
  GetModifierPhysicalArmorBonusUniqueActive: ['ModifierAttackEvent', anyNumber],
  GetModifierPreAttack_BonusDamage_Proc: [null, anyNumber],
  GetModifierPreAttack_BonusDamage: [null, anyNumber],
  GetModifierPreAttack_BonusDamagePostCrit: ['ModifierAttackEvent', anyNumber],
  GetModifierPreAttack_CriticalStrike: ['ModifierAttackEvent', anyNumber],
  GetModifierPreAttack_Target_CriticalStrike: [null, anyNumber],
  GetModifierPreAttack: ['ModifierAttackEvent', anyNumber],
  GetModifierProcAttack_BonusDamage_Magical: ['ModifierAttackEvent', anyNumber],
  GetModifierProcAttack_BonusDamage_Physical: ['ModifierAttackEvent', anyNumber],
  GetModifierProcAttack_BonusDamage_Pure: ['ModifierAttackEvent', anyNumber],
  GetModifierProcAttack_Feedback: ['ModifierAttackEvent', anyNumber],
  GetModifierProjectileName: [null, ['string']],
  GetModifierProjectileSpeedBonus: [null, anyNumber],
  GetModifierProvidesFOWVision: [null, binaryBoolean],
  GetModifierScepter: [null, ['nil'], 'Always applies scepter when this property is active'],
  GetModifierSpellAmplify_Percentage: ['ModifierAttackEvent', anyNumber],
  GetModifierSpellAmplify_PercentageUnique: [null, anyNumber],
  GetModifierSpellsRequireHP: [null, anyNumber],
  GetModifierStackingRespawnTime: [null, anyNumber],
  GetModifierStatusResistance: [null, anyNumber],
  GetModifierStatusResistanceCaster: ['ModifierUnitEvent', anyNumber],
  GetModifierStatusResistanceStacking: [null, anyNumber],
  GetModifierSuperIllusion: [null, binaryBoolean],
  GetModifierSuperIllusionWithUltimate: [null, binaryBoolean],
  GetModifierTempestDouble: [null, binaryBoolean],
  GetModifierTotal_ConstantBlock: ['ModifierAttackEvent', anyNumber],
  GetModifierTotalDamageOutgoing_Percentage: ['ModifierAttackEvent', anyNumber],
  GetModifierTotalPercentageManaRegen: [null, anyNumber],
  GetModifierTurnRate_Override: [null, anyNumber],
  GetModifierTurnRate_Percentage: [null, anyNumber],
  GetModifierUnitDisllowUpgrading: [null, binaryBoolean],
  GetModifierUnitStatsNeedsRefresh: [null, binaryBoolean],
  GetOverrideAnimation: [null, ['GameActivity_t']],
  GetOverrideAnimationRate: [null, anyNumber],
  GetOverrideAnimationWeight: [null, anyNumber],
  GetOverrideAttackMagical: [null, binaryBoolean],
  GetReflectSpell: ['ModifierAbilityEvent', binaryBoolean],
  GetUnitLifetimeFraction: [null, anyNumber],
  GetVisualZDelta: [null, anyNumber],
  OnAbilityEndChannel: ['ModifierAbilityEvent', ['nil']],
  OnAbilityExecuted: ['ModifierAbilityEvent', ['nil']],
  OnAbilityFullyCast: ['ModifierAbilityEvent', ['nil']],
  OnAbilityStart: ['ModifierAbilityEvent', ['nil']],
  OnAttack: ['ModifierAttackEvent', ['nil']],
  OnAttackAllied: ['ModifierAttackEvent', ['nil'], "Happens even if attack can't be issued."],
  OnAttackCancelled: ['ModifierAttackEvent', ['nil']],
  OnAttacked: ['ModifierAttackEvent', ['nil']],
  OnAttackFail: ['ModifierAttackEvent', ['nil']],
  OnAttackFinished: ['ModifierAttackEvent', ['nil']],
  OnAttackLanded: ['ModifierAttackEvent', ['nil']],
  OnAttackRecord: ['ModifierAttackEvent', ['nil']],
  OnAttackRecordDestroy: ['ModifierAttackEvent', ['nil']],
  OnAttackStart: ['ModifierAttackEvent', ['nil']],
  OnBreakInvisibility: [null, ['nil']],
  OnBuildingKilled: ['ModifierInstanceEvent', ['nil']],
  OnDamageCalculated: ['ModifierAttackEvent', ['nil']],
  OnDeath: ['ModifierInstanceEvent', ['nil']],
  OnDominated: ['ModifierUnitEvent', ['nil']],
  OnHealReceived: ['ModifierUnitEvent', ['nil']],
  OnHealthGained: ['ModifierUnitEvent', ['nil']],
  OnHeroKilled: ['ModifierAttackEvent', ['nil']],
  OnManaGained: ['ModifierUnitEvent', ['nil']],
  OnModelChanged: ['ModifierUnitEvent', ['nil']],
  OnModifierAdded: [null, ['nil']],
  OnOrder: ['ModifierUnitEvent', ['nil']],
  OnProjectileDodge: ['ModifierAttackEvent', ['nil']],
  OnRespawn: ['ModifierUnitEvent', ['nil']],
  OnSetLocation: ['ModifierUnitEvent', ['nil']],
  OnSpellTargetReady: [null, ['nil']],
  OnSpentMana: ['ModifierAbilityEvent', ['nil']],
  OnStateChanged: ['ModifierUnitEvent', ['nil']],
  OnTakeDamage: ['ModifierInstanceEvent', ['nil']],
  OnTakeDamageKillCredit: ['ModifierInstanceEvent', ['nil']],
  OnTeleported: ['ModifierUnitEvent', ['nil']],
  OnTeleporting: ['ModifierUnitEvent', ['nil']],
  OnTooltip: [null, anyNumber],
  OnTooltip2: [null, anyNumber],
  OnUnitMoved: ['ModifierUnitEvent', ['nil']],
  PreserveParticlesOnModelChanged: [null, binaryBoolean],
  ReincarnateTime: [null, anyNumber],
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
  .map((x): apiTypes.ClassMethod => {
    const functionName = x.description;

    if (!(functionName in modifiersData)) {
      console.warn(`Untyped modifier field: ${functionName}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const [argumentType, returns, description] = modifiersData[functionName] ?? [null, ['nil']];

    const args: apiTypes.FunctionParameter[] = [];
    if (argumentType !== null) {
      args.push({ name: 'event', types: [argumentType] });
    }

    return {
      kind: 'function',
      name: functionName,
      available: 'both',
      abstract: true,
      description,
      args,
      returns,
    };
  });
