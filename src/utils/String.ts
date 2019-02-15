import * as Math from './Math';

export function StringToArray(inputString: string) {
  const stringsNeeded: number = inputString.length % 99 === 0 ? inputString.length / 99 : inputString.length / 99 + 1;

  const outputString: string[] = new Array<string>(stringsNeeded);
  for (let i = 0; i < stringsNeeded; i++) {
    outputString[i] = inputString.substring(i * 99, Math.Clamp(inputString.substring(i * 99).length, 0, 99));
  }
  return outputString;
}
