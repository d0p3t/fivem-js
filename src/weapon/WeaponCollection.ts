import { Weapon } from './Weapon';
import { Ped, Prop } from '../models';
import { WeaponHash } from '../hashes';

/**
 * ped weapons
 *
 */
export class WeaponCollection implements Iterable<Weapon> {
  private readonly owner: Ped;
  private readonly weapons = new Map<WeaponHash, Weapon>();

  constructor(owner: Ped) {
    this.owner = owner;
  }

  [Symbol.iterator](): Iterator<Weapon> {
    let pointer = 0;
    const weapons = this.weapons;

    return {
      next(): IteratorResult<Weapon> {
        if (pointer < weapons.size) {
          return { done: false, value: weapons[pointer++] };
        } else {
          return { done: true, value: null };
        }
      },
    };
  }

  /**
   * get weapon by hash
   *
   * @param hash
   */
  public get(hash: WeaponHash): Weapon {
    let weapon = this.weapons.get(hash);

    if (!weapon) {
      if (!this.hasWeapon(hash)) {
        return null;
      }

      weapon = this.createAndAddWeapon(hash);
    }

    return weapon;
  }

  /**
   * get ped current weapon
   *
   * @constructor
   */
  public get Current(): Weapon {
    const [, hash] = GetCurrentPedWeapon(this.owner.Handle, true);

    if (this.weapons.has(hash)) {
      return this.weapons.get(hash);
    } else {
      return this.createAndAddWeapon(hash);
    }
  }

  /**
   * get ped current weapon object
   *
   * @constructor
   */
  public get CurrentWeaponObject(): Prop {
    if (this.Current.IsUnarmed) {
      return null;
    }

    return new Prop(GetCurrentPedWeaponEntityIndex(this.owner.Handle));
  }

  /**
   * get ped best weapon
   *
   * @constructor
   */
  public get BestWeapon(): Weapon {
    const hash = GetBestPedWeapon(this.owner.Handle, false);

    if (this.weapons.has(hash)) {
      return this.weapons.get(hash);
    } else {
      return this.createAndAddWeapon(hash);
    }
  }

  /**
   * check ped has weapon
   *
   * @param hash
   */
  public hasWeapon(hash: WeaponHash): boolean {
    return !!HasPedGotWeapon(this.owner.Handle, hash, false);
  }

  /**
   * check weapon is valid
   *
   * @param hash
   */
  public isWeaponValid(hash: WeaponHash): boolean {
    return !!IsWeaponValid(hash);
  }

  /**
   * give weapon to ped
   *
   * @param hash
   * @param ammoCount
   * @param equipNow
   * @param isAmmoLoaded
   */
  public give(hash: WeaponHash, ammoCount: number, equipNow: boolean, isAmmoLoaded: boolean): Weapon {
    let weapon = this.weapons.get(hash);

    if (!weapon) {
      weapon = this.createAndAddWeapon(hash);
    }

    if (weapon.IsPresent) {
      this.select(weapon);
    } else {
      GiveWeaponToPed(this.owner.Handle, weapon.Hash, ammoCount, equipNow, isAmmoLoaded);
    }

    return weapon;
  }

  /**
   * set ped current weapon on hand
   *
   * @param weapon
   */
  public select(weapon: Weapon | WeaponHash): boolean {
    if (weapon instanceof Weapon) {
      if (!weapon.IsPresent) {
        return false;
      }

      SetCurrentPedWeapon(this.owner.Handle, weapon.Hash, true);

      return true;
    } else {
      if (!this.hasWeapon(weapon)) {
        return false;
      }

      SetCurrentPedWeapon(this.owner.Handle, weapon, true);

      return true;
    }

  }

  /**
   * remove weapon from ped
   *
   * @param weapon
   */
  public remove(weapon: Weapon | WeaponHash): void {
    if (weapon instanceof Weapon) {
      if (this.weapons.has(weapon.Hash)) {
        this.weapons.delete(weapon.Hash);
      }

      this.remove(weapon.Hash);
    } else {
      RemoveWeaponFromPed(this.owner.Handle, weapon);
    }
  }

  /**
   * remove all weapons from ped
   *
   */
  public removeAll(): void {
    RemoveAllPedWeapons(this.owner.Handle, true);
    this.weapons.clear();
  }

  /**
   * Drop ped current weapon?
   * todo: this native seems does not work as expected, need to investigate
   * refer1: https://docs.fivem.net/natives/?_0x6B7513D9966FBEC0
   * refer2: https://forum.cfx.re/t/release-weapondrop/49856/8
   *
   */
  public drop(): void {
    SetPedDropsWeapon(this.owner.Handle);
  }

  /**
   * create weapon object and add to collection
   *
   * @param hash
   * @private
   */
  private createAndAddWeapon(hash: WeaponHash): Weapon {
    const uintHash = hash >>> 0;
    const weapon = new Weapon(this.owner, uintHash);
    this.weapons.set(uintHash, weapon);

    return weapon;
  }
}
