export class Notification {
  private handle: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  public Hide(): void {
    RemoveNotification(this.handle);
  }
}
