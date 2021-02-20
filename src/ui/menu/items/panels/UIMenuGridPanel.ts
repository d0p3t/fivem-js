import { Color, Point, Size } from '../../../../utils';
import { AbstractUIMenuPanel } from './';
import { Menu, Sprite, Text } from '../../../';
import { Alignment, Control, Font } from '../../../../enums';
import { Game } from '../../../../Game';

export class UIMenuGridPanel extends AbstractUIMenuPanel {
  protected readonly background: Sprite;

  private _isCircleLocked = false;
  private _pressed = false;
  private _lockXAxis = false;
  private _lockYAxis = false;

  private _topText: Text;
  private _leftText: Text;
  private _rightText: Text;
  private _bottomText: Text;

  private _lastCirclePosition: Point;

  private readonly _grid: Sprite;
  private readonly _circle: Sprite;
  private readonly _setCirclePosition: Point;

  constructor(
    topText?: string,
    leftText?: string,
    rightText?: string,
    bottomText?: string,
    circlePosition?: Point,
  ) {
    super();
    this._setCirclePosition = circlePosition || new Point(0.5, 0.5);
    this.background = new Sprite('commonmenu', 'gradient_bgd', new Point(), new Size(431, 275));
    this._grid = new Sprite(
      'pause_menu_pages_char_mom_dad',
      'nose_grid',
      new Point(),
      new Size(200, 200),
    );
    this._circle = new Sprite('mpinventory', 'in_world_circle', new Point(), new Size(20, 20));
    this.TopText = topText;
    this.LeftText = leftText;
    this.RightText = rightText;
    this.BottomText = bottomText;
  }

  public get TopText(): string {
    return this._topText ? this._topText.caption : null;
  }

  public set TopText(value: string) {
    this._setText('_topText', value);
  }

  public get LeftText(): string {
    return this._leftText ? this._leftText.caption : null;
  }

  public set LeftText(value: string) {
    this._setText('_leftText', value);
  }

  public get RightText(): string {
    return this._rightText ? this._rightText.caption : null;
  }

  public set RightText(value: string) {
    this._setText('_rightText', value);
  }

  public get BottomText(): string {
    return this._bottomText ? this._bottomText.caption : null;
  }

  public set BottomText(value: string) {
    this._setText('_bottomText', value);
  }

  public get CirclePosition(): Point {
    return new Point(
      Math.round(
        ((this._circle.pos.X - (this._grid.pos.X + 20) + this._circle.size.width / 2) /
          (this._grid.size.width - 40)) *
          100,
      ) / 100,
      Math.round(
        ((this._circle.pos.Y - (this._grid.pos.Y + 20) + this._circle.size.height / 2) /
          (this._grid.size.height - 40)) *
          100,
      ) / 100,
    );
  }

  public set CirclePosition(position: Point) {
    this.CirclePositionX = position.X;
    this.CirclePositionY = position.Y;
  }

  public set CirclePositionX(x: number) {
    if (this._isCircleLocked && this._lockXAxis) {
      return;
    }
    x = x >= 0 && x <= 1 ? x : 0;
    this._setCirclePosition.X = x;
    this._circle.pos.X =
      this._grid.pos.X + 20 + (this._grid.size.width - 40) * x - this._circle.size.width / 2;
  }

  public set CirclePositionY(y: number) {
    if (this._isCircleLocked && this._lockYAxis) {
      return;
    }
    y = y >= 0 && y <= 1 ? y : 0;
    this._setCirclePosition.Y = y;
    this._circle.pos.Y =
      this._grid.pos.Y + 20 + (this._grid.size.height - 40) * y - this._circle.size.height / 2;
  }

  public get LockXAxis(): boolean {
    return this._lockXAxis;
  }

  public set LockXAxis(value: boolean) {
    this._lockXAxis = value;
    if (value) {
      if (this._lockYAxis) {
        this._lockYAxis = false;
      }
      this.CirclePositionX = 0.5;
    }
  }

  public get LockYAxis(): boolean {
    return this._lockYAxis;
  }

  public set LockYAxis(value: boolean) {
    this._lockYAxis = value;
    if (value) {
      if (this._lockXAxis) {
        this._lockXAxis = false;
      }
      this.CirclePositionY = 0.5;
    }
  }

