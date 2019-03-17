import BadgeStyle from '../../../enums/BadgeStyle';
import { Color } from '../../../utils/Color';
import { LiteEvent } from '../../../utils/LiteEvent';
import { Point } from '../../../utils/Point';
import { Size } from '../../../utils/Size';
import { Sprite } from '../../Sprite';
import { UIMenuItem } from './UIMenuItem';

export class UIMenuCheckboxItem extends UIMenuItem {
  public Checked: boolean = false;

  private readonly checkedSprite: Sprite;
  private readonly OnCheckedChanged = new LiteEvent();

  public get CheckedChanged() {
    return this.OnCheckedChanged.expose();
  }

  constructor(text: string, check: boolean = false, description: string = '') {
    super(text, description);
    const y = 0;
    this.checkedSprite = new Sprite('commonmenu', 'shop_box_blank', new Point(410, y + 95), new Size(50, 50));
    this.Checked = check;
  }

  public SetVerticalPosition(y: number) {
    super.SetVerticalPosition(y);
    this.checkedSprite.pos = new Point(380 + this.Offset.X + this.Parent.WidthOffset, y + 138 + this.Offset.Y);
  }

  public Draw() {
    super.Draw();
    this.checkedSprite.pos = this.checkedSprite.pos = new Point(
      380 + this.Offset.X + this.Parent.WidthOffset,
      this.checkedSprite.pos.Y,
    );
    const isDefaultHightlitedForeColor = this.HighlightedForeColor === UIMenuItem.DefaultHighlightedForeColor;
    if (this.Selected && isDefaultHightlitedForeColor) {
      this.checkedSprite.textureName = this.Checked ? 'shop_box_tickb' : 'shop_box_blankb';
    } else {
      this.checkedSprite.textureName = this.Checked ? 'shop_box_tick' : 'shop_box_blank';
    }
    this.checkedSprite.color = this.Enabled
      ? this.Selected && !isDefaultHightlitedForeColor
        ? this.HighlightedForeColor
        : this.ForeColor
      : new Color(255, 163, 159, 148);
    this.checkedSprite.Draw();
  }

  public SetRightBadge(badge: BadgeStyle) {
    return this;
  }

  public SetRightLabel(text: string) {
    return this;
  }
}
