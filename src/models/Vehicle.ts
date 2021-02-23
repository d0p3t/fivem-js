import {
  Entity,
  Ped,
  VehicleDoorCollection,
  VehicleModCollection,
  VehicleWheelCollection,
  VehicleWindowCollection,
} from './';
import {
  RadioStation,
  VehicleClass,
  VehicleLandingGearState,
  VehicleLockStatus,
  VehicleRoofState,
  VehicleSeat,
} from '../enums';
import { Model } from '../Model';
import { Game } from '../Game';
import { Vector3 } from '../utils';

export class Vehicle extends Entity {
  public static getModelDisplayName(vehicleModel: Model): string {
    return GetDisplayNameFromVehicleModel(vehicleModel.Hash);
  }

  public static getModelClass(vehicleModel: Model): VehicleClass {
    return GetVehicleClassFromName(vehicleModel.Hash);
  }

  public static getClassDisplayName(vehicleClass: VehicleClass): string {
    return `VEH_CLASS_${vehicleClass}`;
  }

  public static exists(vehicle: Vehicle): boolean {
    return typeof vehicle !== 'undefined' && vehicle.exists();
  }

  private _doors: VehicleDoorCollection;
  private _mods: VehicleModCollection;
  private _wheels: VehicleWheelCollection;
  private _windows: VehicleWindowCollection;

  constructor(handle: number) {
    super(handle);
  }

  public exists(): boolean {
    return super.exists() && GetEntityType(this.handle) === 2;
  }

  public get DisplayName(): string {
    return Vehicle.getModelDisplayName(this.Model);
  }

  public get ClassDisplayName(): string {
    return Vehicle.getClassDisplayName(this.ClassType);
  }

  public get NumberPlate(): string {
    return GetVehicleNumberPlateText(this.handle);
  }

  public set NumberPlate(value: string) {
    SetVehicleNumberPlateText(this.handle, value.substring(0, 8));
  }

  public get ClassType(): VehicleClass {
    return GetVehicleClass(this.handle);
  }

  public get BodyHealth(): number {
    return GetVehicleBodyHealth(this.handle);
  }

  public set BodyHealth(value: number) {
    SetVehicleBodyHealth(this.handle, value);
  }

  public get EngineHealth(): number {
    return GetVehicleEngineHealth(this.handle);
  }

  public set EngineHealth(value: number) {
    SetVehicleEngineHealth(this.handle, value);
  }

  public get PetrolTankHealth(): number {
    return GetVehiclePetrolTankHealth(this.handle);
  }

  public set PetrolTankHealth(value: number) {
    SetVehiclePetrolTankHealth(this.handle, value);
  }

  public get FuelLevel(): number {
    return GetVehicleFuelLevel(this.handle);
  }

  public set FuelLevel(value: number) {
    SetVehicleFuelLevel(this.handle, value);
  }

  public get OilLevel(): number {
    return GetVehicleOilLevel(this.handle);
  }

  public set OilLevel(value: number) {
    SetVehicleOilLevel(this.handle, value);
  }

  public get Gravity(): number {
    return GetVehicleGravityAmount(this.handle);
  }

  public set Gravity(value: number) {
    SetVehicleGravityAmount(this.handle, value);
  }

  public get IsEngineRunning(): boolean {
    return !!GetIsVehicleEngineRunning(this.handle);
  }

  public set IsEngineRunning(value: boolean) {
    SetVehicleEngineOn(this.handle, value, true, true);
  }

  public get IsEngineStarting(): boolean {
    return !!IsVehicleEngineStarting(this.handle);
  }

  public set IsEngineStarting(value: boolean) {
    if ((this.IsEngineStarting || this.IsEngineRunning) && value) {
      return;
    }
    SetVehicleEngineOn(this.handle, value, !value, true);
  }

  public get IsRadioEnabled(): boolean {
    if (Game.Player.Character.isInVehicle(this)) {
      return !!IsPlayerVehicleRadioEnabled();
    }
    return false;
  }

