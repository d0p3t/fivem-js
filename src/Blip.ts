import { Vector3 } from './utils/Math';

export class Blip {
  protected handle: number;
  constructor(handle: number) {
    this.handle = handle;
  }

  public get Position(): Vector3 {
    const coords = GetBlipInfoIdCoord(this.handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  public set Position(location: Vector3) {
    SetBlipCoords(this.handle, location.x, location.y, location.z);
  }

  public set Rotation(rotation: number) {
    SetBlipRotation(this.handle, rotation);
  }

  public set Scale(scale: number) {
    SetBlipScale(this.handle, scale);
  }

  public get Type(): number {
    return GetBlipInfoIdType(this.handle);
  }

  public get Alpha(): number {
    return GetBlipAlpha(this.handle);
  }

  public set Alpha(alpha: number) {
    SetBlipAlpha(this.handle, alpha);
  }

  public set Priority(priority: number) {
    SetBlipPriority(this.handle, priority);
  }
}
