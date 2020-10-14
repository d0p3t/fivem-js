import { Menu, Sprite, Text } from '../../';
import { Alignment, Font } from '../../../enums';
import { Color, LiteEvent, measureString, Point, Size } from '../../../utils';
import { ListItem } from '../modules/';
import { UIMenuItem } from './';

export class UIMenuListItem extends UIMenuItem {
  public readonly listChanged = new LiteEvent();
  public readonly listSelected = new LiteEvent();

  protected supportsRightBadge = false;
  protected supportsRightLabel = false;

  private _itemText: Text;
  private _leftArrow: Sprite;
  private _rightArrow: Sprite;

  private _index = 0;
  private _arrowOnlyOnSelected: boolean;
  private _items: ListItem[] = [];
  private _textWidth: number;

  constructor(
    text: string,
    items: ListItem[],
    startIndex = 0,
    description?: string,
    arrowOnlyOnSelected = true,
  ) {
    super(text, description);
    this._leftArrow = new Sprite('commonmenu', 'arrowleft', new Point(), new Size(30, 30));
    this._rightArrow = new Sprite('commonmenu', 'arrowright', new Point(), new Size(30, 30));
    this._itemText = new Text(
      '',
      new Point(),
      0.35,
      Color.white,
      Font.ChaletLondon,
      Alignment.Right,
    );
    this.ArrowOnlyOnSelected = arrowOnlyOnSelected;
    this.Items = items;
    this.Index = startIndex;
  }

  public get Items(): ListItem[] {
    return this._items;
  }

  public set Items(value: ListItem[]) {
    if (!value) {
      throw new Error("Items can't be null");
    }
    this._items = value;
  }

  public get SelectedItem(): ListItem {
    return this.Items[this.Index];
  }

  public set SelectedItem(value: ListItem) {
    const index = this.Items.findIndex(i => i.id === value.id);
    if (index >= 0) {
      this.Index = index;
    }
  }

  public get SelectedValue(): unknown {
    const item = this.SelectedItem;
    return item ? item.value : null;
  }

  public get Index(): number {
    return this._index % this.Items.length;
  }

  public set Index(value: number) {
    if (!this._items.length) {
      return;
    }
    value = value < 0 ? this._items.length - 1 : value > this._items.length - 1 ? 0 : value;
    this._index = value;
    delete this._textWidth;
  }

  public get ArrowOnlyOnSelected(): boolean {
    return this._arrowOnlyOnSelected;
  }

  public set ArrowOnlyOnSelected(value: boolean) {
    this._arrowOnlyOnSelected = value;
  }

  public get IsMouseInBoundsOfLeftArrow(): boolean {
    return this.parent.isMouseInBounds(this._leftArrow.pos, this._leftArrow.size);
  }

  public get IsMouseInBoundsOfRightArrow(): boolean {
    return this.parent.isMouseInBounds(this._rightArrow.pos, this._rightArrow.size);
  }

  public setVerticalPosition(y: number): void {
    const yOffset = y + this.offset.Y + 147;
    this._leftArrow.pos.Y = yOffset;
    this._rightArrow.pos.Y = yOffset;
    this._itemText.pos.Y = yOffset;
    super.setVerticalPosition(y);
  }

  public draw(): void {
    super.draw();
    if (this._textWidth === undefined) {
      const caption = this._getSelectedItemCaption();
      this._itemText.caption = caption;
      this._textWidth = measureString(
        caption,
        this._itemText.font,
        this._itemText.scale,
        Menu.screenWidth,
      );
    }

    this._rightArrow.pos.X = this.offset.X + this.parent.WidthOffset + 400;
    this._itemText.pos.X = this._rightArrow.pos.X + 5;

    this._itemText.color = this.enabled
      ? this.selected
        ? this.HighlightedForeColor
        : this.ForeColor
      : new Color(255, 163, 159, 148);

    if (this._arrowOnlyOnSelected && !this.selected) {
      this._itemText.pos.X += this._rightArrow.size.width / 2;
    } else {
      this._leftArrow.color = this._itemText.color;
      this._rightArrow.color = this._itemText.color;

      this._leftArrow.pos.X =
        this._itemText.pos.X - this._textWidth - this._leftArrow.size.width + 5;

      this._leftArrow.draw(Menu.screenResolution);
      this._rightArrow.draw(Menu.screenResolution);
    }

    this._itemText.draw(undefined, Menu.screenResolution);
  }

  private _getSelectedItemCaption(): string {
    const item = this.SelectedItem;
    return item ? item.name : '';
  }
}
