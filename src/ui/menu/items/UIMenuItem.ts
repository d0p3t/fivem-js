import { AbstractUIMenuPanel, Menu } from '../';
import { Rectangle, Sprite, Text } from '../../';
import { Alignment, BadgeStyle, Font } from '../../../enums';
import { Color, Crypto, LiteEvent, Point, Size, String } from '../../../utils';

export class UIMenuItem {
  public static badgeToTextureDict(badge: BadgeStyle): string {
    switch (badge) {
      case BadgeStyle.Male:
      case BadgeStyle.Female:
      case BadgeStyle.AudioMute:
      case BadgeStyle.AudioInactive:
      case BadgeStyle.AudioVol1:
      case BadgeStyle.AudioVol2:
      case BadgeStyle.AudioVol3:
        return 'mpleaderboard';
      case BadgeStyle.InvArmWrestling:
      case BadgeStyle.InvBasejump:
      case BadgeStyle.InvMission:
      case BadgeStyle.InvDarts:
      case BadgeStyle.InvDeathmatch:
      case BadgeStyle.InvDrug:
      case BadgeStyle.InvCastle:
      case BadgeStyle.InvGolf:
      case BadgeStyle.InvBike:
      case BadgeStyle.InvBoat:
      case BadgeStyle.InvAnchor:
      case BadgeStyle.InvCar:
      case BadgeStyle.InvDollar:
      case BadgeStyle.InvCoke:
      case BadgeStyle.InvKey:
      case BadgeStyle.InvData:
      case BadgeStyle.InvHeli:
      case BadgeStyle.InvHeorin:
      case BadgeStyle.InvKeycard:
      case BadgeStyle.InvMeth:
      case BadgeStyle.InvBriefcase:
      case BadgeStyle.InvLink:
      case BadgeStyle.InvPerson:
      case BadgeStyle.InvPlane:
      case BadgeStyle.InvPlane2:
      case BadgeStyle.InvQuestionmark:
      case BadgeStyle.InvRemote:
      case BadgeStyle.InvSafe:
      case BadgeStyle.InvSteerWheel:
      case BadgeStyle.InvWeapon:
      case BadgeStyle.InvWeed:
      case BadgeStyle.InvRaceFlagPlane:
      case BadgeStyle.InvRaceFlagBicycle:
      case BadgeStyle.InvRaceFlagBoatAnchor:
      case BadgeStyle.InvRaceFlagPerson:
      case BadgeStyle.InvRaceFlagCar:
      case BadgeStyle.InvRaceFlagHelmet:
      case BadgeStyle.InvShootingRange:
      case BadgeStyle.InvSurvival:
      case BadgeStyle.InvTeamDeathmatch:
      case BadgeStyle.InvTennis:
      case BadgeStyle.InvVehicleDeathmatch:
        return 'mpinventory';
      case BadgeStyle.Adversary:
      case BadgeStyle.BaseJumping:
      case BadgeStyle.Briefcase:
      case BadgeStyle.MissionStar:
      case BadgeStyle.Deathmatch:
      case BadgeStyle.Castle:
      case BadgeStyle.Trophy:
      case BadgeStyle.RaceFlag:
      case BadgeStyle.RaceFlagPlane:
      case BadgeStyle.RaceFlagBicycle:
      case BadgeStyle.RaceFlagPerson:
      case BadgeStyle.RaceFlagCar:
      case BadgeStyle.RaceFlagBoatAnchor:
      case BadgeStyle.Rockstar:
      case BadgeStyle.Stunt:
      case BadgeStyle.StuntPremium:
      case BadgeStyle.RaceFlagStuntJump:
      case BadgeStyle.Shield:
      case BadgeStyle.TeamDeathmatch:
      case BadgeStyle.VehicleDeathmatch:
        return 'commonmenutu';
      case BadgeStyle.MpAmmoPickup:
      case BadgeStyle.MpAmmo:
      case BadgeStyle.MpCash:
      case BadgeStyle.MpRp:
      case BadgeStyle.MpSpectating:
        return 'mphud';
      case BadgeStyle.Sale:
        return 'mpshopsale';
      case BadgeStyle.GlobeWhite:
      case BadgeStyle.GlobeRed:
      case BadgeStyle.GlobeBlue:
      case BadgeStyle.GlobeYellow:
      case BadgeStyle.GlobeGreen:
      case BadgeStyle.GlobeOrange:
        return 'mprankbadge';
      case BadgeStyle.CountryUsa:
      case BadgeStyle.CountryUk:
      case BadgeStyle.CountrySweden:
      case BadgeStyle.CountryKorea:
      case BadgeStyle.CountryJapan:
      case BadgeStyle.CountryItaly:
      case BadgeStyle.CountryGermany:
      case BadgeStyle.CountryFrance:
      case BadgeStyle.BrandAlbany:
      case BadgeStyle.BrandAnnis:
      case BadgeStyle.BrandBanshee:
      case BadgeStyle.BrandBenefactor:
      case BadgeStyle.BrandBf:
      case BadgeStyle.BrandBollokan:
      case BadgeStyle.BrandBravado:
      case BadgeStyle.BrandBrute:
      case BadgeStyle.BrandBuckingham:
      case BadgeStyle.BrandCanis:
      case BadgeStyle.BrandChariot:
      case BadgeStyle.BrandCheval:
      case BadgeStyle.BrandClassique:
      case BadgeStyle.BrandCoil:
      case BadgeStyle.BrandDeclasse:
      case BadgeStyle.BrandDewbauchee:
      case BadgeStyle.BrandDilettante:
      case BadgeStyle.BrandDinka:
      case BadgeStyle.BrandDundreary:
      case BadgeStyle.BrandEmporer:
      case BadgeStyle.BrandEnus:
      case BadgeStyle.BrandFathom:
      case BadgeStyle.BrandGalivanter:
      case BadgeStyle.BrandGrotti:
      case BadgeStyle.BrandHijak:
      case BadgeStyle.BrandHvy:
      case BadgeStyle.BrandImponte:
      case BadgeStyle.BrandInvetero:
      case BadgeStyle.BrandJacksheepe:
      case BadgeStyle.BrandJobuilt:
      case BadgeStyle.BrandKarin:
      case BadgeStyle.BrandLampadati:
      case BadgeStyle.BrandMaibatsu:
      case BadgeStyle.BrandMammoth:
      case BadgeStyle.BrandMtl:
      case BadgeStyle.BrandNagasaki:
      case BadgeStyle.BrandObey:
      case BadgeStyle.BrandOcelot:
      case BadgeStyle.BrandOverflod:
      case BadgeStyle.BrandPed:
      case BadgeStyle.BrandPegassi:
      case BadgeStyle.BrandPfister:
      case BadgeStyle.BrandPrincipe:
      case BadgeStyle.BrandProgen:
      case BadgeStyle.BrandSchyster:
      case BadgeStyle.BrandShitzu:
      case BadgeStyle.BrandSpeedophile:
      case BadgeStyle.BrandStanley:
      case BadgeStyle.BrandTruffade:
      case BadgeStyle.BrandUbermacht:
      case BadgeStyle.BrandVapid:
      case BadgeStyle.BrandVulcar:
      case BadgeStyle.BrandWeeny:
      case BadgeStyle.BrandWestern:
      case BadgeStyle.BrandWesternmotorcycle:
      case BadgeStyle.BrandWillard:
      case BadgeStyle.BrandZirconium:
        return 'mpcarhud';
      case BadgeStyle.BrandGrotti2:
      case BadgeStyle.BrandLcc:
      case BadgeStyle.BrandProgen2:
      case BadgeStyle.BrandRune:
        return 'mpcarhud2';
      case BadgeStyle.Info:
        return 'shared';
      default:
        return 'commonmenu';
    }
  }

