import { Menu } from '../';
import { Sprite } from '../../';
import { Alignment, BadgeStyle, Font } from '../../../enums';
import { Color, Point, Size, uuidv4 } from '../../../utils';
import { ResRectangle, ResText } from '../modules/';

export class UIMenuItem {
  public static readonly defaultBackColor: Color = Color.empty;
  public static readonly defaultHighlightedBackColor: Color = Color.white;
  public static readonly defaultForeColor: Color = Color.whiteSmoke;
  public static readonly defaultHighlightedForeColor: Color = Color.black;

  public readonly id: string = uuidv4();

  public backColor: Color = UIMenuItem.defaultBackColor;
  public highlightedBackColor: Color = UIMenuItem.defaultHighlightedBackColor;

  public foreColor: Color = UIMenuItem.defaultForeColor;
  public highlightedForeColor: Color = UIMenuItem.defaultHighlightedForeColor;

  public enabled: boolean;
  public selected: boolean;
  public hovered: boolean;
  public description: string;

  public offset: Point;
  public parent: Menu;

  public rightLabel: string = '';
  public leftBadge: BadgeStyle = BadgeStyle.None;
  public rightBadge: BadgeStyle = BadgeStyle.None;

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
    this.enabled = true;

    this.rectangle = new ResRectangle(new Point(0, 0), new Size(431, 38), new Color(150, 0, 0, 0));
    this.text = new ResText(
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
      new Point(0, 0),
      new Size(431, 38),
    );

    this.badgeLeft = new Sprite('commonmenu', '', new Point(0, 0), new Size(40, 40));
    this.badgeRight = new Sprite('commonmenu', '', new Point(0, 0), new Size(40, 40));

    this.labelText = new ResText('', new Point(0, 0), 0.35, Color.white, 0, Alignment.Right);
  }

  public setVerticalPosition(y: number) {
    this.rectangle.pos = new Point(this.offset.X, y + 144 + this.offset.Y);
    this.selectedSprite.pos = new Point(0 + this.offset.X, y + 144 + this.offset.Y);
    this.text.pos = new Point(8 + this.offset.X, y + 147 + this.offset.Y);

    this.badgeLeft.pos = new Point(0 + this.offset.X, y + 142 + this.offset.Y);
    this.badgeRight.pos = new Point(385 + this.offset.X, y + 142 + this.offset.Y);

    this.labelText.pos = new Point(420 + this.offset.X, y + 148 + this.offset.Y);
  }

  public addEvent(event: string, ...args: any[]): void {
    this.event = { event, args };
  }

  public fireEvent(): void {
    if (this.event) {
      TriggerEvent(this.event.event, ...this.event.args);
    }
  }

  public draw(): void {
    this.rectangle.size = new Size(431 + this.parent.widthOffset, 38);
    this.selectedSprite.size = new Size(431 + this.parent.widthOffset, 38);

    if (this.hovered && !this.selected) {
      this.rectangle.color = new Color(20, 255, 255, 255);
      this.rectangle.draw();
    }

    this.selectedSprite.color = this.selected ? this.highlightedBackColor : this.backColor;
    this.selectedSprite.draw();

    this.text.color = this.enabled
      ? this.selected
        ? this.highlightedForeColor
        : this.foreColor
      : new Color(255, 163, 159, 148);

    if (this.leftBadge !== BadgeStyle.None) {
      this.text.pos = new Point(35 + this.offset.X, this.text.pos.Y);
      this.badgeLeft.TextureDict = this.badgeToSpriteLib(this.leftBadge);
      this.badgeLeft.textureName = this.badgeToSpriteName(this.leftBadge, this.selected);
      this.badgeLeft.color = this.isBagdeWhiteSprite(this.leftBadge)
        ? this.enabled
          ? this.selected
            ? this.highlightedForeColor
            : this.foreColor
          : new Color(255, 163, 159, 148)
        : Color.white;
      this.badgeLeft.draw();
    } else {
      this.text.pos = new Point(8 + this.offset.X, this.text.pos.Y);
    }

    if (this.rightBadge !== BadgeStyle.None) {
      this.badgeRight.pos = new Point(
        385 + this.offset.X + this.parent.widthOffset,
        this.badgeRight.pos.Y,
      );
      this.badgeRight.TextureDict = this.badgeToSpriteLib(this.rightBadge);
      this.badgeRight.textureName = this.badgeToSpriteName(this.rightBadge, this.selected);
      this.badgeRight.color = this.isBagdeWhiteSprite(this.rightBadge)
        ? this.enabled
          ? this.selected
            ? this.highlightedForeColor
            : this.foreColor
          : new Color(255, 163, 159, 148)
        : Color.white;
      this.badgeRight.draw();
    }

    if (this.rightLabel && this.rightLabel !== '') {
      this.labelText.pos = new Point(
        420 + this.offset.X + this.parent.widthOffset,
        this.labelText.pos.Y,
      );
      this.labelText.caption = this.rightLabel;
      this.labelText.color = this.text.color = this.enabled
        ? this.selected
          ? this.highlightedForeColor
          : this.foreColor
        : new Color(255, 163, 159, 148);
      this.labelText.draw();
    }
    this.text.draw();
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

  public badgeToSpriteLib(badge: BadgeStyle): string {
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
        return selected ? 'shop_tattoos_icon_b' : 'shop_tattoos_icon_';
      case BadgeStyle.Tick:
        return 'shop_tick_icon';
      case BadgeStyle.Trevor:
        return selected ? 'shop_trevor_icon_b' : 'shop_trevor_icon_a';
      default:
        return '';
    }
  }

  public isBagdeWhiteSprite(badge: BadgeStyle): boolean {
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
        return selected ? new Color(255, 0, 0, 0) : new Color(255, 255, 255, 255);
      default:
        return new Color(255, 255, 255, 255);
    }
  }
}
