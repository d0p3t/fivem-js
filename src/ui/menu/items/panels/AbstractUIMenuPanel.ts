import { UIMenuItem } from '../';
import { uuidv4 } from '../../../../utils';
import { Rectangle, Sprite } from '../../../';
import { Menu } from '../../';

export abstract class AbstractUIMenuPanel {
  public readonly id: string = uuidv4();

  protected parentItem: UIMenuItem;
  protected enabled = true;

  protected readonly background: Sprite | Rectangle;

  public get ParentMenu(): Menu {
    return this.parentItem.parent;
  }

  public get ParentItem(): UIMenuItem {
    return this.parentItem;
  }

  public set ParentItem(value: UIMenuItem) {
    this.parentItem = value;
  }

  public get Enabled(): boolean {
    return this.enabled;
  }

  public set Enabled(value: boolean) {
    this.enabled = value;
  }

  public get Height(): number {
    return this.background.size.height;
  }

  public setVerticalPosition(y: number): void {
    this.background.pos.Y = y;
  }

  public draw(): void {
    this.background.size.width = 431 + this.ParentMenu.WidthOffset;
    this.background.pos.X = this.parentItem.offset.X;
    if (this.background instanceof Sprite) {
      this.background.draw(Menu.screenResolution);
    } else {
      this.background.draw(undefined, Menu.screenResolution);
    }
  }
}
