import { Color, Point, Size } from '../utils';
import { Screen } from './';

export class Sprite {
  public textureName: string;
  public pos: Point;
  public size: Size;
  public heading: number;
  public color: Color;
  public visible: boolean;
  private textureDict: string;

  constructor(textureDict, textureName, pos, size, heading = 0, color = new Color(255, 255, 255, 255)) {
    this.textureDict = textureDict;
    this.textureName = textureName;
    this.pos = pos;
    this.size = size;
    this.heading = heading;
    this.color = color;
    this.visible = true;
  }

  public LoadTextureDictionary(): void {
    RequestStreamedTextureDict(this.textureDict, true);
    const interval = setInterval(() => {
      if (this.IsTextureDictionaryLoaded) {
        clearInterval(interval);
      }
    }, 0);
  }

  public set TextureDict(v) {
    this.textureDict = v;
    if (!this.IsTextureDictionaryLoaded) {
      this.LoadTextureDictionary();
    }
  }
  public get TextureDict(): string {
    return this.textureDict;
  }

  public get IsTextureDictionaryLoaded(): boolean {
    return !!HasStreamedTextureDictLoaded(this.textureDict);
  }

  public Draw(
    textureDictionary: string = this.textureDict,
    textureName: string = this.textureName,
    pos: Point = this.pos,
    size: Size =this.size,
    heading: number = this.heading,
    color: Color = this.color,
    loadTexture: boolean = true,
  ): void {
    if (loadTexture) {
      if (!HasStreamedTextureDictLoaded(textureDictionary)) {
        RequestStreamedTextureDict(textureDictionary, false);
      }
    }
    const height = Screen.Height;
    const width = Screen.ScaledWidth;

    const w = this.size.Width / width;
    const h = this.size.Height / height;
    const x = this.pos.X / width + w * 0.5;
    const y = this.pos.Y / height + h * 0.5;

    DrawSprite(textureDictionary, textureName, x, y, w, h, heading, color.r, color.g, color.b, color.a);
  }
}
