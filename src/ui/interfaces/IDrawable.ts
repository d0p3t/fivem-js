import { Color, Point, Size } from '../../utils/';

export interface IDrawable {
  pos: Point;
  size?: Size;
  color?: Color;
  draw(offset?: Size, resolution?: Size): void;
}
