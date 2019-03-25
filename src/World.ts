import { Model } from './';
import { Camera } from './Camera';
import { MarkerType } from './enums';
import { RaycastResult } from './Raycast';
import { Ped, Vehicle } from './models';
import { Color, Vector3 } from './utils';

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
      this.CloudHatDict.has(this.currentCloudHat) ? this.CloudHatDict.get(this.currentCloudHat) : '',
      3,
    );
  }

  public static get CloudHatOpacity(): number {
    return GetCloudHatOpacity();
  }

  public static set CloudHatOpacity(value: number) {
    SetCloudHatOpacity(Clamp(value, 0, 1));
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
      const weather = this.WeatherDict[value];
      SetWeatherTypeOverTime(weather, 1);
      setTimeout(() => {
        SetWeatherTypeNow(weather);
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
      const weather = this.WeatherDict[value];
      SetWeatherTypeOverTime(weather, 0);
    }
  }

  /**
   * Doesn't work
   */
  public static get WeatherTransition(): [string | Weather, string | Weather, number] {
    const transition = GetWeatherTypeTransition();
    return [this.WeatherDict[transition[0]], this.WeatherDict[transition[1]], transition[2]];
  }

  /**
   * Doesn't work
   */
  public static set WeatherTransition(transition: [string | Weather, string | Weather, number]) {
    SetWeatherTypeTransition(transition[0], transition[1], transition[2]);
  }

  public static TransitionToWeather(weather: Weather, duration: number): void {
    if (weather !== Weather.Unknown) {
      SetWeatherTypeOverTime(this.WeatherDict[weather], duration);
    }
  }

  public static DestroyAllCameras(): void {
    DestroyAllCams(false);
  }
  /**
   * Create a ped at a desired location.
   *
   * @param model Ped model to be spawned.
   * @param position World position (coordinates) of Ped spawn.
   * @param heading Heading of Ped when spawning.
   */
  public static async CreatePed(model: Model, position: Vector3, heading: number = 0): Promise<Ped> {
    if (!model.IsPed || !(await model.Request(1000))) {
      return null;
    }
    return new Ped(CreatePed(26, model.Hash, position.x, position.y, position.z, heading, true, false));
  }

  /**
   * Create a vehicle at a desired location.
   *
   * @param model Vehicle model to be spawned.
   * @param position World position (coordinates) of Vehicle spawn.
   * @param heading Heading of Vehicle when spawning.
   */
  public static async CreateVehicle(model: Model, position: Vector3, heading: number = 0): Promise<Vehicle> {
    if (!model.IsVehicle || !(await model.Request(1000))) {
      return null;
    }
    return new Vehicle(CreateVehicle(model.Hash, position.x, position.y, position.z, heading, true, false));
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
  public static DrawMarker(
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

  public static Raycast(
    source: Vector3,
    direction: Vector3,
    maxDistance: number,
    options: IntersectOptions,
    ignoreEntity: Entity,
  ): RaycastResult {
    const target = Vector3.Add(source, Vector3.Multiply(direction, maxDistance));

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

  private static CloudHatDict: Map<CloudHat, string> = new Map<CloudHat, string>([
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

  private static WeatherDict: string[] = [
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
