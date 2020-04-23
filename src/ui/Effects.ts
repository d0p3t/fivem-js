import { ScreenEffect } from '../enums';

export abstract class Effects {
  public static start(effectName: ScreenEffect, duration = 0, looped = false): void {
    StartScreenEffect(this.effectToString(effectName), duration, looped);
  }

  public static stop(screenEffect?: ScreenEffect): void {
    if (typeof screenEffect === 'undefined') {
      StopAllScreenEffects();
    } else {
      StopScreenEffect(this.effectToString(screenEffect));
    }
  }

  public static isActive(screenEffect: ScreenEffect): boolean {
    return !!GetScreenEffectIsActive(this.effectToString(screenEffect));
  }

  private static readonly effects: string[] = [
    'SwitchHUDIn',
    'SwitchHUDOut',
    'FocusIn',
    'FocusOut',
    'MinigameEndNeutral',
    'MinigameEndTrevor',
    'MinigameEndFranklin',
    'MinigameEndMichael',
    'MinigameTransitionOut',
    'MinigameTransitionIn',
    'SwitchShortNeutralIn',
    'SwitchShortFranklinIn',
    'SwitchShortTrevorIn',
    'SwitchShortMichaelIn',
    'SwitchOpenMichaelIn',
    'SwitchOpenFranklinIn',
    'SwitchOpenTrevorIn',
    'SwitchHUDMichaelOut',
    'SwitchHUDFranklinOut',
    'SwitchHUDTrevorOut',
    'SwitchShortFranklinMid',
    'SwitchShortMichaelMid',
    'SwitchShortTrevorMid',
    'DeathFailOut',
    'CamPushInNeutral',
    'CamPushInFranklin',
    'CamPushInMichael',
    'CamPushInTrevor',
    'SwitchSceneFranklin',
    'SwitchSceneTrevor',
    'SwitchSceneMichael',
    'SwitchSceneNeutral',
    'MP_Celeb_Win',
    'MP_Celeb_Win_Out',
    'MP_Celeb_Lose',
    'MP_Celeb_Lose_Out',
    'DeathFailNeutralIn',
    'DeathFailMPDark',
    'DeathFailMPIn',
    'MP_Celeb_Preload_Fade',
    'PeyoteEndOut',
    'PeyoteEndIn',
    'PeyoteIn',
    'PeyoteOut',
    'MP_race_crash',
    'SuccessFranklin',
    'SuccessTrevor',
    'SuccessMichael',
    'DrugsMichaelAliensFightIn',
    'DrugsMichaelAliensFight',
    'DrugsMichaelAliensFightOut',
    'DrugsTrevorClownsFightIn',
    'DrugsTrevorClownsFight',
    'DrugsTrevorClownsFightOut',
    'HeistCelebPass',
    'HeistCelebPassBW',
    'HeistCelebEnd',
    'HeistCelebToast',
    'MenuMGHeistIn',
    'MenuMGTournamentIn',
    'MenuMGSelectionIn',
    'ChopVision',
    'DMT_flight_intro',
    'DMT_flight',
    'DrugsDrivingIn',
    'DrugsDrivingOut',
    'SwitchOpenNeutralFIB5',
    'HeistLocate',
    'MP_job_load',
    'RaceTurbo',
    'MP_intro_logo',
    'HeistTripSkipFade',
    'MenuMGHeistOut',
    'MP_corona_switch',
    'MenuMGSelectionTint',
    'SuccessNeutral',
    'ExplosionJosh3',
    'SniperOverlay',
    'RampageOut',
    'Rampage',
    'Dont_tazeme_bro',
  ];

  private static effectToString(screenEffect: ScreenEffect): string {
    const effect = Number(screenEffect);
    if (effect >= 0 && effect <= this.effects.length) {
      return this.effects[effect];
    }
    return 'INVALID';
  }
}
