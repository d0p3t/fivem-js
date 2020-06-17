import { EntityBoneCollection, Ped, PedBone } from './';

export class PedBoneCollection extends EntityBoneCollection {
  constructor(owner: Ped) {
    super(owner);
  }

  public get Core(): PedBone {
    return new PedBone(this.owner as Ped, -1);
  }

  public get LastDamaged(): PedBone {
    // const for now until native tested
    const outBone = 0;

    // This native may be returning an object instead (bool, outBone)
    if (GetPedLastDamageBone(this.owner.Handle, outBone)) {
      return this[outBone];
    }
  }

  public clearLastDamaged(): void {
    ClearPedLastDamageBone(this.owner.Handle);
  }
}
