import { CheckpointIcon } from './hashes/CheckpointIconHash';
import { Vector3 } from './utils';

export class Checkpoint {
  private handle: number;
  private position: Vector3;
  private targetPosition: Vector3;
  private icon: CheckpointIcon;
  private radius: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  public get Position(): Vector3 {
    return this.position;
  }

  public set Position(position: Vector3) {
    this.position = position;
  }

  public get TargetPosition(): Vector3 {
    return this.targetPosition;
  }

  public set TargetPosition(targetPosition: Vector3) {
    this.targetPosition = targetPosition;
  }

  public get Icon(): CheckpointIcon {
    return this.icon;
  }

  public set Icon(icon: CheckpointIcon) {
    this.icon = icon;
  }

  // TODO
  //   public get CustomIcon(): CheckpointIcon {
  //     return this.icon;
  //   }

  //     public set CustomIcon(icon: CheckpointIcon) {
  //     this.icon = icon;
  //   }

  public get Radius(): number {
    return this.radius;
  }

  public set Radius(radius: number) {
    this.radius = radius;
  }
}
