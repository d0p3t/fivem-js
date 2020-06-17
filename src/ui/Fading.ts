/**
 * Static class for screen fading
 */
export abstract class Fading {
  /**
   * Gets whether the screen is faded in
   *
   * @returns True or false
   */
  public static get IsFadedIn(): boolean {
    return !!IsScreenFadedIn();
  }

  /**
   * Gets whether the screen is faded out
   *
   * @returns True or false
   */
  public static get IsFadedOut(): boolean {
    return !!IsScreenFadedOut();
  }

  /**
   * Gets whether the screen is currently fading in
   *
   * @returns True or false
   */
  public static get IsFadingIn(): boolean {
    return !!IsScreenFadingIn();
  }

  /**
   * Gets whether the screen is currently fading out
   *
   * @returns True or false
   */
  public static get IsFadingOut(): boolean {
    return !!IsScreenFadingOut();
  }

  /**
   * Fade in the screen for a certain duration.
   *
   * @param duration Time to fade in
   */
  public static fadeIn(duration: number): Promise<void> {
    return new Promise(resolve => {
      DoScreenFadeIn(duration);

      const interval = setInterval(() => {
        if (this.IsFadedIn) {
          clearInterval(interval);
          resolve();
        }
      }, 0);
    });
  }

  /**
   * Fade out the screen for a certain duration.
   *
   * @param duration Time to fade out
   */
  public static fadeOut(duration: number): Promise<void> {
    return new Promise(resolve => {
      DoScreenFadeOut(duration);

      const interval = setInterval(() => {
        if (this.IsFadedOut) {
          clearInterval(interval);
          resolve();
        }
      }, 0);
    });
  }
}
