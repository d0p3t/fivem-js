import { Alignment, Font } from '../enums';
import { Color, Point, Size } from '../utils';
import { IDrawable, Screen } from './';

export class Text implements IDrawable {
  public static draw(
    caption: string,
    pos: Point,
    scale = 1,
    color = Color.white,
    font = Font.ChaletLondon,
    alignment = Alignment.Left,
    dropShadow = false,
    outline = false,
    wordWrap?: Size,
    resolution?: Size,
  ): void {
    resolution = resolution || new Size(Screen.ScaledWidth, Screen.Height);
    const x = pos.X / resolution.width;
    const y = pos.Y / resolution.height;

    SetTextFont(Number(font));
    SetTextScale(1.0, scale);
    SetTextColour(color.r, color.g, color.b, color.a);

    if (dropShadow) {
      SetTextDropshadow(2, 0, 0, 0, 0);
    }

    if (outline) {
      SetTextOutline();
    }

    switch (alignment) {
      case Alignment.Centered:
        SetTextCentre(true);
        break;
      case Alignment.Right:
        SetTextRightJustify(true);
        if (!wordWrap) {
          SetTextWrap(0.0, x);
        }
        break;
    }

    if (wordWrap) {
      SetTextWrap(x, (pos.X + wordWrap.width) / resolution.width);
    }

    SetTextEntry('STRING');
    Text.addLongString(caption);
    DrawText(x, y);
  }

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
  public dropShadow: boolean;
  public outline: boolean;
  public wordWrap: Size;

  /**
   *
   * @param caption Text to display
   * @param pos Position of text relative to alignment. In pixels.
   * @param scale Size of text. Default 1.0
   * @param color Color of text. Default black.
   * @param font Font of text. Default Chalet London.
   * @param alignment Alignment of text. Default Left.
   * @param dropShadow
   * @param outline
   * @param wordWrap
   */
  constructor(
    caption: string,
    pos: Point,
    scale = 1,
    color = Color.white,
    font = Font.ChaletLondon,
    alignment = Alignment.Left,
    dropShadow = false,
    outline = false,
    wordWrap?: Size,
  ) {
    this.caption = caption;
    this.pos = pos;
    this.scale = scale;
    this.color = color;
    this.font = font;
    this.alignment = alignment;
    this.dropShadow = dropShadow;
    this.outline = outline;
    this.wordWrap = wordWrap;
  }

  public draw(offset?: Size, resolution?: Size): void;
  public draw(
    caption: string,
    pos: Point,
    scale: number,
    color?: Color,
    font?: Font,
    alignment?: Alignment,
    dropShadow?: boolean,
    outline?: boolean,
    wordWrap?: Size,
    resolution?: Size,
  ): void;
  public draw(
    arg1?: Size | string,
    arg2?: Size | Point,
    scale?: number,
    color?: Color,
    font?: Font,
    alignment?: Alignment,
    dropShadow?: boolean,
    outline?: boolean,
    wordWrap?: Size,
    resolution?: Size,
  ): void {
    resolution = arg2 instanceof Size ? arg2 : resolution;

    if (scale === undefined) {
      if (arg1 && arg1 instanceof Size) {
        arg2 = new Point(this.pos.X + arg1.width, this.pos.Y + arg1.height);
      } else {
        arg2 = this.pos;
      }
      arg1 = this.caption;
      scale = this.scale;
      color = this.color;
      font = this.font;
      alignment = this.alignment;
      dropShadow = this.dropShadow;
      outline = this.outline;
      wordWrap = this.wordWrap;
    } else {
      arg1 = arg1 || this.caption;
      if (!arg2) {
        arg2 = this.pos;
      } else {
        arg2 = arg2 as Point;
      }
      scale = scale !== undefined && scale !== null ? scale : this.scale;
      color = color || this.color;
      font = font !== undefined && font !== null ? font : this.font;
      alignment = alignment !== undefined && alignment !== null ? alignment : this.alignment;
      dropShadow = typeof dropShadow === 'boolean' ? dropShadow : dropShadow;
      outline = typeof outline === 'boolean' ? outline : outline;
      wordWrap = wordWrap || this.wordWrap;
    }

    Text.draw(
      arg1 as string,
      arg2,
      scale,
      color,
      font,
      alignment,
      dropShadow,
      outline,
      wordWrap,
      resolution,
    );
  }
}
