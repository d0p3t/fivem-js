import { Color, Point, Size } from '../../../../utils';
import { AbstractUIMenuPanel } from './';
import { Rectangle, Sprite, Text } from '../../../';
import { Alignment, Control, Font } from '../../../../enums';
import { Game, Menu } from '../../../../';

export class UIMenuColorPanel extends AbstractUIMenuPanel {
  protected readonly background: Sprite;

  private _title: string;
  private _text: Text;
  private _colors: Color[] = [];
  private _bar: Rectangle[] = [];

  private _lastColor: Color;

  private readonly _leftArrow: Sprite;
  private readonly _rightArrow: Sprite;
  private readonly _selectedRectangle: Rectangle;

  // Pagination
  private _min = 0;
  private _max = 8;
  private _total = 9;
  private _index = 0;

  constructor(title: string, colors: Color[]) {
    super();
    this.background = new Sprite(
      'commonmenu',
      'gradient_bgd',
      new Point(),
      new Size(431, 112),
    );
    this._leftArrow = new Sprite(
      'commonmenu',
      'arrowleft',
      new Point(),
      new Size(30, 30),
    );
    this._rightArrow = new Sprite(
      'commonmenu',
      'arrowright',
      new Point(),
      new Size(30, 30),
    );
    this._selectedRectangle = new Rectangle(
      new Point(),
      new Size(44.5, 8),
      Color.white,
    );
    this._text = new Text(
      '',
      new Point(),
      0.35,
      Color.white,
      Font.ChaletLondon,
      Alignment.Centered,
    );
    this.Title = title;
    this.Colors = colors;
  }

  public get Title(): string {
    return this._title;
  }

  public set Title(value: string) {
    this._title = value ? value.trim() : '';
    this._updateText();
  }

  public get Colors(): Color[] {
    return this._colors;
  }

  public set Colors(value: Color[]) {
    if (!value) {
      value = [];
    }
    this._colors = value;
    this._bar = [];
    const colorRectangles = value
      .slice(0, this._total)
      .map(color => {
        return new Rectangle(
          new Point(0, 0),
          new Size(44.5, 44.5),
          color,
        );
      });
    this._bar.push(...colorRectangles);
    this._refreshIndex();
    this._updateSelection(true);
  }

  public get Color(): Color {
    return this._colors[this.Index];
  }

  public set Color(value: Color) {
    const index = this._colors
      .findIndex(c => {
        return c.a === value.a &&
          c.r === value.r &&
          c.g === value.g &&
          c.b === value.b;
      });
    if (index !== -1) {
      this.Index = index;
    }
  }

  public get Index(): number {
    return this._index % this._colors.length;
  }

  public set Index(value: number) {
    value = 1000000 - (1000000 % this._colors.length) + value;
    if (this.Index === value % this._colors.length) {
      return;
    }
    this._index = value;
    const currentSelection = this.Index;
    if (currentSelection > this._max) {
      this._min = currentSelection - this._total + 1;
      this._max = currentSelection;
    } else if (currentSelection < this._min) {
      this._min = currentSelection;
      this._max = currentSelection + this._total - 1;
    }
    this._updateSelection();
  }

  public updateParentItem(): void {
    const last = this._lastColor;
    const current = this.Color;
    if (
      !last ||
      last.a !== current.a ||
      last.r !== current.r ||
      last.g !== current.g ||
      last.b !== current.b
    ) {
      this._lastColor = current;
      this.ParentMenu.panelActivated.emit(this.parentItem, this, this.Index, current);
      this.parentItem.panelActivated.emit(this, this.Index, current);
    }
  }

  public setVerticalPosition(y: number): void {
    super.setVerticalPosition(y);
    this._selectedRectangle.pos.Y = y + 47;
    this._leftArrow.pos.Y = y + 15;
    this._rightArrow.pos.Y = y + 15;
    this._text.pos.Y = y + 15;
    this._bar.forEach(async (colorRect) => {
      colorRect.pos.Y = y + 55;
    });
  }

  public draw(): void {
    if (this.enabled) {
      super.draw();

      const x = this.parentItem.offset.X + (this.ParentMenu.WidthOffset / 2);
      this._selectedRectangle.pos.X = x + 15 + (44.5 * (this.Index - this._min));
      this._leftArrow.pos.X = x + 7.5;
      this._rightArrow.pos.X = x + 393.5;
      this._text.pos.X = x + 215.5;

      this._leftArrow.draw(Menu.screenResolution);
      this._rightArrow.draw(Menu.screenResolution);

      this._text.draw(undefined, Menu.screenResolution);
      this._selectedRectangle.draw(undefined, Menu.screenResolution);

      this._bar.forEach(async (colorRect, index) => {
        colorRect.pos.X = x + 15 + (44.5 * index);
        colorRect.draw(undefined, Menu.screenResolution);
      });

      this._processControls();
    }
  }

  private _refreshIndex(): void {
    if (!this._colors.length) {
      this._index = 1000;
    } else {
      this._index = 1000 - (1000 % this._colors.length);
    }

    this._max = this._total - 1;
    this._min = 0;
  }

  private _updateSelection(preventUpdate = false): void {
    if (!preventUpdate) {
      this.updateParentItem();
    }
    this._bar.forEach(async (colorRect, index) => {
      colorRect.color = this._colors[this._min + index];
    });
    this._updateText();
  }

  private _updateText(): void {
    this._text.caption = `${this._title} [${this.Index + 1 || 0} / ${this._colors.length}]`;
  }

  private _goLeft(): void {
    if (this._colors.length > this._total) {
      if (this.Index <= this._min) {
        if (this.Index === 0) {
          this._min = this._colors.length - this._total;
          this._max = this._colors.length - 1;
          this._index = 1000 - (1000 % this._colors.length);
          this._index += this._colors.length - 1;
        } else {
          this._min--;
          this._max--;
          this._index--;
        }
      } else {
        this._index--;
      }
    } else {
      this._index--;
    }
    this._updateSelection();
  }

  private _goRight(): void {
    if (this._colors.length > this._total) {
      if (this.Index >= this._max) {
        if (this.Index === this._colors.length - 1) {
          this._min = 0;
          this._max = this._total - 1;
          this._index = 1000 - (1000 % this._colors.length);
        } else {
          this._min++;
          this._max++;
          this._index++;
        }
      } else {
        this._index++;
      }
    } else {
      this._index++;
    }
    this._updateSelection();
  }

  private _processControls(): void {
    if (Game.isDisabledControlJustPressed(0, Control.Attack)) {
      if (this.ParentMenu.isMouseInBounds(this._leftArrow.pos, this._leftArrow.size)) {
        this._goLeft();
      } else if (this.ParentMenu.isMouseInBounds(this._rightArrow.pos, this._rightArrow.size)) {
        this._goRight();
      }
      this._bar.forEach(async (colorRect, index) => {
        if (this.ParentMenu.isMouseInBounds(colorRect.pos, colorRect.size)) {
          this.Index = this._min + index;
        }
      });
    }
  }
}
