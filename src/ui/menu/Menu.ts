import {
  Container,
  MenuControls,
  MenuSettings,
  Rectangle,
  Screen,
  Sprite,
  Text,
  UIMenuSeparatorItem,
} from '../';
import { Audio, InputMode } from '../../';
import { Alignment, Control, Font } from '../../enums';
import { Game } from '../../Game';
import { Color, LiteEvent, measureString, Point, Size, uuidv4 } from '../../utils';
import { UIMenuCheckboxItem, UIMenuItem, UIMenuListItem, UIMenuSliderItem } from './items';

export class Menu {
  public readonly id: string = uuidv4();

  public parentMenu: Menu;
  public parentItem: UIMenuItem;
  public children: Map<string, Menu> = new Map();
  public visible = false;
  public mouseControlsEnabled = false;

  public menuItems: UIMenuItem[] = [];

  public get CurrentItem(): UIMenuItem {
    return this.menuItems[this._activeItem % this.menuItems.length];
  }

  public get CurrentSelection(): number {
    return this._activeItem % this.menuItems.length;
  }

  public set CurrentSelection(v: number) {
    this.CurrentItem.selected = false;
    this._activeItem = 1000 - (1000 % this.menuItems.length) + v;
    if (this.CurrentSelection > this._maxItem) {
      this._maxItem = this.CurrentSelection;
      this._minItem = this.CurrentSelection - this._maxItemsOnScreen;
    } else if (this.CurrentSelection < this._minItem) {
      this._maxItem = this._maxItemsOnScreen + this.CurrentSelection;
      this._minItem = this.CurrentSelection;
    }
  }

  public get WidthOffset(): number {
    return this._widthOffset;
  }

  public set WidthOffset(widthOffset: number) {
    this._widthOffset = widthOffset;

    const width = 431 + widthOffset;

    if (this._logo) {
      this._logo.size.width = width;
    }

    this._mainMenu.items[0].pos.X = width / 2 + this._offset.X;

    if (this._counterText) {
      this._counterText.pos.X = 425 + this._offset.X + widthOffset;
    }

    if (this._subtitleResRectangle) {
      this._subtitleResRectangle.size.width = width;
    }

    this._extraRectangleUp.size.width = width;
    this._extraRectangleDown.size.width = width;
    this._upAndDownSprite.pos.X = 190 + this._offset.X + widthOffset / 2;

    this._descriptionBar.size.width = width;
    this._descriptionRectangle.size.width = width;
  }

  public get ScreenResolution(): Size {
    return new Size(this.ScreenWidth, this.ScreenHeight);
  }

  public get ScreenWidth(): number {
    return this.ScreenHeight * Screen.AspectRatio;
  }

  public get ScreenHeight(): number {
    return this._screenHeight;
  }

  public set ScreenHeight(value: number) {
    this._screenHeight = value;
  }

  public get Controls(): MenuControls {
    return this._controls;
  }

