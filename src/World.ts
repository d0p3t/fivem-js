import { Entity, Model } from './';
import { Blip } from './Blip';
import { Camera } from './Camera';
import { CloudHat, IntersectOptions, MarkerType, Weather } from './enums';
import { VehicleHash } from './hashes';
import { Ped, Vehicle } from './models';
import { RaycastResult } from './Raycast';
import { clamp, Color, getRandomInt, Vector3 } from './utils';

/**
 * Class with common world manipulations.
 *
 * This class includes methods for creating entities and common world rendering.
 */
export abstract class World {
  public static get RenderingCamera(): Camera {
    return new Camera(GetRenderingCam());
  }

  public static set RenderingCamera(value: Camera) {
    if (value === null) {
      RenderScriptCams(false, false, 3000, true, false);
    } else {
      value.IsActive = true;
      RenderScriptCams(true, false, 3000, true, false);
    }
  }

  public static get CurrentDate(): Date {
    const year = GetClockYear();
    const month = GetClockMonth();
    const day = GetClockDayOfMonth();
    const hour = GetClockHours();
    const minutes = GetClockMinutes();
    const seconds = GetClockSeconds();

    return new Date(year, month, day, hour, minutes, seconds);
  }

  public static set CurrentDate(date: Date) {
    SetClockDate(date.getDate(), date.getMonth(), date.getFullYear());
    SetClockTime(date.getHours(), date.getMinutes(), date.getSeconds());
  }

  public static set Blackout(value: boolean) {
    SetBlackout(value);
  }

  public static get CloudHat(): CloudHat {
    return this.currentCloudHat;
  }

  public static set CloudHat(value: CloudHat) {
    this.currentCloudHat = value;
    if (this.currentCloudHat === CloudHat.Unknown) {
      this.currentCloudHat = CloudHat.Clear;
      ClearCloudHat();
      return;
    }

    SetCloudHatTransition(
      this.cloudHatDict.has(this.currentCloudHat)
        ? this.cloudHatDict.get(this.currentCloudHat)
        : '',
      3,
    );
  }

  public static get CloudHatOpacity(): number {
    return GetCloudHatOpacity();
  }

  public static set CloudHatOpacity(value: number) {
    SetCloudHatOpacity(clamp(value, 0, 1));
  }

  public static get Weather(): Weather {
    switch (GetPrevWeatherTypeHashName()) {
      case -1750463879:
        return Weather.ExtraSunny;
      case 916995460:
        return Weather.Clear;
      case -1530260698:
        return Weather.Neutral;
      case 282916021:
        return Weather.Smog;
      case -1368164796:
        return Weather.Foggy;
      case 821931868:
        return Weather.Clouds;
      case -1148613331:
        return Weather.Overcast;
      case 1840358669:
        return Weather.Clearing;
      case 1420204096:
        return Weather.Raining;
      case -1233681761:
        return Weather.ThunderStorm;
      case 669657108:
        return Weather.Blizzard;
      case -273223690:
        return Weather.Snowing;
      case 603685163:
        return Weather.Snowlight;
      case -1429616491:
        return Weather.Christmas;
      case -921030142:
        return Weather.Halloween;
      default:
        return Weather.Unknown;
    }
  }

  public static set Weather(value: Weather) {
    if (value !== Weather.Unknown) {
      const weather = this.weatherDict[value];
      SetWeatherTypeOverTime(weather, 1);
      setTimeout(() => {
        SetWeatherTypeNow(weather);
        // tslint:disable-next-line: align
      }, 100);
    }
  }

  public static get NextWeather(): Weather {
    switch (GetNextWeatherTypeHashName()) {
      case -1750463879:
        return Weather.ExtraSunny;
      case 916995460:
        return Weather.Clear;
      case -1530260698:
        return Weather.Neutral;
      case 282916021:
        return Weather.Smog;
      case -1368164796:
        return Weather.Foggy;
      case 821931868:
        return Weather.Clouds;
      case -1148613331:
        return Weather.Overcast;
      case 1840358669:
        return Weather.Clearing;
      case 1420204096:
        return Weather.Raining;
      case -1233681761:
        return Weather.ThunderStorm;
      case 669657108:
        return Weather.Blizzard;
      case -273223690:
        return Weather.Snowing;
      case 603685163:
        return Weather.Snowlight;
      case -1429616491:
        return Weather.Christmas;
      case -921030142:
        return Weather.Halloween;
      default:
        return Weather.Unknown;
    }
  }

  public static set NextWeather(value: Weather) {
    if (value !== Weather.Unknown) {
      const weather = this.weatherDict[value];
      SetWeatherTypeOverTime(weather, 0);
    }
  }

