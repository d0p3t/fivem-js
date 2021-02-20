export { Vector3 } from './Vector3';
export { String } from './String';
export { LiteEvent } from './LiteEvent';
export { PointF } from './PointF';
export { Crypto } from './Crypto';
export { Point } from './Point';
export { Color } from './Color';
export { Maths } from './Maths';
export { Size } from './Size';
export { Quaternion } from './Quaternion';

export const Wait = (milliseconds: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, milliseconds));
