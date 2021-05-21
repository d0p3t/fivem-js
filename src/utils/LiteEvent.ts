/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LiteEvent {
  on(handler: { (...args: unknown[]): any }): void;
  off(handler: { (...args: unknown[]): any }): void;
}

export class LiteEvent implements LiteEvent {
  private handlers: { (...args: unknown[]): any }[] = [];

  public on(handler: { (...args: unknown[]): any }): void {
    this.handlers.push(handler);
  }

  public off(handler: { (...args: unknown[]): any }): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  public emit(...args: unknown[]): void {
    this.handlers.slice(0).forEach(h => {
      h(...args);
    });
  }

  public expose(): LiteEvent {
    return this;
  }
}
