import { Sprite } from '../../';
import { Alignment, BadgeStyle, Font } from '../../../enums';
import { Color, LiteEvent, MeasureString, Point, Size } from '../../../utils';
import { ItemsCollection, ListItem, ResText } from '../modules/';
import { UIMenuItem } from './';

export class UIMenuListItem extends UIMenuItem {
  public ScrollingEnabled: boolean = true;
  public HoldTimeBeforeScroll: number = 200;

  protected itemText: ResText;
  protected arrowLeft: Sprite;
  protected arrowRight: Sprite;
  protected index: number = 0;

  private readonly OnListChanged = new LiteEvent();

  private holdTime: number;
  private currOffset: number = 0;
  private collection: ListItem[] = [];

  get Collection() {
    return this.collection;
  }
  set Collection(v) {
    if (!v) {
      throw new Error("The collection can't be null");
    }
    this.collection = v;
  }

  set SelectedItem(v: ListItem) {
    const idx = this.Collection.findIndex(li => li.Id === v.Id);
    if (idx > 0) {
      this.Index = idx;
    } else {
      this.Index = 0;
    }
  }

  get SelectedItem() {
    return this.Collection.length > 0 ? this.Collection[this.Index] : null;
  }

  get SelectedValue() {
    return this.SelectedItem == null
      ? null
      : this.SelectedItem.Data == null
      ? this.SelectedItem.DisplayText
      : this.SelectedItem.Data;
  }

  public get ListChanged() {
    return this.OnListChanged.expose();
  }

  get Index() {
    if (this.Collection === null) {
      return -1;
    }
    if (this.Collection !== null && this.Collection.length === 0) {
      return -1;
    }

    return this.index % this.Collection.length;
  }
  set Index(value) {
    if (this.Collection === null) {
      return;
    }
    if (this.Collection !== null && this.Collection.length === 0) {
      return;
    }

    this.index = 100000 - (100000 % this.Collection.length) + value;

    const caption = this.Collection.length >= this.Index ? this.Collection[this.Index].DisplayText : ' ';
    this.currOffset = MeasureString(caption);
  }

  constructor(
    text: string,
    description: string = '',
    collection: ItemsCollection = new ItemsCollection([]),
    startIndex: number = 0,
  ) {
    super(text, description);
    const y = 0;
    this.Collection = collection.getListItems();
    this.Index = startIndex;
    this.arrowLeft = new Sprite('commonmenu', 'arrowleft', new Point(110, 105 + y), new Size(30, 30));
    this.arrowRight = new Sprite('commonmenu', 'arrowright', new Point(280, 105 + y), new Size(30, 30));
    this.itemText = new ResText('', new Point(290, y + 104), 0.35, Color.White, Font.ChaletLondon, Alignment.Right);
  }

  public setCollection(collection: ItemsCollection) {
    this.Collection = collection.getListItems();
  }

  public setCollectionItem(index: number, item: ListItem | string, resetSelection: boolean = true) {
    if (index > this.Collection.length) {
      // Placeholder for formatting
      throw new Error('Index out of bounds');
    }
    if (typeof item === 'string') {
      // Placeholder for formatting
      item = new ListItem(item);
    }
    this.Collection.splice(index, 1, item);

    if (resetSelection) {
      // Placeholder for formatting
      this.Index = 0;
    }
  }

  public SetVerticalPosition(y: number) {
    this.arrowLeft.pos = new Point(300 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
    this.arrowRight.pos = new Point(400 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
    this.itemText.pos = new Point(300 + this.Offset.X + this.Parent.WidthOffset, y + 147 + this.Offset.Y);
    super.SetVerticalPosition(y);
  }

  public SetRightLabel(text: string) {
    return this;
  }

  public SetRightBadge(badge: BadgeStyle) {
    return this;
  }

  public Draw() {
    super.Draw();
    const caption = this.Collection.length >= this.Index ? this.Collection[this.Index].DisplayText : ' ';
    const offset = this.currOffset;

    this.itemText.color = this.Enabled
      ? this.Selected
        ? this.HighlightedForeColor
        : this.ForeColor
      : new Color(255, 163, 159, 148);

    this.itemText.caption = caption;

    this.arrowLeft.color = this.Enabled
      ? this.Selected
        ? this.HighlightedForeColor
        : this.ForeColor
      : new Color(255, 163, 159, 148);
    this.arrowRight.color = this.Enabled
      ? this.Selected
        ? this.HighlightedForeColor
        : this.ForeColor
      : new Color(255, 163, 159, 148);

    this.arrowLeft.pos = new Point(375 - offset + this.Offset.X + this.Parent.WidthOffset, this.arrowLeft.pos.Y);

    if (this.Selected) {
      this.arrowLeft.Draw();
      this.arrowRight.Draw();
      this.itemText.pos = new Point(405 + this.Offset.X + this.Parent.WidthOffset, this.itemText.pos.Y);
    } else {
      this.itemText.pos = new Point(420 + this.Offset.X + this.Parent.WidthOffset, this.itemText.pos.Y);
    }
    this.itemText.Draw();
  }
}
