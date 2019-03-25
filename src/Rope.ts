import { Entity } from './models';
import { Vector3 } from './utils';

/**
 * Class to manage invisible ropes between entities.
 */
export class Rope {
  /**
   * Id of rope entity.
   */
  private readonly handle: number;

  /**
   * Create a rope object based on an existing rope in the world.
   *
   * @param handle entity Id of rope.
   */
  constructor(handle: number) {
    this.handle = handle;
  }

  /**
   * Get the length of the rope.
   *
   * @returns The rope length.
   */
  public get Length(): number {
    return GetRopeLength(this.handle);
  }

  /**
   * Sets the length of the rope.
   *
   * @param length Desired new length of rope.
   */
  public set Length(length: number) {
    RopeForceLength(this.handle, length);
  }

  /**
   * Get the number of vertices on the rope.
   *
   * @returns Returns the number of vertices.
   */
  public get VertexCount(): number {
    return GetRopeVertexCount(this.handle);
  }

  /**
   * Resets the length of the rope to it's length upon object creation or a length of 1.
   *
   * @param reset Whether to reset the length to it's original length or 1.
   */
  public ResetLength(reset: boolean): void {
    RopeResetLength(this.handle, reset ? 1 : this.Length);
  }

  /**
   * Activates world physics on the rope object.
   */
  public ActivatePhysics(): void {
    ActivatePhysics(this.handle);
  }

  /**
   * Attach the rope to an entity.
   *
   * @param entity Entity to attach the rope to.
   * @param position Location where the rope is to be attached.
   */
  public AttachEntity(entity: Entity, position: Vector3): void {
    AttachRopeToEntity(this.handle, entity.Handle, position.x, position.y, position.z, false);
  }

  /**
   * Attach the rope between two entities at given locations on the entities.
   *
   * @param entityOne The first entity to attach to.
   * @param positionOne Where on the first entity to attach the rope to.
   * @param entityTwo The second entity to attach to.
   * @param positionTwo Where on the second entity to attach the rope to.
   * @param length The desired length of the rope between the two entities.
   */
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

  /**
   * Detach the rope from an entity.
   *
   * @param entity Entity to detach the rope from.
   */
  public DetachEntity(entity: Entity): void {
    DetachRopeFromEntity(this.handle, entity.Handle);
  }

  /**
   * Pin a vertex of the rope to a certain location.
   *
   * @param vertex Vertex to pin.
   * @param position Location to pin the vertex to.
   */
  public PinVertex(vertex: number, position: Vector3): void {
    PinRopeVertex(this.handle, vertex, position.x, position.y, position.z);
  }

  /**
   * Unpin a specified vertex from it's current pinned location (if any).
   *
   * @param vertex Vertex to unpin.
   */
  public UnpinVertex(vertex: number): void {
    UnpinRopeVertex(this.handle, vertex);
  }

  /**
   * Return the world location of a specified vertex on the rope.
   *
   * @param vertex Vertex to get location from.
   * @returns The vector location of the vertex.
   */
  public GetVertexCoord(vertex: number): Vector3 {
    const coords = GetRopeVertexCoord(this.handle, vertex);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  /**
   * Delete the rope from the world. This does not delete the rope object.
   */
  public Delete(): void {
    DeleteRope(this.handle);
  }

  /**
   * Check if the rope still exists in the world based on it's handle.
   *
   * @returns Whether the rope exists or not.
   */
  public Exists(): boolean {
    return !!DoesRopeExist(this.handle);
  }
}
