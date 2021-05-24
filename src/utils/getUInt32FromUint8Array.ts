/**
 * get uint32 from uint8 array
 *
 * @param buffer - Uint8Array
 * @param start - The beginning of the specified portion of the array
 * @param end - The end of the specified portion of the array
 */
export const getUInt32FromUint8Array = (buffer: Uint8Array, start: number, end: number): number =>
  new Uint32Array(buffer.slice(start, end).buffer)[0];
