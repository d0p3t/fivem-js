import { Container, MenuControls, MenuSettings, Screen, Sprite } from '../';
import { Audio, InputMode } from '../../';
import { Alignment, Control, Font } from '../../enums';
import { Game } from '../../Game';
import { Color, LiteEvent, measureString, Point, Size, uuidv4 } from '../../utils';
import { UIMenuCheckboxItem, UIMenuItem, UIMenuListItem, UIMenuSliderItem } from './items';
import { ResRectangle, ResText } from './modules';

export class Menu {
  public readonly id: string = uuidv4();

  public parentMenu: Menu;
  public parentItem: UIMenuItem;
  public children: Map<string, Menu> = new Map();
  public widthOffset = 0;
  public visible = false;
  public mouseControlsEnabled = false;

  public menuItems: (UIMenuItem | UIMenuListItem | UIMenuSliderItem | UIMenuCheckboxItem)[] = [];

  public get CurrentSelection(): number {
    return this.activeItem % this.menuItems.length;
  }

  public set CurrentSelection(v: number) {
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

  private title: string;
  private subtitle: string;
  private counterPretext = '';
  private counterOverride: string = undefined;
  private spriteLibrary: string;
  private spriteName: string;
  private offset: Point;
  private navigationDelay = 140;
  private lastUpDownNavigation = 0;
  private lastLeftRightNavigation = 0;
  private activeItem = 1000;
  private extraOffset = 0;
  private justOpened = true;
  private maxItemsOnScreen = 9;
  private minItem: number;
  private maxItem: number = this.maxItemsOnScreen;
  private _screenHeight = 1080;
  private _controls = new MenuControls();
  private _settings = new MenuSettings();

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

  constructor(
    title: string,
    subtitle: string,
    offset = new Point(0, 0),
    spriteLibrary = 'commonmenu',
    spriteName = 'interaction_bgd',
  ) {
    if (!(offset instanceof Point)) {
      offset = Point.parse(offset);
    }

    this.title = title;
    this.subtitle = subtitle;
    this.spriteLibrary = spriteLibrary;
    this.spriteName = spriteName;
    this.offset = new Point(offset.X, offset.Y);

    // Create everything
    this.mainMenu = new Container(new Point(0, 0), new Size(700, 500), new Color(0, 0, 0, 0));
    this.logo = new Sprite(
      this.spriteLibrary,
      this.spriteName,
      new Point(this.offset.X, this.offset.Y),
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
          new Point(this.offset.X, 107 + this.offset.Y),
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
        this.offset.X,
        144 + 38 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset,
      ),
      new Size(431, 18),
      new Color(200, 0, 0, 0),
    );

    this.extraRectangleDown = new ResRectangle(
      new Point(
        this.offset.X,
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
      this._render();
    });
  }

