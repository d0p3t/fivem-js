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
    return undefined;
  }

  public get(hash: WeaponHash): Weapon {
    let weapon = this.weapons.get(hash);

    if (!weapon) {
      if (!this.HasWeapon(hash)) {
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

  public HasWeapon(hash: WeaponHash): boolean {
    return !!HasPedGotWeapon(this.owner.Handle, hash, false);
  }

  public IsWeaponValid(hash: WeaponHash): boolean {
    return !!IsWeaponValid(hash);
  }

  public Give(hash: WeaponHash, ammoCount: number, equipNow: boolean, isAmmoLoaded: boolean): Weapon {
    let weapon = this.weapons.get(hash);

    if (!weapon) {
      weapon = this.createAndAddWeapon(hash);
    }

    if (weapon.IsPresent) {
      this.Select(weapon);
    } else {
      GiveWeaponToPed(this.owner.Handle, weapon.Hash, ammoCount, equipNow, isAmmoLoaded);
    }

    return weapon;
  }

  public Select(weapon: Weapon | WeaponHash): boolean {
    if (weapon instanceof Weapon) {
      if (!weapon.IsPresent) {
        return false;
      }

      SetCurrentPedWeapon(this.owner.Handle, weapon.Hash, true);

      return true;
    } else {
      if (!this.HasWeapon(weapon)) {
        return false;
      }

      SetCurrentPedWeapon(this.owner.Handle, weapon, true);

      return true;
    }

  }

  public Remove(weapon: Weapon | WeaponHash): void {
    if (weapon instanceof Weapon) {
      if (this.weapons.has(weapon.Hash)) {
        this.weapons.delete(weapon.Hash);
      }

      this.Remove(weapon.Hash);
    } else {
      RemoveWeaponFromPed(this.owner.Handle, weapon);
    }
  }

  public RemoveAll(): void {
    RemoveAllPedWeapons(this.owner.Handle, true);
    this.weapons.clear();
  }

  public Drop(): void {
    SetPedDropsWeapon(this.owner.Handle);
  }

  private createAndAddWeapon(hash: WeaponHash): Weapon {
    const weapon = new Weapon(this.owner, hash);
    this.weapons.set(hash, weapon);

    return weapon;
  }
}
