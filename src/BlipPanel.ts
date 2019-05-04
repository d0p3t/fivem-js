interface BlipData {
  dict: string,
  info: Info,
  money: string,
  rockstarVerified: boolean,
  rp: string,
  tex: string,
  title: string
}

type Info = Array<[number, string, string] | [number, string, string, number, number, boolean]>;

export class BlipPanel {
  private data: BlipData[];
  private display: number;
  private labels: number;
  private entries: number;
  private blip: number;
  constructor() {
    // @ts-ignore
    this.data = {};
    this.display = 1;
    this.labels = 0;
    this.entries = 0;
    this.blip = undefined;

    this.setTick();
  }

  public setBlip(blip: number): this {
    this.blip = blip;
    SetBlipAsMissionCreatorBlip(blip, true);
    this.data[blip] = {
      dict: '',
      info: [],
      money: '',
      rockstarVerified: false,
      rp: '',
      tex: '',
      title: '',
    };
    return this;
  }

  public resetBlipInfo(): this {
    return this.data[this.blip] = null;
  }

  public setBlipInfoTitle(title: string = '', rockstarVerified: boolean = false): this {
    const data: BlipData = this.data[this.blip];
    data.title = title;
    data.rockstarVerified = rockstarVerified;
    return this;
  }

  public setBlipInfoImage(dict: string = '', tex: string = ''): this {
    const data: BlipData = this.data[this.blip];
    data.dict = dict;
    data.tex = tex;
    return this;
  }

  public setBlipInfoEconomy(rp: string = '', money: string = ''): this {
    const data: BlipData = this.data[this.blip];
    data.money = money;
    data.rp = rp;
    return this;
  }

  public setBlipInfo(info: Info): this {
    const data: BlipData = this.data[this.blip];
    data.info = info;
    return this;
  }

  public addBlipInfoText(leftText: string = '', rightText: string = ''): this {
    const data: BlipData = this.data[this.blip];
    if (rightText) {
      data.info.push([1, leftText, rightText])
    } else {
      data.info.push([5, leftText, ''])
    }
    return this;
  }

  public addBlipInfoName(leftText: string = '', rightText: string = ''): this {
    const data: BlipData = this.data[this.blip];
    data.info.push([4, leftText, rightText]);
    return this;
  }

  public addBlipInfoIcon(leftText: string = '', rightText: string = '', iconId: number = 0, iconColor: number = 0, checked: boolean = false): this {
    const data: BlipData = this.data[this.blip];
    data.info.push([2, leftText, rightText, iconId, iconColor, checked]);
    return this
  }

  // Fancy native stuff
  private updateDisplay(): void {
    if (PushScaleformMovieFunctionN('DISPLAY_DATA_SLOT')) {
      PushScaleformMovieFunctionParameterInt(this.display);
      PopScaleformMovieFunctionVoid()
    }
  }

  private setColumnState(column: any, state: any): void {
    if (PushScaleformMovieFunctionN('SHOW_COLUMN')) {
      PushScaleformMovieFunctionParameterInt(column);
      PushScaleformMovieFunctionParameterBool(state);
      PopScaleformMovieFunctionVoid();
    }
  }

  private showDisplay(show: any) {
    this.setColumnState(this.display, show)
  }

  private func_36(fParam0) {
    BeginTextCommandScaleformString(fParam0);
    EndTextCommandScaleformString();
  }

  private setIcon(index, title, text, icon, iconColor, completed): void {
    if (PushScaleformMovieFunctionN('SET_DATA_SLOT')) {
      PushScaleformMovieFunctionParameterInt(this.display);
      PushScaleformMovieFunctionParameterInt(index);
      PushScaleformMovieFunctionParameterInt(65);
      PushScaleformMovieFunctionParameterInt(3);
      PushScaleformMovieFunctionParameterInt(2);
      PushScaleformMovieFunctionParameterInt(0);
      PushScaleformMovieFunctionParameterInt(1);
      this.func_36(title);
      this.func_36(text);
      PushScaleformMovieFunctionParameterInt(icon);
      PushScaleformMovieFunctionParameterInt(iconColor);
      PushScaleformMovieFunctionParameterBool(completed);
      PopScaleformMovieFunctionVoid()
    }
  }

