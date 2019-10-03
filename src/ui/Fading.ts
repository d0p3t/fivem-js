export abstract class Fading {
  public static get IsFadedIn(): boolean {
    return !!IsScreenFadedIn();
  }

  public static get IsFadedOut(): boolean {
    return !!IsScreenFadedOut();
  }

  public static get IsFadingIn(): boolean {
    return !!IsScreenFadingIn();
  }

  public static get IsFadingOut(): boolean {
    return !!IsScreenFadingOut();
  }

  public static fadeIn(duration: number): Promise<void> {
    return new Promise((resolve) => {
      DoScreenFadeIn(duration);

      const interval = setInterval(() => {
        if (this.IsFadedIn) {
          clearInterval(interval);
          resolve();
        }
        // tslint:disable-next-line: align
      }, 0);
    });
  }

  public static fadeOut(duration: number): Promise<void> {
    return new Promise((resolve) => {
      DoScreenFadeOut(duration);

      const interval = setInterval(() => {
        if (this.IsFadedOut) {
          clearInterval(interval);
          resolve();
        }
        // tslint:disable-next-line: align
      }, 0);
    });
  }
}
