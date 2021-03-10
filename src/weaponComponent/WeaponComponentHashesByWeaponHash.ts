import { WeaponHash } from '../hashes';
import { WeaponComponentHash } from './WeaponComponentHash';
import { getUInt32FromUint8Array } from '../utils';

/**
 * Mapping of WeaponHash -> WeaponComponentHashes
 * refer: https://wiki.rage.mp/index.php?title=Weapons_Components
 *
 */
export const WeaponComponentHashesByWeaponHash = new Map<WeaponHash, WeaponComponentHash[]>([
  // Melees
  [
    WeaponHash.KnuckleDuster, // Knuckle Duster
    [
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_BASE,
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_PIMP,
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_BALLAS,
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_DOLLAR,
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_DIAMOND,
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_HATE,
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_LOVE,
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_PLAYER,
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_KING,
      WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_VAGOS,
    ],
  ],
  [
    WeaponHash.SwitchBlade, // Switchblade
    [
      WeaponComponentHash.COMPONENT_SWITCHBLADE_VARMOD_BASE,
      WeaponComponentHash.COMPONENT_SWITCHBLADE_VARMOD_VAR1,
      WeaponComponentHash.COMPONENT_SWITCHBLADE_VARMOD_VAR2,
    ],
  ],

  // Pistols
  [
    WeaponHash.Pistol, // Pistol
    [
      WeaponComponentHash.COMPONENT_PISTOL_CLIP_01,
      WeaponComponentHash.COMPONENT_PISTOL_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_PI_FLSH,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP_02,
      WeaponComponentHash.COMPONENT_PISTOL_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.CombatPistol, // Combat Pistol
    [
      WeaponComponentHash.COMPONENT_COMBATPISTOL_CLIP_01,
      WeaponComponentHash.COMPONENT_COMBATPISTOL_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_PI_FLSH,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP,
      WeaponComponentHash.COMPONENT_COMBATPISTOL_VARMOD_LOWRIDER,
    ],
  ],
  [
    WeaponHash.APPistol, // AP Pistol
    [
      WeaponComponentHash.COMPONENT_APPISTOL_CLIP_01,
      WeaponComponentHash.COMPONENT_APPISTOL_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_PI_FLSH,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP,
      WeaponComponentHash.COMPONENT_APPISTOL_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.Pistol50, // Pistol .50
    [
      WeaponComponentHash.COMPONENT_PISTOL50_CLIP_01,
      WeaponComponentHash.COMPONENT_PISTOL50_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_PI_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_PISTOL50_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.Revolver, // Heavy Revolver
    [
      WeaponComponentHash.COMPONENT_REVOLVER_VARMOD_BOSS,
      WeaponComponentHash.COMPONENT_REVOLVER_VARMOD_GOON,
      WeaponComponentHash.COMPONENT_REVOLVER_CLIP_01,
    ],
  ],
  [
    WeaponHash.SNSPistol, // SNS Pistol
    [
      WeaponComponentHash.COMPONENT_SNSPISTOL_CLIP_01,
      WeaponComponentHash.COMPONENT_SNSPISTOL_CLIP_02,
      WeaponComponentHash.COMPONENT_SNSPISTOL_VARMOD_LOWRIDER,
    ],
  ],
  [
    WeaponHash.HeavyPistol, // Heavy Pistol
    [
      WeaponComponentHash.COMPONENT_HEAVYPISTOL_CLIP_01,
      WeaponComponentHash.COMPONENT_HEAVYPISTOL_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_PI_FLSH,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP,
      WeaponComponentHash.COMPONENT_HEAVYPISTOL_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.RevolverMk2, // Heavy Revolver Mk II
    [
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CLIP_HOLLOWPOINT,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_SIGHTS,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO_MK2,
      WeaponComponentHash.COMPONENT_AT_PI_FLSH,
      WeaponComponentHash.COMPONENT_AT_PI_COMP_03,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_REVOLVER_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.SNSPistolMk2, // SNS Pistol Mk II
    [
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CLIP_HOLLOWPOINT,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_PI_FLSH_03,
      WeaponComponentHash.COMPONENT_AT_PI_RAIL_02,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP_02,
      WeaponComponentHash.COMPONENT_AT_PI_COMP_02,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_IND_01,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_02_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_03_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_04_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_05_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_06_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_07_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_08_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_09_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_10_SLIDE,
      WeaponComponentHash.COMPONENT_SNSPISTOL_MK2_CAMO_IND_01_SLIDE,
    ],
  ],
  [
    WeaponHash.PistolMk2, // Pistol Mk II
    [
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CLIP_HOLLOWPOINT,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_PI_RAIL,
      WeaponComponentHash.COMPONENT_AT_PI_FLSH_02,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP_02,
      WeaponComponentHash.COMPONENT_AT_PI_COMP,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_IND_01,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_02_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_03_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_04_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_05_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_06_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_07_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_08_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_09_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_10_SLIDE,
      WeaponComponentHash.COMPONENT_PISTOL_MK2_CAMO_IND_01_SLIDE,
    ],
  ],
  [
    WeaponHash.VintagePistol, // Vintage Pistol
    [
      WeaponComponentHash.COMPONENT_VINTAGEPISTOL_CLIP_01,
      WeaponComponentHash.COMPONENT_VINTAGEPISTOL_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP,
    ],
  ],
  [
    WeaponHash.RayPistol, // Up - n - Atomizer
    [
      WeaponComponentHash.COMPONENT_RAYPISTOL_VARMOD_XMAS18,
    ],
  ],
  [
    WeaponHash.CeramicPistol, // Ceramic Pistol
    [
      WeaponComponentHash.COMPONENT_CERAMICPISTOL_CLIP_01,
      WeaponComponentHash.COMPONENT_CERAMICPISTOL_CLIP_02,
      WeaponComponentHash.COMPONENT_CERAMICPISTOL_SUPP,
    ],
  ],

  // Submachine Guns
  [
    WeaponHash.MicroSMG, // Micro SMG
    [
      WeaponComponentHash.COMPONENT_MICROSMG_CLIP_01,
      WeaponComponentHash.COMPONENT_MICROSMG_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_PI_FLSH,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_MICROSMG_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.SMG, // SMG
    [
      WeaponComponentHash.COMPONENT_SMG_CLIP_01,
      WeaponComponentHash.COMPONENT_SMG_CLIP_02,
      WeaponComponentHash.COMPONENT_SMG_CLIP_03,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO_02,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP,
      WeaponComponentHash.COMPONENT_SMG_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.AssaultSMG, // Assault SMG
    [
      WeaponComponentHash.COMPONENT_ASSAULTSMG_CLIP_01,
      WeaponComponentHash.COMPONENT_ASSAULTSMG_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_ASSAULTSMG_VARMOD_LOWRIDER,
    ],
  ],
  [
    WeaponHash.MiniSMG, // Mini SMG
    [
      WeaponComponentHash.COMPONENT_MINISMG_CLIP_01,
      WeaponComponentHash.COMPONENT_MINISMG_CLIP_02,
    ],
  ],
  [
    WeaponHash.SMGMk2, // SMG Mk II
    [
      WeaponComponentHash.COMPONENT_SMG_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_SMG_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_SMG_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_SMG_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_SMG_MK2_CLIP_HOLLOWPOINT,
      WeaponComponentHash.COMPONENT_SMG_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SIGHTS_SMG,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO_02_SMG_MK2,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL_SMG_MK2,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_01,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_02,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_03,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_04,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_05,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_06,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_07,
      WeaponComponentHash.COMPONENT_AT_SB_BARREL_01,
      WeaponComponentHash.COMPONENT_AT_SB_BARREL_02,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_SMG_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.MachinePistol, // Machine Pistol
    [
      WeaponComponentHash.COMPONENT_MACHINEPISTOL_CLIP_01,
      WeaponComponentHash.COMPONENT_MACHINEPISTOL_CLIP_02,
      WeaponComponentHash.COMPONENT_MACHINEPISTOL_CLIP_03,
      WeaponComponentHash.COMPONENT_AT_PI_SUPP,
    ],
  ],
  [
    WeaponHash.CombatPDW, // Combat PDW
    [
      WeaponComponentHash.COMPONENT_COMBATPDW_CLIP_01,
      WeaponComponentHash.COMPONENT_COMBATPDW_CLIP_02,
      WeaponComponentHash.COMPONENT_COMBATPDW_CLIP_03,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL,
    ],
  ],

  // Shotguns
  [
    WeaponHash.PumpShotgun, // Pump Shotgun
    [
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SR_SUPP,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_VARMOD_LOWRIDER,
    ],
  ],
  [
    WeaponHash.SawnOffShotgun, // Sawed - Off Shotgun
    [
      WeaponComponentHash.COMPONENT_SAWNOFFSHOTGUN_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.AssaultShotgun, // Assault Shotgun
    [
      WeaponComponentHash.COMPONENT_ASSAULTSHOTGUN_CLIP_01,
      WeaponComponentHash.COMPONENT_ASSAULTSHOTGUN_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
    ],
  ],
  [
    WeaponHash.BullpupShotgun, // Bullpup Shotgun
    [
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
    ],
  ],
  [
    WeaponHash.PumpShotgunMk2, // Pump Shotgun Mk II
    [
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CLIP_ARMORPIERCING,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CLIP_HOLLOWPOINT,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CLIP_EXPLOSIVE,
      WeaponComponentHash.COMPONENT_AT_SIGHTS,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO_MK2,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL_MK2,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SR_SUPP_03,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_08,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_PUMPSHOTGUN_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.HeavyShotgun, // Heavy Shotgun
    [
      WeaponComponentHash.COMPONENT_HEAVYSHOTGUN_CLIP_01,
      WeaponComponentHash.COMPONENT_HEAVYSHOTGUN_CLIP_02,
      WeaponComponentHash.COMPONENT_HEAVYSHOTGUN_CLIP_03,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
    ],
  ],
  [
    WeaponHash.CombatShotgun, // Combat Shotgun
    [
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
    ],
  ],

  // Rifles
  [
    WeaponHash.AssaultRifle, // Assault Rifle
    [
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_CLIP_01,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_CLIP_02,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_CLIP_03,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.CarbineRifle, // Carbine Rifle
    [
      WeaponComponentHash.COMPONENT_CARBINERIFLE_CLIP_01,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_CLIP_02,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_CLIP_03,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MEDIUM,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.AdvancedRifle, // Advanced Rifle
    [
      WeaponComponentHash.COMPONENT_ADVANCEDRIFLE_CLIP_01,
      WeaponComponentHash.COMPONENT_ADVANCEDRIFLE_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
      WeaponComponentHash.COMPONENT_ADVANCEDRIFLE_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.SpecialCarbine, // Special Carbine
    [
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_CLIP_01,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_CLIP_02,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_CLIP_03,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MEDIUM,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_VARMOD_LOWRIDER,
    ],
  ],
  [
    WeaponHash.BullpupRifle, // Bullpup Rifle
    [
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_CLIP_01,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_VARMOD_LOW,
    ],
  ],
  [
    WeaponHash.BullpupRifleMk2, // Bullpup Rifle Mk II
    [
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CLIP_ARMORPIERCING,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SIGHTS,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO_02_MK2,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL_MK2,
      WeaponComponentHash.COMPONENT_AT_BP_BARREL_01,
      WeaponComponentHash.COMPONENT_AT_BP_BARREL_02,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_01,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_02,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_03,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_04,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_05,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_06,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_07,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP_02,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_BULLPUPRIFLE_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.SpecialCarbineMk2, // Special Carbine Mk II
    [
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CLIP_ARMORPIERCING,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SIGHTS,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO_MK2,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MEDIUM_MK2,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_01,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_02,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_03,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_04,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_05,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_06,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_07,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP_02,
      WeaponComponentHash.COMPONENT_AT_SC_BARREL_01,
      WeaponComponentHash.COMPONENT_AT_SC_BARREL_02,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_SPECIALCARBINE_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.AssaultRifleMk2, // Assault Rifle Mk II
    [
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CLIP_ARMORPIERCING,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP_02,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SIGHTS,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO_MK2,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MEDIUM_MK2,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_01,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_02,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_03,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_04,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_05,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_06,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_07,
      WeaponComponentHash.COMPONENT_AT_AR_BARREL_01,
      WeaponComponentHash.COMPONENT_AT_AR_BARREL_02,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_ASSAULTRIFLE_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.CarbineRifleMk2, // Carbine Rifle Mk II
    [
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CLIP_ARMORPIERCING,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP_02,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_SIGHTS,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MACRO_MK2,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MEDIUM_MK2,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_01,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_02,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_03,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_04,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_05,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_06,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_07,
      WeaponComponentHash.COMPONENT_AT_CR_BARREL_01,
      WeaponComponentHash.COMPONENT_AT_CR_BARREL_02,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_CARBINERIFLE_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.CompactRifle, // Compact Rifle
    [
      WeaponComponentHash.COMPONENT_COMPACTRIFLE_CLIP_01,
      WeaponComponentHash.COMPONENT_COMPACTRIFLE_CLIP_02,
      WeaponComponentHash.COMPONENT_COMPACTRIFLE_CLIP_03,
    ],
  ],
  [
    WeaponHash.MilitaryRifle, // Military Rifle
    [
      WeaponComponentHash.COMPONENT_MILITARYRIFLE_CLIP_01,
      WeaponComponentHash.COMPONENT_MILITARYRIFLE_CLIP_02,
      WeaponComponentHash.COMPONENT_MILITARYRIFLE_SIGHT_01,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
    ],
  ],

  // Machine Guns,
  [
    WeaponHash.MG, // MG
    [
      WeaponComponentHash.COMPONENT_MG_CLIP_01,
      WeaponComponentHash.COMPONENT_MG_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL_02,
      WeaponComponentHash.COMPONENT_MG_VARMOD_LOWRIDER,
    ],
  ],
  [
    WeaponHash.CombatMG, // Combat MG
    [
      WeaponComponentHash.COMPONENT_COMBATMG_CLIP_01,
      WeaponComponentHash.COMPONENT_COMBATMG_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MEDIUM,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
      WeaponComponentHash.COMPONENT_COMBATMG_VARMOD_LOWRIDER,
    ],
  ],
  [
    WeaponHash.CombatMGMk2, // Combat MG Mk II
    [
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CLIP_ARMORPIERCING,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP_02,
      WeaponComponentHash.COMPONENT_AT_SIGHTS,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL_MK2,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MEDIUM_MK2,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_01,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_02,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_03,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_04,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_05,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_06,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_07,
      WeaponComponentHash.COMPONENT_AT_MG_BARREL_01,
      WeaponComponentHash.COMPONENT_AT_MG_BARREL_02,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_COMBATMG_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.Gusenberg, // Gusenberg Sweeper
    [
      WeaponComponentHash.COMPONENT_GUSENBERG_CLIP_01,
      WeaponComponentHash.COMPONENT_GUSENBERG_CLIP_02,
    ],
  ],

  // Sniper Rifles
  [
    WeaponHash.SniperRifle, // Sniper Rifle
    [
      WeaponComponentHash.COMPONENT_SNIPERRIFLE_CLIP_01,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP_02,
      WeaponComponentHash.COMPONENT_AT_SCOPE_LARGE,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MAX,
      WeaponComponentHash.COMPONENT_SNIPERRIFLE_VARMOD_LUXE,
    ],
  ],
  [
    WeaponHash.HeavySniper, // Heavy Sniper
    [
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_CLIP_01,
      WeaponComponentHash.COMPONENT_AT_SCOPE_LARGE,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MAX,
    ],
  ],
  [
    WeaponHash.MarksmanRifleMk2, // Marksman Rifle Mk II
    [
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CLIP_TRACER,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CLIP_ARMORPIERCING,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_AT_SIGHTS,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MEDIUM_MK2,
      WeaponComponentHash.COMPONENT_AT_SCOPE_LARGE_FIXED_ZOOM_MK2,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_01,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_02,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_03,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_04,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_05,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_06,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_07,
      WeaponComponentHash.COMPONENT_AT_MRFL_BARREL_01,
      WeaponComponentHash.COMPONENT_AT_MRFL_BARREL_02,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP_02,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.HeavySniperMk2, // Heavy Sniper Mk II
    [
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CLIP_01,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CLIP_02,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CLIP_INCENDIARY,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CLIP_ARMORPIERCING,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CLIP_FMJ,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CLIP_EXPLOSIVE,
      WeaponComponentHash.COMPONENT_AT_SCOPE_LARGE_MK2,
      WeaponComponentHash.COMPONENT_AT_SCOPE_MAX,
      WeaponComponentHash.COMPONENT_AT_SCOPE_NV,
      WeaponComponentHash.COMPONENT_AT_SCOPE_THERMAL,
      WeaponComponentHash.COMPONENT_AT_SR_SUPP_03,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_08,
      WeaponComponentHash.COMPONENT_AT_MUZZLE_09,
      WeaponComponentHash.COMPONENT_AT_SR_BARREL_01,
      WeaponComponentHash.COMPONENT_AT_SR_BARREL_02,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_02,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_03,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_04,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_05,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_06,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_07,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_08,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_09,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_10,
      WeaponComponentHash.COMPONENT_HEAVYSNIPER_MK2_CAMO_IND_01,
    ],
  ],
  [
    WeaponHash.MarksmanRifle, // Marksman Rifle
    [
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_CLIP_01,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_CLIP_02,
      WeaponComponentHash.COMPONENT_AT_SCOPE_LARGE_FIXED_ZOOM,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_SUPP,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
      WeaponComponentHash.COMPONENT_MARKSMANRIFLE_VARMOD_LUXE,
    ],
  ],

  // Heavy Weapons
  [
    WeaponHash.GrenadeLauncher, // Grenade Launcher
    [
      WeaponComponentHash.COMPONENT_GRENADELAUNCHER_CLIP_01,
      WeaponComponentHash.COMPONENT_AT_AR_FLSH,
      WeaponComponentHash.COMPONENT_AT_AR_AFGRIP,
      WeaponComponentHash.COMPONENT_AT_SCOPE_SMALL,
    ],
  ],
]);

/**
 * Initialize dlc data, avoid calling expansive native repeatedly
 *
 */
function initializeOnce() {
  let isInitialized = false;

  return function() {
    if (isInitialized) {
      return;
    }

    // magic number based on struct DlcWeaponData
    const intLength = 4;
    const strLength = 64;

    const weaponCount = GetNumDlcWeapons();
    for (let i = 0; i < weaponCount; i++) {
      const weaponBuffer = new Uint8Array(14 * intLength + 4 * strLength);

      // https://docs.fivem.net/natives/?_0x79923CD21BECE14E
      Citizen.invokeNative('0x79923CD21BECE14E', i, weaponBuffer, Citizen.returnResultAnyway());

      const weaponHash = getUInt32FromUint8Array(weaponBuffer, 2 * intLength, 3 * intLength);

      const componentCount = GetNumDlcWeaponComponents(i);

      const componentHashes: WeaponComponentHash[] = [];
      for (let j = 0; j < componentCount; j++) {
        const componentBuffer = new Uint8Array(14 * intLength + 4 * strLength);

        // https://docs.fivem.net/natives/?_0x6CF598A2957C2BF8
        Citizen.invokeNative('0x6CF598A2957C2BF8', i, j, componentBuffer, Citizen.returnResultAnyway());

        const componentHash = getUInt32FromUint8Array(componentBuffer, 6 * intLength, 7 * intLength);
        componentHashes.push(componentHash);
      }

      WeaponComponentHashesByWeaponHash.set(weaponHash, componentHashes);
    }

    isInitialized = true;
  };
}

initializeOnce()();
