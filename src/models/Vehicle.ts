import { Entity } from './';

export class Vehicle extends Entity {
  public static exists(vehicle: Vehicle): boolean {
    return typeof vehicle !== 'undefined' && vehicle.exists();
  }

  constructor(handle: number) {
    super(handle);
  }

  public exists(): boolean {
    return super.exists() && GetEntityType(this.handle) === 2;
  }
}
