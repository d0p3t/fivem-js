import { Entity } from './';
import { Game } from '../Game';
import { Model } from '../Model';
import { VehicleClass, RadioStation } from '../enums';

export class Vehicle extends Entity {
  public static exists(vehicle: Vehicle): boolean {
    return typeof vehicle !== 'undefined' && vehicle.exists();
  }

  protected class: VehicleClass;

  constructor(handle: number) {
    super(handle);

    this.class = GetVehicleClass(handle);
  }

  public exists(): boolean {
    return super.exists() && GetEntityType(this.handle) === 2;
  }

  /**
   * Gets this vehicle's class
   */
  public get Class(): VehicleClass {
    return this.class;
  }

  /**
   * Gets the localized display name of this Vehicle.
   */
  public localizedDisplayName(): string {
    const displayName: string = this.getDisplayName;
    return Game.getGXTEntry(displayName);
  }

  /**
   * Gets the localized name of the current Vehicle's class.
   */
  public localizedClassName(): string {
    const className: string = this.getClassDisplayName;
    return Game.getGXTEntry(className);
  }

  public set BodyHealth(value: number) {
    SetVehicleBodyHealth(this.handle, value);
  }

  public get BodyHealth(): number {
    return GetVehicleBodyHealth(this.handle);
  }

  public set EngineHealth(value: number) {
    SetVehicleEngineHealth(this.handle, value);
  }

  public get EngineHealth(): number {
    return GetVehicleEngineHealth(this.handle);
  }

  public set PetrolTankHealth(value: number) {
    SetVehiclePetrolTankHealth(this.handle, value);
  }

  public get PetrolTankHealth(): number {
    return GetVehiclePetrolTankHealth(this.handle);
  }

  public set FuelLevel(value: number) {
    SetVehicleFuelLevel(this.handle, value);
  }

  public get FuelLevel(): number {
    return GetVehicleFuelLevel(this.handle);
  }

  public set OilLevel(value: number) {
    SetVehicleOilLevel(this.handle, value);
  }

  public get OilLevel(): number {
    return GetVehicleOilLevel(this.handle);
  }

  public set Gravity(value: number) {
    SetVehicleGravityAmount(this.handle, value);
  }

  public get Gravity(): number {
    return GetVehicleGravityAmount(this.handle);
  }

  public set IsEngineRunning(state: boolean) {
    SetVehicleEngineOn(this.handle, state, true, true);
  }

  public get IsEngineRunning(): boolean {
    return !!GetIsVehicleEngineRunning(this.handle);
  }

  public set IsEngineStarting(state: boolean) {
    if ((this.IsEngineStarting || this.IsEngineRunning) && state) {
      return;
    }
    SetVehicleEngineOn(this.handle, state, !state, true);
  }

  public get IsEngineStarting(): boolean {
    return !!IsVehicleEngineStarting(this.handle);
  }

  public set RadioStation(value: RadioStation) {
    SetVehicleRadioEnabled(this.handle, true);
    SetVehRadioStation(this.handle, value);
  }

  public set Speed(value: number) {
    const entity: Entity = new Entity(this.handle);
    const model: Model = new Model(entity.Handle);
    if (model.IsTrain) {
      SetTrainSpeed(this.handle, value);
      SetTrainCruiseSpeed(this.handle, value);
    } else {
      SetVehicleForwardSpeed(this.handle, value);
    }
  }

  public get Speed(): number {
    return GetEntitySpeed(this.handle);
  }

  public get WheelSpeed(): number {
    return GetVehicleDashboardSpeed(this.handle);
  }

  public get Acceleration(): number {
    return GetVehicleCurrentAcceleration(this.handle);
  }

  public set CurrentRPM(value: number) {
    SetVehicleCurrentRpm(this.handle, value);
  }

  public get CurrentRPM(): number {
    return GetVehicleCurrentRpm(this.handle);
  }

  public set HighGear(value: number) {
    SetVehicleHighGear(this.handle, value);
  }

  public get HighGear(): number {
    return GetVehicleHighGear(this.handle);
  }

  public get CurrentGear(): number {
    return GetVehicleCurrentGear(this.handle);
  }

  public set SteeringAngle(value: number) {
    SetVehicleSteeringAngle(this.handle, value);
  }

  public get SteeringAngle(): number {
    return GetVehicleSteeringAngle(this.handle);
  }

  public set SteeringScale(value: number) {
    SetVehicleSteeringScale(this.handle, value);
  }

  public get SteeringScale(): number {
    return GetVehicleSteeringScale(this.handle);
  }

