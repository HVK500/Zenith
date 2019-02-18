/// <reference path="../../common/extensions/array-extensions.d.ts" />
/// <reference path="../../common/extensions/object-extensions.d.ts" />
/// <reference path="../../common/extensions/string-extensions.d.ts" />

import { KeyValuePair } from '../../common/common-internals';
import { Conditions } from '../../common/conditions';
import '../../common/extensions/array-extensions';
import '../../common/extensions/object-extensions';
import '../../common/extensions/string-extensions';

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
    keyAndValue.each((value: string, key: string): void => {
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
    if (Conditions.isString(key)) key = key.toArray();

    key.each((item: string): void => {
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
