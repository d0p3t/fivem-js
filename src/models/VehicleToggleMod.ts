import { Vehicle } from './Vehicle';
import { VehicleToggleModType } from '../enums';

export class VehicleToggleMod {
  private _owner: Vehicle;
  private _modType: VehicleToggleModType;

  constructor(owner: Vehicle, modType: VehicleToggleModType) {
    this._owner = owner;
    this.ModType = modType;
  }

  public get ModType(): VehicleToggleModType {
    return this._modType;
  }

  public set ModType(modType: VehicleToggleModType) {
    this._modType = modType;
  }

  public get IsInstalled(): boolean {
    return !!IsToggleModOn(this._owner.Handle, this.ModType);
  }

  public set IsInstalled(value: boolean) {
    ToggleVehicleMod(this._owner.Handle, this.ModType, value);
  }

  public get LocalizedModTypeName(): string {
    return GetModSlotName(this._owner.Handle, this.ModType);
  }

  public get Vehicle(): Vehicle {
    return this._owner;
  }

  public remove(): void {
    RemoveVehicleMod(this._owner.Handle, this.ModType);
  }
}
