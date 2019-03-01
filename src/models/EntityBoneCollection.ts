import { EntityBone } from './EntityBone';
import { Entity } from './Entity';

export class EntityBoneCollection {
  private readonly collection: Enumerator<EntityBone>;
  private currentIndex: number = -1;

  protected readonly owner: Entity;

  constructor(owner: Entity) {
    
  }
}