  public static getBadgeSpriteWidthOffset(sprite: Sprite): number {
    return (40 - sprite.size.width) / 2;
  }

  public static getBadgeSpriteHeightOffset(sprite: Sprite): number {
    return (40 - sprite.size.height) / 2;
  }

  public static getBadgeSize(badge: BadgeStyle): Size {
    switch (badge) {
      case BadgeStyle.Cash:
      case BadgeStyle.Coke:
      case BadgeStyle.Crown:
      case BadgeStyle.Heroin:
      case BadgeStyle.Meth:
      case BadgeStyle.Weed:
      case BadgeStyle.Adversary:
      case BadgeStyle.BaseJumping:
      case BadgeStyle.Briefcase:
      case BadgeStyle.MissionStar:
      case BadgeStyle.Deathmatch:
      case BadgeStyle.Castle:
      case BadgeStyle.Trophy:
      case BadgeStyle.RaceFlag:
      case BadgeStyle.RaceFlagPlane:
      case BadgeStyle.RaceFlagBicycle:
      case BadgeStyle.RaceFlagPerson:
      case BadgeStyle.RaceFlagCar:
      case BadgeStyle.RaceFlagBoatAnchor:
      case BadgeStyle.Rockstar:
      case BadgeStyle.Stunt:
      case BadgeStyle.StuntPremium:
      case BadgeStyle.RaceFlagStuntJump:
      case BadgeStyle.Shield:
      case BadgeStyle.TeamDeathmatch:
      case BadgeStyle.VehicleDeathmatch:
      case BadgeStyle.AudioMute:
      case BadgeStyle.AudioInactive:
      case BadgeStyle.AudioVol1:
      case BadgeStyle.AudioVol2:
      case BadgeStyle.AudioVol3:
      case BadgeStyle.BrandAlbany:
      case BadgeStyle.BrandAnnis:
      case BadgeStyle.BrandBanshee:
      case BadgeStyle.BrandBenefactor:
      case BadgeStyle.BrandBf:
      case BadgeStyle.BrandBollokan:
      case BadgeStyle.BrandBravado:
      case BadgeStyle.BrandBrute:
      case BadgeStyle.BrandBuckingham:
      case BadgeStyle.BrandCanis:
      case BadgeStyle.BrandChariot:
      case BadgeStyle.BrandCheval:
      case BadgeStyle.BrandClassique:
      case BadgeStyle.BrandCoil:
      case BadgeStyle.BrandDeclasse:
      case BadgeStyle.BrandDewbauchee:
      case BadgeStyle.BrandDilettante:
      case BadgeStyle.BrandDinka:
      case BadgeStyle.BrandDundreary:
      case BadgeStyle.BrandEmporer:
      case BadgeStyle.BrandEnus:
      case BadgeStyle.BrandFathom:
      case BadgeStyle.BrandGalivanter:
      case BadgeStyle.BrandGrotti:
      case BadgeStyle.BrandHijak:
      case BadgeStyle.BrandHvy:
      case BadgeStyle.BrandImponte:
      case BadgeStyle.BrandInvetero:
      case BadgeStyle.BrandJacksheepe:
      case BadgeStyle.BrandJobuilt:
      case BadgeStyle.BrandKarin:
      case BadgeStyle.BrandLampadati:
      case BadgeStyle.BrandMaibatsu:
      case BadgeStyle.BrandMammoth:
      case BadgeStyle.BrandMtl:
      case BadgeStyle.BrandNagasaki:
      case BadgeStyle.BrandObey:
      case BadgeStyle.BrandOcelot:
      case BadgeStyle.BrandOverflod:
      case BadgeStyle.BrandPed:
      case BadgeStyle.BrandPegassi:
      case BadgeStyle.BrandPfister:
      case BadgeStyle.BrandPrincipe:
      case BadgeStyle.BrandProgen:
      case BadgeStyle.BrandSchyster:
      case BadgeStyle.BrandShitzu:
      case BadgeStyle.BrandSpeedophile:
      case BadgeStyle.BrandStanley:
      case BadgeStyle.BrandTruffade:
      case BadgeStyle.BrandUbermacht:
      case BadgeStyle.BrandVapid:
      case BadgeStyle.BrandVulcar:
      case BadgeStyle.BrandWeeny:
      case BadgeStyle.BrandWestern:
      case BadgeStyle.BrandWesternmotorcycle:
      case BadgeStyle.BrandWillard:
      case BadgeStyle.BrandZirconium:
      case BadgeStyle.BrandGrotti2:
      case BadgeStyle.BrandLcc:
      case BadgeStyle.BrandProgen2:
      case BadgeStyle.BrandRune:
      case BadgeStyle.CountryUsa:
      case BadgeStyle.CountryUk:
      case BadgeStyle.CountrySweden:
      case BadgeStyle.CountryKorea:
      case BadgeStyle.CountryJapan:
      case BadgeStyle.CountryItaly:
      case BadgeStyle.CountryGermany:
      case BadgeStyle.CountryFrance:
        return new Size(30, 30);
      case BadgeStyle.MedalSilver:
      case BadgeStyle.MpAmmoPickup:
      case BadgeStyle.MpAmmo:
      case BadgeStyle.MpCash:
      case BadgeStyle.MpRp:
      case BadgeStyle.GlobeWhite:
      case BadgeStyle.GlobeBlue:
      case BadgeStyle.GlobeGreen:
      case BadgeStyle.GlobeOrange:
      case BadgeStyle.GlobeRed:
      case BadgeStyle.GlobeYellow:
      case BadgeStyle.InvArmWrestling:
      case BadgeStyle.InvBasejump:
      case BadgeStyle.InvMission:
      case BadgeStyle.InvDarts:
      case BadgeStyle.InvDeathmatch:
      case BadgeStyle.InvDrug:
      case BadgeStyle.InvCastle:
      case BadgeStyle.InvGolf:
      case BadgeStyle.InvBike:
      case BadgeStyle.InvBoat:
      case BadgeStyle.InvAnchor:
      case BadgeStyle.InvCar:
      case BadgeStyle.InvDollar:
      case BadgeStyle.InvCoke:
      case BadgeStyle.InvKey:
      case BadgeStyle.InvData:
      case BadgeStyle.InvHeli:
      case BadgeStyle.InvHeorin:
      case BadgeStyle.InvKeycard:
      case BadgeStyle.InvMeth:
      case BadgeStyle.InvBriefcase:
      case BadgeStyle.InvLink:
      case BadgeStyle.InvPerson:
      case BadgeStyle.InvPlane:
      case BadgeStyle.InvPlane2:
      case BadgeStyle.InvQuestionmark:
      case BadgeStyle.InvRemote:
      case BadgeStyle.InvSafe:
      case BadgeStyle.InvSteerWheel:
      case BadgeStyle.InvWeapon:
      case BadgeStyle.InvWeed:
      case BadgeStyle.InvRaceFlagPlane:
      case BadgeStyle.InvRaceFlagBicycle:
      case BadgeStyle.InvRaceFlagBoatAnchor:
      case BadgeStyle.InvRaceFlagPerson:
      case BadgeStyle.InvRaceFlagCar:
      case BadgeStyle.InvRaceFlagHelmet:
      case BadgeStyle.InvShootingRange:
      case BadgeStyle.InvSurvival:
      case BadgeStyle.InvTeamDeathmatch:
      case BadgeStyle.InvTennis:
      case BadgeStyle.InvVehicleDeathmatch:
        return new Size(25, 25);
      default:
        return new Size(40, 40);
    }
  }

