import { HudComponent } from '../enums';
import { Color, Point, Size } from '../utils';
import { Hud } from './Hud';
import { LoadingPrompt } from './LoadingPrompt';
import { Screen } from './Screen';
import { Sprite } from './Sprite';

const activeTimerBars: Timerbar[] = [];

const drawText = (text, position, options) => {
  options = {
    ...{
      align: 1,
      color: [255, 255, 255, 255],
      font: 4,
      outline: true,
      scale: 0.3,
      shadow: true,
    },
    ...options,
  };

  const font = options.font;
  const scale = options.scale;
  const outline = options.outline;
  const shadow = options.shadow;
  const color = options.color;
  const wordWrap = options.wordWrap;
  const align = options.align;

  SetTextEntry('CELL_EMAIL_BCON');
  for (let i = 0; i < text.length; i += 99) {
    const subStringText = text.substr(i, Math.min(99, text.length - i));
    AddTextComponentSubstringPlayerName(subStringText);
  }

  SetTextFont(font);
  SetTextScale(scale, scale);
  SetTextColour(color[0], color[1], color[2], color[3]);

  if (shadow) {
    SetTextDropShadow();
  }

  if (outline) {
    SetTextOutline();
  }

  switch (align) {
    case 1: {
      SetTextCentre(true);
      break;
    }

    case 2: {
      SetTextRightJustify(true);
      SetTextWrap(0.0, position[0] || 0);
      break;
    }
  }

  DrawText(position[0] || 0, position[1] || 0);
};

export class Timerbar {
  private sprite: Sprite = null;
  private title: string = '';
  private text: string = '';
  private useProgressBar: boolean = false;
  private usePlayerStyle: boolean = false;
  private isVisible: boolean = false;
  private pbarValue: number = 0.0;
  private textColor: any = [240, 240, 240, 255];
  private pbarBgColor: any = [155, 155, 155, 255];
  private pbarFgColor: any = [255, 255, 255, 255];

  constructor(title: string, useProgressBar: boolean = false) {
    this.title = title;
    this.useProgressBar = useProgressBar;
    this.text = '';
    this.pbarValue = 0.0;
    this.textColor = [240, 240, 240, 255];
    this.pbarBgColor = [155, 155, 155, 255];
    this.pbarFgColor = [255, 255, 255, 255];
    this.usePlayerStyle = false;

    const safeZone = GetSafeZoneSize();
    const safeZoneX = (1.0 - safeZone) * 0.5;
    const safeZoneY = (1.0 - safeZone) * 0.5;
    this.sprite = new Sprite(
      'timerbars',
      'all_black_bg',
      new Point(Screen.ScaledWidth * 0.918 - safeZoneX, Screen.Height * 0.984 - safeZoneY),
      new Size(Screen.ScaledWidth * 0.165, Screen.Height * 0.035),
      0,
      new Color(160, 255, 255, 255),
    );
    if (!this.sprite.IsTextureDictionaryLoaded) {
      this.sprite.loadTextureDictionary();
    }

    this.isVisible = true;
    activeTimerBars.push(this);
  }

  public get Title(): string {
    return this.title;
  }

  public set Title(value: string) {
    this.title = value;
  }

  public get Text(): string {
    return this.text;
  }

  public set Text(value: string) {
    this.text = value;
  }

  public get UseProgressBar(): boolean {
    return this.useProgressBar;
  }

  public get Progress() {
    return this.pbarValue;
  }

  public set Progress(value) {
    this.pbarValue = value <= 0.0 ? 0.0 : value >= 1.0 ? 1.0 : value;
  }

  public get Visible() {
    return this.isVisible;
  }

  public set Visible(value) {
    const idx = activeTimerBars.indexOf(this);
    if (value) {
      if (idx !== -1) {
        return;
      }
      activeTimerBars.push(this);
    } else {
      if (idx === -1) {
        return;
      }
      activeTimerBars.splice(idx, 1);
    }

    this.isVisible = value;
  }