  public set IsRadioEnabled(value: boolean) {
    SetVehicleRadioEnabled(this.handle, value);
  }

  public set RadioStation(value: RadioStation) {
    this.IsRadioEnabled = true;
    SetVehRadioStation(this.handle, value);
  }

  public get Speed(): number {
    return GetEntitySpeed(this.handle);
  }

  public set Speed(value: number) {
    if (this.Model.IsTrain) {
      SetTrainSpeed(this.handle, value);
      SetTrainCruiseSpeed(this.handle, value);
    } else {
      SetVehicleForwardSpeed(this.handle, value);
    }
  }

  public get WheelSpeed(): number {
    return GetVehicleDashboardSpeed(this.handle);
  }

  public get Acceleration(): number {
    return GetVehicleCurrentAcceleration(this.handle);
  }

  public get CurrentRPM(): number {
    return GetVehicleCurrentRpm(this.handle);
  }

  public set CurrentRPM(value: number) {
    SetVehicleCurrentRpm(this.handle, value);
  }

  public get HighGear(): number {
    return GetVehicleHighGear(this.handle);
  }

  public set HighGear(value: number) {
    SetVehicleHighGear(this.handle, value);
  }

  public get CurrentGear(): number {
    return GetVehicleCurrentGear(this.handle);
  }

  public get SteeringAngle(): number {
    return GetVehicleSteeringAngle(this.handle);
  }

  public set SteeringAngle(value: number) {
    SetVehicleSteeringAngle(this.handle, value);
  }

  public get SteeringScale(): number {
    return GetVehicleSteeringScale(this.handle);
  }

  public set SteeringScale(value: number) {
    SetVehicleSteeringScale(this.handle, value);
  }

  public get IsAlarmSet(): boolean {
    return !!IsVehicleAlarmSet(this.handle);
  }

  public set IsAlarmSet(value: boolean) {
    SetVehicleAlarm(this.handle, value);
  }

  public get IsAlarmSounding(): boolean {
    return !!IsVehicleAlarmActivated(this.handle);
  }

  public get AlarmTimeLeft(): number {
    return GetVehicleAlarmTimeLeft(this.handle);
  }

  public set AlarmTimeLeft(value: number) {
    SetVehicleAlarmTimeLeft(this.handle, value);
  }

  public startAlarm(): void {
    StartVehicleAlarm(this.handle);
  }

  public get IsSirenActive(): boolean {
    return !!IsVehicleSirenOn(this.handle);
  }

  public set IsSirenActive(value: boolean) {
    SetVehicleSiren(this.handle, value);
  }

  public set IsSirenSilent(value: boolean) {
    DisableVehicleImpactExplosionActivation(this.handle, value);
  }

  public soundHorn(duration: number): void {
    StartVehicleHorn(this.handle, duration, Game.generateHash('HELDDOWN'), false);
  }

  public get IsWanted(): boolean {
    return !!IsVehicleWanted(this.handle);
  }

  public set IsWanted(value: boolean) {
    SetVehicleIsWanted(this.handle, value);
  }

  public set ProvidesCover(value: boolean) {
    SetVehicleProvidesCover(this.handle, value);
  }

  public set DropsMoneyOnExplosion(value: boolean) {
    SetVehicleCreatesMoneyPickupsWhenExploded(this.handle, value);
  }

  public get PreviouslyOwnedByPlayer(): boolean {
    return !!IsVehiclePreviouslyOwnedByPlayer(this.handle);
  }

  public set PreviouslyOwnedByPlayer(value: boolean) {
    SetVehicleHasBeenOwnedByPlayer(this.handle, value);
  }

  public get NeedsToBeHotwired(): boolean {
    return !!IsVehicleNeedsToBeHotwired(this.handle);
  }

