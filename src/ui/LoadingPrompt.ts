import { LoadingSpinnerType } from '../enums';

export abstract class LoadingPrompt {
  public static show(
    loadingText: string = null,
    spinnerType: LoadingSpinnerType = LoadingSpinnerType.RegularClockwise,
  ) {
    if (this.IsActive) {
      this.hide();
    }

    if (loadingText === null) {
      BeginTextCommandBusyString(null);
    } else {
      BeginTextCommandBusyString('STRING');
      AddTextComponentSubstringPlayerName(loadingText);
    }

    EndTextCommandBusyString(Number(spinnerType));
  }

  public static hide(): void {
    if (this.IsActive) {
      RemoveLoadingPrompt();
    }
  }

  public static get IsActive(): boolean {
    return !!IsLoadingPromptBeingDisplayed();
  }
}