  /**
   * Doesn't work
   */
  public static get WeatherTransition(): [string | Weather, string | Weather, number] {
    const transition = GetWeatherTypeTransition();
    return [this.weatherDict[transition[0]], this.weatherDict[transition[1]], transition[2]];
  }

  /**
   * Doesn't work
   */
  public static set WeatherTransition(transition: [string | Weather, string | Weather, number]) {
    SetWeatherTypeTransition(transition[0], transition[1], transition[2]);
  }

  public static transitionToWeather(weather: Weather, duration: number): void {
    if (weather !== Weather.Unknown) {
      SetWeatherTypeOverTime(this.weatherDict[weather], duration);
    }
  }

  public static destroyAllCameras(): void {
    DestroyAllCams(false);
  }

  /**
   * Creates a blip at a given position and optionally radius.
   *
   * @param position World coordinate of blip.
   * @param radius (Optional) Radius of where blip should be shown.
   * @returns A Blip object.
   */
  public static createBlip(position: Vector3, radius?: number): Blip {
    if (radius !== null) {
      return new Blip(AddBlipForRadius(position.x, position.y, position.z, radius));
    }
    return new Blip(AddBlipForCoord(position.x, position.y, position.z));
  }

  public static createCamera(position: Vector3, rotation: Vector3, fieldOfView: number): Camera {
    return new Camera(
      CreateCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        position.x,
        position.y,
        position.z,
        rotation.x,
        rotation.y,
        rotation.z,
        fieldOfView,
        true,
        2,
      ),
    );
  }

  /**
   * Create a ped at a desired location.
   *
   * @param model Ped model to be spawned.
   * @param position World position (coordinates) of Ped spawn.
   * @param heading Heading of Ped when spawning.
   */
  public static async createPed(
    model: Model,
    position: Vector3,
    heading: number = 0,
  ): Promise<Ped> {
    if (!model.IsPed || !(await model.request(1000))) {
      return null;
    }
    return new Ped(
      CreatePed(26, model.Hash, position.x, position.y, position.z, heading, true, false),
    );
  }

  public static createRandomPed(position: Vector3): Ped {
    return new Ped(CreateRandomPed(position.x, position.y, position.z));
  }

  /**
   * Create a vehicle at a desired location.
   *
   * @param model Vehicle model to be spawned.
   * @param position World position (coordinates) of Vehicle spawn.
   * @param heading Heading of Vehicle when spawning.
   * @returns Vehicle object.
   */
  public static async createVehicle(
    model: Model,
    position: Vector3,
    heading: number = 0,
  ): Promise<Vehicle> {
    if (!model.IsVehicle || !(await model.request(1000))) {
      return null;
    }
    return new Vehicle(
      CreateVehicle(model.Hash, position.x, position.y, position.z, heading, true, false),
    );
  }

  /**
   * Create a random vehicle at a desired location.
   *
   * @param position World position (coordinates) of Vehicle spawn.
   * @param heading Heading of Vehicle when spawning.
   * @returns Vehicle object.
   */
  public static async createRandomVehicle(
    position: Vector3,
    heading: number = 0,
  ): Promise<Vehicle> {
    const vehicleCount: number = Object.keys(VehicleHash).length / 2; // check
    const randomIndex: number = getRandomInt(0, vehicleCount);
    const randomVehicleName: string = VehicleHash[randomIndex];
    const modelHash: number = GetHashKey(randomVehicleName);
    const model = new Model(modelHash);

    if (!model.IsVehicle || !(await model.request(1000))) {
      return null;
    }
    return new Vehicle(
      CreateVehicle(model.Hash, position.x, position.y, position.z, heading, true, false),
    );
  }

  /**
   * Draw a marker at a desired location.
   *
   * @param type Type of marker.
   * @param position Location of marker.
   * @param direction Direction facing.
   * @param rotation World rotation.
   * @param scale Size of marker.
   * @param color Color of marker.
   * @param bobUpAndDown Animated movement along marker's own X axis.
   * @param faceCamera Rendering marker facing rendering camera.
   * @param rotateY Rotate along Y axis.
   * @param textureDict Custom texture dictionary for custom marker.
   * @param textureName Custom texture name for custom marker.
   * @param drawOnEntity Render the marker on an entity.
   */
  public static drawMarker(
    type: MarkerType,
    position: Vector3,
    direction: Vector3,
    rotation: Vector3,
    scale: Vector3,
    color: Color,
    bobUpAndDown: boolean = false,
    faceCamera: boolean = false,
    rotateY: boolean = false,
    textureDict: string = null,
    textureName: string = null,
    drawOnEntity: boolean = false,
  ) {
    DrawMarker(
      Number(type),
      position.x,
      position.y,
      position.z,
      direction.x,
      direction.y,
      direction.z,
      rotation.x,
      rotation.y,
      rotation.z,
      scale.x,
      scale.y,
      scale.z,
      color.r,
      color.g,
      color.b,
      color.a,
      bobUpAndDown,
      faceCamera,
      2,
      rotateY,
      textureDict,
      textureName,
      drawOnEntity,
    );
  }

  public static drawLightWithRange(pos: Vector3, color: Color, range: number, intensity: number) {
    DrawLightWithRange(pos.x, pos.y, pos.z, color.r, color.g, color.b, range, intensity);
  }

  public static drawSpotLight(
    pos: Vector3,
    dir: Vector3,
    color: Color,
    distance: number,
    brightness: number,
    roundness: number,
    radius: number,
    fadeOut: number,
  ) {
    DrawSpotLight(
      pos.x,
      pos.y,
      pos.z,
      dir.x,
      dir.y,
      dir.z,
      color.r,
      color.g,
      color.b,
      distance,
      brightness,
      roundness,
      radius,
      fadeOut,
    );
  }

  public static drawSpotLightWithShadow(
    pos: Vector3,
    dir: Vector3,
    color: Color,
    distance: number,
    brightness: number,
    roundness: number,
    radius: number,
    fadeOut: number,
  ) {
    DrawSpotLightWithShadow(
      pos.x,
      pos.y,
      pos.z,
      dir.x,
      dir.y,
      dir.z,
      color.r,
      color.g,
      color.b,
      distance,
      brightness,
      roundness,
      radius,
      fadeOut,
      0,
    );
  }

  public static drawLine(start: Vector3, end: Vector3, color: Color) {
    DrawLine(start.x, start.y, start.z, end.x, end.y, end.z, color.r, color.g, color.b, color.a);
  }

  public static drawPoly(vertexA: Vector3, vertexB: Vector3, vertexC: Vector3, color: Color) {
    DrawPoly(
      vertexA.x,
      vertexA.y,
      vertexA.z,
      vertexB.x,
      vertexB.y,
      vertexB.z,
      vertexC.x,
      vertexC.y,
      vertexC.z,
      color.r,
      color.g,
      color.b,
      color.a,
    );
  }

  public static raycast(
    source: Vector3,
    direction: Vector3,
    maxDistance: number,
    options: IntersectOptions,
    ignoreEntity: Entity,
  ): RaycastResult {
    const target = Vector3.add(source, Vector3.multiply(direction, maxDistance));

    return new RaycastResult(
      StartShapeTestRay(
        source.x,
        source.y,
        source.z,
        target.x,
        target.y,
        target.z,
        Number(options),
        ignoreEntity.Handle,
        7,
      ),
    );
  }

  private static currentCloudHat: CloudHat = CloudHat.Clear;

  private static cloudHatDict: Map<CloudHat, string> = new Map<CloudHat, string>([
    [CloudHat.Unknown, 'Unknown'],
    [CloudHat.Altostratus, 'altostratus'],
    [CloudHat.Cirrus, 'Cirrus'],
    [CloudHat.Cirrocumulus, 'cirrocumulus'],
    [CloudHat.Clear, 'Clear 01'],
    [CloudHat.Cloudy, 'Cloudy 01'],
    [CloudHat.Contrails, 'Contrails'],
    [CloudHat.Horizon, 'Horizon'],
    [CloudHat.HorizonBand1, 'horizonband1'],
    [CloudHat.HorizonBand2, 'horizonband2'],
    [CloudHat.HorizonBand3, 'horizonband3'],
    [CloudHat.Horsey, 'horsey'],
    [CloudHat.Nimbus, 'Nimbus'],
    [CloudHat.Puffs, 'Puffs'],
    [CloudHat.Rain, 'RAIN'],
    [CloudHat.Snowy, 'Snowy 01'],
    [CloudHat.Stormy, 'Stormy 01'],
    [CloudHat.Stratoscumulus, 'stratoscumulus'],
    [CloudHat.Stripey, 'Stripey'],
    [CloudHat.Shower, 'shower'],
    [CloudHat.Wispy, 'Wispy'],
  ]);

  private static weatherDict: string[] = [
    'EXTRASUNNY',
    'CLEAR',
    'CLOUDS',
    'SMOG',
    'FOGGY',
    'OVERCAST',
    'RAIN',
    'THUNDER',
    'CLEARING',
    'NEUTRAL',
    'SNOW',
    'BLIZZARD',
    'SNOWLIGHT',
    'XMAS',
  ];
}
