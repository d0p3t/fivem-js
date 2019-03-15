import { Size } from '../utils/Size';
import { Rectangle } from './Rectangle';
import { Screen } from './Screen';

export class Container extends Rectangle {
  public Items: any[];

  constructor(pos, size, color) {
    super(pos, size, color);
    this.Items = [];
  }

  public addItem(item): void {
    this.Items.push(item);
  }

  public Draw(offset?: Size): void {
    if (!this.enabled) {
      return;
    }
    offset = offset || new Size();
    const height = Screen.Height;
    const width = Screen.ScaledWidth;

    const w = this.size.Width / width;
    const h = this.size.Height / height;
    const x = (this.pos.X + offset.Width) / width + w * 0.5;
    const y = (this.pos.Y + offset.Height) / height + h * 0.5;

    DrawRect(x, y, w, h, this.color.r, this.color.g, this.color.b, this.color.a);

    for (const item of this.Items) {
      item.Draw(new Size(this.pos.X + offset.Width, this.pos.Y + offset.Height));
    }
  }
}
