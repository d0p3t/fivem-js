export class Point {
  public static parse(point: number[] | { X: number; Y: number }): Point;
  public static parse(arg): Point {
    let point = new Point(0, 0);
    if (typeof arg === 'object') {
      if (arg.length) {
        // Array
        point = new Point(arg[0], arg[1]);
      } else if (arg.X && arg.Y) {
        // Object
        point = new Point(arg.X, arg.Y);
      }
    } else if (typeof arg === 'string') {
      if (arg.indexOf(',') !== -1) {
        const arr = arg.split(',');
        point = new Point(parseFloat(arr[0]), parseFloat(arr[1]));
      }
    }
    return point;
  }

  public X = 0;
  public Y = 0;
  constructor(x: number, y: number) {
    this.X = x;
    this.Y = y;
  }
}
