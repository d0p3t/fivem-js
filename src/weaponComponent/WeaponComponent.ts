import { Ped } from '../models';
import { Weapon } from '../weapon/Weapon';
import { WeaponComponentHash } from './WeaponComponentHash';
import { WeaponHash } from '../hashes';
import { ComponentAttachmentPoint } from './ComponentAttachmentPoint';
import { Game } from '../Game';
import { ComponentDisplayNameByHash } from './ComponentDisplayNameByHash';
import { WeaponComponentHashesByWeaponHash } from './WeaponComponentHashesByWeaponHash';
import { ComponentAttachmentPointByHash } from './ComponentAttachmentPointByHash';
import { WeaponComponentHudStats } from './WeaponComponentHudStats';

/**
 * ped weapon component on weapon
 *
 */
export class WeaponComponent {
  protected readonly owner: Ped;
  protected readonly weapon: Weapon;
  protected readonly componentHash: WeaponComponentHash;

  public constructor(owner: Ped, weapon: Weapon, componentHash: WeaponComponentHash) {
    this.owner = owner;
    this.weapon = weapon;
    this.componentHash = componentHash;
  }

  /**
   * Check WeaponComponent is invalid or not
   *
   * @constructor
   */
  public get IsInvalid(): boolean {
    return this.componentHash === WeaponComponentHash.Invalid;
  }

  /**
   * get component hash
   *
   * @constructor
   */
  public get ComponentHash(): WeaponComponentHash {
    return this.componentHash;
  }

  /**
   * check ped has weapon component
   *
   * @constructor
   */
  public get Active(): boolean {
    return HasPedGotWeaponComponent(this.owner.Handle, this.weapon.Hash, this.componentHash) !== 0;
  }

  /**
   * give weapon component to ped
   *
   * @param value
   * @constructor
   */
  public set Active(value: boolean) {
    if (value) {
      GiveWeaponComponentToPed(this.owner.Handle, this.weapon.Hash, this.componentHash);
    } else {
      RemoveWeaponComponentFromPed(this.owner.Handle, this.weapon.Hash, this.componentHash);
    }
  }

  /**
   * get component display name / label
   *
   * @constructor
   */
  public get DisplayName(): string {
    return WeaponComponent.getComponentDisplayNameFromHash(this.weapon.Hash, this.componentHash);
  }

  /**
   * get component localized name
   *
   * @constructor
   */
  public get LocalizedName(): string {
    return Game.getGXTEntry(this.DisplayName);
  }

  /**
   * get component attachment point
   *
   * @constructor
   */
  public get AttachmentPoint(): ComponentAttachmentPoint {
    return WeaponComponent.getAttachmentPoint(this.weapon.Hash, this.componentHash);
  }

  /**
   * get component hud stats
   *
   * @constructor
   */
  public get HudStats(): WeaponComponentHudStats {
    return WeaponComponentHudStats.get(this.componentHash);
  }

  /**
   * get component display name / label by hash
   *
   * @param hash
   * @param componentHash
   * @constructor
   */
  public static getComponentDisplayNameFromHash(
    hash: WeaponHash,
    componentHash: WeaponComponentHash,
  ): string {
    if (!hash) {
      return 'WCT_INVALID';
    }

    return ComponentDisplayNameByHash.get(componentHash) ?? 'WCT_INVALID';
  }

  /**
   * get component attachment point by WeaponHash and WeaponComponentHash
   *
   * @param weaponHash
   * @param componentHash
   * @constructor
   */
  public static getAttachmentPoint(
    weaponHash: WeaponHash,
    componentHash: WeaponComponentHash,
  ): ComponentAttachmentPoint {
    const componentHashes = WeaponComponentHashesByWeaponHash.get(weaponHash);
    if (!componentHashes) {
      return ComponentAttachmentPoint.Invalid;
    }

    if (componentHashes.every(x => x !== componentHash)) {
      return ComponentAttachmentPoint.Invalid;
    }

    return ComponentAttachmentPointByHash.get(componentHash) ?? ComponentAttachmentPoint.Invalid;
  }
}
