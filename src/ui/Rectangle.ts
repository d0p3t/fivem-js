import { Color, Point, Size } from '../utils';
import { IDrawable, Screen } from './';

export class Rectangle implements IDrawable {
  public pos: Point;
  public size: Size;
  public color: Color;

  constructor(pos: Point, size: Size, color: Color) {
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

  public draw(offset?: Size, resolution?: Size): void;
  public draw(pos: Point, size: Size, color: Color, resolution?: Size): void;
  public draw(arg1?: Point | Size, arg2?: Size, color?: Color, resolution?: Size): void {
    resolution = color === undefined ? arg2 : resolution;
    resolution = resolution || new Size(Screen.ScaledWidth, Screen.Height);

    if (color === undefined) {
      if (arg1 && arg1 instanceof Size) {
        arg1 = new Point(this.pos.X + arg1.width, this.pos.Y + arg1.height);
      } else {
        arg1 = this.pos;
      }
      arg2 = this.size;
    } else {
      if (!arg1) {
        arg1 = this.pos;
      } else {
        arg1 = arg1 as Point;
      }
      arg2 = arg2 || this.size;
    }

    color = color || this.color;

    const w = arg2.width / resolution.width;
    const h = arg2.height / resolution.height;
    const x = arg1.X / resolution.width + w * 0.5;
    const y = arg1.Y / resolution.height + h * 0.5;

    DrawRect(x, y, w, h, color.r, color.g, color.b, color.a);
  }
}
