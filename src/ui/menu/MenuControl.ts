export class MenuControl {
  private _enabled: boolean;

  constructor(enabled = true) {
    this._enabled = enabled;
  }

  public get Enabled(): boolean {
    return this._enabled;
  }

  public set Enabled(value: boolean) {
    this._enabled = value;
  }
}
