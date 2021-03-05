import { WeaponComponentHash } from './WeaponComponentHash';
import { enumValues } from '../utils/EnumValues';

export interface WeaponComponentHudStats {
  // https://github.com/citizenfx/fivem/blob/da7f3bf9b660c88be8ec12ce0bf7fbbcc34cd590/code/client/clrcore/External/Game.cs#L976
  // 		[StructLayout(LayoutKind.Explicit, Size = 0x28)]
  // 		[SecuritySafeCritical]
  // 		internal struct UnsafeWeaponComponentHudStats
  // 		{
  // 			[FieldOffset(0x00)] private int hudDamage;
  //
  // 			[FieldOffset(0x08)] private int hudSpeed;
  //
  // 			[FieldOffset(0x10)] private int hudCapacity;
  //
  // 			[FieldOffset(0x18)] private int hudAccuracy;
  //
  // 			[FieldOffset(0x20)] private int hudRange;
  //
  //
  // 			public WeaponComponentHudStats GetSafeStats()
  // 			{
  // 				return new WeaponComponentHudStats(hudDamage, hudSpeed, hudCapacity, hudAccuracy, hudRange);
  // 			}
  // 		}
  hudDamage: number;
  hudSpeed: number;
  hudCapacity: number;
  hudAccuracy: number;
  hudRange: number;
}

export const WeaponComponentHudStat = new Map<WeaponComponentHash, WeaponComponentHudStats>();

function initialize() {
  let isInitialized = false;

  return function() {
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
        hudDamage: new Uint32Array(buffer.slice(0 * intLength, 1 * intLength).buffer)[0],
        hudSpeed: new Uint32Array(buffer.slice(2 * intLength, 3 * intLength).buffer)[0],
        hudCapacity: new Uint32Array(buffer.slice(4 * intLength, 5 * intLength).buffer)[0],
        hudAccuracy: new Uint32Array(buffer.slice(6 * intLength, 7 * intLength).buffer)[0],
        hudRange: new Uint32Array(buffer.slice(8 * intLength, 9 * intLength).buffer)[0],
      };

      WeaponComponentHudStat.set(hash, weaponComponentHudStat);
    }

    isInitialized = true;
  };
}

initialize();
