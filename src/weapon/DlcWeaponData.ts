import { WeaponHash } from '../hashes';

/**
 * DlcWeaponData
 * refer1: https://github.com/citizenfx/fivem/blob/master/code/client/clrcore/External/DlcWeaponStructs.cs#L10
 * refer2: https://docs.fivem.net/natives/?_0xBF0FD6E56C964FCB
 *
 */
export interface DlcWeaponData {
  // int emptyCheck; //use DLC1::_IS_DLC_DATA_EMPTY on this
  // int padding1;
  // int weaponHash;
  // int padding2;
  // int unk;
  // int padding3;
  // int weaponCost;
  // int padding4;
  // int ammoCost;
  // int padding5;
  // int ammoType;
  // int padding6;
  // int defaultClipSize;
  // int padding7;
  // char nameLabel[64];
  // char descLabel[64];
  // char desc2Label[64]; // usually "the" + name
  // char upperCaseNameLabel[64];
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
 * DlcWeaponData
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
        validCheck: new Uint32Array(buffer.slice(0 * intLength, 1 * intLength).buffer)[0],
        weaponHash: new Uint32Array(buffer.slice(2 * intLength, 3 * intLength).buffer)[0],
        unk: new Uint32Array(buffer.slice(4 * intLength, 5 * intLength).buffer)[0],
        weaponCost: new Uint32Array(buffer.slice(6 * intLength, 7 * intLength).buffer)[0],
        ammoCost: new Uint32Array(buffer.slice(8 * intLength, 9 * intLength).buffer)[0],
        ammoType: new Uint32Array(buffer.slice(10 * intLength, 11 * intLength).buffer)[0],
        defaultClipSize: new Uint32Array(buffer.slice(12 * intLength, 13 * intLength).buffer)[0],
        name: String.fromCharCode(...buffer.slice(14 * intLength, 14 * intLength + strLength)),
        desc: String.fromCharCode(...buffer.slice(14 * intLength + strLength, 14 * intLength + 2 * strLength)),
        simpleDesc: String.fromCharCode(...buffer.slice(14 * intLength + 2 * strLength, 14 * intLength + 3 * strLength)),
        upperCaseName: String.fromCharCode(...buffer.slice(14 * intLength + 3 * strLength, 14 * intLength + 4 * strLength)),
      };

      DlcWeaponData.set(dlcWeaponData.weaponHash, dlcWeaponData);
    }

    isInitialized = true;
  };
}

initializeOnce();
