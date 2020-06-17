import { Alignment, Font } from '../enums';
import { Color, Point } from '../utils';
import { Screen } from './';
import { IElement } from './interfaces';

export class Text extends IElement {
  public static addLongString(str: string): void {
    const strLen = 99;
    for (let i = 0; i < str.length; i += strLen) {
      const substr = str.substr(i, Math.min(strLen, str.length - i));
      AddTextComponentSubstringPlayerName(substr);
    }
  }

  public caption: string;
  public pos: Point;
  public scale: number;
  public color: Color;
  public font: Font;
  public alignment: Alignment;

  /**
   *
   * @param caption Text to display
   * @param pos Position of text relative to alignment. In pixels.
   * @param scale Size of text. Default 1.0
   * @param color Color of text. Default black.
   * @param font Font of text. Default Chalet London.
   * @param alignment Alignment of text. Default Left.
   */
  constructor(
    caption: string,
    pos: Point,
    scale = 1,
    color: Color = Color.black,
    font: Font = Font.ChaletLondon,
    alignment: Alignment = Alignment.Left,
  ) {
    super();
    this.caption = caption;
    this.pos = pos;
    this.scale = scale;
    this.color = color;
    this.font = font;
    this.alignment = alignment;
  }

  public draw(): void {
    const x = this.pos.X / Screen.ScaledWidth;
    const y = this.pos.Y / Screen.Height;

    BeginTextCommandDisplayText('STRING');
    SetTextFont(Number(this.font));
    SetTextScale(this.scale, this.scale);
    SetTextColour(this.color.r, this.color.g, this.color.b, this.color.a);

    switch (this.alignment) {
      case Alignment.Centered:
        SetScriptGfxAlign(67, 84);
        break;
      case Alignment.Right:
        SetTextJustification(2);
        SetTextWrap(0, GetSafeZoneSize() - x);
        break;
      default:
        SetScriptGfxAlign(76, 84);
        break;
    }

    Text.addLongString(this.caption);
    EndTextCommandDisplayText(x, y);
    ResetScriptGfxAlign();
  }
}

exports = Text;
