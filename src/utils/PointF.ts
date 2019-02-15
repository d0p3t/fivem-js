export interface IPointF {
  x: number;
  y: number;
  z: number;
}

export class PointF implements IPointF {
  constructor(public x: number, public y: number, public z: number) {}
}
