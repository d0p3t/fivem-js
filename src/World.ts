import { Model } from './Model';
import { Ped } from './models/Ped';
import { Vehicle } from './models/Vehicle';
import { Color } from './utils/Color';
import { Vector3 } from './utils/Vector3';

/**
 * List of Zones. Useful for using world zone related natives.
 */
export enum ZoneID {
  AIRP,
  ALAMO,
  ALTA,
  ARMYB,
  BANHAMC,
  BANNING,
  BEACH,
  BHAMCA,
  BRADP,
  BRADT,
  BURTON,
  CALAFB,
  CANNY,
  CCREAK,
  CHAMH,
  CHIL,
  CHU,
  CMSW,
  CYPRE,
  DAVIS,
  DELBE,
  DELPE,
  DELSOL,
  DESRT,
  DOWNT,
  DTVINE,
  EAST_V,
  EBURO,
  ELGORL,
  ELYSIAN,
  GALFISH,
  golf,
  GRAPES,
  GREATC,
  HARMO,
  HAWICK,
  HORS,
  HUMLAB,
  JAIL,
  KOREAT,
  LACT,
  LAGO,
  LDAM,
  LEGSQU,
  LMESA,
  LOSPUER,
  MIRR,
  MORN,
  MOVIE,
  MTCHIL,
  MTGORDO,
  MTJOSE,
  MURRI,
  NCHU,
  NOOSE,
  OCEANA,
  PALCOV,
  PALETO,
  PALFOR,
  PALHIGH,
  PALMPOW,
  PBLUFF,
  PBOX,
  PROCOB,
  RANCHO,
  RGLEN,
  RICHM,
  ROCKF,
  RTRAK,
  SanAnd,
  SANCHIA,
  SANDY,
  SKID,
  SLAB,
  STAD,
  STRAW,
  TATAMO,
  TERMINA,
  TEXTI,
  TONGVAH,
  TONGVAV,
  VCANA,
  VESP,
  VINE,
  WINDF,
  WVINE,
  ZANCUDO,
  ZP_ORT,
  ZQ_UAR,
}

/**
 * List of weather types. Used for manipulating weather.
 */
export enum Weather {
  Unknown = -1,
  ExtraSunny,
  Clear,
  Clouds,
  Smog,
  Foggy,
  Overcast,
  Raining,
  ThunderStorm,
  Clearing,
  Neutral,
  Snowing,
  Blizzard,
  Snowlight,
  Christmas,
  Halloween,
}

/**
 * Same list as Weather enum, but as hashes.
 */
export enum WeatherTypeHash {
  Unknown = -1,
  ExtraSunny = -1750463879,
  Clear = 916995460,
  Neutral = -1530260698,
  Smog = 282916021,
  Foggy = -1368164796,
  Clouds = 821931868,
  Overcast = -1148613331,
  Clearing = 1840358669,
  Raining = 1420204096,
  ThunderStorm = -1233681761,
  Blizzard = 669657108,
  Snowing = -273223690,
  Snowlight = 603685163,
  Christmas = -1429616491,
  Halloween = -921030142,
}

/**
 * List of cloud hats. Used to change cloud patterns
 */
export enum CloudHat {
  Unknown = 1,
  Altostratus,
  Cirrus,
  Cirrocumulus,
  Clear,
  Cloudy,
  Contrails,
  Horizon,
  HorizonBand1,
  HorizonBand2,
  HorizonBand3,
  Horsey,
  Nimbus,
  Puffs,
  Rain,
  Snowy,
  Stormy,
  Stratoscumulus,
  Stripey,
  Shower,
  Wispy,
}

/**
 * List of possible entity intersections. Used for raycasting.
 */
export enum IntersectOptions {
  Everything = -1,
  Map = 1,
  MissionEntities,
  Peds1 = 12,
  Objects = 16,
  Unk1 = 32,
  Unk2 = 64,
  Unk3 = 128,
  Vegetation = 256,
  Unk4 = 512,
}

/**
 * List of markers. Markers are 3D visual objects in the world.
 *
 * See native [DRAW_MARKER](https://runtime.fivem.net/doc/natives/#_0x28477EC23D892089) for pictures.
 */
export enum MarkerType {
  UpsideDownCone,
  VerticalCylinder,
  ThickChevronUp,
  ThinChevronUp,
  CheckeredFlagRect,
  CheckeredFlagCircle,
  VerticleCircle,
  PlaneModel,
  LostMCDark,
  LostMCLight,
  Number0,
  Number1,
  Number2,
  Number3,
  Number4,
  Number5,
  Number6,
  Number7,
  Number8,
  Number9,
  ChevronUpx1,
  ChevronUpx2,
  ChevronUpx3,
  HorizontalCircleFat,
  ReplayIcon,
  HorizontalCircleSkinny,
  HorizontalCircleSkinnyArrow,
  HorizontalSplitArrowCircle,
  DebugSphere,
  DollarSign,
  HorizontalBars,
  WolfHead,
  QuestionMark,
  PlaneSymbol,
  HelicopterSymbol,
  BoatSymbol,
  CarSymbol,
  MotorcycleSymbol,
  BikeSymbol,
  TruckSymbol,
  ParachuteSymbol,
  SawbladeSymbol,
}

/**
 * List of explosion sources.
 */
export enum ExplosionType {
  Grenade,
  GrenadeL,
  StickyBomb,
  Molotov1,
  Rocket,
  TankShell,
  HiOctane,
  Car,
  Plane,
  PetrolPump,
  Bike,
  Steam,
  Flame,
  WaterHydrant,
  GasCanister,
  Boat,
  ShipDestroy,
  Truck,
  Bullet,
  SmokeGL,
  SmokeG,
  BZGas,
  Flare,
  GasCanister2,
  Extinguisher,
  ProgramAR,
  Train,
  Barrel,
  Propane,
  Blimp,
  FlameExplode,
  Tanker,
  PlaneRocket,
  VehicleBullet,
  GasTank,
  FireWork,
  SnowBall,
  ProxMine,
  Valkyrie,
}

/**
 * Class with common world manipulations.
 *
 * This class includes methods for creating entities and common world rendering.
 */
export abstract class World {
  /**
   * Create a ped at a desired location.
   *
   * @param model Ped model to be spawned.
   * @param position World position (coordinates) of Ped spawn.
   * @param heading Heading of Ped when spawning.
   */
  public static CreatePed(model: Model, position: Vector3, heading: number = 0): Promise<Ped> {
    return new Promise(async resolve => {
      if (!model.IsPed || !(await model.Request(1000))) {
        return null;
      }
      resolve(new Ped(CreatePed(26, model.Hash, position.x, position.y, position.z, heading, true, false)));
    });
  }

  /**
   * Create a vehicle at a desired location.
   *
   * @param model Vehicle model to be spawned.
   * @param position World position (coordinates) of Vehicle spawn.
   * @param heading Heading of Vehicle when spawning.
   */
  public static CreateVehicle(model: Model, position: Vector3, heading: number = 0): Promise<Vehicle> {
    return new Promise(async resolve => {
      if (!model.IsVehicle || !(await model.Request(1000))) {
        return null;
      }
      resolve(new Vehicle(CreateVehicle(model.Hash, position.x, position.y, position.z, heading, true, false)));
    });
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
}
