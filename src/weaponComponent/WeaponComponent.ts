import { Ped } from '../models';
import { Weapon } from '../weapon/Weapon';
import { WeaponComponentHash } from './WeaponComponentHash';
import { WeaponHash } from '../hashes';
import { ComponentAttachmentPoint } from './ComponentAttachmentPoint';
import { Game } from '../Game';
import { ComponentDisplayNameByHash } from './ComponentDisplayNameByHash';
import { WeaponComponentHashesByWeaponHash } from './WeaponComponentHashesByWeaponHash';
import { ComponentAttachmentPointByHash } from './ComponentAttachmentPointByHash';
import { WeaponComponentHudStat, WeaponComponentHudStats } from './WeaponComponentHudStats';

export class WeaponComponent {
  protected readonly owner: Ped;
  protected readonly weapon: Weapon;
  protected readonly componentHash: WeaponComponentHash;

  public constructor(
    owner: Ped,
    weapon: Weapon,
    component: WeaponComponentHash,
  ) {
    this.owner = owner;
    this.weapon = weapon;
    this.componentHash = component;
  }

  public get ComponentHash(): WeaponComponentHash {
    return this.componentHash;
  }

  // public static implicit operator WeaponComponentHash(WeaponComponent weaponComponent)
  // {
  //   return weaponComponent.ComponentHash;
  // }

  public get Active(): boolean {
    return HasPedGotWeaponComponent(this.owner.Handle, this.weapon.Hash, this.componentHash) !== 0;
  }

  public set Active(value: boolean) {
    if (value) {
      GiveWeaponComponentToPed(this.owner.Handle, this.weapon.Hash, this.componentHash);
    } else {
      RemoveWeaponComponentFromPed(this.owner.Handle, this.weapon.Hash, this.componentHash);
    }
  }

  /**
   * DisplayName
   *
   * @constructor
   */
  public get DisplayName(): string {
    return WeaponComponent.GetComponentDisplayNameFromHash(this.weapon.Hash, this.componentHash);
  }

  /**
   * LocalizedName
   *
   * @constructor
   */
  public get LocalizedName(): string {
    return Game.GetGXTEntry(this.DisplayName);
  }

  /**
   * AttachmentPoint
   *
   * @constructor
   */
  public get AttachmentPoint(): ComponentAttachmentPoint {
    return WeaponComponent.GetAttachmentPoint(this.weapon.Hash, this.componentHash);
  }

  /**
   * get component hud stats
   *
   * @constructor
   */
  public get HudStats(): WeaponComponentHudStats {
    return WeaponComponentHudStat.get(this.componentHash);
  }

  /**
   * GetComponentDisplayNameFromHash
   *
   * @param hash
   * @param componentHash
   * @constructor
   */
  public static GetComponentDisplayNameFromHash(hash: WeaponHash, componentHash: WeaponComponentHash): string {
    if (!hash) {
      return 'WCT_INVALID';
    }

    return ComponentDisplayNameByHash.get(componentHash) ?? 'WCT_INVALID';
  }

  /**
   * GetAttachmentPoint
   *
   * @param weaponHash
   * @param componentHash
   * @constructor
   */
  public static GetAttachmentPoint(weaponHash: WeaponHash, componentHash: WeaponComponentHash): ComponentAttachmentPoint {
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