  public setMenuWidthOffset(widthOffset: number): void {
    this.widthOffset = widthOffset;
    if (this.logo != null) {
      this.logo.size = new Size(431 + this.widthOffset, 107);
    }
    this.mainMenu.items[0].pos = new Point(
      ((this.widthOffset + 431) / 2) + this.offset.X,
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

  public addNewSubMenu(text: string, description?: string, inherit = true): Menu {
    let menu;
    if (inherit) {
      menu = new Menu(this.title, text, this.offset, this.spriteLibrary, this.spriteName);
      menu.setMenuWidthOffset(this.widthOffset);
      menu._settings = this._settings;
    } else {
      menu = new Menu(this.title, text);
    }
    const item = new UIMenuItem(text, description);
    this.addItem(item);
    this.bindMenuToItem(menu, item);
    return menu;
  }

  public addSubMenu(subMenuToAdd: Menu, text: string, description?: string, inherit = true): Menu {
    if (inherit) {
      subMenuToAdd.setMenuWidthOffset(this.widthOffset);
      subMenuToAdd._settings = this._settings;
    }
    const item = new UIMenuItem(text, description);
    this.addItem(item);
    this.bindMenuToItem(subMenuToAdd, item);
    return subMenuToAdd;
  }

  public addItem(item: UIMenuItem): void {
    if (this.justOpened) {
      this.justOpened = false;
    }
    item.offset = this.offset;
    item.parent = this;
    item.setVerticalPosition(this.menuItems.length * 25 - 37 + this.extraOffset);
    this.menuItems.push(item);

    this.formatItemDescription(item);

    this.refreshIndex();
    this._recalculateDescriptionPosition();
  }

  public formatItemDescription(item: UIMenuItem): void {
    let input = item.description;
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

    item.description = output;
  }

  public refreshIndex(): void {
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

  public clear(): void {
    this.menuItems = [];
    this._recalculateDescriptionPosition();
  }

  public open(): void {
    this._playSoundAndReleaseId(this.Settings.audio.back, this.Settings.audio.library);
    this.visible = true;
    this.justOpened = true;
    this.menuOpen.emit();
  }

  public close(): void {
    this._playSoundAndReleaseId(this.Settings.audio.back, this.Settings.audio.library);
    this.visible = false;
    this.refreshIndex();
    this.menuClose.emit();
  }

  public set Title(text: string) {
    this.title = text;
    this.titleResText.caption = text;
  }

  public get Title(): string {
    return this.title;
  }

  public set Subtitle(text: string) {
    this.subtitle = text;
    this.subtitleResText.caption = text;
  }

  public get Subtitle(): string {
    return this.subtitle;
  }

  public set SubtitleForeColor(color: Color) {
    this.subtitleResText.color = color;
  }

  public get SubtitleForeColor(): Color {
    return this.subtitleResText.color;
  }

  public set SubtitleBackColor(color: Color) {
    this.subtitleResRectangle.color = color;
  }

  public get SubtitleBackColor(): Color {
    return this.subtitleResRectangle.color;
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
        subMenu.justOpened = true;
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
    if (this.justOpened) {
      this.justOpened = false;
      return;
    }
    // Back
    if (
      this.Controls.back.Enabled
      && Game.isDisabledControlJustReleased(0, Control.PhoneCancel)
    ) {
      this.goBack();
    }
    if (this.menuItems.length === 0) {
      return;
    }
    // Up
    if (
      this.Controls.up.Enabled
      && (
        Game.isDisabledControlPressed(0, Control.PhoneUp)
        || Game.isDisabledControlPressed(0, Control.CursorScrollUp)
      )
      && this.lastUpDownNavigation + this.navigationDelay < Date.now()
    ) {
      this.lastUpDownNavigation = Date.now();
      if (this.menuItems.length > this.maxItemsOnScreen + 1) {
        this.goUpOverflow();
      } else {
        this.goUp();
      }
    }
    // Down
    if (
      this.Controls.down.Enabled
      && (
        Game.isDisabledControlPressed(0, Control.PhoneDown)
        || Game.isDisabledControlPressed(0, Control.CursorScrollDown)
      )
      && this.lastUpDownNavigation + this.navigationDelay < Date.now()
    ) {
      this.lastUpDownNavigation = Date.now();
      if (this.menuItems.length > this.maxItemsOnScreen + 1) {
        this.goDownOverflow();
      } else {
        this.goDown();
      }
    }
    // Left
    if (
      this.Controls.left.Enabled
      && Game.isDisabledControlPressed(0, Control.PhoneLeft)
      && this.lastLeftRightNavigation + this.navigationDelay < Date.now()
    ) {
      this.lastLeftRightNavigation = Date.now();
      this.goLeft();
    }
    // Right
    if (
      this.Controls.right.Enabled
      && Game.isDisabledControlPressed(0, Control.PhoneRight)
      && this.lastLeftRightNavigation + this.navigationDelay < Date.now()
    ) {
      this.lastLeftRightNavigation = Date.now();
      this.goRight();
    }
    // Select
    if (
      this.Controls.select.Enabled
      && Game.isDisabledControlJustPressed(0, Control.FrontendAccept)
    ) {
      this.selectItem();
    }
  }

  public goUpOverflow(): void {
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
    this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goUp(): void {
    if (this.menuItems.length > this.maxItemsOnScreen + 1) {
      return;
    }
    this.menuItems[this.activeItem % this.menuItems.length].selected = false;
    this.activeItem -= 1;
    this.menuItems[this.activeItem % this.menuItems.length].selected = true;
    this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goDownOverflow(): void {
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
    this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goDown(): void {
    if (this.menuItems.length > this.maxItemsOnScreen + 1) {
      return;
    }
    this.menuItems[this.activeItem % this.menuItems.length].selected = false;
    this.activeItem += 1;
    this.menuItems[this.activeItem % this.menuItems.length].selected = true;
    this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
    this.indexChange.emit(this.CurrentSelection);
  }

  public goBack(): void {
    this._playSoundAndReleaseId(this.Settings.audio.back, this.Settings.audio.library);
    this.visible = false;
    if (this.parentMenu != null) {
      this.parentMenu.visible = true;
      this.parentMenu.justOpened = true;
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
    for (let control of this._settings.enabledControls[Game.CurrentInputMode]) {
      Game.enableControlThisFrame(0, control);
    }
  }

  private _recalculateDescriptionPosition(): void {
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

  private _render(): void {
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

    const screenResolution = this.ScreenResolution;

    if (this.Settings.scaleWithSafezone) {
      ScreenDrawPositionBegin(76, 84);
      ScreenDrawPositionRatio(0, 0, 0, 0);
    }

    this.mainMenu.draw(undefined, screenResolution);
    this.processControl();

    if (this.Settings.controlDisablingEnabled) {
      this._disEnableControls();
    }

    this.background.size =
      this.menuItems.length > this.maxItemsOnScreen + 1
        ? new Size(431 + this.widthOffset, 38 * (this.maxItemsOnScreen + 1))
        : new Size(431 + this.widthOffset, 38 * this.menuItems.length);
    this.background.draw(screenResolution);

    if (this.menuItems.length > 0) {
      this.menuItems[this.activeItem % this.menuItems.length].selected = true;
      if (this.menuItems[this.activeItem % this.menuItems.length].description.trim() !== '') {
        this._recalculateDescriptionPosition();
        this.descriptionText.caption = this.menuItems[this.activeItem % this.menuItems.length].description;
        const numLines = this.descriptionText.caption.split('\n').length;
        this.descriptionRectangle.size = new Size(431 + this.widthOffset, numLines * 25 + 15);

        this.descriptionBar.draw(undefined, screenResolution);
        this.descriptionRectangle.draw(screenResolution);
        this.descriptionText.draw(undefined, screenResolution);
      }
    }

    if (this.menuItems.length <= this.maxItemsOnScreen + 1) {
      let count = 0;
      for (const menuItem of this.menuItems) {
        menuItem.setVerticalPosition(count * 38 - 37 + this.extraOffset);
        menuItem.draw(screenResolution);
        count += 1;
      }
      if (this.counterText && this.counterOverride) {
        this.counterText.caption = this.counterPretext + this.counterOverride;
        this.counterText.draw(undefined, screenResolution);
      }
    } else {
      let count = 0;
      for (let index = this.minItem; index <= this.maxItem; index += 1) {
        const item = this.menuItems[index] as UIMenuItem;
        item.setVerticalPosition(count * 38 - 37 + this.extraOffset);
        item.draw(screenResolution);
        count += 1;
      }
      this.extraRectangleUp.size = new Size(431 + this.widthOffset, 18);
      this.extraRectangleDown.size = new Size(431 + this.widthOffset, 18);
      this.upAndDownSprite.pos = new Point(
        190 + this.offset.X + this.widthOffset / 2,
        147 + 37 * (this.maxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset,
      );

      this.extraRectangleUp.draw(undefined, screenResolution);
      this.extraRectangleDown.draw(undefined, screenResolution);
      this.upAndDownSprite.draw(screenResolution);
      if (this.counterText) {
        if (!this.counterOverride) {
          const cap = `${this.CurrentSelection + 1} / ${this.menuItems.length}`;
          this.counterText.caption = this.counterPretext + cap;
        } else {
          this.counterText.caption = this.counterPretext + this.counterOverride;
        }
        this.counterText.draw(undefined, screenResolution);
      }
    }

    this.logo.draw(screenResolution);

    if (this.Settings.scaleWithSafezone) {
      ScreenDrawPositionEnd();
    }
  }
}
