import { DecorType } from './enums'

export interface IDecor {
    getFloat(property: string): number;
    getInt(property: string): number;
    getTime(property: string): number;
    getBool(property: string): boolean;

    setFloat(property: string, value: number): void;
    setInt(property: string, value: number): void;
    setTime(property: string, value: number): void;
    setBool(property: string, value: boolean): void;
    decorRemove(property: string): void;
    decorExist(property): boolean
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
        return DecorExistOn(handle, property) == 1
    }

    static GetFloat(handle: number, property: string): number {
        return DecorGetFloat(handle, property)
    }
    static GetInt(handle: number, property: string): number {
        return DecorGetInt(handle, property)
    }

    static GetTime(handle: number, property: string): number {
        return DecorGetInt(handle, property)
    }
    static GetBool(handle: number, property: string): boolean {
        return DecorGetBool(handle, property) == 1
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