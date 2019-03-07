import BadgeStyle from '../../../enums/BadgeStyle';
import Color from '../../../utils/Color';
import Point from '../../../utils/Point';
import Size from '../../../utils/Size';
import Sprite from '../../Sprite';
import ResRectangle from '../modules/ResRectangle';
import UIMenuItem from './UIMenuItem';

export default class UIMenuSliderItem extends UIMenuItem {
  private arrowLeft: Sprite;
  private arrowRight: Sprite;

  private rectangleBackground: ResRectangle;
  private rectangleSlider: ResRectangle;
  private rectangleDivider: ResRectangle;

  private items: any[];

  private index: number;

  get Index() {
    return this.index % this.items.length;
  }
  set Index(value) {
    this.index = 100000000 - (100000000 % this.items.length) + value;
  }

  constructor(text: string, items: any[], index: number, description: string = '', divider: boolean = false) {
    super(text, description);
    const y: number = 0;
    this.items = items;
    this.arrowLeft = new Sprite('commonmenutu', 'arrowleft', new Point(0, 105 + y), new Size(15, 15));
    this.arrowRight = new Sprite('commonmenutu', 'arrowright', new Point(0, 105 + y), new Size(15, 15));
    this.rectangleBackground = new ResRectangle(new Point(0, 0), new Size(150, 9), new Color(4, 32, 57, 255));
    this.rectangleSlider = new ResRectangle(new Point(0, 0), new Size(75, 9), new Color(57, 116, 200, 255));
    if (divider) {
      this.rectangleDivider = new ResRectangle(new Point(0, 0), new Size(2.5, 20), Color.WhiteSmoke);
    } else {
      this.rectangleDivider = new ResRectangle(new Point(0, 0), new Size(2.5, 20), Color.Transparent);
    }
    this.Index = index;
  }

  public SetVerticalPosition(y: number) {
    this.rectangleBackground.pos = new Point(250 + this.Offset.X + this.Parent.WidthOffset, y + 158.5 + this.Offset.Y);
    this.rectangleSlider.pos = new Point(250 + this.Offset.X + this.Parent.WidthOffset, y + 158.5 + this.Offset.Y);
    this.rectangleDivider.pos = new Point(323.5 + this.Offset.X + this.Parent.WidthOffset, y + 153 + this.Offset.Y);
    this.arrowLeft.pos = new Point(235 + this.Offset.X + this.Parent.WidthOffset, 155.5 + y + this.Offset.Y);
    this.arrowRight.pos = new Point(400 + this.Offset.X + this.Parent.WidthOffset, 155.5 + y + this.Offset.Y);

    super.SetVerticalPosition(y);
  }

  public IndexToItem(index: number) {
    return this.items[index];
  }

  public Draw() {
    super.Draw();
    this.arrowLeft.color = this.Enabled
      ? this.Selected
        ? Color.Black
        : Color.WhiteSmoke
      : new Color(255, 163, 159, 148);
    this.arrowRight.color = this.Enabled
      ? this.Selected
        ? Color.Black
        : Color.WhiteSmoke
      : new Color(255, 163, 159, 148);
    const offset =
      ((this.rectangleBackground.size.Width - this.rectangleSlider.size.Width) / (this.items.length - 1)) * this.Index;
    this.rectangleSlider.pos = new Point(
      250 + this.Offset.X + offset + +this.Parent.WidthOffset,
      this.rectangleSlider.pos.Y,
    );
    if (this.Selected) {
      this.arrowLeft.Draw();
      this.arrowRight.Draw();
    } else {
      this.rectangleBackground.Draw();
      this.rectangleSlider.Draw();
      this.rectangleDivider.Draw();
    }
  }

  // public SetRightBadge(badge: BadgeStyle) {}

  // public SetRightLabel(text: string) {}
}
