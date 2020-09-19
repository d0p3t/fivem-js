import { Rectangle, Screen } from '../../';
import { Color, Point, Size } from '../../../utils';

export class ResRectangle extends Rectangle {
  constructor(pos, size, color) {
    super(pos, size, color);
  }

  public draw(offset?, resolution?: Size): void;
  public draw(pos, size: Size, color: Color, resolution?: Size): void;
  public draw(arg1?, arg2?: Size, color?: Color, resolution?: Size): void {
    resolution = (!color ? arg2 : resolution) || new Size(Screen.ScaledWidth, Screen.Height);
    if (!arg1) {
      arg1 = new Size();
    }
    if (arg1 && !color) {
      arg1 = new Point(this.pos.X + arg1.width, this.pos.Y + arg1.height);
      arg2 = this.size;
      color = this.color;
    }

    const w = arg2.width / resolution.width;
    const h = arg2.height / resolution.height;
    const x = arg1.X / resolution.width + w * 0.5;
    const y = arg1.Y / resolution.height + h * 0.5;

    DrawRect(x, y, w, h, color.r, color.g, color.b, color.a);
  }
}
