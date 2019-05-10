import { ResText, Screen } from '..';
import { clamp } from './Math';

export function stringToArray(input: string) {
  let stringsNeeded: number = 1;
  if (input.length > 99) {
    stringsNeeded = Math.ceil(input.length % 99 === 0 ? input.length / 99 : input.length / 99 + 1);
  }

  // tslint:disable-next-line: prefer-array-literal
  const outputString: string[] = new Array(stringsNeeded);
  for (let i = 0; i < stringsNeeded; i += 1) {
    outputString[i] = input.substring(i * 99, clamp(input.substring(i * 99).length, 0, 99));
  }
  return outputString;
}

export function measureStringWidthNoConvert(input: string) {
  SetTextEntryForWidth('STRING');
  ResText.addLongString(input);
  SetTextFont(0);
  SetTextScale(0.35, 0.35);
  return GetTextScreenWidth(false);
}

export function measureString(str: string) {
  const height = Screen.Height;
  const width = Screen.ScaledWidth;
  return this.measureStringWidthNoConvert(str) * width;
}
