/**
 * EnumValues - iterate over enum values
 * Just copy&paste from https://github.com/microsoft/TypeScript/issues/4753#issuecomment-694557208
 *
 * @param enumObj
 */
export function enumValues<T extends string>(enumObj: { [key: string]: T }): IterableIterator<T>;
export function enumValues<T extends string | number>(enumObj: {
  [key: string]: T;
}): IterableIterator<Exclude<T, string>>;
export function* enumValues<T>(enumObj: { [key: string]: T }): IterableIterator<T> {
  let isStringEnum = true;
  for (const property in enumObj) {
    if (typeof enumObj[property] === 'number') {
      isStringEnum = false;
      break;
    }
  }
  for (const property in enumObj) {
    if (isStringEnum || typeof enumObj[property] === 'number') {
      yield enumObj[property];
    }
  }
}
