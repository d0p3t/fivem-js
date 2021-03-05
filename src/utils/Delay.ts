/**
 * Port of BaseScript.Delay
 *
 * @param ms
 * @constructor
 */
export const Delay: (ms: number) => Promise<void> =
  (ms: number) => new Promise(res => setTimeout(res, ms));
