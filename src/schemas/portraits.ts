import * as s from '../schema-builder';
import { resourcePatterns } from './resources';

const camera = s
  .obj('Camera')
  .field('PortraitPosition', s.vector(), { require: true })
  .field('PortraitAngles', s.vector(), { require: true })
  .field('PortraitFOV', s.num(), { require: true })
  .field('PortraitFar', s.num());

const portrait = s
  .obj('Portrait')
  .field('PortraitLightPosition', s.vector(), { require: true })
  .field('PortraitLightAngles', s.vector(), { require: true })
  .field('PortraitLightFOV', s.num(), { require: true })
  .field('PortraitLightDistance', s.num(), { require: true })
  .field('PortraitLightColor', s.vector().integers(), { require: true })
  .field('PortraitShadowColor', s.vector().integers(), { require: true })
  .field('PortraitShadowScale', s.num(), { require: true })
  .field('PortraitAmbientColor', s.vector().integers(), { require: true })
  .field('PortraitAmbientScale', s.num(), { require: true })
  .field('PortraitSpecularColor', s.vector(), { require: true })
  .field('PortraitSpecularDirection', s.vector())
  .field('PortraitSpecularPower', s.int())
  .field('PortraitParticle', s.str().pattern(resourcePatterns.particles))
  .field('PortraitVignetteItem', s.literal(0))

  // At least one of them is required?
  .field('PortraitBackgroundTexture', s.str().pattern(resourcePatterns.materials))
  .field('PortraitBackgroundModel', s.str().pattern(resourcePatterns.models))
  .field('PortraitBackgroundColor1', s.vector())
  .field('PortraitBackgroundColor2', s.vector())
  .field('PortraitBackgroundColor3', s.vector())
  .field('PortraitBackgroundColor4', s.vector())

  .field('PortraitLightScale', s.num(), { require: true })
  .field('PortraitGroundShadowScale', s.num(), { require: true })
  .field('PortraitAmbientDirection', s.vector(), { require: true })
  .field('PortraitAnimationActivity', s.enums('Activity'))
  .field('cameras', s.map(camera), { require: true })

  // TODO: Used only in models/items/warlock/golem/ti9_cache_warlock_tribal_warlock_golem/ti9_cache_warlock_tribal_golem_alt.vmdl
  .field('SummonCount', s.int())
  .field('SummonPosition', s.vector())
  .field('SummonScale', s.num())
  .field('SummonAngles', s.vector())

  .field('PortraitAnimationCycle', s.num())
  .field('PortraitAnimationRate', s.num())
  .field('PortraitFOV', s.num())
  .field('PortraitHideHero', s.binaryBoolean())
  .field('PortraitHideParticles', s.binaryBoolean())
  .field('PortraitHideDropShadow', s.binaryBoolean())
  .field('PortraitDesaturateParticles', s.binaryBoolean())
  .field('PortraitDesaturateHero', s.binaryBoolean())
  .field('PortraitLookAt', s.vector())
  .field('PortraitPlayIdleExpression', s.binaryBoolean())
  .field('PortraitPosition', s.vector());

export const portraits = s
  .root()
  // Required, but keeping them optional to avoid having required properties at the file root
  .field('PreferModelNames', s.binaryBoolean())
  .field('DefaultActivity', s.str())
  .field('CannotChangeActivity', s.binaryBoolean())
  .rest(portrait);
