export abstract class Maths {
  public static clamp(num: number, min: number, max: number): number {
    return num <= min ? min : num >= max ? max : num;
  }

  public static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
