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
    return IsModelAPed(this.hash) ? true : false;
  }

  public get IsVehicle(): boolean {
    return IsModelAVehicle(this.hash) ? true : false;
  }

  public get IsLoaded(): boolean {
    return HasModelLoaded(this.hash) ? true : false;
  }

  public async Request(timeout: number): Promise<boolean> {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (!this.IsLoaded) {
          if (IsModelInCdimage(this.hash) || IsModelValid(this.hash) || IsWeaponValid(this.hash)) {
            RequestModel(this.hash);

            const timer = GetGameTimer();
            while (!this.IsLoaded) {
              setTimeout(() => {
                /* waiting */
              }, 1);

              if (GetGameTimer() - timer >= timeout) {
                clearInterval(interval);
                resolve(false);
              }
            }
          } else {
            clearInterval(interval);
            resolve(false);
          }
        }
        clearInterval(interval);
        resolve(true);
      }, 0);
    });
  }

  public MarkAsNoLongerNeeded(): void {
    SetModelAsNoLongerNeeded(this.hash);
  }
}
