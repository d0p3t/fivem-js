import { Color, Point, Size } from '../utils';
import { Screen } from './';

export class Sprite {
  public textureName: string;
  public pos: Point;
  public size: Size;
  public heading: number;
  public color: Color;
  public visible: boolean;

  private _textureDict: string;

  constructor(
    textureDict: string,
    textureName: string,
    pos?: Point,
    size?: Size,
    heading = 0,
    color = Color.white,
  ) {
    this._textureDict = textureDict;
    this.textureName = textureName;
    this.pos = pos || new Point();
    this.size = size || new Size();
    this.heading = heading || 0;
    this.color = color || Color.white;
    this.visible = true;
  }

  public loadTextureDictionary(): void {
    RequestStreamedTextureDict(this._textureDict, true);
    const interval = setInterval(() => {
      if (this.IsTextureDictionaryLoaded) {
        clearInterval(interval);
      }
    }, 0);
  }

  public set TextureDict(v: string) {
    this._textureDict = v;
    if (!this.IsTextureDictionaryLoaded) {
      this.loadTextureDictionary();
    }
  }

  public get TextureDict(): string {
    return this._textureDict;
  }

  public get IsTextureDictionaryLoaded(): boolean {
    return !!HasStreamedTextureDictLoaded(this._textureDict);
  }

  public draw(resolution?: Size): void;
  public draw(
    textureDictionary?: string,
    textureName?: string,
    pos?: Point,
    size?: Size,
    heading?: number,
    color?: Color,
    loadTexture?: boolean,
    resolution?: Size,
  ): void;
  public draw(
    arg1?: Size | string,
    textureName?: string,
    pos?: Point,
    size?: Size,
    heading?: number,
    color?: Color,
    loadTexture = true,
    resolution?: Size,
  ): void {
    const textureDictionary = arg1 && typeof arg1 === 'string' ? arg1 : this.TextureDict;

    textureName = textureName || this.textureName;
    pos = pos || this.pos;
    size = size || this.size;
    heading = heading || this.heading;
    color = color || this.color;

    if (loadTexture) {
      if (!HasStreamedTextureDictLoaded(textureDictionary)) {
        RequestStreamedTextureDict(textureDictionary, false);
      }
    }

    resolution = arg1 instanceof Size ? arg1 : resolution;
    resolution = resolution || new Size(Screen.ScaledWidth, Screen.Height);

    const w = size.width / resolution.width;
    const h = size.height / resolution.height;
    const x = pos.X / resolution.width + w * 0.5;
    const y = pos.Y / resolution.height + h * 0.5;

    DrawSprite(
      textureDictionary,
      textureName,
      x,
      y,
      w,
      h,
      heading,
      color.r,
      color.g,
      color.b,
      color.a,
    );
  }
}
