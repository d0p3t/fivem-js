import { IInvertAxis, InvertAxisFlags } from './enums';
import { Entity } from './models/';
import { Vector3 } from './utils';

/**
 * UNFINISHED! Class that represents a particle effect asset.
 */
export class ParticleEffectAsset {
  /**
   * Returns the name of the asset. Same as AssetName.
   */
  public get Asset(): string {
    return this.assetName;
  }

  private readonly assetName: string;

  constructor(assetName: string) {
    this.assetName = assetName;
  }

  /**
   * Get the name of the particle effect.
   */
  public get AssetName(): string {
    return this.assetName;
  }

  /**
   * Get whether the particle effect has loaded into game memory.
   */
  public get IsLoaded(): boolean {
    return !!HasNamedPtfxAssetLoaded(this.assetName);
  }

  /**
   * Start a particle effect at a world position.
   *
   * @param effectName Name of effect.
   * @param entity Entity to use effect on.
   * @param off Offset from entity position.
   * @param rot Rotation from entity position.
   * @param scale Size of the effect.
   * @param invertAxis Which axis to invert (default none).
   */
  public startNonLoopedAtCoord(
    effectName: string,
    pos: Vector3,
    rot: Vector3 = new Vector3(0, 0, 0),
    scale: number = 1.0,
    invertAxis: IInvertAxis = { flags: InvertAxisFlags.None },
  ): boolean {
    if (!this.setNextCall()) {
      return false;
    }
    const invertAxisFlags = invertAxis.flags;
    SetPtfxAssetNextCall(this.assetName);
    return (
      StartParticleFxLoopedAtCoord(
        effectName,
        pos.x,
        pos.y,
        pos.z,
        rot.x,
        rot.y,
        rot.z,
        scale,
        !!(invertAxisFlags & InvertAxisFlags.X),
        !!(invertAxisFlags & InvertAxisFlags.Y),
        !!(invertAxisFlags & InvertAxisFlags.Z),
        false,
      ) > 0
    );
  }

  /**
   * Start a particle effect on an entity
   *
   * @param effectName Name of effect.
   * @param entity Entity to use effect on.
   * @param off Offset from entity position.
   * @param rot Rotation from entity position.
   * @param scale Size of the effect.
   * @param invertAxis Which axis to invert (default none).
   */
  public startNonLoopedOnEntity(
    effectName: string,
    entity: Entity,
    off: Vector3 = new Vector3(0, 0, 0),
    rot: Vector3 = new Vector3(0, 0, 0),
    scale: number = 1.0,
    invertAxis: IInvertAxis = { flags: InvertAxisFlags.None },
  ): boolean {
    if (!this.setNextCall()) {
      return false;
    }
    const invertAxisFlags = invertAxis.flags;
    SetPtfxAssetNextCall(this.assetName);
    return !!StartParticleFxLoopedOnEntity(
      effectName,
      entity.Handle,
      off.x,
      off.y,
      off.z,
      rot.x,
      rot.y,
      rot.z,
      scale,
      !!(invertAxisFlags & InvertAxisFlags.X),
      !!(invertAxisFlags & InvertAxisFlags.Y),
      !!(invertAxisFlags & InvertAxisFlags.Z),
    );
  }

  /**
   * Load a particle effect into the game memory.
   *
   * @param timeout Max time to load Particle Effect
   */
  public request(timeout: number): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.IsLoaded) {
        RequestNamedPtfxAsset(this.assetName);
        const start = GetGameTimer();
        const interval = setInterval(() => {
          if (this.IsLoaded || GetGameTimer() - start >= timeout) {
            clearInterval(interval);
            resolve(this.IsLoaded);
          }
          // tslint:disable-next-line: align
        }, 0);
      } else {
        resolve(this.IsLoaded);
      }
    });
  }

  /**
   * Allow game engine to safely unload particle effect model from memory.
   */
  public markAsNoLongerNeeded(): void {
    RemoveNamedPtfxAsset(this.assetName);
  }

  public toString(): string {
    return this.assetName;
  }

  private setNextCall(): boolean {
    if (!this.IsLoaded) {
      RequestNamedPtfxAsset(this.assetName);
    } else {
      SetPtfxAssetNextCall(this.assetName);
      return true;
    }
    return false;
  }
}
