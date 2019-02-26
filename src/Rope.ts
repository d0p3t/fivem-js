import { Entity } from './models/Entity';
import { Vector3 } from './utils/Vector3';

export class Rope {
  private readonly handle: number;
  constructor(handle: number) {
    this.handle = handle;
  }

  public get Length(): number {
    return GetRopeLength(this.handle);
  }

  public set Length(length: number) {
    RopeForceLength(this.handle, length);
  }

  public get VertexCount(): number {
    return GetRopeVertexCount(this.handle);
  }

  public ResetLength(reset: boolean): void {
    RopeResetLength(this.handle, reset ? 1 : this.Length);
  }

  public ActivatePhysics(): void {
    ActivatePhysics(this.handle);
  }

  public AttachEntity(entity: Entity, position: Vector3): void {
    AttachRopeToEntity(this.handle, entity.Handle, position.x, position.y, position.z, false);
  }

  public AttachEntities(
    entityOne: Entity,
    positionOne: Vector3,
    entityTwo: Entity,
    positionTwo: Vector3,
    length: number,
  ): void {
    AttachEntitiesToRope(
      this.handle,
      entityOne.Handle,
      entityTwo.Handle,
      positionOne.x,
      positionOne.y,
      positionOne.z,
      positionTwo.x,
      positionTwo.y,
      positionTwo.z,
      length,
      false,
      false,
      null,
      null,
    );
  }
  public DetachEntity(entity: Entity): void {
    DetachRopeFromEntity(this.handle, entity.Handle);
  }

  public PinVertex(vertex: number, position: Vector3): void {
    PinRopeVertex(this.handle, vertex, position.x, position.y, position.z);
  }

  public UnpinVertex(vertex: number): void {
    UnpinRopeVertex(this.handle, vertex);
  }

  public GetVertexCoord(vertex: number): Vector3 {
    const coords = GetRopeVertexCoord(this.handle, vertex);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  public Delete(): void {
    DeleteRope(this.handle);
  }

  public Exists(): boolean {
    return !!DoesRopeExist(this.handle);
  }
}
