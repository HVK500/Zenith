import { Conditions } from '../../../common/conditions';
import { Util } from '../../../common/util';

/**
 *
 *
 * @export
 * @class BrowserStorage
 */
export class BrowserStorage {

  /**
   *
   *
   * @private
   * @type {Storage}
   */
  private storageContext: Storage;

  /**
   * Creates an instance of BrowserStorage.
   *
   * @param {Storage} context
   */
  constructor(context: Storage) {
    this.storageContext = context;
  }

  /**
   *
   *
   * @returns {number}
   */
  count(): number {
    return this.storageContext.length;
  }

  /**
   *
   *
   */
  clear(): void {
    this.storageContext.clear();
  }

  /**
   *
   *
   * @param {string} key
   * @param {*} value
   */
  add(key: string, value: any): void {
    this.storageContext.setItem(key, value);
  }

  /**
   *
   *
   * @param {{ [key: string]: any }} keyAndValue
   */
  addMultiple(keyAndValue: { [key: string]: any }): void {
    Util.each(keyAndValue, (key, value, index) => {
      if (Conditions.isNullOrEmpty(key)) return;
      this.add(key, value);
    });
  }

  /**
   *
   *
   * @param {(string | string[])} key
   */
  remove(key: string | string[]): void {
    if (!Conditions.isArray(key)) {
      key = [<string>key];
    }

    Util.each(<string[]>key, (item) => {
      this.storageContext.removeItem(item);
    });
  }

  /**
   *
   *
   * @param {string} key
   * @returns {string}
   */
  fetch(key: string): string {
    return this.storageContext.getItem(key);
  }

}
