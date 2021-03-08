import { WeaponComponent } from './WeaponComponent';
import { WeaponComponentHash } from './WeaponComponentHash';
import { WeaponHash } from '../hashes';
import { ComponentAttachmentPoint } from './ComponentAttachmentPoint';
import { Game } from '../Game';

export class InvalidWeaponComponent extends WeaponComponent{
  constructor() {
    super(null, null, WeaponComponentHash.Invalid);
  }

  public get Active(): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set Active(value: boolean) {
  }

  public get DisplayName(): string {
    return 'WCT_INVALID';
  }

  public get LocalizedName(): string {
    return Game.getGXTEntry(this.DisplayName);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getAttachmentPoint(hash: WeaponHash, componentHash: WeaponComponentHash): ComponentAttachmentPoint{
    return ComponentAttachmentPoint.Invalid;
  }
}
