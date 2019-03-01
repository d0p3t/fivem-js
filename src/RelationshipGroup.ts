import { Relationship } from './enums/Relationship';

export class RelationshipGroup {
  private hash: number;

  constructor(name: string) {
    AddRelationshipGroup(name, 0);

    this.hash = 0;
  }

  public get Hash(): number {
    return this.hash;
  }

  public GetRelationshipBetweenGroups(targetGroup: RelationshipGroup): Relationship {
    return GetRelationshipBetweenGroups(this.Hash, targetGroup.Hash);
  }

  public SetRelationshipBetweenGroups(
    targetGroup: RelationshipGroup,
    relationship: Relationship,
    biDirectionally: boolean = false,
  ): void {
    SetRelationshipBetweenGroups(Number(relationship), this.Hash, targetGroup.Hash);

    if (biDirectionally) {
      SetRelationshipBetweenGroups(Number(relationship), targetGroup.Hash, this.Hash);
    }
  }

  public ClearRelationshipBetweenGroups(
    targetGroup: RelationshipGroup,
    relationship: Relationship,
    biDirectionally: boolean = false,
  ): void {
    ClearRelationshipBetweenGroups(Number(relationship), this.Hash, targetGroup.Hash);

    if (biDirectionally) {
      ClearRelationshipBetweenGroups(Number(relationship), targetGroup.Hash, this.Hash);
    }
  }

  public Remove(): void {
    RemoveRelationshipGroup(this.Hash);
  }
}