  public get TextColor() {
    return this.textColor;
  }

  public set TextColor(value) {
    if (Array.isArray(value)) {
      this.textColor = value;
    } else {
      const result = GetHudColour(value);
      this.textColor = [result[0], result[1], result[2], result[3]];
    }
  }

  public get ProgressbarBgColor() {
    return this.pbarBgColor;
  }

  public set ProgressbarBgColor(value) {
    if (Array.isArray(value)) {
      this.pbarBgColor = value;
    } else {
      const result = GetHudColour(value);
      this.pbarBgColor = [result[0], result[1], result[2], result[3]];
    }
  }

  public get ProgressbarFgColor() {
    return this.pbarFgColor;
  }

  public set ProgressbarFgColor(value) {
    if (Array.isArray(value)) {
      this.pbarFgColor = value;
    } else {
      const result = GetHudColour(value);
      this.pbarFgColor = [result[0], result[1], result[2], result[3]];
    }
  }

  public set PlayerStyle(value: boolean) {
    this.usePlayerStyle = value;
  }

  public get PlayerStyle(): boolean {
    return this.usePlayerStyle;
  }

  public get Sprite(): Sprite {
    return this.sprite;
  }
}

setTick(() => {
  if (activeTimerBars.length <= 0) {
    return;
  }

  const safeZone = GetSafeZoneSize();
  const safeZoneX = (1.0 - safeZone) * 0.5;
  const safeZoneY = (1.0 - safeZone) * 0.5;

  Hud.hideComponentThisFrame(HudComponent.AreaName);
  Hud.hideComponentThisFrame(HudComponent.StreetName);

  let loadingPromptOffset = 0;
  if (LoadingPrompt.IsActive) {
    loadingPromptOffset = 0.035 + 0.035 * 0.038 * 2;
  }

  activeTimerBars.forEach((timerbar) => {
    const drawY =
      0.984 - loadingPromptOffset - safeZoneY - activeTimerBars.indexOf(timerbar) * 0.038;
    DrawSprite(
      'timerbars',
      'all_black_bg',
      0.918 - safeZoneX,
      drawY,
      0.165,
      0.035,
      0.0,
      255,
      255,
      255,
      160,
    );

    drawText(
      timerbar.Title,
      [0.918 - safeZoneX + 0.012, drawY - 0.009 - (timerbar.PlayerStyle ? 0.00625 : 0)],
      {
        align: 2,
        color: timerbar.TextColor,
        font: timerbar.PlayerStyle ? 4 : 0,
        outline: false,
        scale: timerbar.PlayerStyle ? 0.465 : 0.3,
        shadow: timerbar.PlayerStyle,
      },
    );

    if (timerbar.UseProgressBar) {
      const pbarX = 0.918 - safeZoneX + 0.047;
      const pbarY = drawY + 0.0015;
      const width = 0.0616 * timerbar.Progress;

      DrawRect(
        pbarX,
        pbarY,
        0.0616,
        0.0105,
        timerbar.ProgressbarBgColor[0],
        timerbar.ProgressbarBgColor[1],
        timerbar.ProgressbarBgColor[2],
        timerbar.ProgressbarBgColor[3],
      );

      DrawRect(
        pbarX - 0.0616 / 2 + width / 2,
        pbarY,
        width,
        0.0105,
        timerbar.ProgressbarFgColor[0],
        timerbar.ProgressbarFgColor[1],
        timerbar.ProgressbarFgColor[2],
        timerbar.ProgressbarFgColor[3],
      );
    } else {
      drawText(timerbar.Text, [0.918 - safeZoneX + 0.0785, drawY + -0.0165], {
        align: 2,
        color: timerbar.TextColor,
        font: 0,
        outline: false,
        scale: 0.425,
        shadow: false,
      });
    }
  });
});