  public set NeedsToBeHotwired(value: boolean) {
    SetVehicleNeedsToBeHotwired(this.handle, value);
  }

  public get AreLightsOn(): boolean {
    return !!GetVehicleLightsState(this.handle)[0];
  }

  public set AreLightsOn(value: boolean) {
    SetVehicleLights(this.handle, value ? 3 : 4);
  }

  public get AreHighBeamsOn(): boolean {
    return !!GetVehicleLightsState(this.handle)[1];
  }

  public set AreHighBeamsOn(value: boolean) {
    SetVehicleFullbeam(this.handle, value);
  }

  public get IsInteriorLightOn(): boolean {
    return !!IsVehicleInteriorLightOn(this.handle);
  }

  public set IsInteriorLightOn(value: boolean) {
    SetVehicleInteriorlight(this.handle, value);
  }

  public get IsSearchLightOn(): boolean {
    return !!IsVehicleSearchlightOn(this.handle);
  }

  public set IsSearchLightOn(value: boolean) {
    SetVehicleSearchlight(this.handle, value, false);
  }

  public get IsTaxiLightOn(): boolean {
    return !!IsTaxiLightOn(this.handle);
  }

  public set IsTaxiLightOn(value: boolean) {
    SetTaxiLights(this.handle, value);
  }

  public get IsLeftIndicatorLightOn(): boolean {
    const val = GetVehicleIndicatorLights(this.handle);
    return val === 1 || val === 3;
  }

  public set IsLeftIndicatorLightOn(value: boolean) {
    SetVehicleIndicatorLights(this.handle, 1, value);
  }

  public get IsRightIndicatorLightOn(): boolean {
    return GetVehicleIndicatorLights(this.handle) >= 2;
  }

  public set IsRightIndicatorLightOn(value: boolean) {
    SetVehicleIndicatorLights(this.handle, 0, value);
  }

  public get IsHandbrakeForcedOn(): boolean {
    return !!GetVehicleHandbrake(this.handle);
  }

  public set IsHandbrakeForcedOn(value: boolean) {
    SetVehicleHandbrake(this.handle, value);
  }

  public set AreBrakeLightsOn(value: boolean) {
    SetVehicleBrakeLights(this.handle, value);
  }

  public set LightsMultiplier(value: number) {
    SetVehicleLightMultiplier(this.handle, value);
  }

  public set CanBeVisiblyDamaged(value: boolean) {
    SetVehicleCanBeVisiblyDamaged(this.handle, value);
  }

  public set Strong(toggle: boolean) {
    SetVehicleStrong(this.handle, toggle);
  }

  public set CanBreak(toggle: boolean) {
    SetVehicleCanBreak(this.handle, toggle);
  }

  public get IsDamaged(): boolean {
    return !!IsVehicleDamaged(this.handle);
  }

  public get IsDriveable(): boolean {
    return !!IsVehicleDriveable(this.handle, false);
  }

  public set IsDriveable(value: boolean) {
    SetVehicleUndriveable(this.handle, !value);
  }

  public get IsEngineOnFire(): boolean {
    return !!IsVehicleEngineOnFire(this.handle);
  }

  public get HasRoof(): boolean {
    return !!DoesVehicleHaveRoof(this.handle);
  }

  public get IsLeftHeadLightBroken(): boolean {
    return !!GetIsLeftVehicleHeadlightDamaged(this.handle);
  }

  public get IsRightHeadLightBroken(): boolean {
    return !!GetIsRightVehicleHeadlightDamaged(this.handle);
  }

  public get IsRearBumperBrokenOff(): boolean {
    return !!IsVehicleBumperBrokenOff(this.handle, false);
  }

  public get IsFrontBumperBrokenOff(): boolean {
    return !!IsVehicleBumperBrokenOff(this.handle, true);
  }

  public set IsAxlesStrong(value: boolean) {
    SetVehicleHasStrongAxles(this.handle, value);
  }

