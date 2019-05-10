import { Game } from '../Game';
import { Vector3 } from '../utils';
import { EntityBoneCollection } from './';

export class Entity {
  protected handle: number;
  protected bones: EntityBoneCollection;

  constructor(handle: number) {
    this.handle = handle;
  }

  public get Handle(): number {
    return this.handle;
  }

  public get Health(): number {
    return GetEntityHealth(this.handle);
  }

  public set Health(amount: number) {
    SetEntityHealth(this.handle, amount);
  }

  public get MaxHealth(): number {
    return GetEntityMaxHealth(this.handle) - 100;
  }

  public set MaxHealth(amount: number) {
    SetEntityMaxHealth(this.handle, amount + 100);
  }

  public isDead(): boolean {
    return IsEntityDead(this.handle) ? true : false;
  }

  public isAlive(): boolean {
    return !this.isDead();
  }

  public get Position(): Vector3 {
    const coords = GetEntityCoords(this.handle, false);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  public set Position(position: Vector3) {
    SetEntityCoords(this.handle, position.x, position.y, position.z, false, false, false, true);
  }

  public set PositionNoOffset(position: Vector3) {
    SetEntityCoordsNoOffset(this.handle, position.x, position.y, position.z, true, true, true);
  }

  public get Heading(): number {
    return GetEntityHeading(this.handle);
  }

  public set Heading(heading: number) {
    SetEntityHeading(this.handle, heading);
  }

  public get IsCollisionEnabled(): boolean {
    return !!!GetEntityCollisonDisabled(this.handle);
  }

  public set IsCollisionEnabled(value: boolean) {
    SetEntityCollision(this.handle, value, false);
  }

  public get Bones(): EntityBoneCollection {
    if (this.bones === null) {
      this.bones = new EntityBoneCollection(this);
    }
    return this.bones;
  }

  public exists(): boolean {
    return DoesEntityExist(this.handle) ? true : false;
  }

  public delete(): void {
    if (this.handle !== Game.PlayerPed.Handle) {
      SetEntityAsMissionEntity(this.handle, false, true);
      DeleteEntity(this.handle);
    }
  }
}
