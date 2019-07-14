import { ParticleEffectAsset } from './';
import { IInvertAxis } from './enums';
import { Color, Vector3 } from './utils';

// TODO: Lots of Matrix stuff through memory access
/**
 * UNFINISHED! Class to manage particle effects.
 */
export abstract class ParticleEffect {
  protected readonly asset: ParticleEffectAsset;
  protected readonly effectName: string;
  protected offset: Vector3;
  protected rotation: Vector3;
  protected color: Color;
  protected scale: number;
  protected range: number;
  protected invertAxis: IInvertAxis;
  private handle: number;

  /**
   * Creates a particle effect.
   *
   * @param asset Particle effect asset.
   * @param effectName Name of effect.
   */
  constructor(asset: ParticleEffectAsset, effectName: string) {
    this.handle = -1;
    this.asset = asset;
    this.effectName = effectName;
  }

  /**
   * Get the particle effect handle.
   */
  public get Handle(): number {
    return this.handle;
  }

  /**
   * Get whether particle effect is currently active.
   */
  public get IsActive(): boolean {
    return this.Handle !== -1 && !!DoesParticleFxLoopedExist(this.Handle);
  }

  public abstract start(): boolean;

  /**
   * Stop a particle effect.
   */
  public stop(): void {
    if (this.IsActive) {
      RemoveParticleFx(this.Handle, false);
    }
    this.handle = -1;
  }

  /**
   * Get the rotation of the particle effect.
   */
  public get Rotation(): Vector3 {
    return this.rotation;
  }

  /**
   * Set the rotation of the particle effect.
   */
  public set Rotation(rotation: Vector3) {
    this.rotation = rotation;
    if (this.IsActive) {
      const off = this.offset; // TODO Matrix stuff to access from memory
      SetParticleFxLoopedOffsets(
        this.Handle,
        off.x,
        off.y,
        off.z,
        rotation.x,
        rotation.y,
        rotation.z,
      );
    }
  }

  /**
   * Get the range of the particle effect.
   */
  public get Range(): number {
    return this.range;
  }

  /**
   * Set the range of the particle effect.
   */
  public set Range(range: number) {
    this.range = range;
    SetParticleFxLoopedRange(this.Handle, range);
  }

  /**
   * Get the invert axis flag of the particle effect.
   */
  public get InvertAxis(): IInvertAxis {
    return this.invertAxis;
  }

  /**
   * Set the inverted axis of the particle effect.
   */
  public set InvertAxis(invertAxis: IInvertAxis) {
    this.invertAxis = invertAxis;
    if (this.IsActive) {
      this.stop();
      this.start();
    }
  }

  /**
   * Set a paramaeter of a particle effect.
   *
   * @param parameterName Name of parameter.
   * @param value Value of parameter.
   */
  public setParameter(parameterName: string, value: number): void {
    if (this.IsActive) {
      SetParticleFxLoopedEvolution(this.Handle, parameterName, value, false);
    }
  }

  /**
   * Get the name of the particle effect asset. Same as ParticleEffect.AssetName.
   */
  public get AssetName(): string {
    return this.asset.AssetName;
  }

  /**
   * Get the name of the particle effect.
   */
  public get EffectName(): string {
    return this.effectName;
  }

  /**
   * Return the particle effect as string. `AssetName`\\`EffectName`.
   */
  public toString(): string {
    return `${this.AssetName}\\${this.EffectName}`;
  }
}