  public set CanEngineDegrade(value: boolean) {
    SetVehicleEngineCanDegrade(this.handle, value);
  }

  public set EnginePowerMultiplier(value: number) {
    SetVehicleEnginePowerMultiplier(this.handle, value);
  }

  public set EngineTorqueMultiplier(value: number) {
    SetVehicleEngineTorqueMultiplier(this.handle, value);
  }

  public get LandingGearState(): VehicleLandingGearState {
    return GetLandingGearState(this.handle);
  }

  public set LandingGearState(value: VehicleLandingGearState) {
    SetVehicleLandingGear(this.handle, value);
  }

  public get RoofState(): VehicleRoofState {
    return GetConvertibleRoofState(this.handle);
  }

  public set RoofState(value: VehicleRoofState) {
    switch (value) {
      case VehicleRoofState.Closed:
        RaiseConvertibleRoof(this.handle, true);
        RaiseConvertibleRoof(this.handle, false);
        break;
      case VehicleRoofState.Closing:
        RaiseConvertibleRoof(this.handle, false);
        break;
      case VehicleRoofState.Opened:
        LowerConvertibleRoof(this.handle, true);
        LowerConvertibleRoof(this.handle, false);
        break;
      case VehicleRoofState.Opening:
        LowerConvertibleRoof(this.handle, false);
        break;
    }
  }

  public get LockStatus(): VehicleLockStatus {
    return GetVehicleDoorLockStatus(this.handle);
  }

  public set LockStatus(value: VehicleLockStatus) {
    SetVehicleDoorsLocked(this.handle, value);
  }

  public get MaxBraking(): number {
    return GetVehicleMaxBraking(this.handle);
  }

  public get MaxTraction(): number {
    return GetVehicleMaxTraction(this.handle);
  }

  public get IsOnAllWheels(): boolean {
    return !!IsVehicleOnAllWheels(this.handle);
  }

  public get IsStopped(): boolean {
    return !!IsVehicleStopped(this.handle);
  }

  public get IsStoppedAtTrafficLights(): boolean {
    return !!IsVehicleStoppedAtTrafficLights(this.handle);
  }

  public get IsStolen(): boolean {
    return !!IsVehicleStolen(this.handle);
  }

  public set IsStolen(value: boolean) {
    SetVehicleIsStolen(this.handle, value);
  }

  public get IsConvertible(): boolean {
    return !!IsVehicleAConvertible(this.handle, false);
  }

  public set IsBurnoutForced(value: boolean) {
    SetVehicleBurnout(this.handle, value);
  }

  public get IsInBurnout(): boolean {
    return !!IsVehicleInBurnout(this.handle);
  }

  public get Driver(): Ped {
    return this.getPedOnSeat(VehicleSeat.Driver);
  }

  public get Occupants(): Ped[] {
    const driver = this.Driver;

    if (!Ped.exists(driver)) {
      return this.Passengers;
    }

    return [driver, ...this.Passengers];
  }

  public get Passengers(): Ped[] {
    const passengerCount = this.PassengerCount;
    if (passengerCount === 0) {
      return;
    }

    const result = [];

    for (let i = 0; i < this.PassengerCapacity; i++) {
      if (!this.isSeatFree(i)) {
        result.push(this.getPedOnSeat(i));
        if (result.length === passengerCount) {
          break;
        }
      }
    }

    return result;
  }

  public get Doors(): VehicleDoorCollection {
    if (!this._doors) {
      this._doors = new VehicleDoorCollection(this);
    }
    return this._doors;
  }

  public get Mods(): VehicleModCollection {
    if (!this._mods) {
      this._mods = new VehicleModCollection(this);
    }
    return this._mods;
  }

  public get Wheels(): VehicleWheelCollection {
    if (!this._wheels) {
      this._wheels = new VehicleWheelCollection(this);
    }
    return this._wheels;
  }

