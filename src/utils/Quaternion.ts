import { Vector3 } from './Vector3';

export class Quaternion {
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  constructor(value: number);
  constructor(vector: Vector3, w: number);
  constructor(x: number, y: number, z: number, w: number);
  constructor(valueXOrVector: number | Vector3, yOrW?: number, z?: number, w?: number) {
    if (valueXOrVector instanceof Vector3) {
      this.x = valueXOrVector.x;
      this.y = valueXOrVector.y;
      this.z = valueXOrVector.z;
      this.w = yOrW ?? 0;
    } else if (yOrW === undefined) {
      this.x = valueXOrVector;
      this.y = valueXOrVector;
      this.z = valueXOrVector;
      this.w = valueXOrVector;
    } else {
      this.x = valueXOrVector;
      this.y = yOrW;
      this.z = z ?? 0;
      this.w = w ?? 0;
    }
  }
}
