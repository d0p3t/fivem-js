import { Entity } from './Entity';

export class Vehicle extends Entity {
  public static Exists(vehicle: Vehicle): boolean {
    return typeof vehicle !== 'undefined' && vehicle.Exists();
  }

  constructor(handle: number) {
    super(handle);
  }

  public Exists(): boolean {
    return super.Exists() && GetEntityType(this.handle) === 2;
  }
}
