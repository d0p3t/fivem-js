export interface LiteEvent {
  on(handler: { (...args: unknown[]) }): void;
  off(handler: { (...args: unknown[]) }): void;
}

export class LiteEvent implements LiteEvent {
  private handlers: { (...args: unknown[]) }[] = [];

  public on(handler: { (...args: unknown[]) }): void {
    this.handlers.push(handler);
  }

  public off(handler: { (...args: unknown[]) }): void {
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