  public static defaultBackColor = Color.empty;
  public static defaultHighlightedBackColor = Color.white;
  public static defaultHoveredBackColor = new Color(20, 255, 255, 255);

  public static defaultForeColor = Color.whiteSmoke;
  public static defaultHoveredForeColor = UIMenuItem.defaultForeColor;
  public static defaultHighlightedForeColor = Color.black;

  public readonly id: string = Crypto.uuidv4();

  public enabled = true;
  public selected = false;
  public hovered = false;

  public offset: Point = new Point(0, 0);
  public parent: Menu | undefined;

  public readonly activated = new LiteEvent();
  public readonly panelActivated = new LiteEvent();

  protected supportsDescription = true;
  protected supportsPanels = true;
  protected supportsLeftBadge = true;
  protected supportsRightBadge = true;
  protected supportsRightLabel = true;

  protected readonly rectangle: Rectangle;
  protected readonly text: Text;
  protected readonly selectedSprite: Sprite;

  protected readonly badgeLeft: Sprite;
  protected readonly badgeRight: Sprite;

  protected readonly labelText: Text;

  private _description = '';
  private _formattedDescription = '';

  private _backColor = UIMenuItem.defaultBackColor;
  private _highlightedBackColor = UIMenuItem.defaultHighlightedBackColor;

  private _foreColor = UIMenuItem.defaultForeColor;
  private _highlightedForeColor = UIMenuItem.defaultHighlightedForeColor;

  private _leftBadge = BadgeStyle.None;
  private _rightBadge = BadgeStyle.None;

  private _event: { event: string; args: unknown[] } = { event: '', args: [] };
  private _panels: AbstractUIMenuPanel[] = [];

