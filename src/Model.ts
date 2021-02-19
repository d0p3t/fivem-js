import { Game } from './Game';
import { VehicleHash } from './hashes';
import { Vector3 } from './utils';

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
   * Gets if the model is valid or not.
   *
   * @returns Whether this model is valid.
   */
  public get IsValid(): boolean {
    return !!IsModelValid(this.hash);
  }

  /**
   * Gets if the model is in cd image or not.
   *
   * @returns Whether this model is in cd image.
   */
  public get IsInCdImage(): boolean {
    return !!IsModelInCdimage(this.hash);
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
   * Gets if the model collision is loaded or not.
   *
   * @returns Whether this model collision is loaded.
   */
  public get IsCollisionLoaded(): boolean {
    return !!HasCollisionForModelLoaded(this.hash);
  }

  /**
   * Gets if the model is a bicycle or not.
   *
   * @returns Whether this model is a bicycle.
   */
  public get IsBicycle(): boolean {
    return !!IsThisModelABicycle(this.hash);
  }

  /**
   * Gets if the model is a motorbike or not.
   *
   * @returns Whether this model is a motorbike.
   */
  public get IsBike(): boolean {
    return !!IsThisModelABike(this.hash);
  }

  /**
   * Gets if the model is a boat or not.
   *
   * @returns Whether this model is a boat.
   */
  public get IsBoat(): boolean {
    return !!IsThisModelABoat(this.hash);
  }

  /**
   * Gets if the model is a car or not.
   *
   * @returns Whether this model is a car.
   */
  public get IsCar(): boolean {
    return !!IsThisModelACar(this.hash);
  }

  /**
   * Gets if the model is a cargobob or not.
   *
   * @returns Whether this model is a cargobob.
   */
  public get IsCargobob(): boolean {
    return (
      this.hash === VehicleHash.Cargobob ||
      this.hash === VehicleHash.Cargobob2 ||
      this.hash === VehicleHash.Cargobob3 ||
      this.hash === VehicleHash.Cargobob4
    );
  }

  /**
   * Gets if the model is a helicopter or not.
   *
   * @returns Whether this model is a helicopter.
   */
  public get IsHelicopter(): boolean {
    return !!IsThisModelAHeli(this.hash);
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
   * Gets if the model is a plane or not.
   *
   * @returns Whether this model is a plane.
   */
  public get IsPlane(): boolean {
    return !!IsThisModelAPlane(this.hash);
  }

  /**
   * Gets if the model is a prop or not.
   *
   * @returns Whether this model is a prop.
   */
  public get IsProp(): boolean {
    return this.IsValid && !this.IsPed && !this.IsVehicle && !IsWeaponValid(this.hash);
  }

  /**
   * Gets if the model is a quadbike or not.
   *
   * @returns Whether this model is a quadbike.
   */
  public get IsQuadbike(): boolean {
    return !!IsThisModelAQuadbike(this.hash);
  }

  /**
   * Gets if the model is a train or not.
   *
   * @returns Whether this model is a train.
   */
  public get IsTrain(): boolean {
    return !!IsThisModelATrain(this.hash);
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
   * Gets the model dimensions.
   *
   * @returns This model dimensions.
   */
  public get Dimensions(): Vector3 {
    const [min, max] = GetModelDimensions(this.hash);
    const right = new Vector3(min[0], min[1], min[2]);
    const left = new Vector3(max[0], max[1], max[2]);
    return Vector3.subtract(left, right);
  }

  /**
   * Request and load the model with a specified timeout. Default timeout is 1000 (recommended).
   *
   * @param timeout Maximum allowed time for model to load.
   */
  public request(timeout = 1000): Promise<boolean> {
    return new Promise(resolve => {
      if (!this.IsInCdImage && !this.IsValid && !IsWeaponValid(this.hash)) {
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
