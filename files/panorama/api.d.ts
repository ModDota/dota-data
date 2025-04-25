/* eslint-disable @typescript-eslint/no-unused-vars */
// Auto-generated Panorama API definitions.

declare namespace Panorama {
    // Basic types (add more as needed)
    type Panel = object; // Generic Panel type
    type EntityIndex = number;
    type AbilityEntityIndex = number;
    type ItemEntityIndex = number;
    type PlayerID = number;
    type TeamID = number;
    type ScheduleID = number;
    type SoundEventID = number;
    type ParticleID = number;
    type SceneEntityIndex = number;
    type BuffID = number;
    type HeroID = number;
    type ViewerID = number;
    type SpawnGroupHandle = number;
    type ProjectileID = number;
    type EventListenerID = number;
    type GameEventSubscriptionID = number;
    type PlayerUltimateStateOrTime = number;
    type ParticleAttachment = number;
    type DOTAUnitOrder = number;
    type FindOrder = number;
    type OverheadAlert = number;
    type PlayerOrderIssuer = number;
    type OrderQueueBehavior = number;
    type ClickBehaviors = number;
    type AbilityLearnResult = number;
    type DOTAShopType = number;
    type DOTATeam = number;
    type GameActivity = number;
    type GameState = number;
    type GameMode = number;
    type GameDifficulty = number;
    type HeroSelectionState = number;
    type HullRadius = number;
    type DOTAHUDVisibility = number;
    type DOTAScenePanelEvent = number;
    type DOTATeamDetails = object;
    type DOTAPlayerDetails = object;
    type DOTAHeroDetails = object;
    type DOTACustomUIPanel = object;
    type DOTACustomUIClient = object;
    type DOTACustomUIConfig = object;
    type Vector = [number, number, number] | { x: number; y: number; z: number };
    type QAngle = [number, number, number] | { x: number; y: number; z: number };
    type Quaternion = [number, number, number, number] | { x: number; y: number; z: number; w: number };

    // Global API Functions
    // Global selector function
    function $(selector: string): Panel | null;
}

// Global helper functions (if applicable)
declare function $(selector: string): Panorama.Panel | null;
declare function $F(value: number): number; // Format float

// Add other global functions/variables if known
