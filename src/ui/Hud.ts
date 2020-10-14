import { CursorSprite, HudComponent } from '../enums';
import { Point } from '../utils';

export abstract class Hud {
  public static isComponentActive(component: HudComponent): boolean {
    return !!IsHudComponentActive(Number(component));
  }

  public static showComponentThisFrame(component: HudComponent): void {
    ShowHudComponentThisFrame(Number(component));
  }

  public static hideComponentThisFrame(component: HudComponent): void {
    HideHudComponentThisFrame(Number(component));
  }

  public static showCursorThisFrame(): void {
    ShowCursorThisFrame();
  }

  public static set CursorPosition(position: Point) {
    SetCursorLocation(position.X, position.Y);
  }

  public static get CursorSprite(): CursorSprite {
    return CursorSprite.DownArrow;
  }

  public static set CursorSprite(sprite: CursorSprite) {
    SetCursorSprite(Number(sprite));
  }

  public static get IsVisible(): boolean {
    return !(IsHudHidden() || !IsHudPreferenceSwitchedOn());
  }

  public static set IsVisible(toggle: boolean) {
    DisplayHud(toggle);
  }

  public static get IsRadarVisible(): boolean {
    return !(IsRadarHidden() || IsRadarPreferenceSwitchedOn());
  }

  public static set IsRadarVisible(toggle: boolean) {
    DisplayRadar(toggle);
  }

  public static set RadarZoom(zoomLevel: number) {
    SetRadarZoom(zoomLevel);
  }
}
