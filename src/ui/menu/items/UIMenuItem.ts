import { Menu } from '../';
import { Rectangle, Sprite, Text } from '../../';
import { Alignment, BadgeStyle, Font } from '../../../enums';
import { Color, Point, Size, uuidv4 } from '../../../utils';

export class UIMenuItem {
  public static readonly defaultBackColor = Color.empty;
  public static readonly defaultHighlightedBackColor = Color.white;
  public static readonly defaultForeColor = Color.whiteSmoke;
  public static readonly defaultHighlightedForeColor = Color.black;

  public readonly id: string = uuidv4();

  public backColor = UIMenuItem.defaultBackColor;
  public highlightedBackColor = UIMenuItem.defaultHighlightedBackColor;

  public foreColor = UIMenuItem.defaultForeColor;
  public highlightedForeColor = UIMenuItem.defaultHighlightedForeColor;

  public enabled = true;
  public selected: boolean;
  public hovered: boolean;
  public description: string;

  public offset: Point;
  public parent: Menu;

  public rightLabel = '';
  public leftBadge = BadgeStyle.None;
  public rightBadge = BadgeStyle.None;

  protected rectangle: Rectangle;
  protected text: Text;
  protected selectedSprite: Sprite;

  protected badgeLeft: Sprite;
  protected badgeRight: Sprite;

  protected labelText: Text;

  private event: { event: string; args: unknown[] };

  get Text(): string {
    return this.text.caption;
  }

  set Text(v: string) {
    this.text.caption = v;
  }

  constructor(text: string, description = '') {
    this.rectangle = new Rectangle(new Point(), new Size(431, 38), new Color(150, 0, 0, 0));
    this.text = new Text(
      text,
      new Point(8, 0),
      0.33,
      Color.whiteSmoke,
      Font.ChaletLondon,
      Alignment.Left,
    );
    this.description = description;
    this.selectedSprite = new Sprite(
      'commonmenu',
      'gradient_nav',
      new Point(),
      new Size(431, 38),
    );

    this.badgeLeft = new Sprite('commonmenu', '', new Point(), new Size(40, 40));
    this.badgeRight = new Sprite('commonmenu', '', new Point(), new Size(40, 40));

    this.labelText = new Text('', new Point(), 0.35, Color.white, 0, Alignment.Right);
  }

  public setVerticalPosition(y: number): void {
    this.rectangle.pos = new Point(this.offset.X, y + 144 + this.offset.Y);
    this.selectedSprite.pos = new Point(this.offset.X, y + 144 + this.offset.Y);
    this.text.pos = new Point(8 + this.offset.X, y + 147 + this.offset.Y);

    this.badgeLeft.pos = new Point(this.offset.X, y + 142 + this.offset.Y);
    this.badgeRight.pos = new Point(385 + this.offset.X, y + 142 + this.offset.Y);

    this.labelText.pos = new Point(420 + this.offset.X, y + 148 + this.offset.Y);
  }

  public addEvent(event: string, ...args: unknown[]): void {
    this.event = { event, args };
  }

  public fireEvent(): void {
    if (this.event) {
      TriggerEvent(this.event.event, ...this.event.args);
    }
  }

  public draw(resolution?: Size): void {
    this.rectangle.size = new Size(431 + this.parent.WidthOffset, 38);
    this.selectedSprite.size = new Size(431 + this.parent.WidthOffset, 38);

    if (this.hovered && !this.selected) {
      this.rectangle.color = new Color(20, 255, 255, 255);
      this.rectangle.draw(undefined, resolution);
    }

    this.selectedSprite.color = this.selected ? this.highlightedBackColor : this.backColor;
    this.selectedSprite.draw(resolution);

    this.text.color = this.enabled
      ? this.selected
        ? this.highlightedForeColor
        : this.foreColor
      : new Color(255, 163, 159, 148);

    if (this.leftBadge !== BadgeStyle.None) {
      this.text.pos = new Point(35 + this.offset.X, this.text.pos.Y);
      this.badgeLeft.TextureDict = this.badgeToSpriteLib();
      this.badgeLeft.textureName = this.badgeToSpriteName(this.leftBadge, this.selected);
      this.badgeLeft.color = this.isBadgeWhiteSprite(this.leftBadge)
        ? this.enabled
          ? this.selected
            ? this.highlightedForeColor
            : this.foreColor
          : new Color(255, 163, 159, 148)
        : Color.white;
      this.badgeLeft.draw(resolution);
    } else {
      this.text.pos = new Point(8 + this.offset.X, this.text.pos.Y);
    }

    if (this.rightBadge !== BadgeStyle.None) {
      this.badgeRight.pos = new Point(
        385 + this.offset.X + this.parent.WidthOffset,
        this.badgeRight.pos.Y,
      );
      this.badgeRight.TextureDict = this.badgeToSpriteLib();
      this.badgeRight.textureName = this.badgeToSpriteName(this.rightBadge, this.selected);
      this.badgeRight.color = this.isBadgeWhiteSprite(this.rightBadge)
        ? this.enabled
          ? this.selected
            ? this.highlightedForeColor
            : this.foreColor
          : new Color(255, 163, 159, 148)
        : Color.white;
      this.badgeRight.draw(resolution);
    }

    if (this.rightLabel && this.rightLabel !== '') {
      this.labelText.pos = new Point(
        420 + this.offset.X + this.parent.WidthOffset,
        this.labelText.pos.Y,
      );
      this.labelText.caption = this.rightLabel;
      this.labelText.color = this.text.color = this.enabled
        ? this.selected
          ? this.highlightedForeColor
          : this.foreColor
        : new Color(255, 163, 159, 148);
      this.labelText.draw(undefined, resolution);
    }
    this.text.draw(undefined, resolution);
  }

  public setLeftBadge(badge: BadgeStyle): void {
    this.leftBadge = badge;
  }

  public setRightBadge(badge: BadgeStyle): void {
    this.rightBadge = badge;
  }

  public setRightLabel(text: string): void {
    this.rightLabel = text;
  }

  /**
   * Always returns 'commonmenu' for now
   */
  public badgeToSpriteLib(): string {
    return 'commonmenu';
  }

  public badgeToSpriteName(badge: BadgeStyle, selected: boolean): string {
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
        return selected ? 'shop_tattoos_icon_b' : 'shop_tattoos_icon_a';
      case BadgeStyle.Tick:
        return 'shop_tick_icon';
      case BadgeStyle.Trevor:
        return selected ? 'shop_trevor_icon_b' : 'shop_trevor_icon_a';
      case BadgeStyle.Cash:
        return 'mp_specitem_cash';
      default:
        return '';
    }
  }

  public isBadgeWhiteSprite(badge: BadgeStyle): boolean {
    switch (badge) {
      case BadgeStyle.Lock:
      case BadgeStyle.Tick:
      case BadgeStyle.Crown:
        return true;
      default:
        return false;
    }
  }

  public badgeToColor(badge: BadgeStyle, selected: boolean): Color {
    switch (badge) {
      case BadgeStyle.Lock:
      case BadgeStyle.Tick:
      case BadgeStyle.Crown:
        return selected ? Color.black : Color.white;
      default:
        return Color.white;
    }
  }
}
