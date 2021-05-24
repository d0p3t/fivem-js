import { WeaponComponent } from './WeaponComponent';
import { WeaponComponentHash } from './WeaponComponentHash';
import { WeaponHash } from '../hashes';
import { ComponentAttachmentPoint } from './ComponentAttachmentPoint';
import { Game } from '../Game';

export class InvalidWeaponComponent extends WeaponComponent {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    super(null!, null!, WeaponComponentHash.Invalid);
  }

  public get Active(): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set Active(value: boolean) {}

  public get DisplayName(): string {
    return 'WCT_INVALID';
  }

  public get LocalizedName(): string {
    return Game.getGXTEntry(this.DisplayName);
  }

  public static getAttachmentPoint(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hash: WeaponHash,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentHash: WeaponComponentHash,
  ): ComponentAttachmentPoint {
    return ComponentAttachmentPoint.Invalid;
  }
}
