import { PointF } from './../utils/PointF';
import * as String from './../utils/String';
import { Vector3 } from './../utils/Vector3';
import { Notification } from './Notification';

export abstract class Screen {
  public static get Width(): number {
    return GetScreenResolution()[0];
  }

  public static get Height(): number {
    return GetScreenResolution()[1];
  }

  public static get AspectRatio(): number {
    return GetScreenAspectRatio(false);
  }

  public static get ScaledWidth(): number {
    return this.Height * this.AspectRatio;
  }

  public static ShowSubtitle(message: string, duration: number = 2500) {
    const strings: string[] = String.StringToArray(message);

    BeginTextCommandPrint('CELL_EMAIL_BCON');

    strings.forEach(element => {
      AddTextComponentSubstringPlayerName(element);
    });

    EndTextCommandPrint(duration, true);
  }

  public static DisplayHelpTextThisFrame(message: string) {
    const strings: string[] = String.StringToArray(message);

    BeginTextCommandDisplayHelp('CELL_EMAIL_BCON');

    strings.forEach(element => {
      AddTextComponentSubstringPlayerName(element);
    });

    EndTextCommandDisplayHelp(0, false, false, -1);
  }

  public static ShowNotification(message: string, blinking = false): Notification {
    const strings: string[] = String.StringToArray(message);

    SetNotificationTextEntry('CELL_EMAIL_BCON');

    strings.forEach(element => {
      AddTextComponentSubstringPlayerName(element);
    });

    return new Notification(DrawNotification(blinking, true));
  }

  public static WorldToScreen(position: Vector3, scaleWidth: boolean = false) {
    const coords = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);
    return new PointF(coords[0] * (scaleWidth ? this.ScaledWidth : this.Width), coords[1] * this.Height, coords[2]);
  }
}
