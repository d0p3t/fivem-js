import { Vehicle } from './Vehicle';
import {
  VehicleColor,
  VehicleModType,
  VehicleNeonLight,
  VehiclePaintType,
  VehicleToggleModType,
  VehicleWheelType,
  VehicleWindowTint,
} from '../enums';
import { VehicleMod } from './VehicleMod';
import { Color } from '../utils';
import { LicensePlateStyle, LicensePlateType } from '../enums/Vehicle';
import { VehicleToggleMod } from './VehicleToggleMod';

export class VehicleModCollection {
  private _owner: Vehicle;
  private readonly _vehicleMods: Map<VehicleModType, VehicleMod> = new Map<
    VehicleModType,
    VehicleMod
  >();
  private readonly _vehicleToggleMods: Map<VehicleToggleModType, VehicleToggleMod> = new Map<
    VehicleToggleModType,
    VehicleToggleMod
  >();

  constructor(owner: Vehicle) {
    this._owner = owner;
  }

  public hasVehicleMod(type: VehicleModType): boolean {
    return GetNumVehicleMods(this._owner.Handle, type) > 0;
  }

  public getMod(modType: VehicleModType): VehicleMod {
    if (!this._vehicleMods.has(modType)) {
      this._vehicleMods.set(modType, new VehicleMod(this._owner, modType));
    }
    return this._vehicleMods.get(modType);
  }

  public getToggleMod(modType: VehicleToggleModType): VehicleToggleMod {
    if (!this._vehicleToggleMods.has(modType)) {
      this._vehicleToggleMods.set(modType, new VehicleToggleMod(this._owner, modType));
    }
    return this._vehicleToggleMods.get(modType);
  }

  public getAllMods(): VehicleMod[] {
    return Object.keys(VehicleModType)
      .filter(key => !isNaN(Number(key)))
      .map(key => {
        const index = Number(key);
        if (this.hasVehicleMod(index)) {
          return this.getMod(index);
        }
        return null;
      })
      .filter(m => m);
  }

  public get WheelType(): VehicleWheelType {
    return GetVehicleWheelType(this._owner.Handle);
  }

  public set WheelType(type: VehicleWheelType) {
    SetVehicleWheelType(this._owner.Handle, type);
  }

  public installModKit(): void {
    SetVehicleModKit(this._owner.Handle, 0);
  }

  public get Livery(): number {
    const modCount = this.getMod(VehicleModType.Livery).ModCount;
    if (modCount > 0) {
      return this.getMod(VehicleModType.Livery).Index;
    }
    return GetVehicleLivery(this._owner.Handle);
  }

  public set Livery(value: number) {
    if (this.getMod(VehicleModType.Livery).ModCount > 0) {
      this.getMod(VehicleModType.Livery).Index = value;
    } else {
      SetVehicleLivery(this._owner.Handle, value);
    }
  }

  public get LiveryCount(): number {
    const modCount = this.getMod(VehicleModType.Livery).ModCount;
    if (modCount > 0) {
      return modCount;
    }
    return GetVehicleLiveryCount(this._owner.Handle);
  }

  public get WindowTint(): VehicleWindowTint {
    return GetVehicleWindowTint(this._owner.Handle);
  }

  public set WindowTint(tint: VehicleWindowTint) {
    SetVehicleWindowTint(this._owner.Handle, tint);
  }

  public get PrimaryColor(): VehicleColor {
    return GetVehicleColours(this._owner.Handle)[0];
  }

  public set PrimaryColor(color: VehicleColor) {
    SetVehicleColours(this._owner.Handle, color, this.SecondaryColor);
  }

  public get SecondaryColor(): VehicleColor {
    return GetVehicleColours(this._owner.Handle)[1];
  }

  public set SecondaryColor(color: VehicleColor) {
    SetVehicleColours(this._owner.Handle, this.PrimaryColor, color);
  }

  public get RimColor(): VehicleColor {
    return GetVehicleExtraColours(this._owner.Handle)[1];
  }

  public set RimColor(color: VehicleColor) {
    SetVehicleExtraColours(this._owner.Handle, this.PearlescentColor, color);
  }

  public get PearlescentColor(): VehicleColor {
    return GetVehicleExtraColours(this._owner.Handle)[0];
  }

  public set PearlescentColor(color: VehicleColor) {
    SetVehicleExtraColours(this._owner.Handle, color, this.RimColor);
  }

  public set TrimColor(color: VehicleColor) {
    SetVehicleInteriorColour(this._owner.Handle, color);
  }

  public set DashboardColor(color: VehicleColor) {
    SetVehicleDashboardColour(this._owner.Handle, color);
  }

  public setModColor1(paintType: VehiclePaintType, color: VehicleColor): void {
    SetVehicleModColor_1(this._owner.Handle, paintType, color, 0);
  }

