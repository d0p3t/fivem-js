import { Game } from './Game';
import { MaterialHash } from './hashes';
import { Entity } from './models';
import { Vector3 } from './utils';

/**
 * Class that represents the result of a raycast.
 */
export class RaycastResult {
  /**
   * Return the entity that was hit.
   */
  public get HitEntity(): Entity {
    return this.entityHandleArg;
  }

  /**
   * Get the position of the entity that was hit.
   */
  public get HitPosition(): Vector3 {
    return this.hitPositionArg;
  }

  /**
   * Return the vector perpendicular to the tangent plane.
   */
  public get SurfaceNormal(): Vector3 {
    return this.surfaceNormalArg;
  }

  /**
   * Whether we hit anything.
   */
  public get DidHit(): boolean {
    return this.hitSomethingArg;
  }

  /**
   * Whether the entity hit exists.
   */
  public get DidHitEntity(): boolean {
    return this.entityHandleArg.Handle !== 0;
  }

  /**
   * Material type that was hit.
   */
  public get Material(): MaterialHash {
    return this.materialArg;
  }

  /**
   * Raycast result's handle.
   */
  public get Result(): number {
    return this.result;
  }

  private handle: number;
  private hitPositionArg: Vector3;
  private hitSomethingArg: boolean;
  private entityHandleArg: Entity;
  private surfaceNormalArg: Vector3;
  private materialArg: MaterialHash;
  private result: number;

  /**
   * Create a RaycastResult object that gets the results from a StartShapeTestRay()
   *
   * @param handle The handle returned from StartShapeTestRay()
   */
  constructor(handle: number) {
    this.handle = handle;
    this.hitPositionArg = new Vector3(0, 0, 0);
    this.hitSomethingArg = false;
    this.entityHandleArg = null;
    this.surfaceNormalArg = new Vector3(0, 0, 0);
    this.materialArg = 0;

    const results = GetShapeTestResultEx(this.handle);
    this.hitSomethingArg = !!results[1];
    this.hitPositionArg = new Vector3(results[2][0], results[2][1], results[2][2]);
    this.surfaceNormalArg = new Vector3(results[3][0], results[3][1], results[3][2]);
    this.materialArg = results[4];
    this.entityHandleArg = Game.entityFromHandle(results[5]);

    this.result = results[0];
  }
}
