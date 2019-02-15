export class Color {
  public static FromArgb(a: number, r: number, g: number, b: number) {
    return new Color(a, r, g, b);
  }

  public a: number;
  public r: number;
  public g: number;
  public b: number;

  constructor(a: number, r: number, g: number, b: number) {
    this.a = a;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}
