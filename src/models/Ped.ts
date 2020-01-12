import { Vector3 } from '../';
import { DrivingStyle, HelmetType, RagdollType, SpeechModifier, VehicleSeat } from '../enums';
import { WeaponHash } from '../hashes';
import { Entity, PedBoneCollection, Vehicle } from './';

export class Ped extends Entity {
  public static exists(ped: Ped): boolean {
    return typeof ped !== 'undefined' && ped.exists();
  }

  private pedBones: PedBoneCollection;

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
    return veh.exists() ? veh : null;
  }

  public get LastVehicle(): Vehicle {
    const veh = new Vehicle(GetVehiclePedIsIn(this.handle, true));
    return veh.exists() ? veh : null;
  }

  public get VehicleTryingToEnter(): Vehicle {
    const veh = new Vehicle(GetVehiclePedIsTryingToEnter(this.handle));
    return veh.exists() ? veh : null;
  }

  public set DrivingStyle(style: DrivingStyle) {
    SetDriveTaskDrivingStyle(this.handle, Number(style));
  }

  public isInAnyVehicle(): boolean {
    return !!IsPedInAnyVehicle(this.handle, false);
  }

  public isInVehicle(vehicle: Vehicle): boolean {
    return !!IsPedInVehicle(this.handle, vehicle.Handle, false);
  }

  public isSittingInAnyVehicle(): boolean {
    return !!IsPedSittingInAnyVehicle(this.handle);
  }

  public isSittingInVehicle(vehicle: Vehicle): boolean {
    return !!IsPedSittingInVehicle(this.handle, vehicle.Handle);
  }

  public setIntoVehicle(vehicle: Vehicle, seat: VehicleSeat): void {
    SetPedIntoVehicle(this.handle, vehicle.Handle, Number(seat));
  }

  public isHeadtrackkking(entity: Entity): boolean {
    return !!IsPedHeadtrackingEntity(this.handle, entity.Handle);
  }

  public isInCombatAgainst(target: Ped): boolean {
    return !!IsPedInCombat(this.handle, target.Handle);
  }

  public getJacker(): Ped {
    return new Ped(GetPedsJacker(this.handle));
  }

  public getJackTarget(): Ped {
    return new Ped(GetJackTarget(this.handle));
  }

  public getMeleeTarget(): Ped {
    return new Ped(GetMeleeTargetForPed(this.handle));
  }

  public getKiller(): Entity {
    return Entity.fromHandle(GetPedSourceOfDeath(this.handle));
  }

  public kill(): void {
    super.Health = -1;
  }

  public resurrect(): void {
    const maxHealth: number = super.Health;
    const isCollisionEnabled: boolean = super.IsCollisionEnabled;

    ResurrectPed(this.handle);
    super.MaxHealth = maxHealth;
    super.Health = maxHealth;
    super.IsCollisionEnabled = isCollisionEnabled;
    ClearPedTasksImmediately(this.handle);
  }

  public resetVisibleDamage(): void {
    ResetPedVisibleDamage(this.handle);
  }
  public clearBloodDamage(): void {
    ClearPedBloodDamage(this.handle);
  }

  // TODO: Add RelationshipGroup

  public get IsInGroup(): boolean {
    return !!IsPedInGroup(this.handle);
  }

  public set NeverLeavesGroup(value: boolean) {
    SetPedNeverLeavesGroup(this.handle, value);
  }

  public leaveGroup(): void {
    RemovePedFromGroup(this.handle);
  }

  public playAmbientSpeed(
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

  public applyDamage(damageAmount: number): void {
    ApplyDamageToPed(this.handle, damageAmount, true);
  }

  public hasBeenDamagedByWeapon(weapon: WeaponHash): boolean {
    return !!HasPedBeenDamagedByWeapon(this.handle, Number(weapon), 0);
  }

  public hasBeenDamagedByAnyWeapon(): boolean {
    return !!HasPedBeenDamagedByWeapon(this.handle, 0, 2);
  }

  public hasBeenDamagedByAnyMeleeWeapon(): boolean {
    return !!HasPedBeenDamagedByWeapon(this.handle, 0, 1);
  }

  public clearLastWeaponDamage(): void {
    ClearPedLastWeaponDamage(this.handle);
  }

  public get Bones(): PedBoneCollection {
    if (this.pedBones === null) {
      this.pedBones = new PedBoneCollection(this);
    }

    return this.pedBones;
  }

  public giveWeapon(
    weapon: WeaponHash,
    ammoCount: number = 999,
    isHidden: boolean = false,
    equipNow: boolean = true,
  ): void {
    GiveWeaponToPed(this.handle, weapon, ammoCount, isHidden, equipNow);
  }

  public removeWeapon(weapon: WeaponHash): void {
    RemoveWeaponFromPed(this.handle, weapon);
  }

  public removeAllWeapons(): void {
    RemoveAllPedWeapons(this.handle, true);
  }

  public getLastWeaponImpactPosition(): Vector3 {
    const position = GetPedLastWeaponImpactCoord(this.handle);

    return new Vector3(position[0], position[1][0], position[1][1]); // Does this work?
  }

  public get CanRagdoll(): boolean {
    return !!CanPedRagdoll(this.handle);
  }

  public set CanRagdoll(value: boolean) {
    SetPedCanRagdoll(this.handle, value);
  }

  public ragdoll(duration: number = -1, ragdollType: RagdollType = RagdollType.Normal): void {
    this.CanRagdoll = true;
    SetPedToRagdoll(this.handle, duration, duration, Number(ragdollType), false, false, false);
  }

  public cancelRagdoll(): void {
    SetPedToRagdoll(this.handle, 1, 1, 1, false, false, false);
  }

  public giveHelmet(
    canBeRemovedByPed: boolean,
    helmetType: HelmetType,
    textureIndex: number,
  ): void {
    GivePedHelmet(this.handle, !canBeRemovedByPed, Number(helmetType), textureIndex);
  }

  public removeHelmet(instantly: boolean): void {
    RemovePedHelmet(this.handle, instantly);
  }

  public openParachute(): void {
    ForcePedToOpenParachute(this.handle);
  }

  public getConfigFlag(flagId: number): boolean {
    return !!GetPedConfigFlag(this.handle, flagId, true);
  }

  public setConfigFlag(flagId: number, value: boolean): void {
    SetPedConfigFlag(this.handle, flagId, value);
  }

  public resetConfigFlag(flagId: number): void {
    SetPedResetFlag(this.handle, flagId, true);
  }

  public clone(heading: number): Ped {
    return new Ped(ClonePed(this.handle, heading, false, false));
  }

  public exists(ped: Ped = null) {
    if (ped === null) {
      return super.exists() && GetEntityType(this.handle) === 1;
    }

    return ped.exists();
  }
}
