import { Screen, Text } from '../../';
import { Alignment, Font } from '../../../enums';
import { Color, Point, Size } from '../../../utils';

export class ResText extends Text {
  public textAlignment: Alignment = Alignment.Left;
  public dropShadow: boolean;
  public outline: boolean;
  public wordWrap: Size;

  constructor(
    caption: string,
    pos: Point,
    scale: number,
    color?: Color,
    font?: Font,
    justify?: Alignment,
  ) {
    super(caption, pos, scale, color || new Color(255, 255, 255, 255), font || 0, Alignment.Left);
    if (justify) {
      this.textAlignment = justify;
    }
  }

  public draw(offset?: Size, resolution?: Size): void;
  public draw(
    caption: string,
    pos: Point,
    scale: number,
    color: Color,
    font: Font,
    arg3: boolean,
    dropShadow?: boolean,
    outline?: boolean,
    wordWrap?,
    resolution?: Size,
  ): void;
  public draw(
    arg1?,
    arg2?,
    scale?,
    color?: Color,
    font?: Font,
    arg3?,
    dropShadow?: boolean,
    outline?: boolean,
    wordWrap?,
    resolution?: Size,
  ): void {
    let caption = arg1;
    let centered = arg3;
    let textAlignment = arg3;
    resolution = (scale === undefined ? arg2 : resolution) || new Size(Screen.ScaledWidth, Screen.Height);
    if (!arg1) {
      arg1 = new Size(0, 0);
    }
    if (arg1 && scale === undefined) {
      textAlignment = this.textAlignment;
      caption = this.caption;
      scale = this.scale;
      color = this.color;
      font = this.font;
      if (centered === true || centered === false) {
        centered = this.alignment === Alignment.Centered;
      } else {
        centered = undefined;
        dropShadow = this.dropShadow;
        outline = this.outline;
        wordWrap = this.wordWrap;
      }
    }

    const x = this.pos.X / resolution.width;
    const y = this.pos.Y / resolution.height;

    SetTextFont(Number(font));
    SetTextScale(1.0, scale);
    SetTextColour(color.r, color.g, color.b, color.a);

    if (centered !== undefined) {
      SetTextCentre(centered);
    } else {
      if (dropShadow) {
        SetTextDropshadow(2, 0, 0, 0, 0);
      }

      if (outline) {
        SetTextOutline();
      }

      switch (textAlignment) {
        case Alignment.Centered:
          SetTextCentre(true);
          break;
        case Alignment.Right:
          SetTextRightJustify(true);
          SetTextWrap(0.0, x);
          break;
      }

      if (wordWrap) {
        const xsize = (this.pos.X + wordWrap.Width) / resolution.width;
        SetTextWrap(x, xsize);
      }
    }

    SetTextEntry('STRING');
    Text.addLongString(caption);
    DrawText(x, y);
  }
}