  private setText(index, title, text, textType): void {
    if (PushScaleformMovieFunctionN('SET_DATA_SLOT')) {
      PushScaleformMovieFunctionParameterInt(this.display);
      PushScaleformMovieFunctionParameterInt(index);
      PushScaleformMovieFunctionParameterInt(65);
      PushScaleformMovieFunctionParameterInt(3);
      PushScaleformMovieFunctionParameterInt(textType || 0);
      PushScaleformMovieFunctionParameterInt(0);
      PushScaleformMovieFunctionParameterInt(0);
      this.func_36(title);
      this.func_36(text);
      PopScaleformMovieFunctionVoid()
    }
  }

  private clearDisplay(): void {
    if (PushScaleformMovieFunctionN('SET_DATA_SLOT_EMPTY')) {
      PushScaleformMovieFunctionParameterInt(this.display)
    }
    PopScaleformMovieFunctionVoid();
    this.labels = 0;
    this.entries = 0;
  }

  private _label(text) {
    const lbl = `LBL${this.labels}`;
    AddTextEntry(lbl, text);
    this.labels = this.labels + 1;
    return lbl;
  }

  private setTitle(title, rockstarVerified, rp, money, dict, tex): void {
    if (PushScaleformMovieFunctionN('SET_COLUMN_TITLE')) {
      PushScaleformMovieFunctionParameterInt(this.display);
      this.func_36('');
      this.func_36(this._label(title));
      PushScaleformMovieFunctionParameterInt(rockstarVerified);
      PushScaleformMovieFunctionParameterString(dict);
      PushScaleformMovieFunctionParameterString(tex);
      PushScaleformMovieFunctionParameterInt(0);
      PushScaleformMovieFunctionParameterInt(0);
      if (rp === '') {
        PushScaleformMovieFunctionParameterBool(!!0);
      } else {
        this.func_36(this._label(rp))
      }
      if (money === '') {
        PushScaleformMovieFunctionParameterBool(!!0);
      } else {
        this.func_36(this._label(money))
      }

      PopScaleformMovieFunctionVoid()
    }
  }

  private addText(title, desc, style): void {
    this.setText(this.entries, this._label(title), this._label(desc), style || 1);
    this.entries = this.entries + 1;
  }

  private addIcon(title, desc, icon, color, checked): void {
    this.setIcon(this.entries, this._label(title), this._label(desc), icon, color, checked);
    this.entries = this.entries + 1;
  }

  private setTick() {
    setTick(() => {
      let currentBlip = null;
      if (N_0x3bab9a4e4f2ff5c7()) {
        const blip = DisableBlipNameForVar();
        if (N_0x4167efe0527d706e()) {
          if (DoesBlipExist(blip)) {
            if (currentBlip !== blip) {
              currentBlip = blip;
              if (this.data[blip]) {
                const data: BlipData = this.data[blip];
                N_0xec9264727eec0f28();
                this.clearDisplay();
                this.setTitle(data.title, data.rockstarVerified, data.rp, data.money, data.dict, data.tex);
                for (const info in data.info) {
                  // @ts-ignore TODO: Uhh
                  if (info[0] === 2) {
                    this.addIcon(info[1], info[2], info[4], info[5], info[6]);
                  } else {
                    this.addText(info[1], info[2], info[0]);
                  }
                }
                this.showDisplay(true);
                this.updateDisplay();
                N_0x14621bb1df14e2b2()
              } else {
                this.showDisplay(false);
              }
            }
          }
        } else {
          if (currentBlip) {
            currentBlip = null;
            this.showDisplay(false);
          }
        }
      }
    });
  }
}