  public setModColor2(paintType: VehiclePaintType, color: VehicleColor): void {
    SetVehicleModColor_2(this._owner.Handle, paintType, color);
  }

  public get ColorCombination(): number {
    return GetVehicleColourCombination(this._owner.Handle);
  }

  public set ColorCombination(value: number) {
    SetVehicleColourCombination(this._owner.Handle, value);
  }

  public get ColorCombinationCount(): number {
    return GetNumberOfVehicleColours(this._owner.Handle);
  }

  public get TireSmokeColor(): Color {
    const color = GetVehicleTyreSmokeColor(this._owner.Handle);
    return Color.fromRgb(color[0], color[1], color[2]);
  }

  public set TireSmokeColor(color: Color) {
    SetVehicleTyreSmokeColor(this._owner.Handle, color.r, color.g, color.b);
  }

  public get NeonLightsColor(): Color {
    const color = GetVehicleNeonLightsColour(this._owner.Handle);
    return Color.fromRgb(color[0], color[1], color[2]);
  }

  public set NeonLightsColor(color: Color) {
    SetVehicleNeonLightsColour(this._owner.Handle, color.r, color.g, color.b);
  }

  public isNeonLightsOn(light: VehicleNeonLight): boolean {
    return !!IsVehicleNeonLightEnabled(this._owner.Handle, light);
  }

  public setNeonLightsOn(light: VehicleNeonLight, on: boolean): void {
    SetVehicleNeonLightEnabled(this._owner.Handle, light, on);
  }

  public areAllNeonLightsOn(): boolean {
    if (!this.HasNeonLights) {
      return false;
    }
    let on = true;
    Object.keys(VehicleNeonLight)
      .filter(key => !isNaN(Number(key)))
      .forEach(key => {
        if (!on) {
          return;
        }
        on = this.isNeonLightsOn(Number(key));
      });
    return on;
  }

  public setAllNeonLightsOn(on: boolean): void {
    Object.keys(VehicleNeonLight)
      .filter(key => !isNaN(Number(key)))
      .forEach(key => {
        this.setNeonLightsOn(Number(key), on);
      });
  }

  public get HasNeonLights(): boolean {
    return (
      Object.keys(VehicleNeonLight)
        .filter(key => !isNaN(Number(key)))
        .findIndex(light => this.hasNeonLight(Number(light))) !== -1
    );
  }

  public hasNeonLight(light: VehicleNeonLight): boolean {
    switch (light) {
      case VehicleNeonLight.Left:
        return this._owner.Bones.hasBone('neon_l');
      case VehicleNeonLight.Right:
        return this._owner.Bones.hasBone('neon_r');
      case VehicleNeonLight.Front:
        return this._owner.Bones.hasBone('neon_f');
      case VehicleNeonLight.Back:
        return this._owner.Bones.hasBone('neon_b');
      default:
        return false;
    }
  }

  public get CustomPrimaryColor(): Color {
    const color = GetVehicleCustomPrimaryColour(this._owner.Handle);
    return Color.fromRgb(color[0], color[1], color[2]);
  }

  public set CustomPrimaryColor(color: Color) {
    SetVehicleCustomPrimaryColour(this._owner.Handle, color.r, color.g, color.b);
  }

  public get CustomSecondaryColor(): Color {
    const color = GetVehicleCustomSecondaryColour(this._owner.Handle);
    return Color.fromRgb(color[0], color[1], color[2]);
  }

  public set CustomSecondaryColor(color: Color) {
    SetVehicleCustomSecondaryColour(this._owner.Handle, color.r, color.g, color.b);
  }

  public get IsPrimaryColorCustom(): boolean {
    return !!GetIsVehiclePrimaryColourCustom(this._owner.Handle);
  }

  public get IsSecondaryColorCustom(): boolean {
    return !!GetIsVehicleSecondaryColourCustom(this._owner.Handle);
  }

  public clearCustomPrimaryColor(): void {
    ClearVehicleCustomPrimaryColour(this._owner.Handle);
  }

  public clearCustomSecondaryColor(): void {
    ClearVehicleCustomSecondaryColour(this._owner.Handle);
  }

  public get LicensePlateStyle(): LicensePlateStyle {
    return GetVehicleNumberPlateTextIndex(this._owner.Handle);
  }

  public set LicensePlateStyle(style: LicensePlateStyle) {
    SetVehicleNumberPlateTextIndex(this._owner.Handle, style);
  }

  public get LicensePlateType(): LicensePlateType {
    return GetVehiclePlateType(this._owner.Handle);
  }

  public get LicensePlate(): string {
    return GetVehicleNumberPlateText(this._owner.Handle);
  }

  public set LicensePlate(text: string) {
    SetVehicleNumberPlateText(this._owner.Handle, text);
  }
}
