import { AudioFlag } from './enums';
import { Entity } from './models';
import { Vector3 } from './utils';

export abstract class Audio {
  public static PlaySoundAt(position: Vector3, sound: string, set: string = null): number {
    PlaySoundFromCoord(-1, sound, position.x, position.y, position.z, set, false, 0, false);
    return GetSoundId();
  }

  public static PlaySoundFromEntity(entity: Entity, sound: string, set: string = null): number {
    PlaySoundFromEntity(-1, sound, entity.Handle, set, false, 0);
    return GetSoundId();
  }

  public static PlaySoundFrontEnd(sound: string, set: string = null): number {
    PlaySoundFrontend(-1, sound, set, false);
    return GetSoundId();
  }

  public static StopSound(soundId: number): void {
    StopSound(soundId);
  }

  public static ReleaseSound(soundId: number): void {
    ReleaseSoundId(soundId);
  }

  public static HasSoundFinished(soundId: number): boolean {
    return !!HasSoundFinished(soundId);
  }

  public static SetAudioFlag(flag: string | AudioFlag, toggle: boolean): void {
    if (typeof flag === 'string') {
      SetAudioFlag(flag, toggle);
    } else {
      SetAudioFlag(this.audioFlags[Number(flag)], toggle);
    }
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
