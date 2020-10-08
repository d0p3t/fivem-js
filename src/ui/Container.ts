import { Color, Point, Size } from '../utils';
import { IDrawable, Screen } from './';

export class Container implements IDrawable {
  public pos: Point;
  public size: Size;
  public color: Color;
  public items: IDrawable[] = [];

  constructor(pos: Point, size: Size, color: Color) {
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

  public addItem(items: IDrawable | IDrawable[]): void {
    if (!Array.isArray(items)) {
      items = [items];
    }
    this.items.push(...items);
  }

  public draw(offset?: Size, resolution?: Size): void {
    resolution = resolution || new Size(Screen.ScaledWidth, Screen.Height);
    offset = offset || new Size();

    const w = this.size.width / resolution.width;
    const h = this.size.height / resolution.height;
    const x = (this.pos.X + offset.width) / resolution.width + w * 0.5;
    const y = (this.pos.Y + offset.height) / resolution.height + h * 0.5;

    DrawRect(x, y, w, h, this.color.r, this.color.g, this.color.b, this.color.a);

    for (const item of this.items) {
      item.draw(new Size(this.pos.X + offset.width, this.pos.Y + offset.height), resolution);
    }
  }
}
