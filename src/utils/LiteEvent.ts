export interface ILiteEvent {
  on(handler: { (...args: any[]) }): void;
  off(handler: { (...args: any[]) }): void;
}

export class LiteEvent implements ILiteEvent {
  // tslint:disable-next-line: prefer-array-literal
  private handlers: Array<{ (...args: any[]) }> = [];

  public on(handler: { (...args: any[]) }): void {
    this.handlers.push(handler);
  }

  public off(handler: { (...args: any[]) }): void {
    // tslint:disable-next-line: ter-arrow-parens
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  public emit(...args: any[]) {
    this.handlers.slice(0).forEach((h) => {
      h(...args);
    });
  }

  public expose(): ILiteEvent {
    return this;
  }
}