  public updateParentItem(): void {
    const last = this._lastCirclePosition;
    const current = this.CirclePosition;
    if (!last || last.X !== current.X || last.Y !== current.Y) {
      this._lastCirclePosition = current;
      this.ParentMenu.panelActivated.emit(this.parentItem, this, current);
      this.parentItem.panelActivated.emit(this, current);
    }
  }

  public setVerticalPosition(y: number): void {
    super.setVerticalPosition(y);
    this._grid.pos.Y = y + 37.5;
    if (this._topText) {
      this._topText.pos.Y = y + 5;
    }
    if (this._leftText) {
      this._leftText.pos.Y = y + 120;
    }
    if (this._rightText) {
      this._rightText.pos.Y = y + 120;
    }
    if (this._bottomText) {
      this._bottomText.pos.Y = y + 240;
    }
  }

  public draw(): void {
    if (this.enabled) {
      super.draw();

      const x = this.parentItem.offset.X + this.ParentMenu.WidthOffset / 2;
      this._grid.pos.X = x + 115.5;

      if (!this._isCircleLocked) {
        this.CirclePosition = this._setCirclePosition;
        this._isCircleLocked = true;
      }

      this._grid.draw(Menu.screenResolution);
      this._circle.draw(Menu.screenResolution);

      if (this._topText) {
        this._topText.pos.X = x + 215.5;
        this._topText.draw(undefined, Menu.screenResolution);
      }
      if (this._leftText) {
        this._leftText.pos.X = x + 57.75;
        this._leftText.draw(undefined, Menu.screenResolution);
      }
      if (this._rightText) {
        this._rightText.pos.X = x + 373.25;
        this._rightText.draw(undefined, Menu.screenResolution);
      }
      if (this._bottomText) {
        this._bottomText.pos.X = x + 215.5;
        this._bottomText.draw(undefined, Menu.screenResolution);
      }

      this._processControls();
    }
  }

  private _setText(name: string, value: string): void {
    if (value && value.trim() !== '') {
      if (!this[name]) {
        this[name] = new Text(
          value,
          new Point(),
          0.35,
          Color.white,
          Font.ChaletLondon,
          Alignment.Centered,
        );
      } else {
        this[name].caption = value;
      }
    } else if (this[name]) {
      delete this[name];
    }
  }

  private _processControls(): void {
    if (
      !this._pressed &&
      Game.isDisabledControlJustPressed(0, Control.Attack) &&
      this.ParentMenu.isMouseInBounds(this._grid.pos, this._grid.size)
    ) {
      this._pressed = true;
      (async () => {
        const drawOffset = this.ParentMenu.DrawOffset;
        while (Game.isDisabledControlPressed(0, Control.Attack)) {
          await Wait(0);
          let cX = (GetControlNormal(0, Control.CursorX) - drawOffset.X) * Menu.screenWidth;
          let cY = (GetControlNormal(0, Control.CursorY) - drawOffset.Y) * Menu.screenHeight;
          cX -= this._circle.size.width / 2;
          cY -= this._circle.size.height / 2;

          this._circle.pos.X =
            cX > this._grid.pos.X + 10 + this._grid.size.width - (this._lockXAxis ? 120 : 40)
              ? this._grid.pos.X + 10 + this._grid.size.width - (this._lockXAxis ? 120 : 40)
              : cX < this._grid.pos.X + (this._lockXAxis ? 100 : 20) - this._circle.size.width / 2
              ? this._grid.pos.X + (this._lockXAxis ? 100 : 20) - this._circle.size.width / 2
              : cX;
          this._circle.pos.Y =
            cY > this._grid.pos.Y + 10 + this._grid.size.height - (this._lockYAxis ? 120 : 40)
              ? this._grid.pos.Y + 10 + this._grid.size.height - (this._lockYAxis ? 120 : 40)
              : cY < this._grid.pos.Y + (this._lockYAxis ? 100 : 20) - this._circle.size.height / 2
              ? this._grid.pos.Y + (this._lockYAxis ? 100 : 20) - this._circle.size.height / 2
              : cY;
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
}
