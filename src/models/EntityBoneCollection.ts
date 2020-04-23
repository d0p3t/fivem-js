import { Entity, EntityBone } from './';

export class EntityBoneCollection {
  protected readonly owner: Entity;

  private readonly collection: Enumerator<EntityBone>;
  private currentIndex = -1;

  constructor(owner: Entity) {
    this.owner = owner;
  }
}
