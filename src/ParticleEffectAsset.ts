import { IInvertAxis, InvertAxisFlags } from './enums';
import { Entity } from './models/';
import { Vector3 } from './utils';

export class ParticleEffectAsset {
  public get Asset(): string {
    return this.assetName;
  }

  private readonly assetName: string;

  constructor(assetName: string) {
    this.assetName = assetName;
  }

  public get AssetName(): string {
    return this.assetName;
  }

  public get IsLoaded(): boolean {
    return !!HasNamedPtfxAssetLoaded(this.assetName);
  }

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
