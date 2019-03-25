import { ResText, Screen } from '..';
import { Clamp} from './Math';

export function StringToArray(inputString: string) {
  const stringsNeeded: number = inputString.length % 99 === 0 ? inputString.length / 99 : inputString.length / 99 + 1;

  const outputString: string[] = new Array<string>(stringsNeeded);
  for (let i = 0; i < stringsNeeded; i++) {
    outputString[i] = inputString.substring(i * 99, Clamp(inputString.substring(i * 99).length, 0, 99));
  }
  return outputString;
}

export function MeasureStringWidthNoConvert(input: string) {
  SetTextEntryForWidth('STRING');
  ResText.AddLongString(input);
  SetTextFont(0);
  SetTextScale(0.35, 0.35);
  return GetTextScreenWidth(false);
}

export function MeasureString(str: string) {
  const height = Screen.Height;
  const width = Screen.ScaledWidth;
  return this.MeasureStringWidthNoConvert(str) * width;
}
