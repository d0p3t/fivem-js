import { Vector3 } from '../';
import {
  DrivingStyle,
  FiringPattern,
  Gender,
  HelmetType,
  RagdollType,
  SpeechModifier,
  VehicleSeat,
} from '../enums';
import { WeaponHash } from '../hashes';
import { Tasks } from '../Tasks';
import { Entity, PedBoneCollection, Vehicle } from './';
import { WeaponCollection } from '../weapon/WeaponCollection';

export class Ped extends Entity {
  public static exists(ped: Ped): boolean {
    return typeof ped !== 'undefined' && ped.exists();
  }

  private pedBones: PedBoneCollection | undefined;
  private weapons: WeaponCollection | undefined;

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

  private tasks: Tasks | undefined;

  constructor(handle: number) {
    super(handle);
  }

  public get Money(): number {
    return GetPedMoney(this.handle);
  }

  public set Money(amount: number) {
    SetPedMoney(this.handle, amount);
  }

  public get Gender(): Gender {
    return IsPedMale(this.handle) ? Gender.Male : Gender.Female;
  }

  public get Armor(): number {
    return GetPedArmour(this.handle);
  }

  public set Armor(amount: number) {
    if (amount > 100) amount = 100;
    SetPedArmour(this.handle, amount);
  }

  public get Accuracy(): number {
    return GetPedAccuracy(this.handle);
  }

  public set Accuracy(accuracy: number) {
    if (accuracy > 100) accuracy = 100;
    SetPedAccuracy(this.handle, accuracy);
  }

  public get Health(): number {
    return super.Health - 100;
  }

  public set Health(amount: number) {
    super.Health = amount + 100;
  }

  public get MaxHealth(): number {
    return super.MaxHealth - 100;
  }

  public set MaxHealth(amount: number) {
    super.MaxHealth = amount + 100;
  }

  public set Sweat(value: number) {
    SetPedSweat(this.handle, value);
  }

  public set WetnessHeight(value: number) {
    if (value === 0) {
      ClearPedWetness(this.Handle);
    } else {
      SetPedWetnessHeight(this.handle, value);
    }
  }

  public set Voice(value: string) {
    SetAmbientVoiceName(this.handle, value);
  }

  public set ShootRate(value: number) {
    if (value > 1000) value = 1000;
    SetPedShootRate(this.handle, value);
  }

  public get WasKilledByStealth(): boolean {
    return !!WasPedKilledByStealth(this.handle);
  }

  public get WasKilledByTakedown(): boolean {
    return !!WasPedKilledByTakedown(this.handle);
  }

  public get SeatIndex(): VehicleSeat {
    if (!this.CurrentVehicle) return VehicleSeat.None;

    const numberOfSeats = GetVehicleModelNumberOfSeats(this.CurrentVehicle.Model.Hash);
    for (let seat = -1; seat < numberOfSeats; seat++) {
      if (this.CurrentVehicle.getPedOnSeat(seat).Handle == this.handle) {
        return seat;
      }
    }

    return VehicleSeat.None;
  }

  public get CurrentVehicle(): Vehicle | null {
    const veh = new Vehicle(GetVehiclePedIsIn(this.handle, false));
    return veh.exists() ? veh : null;
  }

  public get LastVehicle(): Vehicle | null {
    const veh = new Vehicle(GetVehiclePedIsIn(this.handle, true));
    return veh.exists() ? veh : null;
  }

  public get VehicleTryingToEnter(): Vehicle | null {
    const veh = new Vehicle(GetVehiclePedIsTryingToEnter(this.handle));
    return veh.exists() ? veh : null;
  }

  public get IsJumpingOutOfVehicle(): boolean {
    return !!IsPedJumpingOutOfVehicle(this.handle);
  }

  public set StaysInVehicleWhenJacked(value: boolean) {
    SetPedStayInVehicleWhenJacked(this.handle, value);
  }

  public set MaxDrivingSpeed(value: number) {
    SetDriveTaskMaxCruiseSpeed(this.handle, value);
  }

  public get IsHuman(): boolean {
    return !!IsPedHuman(this.handle);
  }

  public set IsEnemy(value: boolean) {
    SetPedAsEnemy(this.handle, value);
  }

  public set IsPriorityTargetForEnemies(value: boolean) {
    SetEntityIsTargetPriority(this.handle, value, 0);
  }

  public get IsPlayer(): boolean {
    return !!IsPedAPlayer(this.handle);
  }

  public get IsCuffed(): boolean {
    return !!IsPedCuffed(this.handle);
  }

