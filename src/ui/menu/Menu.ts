import { Container, Screen, Sprite } from '../';
import { Audio } from '../../';
import { Alignment, Control, Font } from '../../enums';
import { Game } from '../../Game';
import { Color, LiteEvent, measureString, Point, Size, uuidv4 } from '../../utils';
import { UIMenuCheckboxItem, UIMenuItem, UIMenuListItem, UIMenuSliderItem } from './items';
import { ResRectangle, ResText } from './modules';

export class Menu {
  public readonly id: string = uuidv4();

  public parentMenu: Menu;
  public parentItem: UIMenuItem;
  public children: Map<string, Menu>;
  public widthOffset: number = 0;
  public visible: boolean = false;
  public mouseControlsEnabled: boolean = false;

  public AUDIO_LIBRARY: string = 'HUD_FRONTEND_DEFAULT_SOUNDSET';
  public AUDIO_UPDOWN: string = 'NAV_UP_DOWN';
  public AUDIO_LEFTRIGHT: string = 'NAV_LEFT_RIGHT';
  public AUDIO_SELECT: string = 'SELECT';
  public AUDIO_BACK: string = 'BACK';
  public AUDIO_ERROR: string = 'ERROR';

  // tslint:disable-next-line: prefer-array-literal
  public menuItems: Array<UIMenuItem | UIMenuListItem | UIMenuSliderItem | UIMenuCheckboxItem> = [];

  public get CurrentSelection() {
    return this.activeItem % this.menuItems.length;
  }

  public set CurrentSelection(v) {
    this.menuItems[this.activeItem % this.menuItems.length].selected = false;
    this.activeItem = 1000 - (1000 % this.menuItems.length) + v;
    if (this.CurrentSelection > this.maxItem) {
      this.maxItem = this.CurrentSelection;
      this.minItem = this.CurrentSelection - this.maxItemsOnScreen;
    } else if (this.CurrentSelection < this.minItem) {
      this.maxItem = this.maxItemsOnScreen + this.CurrentSelection;
      this.minItem = this.CurrentSelection;
    }
  }

  public readonly indexChange = new LiteEvent();
  public readonly listChange = new LiteEvent();
  public readonly sliderChange = new LiteEvent();
  public readonly sliderSelect = new LiteEvent();
  public readonly checkboxChange = new LiteEvent();
  public readonly itemSelect = new LiteEvent();
  public readonly menuOpen = new LiteEvent();
  public readonly menuClose = new LiteEvent();
  public readonly menuChange = new LiteEvent();

  private title: string;
  private subtitle: string;
  private counterPretext: string = '';
  private counterOverride: string = undefined;
  private spriteLibrary: string;
  private spriteName: string;
  private offset: Point;
  private lastUpDownNavigation = 0;
  private lastLeftRightNavigation = 0;
  private activeItem: number = 1000;
  private extraOffset: number = 0;
  private justOpened: boolean = true;
  private safezoneOffset: Point = new Point(0, 0);
  private maxItemsOnScreen: number = 9;
  private minItem: number;
  private maxItem: number = this.maxItemsOnScreen;

  private readonly mainMenu: Container;
  private readonly logo: Sprite;
  private readonly upAndDownSprite: Sprite;
  private readonly titleResText: ResText;
  private readonly subtitleResText: ResText;
  private readonly subtitleResRectangle: ResRectangle;
  private readonly extraRectangleUp: ResRectangle;
  private readonly extraRectangleDown: ResRectangle;
  private readonly descriptionBar: ResRectangle;
  private readonly descriptionRectangle: Sprite;
  private readonly descriptionText: ResText;
  private readonly counterText: ResText;
  private readonly background: Sprite;

