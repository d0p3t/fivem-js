import { Audio } from './Audio';
import { Control, InputMode, Language, RadioStation } from './enums';
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

  /**
   * Get the local player's Player object.
   */
  public static get Player(): Player {
    const handle = PlayerId();
    if (typeof this.cachedPlayer === 'undefined' || handle !== this.cachedPlayer.Handle) {
      this.cachedPlayer = new Player(handle);
    }

    return this.cachedPlayer;
  }

  /**
   * Get the local player character's Ped object.
   * @returns A local player's character.
   */
  public static get PlayerPed(): Ped {
    return this.Player.Character;
  }

  /**
   * Get an iterable list of players currently on server.
   * @returns Iterable list of Player objects.
   */
  public static *playerList(): IterableIterator<Player> {
    for (let i = 0; i < GetActivePlayers(); i += 1) {
      yield new Player(i);
    }
  }

  /**
   * Get whether PvP is enabled.
   * @returns True if enabled.
   */
  public static get PlayerVersusPlayer(): boolean {
    return this.Player.PvPEnabled;
  }

  /**
   * Set whether PvP is enabled.
   */
  public static set PlayerVersusPlayer(value: boolean) {
    this.Player.PvPEnabled = value;
  }

  /**
   * Get the maximum wanted level.
   */
  public static get MaxWantedLevel(): number {
    return GetMaxWantedLevel();
  }

  /**
   * Set the maximum wanted level the local client can get.
   */
  public static set MaxWantedLevel(value: number) {
    if (value < 0) {
      value = 0;
    } else if (value > 5) {
      value = 5;
    }

    SetMaxWantedLevel(value);
  }

  /**
   * Set the multiplier of the wanted level.
   */
  public static set WantedMultiplier(value: number) {
    SetWantedLevelMultiplier(value);
  }

  /**
   * Set whether police blips should show on minimap.
   */
  public static set ShowPoliceBlipsOnRadar(toggle: boolean) {
    SetPoliceRadarBlips(toggle);
  }

  /**
   * Get if nightvision is active.
   */
  public static get Nightvision(): boolean {
    return !!IsNightvisionActive();
  }

  /**
   * Toggle nightvision.
   */
  public static set Nightvision(toggle: boolean) {
    SetNightvision(toggle);
  }

  /**
   * Get if thermal (heat) vision is active.
   */
  public static get ThermalVision(): boolean {
    return !!IsSeethroughActive();
  }

  /**
   * Toggle thermal (heat) vision.
   */
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

  /**
   * Is a waypoint set on the map.
   */
  public static get IsWaypointActive(): boolean {
    return !!IsWaypointActive();
  }

  /**
   * Is the player in the pause menu (ESC).
   */
  public static get IsPaused(): boolean {
    return !!IsPauseMenuActive();
  }

  /**
   * Force enable pause menu.
   */
  public static set IsPaused(toggle: boolean) {
    SetPauseMenuActive(toggle);
  }

  /**
   * Get if a loading screen is active.
   */
  public static get IsLoading(): boolean {
    return !!GetIsLoadingScreenActive();
  }

  /**
   * Get current input mode.
   * @returns InputMode: Mouse & Keyboard or GamePad.
   */
  public static get CurrentInputMode(): InputMode {
    return IsInputDisabled(2) ? InputMode.MouseAndKeyboard : InputMode.GamePad;
  }

  /**
   * Gets the player's current radio station.
   *
   * @returns A radio station.
   */
  public static get RadioStation(): RadioStation {
    const stationName: string = GetPlayerRadioStationName();
    const keys = Object.keys(RadioStation).filter(x => RadioStation[x] === stationName);
    return keys.length > 0 ? RadioStation[keys[0]] : RadioStation.RadioOff;
  }

  /**
   * Sets the player's radio station.
   *
   * @param station A radio station.
   */
  public static set RadioStation(station: RadioStation) {
    const stationName = RadioStation[station];
    SetRadioToStationName(stationName);
  }

  /**
   * Check whether a control is currently pressed.
   *
   * @param index input group (usually 0)
   * @param control Control
   * @returns True or False.
   */
  public static isControlPressed(index: number, control: Control): boolean {
    return !!IsControlPressed(index, Number(control));
  }

  /**
   * Check whether a control has been pressed since last check.
   *
   * @param index input group (usually 0)
   * @param control Control
   * @returns True or False.
   */
  public static isControlJustPressed(index: number, control: Control): boolean {
    return !!IsControlJustPressed(index, Number(control));
  }

  /**
   * Check whether a disabled control has been pressed since last check.
   *
   * @param index input group (usually 0)
   * @param control Control
   * @returns True or False.
   */
  public static isDisabledControlJustPressed(index: number, control: Control): boolean {
    return !!IsDisabledControlJustPressed(index, Number(control));
  }

  /**
   * Check whether a control is being released.
   *
   * @param index input group (usually 0)
   * @param control Control
   * @returns True or False.
   */
  public static isControlReleased(index: number, control: Control): boolean {
    return !!IsControlReleased(index, Number(control));
  }

  /**
   * Check whether a control has been released since last check.
   *
   * @param index input group (usually 0)
   * @param control Control
   * @returns True or False.
   */
  public static isControlJustReleased(index: number, control: Control): boolean {
    return !!IsControlJustReleased(index, Number(control));
  }

  /**
   * Get an entity object from an entity handle.
   *
   * @param handle Handle of entity
   * @returns A Ped, Vehicle or Prop object. `undefined` if entity handle doesn't exist.
   */
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

  /**
   * Play a sound. Same as Audio.playSound
   *
   * @param soundFile Name of sound
   * @param soundSet The set where the sound is in
   */
  public static playSound(soundFile: string, soundSet: string): void {
    Audio.playSound(soundFile, soundSet);
  }
  /**
   * Play music. Same as Audio.playSound
   *
   * @param musicFile Music file.
   */
  public static playMusic(musicFile: string): void {
    Audio.playMusic(musicFile);
  }

  /**
   * Stop music. If `musicFile` is not given, last played music is stopped. Same as Audio.playSound
   *
   * @param musicFile (optional) Music file.
   */
  public static stopMusic(musicFile?: string): void {
    Audio.stopMusic(musicFile);
  }

  /**
   * Determines if the game language files contain an entry for the specified GXT key.
   * 
   * @param entry The GXT key.
   */
  public static doesGXTEntryExist(entry: string): boolean {
    return !!DoesTextLabelExist(entry);
  }

  public static getGXTEntry(entry: string): string {
    return this.doesGXTEntryExist(entry) ? GetLabelText(entry) : null;
  }

  protected static cachedPlayer: Player;
}
