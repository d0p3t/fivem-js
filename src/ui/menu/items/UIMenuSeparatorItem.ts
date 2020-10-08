import { Menu } from '../';
import { Rectangle } from '../../';
import { Color, Point, Size, uuidv4 } from '../../../utils';

export class UIMenuSeparatorItem {
  public readonly id: string = uuidv4();

  public offset: Point;
  public parent: Menu;

  protected rectangle: Rectangle;

  constructor(height = 3, color = Color.black) {
    this.rectangle = new Rectangle(new Point(), new Size(431, height), color);
  }

  public get Height(): number {
    return this.rectangle.size.height;
  }

  public set Height(value: number) {
    this.rectangle.size.height = value;
  }

  public setVerticalPosition(y: number): void {
    this.rectangle.pos = new Point(this.offset.X, y + 144 + this.offset.Y);
  }

  public draw(resolution?: Size): void {
    this.rectangle.size = new Size(431 + this.parent.WidthOffset, this.Height);
    this.rectangle.draw(undefined, resolution);
  }
}
