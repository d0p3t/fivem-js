import { AudioFlag } from './enums';
import { Entity } from './models';
import { Vector3 } from './utils';

export abstract class Audio {
  public static playSoundAt(position: Vector3, sound: string, set?: string): number {
    PlaySoundFromCoord(
      -1,
      sound,
      position.x,
      position.y,
      position.z,
      set ? set : null,
      false,
      0,
      false,
    );
    return GetSoundId();
  }

  public static playSoundFromEntity(entity: Entity, sound: string, set?: string): number {
    PlaySoundFromEntity(-1, sound, entity.Handle, set ? set : null, false, 0);
    return GetSoundId();
  }

  public static playSoundFrontEnd(sound: string, set?: string): number {
    PlaySoundFrontend(-1, sound, set ? set : null, false);
    return GetSoundId();
  }

  public static stopSound(soundId: number): void {
    StopSound(soundId);
  }

  public static releaseSound(soundId: number): void {
    ReleaseSoundId(soundId);
  }

  public static hasSoundFinished(soundId: number): boolean {
    return !!HasSoundFinished(soundId);
  }

  public static setAudioFlag(flag: string | AudioFlag, toggle: boolean): void {
    if (typeof flag === 'string') {
      SetAudioFlag(flag, toggle);
    } else {
      SetAudioFlag(this.audioFlags[Number(flag)], toggle);
    }
  }

  public static playSound(soundFile: string, soundSet: string): void {
    this.releaseSound(this.playSoundFrontEnd(soundFile, soundSet));
  }

  public static playMusic(musicFile: string): void {
    TriggerMusicEvent(musicFile);
  }

  public static stopMusic(musicFile: string): void {
    CancelMusicEvent(musicFile);
  }

  private static readonly audioFlags: string[] = [
    'ActivateSwitchWheelAudio',
    'AllowCutsceneOverScreenFade',
    'AllowForceRadioAfterRetune',
    'AllowPainAndAmbientSpeechToPlayDuringCutscene',
    'AllowPlayerAIOnMission',
    'AllowPoliceScannerWhenPlayerHasNoControl',
    'AllowRadioDuringSwitch',
    'AllowRadioOverScreenFade',
    'AllowScoreAndRadio',
    'AllowScriptedSpeechInSlowMo',
    'AvoidMissionCompleteDelay',
    'DisableAbortConversationForDeathAndInjury',
    'DisableAbortConversationForRagdoll',
    'DisableBarks',
    'DisableFlightMusic',
    'DisableReplayScriptStreamRecording',
    'EnableHeadsetBeep',
    'ForceConversationInterrupt',
    'ForceSeamlessRadioSwitch',
    'ForceSniperAudio',
    'FrontendRadioDisabled',
    'HoldMissionCompleteWhenPrepared',
    'IsDirectorModeActive',
    'IsPlayerOnMissionForSpeech',
    'ListenerReverbDisabled',
    'LoadMPData',
    'MobileRadioInGame',
    'OnlyAllowScriptTriggerPoliceScanner',
    'PlayMenuMusic',
    'PoliceScannerDisabled',
    'ScriptedConvListenerMaySpeak',
    'SpeechDucksScore',
    'SuppressPlayerScubaBreathing',
    'WantedMusicDisabled',
    'WantedMusicOnMission',
  ];
}
