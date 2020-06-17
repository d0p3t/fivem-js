import { uuidv4 } from '../../../utils';

export class ListItem {
  public readonly id: string = uuidv4();

  public displayText: string;
  public data: unknown;

  constructor(text = '', data: unknown = null) {
    this.displayText = text;
    this.data = data;
  }
}
