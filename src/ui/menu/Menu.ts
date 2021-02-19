import {
  Container,
  Hud,
  MenuControls,
  MenuSettings,
  Rectangle,
  Screen,
  Sprite,
  Text,
  UIMenuSeparatorItem,
} from '../';
import { Audio, CursorSprite, Game, GameplayCamera, InputMode, Wait } from '../../';
import { Alignment, Control, Font } from '../../enums';
import { Color, Crypto, LiteEvent, Point, Size } from '../../utils';
import { UIMenuCheckboxItem, UIMenuItem, UIMenuListItem, UIMenuSliderItem } from './items';

export class Menu {
  public static screenAspectRatio = IsDuplicityVersion() ? 0 : Screen.AspectRatio;
  public static screenHeight = 1080;
  public static screenWidth = Menu.screenHeight * Menu.screenAspectRatio;
  public static screenResolution = new Size(Menu.screenWidth, Menu.screenHeight);

  public readonly id: string = Crypto.uuidv4();

  public visible = false;

  public parentMenu: Menu;
  public parentItem: UIMenuItem;
  public items: UIMenuItem[] = [];
  public children: Map<string, Menu> = new Map();

  public readonly menuOpen = new LiteEvent();
  public readonly menuClose = new LiteEvent();
  public readonly menuChange = new LiteEvent();

  public readonly indexChange = new LiteEvent();
  public readonly listChange = new LiteEvent();
  public readonly sliderChange = new LiteEvent();
  public readonly checkboxChange = new LiteEvent();

  public readonly listSelect = new LiteEvent();
  public readonly sliderSelect = new LiteEvent();
  public readonly itemSelect = new LiteEvent();

  public readonly panelActivated = new LiteEvent();

  private _counterPretext = '';
  private _counterOverride: string;
  private _offset: Point;
  private _navigationDelay = 140;
  private _lastUpDownNavigation = 0;
  private _lastLeftRightNavigation = 0;
  private _activeItem = 1000;
  private _widthOffset = 0;
  private _drawOffset = new Point();
  private _justOpened = true;
  private _mousePressed = false;
  private _minItem = 0;
  private _maxItem = 9;
  private _maxItemsOnScreen = this._maxItem;
  private _controls = new MenuControls();
  private _settings = new MenuSettings();

  private readonly _title: Text;
  private readonly _subtitle: Text;
  private readonly _mainMenu: Container;
  private readonly _logo: Sprite;
  private readonly _upAndDownSprite: Sprite;
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
    this._offset = offset;

