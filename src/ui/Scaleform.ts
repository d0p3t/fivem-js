import { PointF, Vector3 } from '../utils';

/**
 * Scaleforms will automatically load when calling any of the render functions.
 *
 * Example:
 *
 * ```typescript
 * import { Scaleform } from 'fivem-js/ui';
 *
 * const scaleform = new Cfx.Scaleform("MIDSIZED_MESSAGE");
 *
 * scaleform.callFunction("SHOW_MIDSIZED_MESSAGE", ["Title", "Message"]);
 *
 * setTick(() => {
 *  await scaleform.render2D();
 * });
 * ```
 */
export class Scaleform {
  public static render2DMasked(scaleform1: Scaleform, scaleform2: Scaleform): Promise<void> {
    return new Promise(async resolve => {
      if (scaleform1.IsLoaded && scaleform2.IsLoaded) {
        DrawScaleformMovieFullscreenMasked(
          scaleform1.Handle,
          scaleform2.Handle,
          255,
          255,
          255,
          255,
        );
      } else {
        await scaleform1.load();
        await scaleform2.load();
      }
      resolve();
    });
  }

  protected handle: number;
  protected name: string;
  protected loaded: boolean;

  constructor(name: string) {
    this.name = name;
    this.handle = RequestScaleformMovie(this.name);
  }

  /**
   * Get the handle of the scaleform.
   */
  public get Handle(): number {
    return this.handle;
  }

  /**
   * Get whether the handle is a valid handle.
   */
  public get IsValid(): boolean {
    return this.handle !== 0;
  }

  /**
   * Get whether the scaleform is loaded.
   */
  public get IsLoaded(): boolean {
    if (!this.loaded) {
      this.loaded = !!HasScaleformMovieLoaded(this.handle);
    }

    return this.loaded;
  }

  /**
   * Dispose the scaleform allowing the GTA engine to free memory when wanted.
   */
  public dispose(): void {
    if (this.IsLoaded) {
      SetScaleformMovieAsNoLongerNeeded(this.handle);
      this.loaded = false;
    }
  }

  /**
   * Call a function on the scaleform.
   *
   * @param name Name of the function
   * @param args Additional arguments
   */
  public callFunction(name: string, ...args: unknown[]): void {
    BeginScaleformMovieMethod(this.handle, name);
    args.forEach(arg => {
      switch (typeof arg) {
        case 'number':
          PushScaleformMovieFunctionParameterInt(arg);
          break;
        case 'string':
          PushScaleformMovieFunctionParameterString(arg);
          break;
        case 'boolean':
          PushScaleformMovieFunctionParameterBool(arg);
          break;
        default:
          throw new Error(
            `Unknown argument type [${typeof arg}] passed to scaleform with handle [${
              this.handle
            }]`,
          );
      }
    });
    EndScaleformMovieMethod();
  }

  /**
   * Sets a duration the scaleform should be shown.
   * Useful for showing a scaleform for a known amount of time, such as messages.
   *
   * This only works for any scaleform using {@linkcode render2D};
   *
   * @param duration Duration in milliseconds
   */
  public setDuration(duration: number): void {
    if (duration <= 0) {
      return;
    }

    const start = GetGameTimer();
    const interval = setInterval(async () => {
      if (GetGameTimer() - start < duration) {
        await this.render2D();
      } else {
        clearInterval(interval);
      }
    }, 0);
  }

  public render2D(): Promise<void> {
    return new Promise(async resolve => {
      if (this.IsLoaded) {
        DrawScaleformMovieFullscreen(this.handle, 255, 255, 255, 255, 0);
      } else {
        await this.load();
      }
      resolve();
    });
  }

  public render2DScreenSpace(location: PointF, size: PointF): Promise<void> {
    return new Promise(async resolve => {
      if (this.IsLoaded) {
        const x = location.x; /* UI.Screen.Width*/
        const y = location.y; /* UI.Screen.Height*/
        const width = size.x; /* UI.Screen.Width*/
        const height = size.y; /* UI.Screen.Height*/

        DrawScaleformMovie(
          this.handle,
          x + width / 2,
          y + height / 2,
          width,
          height,
          255,
          255,
          255,
          255,
          0,
        );
      } else {
        await this.load();
      }
      resolve();
    });
  }

  public render3D(position: Vector3, rotation: Vector3, scale: Vector3): Promise<void> {
    return new Promise(async resolve => {
      if (this.IsLoaded) {
        DrawScaleformMovie_3dNonAdditive(
          this.handle,
          position.x,
          position.y,
          position.z,
          rotation.x,
          rotation.y,
          rotation.z,
          2,
          2,
          1,
          scale.x,
          scale.y,
          scale.z,
          2,
        );
      } else {
        await this.load();
      }
      resolve();
    });
  }

  public render3DAdditive(position: Vector3, rotation: Vector3, scale: Vector3): Promise<void> {
    return new Promise(async resolve => {
      if (this.IsLoaded) {
        DrawScaleformMovie_3d(
          this.handle,
          position.x,
          position.y,
          position.z,
          rotation.x,
          rotation.y,
          rotation.z,
          2,
          2,
          1,
          scale.x,
          scale.y,
          scale.z,
          2,
        );
      } else {
        await this.load();
      }
      resolve();
    });
  }

  public load(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.IsLoaded) {
        resolve(true);
      } else {
        const start = GetGameTimer();
        const interval = setInterval(() => {
          if (this.IsLoaded) {
            clearInterval(interval);
            resolve(true);
          } else if (GetGameTimer() - start > 5000) {
            clearInterval(interval);
            console.log(`^1[fivem-js] Could not load scaleform ${this.name}!^7`);
            resolve(false);
          }
        }, 0);
      }
    });
  }
}
