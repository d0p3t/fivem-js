import { UIMenuItem } from './';
import { Alignment } from '../../../enums';
import { Menu } from '../';

export class UIMenuSeparatorItem extends UIMenuItem {
  protected supportsDescription = false;
  protected supportsPanels = false;
  protected supportsLeftBadge = false;
  protected supportsRightBadge = false;
  protected supportsRightLabel = false;

  constructor(text?: string) {
    super(text ?? '');
    this.text.alignment = Alignment.Centered;
  }

  public setVerticalPosition(y: number): void {
    const yOffset = y + this.offset.Y;
    this.rectangle.pos.Y = yOffset + 144;
    this.text.pos.Y = yOffset + 147;
  }

  public draw(): void {
    const width = 431 + (this.parent ? this.parent.WidthOffset : 0);
    this.rectangle.size.width = width;
    this.rectangle.pos.X = this.offset.X;
    this.rectangle.draw(undefined, Menu.screenResolution);

    if (this.text.caption !== '') {
      this.text.pos.X = this.offset.X + width / 2;
      this.text.draw(undefined, Menu.screenResolution);
    }
  }
}
