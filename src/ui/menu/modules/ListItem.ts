import { uuidv4 } from '../../../utils';

export class ListItem {
  public readonly id: string = uuidv4();

  public name: string;
  public value: unknown;

  constructor(name: string, value: unknown = null) {
    this.name = name;
    this.value = value;
  }
}
