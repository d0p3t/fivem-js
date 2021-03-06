import { enumValues } from '../utils/EnumValues';
import { WeaponHash } from '../hashes';
import { getUInt32FromUint8Array } from '../utils/GetUInt32FromUInt8Array';

/***
 * WeaponHudStats
 * refer: https://github.com/citizenfx/fivem/blob/master/code/client/clrcore/External/Game.cs#L900
 *
 */
export interface WeaponHudStats {
  // https://docs.fivem.net/natives/?_0xD92C739EE34C9EBA
  // // members should be aligned to 8 bytes by default but it's best to use alignas here, just to be sure
  // struct WeaponHudStatsData
  // {
  // 	alignas(8) uint8_t hudDamage; // 0x0000
  // 	alignas(8) uint8_t hudSpeed; // 0x0008
  // 	alignas(8) uint8_t hudCapacity; // 0x0010
  // 	alignas(8) uint8_t hudAccuracy; // 0x0018
  // 	alignas(8) uint8_t hudRange; // 0x0020
  // };
  hudDamage: number;
  hudSpeed: number;
  hudCapacity: number;
  hudAccuracy: number;
  hudRange: number;
}

/**
 * Mapping of WeaponHash -> WeaponHudStats
 *
 */
export const WeaponHudStats = new Map<WeaponHash, WeaponHudStats>();

/**
 * Initialize WeaponHudStats, avoid calling expansive native repeatedly
 *
 */
function initializeOnce() {
  let isInitialized = false;

  return function() {
    if (isInitialized) {
      return;
    }

    // magic number based on struct WeaponHudStats
    const intLength = 4;

    for (const hash of enumValues(WeaponHash)) {
      const buffer = new Uint8Array(0x28);

      // https://docs.fivem.net/natives/?_0xD92C739EE34C9EBA
      Citizen.invokeNative('0xD92C739EE34C9EBA', hash, buffer, Citizen.returnResultAnyway());

      // noinspection PointlessArithmeticExpressionJS
      const weaponHudStats: WeaponHudStats = {
        hudDamage: getUInt32FromUint8Array(buffer, 0 * intLength, 1 * intLength),
        hudSpeed: getUInt32FromUint8Array(buffer, 2 * intLength, 3 * intLength),
        hudCapacity: getUInt32FromUint8Array(buffer, 4 * intLength, 5 * intLength),
        hudAccuracy: getUInt32FromUint8Array(buffer, 6 * intLength, 7 * intLength),
        hudRange: getUInt32FromUint8Array(buffer, 8 * intLength, 9 * intLength),
      };

      WeaponHudStats.set(hash, weaponHudStats);
    }

    isInitialized = true;
  };
}

initializeOnce()();
