import { ListItem } from '../modules';

export class ItemsCollection {
  private items: ListItem[] | string[];

  constructor(items: ListItem[] | string[]) {
    if (items.length === 0) {
      throw new Error('ItemsCollection cannot be empty');
    }
    this.items = items;
  }

  public length(): number {
    return this.items.length;
  }

  public getListItems(): (ListItem | string)[] {
    const items = [];
    for (const item of this.items) {
      if (item instanceof ListItem) {
        items.push(item);
      } else if (typeof item === 'string') {
        items.push(new ListItem(item.toString()));
      }
    }
    return items;
  }
}
