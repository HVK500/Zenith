import { Conditions } from '../../common/conditions';
import { Util } from '../../common/util';
import { KeyValuePair } from '../../common-internals';

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
  private context: Storage;

  /**
   * Creates an instance of BrowserStorage.
   *
   * @param {Storage} context
   */
  constructor(context: Storage) {
    this.context = context;
  }

  /**
   *
   *
   * @returns {number}
   */
  count(): number {
    return this.context.length;
  }

  /**
   *
   *
   */
  clear(): void {
    this.context.clear();
  }

  /**
   *
   *
   * @param {string} key
   * @param {*} value
   */
  add(key: string, value: string): void {
    this.context.setItem(key, value);
  }

  /**
   *
   *
   * @param {{ [key: string]: string }} keyAndValue
   */
  addMultiple(keyAndValue: KeyValuePair<string>): void {
    Util.each<string>(keyAndValue, (value, key) => {
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
    Util.each<string>(Util.convertSingleToCollection<string>(key), (item: string): void => {
      this.context.removeItem(item);
    });
  }

  /**
   *
   *
   * @param {string} key
   * @returns {string}
   */
  fetch(key: string): string {
    return this.context.getItem(key);
  }

}
