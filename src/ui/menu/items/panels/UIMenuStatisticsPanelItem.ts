import { Color, Crypto, Point, Size } from '../../../../utils';
import { Rectangle, Text } from '../../../';
import { Alignment, Font } from '../../../../enums';

export class UIMenuStatisticsPanelItem {
  public readonly id: string = Crypto.uuidv4();

  public readonly text: Text;
  public readonly activeBar: Rectangle;
  public readonly backgroundBar: Rectangle;
  public readonly divider: Rectangle[] = [];

  constructor(name: string, percentage = 0) {
    this.text = new Text('', new Point(), 0.35, Color.white, Font.ChaletLondon, Alignment.Left);
    this.backgroundBar = new Rectangle(
      new Point(),
      new Size(200, 10),
      Color.fromArgb(100, 87, 87, 87),
    );
    this.activeBar = new Rectangle(new Point(), new Size(0, 10), Color.white);
    for (let i = 1; i <= 4; i++) {
      this.divider.push(new Rectangle(new Point(), new Size(2, 10), Color.black));
    }
    this.Name = name;
    this.Percentage = percentage;
  }

  public get Name(): string {
    return this.text.caption;
  }

  public set Name(value: string) {
    this.text.caption = value ? value.trim() : '';
  }

  public get Percentage(): number {
    return this.activeBar.size.width / 200;
  }

  public set Percentage(value: number) {
    value = value || 0;
    value = Math.round(value * 100) / 100;
    value = value < 0 ? 0 : value > 1 ? 1 : value;
    this.activeBar.size.width = value * 200;
  }
}