  constructor(title, subtitle, offset = new Point(15, 15), spriteLibrary?, spriteName?) {
    if (!(offset instanceof Point)) {
      offset = Point.parse(offset);
    }

    this.title = title;
    this.subtitle = subtitle;
    this.spriteLibrary = spriteLibrary || 'commonmenu';
    this.spriteName = spriteName || 'interaction_bgd';
    this.offset = new Point(offset.X, offset.Y);
    this.children = new Map();

    // Create everything
    this.mainMenu = new Container(new Point(0, 0), new Size(700, 500), new Color(0, 0, 0, 0));
    this.logo = new Sprite(
      this.spriteLibrary,
      this.spriteName,
      new Point(0 + this.offset.X, 0 + this.offset.Y),
      new Size(431, 107),
    );
    this.mainMenu.addItem(
      (this.titleResText = new ResText(
        this.title,
        new Point(215 + this.offset.X, 20 + this.offset.Y),
        1.15,
        new Color(255, 255, 255, 255),
        1,
        Alignment.Centered,
      )),
    );

    if (this.subtitle !== '') {
      this.mainMenu.addItem(
        (this.subtitleResRectangle = new ResRectangle(
          new Point(0 + this.offset.X, 107 + this.offset.Y),
          new Size(431, 37),
          new Color(255, 0, 0, 0),
        )),
      );
      this.mainMenu.addItem(
        (this.subtitleResText = new ResText(
          this.subtitle,
          new Point(8 + this.offset.X, 110 + this.offset.Y),
          0.35,
          new Color(255, 255, 255, 255),
          0,
          Alignment.Left,
        )),
      );
      if (this.subtitle.startsWith('~')) {
        this.counterPretext = this.subtitle.substr(0, 3);
      }
      this.counterText = new ResText(
        '',
        new Point(425 + this.offset.X, 110 + this.offset.Y),
        0.35,
        new Color(255, 255, 255, 255),
        0,
        Alignment.Right,
      );
      this.extraOffset += 37;
    }

    this.upAndDownSprite = new Sprite(
      'commonmenu',
      'shop_arrows_upanddown',
      new Point(
        190 + this.offset.X,
        147 + 37 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset,
      ),
      new Size(50, 50),
    );

    this.extraRectangleUp = new ResRectangle(
      new Point(
        0 + this.offset.X,
        144 + 38 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset,
      ),
      new Size(431, 18),
      new Color(200, 0, 0, 0),
    );

    this.extraRectangleDown = new ResRectangle(
      new Point(
        0 + this.offset.X,
        144 + 18 + 38 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset,
      ),
      new Size(431, 18),
      new Color(200, 0, 0, 0),
    );

    this.descriptionBar = new ResRectangle(
      new Point(this.offset.X, 123),
      new Size(431, 4),
      Color.black,
    );
    this.descriptionRectangle = new Sprite(
      'commonmenu',
      'gradient_bgd',
      new Point(this.offset.X, 127),
      new Size(431, 30),
    );
    this.descriptionText = new ResText(
      'Description',
      new Point(this.offset.X + 5, 125),
      0.35,
      new Color(255, 255, 255, 255),
      Font.ChaletLondon,
      Alignment.Left,
    );

    this.background = new Sprite(
      'commonmenu',
      'gradient_bgd',
      new Point(this.offset.X, 144 + this.offset.Y - 37 + this.extraOffset),
      new Size(290, 25),
    );

    setTick(() => {
      this.render();
    });
  }

  public setMenuwidthOffset(widthOffset: number) {
    this.widthOffset = widthOffset;
    if (this.logo != null) {
      this.logo.size = new Size(431 + this.widthOffset, 107);
    }
    this.mainMenu.items[0].pos = new Point(
      (this.widthOffset + this.offset.X + 431) / 2,
      20 + this.offset.Y,
    );
    if (this.counterText) {
      this.counterText.pos = new Point(425 + this.offset.X + widthOffset, 110 + this.offset.Y);
    }
    if (this.mainMenu.items.length >= 2) {
      const tmp = this.mainMenu.items[1];
      tmp.size = new Size(431 + this.widthOffset, 37);
    }
  }

  public addNewSubMenu(text: string, description?: string, offset?: Point, spriteLibrary?: string, spriteName?: string): Menu {
    let menu = new Menu(this.title, text, offset || this.offset, spriteLibrary || this.spriteLibrary, spriteName || this.spriteName)
    menu.setMenuwidthOffset(this.widthOffset);
    let item = new UIMenuItem(text, description);
    this.addItem(item);
    this.bindMenuToItem(menu, item);
    return menu;
  }

