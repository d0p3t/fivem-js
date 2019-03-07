interface ILiteEvent {
  on(handler: { (...args: any[]): void }): void;
  off(handler: { (...args: any[]): void }): void;
}

export default class LiteEvent implements ILiteEvent {
  private handlers: { (...args: any[]): void }[] = [];

  public on(handler: { (...args: any[]): void }): void {
    this.handlers.push(handler);
  }

  public off(handler: { (...args: any[]): void }): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  public emit(...args: any[]) {
    this.handlers.slice(0).forEach(h => h(...args));
  }

  public expose(): ILiteEvent {
    return this;
  }
}
