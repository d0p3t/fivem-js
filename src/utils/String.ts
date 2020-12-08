import { Font, Screen, Text } from '..';
import { clamp } from './Math';

export function stringToArray(input: string): string[] {
  let stringsNeeded = 1;
  if (input.length > 99) {
    stringsNeeded = Math.ceil(input.length / 99);
  }

  const outputString: string[] = new Array(stringsNeeded);
  for (let i = 0; i < stringsNeeded; i++) {
    outputString[i] = input.substring(
      i * 99,
      i * 99 + clamp(input.substring(i * 99).length, 0, 99),
    );
  }
  return outputString;
}

export function measureStringWidthNoConvert(
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

export function measureString(
  str: string,
  font?: Font,
  scale?: number,
  screenWidth = Screen.ScaledWidth,
): number {
  return this.measureStringWidthNoConvert(str, font, scale) * screenWidth;
}
