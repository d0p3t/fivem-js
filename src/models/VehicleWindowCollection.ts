import { Vehicle } from './Vehicle';
import { VehicleWindowIndex } from '../enums';
import { VehicleWindow } from './VehicleWindow';

export class VehicleWindowCollection {
  private _owner: Vehicle;
  private readonly _vehicleWindows: Map<VehicleWindowIndex, VehicleWindow> = new Map<
    VehicleWindowIndex,
    VehicleWindow
  >();

  constructor(owner) {
    this._owner = owner;
  }

  public getWindow(index: VehicleWindowIndex): VehicleWindow {
    if (!this._vehicleWindows.has(index)) {
      this._vehicleWindows.set(index, new VehicleWindow(this._owner, index));
    }
    return this._vehicleWindows.get(index);
  }

  public getAllWindows(): VehicleWindow[] {
    return Object.keys(VehicleWindowIndex)
      .filter(key => !isNaN(Number(key)))
      .map(key => {
        const index = Number(key);
        if (this.hasWindow(index)) {
          return this.getWindow(index);
        }
        return null;
      })
      .filter(w => w);
  }

  public get AreAllWindowsIntact(): boolean {
    return !!AreAllVehicleWindowsIntact(this._owner.Handle);
  }

  public rollDownAllWindows(): void {
    this.getAllWindows().forEach(window => {
      window.rollDown();
    });
  }

  public rollUpAllWindows(): void {
    this.getAllWindows().forEach(window => {
      window.rollUp();
    });
  }

  public hasWindow(window: VehicleWindowIndex): boolean {
    switch (window) {
      case VehicleWindowIndex.FrontLeftWindow:
        return this._owner.Bones.hasBone('window_lf');
      case VehicleWindowIndex.FrontRightWindow:
        return this._owner.Bones.hasBone('window_rf');
      case VehicleWindowIndex.BackLeftWindow:
        return this._owner.Bones.hasBone('window_lr');
      case VehicleWindowIndex.BackRightWindow:
        return this._owner.Bones.hasBone('window_rr');
      default:
        return false;
    }
  }
}
