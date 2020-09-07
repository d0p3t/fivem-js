import { Color, Point, Size } from '../utils';
import { Screen } from './';
import { IElement } from './interfaces';

export class Rectangle extends IElement {
  public pos: Point;
  public size: Size;
  public color: Color;
  constructor(pos: Point, size: Size, color: Color) {
    super();
    this.enabled = true;
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

  public draw(pos, size, color: Color): void {
    if (!pos) {
      pos = new Size(0, 0);
    }
    let w2 = 0;
    let y2 = 0;
    if (pos instanceof Point) {
      w2 = pos.X;
      y2 = pos.Y;
    } else {
      w2 = pos.width;
      y2 = pos.height;
    }
    if (!size && !color) {
      pos = new Point(this.pos.X + w2, this.pos.Y + y2);
      size = this.size;
      color = this.color;
    }
    const height = Screen.Height;
    const width = Screen.ScaledWidth;

    const w = size.width / width;
    const h = size.height / height;
    const x = pos.X / width;
    const y = pos.Y / height;

    DrawRect(x, y, w, h, color.r, color.g, color.b, color.a);
  }
}