  public get Windows(): VehicleWindowCollection {
    if (!this._windows) {
      this._windows = new VehicleWindowCollection(this);
    }
    return this._windows;
  }

  public extraExists(extra: number): boolean {
    return !!DoesExtraExist(this.handle, extra);
  }

  public isExtraOn(extra: number): boolean {
    return this.extraExists(extra) ? !!IsVehicleExtraTurnedOn(this.handle, extra) : false;
  }

  public toggleExtra(extra: number, toggle: boolean): void {
    if (this.extraExists(extra)) {
      SetVehicleExtra(this.handle, extra, !toggle);
    }
  }

  public getPedOnSeat(seat: VehicleSeat): Ped {
    return new Ped(GetPedInVehicleSeat(this.handle, seat));
  }

  public isSeatFree(seat: VehicleSeat): boolean {
    return !!IsVehicleSeatFree(this.handle, seat);
  }

  public wash(): void {
    this.DirtLevel = 0;
  }

  public get DirtLevel(): number {
    return GetVehicleDirtLevel(this.handle);
  }

  public set DirtLevel(value: number) {
    SetVehicleDirtLevel(this.handle, value);
  }

  public placeOnGround(): void {
    SetVehicleOnGroundProperly(this.handle);
  }

  public repair(): void {
    SetVehicleFixed(this.handle);
  }

  public explode(): void {
    ExplodeVehicle(this.handle, true, false);
  }

  public explodeNetworked(): void {
    NetworkExplodeVehicle(this.handle, true, false, false);
  }

  public get CanTiresBurst(): boolean {
    return !!GetVehicleTyresCanBurst(this.handle);
  }

  public set CanTiresBurst(value: boolean) {
    SetVehicleTyresCanBurst(this.handle, value);
  }

  public set CanWheelsBreak(value: boolean) {
    SetVehicleWheelsCanBreak(this.handle, value);
  }

  public set CanDeformWheels(value: boolean) {
    SetVehicleCanDeformWheels(this.handle, value);
  }

  public get HasBombBay(): boolean {
    return this.Bones.hasBone('door_hatch_1') && this.Bones.hasBone('door_hatch_r');
  }

  public openBombBay(): void {
    if (this.HasBombBay) {
      OpenBombBayDoors(this.handle);
    }
  }

  public closeBombBay(): void {
    if (this.HasBombBay) {
      CloseBombBayDoors(this.handle);
    }
  }

  public setHeliYawPitchRollMult(mult: number): void {
    if (this.Model.IsHelicopter && mult >= 0 && mult <= 1) {
      SetHelicopterRollPitchYawMult(this.handle, mult);
    }
  }

  public set TowingCraneRaisedAmount(value: number) {
    SetTowTruckCraneHeight(this.handle, value);
  }

  public get TowedVehicle(): Vehicle {
    return new Vehicle(GetEntityAttachedToTowTruck(this.handle));
  }

  public towVehicle(vehicle: Vehicle, rear: boolean): void {
    AttachVehicleToTowTruck(this.handle, vehicle.Handle, rear, 0, 0, 0);
  }

  public detachFromTowTruck(): void {
    DetachVehicleFromAnyTowTruck(this.handle);
  }

  public detachTowedVehicle(): void {
    const vehicle = this.TowedVehicle;
    if (Vehicle.exists(this.TowedVehicle)) {
      DetachVehicleFromTowTruck(this.handle, vehicle.Handle);
    }
  }

  public deform(position: Vector3, damageAmount: number, radius: number): void {
    SetVehicleDamage(this.handle, position.x, position.y, position.z, damageAmount, radius, false);
  }

  public get PassengerCapacity(): number {
    return GetVehicleMaxNumberOfPassengers(this.handle);
  }

  public get PassengerCount(): number {
    return GetVehicleNumberOfPassengers(this.handle);
  }

  public set RespotTimer(time: number) {
    SetNetworkVehicleRespotTimer(this.NetworkId, time);
  }
}
