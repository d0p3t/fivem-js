import { WeaponHash } from '../hashes';
import { getUInt32FromUint8Array } from '../utils';
import { getStringFromUInt8Array } from '../utils';

/**
 * DlcWeaponData
 * refer1: https://github.com/citizenfx/fivem/blob/master/code/client/clrcore/External/DlcWeaponStructs.cs#L10
 * refer2: https://docs.fivem.net/natives/?_0xBF0FD6E56C964FCB
 *
 * int emptyCheck; //use DLC1::_IS_DLC_DATA_EMPTY on this
 * int padding1;
 * int weaponHash;
 * int padding2;
 * int unk;
 * int padding3;
 * int weaponCost;
 * int padding4;
 * int ammoCost;
 * int padding5;
 * int ammoType;
 * int padding6;
 * int defaultClipSize;
 * int padding7;
 * char nameLabel[64];
 * char descLabel[64];
 * char desc2Label[64]; // usually "the" + name
 * char upperCaseNameLabel[64];
 *
 */
export interface DlcWeaponData {
  validCheck: number;
  weaponHash: number;
  unk: number;
  weaponCost: number;
  ammoCost: number;
  ammoType: number;
  defaultClipSize: number;
  name: string;
  desc: string;
  simpleDesc: string;
  upperCaseName: string;
}

/**
 * DlcWeaponData - Mapping of WeaponHash -> DlcWeaponData
 */
export const DlcWeaponData = new Map<WeaponHash, DlcWeaponData>();

/**
 * Initialize DlcWeaponData, avoid calling expansive native repeatedly
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
      const buffer = new Uint8Array(14 * intLength + 4 * strLength);

      // https://docs.fivem.net/natives/?_0x79923CD21BECE14E
      Citizen.invokeNative('0x79923CD21BECE14E', i, buffer, Citizen.returnResultAnyway());

      // noinspection PointlessArithmeticExpressionJS
      const dlcWeaponData: DlcWeaponData = {
        validCheck: getUInt32FromUint8Array(buffer, 0 * intLength, 1 * intLength),
        weaponHash: getUInt32FromUint8Array(buffer, 2 * intLength, 3 * intLength),
        unk: getUInt32FromUint8Array(buffer, 4 * intLength, 5 * intLength),
        weaponCost: getUInt32FromUint8Array(buffer, 6 * intLength, 7 * intLength),
        ammoCost: getUInt32FromUint8Array(buffer, 8 * intLength, 9 * intLength),
        ammoType: getUInt32FromUint8Array(buffer, 10 * intLength, 11 * intLength),
        defaultClipSize: getUInt32FromUint8Array(buffer, 12 * intLength, 13 * intLength),
        name: getStringFromUInt8Array(buffer, 14 * intLength, 14 * intLength + strLength),
        desc: getStringFromUInt8Array(buffer, 14 * intLength + strLength, 14 * intLength + 2 * strLength),
        simpleDesc: getStringFromUInt8Array(buffer, 14 * intLength + 2 * strLength, 14 * intLength + 3 * strLength),
        upperCaseName: getStringFromUInt8Array(buffer, 14 * intLength + 3 * strLength, 14 * intLength + 4 * strLength),
      };

      DlcWeaponData.set(dlcWeaponData.weaponHash, dlcWeaponData);
    }

    isInitialized = true;
  };
}

initializeOnce()();
