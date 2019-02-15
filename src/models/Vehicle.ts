import { Entity } from './Entity';

export class Vehicle extends Entity {
  constructor(handle: number) {
    super(handle);
  }

  public Exists(): boolean {
    return super.Exists() && GetEntityType(this.handle) === 2;
  }
}