  public addSubMenu(subMenuToAdd: Menu, itemText: string, itemDescription?: string, inheritWidthOffset: boolean = true): Menu {
    if (inheritWidthOffset) subMenuToAdd.setMenuwidthOffset(this.widthOffset);
    let item = new UIMenuItem(itemText, itemDescription);
    this.addItem(item);
    this.bindMenuToItem(subMenuToAdd, item);
    return subMenuToAdd;
  }

  public addItem(item: UIMenuItem) {
    if (this.justOpened) {
      this.justOpened = false;
    }
    item.offset = this.offset;
    item.parent = this;
    item.setVerticalPosition(this.menuItems.length * 25 - 37 + this.extraOffset);
    this.menuItems.push(item);

    item.description = this.formatDescription(item.description);

    this.refreshIndex();
    this.recalculateDescriptionPosition();
  }

  public refreshIndex() {
    if (this.menuItems.length === 0) {
      this.activeItem = 1000;
      this.maxItem = this.maxItemsOnScreen;
      this.minItem = 0;
      return;
    }

    for (const item of this.menuItems) {
      item.selected = false;
    }

    this.activeItem = 1000 - (1000 % this.menuItems.length);
    this.maxItem = this.maxItemsOnScreen;
    this.minItem = 0;
  }

  public clear() {
    this.menuItems = [];
    this.recalculateDescriptionPosition();
  }

  public open() {
    Audio.playSoundFrontEnd(this.AUDIO_BACK, this.AUDIO_LIBRARY);
    this.visible = true;
    this.justOpened = true;
    this.menuOpen.emit();
  }
  public close() {
    Audio.playSoundFrontEnd(this.AUDIO_BACK, this.AUDIO_LIBRARY);
    this.visible = false;
    this.refreshIndex();
    this.menuClose.emit();
  }

  public set Title(text: string) {
    this.title = text;
    this.titleResText.caption = text;
  }

  public get Title() {
    return this.title;
  }

  public set Subtitle(text: string) {
    this.subtitle = text;
    this.subtitleResText.caption = text;
  }

  public get Subtitle() {
    return this.subtitle;
  }

  public set SubtitleForeColor(color: Color) {
    this.subtitleResText.color = color;
  }

  public get SubtitleForeColor() {
    return this.subtitleResText.color;
  }
  
  public set SubtitleBackColor(color: Color) {
    this.subtitleResRectangle.color = color;
  }

  public get SubtitleBackColor() {
    return this.subtitleResRectangle.color;
  }

  public goLeft() {
    if (
      !(this.menuItems[this.CurrentSelection] instanceof UIMenuListItem) &&
      !(this.menuItems[this.CurrentSelection] instanceof UIMenuSliderItem)
    ) {
      return;
    }
    if (this.menuItems[this.CurrentSelection] instanceof UIMenuListItem) {
      const it = this.menuItems[this.CurrentSelection] as UIMenuListItem;
      if (it.Collection.length === 0) {
        return;
      }
      it.Index -= 1;
      Audio.playSoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
      this.listChange.emit(it, it.Index);
    } else if (this.menuItems[this.CurrentSelection] instanceof UIMenuSliderItem) {
      const it = this.menuItems[this.CurrentSelection] as UIMenuSliderItem;
      it.Index = it.Index - 1;
      Audio.playSoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
      this.sliderChange.emit(it, it.Index, it.indexToItem(it.Index));
      // it.sliderChangedTrigger(it.Index);
    }
  }

