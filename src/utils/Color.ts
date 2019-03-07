export default class Color {
  public static Empty = new Color(0, 0, 0, 0);
  public static Transparent = new Color(0, 0, 0, 0);
  public static Black = new Color(255, 0, 0, 0);
  public static White = new Color(255, 255, 255, 255);
  public static WhiteSmoke = new Color(255, 245, 245, 245);

  public static FromArgb(a: number, r: number, g: number, b: number) {
    return new Color(a, r, g, b);
  }

  public a: number;
  public r: number;
  public g: number;
  public b: number;

  constructor(a: number = 255, r: number, g: number, b: number) {
    this.a = a;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}