  constructor(text: string, description?: string) {
    this.rectangle = new Rectangle(new Point(), new Size(431, 38), this._backColor);
    this.text = new Text('', new Point(), 0.33, this._foreColor, Font.ChaletLondon, Alignment.Left);
    this.selectedSprite = new Sprite(
      'commonmenu',
      'gradient_nav',
      new Point(),
      new Size(431, 38),
      0,
      this._highlightedBackColor,
    );
    this.badgeLeft = new Sprite('', '');
    this.badgeRight = new Sprite('', '');
    this.labelText = new Text('', new Point(), 0.35, this._foreColor, 0, Alignment.Right);
    this.Text = text;
    this.Description = description ?? '';
  }

  public get Text(): string {
    return this.text.caption;
  }

  public set Text(value: string) {
    this.text.caption = value ? value.trim() : '';
  }

  public get Description(): string {
    if (!this.supportsDescription) {
      return '';
    }
    return this._description;
  }

  public set Description(value: string) {
    if (!this.supportsDescription) {
      throw new Error('This item does not support description');
    }
    this._description = value ? value.trim() : '';
    this.formatDescription();
  }

  public get FormattedDescription(): string {
    return this._formattedDescription;
  }

  public get BackColor(): Color {
    return this._backColor;
  }

  public set BackColor(value: Color) {
    value = value || this._backColor;
    this._backColor = value;
    this.rectangle.color = value;
  }

  public get HighlightedBackColor(): Color {
    return this._highlightedBackColor;
  }

  public set HighlightedBackColor(value: Color) {
    value = value || this._highlightedBackColor;
    this._highlightedBackColor = value;
    this.selectedSprite.color = value;
  }

  public get ForeColor(): Color {
    return this._foreColor;
  }

  public set ForeColor(value: Color) {
    value = value || this._foreColor;
    this._foreColor = value;
    this.text.color = value;
  }

  public get HighlightedForeColor(): Color {
    return this._highlightedForeColor;
  }

  public set HighlightedForeColor(value: Color) {
    this._highlightedForeColor = value || this._highlightedForeColor;
  }

  public get LeftBadge(): BadgeStyle {
    if (!this.supportsLeftBadge) {
      return BadgeStyle.None;
    }
    return this._leftBadge;
  }

  public set LeftBadge(value: BadgeStyle) {
    if (!this.supportsLeftBadge) {
      throw new Error('This item does not support left badge');
    }
    value = Number(value);
    this._leftBadge = value;
    this.badgeLeft.TextureDict = UIMenuItem.badgeToTextureDict(value);
    this.badgeLeft.size = UIMenuItem.getBadgeSize(value);
  }

  public get RightBadge(): BadgeStyle {
    if (!this.supportsRightBadge) {
      return BadgeStyle.None;
    }
    return this._rightBadge;
  }

  public set RightBadge(value: BadgeStyle) {
    if (!this.supportsRightBadge) {
      throw new Error('This item does not support right badge');
    }
    value = Number(value);
    this._rightBadge = value;
    this.badgeRight.TextureDict = UIMenuItem.badgeToTextureDict(value);
    this.badgeRight.size = UIMenuItem.getBadgeSize(value);
  }

  public get RightLabel(): string {
    if (!this.supportsRightLabel) {
      return '';
    }
    return this.labelText.caption;
  }

  public set RightLabel(value: string) {
    if (!this.supportsRightLabel) {
      throw new Error('This item does not support right label');
    }
    this.labelText.caption = value ? value.trim() : '';
  }

  public get IsMouseInBounds(): boolean {
    return this.parent
      ? this.parent.isMouseInBounds(this.rectangle.pos, this.rectangle.size)
      : false;
  }

  public get Panels(): AbstractUIMenuPanel[] {
    if (!this.supportsPanels) {
      return [];
    }
    return this._panels;
  }

  public set Panels(value: AbstractUIMenuPanel[]) {
    if (!this.supportsPanels) {
      throw new Error('This item does not support panels');
    }
    this._panels = value;
  }

  public addPanel(panel: AbstractUIMenuPanel | AbstractUIMenuPanel[]): void {
    if (!this.supportsPanels) {
      throw new Error('This item does not support panels');
    }
    const panels = Array.isArray(panel) ? panel : [panel];
    panels.forEach(p => {
      p.ParentItem = this;
    });
    this._panels.push(...panels);
  }

  public findPanelIndex(panel: AbstractUIMenuPanel): number {
    if (!this.supportsPanels) {
      throw new Error('This item does not support panels');
    }
    const index = this._panels.findIndex(p => p.id === panel.id);
    return index !== -1 ? index : 0;
  }

  public removePanel(panelOrIndex: AbstractUIMenuPanel | number): void {
    if (!this.supportsPanels) {
      throw new Error('This item does not support panels');
    }
    if (typeof panelOrIndex === 'number') {
      this._panels = this._panels.filter((p, index) => index !== panelOrIndex);
    } else {
      this._panels = this._panels.filter(p => p.id !== panelOrIndex.id);
    }
  }

  public addEvent(event: string, ...args: unknown[]): void {
    this._event = { event, args };
  }

  public fireEvent(): void {
    if (this._event) {
      TriggerEvent(this._event.event, ...this._event.args);
    }
  }

  public formatDescription(): void {
    if (!this.parent) {
      return;
    }
    let input = this._description;
    if (input.length > 99) {
      input = input.slice(0, 99);
    }

    const maxPixelsPerLine = 425 + this.parent.WidthOffset;
    let aggregatePixels = 0;
    let output = '';
    const words = input.split(' ');
    const spaceWidth = String.measureString(' ', Font.ChaletLondon, 0.33, Menu.screenWidth);

    for (const word of words) {
      const offset = String.measureString(word, Font.ChaletLondon, 0.33, Menu.screenWidth);
      aggregatePixels += offset;

      if (aggregatePixels > maxPixelsPerLine) {
        output = `${output} \n${word} `;
        aggregatePixels = offset + spaceWidth;
      } else {
        output = `${output}${word} `;
        aggregatePixels += spaceWidth;
      }
    }

    this._formattedDescription = output;
  }

