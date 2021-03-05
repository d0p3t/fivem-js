import { WeaponComponentCollection } from '../weaponComponent/WeaponComponentCollection';
import { Ped } from '../models';
import { AmmoType, WeaponHash } from '../hashes';
import { WeaponDisplayNameByHash } from './WeaponDisplayNameByHash';
import { Game } from '../Game';
import { Model } from '../Model';
import { WeaponTint } from './WeaponTint';
import { WeaponGroup } from './WeaponGroup';
import { WeaponLivery } from './WeaponLivery';
import { WeaponLiveryColor } from './WeaponLiveryColor';
import { WeaponHudStats } from './WeaponHudStats';

export class Weapon {
  private readonly owner: Ped;
  private readonly components: WeaponComponentCollection;
  private readonly hash: WeaponHash;

  constructor(owner?: Ped, hash?: WeaponHash) {
    if (owner && hash) {
      this.owner = owner;
      this.hash = hash;
      this.components = new WeaponComponentCollection(this.owner, this);
    } else {
      this.hash = WeaponHash.Unarmed;
    }
  }

  // public get Components(): WeaponComponentCollection {
  //   if (!this.components){
  //     this.components = new WeaponComponentCollection(this.owner, this);
  //   }
  //
  //   return this.components;
  // }

  public get Components(): WeaponComponentCollection {
    return this.components;
  }

  public get Hash(): WeaponHash {
    return this.hash;
  }

  public get IsUnarmed(): boolean {
    return this.hash === WeaponHash.Unarmed;
  }

  public get IsPresent(): boolean {
    if (this.IsUnarmed) {
      return true;
    }

    return !!HasPedGotWeapon(this.owner.Handle, this.hash, false);
  }

  public get DisplayName(): string {
    return Weapon.GetDisplayNameFromHash(this.hash) ?? 'WCT_INVALID';
  }

  public get LocalizedName(): string {
    return Game.GetGXTEntry(this.DisplayName);
  }

  public get Model(): Model {
    return new Model(GetWeapontypeModel(this.hash));
  }

  public get Tint(): WeaponTint {
    return GetPedWeaponTintIndex(this.owner.Handle, this.hash);
  }

  public set Tint(tint: WeaponTint) {
    SetPedWeaponTintIndex(this.owner.Handle, this.hash, tint);
  }

  public get Group(): WeaponGroup {
    return GetWeapontypeGroup(this.hash);
  }

  public get AmmoType(): AmmoType {
    return GetPedAmmoTypeFromWeapon(this.owner.Handle, this.hash);
  }

  public get Ammo(): number {
    if (this.IsUnarmed) {
      return 1;
    }

    if (!this.IsPresent) {
      return GetPedAmmoByType(this.owner.Handle, this.AmmoType);
    }

    return GetAmmoInPedWeapon(this.owner.Handle, this.hash);
  }

  public set Ammo(amount: number) {
    if (this.IsUnarmed) {
      return;
    }

    if (this.IsPresent) {
      SetPedAmmo(this.owner.Handle, this.hash, amount);
    } else {
      GiveWeaponToPed(this.owner.Handle, this.hash, amount, false, true);
    }
  }

  public get MaxAmmo(): number {
    if (this.IsUnarmed) {
      return 1;
    }

    // GetMaxAmmo
    // https://docs.fivem.net/natives/?_0xDC16122C7A20C933
    // noinspection UnnecessaryLocalVariableJS
    const amount: number = Citizen.invokeNative(
      '0xDC16122C7A20C933',
      this.owner.Handle,
      this.hash,
      Citizen.pointerValueInt(),
      Citizen.resultAsInteger());

    return amount;
  }

  public get MaxAmmoInClip(): number {
    if (this.IsUnarmed) {
      return 1;
    }

    if (!this.IsPresent) {
      return 0;
    }

    return GetMaxAmmoInClip(this.owner.Handle, this.hash, true);
  }

  public get DefaultClipSize(): number {
    return GetWeaponClipSize(this.hash);
  }

  public set InfiniteAmmo(toggle: boolean) {
    if (this.IsUnarmed) {
      return;
    }

    SetPedInfiniteAmmo(this.owner.Handle, toggle, this.hash);
  }

  public set InfiniteAmmoClip(toggle: boolean) {
    SetPedInfiniteAmmoClip(this.owner.Handle, toggle);
  }

  public get CanUseOnParachute(): boolean {
    return !!CanUseWeaponOnParachute(this.hash);
  }

  public get IsMk2(): boolean {
    return [
      WeaponHash.PistolMk2,
      WeaponHash.AssaultRifleMk2,
      WeaponHash.CarbineRifleMk2,
      WeaponHash.CombatMGMk2,
      WeaponHash.HeavySniperMk2,
      WeaponHash.SMGMk2]
      .some(x => x === this.hash);
  }

  public SetLivery(liveryId: WeaponLivery, colorId: WeaponLiveryColor): void {
    if (!this.IsMk2) {
      return;
    }

    const component = this.Components.GetMk2CamoComponent(liveryId);
    component.Active = true;
    SetPedWeaponLiveryColor(this.owner.Handle, this.hash, component.ComponentHash, colorId);
  }

  public get HudStats(): WeaponHudStats {
    return WeaponHudStats.get(this.hash);
  }

  public static GetDisplayNameFromHash(hash: WeaponHash): string {
    if (!hash) {
      return 'WT_INVALID';
    }

    return WeaponDisplayNameByHash.get(hash) ?? 'WCT_INVALID';
  }
}
