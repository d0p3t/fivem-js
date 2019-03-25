import { Vector3 } from '../';
import { DrivingStyle, HelmetType, RagdollType, SpeechModifier, VehicleSeat, WeaponHash } from '../hashes';
import { Entity } from './';
import { Vehicle } from './';

export class Ped extends Entity {
  public static Exists(ped: Ped): boolean {
    return typeof ped !== 'undefined' && ped.Exists();
  }

  private readonly speechModifierNames: string[] = [
    'SPEECH_PARAMS_STANDARD',
    'SPEECH_PARAMS_ALLOW_REPEAT',
    'SPEECH_PARAMS_BEAT',
    'SPEECH_PARAMS_FORCE',
    'SPEECH_PARAMS_FORCE_FRONTEND',
    'SPEECH_PARAMS_FORCE_NO_REPEAT_FRONTEND',
    'SPEECH_PARAMS_FORCE_NORMAL',
    'SPEECH_PARAMS_FORCE_NORMAL_CLEAR',
    'SPEECH_PARAMS_FORCE_NORMAL_CRITICAL',
    'SPEECH_PARAMS_FORCE_SHOUTED',
    'SPEECH_PARAMS_FORCE_SHOUTED_CLEAR',
    'SPEECH_PARAMS_FORCE_SHOUTED_CRITICAL',
    'SPEECH_PARAMS_FORCE_PRELOAD_ONLY',
    'SPEECH_PARAMS_MEGAPHONE',
    'SPEECH_PARAMS_HELI',
    'SPEECH_PARAMS_FORCE_MEGAPHONE',
    'SPEECH_PARAMS_FORCE_HELI',
    'SPEECH_PARAMS_INTERRUPT',
    'SPEECH_PARAMS_INTERRUPT_SHOUTED',
    'SPEECH_PARAMS_INTERRUPT_SHOUTED_CLEAR',
    'SPEECH_PARAMS_INTERRUPT_SHOUTED_CRITICAL',
    'SPEECH_PARAMS_INTERRUPT_NO_FORCE',
    'SPEECH_PARAMS_INTERRUPT_FRONTEND',
    'SPEECH_PARAMS_INTERRUPT_NO_FORCE_FRONTEND',
    'SPEECH_PARAMS_ADD_BLIP',
    'SPEECH_PARAMS_ADD_BLIP_ALLOW_REPEAT',
    'SPEECH_PARAMS_ADD_BLIP_FORCE',
    'SPEECH_PARAMS_ADD_BLIP_SHOUTED',
    'SPEECH_PARAMS_ADD_BLIP_SHOUTED_FORCE',
    'SPEECH_PARAMS_ADD_BLIP_INTERRUPT',
    'SPEECH_PARAMS_ADD_BLIP_INTERRUPT_FORCE',
    'SPEECH_PARAMS_FORCE_PRELOAD_ONLY_SHOUTED',
    'SPEECH_PARAMS_FORCE_PRELOAD_ONLY_SHOUTED_CLEAR',
    'SPEECH_PARAMS_FORCE_PRELOAD_ONLY_SHOUTED_CRITICAL',
    'SPEECH_PARAMS_SHOUTED',
    'SPEECH_PARAMS_SHOUTED_CLEAR',
    'SPEECH_PARAMS_SHOUTED_CRITICAL',
  ];

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

  public IsInAnyVehicle(): boolean {
    return !!IsPedInAnyVehicle(this.handle, false);
  }

  public IsInVehicle(vehicle: Vehicle): boolean {
    return !!IsPedInVehicle(this.handle, vehicle.Handle, false);
  }

  public IsSittingInAnyVehicle(): boolean {
    return !!IsPedSittingInAnyVehicle(this.handle);
  }

  public IsSittingInVehicle(vehicle: Vehicle): boolean {
    return !!IsPedSittingInVehicle(this.handle, vehicle.Handle);
  }

  public SetIntoVehicle(vehicle: Vehicle, seat: VehicleSeat): void {
    SetPedIntoVehicle(this.handle, vehicle.Handle, Number(seat));
  }

  public Kill(): void {
    super.Health = -1;
  }