  public badgeToTextureName(badge: BadgeStyle): string {
    const selected = this.selected;
    switch (badge) {
      case BadgeStyle.None:
        return '';
      case BadgeStyle.Ammo:
        return selected ? 'shop_ammo_icon_b' : 'shop_ammo_icon_a';
      case BadgeStyle.Armor:
        return selected ? 'shop_armour_icon_b' : 'shop_armour_icon_a';
      case BadgeStyle.Barber:
        return selected ? 'shop_barber_icon_b' : 'shop_barber_icon_a';
      case BadgeStyle.Bike:
        return selected ? 'shop_garage_bike_icon_b' : 'shop_garage_bike_icon_a';
      case BadgeStyle.Car:
        return selected ? 'shop_garage_icon_b' : 'shop_garage_icon_a';
      case BadgeStyle.Cash:
        return 'mp_specitem_cash';
      case BadgeStyle.Clothing:
        return selected ? 'shop_clothing_icon_b' : 'shop_clothing_icon_a';
      case BadgeStyle.Coke:
        return 'mp_specitem_coke';
      case BadgeStyle.Crown:
        return 'mp_hostcrown';
      case BadgeStyle.Franklin:
        return selected ? 'shop_franklin_icon_b' : 'shop_franklin_icon_a';
      case BadgeStyle.Gun:
        return selected ? 'shop_gunclub_icon_b' : 'shop_gunclub_icon_a';
      case BadgeStyle.HealthHeart:
        return selected ? 'shop_health_icon_b' : 'shop_health_icon_a';
      case BadgeStyle.Heroin:
        return 'mp_specitem_heroin';
      case BadgeStyle.Lock:
        return 'shop_lock';
      case BadgeStyle.MakeupBrush:
        return selected ? 'shop_makeup_icon_b' : 'shop_makeup_icon_a';
      case BadgeStyle.Mask:
        return selected ? 'shop_mask_icon_b' : 'shop_mask_icon_a';
      case BadgeStyle.MedalBronze:
        return 'mp_medal_bronze';
      case BadgeStyle.MedalGold:
        return 'mp_medal_gold';
      case BadgeStyle.MedalSilver:
        return 'mp_medal_silver';
      case BadgeStyle.Meth:
        return 'mp_specitem_meth';
      case BadgeStyle.Michael:
        return selected ? 'shop_michael_icon_b' : 'shop_michael_icon_a';
      case BadgeStyle.Star:
        return 'shop_new_star';
      case BadgeStyle.Tattoo:
        return selected ? 'shop_tattoos_icon_b' : 'shop_tattoos_icon_a';
      case BadgeStyle.Tick:
        return 'shop_tick_icon';
      case BadgeStyle.Trevor:
        return selected ? 'shop_trevor_icon_b' : 'shop_trevor_icon_a';
      case BadgeStyle.Warning:
        return 'mp_alerttriangle';
      case BadgeStyle.Weed:
        return 'mp_specitem_weed';
      case BadgeStyle.Male:
        return 'leaderboard_male_icon';
      case BadgeStyle.Female:
        return 'leaderboard_female_icon';
      case BadgeStyle.LockArena:
        return 'shop_lock_arena';
      case BadgeStyle.Adversary:
        return 'adversary';
      case BadgeStyle.BaseJumping:
        return 'base_jumping';
      case BadgeStyle.Briefcase:
        return 'capture_the_flag';
      case BadgeStyle.MissionStar:
        return 'custom_mission';
      case BadgeStyle.Deathmatch:
        return 'deathmatch';
      case BadgeStyle.Castle:
        return 'gang_attack';
      case BadgeStyle.Trophy:
        return 'last_team_standing';
      case BadgeStyle.RaceFlag:
        return 'race';
      case BadgeStyle.RaceFlagPlane:
        return 'race_air';
      case BadgeStyle.RaceFlagBicycle:
        return 'race_bicycle';
      case BadgeStyle.RaceFlagPerson:
        return 'race_foot';
      case BadgeStyle.RaceFlagCar:
        return 'race_land';
      case BadgeStyle.RaceFlagBoatAnchor:
        return 'race_water';
      case BadgeStyle.Rockstar:
        return 'rockstar';
      case BadgeStyle.Stunt:
        return 'stunt';
      case BadgeStyle.StuntPremium:
        return 'stunt_premium';
      case BadgeStyle.RaceFlagStuntJump:
        return 'stunt_race';
      case BadgeStyle.Shield:
        return 'survival';
      case BadgeStyle.TeamDeathmatch:
        return 'team_deathmatch';
      case BadgeStyle.VehicleDeathmatch:
        return 'vehicle_deathmatch';
      case BadgeStyle.MpAmmoPickup:
        return 'ammo_pickup';
      case BadgeStyle.MpAmmo:
        return 'mp_anim_ammo';
      case BadgeStyle.MpCash:
        return 'mp_anim_cash';
      case BadgeStyle.MpRp:
        return 'mp_anim_rp';
      case BadgeStyle.MpSpectating:
        return 'spectating';
      case BadgeStyle.Sale:
        return 'saleicon';
      case BadgeStyle.GlobeWhite:
      case BadgeStyle.GlobeRed:
      case BadgeStyle.GlobeBlue:
      case BadgeStyle.GlobeYellow:
      case BadgeStyle.GlobeGreen:
      case BadgeStyle.GlobeOrange:
        return 'globe';
      case BadgeStyle.InvArmWrestling:
        return 'arm_wrestling';
      case BadgeStyle.InvBasejump:
        return 'basejump';
      case BadgeStyle.InvMission:
        return 'custom_mission';
      case BadgeStyle.InvDarts:
        return 'darts';
      case BadgeStyle.InvDeathmatch:
        return 'deathmatch';
      case BadgeStyle.InvDrug:
        return 'drug_trafficking';
      case BadgeStyle.InvCastle:
        return 'gang_attack';
      case BadgeStyle.InvGolf:
        return 'golf';
      case BadgeStyle.InvBike:
        return 'mp_specitem_bike';
      case BadgeStyle.InvBoat:
        return 'mp_specitem_boat';
      case BadgeStyle.InvAnchor:
        return 'mp_specitem_boatpickup';
      case BadgeStyle.InvCar:
        return 'mp_specitem_car';
      case BadgeStyle.InvDollar:
        return 'mp_specitem_cash';
      case BadgeStyle.InvCoke:
        return 'mp_specitem_coke';
      case BadgeStyle.InvKey:
        return 'mp_specitem_cuffkeys';
      case BadgeStyle.InvData:
        return 'mp_specitem_data';
      case BadgeStyle.InvHeli:
        return 'mp_specitem_heli';
      case BadgeStyle.InvHeorin:
        return 'mp_specitem_heroin';
      case BadgeStyle.InvKeycard:
        return 'mp_specitem_keycard';
      case BadgeStyle.InvMeth:
        return 'mp_specitem_meth';
      case BadgeStyle.InvBriefcase:
        return 'mp_specitem_package';
      case BadgeStyle.InvLink:
        return 'mp_specitem_partnericon';
      case BadgeStyle.InvPerson:
        return 'mp_specitem_ped';
      case BadgeStyle.InvPlane:
        return 'mp_specitem_plane';
      case BadgeStyle.InvPlane2:
        return 'mp_specitem_plane2';
      case BadgeStyle.InvQuestionmark:
        return 'mp_specitem_randomobject';
      case BadgeStyle.InvRemote:
        return 'mp_specitem_remote';
      case BadgeStyle.InvSafe:
        return 'mp_specitem_safe';
      case BadgeStyle.InvSteerWheel:
        return 'mp_specitem_steer_wheel';
      case BadgeStyle.InvWeapon:
        return 'mp_specitem_weapons';
      case BadgeStyle.InvWeed:
        return 'mp_specitem_weed';
      case BadgeStyle.InvRaceFlagPlane:
        return 'race_air';
      case BadgeStyle.InvRaceFlagBicycle:
        return 'race_bike';
      case BadgeStyle.InvRaceFlagBoatAnchor:
        return 'race_boat';
      case BadgeStyle.InvRaceFlagPerson:
        return 'race_foot';
      case BadgeStyle.InvRaceFlagCar:
        return 'race_land';
      case BadgeStyle.InvRaceFlagHelmet:
        return 'race_offroad';
      case BadgeStyle.InvShootingRange:
        return 'shooting_range';
      case BadgeStyle.InvSurvival:
        return 'survival';
      case BadgeStyle.InvTeamDeathmatch:
        return 'team_deathmatch';
      case BadgeStyle.InvTennis:
        return 'tennis';
      case BadgeStyle.InvVehicleDeathmatch:
        return 'vehicle_deathmatch';
      case BadgeStyle.AudioMute:
        return 'leaderboard_audio_mute';
      case BadgeStyle.AudioInactive:
        return 'leaderboard_audio_inactive';
      case BadgeStyle.AudioVol1:
        return 'leaderboard_audio_1';
      case BadgeStyle.AudioVol2:
        return 'leaderboard_audio_2';
      case BadgeStyle.AudioVol3:
        return 'leaderboard_audio_3';
      case BadgeStyle.CountryUsa:
        return 'vehicle_card_icons_flag_usa';
      case BadgeStyle.CountryUk:
        return 'vehicle_card_icons_flag_uk';
      case BadgeStyle.CountrySweden:
        return 'vehicle_card_icons_flag_sweden';
      case BadgeStyle.CountryKorea:
        return 'vehicle_card_icons_flag_korea';
      case BadgeStyle.CountryJapan:
        return 'vehicle_card_icons_flag_japan';
      case BadgeStyle.CountryItaly:
        return 'vehicle_card_icons_flag_italy';
      case BadgeStyle.CountryGermany:
        return 'vehicle_card_icons_flag_germany';
      case BadgeStyle.CountryFrance:
        return 'vehicle_card_icons_flag_france';
      case BadgeStyle.BrandAlbany:
        return 'albany';
      case BadgeStyle.BrandAnnis:
        return 'annis';
      case BadgeStyle.BrandBanshee:
        return 'banshee';
      case BadgeStyle.BrandBenefactor:
        return 'benefactor';
      case BadgeStyle.BrandBf:
        return 'bf';
      case BadgeStyle.BrandBollokan:
        return 'bollokan';
      case BadgeStyle.BrandBravado:
        return 'bravado';
      case BadgeStyle.BrandBrute:
        return 'brute';
      case BadgeStyle.BrandBuckingham:
        return 'buckingham';
      case BadgeStyle.BrandCanis:
        return 'canis';
      case BadgeStyle.BrandChariot:
        return 'chariot';
      case BadgeStyle.BrandCheval:
        return 'cheval';
      case BadgeStyle.BrandClassique:
        return 'classique';
      case BadgeStyle.BrandCoil:
        return 'coil';
      case BadgeStyle.BrandDeclasse:
        return 'declasse';
      case BadgeStyle.BrandDewbauchee:
        return 'dewbauchee';
      case BadgeStyle.BrandDilettante:
        return 'dilettante';
      case BadgeStyle.BrandDinka:
        return 'dinka';
      case BadgeStyle.BrandDundreary:
        return 'dundreary';
      case BadgeStyle.BrandEmporer:
        return 'emporer';
      case BadgeStyle.BrandEnus:
        return 'enus';
      case BadgeStyle.BrandFathom:
        return 'fathom';
      case BadgeStyle.BrandGalivanter:
        return 'galivanter';
      case BadgeStyle.BrandGrotti:
        return 'grotti';
      case BadgeStyle.BrandHijak:
        return 'hijak';
      case BadgeStyle.BrandHvy:
        return 'hvy';
      case BadgeStyle.BrandImponte:
        return 'imponte';
      case BadgeStyle.BrandInvetero:
        return 'invetero';
      case BadgeStyle.BrandJacksheepe:
        return 'jacksheepe';
      case BadgeStyle.BrandJobuilt:
        return 'jobuilt';
      case BadgeStyle.BrandKarin:
        return 'karin';
      case BadgeStyle.BrandLampadati:
        return 'lampadati';
      case BadgeStyle.BrandMaibatsu:
        return 'maibatsu';
      case BadgeStyle.BrandMammoth:
        return 'mammoth';
      case BadgeStyle.BrandMtl:
        return 'mtl';
      case BadgeStyle.BrandNagasaki:
        return 'nagasaki';
      case BadgeStyle.BrandObey:
        return 'obey';
      case BadgeStyle.BrandOcelot:
        return 'ocelot';
      case BadgeStyle.BrandOverflod:
        return 'overflod';
      case BadgeStyle.BrandPed:
        return 'ped';
      case BadgeStyle.BrandPegassi:
        return 'pegassi';
      case BadgeStyle.BrandPfister:
        return 'pfister';
      case BadgeStyle.BrandPrincipe:
        return 'principe';
      case BadgeStyle.BrandProgen:
        return 'progen';
      case BadgeStyle.BrandSchyster:
        return 'schyster';
      case BadgeStyle.BrandShitzu:
        return 'shitzu';
      case BadgeStyle.BrandSpeedophile:
        return 'speedophile';
      case BadgeStyle.BrandStanley:
        return 'stanley';
      case BadgeStyle.BrandTruffade:
        return 'truffade';
      case BadgeStyle.BrandUbermacht:
        return 'ubermacht';
      case BadgeStyle.BrandVapid:
        return 'vapid';
      case BadgeStyle.BrandVulcar:
        return 'vulcar';
      case BadgeStyle.BrandWeeny:
        return 'weeny';
      case BadgeStyle.BrandWestern:
        return 'western';
      case BadgeStyle.BrandWesternmotorcycle:
        return 'westernmotorcycle';
      case BadgeStyle.BrandWillard:
        return 'willard';
      case BadgeStyle.BrandZirconium:
        return 'zirconium';
      case BadgeStyle.BrandGrotti2:
        return 'grotti_2';
      case BadgeStyle.BrandLcc:
        return 'lcc';
      case BadgeStyle.BrandProgen2:
        return 'progen';
      case BadgeStyle.BrandRune:
        return 'rune';
      case BadgeStyle.Info:
        return 'info_icon_32';
      default:
        return '';
    }
  }

