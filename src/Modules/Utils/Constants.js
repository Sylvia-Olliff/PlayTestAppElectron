'use strict';

export const WEAPONS = ['Club', 'Dagger', 'Dart', 'Gauntlet', 'HeavyCrossbow', 'HeavyMace', 'Javelin', 
                 'LightCrossbow', 'LightMace', 'Longspear', 'Morningstar', 'PunchingDagger', 
                 'Quarterstaff', 'Shortspear', 'Sickle', 'Sling', 'Spear', 'SpikedGauntlet', 
                 'UnarmedStrike', 'ArmorSpikes', 'Battleaxe', 'CompositeLongbow', 'CompositeShortbow',
                 'Falchion', 'Flail', 'Glaive', 'Greataxe', 'Greatclub', 'Greatsword', 'Guisarme',
                 'Halberd', 'Handaxe', 'HeavyFlail', 'HeavyPick', 'HeavyShield', 'Kukri', 
                 'Lance', 'LightHammer', 'LightPick', 'LightShield', 'Longbow', 'Longsword',
                 'Ranseur', 'Rapier', 'Sap', 'Scimitar', 'Scythe', 'ShortSword', 'Shortbow',
                 'ThrowingAxe', 'Trident', 'Warhammer', 'BastardSword', 'Bolas', 'DireFlail',
                 'DwarvenUrgrosh', 'DwarvenWaraxe', 'GnomeHookedHammer', 'HandCrossbow', 'Kama',
                 'Net', 'NetofSnaring', 'Nunchaku', 'OrcDoubleAxe', 'RepeatingHeavyCrossbow',
                 'RepeatingLightCrossbow', 'Sai', 'Shuriken', 'Siangham', 'SpikedChain',
                 'TwoBladedSword', 'Whip'];

