import { Ped } from './';

export class Player {
  public static fromServerId(serverId: number): Player {
    return new Player(GetPlayerFromServerId(serverId));
  }

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

  public get WantedLevel(): number {
    return GetPlayerWantedLevel(this.handle);
  }

  public set WantedLevel(level: number) {
    SetPlayerWantedLevel(this.handle, level, false);
    SetPlayerWantedLevelNow(this.handle, false);
  }

  public set IgnoredByPolice(value: boolean) {
    SetPoliceIgnorePlayer(this.handle, value);
  }

  public set IgnoredByEveryone(value: boolean) {
    SetEveryoneIgnorePlayer(this.handle, value);
  }

  public get ServerId(): number {
    return GetPlayerServerId(this.handle);
  }

  private handle: number;
  private ped: Ped | undefined;
  private pvp = false;

  constructor(handle: number) {
    this.handle = handle;
    this.PvPEnabled = true;
  }

  public clearWantedLevel(): void {
    ClearPlayerWantedLevel(this.handle);
  }

  public disableFiringThisFrame(): void {
    DisablePlayerFiring(this.handle, false);
  }
}
