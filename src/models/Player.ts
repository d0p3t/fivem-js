import { Ped } from './Ped';

export class Player {
  public get Handle(): number {
    return this.handle;
  }

  public get Character(): Ped {
    const handle = GetPlayerPed(this.handle);

    if (typeof this.ped === 'undefined' || handle !== this.ped.Handle) {
      this.ped = new Ped(handle);
    }

    return this.ped;
  }

  public get Name(): string {
    return GetPlayerName(this.handle);
  }

  public get PvPEnabled(): boolean {
    return this.pvp;
  }

  public set PvPEnabled(value: boolean) {
    NetworkSetFriendlyFireOption(value);
    SetCanAttackFriendly(this.Character.Handle, value, value);
    this.pvp = value;
  }

  private handle: number;
  private ped: Ped;
  private pvp: boolean;

  constructor(handle: number) {
    this.handle = handle;
    this.PvPEnabled = true;
  }
}
