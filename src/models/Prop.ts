import { Entity } from './Entity';

export class Prop extends Entity {
  public static Exists(prop: Prop): boolean {
    return typeof prop !== 'undefined' && prop.Exists();
  }

  constructor(handle: number) {
    super(handle);
  }

  public Exists(): boolean {
    return super.Exists() && GetEntityType(this.handle) === 3;
  }
}