  public get Settings(): MenuSettings {
    return this._settings;
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

  private _title: string;
  private _subtitle: string;
  private _counterPretext = '';
  private _counterOverride: string;
  private _spriteLibrary: string;
  private _spriteName: string;
  private _offset: Point;
  private _navigationDelay = 140;
  private _lastUpDownNavigation = 0;
  private _lastLeftRightNavigation = 0;
  private _activeItem = 1000;
  private _extraOffset = 37;
  private _widthOffset = 0;
  private _justOpened = true;
  private _minItem = 0;
  private _maxItem = 9;
  private _maxItemsOnScreen = this._maxItem;
  private _screenHeight = 1080;
  private _controls = new MenuControls();
  private _settings = new MenuSettings();
  private _menuSeparators: Map<number, UIMenuSeparatorItem> = new Map();

  private readonly _mainMenu: Container;
  private readonly _logo: Sprite;
  private readonly _upAndDownSprite: Sprite;
  private readonly _titleResText: Text;
  private readonly _subtitleResText: Text;
  private readonly _subtitleResRectangle: Rectangle;
  private readonly _extraRectangleUp: Rectangle;
  private readonly _extraRectangleDown: Rectangle;
  private readonly _descriptionBar: Rectangle;
  private readonly _descriptionRectangle: Sprite;
  private readonly _descriptionText: Text;
  private readonly _counterText: Text;
  private readonly _background: Sprite;

  constructor(
    title: string,
    subtitle: string,
    offset = new Point(),
    spriteLibrary = 'commonmenu',
    spriteName = 'interaction_bgd',
  ) {
    this._title = title;
    this._subtitle = subtitle;
    this._spriteLibrary = spriteLibrary;
    this._spriteName = spriteName;
    this._offset = offset;

    // Create everything
    this._mainMenu = new Container(new Point(), new Size(700, 500), Color.transparent);
    this._logo = new Sprite(
      this._spriteLibrary,
      this._spriteName,
      new Point(this._offset.X, this._offset.Y),
      new Size(431, 107),
    );
    this._mainMenu.addItem([
      (this._titleResText = new Text(
        this._title,
        new Point(431 / 2 + this._offset.X, 20 + this._offset.Y),
        1.15,
        Color.white,
        1,
        Alignment.Centered,
      )),
      (this._subtitleResRectangle = new Rectangle(
        new Point(this._offset.X, 107 + this._offset.Y),
        new Size(431, 37),
        Color.black,
      )),
      (this._subtitleResText = new Text(
        this._subtitle,
        new Point(8 + this._offset.X, 110 + this._offset.Y),
        0.35,
        Color.white,
        0,
        Alignment.Left,
      )),
    ]);

    if (this._subtitle && this._subtitle.startsWith('~')) {
      this._counterPretext = this._subtitle.substr(0, 3);
    }

    this._counterText = new Text(
      '',
      new Point(425 + this._offset.X, 110 + this._offset.Y),
      0.35,
      Color.white,
      0,
      Alignment.Right,
    );

    this._upAndDownSprite = new Sprite(
      'commonmenu',
      'shop_arrows_upanddown',
      new Point(),
      new Size(50, 50),
    );
    const extraRectanglePos = new Point(this._offset.X);
    const extraRectangleSize = new Size(431, 18);
    const extraRectangleColor = new Color(200, 0, 0, 0);
    this._extraRectangleUp = new Rectangle(
      extraRectanglePos,
      extraRectangleSize,
      extraRectangleColor,
    );
    this._extraRectangleDown = new Rectangle(
      { ...extraRectanglePos },
      { ...extraRectangleSize },
      { ...extraRectangleColor },
    );

    this._descriptionBar = new Rectangle(new Point(this._offset.X), new Size(431, 4), Color.black);
    this._descriptionRectangle = new Sprite(
      'commonmenu',
      'gradient_bgd',
      new Point(this._offset.X),
      new Size(431, 30),
    );
    this._descriptionText = new Text(
      'Description',
      new Point(this._offset.X + 8),
      0.35,
      Color.white,
      Font.ChaletLondon,
      Alignment.Left,
    );

    this._background = new Sprite(
      'commonmenu',
      'gradient_bgd',
      new Point(this._offset.X, 144 + this._offset.Y - 37 + this._extraOffset),
      new Size(290, 25),
    );

    setTick(() => {
      this._render();
    });
  }

  public addNewSubMenu(text: string, description?: string, inherit = true): Menu {
    let menu;
    if (inherit) {
      menu = new Menu(this._title, text, this._offset, this._spriteLibrary, this._spriteName);
      menu.WidthOffset = this.WidthOffset;
      menu._settings = this._settings;
    } else {
      menu = new Menu(this._title, text);
    }
    const item = new UIMenuItem(text, description);
    this.addItem(item);
    this.bindMenuToItem(menu, item);
    return menu;
  }

  public addSubMenu(subMenuToAdd: Menu, text: string, description?: string, inherit = true): Menu {
    if (inherit) {
      subMenuToAdd.WidthOffset = this.WidthOffset;
      subMenuToAdd._settings = this._settings;
    }
    const item = new UIMenuItem(text, description);
    this.addItem(item);
    this.bindMenuToItem(subMenuToAdd, item);
    return subMenuToAdd;
  }

  public addItem(
    items: UIMenuItem | UIMenuSeparatorItem | (UIMenuItem | UIMenuSeparatorItem)[],
  ): void {
    let shouldRefreshIndex = false;
    if (!Array.isArray(items)) {
      items = [items];
    }
    for (const item of items) {
      if (this._justOpened) {
        this._justOpened = false;
      }

      item.offset = this._offset;
      item.parent = this;
      item.setVerticalPosition(this.menuItems.length * 25 - 37 + this._extraOffset);

      if (item instanceof UIMenuItem) {
        if (!shouldRefreshIndex) {
          shouldRefreshIndex = true;
        }
        this.menuItems.push(item);
        this.formatItemDescription(item);
      } else {
        this._menuSeparators.set(this.menuItems.length - 1, item);
      }
    }
    if (shouldRefreshIndex) {
      this.refreshIndex();
      this._recalculateUpAndDown();
      this._recalculateDescriptionPosition();
    }
  }

  public addSeparator(separator = new UIMenuSeparatorItem()): void {
    this.addItem(separator);
  }

  public formatItemDescription(item: UIMenuItem): void {
    let input = item.description;
    if (input.length > 99) {
      input = input.slice(0, 99);
    }

    const maxPixelsPerLine = 425 + this._widthOffset;
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

    item.description = output;
  }

  public refreshIndex(): void {
    if (this.menuItems.length === 0) {
      this._activeItem = 1000;
      this._maxItem = this._maxItemsOnScreen;
      this._minItem = 0;
      return;
    }

    for (const item of this.menuItems) {
      item.selected = false;
    }

    this._activeItem = 1000 - (1000 % this.menuItems.length);
    this._maxItem = this._maxItemsOnScreen;
    this._minItem = 0;
  }

  public clear(): void {
    this.menuItems = [];
    this._menuSeparators.clear();
    this._recalculateUpAndDown();
    this._recalculateDescriptionPosition();
  }

  public open(): void {
    this._playSoundAndReleaseId(this.Settings.audio.back, this.Settings.audio.library);
    this.visible = true;
    this._justOpened = true;
    this.menuOpen.emit();
  }

  public close(): void {
    this._playSoundAndReleaseId(this.Settings.audio.back, this.Settings.audio.library);
    this.visible = false;
    this.refreshIndex();
    this.menuClose.emit();
  }

  public set Title(text: string) {
    this._title = text;
    this._titleResText.caption = text;
  }

  public get Title(): string {
    return this._title;
  }

  public set Subtitle(text: string) {
    this._subtitle = text;
    this._subtitleResText.caption = text;
  }

  public get Subtitle(): string {
    return this._subtitle;
  }

  public set SubtitleForeColor(color: Color) {
    this._subtitleResText.color = color;
  }

  public get SubtitleForeColor(): Color {
    return this._subtitleResText.color;
  }

  public set SubtitleBackColor(color: Color) {
    this._subtitleResRectangle.color = color;
  }

  public get SubtitleBackColor(): Color {
    return this._subtitleResRectangle.color;
  }

  public goLeft(): void {
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
      this._playSoundAndReleaseId(this.Settings.audio.leftRight, this.Settings.audio.library);
      this.listChange.emit(it, it.Index);
    } else if (this.menuItems[this.CurrentSelection] instanceof UIMenuSliderItem) {
      const it = this.menuItems[this.CurrentSelection] as UIMenuSliderItem;
      it.Index = it.Index - 1;
      this._playSoundAndReleaseId(this.Settings.audio.leftRight, this.Settings.audio.library);
      this.sliderChange.emit(it, it.Index, it.indexToItem(it.Index));
      // it.sliderChangedTrigger(it.Index);
    }
  }

