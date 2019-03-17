<<<<<<< HEAD
import { Vector3 } from './utils/Vector3';
=======
import Vector3 from './utils/Vector3';
>>>>>>> development

/**
 * The current rendering gameplay camera
 */
export abstract class GameplayCamera {
  public static get Position(): Vector3 {
    const coords = GetGameplayCamCoords();
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  public static get Rotation(): Vector3 {
    const rot = GetGameplayCamRot(2);
    return new Vector3(rot[0], rot[1], rot[2]);
  }

  public static get ForwardVector(): Vector3 {
    const rotation = Vector3.Multiply(this.Rotation, Math.PI / 180);
    const normalized = Vector3.Normalize(
      new Vector3(
        -Math.sin(rotation.z) * Math.abs(Math.cos(rotation.x)),
        Math.cos(rotation.z) * Math.abs(Math.cos(rotation.x)),
        Math.sin(rotation.x),
      ),
    );
    return new Vector3(normalized.x, normalized.y, normalized.z);
  }

  public static get RelativePitch(): number {
    return GetGameplayCamRelativePitch();
  }

  public static set RelativePitch(pitch: number) {
    SetGameplayCamRelativePitch(pitch, 1);
  }

  public get RelativeHeading(): number {
    return GetGameplayCamRelativeHeading();
  }

  public set RelativeHeading(heading: number) {
    SetGameplayCamRelativeHeading(heading);
  }
}
