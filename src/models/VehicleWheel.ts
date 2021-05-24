import { Vehicle } from './Vehicle';

export class VehicleWheel {
  private _owner: Vehicle;
  private _index: number;

  constructor(owner: Vehicle, index: number) {
    this._owner = owner;
    this._index = index;
  }

  public get Index(): number {
    return this._index;
  }

  public set Index(index: number) {
    this._index = index;
  }

  public get Vehicle(): Vehicle {
    return this._owner;
  }

  public burst(): void {
    SetVehicleTyreBurst(this._owner.Handle, this.Index, true, 1000);
  }

  public fix(): void {
    SetVehicleTyreFixed(this._owner.Handle, this.Index);
  }
}
