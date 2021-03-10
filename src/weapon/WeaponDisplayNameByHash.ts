import { DlcWeaponData } from './DlcWeaponData';
import { WeaponHash } from '../hashes';

/***
 * Mapping of WeaponHash -> DisplayName(Label)
 *
 */
export const WeaponDisplayNameByHash = new Map<WeaponHash, string>([
  [WeaponHash.Pistol, 'WT_PIST'],
  [WeaponHash.CombatPistol, 'WT_PIST_CBT'],
  [WeaponHash.APPistol, 'WT_PIST_AP'],
  [WeaponHash.SMG, 'WT_SMG'],
  [WeaponHash.MicroSMG, 'WT_SMG_MCR'],
  [WeaponHash.AssaultRifle, 'WT_RIFLE_ASL'],
  [WeaponHash.CarbineRifle, 'WT_RIFLE_CBN'],
  [WeaponHash.AdvancedRifle, 'WT_RIFLE_ADV'],
  [WeaponHash.MG, 'WT_MG'],
  [WeaponHash.CombatMG, 'WT_MG_CBT'],
  [WeaponHash.PumpShotgun, 'WT_SG_PMP'],
  [WeaponHash.SawnOffShotgun, 'WT_SG_SOF'],
  [WeaponHash.AssaultShotgun, 'WT_SG_ASL'],
  [WeaponHash.HeavySniper, 'WT_SNIP_HVY'],
  [WeaponHash.SniperRifle, 'WT_SNIP_RIF'],
  [WeaponHash.GrenadeLauncher, 'WT_GL'],
  [WeaponHash.RPG, 'WT_RPG'],
  [WeaponHash.Minigun, 'WT_MINIGUN'],
  [WeaponHash.AssaultSMG, 'WT_SMG_ASL'],
  [WeaponHash.BullpupShotgun, 'WT_SG_BLP'],
  [WeaponHash.Pistol50, 'WT_PIST_50'],
  [WeaponHash.Bottle, 'WT_BOTTLE'],
  [WeaponHash.Gusenberg, 'WT_GUSENBERG'],
  [WeaponHash.SNSPistol, 'WT_SNSPISTOL'],
  [WeaponHash.VintagePistol, 'TT_VPISTOL'],
  [WeaponHash.Dagger, 'WT_DAGGER'],
  [WeaponHash.FlareGun, 'WT_FLAREGUN'],
  [WeaponHash.Musket, 'WT_MUSKET'],
  [WeaponHash.Firework, 'WT_FWRKLNCHR'],
  [WeaponHash.MarksmanRifle, 'WT_HMKRIFLE'],
  [WeaponHash.HeavyShotgun, 'WT_HVYSHOT'],
  [WeaponHash.ProximityMine, 'WT_PRXMINE'],
  [WeaponHash.HomingLauncher, 'WT_HOMLNCH'],
  [WeaponHash.CombatPDW, 'WT_COMBATPDW'],
  [WeaponHash.KnuckleDuster, 'WT_KNUCKLE'],
  [WeaponHash.MarksmanPistol, 'WT_MKPISTOL'],
  [WeaponHash.Machete, 'WT_MACHETE'],
  [WeaponHash.MachinePistol, 'WT_MCHPIST'],
  [WeaponHash.Flashlight, 'WT_FLASHLIGHT'],
  [WeaponHash.DoubleBarrelShotgun, 'WT_DBSHGN'],
  [WeaponHash.CompactRifle, 'WT_CMPRIFLE'],
  [WeaponHash.SwitchBlade, 'WT_SWBLADE'],
  [WeaponHash.Revolver, 'WT_REVOLVER'],
  // mpgunrunning
  [WeaponHash.PistolMk2, 'WT_PIST2'],
  [WeaponHash.AssaultRifleMk2, 'WT_RIFLE_ASL2'],
  [WeaponHash.CarbineRifleMk2, 'WT_RIFLE_CBN2'],
  [WeaponHash.CombatMGMk2, 'WT_MG_CBT2'],
  [WeaponHash.HeavySniperMk2, 'WT_SNIP_HVY2'],
  [WeaponHash.SMGMk2, 'WT_SMG2'],
]);

/**
 * Initialize with DlcWeaponData, in case of any missing dlc data
 *
 */
function initializeOnce() {
  let isInitialized = false;

  return function () {
    if (isInitialized) {
      return;
    }

    for (const [hash, data] of DlcWeaponData) {
      WeaponDisplayNameByHash.set(hash, data.name);
    }

    isInitialized = true;
  };
}

initializeOnce()();
