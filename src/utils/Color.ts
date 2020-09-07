export class Color {
  public static empty = new Color(0, 0, 0, 0);
  public static transparent = new Color(0, 0, 0, 0);
  public static black = new Color(255, 0, 0, 0);
  public static white = new Color(255, 255, 255, 255);
  public static whiteSmoke = new Color(255, 245, 245, 245);

  public static fromArgb(a: number, r: number, g: number, b: number): Color {
    return new Color(a, r, g, b);
  }

  public static fromRgb(r: number, g: number, b: number): Color {
    return new Color(255, r, g, b);
  }

  public a: number;
  public r: number;
  public g: number;
  public b: number;

  constructor(a = 255, r: number, g: number, b: number) {
    this.a = a;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}
