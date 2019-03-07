import Color from '../utils/Color';
import Point from '../utils/Point';
import Size from '../utils/Size';
import IElement from './interfaces/IElement';

export default class Rectangle extends IElement {
  public pos: Point;
  public size: Size;
  public color: Color;
  constructor(pos, size, color) {
    super();
    this.enabled = true;
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

  public Draw(pos, size, color): void {
    if (!pos) {
      pos = new Size(0, 0);
    }
    if (!size && !color) {
      pos = new Point(this.pos.X + pos.Width, this.pos.Y + pos.Height);
      size = this.size;
      color = this.color;
    }
    const w = size.Width / 1280.0;
    const h = size.Height / 720.0;
    const x = pos.X / 1280.0 + w * 0.5;
    const y = pos.Y / 720.0 + h * 0.5;

    DrawRect(x, y, w, h, color.R, color.G, color.B, color.A);
  }
}