  public goRight(): void {
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
      this._playSoundAndReleaseId(this.Settings.audio.leftRight, this.Settings.audio.library);
      this.listChange.emit(it, it.Index);
    } else if (this.menuItems[this.CurrentSelection] instanceof UIMenuSliderItem) {
      const it = this.menuItems[this.CurrentSelection] as UIMenuSliderItem;
      it.Index += 1;
      this._playSoundAndReleaseId(this.Settings.audio.leftRight, this.Settings.audio.library);
      this.sliderChange.emit(it, it.Index, it.indexToItem(it.Index));
      // it.sliderChangedTrigger(it.Index);
    }
  }

  public selectItem(): void {
    if (!this.menuItems[this.CurrentSelection].enabled) {
      this._playSoundAndReleaseId(this.Settings.audio.error, this.Settings.audio.library);
      return;
    }
    const it = this.menuItems[this.CurrentSelection] as UIMenuCheckboxItem;
    if (this.menuItems[this.CurrentSelection] instanceof UIMenuCheckboxItem) {
      it.checked = !it.checked;
      this._playSoundAndReleaseId(this.Settings.audio.select, this.Settings.audio.library);
      this.checkboxChange.emit(it, it.checked);
    } else {
      this._playSoundAndReleaseId(this.Settings.audio.select, this.Settings.audio.library);
      this.itemSelect.emit(it, this.CurrentSelection);
      if (this.children.has(it.id)) {
        const subMenu = this.children.get(it.id);
        this.visible = false;
        subMenu.visible = true;
        subMenu._justOpened = true;
        subMenu.menuOpen.emit();
        this.menuChange.emit(subMenu, true);
      }
    }
    it.fireEvent();
  }

  public processControl(): void {
    if (!this.visible) {
      return;
    }
    if (this._justOpened) {
      this._justOpened = false;
      return;
    }
    // Back
    if (this.Controls.back.Enabled && Game.isDisabledControlJustReleased(0, Control.PhoneCancel)) {
      this.goBack();
    }
    if (this.menuItems.length === 0) {
      return;
    }
    // Up
    if (
      this.Controls.up.Enabled &&
      (Game.isDisabledControlPressed(0, Control.PhoneUp) ||
        Game.isDisabledControlPressed(0, Control.CursorScrollUp)) &&
      this._lastUpDownNavigation + this._navigationDelay < Date.now()
    ) {
      this._lastUpDownNavigation = Date.now();
      if (this.menuItems.length > this._maxItemsOnScreen + 1) {
        this.goUpOverflow();
      } else {
        this.goUp();
      }
    }
    // Down
    if (
      this.Controls.down.Enabled &&
      (Game.isDisabledControlPressed(0, Control.PhoneDown) ||
        Game.isDisabledControlPressed(0, Control.CursorScrollDown)) &&
      this._lastUpDownNavigation + this._navigationDelay < Date.now()
    ) {
      this._lastUpDownNavigation = Date.now();
      if (this.menuItems.length > this._maxItemsOnScreen + 1) {
        this.goDownOverflow();
      } else {
        this.goDown();
      }
    }
    // Left
    if (
      this.Controls.left.Enabled &&
      Game.isDisabledControlPressed(0, Control.PhoneLeft) &&
      this._lastLeftRightNavigation + this._navigationDelay < Date.now()
    ) {
      this._lastLeftRightNavigation = Date.now();
      this.goLeft();
    }
    // Right
    if (
      this.Controls.right.Enabled &&
      Game.isDisabledControlPressed(0, Control.PhoneRight) &&
      this._lastLeftRightNavigation + this._navigationDelay < Date.now()
    ) {
      this._lastLeftRightNavigation = Date.now();
      this.goRight();
    }
    // Select
    if (
      this.Controls.select.Enabled &&
      Game.isDisabledControlJustPressed(0, Control.FrontendAccept)
    ) {
      this.selectItem();
    }
  }

  public goUpOverflow(): void {
    if (this.menuItems.length <= this._maxItemsOnScreen + 1) {
      return;
    }
    if (this.CurrentSelection <= this._minItem) {
      if (this.CurrentSelection === 0) {
        this._minItem = this.menuItems.length - this._maxItemsOnScreen - 1;
        this._maxItem = this.menuItems.length - 1;
        this.CurrentItem.selected = false;
        this._activeItem = 1000 - (1000 % this.menuItems.length);
        this._activeItem += this.menuItems.length - 1;
        this.CurrentItem.selected = true;
      } else {
        this._minItem -= 1;
        this._maxItem -= 1;
        this.CurrentItem.selected = false;
        this._activeItem -= 1;
        this.CurrentItem.selected = true;
      }
    } else {
      this.CurrentItem.selected = false;
      this._activeItem -= 1;
      this.CurrentItem.selected = true;
    }
    this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goUp(): void {
    if (this.menuItems.length > this._maxItemsOnScreen + 1) {
      return;
    }
    this.CurrentItem.selected = false;
    this._activeItem -= 1;
    this.CurrentItem.selected = true;
    this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goDownOverflow(): void {
    if (this.menuItems.length <= this._maxItemsOnScreen + 1) {
      return;
    }
    if (this.CurrentSelection >= this._maxItem) {
      if (this.CurrentSelection === this.menuItems.length - 1) {
        this._minItem = 0;
        this._maxItem = this._maxItemsOnScreen;
        this.CurrentItem.selected = false;
        this._activeItem = 1000 - (1000 % this.menuItems.length);
        this.CurrentItem.selected = true;
      } else {
        this._minItem += 1;
        this._maxItem += 1;
        this.CurrentItem.selected = false;
        this._activeItem += 1;
        this.CurrentItem.selected = true;
      }
    } else {
      this.CurrentItem.selected = false;
      this._activeItem += 1;
      this.CurrentItem.selected = true;
    }
    this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goDown(): void {
    if (this.menuItems.length > this._maxItemsOnScreen + 1) {
      return;
    }
    this.CurrentItem.selected = false;
    this._activeItem += 1;
    this.CurrentItem.selected = true;
    this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goBack(): void {
    this._playSoundAndReleaseId(this.Settings.audio.back, this.Settings.audio.library);
    this.visible = false;
    if (this.parentMenu != null) {
      this.parentMenu.visible = true;
      this.parentMenu._justOpened = true;
      this.parentMenu.menuOpen.emit();
      this.menuChange.emit(this.parentMenu, false);
    }
    this.menuClose.emit();
  }

  public bindMenuToItem(menuToBind: Menu, itemToBindTo: UIMenuItem): void {
    menuToBind.parentMenu = this;
    menuToBind.parentItem = itemToBindTo;
    this.children.set(itemToBindTo.id, menuToBind);
  }

  public releaseMenuFromItem(releaseFrom: UIMenuItem): boolean {
    if (!this.children.has(releaseFrom.id)) {
      return false;
    }
    const menu: Menu = this.children.get(releaseFrom.id);
    menu.parentItem = null;
    menu.parentMenu = null;
    this.children.delete(releaseFrom.id);
    return true;
  }

  private _playSoundAndReleaseId(sound: string, set?: string): void {
    const soundId = Audio.playSoundFrontEnd(sound, set);
    Audio.releaseSound(soundId);
  }

  private _disEnableControls(): void {
    Game.disableAllControlsThisFrame(InputMode.GamePad);
    for (const control of this._settings.enabledControls[Game.CurrentInputMode]) {
      Game.enableControlThisFrame(0, control);
    }
  }

  private _recalculateUpAndDown(): void {
    const separatorHeight = this._calculateSeparatorHeight();
    const y = this._offset.Y - 37 + this._extraOffset + separatorHeight;
    this._extraRectangleUp.pos.Y = 144 + 38 * (this._maxItemsOnScreen + 1) + y;
    this._extraRectangleDown.pos.Y = 144 + 18 + 38 * (this._maxItemsOnScreen + 1) + y;
    this._upAndDownSprite.pos.Y = 147 + 37 * (this._maxItemsOnScreen + 1) + y;
  }

  private _recalculateDescriptionPosition(): void {
    let y = 149 - 37 + this._extraOffset + this._offset.Y;

    let count = this.menuItems.length;
    if (count > this._maxItemsOnScreen + 1) {
      count = this._maxItemsOnScreen + 2;
    }

    y += 38 * count + this._calculateSeparatorHeight();
    this._descriptionBar.pos.Y = y;
    this._descriptionRectangle.pos.Y = y;
    this._descriptionText.pos.Y = y + 6;
  }

  private _calculateSeparatorHeight(index?: number): number {
    let height = 0;
    for (const [idx, separator] of this._menuSeparators) {
      if (
        (index !== undefined ? idx <= index - 1 : true) &&
        idx >= this._minItem &&
        idx <= this._maxItem
      ) {
        height += separator.Height;
      }
    }
    return height;
  }

  private _render(): void {
    if (!this.visible) {
      return;
    }

    if (this._justOpened) {
      if (this._logo != null && !this._logo.IsTextureDictionaryLoaded) {
        this._logo.loadTextureDictionary();
      }
      if (!this._background.IsTextureDictionaryLoaded) {
        this._background.loadTextureDictionary();
      }
      if (!this._descriptionRectangle.IsTextureDictionaryLoaded) {
        this._descriptionRectangle.loadTextureDictionary();
      }
      if (!this._upAndDownSprite.IsTextureDictionaryLoaded) {
        this._upAndDownSprite.loadTextureDictionary();
      }
    }

    const screenResolution = this.ScreenResolution;

    if (this.Settings.scaleWithSafezone) {
      ScreenDrawPositionBegin(76, 84);
      ScreenDrawPositionRatio(0, 0, 0, 0);
    }

    this._mainMenu.draw(undefined, screenResolution);
    this.processControl();

    if (this.Settings.controlDisablingEnabled) {
      this._disEnableControls();
    }

    this._background.size =
      this.menuItems.length > this._maxItemsOnScreen + 1
        ? new Size(
            431 + this._widthOffset,
            38 * (this._maxItemsOnScreen + 1) + this._calculateSeparatorHeight(this._maxItem),
          )
        : new Size(
            431 + this._widthOffset,
            38 * this.menuItems.length + this._calculateSeparatorHeight(),
          );
    this._background.draw(screenResolution);

    if (this.menuItems.length > 0) {
      this.CurrentItem.selected = true;
      if (this.CurrentItem.description.trim() !== '') {
        this._recalculateDescriptionPosition();
        this._descriptionText.caption = this.CurrentItem.description;
        const numLines = this._descriptionText.caption.split('\n').length;
        this._descriptionRectangle.size = new Size(431 + this._widthOffset, numLines * 25 + 15);

        this._descriptionBar.draw(undefined, screenResolution);
        this._descriptionRectangle.draw(screenResolution);
        this._descriptionText.draw(undefined, screenResolution);
      }
    }

    if (this.menuItems.length <= this._maxItemsOnScreen + 1) {
      let count = 0;
      for (const menuItem of this.menuItems) {
        const separatorHeight = this._calculateSeparatorHeight(count);
        menuItem.setVerticalPosition(count * 38 - 37 + this._extraOffset + separatorHeight);
        menuItem.draw(screenResolution);
        if (this._menuSeparators.has(count)) {
          const separator = this._menuSeparators.get(count);
          separator.setVerticalPosition((count + 1) * 38 + separatorHeight);
          separator.draw(screenResolution);
        }
        count += 1;
      }
      if (this._counterText && this._counterOverride) {
        this._counterText.caption = this._counterPretext + this._counterOverride;
        this._counterText.draw(undefined, screenResolution);
      }
    } else {
      let count = 0;
      for (let index = this._minItem; index <= this._maxItem; index += 1) {
        const separatorHeight = this._calculateSeparatorHeight(index);
        const item = this.menuItems[index] as UIMenuItem;
        item.setVerticalPosition(count * 38 - 37 + this._extraOffset + separatorHeight);
        item.draw(screenResolution);
        if (this._menuSeparators.has(index)) {
          const separator = this._menuSeparators.get(index);
          separator.setVerticalPosition((count + 1) * 38 + separatorHeight);
          separator.draw(screenResolution);
        }
        count += 1;
      }

      this._recalculateUpAndDown();
      this._extraRectangleUp.draw(undefined, screenResolution);
      this._extraRectangleDown.draw(undefined, screenResolution);
      this._upAndDownSprite.draw(screenResolution);

      if (this._counterText) {
        if (!this._counterOverride) {
          const cap = `${this.CurrentSelection + 1} / ${this.menuItems.length}`;
          this._counterText.caption = this._counterPretext + cap;
        } else {
          this._counterText.caption = this._counterPretext + this._counterOverride;
        }
        this._counterText.draw(undefined, screenResolution);
      }
    }

    this._logo.draw(screenResolution);

    if (this.Settings.scaleWithSafezone) {
      ScreenDrawPositionEnd();
    }
  }
}
