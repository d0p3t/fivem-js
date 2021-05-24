import { EntityBoneCollection, Ped, PedBone } from './';

export class PedBoneCollection extends EntityBoneCollection {
  constructor(owner: Ped) {
    super(owner);
  }

  public get Core(): PedBone {
    return new PedBone(this.owner as Ped, -1);
  }

  public get LastDamaged(): PedBone {
    const [, outBone] = GetPedLastDamageBone(this.owner.Handle, 0);
    return (PedBone as never)[outBone];
  }

  public clearLastDamaged(): void {
    ClearPedLastDamageBone(this.owner.Handle);
  }
}