  public goRight() {
    if (
      !(this.menuItems[this.CurrentSelection] instanceof UIMenuListItem) &&
      !(this.menuItems[this.CurrentSelection] instanceof UIMenuSliderItem)
    ) {
      return;
    }
    if (this.menuItems[this.CurrentSelection] instanceof UIMenuListItem) {
      const it = this.menuItems[this.CurrentSelection] as UIMenuListItem;
      if (it.Collection.length === 0) {
        return;
      }
      it.Index += 1;
      Audio.playSoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
      this.listChange.emit(it, it.Index);
    } else if (this.menuItems[this.CurrentSelection] instanceof UIMenuSliderItem) {
      const it = this.menuItems[this.CurrentSelection] as UIMenuSliderItem;
      it.Index += 1;
      Audio.playSoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
      this.sliderChange.emit(it, it.Index, it.indexToItem(it.Index));
      // it.sliderChangedTrigger(it.Index);
    }
  }

  public selectItem() {
    if (!this.menuItems[this.CurrentSelection].enabled) {
      Audio.playSoundFrontEnd(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
      return;
    }
    const it = this.menuItems[this.CurrentSelection] as UIMenuCheckboxItem;
    if (this.menuItems[this.CurrentSelection] instanceof UIMenuCheckboxItem) {
      it.checked = !it.checked;
      Audio.playSoundFrontEnd(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
      this.checkboxChange.emit(it, it.checked);
    } else {
      Audio.playSoundFrontEnd(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
      this.itemSelect.emit(it, this.CurrentSelection);
      if (this.children.has(it.id)) {
        const subMenu = this.children.get(it.id);
        this.visible = false;
        subMenu.visible = true;
        subMenu.justOpened = true;
        subMenu.menuOpen.emit();
        this.menuChange.emit(subMenu, true);
      }
    }
    it.fireEvent();
  }

  public getScreenResolutionMantainRatio(): Size {
    const height = Screen.Height;
    const width = Screen.ScaledWidth;

    return new Size(width, height);
  }

  public processControl() {
    if (!this.visible) {
      return;
    }
    if (this.justOpened) {
      this.justOpened = false;
      return;
    }

    if (Game.isControlJustReleased(0, Control.PhoneCancel)) {
      // Back
      this.goBack();
    }
    if (this.menuItems.length === 0) {
      return;
    }
    if (Game.isControlPressed(0, Control.PhoneUp) && this.lastUpDownNavigation + 200 < Date.now()) {
      // Up
      this.lastUpDownNavigation = Date.now();
      if (this.menuItems.length > this.maxItemsOnScreen + 1) {
        this.goUpOverflow();
      } else {
        this.goUp();
      }
    } else if (
      Game.isControlPressed(0, Control.PhoneDown) &&
      this.lastUpDownNavigation + 200 < Date.now()
    ) {
      // Down
      this.lastUpDownNavigation = Date.now();
      if (this.menuItems.length > this.maxItemsOnScreen + 1) {
        this.goDownOverflow();
      } else {
        this.goDown();
      }
    } else if (
      Game.isControlPressed(0, Control.PhoneLeft) &&
      this.lastLeftRightNavigation + 200 < Date.now()
    ) {
      // Left
      this.lastLeftRightNavigation = Date.now();
      this.goLeft();
    } else if (
      Game.isControlPressed(0, Control.PhoneRight) &&
      this.lastLeftRightNavigation + 200 < Date.now()
    ) {
      // Right
      this.lastLeftRightNavigation = Date.now();
      this.goRight();
    } else if (Game.isControlJustPressed(0, Control.FrontendAccept)) {
      // Select
      this.selectItem();
    }
  }

  public goUpOverflow() {
    if (this.menuItems.length <= this.maxItemsOnScreen + 1) {
      return;
    }
    if (this.activeItem % this.menuItems.length <= this.minItem) {
      if (this.activeItem % this.menuItems.length === 0) {
        this.minItem = this.menuItems.length - this.maxItemsOnScreen - 1;
        this.maxItem = this.menuItems.length - 1;
        this.menuItems[this.activeItem % this.menuItems.length].selected = false;
        this.activeItem = 1000 - (1000 % this.menuItems.length);
        this.activeItem += this.menuItems.length - 1;
        this.menuItems[this.activeItem % this.menuItems.length].selected = true;
      } else {
        this.minItem -= 1;
        this.maxItem -= 1;
        this.menuItems[this.activeItem % this.menuItems.length].selected = false;
        this.activeItem -= 1;
        this.menuItems[this.activeItem % this.menuItems.length].selected = true;
      }
    } else {
      this.menuItems[this.activeItem % this.menuItems.length].selected = false;
      this.activeItem -= 1;
      this.menuItems[this.activeItem % this.menuItems.length].selected = true;
    }
    Audio.playSoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goUp() {
    if (this.menuItems.length > this.maxItemsOnScreen + 1) {
      return;
    }
    this.menuItems[this.activeItem % this.menuItems.length].selected = false;
    this.activeItem -= 1;
    this.menuItems[this.activeItem % this.menuItems.length].selected = true;
    Audio.playSoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goDownOverflow() {
    if (this.menuItems.length <= this.maxItemsOnScreen + 1) {
      return;
    }
    if (this.activeItem % this.menuItems.length >= this.maxItem) {
      if (this.activeItem % this.menuItems.length === this.menuItems.length - 1) {
        this.minItem = 0;
        this.maxItem = this.maxItemsOnScreen;
        this.menuItems[this.activeItem % this.menuItems.length].selected = false;
        this.activeItem = 1000 - (1000 % this.menuItems.length);
        this.menuItems[this.activeItem % this.menuItems.length].selected = true;
      } else {
        this.minItem += 1;
        this.maxItem += 1;
        this.menuItems[this.activeItem % this.menuItems.length].selected = false;
        this.activeItem += 1;
        this.menuItems[this.activeItem % this.menuItems.length].selected = true;
      }
    } else {
      this.menuItems[this.activeItem % this.menuItems.length].selected = false;
      this.activeItem += 1;
      this.menuItems[this.activeItem % this.menuItems.length].selected = true;
    }
    Audio.playSoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goDown() {
    if (this.menuItems.length > this.maxItemsOnScreen + 1) {
      return;
    }
    this.menuItems[this.activeItem % this.menuItems.length].selected = false;
    this.activeItem += 1;
    this.menuItems[this.activeItem % this.menuItems.length].selected = true;
    Audio.playSoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goBack() {
    Audio.playSoundFrontEnd(this.AUDIO_BACK, this.AUDIO_LIBRARY);
    this.visible = false;
    if (this.parentMenu != null) {
      this.parentMenu.visible = true;
      this.parentMenu.justOpened = true;
      this.parentMenu.menuOpen.emit();
      this.menuChange.emit(this.parentMenu, false);
    }
    this.menuClose.emit();
  }

  public bindMenuToItem(menuToBind: Menu, itemToBindTo: UIMenuItem) {
    menuToBind.parentMenu = this;
    menuToBind.parentItem = itemToBindTo;
    this.children.set(itemToBindTo.id, menuToBind);
  }

  public releaseMenuFromItem(releaseFrom: UIMenuItem) {
    if (!this.children.has(releaseFrom.id)) {
      return false;
    }
    const menu: Menu = this.children.get(releaseFrom.id);
    menu.parentItem = null;
    menu.parentMenu = null;
    this.children.delete(releaseFrom.id);
    return true;
  }
  private recalculateDescriptionPosition() {
    this.descriptionBar.pos = new Point(this.offset.X, 149 - 37 + this.extraOffset + this.offset.Y);
    this.descriptionRectangle.pos = new Point(
      this.offset.X,
      149 - 37 + this.extraOffset + this.offset.Y,
    );
    this.descriptionText.pos = new Point(
      this.offset.X + 8,
      155 - 37 + this.extraOffset + this.offset.Y,
    );

    this.descriptionBar.size = new Size(431 + this.widthOffset, 4);
    this.descriptionRectangle.size = new Size(431 + this.widthOffset, 30);

    let count = this.menuItems.length;
    if (count > this.maxItemsOnScreen + 1) {
      count = this.maxItemsOnScreen + 2;
    }

    this.descriptionBar.pos = new Point(this.offset.X, 38 * count + this.descriptionBar.pos.Y);
    this.descriptionRectangle.pos = new Point(
      this.offset.X,
      38 * count + this.descriptionRectangle.pos.Y,
    );
    this.descriptionText.pos = new Point(
      this.offset.X + 8,
      38 * count + this.descriptionText.pos.Y,
    );
  }

  private formatDescription(input: string) {
    if (input.length > 99) {
      input = input.slice(0, 99);
    }

    const maxPixelsPerLine = 425 + this.widthOffset;
    let aggregatePixels = 0;
    let output = '';
    const words = input.split(' ');
    for (const word of words) {
      const offset = measureString(word);
      aggregatePixels += offset;
      if (aggregatePixels > maxPixelsPerLine) {
        output = `${output} \n${word} `;
        aggregatePixels = offset + measureString(' ');
      } else {
        output = `${output}${word} `;
        aggregatePixels += measureString(' ');
      }
    }
    return output;
  }

  private render() {
    if (!this.visible) {
      return;
    }

    if (this.justOpened) {
      if (this.logo != null && !this.logo.IsTextureDictionaryLoaded) {
        this.logo.loadTextureDictionary();
      }
      if (!this.background.IsTextureDictionaryLoaded) {
        this.background.loadTextureDictionary();
      }
      if (!this.descriptionRectangle.IsTextureDictionaryLoaded) {
        this.descriptionRectangle.loadTextureDictionary();
      }
      if (!this.upAndDownSprite.IsTextureDictionaryLoaded) {
        this.upAndDownSprite.loadTextureDictionary();
      }
    }
    this.mainMenu.draw();
    this.processControl();

    this.background.size =
      this.menuItems.length > this.maxItemsOnScreen + 1
        ? new Size(431 + this.widthOffset, 38 * (this.maxItemsOnScreen + 1))
        : new Size(431 + this.widthOffset, 38 * this.menuItems.length);
    this.background.draw();

    if (this.menuItems.length > 0) {
      this.menuItems[this.activeItem % this.menuItems.length].selected = true;
      if (this.menuItems[this.activeItem % this.menuItems.length].description.trim() !== '') {
        this.recalculateDescriptionPosition();
        const descCaption = this.menuItems[this.activeItem % this.menuItems.length].description;
        // descCaption = this.FormatDescription(descCaption);
        this.descriptionText.caption = descCaption;
        const numLines = this.descriptionText.caption.split('\n').length;
        this.descriptionRectangle.size = new Size(431 + this.widthOffset, numLines * 25 + 15);

        this.descriptionBar.draw();
        this.descriptionRectangle.draw();
        this.descriptionText.draw();
      }
    }

    if (this.menuItems.length <= this.maxItemsOnScreen + 1) {
      let count = 0;
      for (const menuItem of this.menuItems) {
        menuItem.setVerticalPosition(count * 38 - 37 + this.extraOffset);
        menuItem.draw();
        count += 1;
      }
      if (this.counterText && this.counterOverride) {
        this.counterText.caption = this.counterPretext + this.counterOverride;
        this.counterText.draw();
      }
    } else {
      let count = 0;
      for (let index = this.minItem; index <= this.maxItem; index += 1) {
        const item = this.menuItems[index];
        item.setVerticalPosition(count * 38 - 37 + this.extraOffset);
        item.draw();
        count += 1;
      }
      this.extraRectangleUp.size = new Size(431 + this.widthOffset, 18);
      this.extraRectangleDown.size = new Size(431 + this.widthOffset, 18);
      this.upAndDownSprite.pos = new Point(
        190 + this.offset.X + this.widthOffset / 2,
        147 + 37 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset,
      );

      this.extraRectangleUp.draw();
      this.extraRectangleDown.draw();
      this.upAndDownSprite.draw();
      if (this.counterText) {
        if (!this.counterOverride) {
          const cap = `${this.CurrentSelection + 1} / ${this.menuItems.length}`;
          this.counterText.caption = this.counterPretext + cap;
        } else {
          this.counterText.caption = this.counterPretext + this.counterOverride;
        }
        this.counterText.draw();
      }
    }

    this.logo.draw();
  }
}
