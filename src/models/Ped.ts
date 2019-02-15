import { Entity } from './Entity';
import { Vehicle } from './Vehicle';

export enum Gender {
  Male,
  Female,
}

export enum DrivingStyle {
  None = 0,
  Normal = 786603,
  IgnoreLights = 2883621,
  SometimesOvertakeTraffic = 5,
  Rushed = 1074528293,
  AvoidTraffic = 786468,
  AvoidTrafficExtremely = 6,
  AvoidHighwaysWhenPossible = 536870912,
  IgnorePathing = 16777216,
  IgnoreRoads = 4194304,
  ShortestPath = 262144,
  Backwards = 1024,
}

export enum VehicleDrivingFlags {
  None = 0,
  FollowTraffic = 1,
  YieldToPeds = 2,
  AvoidVehicles = 4,
  AvoidEmptyVehicles = 8,
  AvoidPeds = 16,
  AvoidObjects = 32,
  StopAtTrafficLights = 128,
  UseBlinkers = 256,
  AllowGoingWrongWay = 512,
  Reverse = 1024,
  AllowMedianCrossing = 262144,
  DriveBySight = 4194304,
  IgnorePathFinding = 16777216,
  TryToAvoidHighways = 536870912,
  StopAtDestination = 2147483648,
}

export enum HelmetType {
  RegularMotorcycleHelmet = 4096,
  FiremanHelmet = 16384,
  PilotHeadset = 32768,
}

export enum ParachuteLandingType {
  None = -1,
  Stumbling = 1,
  Rolling,
  Ragdoll,
}

export enum ParachuteState {
  None = -1,
  FreeFalling,
  Deploying,
  Gliding,
  LandingOrFallingToDoom,
}

export enum RagdollType {
  Normal = 0,
  StiffLegs = 1,
  NarrowLegs = 2,
  WideLegs = 3,
}

export enum SpeechModifier {
  Standard = 0,
  AllowRepeat = 1,
  Beat = 2,
  Force = 3,
  ForceFrontend = 4,
  ForceNoRepeatFrontend = 5,
  ForceNormal = 6,
  ForceNormalClear = 7,
  ForceNormalCritical = 8,
  ForceShouted = 9,
  ForceShoutedClear = 10,
  ForceShoutedCritical = 11,
  ForcePreloadOnly = 12,
  Megaphone = 13,
  Helicopter = 14,
  ForceMegaphone = 15,
  ForceHelicopter = 16,
  Interrupt = 17,
  InterruptShouted = 18,
  InterruptShoutedClear = 19,
  InterruptShoutedCritical = 20,
  InterruptNoForce = 21,
  InterruptFrontend = 22,
  InterruptNoForceFrontend = 23,
  AddBlip = 24,
  AddBlipAllowRepeat = 25,
  AddBlipForce = 26,
  AddBlipShouted = 27,
  AddBlipShoutedForce = 28,
  AddBlipInterrupt = 29,
  AddBlipInterruptForce = 30,
  ForcePreloadOnlyShouted = 31,
  ForcePreloadOnlyShoutedClear = 32,
  ForcePreloadOnlyShoutedCritical = 33,
  Shouted = 34,
  ShoutedClear = 35,
  ShoutedCritical = 36,
}

export class Ped extends Entity {
  constructor(handle: number) {
    super(handle);
  }

  public get CurrentVehicle(): Vehicle {
    const veh = new Vehicle(GetVehiclePedIsIn(this.handle, false));
    return veh.Exists() ? veh : null;
  }

  public get LastVehicle(): Vehicle {
    const veh = new Vehicle(GetVehiclePedIsIn(this.handle, true));
    return veh.Exists() ? veh : null;
  }

  public get VehicleTryingToEnter(): Vehicle {
    const veh = new Vehicle(GetVehiclePedIsTryingToEnter(this.handle));
    return veh.Exists() ? veh : null;
  }

  public set DrivingStyle(style: DrivingStyle) {
    SetDriveTaskDrivingStyle(this.handle, Number(style));
  }
}
