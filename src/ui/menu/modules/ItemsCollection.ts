import ListItem from '../modules/ListItem';

export default class ItemsCollection {
  private items: any[];

  constructor(items: any[]) {
    if (items.length === 0) {
      throw new Error('ItemsCollection cannot be empty');
    }
    this.items = items;
  }

  public length() {
    return this.items.length;
  }

  public getListItems() {
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
