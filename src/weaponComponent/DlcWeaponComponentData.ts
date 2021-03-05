import { WeaponComponentHash } from './WeaponComponentHash';

/**
 * DlcWeaponComponentData
 * refer1: https://github.com/citizenfx/fivem/blob/master/code/client/clrcore/External/DlcWeaponStructs.cs#L130
 * refer2: https://docs.fivem.net/natives/?_0x6CF598A2957C2BF8
 *
 */
export interface DlcWeaponComponentData {
  // p0 seems to be the weapon index
  // p1 seems to be the weapon component index
  // struct DlcComponentData{
  // int attachBone;
  // int padding1;
  // int bActiveByDefault;
  // int padding2;
  // int unk;
  // int padding3;
  // int componentHash;
  // int padding4;
  // int unk2;
  // int padding5;
  // int componentCost;
  // int padding6;
  // char nameLabel[64];
  // char descLabel[64];
  // };
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

  return function() {
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
          attachBone: new Uint32Array(buffer.slice(0 * intLength, 1 * intLength).buffer)[0],
          bActiveByDefault: new Uint32Array(buffer.slice(2 * intLength, 3 * intLength).buffer)[0],
          unk: new Uint32Array(buffer.slice(4 * intLength, 5 * intLength).buffer)[0],
          componentHash: new Uint32Array(buffer.slice(6 * intLength, 7 * intLength).buffer)[0],
          unk2: new Uint32Array(buffer.slice(8 * intLength, 9 * intLength).buffer)[0],
          componentCost: new Uint32Array(buffer.slice(10 * intLength, 11 * intLength).buffer)[0],
          name: String.fromCharCode(...buffer.slice(12 * intLength, 12 * intLength + strLength)),
          desc: String.fromCharCode(...buffer.slice(12 * intLength + strLength, 12 * intLength + 2 * strLength)),
        };

        DlcWeaponComponentData.set(dlcWeaponComponentData.componentHash, dlcWeaponComponentData);
      }
    }

    isInitialized = true;
  };
}

initializeOnce();