  public set IsAlarmActive(state: boolean) {
    SetVehicleAlarm(this.handle, state);
  }

  public get IsAlarmActive(): boolean {
    return !!IsVehicleAlarmSet(this.handle);
  }

  public get IsAlarmSounding(): boolean {
    return !!IsVehicleAlarmActivated(this.handle);
  }

  public set AlarmTimeLeft(value: number) {
    SetVehicleAlarmTimeLeft(this.handle, value);
  } 

  public get AlarmTimeLeft(): number {
    return GetVehicleAlarmTimeLeft(this.handle);
  }

  public StartAlarm(): void {
    StartVehicleAlarm(this.handle);
  }

  public set IsSirenActive(state: boolean) {
    SetVehicleSiren(this.handle, false);
  }

  public get IsSirenActive(): boolean {
    return !!IsVehicleSirenOn(this.handle);
  }

  public set IsSirenSilent(value: boolean) {
    DisableVehicleImpactExplosionActivation(this.handle, value);
  }

  /**
   * Sounds the vehicle horn.
   *
   * @param duration How long should the horn be sounded?
   */
  public SoundHorn(duration: number) {
    StartVehicleHorn(this.handle, duration, Game.generateHash('HELDDOWN'), false);
  }

  public set IsWanted(value: boolean) {
    SetVehicleIsWanted(this.handle, value);
  }

  public get IsWanted(): boolean {
    return !!IsVehicleWanted(this.handle);
  }

  public set ProvidesCover(value: boolean) {
    SetVehicleProvidesCover(this.handle, value);
  }

  public set DropsMoneyOnExplosion(state: boolean) {
    SetVehicleCreatesMoneyPickupsWhenExploded(this.handle, state);
  }

  public set PreviouslyOwnedByPlayer(state: boolean) {
    SetVehicleHasBeenOwnedByPlayer(this.handle, state);
  }

  public get PreviouslyOwnedByPlayer(): boolean {
    return !!IsVehiclePreviouslyOwnedByPlayer(this.handle);
  }

  public set NeedsToBeHotwired(state: boolean) {
    SetVehicleNeedsToBeHotwired(this.handle, state);
  }

  public get NeedsToBeHotwired(): boolean {
    return !!IsVehicleNeedsToBeHotwired(this.handle);
  }

  public set AreLightsOn(state: boolean) {
    SetVehicleLights(this.handle, state ? 3 : 4);
  }

  public get AreLightsOn(): boolean {
    return !!GetVehicleLightsState(this.handle)[0];
  }

  public set AreHighBeamsOn(state: boolean) {
    SetVehicleFullbeam(this.handle, state);
  }

  public get AreHighBeamsOn(): boolean {
    return !!GetVehicleLightsState(this.handle)[1];
  }

  public set IsInteriorLightOn(state: boolean) {
    SetVehicleInteriorlight(this.handle, state);
  }

  public get IsInteriorLightOn(): boolean {
    return !!IsVehicleInteriorLightOn(this.handle);
  }

  public set IsSearchLightOn(state: boolean) {
    SetVehicleSearchlight(this.handle, state, false);
  }

  public get IsSearchLightOn(): boolean {
    return !!IsVehicleSearchlightOn(this.handle);
  }

  public set IsTaxiLightOn(state: boolean) {
    SetTaxiLights(this.handle, state);
  }

  public get IsTaxiLightOn(): boolean {
    return !!IsTaxiLightOn(this.handle);
  }

  public set IsLeftIndicatorLightOn(state: boolean) {
    SetVehicleIndicatorLights(this.handle, 1, state);
  }

  public get IsLeftIndicatorLightOn(): boolean {
    const val: number = GetVehicleIndicatorLights(this.handle);
    return val === 1 || val === 3;
  }

  public set IsRightIndicatorLightOn(state: boolean) {
    SetVehicleIndicatorLights(this.handle, 0, state);
  }

  public get IsRightIndicatorLightOn(): boolean {
    const val: number = GetVehicleIndicatorLights(this.handle);
    return val >= 2;
  }

  public set IsHandbrakeForcedOn(state: boolean) {
    SetVehicleHandbrake(this.handle, state);
  }

  public get IsHandbrakeForcedOn(): boolean {
    return !!GetVehicleHandbrake(this.handle);
  }

  private get getDisplayName(): string {
    const entity: Entity = new Entity(this.handle);
    return GetDisplayNameFromVehicleModel(entity.Model) ?? 'CARNOTFOUND';
  }

  private get getClassDisplayName(): string {
    return `VEH_CLASS_${this.class}`;
  }
}
