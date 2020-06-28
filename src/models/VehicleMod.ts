import { Vehicle } from './Vehicle';
import { VehicleModType } from '../enums';

export class VehicleMod {
  private _owner: Vehicle;
  private _modType: VehicleModType;

  constructor(owner: Vehicle, modType: VehicleModType) {
    this._owner = owner;
    this.ModType = modType;
  }

  public get ModType(): VehicleModType {
    return this._modType;
  }

  public set ModType(modType: VehicleModType) {
    this._modType = modType;
  }

  public get Index(): number {
    return GetVehicleMod(this._owner.Handle, this.ModType);
  }

  public set Index(value: number) {
    SetVehicleMod(this._owner.Handle, this.ModType, value, this.Variation);
  }

  public get Variation(): boolean {
    return !!GetVehicleModVariation(this._owner.Handle, this.ModType);
  }

  public set Variation(value: boolean) {
    SetVehicleMod(this._owner.Handle, this.ModType, this.Index, value);
  }

  public get ModCount(): number {
    return GetNumVehicleMods(this._owner.Handle, this.ModType);
  }

  public get Vehicle(): Vehicle {
    return this._owner;
  }

  public remove(): void {
    RemoveVehicleMod(this._owner.Handle, this.ModType);
  }
}