  public get IsWearingHelmet(): boolean {
    return !!IsPedWearingHelmet(this.handle);
  }

  public get IsRagdoll(): boolean {
    return !!IsPedRagdoll(this.handle);
  }

  public get IsIdle(): boolean {
    return (
      !this.IsInjured &&
      !this.IsRagdoll &&
      !this.IsInAir &&
      !this.IsOnFire &&
      !this.IsDucking &&
      !this.IsGettingIntoAVehicle &&
      !this.IsInCombat &&
      !this.IsInMeleeCombat &&
      (!this.isInAnyVehicle() || this.isSittingInAnyVehicle())
    );
  }

  public get IsProne(): boolean {
    return !!IsPedProne(this.handle);
  }

  public set IsDucking(value: boolean) {
    SetPedDucking(this.handle, value);
  }

  public get IsDucking(): boolean {
    return !!IsPedDucking(this.handle);
  }

  public get IsGettingUp(): boolean {
    return !!IsPedGettingUp(this.handle);
  }

  public get IsClimbing(): boolean {
    return !!IsPedClimbing(this.handle);
  }

  public get IsJumping(): boolean {
    return !!IsPedJumping(this.handle);
  }

  public get IsFalling(): boolean {
    return !!IsPedFalling(this.handle);
  }

  public get IsStopped(): boolean {
    return !!IsPedStopped(this.handle);
  }

  public get IsWalking(): boolean {
    return !!IsPedWalking(this.handle);
  }

  public get IsRunning(): boolean {
    return !!IsPedRunning(this.handle);
  }

  public get IsSprinting(): boolean {
    return !!IsPedSprinting(this.handle);
  }

  public get IsDiving(): boolean {
    return !!IsPedDiving(this.handle);
  }

  public get IsInParachuteFreeFall(): boolean {
    return !!IsPedInParachuteFreeFall(this.handle);
  }

  public get IsSwimming(): boolean {
    return !!IsPedSwimming(this.handle);
  }

  public get IsSwimmingUnderWater(): boolean {
    return !!IsPedSwimmingUnderWater(this.handle);
  }

  public get IsVaulting(): boolean {
    return !!IsPedVaulting(this.handle);
  }

  public get IsOnBike(): boolean {
    return !!IsPedOnAnyBike(this.handle);
  }

  public get IsOnFoot(): boolean {
    return !!IsPedOnFoot(this.handle);
  }

  public get IsInSub(): boolean {
    return !!IsPedInAnySub(this.handle);
  }

  public get IsInTaxi(): boolean {
    return !!IsPedInAnyTaxi(this.handle);
  }

  public get IsInTrain(): boolean {
    return !!IsPedInAnyTrain(this.handle);
  }

  public get IsInHeli(): boolean {
    return !!IsPedInAnyHeli(this.handle);
  }

  public get IsInPlane(): boolean {
    return !!IsPedInAnyPlane(this.handle);
  }

  public get IsInFlyingVehicle(): boolean {
    return !!IsPedInFlyingVehicle(this.handle);
  }

  public get IsInBoat(): boolean {
    return !!IsPedInAnyBoat(this.handle);
  }

  public get IsInPoliceVehicle(): boolean {
    return !!IsPedInAnyPoliceVehicle(this.handle);
  }

  public get IsJacking(): boolean {
    return !!IsPedJacking(this.handle);
  }

  public get IsBeingJacked(): boolean {
    return !!IsPedBeingJacked(this.handle);
  }

  public get IsGettingIntoAVehicle(): boolean {
    return !!IsPedGettingIntoAVehicle(this.handle);
  }

  public get IsTryingToEnterALockedVehicle(): boolean {
    return !!IsPedTryingToEnterALockedVehicle(this.handle);
  }

  public get IsInjured(): boolean {
    return !!IsPedInjured(this.handle);
  }

  public get IsFleeing(): boolean {
    return !!IsPedFleeing(this.handle);
  }

  public get IsInCombat(): boolean {
    return !!IsPedInCombat(this.handle, PlayerPedId());
  }

  public get IsInMeleeCombat(): boolean {
    return !!IsPedInMeleeCombat(this.handle);
  }

  public get IsInStealthMode(): boolean {
    return !!GetPedStealthMovement(this.handle);
  }

  public get IsAmbientSpeechPlaying(): boolean {
    return !!IsAmbientSpeechPlaying(this.handle);
  }

  public get IsScriptedSpeechPlaying(): boolean {
    return !!IsScriptedSpeechPlaying(this.handle);
  }

  public get IsAnySpeechPlaying(): boolean {
    return !!IsAnySpeechPlaying(this.handle);
  }

