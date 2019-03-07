import Point from '../../../utils/Point';
import Size from '../../../utils/Size';
import Rectangle from '../../Rectangle';
import { Screen } from '../../Screen';

export default class ResRectangle extends Rectangle {
  constructor(pos, size, color) {
    super(pos, size, color);
  }

  public Draw(offset?): void;
  public Draw(pos, size, color): void;
  public Draw(pos?, size?, color?) {
    if (!pos) {
      pos = new Size();
    }
    if (pos && !size && !color) {
      pos = new Point(this.pos.X + pos.Width, this.pos.Y + pos.Height);
      size = this.size;
      color = this.color;
    }

    const screenw = Screen.Width;
    const screenh = Screen.Height;
    const height = 1080.0;
    const ratio = screenw / screenh;
    const width = height * ratio;

    const w = size.Width / width;
    const h = size.Height / height;
    const x = pos.X / width + w * 0.5;
    const y = pos.Y / height + h * 0.5;

    DrawRect(x, y, w, h, color.R, color.G, color.B, color.A);
  }
}
