import { HudColor } from './enums';
import { GamerTagComponent } from './enums/GamerTagComponent';

export class GamerTag {
  protected handle: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  public get Handle(): number {
    return this.handle;
  }

  public get IsActive(): boolean {
    return IsMpGamerTagActive(this.handle) == 1;
  }

  public get IsFree(): boolean {
    return IsMpGamerTagFree(this.handle) == 1;
  }

  public set Name(value: string) {
    SetMpGamerTagName(this.handle, value);
  }

  public set WantedLevel(level: number) {
    SetMpGamerTagWantedLevel(this.handle, level);
  }

  public setHealthBarColour(color: HudColor) {
    SetMpGamerTagHealthBarColour(this.handle, color);
  }

  public setComponentAlpha(component: GamerTagComponent, alpha: number): void {
    SetMpGamerTagAlpha(this.handle, component, alpha);
  }

  public setComponentColour(component: GamerTagComponent, hudColorIndex: HudColor): void {
    SetMpGamerTagColour(this.handle, component, hudColorIndex);
  }

  public setComponentVisibility(component: GamerTagComponent, visible: boolean): void {
    SetMpGamerTagVisibility(this.handle, component, visible);
  }

  public delete(): void {
    RemoveMpGamerTag(this.handle);
  }
}
