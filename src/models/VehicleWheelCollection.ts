import { Vehicle } from './Vehicle';
import { VehicleWheel } from './VehicleWheel';
import { VehicleWheelIndex } from '../enums';

export class VehicleWheelCollection {
  private _owner: Vehicle;
  private readonly _vehicleWheels: Map<number, VehicleWheel> = new Map<number, VehicleWheel>();

  constructor(owner: Vehicle) {
    this._owner = owner;
  }

  public getWheel(index: VehicleWheelIndex): VehicleWheel {
    if (!this._vehicleWheels.has(index)) {
      this._vehicleWheels.set(index, new VehicleWheel(this._owner, index));
    }
    return this._vehicleWheels.get(index);
  }

  public getAllWheels(): VehicleWheel[] {
    return Object.keys(VehicleWheelIndex)
      .filter(key => !isNaN(Number(key)))
      .map(key => {
        const index = Number(key);
        if (this.hasWheel(index)) {
          return this.getWheel(index);
        }
        return null;
      })
      .filter(w => w);
  }

  public burstAllWheels(): void {
    this.getAllWheels().forEach(wheel => {
      wheel.burst();
    });
  }

  public fixAllWheels(): void {
    this.getAllWheels().forEach(wheel => {
      wheel.fix();
    });
  }

  public hasWheel(wheel: VehicleWheelIndex): boolean {
    switch (wheel) {
      case VehicleWheelIndex.FrontLeftWheel:
        return this._owner.Bones.hasBone('wheel_lf');
      case VehicleWheelIndex.FrontRightWheel:
        return this._owner.Bones.hasBone('wheel_rf');
      case VehicleWheelIndex.MidLeftWheel:
        return this._owner.Bones.hasBone('wheel_lm');
      case VehicleWheelIndex.MidRightWheel:
        return this._owner.Bones.hasBone('wheel_rm');
      case VehicleWheelIndex.RearLeftWheel:
        return this._owner.Bones.hasBone('wheel_lr');
      case VehicleWheelIndex.RearRightWheel:
        return this._owner.Bones.hasBone('wheel_rr');
      default:
        return false;
    }
  }
}
