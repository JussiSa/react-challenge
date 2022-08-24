/**
 * Utility class to manage storage.
 */
export class StorageUtil {
  /**
   * Store item to storage
   * @param key       Item key
   * @param value     Item value
   */
  static setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  /**
   * Retreive item from storage
   * @param key Item key
   */
  static getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }
}
