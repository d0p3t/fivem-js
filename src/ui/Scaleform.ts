import { PointF, Vector3 } from '../utils';

export class Scaleform {
  protected handle: number;
  protected name: string;
  protected loaded: boolean;

  constructor(name: string) {
    this.name = name;
    this.handle = RequestScaleformMovie(this.name);
  }

  public get Handle(): number {
    return this.handle;
  }

  public get IsValid(): boolean {
    return this.handle !== 0;
  }

  public get IsLoaded(): boolean {
    if (!this.loaded) {
      this.loaded = !!HasScaleformMovieLoaded(this.handle);
    }

    return this.loaded;
  }

  public dispose(): void {
    if (this.IsLoaded) {
      SetScaleformMovieAsNoLongerNeeded(this.handle);
      this.loaded = false;
    }
  }

  public callFunction(name: string, args: any[]): void {
    BeginScaleformMovieMethod(this.handle, name);
    args.forEach((arg) => {
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
      // tslint:disable-next-line: align
    }, 0);
  }

  public render2D(): Promise<void> {
    return new Promise(async (resolve) => {
      if (this.IsLoaded) {
        DrawScaleformMovieFullscreen(this.handle, 255, 255, 255, 255, 0);
      } else {
        await this.load();
      }
      resolve();
    });
  }

  public render2DScreenSpace(location: PointF, size: PointF): Promise<void> {
    return new Promise(async (resolve) => {
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
    return new Promise(async (resolve) => {
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
    return new Promise(async (resolve) => {
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

  private load(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.IsLoaded) {
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
          // tslint:disable-next-line: align
        }, 0);
      }
    });
  }
}
