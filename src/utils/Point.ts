export class Point {
  public static parse(arg: [number, number] | { X: number; Y: number } | string): Point {
    let point = new Point();
    if (arg) {
      if (typeof arg === 'object') {
        if (Array.isArray(arg)) {
          if (arg.length === 2) {
            point = new Point(arg[0], arg[1]);
          }
        } else if (arg.X && arg.Y) {
          point = new Point(arg.X, arg.Y);
        }
      } else {
        if (arg.indexOf(',') !== -1) {
          const arr = arg.split(',');
          point = new Point(parseFloat(arr[0]), parseFloat(arr[1]));
        }
      }
    }
    return point;
  }

  public X: number;
  public Y: number;

  constructor(x = 0, y = 0) {
    this.X = x;
    this.Y = y;
  }
}
