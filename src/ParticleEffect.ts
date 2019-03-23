import { InvertAxis } from './enums';
import ParticleEffectAsset from './ParticleEffectAsset';
import { Color } from './utils/Color';
import { Vector3 } from './utils/Vector3';

// TODO: Lots of Matrix stuff through memory access
export abstract class ParticleEffect {
  protected readonly asset: ParticleEffectAsset;
  protected readonly effectName: string;
  protected offset: Vector3;
  protected rotation: Vector3;
  protected color: Color;
  protected scale: number;
  protected range: number;
  protected invertAxis: InvertAxis;
  private handle: number;

  constructor(asset: ParticleEffectAsset, effectName: string) {
    this.handle = -1;
    this.asset = asset;
    this.effectName = effectName;
  }

  public get Handle(): number {
    return this.handle;
  }

  public get IsActive(): boolean {
    return this.Handle !== -1 && !!DoesParticleFxLoopedExist(this.Handle);
  }

  public abstract Start(): boolean;

  public Stop(): void {
    if (this.IsActive) {
      RemoveParticleFx(this.Handle, false);
    }
    this.handle = -1;
  }

  public get Rotation(): Vector3 {
    return this.rotation;
  }

  public set Rotation(rotation: Vector3) {
    this.rotation = rotation;
    if (this.IsActive) {
      const off = this.offset; // TODO Matrix stuff to access from memory
      SetParticleFxLoopedOffsets(this.Handle, off.x, off.y, off.z, rotation.x, rotation.y, rotation.z);
    }
  }

  public get Range(): number {
    return this.range;
  }

  public set Range(range: number) {
    this.range = range;
    SetParticleFxLoopedRange(this.Handle, range);
  }

  public get InvertAxis(): InvertAxis {
    return this.invertAxis;
  }

  public set InvertAxis(invertAxis: InvertAxis) {
    this.invertAxis = invertAxis;
    if (this.IsActive) {
      this.Stop();
      this.Start();
    }
  }

  public SetParameter(parameterName: string, value: number): void {
    if (this.IsActive) {
      SetParticleFxLoopedEvolution(this.Handle, parameterName, value, false);
    }
  }

  public get AssetName(): string {
    return this.asset.AssetName;
  }

  public get EffectName(): string {
    return this.effectName;
  }

  public ToString(): string {
    return `${this.AssetName}\\${this.EffectName}`;
  }
}
