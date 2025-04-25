interface CPanoramaScript_GameEvents
{
    /** Subscribe to a game event */
    Subscribe( pEventName: string, funcVal ): number;
    /** Unsubscribe from a game event */
    Unsubscribe( nCallbackHandle: number ): void;
    /** Send a custom game event to the server */
    SendCustomGameEventToServer( pEventName: string, jsObject ): void;
    /** Send a custom game event to the server, which will send it to all clients */
    SendCustomGameEventToAllClients( pEventName: string, jsObject ): void;
    /** Send a custom game event to the server, which will then send it to one client */
    SendCustomGameEventToClient( pEventName: string, playerIndex: number, jsObject ): void;
    /** Send a client-side event using gameeventmanager (only useful for a few specific events) */
    SendEventClientSide( pEventName: string, jsObject ): void;
}
interface CPanoramaScript_CustomNetTables
{
    /** Get a key from a custom net table */
    GetTableValue( pTableName: string, pKeyName: string );
    /** Get all values from a custom net table */
    GetAllTableValues( pTableName: string );
    /** Register a callback when a particular custom net table changes */
    SubscribeNetTableListener( args ): void;
    /** Unsubscribe from a game event */
    UnsubscribeNetTableListener( nCallbackHandle: number ): void;
}
// No matches for 'SteamUGC' found
interface CPanoramaScript_SteamFriends
{
    /** Requests the user's persona name */
    RequestPersonaName( pchSteamID: string, funcVal ): string;
    /** Sets the avatar image on the image panel */
    SetLargeAvatarImage( args ): void;
}
interface CPanoramaScript_SteamUtils
{
    /** Returns the connected universe */
    GetConnectedUniverse();
    /** Returns the appid of the current app */
    GetAppID(): number;
}
interface CScriptBindingPR_Buffs
{
    GetName( nEntity: number, nBuff: number ): string;
    GetClass( nEntity: number, nBuff: number ): string;
    GetTexture( nEntity: number, nBuff: number ): string;
    GetDuration( nEntity: number, nBuff: number ): number;
    GetDieTime( nEntity: number, nBuff: number ): number;
    GetRemainingTime( nEntity: number, nBuff: number ): number;
    GetElapsedTime( nEntity: number, nBuff: number ): number;
    GetCreationTime( nEntity: number, nBuff: number ): number;
    GetStackCount( nEntity: number, nBuff: number ): number;
    IsDebuff( nEntity: number, nBuff: number ): boolean;
    IsHidden( nEntity: number, nBuff: number ): boolean;
    /** Get the owner of the ability responsible for the modifier. */
    GetCaster( nEntity: number, nBuff: number ): number;
    /** Get the unit the modifier is parented to. */
    GetParent( nEntity: number, nBuff: number ): number;
    /** Get the ability that generated the modifier. */
    GetAbility( nEntity: number, nBuff: number ): number;
}
interface CScriptBindingPR_Players
{
    /** Get the maximum number of players in the game. */
    GetMaxPlayers(): number;
    /** Get the maximum number of players on teams. */
    GetMaxTeamPlayers(): number;
    /** Get the local player ID. */
    GetLocalPlayer(): number;
    /** Is the nth player a valid player? */
    IsValidPlayerID( iPlayerID: number ): boolean;
    /** Return the name of a player. */
    GetPlayerName( iPlayerID: number ): string;
    /** Get the entity index of the hero controlled by this player. */
    GetPlayerHeroEntityIndex( iPlayerID: number ): number;
    /** Get the entities this player has selected. */
    GetSelectedEntities( iPlayerID: number );
    /** Get the entities this player is querying. */
    GetQueryUnit( iPlayerID: number ): number;
    /** Get local player current portrait unit. (ie. Player's hero or primary selected unit.) */
    GetLocalPlayerPortraitUnit(): number;
    /** Can the player buy back? */
    CanPlayerBuyback( nPlayerID: number ): boolean;
    /** Does this player have a custom game ticket? */
    HasCustomGameTicketForPlayerID( nPlayerID: number ): boolean;
    /** The number of assists credited to a player. */
    GetAssists( nPlayerID: number ): number;
    GetClaimedDenies( nPlayerID: number ): number;
    GetClaimedMisses( nPlayerID: number ): number;
    /** The number of deaths a player has suffered. */
    GetDeaths( nPlayerID: number ): number;
    /** The number of denies credited to a player. */
    GetDenies( nPlayerID: number ): number;
    /** The amount of gold a player has. */
    GetGold( nPlayerID: number ): number;
    /** The number of kills credited to a player. */
    GetKills( nPlayerID: number ): number;
    GetLastBuybackTime( nPlayerID: number ): number;
    GetLastHitMultikill( nPlayerID: number ): number;
    /** The number of last hits credited to a player. */
    GetLastHits( nPlayerID: number ): number;
    GetLastHitStreak( nPlayerID: number ): number;
    /** The current level of a player. */
    GetLevel( nPlayerID: number ): number;
    GetMisses( nPlayerID: number ): number;
    GetNearbyCreepDeaths( nPlayerID: number ): number;
    /** Total reliable gold for this player. */
    GetReliableGold( nPlayerID: number ): number;
    GetRespawnSeconds( nPlayerID: number ): number;
    GetStreak( nPlayerID: number ): number;
    /** Total gold earned in this game by this player. */
    GetTotalEarnedGold( nPlayerID: number ): number;
    /** Total xp earned in this game by this player. */
    GetTotalEarnedXP( nPlayerID: number ): number;
    /** Total unreliable gold for this player. */
    GetUnreliableGold( nPlayerID: number ): number;
    /** Get the team this player is on. */
    GetTeam( nPlayerID: number ): number;
    /** Get the player's selected hero id. */
    GetSelectedHeroID( nPlayerID: number ): number;
    /** Average gold earned per minute for this player. */
    GetGoldPerMin( nPlayerID: number ): number;
    /** Average xp earned per minute for this player. */
    GetXPPerMin( nPlayerID: number ): number;
    /** Return the name of the hero a player is controlling. */
    GetPlayerSelectedHero( nPlayerID: number ): string;
    /** Get the player color. */
    GetPlayerColor( iPlayerID: number ): number;
    /** Is this player a spectator. */
    IsSpectator( iPlayerID: number ): boolean;
    /** . */
    PlayerPortraitClicked( nClickedPlayerID: number, bHoldingCtrl: boolean, bHoldingAlt: boolean ): void;
    /** . */
    PlayerPortraitDoubleClicked( nClickedPlayerID: number, bHoldingCtrl: boolean, bHoldingAlt: boolean ): void;
    /** . */
    BuffClicked( nEntity: number, nBuffSerial: number, bAlert: boolean ): void;
    /** Is the local player live spectating? */
    IsLocalPlayerLiveSpectating(): boolean;
    /** If local player is in perspective camera, returns true. Else, false */
    IsLocalPlayerInPerspectiveCamera(): boolean;
    /** If player is in perspective mode, returns the followed players entity index.  Else, -1. */
    GetPerspectivePlayerEntityIndex(): number;
    /** If player is in perspective mode, returns the followed players id.  Else, -1. */
    GetPerspectivePlayerId(): number;
}
interface CScriptBindingPR_Entities
{
    /** Get the world origin of the entity. */
    GetAbsOrigin( nEntityIndex: number );
    /** Get the world angles of the entity. */
    GetAbsAngles( nEntityIndex: number );
    /** Get the forward vector of the entity. */
    GetForward( nEntityIndex: number );
    /** Get the left vector of the entity. */
    GetLeft( nEntityIndex: number );
    /** Get the right vector of the entity. WARNING: This produces a left-handed coordinate system. Use GetLeft instead! */
    GetRight( nEntityIndex: number );
    /** Get the up vector of the entity. */
    GetUp( nEntityIndex: number );
    /** Get all the building entities. */
    GetAllBuildingEntities();
    /** Get all the hero entities. */
    GetAllHeroEntities();
    /** Get all the entities with a given name. */
    GetAllEntitiesByName( pszName: string );
    /** Get all the entities with a given classname. */
    GetAllEntitiesByClassname( pszName: string );
    /** Get all the creature entities. */
    GetAllCreatureEntities();
    /** Get all the entities. */
    GetAllEntities();
    CanBeDominated( nEntityIndex: number ): boolean;
    HasAttackCapability( nEntityIndex: number ): boolean;
    HasCastableAbilities( nEntityIndex: number ): boolean;
    HasFlyingVision( nEntityIndex: number ): boolean;
    HasFlyMovementCapability( nEntityIndex: number ): boolean;
    HasGroundMovementCapability( nEntityIndex: number ): boolean;
    HasMovementCapability( nEntityIndex: number ): boolean;
    HasScepter( nEntityIndex: number ): boolean;
    HasUpgradeableAbilities( nEntityIndex: number ): boolean;
    HasUpgradeableAbilitiesThatArentMaxed( nEntityIndex: number ): boolean;
    IsAlive( nEntityIndex: number ): boolean;
    IsAncient( nEntityIndex: number ): boolean;
    IsAttackImmune( nEntityIndex: number ): boolean;
    IsBarracks( nEntityIndex: number ): boolean;
    IsBlind( nEntityIndex: number ): boolean;
    IsBoss( nEntityIndex: number ): boolean;
    IsBossCreature( nEntityIndex: number ): boolean;
    IsRoshan( nEntityIndex: number ): boolean;
    IsBuilding( nEntityIndex: number ): boolean;
    IsCommandRestricted( nEntityIndex: number ): boolean;
    IsConsideredHero( nEntityIndex: number ): boolean;
    IsControllableByAnyPlayer( nEntityIndex: number ): boolean;
    IsCourier( nEntityIndex: number ): boolean;
    IsCreature( nEntityIndex: number ): boolean;
    IsCreep( nEntityIndex: number ): boolean;
    IsCreepHero( nEntityIndex: number ): boolean;
    IsDeniable( nEntityIndex: number ): boolean;
    IsDominated( nEntityIndex: number ): boolean;
    IsEnemy( nEntityIndex: number ): boolean;
    IsEvadeDisabled( nEntityIndex: number ): boolean;
    IsFort( nEntityIndex: number ): boolean;
    IsFrozen( nEntityIndex: number ): boolean;
    IsGeneratedByEconItem( nEntityIndex: number ): boolean;
    IsHallofFame( nEntityIndex: number ): boolean;
    IsDisarmed( nEntityIndex: number ): boolean;
    IsHero( nEntityIndex: number ): boolean;
    IsHexed( nEntityIndex: number ): boolean;
    IsIllusion( nEntityIndex: number ): boolean;
    IsInRangeOfFountain( nEntityIndex: number ): boolean;
    IsInventoryEnabled( nEntityIndex: number ): boolean;
    IsInvisible( nEntityIndex: number ): boolean;
    IsInvulnerable( nEntityIndex: number ): boolean;
    IsLaneCreep( nEntityIndex: number ): boolean;
    IsLowAttackPriority( nEntityIndex: number ): boolean;
    IsMagicImmune( nEntityIndex: number ): boolean;
    IsMuted( nEntityIndex: number ): boolean;
    IsNeutralUnitType( nEntityIndex: number ): boolean;
    IsNightmared( nEntityIndex: number ): boolean;
    IsOther( nEntityIndex: number ): boolean;
    IsOutOfGame( nEntityIndex: number ): boolean;
    IsOwnedByAnyPlayer( nEntityIndex: number ): boolean;
    IsPhantom( nEntityIndex: number ): boolean;
    IsRangedAttacker( nEntityIndex: number ): boolean;
    IsRealHero( nEntityIndex: number ): boolean;
    IsRooted( nEntityIndex: number ): boolean;
    IsSelectable( nEntityIndex: number ): boolean;
    IsShop( nEntityIndex: number ): boolean;
    IsSilenced( nEntityIndex: number ): boolean;
    IsSpeciallyDeniable( nEntityIndex: number ): boolean;
    IsSpeciallyUndeniable( nEntityIndex: number ): boolean;
    IsStunned( nEntityIndex: number ): boolean;
    IsSummoned( nEntityIndex: number ): boolean;
    IsTower( nEntityIndex: number ): boolean;
    IsUnselectable( nEntityIndex: number ): boolean;
    IsWard( nEntityIndex: number ): boolean;
    IsZombie( nEntityIndex: number ): boolean;
    NoHealthBar( nEntityIndex: number ): boolean;
    NoTeamMoveTo( nEntityIndex: number ): boolean;
    NoTeamSelect( nEntityIndex: number ): boolean;
    NotOnMinimap( nEntityIndex: number ): boolean;
    NotOnMinimapForEnemies( nEntityIndex: number ): boolean;
    NoUnitCollision( nEntityIndex: number ): boolean;
    ProvidesVision( nEntityIndex: number ): boolean;
    UsesHeroAbilityNumbers( nEntityIndex: number ): boolean;
    IsMoving( nEntityIndex: number ): boolean;
    GetAbilityCount( nEntityIndex: number ): number;
    GetCurrentVisionRange( nEntityIndex: number ): number;
    GetDamageBonus( nEntityIndex: number ): number;
    GetDamageMax( nEntityIndex: number ): number;
    GetDamageMin( nEntityIndex: number ): number;
    GetDayTimeVisionRange( nEntityIndex: number ): number;
    GetHealth( nEntityIndex: number ): number;
    GetHealthPercent( nEntityIndex: number ): number;
    GetHealthThinkRegen( nEntityIndex: number ): number;
    GetLevel( nEntityIndex: number ): number;
    GetMaxHealth( nEntityIndex: number ): number;
    GetNightTimeVisionRange( nEntityIndex: number ): number;
    GetPlayerOwnerID( nEntityIndex: number ): number;
    GetStates( nEntityIndex: number ): number;
    GetTotalPurchasedUpgradeGoldCost( nEntityIndex: number ): number;
    GetTeamNumber( nEntityIndex: number ): number;
    GetHealthBarOffset( nEntityIndex: number ): number;
    GetAttackRange( nEntityIndex: number ): number;
    GetAttackSpeed( nEntityIndex: number ): number;
    GetAttacksPerSecond( nEntityIndex: number ): number;
    GetBaseAttackTime( nEntityIndex: number ): number;
    GetBaseMagicalResistanceValue( nEntityIndex: number ): number;
    GetBaseMoveSpeed( nEntityIndex: number ): number;
    GetBonusPhysicalArmor( nEntityIndex: number ): number;
    GetCollisionPadding( nEntityIndex: number ): number;
    GetEffectiveInvisibilityLevel( nEntityIndex: number ): number;
    GetHasteFactor( nEntityIndex: number ): number;
    GetHullRadius( nEntityIndex: number ): number;
    GetIdealSpeed( nEntityIndex: number ): number;
    GetIncreasedAttackSpeed( nEntityIndex: number ): number;
    GetMana( nEntityIndex: number ): number;
    GetManaThinkRegen( nEntityIndex: number ): number;
    GetMaxMana( nEntityIndex: number ): number;
    GetMagicalArmorValue( nEntityIndex: number ): number;
    GetPaddedCollisionRadius( nEntityIndex: number ): number;
    GetPercentInvisible( nEntityIndex: number ): number;
    GetPhysicalArmorValue( nEntityIndex: number ): number;
    GetProjectileCollisionSize( nEntityIndex: number ): number;
    GetRingRadius( nEntityIndex: number ): number;
    GetSecondsPerAttack( nEntityIndex: number ): number;
    ManaFraction( nEntityIndex: number ): number;
    GetClassNameAsCStr( nEntityIndex: number ): string;
    GetDisplayedUnitName( nEntityIndex: number ): string;
    GetSelectionGroup( nEntityIndex: number ): string;
    GetSoundSet( nEntityIndex: number ): string;
    GetUnitLabel( nEntityIndex: number ): string;
    GetUnitName( nEntityIndex: number ): string;
    GetTotalDamageTaken( nEntityIndex: number ): number;
    IsControllableByPlayer( nEntityIndex: number, nPlayerIndex: number ): boolean;
    GetChosenTarget( nEntityIndex: number ): number;
    HasItemInInventory( nEntityIndex: number, pItemName: string ): boolean;
    GetRangeToUnit( nEntityIndex: number, nEntityIndex2: number ): number;
    IsEntityInRange( nEntityIndex: number, nEntityIndex2: number, flRange: number ): boolean;
    GetMoveSpeedModifier( nEntityIndex: number, flBaseSpeed: number ): number;
    CanAcceptTargetToAttack( nEntityIndex: number, nEntityIndex2: number ): boolean;
    InState( nEntityIndex: number, nState: number ): boolean;
    GetArmorForDamageType( nEntityIndex: number, iDamageType: number ): number;
    GetArmorReductionForDamageType( nEntityIndex: number, iDamageType: number ): number;
    IsInRangeOfShop( nEntityIndex: number, iShopType: number, bSpecific: boolean ): boolean;
    GetNumItemsInStash( nEntityIndex: number ): number;
    GetNumItemsInInventory( nEntityIndex: number ): number;
    GetItemInSlot( nEntityIndex: number, nSlotIndex: number ): number;
    GetAbility( nEntityIndex: number, nSlotIndex: number ): number;
    GetAbilityByName( nEntityIndex: number, pszAbilityName: string ): number;
    GetNumBuffs( nEntityIndex: number ): number;
    GetBuff( nEntityIndex: number, nBufIndex: number ): number;
    /** Set the minimap icon on this client. */
    SetMinimapIcon( nEntityIndex: number, pszMinimapIcon: string ): void;
    GetAbilityPoints( nEntityIndex: number ): number;
    GetCurrentXP( nEntityIndex: number ): number;
    GetNeededXPToLevel( nEntityIndex: number ): number;
    /** Get the currently selected entities */
    GetSelectionEntities( nEntityIndex: number );
    /** Is this a valid entity index? */
    IsValidEntity( nEntityIndex: number ): boolean;
    /** Is this entity an item container in the world? */
    IsItemPhysical( nEntityIndex: number ): boolean;
    PassivesDisabled( nEntityIndex: number ): boolean;
    /** Get the item contained in this physical item container. */
    GetContainedItem( nEntityIndex: number ): number;
}
interface CScriptBindingPR_Abilities
{
    GetAbilityName( nEntityIndex: number ): string;
    GetAbilityTextureName( nEntityIndex: number ): string;
    GetAssociatedPrimaryAbilities( nEntityIndex: number ): string;
    GetAssociatedSecondaryAbilities( nEntityIndex: number ): string;
    GetHotkeyOverride( nEntityIndex: number ): string;
    GetIntrinsicModifierName( nEntityIndex: number ): string;
    GetSharedCooldownName( nEntityIndex: number ): string;
    AbilityReady( nEntityIndex: number ): number;
    /** Returns an AbilityLearnResult_t */
    CanAbilityBeUpgraded( nEntityIndex: number ): number;
    CanBeExecuted( nEntityIndex: number ): number;
    GetAbilityDamage( nEntityIndex: number ): number;
    GetAbilityDamageType( nEntityIndex: number ): number;
    GetAbilityTargetFlags( nEntityIndex: number ): number;
    GetAbilityTargetTeam( nEntityIndex: number ): number;
    GetAbilityTargetType( nEntityIndex: number ): number;
    GetAbilityType( nEntityIndex: number ): number;
    GetBehavior( nEntityIndex: number ): number;
    GetCastRange( nEntityIndex: number ): number;
    GetChannelledManaCostPerSecond( nEntityIndex: number ): number;
    GetCurrentCharges( nEntityIndex: number ): number;
    GetCurrentAbilityCharges( nEntityIndex: number ): number;
    GetEffectiveLevel( nEntityIndex: number ): number;
    GetHeroLevelRequiredToUpgrade( nEntityIndex: number ): number;
    GetLevel( nEntityIndex: number ): number;
    GetManaCost( nEntityIndex: number ): number;
    GetMaxLevel( nEntityIndex: number ): number;
    AttemptToUpgrade( nEntityIndex: number ): boolean;
    CanLearn( nEntityIndex: number ): boolean;
    GetAutoCastState( nEntityIndex: number ): boolean;
    GetToggleState( nEntityIndex: number ): boolean;
    HasScepterUpgradeTooltip( nEntityIndex: number ): boolean;
    IsActivated( nEntityIndex: number ): boolean;
    IsActivatedChanging( nEntityIndex: number ): boolean;
    IsAttributeBonus( nEntityIndex: number ): boolean;
    IsAutocast( nEntityIndex: number ): boolean;
    IsCooldownReady( nEntityIndex: number ): boolean;
    IsDisplayedAbility( nEntityIndex: number ): boolean;
    IsHidden( nEntityIndex: number ): boolean;
    IsHiddenWhenStolen( nEntityIndex: number ): boolean;
    IsInAbilityPhase( nEntityIndex: number ): boolean;
    IsItem( nEntityIndex: number ): boolean;
    IsMarkedAsDirty( nEntityIndex: number ): boolean;
    IsMuted( nEntityIndex: number ): boolean;
    IsOnCastbar( nEntityIndex: number ): boolean;
    IsOnLearnbar( nEntityIndex: number ): boolean;
    IsOwnersGoldEnough( nEntityIndex: number ): boolean;
    IsOwnersGoldEnoughForUpgrade( nEntityIndex: number ): boolean;
    IsOwnersManaEnough( nEntityIndex: number ): boolean;
    IsPassive( nEntityIndex: number ): boolean;
    IsRecipe( nEntityIndex: number ): boolean;
    IsSharedWithTeammates( nEntityIndex: number ): boolean;
    IsStealable( nEntityIndex: number ): boolean;
    IsStolen( nEntityIndex: number ): boolean;
    IsToggle( nEntityIndex: number ): boolean;
    UsesAbilityCharges( nEntityIndex: number ): boolean;
    GetAOERadius( nEntityIndex: number ): number;
    GetBackswingTime( nEntityIndex: number ): number;
    GetCastPoint( nEntityIndex: number ): number;
    GetChannelStartTime( nEntityIndex: number ): number;
    GetChannelTime( nEntityIndex: number ): number;
    GetCooldown( nEntityIndex: number ): number;
    GetCooldownLength( nEntityIndex: number ): number;
    GetCooldownTime( nEntityIndex: number ): number;
    GetCooldownTimeRemaining( nEntityIndex: number ): number;
    GetDuration( nEntityIndex: number ): number;
    GetUpgradeBlend( nEntityIndex: number ): number;
    GetAbilityChargeRestoreTimeRemaining( nEntityIndex: number ): number;
    /** Get the local player's current active ability. (Pre-cast targetting state.) */
    GetLocalPlayerActiveAbility(): number;
    GetCaster( nAbilityIndex: number ): number;
    GetCustomValueFor( nAbilityIndex: number, pszAbilityVarName: string ): number;
    GetLevelSpecialValueFor( nAbilityIndex: number, szName: string, nLevel: number ): number;
    GetSpecialValueFor( nAbilityIndex: number, szName: string ): number;
    IsCosmetic( nAbilityIndex: number, nTargetEntityIndex: number ): boolean;
    /** Attempt to execute the specified ability (Equivalent to clicking the ability in the HUD action bar) */
    ExecuteAbility( nAbilityEntIndex: number, nCasterEntIndex: number, bIsQuickCast: boolean ): boolean;
    /** Get the max ability charge count. */
    GetMaxAbilityCharges( nAbilityEntIndex: number ): number;
    /** Attempt to double-tap (self-cast) the specified ability (Equivalent to double-clicking the ability in the HUD action bar) */
    CreateDoubleTapCastOrder( nAbilityEntIndex: number, nCasterEntIndex: number ): void;
    /** Ping the specified ability (Equivalent to alt-clicking the ability in the HUD action bar) */
    PingAbility( nAbilityIndex: number ): void;
    /** Returns the keybind (as a string) for the specified ability. */
    GetKeybind( nAbilityEntIndex: number ): string;
}
interface CScriptBindingPR_Items
{
    ShouldDisplayCharges( nEntityIndex: number ): boolean;
    AlwaysDisplayCharges( nEntityIndex: number ): boolean;
    ShowSecondaryCharges( nEntityIndex: number ): boolean;
    CanBeSoldByLocalPlayer( nEntityIndex: number ): boolean;
    CanDoubleTapCast( nEntityIndex: number ): boolean;
    ForceHideCharges( nEntityIndex: number ): boolean;
    IsAlertableItem( nEntityIndex: number ): boolean;
    IsCastOnPickup( nEntityIndex: number ): boolean;
    IsDisassemblable( nEntityIndex: number ): boolean;
    IsDroppable( nEntityIndex: number ): boolean;
    IsInnatelyDisassemblable( nEntityIndex: number ): boolean;
    IsKillable( nEntityIndex: number ): boolean;
    IsMuted( nEntityIndex: number ): boolean;
    IsPermanent( nEntityIndex: number ): boolean;
    IsPurchasable( nEntityIndex: number ): boolean;
    IsRecipe( nEntityIndex: number ): boolean;
    IsRecipeGenerated( nEntityIndex: number ): boolean;
    IsSellable( nEntityIndex: number ): boolean;
    IsStackable( nEntityIndex: number ): boolean;
    ProRatesChargesWhenSelling( nEntityIndex: number ): boolean;
    RequiresCharges( nEntityIndex: number ): boolean;
    CanBeExecuted( nEntityIndex: number ): number;
    GetCost( nEntityIndex: number ): number;
    GetCurrentCharges( nEntityIndex: number ): number;
    GetSecondaryCharges( nEntityIndex: number ): number;
    GetDisplayedCharges( nEntityIndex: number ): number;
    GetInitialCharges( nEntityIndex: number ): number;
    GetItemColor( nEntityIndex: number ): number;
    GetShareability( nEntityIndex: number ): number;
    GetAbilityTextureSF( nEntityIndex: number ): string;
    GetAssembledTime( nEntityIndex: number ): number;
    GetPurchaseTime( nEntityIndex: number ): number;
    GetPurchaser( nItemID: number ): number;
    /** Attempt to have the local player disassemble the specified item. Returns false if the order wasn't issued. */
    LocalPlayerDisassembleItem( nItem: number ): boolean;
    /** Attempt to have the local player drop the specified item from its stash. Returns false if the order wasn't issued. */
    LocalPlayerDropItemFromStash( nItem: number ): boolean;
    /** Attempt to have the local player alert allies about the specified item. Returns false if the order wasn't issued. */
    LocalPlayerItemAlertAllies( nItem: number ): boolean;
    /** Attempt to have the local player move the specified item to its stash. Returns false if the order wasn't issued. */
    LocalPlayerMoveItemToStash( nItem: number ): boolean;
    /** Attempt to have the local player sell the specified item. Returns false if the order wasn't issued. */
    LocalPlayerSellItem( nItem: number ): boolean;
}
interface CScriptBindingPR_Game
{
    Time(): number;
    GetGameTime(): number;
    GetGameFrameTime(): number;
    GetDOTATime( bIncludePreGame: boolean, bIncludeNegativeTime: boolean ): number;
    IsGamePaused(): boolean;
    IsDayTime(): boolean;
    IsInToolsMode(): boolean;
    IsInBanPhase(): boolean;
    /** Return the team id of the winning team. */
    GetGameWinner(): number;
    GetStateTransitionTime(): number;
    /** Get the difficulty setting of the game. */
    GetCustomGameDifficulty(): number;
    /** Returns true if the user has enabled flipped HUD */
    IsHUDFlipped(): boolean;
    /** Returns the width of the display. */
    GetScreenWidth(): number;
    /** Returns the height of the display. */
    GetScreenHeight(): number;
    /** Converts the specified x,y,z world co-ordinate into an x screen coordinate. Returns -1 if behind the camera */
    WorldToScreenX( x: number, y: number, z: number ): number;
    /** Converts the specified x,y,z world co-ordinate into a y screen coordinate. Returns -1 if behind the camera */
    WorldToScreenY( x: number, y: number, z: number ): number;
    /** Converts the specified x, y screen coordinates into a x, y, z world coordinates. */
    ScreenXYToWorld( nX: number, nY: number );
    /** Returns the keybind (as a string) for the requested ability slot. */
    GetKeybindForAbility( iSlot: number ): string;
    /** Returns the keybind (as a string) for the requested inventory slot. */
    GetKeybindForInventorySlot( iSlot: number ): string;
    /** Returns the keybind (as a string). */
    GetKeybindForCommand( nCommand: number ): string;
    /** Create a new keybind. */
    CreateCustomKeyBind( pszKey: string, pszCommand: string ): void;
    GetNianFightTimeLeft(): number;
    Diretide2020ShouldShowGameInfo(): boolean;
    Diretide2020SetShowGameInfo( bShowGameInfo: boolean ): void;
    Diretide2020GetGameplayTipNumber(): number;
    Diretide2020SetGameplayTipNumber( nGameplayTipNumber: number ): void;
    NemesticeGetGameplayTipNumber(): number;
    NemesticeSetGameplayTipNumber( nGameplayTipNumber: number ): void;
    NemesticeShouldShowGameInfo(): boolean;
    NemesticeSetShowGameInfo( bShowGameInfo: boolean ): void;
    Winter2022ShouldShowGameInfo(): boolean;
    Winter2022SetShowGameInfo( bShowGameInfo: boolean ): void;
    Winter2022GetGameplayTipNumber(): number;
    Winter2022SetGameplayTipNumber( nGameplayTipNumber: number ): void;
    ForceCustomUILoad(): void;
    CutToDefaultCamera(): void;
    PlayDataDrivenCamera( pszCameraName: string ): number;
    GetState(): number;
    GameStateIs( nState: number ): boolean;
    GameStateIsBefore( nState: number ): boolean;
    GameStateIsAfter( nState: number ): boolean;
    AddCommand( pszCommandName: string, callback, pszDescription: string, nFlags: number ): void;
    GetJoyFocusPanel();
    SetJoyFocusPanel( pPanelArg ): void;
    PushJoyFocusPanel( pPanelArg ): void;
    PopJoyFocusPanel(): void;
    GetLocalPlayerID(): number;
    /** Assign the local player to the specified team */
    PlayerJoinTeam( nTeamID: number ): void;
    /** Assign the currently unassigned players to teams */
    AutoAssignPlayersToTeams(): void;
    /** Shuffle the team assignments of all of the players currently assigned to a team. */
    ShufflePlayerTeamAssignments(): void;
    /** Set the remaining seconds in team setup before the game starts. -1 to stop the countdown timer */
    SetRemainingSetupTime( flSeconds: number ): void;
    /** Set the amount of time in seconds that will be set as the remaining time when all players are assigned to a team. */
    SetAutoLaunchDelay( flSeconds: number ): void;
    /** Enable or disable automatically starting the game once all players are assigned to a team */
    SetAutoLaunchEnabled( bEnable: boolean ): void;
    /** Return true of false indicating if automatically starting the game is enabled. */
    GetAutoLaunchEnabled(): boolean;
    /** Lock the team selection preventing players from swiching teams. */
    SetTeamSelectionLocked( bLockTeams: boolean ): void;
    /** Returns true or false to indicate if team selection is locked */
    GetTeamSelectionLocked(): boolean;
    /** Get all team IDs */
    GetAllTeamIDs();
    /** Get all player IDs */
    GetAllPlayerIDs();
    /** Get unassigned player IDs */
    GetUnassignedPlayerIDs();
    /** Get info about the player hero ultimate ability */
    GetPlayerUltimateStateOrTime( nPlayerID: number ): number;
    /** Whether the local player has muted text and voice chat for the specified player id */
    IsPlayerMuted( nPlayerID: number ): boolean;
    /** Set whether the local player has muted text and voice chat for the specified player id */
    SetPlayerMuted( nPlayerID: number, bMuted: boolean ): void;
    /** Whether the local player has muted voice chat for the specified player id */
    IsPlayerMutedVoice( nPlayerID: number ): boolean;
    /** Set whether the local player has muted voice chat for the specified player id */
    SetPlayerMutedVoice( nPlayerID: number, bMutedVoice: boolean ): void;
    /** Whether the local player has muted text chat for the specified player id */
    IsPlayerMutedText( nPlayerID: number ): boolean;
    /** Set whether the local player has muted text chat for the specified player id */
    SetPlayerMutedText( nPlayerID: number, bMutedText: boolean ): void;
    /** Get detailed information for the given team */
    GetTeamDetails( nTeam: number );
    /** Get details for the local player */
    GetLocalPlayerInfo();
    /** Get info about the player items. */
    GetPlayerItems( nPlayerID: number );
    /** Get info about the given player */
    GetPlayerInfo( nPlayerID: number );
    /** Get player IDs for the given team */
    GetPlayerIDsOnTeam( nTeam: number );
    ServerCmd( pMsg: string ): void;
    SetDotaRefractHeroes( bEnabled: boolean ): void;
    FinishGame(): void;
    LeaveCurrentGame(): void;
    Disconnect(): void;
    FindEventMatch(): void;
    SlideOutEventGamePlayButton(): void;
    /** Emit a sound for the local player. Returns an integer handle that can be passed to StopSound. (Returns 0 on failure.) */
    EmitSound( pSoundEventName: string ): number;
    /** Stop a current playing sound on the local player. Takes handle from a call to EmitSound. */
    StopSound( nHandle: number ): void;
    /** Ask whether the in game shop is open. */
    IsShopOpen(): boolean;
    /** Set custom shop context. */
    SetCustomShopEntityString( pszCustomShopEntityString: string ): void;
    /** Get the bool value of the specific convar. Asserts if invalid and returns false */
    GetConvarBool( cvar: string ): boolean;
    /** Get the int value of the specific convar. Asserts if invalid and returns 0 */
    GetConvarInt( cvar: string ): number;
    /** Get the float value of the specific convar. Asserts if invalid and returns 0.f */
    GetConvarFloat( cvar: string ): number;
    /** Return information about the current map. */
    GetMapInfo();
    /** Orders from the local player - takes a single arguments object that supports: dotaunitorder_t OrderType, ent_index TargetIndex, vector Position, ent_index AbilityIndex, OrderIssuer_t OrderIssuer, ent_index UnitIndex, OrderQueueBehavior_t QueueBehavior, bool ShowEffects. */
    PrepareUnitOrders( args ): void;
    /** Order a unit to drop the specified item at the current cursor location. */
    DropItemAtCursor( nControlledUnitEnt: number, nItemEnt: number ): void;
    /** Calculate 2D length. */
    Length2D( vec1, vec2 ): number;
    /** Returns normalized vector. */
    Normalized( vec );
    EnterAbilityLearnMode(): void;
    EndAbilityLearnMode(): void;
    IsInAbilityLearnMode(): boolean;
}
interface CDOTA_PanoramaScript_GameUI
{
    /** Control whether the default UI is enabled */
    SetDefaultUIEnabled( nElementType: number, bVisible: boolean ): void;
    /** Save persistent data used by an event game */
    SavePersistentEventGameData( val ): void;
    /** Load persistent data used by an event game */
    LoadPersistentEventGameData( args ): void;
    /** Get the current UI configuration */
    CustomUIConfig( args ): void;
    /** Create a minimap ping at the given location */
    PingMinimapAtLocation( vec3 ): void;
    /** Install a mouse input filter */
    SetMouseCallback( callbackFn ): void;
    /** Query to check if Tips are available for the local player */
    AreTipsAvailable(): boolean;
    /** Query to see if the local player can tip a specific player */
    IsPlayerTippable( iPlayerID: number ): boolean;
    /** Tip a player */
    TipPlayer( iPlayerID: number ): void;
    EnableAliMode( bEnable: boolean, nPort: number, offsetVal, flScale: number ): void;
    /** Get the current mouse position. */
    GetCursorPosition( args ): void;
    /** Return the entity index of the entity under the given screen position. */
    FindScreenEntities( args ): void;
    /** Get the world position of the screen position, or null if the cursor is out of the world. */
    GetScreenWorldPosition( args ): void;
    /** Install a mouse input filter */
    WasMousePressed( nButtonNum: number ): boolean;
    /** Install a mouse input filter */
    WasMouseDoublePressed( nButtonNum: number ): boolean;
    /** Install a mouse input filter */
    IsMouseDown( nButtonNum: number ): boolean;
    /** Is the shift button pressed? */
    IsShiftDown(): boolean;
    /** Is the alt button pressed? */
    IsAltDown(): boolean;
    /** Is the control button pressed? */
    IsControlDown(): boolean;
    /** Get the current UI click interaction mode. */
    GetClickBehaviors(): number;
    /** Select a unit, adding it to the group or replacing the current selection. */
    SelectUnit( nEntityIndex: number, bAddToGroup: boolean ): void;
    /** Get the current look at position. */
    GetCameraLookAtPosition();
    /** Get the current camera position. */
    GetCameraPosition();
    /** Get the current look at position height offset. */
    GetCameraLookAtPositionHeightOffset(): number;
    /** Set the minimum camera pitch angle. */
    SetCameraPitchMin( flPitchMin: number ): void;
    /** Set the maximum camera pitch angle. */
    SetCameraPitchMax( flPitchMax: number ): void;
    /** Set the camera's yaw. */
    SetCameraYaw( flCameraYaw: number ): void;
    /** Get the camera's yaw. */
    GetCameraYaw(): number;
    /** Offset the camera's look at point. */
    SetCameraLookAtPositionHeightOffset( flCameraLookAtHeightOffset: number ): void;
    /** Set the camera from a lateral position. */
    SetCameraPositionFromLateralLookAtPosition( x: number, y: number ): void;
    /** Set whether the camera should automatically adjust to average terrain height. */
    SetCameraTerrainAdjustmentEnabled( bEnabled: boolean ): void;
    /** Set the camera distance from the look at point. */
    SetCameraDistance( flDistance: number ): void;
    /** Set the gap between the bottom of the screen and the game rendering viewport. (Value expressed as pixels in a normalized 1024x768 viewport.) */
    SetRenderBottomInsetOverride( nInset: number ): void;
    /** Set the gap between the top of the screen and the game rendering viewport. (Value expressed as pixels in a normalized 1024x768 viewport.) */
    SetRenderTopInsetOverride( nInset: number ): void;
    /** Set the camera target for the local player, or -1 to clear. */
    SetCameraTarget( nTargetEntIndex: number ): void;
    /** Set the camera target as position for the local player over specified lerp. */
    SetCameraTargetPosition( vec3, flLerp: number ): void;
    /** Moves the camera to an entity, but doesn't lock the camera on that entity. */
    MoveCameraToEntity( nTargetEntIndex: number ): void;
    /** Converts the specified x,y,z world co-ordinate into an x,y screen coordinate. Will clamp position to always be in front of camera.  Position returned as 0->1.0 */
    WorldToScreenXYClamped( vec3 );
    /** Get the current players scoreboard score for the specified zone. */
    GetPlayerScoreboardScore( pszScoreboardName: string ): number;
    /** Send a custom client side error message with passed string and soundevent. */
    SendCustomHUDError( pszErrorText: string, pszErrorSound: string ): void;
    /** Given a passed ability, replace the special value variables in the passed localized text. */
    ReplaceDOTAAbilitySpecialValues( args ): void;
    /** Display a custom contextual tip (wizard tip) with specific loc string and duration */
    DisplayCustomContextualTip( args ): void;
    /** Set the text of a passed label for a DOTA Talent using ability values. */
    SetupDOTATalentNameLabel( args ): void;
    /** Returns true if the passed ability is a talent. */
    IsAbilityDOTATalent( pszAbilityName: string ): boolean;
    /** Returns the localization token to use for a particular unit, given the unit's name */
    GetUnitLocToken( pszUnitName: string ): string;
    /** Get the localized version of a unit's name */
    GetUnitNameLocalized( pszUnitName: string ): string;
    /** Creates a localized version of the number */
    ConstructNumberString( args ): void;
}
interface CDOTA_PanoramaScript_Particles
{
    /** Create a particle system */
    CreateParticle( pParticleName: string, nAttachType: number, nEntityToAttach: number ): number;
    /** Release a particle system */
    ReleaseParticleIndex( iIndex: number ): void;
    /** Destroy a particle system */
    DestroyParticleEffect( iIndex: number, bDestroyImmediately: boolean ): void;
    /** Set a control point on a particle system */
    SetParticleControl( iIndex: number, iPoint: number, vPosVal ): void;
    /** [OBSOLETE - Use SetParticleControlTransformForward] Set the orientation on a control point on a particle system */
    SetParticleControlForward( iIndex: number, iPoint: number, vForwardVal ): void;
    /** Set the position and orientation on a control point on a particle system */
    SetParticleControlTransform( iIndex: number, iPoint: number, vOriginVal, vAnglesVal ): void;
    /** Set the position and orientation (derived from a forward direction) on a control point on a particle system */
    SetParticleControlTransformForward( iIndex: number, iPoint: number, vOriginVal, vForwardVal ): void;
    SetParticleAlwaysSimulate( iIndex: number ): void;
    /** Set a control point to track an entity on a particle system */
    SetParticleControlEnt( iIndex: number, iPoint: number, iEntIndex: number, iAttachType: number, pszAttachName: string, vecFallbackPositionVal, bIncludeWearables: boolean ): void;
}
interface CDOTA_PanoramaScript_EventData
{
    /** Get the score of an EventAction */
    GetEventActionScore( unEventID: number, unActionID: number ): number;
    /** Get a periodic resource value used */
    GetPeriodicResourceUsed( unPeriodicResourceID: number ): number;
    /** Get a periodic resource value max */
    GetPeriodicResourceMax( unPeriodicResourceID: number ): number;
    /** Is this the first time we've launched this season? */
    IsFirstRunThisEvent(): boolean;
}
interface CDOTA_PanoramaScript_LocalInventory
{
    /** Does the player have an inventory item of a given item definition index? */
    HasItemByDefinition( nDefIndex: number ): boolean;
}
interface $
{
    /** Log a message */
    Msg( _arg_1 ): void;
    /** Trigger an assert */
    AssertHelper( _arg_1 ): void;
    /** Log a warning message to specified channel */
    Warning( _arg_1 ): void;
    /** Dispatch an event */
    DispatchEvent( _arg_1 ): void;
    /** Dispatch an event to occur later */
    DispatchEventAsync( _arg_1 ): void;
    /** Register an event handler */
    RegisterEventHandler( _arg_1 ): void;
    /** Register a handler for an event that is not otherwise handled */
    RegisterForUnhandledEvent( _arg_1 ): void;
    /** Remove an unhandled event handler */
    UnregisterForUnhandledEvent( _arg_1 ): void;
    /** Find an element */
    FindChildInContext( _arg_1 ): void;
    /** Make a web request (disabled) */
    AsyncWebRequest( _arg_1 ): void;
    /** Create a new panel */
    CreatePanel( _arg_1 ): void;
    /** DEPRECATED: Use $.CreatePanel which has the same signature and supports properties. */
    CreatePanelWithProperties( _arg_1 ): void;
    /** Localize a string. Optionally accepts Quantity, Precision, and Panel arguments. */
    Localize( _arg_1 ): void;
    /** DEPRECATED: Use $.Localize which has the same signature and supports pluralization. */
    LocalizePlural( _arg_1 ): void;
    /** Get the current language */
    Language( _arg_1 ): void;
    /** Schedule a function to be called later */
    Schedule( _arg_1 ): void;
    /** Cancels a scheduled function */
    CancelScheduled( _arg_1 ): void;
    /** Gets the time this frame started, in seconds since panorama was initialized */
    FrameTime( _arg_1 ): void;
    /** Get the current panel context */
    GetContextPanel( _arg_1 ): void;
    /** Register a key binding */
    RegisterKeyBind( _arg_1 ): void;
    /** Call a function on each given item */
    Each( _arg_1 ): void;
    /** Call during JS startup code to check if script is being reloaded */
    DbgIsReloadingScript( _arg_1 ): void;
    /** Convert a string to HTML-safe */
    HTMLEscape( _arg_1 ): void;
    /** Create a logging channel */
    LogChannel( _arg_1 ): void;
    /** Return true if a file exists.  Path will usually start with 'file://{images}' */
    BImageFileExists( _arg_1 ): void;
}
interface DOTAHeroModelOverlay
{
    visible( _arg_1: boolean ): boolean;
    enabled( _arg_1: boolean ): boolean;
    checked( _arg_1: boolean ): boolean;
    defaultfocus( _arg_1: string ): string;
    inputnamespace( _arg_1: string ): string;
    hittest( _arg_1: boolean ): boolean;
    hittestchildren( _arg_1: boolean ): boolean;
    tabindex( _arg_1: number ): number;
    selectionpos_x( _arg_1: number ): number;
    selectionpos_y( _arg_1: number ): number;
    type(): string;
    id(): string;
    layoutfile();
    contentwidth(): number;
    contentheight(): number;
    desiredlayoutwidth(): number;
    desiredlayoutheight(): number;
    actuallayoutwidth(): number;
    actuallayoutheight(): number;
    actualxoffset(): number;
    actualyoffset(): number;
    scrolloffset_y(): number;
    scrolloffset_x(): number;
    actualuiscale_y(): number;
    actualuiscale_x(): number;
    style();
    AddClass( _arg_1: string ): void;
    RemoveClass( _arg_1: string ): void;
    BHasClass( _arg_1: string ): boolean;
    BAscendantHasClass( _arg_1: string ): boolean;
    SetHasClass( _arg_1: string, _arg_2: boolean ): void;
    ToggleClass( _arg_1: string ): void;
    SwitchClass( _arg_1: string, _arg_2: string ): void;
    TriggerClass( _arg_1: string ): void;
    ClearPanelEvent( _arg_1: string ): void;
    SetDraggable( _arg_1: boolean ): void;
    IsDraggable(): boolean;
    IsSizeValid(): boolean;
    GetChildCount(): number;
    GetChild( _arg_1: number );
    GetChildIndex( _arg_1 ): number;
    Children();
    FindChildrenWithClassTraverse( _arg_1: string );
    GetParent();
    SetParent( _arg_1 ): void;
    FindChild( _arg_1: string );
    FindChildTraverse( _arg_1: string );
    FindChildInLayoutFile( _arg_1: string );
    FindPanelInThisOrParentLayoutFile( _arg_1: string );
    FindAncestor( _arg_1: string );
    RemoveAndDeleteChildren(): void;
    MoveChildBefore( _arg_1, _arg_2 ): void;
    MoveChildAfter( _arg_1, _arg_2 ): void;
    GetPositionWithinWindow();
    GetPositionWithinAncestor( _arg_1 );
    GetPosition( _arg_1: boolean );
    ApplyStyles( _arg_1: boolean ): void;
    ClearPropertyFromCode( _arg_1 ): void;
    DeleteAsync( _arg_1: number ): void;
    BIsTransparent(): boolean;
    BAcceptsInput(): boolean;
    BAcceptsFocus(): boolean;
    SetFocus(): boolean;
    UpdateFocusInContext(): boolean;
    BHasHoverStyle(): boolean;
    SetAcceptsInput( _arg_1: boolean ): void;
    SetAcceptsFocus( _arg_1: boolean ): void;
    SetDisableFocusOnMouseDown( _arg_1: boolean ): void;
    BHasKeyFocus(): boolean;
    SetScrollParentToFitWhenFocused( _arg_1: boolean ): void;
    BScrollParentToFitWhenFocused(): boolean;
    IsSelected(): boolean;
    BHasDescendantKeyFocus(): boolean;
    BLoadLayout( _arg_1: string, _arg_2: boolean, _arg_3: boolean ): boolean;
    BLoadLayoutSnippet( _arg_1: string ): boolean;
    BHasLayoutSnippet( _arg_1: string ): boolean;
    BGetSnippetNames( _arg_1 ): void;
    SetTopOfInputContext( _arg_1: boolean ): void;
    SetDialogVariable( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableInt( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableTime( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableLocString( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableLocStringNested( _arg_1: string, _arg_2: string ): void;
    SetDialogVariablePluralLocStringInt( _arg_1: string, _arg_2: string, _arg_3: number ): void;
    ScrollToTop(): void;
    ScrollToBottom(): void;
    ScrollToLeftEdge(): void;
    ScrollToRightEdge(): void;
    ScrollParentToMakePanelFit( _arg_1, _arg_2: boolean ): void;
    ScrollToFitRegion( _arg_1: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5, _arg_6: boolean, _arg_7: boolean ): void;
    BCanSeeInParentScroll(): boolean;
    GetAttributeInt( _arg_1: string, _arg_2: number ): number;
    GetAttributeString( _arg_1: string, _arg_2: string ): string;
    GetAttributeUInt32( _arg_1: string, _arg_2: number ): number;
    SetAttributeInt( _arg_1: string, _arg_2: number ): void;
    SetAttributeString( _arg_1: string, _arg_2: string ): void;
    SetAttributeUInt32( _arg_1: string, _arg_2: number ): void;
    SetInputNamespace( _arg_1: string ): void;
    RegisterForReadyEvents( _arg_1: boolean ): void;
    BReadyForDisplay(): boolean;
    SetReadyForDisplay( _arg_1: boolean ): void;
    SetPositionInPixels( _arg_1: number, _arg_2: number, _arg_3: number ): void;
    Data( _arg_1 ): void;
//     debug.description( _arg_1 ): void;
    SetSendScrollPositionChangedEvents( _arg_1: boolean ): void;
    SetPanelEvent( _arg_1 ): void;
    RunScriptInPanelContext( _arg_1 ): void;
    rememberchildfocus( _arg_1: boolean ): boolean;
    paneltype(): string;
}
interface DOTAPlay
{
    visible( _arg_1: boolean ): boolean;
    enabled( _arg_1: boolean ): boolean;
    checked( _arg_1: boolean ): boolean;
    defaultfocus( _arg_1: string ): string;
    inputnamespace( _arg_1: string ): string;
    hittest( _arg_1: boolean ): boolean;
    hittestchildren( _arg_1: boolean ): boolean;
    tabindex( _arg_1: number ): number;
    selectionpos_x( _arg_1: number ): number;
    selectionpos_y( _arg_1: number ): number;
    type(): string;
    id(): string;
    layoutfile();
    contentwidth(): number;
    contentheight(): number;
    desiredlayoutwidth(): number;
    desiredlayoutheight(): number;
    actuallayoutwidth(): number;
    actuallayoutheight(): number;
    actualxoffset(): number;
    actualyoffset(): number;
    scrolloffset_y(): number;
    scrolloffset_x(): number;
    actualuiscale_y(): number;
    actualuiscale_x(): number;
    style();
    AddClass( _arg_1: string ): void;
    RemoveClass( _arg_1: string ): void;
    BHasClass( _arg_1: string ): boolean;
    BAscendantHasClass( _arg_1: string ): boolean;
    SetHasClass( _arg_1: string, _arg_2: boolean ): void;
    ToggleClass( _arg_1: string ): void;
    SwitchClass( _arg_1: string, _arg_2: string ): void;
    TriggerClass( _arg_1: string ): void;
    ClearPanelEvent( _arg_1: string ): void;
    SetDraggable( _arg_1: boolean ): void;
    IsDraggable(): boolean;
    IsSizeValid(): boolean;
    GetChildCount(): number;
    GetChild( _arg_1: number );
    GetChildIndex( _arg_1 ): number;
    Children();
    FindChildrenWithClassTraverse( _arg_1: string );
    GetParent();
    SetParent( _arg_1 ): void;
    FindChild( _arg_1: string );
    FindChildTraverse( _arg_1: string );
    FindChildInLayoutFile( _arg_1: string );
    FindPanelInThisOrParentLayoutFile( _arg_1: string );
    FindAncestor( _arg_1: string );
    RemoveAndDeleteChildren(): void;
    MoveChildBefore( _arg_1, _arg_2 ): void;
    MoveChildAfter( _arg_1, _arg_2 ): void;
    GetPositionWithinWindow();
    GetPositionWithinAncestor( _arg_1 );
    GetPosition( _arg_1: boolean );
    ApplyStyles( _arg_1: boolean ): void;
    ClearPropertyFromCode( _arg_1 ): void;
    DeleteAsync( _arg_1: number ): void;
    BIsTransparent(): boolean;
    BAcceptsInput(): boolean;
    BAcceptsFocus(): boolean;
    SetFocus(): boolean;
    UpdateFocusInContext(): boolean;
    BHasHoverStyle(): boolean;
    SetAcceptsInput( _arg_1: boolean ): void;
    SetAcceptsFocus( _arg_1: boolean ): void;
    SetDisableFocusOnMouseDown( _arg_1: boolean ): void;
    BHasKeyFocus(): boolean;
    SetScrollParentToFitWhenFocused( _arg_1: boolean ): void;
    BScrollParentToFitWhenFocused(): boolean;
    IsSelected(): boolean;
    BHasDescendantKeyFocus(): boolean;
    BLoadLayout( _arg_1: string, _arg_2: boolean, _arg_3: boolean ): boolean;
    BLoadLayoutSnippet( _arg_1: string ): boolean;
    BHasLayoutSnippet( _arg_1: string ): boolean;
    BGetSnippetNames( _arg_1 ): void;
    SetTopOfInputContext( _arg_1: boolean ): void;
    SetDialogVariable( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableInt( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableTime( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableLocString( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableLocStringNested( _arg_1: string, _arg_2: string ): void;
    SetDialogVariablePluralLocStringInt( _arg_1: string, _arg_2: string, _arg_3: number ): void;
    ScrollToTop(): void;
    ScrollToBottom(): void;
    ScrollToLeftEdge(): void;
    ScrollToRightEdge(): void;
    ScrollParentToMakePanelFit( _arg_1, _arg_2: boolean ): void;
    ScrollToFitRegion( _arg_1: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5, _arg_6: boolean, _arg_7: boolean ): void;
    BCanSeeInParentScroll(): boolean;
    GetAttributeInt( _arg_1: string, _arg_2: number ): number;
    GetAttributeString( _arg_1: string, _arg_2: string ): string;
    GetAttributeUInt32( _arg_1: string, _arg_2: number ): number;
    SetAttributeInt( _arg_1: string, _arg_2: number ): void;
    SetAttributeString( _arg_1: string, _arg_2: string ): void;
    SetAttributeUInt32( _arg_1: string, _arg_2: number ): void;
    SetInputNamespace( _arg_1: string ): void;
    RegisterForReadyEvents( _arg_1: boolean ): void;
    BReadyForDisplay(): boolean;
    SetReadyForDisplay( _arg_1: boolean ): void;
    SetPositionInPixels( _arg_1: number, _arg_2: number, _arg_3: number ): void;
    Data( _arg_1 ): void;
//     debug.description( _arg_1 ): void;
    SetSendScrollPositionChangedEvents( _arg_1: boolean ): void;
    GetActiveFeaturedGamemode( _arg_1 ): void;
    GetFeaturedGamemodeProgress(): number;
    GetFeaturedGamemodeMax(): number;
    GetSelectedGameModes(): number;
    UpdateCasualGameModeCheckboxes(): void;
    SetPanelEvent( _arg_1 ): void;
    RunScriptInPanelContext( _arg_1 ): void;
    rememberchildfocus( _arg_1: boolean ): boolean;
    paneltype(): string;
}
interface Panel
{
    visible( _arg_1: boolean ): boolean;
    enabled( _arg_1: boolean ): boolean;
    checked( _arg_1: boolean ): boolean;
    defaultfocus( _arg_1: string ): string;
    inputnamespace( _arg_1: string ): string;
    hittest( _arg_1: boolean ): boolean;
    hittestchildren( _arg_1: boolean ): boolean;
    tabindex( _arg_1: number ): number;
    selectionpos_x( _arg_1: number ): number;
    selectionpos_y( _arg_1: number ): number;
    type(): string;
    id(): string;
    layoutfile();
    contentwidth(): number;
    contentheight(): number;
    desiredlayoutwidth(): number;
    desiredlayoutheight(): number;
    actuallayoutwidth(): number;
    actuallayoutheight(): number;
    actualxoffset(): number;
    actualyoffset(): number;
    scrolloffset_y(): number;
    scrolloffset_x(): number;
    actualuiscale_y(): number;
    actualuiscale_x(): number;
    style();
    AddClass( _arg_1: string ): void;
    RemoveClass( _arg_1: string ): void;
    BHasClass( _arg_1: string ): boolean;
    BAscendantHasClass( _arg_1: string ): boolean;
    SetHasClass( _arg_1: string, _arg_2: boolean ): void;
    ToggleClass( _arg_1: string ): void;
    SwitchClass( _arg_1: string, _arg_2: string ): void;
    TriggerClass( _arg_1: string ): void;
    ClearPanelEvent( _arg_1: string ): void;
    SetDraggable( _arg_1: boolean ): void;
    IsDraggable(): boolean;
    IsSizeValid(): boolean;
    GetChildCount(): number;
    GetChild( _arg_1: number );
    GetChildIndex( _arg_1 ): number;
    Children();
    FindChildrenWithClassTraverse( _arg_1: string );
    GetParent();
    SetParent( _arg_1 ): void;
    FindChild( _arg_1: string );
    FindChildTraverse( _arg_1: string );
    FindChildInLayoutFile( _arg_1: string );
    FindPanelInThisOrParentLayoutFile( _arg_1: string );
    FindAncestor( _arg_1: string );
    RemoveAndDeleteChildren(): void;
    MoveChildBefore( _arg_1, _arg_2 ): void;
    MoveChildAfter( _arg_1, _arg_2 ): void;
    GetPositionWithinWindow();
    GetPositionWithinAncestor( _arg_1 );
    GetPosition( _arg_1: boolean );
    ApplyStyles( _arg_1: boolean ): void;
    ClearPropertyFromCode( _arg_1 ): void;
    DeleteAsync( _arg_1: number ): void;
    BIsTransparent(): boolean;
    BAcceptsInput(): boolean;
    BAcceptsFocus(): boolean;
    SetFocus(): boolean;
    UpdateFocusInContext(): boolean;
    BHasHoverStyle(): boolean;
    SetAcceptsInput( _arg_1: boolean ): void;
    SetAcceptsFocus( _arg_1: boolean ): void;
    SetDisableFocusOnMouseDown( _arg_1: boolean ): void;
    BHasKeyFocus(): boolean;
    SetScrollParentToFitWhenFocused( _arg_1: boolean ): void;
    BScrollParentToFitWhenFocused(): boolean;
    IsSelected(): boolean;
    BHasDescendantKeyFocus(): boolean;
    BLoadLayout( _arg_1: string, _arg_2: boolean, _arg_3: boolean ): boolean;
    BLoadLayoutSnippet( _arg_1: string ): boolean;
    BHasLayoutSnippet( _arg_1: string ): boolean;
    BGetSnippetNames( _arg_1 ): void;
    SetTopOfInputContext( _arg_1: boolean ): void;
    SetDialogVariable( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableInt( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableTime( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableLocString( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableLocStringNested( _arg_1: string, _arg_2: string ): void;
    SetDialogVariablePluralLocStringInt( _arg_1: string, _arg_2: string, _arg_3: number ): void;
    ScrollToTop(): void;
    ScrollToBottom(): void;
    ScrollToLeftEdge(): void;
    ScrollToRightEdge(): void;
    ScrollParentToMakePanelFit( _arg_1, _arg_2: boolean ): void;
    ScrollToFitRegion( _arg_1: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5, _arg_6: boolean, _arg_7: boolean ): void;
    BCanSeeInParentScroll(): boolean;
    GetAttributeInt( _arg_1: string, _arg_2: number ): number;
    GetAttributeString( _arg_1: string, _arg_2: string ): string;
    GetAttributeUInt32( _arg_1: string, _arg_2: number ): number;
    SetAttributeInt( _arg_1: string, _arg_2: number ): void;
    SetAttributeString( _arg_1: string, _arg_2: string ): void;
    SetAttributeUInt32( _arg_1: string, _arg_2: number ): void;
    SetInputNamespace( _arg_1: string ): void;
    RegisterForReadyEvents( _arg_1: boolean ): void;
    BReadyForDisplay(): boolean;
    SetReadyForDisplay( _arg_1: boolean ): void;
    SetPositionInPixels( _arg_1: number, _arg_2: number, _arg_3: number ): void;
    Data( _arg_1 ): void;
//     debug.description( _arg_1 ): void;
    SetSendScrollPositionChangedEvents( _arg_1: boolean ): void;
    SetPanelEvent( _arg_1 ): void;
    RunScriptInPanelContext( _arg_1 ): void;
    rememberchildfocus( _arg_1: boolean ): boolean;
    paneltype(): string;
}
interface Label
{
    visible( _arg_1: boolean ): boolean;
    enabled( _arg_1: boolean ): boolean;
    checked( _arg_1: boolean ): boolean;
    defaultfocus( _arg_1: string ): string;
    inputnamespace( _arg_1: string ): string;
    hittest( _arg_1: boolean ): boolean;
    hittestchildren( _arg_1: boolean ): boolean;
    tabindex( _arg_1: number ): number;
    selectionpos_x( _arg_1: number ): number;
    selectionpos_y( _arg_1: number ): number;
    type(): string;
    id(): string;
    layoutfile();
    contentwidth(): number;
    contentheight(): number;
    desiredlayoutwidth(): number;
    desiredlayoutheight(): number;
    actuallayoutwidth(): number;
    actuallayoutheight(): number;
    actualxoffset(): number;
    actualyoffset(): number;
    scrolloffset_y(): number;
    scrolloffset_x(): number;
    actualuiscale_y(): number;
    actualuiscale_x(): number;
    style();
    AddClass( _arg_1: string ): void;
    RemoveClass( _arg_1: string ): void;
    BHasClass( _arg_1: string ): boolean;
    BAscendantHasClass( _arg_1: string ): boolean;
    SetHasClass( _arg_1: string, _arg_2: boolean ): void;
    ToggleClass( _arg_1: string ): void;
    SwitchClass( _arg_1: string, _arg_2: string ): void;
    TriggerClass( _arg_1: string ): void;
    ClearPanelEvent( _arg_1: string ): void;
    SetDraggable( _arg_1: boolean ): void;
    IsDraggable(): boolean;
    IsSizeValid(): boolean;
    GetChildCount(): number;
    GetChild( _arg_1: number );
    GetChildIndex( _arg_1 ): number;
    Children();
    FindChildrenWithClassTraverse( _arg_1: string );
    GetParent();
    SetParent( _arg_1 ): void;
    FindChild( _arg_1: string );
    FindChildTraverse( _arg_1: string );
    FindChildInLayoutFile( _arg_1: string );
    FindPanelInThisOrParentLayoutFile( _arg_1: string );
    FindAncestor( _arg_1: string );
    RemoveAndDeleteChildren(): void;
    MoveChildBefore( _arg_1, _arg_2 ): void;
    MoveChildAfter( _arg_1, _arg_2 ): void;
    GetPositionWithinWindow();
    GetPositionWithinAncestor( _arg_1 );
    GetPosition( _arg_1: boolean );
    ApplyStyles( _arg_1: boolean ): void;
    ClearPropertyFromCode( _arg_1 ): void;
    DeleteAsync( _arg_1: number ): void;
    BIsTransparent(): boolean;
    BAcceptsInput(): boolean;
    BAcceptsFocus(): boolean;
    SetFocus(): boolean;
    UpdateFocusInContext(): boolean;
    BHasHoverStyle(): boolean;
    SetAcceptsInput( _arg_1: boolean ): void;
    SetAcceptsFocus( _arg_1: boolean ): void;
    SetDisableFocusOnMouseDown( _arg_1: boolean ): void;
    BHasKeyFocus(): boolean;
    SetScrollParentToFitWhenFocused( _arg_1: boolean ): void;
    BScrollParentToFitWhenFocused(): boolean;
    IsSelected(): boolean;
    BHasDescendantKeyFocus(): boolean;
    BLoadLayout( _arg_1: string, _arg_2: boolean, _arg_3: boolean ): boolean;
    BLoadLayoutSnippet( _arg_1: string ): boolean;
    BHasLayoutSnippet( _arg_1: string ): boolean;
    BGetSnippetNames( _arg_1 ): void;
    SetTopOfInputContext( _arg_1: boolean ): void;
    SetDialogVariable( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableInt( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableTime( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableLocString( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableLocStringNested( _arg_1: string, _arg_2: string ): void;
    SetDialogVariablePluralLocStringInt( _arg_1: string, _arg_2: string, _arg_3: number ): void;
    ScrollToTop(): void;
    ScrollToBottom(): void;
    ScrollToLeftEdge(): void;
    ScrollToRightEdge(): void;
    ScrollParentToMakePanelFit( _arg_1, _arg_2: boolean ): void;
    ScrollToFitRegion( _arg_1: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5, _arg_6: boolean, _arg_7: boolean ): void;
    BCanSeeInParentScroll(): boolean;
    GetAttributeInt( _arg_1: string, _arg_2: number ): number;
    GetAttributeString( _arg_1: string, _arg_2: string ): string;
    GetAttributeUInt32( _arg_1: string, _arg_2: number ): number;
    SetAttributeInt( _arg_1: string, _arg_2: number ): void;
    SetAttributeString( _arg_1: string, _arg_2: string ): void;
    SetAttributeUInt32( _arg_1: string, _arg_2: number ): void;
    SetInputNamespace( _arg_1: string ): void;
    RegisterForReadyEvents( _arg_1: boolean ): void;
    BReadyForDisplay(): boolean;
    SetReadyForDisplay( _arg_1: boolean ): void;
    SetPositionInPixels( _arg_1: number, _arg_2: number, _arg_3: number ): void;
    Data( _arg_1 ): void;
//     debug.description( _arg_1 ): void;
    SetSendScrollPositionChangedEvents( _arg_1: boolean ): void;
    text( _arg_1: string ): string;
    html( _arg_1: boolean ): boolean;
    SetLocString( _arg_1: string ): void;
    SetAlreadyLocalizedText( _arg_1: string ): void;
    SetPanelEvent( _arg_1 ): void;
    RunScriptInPanelContext( _arg_1 ): void;
    rememberchildfocus( _arg_1: boolean ): boolean;
    paneltype(): string;
}
interface ToggleButton
{
    visible( _arg_1: boolean ): boolean;
    enabled( _arg_1: boolean ): boolean;
    checked( _arg_1: boolean ): boolean;
    defaultfocus( _arg_1: string ): string;
    inputnamespace( _arg_1: string ): string;
    hittest( _arg_1: boolean ): boolean;
    hittestchildren( _arg_1: boolean ): boolean;
    tabindex( _arg_1: number ): number;
    selectionpos_x( _arg_1: number ): number;
    selectionpos_y( _arg_1: number ): number;
    type(): string;
    id(): string;
    layoutfile();
    contentwidth(): number;
    contentheight(): number;
    desiredlayoutwidth(): number;
    desiredlayoutheight(): number;
    actuallayoutwidth(): number;
    actuallayoutheight(): number;
    actualxoffset(): number;
    actualyoffset(): number;
    scrolloffset_y(): number;
    scrolloffset_x(): number;
    actualuiscale_y(): number;
    actualuiscale_x(): number;
    style();
    AddClass( _arg_1: string ): void;
    RemoveClass( _arg_1: string ): void;
    BHasClass( _arg_1: string ): boolean;
    BAscendantHasClass( _arg_1: string ): boolean;
    SetHasClass( _arg_1: string, _arg_2: boolean ): void;
    ToggleClass( _arg_1: string ): void;
    SwitchClass( _arg_1: string, _arg_2: string ): void;
    TriggerClass( _arg_1: string ): void;
    ClearPanelEvent( _arg_1: string ): void;
    SetDraggable( _arg_1: boolean ): void;
    IsDraggable(): boolean;
    IsSizeValid(): boolean;
    GetChildCount(): number;
    GetChild( _arg_1: number );
    GetChildIndex( _arg_1 ): number;
    Children();
    FindChildrenWithClassTraverse( _arg_1: string );
    GetParent();
    SetParent( _arg_1 ): void;
    FindChild( _arg_1: string );
    FindChildTraverse( _arg_1: string );
    FindChildInLayoutFile( _arg_1: string );
    FindPanelInThisOrParentLayoutFile( _arg_1: string );
    FindAncestor( _arg_1: string );
    RemoveAndDeleteChildren(): void;
    MoveChildBefore( _arg_1, _arg_2 ): void;
    MoveChildAfter( _arg_1, _arg_2 ): void;
    GetPositionWithinWindow();
    GetPositionWithinAncestor( _arg_1 );
    GetPosition( _arg_1: boolean );
    ApplyStyles( _arg_1: boolean ): void;
    ClearPropertyFromCode( _arg_1 ): void;
    DeleteAsync( _arg_1: number ): void;
    BIsTransparent(): boolean;
    BAcceptsInput(): boolean;
    BAcceptsFocus(): boolean;
    SetFocus(): boolean;
    UpdateFocusInContext(): boolean;
    BHasHoverStyle(): boolean;
    SetAcceptsInput( _arg_1: boolean ): void;
    SetAcceptsFocus( _arg_1: boolean ): void;
    SetDisableFocusOnMouseDown( _arg_1: boolean ): void;
    BHasKeyFocus(): boolean;
    SetScrollParentToFitWhenFocused( _arg_1: boolean ): void;
    BScrollParentToFitWhenFocused(): boolean;
    IsSelected(): boolean;
    BHasDescendantKeyFocus(): boolean;
    BLoadLayout( _arg_1: string, _arg_2: boolean, _arg_3: boolean ): boolean;
    BLoadLayoutSnippet( _arg_1: string ): boolean;
    BHasLayoutSnippet( _arg_1: string ): boolean;
    BGetSnippetNames( _arg_1 ): void;
    SetTopOfInputContext( _arg_1: boolean ): void;
    SetDialogVariable( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableInt( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableTime( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableLocString( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableLocStringNested( _arg_1: string, _arg_2: string ): void;
    SetDialogVariablePluralLocStringInt( _arg_1: string, _arg_2: string, _arg_3: number ): void;
    ScrollToTop(): void;
    ScrollToBottom(): void;
    ScrollToLeftEdge(): void;
    ScrollToRightEdge(): void;
    ScrollParentToMakePanelFit( _arg_1, _arg_2: boolean ): void;
    ScrollToFitRegion( _arg_1: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5, _arg_6: boolean, _arg_7: boolean ): void;
    BCanSeeInParentScroll(): boolean;
    GetAttributeInt( _arg_1: string, _arg_2: number ): number;
    GetAttributeString( _arg_1: string, _arg_2: string ): string;
    GetAttributeUInt32( _arg_1: string, _arg_2: number ): number;
    SetAttributeInt( _arg_1: string, _arg_2: number ): void;
    SetAttributeString( _arg_1: string, _arg_2: string ): void;
    SetAttributeUInt32( _arg_1: string, _arg_2: number ): void;
    SetInputNamespace( _arg_1: string ): void;
    RegisterForReadyEvents( _arg_1: boolean ): void;
    BReadyForDisplay(): boolean;
    SetReadyForDisplay( _arg_1: boolean ): void;
    SetPositionInPixels( _arg_1: number, _arg_2: number, _arg_3: number ): void;
    Data( _arg_1 ): void;
//     debug.description( _arg_1 ): void;
    SetSendScrollPositionChangedEvents( _arg_1: boolean ): void;
    SetSelected( _arg_1: boolean ): void;
    text( _arg_1: string ): string;
    SetPanelEvent( _arg_1 ): void;
    RunScriptInPanelContext( _arg_1 ): void;
    rememberchildfocus( _arg_1: boolean ): boolean;
    paneltype(): string;
}
interface TabButton
{
    visible( _arg_1: boolean ): boolean;
    enabled( _arg_1: boolean ): boolean;
    checked( _arg_1: boolean ): boolean;
    defaultfocus( _arg_1: string ): string;
    inputnamespace( _arg_1: string ): string;
    hittest( _arg_1: boolean ): boolean;
    hittestchildren( _arg_1: boolean ): boolean;
    tabindex( _arg_1: number ): number;
    selectionpos_x( _arg_1: number ): number;
    selectionpos_y( _arg_1: number ): number;
    type(): string;
    id(): string;
    layoutfile();
    contentwidth(): number;
    contentheight(): number;
    desiredlayoutwidth(): number;
    desiredlayoutheight(): number;
    actuallayoutwidth(): number;
    actuallayoutheight(): number;
    actualxoffset(): number;
    actualyoffset(): number;
    scrolloffset_y(): number;
    scrolloffset_x(): number;
    actualuiscale_y(): number;
    actualuiscale_x(): number;
    style();
    AddClass( _arg_1: string ): void;
    RemoveClass( _arg_1: string ): void;
    BHasClass( _arg_1: string ): boolean;
    BAscendantHasClass( _arg_1: string ): boolean;
    SetHasClass( _arg_1: string, _arg_2: boolean ): void;
    ToggleClass( _arg_1: string ): void;
    SwitchClass( _arg_1: string, _arg_2: string ): void;
    TriggerClass( _arg_1: string ): void;
    ClearPanelEvent( _arg_1: string ): void;
    SetDraggable( _arg_1: boolean ): void;
    IsDraggable(): boolean;
    IsSizeValid(): boolean;
    GetChildCount(): number;
    GetChild( _arg_1: number );
    GetChildIndex( _arg_1 ): number;
    Children();
    FindChildrenWithClassTraverse( _arg_1: string );
    GetParent();
    SetParent( _arg_1 ): void;
    FindChild( _arg_1: string );
    FindChildTraverse( _arg_1: string );
    FindChildInLayoutFile( _arg_1: string );
    FindPanelInThisOrParentLayoutFile( _arg_1: string );
    FindAncestor( _arg_1: string );
    RemoveAndDeleteChildren(): void;
    MoveChildBefore( _arg_1, _arg_2 ): void;
    MoveChildAfter( _arg_1, _arg_2 ): void;
    GetPositionWithinWindow();
    GetPositionWithinAncestor( _arg_1 );
    GetPosition( _arg_1: boolean );
    ApplyStyles( _arg_1: boolean ): void;
    ClearPropertyFromCode( _arg_1 ): void;
    DeleteAsync( _arg_1: number ): void;
    BIsTransparent(): boolean;
    BAcceptsInput(): boolean;
    BAcceptsFocus(): boolean;
    SetFocus(): boolean;
    UpdateFocusInContext(): boolean;
    BHasHoverStyle(): boolean;
    SetAcceptsInput( _arg_1: boolean ): void;
    SetAcceptsFocus( _arg_1: boolean ): void;
    SetDisableFocusOnMouseDown( _arg_1: boolean ): void;
    BHasKeyFocus(): boolean;
    SetScrollParentToFitWhenFocused( _arg_1: boolean ): void;
    BScrollParentToFitWhenFocused(): boolean;
    IsSelected(): boolean;
    BHasDescendantKeyFocus(): boolean;
    BLoadLayout( _arg_1: string, _arg_2: boolean, _arg_3: boolean ): boolean;
    BLoadLayoutSnippet( _arg_1: string ): boolean;
    BHasLayoutSnippet( _arg_1: string ): boolean;
    BGetSnippetNames( _arg_1 ): void;
    SetTopOfInputContext( _arg_1: boolean ): void;
    SetDialogVariable( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableInt( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableTime( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableLocString( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableLocStringNested( _arg_1: string, _arg_2: string ): void;
    SetDialogVariablePluralLocStringInt( _arg_1: string, _arg_2: string, _arg_3: number ): void;
    ScrollToTop(): void;
    ScrollToBottom(): void;
    ScrollToLeftEdge(): void;
    ScrollToRightEdge(): void;
    ScrollParentToMakePanelFit( _arg_1, _arg_2: boolean ): void;
    ScrollToFitRegion( _arg_1: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5, _arg_6: boolean, _arg_7: boolean ): void;
    BCanSeeInParentScroll(): boolean;
    GetAttributeInt( _arg_1: string, _arg_2: number ): number;
    GetAttributeString( _arg_1: string, _arg_2: string ): string;
    GetAttributeUInt32( _arg_1: string, _arg_2: number ): number;
    SetAttributeInt( _arg_1: string, _arg_2: number ): void;
    SetAttributeString( _arg_1: string, _arg_2: string ): void;
    SetAttributeUInt32( _arg_1: string, _arg_2: number ): void;
    SetInputNamespace( _arg_1: string ): void;
    RegisterForReadyEvents( _arg_1: boolean ): void;
    BReadyForDisplay(): boolean;
    SetReadyForDisplay( _arg_1: boolean ): void;
    SetPositionInPixels( _arg_1: number, _arg_2: number, _arg_3: number ): void;
    Data( _arg_1 ): void;
//     debug.description( _arg_1 ): void;
    SetSendScrollPositionChangedEvents( _arg_1: boolean ): void;
    SetPanelEvent( _arg_1 ): void;
    RunScriptInPanelContext( _arg_1 ): void;
    rememberchildfocus( _arg_1: boolean ): boolean;
    paneltype(): string;
}
// No matches for 'DOTAMapUpdate2023Page' found
// No matches for 'DOTADashboard' found
// No matches for 'PageManager' found
// No matches for 'DOTAHomePage' found
// No matches for 'Movie' found
interface DOTAAvatarImage
{
    visible( _arg_1: boolean ): boolean;
    enabled( _arg_1: boolean ): boolean;
    checked( _arg_1: boolean ): boolean;
    defaultfocus( _arg_1: string ): string;
    inputnamespace( _arg_1: string ): string;
    hittest( _arg_1: boolean ): boolean;
    hittestchildren( _arg_1: boolean ): boolean;
    tabindex( _arg_1: number ): number;
    selectionpos_x( _arg_1: number ): number;
    selectionpos_y( _arg_1: number ): number;
    type(): string;
    id(): string;
    layoutfile();
    contentwidth(): number;
    contentheight(): number;
    desiredlayoutwidth(): number;
    desiredlayoutheight(): number;
    actuallayoutwidth(): number;
    actuallayoutheight(): number;
    actualxoffset(): number;
    actualyoffset(): number;
    scrolloffset_y(): number;
    scrolloffset_x(): number;
    actualuiscale_y(): number;
    actualuiscale_x(): number;
    style();
    AddClass( _arg_1: string ): void;
    RemoveClass( _arg_1: string ): void;
    BHasClass( _arg_1: string ): boolean;
    BAscendantHasClass( _arg_1: string ): boolean;
    SetHasClass( _arg_1: string, _arg_2: boolean ): void;
    ToggleClass( _arg_1: string ): void;
    SwitchClass( _arg_1: string, _arg_2: string ): void;
    TriggerClass( _arg_1: string ): void;
    ClearPanelEvent( _arg_1: string ): void;
    SetDraggable( _arg_1: boolean ): void;
    IsDraggable(): boolean;
    IsSizeValid(): boolean;
    GetChildCount(): number;
    GetChild( _arg_1: number );
    GetChildIndex( _arg_1 ): number;
    Children();
    FindChildrenWithClassTraverse( _arg_1: string );
    GetParent();
    SetParent( _arg_1 ): void;
    FindChild( _arg_1: string );
    FindChildTraverse( _arg_1: string );
    FindChildInLayoutFile( _arg_1: string );
    FindPanelInThisOrParentLayoutFile( _arg_1: string );
    FindAncestor( _arg_1: string );
    RemoveAndDeleteChildren(): void;
    MoveChildBefore( _arg_1, _arg_2 ): void;
    MoveChildAfter( _arg_1, _arg_2 ): void;
    GetPositionWithinWindow();
    GetPositionWithinAncestor( _arg_1 );
    GetPosition( _arg_1: boolean );
    ApplyStyles( _arg_1: boolean ): void;
    ClearPropertyFromCode( _arg_1 ): void;
    DeleteAsync( _arg_1: number ): void;
    BIsTransparent(): boolean;
    BAcceptsInput(): boolean;
    BAcceptsFocus(): boolean;
    SetFocus(): boolean;
    UpdateFocusInContext(): boolean;
    BHasHoverStyle(): boolean;
    SetAcceptsInput( _arg_1: boolean ): void;
    SetAcceptsFocus( _arg_1: boolean ): void;
    SetDisableFocusOnMouseDown( _arg_1: boolean ): void;
    BHasKeyFocus(): boolean;
    SetScrollParentToFitWhenFocused( _arg_1: boolean ): void;
    BScrollParentToFitWhenFocused(): boolean;
    IsSelected(): boolean;
    BHasDescendantKeyFocus(): boolean;
    BLoadLayout( _arg_1: string, _arg_2: boolean, _arg_3: boolean ): boolean;
    BLoadLayoutSnippet( _arg_1: string ): boolean;
    BHasLayoutSnippet( _arg_1: string ): boolean;
    BGetSnippetNames( _arg_1 ): void;
    SetTopOfInputContext( _arg_1: boolean ): void;
    SetDialogVariable( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableInt( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableTime( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableLocString( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableLocStringNested( _arg_1: string, _arg_2: string ): void;
    SetDialogVariablePluralLocStringInt( _arg_1: string, _arg_2: string, _arg_3: number ): void;
    ScrollToTop(): void;
    ScrollToBottom(): void;
    ScrollToLeftEdge(): void;
    ScrollToRightEdge(): void;
    ScrollParentToMakePanelFit( _arg_1, _arg_2: boolean ): void;
    ScrollToFitRegion( _arg_1: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5, _arg_6: boolean, _arg_7: boolean ): void;
    BCanSeeInParentScroll(): boolean;
    GetAttributeInt( _arg_1: string, _arg_2: number ): number;
    GetAttributeString( _arg_1: string, _arg_2: string ): string;
    GetAttributeUInt32( _arg_1: string, _arg_2: number ): number;
    SetAttributeInt( _arg_1: string, _arg_2: number ): void;
    SetAttributeString( _arg_1: string, _arg_2: string ): void;
    SetAttributeUInt32( _arg_1: string, _arg_2: number ): void;
    SetInputNamespace( _arg_1: string ): void;
    RegisterForReadyEvents( _arg_1: boolean ): void;
    BReadyForDisplay(): boolean;
    SetReadyForDisplay( _arg_1: boolean ): void;
    SetPositionInPixels( _arg_1: number, _arg_2: number, _arg_3: number ): void;
    Data( _arg_1 ): void;
//     debug.description( _arg_1 ): void;
    SetSendScrollPositionChangedEvents( _arg_1: boolean ): void;
    steamid( _arg_1: string ): string;
    accountid( _arg_1: string ): string;
    SetAccountID( _arg_1: number ): void;
    SetPanelEvent( _arg_1 ): void;
    RunScriptInPanelContext( _arg_1 ): void;
    rememberchildfocus( _arg_1: boolean ): boolean;
    paneltype(): string;
}
interface CustomUIElement
{
    visible( _arg_1: boolean ): boolean;
    enabled( _arg_1: boolean ): boolean;
    checked( _arg_1: boolean ): boolean;
    defaultfocus( _arg_1: string ): string;
    inputnamespace( _arg_1: string ): string;
    hittest( _arg_1: boolean ): boolean;
    hittestchildren( _arg_1: boolean ): boolean;
    tabindex( _arg_1: number ): number;
    selectionpos_x( _arg_1: number ): number;
    selectionpos_y( _arg_1: number ): number;
    type(): string;
    id(): string;
    layoutfile();
    contentwidth(): number;
    contentheight(): number;
    desiredlayoutwidth(): number;
    desiredlayoutheight(): number;
    actuallayoutwidth(): number;
    actuallayoutheight(): number;
    actualxoffset(): number;
    actualyoffset(): number;
    scrolloffset_y(): number;
    scrolloffset_x(): number;
    actualuiscale_y(): number;
    actualuiscale_x(): number;
    style();
    AddClass( _arg_1: string ): void;
    RemoveClass( _arg_1: string ): void;
    BHasClass( _arg_1: string ): boolean;
    BAscendantHasClass( _arg_1: string ): boolean;
    SetHasClass( _arg_1: string, _arg_2: boolean ): void;
    ToggleClass( _arg_1: string ): void;
    SwitchClass( _arg_1: string, _arg_2: string ): void;
    TriggerClass( _arg_1: string ): void;
    ClearPanelEvent( _arg_1: string ): void;
    SetDraggable( _arg_1: boolean ): void;
    IsDraggable(): boolean;
    IsSizeValid(): boolean;
    GetChildCount(): number;
    GetChild( _arg_1: number );
    GetChildIndex( _arg_1 ): number;
    Children();
    FindChildrenWithClassTraverse( _arg_1: string );
    GetParent();
    SetParent( _arg_1 ): void;
    FindChild( _arg_1: string );
    FindChildTraverse( _arg_1: string );
    FindChildInLayoutFile( _arg_1: string );
    FindPanelInThisOrParentLayoutFile( _arg_1: string );
    FindAncestor( _arg_1: string );
    RemoveAndDeleteChildren(): void;
    MoveChildBefore( _arg_1, _arg_2 ): void;
    MoveChildAfter( _arg_1, _arg_2 ): void;
    GetPositionWithinWindow();
    GetPositionWithinAncestor( _arg_1 );
    GetPosition( _arg_1: boolean );
    ApplyStyles( _arg_1: boolean ): void;
    ClearPropertyFromCode( _arg_1 ): void;
    DeleteAsync( _arg_1: number ): void;
    BIsTransparent(): boolean;
    BAcceptsInput(): boolean;
    BAcceptsFocus(): boolean;
    SetFocus(): boolean;
    UpdateFocusInContext(): boolean;
    BHasHoverStyle(): boolean;
    SetAcceptsInput( _arg_1: boolean ): void;
    SetAcceptsFocus( _arg_1: boolean ): void;
    SetDisableFocusOnMouseDown( _arg_1: boolean ): void;
    BHasKeyFocus(): boolean;
    SetScrollParentToFitWhenFocused( _arg_1: boolean ): void;
    BScrollParentToFitWhenFocused(): boolean;
    IsSelected(): boolean;
    BHasDescendantKeyFocus(): boolean;
    BLoadLayout( _arg_1: string, _arg_2: boolean, _arg_3: boolean ): boolean;
    BLoadLayoutSnippet( _arg_1: string ): boolean;
    BHasLayoutSnippet( _arg_1: string ): boolean;
    BGetSnippetNames( _arg_1 ): void;
    SetTopOfInputContext( _arg_1: boolean ): void;
    SetDialogVariable( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableInt( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableTime( _arg_1: string, _arg_2: number ): void;
    SetDialogVariableLocString( _arg_1: string, _arg_2: string ): void;
    SetDialogVariableLocStringNested( _arg_1: string, _arg_2: string ): void;
    SetDialogVariablePluralLocStringInt( _arg_1: string, _arg_2: string, _arg_3: number ): void;
    ScrollToTop(): void;
    ScrollToBottom(): void;
    ScrollToLeftEdge(): void;
    ScrollToRightEdge(): void;
    ScrollParentToMakePanelFit( _arg_1, _arg_2: boolean ): void;
    ScrollToFitRegion( _arg_1: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5, _arg_6: boolean, _arg_7: boolean ): void;
    BCanSeeInParentScroll(): boolean;
    GetAttributeInt( _arg_1: string, _arg_2: number ): number;
    GetAttributeString( _arg_1: string, _arg_2: string ): string;
    GetAttributeUInt32( _arg_1: string, _arg_2: number ): number;
    SetAttributeInt( _arg_1: string, _arg_2: number ): void;
    SetAttributeString( _arg_1: string, _arg_2: string ): void;
    SetAttributeUInt32( _arg_1: string, _arg_2: number ): void;
    SetInputNamespace( _arg_1: string ): void;
    RegisterForReadyEvents( _arg_1: boolean ): void;
    BReadyForDisplay(): boolean;
    SetReadyForDisplay( _arg_1: boolean ): void;
    SetPositionInPixels( _arg_1: number, _arg_2: number, _arg_3: number ): void;
    Data( _arg_1 ): void;
//     debug.description( _arg_1 ): void;
    SetSendScrollPositionChangedEvents( _arg_1: boolean ): void;
    SetPanelEvent( _arg_1 ): void;
    RunScriptInPanelContext( _arg_1 ): void;
    rememberchildfocus( _arg_1: boolean ): boolean;
    paneltype(): string;
}
// No matches for 'DOTAHudPreGame' found
declare enum SteamUGCQuery
{
    RankedByVote = 0,
    RankedByPublicationDate = 1,
    AcceptedForGameRankedByAcceptanceDate = 2,
    RankedByTrend = 3,
    FavoritedByFriendsRankedByPublicationDate = 4,
    CreatedByFriendsRankedByPublicationDate = 5,
    RankedByNumTimesReported = 6,
    CreatedByFollowedUsersRankedByPublicationDate = 7,
    NotYetRated = 8,
    RankedByTotalVotesAsc = 9,
    RankedByVotesUp = 10,
    RankedByTextSearch = 11,
    RankedByTotalUniqueSubscriptions = 12,
    RankedByPlaytimeTrend = 13,
    RankedByTotalPlaytime = 14,
    RankedByAveragePlaytimeTrend = 15,
    RankedByLifetimeAveragePlaytime = 16,
    RankedByPlaytimeSessionsTrend = 17,
    RankedByLifetimePlaytimeSessions = 18,
}

declare enum SteamUGCMatchingUGCType
{
    Items = 0,
    Items_Mtx = 1,
    Items_ReadyToUse = 2,
    Collections = 3,
    Artwork = 4,
    Videos = 5,
    Screenshots = 6,
    AllGuides = 7,
    WebGuides = 8,
    IntegratedGuides = 9,
    UsableInGame = 10,
    ControllerBindings = 11,
    GameManagedItems = 12,
    All = -1,
}

declare enum SteamUniverse
{
    Invalid = 0,
    Internal = 3,
    Dev = 4,
    Beta = 2,
    Public = 1,
}

declare enum DOTA_GameState
{
    DOTA_GAMERULES_STATE_INIT = 0,
    DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD = 1,
    DOTA_GAMERULES_STATE_HERO_SELECTION = 4,
    DOTA_GAMERULES_STATE_STRATEGY_TIME = 5,
    DOTA_GAMERULES_STATE_PRE_GAME = 8,
    DOTA_GAMERULES_STATE_GAME_IN_PROGRESS = 10,
    DOTA_GAMERULES_STATE_POST_GAME = 11,
    DOTA_GAMERULES_STATE_DISCONNECT = 12,
    DOTA_GAMERULES_STATE_TEAM_SHOWCASE = 6,
    DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP = 2,
    DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD = 7,
    DOTA_GAMERULES_STATE_SCENARIO_SETUP = 9,
    DOTA_GAMERULES_STATE_PLAYER_DRAFT = 3,
    DOTA_GAMERULES_STATE_LAST = 0,
}

declare enum DOTA_GC_TEAM
{
    DOTA_GC_TEAM_GOOD_GUYS = 0,
    DOTA_GC_TEAM_BAD_GUYS = 1,
    DOTA_GC_TEAM_BROADCASTER = 2,
    DOTA_GC_TEAM_SPECTATOR = 3,
    DOTA_GC_TEAM_PLAYER_POOL = 4,
    DOTA_GC_TEAM_NOTEAM = 5,
    DOTA_GC_TEAM_CUSTOM_1 = 6,
    DOTA_GC_TEAM_CUSTOM_2 = 7,
    DOTA_GC_TEAM_CUSTOM_3 = 8,
    DOTA_GC_TEAM_CUSTOM_4 = 9,
    DOTA_GC_TEAM_CUSTOM_5 = 10,
    DOTA_GC_TEAM_CUSTOM_6 = 11,
    DOTA_GC_TEAM_CUSTOM_7 = 12,
    DOTA_GC_TEAM_CUSTOM_8 = 13,
    DOTA_GC_TEAM_NEUTRALS = 14,
}

declare enum DOTA_GameMode
{
    DOTA_GAMEMODE_NONE = 0,
    DOTA_GAMEMODE_AP = 1,
    DOTA_GAMEMODE_CM = 2,
    DOTA_GAMEMODE_RD = 3,
    DOTA_GAMEMODE_SD = 4,
    DOTA_GAMEMODE_AR = 5,
    DOTA_GAMEMODE_INTRO = 6,
    DOTA_GAMEMODE_HW = 7,
    DOTA_GAMEMODE_REVERSE_CM = 8,
    DOTA_GAMEMODE_XMAS = 9,
    DOTA_GAMEMODE_TUTORIAL = 10,
    DOTA_GAMEMODE_MO = 11,
    DOTA_GAMEMODE_LP = 12,
    DOTA_GAMEMODE_POOL1 = 13,
    DOTA_GAMEMODE_FH = 14,
    DOTA_GAMEMODE_CUSTOM = 15,
    DOTA_GAMEMODE_CD = 16,
    DOTA_GAMEMODE_BD = 17,
    DOTA_GAMEMODE_ABILITY_DRAFT = 18,
    DOTA_GAMEMODE_EVENT = 19,
    DOTA_GAMEMODE_ARDM = 20,
    DOTA_GAMEMODE_1V1MID = 21,
    DOTA_GAMEMODE_ALL_DRAFT = 22,
    DOTA_GAMEMODE_TURBO = 23,
    DOTA_GAMEMODE_MUTATION = 24,
    DOTA_GAMEMODE_COACHES_CHALLENGE = 25,
}

declare enum DOTAConnectionState_t
{
    DOTA_CONNECTION_STATE_UNKNOWN = 0,
    DOTA_CONNECTION_STATE_NOT_YET_CONNECTED = 1,
    DOTA_CONNECTION_STATE_CONNECTED = 2,
    DOTA_CONNECTION_STATE_DISCONNECTED = 3,
    DOTA_CONNECTION_STATE_ABANDONED = 4,
    DOTA_CONNECTION_STATE_LOADING = 5,
    DOTA_CONNECTION_STATE_FAILED = 6,
}

declare enum dotaunitorder_t
{
    DOTA_UNIT_ORDER_NONE = 0,
    DOTA_UNIT_ORDER_MOVE_TO_POSITION = 1,
    DOTA_UNIT_ORDER_MOVE_TO_TARGET = 2,
    DOTA_UNIT_ORDER_ATTACK_MOVE = 3,
    DOTA_UNIT_ORDER_ATTACK_TARGET = 4,
    DOTA_UNIT_ORDER_CAST_POSITION = 5,
    DOTA_UNIT_ORDER_CAST_TARGET = 6,
    DOTA_UNIT_ORDER_CAST_TARGET_TREE = 7,
    DOTA_UNIT_ORDER_CAST_NO_TARGET = 8,
    DOTA_UNIT_ORDER_CAST_TOGGLE = 9,
    DOTA_UNIT_ORDER_HOLD_POSITION = 10,
    DOTA_UNIT_ORDER_TRAIN_ABILITY = 11,
    DOTA_UNIT_ORDER_DROP_ITEM = 12,
    DOTA_UNIT_ORDER_GIVE_ITEM = 13,
    DOTA_UNIT_ORDER_PICKUP_ITEM = 14,
    DOTA_UNIT_ORDER_PICKUP_RUNE = 15,
    DOTA_UNIT_ORDER_PURCHASE_ITEM = 16,
    DOTA_UNIT_ORDER_SELL_ITEM = 17,
    DOTA_UNIT_ORDER_DISASSEMBLE_ITEM = 18,
    DOTA_UNIT_ORDER_MOVE_ITEM = 19,
    DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO = 20,
    DOTA_UNIT_ORDER_STOP = 21,
    DOTA_UNIT_ORDER_TAUNT = 22,
    DOTA_UNIT_ORDER_BUYBACK = 23,
    DOTA_UNIT_ORDER_GLYPH = 24,
    DOTA_UNIT_ORDER_EJECT_ITEM_FROM_STASH = 25,
    DOTA_UNIT_ORDER_CAST_RUNE = 26,
    DOTA_UNIT_ORDER_PING_ABILITY = 27,
    DOTA_UNIT_ORDER_MOVE_TO_DIRECTION = 28,
    DOTA_UNIT_ORDER_PATROL = 29,
    DOTA_UNIT_ORDER_VECTOR_TARGET_POSITION = 30,
    DOTA_UNIT_ORDER_RADAR = 31,
    DOTA_UNIT_ORDER_SET_ITEM_COMBINE_LOCK = 32,
    DOTA_UNIT_ORDER_CONTINUE = 33,
    DOTA_UNIT_ORDER_VECTOR_TARGET_CANCELED = 34,
    DOTA_UNIT_ORDER_CAST_RIVER_PAINT = 35,
    DOTA_UNIT_ORDER_PREGAME_ADJUST_ITEM_ASSIGNMENT = 36,
    DOTA_UNIT_ORDER_DROP_ITEM_AT_FOUNTAIN = 37,
    DOTA_UNIT_ORDER_TAKE_ITEM_FROM_NEUTRAL_ITEM_STASH = 38,
    DOTA_UNIT_ORDER_MOVE_RELATIVE = 39,
    DOTA_UNIT_ORDER_CAST_TOGGLE_ALT = 40,
    DOTA_UNIT_ORDER_CONSUME_ITEM = 41,
    DOTA_UNIT_ORDER_SET_ITEM_MARK_FOR_SELL = 42,
}

declare enum DOTA_OVERHEAD_ALERT
{
    OVERHEAD_ALERT_GOLD = 0,
    OVERHEAD_ALERT_DENY = 1,
    OVERHEAD_ALERT_CRITICAL = 2,
    OVERHEAD_ALERT_XP = 3,
    OVERHEAD_ALERT_BONUS_SPELL_DAMAGE = 4,
    OVERHEAD_ALERT_MISS = 5,
    OVERHEAD_ALERT_DAMAGE = 6,
    OVERHEAD_ALERT_EVADE = 7,
    OVERHEAD_ALERT_BLOCK = 8,
    OVERHEAD_ALERT_BONUS_POISON_DAMAGE = 9,
    OVERHEAD_ALERT_HEAL = 10,
    OVERHEAD_ALERT_MANA_ADD = 11,
    OVERHEAD_ALERT_MANA_LOSS = 12,
    OVERHEAD_ALERT_LAST_HIT_EARLY = 13,
    OVERHEAD_ALERT_LAST_HIT_CLOSE = 14,
    OVERHEAD_ALERT_LAST_HIT_MISS = 15,
    OVERHEAD_ALERT_MAGICAL_BLOCK = 16,
    OVERHEAD_ALERT_INCOMING_DAMAGE = 17,
    OVERHEAD_ALERT_OUTGOING_DAMAGE = 18,
    OVERHEAD_ALERT_DISABLE_RESIST = 19,
    OVERHEAD_ALERT_DEATH = 20,
    OVERHEAD_ALERT_BLOCKED = 21,
    OVERHEAD_ALERT_ITEM_RECEIVED = 22,
    OVERHEAD_ALERT_SHARD = 23,
    OVERHEAD_ALERT_DEADLY_BLOW = 24,
    OVERHEAD_ALERT_FORCE_MISS = 25,
}

declare enum DOTA_HeroPickState
{
    DOTA_HEROPICK_STATE_NONE = 0,
    DOTA_HEROPICK_STATE_AP_SELECT = 1,
    DOTA_HEROPICK_STATE_SD_SELECT = 2,
    DOTA_HEROPICK_STATE_INTRO_SELECT_UNUSED = 3,
    DOTA_HEROPICK_STATE_RD_SELECT_UNUSED = 4,
    DOTA_HEROPICK_STATE_CM_INTRO = 5,
    DOTA_HEROPICK_STATE_CM_CAPTAINPICK = 6,
    DOTA_HEROPICK_STATE_CM_BAN1 = 7,
    DOTA_HEROPICK_STATE_CM_BAN2 = 8,
    DOTA_HEROPICK_STATE_CM_BAN3 = 9,
    DOTA_HEROPICK_STATE_CM_BAN4 = 10,
    DOTA_HEROPICK_STATE_CM_BAN5 = 11,
    DOTA_HEROPICK_STATE_CM_BAN6 = 12,
    DOTA_HEROPICK_STATE_CM_BAN7 = 13,
    DOTA_HEROPICK_STATE_CM_BAN8 = 14,
    DOTA_HEROPICK_STATE_CM_BAN9 = 15,
    DOTA_HEROPICK_STATE_CM_BAN10 = 16,
    DOTA_HEROPICK_STATE_CM_BAN11 = 17,
    DOTA_HEROPICK_STATE_CM_BAN12 = 18,
    DOTA_HEROPICK_STATE_CM_BAN13 = 19,
    DOTA_HEROPICK_STATE_CM_BAN14 = 20,
    DOTA_HEROPICK_STATE_CM_SELECT1 = 21,
    DOTA_HEROPICK_STATE_CM_SELECT2 = 22,
    DOTA_HEROPICK_STATE_CM_SELECT3 = 23,
    DOTA_HEROPICK_STATE_CM_SELECT4 = 24,
    DOTA_HEROPICK_STATE_CM_SELECT5 = 25,
    DOTA_HEROPICK_STATE_CM_SELECT6 = 26,
    DOTA_HEROPICK_STATE_CM_SELECT7 = 27,
    DOTA_HEROPICK_STATE_CM_SELECT8 = 28,
    DOTA_HEROPICK_STATE_CM_SELECT9 = 29,
    DOTA_HEROPICK_STATE_CM_SELECT10 = 30,
    DOTA_HEROPICK_STATE_CM_PICK = 31,
    DOTA_HEROPICK_STATE_AR_SELECT = 32,
    DOTA_HEROPICK_STATE_MO_SELECT = 33,
    DOTA_HEROPICK_STATE_FH_SELECT = 34,
    DOTA_HEROPICK_STATE_CD_INTRO = 35,
    DOTA_HEROPICK_STATE_CD_CAPTAINPICK = 36,
    DOTA_HEROPICK_STATE_CD_BAN1 = 37,
    DOTA_HEROPICK_STATE_CD_BAN2 = 38,
    DOTA_HEROPICK_STATE_CD_BAN3 = 39,
    DOTA_HEROPICK_STATE_CD_BAN4 = 40,
    DOTA_HEROPICK_STATE_CD_BAN5 = 41,
    DOTA_HEROPICK_STATE_CD_BAN6 = 42,
    DOTA_HEROPICK_STATE_CD_SELECT1 = 43,
    DOTA_HEROPICK_STATE_CD_SELECT2 = 44,
    DOTA_HEROPICK_STATE_CD_SELECT3 = 45,
    DOTA_HEROPICK_STATE_CD_SELECT4 = 46,
    DOTA_HEROPICK_STATE_CD_SELECT5 = 47,
    DOTA_HEROPICK_STATE_CD_SELECT6 = 48,
    DOTA_HEROPICK_STATE_CD_SELECT7 = 49,
    DOTA_HEROPICK_STATE_CD_SELECT8 = 50,
    DOTA_HEROPICK_STATE_CD_SELECT9 = 51,
    DOTA_HEROPICK_STATE_CD_SELECT10 = 52,
    DOTA_HEROPICK_STATE_CD_PICK = 53,
    DOTA_HEROPICK_STATE_BD_SELECT = 54,
    DOTA_HERO_PICK_STATE_ABILITY_DRAFT_SELECT = 55,
    DOTA_HERO_PICK_STATE_ARDM_SELECT = 56,
    DOTA_HEROPICK_STATE_ALL_DRAFT_SELECT = 57,
    DOTA_HERO_PICK_STATE_CUSTOMGAME_SELECT = 58,
    DOTA_HEROPICK_STATE_SELECT_PENALTY = 59,
    DOTA_HEROPICK_STATE_CUSTOM_PICK_RULES = 60,
    DOTA_HEROPICK_STATE_SCENARIO_PICK = 61,
    DOTA_HEROPICK_STATE_COUNT = 62,
}

declare enum DOTATeam_t
{
    DOTA_TEAM_FIRST = 2,
    DOTA_TEAM_GOODGUYS = 2,
    DOTA_TEAM_BADGUYS = 3,
    DOTA_TEAM_NEUTRALS = 4,
    DOTA_TEAM_NOTEAM = 5,
    DOTA_TEAM_CUSTOM_1 = 6,
    DOTA_TEAM_CUSTOM_2 = 7,
    DOTA_TEAM_CUSTOM_3 = 8,
    DOTA_TEAM_CUSTOM_4 = 9,
    DOTA_TEAM_CUSTOM_5 = 10,
    DOTA_TEAM_CUSTOM_6 = 11,
    DOTA_TEAM_CUSTOM_7 = 12,
    DOTA_TEAM_CUSTOM_8 = 13,
    DOTA_TEAM_DRAFT_POOL = 14,
    DOTA_TEAM_COUNT = 15,
    DOTA_TEAM_CUSTOM_MIN = 6,
    DOTA_TEAM_CUSTOM_MAX = 13,
    DOTA_TEAM_CUSTOM_COUNT = 8,
}

declare enum DOTA_RUNES
{
    DOTA_RUNE_INVALID = -1,
    DOTA_RUNE_DOUBLEDAMAGE = 0,
    DOTA_RUNE_HASTE = 1,
    DOTA_RUNE_ILLUSION = 2,
    DOTA_RUNE_INVISIBILITY = 3,
    DOTA_RUNE_REGENERATION = 4,
    DOTA_RUNE_BOUNTY = 5,
    DOTA_RUNE_ARCANE = 6,
    DOTA_RUNE_WATER = 7,
    DOTA_RUNE_XP = 8,
    DOTA_RUNE_SHIELD = 9,
    DOTA_RUNE_COUNT = 10,
}

declare enum DOTA_UNIT_TARGET_TEAM
{
    DOTA_UNIT_TARGET_TEAM_NONE = 0,
    DOTA_UNIT_TARGET_TEAM_FRIENDLY = 1,
    DOTA_UNIT_TARGET_TEAM_ENEMY = 2,
    DOTA_UNIT_TARGET_TEAM_CUSTOM = 4,
    DOTA_UNIT_TARGET_TEAM_BOTH = 3,
}

declare enum DOTA_UNIT_TARGET_TYPE
{
    DOTA_UNIT_TARGET_NONE = 0,
    DOTA_UNIT_TARGET_HERO = 1,
    DOTA_UNIT_TARGET_CREEP = 2,
    DOTA_UNIT_TARGET_BUILDING = 4,
    DOTA_UNIT_TARGET_COURIER = 16,
    DOTA_UNIT_TARGET_OTHER = 32,
    DOTA_UNIT_TARGET_TREE = 64,
    DOTA_UNIT_TARGET_CUSTOM = 128,
    DOTA_UNIT_TARGET_SELF = 256,
    DOTA_UNIT_TARGET_BASIC = 18,
    DOTA_UNIT_TARGET_ALL = 55,
    DOTA_UNIT_TARGET_HEROES_AND_CREEPS = 19,
}

declare enum DOTA_UNIT_TARGET_FLAGS
{
    DOTA_UNIT_TARGET_FLAG_NONE = 0,
    DOTA_UNIT_TARGET_FLAG_RANGED_ONLY = 2,
    DOTA_UNIT_TARGET_FLAG_MELEE_ONLY = 4,
    DOTA_UNIT_TARGET_FLAG_DEAD = 8,
    DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES = 16,
    DOTA_UNIT_TARGET_FLAG_NOT_MAGIC_IMMUNE_ALLIES = 32,
    DOTA_UNIT_TARGET_FLAG_INVULNERABLE = 64,
    DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE = 128,
    DOTA_UNIT_TARGET_FLAG_NO_INVIS = 256,
    DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS = 512,
    DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED = 1024,
    DOTA_UNIT_TARGET_FLAG_NOT_DOMINATED = 2048,
    DOTA_UNIT_TARGET_FLAG_NOT_SUMMONED = 4096,
    DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS = 8192,
    DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE = 16384,
    DOTA_UNIT_TARGET_FLAG_MANA_ONLY = 32768,
    DOTA_UNIT_TARGET_FLAG_CHECK_DISABLE_HELP = 65536,
    DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO = 131072,
    DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD = 262144,
    DOTA_UNIT_TARGET_FLAG_NOT_NIGHTMARED = 524288,
    DOTA_UNIT_TARGET_FLAG_PREFER_ENEMIES = 1048576,
    DOTA_UNIT_TARGET_FLAG_RESPECT_OBSTRUCTIONS = 2097152,
    DOTA_UNIT_TARGET_FLAG_CAN_BE_SEEN = 384,
}

declare enum DOTALimits_t
{
    /** Max number of players connected to the server including spectators. */
    DOTA_MAX_PLAYERS = 64,
    /** Max number of players per team. */
    DOTA_MAX_TEAM = 24,
    /** Max number of player teams supported. */
    DOTA_MAX_PLAYER_TEAMS = 10,
    /** Max number of non-spectator players supported. */
    DOTA_MAX_TEAM_PLAYERS = 24,
    /** How many spectators can watch. */
    DOTA_MAX_SPECTATOR_TEAM_SIZE = 40,
    /** Max number of viewers in a spectator lobby. */
    DOTA_MAX_SPECTATOR_LOBBY_SIZE = 15,
    /** Default number of players per team. */
    DOTA_DEFAULT_MAX_TEAM = 5,
    /** Default number of non-spectator players supported. */
    DOTA_DEFAULT_MAX_TEAM_PLAYERS = 10,
}

declare enum DOTAInventoryFlags_t
{
    DOTA_INVENTORY_ALLOW_NONE = 0,
    DOTA_INVENTORY_ALLOW_MAIN = 1,
    DOTA_INVENTORY_ALLOW_STASH = 2,
    DOTA_INVENTORY_ALLOW_DROP_ON_GROUND = 4,
    DOTA_INVENTORY_ALLOW_DROP_AT_FOUNTAIN = 8,
    DOTA_INVENTORY_LIMIT_DROP_ON_GROUND = 16,
    DOTA_INVENTORY_ALL_ACCESS = 3,
}

declare enum EDOTA_ModifyGold_Reason
{
    DOTA_ModifyGold_Unspecified = 0,
    DOTA_ModifyGold_Death = 1,
    DOTA_ModifyGold_Buyback = 2,
    DOTA_ModifyGold_PurchaseConsumable = 3,
    DOTA_ModifyGold_PurchaseItem = 4,
    DOTA_ModifyGold_AbandonedRedistribute = 5,
    DOTA_ModifyGold_SellItem = 6,
    DOTA_ModifyGold_AbilityCost = 7,
    DOTA_ModifyGold_CheatCommand = 8,
    DOTA_ModifyGold_SelectionPenalty = 9,
    DOTA_ModifyGold_GameTick = 10,
    DOTA_ModifyGold_Building = 11,
    DOTA_ModifyGold_HeroKill = 12,
    DOTA_ModifyGold_CreepKill = 13,
    DOTA_ModifyGold_NeutralKill = 14,
    DOTA_ModifyGold_RoshanKill = 15,
    DOTA_ModifyGold_CourierKill = 16,
    DOTA_ModifyGold_BountyRune = 17,
    DOTA_ModifyGold_SharedGold = 18,
    DOTA_ModifyGold_AbilityGold = 19,
    DOTA_ModifyGold_WardKill = 20,
    DOTA_ModifyGold_CourierKilledByThisPlayer = 21,
}

declare enum DOTAUnitAttackCapability_t
{
    DOTA_UNIT_CAP_NO_ATTACK = 0,
    DOTA_UNIT_CAP_MELEE_ATTACK = 1,
    DOTA_UNIT_CAP_RANGED_ATTACK = 2,
    DOTA_UNIT_CAP_RANGED_ATTACK_DIRECTIONAL = 4,
    DOTA_UNIT_ATTACK_CAPABILITY_BIT_COUNT = 3,
}

declare enum DOTAUnitMoveCapability_t
{
    DOTA_UNIT_CAP_MOVE_NONE = 0,
    DOTA_UNIT_CAP_MOVE_GROUND = 1,
    DOTA_UNIT_CAP_MOVE_FLY = 2,
}

declare enum EShareAbility
{
    ITEM_FULLY_SHAREABLE = 0,
    ITEM_PARTIALLY_SHAREABLE = 1,
    ITEM_NOT_SHAREABLE = 2,
}

declare enum DOTAMusicStatus_t
{
    DOTA_MUSIC_STATUS_NONE = 0,
    DOTA_MUSIC_STATUS_EXPLORATION = 1,
    DOTA_MUSIC_STATUS_BATTLE = 2,
    DOTA_MUSIC_STATUS_PRE_GAME_EXPLORATION = 3,
    DOTA_MUSIC_STATUS_DEAD = 4,
    DOTA_MUSIC_STATUS_LAST = 5,
}

declare enum DOTA_ABILITY_BEHAVIOR
{
    DOTA_ABILITY_BEHAVIOR_NONE = 0,
    DOTA_ABILITY_BEHAVIOR_HIDDEN = 1,
    DOTA_ABILITY_BEHAVIOR_PASSIVE = 2,
    DOTA_ABILITY_BEHAVIOR_NO_TARGET = 4,
    DOTA_ABILITY_BEHAVIOR_UNIT_TARGET = 8,
    DOTA_ABILITY_BEHAVIOR_POINT = 16,
    DOTA_ABILITY_BEHAVIOR_AOE = 32,
    DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE = 64,
    DOTA_ABILITY_BEHAVIOR_CHANNELLED = 128,
    DOTA_ABILITY_BEHAVIOR_ITEM = 256,
    DOTA_ABILITY_BEHAVIOR_TOGGLE = 512,
    DOTA_ABILITY_BEHAVIOR_DIRECTIONAL = 1024,
    DOTA_ABILITY_BEHAVIOR_IMMEDIATE = 2048,
    DOTA_ABILITY_BEHAVIOR_AUTOCAST = 4096,
    DOTA_ABILITY_BEHAVIOR_OPTIONAL_UNIT_TARGET = 8192,
    DOTA_ABILITY_BEHAVIOR_OPTIONAL_POINT = 16384,
    DOTA_ABILITY_BEHAVIOR_OPTIONAL_NO_TARGET = 32768,
    DOTA_ABILITY_BEHAVIOR_AURA = 65536,
    DOTA_ABILITY_BEHAVIOR_ATTACK = 131072,
    DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT = 262144,
    DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES = 524288,
    DOTA_ABILITY_BEHAVIOR_UNRESTRICTED = 1048576,
    DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE = 2097152,
    DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL = 4194304,
    DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_MOVEMENT = 8388608,
    DOTA_ABILITY_BEHAVIOR_DONT_ALERT_TARGET = 16777216,
    DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK = 33554432,
    DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN = 67108864,
    DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING = 134217728,
    DOTA_ABILITY_BEHAVIOR_RUNE_TARGET = 268435456,
    DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_CHANNEL = 536870912,
    DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING = 1073741824,
    DOTA_ABILITY_BEHAVIOR_LAST_RESORT_POINT = 2147483648,
    DOTA_ABILITY_BEHAVIOR_CAN_SELF_CAST = 4294967296,
    DOTA_ABILITY_BEHAVIOR_SHOW_IN_GUIDES = 8589934592,
    DOTA_ABILITY_BEHAVIOR_UNLOCKED_BY_EFFECT_INDEX = 17179869184,
    DOTA_ABILITY_BEHAVIOR_SUPPRESS_ASSOCIATED_CONSUMABLE = 34359738368,
    DOTA_ABILITY_BEHAVIOR_FREE_DRAW_TARGETING = 68719476736,
    DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE = 137438953472,
    DOTA_ABILITY_BEHAVIOR_OVERSHOOT = 274877906944,
    DOTA_ABILITY_BEHAVIOR_IGNORE_MUTED = 549755813888,
    DOTA_ABILITY_BEHAVIOR_ALT_CASTABLE = 1099511627776,
    DOTA_ABILITY_BEHAVIOR_SKIP_FOR_KEYBINDS = 4398046511104,
    DOTA_ABILITY_BEHAVIOR_INNATE_UI = 8796093022208,
    DOTA_ABILITY_BEHAVIOR_UNSWAPPABLE = 17592186044416,
    DOTA_ABILITY_BEHAVIOR_DONT_PROC_OTHER_ABILITIES = 35184372088832,
    DOTA_ABILITY_BEHAVIOR_IGNORE_INVISIBLE = 70368744177664,
    DOTA_ABILITY_BEHAVIOR_AFFECTED_BY_MUTE = 140737488355328,
    DOTA_ABILITY_BEHAVIOR_IS_FAKE_ITEM = 281474976710656,
}

declare enum DAMAGE_TYPES
{
    DAMAGE_TYPE_NONE = 0,
    DAMAGE_TYPE_PHYSICAL = 1,
    DAMAGE_TYPE_MAGICAL = 2,
    DAMAGE_TYPE_PURE = 4,
    DAMAGE_TYPE_HP_REMOVAL = 8,
    DAMAGE_TYPE_ABILITY_DEFINED = 22,
    DAMAGE_TYPE_ALL = 7,
}

declare enum ABILITY_TYPES
{
    ABILITY_TYPE_BASIC = 0,
    ABILITY_TYPE_ULTIMATE = 1,
    ABILITY_TYPE_ATTRIBUTES = 2,
    ABILITY_TYPE_HIDDEN = 3,
}

declare enum SPELL_IMMUNITY_TYPES
{
    SPELL_IMMUNITY_NONE = 0,
    SPELL_IMMUNITY_ALLIES_YES = 1,
    SPELL_IMMUNITY_ALLIES_NO = 2,
    SPELL_IMMUNITY_ENEMIES_YES = 3,
    SPELL_IMMUNITY_ENEMIES_NO = 4,
    SPELL_IMMUNITY_ALLIES_YES_ENEMIES_NO = 5,
}

declare enum DOTADamageFlag_t
{
    DOTA_DAMAGE_FLAG_NONE = 0,
    DOTA_DAMAGE_FLAG_IGNORES_MAGIC_ARMOR = 1,
    DOTA_DAMAGE_FLAG_IGNORES_PHYSICAL_ARMOR = 2,
    DOTA_DAMAGE_FLAG_BYPASSES_INVULNERABILITY = 4,
    DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK = 8,
    DOTA_DAMAGE_FLAG_REFLECTION = 16,
    DOTA_DAMAGE_FLAG_HPLOSS = 32,
    DOTA_DAMAGE_FLAG_NO_DIRECTOR_EVENT = 64,
    DOTA_DAMAGE_FLAG_NON_LETHAL = 128,
    DOTA_DAMAGE_FLAG_NO_DAMAGE_MULTIPLIERS = 512,
    DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION = 1024,
    DOTA_DAMAGE_FLAG_DONT_DISPLAY_DAMAGE_IF_SOURCE_HIDDEN = 2048,
    DOTA_DAMAGE_FLAG_NO_SPELL_LIFESTEAL = 4096,
    DOTA_DAMAGE_FLAG_PROPERTY_FIRE = 8192,
    DOTA_DAMAGE_FLAG_IGNORES_BASE_PHYSICAL_ARMOR = 16384,
    DOTA_DAMAGE_FLAG_SECONDARY_PROJECTILE_ATTACK = 32768,
    DOTA_DAMAGE_FLAG_FORCE_SPELL_AMPLIFICATION = 65536,
    DOTA_DAMAGE_FLAG_MAGIC_AUTO_ATTACK = 131072,
    DOTA_DAMAGE_FLAG_ATTACK_MODIFIER = 262144,
    DOTA_DAMAGE_FLAG_BYPASSES_ALL_BLOCK = 524288,
}

declare enum EDOTA_ModifyXP_Reason
{
    DOTA_ModifyXP_Unspecified = 0,
    DOTA_ModifyXP_HeroKill = 1,
    DOTA_ModifyXP_CreepKill = 2,
    DOTA_ModifyXP_RoshanKill = 3,
    DOTA_ModifyXP_TomeOfKnowledge = 4,
    DOTA_ModifyXP_Outpost = 5,
    DOTA_ModifyXP_CatchUp = 6,
    DOTA_ModifyXP_HeroAbility = 7,
    DOTA_ModifyXP_MAX = 8,
}

declare enum GameActivity_t
{
    ACT_DOTA_IDLE = 1500,
    ACT_DOTA_IDLE_RARE = 1501,
    ACT_DOTA_RUN = 1502,
    ACT_DOTA_ATTACK = 1503,
    ACT_DOTA_ATTACK2 = 1504,
    ACT_DOTA_ATTACK_EVENT = 1505,
    ACT_DOTA_DIE = 1506,
    ACT_DOTA_FLINCH = 1507,
    ACT_DOTA_FLAIL = 1508,
    ACT_DOTA_DISABLED = 1509,
    ACT_DOTA_CAST_ABILITY_1 = 1510,
    ACT_DOTA_CAST_ABILITY_2 = 1511,
    ACT_DOTA_CAST_ABILITY_3 = 1512,
    ACT_DOTA_CAST_ABILITY_4 = 1513,
    ACT_DOTA_CAST_ABILITY_5 = 1514,
    ACT_DOTA_CAST_ABILITY_6 = 1515,
    ACT_DOTA_OVERRIDE_ABILITY_1 = 1516,
    ACT_DOTA_OVERRIDE_ABILITY_2 = 1517,
    ACT_DOTA_OVERRIDE_ABILITY_3 = 1518,
    ACT_DOTA_OVERRIDE_ABILITY_4 = 1519,
    ACT_DOTA_CHANNEL_ABILITY_1 = 1520,
    ACT_DOTA_CHANNEL_ABILITY_2 = 1521,
    ACT_DOTA_CHANNEL_ABILITY_3 = 1522,
    ACT_DOTA_CHANNEL_ABILITY_4 = 1523,
    ACT_DOTA_CHANNEL_ABILITY_5 = 1524,
    ACT_DOTA_CHANNEL_ABILITY_6 = 1525,
    ACT_DOTA_CHANNEL_END_ABILITY_1 = 1526,
    ACT_DOTA_CHANNEL_END_ABILITY_2 = 1527,
    ACT_DOTA_CHANNEL_END_ABILITY_3 = 1528,
    ACT_DOTA_CHANNEL_END_ABILITY_4 = 1529,
    ACT_DOTA_CHANNEL_END_ABILITY_5 = 1530,
    ACT_DOTA_CHANNEL_END_ABILITY_6 = 1531,
    ACT_DOTA_CONSTANT_LAYER = 1532,
    ACT_DOTA_CAPTURE = 1533,
    ACT_DOTA_SPAWN = 1534,
    ACT_DOTA_KILLTAUNT = 1535,
    ACT_DOTA_TAUNT = 1536,
    ACT_DOTA_THIRST = 1537,
    ACT_DOTA_CAST_DRAGONBREATH = 1538,
    ACT_DOTA_ECHO_SLAM = 1539,
    ACT_DOTA_CAST_ABILITY_1_END = 1540,
    ACT_DOTA_CAST_ABILITY_2_END = 1541,
    ACT_DOTA_CAST_ABILITY_3_END = 1542,
    ACT_DOTA_CAST_ABILITY_4_END = 1543,
    ACT_MIRANA_LEAP_END = 1544,
    ACT_WAVEFORM_START = 1545,
    ACT_WAVEFORM_END = 1546,
    ACT_DOTA_CAST_ABILITY_ROT = 1547,
    ACT_DOTA_DIE_SPECIAL = 1548,
    ACT_DOTA_RATTLETRAP_BATTERYASSAULT = 1549,
    ACT_DOTA_RATTLETRAP_POWERCOGS = 1550,
    ACT_DOTA_RATTLETRAP_HOOKSHOT_START = 1551,
    ACT_DOTA_RATTLETRAP_HOOKSHOT_LOOP = 1552,
    ACT_DOTA_RATTLETRAP_HOOKSHOT_END = 1553,
    ACT_STORM_SPIRIT_OVERLOAD_RUN_OVERRIDE = 1554,
    ACT_DOTA_TINKER_REARM1 = 1555,
    ACT_DOTA_TINKER_REARM2 = 1556,
    ACT_DOTA_TINKER_REARM3 = 1557,
    ACT_TINY_AVALANCHE = 1558,
    ACT_TINY_TOSS = 1559,
    ACT_TINY_GROWL = 1560,
    ACT_DOTA_WEAVERBUG_ATTACH = 1561,
    ACT_DOTA_CAST_WILD_AXES_END = 1562,
    ACT_DOTA_CAST_LIFE_BREAK_START = 1563,
    ACT_DOTA_CAST_LIFE_BREAK_END = 1564,
    ACT_DOTA_NIGHTSTALKER_TRANSITION = 1565,
    ACT_DOTA_LIFESTEALER_RAGE = 1566,
    ACT_DOTA_LIFESTEALER_OPEN_WOUNDS = 1567,
    ACT_DOTA_SAND_KING_BURROW_IN = 1568,
    ACT_DOTA_SAND_KING_BURROW_OUT = 1569,
    ACT_DOTA_EARTHSHAKER_TOTEM_ATTACK = 1570,
    ACT_DOTA_WHEEL_LAYER = 1571,
    ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_START = 1572,
    ACT_DOTA_ALCHEMIST_CONCOCTION = 1573,
    ACT_DOTA_JAKIRO_LIQUIDFIRE_START = 1574,
    ACT_DOTA_JAKIRO_LIQUIDFIRE_LOOP = 1575,
    ACT_DOTA_LIFESTEALER_INFEST = 1576,
    ACT_DOTA_LIFESTEALER_INFEST_END = 1577,
    ACT_DOTA_LASSO_LOOP = 1578,
    ACT_DOTA_ALCHEMIST_CONCOCTION_THROW = 1579,
    ACT_DOTA_ALCHEMIST_CHEMICAL_RAGE_END = 1580,
    ACT_DOTA_CAST_COLD_SNAP = 1581,
    ACT_DOTA_CAST_GHOST_WALK = 1582,
    ACT_DOTA_CAST_TORNADO = 1583,
    ACT_DOTA_CAST_EMP = 1584,
    ACT_DOTA_CAST_ALACRITY = 1585,
    ACT_DOTA_CAST_CHAOS_METEOR = 1586,
    ACT_DOTA_CAST_SUN_STRIKE = 1587,
    ACT_DOTA_CAST_FORGE_SPIRIT = 1588,
    ACT_DOTA_CAST_ICE_WALL = 1589,
    ACT_DOTA_CAST_DEAFENING_BLAST = 1590,
    ACT_DOTA_VICTORY = 1591,
    ACT_DOTA_DEFEAT = 1592,
    ACT_DOTA_SPIRIT_BREAKER_CHARGE_POSE = 1593,
    ACT_DOTA_SPIRIT_BREAKER_CHARGE_END = 1594,
    ACT_DOTA_TELEPORT = 1595,
    ACT_DOTA_TELEPORT_END = 1596,
    ACT_DOTA_CAST_REFRACTION = 1597,
    ACT_DOTA_CAST_ABILITY_7 = 1598,
    ACT_DOTA_CANCEL_SIREN_SONG = 1599,
    ACT_DOTA_CHANNEL_ABILITY_7 = 1600,
    ACT_DOTA_LOADOUT = 1601,
    ACT_DOTA_FORCESTAFF_END = 1602,
    ACT_DOTA_POOF_END = 1603,
    ACT_DOTA_SLARK_POUNCE = 1604,
    ACT_DOTA_MAGNUS_SKEWER_START = 1605,
    ACT_DOTA_MAGNUS_SKEWER_END = 1606,
    ACT_DOTA_MEDUSA_STONE_GAZE = 1607,
    ACT_DOTA_RELAX_START = 1608,
    ACT_DOTA_RELAX_LOOP = 1609,
    ACT_DOTA_RELAX_END = 1610,
    ACT_DOTA_CENTAUR_STAMPEDE = 1611,
    ACT_DOTA_BELLYACHE_START = 1612,
    ACT_DOTA_BELLYACHE_LOOP = 1613,
    ACT_DOTA_BELLYACHE_END = 1614,
    ACT_DOTA_ROQUELAIRE_LAND = 1615,
    ACT_DOTA_ROQUELAIRE_LAND_IDLE = 1616,
    ACT_DOTA_GREEVIL_CAST = 1617,
    ACT_DOTA_GREEVIL_OVERRIDE_ABILITY = 1618,
    ACT_DOTA_GREEVIL_HOOK_START = 1619,
    ACT_DOTA_GREEVIL_HOOK_END = 1620,
    ACT_DOTA_GREEVIL_BLINK_BONE = 1621,
    ACT_DOTA_IDLE_SLEEPING = 1622,
    ACT_DOTA_INTRO = 1623,
    ACT_DOTA_GESTURE_POINT = 1624,
    ACT_DOTA_GESTURE_ACCENT = 1625,
    ACT_DOTA_SLEEPING_END = 1626,
    ACT_DOTA_AMBUSH = 1627,
    ACT_DOTA_ITEM_LOOK = 1628,
    ACT_DOTA_STARTLE = 1629,
    ACT_DOTA_FRUSTRATION = 1630,
    ACT_DOTA_TELEPORT_REACT = 1631,
    ACT_DOTA_TELEPORT_END_REACT = 1632,
    ACT_DOTA_SHRUG = 1633,
    ACT_DOTA_RELAX_LOOP_END = 1634,
    ACT_DOTA_PRESENT_ITEM = 1635,
    ACT_DOTA_IDLE_IMPATIENT = 1636,
    ACT_DOTA_SHARPEN_WEAPON = 1637,
    ACT_DOTA_SHARPEN_WEAPON_OUT = 1638,
    ACT_DOTA_IDLE_SLEEPING_END = 1639,
    ACT_DOTA_BRIDGE_DESTROY = 1640,
    ACT_DOTA_TAUNT_SNIPER = 1641,
    ACT_DOTA_DEATH_BY_SNIPER = 1642,
    ACT_DOTA_LOOK_AROUND = 1643,
    ACT_DOTA_CAGED_CREEP_RAGE = 1644,
    ACT_DOTA_CAGED_CREEP_RAGE_OUT = 1645,
    ACT_DOTA_CAGED_CREEP_SMASH = 1646,
    ACT_DOTA_CAGED_CREEP_SMASH_OUT = 1647,
    ACT_DOTA_IDLE_IMPATIENT_SWORD_TAP = 1648,
    ACT_DOTA_INTRO_LOOP = 1649,
    ACT_DOTA_BRIDGE_THREAT = 1650,
    ACT_DOTA_DAGON = 1651,
    ACT_DOTA_CAST_ABILITY_2_ES_ROLL_START = 1652,
    ACT_DOTA_CAST_ABILITY_2_ES_ROLL = 1653,
    ACT_DOTA_CAST_ABILITY_2_ES_ROLL_END = 1654,
    ACT_DOTA_NIAN_PIN_START = 1655,
    ACT_DOTA_NIAN_PIN_LOOP = 1656,
    ACT_DOTA_NIAN_PIN_END = 1657,
    ACT_DOTA_LEAP_STUN = 1658,
    ACT_DOTA_LEAP_SWIPE = 1659,
    ACT_DOTA_NIAN_INTRO_LEAP = 1660,
    ACT_DOTA_AREA_DENY = 1661,
    ACT_DOTA_NIAN_PIN_TO_STUN = 1662,
    ACT_DOTA_RAZE_1 = 1663,
    ACT_DOTA_RAZE_2 = 1664,
    ACT_DOTA_RAZE_3 = 1665,
    ACT_DOTA_UNDYING_DECAY = 1666,
    ACT_DOTA_UNDYING_SOUL_RIP = 1667,
    ACT_DOTA_UNDYING_TOMBSTONE = 1668,
    ACT_DOTA_WHIRLING_AXES_RANGED = 1669,
    ACT_DOTA_SHALLOW_GRAVE = 1670,
    ACT_DOTA_COLD_FEET = 1671,
    ACT_DOTA_ICE_VORTEX = 1672,
    ACT_DOTA_CHILLING_TOUCH = 1673,
    ACT_DOTA_ENFEEBLE = 1674,
    ACT_DOTA_FATAL_BONDS = 1675,
    ACT_DOTA_MIDNIGHT_PULSE = 1676,
    ACT_DOTA_ANCESTRAL_SPIRIT = 1677,
    ACT_DOTA_THUNDER_STRIKE = 1678,
    ACT_DOTA_KINETIC_FIELD = 1679,
    ACT_DOTA_STATIC_STORM = 1680,
    ACT_DOTA_MINI_TAUNT = 1681,
    ACT_DOTA_ARCTIC_BURN_END = 1682,
    ACT_DOTA_LOADOUT_RARE = 1683,
    ACT_DOTA_SWIM = 1684,
    ACT_DOTA_FLEE = 1685,
    ACT_DOTA_TROT = 1686,
    ACT_DOTA_SHAKE = 1687,
    ACT_DOTA_SWIM_IDLE = 1688,
    ACT_DOTA_WAIT_IDLE = 1689,
    ACT_DOTA_GREET = 1690,
    ACT_DOTA_TELEPORT_COOP_START = 1691,
    ACT_DOTA_TELEPORT_COOP_WAIT = 1692,
    ACT_DOTA_TELEPORT_COOP_END = 1693,
    ACT_DOTA_TELEPORT_COOP_EXIT = 1694,
    ACT_DOTA_SHOPKEEPER_PET_INTERACT = 1695,
    ACT_DOTA_ITEM_PICKUP = 1696,
    ACT_DOTA_ITEM_DROP = 1697,
    ACT_DOTA_CAPTURE_PET = 1698,
    ACT_DOTA_PET_WARD_OBSERVER = 1699,
    ACT_DOTA_PET_WARD_SENTRY = 1700,
    ACT_DOTA_PET_LEVEL = 1701,
    ACT_DOTA_CAST_BURROW_END = 1702,
    ACT_DOTA_LIFESTEALER_ASSIMILATE = 1703,
    ACT_DOTA_LIFESTEALER_EJECT = 1704,
    ACT_DOTA_ATTACK_EVENT_BASH = 1705,
    ACT_DOTA_CAPTURE_RARE = 1706,
    ACT_DOTA_AW_MAGNETIC_FIELD = 1707,
    ACT_DOTA_CAST_GHOST_SHIP = 1708,
    ACT_DOTA_FXANIM = 1709,
    ACT_DOTA_VICTORY_START = 1710,
    ACT_DOTA_DEFEAT_START = 1711,
    ACT_DOTA_DP_SPIRIT_SIPHON = 1712,
    ACT_DOTA_TRICKS_END = 1713,
    ACT_DOTA_ES_STONE_CALLER = 1714,
    ACT_DOTA_MK_STRIKE = 1715,
    ACT_DOTA_VERSUS = 1716,
    ACT_DOTA_CAPTURE_CARD = 1717,
    ACT_DOTA_MK_SPRING_SOAR = 1718,
    ACT_DOTA_MK_SPRING_END = 1719,
    ACT_DOTA_MK_TREE_SOAR = 1720,
    ACT_DOTA_MK_TREE_END = 1721,
    ACT_DOTA_MK_FUR_ARMY = 1722,
    ACT_DOTA_MK_SPRING_CAST = 1723,
    ACT_DOTA_NECRO_GHOST_SHROUD = 1724,
    ACT_DOTA_OVERRIDE_ARCANA = 1725,
    ACT_DOTA_SLIDE = 1726,
    ACT_DOTA_SLIDE_LOOP = 1727,
    ACT_DOTA_GENERIC_CHANNEL_1 = 1728,
    ACT_DOTA_GS_SOUL_CHAIN = 1729,
    ACT_DOTA_GS_INK_CREATURE = 1730,
    ACT_DOTA_TRANSITION = 1731,
    ACT_DOTA_BLINK_DAGGER = 1732,
    ACT_DOTA_BLINK_DAGGER_END = 1733,
    ACT_DOTA_CUSTOM_TOWER_ATTACK = 1734,
    ACT_DOTA_CUSTOM_TOWER_IDLE = 1735,
    ACT_DOTA_CUSTOM_TOWER_DIE = 1736,
    ACT_DOTA_CAST_COLD_SNAP_ORB = 1737,
    ACT_DOTA_CAST_GHOST_WALK_ORB = 1738,
    ACT_DOTA_CAST_TORNADO_ORB = 1739,
    ACT_DOTA_CAST_EMP_ORB = 1740,
    ACT_DOTA_CAST_ALACRITY_ORB = 1741,
    ACT_DOTA_CAST_CHAOS_METEOR_ORB = 1742,
    ACT_DOTA_CAST_SUN_STRIKE_ORB = 1743,
    ACT_DOTA_CAST_FORGE_SPIRIT_ORB = 1744,
    ACT_DOTA_CAST_ICE_WALL_ORB = 1745,
    ACT_DOTA_CAST_DEAFENING_BLAST_ORB = 1746,
    ACT_DOTA_NOTICE = 1747,
    ACT_DOTA_CAST_ABILITY_2_ALLY = 1748,
    ACT_DOTA_SHUFFLE_L = 1749,
    ACT_DOTA_SHUFFLE_R = 1750,
    ACT_DOTA_OVERRIDE_LOADOUT = 1751,
    ACT_DOTA_TAUNT_SPECIAL = 1752,
    ACT_DOTA_TELEPORT_START = 1753,
    ACT_DOTA_GENERIC_CHANNEL_1_START = 1754,
    ACT_DOTA_CUSTOM_TOWER_IDLE_RARE = 1755,
    ACT_DOTA_CUSTOM_TOWER_TAUNT = 1756,
    ACT_DOTA_CUSTOM_TOWER_HIGH_FIVE = 1757,
    ACT_DOTA_ATTACK_SPECIAL = 1758,
    ACT_DOTA_TRANSITION_IDLE = 1759,
    ACT_DOTA_PIERCE_THE_VEIL = 1760,
    ACT_DOTA_RUN_RARE = 1761,
    ACT_DOTA_VIPER_DIVE = 1762,
    ACT_DOTA_VIPER_DIVE_END = 1763,
    ACT_DOTA_MK_STRIKE_END = 1764,
    ACT_DOTA_SHADOW_VAULT = 1765,
    ACT_DOTA_KEZ_KATANA_ULT_START = 1766,
    ACT_DOTA_KEZ_KATANA_ULT_CHAIN_A = 1767,
    ACT_DOTA_KEZ_KATANA_ULT_CHAIN_B = 1768,
    ACT_DOTA_KEZ_KATANA_ULT_END = 1769,
    ACT_DOTA_KEZ_KATANA_IMPALE = 1770,
    ACT_DOTA_KEZ_KATANA_IMPALE_FAST = 1771,
    ACT_DOTA_UNICYCLE = 1772,
    ACT_DOTA_UNICYCLE_END = 1773,
}

declare enum DOTAMinimapEvent_t
{
    DOTA_MINIMAP_EVENT_ANCIENT_UNDER_ATTACK = 2,
    DOTA_MINIMAP_EVENT_BASE_UNDER_ATTACK = 4,
    DOTA_MINIMAP_EVENT_BASE_GLYPHED = 8,
    DOTA_MINIMAP_EVENT_TEAMMATE_UNDER_ATTACK = 16,
    DOTA_MINIMAP_EVENT_TEAMMATE_TELEPORTING = 32,
    DOTA_MINIMAP_EVENT_TEAMMATE_DIED = 64,
    DOTA_MINIMAP_EVENT_TUTORIAL_TASK_ACTIVE = 128,
    DOTA_MINIMAP_EVENT_TUTORIAL_TASK_FINISHED = 256,
    DOTA_MINIMAP_EVENT_HINT_LOCATION = 512,
    DOTA_MINIMAP_EVENT_ENEMY_TELEPORTING = 1024,
    DOTA_MINIMAP_EVENT_CANCEL_TELEPORTING = 2048,
    DOTA_MINIMAP_EVENT_RADAR = 4096,
    DOTA_MINIMAP_EVENT_RADAR_TARGET = 8192,
    DOTA_MINIMAP_EVENT_MOVE_TO_TARGET = 16384,
}

declare enum DOTASlotType_t
{
    DOTA_LOADOUT_TYPE_INVALID = -1,
    DOTA_LOADOUT_TYPE_WEAPON = 0,
    DOTA_LOADOUT_TYPE_OFFHAND_WEAPON = 1,
    DOTA_LOADOUT_TYPE_WEAPON2 = 2,
    DOTA_LOADOUT_TYPE_OFFHAND_WEAPON2 = 3,
    DOTA_LOADOUT_TYPE_HEAD = 4,
    DOTA_LOADOUT_TYPE_SHOULDER = 5,
    DOTA_LOADOUT_TYPE_ARMS = 6,
    DOTA_LOADOUT_TYPE_ARMOR = 7,
    DOTA_LOADOUT_TYPE_BELT = 8,
    DOTA_LOADOUT_TYPE_NECK = 9,
    DOTA_LOADOUT_TYPE_BACK = 10,
    DOTA_LOADOUT_TYPE_GLOVES = 11,
    DOTA_LOADOUT_TYPE_LEGS = 12,
    DOTA_LOADOUT_TYPE_TAIL = 13,
    DOTA_LOADOUT_TYPE_MISC = 14,
    DOTA_LOADOUT_TYPE_COSTUME = 15,
    DOTA_LOADOUT_TYPE_HERO_BASE = 16,
    DOTA_LOADOUT_TYPE_BODY_HEAD = 17,
    DOTA_LOADOUT_TYPE_MOUNT = 18,
    DOTA_LOADOUT_TYPE_SUMMON = 19,
    DOTA_LOADOUT_TYPE_SHAPESHIFT = 20,
    DOTA_LOADOUT_TYPE_TAUNT = 21,
    DOTA_LOADOUT_TYPE_HERO_EFFIGY = 22,
    DOTA_LOADOUT_TYPE_AMBIENT_EFFECTS = 23,
    DOTA_LOADOUT_TYPE_ABILITY_ATTACK = 24,
    DOTA_LOADOUT_TYPE_ABILITY1 = 25,
    DOTA_LOADOUT_TYPE_ABILITY2 = 26,
    DOTA_LOADOUT_TYPE_ABILITY3 = 27,
    DOTA_LOADOUT_TYPE_ABILITY4 = 28,
    DOTA_LOADOUT_TYPE_ABILITY_ULTIMATE = 29,
    DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_1 = 30,
    DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_2 = 31,
    DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_3 = 32,
    DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_4 = 33,
    DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_5 = 34,
    DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_6 = 35,
    DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_7 = 36,
    DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_8 = 37,
    DOTA_LOADOUT_TYPE_ABILITY_EFFECTS_9 = 38,
    DOTA_LOADOUT_TYPE_VOICE = 39,
    DOTA_LOADOUT_TYPE_WEAPON_PERSONA_1 = 40,
    DOTA_LOADOUT_TYPE_OFFHAND_WEAPON_PERSONA_1 = 41,
    DOTA_LOADOUT_TYPE_WEAPON2_PERSONA_1 = 42,
    DOTA_LOADOUT_TYPE_OFFHAND_WEAPON2_PERSONA_1 = 43,
    DOTA_LOADOUT_TYPE_HEAD_PERSONA_1 = 44,
    DOTA_LOADOUT_TYPE_SHOULDER_PERSONA_1 = 45,
    DOTA_LOADOUT_TYPE_ARMS_PERSONA_1 = 46,
    DOTA_LOADOUT_TYPE_ARMOR_PERSONA_1 = 47,
    DOTA_LOADOUT_TYPE_BELT_PERSONA_1 = 48,
    DOTA_LOADOUT_TYPE_NECK_PERSONA_1 = 49,
    DOTA_LOADOUT_TYPE_BACK_PERSONA_1 = 50,
    DOTA_LOADOUT_TYPE_LEGS_PERSONA_1 = 51,
    DOTA_LOADOUT_TYPE_GLOVES_PERSONA_1 = 52,
    DOTA_LOADOUT_TYPE_TAIL_PERSONA_1 = 53,
    DOTA_LOADOUT_TYPE_MISC_PERSONA_1 = 54,
    DOTA_LOADOUT_TYPE_BODY_HEAD_PERSONA_1 = 55,
    DOTA_LOADOUT_TYPE_MOUNT_PERSONA_1 = 56,
    DOTA_LOADOUT_TYPE_SUMMON_PERSONA_1 = 57,
    DOTA_LOADOUT_TYPE_SHAPESHIFT_PERSONA_1 = 58,
    DOTA_LOADOUT_TYPE_TAUNT_PERSONA_1 = 59,
    DOTA_LOADOUT_TYPE_HERO_EFFIGY_PERSONA_1 = 60,
    DOTA_LOADOUT_TYPE_AMBIENT_EFFECTS_PERSONA_1 = 61,
    DOTA_LOADOUT_TYPE_ABILITY_ATTACK_PERSONA_1 = 62,
    DOTA_LOADOUT_TYPE_ABILITY1_PERSONA_1 = 63,
    DOTA_LOADOUT_TYPE_ABILITY2_PERSONA_1 = 64,
    DOTA_LOADOUT_TYPE_ABILITY3_PERSONA_1 = 65,
    DOTA_LOADOUT_TYPE_ABILITY4_PERSONA_1 = 66,
    DOTA_LOADOUT_TYPE_ABILITY_ULTIMATE_PERSONA_1 = 67,
    DOTA_LOADOUT_TYPE_VOICE_PERSONA_1 = 68,
    DOTA_LOADOUT_PERSONA_1_START = 40,
    DOTA_LOADOUT_PERSONA_1_END = 68,
    DOTA_LOADOUT_TYPE_PERSONA_SELECTOR = 69,
    DOTA_LOADOUT_TYPE_COURIER = 70,
    DOTA_LOADOUT_TYPE_ANNOUNCER = 71,
    DOTA_LOADOUT_TYPE_MEGA_KILLS = 72,
    DOTA_LOADOUT_TYPE_MUSIC = 73,
    DOTA_LOADOUT_TYPE_WARD = 74,
    DOTA_LOADOUT_TYPE_HUD_SKIN = 75,
    DOTA_LOADOUT_TYPE_LOADING_SCREEN = 76,
    DOTA_LOADOUT_TYPE_WEATHER = 77,
    DOTA_LOADOUT_TYPE_HEROIC_STATUE = 78,
    DOTA_LOADOUT_TYPE_MULTIKILL_BANNER = 79,
    DOTA_LOADOUT_TYPE_CURSOR_PACK = 80,
    DOTA_LOADOUT_TYPE_TELEPORT_EFFECT = 81,
    DOTA_LOADOUT_TYPE_BLINK_EFFECT = 82,
    DOTA_LOADOUT_TYPE_EMBLEM = 83,
    DOTA_LOADOUT_TYPE_TERRAIN = 84,
    DOTA_LOADOUT_TYPE_RADIANT_CREEPS = 85,
    DOTA_LOADOUT_TYPE_DIRE_CREEPS = 86,
    DOTA_LOADOUT_TYPE_RADIANT_TOWER = 87,
    DOTA_LOADOUT_TYPE_DIRE_TOWER = 88,
    DOTA_LOADOUT_TYPE_VERSUS_SCREEN = 89,
    DOTA_LOADOUT_TYPE_STREAK_EFFECT = 90,
    DOTA_LOADOUT_TYPE_KILL_EFFECT = 91,
    DOTA_LOADOUT_TYPE_DEATH_EFFECT = 92,
    DOTA_LOADOUT_TYPE_HEAD_EFFECT = 93,
    DOTA_LOADOUT_TYPE_MAP_EFFECT = 94,
    DOTA_LOADOUT_TYPE_COURIER_EFFECT = 95,
    DOTA_LOADOUT_TYPE_RADIANT_SIEGE_CREEPS = 96,
    DOTA_LOADOUT_TYPE_DIRE_SIEGE_CREEPS = 97,
    DOTA_LOADOUT_TYPE_ROSHAN = 98,
    DOTA_LOADOUT_TYPE_TORMENTOR = 99,
    DOTA_LOADOUT_TYPE_ANCIENT = 100,
    DOTA_PLAYER_LOADOUT_START = 70,
    DOTA_PLAYER_LOADOUT_END = 100,
    DOTA_LOADOUT_TYPE_NONE = 101,
    DOTA_LOADOUT_TYPE_COUNT = 102,
}

declare enum modifierfunction
{
    /** GetModifierPreAttack_BonusDamage */
    MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE = 0,
    /** GetModifierPreAttack_BonusDamage_Target */
    MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_TARGET = 1,
    /** GetModifierPreAttack_BonusDamage_Proc */
    MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_PROC = 2,
    /** GetModifierPreAttack_BonusDamagePostCrit */
    MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_POST_CRIT = 3,
    /** GetModifierBaseAttack_BonusDamage */
    MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE = 4,
    /** GetModifierProcAttack_BonusDamage_Physical */
    MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL = 5,
    /** GetModifierProcAttack_ConvertPhysicalToMagical */
    MODIFIER_PROPERTY_PROCATTACK_CONVERT_PHYSICAL_TO_MAGICAL = 6,
    /** GetModifierProcAttack_BonusDamage_Magical */
    MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL = 7,
    /** GetModifierProcAttack_BonusDamage_Pure */
    MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PURE = 8,
    /** GetModifierProcAttack_BonusDamage_Magical_Target */
    MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL_TARGET = 9,
    /** GetModifierProcAttack_Feedback */
    MODIFIER_PROPERTY_PROCATTACK_FEEDBACK = 10,
    /** GetModifierOverrideAttackDamage */
    MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE = 11,
    /** GetModifierPreAttack */
    MODIFIER_PROPERTY_PRE_ATTACK = 12,
    /** GetModifierInvisibilityLevel */
    MODIFIER_PROPERTY_INVISIBILITY_LEVEL = 13,
    /** GetModifierInvisibilityAttackBehaviorException */
    MODIFIER_PROPERTY_INVISIBILITY_ATTACK_BEHAVIOR_EXCEPTION = 14,
    /** GetModifierPersistentInvisibility */
    MODIFIER_PROPERTY_PERSISTENT_INVISIBILITY = 15,
    /** GetModifierMoveSpeedBonus_Constant */
    MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT = 16,
    /** GetModifierMoveSpeedOverride */
    MODIFIER_PROPERTY_MOVESPEED_BASE_OVERRIDE = 17,
    /** GetModifierMoveSpeed_MinOverride */
    MODIFIER_PROPERTY_MOVESPEED_MIN_OVERRIDE = 18,
    /** GetModifierMoveSpeed_MaxOverride */
    MODIFIER_PROPERTY_MOVESPEED_MAX_OVERRIDE = 19,
    /** GetModifierMoveSpeedBonus_Percentage */
    MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE = 20,
    /** GetModifierMoveSpeedBonus_Percentage_Unique */
    MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE_UNIQUE = 21,
    /** GetModifierMoveSpeedBonus_Special_Boots */
    MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE = 22,
    /** GetModifierMoveSpeedBonus_Special_Boots_2 */
    MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE_2 = 23,
    /** GetModifierMoveSpeedBonus_Constant_Unique */
    MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE = 24,
    /** GetModifierMoveSpeedBonus_Constant_Unique_2 */
    MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT_UNIQUE_2 = 25,
    /** GetModifierMoveSpeed_Absolute */
    MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE = 26,
    /** GetModifierMoveSpeed_AbsoluteMin */
    MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MIN = 27,
    /** GetModifierMoveSpeed_AbsoluteMax */
    MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MAX = 28,
    /** GetModifierIgnoreMovespeedLimit */
    MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT = 29,
    /** GetModifierMoveSpeed_Limit */
    MODIFIER_PROPERTY_MOVESPEED_LIMIT = 30,
    /** GetModifierAttackSpeedBaseOverride */
    MODIFIER_PROPERTY_ATTACKSPEED_BASE_OVERRIDE = 31,
    /** GetModifierFixedAttackRate */
    MODIFIER_PROPERTY_FIXED_ATTACK_RATE = 32,
    /** GetModifierAttackSpeedBonus_Constant */
    MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT = 33,
    /** GetModifierAttackSpeed_Limit */
    MODIFIER_PROPERTY_IGNORE_ATTACKSPEED_LIMIT = 34,
    /** GetModifierCooldownReduction_Constant */
    MODIFIER_PROPERTY_COOLDOWN_REDUCTION_CONSTANT = 35,
    /** GetModifierManacostReduction_Constant */
    MODIFIER_PROPERTY_MANACOST_REDUCTION_CONSTANT = 36,
    /** GetModifierHealthcostReduction_Constant */
    MODIFIER_PROPERTY_HEALTHCOST_REDUCTION_CONSTANT = 37,
    /** GetModifierBaseAttackTimeConstant */
    MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT = 38,
    /** GetModifierBaseAttackTimeConstant_Adjust */
    MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT_ADJUST = 39,
    /** GetModifierBaseAttackTimePercentage */
    MODIFIER_PROPERTY_BASE_ATTACK_TIME_PERCENTAGE = 40,
    /** GetModifierAttackPointConstant */
    MODIFIER_PROPERTY_ATTACK_POINT_CONSTANT = 41,
    /** GetModifierBonusDamageOutgoing_Percentage */
    MODIFIER_PROPERTY_BONUSDAMAGEOUTGOING_PERCENTAGE = 42,
    /** GetModifierDamageOutgoing_Percentage */
    MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE = 43,
    /** GetModifierDamageOutgoing_Percentage_Illusion */
    MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_ILLUSION = 44,
    /** GetModifierDamageOutgoing_Percentage_Illusion_Amplify */
    MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_ILLUSION_AMPLIFY = 45,
    /** GetModifierTotalDamageOutgoing_Percentage */
    MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE = 46,
    /** GetModifierSpellAmplify_PercentageCreep */
    MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE_CREEP = 47,
    /** GetModifierSpellAmplify_Percentage */
    MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE = 48,
    /** GetModifierSpellAmplify_PercentageUnique */
    MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE_UNIQUE = 49,
    /** GetModifierSpellAmplify_PercentageTarget */
    MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE_TARGET = 50,
    /** GetModifierHealAmplify_PercentageSource */
    MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_SOURCE = 51,
    /** GetModifierHealAmplify_PercentageTarget */
    MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_TARGET = 52,
    /** GetModifierHPRegen_CanBeNegative */
    MODIFIER_PROPERTY_HP_REGEN_CAN_BE_NEGATIVE = 53,
    /** GetModifierHPRegenAmplify_Percentage */
    MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE = 54,
    /** GetModifierLifestealRegenAmplify_Percentage */
    MODIFIER_PROPERTY_LIFESTEAL_AMPLIFY_PERCENTAGE = 55,
    /** GetModifierSpellLifestealRegenAmplify_Percentage */
    MODIFIER_PROPERTY_SPELL_LIFESTEAL_AMPLIFY_PERCENTAGE = 56,
    /** GetModifierSpellLifestealRegenAmplify_Percentage_Unique */
    MODIFIER_PROPERTY_SPELL_LIFESTEAL_AMPLIFY_PERCENTAGE_UNIQUE = 57,
    /** GetModifierMPRegenAmplify_Percentage */
    MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE = 58,
    /** GetModifierMPRegenAmplify_Percentage_Unique */
    MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE_UNIQUE = 59,
    /** GetModifierManaDrainAmplify_Percentage */
    MODIFIER_PROPERTY_MANA_DRAIN_AMPLIFY_PERCENTAGE = 60,
    /** GetModifierMPRestoreAmplify_Percentage */
    MODIFIER_PROPERTY_MP_RESTORE_AMPLIFY_PERCENTAGE = 61,
    /** GetModifierBaseDamageOutgoing_Percentage */
    MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE = 62,
    /** GetModifierBaseDamageOutgoing_PercentageUnique */
    MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE_UNIQUE = 63,
    /** GetModifierIncomingDamage_Percentage */
    MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE = 64,
    /** GetModifierIncomingPhysicalDamage_Percentage */
    MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_PERCENTAGE = 65,
    /** GetModifierIncomingPhysicalDamageConstant */
    MODIFIER_PROPERTY_INCOMING_PHYSICAL_DAMAGE_CONSTANT = 66,
    /** GetModifierIncomingSpellDamageConstant */
    MODIFIER_PROPERTY_INCOMING_SPELL_DAMAGE_CONSTANT = 67,
    /** GetModifierEvasion_Constant */
    MODIFIER_PROPERTY_EVASION_CONSTANT = 68,
    /** GetModifierNegativeEvasion_Constant */
    MODIFIER_PROPERTY_NEGATIVE_EVASION_CONSTANT = 69,
    /** GetModifierStatusResistance */
    MODIFIER_PROPERTY_STATUS_RESISTANCE = 70,
    /** GetModifierStatusResistanceStacking */
    MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING = 71,
    /** GetModifierStatusResistanceCaster */
    MODIFIER_PROPERTY_STATUS_RESISTANCE_CASTER = 72,
    /** GetModifierAvoidDamage */
    MODIFIER_PROPERTY_AVOID_DAMAGE = 73,
    /** GetModifierAvoidSpell */
    MODIFIER_PROPERTY_AVOID_SPELL = 74,
    /** GetModifierMiss_Percentage */
    MODIFIER_PROPERTY_MISS_PERCENTAGE = 75,
    /** GetModifierPhysicalArmorBase_Percentage */
    MODIFIER_PROPERTY_PHYSICAL_ARMOR_BASE_PERCENTAGE = 76,
    /** GetModifierPhysicalArmorTotal_Percentage */
    MODIFIER_PROPERTY_PHYSICAL_ARMOR_TOTAL_PERCENTAGE = 77,
    /** GetModifierPhysicalArmorBonus */
    MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS = 78,
    /** GetModifierPhysicalArmorBonusUnique */
    MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE = 79,
    /** GetModifierPhysicalArmorBonusUniqueActive */
    MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_UNIQUE_ACTIVE = 80,
    /** GetModifierPhysicalArmorBonusPost */
    MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS_POST = 81,
    /** GetModifierMinPhysicalArmor */
    MODIFIER_PROPERTY_MIN_PHYSICAL_ARMOR = 82,
    /** GetModifierIgnorePhysicalArmor */
    MODIFIER_PROPERTY_IGNORE_PHYSICAL_ARMOR = 83,
    /** GetModifierMagicalResistanceBaseReduction */
    MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BASE_REDUCTION = 84,
    /** GetModifierMagicalResistanceDirectModification */
    MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DIRECT_MODIFICATION = 85,
    /** GetModifierMagicalResistanceBonus */
    MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS = 86,
    /** GetModifierMagicalResistanceBonusIllusions */
    MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS_ILLUSIONS = 87,
    /** GetModifierMagicalResistanceBonusUnique */
    MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS_UNIQUE = 88,
    /** GetModifierMagicalResistanceDecrepifyUnique */
    MODIFIER_PROPERTY_MAGICAL_RESISTANCE_DECREPIFY_UNIQUE = 89,
    /** GetModifierBaseRegen */
    MODIFIER_PROPERTY_BASE_MANA_REGEN = 90,
    /** GetModifierConstantManaRegen */
    MODIFIER_PROPERTY_MANA_REGEN_CONSTANT = 91,
    /** GetModifierConstantManaRegenUnique */
    MODIFIER_PROPERTY_MANA_REGEN_CONSTANT_UNIQUE = 92,
    /** GetModifierTotalPercentageManaRegen */
    MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE = 93,
    /** GetModifierConstantHealthRegen */
    MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT = 94,
    /** GetModifierHealthRegenPercentage */
    MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE = 95,
    /** GetModifierHealthRegenPercentageUnique */
    MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE_UNIQUE = 96,
    /** GetModifierHealthBonus */
    MODIFIER_PROPERTY_HEALTH_BONUS = 97,
    /** GetModifierManaBonus */
    MODIFIER_PROPERTY_MANA_BONUS = 98,
    /** GetModifierExtraStrengthBonus */
    MODIFIER_PROPERTY_EXTRA_STRENGTH_BONUS = 99,
    /** GetModifierExtraHealthBonus */
    MODIFIER_PROPERTY_EXTRA_HEALTH_BONUS = 100,
    /** GetModifierExtraManaBonus */
    MODIFIER_PROPERTY_EXTRA_MANA_BONUS = 101,
    /** GetModifierExtraManaBonusPercentage */
    MODIFIER_PROPERTY_EXTRA_MANA_BONUS_PERCENTAGE = 102,
    /** GetModifierExtraHealthPercentage */
    MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE = 103,
    /** GetModifierExtraManaPercentage */
    MODIFIER_PROPERTY_EXTRA_MANA_PERCENTAGE = 104,
    /** GetModifierBonusStats_Strength */
    MODIFIER_PROPERTY_STATS_STRENGTH_BONUS = 105,
    /** GetModifierBonusStats_Agility */
    MODIFIER_PROPERTY_STATS_AGILITY_BONUS = 106,
    /** GetModifierBonusStats_Intellect */
    MODIFIER_PROPERTY_STATS_INTELLECT_BONUS = 107,
    /** GetModifierBonusStats_Strength_Percentage */
    MODIFIER_PROPERTY_STATS_STRENGTH_BONUS_PERCENTAGE = 108,
    /** GetModifierBonusStats_Agility_Percentage */
    MODIFIER_PROPERTY_STATS_AGILITY_BONUS_PERCENTAGE = 109,
    /** GetModifierBonusStats_Intellect_Percentage */
    MODIFIER_PROPERTY_STATS_INTELLECT_BONUS_PERCENTAGE = 110,
    /** GetModifierCastRangeBonus */
    MODIFIER_PROPERTY_CAST_RANGE_BONUS = 111,
    /** GetModifierCastRangeBonusPercentage */
    MODIFIER_PROPERTY_CAST_RANGE_BONUS_PERCENTAGE = 112,
    /** GetModifierCastRangeBonusTarget */
    MODIFIER_PROPERTY_CAST_RANGE_BONUS_TARGET = 113,
    /** GetModifierCastRangeBonusStacking */
    MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING = 114,
    /** GetModifierAttackRangeOverride */
    MODIFIER_PROPERTY_ATTACK_RANGE_BASE_OVERRIDE = 115,
    /** GetModifierAttackRangeBonus */
    MODIFIER_PROPERTY_ATTACK_RANGE_BONUS = 116,
    /** GetModifierAttackRangeBonusUnique */
    MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_UNIQUE = 117,
    /** GetModifierAttackRangeBonusPercentage */
    MODIFIER_PROPERTY_ATTACK_RANGE_BONUS_PERCENTAGE = 118,
    /** GetModifierMaxAttackRange */
    MODIFIER_PROPERTY_MAX_ATTACK_RANGE = 119,
    /** GetModifierProjectileSpeedBonus */
    MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS = 120,
    /** GetModifierProjectileSpeedBonusPercentage */
    MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS_PERCENTAGE = 121,
    /** GetModifierProjectileName */
    MODIFIER_PROPERTY_PROJECTILE_NAME = 122,
    /** ReincarnateTime */
    MODIFIER_PROPERTY_REINCARNATION = 123,
    /** ReincarnateSuppressFX */
    MODIFIER_PROPERTY_REINCARNATION_SUPPRESS_FX = 124,
    /** GetModifierConstantRespawnTime */
    MODIFIER_PROPERTY_RESPAWNTIME = 125,
    /** GetModifierPercentageRespawnTime */
    MODIFIER_PROPERTY_RESPAWNTIME_PERCENTAGE = 126,
    /** GetModifierStackingRespawnTime */
    MODIFIER_PROPERTY_RESPAWNTIME_STACKING = 127,
    /** GetModifierPercentageCooldown */
    MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE = 128,
    /** GetModifierPercentageCooldownOngoing */
    MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_ONGOING = 129,
    /** GetModifierPercentageCasttime */
    MODIFIER_PROPERTY_CASTTIME_PERCENTAGE = 130,
    /** GetModifierPercentageAttackAnimTime */
    MODIFIER_PROPERTY_ATTACK_ANIM_TIME_PERCENTAGE = 131,
    /** GetModifierPercentageManacost */
    MODIFIER_PROPERTY_MANACOST_PERCENTAGE = 132,
    /** GetModifierPercentageManacostStacking */
    MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING = 133,
    /** GetModifierPercentageHealthcost */
    MODIFIER_PROPERTY_HEALTHCOST_PERCENTAGE = 134,
    /** GetModifierPercentageHealthcostStacking */
    MODIFIER_PROPERTY_HEALTHCOST_PERCENTAGE_STACKING = 135,
    /** GetModifierConstantDeathGoldCost */
    MODIFIER_PROPERTY_DEATHGOLDCOST = 136,
    /** GetModifierPercentageDeathGoldCost */
    MODIFIER_PROPERTY_PERCENTAGE_DEATHGOLDCOST = 137,
    /** GetModifierPercentageExpRateBoost */
    MODIFIER_PROPERTY_EXP_RATE_BOOST = 138,
    /** GetModifierPercentageGoldRateBoost */
    MODIFIER_PROPERTY_GOLD_RATE_BOOST = 139,
    /** GetModifierPreAttack_CriticalStrike */
    MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE = 140,
    /** GetModifierPreAttack_Target_CriticalStrike */
    MODIFIER_PROPERTY_PREATTACK_TARGET_CRITICALSTRIKE = 141,
    /** GetModifierMagical_ConstantBlock */
    MODIFIER_PROPERTY_MAGICAL_CONSTANT_BLOCK = 142,
    /** GetModifierPhysical_ConstantBlock */
    MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK = 143,
    /** GetModifierPhysical_ConstantBlockSpecial */
    MODIFIER_PROPERTY_PHYSICAL_CONSTANT_BLOCK_SPECIAL = 144,
    /** GetModifierInnateDamageBlockPctOverride */
    MODIFIER_PROPERTY_INNATE_DAMAGE_BLOCK_PCT_OVERRIDE = 145,
    /** GetModifierPhysical_ConstantBlockUnavoidablePreArmor */
    MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK_UNAVOIDABLE_PRE_ARMOR = 146,
    /** GetModifierTotal_ConstantBlock */
    MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK = 147,
    /** GetOverrideAnimation */
    MODIFIER_PROPERTY_OVERRIDE_ANIMATION = 148,
    /** GetOverrideAnimationRate */
    MODIFIER_PROPERTY_OVERRIDE_ANIMATION_RATE = 149,
    /** GetAbsorbSpell */
    MODIFIER_PROPERTY_ABSORB_SPELL = 150,
    /** GetReflectSpell */
    MODIFIER_PROPERTY_REFLECT_SPELL = 151,
    /** GetDisableAutoAttack */
    MODIFIER_PROPERTY_DISABLE_AUTOATTACK = 152,
    /** GetBonusDayVision */
    MODIFIER_PROPERTY_BONUS_DAY_VISION = 153,
    /** GetBonusDayVisionPercentage */
    MODIFIER_PROPERTY_BONUS_DAY_VISION_PERCENTAGE = 154,
    /** GetBonusNightVision */
    MODIFIER_PROPERTY_BONUS_NIGHT_VISION = 155,
    /** GetBonusNightVisionUnique */
    MODIFIER_PROPERTY_BONUS_NIGHT_VISION_UNIQUE = 156,
    /** GetBonusVisionPercentage */
    MODIFIER_PROPERTY_BONUS_VISION_PERCENTAGE = 157,
    /** GetFixedDayVision */
    MODIFIER_PROPERTY_FIXED_DAY_VISION = 158,
    /** GetFixedNightVision */
    MODIFIER_PROPERTY_FIXED_NIGHT_VISION = 159,
    /** GetMinHealth */
    MODIFIER_PROPERTY_MIN_HEALTH = 160,
    /** GetMinMana */
    MODIFIER_PROPERTY_MIN_MANA = 161,
    /** GetAbsoluteNoDamagePhysical */
    MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL = 162,
    /** GetAbsoluteNoDamageMagical */
    MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL = 163,
    /** GetAbsoluteNoDamagePure */
    MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE = 164,
    /** GetIsIllusion */
    MODIFIER_PROPERTY_IS_ILLUSION = 165,
    /** GetModifierIllusionLabel */
    MODIFIER_PROPERTY_ILLUSION_LABEL = 166,
    /** GetModifierStrongIllusion */
    MODIFIER_PROPERTY_STRONG_ILLUSION = 167,
    /** GetModifierSuperIllusion */
    MODIFIER_PROPERTY_SUPER_ILLUSION = 168,
    /** GetModifierSuperIllusionWithUltimate */
    MODIFIER_PROPERTY_SUPER_ILLUSION_WITH_ULTIMATE = 169,
    /** GetModifierXPDuringDeath */
    MODIFIER_PROPERTY_XP_DURING_DEATH = 170,
    /** GetModifierTurnRate_Percentage */
    MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE = 171,
    /** GetModifierTurnRate_Override */
    MODIFIER_PROPERTY_TURN_RATE_OVERRIDE = 172,
    /** GetDisableHealing */
    MODIFIER_PROPERTY_DISABLE_HEALING = 173,
    /** GetDisableManaGain */
    MODIFIER_PROPERTY_DISABLE_MANA_GAIN = 174,
    /** GetAlwaysAllowAttack */
    MODIFIER_PROPERTY_ALWAYS_ALLOW_ATTACK = 175,
    /** GetAllowEtherealAttack */
    MODIFIER_PROPERTY_ALWAYS_ETHEREAL_ATTACK = 176,
    /** GetOverrideAttackMagical */
    MODIFIER_PROPERTY_OVERRIDE_ATTACK_MAGICAL = 177,
    /** GetModifierUnitStatsNeedsRefresh */
    MODIFIER_PROPERTY_UNIT_STATS_NEEDS_REFRESH = 178,
    /** Unused */
    MODIFIER_PROPERTY_BOUNTY_CREEP_MULTIPLIER = 179,
    /** Unused */
    MODIFIER_PROPERTY_BOUNTY_OTHER_MULTIPLIER = 180,
    /** GetModifierUnitDisllowUpgrading */
    MODIFIER_PROPERTY_UNIT_DISALLOW_UPGRADING = 181,
    /** GetModifierDodgeProjectile */
    MODIFIER_PROPERTY_DODGE_PROJECTILE = 182,
    /** GetTriggerCosmeticAndEndAttack */
    MODIFIER_PROPERTY_TRIGGER_COSMETIC_AND_END_ATTACK = 183,
    /** GetModifierMaxDebuffDuration */
    MODIFIER_PROPERTY_MAX_DEBUFF_DURATION = 184,
    /** GetPrimaryStatDamageMultiplier */
    MODIFIER_PROPERTY_PRIMARY_STAT_DAMAGE_MULTIPLIER = 185,
    /** GetModifierPreAttack_DeadlyBlow */
    MODIFIER_PROPERTY_PREATTACK_DEADLY_BLOW = 186,
    /** GetAlwaysAutoAttackWhileHoldPosition */
    MODIFIER_PROPERTY_ALWAYS_AUTOATTACK_WHILE_HOLD_POSITION = 187,
    /** GetPhysicalArmorPiercingPercentageTarget */
    MODIFIER_PROPERTY_PHYSICAL_ARMOR_PIERCING_PERCENTAGE_TARGET = 188,
    /** GetMagicalArmorPiercingPercentageTarget */
    MODIFIER_PROPERTY_MAGICAL_ARMOR_PIERCING_PERCENTAGE_TARGET = 189,
    /** GetCriticalStrikeBonus */
    MODIFIER_PROPERTY_CRITICAL_STRIKE_BONUS = 190,
    /** GetConvertAttackPhysicalToPure */
    MODIFIER_PROPERTY_CONVERT_ATTACK_PHYSICAL_TO_PURE = 191,
    /** OnSpellTargetReady */
    MODIFIER_EVENT_ON_SPELL_TARGET_READY = 192,
    /** OnAttackRecord */
    MODIFIER_EVENT_ON_ATTACK_RECORD = 193,
    /** OnAttackStart */
    MODIFIER_EVENT_ON_ATTACK_START = 194,
    /** OnAttack */
    MODIFIER_EVENT_ON_ATTACK = 195,
    /** OnAttackLanded */
    MODIFIER_EVENT_ON_ATTACK_LANDED = 196,
    /** OnAttackFail */
    MODIFIER_EVENT_ON_ATTACK_FAIL = 197,
    /** OnAttackAllied */
    MODIFIER_EVENT_ON_ATTACK_ALLIED = 198,
    /** OnProjectileDodge */
    MODIFIER_EVENT_ON_PROJECTILE_DODGE = 199,
    /** OnOrder */
    MODIFIER_EVENT_ON_ORDER = 200,
    /** OnUnitMoved */
    MODIFIER_EVENT_ON_UNIT_MOVED = 201,
    /** OnAbilityStart */
    MODIFIER_EVENT_ON_ABILITY_START = 202,
    /** OnAbilityExecuted */
    MODIFIER_EVENT_ON_ABILITY_EXECUTED = 203,
    /** OnAbilityFullyCast */
    MODIFIER_EVENT_ON_ABILITY_FULLY_CAST = 204,
    /** OnBreakInvisibility */
    MODIFIER_EVENT_ON_BREAK_INVISIBILITY = 205,
    /** OnAbilityEndChannel */
    MODIFIER_EVENT_ON_ABILITY_END_CHANNEL = 206,
    /** Unused */
    MODIFIER_EVENT_ON_PROCESS_UPGRADE = 207,
    /** Unused */
    MODIFIER_EVENT_ON_REFRESH = 208,
    /** OnTakeDamage */
    MODIFIER_EVENT_ON_TAKEDAMAGE = 209,
    /** OnDamagePrevented */
    MODIFIER_EVENT_ON_DEATH_PREVENTED = 210,
    /** OnStateChanged */
    MODIFIER_EVENT_ON_STATE_CHANGED = 211,
    /** Unused */
    MODIFIER_EVENT_ON_ORB_EFFECT = 212,
    /** OnProcessCleave */
    MODIFIER_EVENT_ON_PROCESS_CLEAVE = 213,
    /** OnDamageCalculated */
    MODIFIER_EVENT_ON_DAMAGE_CALCULATED = 214,
    /** OnMagicDamageCalculated */
    MODIFIER_EVENT_ON_MAGIC_DAMAGE_CALCULATED = 215,
    /** OnAttacked */
    MODIFIER_EVENT_ON_ATTACKED = 216,
    /** OnDeath */
    MODIFIER_EVENT_ON_DEATH = 217,
    /** OnDeathCompleted */
    MODIFIER_EVENT_ON_DEATH_COMPLETED = 218,
    /** OnRespawn */
    MODIFIER_EVENT_ON_RESPAWN = 219,
    /** OnSpentMana */
    MODIFIER_EVENT_ON_SPENT_MANA = 220,
    /** OnSpentHealth */
    MODIFIER_EVENT_ON_SPENT_HEALTH = 221,
    /** OnTeleporting */
    MODIFIER_EVENT_ON_TELEPORTING = 222,
    /** OnTeleported */
    MODIFIER_EVENT_ON_TELEPORTED = 223,
    /** OnSetLocation */
    MODIFIER_EVENT_ON_SET_LOCATION = 224,
    /** OnHealthGained */
    MODIFIER_EVENT_ON_HEALTH_GAINED = 225,
    /** OnManaGained */
    MODIFIER_EVENT_ON_MANA_GAINED = 226,
    /** OnTakeDamageKillCredit */
    MODIFIER_EVENT_ON_TAKEDAMAGE_KILLCREDIT = 227,
    /** OnHeroKilled */
    MODIFIER_EVENT_ON_HERO_KILLED = 228,
    /** OnHealReceived */
    MODIFIER_EVENT_ON_HEAL_RECEIVED = 229,
    /** OnBuildingKilled */
    MODIFIER_EVENT_ON_BUILDING_KILLED = 230,
    /** OnModelChanged */
    MODIFIER_EVENT_ON_MODEL_CHANGED = 231,
    /** OnModifierAdded */
    MODIFIER_EVENT_ON_MODIFIER_ADDED = 232,
    /** OnModifierRemoved */
    MODIFIER_EVENT_ON_MODIFIER_REMOVED = 233,
    /** OnTooltip */
    MODIFIER_PROPERTY_TOOLTIP = 234,
    /** GetModifierModelChange */
    MODIFIER_PROPERTY_MODEL_CHANGE = 235,
    /** GetModifierModelScale */
    MODIFIER_PROPERTY_MODEL_SCALE = 236,
    /** GetModifierModelScaleAnimateTime */
    MODIFIER_PROPERTY_MODEL_SCALE_ANIMATE_TIME = 237,
    /** GetModifierModelScaleUseInOutEase */
    MODIFIER_PROPERTY_MODEL_SCALE_USE_IN_OUT_EASE = 238,
    /** GetModifierModelScaleConstant */
    MODIFIER_PROPERTY_MODEL_SCALE_CONSTANT = 239,
    /** GetModifierScepter */
    MODIFIER_PROPERTY_IS_SCEPTER = 240,
    /** GetModifierShard */
    MODIFIER_PROPERTY_IS_SHARD = 241,
    /** GetModifierRadarCooldownReduction */
    MODIFIER_PROPERTY_RADAR_COOLDOWN_REDUCTION = 242,
    /** GetActivityTranslationModifiers */
    MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS = 243,
    /** GetAttackSound */
    MODIFIER_PROPERTY_TRANSLATE_ATTACK_SOUND = 244,
    /** GetUnitLifetimeFraction */
    MODIFIER_PROPERTY_LIFETIME_FRACTION = 245,
    /** GetModifierProvidesFOWVision */
    MODIFIER_PROPERTY_PROVIDES_FOW_POSITION = 246,
    /** GetModifierSpellsRequireHP */
    MODIFIER_PROPERTY_SPELLS_REQUIRE_HP = 247,
    /** GetModifierConvertManaCostToHealthCost */
    MODIFIER_PROPERTY_CONVERT_MANA_COST_TO_HEALTH_COST = 248,
    /** GetForceDrawOnMinimap */
    MODIFIER_PROPERTY_FORCE_DRAW_MINIMAP = 249,
    /** GetModifierDisableTurning */
    MODIFIER_PROPERTY_DISABLE_TURNING = 250,
    /** GetModifierIgnoreCastAngle */
    MODIFIER_PROPERTY_IGNORE_CAST_ANGLE = 251,
    /** GetModifierChangeAbilityValue */
    MODIFIER_PROPERTY_CHANGE_ABILITY_VALUE = 252,
    /** GetModifierOverrideAbilitySpecial */
    MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL = 253,
    /** GetModifierOverrideAbilitySpecialValue */
    MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL_VALUE = 254,
    /** GetModifierAbilityLayout */
    MODIFIER_PROPERTY_ABILITY_LAYOUT = 255,
    /** OnDominated */
    MODIFIER_EVENT_ON_DOMINATED = 256,
    /** OnKill */
    MODIFIER_EVENT_ON_KILL = 257,
    /** OnAssist */
    MODIFIER_EVENT_ON_ASSIST = 258,
    /** GetModifierTempestDouble */
    MODIFIER_PROPERTY_TEMPEST_DOUBLE = 259,
    /** PreserveParticlesOnModelChanged */
    MODIFIER_PROPERTY_PRESERVE_PARTICLES_ON_MODEL_CHANGE = 260,
    /** OnAttackFinished */
    MODIFIER_EVENT_ON_ATTACK_FINISHED = 261,
    /** GetModifierIgnoreCooldown */
    MODIFIER_PROPERTY_IGNORE_COOLDOWN = 262,
    /** GetModifierCanAttackTrees */
    MODIFIER_PROPERTY_CAN_ATTACK_TREES = 263,
    /** GetVisualZDelta */
    MODIFIER_PROPERTY_VISUAL_Z_DELTA = 264,
    /** GetVisualZSpeedBaseOverride */
    MODIFIER_PROPERTY_VISUAL_Z_SPEED_BASE_OVERRIDE = 265,
    MODIFIER_PROPERTY_INCOMING_DAMAGE_ILLUSION = 266,
    /** GetModifierNoVisionOfAttacker */
    MODIFIER_PROPERTY_DONT_GIVE_VISION_OF_ATTACKER = 267,
    /** OnTooltip2 */
    MODIFIER_PROPERTY_TOOLTIP2 = 268,
    /** OnAttackRecordDestroy */
    MODIFIER_EVENT_ON_ATTACK_RECORD_DESTROY = 269,
    /** OnProjectileObstructionHit */
    MODIFIER_EVENT_ON_PROJECTILE_OBSTRUCTION_HIT = 270,
    /** GetSuppressTeleport */
    MODIFIER_PROPERTY_SUPPRESS_TELEPORT = 271,
    /** OnAttackCancelled */
    MODIFIER_EVENT_ON_ATTACK_CANCELLED = 272,
    /** GetSuppressCleave */
    MODIFIER_PROPERTY_SUPPRESS_CLEAVE = 273,
    /** BotAttackScoreBonus */
    MODIFIER_PROPERTY_BOT_ATTACK_SCORE_BONUS = 274,
    /** GetModifierAttackSpeedReductionPercentage */
    MODIFIER_PROPERTY_ATTACKSPEED_REDUCTION_PERCENTAGE = 275,
    /** GetModifierMoveSpeedReductionPercentage */
    MODIFIER_PROPERTY_MOVESPEED_REDUCTION_PERCENTAGE = 276,
    MODIFIER_PROPERTY_ATTACK_WHILE_MOVING_TARGET = 277,
    /** GetModifierAttackSpeedPercentage */
    MODIFIER_PROPERTY_ATTACKSPEED_PERCENTAGE = 278,
    /** OnAttemptProjectileDodge */
    MODIFIER_EVENT_ON_ATTEMPT_PROJECTILE_DODGE = 279,
    /** OnPreDebuffApplied */
    MODIFIER_EVENT_ON_PREDEBUFF_APPLIED = 280,
    /** GetModifierPercentageCooldownStacking */
    MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE_STACKING = 281,
    /** GetModifierSpellRedirectTarget */
    MODIFIER_PROPERTY_SPELL_REDIRECT_TARGET = 282,
    /** GetModifierTurnRateConstant */
    MODIFIER_PROPERTY_TURN_RATE_CONSTANT = 283,
    /** GetModifierIsPackRat */
    MODIFIER_PROPERTY_PACK_RAT = 284,
    /** GetModifierPhysicalDamageOutgoing_Percentage */
    MODIFIER_PROPERTY_PHYSICALDAMAGEOUTGOING_PERCENTAGE = 285,
    /** GetModifierKnockbackAmplification_Percentage */
    MODIFIER_PROPERTY_KNOCKBACK_AMPLIFICATION_PERCENTAGE = 286,
    /** GetModifierHealthBarPips */
    MODIFIER_PROPERTY_HEALTHBAR_PIPS = 287,
    /** GetModifierIncomingDamageConstant */
    MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT = 288,
    /** OnSpellAppliedSuccessfully */
    MODIFIER_EVENT_SPELL_APPLIED_SUCCESSFULLY = 289,
    /** GetModifierAvoidDamageAfterReductions */
    MODIFIER_PROPERTY_AVOID_DAMAGE_AFTER_REDUCTIONS = 290,
    /** GetModifierPropetyFailAttack */
    MODIFIER_PROPERTY_FAIL_ATTACK = 291,
    /** GetModifierPrereduceIncomingDamage_Mult */
    MODIFIER_PROPERTY_PREREDUCE_INCOMING_DAMAGE_MULT = 292,
    /** GetModifierSuppressFullscreenDeathFX */
    MODIFIER_PROPERTY_SUPPRESS_FULLSCREEN_DEATH_FX = 293,
    /** MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT_POST */
    MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT_POST = 294,
    /** GetModifierDamageOutgoing_PercentageMultiplicative */
    MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE_MULTIPLICATIVE = 295,
    /** GetModifierTickGold_Multiplier */
    MODIFIER_PROPERTY_TICK_GOLD_MULTIPLIER = 296,
    /** GEtModifierSlowResistance_Unique */
    MODIFIER_PROPERTY_SLOW_RESISTANCE_UNIQUE = 297,
    /** GetModifierSlowResistance_Stacking */
    MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING = 298,
    /** GetModifierSlowResistanceAppliesToAttacks */
    MODIFIER_PROPERTY_SLOW_RESISTANCE_APPLIES_TO_ATTACKS = 299,
    /** GetModifierAoEBonusPercentage */
    MODIFIER_PROPERTY_AOE_BONUS_PERCENTAGE = 300,
    /** GetModifierProjectileSpeed */
    MODIFIER_PROPERTY_PROJECTILE_SPEED = 301,
    /** GetModifierProjectileSpeedTarget */
    MODIFIER_PROPERTY_PROJECTILE_SPEED_TARGET = 302,
    /** GetModifierBecomeStrength */
    MODIFIER_PROPERTY_BECOME_STRENGTH = 303,
    /** GetModifierBecomeAgility */
    MODIFIER_PROPERTY_BECOME_AGILITY = 304,
    /** GetModifierBecomeIntelligence */
    MODIFIER_PROPERTY_BECOME_INTELLIGENCE = 305,
    /** GetModifierBecomeUniversal */
    MODIFIER_PROPERTY_BECOME_UNIVERSAL = 306,
    /** OnForceProcMagicStick */
    MODIFIER_EVENT_ON_FORCE_PROC_MAGIC_STICK = 307,
    /** OnDamageHPLoss */
    MODIFIER_EVENT_ON_DAMAGE_HPLOSS = 308,
    /** GetModifierShareXPRune */
    MODIFIER_PROPERTY_SHARE_XPRUNE = 309,
    /** GetModifierXPFountainCountdownTimeOverride */
    MODIFIER_PROPERTY_XP_FOUNTAIN_COUNTDOWN_TIME_OVERRIDE = 310,
    /** GetModifierNoFreeTPScrollOnDeath */
    MODIFIER_PROPERTY_NO_FREE_TP_SCROLL_ON_DEATH = 311,
    /** GetModifierHasBonusNeutralItemChoice */
    MODIFIER_PROPERTY_HAS_BONUS_NEUTRAL_ITEM_CHOICE = 312,
    /** GetModifierPreserveNeutralItemPassives */
    MODIFIER_PROPERTY_PRESERVE_NEUTRAL_ITEM_PASSIVES = 313,
    /** GetModifierForceMaxHealth */
    MODIFIER_PROPERTY_FORCE_MAX_HEALTH = 314,
    /** GetModifierForceMaxMana */
    MODIFIER_PROPERTY_FORCE_MAX_MANA = 315,
    /** GetModifierAoEBonusConstant */
    MODIFIER_PROPERTY_AOE_BONUS_CONSTANT = 316,
    /** GetModifierAoEBonusConstantStacking */
    MODIFIER_PROPERTY_AOE_BONUS_CONSTANT_STACKING = 317,
    /** OnTakeDamagePostUnavoidableBlock */
    MODIFIER_EVENT_ON_TAKEDAMAGE_POST_UNAVOIDABLE_BLOCK = 318,
    /** OnMuteDamageAbilities */
    MODIFIER_EVENT_ON_MUTE_DAMAGE_ABILITIES = 319,
    /** GetSuppressCrit */
    MODIFIER_PROPERTY_SUPPRESS_CRIT = 320,
    /** GetModifierAbilityPoints */
    MODIFIER_PROPERTY_ABILITY_POINTS = 321,
    /** GetModifierBuybackPenaltyPercent */
    MODIFIER_PROPERTY_BUYBACK_PENALTY_PERCENT = 322,
    /** GetModifierItemSellbackCost */
    MODIFIER_PROPERTY_ITEM_SELLBACK_COST = 323,
    /** GetModifierDisassembleAnything */
    MODIFIER_PROPERTY_DISASSEMBLE_ANYTHING = 324,
    /** GetModifierFixedManaRegen */
    MODIFIER_PROPERTY_FIXED_MANA_REGEN = 325,
    /** GetModifierBonusUphillMissChance */
    MODIFIER_PROPERTY_BONUS_UPHILL_MISS_CHANCE = 326,
    /** GetModifierCreepDenyPercent */
    MODIFIER_PROPERTY_CREEP_DENY_PERCENT = 327,
    /** GetModifierAttackSpeedAbsoluteMax */
    MODIFIER_PROPERTY_ATTACKSPEED_ABSOLUTE_MAX = 328,
    /** GetModifierFoWTeam */
    MODIFIER_PROPERTY_FOW_TEAM = 329,
    /** OnHeroBeginDying */
    MODIFIER_EVENT_ON_HERO_BEGIN_DYING = 330,
    /** GetModifierBonusLotusHeal */
    MODIFIER_PROPERTY_BONUS_LOTUS_HEAL = 331,
    /** GetModifierBonusLotusHeal */
    MODIFIER_PROPERTY_BASE_HP_REGEN_PER_STR_BONUS_PERCENTAGE = 332,
    /** GetModifierBonusLotusHeal */
    MODIFIER_PROPERTY_BASE_ARMOR_PER_AGI_BONUS_PERCENTAGE = 333,
    /** GetModifierBonusLotusHeal */
    MODIFIER_PROPERTY_BASE_MP_REGEN_PER_INT_BONUS_PERCENTAGE = 334,
    /** GetModifierBonusLotusHeal */
    MODIFIER_PROPERTY_BASE_MRES_PER_INT_BONUS_PERCENTAGE = 335,
    /** OnDayStarted */
    MODIFIER_EVENT_ON_DAY_STARTED = 336,
    /** OnNightStarted */
    MODIFIER_EVENT_ON_NIGHT_STARTED = 337,
    /** GetModifierCreateBonusIllusionChance */
    MODIFIER_PROPERTY_CREATE_BONUS_ILLUSION_CHANCE = 338,
    /** GetModifierCreateBonusIllusionCount */
    MODIFIER_PROPERTY_CREATE_BONUS_ILLUSION_COUNT = 339,
    /** GetModofierPropertyPseudoRandomBonus */
    MODIFIER_PROPERTY_PSEUDORANDOM_BONUS = 340,
    /** GetModifierAttackHeightBonus */
    MODIFIER_PROPERTY_ATTACK_HEIGHT_BONUS = 341,
    /** GetSkipAttackRegulator */
    MODIFIER_PROPERTY_SKIP_ATTACK_REGULATOR = 342,
    /** GetModifierMiss_Percentage_Target */
    MODIFIER_PROPERTY_MISS_PERCENTAGE_TARGET = 343,
    /** GetModifierAdditionalNutralItemDrops */
    MODIFIER_PROPERTY_ADDITIONAL_NEUTRAL_ITEM_DROPS = 344,
    /** GetModifierKillStreakBonusGoldPercentage */
    MODIFIER_PROPERTY_KILL_STREAK_BONUS_GOLD_PERCENTAGE = 345,
    /** GetModifierHPRegenMultiplierPreAmplification */
    MODIFIER_PROPERTY_HP_REGEN_MULTIPLIER_PRE_AMPLIFICATION = 346,
    /** GetModifierHeroFacetOverride */
    MODIFIER_PROPERTY_HEROFACET_OVERRIDE = 347,
    /** OnTreeCutDown */
    MODIFIER_EVENT_ON_TREE_CUT_DOWN = 348,
    /** OnCleaveAttackLanded */
    MODIFIER_EVENT_ON_CLEAVE_ATTACK_LANDED = 349,
    /** MinAttributeLevel */
    MODIFIER_PROPERTY_MIN_ATTRIBUTE_LEVEL = 350,
    /** GetTierTokenReroll */
    MODIFIER_PROPERTY_TIER_TOKEN_REROLL = 351,
    /** GetVisionDegreeRestriction */
    MODIFIER_PROPERTY_VISION_DEGREES_RESTRICTION = 352,
    /** GetModifierTotal_ConstantBlockStacking */
    MODIFIER_PROPERTY_TOTAL_CONSTANT_BLOCK_STACKING = 353,
    /** GetModifierInventorySlotRestricted */
    MODIFIER_PROPERTY_INVENTORY_SLOT_RESTRICTED = 354,
    /** OnTierTokenRerolled */
    MODIFIER_EVENT_ON_TIER_TOKEN_REROLLED = 355,
    /** GetRedirectSpell */
    MODIFIER_PROPERTY_REDIRECT_SPELL = 356,
    /** GetBaseAttackPostBonus */
    MODIFIER_PROPERTY_BASEATTACK_POSTBONUS = 357,
    /** OnFoWTeamChanged */
    MODIFIER_EVENT_ON_FOW_TEAM_CHANGED = 358,
    /** GetSuppressAttackProcs */
    MODIFIER_PROPERTY_SUPPRESS_ATTACK_PROCS = 359,
    /** OnAbilityToggled */
    MODIFIER_EVENT_ON_ABILITY_TOGGLED = 360,
    /** GetModifierAvoidAttackProcs */
    MODIFIER_PROPERTY_AVOID_ATTACK_PROCS = 361,
    /** OnRuneSpawn */
    MODIFIER_EVENT_ON_RUNE_SPAWN = 362,
    /** GetModifierProperty_PhysicalLifesteal */
    MODIFIER_PROPERTY_PHYSICAL_LIFESTEAL = 363,
    /** GetModifierProperty_MagicalLifesteal */
    MODIFIER_PROPERTY_MAGICAL_LIFESTEAL = 364,
    /** OnPureDamageCalculated */
    MODIFIER_EVENT_ON_PURE_DAMAGE_CALCULATED = 365,
    /** GetModifierNeutralTrinketOptions */
    MODIFIER_EVENT_NEUTRAL_TRINKET_OPTIONS = 366,
    /** GetModifierNeutralEnhancementOptions */
    MODIFIER_EVENT_NEUTRAL_ENHANCEMENT_OPTIONS = 367,
    /** GetModifierMoveSpeedMax_BonusConstant */
    MODIFIER_PROPERTY_MOVESPEED_MAX_BONUS_CONSTANT = 368,
    /** GetModifierMoveSpeedPostMultiplierBonus_Constant  */
    MODIFIER_PROPERTY_MOVESPEED_POST_MULTIPLIER_BONUS_CONSTANT = 369,
    MODIFIER_FUNCTION_LAST = 370,
    MODIFIER_FUNCTION_INVALID = 65535,
}

declare enum modifierstate
{
    MODIFIER_STATE_ROOTED = 0,
    MODIFIER_STATE_DISARMED = 1,
    MODIFIER_STATE_ATTACK_IMMUNE = 2,
    MODIFIER_STATE_SILENCED = 3,
    MODIFIER_STATE_MUTED = 4,
    MODIFIER_STATE_STUNNED = 5,
    MODIFIER_STATE_HEXED = 6,
    MODIFIER_STATE_INVISIBLE = 7,
    MODIFIER_STATE_INVULNERABLE = 8,
    MODIFIER_STATE_MAGIC_IMMUNE = 9,
    MODIFIER_STATE_PROVIDES_VISION = 10,
    MODIFIER_STATE_NIGHTMARED = 11,
    MODIFIER_STATE_BLOCK_DISABLED = 12,
    MODIFIER_STATE_EVADE_DISABLED = 13,
    MODIFIER_STATE_UNSELECTABLE = 14,
    MODIFIER_STATE_CANNOT_TARGET_ENEMIES = 15,
    MODIFIER_STATE_CANNOT_TARGET_BUILDINGS = 16,
    MODIFIER_STATE_CANNOT_MISS = 17,
    MODIFIER_STATE_SPECIALLY_DENIABLE = 18,
    MODIFIER_STATE_FROZEN = 19,
    MODIFIER_STATE_COMMAND_RESTRICTED = 20,
    MODIFIER_STATE_NOT_ON_MINIMAP = 21,
    MODIFIER_STATE_LOW_ATTACK_PRIORITY = 22,
    MODIFIER_STATE_NO_HEALTH_BAR = 23,
    MODIFIER_STATE_NO_HEALTH_BAR_FOR_ENEMIES = 24,
    MODIFIER_STATE_NO_HEALTH_BAR_FOR_OTHER_PLAYERS = 25,
    MODIFIER_STATE_FLYING = 26,
    MODIFIER_STATE_NO_UNIT_COLLISION = 27,
    MODIFIER_STATE_NO_TEAM_MOVE_TO = 28,
    MODIFIER_STATE_NO_TEAM_SELECT = 29,
    MODIFIER_STATE_PASSIVES_DISABLED = 30,
    MODIFIER_STATE_DOMINATED = 31,
    MODIFIER_STATE_BLIND = 32,
    MODIFIER_STATE_OUT_OF_GAME = 33,
    MODIFIER_STATE_FAKE_ALLY = 34,
    MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY = 35,
    MODIFIER_STATE_TRUESIGHT_IMMUNE = 36,
    MODIFIER_STATE_UNTARGETABLE = 37,
    MODIFIER_STATE_UNTARGETABLE_ALLIED = 38,
    MODIFIER_STATE_UNTARGETABLE_ENEMY = 39,
    MODIFIER_STATE_UNTARGETABLE_SELF = 40,
    MODIFIER_STATE_IGNORING_MOVE_AND_ATTACK_ORDERS = 41,
    MODIFIER_STATE_ALLOW_PATHING_THROUGH_TREES = 42,
    MODIFIER_STATE_NOT_ON_MINIMAP_FOR_ENEMIES = 43,
    MODIFIER_STATE_UNSLOWABLE = 44,
    MODIFIER_STATE_TETHERED = 45,
    MODIFIER_STATE_IGNORING_STOP_ORDERS = 46,
    MODIFIER_STATE_FEARED = 47,
    MODIFIER_STATE_TAUNTED = 48,
    MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED = 49,
    MODIFIER_STATE_FORCED_FLYING_VISION = 50,
    MODIFIER_STATE_ATTACK_ALLIES = 51,
    MODIFIER_STATE_ALLOW_PATHING_THROUGH_CLIFFS = 52,
    MODIFIER_STATE_ALLOW_PATHING_THROUGH_FISSURE = 53,
    MODIFIER_STATE_SPECIALLY_UNDENIABLE = 54,
    MODIFIER_STATE_ALLOW_PATHING_THROUGH_OBSTRUCTIONS = 55,
    MODIFIER_STATE_DEBUFF_IMMUNE = 56,
    MODIFIER_STATE_ALLOW_PATHING_THROUGH_BASE_BLOCKER = 57,
    MODIFIER_STATE_IGNORING_MOVE_ORDERS = 58,
    MODIFIER_STATE_ATTACKS_ARE_MELEE = 59,
    MODIFIER_STATE_CAN_USE_BACKPACK_ITEMS = 60,
    MODIFIER_STATE_CASTS_IGNORE_CHANNELING = 61,
    MODIFIER_STATE_ATTACKS_DONT_REVEAL = 62,
    MODIFIER_STATE_NEUTRALS_DONT_ATTACK = 63,
    MODIFIER_STATE_LAST = 64,
}

declare enum DOTAModifierAttribute_t
{
    MODIFIER_ATTRIBUTE_NONE = 0,
    MODIFIER_ATTRIBUTE_PERMANENT = 1,
    MODIFIER_ATTRIBUTE_MULTIPLE = 2,
    MODIFIER_ATTRIBUTE_IGNORE_INVULNERABLE = 4,
    MODIFIER_ATTRIBUTE_AURA_PRIORITY = 8,
    MODIFIER_ATTRIBUTE_IGNORE_DODGE = 16,
}

declare enum Attributes
{
    DOTA_ATTRIBUTE_STRENGTH = 0,
    DOTA_ATTRIBUTE_AGILITY = 1,
    DOTA_ATTRIBUTE_INTELLECT = 2,
    DOTA_ATTRIBUTE_ALL = 3,
    DOTA_ATTRIBUTE_MAX = 4,
    DOTA_ATTRIBUTE_INVALID = -1,
}

declare enum ParticleAttachment_t
{
    PATTACH_INVALID = -1,
    PATTACH_ABSORIGIN = 0,
    PATTACH_ABSORIGIN_FOLLOW = 1,
    PATTACH_CUSTOMORIGIN = 2,
    PATTACH_CUSTOMORIGIN_FOLLOW = 3,
    PATTACH_POINT = 4,
    PATTACH_POINT_FOLLOW = 5,
    PATTACH_EYES_FOLLOW = 6,
    PATTACH_OVERHEAD_FOLLOW = 7,
    PATTACH_WORLDORIGIN = 8,
    PATTACH_ROOTBONE_FOLLOW = 9,
    PATTACH_RENDERORIGIN_FOLLOW = 10,
    PATTACH_MAIN_VIEW = 11,
    PATTACH_WATERWAKE = 12,
    PATTACH_CENTER_FOLLOW = 13,
    PATTACH_CUSTOM_GAME_STATE_1 = 14,
    PATTACH_HEALTHBAR = 15,
    MAX_PATTACH_TYPES = 16,
}

declare enum DOTA_MOTION_CONTROLLER_PRIORITY
{
    DOTA_MOTION_CONTROLLER_PRIORITY_LOWEST = 0,
    DOTA_MOTION_CONTROLLER_PRIORITY_LOW = 1,
    DOTA_MOTION_CONTROLLER_PRIORITY_MEDIUM = 2,
    DOTA_MOTION_CONTROLLER_PRIORITY_HIGH = 3,
    DOTA_MOTION_CONTROLLER_PRIORITY_HIGHEST = 4,
    DOTA_MOTION_CONTROLLER_PRIORITY_ULTRA = 5,
}

declare enum DOTASpeechType_t
{
    DOTA_SPEECH_USER_INVALID = 0,
    DOTA_SPEECH_USER_SINGLE = 1,
    DOTA_SPEECH_USER_TEAM = 2,
    DOTA_SPEECH_USER_TEAM_NEARBY = 3,
    DOTA_SPEECH_USER_NEARBY = 4,
    DOTA_SPEECH_USER_ALL = 5,
    DOTA_SPEECH_GOOD_TEAM = 6,
    DOTA_SPEECH_BAD_TEAM = 7,
    DOTA_SPEECH_SPECTATOR = 8,
    DOTA_SPEECH_USER_TEAM_NOSPECTATOR = 9,
    DOTA_SPEECH_RECIPIENT_TYPE_MAX = 10,
}

declare enum DOTAAbilitySpeakTrigger_t
{
    DOTA_ABILITY_SPEAK_START_ACTION_PHASE = 0,
    DOTA_ABILITY_SPEAK_CAST = 1,
}

declare enum DotaCustomUIType_t
{
    DOTA_CUSTOM_UI_TYPE_HUD = 0,
    DOTA_CUSTOM_UI_TYPE_HERO_SELECTION = 1,
    DOTA_CUSTOM_UI_TYPE_PREGAME_STRATEGY = 2,
    DOTA_CUSTOM_UI_TYPE_GAME_INFO = 3,
    DOTA_CUSTOM_UI_TYPE_GAME_SETUP = 4,
    DOTA_CUSTOM_UI_TYPE_FLYOUT_SCOREBOARD = 5,
    DOTA_CUSTOM_UI_TYPE_HUD_TOP_BAR = 6,
    DOTA_CUSTOM_UI_TYPE_END_SCREEN = 7,
    DOTA_CUSTOM_UI_TYPE_COUNT = 8,
    DOTA_CUSTOM_UI_TYPE_INVALID = -1,
}

declare enum DotaDefaultUIElement_t
{
    DOTA_DEFAULT_UI_INVALID = -1,
    DOTA_DEFAULT_UI_TOP_TIMEOFDAY = 0,
    DOTA_DEFAULT_UI_TOP_HEROES = 1,
    DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD = 2,
    DOTA_DEFAULT_UI_ACTION_PANEL = 3,
    DOTA_DEFAULT_UI_ACTION_MINIMAP = 4,
    DOTA_DEFAULT_UI_INVENTORY_PANEL = 5,
    DOTA_DEFAULT_UI_INVENTORY_SHOP = 6,
    DOTA_DEFAULT_UI_INVENTORY_ITEMS = 7,
    DOTA_DEFAULT_UI_INVENTORY_QUICKBUY = 8,
    DOTA_DEFAULT_UI_INVENTORY_COURIER = 9,
    DOTA_DEFAULT_UI_INVENTORY_PROTECT = 10,
    DOTA_DEFAULT_UI_INVENTORY_GOLD = 11,
    DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS = 12,
    DOTA_DEFAULT_UI_SHOP_COMMONITEMS = 13,
    DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS = 14,
    DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME = 15,
    DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK = 16,
    DOTA_DEFAULT_UI_HERO_SELECTION_HEADER = 17,
    DOTA_DEFAULT_UI_TOP_MENU_BUTTONS = 18,
    DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND = 19,
    DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM = 20,
    DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM = 21,
    DOTA_DEFAULT_UI_TOP_BAR_SCORE = 22,
    DOTA_DEFAULT_UI_ENDGAME = 23,
    DOTA_DEFAULT_UI_ENDGAME_CHAT = 24,
    DOTA_DEFAULT_UI_QUICK_STATS = 25,
    DOTA_DEFAULT_UI_PREGAME_STRATEGYUI = 26,
    DOTA_DEFAULT_UI_KILLCAM = 27,
    DOTA_DEFAULT_UI_FIGHT_RECAP = 28,
    DOTA_DEFAULT_UI_TOP_BAR = 29,
    DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS = 30,
    DOTA_DEFAULT_UI_AGHANIMS_STATUS = 31,
    DOTA_DEFAULT_UI_ELEMENT_COUNT = 32,
}

declare enum PlayerUltimateStateOrTime_t
{
    PLAYER_ULTIMATE_STATE_READY = 0,
    PLAYER_ULTIMATE_STATE_NO_MANA = -1,
    PLAYER_ULTIMATE_STATE_NOT_LEVELED = -2,
    PLAYER_ULTIMATE_STATE_HIDDEN = -3,
}

declare enum PlayerOrderIssuer_t
{
    DOTA_ORDER_ISSUER_SELECTED_UNITS = 0,
    DOTA_ORDER_ISSUER_CURRENT_UNIT_ONLY = 1,
    DOTA_ORDER_ISSUER_HERO_ONLY = 2,
    DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY = 3,
}

declare enum OrderQueueBehavior_t
{
    DOTA_ORDER_QUEUE_DEFAULT = 0,
    DOTA_ORDER_QUEUE_NEVER = 1,
    DOTA_ORDER_QUEUE_ALWAYS = 2,
}

declare enum CLICK_BEHAVIORS
{
    DOTA_CLICK_BEHAVIOR_NONE = 0,
    DOTA_CLICK_BEHAVIOR_MOVE = 1,
    DOTA_CLICK_BEHAVIOR_ATTACK = 2,
    DOTA_CLICK_BEHAVIOR_CAST = 3,
    DOTA_CLICK_BEHAVIOR_DROP_ITEM = 4,
    DOTA_CLICK_BEHAVIOR_DROP_SHOP_ITEM = 5,
    DOTA_CLICK_BEHAVIOR_DRAG = 6,
    DOTA_CLICK_BEHAVIOR_LEARN_ABILITY = 7,
    DOTA_CLICK_BEHAVIOR_PATROL = 8,
    DOTA_CLICK_BEHAVIOR_VECTOR_CAST = 9,
    DOTA_CLICK_BEHAVIOR_UNUSED = 10,
    DOTA_CLICK_BEHAVIOR_RADAR = 11,
    DOTA_CLICK_BEHAVIOR_LAST = 12,
}

declare enum AbilityLearnResult_t
{
    ABILITY_CAN_BE_UPGRADED = 0,
    ABILITY_CANNOT_BE_UPGRADED_NOT_UPGRADABLE = 1,
    ABILITY_CANNOT_BE_UPGRADED_AT_MAX = 2,
    ABILITY_CANNOT_BE_UPGRADED_REQUIRES_LEVEL = 3,
    ABILITY_NOT_LEARNABLE = 4,
}

declare enum DOTAKeybindCommand_t
{
    DOTA_KEYBIND_NONE = 0,
    DOTA_KEYBIND_FIRST = 1,
    DOTA_KEYBIND_CAMERA_UP = 1,
    DOTA_KEYBIND_CAMERA_DOWN = 2,
    DOTA_KEYBIND_CAMERA_LEFT = 3,
    DOTA_KEYBIND_CAMERA_RIGHT = 4,
    DOTA_KEYBIND_CAMERA_GRIP = 5,
    DOTA_KEYBIND_CAMERA_YAW_GRIP = 6,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_1 = 7,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_2 = 8,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_3 = 9,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_4 = 10,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_5 = 11,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_6 = 12,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_7 = 13,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_8 = 14,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_9 = 15,
    DOTA_KEYBIND_CAMERA_SAVED_POSITION_10 = 16,
    DOTA_KEYBIND_HERO_ATTACK = 17,
    DOTA_KEYBIND_HERO_MOVE = 18,
    DOTA_KEYBIND_HERO_MOVE_DIRECTION = 19,
    DOTA_KEYBIND_PATROL = 20,
    DOTA_KEYBIND_HERO_STOP = 21,
    DOTA_KEYBIND_HERO_HOLD = 22,
    DOTA_KEYBIND_HERO_SELECT = 23,
    DOTA_KEYBIND_COURIER_SELECT = 24,
    DOTA_KEYBIND_COURIER_DELIVER = 25,
    DOTA_KEYBIND_COURIER_BURST = 26,
    DOTA_KEYBIND_COURIER_SHIELD = 27,
    DOTA_KEYBIND_PAUSE = 28,
    DOTA_SELECT_ALL = 29,
    DOTA_SELECT_ALL_OTHERS = 30,
    DOTA_RECENT_EVENT = 31,
    DOTA_KEYBIND_CHAT_TEAM = 32,
    DOTA_KEYBIND_CHAT_GLOBAL = 33,
    DOTA_KEYBIND_CHAT_TEAM2 = 34,
    DOTA_KEYBIND_CHAT_GLOBAL2 = 35,
    DOTA_KEYBIND_CHAT_VOICE_PARTY = 36,
    DOTA_KEYBIND_CHAT_VOICE_TEAM = 37,
    DOTA_KEYBIND_CHAT_WHEEL = 38,
    DOTA_KEYBIND_CHAT_WHEEL2 = 39,
    DOTA_KEYBIND_CHAT_WHEEL_CARE = 40,
    DOTA_KEYBIND_CHAT_WHEEL_BACK = 41,
    DOTA_KEYBIND_CHAT_WHEEL_NEED_WARDS = 42,
    DOTA_KEYBIND_CHAT_WHEEL_STUN = 43,
    DOTA_KEYBIND_CHAT_WHEEL_HELP = 44,
    DOTA_KEYBIND_CHAT_WHEEL_GET_PUSH = 45,
    DOTA_KEYBIND_CHAT_WHEEL_GOOD_JOB = 46,
    DOTA_KEYBIND_CHAT_WHEEL_MISSING = 47,
    DOTA_KEYBIND_CHAT_WHEEL_MISSING_TOP = 48,
    DOTA_KEYBIND_CHAT_WHEEL_MISSING_MIDDLE = 49,
    DOTA_KEYBIND_CHAT_WHEEL_MISSING_BOTTOM = 50,
    DOTA_KEYBIND_HERO_CHAT_WHEEL = 51,
    DOTA_KEYBIND_SPRAY_WHEEL = 52,
    DOTA_KEYBIND_ABILITY_PRIMARY1 = 53,
    DOTA_KEYBIND_ABILITY_PRIMARY2 = 54,
    DOTA_KEYBIND_ABILITY_PRIMARY3 = 55,
    DOTA_KEYBIND_ABILITY_SECONDARY1 = 56,
    DOTA_KEYBIND_ABILITY_SECONDARY2 = 57,
    DOTA_KEYBIND_ABILITY_ULTIMATE = 58,
    DOTA_KEYBIND_TALENT_UPGRADE_LEFT = 59,
    DOTA_KEYBIND_TALENT_UPGRADE_RIGHT = 60,
    DOTA_KEYBIND_TALENT_UPGRADE_ATTRIBUTE = 61,
    DOTA_KEYBIND_ABILITY_PRIMARY1_QUICKCAST = 62,
    DOTA_KEYBIND_ABILITY_PRIMARY2_QUICKCAST = 63,
    DOTA_KEYBIND_ABILITY_PRIMARY3_QUICKCAST = 64,
    DOTA_KEYBIND_ABILITY_SECONDARY1_QUICKCAST = 65,
    DOTA_KEYBIND_ABILITY_SECONDARY2_QUICKCAST = 66,
    DOTA_KEYBIND_ABILITY_ULTIMATE_QUICKCAST = 67,
    DOTA_KEYBIND_ABILITY_PRIMARY1_EXPLICIT_AUTOCAST = 68,
    DOTA_KEYBIND_ABILITY_PRIMARY2_EXPLICIT_AUTOCAST = 69,
    DOTA_KEYBIND_ABILITY_PRIMARY3_EXPLICIT_AUTOCAST = 70,
    DOTA_KEYBIND_ABILITY_SECONDARY1_EXPLICIT_AUTOCAST = 71,
    DOTA_KEYBIND_ABILITY_SECONDARY2_EXPLICIT_AUTOCAST = 72,
    DOTA_KEYBIND_ABILITY_ULTIMATE_EXPLICIT_AUTOCAST = 73,
    DOTA_KEYBIND_ABILITY_PRIMARY1_QUICKCAST_AUTOCAST = 74,
    DOTA_KEYBIND_ABILITY_PRIMARY2_QUICKCAST_AUTOCAST = 75,
    DOTA_KEYBIND_ABILITY_PRIMARY3_QUICKCAST_AUTOCAST = 76,
    DOTA_KEYBIND_ABILITY_SECONDARY1_QUICKCAST_AUTOCAST = 77,
    DOTA_KEYBIND_ABILITY_SECONDARY2_QUICKCAST_AUTOCAST = 78,
    DOTA_KEYBIND_ABILITY_ULTIMATE_QUICKCAST_AUTOCAST = 79,
    DOTA_KEYBIND_ABILITY_PRIMARY1_AUTOMATIC_AUTOCAST = 80,
    DOTA_KEYBIND_ABILITY_PRIMARY2_AUTOMATIC_AUTOCAST = 81,
    DOTA_KEYBIND_ABILITY_PRIMARY3_AUTOMATIC_AUTOCAST = 82,
    DOTA_KEYBIND_ABILITY_SECONDARY1_AUTOMATIC_AUTOCAST = 83,
    DOTA_KEYBIND_ABILITY_SECONDARY2_AUTOMATIC_AUTOCAST = 84,
    DOTA_KEYBIND_ABILITY_ULTIMATE_AUTOMATIC_AUTOCAST = 85,
    DOTA_KEYBIND_INVENTORY1 = 86,
    DOTA_KEYBIND_INVENTORY2 = 87,
    DOTA_KEYBIND_INVENTORY3 = 88,
    DOTA_KEYBIND_INVENTORY4 = 89,
    DOTA_KEYBIND_INVENTORY5 = 90,
    DOTA_KEYBIND_INVENTORY6 = 91,
    DOTA_KEYBIND_INVENTORYTP = 92,
    DOTA_KEYBIND_INVENTORYNEUTRAL = 93,
    DOTA_KEYBIND_INVENTORY1_QUICKCAST = 94,
    DOTA_KEYBIND_INVENTORY2_QUICKCAST = 95,
    DOTA_KEYBIND_INVENTORY3_QUICKCAST = 96,
    DOTA_KEYBIND_INVENTORY4_QUICKCAST = 97,
    DOTA_KEYBIND_INVENTORY5_QUICKCAST = 98,
    DOTA_KEYBIND_INVENTORY6_QUICKCAST = 99,
    DOTA_KEYBIND_INVENTORYTP_QUICKCAST = 100,
    DOTA_KEYBIND_INVENTORYNEUTRAL_QUICKCAST = 101,
    DOTA_KEYBIND_INVENTORY1_AUTOCAST = 102,
    DOTA_KEYBIND_INVENTORY2_AUTOCAST = 103,
    DOTA_KEYBIND_INVENTORY3_AUTOCAST = 104,
    DOTA_KEYBIND_INVENTORY4_AUTOCAST = 105,
    DOTA_KEYBIND_INVENTORY5_AUTOCAST = 106,
    DOTA_KEYBIND_INVENTORY6_AUTOCAST = 107,
    DOTA_KEYBIND_INVENTORYTP_AUTOCAST = 108,
    DOTA_KEYBIND_INVENTORYNEUTRAL_AUTOCAST = 109,
    DOTA_KEYBIND_INVENTORY1_QUICKAUTOCAST = 110,
    DOTA_KEYBIND_INVENTORY2_QUICKAUTOCAST = 111,
    DOTA_KEYBIND_INVENTORY3_QUICKAUTOCAST = 112,
    DOTA_KEYBIND_INVENTORY4_QUICKAUTOCAST = 113,
    DOTA_KEYBIND_INVENTORY5_QUICKAUTOCAST = 114,
    DOTA_KEYBIND_INVENTORY6_QUICKAUTOCAST = 115,
    DOTA_KEYBIND_INVENTORYTP_QUICKAUTOCAST = 116,
    DOTA_KEYBIND_INVENTORYNEUTRAL_QUICKAUTOCAST = 117,
    DOTA_KEYBIND_CONTROL_GROUP1 = 118,
    DOTA_KEYBIND_CONTROL_GROUP2 = 119,
    DOTA_KEYBIND_CONTROL_GROUP3 = 120,
    DOTA_KEYBIND_CONTROL_GROUP4 = 121,
    DOTA_KEYBIND_CONTROL_GROUP5 = 122,
    DOTA_KEYBIND_CONTROL_GROUP6 = 123,
    DOTA_KEYBIND_CONTROL_GROUP7 = 124,
    DOTA_KEYBIND_CONTROL_GROUP8 = 125,
    DOTA_KEYBIND_CONTROL_GROUP9 = 126,
    DOTA_KEYBIND_CONTROL_GROUP10 = 127,
    DOTA_KEYBIND_CONTROL_GROUPCYCLE = 128,
    DOTA_KEYBIND_SELECT_ALLY1 = 129,
    DOTA_KEYBIND_SELECT_ALLY2 = 130,
    DOTA_KEYBIND_SELECT_ALLY3 = 131,
    DOTA_KEYBIND_SELECT_ALLY4 = 132,
    DOTA_KEYBIND_SELECT_ALLY5 = 133,
    DOTA_KEYBIND_SHOP_TOGGLE = 134,
    DOTA_KEYBIND_SCOREBOARD_TOGGLE = 135,
    DOTA_KEYBIND_COMBATLOG_TOGGLE = 136,
    DOTA_KEYBIND_SCREENSHOT = 137,
    DOTA_KEYBIND_ESCAPE = 138,
    DOTA_KEYBIND_CONSOLE = 139,
    DOTA_KEYBIND_DEATH_SUMMARY = 140,
    DOTA_KEYBIND_LEARN_ABILITIES = 141,
    DOTA_KEYBIND_LEARN_STATS = 142,
    DOTA_KEYBIND_ACTIVATE_GLYPH = 143,
    DOTA_KEYBIND_ACTIVATE_RADAR = 144,
    DOTA_KEYBIND_PURCHASE_QUICKBUY = 145,
    DOTA_KEYBIND_PURCHASE_STICKY = 146,
    DOTA_KEYBIND_GRAB_STASH_ITEMS = 147,
    DOTA_KEYBIND_TOGGLE_AUTOATTACK = 148,
    DOTA_KEYBIND_TOGGLE_OVERLAYMAP = 149,
    DOTA_KEYBIND_OVERLAYMAP_INPUTKEY = 150,
    DOTA_KEYBIND_FILTER_ENEMY = 151,
    DOTA_KEYBIND_FILTER_ALLY = 152,
    DOTA_KEYBIND_FILTER_HERO = 153,
    DOTA_KEYBIND_FILTER_NONHERO = 154,
    DOTA_KEYBIND_TAUNT = 155,
    DOTA_KEYBIND_SHOP_CONSUMABLES = 156,
    DOTA_KEYBIND_SHOP_ATTRIBUTES = 157,
    DOTA_KEYBIND_SHOP_ARMAMENTS = 158,
    DOTA_KEYBIND_SHOP_ARCANE = 159,
    DOTA_KEYBIND_SHOP_BASICS = 160,
    DOTA_KEYBIND_SHOP_SUPPORT = 161,
    DOTA_KEYBIND_SHOP_CASTER = 162,
    DOTA_KEYBIND_SHOP_WEAPONS = 163,
    DOTA_KEYBIND_SHOP_ARMOR = 164,
    DOTA_KEYBIND_SHOP_ARTIFACTS = 165,
    DOTA_KEYBIND_SHOP_SIDE_PAGE_1 = 166,
    DOTA_KEYBIND_SHOP_SIDE_PAGE_2 = 167,
    DOTA_KEYBIND_SHOP_SECRET = 168,
    DOTA_KEYBIND_SHOP_SEARCHBOX = 169,
    DOTA_KEYBIND_SHOP_SLOT_1 = 170,
    DOTA_KEYBIND_SHOP_SLOT_2 = 171,
    DOTA_KEYBIND_SHOP_SLOT_3 = 172,
    DOTA_KEYBIND_SHOP_SLOT_4 = 173,
    DOTA_KEYBIND_SHOP_SLOT_5 = 174,
    DOTA_KEYBIND_SHOP_SLOT_6 = 175,
    DOTA_KEYBIND_SHOP_SLOT_7 = 176,
    DOTA_KEYBIND_SHOP_SLOT_8 = 177,
    DOTA_KEYBIND_SHOP_SLOT_9 = 178,
    DOTA_KEYBIND_SHOP_SLOT_10 = 179,
    DOTA_KEYBIND_SHOP_SLOT_11 = 180,
    DOTA_KEYBIND_SHOP_SLOT_12 = 181,
    DOTA_KEYBIND_SHOP_SLOT_13 = 182,
    DOTA_KEYBIND_SHOP_SLOT_14 = 183,
    DOTA_KEYBIND_SPEC_CAMERA_UP = 184,
    DOTA_KEYBIND_SPEC_CAMERA_DOWN = 185,
    DOTA_KEYBIND_SPEC_CAMERA_LEFT = 186,
    DOTA_KEYBIND_SPEC_CAMERA_RIGHT = 187,
    DOTA_KEYBIND_SPEC_CAMERA_GRIP = 188,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_1 = 189,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_2 = 190,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_3 = 191,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_4 = 192,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_5 = 193,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_6 = 194,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_7 = 195,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_8 = 196,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_9 = 197,
    DOTA_KEYBIND_SPEC_CAMERA_SAVED_POSITION_10 = 198,
    DOTA_KEYBIND_SPEC_UNIT_SELECT = 199,
    DOTA_KEYBIND_SPEC_HERO_SELECT = 200,
    DOTA_KEYBIND_SPEC_PAUSE = 201,
    DOTA_KEYBIND_SPEC_CHAT = 202,
    DOTA_KEYBIND_SPEC_SCOREBOARD = 203,
    DOTA_KEYBIND_SPEC_INCREASE_REPLAY_SPEED = 204,
    DOTA_KEYBIND_SPEC_DECREASE_REPLAY_SPEED = 205,
    DOTA_KEYBIND_SPEC_STATS_ITEM = 206,
    DOTA_KEYBIND_SPEC_STATS_GOLD = 207,
    DOTA_KEYBIND_SPEC_STATS_XP = 208,
    DOTA_KEYBIND_SPEC_STATS_FANTASY = 209,
    DOTA_KEYBIND_SPEC_STATS_WINCHANCE = 210,
    DOTA_KEYBIND_SPEC_FOW_TOGGLEBOTH = 211,
    DOTA_KEYBIND_SPEC_FOW_TOGGLERADIENT = 212,
    DOTA_KEYBIND_SPEC_FOW_TOGGLEDIRE = 213,
    DOTA_KEYBIND_SPEC_OPEN_BROADCASTER_MENU = 214,
    DOTA_KEYBIND_SPEC_DROPDOWN_KDA = 215,
    DOTA_KEYBIND_SPEC_DROPDOWN_LASTHITS_DENIES = 216,
    DOTA_KEYBIND_SPEC_DROPDOWN_LEVEL = 217,
    DOTA_KEYBIND_SPEC_DROPDOWN_XP_PER_MIN = 218,
    DOTA_KEYBIND_SPEC_DROPDOWN_GOLD = 219,
    DOTA_KEYBIND_SPEC_DROPDOWN_TOTALGOLD = 220,
    DOTA_KEYBIND_SPEC_DROPDOWN_GOLD_PER_MIN = 221,
    DOTA_KEYBIND_SPEC_DROPDOWN_BUYBACK = 222,
    DOTA_KEYBIND_SPEC_DROPDOWN_NETWORTH = 223,
    DOTA_KEYBIND_SPEC_DROPDOWN_FANTASY = 224,
    DOTA_KEYBIND_SPEC_DROPDOWN_SORT = 225,
    DOTA_KEYBIND_SPEC_DROPDOWN_CLOSE = 226,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_1 = 227,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_2 = 228,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_3 = 229,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_4 = 230,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_5 = 231,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_6 = 232,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_7 = 233,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_8 = 234,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_9 = 235,
    DOTA_KEYBIND_SPEC_FOCUS_PLAYER_10 = 236,
    DOTA_KEYBIND_SPEC_COACH_VIEWTOGGLE = 237,
    DOTA_KEYBIND_INSPECTHEROINWORLD = 238,
    DOTA_KEYBIND_CAMERA_ZOOM_IN = 239,
    DOTA_KEYBIND_CAMERA_ZOOM_OUT = 240,
    DOTA_KEYBIND_CONTROL_GROUPCYCLEPREV = 241,
    DOTA_KEYBIND_DOTA_ALT = 242,
    DOTA_KEYBIND_DOTA_ALTERNATIVE_CAST_SWITCH = 243,
    DOTA_KEYBIND_COUNT = 244,
}

declare enum DOTA_SHOP_TYPE
{
    DOTA_SHOP_HOME = 0,
    DOTA_SHOP_SIDE = 1,
    DOTA_SHOP_SECRET = 2,
    DOTA_SHOP_GROUND = 3,
    DOTA_SHOP_SIDE2 = 4,
    DOTA_SHOP_SECRET2 = 5,
    DOTA_SHOP_CUSTOM = 6,
    DOTA_SHOP_NEUTRALS = 7,
    DOTA_SHOP_NONE = 8,
}
