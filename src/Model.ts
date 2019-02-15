import { Game } from './Game';

export class Model {
  private hash: number;

  constructor(hash: number | string) {
    if (typeof hash === 'string') {
      this.hash = Game.GenerateHash(hash);
    } else {
      this.hash = hash;
    }
  }

  public get Hash(): number {
    return this.hash;
  }

  public get IsPed(): boolean {
    return !!IsModelAPed(this.hash);
  }

  public get IsVehicle(): boolean {
    return !!IsModelAVehicle(this.hash);
  }

  public get IsLoaded(): boolean {
    return !!HasModelLoaded(this.hash);
  }

  public Request(timeout: number): Promise<boolean> {
    return new Promise(resolve => {
      if (!IsModelInCdimage(this.hash) && !IsModelValid(this.hash) && !IsWeaponValid(this.hash)) {
        resolve(false);
      }
      RequestModel(this.hash);
      const start = GetGameTimer();
      const interval = setInterval(() => {
        if (this.IsLoaded || GetGameTimer() - start >= timeout) {
          clearInterval(interval);
          resolve(this.IsLoaded);
        }
      }, 0);
    });
  }

  public MarkAsNoLongerNeeded(): void {
    SetModelAsNoLongerNeeded(this.hash);
  }
}
