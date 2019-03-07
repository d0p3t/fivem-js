import BadgeStyle from '../../../enums/BadgeStyle';
import Font from '../../../enums/Font';
import Color from '../../../utils/Color';
import Point from '../../../utils/Point';
import Size from '../../../utils/Size';
import UUIDV4 from '../../../utils/UUIDV4';
import Sprite from '../../Sprite';
import Menu from '../Menu';
import ResRectangle from '../modules/ResRectangle';
import ResText, { Alignment } from '../modules/ResText';

export default class UIMenuItem {
  public static readonly DefaultBackColor: Color = Color.Empty;
  public static readonly DefaultHighlightedBackColor: Color = Color.White;
  public static readonly DefaultForeColor: Color = Color.WhiteSmoke;
  public static readonly DefaultHighlightedForeColor: Color = Color.Black;

  public readonly Id: string = UUIDV4();

  public BackColor: Color = UIMenuItem.DefaultBackColor;
  public HighlightedBackColor: Color = UIMenuItem.DefaultHighlightedBackColor;

  public ForeColor: Color = UIMenuItem.DefaultForeColor;
  public HighlightedForeColor: Color = UIMenuItem.DefaultHighlightedForeColor;

  public Enabled: boolean;
  public Selected: boolean;
  public Hovered: boolean;
  public Description: string;

  public Offset: Point;
  public Parent: Menu;

  public RightLabel: string = '';
  public LeftBadge: BadgeStyle = BadgeStyle.None;
  public RightBadge: BadgeStyle = BadgeStyle.None;

  protected rectangle: ResRectangle;
  protected text: ResText;
  protected selectedSprite: Sprite;

  protected badgeLeft: Sprite;
  protected badgeRight: Sprite;

  protected labelText: ResText;

  private event: { event: string; args: any[] };

  get Text() {
    return this.text.caption;
  }
  set Text(v) {
    this.text.caption = v;
  }

  constructor(text, description = '') {
    this.Enabled = true;

    this.rectangle = new ResRectangle(new Point(0, 0), new Size(431, 38), new Color(150, 0, 0, 0));
    this.text = new ResText(text, new Point(8, 0), 0.33, Color.WhiteSmoke, Font.ChaletLondon, Alignment.Left);
    this.Description = description;
    this.selectedSprite = new Sprite('commonmenu', 'gradient_nav', new Point(0, 0), new Size(431, 38));

    this.badgeLeft = new Sprite('commonmenu', '', new Point(0, 0), new Size(40, 40));
    this.badgeRight = new Sprite('commonmenu', '', new Point(0, 0), new Size(40, 40));

    this.labelText = new ResText('', new Point(0, 0), 0.35, Color.White, 0, Alignment.Right);
  }

  public SetVerticalPosition(y: number) {
    this.rectangle.pos = new Point(this.Offset.X, y + 144 + this.Offset.Y);
    this.selectedSprite.pos = new Point(0 + this.Offset.X, y + 144 + this.Offset.Y);
    this.text.pos = new Point(8 + this.Offset.X, y + 147 + this.Offset.Y);

    this.badgeLeft.pos = new Point(0 + this.Offset.X, y + 142 + this.Offset.Y);
    this.badgeRight.pos = new Point(385 + this.Offset.X, y + 142 + this.Offset.Y);

    this.labelText.pos = new Point(420 + this.Offset.X, y + 148 + this.Offset.Y);
  }

  public addEvent(event: string, ...args: any[]): void {
    this.event = { event, args };
  }

  public fireEvent(): void {
    if (this.event) {
      TriggerEvent(this.event.event, ...this.event.args);
    }
  }

  public Draw(): void {
    this.rectangle.size = new Size(431 + this.Parent.WidthOffset, 38);
    this.selectedSprite.size = new Size(431 + this.Parent.WidthOffset, 38);

    if (this.Hovered && !this.Selected) {
      this.rectangle.color = new Color(255, 255, 255, 20);
      this.rectangle.Draw();
    }

    this.selectedSprite.color = this.Selected ? this.HighlightedBackColor : this.BackColor;
    this.selectedSprite.Draw();

    this.text.color = this.Enabled
      ? this.Selected
        ? this.HighlightedForeColor
        : this.ForeColor
      : new Color(255, 163, 159, 148);

    if (this.LeftBadge !== BadgeStyle.None) {
      this.text.pos = new Point(35 + this.Offset.X, this.text.pos.Y);
      this.badgeLeft.TextureDict = this.BadgeToSpriteLib(this.LeftBadge);
      this.badgeLeft.textureName = this.BadgeToSpriteName(this.LeftBadge, this.Selected);
      this.badgeLeft.color = this.IsBagdeWhiteSprite(this.LeftBadge)
        ? this.Enabled
          ? this.Selected
            ? this.HighlightedForeColor
            : this.ForeColor
          : new Color(255, 163, 159, 148)
        : Color.White;
      this.badgeLeft.Draw();
    } else {
      this.text.pos = new Point(8 + this.Offset.X, this.text.pos.Y);
    }

    if (this.RightBadge !== BadgeStyle.None) {
      this.badgeRight.pos = new Point(385 + this.Offset.X + this.Parent.WidthOffset, this.badgeRight.pos.Y);
      this.badgeRight.TextureDict = this.BadgeToSpriteLib(this.RightBadge);
      this.badgeRight.textureName = this.BadgeToSpriteName(this.RightBadge, this.Selected);
      this.badgeRight.color = this.IsBagdeWhiteSprite(this.RightBadge)
        ? this.Enabled
          ? this.Selected
            ? this.HighlightedForeColor
            : this.ForeColor
          : new Color(255, 163, 159, 148)
        : Color.White;
      this.badgeRight.Draw();
    }

    if (this.RightLabel && this.RightLabel !== '') {
      this.labelText.pos = new Point(420 + this.Offset.X + this.Parent.WidthOffset, this.labelText.pos.Y);
      this.labelText.caption = this.RightLabel;
      this.labelText.color = this.text.color = this.Enabled
        ? this.Selected
          ? this.HighlightedForeColor
          : this.ForeColor
        : new Color(255, 163, 159, 148);
      this.labelText.Draw();
    }
    this.text.Draw();
  }

