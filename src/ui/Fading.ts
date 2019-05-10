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

  public static fadeIn(duration: number): void {
    DoScreenFadeIn(duration);
  }

  public static fadeOut(duration: number): void {
    DoScreenFadeOut(duration);
  }
}
