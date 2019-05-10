import { Control, InputMode, Language } from './enums';
import { Ped, Player, Prop, Vehicle } from './models';

export abstract class Game {
  /**
   * Calculate the Jenkins One At A Time (joaat) has from the given string.
   *
   * @param input The input string to calculate the hash
   */
  public static generateHash(input: string): number {
    if (typeof input === 'undefined') {
      return 0;
    }
    return GetHashKey(input);
  }

  /**
   * Gets the game language
   */
  public static get Language(): Language {
    return GetUiLanguageId();
  }

  /**
   * Gets how many milliseconds the game has been open this session
   */
  public static get GameTime(): number {
    return GetGameTimer();
  }

  /**
   * Sets the time scale of the Game.
   *
   * @param time The time scale, only accepts values between 0.0 and 1.0
   */
  public static set TimeScale(time: number) {
    SetTimeScale(time <= 1 && time >= 0 ? time : 1);
  }

  /**
   * Gets the total amount of frames rendered in this session
   */
  public static get FrameCount(): number {
    return GetFrameCount();
  }

  /**
   * Gets the current frame rate per second
   */
  public static get FPS(): number {
    return 1 / this.LastFrameTime;
  }

  /**
   * Gets the time it currently takes to render a frame, in seconds;
   */
  public static get LastFrameTime(): number {
    return GetFrameTime();
  }

  public static get Player(): Player {
    const handle = PlayerId();
    if (typeof this.cachedPlayer === 'undefined' || handle !== this.cachedPlayer.Handle) {
      this.cachedPlayer = new Player(handle);
    }

    return this.cachedPlayer;
  }

  public static get PlayerPed(): Ped {
    return this.Player.Character;
  }

  public static get MaxPlayers(): number {
    return GetConvarInt('sv_maxclients', 0); // not replicated
  }

  public static *playerList(): IterableIterator<Player> {
    const players: Player[] = [];

    for (let i = 0; i < this.MaxPlayers; i += 1) {
      if (NetworkIsPlayerActive(i)) {
        yield new Player(i);
      }
    }
  }

  public static get MaxWantedLevel(): number {
    return GetMaxWantedLevel();
  }

  public static set MaxWantedLevel(value: number) {
    if (value < 0) {
      value = 0;
    } else if (value > 5) {
      value = 5;
    }

    SetMaxWantedLevel(value);
  }

  public static set WantedMultiplier(value: number) {
    SetWantedLevelMultiplier(value);
  }

  public static set ShowPoliceBlipsOnRadar(toggle: boolean) {
    SetPoliceRadarBlips(toggle);
  }

  public static get Nightvision(): boolean {
    return !!IsNightvisionActive();
  }

  public static set Nightvision(toggle: boolean) {
    SetNightvision(toggle);
  }

  public static get ThermalVision(): boolean {
    return !!IsSeethroughActive();
  }

  public static set ThermalVision(toggle: boolean) {
    SetSeethrough(toggle);
  }

  public static get IsMissionActive(): boolean {
    return !!GetMissionFlag();
  }

  public static set IsMissionActive(toggle: boolean) {
    SetMissionFlag(toggle);
  }

  public static get IsRandomEventActive(): boolean {
    return GetRandomEventFlag() === 1;
  }

  public static set IsRandomEventActive(toggle: boolean) {
    SetRandomEventFlag(toggle ? 1 : 0);
  }

  public static get IsCutsceneActive(): boolean {
    return !!IsCutsceneActive();
  }

  public static get IsWaypointActive(): boolean {
    return !!IsWaypointActive();
  }

  public static get IsPaused(): boolean {
    return !!IsPauseMenuActive();
  }

  public static set IsPaused(toggle: boolean) {
    SetPauseMenuActive(toggle);
  }

  public static get IsLoading(): boolean {
    return !!GetIsLoadingScreenActive();
  }

  public static get CurrentInputMode(): InputMode {
    return IsInputDisabled(2) ? InputMode.MouseAndKeyboard : InputMode.GamePad;
  }

  public static isControlPressed(index: number, control: Control): boolean {
    return !!IsControlPressed(index, Number(control));
  }

  public static isControlJustPressed(index: number, control: Control): boolean {
    return !!IsControlJustPressed(index, Number(control));
  }

  public static isDisabledControlJustPressed(index: number, control: Control): boolean {
    return !!IsDisabledControlJustPressed(index, Number(control));
  }

  public static isControlReleased(index: number, control: Control): boolean {
    return !!IsControlReleased(index, Number(control));
  }

  public static isControlJustReleased(index: number, control: Control): boolean {
    return !!IsControlJustReleased(index, Number(control));
  }

  public static entityFromHandle(handle: number): Ped | Vehicle | Prop | undefined {
    switch (GetEntityType(handle)) {
      case 1:
        return new Ped(handle);
      case 2:
        return new Vehicle(handle);
      case 3:
        return new Prop(handle);
    }
    return null;
  }

  protected static cachedPlayer: Player;
}
