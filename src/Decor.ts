import { DecorType } from './enums'

export interface IDecor {
    GetFloat(property: string): number;
    GetInt(property: string): number;
    GetTime(property: string): number;
    GetBool(property: string): boolean;

    SetFloat(property: string, value: number): void;
    SetInt(property: string, value: number): void;
    SetTime(property: string, value: number): void;
    SetBool(property: string, value: boolean): void;
    DecorRemove(property: string): void;
    DecorExist(property): boolean
}

export class Decor {

    static Register(property, type: DecorType) {
        if (!DecorIsRegisteredAsType(property, type)) {
            DecorRegister(property, type)
            DecorRegisterLock()
        }
    }

    static Remove(handle, property) {
        DecorRemove(handle, property)
    }

    static Exist(handle, property): boolean {
        return DecorExistOn(handle, property)
    }

    static GetFloat(handle: number, property: string): number {
        return DecorGetFloat(handle, property)
    }
    static GetInt(handle: number, property: string): number {
        return DecorGetInt()(handle, property)
    }

    static GetTime(handle: number, property: string): number {
        return DecorGetInt(handle, property)
    }
    static GetBool(handle: number, property: string): boolean {
        return DecorGetBool(handle, property)
    }

    static SetFloat(handle: number, property: string, value: number): void {
        DecorSetFloat(handle, property, value)
    }

    static SetInt(handle: number, property: string, value: number): void {
        DecorSetInt(handle, property, value)
    }

    static SetTime(handle: number, property: string, value: number): void {
        DecorSetTime(handle, property, value)
    }

    static SetBool(handle: number, property: string, value: boolean): void {
        DecorSetBool(handle, property, value)
    }
}