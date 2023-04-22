export const resourcePatterns = {
  particles: /^particles\/.+\.vpcf$/,
  particlesFolder: /^particles\//,
  materials: /^materials\/.+\.vmat$/,
  models: /^models\/.+\.vmdl$/,
  modelsFolder: /^models\//,
  sounds: /^sounds\/.+\.vsnd$/,
  soundevents: /^soundevents\/.+\.vsndevts$/,
  scenes: /^scenes\/.+\.vcd$/,
  hero: /^npc_\w+_hero_\w+$/,
  resource: /^resource\/.+\.res$/,
  heroMovie: /^media\/heroes\//,
  special: /^%\w+$/,
  // TODO: Make something better to tag strings
  npc: /(.|__npc__)/,
  lua: /(.|__lua__)/,
  ability: /(.|__ability__)/,
  item: /(.|__item__)/,
};

export const precacheTypes = {
  model: resourcePatterns.models,
  model_folder: resourcePatterns.modelsFolder,
  particle: resourcePatterns.particles,
  particle_folder: resourcePatterns.particlesFolder,
  sound: resourcePatterns.sounds,
  soundfile: resourcePatterns.soundevents,
};
