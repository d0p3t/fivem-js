import { Font, Screen, Text } from '..';
import { Maths } from './Maths';

export abstract class String {
  public static stringToArray(input: string): string[] {
    let stringsNeeded = 1;
    if (input.length > 99) {
      stringsNeeded = Math.ceil(input.length / 99);
    }

    const outputString: string[] = new Array(stringsNeeded);
    for (let i = 0; i < stringsNeeded; i++) {
      outputString[i] = input.substring(
        i * 99,
        i * 99 + Maths.clamp(input.substring(i * 99).length, 0, 99),
      );
    }
    return outputString;
  }

  public static measureStringWidthNoConvert(
    input: string,
    font = Font.ChaletLondon,
    scale = 0,
  ): number {
    SetTextEntryForWidth('STRING');
    Text.addLongString(input);
    SetTextFont(font);
    SetTextScale(1, scale);
    return GetTextScreenWidth(false);
  }

  public static measureString(
    str: string,
    font?: Font,
    scale?: number,
    screenWidth = Screen.ScaledWidth,
  ): number {
    return this.measureStringWidthNoConvert(str, font, scale) * screenWidth;
  }
}