    // Create everything
    this._mainMenu = new Container(new Point(), new Size(700, 500), Color.transparent);
    this._logo = new Sprite(
      spriteLibrary || '',
      spriteName || '',
      new Point(this._offset.X, this._offset.Y),
      new Size(431, 107),
    );
    this._mainMenu.addItem([
      (this._title = new Text(
        title || '',
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
      (this._subtitle = new Text(
        subtitle || '',
        new Point(8 + this._offset.X, 110 + this._offset.Y),
        0.35,
        Color.white,
        0,
        Alignment.Left,
      )),
    ]);

    if (this._subtitle.caption.startsWith('~')) {
      this._counterPretext = this._subtitle.caption.substr(0, 3);
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
      new Point(this._offset.X, 144 + this._offset.Y),
      new Size(290, 25),
    );

    setTick(() => {
      this._render();
    });
  }

  public set Title(text: string) {
    this._title.caption = text;
  }

  public get Title(): string {
    return this._title.caption;
  }

  public set Subtitle(text: string) {
    this._subtitle.caption = text;
  }

  public get Subtitle(): string {
    return this._subtitle.caption;
  }

  public set SubtitleForeColor(color: Color) {
    this._subtitle.color = color;
  }

  public get SubtitleForeColor(): Color {
    return this._subtitle.color;
  }

  public set SubtitleBackColor(color: Color) {
    this._subtitleResRectangle.color = color;
  }

  public get SubtitleBackColor(): Color {
    return this._subtitleResRectangle.color;
  }

  public get CurrentItem(): UIMenuItem {
    return this.items[this._activeItem % this.items.length];
  }

  public set CurrentItem(value: UIMenuItem) {
    const index = this.items.findIndex(i => i.id === value.id);
    if (index !== -1) {
      this.CurrentSelection = index;
    }
  }

  public get CurrentSelection(): number {
    return this._activeItem % this.items.length;
  }

  public set CurrentSelection(v: number) {
    this.CurrentItem.selected = false;
    this._activeItem = 1000 - (1000 % this.items.length) + v;
    const currentSelection = this.CurrentSelection;
    if (currentSelection > this._maxItem) {
      this._maxItem = currentSelection;
      this._minItem = currentSelection - this._maxItemsOnScreen;
    } else if (currentSelection < this._minItem) {
      this._maxItem = this._maxItemsOnScreen + currentSelection;
      this._minItem = currentSelection;
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

    this.items.forEach(item => {
      item.formatDescription();
    });
  }

  public get DrawOffset(): Point {
    return this.Settings.scaleWithSafezone ? this._drawOffset : new Point();
  }

  public get Controls(): MenuControls {
    return this._controls;
  }

  public get Settings(): MenuSettings {
    return this._settings;
  }

  public addNewSubMenu(text: string, description?: string, inherit = true): Menu {
    let menu;
    if (inherit) {
      menu = new Menu(
        this._title.caption,
        text,
        this._offset,
        this._logo.TextureDict,
        this._logo.textureName,
      );
      menu.WidthOffset = this.WidthOffset;
      menu._settings = this._settings;
    } else {
      menu = new Menu(this._title.caption, text);
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

  public addItem(items: UIMenuItem | UIMenuItem[]): void {
    if (!Array.isArray(items)) {
      items = [items];
    }

    items.forEach(item => {
      item.offset = this._offset;
      item.parent = this;
      item.formatDescription();
    });

    this.items.push(...items);

    this.refreshIndex();
  }

  public removeItem(itemOrIndex: UIMenuItem | number): void {
    if (typeof itemOrIndex === 'number') {
      this.items = this.items.filter((i, index) => index !== itemOrIndex);
    } else {
      this.items = this.items.filter(i => i.id !== itemOrIndex.id);
    }
    this.refreshIndex();
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

  public refreshIndex(): void {
    if (this.items.length === 0) {
      this._activeItem = 1000;
      this._maxItem = this._maxItemsOnScreen;
      this._minItem = 0;
      return;
    }

    for (const item of this.items) {
      item.selected = false;
    }

    this._activeItem = 1000 - (1000 % this.items.length);
    this._maxItem = this._maxItemsOnScreen;
    this._minItem = 0;

    if (
      this.CurrentItem instanceof UIMenuSeparatorItem &&
      this._isThereAnyItemExcludingSeparators()
    ) {
      this.goDown();
    }
  }

  public clear(): void {
    this.items = [];
    this._recalculateUpAndDown();
    this._recalculateDescriptionPosition();
  }

  public open(): void {
    this._playSoundAndReleaseId(this.Settings.audio.back, this.Settings.audio.library);
    this.visible = true;
    this._justOpened = true;
    if (!this.parentMenu && this.Settings.resetCursorOnOpen) {
      Hud.CursorPosition = new Point(0.5, 0.5);
      Hud.CursorSprite = CursorSprite.Normal;
    }
    this.menuOpen.emit();
  }

  public close(): void {
    this._playSoundAndReleaseId(this.Settings.audio.back, this.Settings.audio.library);
    this.visible = false;
    this.refreshIndex();
    this.menuClose.emit();
  }

  public goLeft(): void {
    const item = this.CurrentItem;
    if (item instanceof UIMenuListItem) {
      if (!item.Items.length) {
        return;
      }
      item.Index -= 1;
      this._playSoundAndReleaseId(this.Settings.audio.leftRight, this.Settings.audio.library);
      this.listChange.emit(item, item.Index, item.SelectedItem);
      item.listChanged.emit(item.Index, item.SelectedItem);
    } else if (item instanceof UIMenuSliderItem) {
      if (!item.Items.length) {
        return;
      }
      item.Index -= 1;
      this._playSoundAndReleaseId(this.Settings.audio.leftRight, this.Settings.audio.library);
      this.sliderChange.emit(item, item.Index, item.indexToItem(item.Index));
      item.sliderChanged.emit(item.Index, item.indexToItem(item.Index));
    }
  }

  public goRight(): void {
    const item = this.CurrentItem;
    if (item instanceof UIMenuListItem) {
      if (item.Items.length === 0) {
        return;
      }
      item.Index += 1;
      this._playSoundAndReleaseId(this.Settings.audio.leftRight, this.Settings.audio.library);
      this.listChange.emit(item, item.Index, item.SelectedItem);
      item.listChanged.emit(item.Index, item.SelectedItem);
    } else if (item instanceof UIMenuSliderItem) {
      item.Index += 1;
      this._playSoundAndReleaseId(this.Settings.audio.leftRight, this.Settings.audio.library);
      this.sliderChange.emit(item, item.Index, item.indexToItem(item.Index));
      item.sliderChanged.emit(item.Index, item.indexToItem(item.Index));
    }
  }

  public selectItem(): void {
    const item = this.CurrentItem;
    if (!item.enabled) {
      this._playSoundAndReleaseId(this.Settings.audio.error, this.Settings.audio.library);
      return;
    }
    this._playSoundAndReleaseId(this.Settings.audio.select, this.Settings.audio.library);
    if (item instanceof UIMenuCheckboxItem) {
      item.Checked = !item.Checked;
      this.checkboxChange.emit(item, item.Checked);
      item.checkboxChanged.emit(item.Checked);
    } else if (item instanceof UIMenuListItem) {
      this.listSelect.emit(item, item.Index, item.SelectedItem);
      item.listSelected.emit(item.Index, item.SelectedItem);
    } else if (item instanceof UIMenuSliderItem) {
      this.sliderSelect.emit(item, item.Index, item.indexToItem(item.Index));
      item.sliderSelected.emit(item.Index, item.indexToItem(item.Index));
    } else {
      this.itemSelect.emit(item, this.CurrentSelection);
      item.activated.emit();
      if (this.children.has(item.id)) {
        const subMenu = this.children.get(item.id);
        this.visible = false;
        subMenu.visible = true;
        subMenu._justOpened = true;
        subMenu.menuOpen.emit();
        this.menuChange.emit(subMenu, true);
      }
    }
    item.fireEvent();
  }

  public isMouseInBounds(pos: Point, size: Size, drawOffset = true): boolean {
    const resolution = Menu.screenResolution;
    const cX = (GetControlNormal(0, Control.CursorX) * resolution.width) / resolution.width;
    const cY = (GetControlNormal(0, Control.CursorY) * resolution.height) / resolution.height;
    let x = pos.X / resolution.width;
    let y = pos.Y / resolution.height;
    const w = size.width / resolution.width;
    const h = size.height / resolution.height;
    if (drawOffset) {
      x += this._drawOffset.X;
      y += this._drawOffset.Y;
    }
    return cX >= x && cX <= x + w && cY > y && cY < y + h;
  }

  public goUp(): void {
    this.CurrentItem.selected = false;
    if (this.items.length > this._maxItemsOnScreen + 1) {
      if (this.CurrentSelection <= this._minItem) {
        if (this.CurrentSelection === 0) {
          this._minItem = this.items.length - this._maxItemsOnScreen - 1;
          this._maxItem = this.items.length - 1;
          this._activeItem = 1000 - (1000 % this.items.length);
          this._activeItem += this.items.length - 1;
        } else {
          this._minItem--;
          this._maxItem--;
          this._activeItem--;
        }
      } else {
        this._activeItem--;
      }
    } else {
      this._activeItem--;
    }
    // Skip separator items
    if (
      this.CurrentItem instanceof UIMenuSeparatorItem &&
      this._isThereAnyItemExcludingSeparators()
    ) {
      this.goUp();
    } else {
      this.CurrentItem.selected = true;
      this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
      this.indexChange.emit(this.CurrentSelection);
    }
  }

  public goDown(): void {
    this.CurrentItem.selected = false;
    if (this.items.length > this._maxItemsOnScreen + 1) {
      if (this.CurrentSelection >= this._maxItem) {
        if (this.CurrentSelection === this.items.length - 1) {
          this._minItem = 0;
          this._maxItem = this._maxItemsOnScreen;
          this._activeItem = 1000 - (1000 % this.items.length);
        } else {
          this._minItem++;
          this._maxItem++;
          this._activeItem++;
        }
      } else {
        this._activeItem++;
      }
    } else {
      this._activeItem++;
    }
    // Skip separator items
    if (
      this.CurrentItem instanceof UIMenuSeparatorItem &&
      this._isThereAnyItemExcludingSeparators()
    ) {
      this.goDown();
    } else {
      this.CurrentItem.selected = true;
      this._playSoundAndReleaseId(this.Settings.audio.upDown, this.Settings.audio.library);
      this.indexChange.emit(this.CurrentSelection);
    }
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

  private _processMouse(): void {
    if (
      !this.visible ||
      this._justOpened ||
      !this.items.length ||
      Game.CurrentInputMode === InputMode.GamePad ||
      !this.Settings.mouseControlsEnabled
    ) {
      Game.enableControlThisFrame(0, Control.LookUp);
      Game.enableControlThisFrame(0, Control.LookDown);
      Game.enableControlThisFrame(0, Control.Attack);
      Game.enableControlThisFrame(0, Control.Aim);
      return;
    }

    Hud.showCursorThisFrame();

    if (this.Settings.mouseEdgeEnabled) {
      if (this.isMouseInBounds(new Point(), new Size(30, Menu.screenHeight), false)) {
        GameplayCamera.RelativeHeading += 1;
        Hud.CursorSprite = CursorSprite.LeftArrow;
      } else if (
        this.isMouseInBounds(
          new Point(Menu.screenWidth - 30),
          new Size(30, Menu.screenHeight),
          false,
        )
      ) {
        GameplayCamera.RelativeHeading -= 1;
        Hud.CursorSprite = CursorSprite.RightArrow;
      } else {
        Hud.CursorSprite = CursorSprite.Normal;
      }
    }

    if (this._mousePressed) {
      return;
    }

    let hoveredItem, hoveredItemIndex;
    const limit =
      this.items.length > this._maxItemsOnScreen + 1 ? this._maxItem : this.items.length - 1;

    for (let i = this._minItem; i <= limit; i++) {
      const item = this.items[i] as UIMenuItem;
      if (item instanceof UIMenuSeparatorItem) {
        continue;
      }
      if (!hoveredItem && item.IsMouseInBounds) {
        item.hovered = true;
        hoveredItem = item;
        hoveredItemIndex = i;
      } else {
        item.hovered = false;
      }
    }

    if (hoveredItem && Game.isDisabledControlJustPressed(0, Control.Attack)) {
      (async () => {
        this._mousePressed = true;
        if (hoveredItem.selected) {
          if (hoveredItem.enabled) {
            if (hoveredItem instanceof UIMenuListItem || hoveredItem instanceof UIMenuSliderItem) {
              if (hoveredItem.IsMouseInBoundsOfLeftArrow) {
                this.goLeft();
              } else if (hoveredItem.IsMouseInBoundsOfRightArrow) {
                this.goRight();
              } else {
                this.selectItem();
              }
            } else {
              this.selectItem();
            }
          } else {
            this._playSoundAndReleaseId(this.Settings.audio.error, this.Settings.audio.library);
          }
        } else {
          this._playSoundAndReleaseId(this.Settings.audio.error, this.Settings.audio.library);
          this.CurrentSelection = hoveredItemIndex;
          this.indexChange.emit(this.CurrentSelection);
        }
        await Wait(this._navigationDelay);
        while (Game.isDisabledControlPressed(0, Control.Attack) && hoveredItem.IsMouseInBounds) {
          if (hoveredItem.selected) {
            if (hoveredItem.enabled) {
              if (
                hoveredItem instanceof UIMenuListItem ||
                hoveredItem instanceof UIMenuSliderItem
              ) {
                if (hoveredItem.IsMouseInBoundsOfLeftArrow) {
                  this.goLeft();
                } else if (hoveredItem.IsMouseInBoundsOfRightArrow) {
                  this.goRight();
                }
              }
            } else {
              this._playSoundAndReleaseId(this.Settings.audio.error, this.Settings.audio.library);
            }
          } else {
            this._playSoundAndReleaseId(this.Settings.audio.error, this.Settings.audio.library);
            this.CurrentSelection = hoveredItemIndex;
            this.indexChange.emit(this.CurrentSelection);
          }
          await Wait(125);
        }
        this._mousePressed = false;
      })();
    }

    if (this.items.length <= this._maxItemsOnScreen + 1 || this._mousePressed) {
      return;
    }

    if (this.isMouseInBounds(this._extraRectangleUp.pos, this._extraRectangleUp.size)) {
      this._extraRectangleUp.color = Color.fromRgb(30, 30, 30);
      if (Game.isDisabledControlJustPressed(0, Control.Attack)) {
        (async () => {
          this._mousePressed = true;
          this.goUp();
          await Wait(this._navigationDelay);
          while (Game.isDisabledControlPressed(0, Control.Attack)) {
            this.goUp();
            await Wait(125);
          }
          this._mousePressed = false;
        })();
      }
    } else {
      this._extraRectangleUp.color = new Color(200, 0, 0, 0);
    }

    if (this._mousePressed) {
      return;
    }

    if (this.isMouseInBounds(this._extraRectangleDown.pos, this._extraRectangleDown.size)) {
      this._extraRectangleDown.color = Color.fromRgb(30, 30, 30);
      if (Game.isDisabledControlJustPressed(0, Control.Attack)) {
        (async () => {
          this._mousePressed = true;
          this.goDown();
          await Wait(this._navigationDelay);
          while (Game.isDisabledControlPressed(0, Control.Attack)) {
            this.goDown();
            await Wait(125);
          }
          this._mousePressed = false;
        })();
      }
    } else {
      this._extraRectangleDown.color = new Color(200, 0, 0, 0);
    }
  }

  private _processControl(): void {
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
    if (this.items.length === 0) {
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
      this.goUp();
    }
    // Down
    if (
      this.Controls.down.Enabled &&
      (Game.isDisabledControlPressed(0, Control.PhoneDown) ||
        Game.isDisabledControlPressed(0, Control.CursorScrollDown)) &&
      this._lastUpDownNavigation + this._navigationDelay < Date.now()
    ) {
      this._lastUpDownNavigation = Date.now();
      this.goDown();
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

  private _isThereAnyItemExcludingSeparators(): boolean {
    return !!this.items.filter(item => !(item instanceof UIMenuSeparatorItem)).length;
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
    const y = this._offset.Y;
    this._extraRectangleUp.pos.Y = 144 + 38 * (this._maxItemsOnScreen + 1) + y;
    this._extraRectangleDown.pos.Y = 144 + 18 + 38 * (this._maxItemsOnScreen + 1) + y;
    this._upAndDownSprite.pos.Y = 147 + 37 * (this._maxItemsOnScreen + 1) + y;
  }

  private _recalculateDescriptionPosition(): void {
    let y = 149 + this._offset.Y;

    let count = this.items.length;
    if (count > this._maxItemsOnScreen + 1) {
      count = this._maxItemsOnScreen + 2;
    }

    y += 38 * count;
    this._descriptionBar.pos.Y = y;
    this._descriptionRectangle.pos.Y = y;
    this._descriptionText.pos.Y = y + 6;
  }

  private _calculateItemHeight(): number {
    const y = 149 + this._offset.Y;

    let count = this.items.length;
    if (count > this._maxItemsOnScreen + 1) {
      count = this._maxItemsOnScreen + 2;
    }

    return y + 38 * count;
  }

  private _calculatePanelPosition(hasDescription: boolean): number {
    let height = 0;
    if (hasDescription) {
      height += this._descriptionRectangle.size.height + 5;
    }
    return this._calculateItemHeight() + height;
  }

  private _render(): void {
    if (!this.visible || Game.IsPaused) {
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

    if (this.Settings.scaleWithSafezone) {
      ScreenDrawPositionBegin(76, 84);
      ScreenDrawPositionRatio(0, 0, 0, 0);
      const pos = GetScriptGfxPosition(0, 0);
      this._drawOffset.X = pos[0];
      this._drawOffset.Y = pos[1];
    }

    this._mainMenu.draw(undefined, Menu.screenResolution);
    this._processControl();
    this._processMouse();

    if (this.Settings.controlDisablingEnabled) {
      this._disEnableControls();
    }

    this._background.size =
      this.items.length > this._maxItemsOnScreen + 1
        ? new Size(431 + this._widthOffset, 38 * (this._maxItemsOnScreen + 1))
        : new Size(431 + this._widthOffset, 38 * this.items.length);
    this._background.draw(Menu.screenResolution);

    if (this.items.length > 0) {
      const hasDescription = this.CurrentItem.Description && this.CurrentItem.Description !== '';
      this.CurrentItem.selected = true;

      if (hasDescription) {
        this._recalculateDescriptionPosition();
        this._descriptionText.caption = this.CurrentItem.FormattedDescription;
        const numLines = this._descriptionText.caption.split('\n').length;
        this._descriptionRectangle.size = new Size(431 + this._widthOffset, numLines * 25 + 15);

        this._descriptionBar.draw(undefined, Menu.screenResolution);
        this._descriptionRectangle.draw(Menu.screenResolution);
        this._descriptionText.draw(undefined, Menu.screenResolution);
      }

      if (this.CurrentItem.Panels && this.CurrentItem.Panels.length) {
        let offset = this._calculatePanelPosition(hasDescription);
        for (let i = 0; i < this.CurrentItem.Panels.length; i++) {
          if (i > 0) {
            offset += this.CurrentItem.Panels[i - 1].Height + 5;
          }
          this.CurrentItem.Panels[i].setVerticalPosition(offset);
          this.CurrentItem.Panels[i].draw();
        }
      }
    }

    if (this.items.length <= this._maxItemsOnScreen + 1) {
      let count = 0;
      for (const menuItem of this.items) {
        menuItem.setVerticalPosition(count * 38);
        menuItem.draw();
        count += 1;
      }
      if (this._counterText && this._counterOverride) {
        this._counterText.caption = this._counterPretext + this._counterOverride;
        this._counterText.draw(undefined, Menu.screenResolution);
      }
    } else {
      let count = 0;
      for (let index = this._minItem; index <= this._maxItem; index++) {
        const item = this.items[index] as UIMenuItem;
        item.setVerticalPosition(count * 38);
        item.draw();
        count++;
      }

      this._recalculateUpAndDown();
      this._extraRectangleUp.draw(undefined, Menu.screenResolution);
      this._extraRectangleDown.draw(undefined, Menu.screenResolution);
      this._upAndDownSprite.draw(Menu.screenResolution);

      if (this._counterText) {
        if (!this._counterOverride) {
          const cap = `${this.CurrentSelection + 1} / ${this.items.length}`;
          this._counterText.caption = this._counterPretext + cap;
        } else {
          this._counterText.caption = this._counterPretext + this._counterOverride;
        }
        this._counterText.draw(undefined, Menu.screenResolution);
      }
    }

    this._logo.draw(Menu.screenResolution);

    if (this.Settings.scaleWithSafezone) {
      ScreenDrawPositionEnd();
    }
  }
}
