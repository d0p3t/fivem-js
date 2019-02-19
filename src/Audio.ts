import { AudioFlag } from './enums/AudioFlag';
import { Entity } from './models/Entity';
import { Vector3 } from './utils/Vector3';

export abstract class Audio {
  public static PlaySoundAt(position: Vector3, sound: string, set?: string): number {
    PlaySoundFromCoord(-1, sound, position.x, position.y, position.z, set ? set : null, false, 0, false);
    return GetSoundId();
  }

  public static PlaySoundFromEntity(entity: Entity, sound: string, set?: string): number {
    PlaySoundFromEntity(-1, sound, entity.Handle, set ? set : null, false, 0);
    return GetSoundId();
  }

  public static PlaySoundFrontEnd(sound: string, set?: string): number {
    PlaySoundFrontend(-1, sound, set ? set : null, false);
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
