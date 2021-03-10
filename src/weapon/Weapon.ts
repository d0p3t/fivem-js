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
import { enumValues } from '../utils';
import { Mk2WeaponHash } from './Mk2WeaponHash';
import { WeaponComponentHash } from '../weaponComponent';
import { WeaponComponentHashesByWeaponHash } from '../weaponComponent/WeaponComponentHashesByWeaponHash';

/**
 * ped weapon
 *
 */
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

  /**
   * weapon components
   *
   * @constructor
   */
  public get Components(): WeaponComponentCollection {
    return this.components;
  }

  /**
   * weapon hash
   *
   * @constructor
   */
  public get Hash(): WeaponHash {
    return this.hash;
  }

  /**
   * check ped is unarmed or not
   *
   * @constructor
   */
  public get IsUnarmed(): boolean {
    return this.hash === WeaponHash.Unarmed;
  }

  /**
   * Check ped owns weapon
   *
   * @constructor
   */
  public get IsPresent(): boolean {
    if (this.IsUnarmed) {
      return true;
    }

    return !!HasPedGotWeapon(this.owner.Handle, this.hash, false);
  }

  /**
   * get weapon display name / label
   *
   * @constructor
   */
  public get DisplayName(): string {
    return Weapon.getDisplayNameFromHash(this.hash) ?? 'WCT_INVALID';
  }

  /**
   * get weapon localized name
   *
   * @constructor
   */
  public get LocalizedName(): string {
    return Game.getGXTEntry(this.DisplayName);
  }

  /**
   * get weapon model
   *
   * @constructor
   */
  public get Model(): Model {
    return new Model(GetWeapontypeModel(this.hash));
  }

  /**
   * get weapon tint
   *
   * @constructor
   */
  public get Tint(): WeaponTint {
    return GetPedWeaponTintIndex(this.owner.Handle, this.hash);
  }

  /**
   * set weapon tint
   *
   * @param tint
   * @constructor
   */
  public set Tint(tint: WeaponTint) {
    SetPedWeaponTintIndex(this.owner.Handle, this.hash, tint);
  }

  /**
   * get weapon group
   *
   * @constructor
   */
  public get Group(): WeaponGroup {
    return GetWeapontypeGroup(this.hash);
  }

  /**
   * get weapon ammo type
   *
   * @constructor
   */
  public get AmmoType(): AmmoType {
    return GetPedAmmoTypeFromWeapon(this.owner.Handle, this.hash);
  }

  /**
   * get weapon ammo count
   *
   * @constructor
   */
  public get Ammo(): number {
    if (this.IsUnarmed) {
      return 1;
    }

    if (!this.IsPresent) {
      return GetPedAmmoByType(this.owner.Handle, this.AmmoType);
    }

    return GetAmmoInPedWeapon(this.owner.Handle, this.hash);
  }

  /**
   * set weapon ammo count
   *
   * @param count
   * @constructor
   */
  public set Ammo(count: number) {
    if (this.IsUnarmed) {
      return;
    }

    if (this.IsPresent) {
      SetPedAmmo(this.owner.Handle, this.hash, count);
    } else {
      GiveWeaponToPed(this.owner.Handle, this.hash, count, false, true);
    }
  }

  /**
   * get weapon max ammo
   *
   * @constructor
   */
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
      Citizen.resultAsInteger(),
    );

    return amount;
  }

  /**
   * get weapon max ammo in clip
   *
   * @constructor
   */
  public get MaxAmmoInClip(): number {
    if (this.IsUnarmed) {
      return 1;
    }

    if (!this.IsPresent) {
      return 0;
    }

    return GetMaxAmmoInClip(this.owner.Handle, this.hash, true);
  }

  /**
   * get weapon default clip size
   *
   * @constructor
   */
  public get DefaultClipSize(): number {
    return GetWeaponClipSize(this.hash);
  }

  /**
   * toggle weapon infinite ammo
   *
   * @param toggle
   * @constructor
   */
  public set InfiniteAmmo(toggle: boolean) {
    if (this.IsUnarmed) {
      return;
    }

    SetPedInfiniteAmmo(this.owner.Handle, toggle, this.hash);
  }

  /**
   * toggle ped infinite ammo clip on all weapons
   *
   * @param toggle
   * @constructor
   */
  public set InfiniteAmmoClip(toggle: boolean) {
    SetPedInfiniteAmmoClip(this.owner.Handle, toggle);
  }

  /**
   * check weapon can use on parachute
   *
   * @constructor
   */
  public get CanUseOnParachute(): boolean {
    return !!CanUseWeaponOnParachute(this.hash);
  }

  /**
   * Check weapon is Mk2 or not
   *
   * @constructor
   */
  public get IsMk2(): boolean {
    return Array.from(enumValues(Mk2WeaponHash)).some(x => (x as number) === (this.hash as number));
  }

  /**
   * set weapon livery, only work for Mk2 weapon
   *
   * @param liveryId
   * @param colorId
   */
  public setLivery(liveryId: WeaponLivery, colorId: WeaponLiveryColor): void {
    if (!this.IsMk2) {
      console.log(`[ERROR]${this.setLivery.name} failed. Reason: non-Mk2 weapon`);
      return;
    }

    const component = this.Components.getMk2CamoComponent(liveryId);

    if (component.IsInvalid) {
      console.log(`[ERROR]${this.setLivery.name} failed. Reason: invalid liveryId/Component`);
      return;
    }

    component.Active = true;
    SetPedWeaponLiveryColor(this.owner.Handle, this.hash, component.ComponentHash, colorId);
  }

  /**
   * get weapon hud stats
   *
   * @constructor
   */
  public get HudStats(): WeaponHudStats {
    return WeaponHudStats.get(this.hash);
  }

  /**
   * get weapon display name / label by hash
   *
   * @param hash
   */
  public static getDisplayNameFromHash(hash: WeaponHash): string {
    if (!hash) {
      return 'WT_INVALID';
    }

    return WeaponDisplayNameByHash.get(hash) ?? 'WCT_INVALID';
  }

  /**
   * get component hashes belongs to weapon
   *
   * @param hash
   */
  public static getWeaponComponentHashes(hash: WeaponHash): WeaponComponentHash[] {
    const hashes = WeaponComponentHashesByWeaponHash.get(hash);

    if (!hashes) {
      return [];
    }

    return [...hashes];
  }
}
