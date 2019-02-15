import * as Math from '../utils/Math';

export class Entity {
  protected handle: number;
  constructor(handle: number) {
    this.handle = handle;
  }

  public get Handle(): number {
    return this.handle;
  }
  public get Health(): number {
    return GetEntityHealth(this.handle);
  }

  public set Health(amount: number) {
    SetEntityHealth(this.handle, amount);
  }

  public IsDead(): boolean {
    return IsEntityDead(this.handle) ? true : false;
  }

  public IsAlive(): boolean {
    return !this.IsDead();
  }

  public get Position(): Math.Vector3 {
    const coords = GetEntityCoords(this.handle, false);
    return new Math.Vector3(coords[0], coords[1], coords[2]);
  }

  public set Position(position: Math.Vector3) {
    SetEntityCoords(this.handle, position.x, position.y, position.z, false, false, false, true);
  }

  public set PositionNoOffset(position: Math.Vector3) {
    SetEntityCoordsNoOffset(this.handle, position.x, position.y, position.z, true, true, true);
  }

  public get Heading(): number {
    return GetEntityHeading(this.handle);
  }

  public set Heading(heading: number) {
    SetEntityHeading(this.handle, heading);
  }

  // and so on
  public Exists(): boolean {
    return DoesEntityExist(this.handle) ? true : false;
  }
}
