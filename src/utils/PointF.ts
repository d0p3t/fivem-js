export interface PointF {
  x: number;
  y: number;
  z: number;
}

export class PointF implements PointF {
  public static empty(): PointF {
    return new PointF(0, 0, 0);
  }
  constructor(public x: number, public y: number, public z: number) {}
}
