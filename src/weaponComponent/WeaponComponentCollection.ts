import { Ped } from '../models';
import { Weapon } from '../weapon';
import { WeaponComponentHash } from './WeaponComponentHash';
import { WeaponComponent } from './WeaponComponent';
import { InvalidWeaponComponent } from './InvalidWeaponComponent';
import { WeaponComponentHashesByWeaponHash } from './WeaponComponentHashesByWeaponHash';
import { ComponentAttachmentPoint } from './ComponentAttachmentPoint';
import { ComponentAttachmentPointByHash } from './ComponentAttachmentPointByHash';

/**
 * ped weapon components on weapon
 *
 */
export class WeaponComponentCollection implements Iterable<WeaponComponent> {
  private readonly owner: Ped;
  private readonly weapon: Weapon;

  private readonly components = new Map<WeaponComponentHash, WeaponComponent>();

  private readonly invalidComponent = new InvalidWeaponComponent();

  public constructor(owner: Ped, weapon: Weapon) {
    this.owner = owner;
    this.weapon = weapon;
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

  /**
   * get component
   *
   * @param componentHash
   */
  public get(componentHash: WeaponComponentHash): WeaponComponent {
    if (this.AllWeaponComponentHashes.some(x => x === componentHash)) {
      let component = this.components.get(componentHash);

      if (!component) {
        component = this.createAndAddComponent(componentHash);
      }

      return component;
    }

    return this.invalidComponent;
  }

  /**
   * get current weapon component count
   *
   * @constructor
   */
  public get Count(): number {
    return this.components.size;
  }

  /**
   * get clip component
   *
   * @param index - index of component
   */
  public getClipComponent(index: number): WeaponComponent {
    return this.getAnyComponentByAttachmentPoints(
      index,
      ComponentAttachmentPoint.Clip,
      ComponentAttachmentPoint.Clip2,
    );
  }

  /**
   * get clip variation count
   *
   * @constructor
   */
  public get ClipVariationsCount(): number {
    return this.getComponentHashesByAttachmentPoints(
      ComponentAttachmentPoint.Clip,
      ComponentAttachmentPoint.Clip2,
    ).length;
  }

  /**
   * get scope component
   *
   * @param index - index of component
   */
  public getScopeComponent(index: number): WeaponComponent {
    return this.getAnyComponentByAttachmentPoints(
      index,
      ComponentAttachmentPoint.Scope,
      ComponentAttachmentPoint.Scope2,
    );
  }

  /**
   * get scope variation count
   *
   * @constructor
   */
  public get ScopeVariationsCount(): number {
    return this.getComponentHashesByAttachmentPoints(
      ComponentAttachmentPoint.Scope,
      ComponentAttachmentPoint.Scope2,
    ).length;
  }

  /**
   * get suppressor component
   *
   */
  public getSuppressorComponent(): WeaponComponent {
    return this.getAnyComponentByAttachmentPoints(
      undefined,
      ComponentAttachmentPoint.Supp,
      ComponentAttachmentPoint.Supp2,
    );
  }

  /**
   * get flash light component
   *
   */
  public getFlashLightComponent(): WeaponComponent {
    return this.getAnyComponentByAttachmentPoints(
      undefined,
      ComponentAttachmentPoint.FlashLaser,
      ComponentAttachmentPoint.FlashLaser2,
    );
  }

  /**
   * get luxury finish component
   *
   */
  public getLuxuryFinishComponent(): WeaponComponent {
    return this.getAnyComponentByAttachmentPoints(undefined, ComponentAttachmentPoint.GunRoot);
  }

  /**
   * get Mk2 camo component
   *
   * @param index - index of component
   */
  public getMk2CamoComponent(index: number): WeaponComponent {
    return this.getAnyComponentByAttachmentPoints(index, ComponentAttachmentPoint.GunRoot);
  }

  /**
   * get Mk2 barrel component
   *
   * @param index - index of component
   */
  public getMk2BarrelComponent(index: number): WeaponComponent {
    return this.getAnyComponentByAttachmentPoints(index, ComponentAttachmentPoint.Barrel);
  }

  /**
   * Create component object and add to collection
   *
   * @param hash
   * @private
   */
  private createAndAddComponent(hash: WeaponComponentHash): WeaponComponent {
    const uintHash = hash >>> 0;

    console.log('createAndAdd', hash, uintHash);

    console.log('about to create', this.owner, this.weapon, uintHash);

    const component = new WeaponComponent(this.owner, this.weapon, uintHash);
    this.components.set(uintHash, component);

    return component;
  }

  /**
   * get all WeaponComponentHash belongs to weapon
   *
   * @constructor
   * @private
   */
  private get AllWeaponComponentHashes(): WeaponComponentHash[] {
    return WeaponComponentHashesByWeaponHash.get(this.weapon.Hash);
  }

  /**
   * get components belongs to attachmentPoints
   *
   * @param attachmentPoints
   * @private
   */
  private getComponentHashesByAttachmentPoints(
    ...attachmentPoints: ComponentAttachmentPoint[]
  ): WeaponComponentHash[] {
    return this.AllWeaponComponentHashes.filter(hash =>
      attachmentPoints.some(
        attachmentPoint => ComponentAttachmentPointByHash.get(hash) === attachmentPoint,
      ),
    );
  }

  /**
   * get component by index and attachmentPoints
   *
   * @param index - component index
   * @param attachmentPoints -  attachmentPoints to search
   * @private
   */
  private getAnyComponentByAttachmentPoints(
    index?: number,
    ...attachmentPoints: ComponentAttachmentPoint[]
  ) {
    const hashes = this.getComponentHashesByAttachmentPoints(...attachmentPoints);

    if (index === undefined) {
      return this.get(hashes[0]) ?? this.invalidComponent;
    }

    return 0 <= index && index <= hashes.length - 1
      ? this.get(hashes[index])
      : this.invalidComponent;
  }
}
