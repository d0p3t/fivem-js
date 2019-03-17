import { Game } from './Game';
import { MaterialHash } from './hashes/MaterialHash';
import { Entity } from './models/Entity';
import { Vector3 } from './utils/Vector3';

export class RaycastResult {
  public get HitEntity(): Entity {
    return this.entityHandleArg;
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
    return this.entityHandleArg.Handle !== 0;
  }

  public get Material(): MaterialHash {
    return this.materialArg;
  }

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
    this.entityHandleArg = Game.EntityFromHandle(results[5]);

    this.result = results[0];
  }
}
