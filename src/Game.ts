import { Control } from './enums';
import { Ped, Player } from './models';

export abstract class Game {
  public static GenerateHash(input: string): number {
    if (typeof input === 'undefined') {
      return 0;
    }
    return GetHashKey(input);
  }

  public static get Player(): Player {
    const handle = PlayerId();
    if (typeof this.cachedPlayer === 'undefined' || handle !== this.cachedPlayer.Handle) {
      this.cachedPlayer = new Player(handle);
    }

    return this.cachedPlayer;
  }

  public static get PlayerPed(): Ped {
    return this.Player.Character;
  }

  public static get MaxPlayers(): number {
    return GetConvarInt('sv_maxclients', 0); // not replicated
  }

  public static *PlayerList(): IterableIterator<Player> {
    const players: Player[] = [];

    for (let i = 0; i < this.MaxPlayers; i++) {
      if (NetworkIsPlayerActive(i)) {
        yield new Player(i);
      }
    }
  }

  public static IsControlPressed(index: number, control: Control): boolean {
    return !!IsControlPressed(index, Number(control));
  }

  public static IsControlJustPressed(index: number, control: Control): boolean {
    return !!IsControlJustPressed(index, Number(control));
  }

  public static IsDisabledControlJustPressed(index: number, control: Control): boolean {
    return !!IsDisabledControlJustPressed(index, Number(control));
  }

  public static IsControlReleased(index: number, control: Control): boolean {
    return !!IsControlReleased(index, Number(control));
  }

  public static IsControlJustReleased(index: number, control: Control): boolean {
    return !!IsControlJustReleased(index, Number(control));
  }

  protected static cachedPlayer: Player;
}
