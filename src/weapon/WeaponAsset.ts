import { WeaponHash } from '../hashes';
import { Weapon } from './Weapon';
import { Game } from '../Game';
import { Wait } from '../utils';

/**
 * weapon asset
 *
 */
export class WeaponAsset {
  private readonly hash: WeaponHash;

  constructor(hash: WeaponHash) {
    this.hash = hash;
  }

  /**
   * get weapon hash
   *
   * @constructor
   */
  public get Hash(): WeaponHash {
    return this.hash;
  }

  /**
   * check weapon is valid
   *
   * @constructor
   */
  public get IsValid(): boolean {
    return !!IsWeaponValid(this.hash);
  }

  /**
   * check weapon assets is loaded
   *
   * @constructor
   */
  public get IsLoaded(): boolean {
    return !!HasWeaponAssetLoaded(this.hash);
  }

  /**
   * request weapon asset
   *
   */
  public request(): void {
    RequestWeaponAsset(this.hash, 31, 0);
  }

  /**
   * request weapon asset async
   *
   * @param timeout
   */
  public async requestAsync(timeout: number): Promise<boolean> {
    this.request();

    const start = GetGameTimer();

    while (!this.IsLoaded) {
      await Wait(100);

      const now = GetGameTimer();
      if (now - start >= timeout) {
        return false;
      }
    }

    return true;
  }

  /**
   * unload weapon asset
   *
   */
  public dismiss(): void {
    RemoveWeaponAsset(this.hash);
  }

  /**
   * get weapon display name / label
   *
   * @constructor
   */
  public get DisplayName(): string {
    return Weapon.getDisplayNameFromHash(this.hash);
  }

  /**
   * get weapon localized name
   *
   * @constructor
   */
  public get LocalizedName(): string {
    return Game.getGXTEntry(this.DisplayName);
  }
}