export const FEATS = ['AbilityFocus', 'Acrobatic', 'Agile', 'Alertness', 
               'AlignedAttack', 'ArmorSkin', 'Athletic', 'Autonomous', 'BaneOfEnemies', 
               'DeathOfEnemies', 'BlindFight', 'BlindSight', 'BlindingSpeed', 'BodyFuel', 
               'BonusDomain', 'BoostConstruct', 'BulwarkOfDefense', 'CloakDance', 'ClosedMind', 
               'ColossalWildShape', 'CombatCasting', 'ImprovedCombatCasting', 'SpellOpportunity', 
               'CombatExpertise', 'ImprovedDisarm', 'ImprovedFeint', 'ImprovedTrip', 'KnockDown', 
               'SuperiorExpertise','CombatReflexes', 'HoldTheLine', 'ImprovedCombatReflexes', 
               'SpellcastingHarrier', 'DamageReduction', 'DeadlyPrecision', 'DexterousFortitude', 
               'DexterousWill', 'Diligent', 'DiminutiveWildShape', 'Dodge', 'EpicDodge', 'Mobility', 
               'CombatArchery', 'ShotOnTheRun', 'SpringAttack', 'MobileDefense', 'WhirlwindAttack', 
               'ImprovedWhirlwindAttack', 'SidestepCharge', 'DragonWildShape', 'EmpowerSpell', 
               'IntensifySpell', 'EmpowerSpellLikeAbility', 'Endurance', 'Diehard', 'EnergyResistance', 
               'EnergySubstitution', 'EnlargeSpell', 'EpicFortitude', 'EpicInspiration', 
               'EpicProwess', 'EpicReflexes', 'EpicReputation', 'EpicSpellcasting', 'EpicToughness', 
               'EpicWill', 'ExoticWeaponProficiency', 'ExtendSpell', 'PersistentSpell', 'ExtraTurning', 
               'DivineVengeance', 'EyesInTheBackOfYourHead', 'FamiliarSpell', 'FastHealing', 'FineWildShape', 
               'GargantuanWildShape', 'GhostAttack', 'GreatCharisma', 'GreatConstitution', 'GreatDexterity', 
               'GreatFortitude', 'PerfectHealth', 'GreatIntelligence', 'GreatSmiting', 'GreatStrength', 
               'GreatWisdom', 'GroupInspiration', 'HeightenSpell', 'ImprovedHeightenSpell', 'HolyStrike', 
               'ImprovedAuraOfCourage', 'ImprovedAuraOfDespair', 'ImprovedCounterspell', 'ImprovedCritical', 
               'OverwhelmingCritical', 'DevastatingCritical', 'ImprovedDarkvision', 'ImprovedDeathAttack', 
               'ImprovedElementalWildShape', 'ImprovedFamiliar', 'ImprovedFavoredEnemy', 'ImprovedInitiative', 
               'DireCharge', 'SuperiorInitiative', 'ImprovedKiStrike', 'ImprovedLowLightVision', 
               'ImprovedMetamagic', 'ImprovedNaturalArmor', 'ImprovedNaturalAttack', 'ImprovedSneakAttack', 
               'ImprovedSpellCapacity', 'ImprovedSpellResistance', 'ImprovedTurning', 'ImprovedUnarmedStrike', 
               'DeflectArrows', 'ExceptionalDeflection', 'InfiniteDeflection', 'ReflectArrows', 'SnatchArrows', 
               'ImprovedGrapple', 'LegendaryWrestler', 'StunningFist', 'ImprovedStunningFist', 'KeenStrike', 
               'VorpalStrike', 'Inquisitor', 'InspireExcellence', 'IronWill', 'ForceOfWill', 
               'JackOfAllTrades', 'LastingInspiration', 'LightningReflexes', 'LingeringDamage', 
               'MagicalAptitude', 'MagicalBeastWildShape', 'MartialWeaponProficiency', 'MaximizeSpell', 
               'EnhanceSpell', 'MetamorphicTransfer', 'MightyRage', 'MountedCombat', 'MountedArchery', 
               'RideByAttack', 'SpiritedCharge', 'Trample', 'Multiattack', 'ImprovedMultiattack', 
               'MultiweaponFighting', 'ImprovedMultiweaponFighting', 'GreaterMultiweaponFighting', 
               'PerfectMultiweaponFighting', 'MultiweaponRend', 'MusicOfTheGods', 'NaturalSpell', 
               'NegativeEnergyBurst', 'Talented', 'PenetrateDamageReduction', 'Persuasive', 
               'PlanarTurning', 'PointBlankShot', 'FarShot', 'DistantShot', 'PreciseShot', 
               'ImprovedArrowOfDeath', 'ImprovedPreciseShot', 'UncannyAccuracy', 'SharpShooting', 
               'FellShot', 'ReturnShot', 'RapidShot', 'Manyshot', 'GreaterManyshot', 'ImprovedManyshot', 
               'StormOfThrows', 'SwarmOfArrows', 'PositiveEnergyAura', 'PowerAttack', 'Cleave', 
               'GreatCleave', 'DivineMight', 'ImprovedBullRush', 'AwesomeBlow', 'ImprovedOverrun', 
               'ImprovedSunder', 'FocusedSunder', 'RuinousRage', 'QuickDraw', 'QuickenSpell', 
               'AutomaticQuickenSpell', 'Multispell', 'QuickenSpellLikeAbility', 'RangedInspiration', 
               'RapidInspiration', 'RapidReload', 'InstantReload', 'ReachSpell', 'RecklessOffense', 
               'RepeatSpell', 'Run', 'EpicSpeed', 'FleetOfFoot', 'SacredSpell', 'SelfConcealment', 
               'SelfSufficient', 'ShieldProficiency', 'ImprovedShieldBash', 'TowerShieldProficiency', 
               'SilentSpell', 'AutomaticSilentSpell', 'SimpleWeaponProficiency', 'Snatch', 
               'SneakAttackOfOpportunity', 'SpectralStrike', 'SpellFocus', 'AugmentSummoning', 
               'GreaterSpellFocus', 'EpicSpellFocus', 'SpellPenetration', 'GreaterSpellPenetration', 
               'EpicSpellPenetration', 'TenaciousMagic', 'TerrifyingRage', 'ThunderingRage', 'Toughness', 
               'Track', 'TwoWeaponFighting', 'ImprovedTwoWeaponFighting', 'GreaterTwoWeaponFighting', 
               'PerfectTwoWeaponFighting', 'TwoWeaponRend', 'TwoWeaponDefense', 'UpTheWalls', 
               'VerminWildShape', 'WeaponFinesse', 'WeaponFocus', 'EpicWeaponFocus', 'ShatteringStrike', 
               'GreaterWeaponFocus', 'WeaponSpecialization', 'EpicWeaponSpecialization', 
               'GreaterWeaponSpecialization', 'WidenAuraOfCourage', 'WidenAuraOfDespair', 'WidenSpell', 
               'WildTalent', 'WoundingAttack'];

export const CLASSES = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Wilder', 'Wizard'];

export const PRESTIGE_CLASSES = ['ArcaneArcher', 'ArcaneTrickster', 'Archmage', 'Assassin', 'Blackguard', 'DragonDisciple', 'Duelist', 'DwarvenDefender', 'EldritchKnight', 'Loremaster', 'MysticTheurge', 'Shadowdancer', 'Slayer', 'Thaumaturgist'];

export const RACES = [''];

export const ARMOR = ['ChainShirt', 'LeatherArmor', 'PaddedArmor', 'StuddedLeatherArmor', 'Breastplate', 
               'Chainmail', 'HideArmor', 'ScaleMail', 'BandedMail', 'FullPlateArmor', 'HalfPlateArmor', 'SplintMail'];

export const SHIELDS = ['Buckler', 'HeavyShield', 'LightShield', 'TowerShield'];

export const STATUS_EFFECTS = [''];