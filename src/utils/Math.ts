export function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}
