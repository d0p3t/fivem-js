import { Vector3 } from './utils';
import { BlipColor, BlipSprite } from './enums';
import { Entity, Player } from './models';

export class Blip {
  protected handle: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  public get Handle(): number {
    return this.handle;
  }

  public get Position(): Vector3 {
    const coords = GetBlipInfoIdCoord(this.handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  public set Position(location: Vector3) {
    SetBlipCoords(this.handle, location.x, location.y, location.z);
  }

  public set Rotation(rotation: number) {
    SetBlipRotation(this.handle, rotation);
  }

  public set Scale(scale: number) {
    SetBlipScale(this.handle, scale);
  }

  public get Type(): number {
    return GetBlipInfoIdType(this.handle);
  }

  public get Alpha(): number {
    return GetBlipAlpha(this.handle);
  }

  public set Alpha(alpha: number) {
    SetBlipAlpha(this.handle, alpha);
  }

  public set Priority(priority: number) {
    SetBlipPriority(this.handle, priority);
  }

  public set NumberLabel(number: number) {
    ShowNumberOnBlip(this.handle, number);
  }

  public get Color(): BlipColor {
    return GetBlipColour(this.handle);
  }

  public set Color(color: BlipColor) {
    SetBlipColour(this.handle, color);
  }

  public get Sprite(): BlipSprite {
    return GetBlipSprite(this.handle);
  }

  public set Sprite(sprite: BlipSprite) {
    SetBlipSprite(this.handle, sprite);
  }

  public set Display(display: number) {
    SetBlipDisplay(this.handle, display);
  }

  public set Name(name: string) {
    BeginTextCommandSetBlipName('STRING');
    AddTextComponentSubstringPlayerName(name);
    EndTextCommandSetBlipName(this.handle);
  }

  public setNameToPlayerName(player: Player): void {
    SetBlipNameToPlayerName(this.handle, player.Handle);
  }

  public get Entity(): Entity | null {
    return Entity.fromHandle(GetBlipInfoIdEntityIndex(this.handle));
  }

  public set ShowHeadingIndicator(show: boolean) {
    ShowHeadingIndicatorOnBlip(this.handle, show);
  }

  public set ShowRoute(show: boolean) {
    SetBlipRoute(this.handle, show);
  }

  public set IsFriendly(friendly: boolean) {
    SetBlipAsFriendly(this.handle, friendly);
  }

  public set IsFriend(friend: boolean) {
    SetBlipFriend(this.handle, friend);
  }

  public set IsCrew(crew: boolean) {
    SetBlipCrew(this.handle, crew);
  }

  public get IsFlashing(): boolean {
    return !!IsBlipFlashing(this.handle);
  }

  public set IsFlashing(flashing: boolean) {
    SetBlipFlashes(this.handle, flashing);
  }

  public get IsOnMinimap(): boolean {
    return !!IsBlipOnMinimap(this.handle);
  }

  public get IsShortRange(): boolean {
    return !!IsBlipShortRange(this.handle);
  }

  public set IsShortRange(shortRange: boolean) {
    SetBlipAsShortRange(this.handle, shortRange);
  }

  public removeNumberLabel(): void {
    HideNumberOnBlip(this.handle);
  }

  public delete(): void {
    if (this.exists()) {
      RemoveBlip(this.handle);
    }
  }

  public exists(): boolean {
    return !!DoesBlipExist(this.handle);
  }
}
