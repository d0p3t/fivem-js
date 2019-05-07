export interface IInvertAxis {
  flags: InvertAxisFlags;
}

export enum InvertAxisFlags {
  None = 0,
  X = 1,
  Y = 2,
  Z = 4,
}