  public badgeToColor(badge: BadgeStyle): Color {
    const selected = this.selected;
    const enabled = this.enabled;
    switch (badge) {
      case BadgeStyle.Crown:
      case BadgeStyle.Tick:
      case BadgeStyle.Male:
      case BadgeStyle.Female:
      case BadgeStyle.Lock:
      case BadgeStyle.LockArena:
      case BadgeStyle.Adversary:
      case BadgeStyle.BaseJumping:
      case BadgeStyle.Briefcase:
      case BadgeStyle.MissionStar:
      case BadgeStyle.Deathmatch:
      case BadgeStyle.Castle:
      case BadgeStyle.Trophy:
      case BadgeStyle.RaceFlag:
      case BadgeStyle.RaceFlagPlane:
      case BadgeStyle.RaceFlagBicycle:
      case BadgeStyle.RaceFlagPerson:
      case BadgeStyle.RaceFlagCar:
      case BadgeStyle.RaceFlagBoatAnchor:
      case BadgeStyle.Rockstar:
      case BadgeStyle.Stunt:
      case BadgeStyle.StuntPremium:
      case BadgeStyle.RaceFlagStuntJump:
      case BadgeStyle.Shield:
      case BadgeStyle.TeamDeathmatch:
      case BadgeStyle.VehicleDeathmatch:
      case BadgeStyle.MpSpectating:
      case BadgeStyle.GlobeWhite:
      case BadgeStyle.AudioMute:
      case BadgeStyle.AudioInactive:
      case BadgeStyle.AudioVol1:
      case BadgeStyle.AudioVol2:
      case BadgeStyle.AudioVol3:
      case BadgeStyle.BrandAlbany:
      case BadgeStyle.BrandAnnis:
      case BadgeStyle.BrandBanshee:
      case BadgeStyle.BrandBenefactor:
      case BadgeStyle.BrandBf:
      case BadgeStyle.BrandBollokan:
      case BadgeStyle.BrandBravado:
      case BadgeStyle.BrandBrute:
      case BadgeStyle.BrandBuckingham:
      case BadgeStyle.BrandCanis:
      case BadgeStyle.BrandChariot:
      case BadgeStyle.BrandCheval:
      case BadgeStyle.BrandClassique:
      case BadgeStyle.BrandCoil:
      case BadgeStyle.BrandDeclasse:
      case BadgeStyle.BrandDewbauchee:
      case BadgeStyle.BrandDilettante:
      case BadgeStyle.BrandDinka:
      case BadgeStyle.BrandDundreary:
      case BadgeStyle.BrandEmporer:
      case BadgeStyle.BrandEnus:
      case BadgeStyle.BrandFathom:
      case BadgeStyle.BrandGalivanter:
      case BadgeStyle.BrandGrotti:
      case BadgeStyle.BrandHijak:
      case BadgeStyle.BrandHvy:
      case BadgeStyle.BrandImponte:
      case BadgeStyle.BrandInvetero:
      case BadgeStyle.BrandJacksheepe:
      case BadgeStyle.BrandJobuilt:
      case BadgeStyle.BrandKarin:
      case BadgeStyle.BrandLampadati:
      case BadgeStyle.BrandMaibatsu:
      case BadgeStyle.BrandMammoth:
      case BadgeStyle.BrandMtl:
      case BadgeStyle.BrandNagasaki:
      case BadgeStyle.BrandObey:
      case BadgeStyle.BrandOcelot:
      case BadgeStyle.BrandOverflod:
      case BadgeStyle.BrandPed:
      case BadgeStyle.BrandPegassi:
      case BadgeStyle.BrandPfister:
      case BadgeStyle.BrandPrincipe:
      case BadgeStyle.BrandProgen:
      case BadgeStyle.BrandSchyster:
      case BadgeStyle.BrandShitzu:
      case BadgeStyle.BrandSpeedophile:
      case BadgeStyle.BrandStanley:
      case BadgeStyle.BrandTruffade:
      case BadgeStyle.BrandUbermacht:
      case BadgeStyle.BrandVapid:
      case BadgeStyle.BrandVulcar:
      case BadgeStyle.BrandWeeny:
      case BadgeStyle.BrandWestern:
      case BadgeStyle.BrandWesternmotorcycle:
      case BadgeStyle.BrandWillard:
      case BadgeStyle.BrandZirconium:
      case BadgeStyle.BrandGrotti2:
      case BadgeStyle.BrandLcc:
      case BadgeStyle.BrandProgen2:
      case BadgeStyle.BrandRune:
        return selected
          ? enabled
            ? Color.black
            : Color.fromRgb(50, 50, 50)
          : enabled
          ? Color.white
          : Color.fromRgb(109, 109, 109);
      case BadgeStyle.GlobeBlue:
        return enabled ? Color.fromRgb(10, 103, 166) : Color.fromRgb(11, 62, 117);
      case BadgeStyle.GlobeGreen:
        return enabled ? Color.fromRgb(10, 166, 85) : Color.fromRgb(5, 71, 22);
      case BadgeStyle.GlobeOrange:
        return enabled ? Color.fromRgb(232, 145, 14) : Color.fromRgb(133, 77, 12);
      case BadgeStyle.GlobeRed:
        return enabled ? Color.fromRgb(207, 43, 31) : Color.fromRgb(110, 7, 7);
      case BadgeStyle.GlobeYellow:
        return enabled ? Color.fromRgb(232, 207, 14) : Color.fromRgb(131, 133, 12);
      default:
        return enabled ? Color.white : Color.fromRgb(109, 109, 109);
    }
  }

