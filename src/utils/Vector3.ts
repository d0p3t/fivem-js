// Source: https://raw.githubusercontent.com/you21979/typescript-vector/master/vector3.ts
export interface IVec3 {
  x: number;
  y: number;
  z: number;
}

export class Vector3 implements IVec3 {
  public static Create(v1: number | IVec3): Vector3 {
    if (typeof v1 === 'number') {
      return new Vector3(v1, v1, v1);
    }
    return new Vector3(v1.x, v1.y, v1.z);
  }

  public static Clone(v1: IVec3): Vector3 {
    return Vector3.Create(v1);
  }

  public static Add(v1: IVec3, v2: number | IVec3): Vector3 {
    if (typeof v2 === 'number') {
      return new Vector3(v1.x + v2, v1.y + v2, v1.z + v2);
    }
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  public static Subtract(v1: IVec3, v2: IVec3): Vector3 {
    return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  public static Multiply(v1: IVec3, v2: IVec3 | number): Vector3 {
    if (typeof v2 === 'number') {
      return new Vector3(v1.x * v2, v1.y * v2, v1.z * v2);
    }
    return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
  }

  public static Divide(v1: IVec3, v2: IVec3 | number): Vector3 {
    if (typeof v2 === 'number') {
      return new Vector3(v1.x / v2, v1.y / v2, v1.z / v2);
    }
    return new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
  }

  public static DotProduct(v1: IVec3, v2: IVec3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  public static CrossProduct(v1: IVec3, v2: IVec3): Vector3 {
    return new Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.z * v2.z, v1.x * v2.y - v1.z * v2.x);
  }

  public static Normalize(v: Vector3): Vector3 {
    const d: number = v.DistanceSquared(v);
    return Vector3.Divide(v, d);
  }

  constructor(public x: number, public y: number, public z: number) {}

  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * The product of the Euclidean magnitudes of this and another Vector3.
   *
   * @param v Vector3 to find Euclidean magnitude between.
   * @returns Euclidean magnitude with another vector.
   */
  public DistanceSquared(v: IVec3): number {
    const w: Vector3 = this.Subtract(v);
    return Vector3.DotProduct(w, w);
  }

  /**
   * The distance between two Vectors.
   *
   * @param v Vector3 to find distance between.
   * @returns Distance between this and another vector.
   */
  public Distance(v: IVec3): number {
    return Math.sqrt(this.DistanceSquared(v));
  }

  public get Normalized(): Vector3 {
    return Vector3.Normalize(this);
  }

  public CrossProduct(v: IVec3): Vector3 {
    return Vector3.CrossProduct(this, v);
  }

  public Add(v: number | IVec3): IVec3 {
    return Vector3.Add(this, v);
  }

  public Subtract(v: IVec3): Vector3 {
    return Vector3.Subtract(this, v);
  }

  public Multiply(v: number | IVec3): Vector3 {
    return Vector3.Multiply(this, v);
  }

  public Divide(v: number | IVec3): IVec3 {
    return Vector3.Divide(this, v);
  }

  public Replace(v: IVec3): void {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
  }

  public get Length() : number {
    return this.DistanceSquared(this);
  }
}
