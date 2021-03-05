import { WeaponHash } from '../hashes';
import { Delay } from '../utils/Delay';
import { Weapon } from './Weapon';
import { Game } from '../Game';

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

  public Request(): void {
    RequestWeaponAsset(this.hash, 31, 0);
  }

  public async RequestAsync(timeout: number): Promise<boolean> {
    this.Request();

    const start = GetGameTimer();

    while (!this.IsLoaded) {
      await Delay(100);

      const now = GetGameTimer();
      if (now - start >= timeout) {
        return false;
      }
    }

    return true;
  }

  public Dismiss(): void {
    RemoveWeaponAsset(this.hash);
  }

  public get DisplayName(): string {
    return Weapon.GetDisplayNameFromHash(this.hash);
  }

  public get LocalizedName(): string{
    return Game.GetGXTEntry(this.DisplayName);
  }
}
