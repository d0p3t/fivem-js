import { Model } from './';
import { MarkerType } from './enums';
import { Ped, Vehicle } from './models';
import { Color, Vector3 } from './utils';

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
}
