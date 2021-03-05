import { enumValues } from '../utils/EnumValues';
import { WeaponHash } from '../hashes';

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

export const WeaponHudStats = new Map<WeaponHash, WeaponHudStats>();

function initialize() {
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
        hudDamage: new Uint32Array(buffer.slice(0 * intLength, 1 * intLength).buffer)[0],
        hudSpeed: new Uint32Array(buffer.slice(2 * intLength, 3 * intLength).buffer)[0],
        hudCapacity: new Uint32Array(buffer.slice(4 * intLength, 5 * intLength).buffer)[0],
        hudAccuracy: new Uint32Array(buffer.slice(6 * intLength, 7 * intLength).buffer)[0],
        hudRange: new Uint32Array(buffer.slice(8 * intLength, 9 * intLength).buffer)[0],
      };

      WeaponHudStats.set(hash, weaponHudStats);
    }

    isInitialized = true;
  };
}

initialize();
