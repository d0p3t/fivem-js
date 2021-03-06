import { Ped } from '../models';
import { Weapon } from '../weapon/Weapon';
import { WeaponComponentHash } from './WeaponComponentHash';
import { WeaponComponent } from './WeaponComponent';
import { InvalidWeaponComponent } from './InvalidWeaponComponent';
import { WeaponComponentHashesByWeaponHash } from './WeaponComponentHashesByWeaponHash';
import { ComponentAttachmentPoint } from './ComponentAttachmentPoint';


export class WeaponComponentCollection implements Iterable<WeaponComponent> {
  private readonly owner: Ped;
  private readonly weapon: Weapon;

  private readonly components = new Map<WeaponComponentHash, WeaponComponent>();

  private readonly componentHashes: WeaponComponentHash[];

  private readonly invalidComponent = new InvalidWeaponComponent();

  public constructor(
    owner: Ped,
    weapon: Weapon,
  ) {
    this.owner = owner;
    this.weapon = weapon;
    this.componentHashes = WeaponComponentHashesByWeaponHash[this.weapon.Hash];
  }

  [Symbol.iterator](): Iterator<WeaponComponent> {
    let pointer = 0;
    const components = this.components;

    return {
      next(): IteratorResult<WeaponComponent> {
        if (pointer < components.size) {
          return { done: false, value: components[pointer++] };
        } else {
          return { done: true, value: null };
        }
      },
    };
  }

  public get(componentHash: WeaponComponentHash): WeaponComponent {
    if (this.componentHashes.some(x => x === componentHash)) {
      let component = this.components.get(componentHash);

      if (!component) {
        component = new WeaponComponent(this.owner, this.weapon, componentHash);
        this.components.set(componentHash, component);
      }

      return component;
    }

    return this.invalidComponent;
  }

  public get Count(): number {
    return this.components.size;
  }

  public getClipComponent(index: number): WeaponComponent {
    for (const [, component] of this.components) {
      const attachmentPoint = component.AttachmentPoint;
      if ([ComponentAttachmentPoint.Clip, ComponentAttachmentPoint.Clip2].some(x => x === attachmentPoint)) {
        if (index-- === 0) {
          return component;
        }
      }
    }

    return this.invalidComponent;
  }

  public get ClipVariationsCount(): number {
    let count = 0;

    for (const [, component] of this.components) {
      const attachmentPoint = component.AttachmentPoint;
      if ([ComponentAttachmentPoint.Clip, ComponentAttachmentPoint.Clip2].some(x => x === attachmentPoint)) {
        count++;
      }
    }

    return count;
  }

  public getScopeComponent(index: number): WeaponComponent {
    for (const [, component] of this.components) {
      const attachmentPoint = component.AttachmentPoint;
      if ([ComponentAttachmentPoint.Scope, ComponentAttachmentPoint.Scope2].some(x => x === attachmentPoint)) {
        if (index-- === 0) {
          return component;
        }
      }
    }

    return this.invalidComponent;
  }

  public get ScopeVariationsCount(): number {
    let count = 0;

    for (const [, component] of this.components) {
      const attachmentPoint = component.AttachmentPoint;
      if ([ComponentAttachmentPoint.Scope, ComponentAttachmentPoint.Scope2].some(x => x === attachmentPoint)) {
        count++;
      }
    }

    return count;
  }

  public getSuppressorComponent(): WeaponComponent {
    for (const [, component] of this.components) {
      const attachmentPoint = component.AttachmentPoint;
      if ([ComponentAttachmentPoint.Supp, ComponentAttachmentPoint.Supp2].some(x => x === attachmentPoint)) {
        return component;
      }
    }

    return this.invalidComponent;
  }

  public getFlashLightComponent(): WeaponComponent {
    for (const [, component] of this.components) {
      const attachmentPoint = component.AttachmentPoint;
      if ([ComponentAttachmentPoint.FlashLaser, ComponentAttachmentPoint.FlashLaser2].some(x => x === attachmentPoint)) {
        return component;
      }
    }

    return this.invalidComponent;
  }

  public getLuxuryFinishComponent(): WeaponComponent {
    for (const [, component] of this.components) {
      const attachmentPoint = component.AttachmentPoint;
      if (attachmentPoint === ComponentAttachmentPoint.GunRoot) {
        return component;
      }
    }

    return this.invalidComponent;
  }

  public getMk2CamoComponent(index: number): WeaponComponent {
    for (const [, component] of this.components) {
      const attachmentPoint = component.AttachmentPoint;
      if (attachmentPoint === ComponentAttachmentPoint.GunRoot) {
        if (index-- === 0) {
          return component;
        }
      }
    }

    return this.invalidComponent;
  }

  public getMk2BarrelComponent(index: number): WeaponComponent {
    for (const [, component] of this.components) {
      const attachmentPoint = component.AttachmentPoint;
      if (attachmentPoint === ComponentAttachmentPoint.Barrel) {
        if (index-- === 0) {
          return component;
        }
      }
    }

    return this.invalidComponent;
  }

}