  public setVerticalPosition(y: number): void {
    const yOffset = y + this.offset.Y;
    this.rectangle.pos.Y = yOffset + 144;
    this.selectedSprite.pos.Y = yOffset + 144;
    this.text.pos.Y = yOffset + 147;
    this.badgeLeft.pos.Y = yOffset + 142 + UIMenuItem.getBadgeSpriteHeightOffset(this.badgeLeft);
    this.badgeRight.pos.Y = yOffset + 142 + UIMenuItem.getBadgeSpriteHeightOffset(this.badgeRight);
    this.labelText.pos.Y = yOffset + 148;
  }

  public draw(): void {
    if (this.selected) {
      this.selectedSprite.size.width = 431 + (this.parent ? this.parent.WidthOffset : 0);
      this.selectedSprite.pos.X = this.offset.X;
      this.selectedSprite.draw(Menu.screenResolution);
    } else {
      this.rectangle.size.width = 431 + (this.parent ? this.parent.WidthOffset : 0);
      this.rectangle.pos.X = this.offset.X;
      this.rectangle.color = this.hovered ? UIMenuItem.defaultHoveredBackColor : this._backColor;
      this.rectangle.draw(undefined, Menu.screenResolution);
    }

    this.text.color = this.enabled
      ? this.selected
        ? this._highlightedForeColor
        : this.hovered
        ? UIMenuItem.defaultHoveredForeColor
        : this._foreColor
      : new Color(255, 163, 159, 148);

    if (this.supportsLeftBadge && this._leftBadge !== BadgeStyle.None) {
      const widthOffset = UIMenuItem.getBadgeSpriteWidthOffset(this.badgeLeft);
      this.badgeLeft.pos.X = this.offset.X + widthOffset;
      this.text.pos.X = this.offset.X + 40;
      this.badgeLeft.textureName = this.badgeToTextureName(this._leftBadge);
      this.badgeLeft.color = this.badgeToColor(this._leftBadge);
      this.badgeLeft.draw(Menu.screenResolution);
    } else {
      this.text.pos.X = this.offset.X + 8;
    }

    if (this.supportsRightBadge && this._rightBadge !== BadgeStyle.None) {
      this.labelText.pos.X = -40;
      const widthOffset = UIMenuItem.getBadgeSpriteWidthOffset(this.badgeRight);
      this.badgeRight.pos.X = 431 + this.offset.X + (this.parent ? this.parent.WidthOffset : 0);
      this.badgeRight.pos.X -= this.badgeRight.size.width + widthOffset;
      this.badgeRight.textureName = this.badgeToTextureName(this._rightBadge);
      this.badgeRight.color = this.badgeToColor(this._rightBadge);
      this.badgeRight.draw(Menu.screenResolution);
    } else {
      this.labelText.pos.X = -11;
    }

    if (this.supportsRightLabel && this.labelText.caption !== '') {
      this.labelText.pos.X += 431 + this.offset.X + (this.parent ? this.parent.WidthOffset : 0);
      this.labelText.color = this.text.color;
      this.labelText.draw(undefined, Menu.screenResolution);
    }
    this.text.draw(undefined, Menu.screenResolution);
  }
}
