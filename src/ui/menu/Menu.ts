import UUIDV4 from '../../utils/uuidv4';
import Point from '../../utils/Point';
import UIMenuItem from './items/UIMenuItem';
import UIMenuListItem from './items/UIMenuListItem';
import UIMenuSliderItem from './items/UIMenuSliderItem';
import UIMenuCheckboxItem from './items/UIMenuCheckboxItem';
import LiteEvent from '../../utils/LiteEvent';
import Sprite from '../Sprite';
import ResText, { Alignment } from './modules/ResText';
import ResRectangle from './modules/ResRectangle';
import Container from '../Container';
import Color from '../../utils/Color';
import Size from '../../utils/Size';
import Font from '../../enums/Font';
import { Audio } from '../../Audio';
import { Game, Control } from '../../Game';
import { MeasureString } from '../../utils/String';
import { Screen } from '../Screen';

export default class Menu {
  public readonly Id: string = UUIDV4();

  private title: string;
  private subtitle: string;
  private counterPretext: string = '';
  private counterOverride: string = undefined;
  private spriteLibrary: string;
  private spriteName: string;
  private offset: Point;

  private lastUpDownNavigation = 0;
  private lastLeftRightNavigation = 0;

  private _activeItem: number = 1000;

  private extraOffset: number = 0;

  public ParentMenu: Menu;
  public ParentItem: UIMenuItem;

  public Children: Map<string, Menu>;

  public WidthOffset: number = 0;

  public Visible: boolean = true;

  public MouseControlsEnabled: boolean = false;

  private _justOpened: boolean = true;

  private safezoneOffset: Point = new Point(0, 0);

  private MaxItemsOnScreen: number = 9;
  private _minItem: number;
  private _maxItem: number = this.MaxItemsOnScreen;

  public AUDIO_LIBRARY: string = 'HUD_FRONTEND_DEFAULT_SOUNDSET';

  public AUDIO_UPDOWN: string = 'NAV_UP_DOWN';
  public AUDIO_LEFTRIGHT: string = 'NAV_LEFT_RIGHT';
  public AUDIO_SELECT: string = 'SELECT';
  public AUDIO_BACK: string = 'BACK';
  public AUDIO_ERROR: string = 'ERROR';

  public MenuItems: (UIMenuItem | UIMenuListItem | UIMenuSliderItem | UIMenuCheckboxItem)[] = [];

  get CurrentSelection() {
    return this._activeItem % this.MenuItems.length;
  }
  set CurrentSelection(v) {
    this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
    this._activeItem = 1000 - (1000 % this.MenuItems.length) + v;
    if (this.CurrentSelection > this._maxItem) {
      this._maxItem = this.CurrentSelection;
      this._minItem = this.CurrentSelection - this.MaxItemsOnScreen;
    } else if (this.CurrentSelection < this._minItem) {
      this._maxItem = this.MaxItemsOnScreen + this.CurrentSelection;
      this._minItem = this.CurrentSelection;
    }
  }

  public readonly IndexChange = new LiteEvent();
  public readonly ListChange = new LiteEvent();
  public readonly SliderChange = new LiteEvent();
  public readonly SliderSelect = new LiteEvent();
  public readonly CheckboxChange = new LiteEvent();
  public readonly ItemSelect = new LiteEvent();
  public readonly MenuOpen = new LiteEvent();
  public readonly MenuClose = new LiteEvent();
  public readonly MenuChange = new LiteEvent();

  private MouseEdgeEnabled: boolean = true;

  private readonly _mainMenu: Container;
  private readonly _logo: Sprite;
  private readonly _upAndDownSprite: Sprite;
  private readonly _title: ResText;
  private readonly _subtitle: ResText;
  private readonly _extraRectangleUp: ResRectangle;
  private readonly _extraRectangleDown: ResRectangle;
  private readonly _descriptionBar: ResRectangle;
  private readonly _descriptionRectangle: Sprite;
  private readonly _descriptionText: ResText;
  private readonly _counterText: ResText;
  private readonly _background: Sprite;

