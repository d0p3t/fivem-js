import Color from '../utils/Color';
import Point from '../utils/Point';
import Size from '../utils/Size';
import { Screen } from './Screen';

export default class Sprite {
  public TextureName: string;
  public pos: Point;
  public size: Size;
  public heading: number;
  public color: Color;
  public visible: boolean;
  private _textureDict: string;

  constructor(textureDict, textureName, pos, size, heading = 0, color = new Color(255, 255, 255, 255)) {
    this.TextureDict = textureDict;
    this.TextureName = textureName;
    this.pos = pos;
    this.size = size;
    this.heading = heading;
    this.color = color;
    this.visible = true;
  }

  LoadTextureDictionary() {
    RequestStreamedTextureDict(this._textureDict, true);
    const interval = setInterval(() => {
      if (this.IsTextureDictionaryLoaded) {
        clearInterval(interval);
      }
    }, 0);
  }

  set TextureDict(v) {
    this._textureDict = v;
    if (!this.IsTextureDictionaryLoaded) this.LoadTextureDictionary();
  }
  get TextureDict(): string {
    return this._textureDict;
  }

  get IsTextureDictionaryLoaded() {
    return HasStreamedTextureDictLoaded(this._textureDict);
  }

  Draw(textureDictionary?, textureName?, pos?, size?, heading?, color?, loadTexture?) {
    textureDictionary = textureDictionary || this.TextureDict;
    textureName = textureName || this.TextureName;
    pos = pos || this.pos;
    size = size || this.size;
    heading = heading || this.heading;
    color = color || this.color;
    loadTexture = loadTexture || true;

    if (loadTexture) {
      if (!HasStreamedTextureDictLoaded(textureDictionary)) RequestStreamedTextureDict(textureDictionary, true);
    }

    const screenw = Screen.Width;
    const screenh = Screen.Height;
    const height = 1080.0;
    const ratio = screenw / screenh;
    const width = height * ratio;

    const w = this.size.Width / width;
    const h = this.size.Height / height;
    const x = this.pos.X / width + w * 0.5;
    const y = this.pos.Y / height + h * 0.5;

    DrawSprite(textureDictionary, textureName, x, y, w, h, heading, color.R, color.G, color.B, color.A);
  }
}
