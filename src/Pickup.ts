import { Vector3 } from './utils';

export class Pickup {
  private handle: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  public get Position(): Vector3 {
    const coords = GetPickupCoords(this.handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  public get IsCollected(): boolean {
    return !!HasPickupBeenCollected(this.handle);
  }

  public delete(): void {
    RemovePickup(this.handle);
  }

  public exists(): boolean {
    return !!DoesPickupExist(this.handle);
  }
}