  public get IsAmbientSpeechEnabled(): boolean {
    return !IsAmbientSpeechDisabled(this.handle);
  }

  public set IsPainAudioEnabled(value: boolean) {
    DisablePedPainAudio(this.handle, !value);
  }

  public get IsPlantingBomb(): boolean {
    return !!IsPedPlantingBomb(this.handle);
  }

  public get IsShooting(): boolean {
    return !!IsPedShooting(this.handle);
  }

  public get IsAiming(): boolean {
    return this.getConfigFlag(78);
  }

  public get IsReloading(): boolean {
    return !!IsPedReloading(this.handle);
  }

  public get IsDoingDriveby(): boolean {
    return !!IsPedDoingDriveby(this.handle);
  }

  public get IsGoingIntoCover(): boolean {
    return !!IsPedGoingIntoCover(this.handle);
  }

  public get IsBeingStunned(): boolean {
    return !!IsPedBeingStunned(this.handle, 0);
  }

  public get IsBeingStealthKilled(): boolean {
    return !!IsPedBeingStealthKilled(this.handle);
  }

  public get IsPerformingStealthKill(): boolean {
    return !!IsPedPerformingStealthKill(this.handle);
  }

  public get IsAimingFromCover(): boolean {
    return !!IsPedAimingFromCover(this.handle);
  }

  public isInCover(expectUseWeapon = false): boolean {
    return !!IsPedInCover(this.handle, expectUseWeapon);
  }

  public get IsInCoverFacingLeft(): boolean {
    return !!IsPedInCoverFacingLeft(this.handle);
  }

  public set FiringPattern(value: FiringPattern) {
    SetPedFiringPattern(this.handle, value);
  }

  public set DropsWeaponsOnDeath(value: boolean) {
    SetPedDropsWeaponsWhenDead(this.handle, value);
  }

  public set DrivingSpeed(value: number) {
    SetDriveTaskCruiseSpeed(this.handle, value);
  }

  public set DrivingStyle(style: DrivingStyle) {
    SetDriveTaskDrivingStyle(this.handle, Number(style));
  }

  public get Task(): Tasks | undefined {
    if (this.tasks === null) {
      this.tasks = new Tasks(this);
    }

    return this.tasks;
  }

  public get TaskSequenceProgress(): number {
    return GetSequenceProgress(this.handle);
  }

  public set BlockPermanentEvents(block: boolean) {
    SetBlockingOfNonTemporaryEvents(this.handle, block);
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

  public isHeadtracking(entity: Entity): boolean {
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

  public getKiller(): Entity | null {
    return Entity.fromHandle(GetPedSourceOfDeath(this.handle));
  }

  public kill(): void {
    this.Health = -1;
  }

  public resurrect(): void {
    const maxHealth: number = this.Health;
    const isCollisionEnabled: boolean = super.IsCollisionEnabled;

    ResurrectPed(this.handle);
    this.MaxHealth = maxHealth;
    this.Health = maxHealth;
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
    voiceName = '',
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

  public get Bones(): PedBoneCollection | undefined {
    if (this.pedBones === null) {
      this.pedBones = new PedBoneCollection(this);
    }

    return this.pedBones;
  }

  /**
   * Ped Weapons
   *
   * @constructor
   */
  public get Weapons(): WeaponCollection {
    if (!this.weapons) {
      this.weapons = new WeaponCollection(this);
    }

    return this.weapons;
  }

  public giveWeapon(weapon: WeaponHash, ammoCount = 999, isHidden = false, equipNow = true): void {
    GiveWeaponToPed(this.handle, weapon, ammoCount, isHidden, equipNow);
  }

  public removeWeapon(weapon: WeaponHash): void {
    RemoveWeaponFromPed(this.handle, weapon);
  }

  public removeAllWeapons(): void {
    RemoveAllPedWeapons(this.handle, true);
  }

  public getLastWeaponImpactPosition(): Vector3 {
    const position = GetPedLastWeaponImpactCoord(this.handle)[1];

    return new Vector3(position[0], position[1], position[2]); // Does this work?
  }

  public get CanRagdoll(): boolean {
    return !!CanPedRagdoll(this.handle);
  }

  public set CanRagdoll(value: boolean) {
    SetPedCanRagdoll(this.handle, value);
  }

  public ragdoll(duration = -1, ragdollType: RagdollType = RagdollType.Normal): void {
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

  public exists(ped?: Ped): boolean {
    if (ped === null) {
      return super.exists() && GetEntityType(this.handle) === 1;
    }

    return ped?.exists() ?? false;
  }
}
