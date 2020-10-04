import { Sprite, Text } from '../../';
import { Alignment, Font } from '../../../enums';
import { Color, LiteEvent, measureString, Point, Size } from '../../../utils';
import { ItemsCollection, ListItem } from '../modules/';
import { UIMenuItem } from './';

export class UIMenuListItem extends UIMenuItem {
  public scrollingEnabled = true;
  public holdTimeBeforeScroll = 200;

  protected itemText: Text;
  protected arrowLeft: Sprite;
  protected arrowRight: Sprite;
  protected index = 0;

  private readonly onListChanged = new LiteEvent();

  private arrowOnlyOnSelected: boolean;
  private currOffset = 0;
  private collection: (ListItem | string)[] = [];

  private Caption(): string {
    // I suck at JS 'LINQ'
    let caption = ' ';
    if (this.Collection.length >= this.Index) {
      const item = this.Collection[this.Index];

      if (typeof item === 'string') {
        caption = item;
      } else {
        caption = item.displayText;
      }
    }
    return caption;
  }

  get Collection(): (ListItem | string)[] {
    return this.collection;
  }

  set Collection(v: (ListItem | string)[]) {
    if (!v) {
      throw new Error('The collection can\'t be null');
    }
    this.collection = v;
  }

  set SelectedItem(v: ListItem | string) {
    const idx = this.Collection.indexOf(v);
    if (idx > 0) {
      this.Index = idx;
    } else {
      this.Index = 0;
    }
  }

  get SelectedItem(): ListItem | string {
    return this.Collection.length > 0
      ? this.Collection[this.Index] instanceof ListItem
        ? this.Collection[this.Index]
        : null
      : null;
  }

  get SelectedValue(): unknown {
    return this.SelectedItem == null
      ? null
      : typeof this.SelectedItem === 'string'
        ? this.SelectedItem
        : this.SelectedItem.data == null
          ? this.SelectedItem.displayText
          : this.SelectedItem.data;
  }

  public get ListChanged(): LiteEvent {
    return this.onListChanged.expose();
  }

  get Index(): number {
    if (this.Collection === null) {
      return -1;
    }
    if (this.Collection !== null && this.Collection.length === 0) {
      return -1;
    }

    return this.index % this.Collection.length;
  }

  set Index(value: number) {
    if (this.Collection === null) {
      return;
    }
    if (this.Collection.length === 0) {
      return;
    }

    this.index = 100000 - (100000 % this.Collection.length) + value;

    const caption: string = this.Caption();

    this.currOffset = measureString(caption);
  }

  constructor(
    text: string,
    description = '',
    collection = new ItemsCollection([]),
    startIndex = 0,
    arrowOnlyOnSelected = true,
  ) {
    super(text, description);
    const y = 0;
    this.arrowOnlyOnSelected = arrowOnlyOnSelected;
    this.Collection = collection.getListItems();
    this.Index = startIndex;
    this.arrowLeft = new Sprite(
      'commonmenu',
      'arrowleft',
      new Point(110, 105 + y),
      new Size(30, 30),
    );
    this.arrowRight = new Sprite(
      'commonmenu',
      'arrowright',
      new Point(280, 105 + y),
      new Size(30, 30),
    );
    this.itemText = new Text(
      '',
      new Point(290, y + 104),
      0.35,
      Color.white,
      Font.ChaletLondon,
      Alignment.Right,
    );
  }

  public setCollection(collection: ItemsCollection): void {
    this.Collection = collection.getListItems();
  }

  public setCollectionItem(index: number, item: ListItem | string, resetSelection = true): void {
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

  public setVerticalPosition(y: number): void {
    this.arrowLeft.pos = new Point(
      300 + this.offset.X + this.parent.WidthOffset,
      147 + y + this.offset.Y,
    );
    this.arrowRight.pos = new Point(
      400 + this.offset.X + this.parent.WidthOffset,
      147 + y + this.offset.Y,
    );
    this.itemText.pos = new Point(
      300 + this.offset.X + this.parent.WidthOffset,
      y + 147 + this.offset.Y,
    );
    super.setVerticalPosition(y);
  }

  public draw(resolution?: Size): void {
    super.draw(resolution);
    const caption = this.Caption();
    const offset = this.currOffset;

    this.itemText.color = this.enabled
      ? this.selected
        ? this.highlightedForeColor
        : this.foreColor
      : new Color(255, 163, 159, 148);

    this.itemText.caption = caption;

    this.arrowLeft.color = this.enabled
      ? this.selected
        ? this.highlightedForeColor
        : this.foreColor
      : new Color(255, 163, 159, 148);
    this.arrowRight.color = this.enabled
      ? this.selected
        ? this.highlightedForeColor
        : this.foreColor
      : new Color(255, 163, 159, 148);

    this.arrowLeft.pos = new Point(
      375 - offset + this.offset.X + this.parent.WidthOffset,
      this.arrowLeft.pos.Y,
    );
    if (this.arrowOnlyOnSelected) {
      if (this.selected) {
        this.arrowLeft.draw(resolution);
        this.arrowRight.draw(resolution);
        this.itemText.pos = new Point(
          405 + this.offset.X + this.parent.WidthOffset,
          this.itemText.pos.Y,
        );
      } else {
        this.itemText.pos = new Point(
          420 + this.offset.X + this.parent.WidthOffset,
          this.itemText.pos.Y,
        );
      }
    } else {
      this.arrowLeft.draw(resolution);
      this.arrowRight.draw(resolution);
      this.itemText.pos = new Point(
        405 + this.offset.X + this.parent.WidthOffset,
        this.itemText.pos.Y,
      );
    }
    this.itemText.draw(undefined, resolution);
  }
}
