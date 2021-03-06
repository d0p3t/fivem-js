import { WeaponHash } from '../hashes';
import { Weapon } from './Weapon';
import { Game } from '../Game';
import { Wait } from '../utils';

export class WeaponAssets {
  private hash: WeaponHash;

  constructor(hash: WeaponHash) {
    this.hash = hash;
  }

  public get Hash(): WeaponHash {
    return this.hash;
  }

  public get IsValid(): boolean {
    return !!IsWeaponValid(this.hash);
  }

  public get IsLoaded(): boolean {
    return !!HasWeaponAssetLoaded(this.hash);
  }

  public request(): void {
    RequestWeaponAsset(this.hash, 31, 0);
  }

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

  public dismiss(): void {
    RemoveWeaponAsset(this.hash);
  }

  public get DisplayName(): string {
    return Weapon.getDisplayNameFromHash(this.hash);
  }

  public get LocalizedName(): string{
    return Game.GetGXTEntry(this.DisplayName);
  }
}
