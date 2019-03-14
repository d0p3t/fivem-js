import { Color } from '../utils/Color';
import { Point } from '../utils/Point';
import { IElement } from './interfaces/IElement';
import { ResText } from './menu/modules/ResText';
import { Screen } from './Screen';

export class Text extends IElement {
  public caption: string;
  public pos: Point;
  public scale: number;
  public color: Color;
  public font: number;
  public centered: boolean;
  constructor(caption, pos, scale, color, font, centered) {
    super();
    this.caption = caption;
    this.pos = pos;
    this.scale = scale;
    this.color = color || Color.Black;
    this.font = font || 0;
    this.centered = centered || false;
  }

  public Draw(caption, pos?, scale?, color?: Color, font?, centered?): void {
    if (caption && !pos && !scale && !color && !font && !centered) {
      pos = new Point(this.pos.X + caption.Width, this.pos.Y + caption.Height);
      scale = this.scale;
      color = this.color;
      font = this.font;
      centered = this.centered;
    }
    const x = pos.X / Screen.ScaledWidth;
    const y = pos.Y / Screen.Height;

    SetTextFont(Number(font));
    SetTextScale(scale, scale);
    SetTextColour(color.r, color.g, color.b, color.a);
    SetTextCentre(centered);
    SetTextEntry('STRING');
    ResText.AddLongString(caption);
    DrawText(x, y);
  }
}

exports = Text;
