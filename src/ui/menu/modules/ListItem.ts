import { UUIDV4 } from '../../../utils/UUIDV4';

export class ListItem {
  public readonly Id: string = UUIDV4();

  public DisplayText: string;
  public Data: any;

  constructor(text: string = '', data: any = null) {
    this.DisplayText = text;
    this.Data = data;
  }
}
