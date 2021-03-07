import { Weapon } from './Weapon';
import { Ped, Prop } from '../models';
import { WeaponHash } from '../hashes';

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

  public get Current(): Weapon {
    const [, hash] = GetCurrentPedWeapon(this.owner.Handle, true);

    if (this.weapons.has(hash)) {
      return this.weapons.get(hash);
    } else {
      return this.createAndAddWeapon(hash);
    }
  }

  public get CurrentWeaponObject(): Prop {
    if (this.Current.IsUnarmed) {
      return null;
    }

    return new Prop(GetCurrentPedWeaponEntityIndex(this.owner.Handle));
  }

  public get BestWeapon(): Weapon {
    const hash = GetBestPedWeapon(this.owner.Handle, false);

    if (this.weapons.has(hash)) {
      return this.weapons.get(hash);
    } else {
      return this.createAndAddWeapon(hash);
    }
  }

  public hasWeapon(hash: WeaponHash): boolean {
    return !!HasPedGotWeapon(this.owner.Handle, hash, false);
  }

  public isWeaponValid(hash: WeaponHash): boolean {
    return !!IsWeaponValid(hash);
  }

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

  public removeAll(): void {
    RemoveAllPedWeapons(this.owner.Handle, true);
    this.weapons.clear();
  }

  public drop(): void {
    SetPedDropsWeapon(this.owner.Handle);
  }

  private createAndAddWeapon(hash: WeaponHash): Weapon {
    const uintHash = hash >>> 0;
    const weapon = new Weapon(this.owner, uintHash);
    this.weapons.set(uintHash, weapon);

    return weapon;
  }
}
