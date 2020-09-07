import { Color, Point, Size } from '../utils';
import { Rectangle, Screen } from './';

export class Container extends Rectangle {
  public items: Container[];

  constructor(pos: Point, size: Size, color: Color) {
    super(pos, size, color);
    this.items = [];
  }

  public addItem(item): void {
    this.items.push(item);
  }

  public draw(offset?: Size): void {
    if (!this.enabled) {
      return;
    }
    offset = offset || new Size();
    const height = Screen.Height;
    const width = Screen.ScaledWidth;

    const w = this.size.width / width;
    const h = this.size.height / height;
    const x = (this.pos.X + offset.width) / width + w * 0.5;
    const y = (this.pos.Y + offset.height) / height + h * 0.5;

    DrawRect(x, y, w, h, this.color.r, this.color.g, this.color.b, this.color.a);

    for (const item of this.items) {
      item.draw(new Size(this.pos.X + offset.width, this.pos.Y + offset.height));
    }
  }
}
