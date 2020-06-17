import { Game } from './Game';

/**
 * Class to create and manage entity models.
 */
export class Model {
  /**
   * Hash of this model.
   */
  private hash: number;

  /**
   * Creates a model object based on the hash key or model string.
   *
   * @param hash A number or string of the model's hash. Example: "mp_m_freemode_01"
   */
  constructor(hash: number | string) {
    if (typeof hash === 'string') {
      this.hash = Game.generateHash(hash);
    } else {
      this.hash = hash;
    }
  }

  /**
   * Gets the hash of the model.
   *
   * @returns The hash key.
   */
  public get Hash(): number {
    return this.hash;
  }

  /**
   * Gets if the model is a Ped or not.
   *
   * @returns Whether this model is a Ped.
   */
  public get IsPed(): boolean {
    return !!IsModelAPed(this.hash);
  }

  /**
   * Gets if the model is a Vehicle or not.
   *
   * @returns Whether this model is a Vehicle.
   */
  public get IsVehicle(): boolean {
    return !!IsModelAVehicle(this.hash);
  }

  /**
   * Gets if the model is loaded or not.
   *
   * @returns Whether this model is loaded.
   */
  public get IsLoaded(): boolean {
    return !!HasModelLoaded(this.hash);
  }

  /**
   * Request and load the model with a specified timeout. Advised timeout - 1000.
   *
   * @param timeout Maximum allowed time for model to load.
   */
  public request(timeout: number): Promise<boolean> {
    return new Promise(resolve => {
      if (!IsModelInCdimage(this.hash) && !IsModelValid(this.hash) && !IsWeaponValid(this.hash)) {
        resolve(false);
      }
      RequestModel(this.hash);
      const start = GetGameTimer();
      const interval = setInterval(() => {
        if (this.IsLoaded || GetGameTimer() - start >= timeout) {
          clearInterval(interval);
          this.markAsNoLongerNeeded();
          resolve(this.IsLoaded);
        }
      }, 0);
    });
  }

  /**
   * Sets the model as no longer needed allowing the game engine to free memory.
   */
  public markAsNoLongerNeeded(): void {
    SetModelAsNoLongerNeeded(this.hash);
  }
}
