import { Vehicle } from './Vehicle';
import { VehicleWindowIndex } from '../enums';

export class VehicleWindow {
  private _owner: Vehicle;
  private _index: VehicleWindowIndex;

  constructor(owner: Vehicle, index: VehicleWindowIndex) {
    this._owner = owner;
    this._index = index;
  }

  public get Index(): VehicleWindowIndex {
    return this._index;
  }

  public set Index(index: VehicleWindowIndex) {
    this._index = index;
  }

  public get IsIntact(): boolean {
    return !!IsVehicleWindowIntact(this._owner.Handle, this.Index);
  }

  public get Vehicle(): Vehicle {
    return this._owner;
  }

  public repair(): void {
    FixVehicleWindow(this._owner.Handle, this.Index);
  }

  public smash(): void {
    SmashVehicleWindow(this._owner.Handle, this.Index);
  }

  public rollUp(): void {
    RollUpWindow(this._owner.Handle, this.Index);
  }

  public rollDown(): void {
    RollDownWindow(this._owner.Handle, this.Index);
  }

  public remove(): void {
    RemoveVehicleWindow(this._owner.Handle, this.Index);
  }
}
