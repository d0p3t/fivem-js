import { MaterialHash } from './hashes/MaterialHash';
import { Entity } from './models/Entity';
import { Vector3 } from './utils/Vector3';

export class RaycastResult {
  public get HitEntity(): Entity {
    return new Entity(this.entityHandleArg);
  }

  public get HitPosition(): Vector3 {
    return this.hitPositionArg;
  }

  public get SurfaceNormal(): Vector3 {
    return this.surfaceNormalArg;
  }

  public get DidHit(): boolean {
    return this.hitSomethingArg;
  }

  public get DidHitEntity(): boolean {
    return this.entityHandleArg !== 0;
  }

  public get Material(): MaterialHash {
    return MaterialHash[this.materialArg.toString()];
  }

  public get Result(): number {
    const results = GetShapeTestResultEx(this.handle);
    this.hitSomethingArg = !!results[1];
    this.hitPositionArg = new Vector3(results[2][0], results[2][1], results[2][2]);
    this.surfaceNormalArg = new Vector3(results[3][0], results[3][1], results[3][2]);
    this.materialArg = results[4];
    this.entityHandleArg = results[5];
    return results[0]; // Not sure about this
  }

  private handle: number;
  private hitPositionArg: Vector3;
  private hitSomethingArg: boolean;
  private entityHandleArg: number;
  private surfaceNormalArg: Vector3;
  private materialArg: number;

  constructor(handle: number) {
    this.handle = handle;
    this.hitPositionArg = new Vector3(0, 0, 0);
    this.hitSomethingArg = false;
    this.entityHandleArg = 0;
    this.surfaceNormalArg = new Vector3(0, 0, 0);
    this.materialArg = 0;
  }
}
