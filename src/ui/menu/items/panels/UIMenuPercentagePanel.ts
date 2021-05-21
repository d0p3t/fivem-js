import { Color, Point, Size } from '../../../../utils';
import { AbstractUIMenuPanel } from './';
import { Menu, Rectangle, Sprite, Text } from '../../../';
import { Alignment, Control, Font } from '../../../../enums';
import { Game, Wait } from '../../../../';

export class UIMenuPercentagePanel extends AbstractUIMenuPanel {
  protected readonly background: Sprite;

  private _pressed = false;
  private _lastPercentage: number;

  private readonly _title: Text;
  private readonly _minText: Text;
  private readonly _maxText: Text;

  private readonly _activeBar: Rectangle;
  private readonly _backgroundBar: Rectangle;

  constructor(title = '', percentage = 0, minText?: string, maxText?: string) {
    super();
    this.background = new Sprite('commonmenu', 'gradient_bgd', new Point(), new Size(431, 76));
    const barSize = new Size(413, 10);
    this._activeBar = new Rectangle(new Point(), barSize, Color.fromRgb(245, 245, 245));
    this._backgroundBar = new Rectangle(new Point(), { ...barSize }, Color.fromRgb(87, 87, 87));
    this._title = new Text(
      '',
      new Point(),
      0.35,
      Color.white,
      Font.ChaletLondon,
      Alignment.Centered,
    );
    this._minText = new Text(
      '',
      new Point(),
      0.35,
      Color.white,
      Font.ChaletLondon,
      Alignment.Centered,
    );
    this._maxText = new Text(
      '',
      new Point(),
      0.35,
      Color.white,
      Font.ChaletLondon,
      Alignment.Centered,
    );
    this.Title = title;
    this.MinText = minText || '0%';
    this.MaxText = maxText || '100%';
    this.Percentage = percentage;
    this._lastPercentage = percentage;
  }

  public get Title(): string {
    return this._title.caption;
  }

  public set Title(value: string) {
    this._title.caption = value ? value.trim() : '';
  }

  public get MinText(): string {
    return this._minText.caption;
  }

  public set MinText(value: string) {
    this._minText.caption = value ? value.trim() : '';
  }

  public get MaxText(): string {
    return this._maxText.caption;
  }

  public set MaxText(value: string) {
    this._maxText.caption = value ? value.trim() : '';
  }

  public get Percentage(): number {
    const progress = this._activeBar.size.width / this._backgroundBar.size.width;
    return Math.round(progress * 100) / 100;
  }

  public set Percentage(value: number) {
    value = value || 0;
    value = value < 0 ? 0 : value > 1 ? 1 : value;
    this._activeBar.size.width = this._backgroundBar.size.width * value;
  }

  public updateParentItem(): void {
    const last = this._lastPercentage;
    const current = this.Percentage;
    if (last !== current) {
      this._lastPercentage = current;
      if (this.ParentMenu && this.parentItem) {
        this.ParentMenu.panelActivated.emit(this.parentItem, this, current);
        this.parentItem.panelActivated.emit(this, current);
      }
    }
  }

  public setVerticalPosition(y: number): void {
    super.setVerticalPosition(y);
    this._activeBar.pos.Y = y + 50;
    this._backgroundBar.pos.Y = y + 50;
    y += 15;
    this._minText.pos.Y = y;
    this._title.pos.Y = y;
    this._maxText.pos.Y = y;
  }

  public draw(): void {
    if (this.enabled) {
      super.draw();

      const x = this.parentItem?.offset.X ?? 0 + (this.ParentMenu?.WidthOffset ?? 0) / 2;
      this._activeBar.pos.X = x + 9;
      this._backgroundBar.pos.X = x + 9;
      this._minText.pos.X = x + 25;
      this._title.pos.X = x + 215.5;
      this._maxText.pos.X = x + 398;

      this._backgroundBar.draw(undefined, Menu.screenResolution);
      this._activeBar.draw(undefined, Menu.screenResolution);

      this._minText.draw(undefined, Menu.screenResolution);
      this._title.draw(undefined, Menu.screenResolution);
      this._maxText.draw(undefined, Menu.screenResolution);

      this._processControls();
    }
  }

  private _processControls(): void {
    if (
      !this._pressed &&
      Game.isDisabledControlJustPressed(0, Control.Attack) &&
      this.ParentMenu?.isMouseInBounds(
        new Point(this._backgroundBar.pos.X, this._backgroundBar.pos.Y - 4),
        new Size(this._backgroundBar.size.width, this._backgroundBar.size.height + 8),
      )
    ) {
      this._pressed = true;
      (async () => {
        while (Game.isDisabledControlPressed(0, Control.Attack)) {
          await Wait(0);
          this._activeBar.size.width = this._getProgress();
        }
        this.updateParentItem();
        this._pressed = false;
      })();
      const interval = setInterval(async () => {
        if (Game.isDisabledControlPressed(0, Control.Attack)) {
          this.updateParentItem();
        } else {
          clearInterval(interval);
        }
      }, 75);
    }
  }

  private _getProgress(): number {
    const drawOffset = this.ParentMenu?.DrawOffset ?? new Point(0, 0);
    const progress =
      (GetControlNormal(0, 239) - drawOffset.X) * Menu.screenWidth - this._activeBar.pos.X;
    return progress < 0 ? 0 : progress > 413 ? 413 : progress;
  }
}
