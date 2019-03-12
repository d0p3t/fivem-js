import { Color } from '../../../utils/Color';
import { Point } from '../../../utils/Point';
import { Size } from '../../../utils/Size';
import { Screen } from '../../Screen';
import { Text } from '../../Text';

export enum Alignment {
  Left,
  Centered,
  Right,
}

export class ResText extends Text {
  public static AddLongString(str: string) {
    const strLen = 99;
    for (let i = 0; i < str.length; i += strLen) {
      const substr = str.substr(i, Math.min(strLen, str.length - i));
      AddTextComponentSubstringPlayerName(substr);
    }
  }

  public TextAlignment: Alignment = Alignment.Left;
  public DropShadow: boolean;
  public Outline: boolean;
  public WordWrap: Size;

  constructor(caption, pos, scale, color?, font?, justify?) {
    super(caption, pos, scale, color || new Color(255, 255, 255, 255), font || 0, false);
    if (justify) {
      this.TextAlignment = justify;
    }
  }

  public Draw(offset?: Size): void;
  public Draw(caption, pos, scale, color, font, arg2): void;
  public Draw(arg1?, pos?, scale?, color?, font?, arg2?, dropShadow?, outline?, wordWrap?) {
    let caption = arg1;
    let centered = arg2;
    let textAlignment = arg2;
    if (!arg1) {
      arg1 = new Size(0, 0);
    }
    if (arg1 && !pos) {
      textAlignment = this.TextAlignment;
      caption = this.caption;
      pos = new Point(this.pos.X + arg1.Width, this.pos.Y + arg1.Height);
      scale = this.scale;
      color = this.color;
      font = this.font;
      if (centered === true || centered === false) {
        centered = this.centered;
      } else {
        centered = undefined;
        dropShadow = this.DropShadow;
        outline = this.Outline;
        wordWrap = this.WordWrap;
      }
    }

    const height = 1080.0;
    const ratio = Screen.AspectRatio;
    const width = height * ratio;

    const x = this.pos.X / width;
    const y = this.pos.Y / height;

    SetTextFont(Number(font));
    SetTextScale(1.0, scale);
    SetTextColour(color.R, color.G, color.B, color.A);

    if (centered !== undefined) {
      SetTextCentre(centered);
    } else {
      if (dropShadow) {
        SetTextDropshadow(2, 0, 0, 0, 0);
      }

      // if (outline) console.warn('not working!');

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
        const xsize = (this.pos.X + wordWrap.Width) / width;
        SetTextWrap(x, xsize);
      }
    }

    SetTextEntry('STRING');
    ResText.AddLongString(caption);
    DrawText(x, y);
  }
}
