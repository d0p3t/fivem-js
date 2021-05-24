import { WeaponComponentHash } from './WeaponComponentHash';
import { DlcWeaponComponentData } from './DlcWeaponComponentData';

/**
 * Mapping of WeaponComponentHash -> ComponentDisplayName(Label)
 *
 */
export const ComponentDisplayNameByHash = new Map<WeaponComponentHash, string>([
  [WeaponComponentHash.Invalid, 'WCT_INVALID'],

  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_BASE, 'WT_KNUCKLE'],
  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_PIMP, 'WCT_KNUCK_02'],
  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_BALLAS, 'WCT_KNUCK_BG'],
  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_DOLLAR, 'WCT_KNUCK_DLR'],
  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_DIAMOND, 'WCT_KNUCK_DMD'],
  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_HATE, 'WCT_KNUCK_HT'],
  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_LOVE, 'WCT_KNUCK_LV'],
  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_PLAYER, 'WCT_KNUCK_PC'],
  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_KING, 'WCT_KNUCK_SLG'],
  // [WeaponComponentHash.COMPONENT_KNUCKLE_VARMOD_VAGOS, 'WCT_KNUCK_VG'],

  [WeaponComponentHash.KnuckleVarmodBase, 'WT_KNUCKLE'],
  [WeaponComponentHash.KnuckleVarmodPimp, 'WCT_KNUCK_02'],
  [WeaponComponentHash.KnuckleVarmodBallas, 'WCT_KNUCK_BG'],
  [WeaponComponentHash.KnuckleVarmodDollar, 'WCT_KNUCK_DLR'],
  [WeaponComponentHash.KnuckleVarmodDiamond, 'WCT_KNUCK_DMD'],
  [WeaponComponentHash.KnuckleVarmodHate, 'WCT_KNUCK_HT'],
  [WeaponComponentHash.KnuckleVarmodLove, 'WCT_KNUCK_LV'],
  [WeaponComponentHash.KnuckleVarmodPlayer, 'WCT_KNUCK_PC'],
  [WeaponComponentHash.KnuckleVarmodKing, 'WCT_KNUCK_SLG'],
  [WeaponComponentHash.KnuckleVarmodVagos, 'WCT_KNUCK_VG'],

  [WeaponComponentHash.Invalid, 'WCT_INVALID'],

  [WeaponComponentHash.AtRailCover01, 'WCT_RAIL'],
  [WeaponComponentHash.AtArAfGrip, 'WCT_GRIP'],
  [WeaponComponentHash.AtArAfGrip2, 'WCT_GRIP'],
  [WeaponComponentHash.AtPiFlsh, 'WCT_FLASH'],
  [WeaponComponentHash.AtArFlsh, 'WCT_FLASH'],
  [WeaponComponentHash.PistolMk2Flash, 'WCT_FLASH'],
  [WeaponComponentHash.AtScopeMacro, 'WCT_SCOPE_MAC'],
  [WeaponComponentHash.AtScopeMacro02, 'WCT_SCOPE_MAC'],
  [WeaponComponentHash.AtScopeSmall, 'WCT_SCOPE_SML'],
  [WeaponComponentHash.AtScopeSmall02, 'WCT_SCOPE_SML'],
  [WeaponComponentHash.AtScopeMedium, 'WCT_SCOPE_MED'],
  [WeaponComponentHash.AtScopeLarge, 'WCT_SCOPE_LRG'],
  [WeaponComponentHash.AtScopeMax, 'WCT_SCOPE_MAX'],
  [WeaponComponentHash.AtPiSupp, 'WCT_SUPP'],
  [WeaponComponentHash.AtArSupp, 'WCT_SUPP'],
  [WeaponComponentHash.AtArSupp02, 'WCT_SUPP'],
  [WeaponComponentHash.AtSrSupp, 'WCT_SUPP'],
  [WeaponComponentHash.HeavySniperMk2Suppressor, 'WCT_SUPP'],
  [WeaponComponentHash.AtPiSupp02, 'WCT_SUPP'],

  [WeaponComponentHash.CombatPistolClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.APPistolClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.MicroSMGClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.AssaultRifleClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.CarbineRifleClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.AdvancedRifleClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.MGClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.CombatMGClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.AssaultShotgunClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.SniperRifleClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.HeavySniperClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.AssaultSMGClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.Pistol50Clip01, 'WCT_CLIP1'],
  [0x0baab157 as WeaponComponentHash, 'WCT_CLIP1'],
  [0x5af49386 as WeaponComponentHash, 'WCT_CLIP1'],
  [0xcaebd246 as WeaponComponentHash, 'WCT_CLIP1'],
  [0xf8955d89 as WeaponComponentHash, 'WCT_CLIP1'],
  [WeaponComponentHash.SNSPistolClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.VintagePistolClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.HeavyShotgunClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.MarksmanRifleClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.CombatPDWClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.MarksmanPistolClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.MachinePistolClip01, 'WCT_CLIP1'],
  [WeaponComponentHash.PistolMk2ClipNormal, 'WCT_CLIP1'],
  [WeaponComponentHash.AssaultRifleMk2ClipNormal, 'WCT_CLIP1'],
  [WeaponComponentHash.CarbineRifleMk2ClipNormal, 'WCT_CLIP1'],
  [WeaponComponentHash.CombatMGMk2ClipNormal, 'WCT_CLIP1'],
  [WeaponComponentHash.HeavySniperMk2ClipNormal, 'WCT_CLIP1'],
  [WeaponComponentHash.SMGMk2ClipNormal, 'WCT_CLIP1'],

  [WeaponComponentHash.PistolClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.CombatPistolClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.APPistolClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.MicroSMGClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.SMGClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.AssaultRifleClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.CarbineRifleClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.AdvancedRifleClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.MGClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.CombatMGClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.AssaultShotgunClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.MinigunClip01, 'WCT_CLIP2'],
  [WeaponComponentHash.AssaultSMGClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.Pistol50Clip02, 'WCT_CLIP2'],
  [0x6cbf371b as WeaponComponentHash, 'WCT_CLIP2'],
  [0xe1c5fffa as WeaponComponentHash, 'WCT_CLIP2'],
  [0x3e7e6956 as WeaponComponentHash, 'WCT_CLIP2'],
  [WeaponComponentHash.SNSPistolClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.VintagePistolClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.HeavyShotgunClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.MarksmanRifleClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.CombatPDWClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.MachinePistolClip02, 'WCT_CLIP2'],
  [WeaponComponentHash.PistolMk2ClipExtended, 'WCT_CLIP2'],
  [WeaponComponentHash.AssaultRifleMk2ClipExtended, 'WCT_CLIP2'],
  [WeaponComponentHash.CarbineRifleMk2ClipExtended, 'WCT_CLIP2'],
  [WeaponComponentHash.CombatMGMk2ClipExtended, 'WCT_CLIP2'],
  [WeaponComponentHash.HeavySniperMk2ClipExtended, 'WCT_CLIP2'],
  [WeaponComponentHash.SMGMk2ClipExtended, 'WCT_CLIP2'],

  [WeaponComponentHash.AtScopeLargeFixedZoom, 'WCT_SCOPE_LRG'],

  [WeaponComponentHash.AssaultRifleVarmodLuxe, 'WCT_VAR_GOLD'],
  [WeaponComponentHash.CarbineRifleVarmodLuxe, 'WCT_VAR_GOLD'],
  [WeaponComponentHash.PistolVarmodLuxe, 'WCT_VAR_GOLD'],
  [WeaponComponentHash.SMGVarmodLuxe, 'WCT_VAR_GOLD'],
  [WeaponComponentHash.MicroSMGVarmodLuxe, 'WCT_VAR_GOLD'],
  [0x161e9241 as WeaponComponentHash, 'WCT_VAR_GOLD'],
  [WeaponComponentHash.AssaultSMGVarmodLowrider, 'WCT_VAR_GOLD'],
  [WeaponComponentHash.CombatPistolVarmodLowrider, 'WCT_VAR_GOLD'],
  [WeaponComponentHash.MGVarmodLowrider, 'WCT_VAR_GOLD'],
  [WeaponComponentHash.PumpShotgunVarmodLowrider, 'WCT_VAR_GOLD'],

  [WeaponComponentHash.AdvancedRifleVarmodLuxe, 'WCT_VAR_METAL'],
  [WeaponComponentHash.APPistolVarmodLuxe, 'WCT_VAR_METAL'],
  [WeaponComponentHash.SawnoffShotgunVarmodLuxe, 'WCT_VAR_METAL'],
  [WeaponComponentHash.BullpupRifleVarmodLow, 'WCT_VAR_METAL'],

  [WeaponComponentHash.Pistol50VarmodLuxe, 'WCT_VAR_SIL'],

  [WeaponComponentHash.HeavyPistolVarmodLuxe, 'WCT_VAR_WOOD'],
  [WeaponComponentHash.SniperRifleVarmodLuxe, 'WCT_VAR_WOOD'],
  [WeaponComponentHash.SNSPistolVarmodLowrider, 'WCT_VAR_WOOD'],

  [WeaponComponentHash.CombatMGVarmodLowrider, 'WCT_VAR_ETCHM'],
  [WeaponComponentHash.SpecialCarbineVarmodLowrider, 'WCT_VAR_ETCHM'],

  [WeaponComponentHash.SwitchbladeVarmodBase, 'WCT_SB_BASE'],

  [WeaponComponentHash.SwitchbladeVarmodVar1, 'WCT_SB_VAR1'],

  [WeaponComponentHash.SwitchbladeVarmodVar2, 'WCT_SB_VAR2'],

  [WeaponComponentHash.RevolverClip01, 'WCT_CLIP1'],

  [WeaponComponentHash.RevolverVarmodBoss, 'WCT_REV_VARB'],

  [WeaponComponentHash.RevolverVarmodGoon, 'WCT_REV_VARG'],

  [WeaponComponentHash.SMGClip03, 'WCT_CLIP_DRM'],
  [WeaponComponentHash.AssaultRifleClip03, 'WCT_CLIP_DRM'],
  [WeaponComponentHash.HeavyShotgunClip03, 'WCT_CLIP_DRM'],

  [WeaponComponentHash.CarbineRifleClip03, 'WCT_CLIP_BOX'],

  [WeaponComponentHash.AssaultRifleMk2ClipArmorPiercing, 'WCT_CLIP_AP'],
  [WeaponComponentHash.CarbineRifleMk2ClipArmorPiercing, 'WCT_CLIP_AP'],
  [WeaponComponentHash.CombatMGMk2ClipArmorPiercing, 'WCT_CLIP_AP'],
  [WeaponComponentHash.HeavySniperMk2ClipArmorPiercing, 'WCT_CLIP_AP'],

  [WeaponComponentHash.PistolMk2ClipFMJ, 'WCT_CLIP_FMJ'],
  [WeaponComponentHash.AssaultRifleMk2ClipFMJ, 'WCT_CLIP_FMJ'],
  [WeaponComponentHash.CarbineRifleMk2ClipFMJ, 'WCT_CLIP_FMJ'],
  [WeaponComponentHash.CombatMGMk2ClipFMJ, 'WCT_CLIP_FMJ'],
  [WeaponComponentHash.HeavySniperMk2ClipFMJ, 'WCT_CLIP_FMJ'],
  [WeaponComponentHash.SMGMk2ClipFMJ, 'WCT_CLIP_FMJ'],

  [WeaponComponentHash.PistolMk2ClipIncendiary, 'WCT_CLIP_INC'],
  [WeaponComponentHash.AssaultRifleMk2ClipIncendiary, 'WCT_CLIP_INC'],
  [WeaponComponentHash.CarbineRifleMk2ClipIncendiary, 'WCT_CLIP_INC'],
  [WeaponComponentHash.CombatMGMk2ClipIncendiary, 'WCT_CLIP_INC'],
  [WeaponComponentHash.HeavySniperMk2ClipIncendiary, 'WCT_CLIP_INC'],
  [WeaponComponentHash.SMGMk2ClipIncendiary, 'WCT_CLIP_INC'],

  [WeaponComponentHash.PistolMk2ClipTracer, 'WCT_CLIP_TR'],
  [WeaponComponentHash.AssaultRifleMk2ClipTracer, 'WCT_CLIP_TR'],
  [WeaponComponentHash.CarbineRifleMk2ClipTracer, 'WCT_CLIP_TR'],
  [WeaponComponentHash.CombatMGMk2ClipTracer, 'WCT_CLIP_TR'],
  [WeaponComponentHash.SMGMk2ClipTracer, 'WCT_CLIP_TR'],

  [WeaponComponentHash.HeavySniperMk2ClipExplosive, 'WCT_CLIP_EX'],

  [WeaponComponentHash.PistolMk2ClipHollowpoint, 'WCT_CLIP_HP'],
  [WeaponComponentHash.SMGMk2ClipHollowpoint, 'WCT_CLIP_HP'],

  [WeaponComponentHash.AssaultRifleMk2BarrelNormal, 'WCT_BARR'],
  [WeaponComponentHash.CarbineRifleMk2BarrelNormal, 'WCT_BARR'],
  [WeaponComponentHash.CombatMGMk2BarrelNormal, 'WCT_BARR'],
  [WeaponComponentHash.SMGMk2BarrelNormal, 'WCT_BARR'],

  [WeaponComponentHash.AssaultRifleMk2BarrelHeavy, 'WCT_BARR2'],
  [WeaponComponentHash.CarbineRifleMk2BarrelHeavy, 'WCT_BARR2'],
  [WeaponComponentHash.CombatMGMk2BarrelHeavy, 'WCT_BARR2'],
  [WeaponComponentHash.SMGMk2BarrelHeavy, 'WCT_BARR2'],

  [WeaponComponentHash.PistolMk2CamoDigital, 'WCT_CAMO_1'],
  [WeaponComponentHash.AssaultRifleMk2CamoDigital, 'WCT_CAMO_1'],
  [WeaponComponentHash.CarbineRifleMk2CamoDigital, 'WCT_CAMO_1'],
  [WeaponComponentHash.CombatMGMk2CamoDigital, 'WCT_CAMO_1'],
  [WeaponComponentHash.HeavySniperMk2CamoDigital, 'WCT_CAMO_1'],
  [WeaponComponentHash.SMGMk2CamoDigital, 'WCT_CAMO_1'],
  [WeaponComponentHash.PistolMk2CamoSlideDigital, 'WCT_CAMO_1'],

  [WeaponComponentHash.PistolMk2CamoBrushstroke, 'WCT_CAMO_2'],
  [WeaponComponentHash.AssaultRifleMk2CamoBrushstroke, 'WCT_CAMO_2'],
  [WeaponComponentHash.CarbineRifleMk2CamoBrushstroke, 'WCT_CAMO_2'],
  [WeaponComponentHash.CombatMGMk2CamoBrushstroke, 'WCT_CAMO_2'],
  [WeaponComponentHash.HeavySniperMk2CamoBrushstroke, 'WCT_CAMO_2'],
  [WeaponComponentHash.SMGMk2CamoBrushstroke, 'WCT_CAMO_2'],
  [WeaponComponentHash.PistolMk2CamoSlideBrushstroke, 'WCT_CAMO_2'],

  [WeaponComponentHash.PistolMk2CamoWoodland, 'WCT_CAMO_3'],
  [WeaponComponentHash.AssaultRifleMk2CamoWoodland, 'WCT_CAMO_3'],
  [WeaponComponentHash.CarbineRifleMk2CamoWoodland, 'WCT_CAMO_3'],
  [WeaponComponentHash.CombatMGMk2CamoWoodland, 'WCT_CAMO_3'],
  [WeaponComponentHash.HeavySniperMk2CamoWoodland, 'WCT_CAMO_3'],
  [WeaponComponentHash.SMGMk2CamoWoodland, 'WCT_CAMO_3'],
  [WeaponComponentHash.PistolMk2CamoSlideWoodland, 'WCT_CAMO_3'],

  [WeaponComponentHash.PistolMk2CamoSkull, 'WCT_CAMO_4'],
  [WeaponComponentHash.AssaultRifleMk2CamoSkull, 'WCT_CAMO_4'],
  [WeaponComponentHash.CarbineRifleMk2CamoSkull, 'WCT_CAMO_4'],
  [WeaponComponentHash.CombatMGMk2CamoSkull, 'WCT_CAMO_4'],
  [WeaponComponentHash.HeavySniperMk2CamoSkull, 'WCT_CAMO_4'],
  [WeaponComponentHash.SMGMk2CamoSkull, 'WCT_CAMO_4'],
  [WeaponComponentHash.PistolMk2CamoSlideSkull, 'WCT_CAMO_4'],

  [WeaponComponentHash.PistolMk2CamoSessanta, 'WCT_CAMO_5'],
  [WeaponComponentHash.AssaultRifleMk2CamoSessanta, 'WCT_CAMO_5'],
  [WeaponComponentHash.CarbineRifleMk2CamoSessanta, 'WCT_CAMO_5'],
  [WeaponComponentHash.CombatMGMk2CamoSessanta, 'WCT_CAMO_5'],
  [WeaponComponentHash.HeavySniperMk2CamoSessanta, 'WCT_CAMO_5'],
  [WeaponComponentHash.SMGMk2CamoSessanta, 'WCT_CAMO_5'],
  [WeaponComponentHash.PistolMk2CamoSlideSessanta, 'WCT_CAMO_5'],

  [WeaponComponentHash.PistolMk2CamoPerseus, 'WCT_CAMO_6'],
  [WeaponComponentHash.AssaultRifleMk2CamoPerseus, 'WCT_CAMO_6'],
  [WeaponComponentHash.CarbineRifleMk2CamoPerseus, 'WCT_CAMO_6'],
  [WeaponComponentHash.CombatMGMk2CamoPerseus, 'WCT_CAMO_6'],
  [WeaponComponentHash.HeavySniperMk2CamoPerseus, 'WCT_CAMO_6'],
  [WeaponComponentHash.SMGMk2CamoPerseus, 'WCT_CAMO_6'],
  [WeaponComponentHash.PistolMk2CamoSlidePerseus, 'WCT_CAMO_6'],

  [WeaponComponentHash.PistolMk2CamoLeopard, 'WCT_CAMO_7'],
  [WeaponComponentHash.AssaultRifleMk2CamoLeopard, 'WCT_CAMO_7'],
  [WeaponComponentHash.CarbineRifleMk2CamoLeopard, 'WCT_CAMO_7'],
  [WeaponComponentHash.CombatMGMk2CamoLeopard, 'WCT_CAMO_7'],
  [WeaponComponentHash.HeavySniperMk2CamoLeopard, 'WCT_CAMO_7'],
  [WeaponComponentHash.SMGMk2CamoLeopard, 'WCT_CAMO_7'],
  [WeaponComponentHash.PistolMk2CamoSlideLeopard, 'WCT_CAMO_7'],

  [WeaponComponentHash.PistolMk2CamoZebra, 'WCT_CAMO_8'],
  [WeaponComponentHash.AssaultRifleMk2CamoZebra, 'WCT_CAMO_8'],
  [WeaponComponentHash.CarbineRifleMk2CamoZebra, 'WCT_CAMO_8'],
  [WeaponComponentHash.CombatMGMk2CamoZebra, 'WCT_CAMO_8'],
  [WeaponComponentHash.HeavySniperMk2CamoZebra, 'WCT_CAMO_8'],
  [WeaponComponentHash.SMGMk2CamoZebra, 'WCT_CAMO_8'],
  [WeaponComponentHash.PistolMk2CamoSlideZebra, 'WCT_CAMO_8'],

  [WeaponComponentHash.PistolMk2CamoGeometric, 'WCT_CAMO_9'],
  [WeaponComponentHash.AssaultRifleMk2CamoGeometric, 'WCT_CAMO_9'],
  [WeaponComponentHash.CarbineRifleMk2CamoGeometric, 'WCT_CAMO_9'],
  [WeaponComponentHash.CombatMGMk2CamoGeometric, 'WCT_CAMO_9'],
  [WeaponComponentHash.HeavySniperMk2CamoGeometric, 'WCT_CAMO_9'],
  [WeaponComponentHash.SMGMk2CamoGeometric, 'WCT_CAMO_9'],
  [WeaponComponentHash.PistolMk2CamoSlideGeometric, 'WCT_CAMO_9'],

  [WeaponComponentHash.PistolMk2CamoBoom, 'WCT_CAMO_10'],
  [WeaponComponentHash.AssaultRifleMk2CamoBoom, 'WCT_CAMO_10'],
  [WeaponComponentHash.CarbineRifleMk2CamoBoom, 'WCT_CAMO_10'],
  [WeaponComponentHash.CombatMGMk2CamoBoom, 'WCT_CAMO_10'],
  [WeaponComponentHash.HeavySniperMk2CamoBoom, 'WCT_CAMO_10'],
  [WeaponComponentHash.SMGMk2CamoBoom, 'WCT_CAMO_10'],
  [WeaponComponentHash.PistolMk2CamoSlideBoom, 'WCT_CAMO_10'],

  [WeaponComponentHash.PistolMk2CamoPatriotic, 'WCT_CAMO_IND'],
  [WeaponComponentHash.AssaultRifleMk2CamoPatriotic, 'WCT_CAMO_IND'],
  [WeaponComponentHash.CarbineRifleMk2CamoPatriotic, 'WCT_CAMO_IND'],
  [WeaponComponentHash.CombatMGMk2CamoPatriotic, 'WCT_CAMO_IND'],
  [WeaponComponentHash.HeavySniperMk2CamoPatriotic, 'WCT_CAMO_IND'],
  [WeaponComponentHash.SMGMk2CamoPatriotic, 'WCT_CAMO_IND'],
  [WeaponComponentHash.PistolMk2CamoSlidePatriotic, 'WCT_CAMO_IND'],

  [WeaponComponentHash.AtSights, 'WCT_HOLO'],

  [WeaponComponentHash.AtScopeSmallMk2, 'WCT_SCOPE_SML2'],

  [WeaponComponentHash.AtScopeMacroMk2, 'WCT_SCOPE_MAC2'],

  [WeaponComponentHash.AtScopeMediumMk2, 'WCT_SCOPE_MED2'],

  [WeaponComponentHash.AtMuzzle1, 'WCT_MUZZ'],
  [WeaponComponentHash.AtMuzzle2, 'WCT_MUZZ'],
  [WeaponComponentHash.AtMuzzle3, 'WCT_MUZZ'],
  [WeaponComponentHash.AtMuzzle4, 'WCT_MUZZ'],
  [WeaponComponentHash.AtMuzzle5, 'WCT_MUZZ'],
  [WeaponComponentHash.AtMuzzle7, 'WCT_MUZZ'],
  [WeaponComponentHash.HeavySniperMk2Muzzle8, 'WCT_MUZZ'],
  [WeaponComponentHash.HeavySniperMk2Muzzle9, 'WCT_MUZZ'],

  [WeaponComponentHash.PistolMk2Scope, 'WCT_SCOPE_PI'],

  [WeaponComponentHash.PistolMk2Compensator, 'WCT_COMP'],

  [WeaponComponentHash.HeavySniperMk2ScopeLarge, 'WCT_SCOPE_LRG2'],
]);

/**
 * Initialize with DlcWeaponComponentData, in case of any missing dlc data
 *
 */
function initializeOnce() {
  let isInitialized = false;

  return function () {
    if (isInitialized) {
      return;
    }

    for (const [hash, data] of DlcWeaponComponentData) {
      ComponentDisplayNameByHash.set(hash, data.name);
    }

    isInitialized = true;
  };
}

initializeOnce()();
