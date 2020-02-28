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
  /**
   * Get the current camera that's rendering.
   */
  public static get RenderingCamera(): Camera {
    return new Camera(GetRenderingCam());
  }

  /**
   * Set the rendering camera. World.RenderingCamera = null to reset.
   */
  public static set RenderingCamera(value: Camera) {
    if (value === null) {
      RenderScriptCams(false, false, 3000, true, false);
    } else {
      value.IsActive = true;
      RenderScriptCams(true, false, 3000, true, false);
    }
  }

  /**
   * Get the current date in the world.
   */
  public static get CurrentDate(): Date {
    const year = GetClockYear();
    const month = GetClockMonth();
    const day = GetClockDayOfMonth();
    const hour = GetClockHours();
    const minutes = GetClockMinutes();
    const seconds = GetClockSeconds();

    return new Date(year, month, day, hour, minutes, seconds);
  }

  /**
   * Set the current date of the world.
   */
  public static set CurrentDate(date: Date) {
    SetClockDate(date.getDate(), date.getMonth(), date.getFullYear());
    SetClockTime(date.getHours(), date.getMinutes(), date.getSeconds());
  }

  /**
   * Disables all emissive textures, street/building/vehicle lights. "EMP" effect.
   */
  public static set Blackout(value: boolean) {
    SetBlackout(value);
  }

  /**
   * Get the current cloud hat.
   */
  public static get CloudHat(): CloudHat {
    return this.currentCloudHat;
  }

  /**
   * Set the current cloud hat.
   */
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

  /**
   * Get the opacity of current cloud hat. Value is between 0-1.
   */
  public static get CloudHatOpacity(): number {
    return GetCloudHatOpacity();
  }

  /**
   * Set opacity of current cloud hat between 0-1.
   */
  public static set CloudHatOpacity(value: number) {
    SetCloudHatOpacity(clamp(value, 0, 1));
  }

  /**
   * Get the current weather type.
   */
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

  /**
   * Set the current weather.
   */
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

  /**
   * Get the next weather type.
   */
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

  /**
   * Set weather type instantly. Similar to World.transitionToWeather with duration 0.
   */
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

  /**
   * Transition to different weather type within a certain time.
   *
   * @param weather Weather type to change to.
   * @param duration Time for full weather change (in milliseconds);
   */
  public static transitionToWeather(weather: Weather, duration: number): void {
    if (weather !== Weather.Unknown) {
      SetWeatherTypeOverTime(this.weatherDict[weather], duration);
    }
  }

  /**
   * Destroys all existing cameras and sets your rendering camera back to GameplayCam.
   */
  public static destroyAllCameras(): void {
    DestroyAllCams(false);
  }

  /**
   * Creates a blip at a given position and optionally radius.
   *
   * @param position World coordinate of blip.
   * @param radius (Optional) Radius of where blip should be shown.
   * @returns Blip object.
   */
  public static createBlip(position: Vector3, radius?: number): Blip {
    if (radius !== null) {
      return new Blip(AddBlipForRadius(position.x, position.y, position.z, radius));
    }
    return new Blip(AddBlipForCoord(position.x, position.y, position.z));
  }

  /**
   * Creates a camera using 'DEFAULT_SCRIPTED_CAMERA'.
   *
   * @param position World coordinate where the camera should render.
   * @param rotation Rotation of camera relative to world.
   * @param fieldOfView Field of view angle of camera.
   * @returns Camera object.
   */
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
   * @returns Ped object.
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

  /**
   * Creates a ped with a random model.
   *
   * @param position World coordinate of Ped spawn.
   * @returns Ped object.
   */
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

  /**
   * Creates a light in the world with a certain length (range).
   *
   * @param pos World coordinate where to draw the light.
   * @param color RGB colors of the light.
   * @param range How far to draw the light.
   * @param intensity Intensity of the light ("alpha").
   */
  public static drawLightWithRange(pos: Vector3, color: Color, range: number, intensity: number) {
    DrawLightWithRange(pos.x, pos.y, pos.z, color.r, color.g, color.b, range, intensity);
  }

  /**
   * Creates a light in the world. More configurable than World.drawLightWithRange.
   *
   * @param pos World coordinate of spotlight.
   * @param dir Direction to face spotlight.
   * @param color RGB colors of spotlight.
   * @param distance The maximum distance the spotlight can reach.
   * @param brightness Brightness of the spotlight.
   * @param roundness "Smoothness" of the edge of the spotlight.
   * @param radius Radius size of spotlight.
   * @param fadeOut Falloff size of the spotlight's edge.
   */
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

  /**
   * Creates a light in the world. Same as World.drawSpotlight, but also draws shadows.
   *
   * @param pos World coordinate of spotlight.
   * @param dir Direction to face spotlight.
   * @param color RGB colors of spotlight.
   * @param distance The maximum distance the spotlight can reach.
   * @param brightness Brightness of the spotlight.
   * @param roundness "Smoothness" of the edge of the spotlight.
   * @param radius Radius size of spotlight.
   * @param fadeOut Falloff size of the spotlight's edge.
   */
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

  /**
   * Draws a line in the world. It's not possible to change thickness.
   *
   * @param start World coordinate of start position of line.
   * @param end World coordinate of end position of line.
   * @param color RGB color of line.
   */
  public static drawLine(start: Vector3, end: Vector3, color: Color) {
    DrawLine(start.x, start.y, start.z, end.x, end.y, end.z, color.r, color.g, color.b, color.a);
  }

  /**
   * Draw polygon in the world.
   *
   * @param vertexA World coordinate of first point.
   * @param vertexB World coordinate of second point.
   * @param vertexC World coordinate of third point.
   * @param color RGB color of polygon.
   */
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

  /**
   * Cast ("shoot") a ray in a certain direction to detect entities in the way.
   *
   * @param source Starting position of raycast.
   * @param direction Direction to cast a ray to.
   * @param maxDistance Max distance to cast the ray.
   * @param options Possible entity types to detect.
   * @param ignoreEntity An entity to ignore (usually player's Ped).
   * @returns RaycastResult object.
   */
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

  public static getAllPeds(): Ped[] {
    const peds: Ped[] = [];

    let entityHandle: number = -1;
    const handle: number = FindFirstPed(entityHandle);
    let ped: Ped = Entity.fromHandle(entityHandle) as Ped;

    if (ped !== undefined && ped !== null && ped.exists()) {
      peds.push(ped);
    }

    entityHandle = -1;

    while (!!FindNextPed(handle, entityHandle)) {
      ped = Entity.fromHandle(entityHandle) as Ped;
      if (ped !== undefined && ped !== null && ped.exists()) {
        peds.push(ped);
      }

      entityHandle = -1;
    }

    EndFindPed(handle);

    return peds;
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
