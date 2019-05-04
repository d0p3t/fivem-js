import { Color, Point } from '../utils';
import { Screen } from './';
import { IElement } from './interfaces';
import { ResText } from './menu/modules';

export class Text extends IElement {
  public caption: string;
  public pos: Point;
  public scale: number;
  public color: Color;
  public font: number;
  public centered: boolean;
  constructor(caption, pos, scale, color = Color.Black, font = 0, centered = false) {
    super();
    this.caption = caption;
    this.pos = pos;
    this.scale = scale;
    this.color = color;
    this.font = font;
    this.centered = centered;
  }

  public Draw(caption, pos = new Point(this.pos.X + caption.Width, this.pos.Y + caption.Height), scale = this.scale, color: Color = this.color, font = this.font, centered = this.centered): void {
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
