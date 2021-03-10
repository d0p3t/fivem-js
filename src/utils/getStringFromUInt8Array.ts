/**
 * get string from uint8 array
 *
 * @param buffer - Uint8Array
 * @param start - The beginning of the specified portion of the array
 * @param end - The end of the specified portion of the array
 */
export const getStringFromUInt8Array = (buffer: Uint8Array, start: number, end: number): string =>
  String.fromCharCode(...buffer.slice(start, end))
    // eslint-disable-next-line no-control-regex
    .replace(/\u0000/g, '');
