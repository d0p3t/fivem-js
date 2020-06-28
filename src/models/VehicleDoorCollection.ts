import { Vehicle } from './Vehicle';
import { VehicleDoorIndex } from '../enums';
import { VehicleDoor } from './VehicleDoor';

export class VehicleDoorCollection {
  private _owner: Vehicle;
  private readonly _vehicleDoors: Map<VehicleDoorIndex, VehicleDoor> = new Map<VehicleDoorIndex, VehicleDoor>();

  constructor(owner: Vehicle) {
    this._owner = owner;
  }

  public getDoors(index: VehicleDoorIndex): VehicleDoor {
    if (!this._vehicleDoors.has(index)) {
      this._vehicleDoors.set(index, new VehicleDoor(this._owner, index));
    }
    return this._vehicleDoors.get(index);
  }

  public getAllDoors(): VehicleDoor[] {
    return Object.keys(VehicleDoorIndex)
      .filter(key => !isNaN(Number(key)))
      .map(key => {
        const index = Number(key);
        if (this.hasDoor(index)) {
          return this.getDoors(index);
        }
        return null;
      })
      .filter(d => d);
  }

  public openAllDoors(loose?: boolean, instantly?: boolean): void {
    this.getAllDoors().forEach(door => {
      door.open(loose, instantly);
    });
  }

  public closeAllDoors(instantly?: boolean): void {
    this.getAllDoors().forEach(door => {
      door.close(instantly);
    });
  }

  public breakAllDoors(stayInTheWorld?: boolean): void {
    this.getAllDoors().forEach(door => {
      door.break(stayInTheWorld);
    });
  }

  public hasDoor(index: VehicleDoorIndex): boolean {
    switch (index) {
      case VehicleDoorIndex.FrontLeftDoor:
        return this._owner.Bones.hasBone('door_dside_f');
      case VehicleDoorIndex.FrontRightDoor:
        return this._owner.Bones.hasBone('door_pside_f');
      case VehicleDoorIndex.BackLeftDoor:
        return this._owner.Bones.hasBone('door_dside_r');
      case VehicleDoorIndex.BackRightDoor:
        return this._owner.Bones.hasBone('door_pside_r');
      case VehicleDoorIndex.Hood:
        return this._owner.Bones.hasBone('bonnet');
      case VehicleDoorIndex.Trunk:
        return this._owner.Bones.hasBone('boot');
    }
    return false;
  }
}
