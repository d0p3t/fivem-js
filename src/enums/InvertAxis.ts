export enum InvertAxisFlags {
  None = 0,
  X = 1,
  Y = 2,
  Z = 4,
}

export interface InvertAxis {
  flags: InvertAxisFlags;
}
