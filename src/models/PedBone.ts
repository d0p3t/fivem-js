import { Bone } from '../enums';
import { EntityBone, Ped } from './';

export class PedBone extends EntityBone {
  constructor(owner: Ped, boneId: Bone) {
    super(owner, GetPedBoneIndex(owner.Handle, Number(boneId)));
  }

  public get IsValid(): boolean {
    return Ped.exists(this.Owner as Ped) && this.Index !== -1;
  }
}
