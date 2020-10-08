import { Sprite } from '../../';
import { Color, LiteEvent, Point, Size } from '../../../utils';
import { UIMenuItem } from './';

export class UIMenuCheckboxItem extends UIMenuItem {
  public checked = false;

  private readonly checkedSprite: Sprite;
  private readonly oncheckedChanged = new LiteEvent();

  public get checkedChanged(): LiteEvent {
    return this.oncheckedChanged.expose();
  }

  constructor(text: string, check = false, description = '') {
    super(text, description);
    const y = 0;
    this.checkedSprite = new Sprite(
      'commonmenu',
      'shop_box_blank',
      new Point(410, y + 95),
      new Size(50, 50),
    );
    this.checked = check;
  }

  public setVerticalPosition(y: number): void {
    super.setVerticalPosition(y);
    this.checkedSprite.pos = new Point(
      380 + this.offset.X + this.parent.WidthOffset,
      y + 138 + this.offset.Y,
    );
  }

  public draw(resolution?: Size): void {
    super.draw(resolution);
    this.checkedSprite.pos = this.checkedSprite.pos = new Point(
      380 + this.offset.X + this.parent.WidthOffset,
      this.checkedSprite.pos.Y,
    );
    const isDefaultHightlitedForeColor =
      this.highlightedForeColor === UIMenuItem.defaultHighlightedForeColor;
    if (this.selected && isDefaultHightlitedForeColor) {
      this.checkedSprite.textureName = this.checked ? 'shop_box_tickb' : 'shop_box_blankb';
    } else {
      this.checkedSprite.textureName = this.checked ? 'shop_box_tick' : 'shop_box_blank';
    }
    this.checkedSprite.color = this.enabled
      ? this.selected && !isDefaultHightlitedForeColor
        ? this.highlightedForeColor
        : this.foreColor
      : new Color(255, 163, 159, 148);
    this.checkedSprite.draw(resolution);
  }
}