  public Resurrect(): void {
    const maxHealth: number = super.Health;
    const isCollisionEnabled: boolean = super.IsCollisionEnabled;

    ResurrectPed(this.handle);
    super.MaxHealth = maxHealth;
    super.Health = maxHealth;
    super.IsCollisionEnabled = isCollisionEnabled;
    ClearPedTasksImmediately(this.handle);
  }

  public ResetVisibleDamage(): void {
    ResetPedVisibleDamage(this.handle);
  }
  public ClearBloodDamage(): void {
    ClearPedBloodDamage(this.handle);
  }

  // TODO: Add RelationshipGroup

  public get IsInGroup(): boolean {
    return !!IsPedInGroup(this.handle);
  }

  public set NeverLeavesGroup(value: boolean) {
    SetPedNeverLeavesGroup(this.handle, value);
  }

  public LeaveGroup(): void {
    RemovePedFromGroup(this.handle);
  }

  public PlayAmbientSpeed(
    speechName: string,
    voiceName: string = '',
    modifier: SpeechModifier = SpeechModifier.Standard,
  ): void {
    if (Number(modifier) >= 0 && Number(modifier) < this.speechModifierNames.length) {
      if (voiceName === '') {
        PlayAmbientSpeech1(this.handle, speechName, this.speechModifierNames[Number(modifier)]);
      } else {
        PlayAmbientSpeechWithVoice(
          this.handle,
          speechName,
          voiceName,
          this.speechModifierNames[Number(modifier)],
          false,
        );
      }
    } else {
      throw new RangeError('modifier');
    }
  }

  public ApplyDamage(damageAmount: number): void {
    ApplyDamageToPed(this.handle, damageAmount, true);
  }

  public HasBeenDamagedBy(weapon: WeaponHash): boolean {
    return !!HasPedBeenDamagedByWeapon(this.handle, Number(weapon), 0);
  }

  public HasBeenDamagedByAnyWeapon(): boolean {
    return !!HasPedBeenDamagedByWeapon(this.handle, 0, 2);
  }

  public HasBeenDamagedByAnyMeleeWeapon(): boolean {
    return !!HasPedBeenDamagedByWeapon(this.handle, 0, 1);
  }

  public ClearLastWeaponDamage(): void {
    ClearPedLastWeaponDamage(this.handle);
  }

  // TODO: Add Bones / PedBoneCollection

  public GetLastWeaponImpactPosition(): Vector3 {
    const position = GetPedLastWeaponImpactCoord(this.handle);

    return new Vector3(position[0], position[1][0], position[1][1]); // Does this work?
  }

  public get CanRagdoll(): boolean {
    return !!CanPedRagdoll(this.handle);
  }

  public set CanRagdoll(value: boolean) {
    SetPedCanRagdoll(this.handle, value);
  }

  public Ragdoll(duration: number = -1, ragdollType: RagdollType = RagdollType.Normal): void {
    this.CanRagdoll = true;
    SetPedToRagdoll(this.handle, duration, duration, Number(ragdollType), false, false, false);
  }

  public CancelRagdoll(): void {
    SetPedToRagdoll(this.handle, 1, 1, 1, false, false, false);
  }

  public GiveHelmet(canBeRemovedByPed: boolean, helmetType: HelmetType, textureIndex: number): void {
    GivePedHelmet(this.handle, !canBeRemovedByPed, Number(helmetType), textureIndex);
  }

  public RemoveHelmet(instantly: boolean): void {
    RemovePedHelmet(this.handle, instantly);
  }

  public OpenParachute(): void {
    ForcePedToOpenParachute(this.handle);
  }

  public GetConfigFlag(flagId: number): boolean {
    return !!GetPedConfigFlag(this.handle, flagId, true);
  }

  public SetConfigFlag(flagId: number, value: boolean): void {
    SetPedConfigFlag(this.handle, flagId, value);
  }

  public ResetConfigFlag(flagId: number): void {
    SetPedResetFlag(this.handle, flagId, true);
  }

  public Clone(heading: number): Ped {
    return new Ped(ClonePed(this.handle, heading, false, false));
  }

  public Exists(): boolean {
    return super.Exists() && GetEntityType(this.handle) === 1;
  }
}
