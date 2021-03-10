import { WeaponComponentHash } from './WeaponComponentHash';
import { enumValues } from '../utils';
import { getUInt32FromUint8Array } from '../utils';

/***
 * WeaponComponentHudStats
 * refer: https://github.com/citizenfx/fivem/blob/master/code/client/clrcore/External/Game.cs#L976
 *    [StructLayout(LayoutKind.Explicit, Size = 0x28)]
 *    [SecuritySafeCritical]
 *    internal struct UnsafeWeaponComponentHudStats
 *    {
 * 			[FieldOffset(0x00)] private int hudDamage;
 * 			[FieldOffset(0x08)] private int hudSpeed;
 * 			[FieldOffset(0x10)] private int hudCapacity;
 * 			[FieldOffset(0x18)] private int hudAccuracy;
 * 			[FieldOffset(0x20)] private int hudRange;
 *
 */
export interface WeaponComponentHudStats {
  hudDamage: number;
  hudSpeed: number;
  hudCapacity: number;
  hudAccuracy: number;
  hudRange: number;
}

/**
 * Mapping of WeaponComponentHash -> WeaponComponentHudStats
 *
 */
export const WeaponComponentHudStats = new Map<WeaponComponentHash, WeaponComponentHudStats>();

function initializeOnce() {
  let isInitialized = false;

  return function () {
    if (isInitialized) {
      return;
    }

    // magic number based on struct WeaponComponentHudStat
    const intLength = 4;

    for (const hash of enumValues(WeaponComponentHash)) {
      const buffer = new Uint8Array(0x28);

      // https://docs.fivem.net/natives/?_0xB3CAF387AE12E9F8
      Citizen.invokeNative('0xB3CAF387AE12E9F8', hash, buffer, Citizen.returnResultAnyway());

      // noinspection PointlessArithmeticExpressionJS
      const weaponComponentHudStat: WeaponComponentHudStats = {
        hudDamage: getUInt32FromUint8Array(buffer, 0 * intLength, 1 * intLength),
        hudSpeed: getUInt32FromUint8Array(buffer, 2 * intLength, 3 * intLength),
        hudCapacity: getUInt32FromUint8Array(buffer, 4 * intLength, 5 * intLength),
        hudAccuracy: getUInt32FromUint8Array(buffer, 6 * intLength, 7 * intLength),
        hudRange: getUInt32FromUint8Array(buffer, 8 * intLength, 9 * intLength),
      };

      WeaponComponentHudStats.set(hash, weaponComponentHudStat);
    }

    isInitialized = true;
  };
}

initializeOnce()();
