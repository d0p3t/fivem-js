import LoadingSpinnerType from './../enums/LoadingSpinnerType';

export abstract class LoadingPrompt {
  public static Show(
    loadingText: string = null,
    spinnerType: LoadingSpinnerType = LoadingSpinnerType.RegularClockwise,
  ) {
    if (this.IsActive) {
      this.Hide();
    }

    if (loadingText === null) {
      BeginTextCommandBusyString(null);
    } else {
      BeginTextCommandBusyString('STRING');
      AddTextComponentSubstringPlayerName(loadingText);
    }

    EndTextCommandBusyString(Number(spinnerType));
  }

  public static Hide(): void {
    if (this.IsActive) {
      RemoveLoadingPrompt();
    }
  }

  public static get IsActive(): boolean {
    return !!IsLoadingPromptBeingDisplayed();
  }
}