  constructor(title, subtitle, offset, spriteLibrary, spriteName) {
    if (!(offset instanceof Point)) offset = Point.Parse(offset);

    this.title = title;
    this.subtitle = subtitle;
    this.spriteLibrary = spriteLibrary || 'commonmenu';
    this.spriteName = spriteName || 'interaction_bgd';
    this.offset = new Point(offset.X, offset.Y);
    this.Children = new Map();

    // Create everything
    this._mainMenu = new Container(new Point(0, 0), new Size(700, 500), new Color(0, 0, 0, 0));
    this._logo = new Sprite(
      this.spriteLibrary,
      this.spriteName,
      new Point(0 + this.offset.X, 0 + this.offset.Y),
      new Size(431, 107),
    );
    this._mainMenu.addItem(
      (this._title = new ResText(
        this.title,
        new Point(215 + this.offset.X, 20 + this.offset.Y),
        1.15,
        new Color(255, 255, 255, 255),
        1,
        Alignment.Centered,
      )),
    );

    if (this.subtitle !== '') {
      this._mainMenu.addItem(
        new ResRectangle(new Point(0 + this.offset.X, 107 + this.offset.Y), new Size(431, 37), new Color(0, 0, 0, 255)),
      );
      this._mainMenu.addItem(
        (this._subtitle = new ResText(
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
      this._counterText = new ResText(
        '',
        new Point(425 + this.offset.X, 110 + this.offset.Y),
        0.35,
        new Color(255, 255, 255, 255),
        0,
        Alignment.Right,
      );
      this.extraOffset += 37;
    }

    this._upAndDownSprite = new Sprite(
      'commonmenu',
      'shop_arrows_upanddown',
      new Point(190 + this.offset.X, 147 + 37 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset),
      new Size(50, 50),
    );

    this._extraRectangleUp = new ResRectangle(
      new Point(0 + this.offset.X, 144 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset),
      new Size(431, 18),
      new Color(0, 0, 0, 200),
    );

    this._extraRectangleDown = new ResRectangle(
      new Point(0 + this.offset.X, 144 + 18 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset),
      new Size(431, 18),
      new Color(0, 0, 0, 200),
    );

    this._descriptionBar = new ResRectangle(new Point(this.offset.X, 123), new Size(431, 4), Color.Black);
    this._descriptionRectangle = new Sprite(
      'commonmenu',
      'gradient_bgd',
      new Point(this.offset.X, 127),
      new Size(431, 30),
    );
    this._descriptionText = new ResText(
      'Description',
      new Point(this.offset.X + 5, 125),
      0.35,
      new Color(255, 255, 255, 255),
      Font.ChaletLondon,
      Alignment.Left,
    );

    this._background = new Sprite(
      'commonmenu',
      'gradient_bgd',
      new Point(this.offset.X, 144 + this.offset.Y - 37 + this.extraOffset),
      new Size(290, 25),
    );

    on('render', this.render.bind(this)); // or setImmediate
    console.log(`Created Menu! ${this.title}`);
  }

  private RecalculateDescriptionPosition() {
    this._descriptionBar.pos = new Point(this.offset.X, 149 - 37 + this.extraOffset + this.offset.Y);
    this._descriptionRectangle.pos = new Point(this.offset.X, 149 - 37 + this.extraOffset + this.offset.Y);
    this._descriptionText.pos = new Point(this.offset.X + 8, 155 - 37 + this.extraOffset + this.offset.Y);

    this._descriptionBar.size = new Size(431 + this.WidthOffset, 4);
    this._descriptionRectangle.size = new Size(431 + this.WidthOffset, 30);

    let count = this.MenuItems.length;
    if (count > this.MaxItemsOnScreen + 1) count = this.MaxItemsOnScreen + 2;

    this._descriptionBar.pos = new Point(this.offset.X, 38 * count + this._descriptionBar.pos.Y);
    this._descriptionRectangle.pos = new Point(this.offset.X, 38 * count + this._descriptionRectangle.pos.Y);
    this._descriptionText.pos = new Point(this.offset.X + 8, 38 * count + this._descriptionText.pos.Y);
  }

  public SetMenuWidthOffset(widthOffset: number) {
    this.WidthOffset = widthOffset;
    if (this._logo != null) {
      this._logo.size = new Size(431 + this.WidthOffset, 107);
    }
    this._mainMenu.Items[0].pos = new Point((this.WidthOffset + this.offset.X + 431) / 2, 20 + this.offset.Y);
    if (this._counterText) {
      this._counterText.pos = new Point(425 + this.offset.X + widthOffset, 110 + this.offset.Y);
    }
    if (this._mainMenu.Items.length >= 2) {
      const tmp = this._mainMenu.Items[1];
      tmp.size = new Size(431 + this.WidthOffset, 37);
    }
  }

  public AddItem(item: UIMenuItem) {
    if (this._justOpened) this._justOpened = false;
    item.Offset = this.offset;
    item.Parent = this;
    item.SetVerticalPosition(this.MenuItems.length * 25 - 37 + this.extraOffset);
    this.MenuItems.push(item);

    item.Description = this.FormatDescription(item.Description);

    this.RefreshIndex();
    this.RecalculateDescriptionPosition();
  }

  public RefreshIndex() {
    if (this.MenuItems.length == 0) {
      this._activeItem = 1000;
      this._maxItem = this.MaxItemsOnScreen;
      this._minItem = 0;
      return;
    }

    for (let i = 0; i < this.MenuItems.length; i++) this.MenuItems[i].Selected = false;

    this._activeItem = 1000 - (1000 % this.MenuItems.length);
    this._maxItem = this.MaxItemsOnScreen;
    this._minItem = 0;
  }

  public Clear() {
    this.MenuItems = [];
    this.RecalculateDescriptionPosition();
  }

  public Open() {
    Audio.PlaySoundFrontEnd(this.AUDIO_BACK, this.AUDIO_LIBRARY);
    this.Visible = true;
    this._justOpened = true;
    this.MenuOpen.emit();
  }
  public Close() {
    Audio.PlaySoundFrontEnd(this.AUDIO_BACK, this.AUDIO_LIBRARY);
    this.Visible = false;
    this.RefreshIndex();
    this.MenuClose.emit();
  }

  set Subtitle(text: string) {
    this.subtitle = text;
    this._subtitle.caption = text;
  }

  public GoLeft() {
    if (
      !(this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem) &&
      !(this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem)
    )
      return;
    if (this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem) {
      const it = <UIMenuListItem>this.MenuItems[this.CurrentSelection];
      if (it.Collection.length == 0) return;
      it.Index--;
      Audio.PlaySoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
      this.ListChange.emit(it, it.Index);
    } else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem) {
      const it = <UIMenuSliderItem>this.MenuItems[this.CurrentSelection];
      it.Index = it.Index - 1;
      Audio.PlaySoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
      this.SliderChange.emit(it, it.Index, it.IndexToItem(it.Index));
      // it.SliderChangedTrigger(it.Index);
    }
  }

  public GoRight() {
    if (
      !(this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem) &&
      !(this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem)
    )
      return;
    if (this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem) {
      const it = <UIMenuListItem>this.MenuItems[this.CurrentSelection];
      if (it.Collection.length == 0) return;
      it.Index++;
      Audio.PlaySoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
      this.ListChange.emit(it, it.Index);
    } else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem) {
      const it = <UIMenuSliderItem>this.MenuItems[this.CurrentSelection];
      it.Index++;
      Audio.PlaySoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
      this.SliderChange.emit(it, it.Index, it.IndexToItem(it.Index));
      // it.SliderChangedTrigger(it.Index);
    }
  }

  public SelectItem() {
    if (!this.MenuItems[this.CurrentSelection].Enabled) {
      Audio.PlaySoundFrontEnd(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
      return;
    }
    const it = <UIMenuCheckboxItem>this.MenuItems[this.CurrentSelection];
    if (this.MenuItems[this.CurrentSelection] instanceof UIMenuCheckboxItem) {
      it.Checked = !it.Checked;
      Audio.PlaySoundFrontEnd(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
      this.CheckboxChange.emit(it, it.Checked);
    } else {
      Audio.PlaySoundFrontEnd(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
      this.ItemSelect.emit(it, this.CurrentSelection);
      if (this.Children.has(it.Id)) {
        const subMenu = this.Children.get(it.Id);
        this.Visible = false;
        subMenu.Visible = true;
        subMenu._justOpened = true;
        subMenu.MenuOpen.emit();
        this.MenuChange.emit(subMenu, true);
      }
    }
    it.fireEvent();
  }

  public getMousePosition(relative: boolean = false) {
    const screenw = Screen.Width;
    const screenh = Screen.Height;
    const cursor = mp.gui.cursor.position;
    let [mouseX, mouseY] = [cursor[0], cursor[1]];
    if (relative) [mouseX, mouseY] = [cursor[0] / screenw, cursor[1] / screenh];
    return [mouseX, mouseY];
  }

  public GetScreenResolutionMantainRatio(): Size {
    const screenw = Screen.Width;
    const screenh = Screen.Height;
    const height = 1080.0;
    const ratio = screenw / screenh;
    var width = height * ratio;

    return new Size(width, height);
  }

  public IsMouseInBounds(topLeft: Point, boxSize: Size) {
    const res = this.GetScreenResolutionMantainRatio();
    const [mouseX, mouseY] = this.getMousePosition();
    return (
      mouseX >= topLeft.X &&
      mouseX <= topLeft.X + boxSize.Width &&
      (mouseY > topLeft.Y && mouseY < topLeft.Y + boxSize.Height)
    );
  }

  public IsMouseInListItemArrows(
    item,
    topLeft,
    safezone, // TODO: Ability to scroll left and right
  ) {
    BeginTextCommandWidth('jamyfafi');
    AddTextComponentSubstringPlayerName(item.Text);
    var res = this.GetScreenResolutionMantainRatio();
    var screenw = res.Width;
    var screenh = res.Height;
    const height = 1080.0;
    const ratio = screenw / screenh;
    var width = height * ratio;
    const labelSize = EndTextCommandGetWidth(false) * width * 0.35;

    const labelSizeX = 5 + labelSize + 10;
    const arrowSizeX = 431 - labelSizeX;
    return this.IsMouseInBounds(topLeft, new Size(labelSizeX, 38))
      ? 1
      : this.IsMouseInBounds(new Point(topLeft.X + labelSizeX, topLeft.Y), new Size(arrowSizeX, 38))
      ? 2
      : 0;
  }

  public ProcessMouse() {
    if (!this.Visible || this._justOpened || this.MenuItems.length == 0 || !this.MouseControlsEnabled) {
      /*Common.EnableControl(0, GameControl.LookUpDown);
                Common.EnableControl(0, GameControl.LookLeftRight);
                Common.EnableControl(0, GameControl.Aim);
				Common.EnableControl(0, GameControl.Attack);*/
      this.MenuItems.filter(i => i.Hovered).forEach(i => (i.Hovered = false));
      return;
    }

    if (!mp.gui.cursor.visible) mp.gui.cursor.visible = true;
    let limit = this.MenuItems.length - 1;
    let counter = 0;
    if (this.MenuItems.length > this.MaxItemsOnScreen + 1) limit = this._maxItem;

    if (this.IsMouseInBounds(new Point(0, 0), new Size(30, 1080)) && this.MouseEdgeEnabled) {
      SetGameplayCamRelativeHeading(GetGameplayCamRelativeHeading() + 5.0);
      SetCursorSprite(6);
    } else if (
      this.IsMouseInBounds(new Point(this.GetScreenResolutionMantainRatio().Width - 30.0, 0), new Size(30, 1080)) &&
      this.MouseEdgeEnabled
    ) {
      SetGameplayCamRelativeHeading(GetGameplayCamRelativeHeading() - 5.0);
      SetCursorSprite(7);
    } else if (this.MouseEdgeEnabled) {
      SetCursorSprite(1);
    }

    for (let i = this._minItem; i <= limit; i++) {
      let xpos = this.offset.X;
      let ypos = this.offset.Y + 144 - 37 + this.extraOffset + counter * 38;
      let xsize = 431 + this.WidthOffset;
      const ysize = 38;
      const uiMenuItem = this.MenuItems[i];
      if (this.IsMouseInBounds(new Point(xpos, ypos), new Size(xsize, ysize))) {
        uiMenuItem.Hovered = true;
        if (Game.IsControlJustPressed(0, Control.Attack) || Game.IsDisabledControlJustPressed(0, Control.Attack))
          if (uiMenuItem.Selected && uiMenuItem.Enabled) {
            if (
              this.MenuItems[i] instanceof UIMenuListItem &&
              this.IsMouseInListItemArrows(this.MenuItems[i], new Point(xpos, ypos), 0) > 0
            ) {
              const res = this.IsMouseInListItemArrows(this.MenuItems[i], new Point(xpos, ypos), 0);
              switch (res) {
                case 1:
                  Audio.PlaySoundFrontEnd(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
                  //this.MenuItems[i].ItemActivate(this);
                  this.MenuItems[i].fireEvent();
                  this.ItemSelect.emit(this.MenuItems[i], i);
                  break;
                case 2:
                  var it = <any>this.MenuItems[i];
                  if ((it.Collection == null ? it.Items.Count : it.Collection.Count) > 0) {
                    it.Index++;
                    Audio.PlaySoundFrontEnd(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
                    this.ListChange.emit(it, it.Index);
                  }
                  break;
              }
            } else this.SelectItem();
          } else if (!uiMenuItem.Selected) {
            this.CurrentSelection = i;
            Audio.PlaySoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
            this.IndexChange.emit(this.CurrentSelection);
            this.SelectItem();
          } else if (!uiMenuItem.Enabled && uiMenuItem.Selected) {
            Audio.PlaySoundFrontEnd(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
          }
      } else uiMenuItem.Hovered = false;
      counter++;
    }
    const extraY =
      144 + 38 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset + this.safezoneOffset.Y;
    const extraX = this.safezoneOffset.X + this.offset.X;
    if (this.MenuItems.length <= this.MaxItemsOnScreen + 1) return;
    if (this.IsMouseInBounds(new Point(extraX, extraY), new Size(431 + this.WidthOffset, 18))) {
      this._extraRectangleUp.color = new Color(30, 30, 30, 255);
      if (Game.IsControlJustPressed(0, Control.Attack) || Game.IsDisabledControlJustPressed(0, Control.Attack)) {
        if (this.MenuItems.length > this.MaxItemsOnScreen + 1) this.GoUpOverflow();
        else this.GoUp();
      }
    } else this._extraRectangleUp.color = new Color(0, 0, 0, 200);

    if (this.IsMouseInBounds(new Point(extraX, extraY + 18), new Size(431 + this.WidthOffset, 18))) {
      this._extraRectangleDown.color = new Color(30, 30, 30, 255);
      if (Game.IsControlJustPressed(0, Control.Attack) || Game.IsDisabledControlJustPressed(0, Control.Attack)) {
        if (this.MenuItems.length > this.MaxItemsOnScreen + 1) this.GoDownOverflow();
        else this.GoDown();
      }
    } else this._extraRectangleDown.color = new Color(0, 0, 0, 200);
  }

  public ProcessControl() {
    if (!this.Visible) return;
    if (this._justOpened) {
      this._justOpened = false;
      return;
    }

    if (Game.IsControlJustReleased(0, Control.PhoneCancel)) {
      // Back
      this.GoBack();
    }
    if (this.MenuItems.length == 0) return;
    if (Game.IsControlPressed(0, Control.PhoneUp) && this.lastUpDownNavigation + 120 < Date.now()) {
      // isControlJustPressed
      // Up
      this.lastUpDownNavigation = Date.now();
      if (this.MenuItems.length > this.MaxItemsOnScreen + 1) this.GoUpOverflow();
      else this.GoUp();
    } else if (Game.IsControlPressed(0, Control.PhoneUp)) {
      this.lastUpDownNavigation = 0;
    } else if (Game.IsControlPressed(0, Control.PhoneDown) && this.lastUpDownNavigation + 120 < Date.now()) {
      // isControlJustPressed
      // Down
      this.lastUpDownNavigation = Date.now();
      if (this.MenuItems.length > this.MaxItemsOnScreen + 1) this.GoDownOverflow();
      else this.GoDown();
    } else if (Game.IsControlPressed(0, Control.PhoneDown)) {
      this.lastUpDownNavigation = 0;
    } else if (Game.IsControlPressed(0, Control.PhoneLeft) && this.lastLeftRightNavigation + 100 < Date.now()) {
      // Left
      this.lastLeftRightNavigation = Date.now();
      this.GoLeft();
    } else if (Game.IsControlPressed(0, Control.PhoneLeft)) {
      this.lastLeftRightNavigation = 0;
    } else if (Game.IsControlPressed(0, Control.PhoneRight) && this.lastLeftRightNavigation + 100 < Date.now()) {
      // Right
      this.lastLeftRightNavigation = Date.now();
      this.GoRight();
    } else if (Game.IsControlPressed(0, Control.PhoneRight)) {
      this.lastLeftRightNavigation = 0;
    } else if (Game.IsControlPressed(0, Control.FrontendAccept)) {
      // Select
      this.SelectItem();
    }
  }

  private FormatDescription(input: string) {
    if (input.length > 99) input = input.slice(0, 99);

    const maxPixelsPerLine = 425 + this.WidthOffset;
    let aggregatePixels = 0;
    let output = '';
    const words = input.split(' ');
    for (const word of words) {
      const offset = MeasureString(word);
      aggregatePixels += offset;
      if (aggregatePixels > maxPixelsPerLine) {
        output += '\n' + word + ' ';
        aggregatePixels = offset + MeasureString(' ');
      } else {
        output += word + ' ';
        aggregatePixels += MeasureString(' ');
      }
    }
    return output;
  }

  public GoUpOverflow() {
    if (this.MenuItems.length <= this.MaxItemsOnScreen + 1) return;
    if (this._activeItem % this.MenuItems.length <= this._minItem) {
      if (this._activeItem % this.MenuItems.length == 0) {
        this._minItem = this.MenuItems.length - this.MaxItemsOnScreen - 1;
        this._maxItem = this.MenuItems.length - 1;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
        this._activeItem = 1000 - (1000 % this.MenuItems.length);
        this._activeItem += this.MenuItems.length - 1;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
      } else {
        this._minItem--;
        this._maxItem--;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
        this._activeItem--;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
      }
    } else {
      this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
      this._activeItem--;
      this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
    }
    Audio.PlaySoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
    this.IndexChange.emit(this.CurrentSelection);
  }

  public GoUp() {
    if (this.MenuItems.length > this.MaxItemsOnScreen + 1) return;
    this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
    this._activeItem--;
    this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
    Audio.PlaySoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
    this.IndexChange.emit(this.CurrentSelection);
  }

  public GoDownOverflow() {
    if (this.MenuItems.length <= this.MaxItemsOnScreen + 1) return;
    if (this._activeItem % this.MenuItems.length >= this._maxItem) {
      if (this._activeItem % this.MenuItems.length == this.MenuItems.length - 1) {
        this._minItem = 0;
        this._maxItem = this.MaxItemsOnScreen;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
        this._activeItem = 1000 - (1000 % this.MenuItems.length);
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
      } else {
        this._minItem++;
        this._maxItem++;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
        this._activeItem++;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
      }
    } else {
      this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
      this._activeItem++;
      this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
    }
    Audio.PlaySoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
    this.IndexChange.emit(this.CurrentSelection);
  }

  public GoDown() {
    if (this.MenuItems.length > this.MaxItemsOnScreen + 1) return;
    this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
    this._activeItem++;
    this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
    Audio.PlaySoundFrontEnd(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
    this.IndexChange.emit(this.CurrentSelection);
  }

  public GoBack() {
    Audio.PlaySoundFrontEnd(this.AUDIO_BACK, this.AUDIO_LIBRARY);
    this.Visible = false;
    if (this.ParentMenu != null) {
      this.ParentMenu.Visible = true;
      this.ParentMenu._justOpened = true;
      this.ParentMenu.MenuOpen.emit();
      this.MenuChange.emit(this.ParentMenu, false);
    }
    this.MenuClose.emit();
  }

  public BindMenuToItem(menuToBind: Menu, itemToBindTo: UIMenuItem) {
    menuToBind.ParentMenu = this;
    menuToBind.ParentItem = itemToBindTo;
    this.Children.set(itemToBindTo.Id, menuToBind);
  }

  public ReleaseMenuFromItem(releaseFrom: UIMenuItem) {
    if (!this.Children.has(releaseFrom.Id)) return false;
    const menu: Menu = this.Children.get(releaseFrom.Id);
    menu.ParentItem = null;
    menu.ParentMenu = null;
    this.Children.delete(releaseFrom.Id);
    return true;
  }

  private render() {
    if (!this.Visible) return;

    if (this._justOpened) {
      if (this._logo != null && !this._logo.IsTextureDictionaryLoaded) this._logo.LoadTextureDictionary();
      if (!this._background.IsTextureDictionaryLoaded) this._background.LoadTextureDictionary();
      if (!this._descriptionRectangle.IsTextureDictionaryLoaded) this._descriptionRectangle.LoadTextureDictionary();
      if (!this._upAndDownSprite.IsTextureDictionaryLoaded) this._upAndDownSprite.LoadTextureDictionary();
    }
    this._mainMenu.Draw();

    this.ProcessMouse();
    this.ProcessControl();

    this._background.size =
      this.MenuItems.length > this.MaxItemsOnScreen + 1
        ? new Size(431 + this.WidthOffset, 38 * (this.MaxItemsOnScreen + 1))
        : new Size(431 + this.WidthOffset, 38 * this.MenuItems.length);
    this._background.Draw();

    if (this.MenuItems.length > 0) {
      this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
      if (this.MenuItems[this._activeItem % this.MenuItems.length].Description.trim() !== '') {
        this.RecalculateDescriptionPosition();
        let descCaption = this.MenuItems[this._activeItem % this.MenuItems.length].Description;
        // descCaption = this.FormatDescription(descCaption);
        this._descriptionText.caption = descCaption;
        const numLines = this._descriptionText.caption.split('\n').length;
        this._descriptionRectangle.size = new Size(431 + this.WidthOffset, numLines * 25 + 15);

        this._descriptionBar.Draw();
        this._descriptionRectangle.Draw();
        this._descriptionText.Draw();
      }
    }

    if (this.MenuItems.length <= this.MaxItemsOnScreen + 1) {
      let count = 0;
      for (const item of this.MenuItems) {
        item.SetVerticalPosition(count * 38 - 37 + this.extraOffset);
        item.Draw();
        count++;
      }
      if (this._counterText && this.counterOverride) {
        this._counterText.caption = this.counterPretext + this.counterOverride;
        this._counterText.Draw();
      }
    } else {
      let count = 0;
      for (let index = this._minItem; index <= this._maxItem; index++) {
        var item = this.MenuItems[index];
        item.SetVerticalPosition(count * 38 - 37 + this.extraOffset);
        item.Draw();
        count++;
      }
      this._extraRectangleUp.size = new Size(431 + this.WidthOffset, 18);
      this._extraRectangleDown.size = new Size(431 + this.WidthOffset, 18);
      this._upAndDownSprite.pos = new Point(
        190 + this.offset.X + this.WidthOffset / 2,
        147 + 37 * (this.MaxItemsOnScreen + 1) + this.offset.Y - 37 + this.extraOffset,
      );

      this._extraRectangleUp.Draw();
      this._extraRectangleDown.Draw();
      this._upAndDownSprite.Draw();
      if (this._counterText) {
        if (!this.counterOverride) {
          const cap = this.CurrentSelection + 1 + ' / ' + this.MenuItems.length;
          this._counterText.caption = this.counterPretext + cap;
        } else {
          this._counterText.caption = this.counterPretext + this.counterOverride;
        }
        this._counterText.Draw();
      }
    }

    this._logo.Draw();
  }
}
