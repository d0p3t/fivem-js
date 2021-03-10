import { WeaponComponentHash } from './WeaponComponentHash';
import { getStringFromUInt8Array, getUInt32FromUint8Array } from '../utils';

/**
 * DlcWeaponComponentData
 * refer1: https://github.com/citizenfx/fivem/blob/master/code/client/clrcore/External/DlcWeaponStructs.cs#L130
 * refer2: https://docs.fivem.net/natives/?_0x6CF598A2957C2BF8
 * p0 seems to be the weapon index
 * p1 seems to be the weapon component index
 * struct DlcComponentData{
 * int attachBone;
 * int padding1;
 * int bActiveByDefault;
 * int padding2;
 * int unk;
 * int padding3;
 * int componentHash;
 * int padding4;
 * int unk2;
 * int padding5;
 * int componentCost;
 * int padding6;
 * char nameLabel[64];
 * char descLabel[64];
 * };
 *
 */
export interface DlcWeaponComponentData {
  attachBone: number;
  bActiveByDefault: number;
  unk: number;
  componentHash: number;
  unk2: number;
  componentCost: number;
  name: string;
  desc: string;
}

/**
 * DlcWeaponComponentData
 *
 */
export const DlcWeaponComponentData = new Map<WeaponComponentHash, DlcWeaponComponentData>();

/**
 * Initialize DlcWeaponComponentData, avoid calling expansive native repeatedly
 *
 */
function initializeOnce() {
  let isInitialized = false;

  return function () {
    if (isInitialized) {
      return;
    }

    // magic number based on struct DlcWeaponData
    const intLength = 4;
    const strLength = 64;

    const weaponCount = GetNumDlcWeapons();
    for (let i = 0; i < weaponCount; i++) {
      const componentCount = GetNumDlcWeaponComponents(i);
      for (let j = 0; j < componentCount; j++) {
        const buffer = new Uint8Array(14 * intLength + 4 * strLength);

        // https://docs.fivem.net/natives/?_0x6CF598A2957C2BF8
        Citizen.invokeNative('0x6CF598A2957C2BF8', i, j, buffer, Citizen.returnResultAnyway());

        // noinspection PointlessArithmeticExpressionJS
        const dlcWeaponComponentData: DlcWeaponComponentData = {
          attachBone: getUInt32FromUint8Array(buffer, 0 * intLength, 1 * intLength),
          bActiveByDefault: getUInt32FromUint8Array(buffer, 2 * intLength, 3 * intLength),
          unk: getUInt32FromUint8Array(buffer, 4 * intLength, 5 * intLength),
          componentHash: getUInt32FromUint8Array(buffer, 6 * intLength, 7 * intLength),
          unk2: getUInt32FromUint8Array(buffer, 8 * intLength, 9 * intLength),
          componentCost: getUInt32FromUint8Array(buffer, 10 * intLength, 11 * intLength),
          name: getStringFromUInt8Array(buffer, 12 * intLength, 12 * intLength + strLength),
          desc: getStringFromUInt8Array(
            buffer,
            12 * intLength + strLength,
            12 * intLength + 2 * strLength,
          ),
        };

        DlcWeaponComponentData.set(dlcWeaponComponentData.componentHash, dlcWeaponComponentData);
      }
    }

    isInitialized = true;
  };
}

initializeOnce()();
