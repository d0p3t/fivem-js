import { Vehicle } from './Vehicle';
import { VehicleDoorIndex } from '../enums';

export class VehicleDoor {
  private _owner: Vehicle;
  private _index: VehicleDoorIndex;

  constructor(owner: Vehicle, index: VehicleDoorIndex) {
    this._owner = owner;
    this.Index = index;
  }

  public get Index(): VehicleDoorIndex {
    return this._index;
  }

  public set Index(index: VehicleDoorIndex) {
    this._index = index;
  }

  public get AngleRatio(): number {
    return GetVehicleDoorAngleRatio(this._owner.Handle, this.Index);
  }

  public set AngleRatio(value: number) {
    SetVehicleDoorControl(this._owner.Handle, this.Index, 1, value);
  }

  public set CanBeBroken(value: boolean) {
    SetVehicleDoorBreakable(this._owner.Handle, this.Index, value);
  }

  public get IsOpen(): boolean {
    return this.AngleRatio > 0;
  }

  public get IsFullyOpen(): boolean {
    return !!IsVehicleDoorFullyOpen(this._owner.Handle, this.Index);
  }

  public get IsBroken(): boolean {
    return !!IsVehicleDoorDamaged(this._owner.Handle, this.Index);
  }

  public get Vehicle(): Vehicle {
    return this._owner;
  }

  public open(loose = false, instantly = false): void {
    SetVehicleDoorOpen(this._owner.Handle, this.Index, loose, instantly);
  }

  public close(instantly = false): void {
    SetVehicleDoorShut(this._owner.Handle, this.Index, instantly);
  }

  public break(stayInTheWorld = true): void {
    SetVehicleDoorBroken(this._owner.Handle, this.Index, stayInTheWorld);
  }
}