  public SetLeftBadge(badge: BadgeStyle): void {
    this.LeftBadge = badge;
  }

  public SetRightBadge(badge: BadgeStyle): void {
    this.RightBadge = badge;
  }

  public SetRightLabel(text: string): void {
    this.RightLabel = text;
  }

  public BadgeToSpriteLib(badge: BadgeStyle): string {
    return 'commonmenu';
  }

  public BadgeToSpriteName(badge: BadgeStyle, selected: boolean): string {
    switch (badge) {
      case BadgeStyle.None:
        return '';
      case BadgeStyle.BronzeMedal:
        return 'mp_medal_bronze';
      case BadgeStyle.GoldMedal:
        return 'mp_medal_gold';
      case BadgeStyle.SilverMedal:
        return 'medal_silver';
      case BadgeStyle.Alert:
        return 'mp_alerttriangle';
      case BadgeStyle.Crown:
        return 'mp_hostcrown';
      case BadgeStyle.Ammo:
        return selected ? 'shop_ammo_icon_b' : 'shop_ammo_icon_a';
      case BadgeStyle.Armour:
        return selected ? 'shop_armour_icon_b' : 'shop_armour_icon_a';
      case BadgeStyle.Barber:
        return selected ? 'shop_barber_icon_b' : 'shop_barber_icon_a';
      case BadgeStyle.Clothes:
        return selected ? 'shop_clothing_icon_b' : 'shop_clothing_icon_a';
      case BadgeStyle.Franklin:
        return selected ? 'shop_franklin_icon_b' : 'shop_franklin_icon_a';
      case BadgeStyle.Bike:
        return selected ? 'shop_garage_bike_icon_b' : 'shop_garage_bike_icon_a';
      case BadgeStyle.Car:
        return selected ? 'shop_garage_icon_b' : 'shop_garage_icon_a';
      case BadgeStyle.Gun:
        return selected ? 'shop_gunclub_icon_b' : 'shop_gunclub_icon_a';
      case BadgeStyle.Heart:
        return selected ? 'shop_health_icon_b' : 'shop_health_icon_a';
      case BadgeStyle.Lock:
        return 'shop_lock';
      case BadgeStyle.Makeup:
        return selected ? 'shop_makeup_icon_b' : 'shop_makeup_icon_a';
      case BadgeStyle.Mask:
        return selected ? 'shop_mask_icon_b' : 'shop_mask_icon_a';
      case BadgeStyle.Michael:
        return selected ? 'shop_michael_icon_b' : 'shop_michael_icon_a';
      case BadgeStyle.Star:
        return 'shop_new_star';
      case BadgeStyle.Tatoo:
        return selected ? 'shop_tattoos_icon_b' : 'shop_tattoos_icon_';
      case BadgeStyle.Tick:
        return 'shop_tick_icon';
      case BadgeStyle.Trevor:
        return selected ? 'shop_trevor_icon_b' : 'shop_trevor_icon_a';
      default:
        return '';
    }
  }

  public IsBagdeWhiteSprite(badge: BadgeStyle): boolean {
    switch (badge) {
      case BadgeStyle.Lock:
      case BadgeStyle.Tick:
      case BadgeStyle.Crown:
        return true;
      default:
        return false;
    }
  }

  public BadgeToColor(badge: BadgeStyle, selected: boolean): Color {
    switch (badge) {
      case BadgeStyle.Lock:
      case BadgeStyle.Tick:
      case BadgeStyle.Crown:
        return selected ? new Color(255, 0, 0, 0) : new Color(255, 255, 255, 255);
      default:
        return new Color(255, 255, 255, 255);
    }
  }
}
