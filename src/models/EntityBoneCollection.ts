import { Entity } from './Entity';
import { EntityBone } from './EntityBone';

export class EntityBoneCollection {
  protected readonly owner: Entity;

  private readonly collection: Enumerator<EntityBone>;
  private currentIndex: number = -1;

  constructor(owner: Entity) {
    this.owner = owner;
  }
}
