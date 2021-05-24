import { Menu, Sprite } from '../../';
import { Color, LiteEvent, Point, Size } from '../../../utils';
import { UIMenuItem } from './';
import { CheckboxStyle } from '../../../enums';

export class UIMenuCheckboxItem extends UIMenuItem {
  public readonly checkboxChanged = new LiteEvent();

  protected supportsRightBadge = false;
  protected supportsRightLabel = false;

  private _checked = false;
  private _style = CheckboxStyle.Tick;

  private readonly _checkboxSprite: Sprite;

  constructor(
    text: string,
    checked = false,
    description?: string,
    style: CheckboxStyle = CheckboxStyle.Tick,
  ) {
    super(text, description);
    this._checkboxSprite = new Sprite('commonmenu', '', new Point(410, 95), new Size(50, 50));
    this.Checked = checked;
    this.Style = style;
  }

  public get Checked(): boolean {
    return this._checked;
  }

  public set Checked(value: boolean) {
    this._checked = value || false;
  }

  public get Style(): CheckboxStyle {
    return this._style;
  }

  public set Style(value: CheckboxStyle) {
    this._style = Number(value);
  }

  public setVerticalPosition(y: number): void {
    super.setVerticalPosition(y);
    this._checkboxSprite.pos.Y = y + 138 + this.offset.Y;
  }

  public draw(): void {
    super.draw();
    this._checkboxSprite.pos.X = 380 + this.offset.X + (this.parent ? this.parent.WidthOffset : 0);
    this._checkboxSprite.textureName = this._getSpriteName();
    this._checkboxSprite.color = this._getSpriteColor();
    this._checkboxSprite.draw(Menu.screenResolution);
  }

  private _getSpriteName(): string {
    let name = 'blank';
    if (this._checked) {
      switch (this._style) {
        case CheckboxStyle.Tick:
          name = 'tick';
          break;
        case CheckboxStyle.Cross:
          name = 'cross';
          break;
      }
    }
    return `shop_box_${name}${this.selected ? 'b' : ''}`;
  }

  private _getSpriteColor(): Color {
    return this.enabled ? Color.white : Color.fromRgb(109, 109, 109);
  }
}
