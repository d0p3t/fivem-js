import { Color } from '../utils/Color';
import { Point } from '../utils/Point';
import { Size } from '../utils/Size';
import { IElement } from './interfaces/IElement';
import { Screen } from './Screen';

export class Rectangle extends IElement {
  public pos: Point;
  public size: Size;
  public color: Color;
  constructor(pos, size, color: Color) {
    super();
    this.enabled = true;
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

  public Draw(pos, size, color: Color): void {
    if (!pos) {
      pos = new Size(0, 0);
    }
    if (!size && !color) {
      pos = new Point(this.pos.X + pos.Width, this.pos.Y + pos.Height);
      size = this.size;
      color = this.color;
    }
    const height = Screen.Height;
    const width = Screen.ScaledWidth;

    const w = size.Width / width;
    const h = size.Height / height;
    const x = pos.X / width;
    const y = pos.Y / height;

    DrawRect(x, y, w, h, color.r, color.g, color.b, color.a);
  }
}
