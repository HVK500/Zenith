/// <reference path="../../common/extensions/array-extensions.d.ts" />

import { Conditions } from '../../common/conditions';
import '../../common/extensions/array-extensions';
import { CookieMetadata, RetrievedCookieNameValuePair } from '../storage/cookie-internals';
import { CookieModel } from '../storage/models/cookie-model';

/**
 *
 *
 * @export
 * @class Cookie
 */
export class Cookie {

  /**
   *
   *
   * @private
   * @static
   */
  private static readonly defaultExpiryDate = 'Thu, 01 Jan 1970 00:00:00 UTC';

  /**
   *
   *
   * @private
   * @static
   * @param {string} cookie
   */
  private static setInContainer(cookie: string): void {
    document.cookie = cookie;
  }

  /**
   *
   *
   * @private
   * @static
   * @returns {string}
   */
  private static getContainer(): string {
    return document.cookie;
  }

  /**
   *
   *
   * @private
   * @static
   * @returns {string[]}
   */
  private static getCookieCollection(): string[] {
    return decodeURIComponent(Cookie.getContainer()).split(';');
  }

  /**
   *
   *
   * @static
   * @returns {number}
   */
  static count(): number {
    return Cookie.getCookieCollection().length;
  }

  /**
   *
   *
   * @static
   */
  static clear(): void {
    // TODO Get all cookies and set the expiry to 1970
    // Use the remove method
    const removalItemNames = [];
    Cookie.getCookieCollection().each((raw: string): void => {
      removalItemNames.push(raw.split('=')[0]);
    });

    Cookie.remove(removalItemNames);
  }

  /**
   *
   *
   * @static
   * @param {string} name
   * @param {string} value
   * @param {(Date | number | string)} [expiry]
   * @param {string} [path]
   */
  static add(name: string, value: string, expiry?: Date | number | string, path?: string): void {
    const cookie = new CookieModel(name, value, expiry, path);
    Cookie.setInContainer(cookie.raw);
  }

  /**
   *
   *
   * @static
   * @param {CookieMetadata[]} cookieCollection
   */
  static addMultiple(cookieCollection: CookieMetadata[]): void {
    cookieCollection.each((cookie: CookieMetadata): void => {
      if (Conditions.isNullOrEmpty(cookie)) return;
      Cookie.add(cookie.name, cookie.value, cookie.expiry, cookie.path);
    });
  }

  /**
   *
   *
   * @static
   * @param {(string | string[])} name
   */
  static remove(name: string | string[]): void {
    if (Conditions.isString(name)) name = name.toArray();

    name.each((item: string): void => {
      const cookie = Cookie.fetch(item);
      if (!cookie.raw) return;
      Cookie.add(cookie.name, cookie.value, Cookie.defaultExpiryDate);
    });
  }

  /**
   *
   *
   * @static
   * @param {string} name
   * @returns {RetrievedCookieNameValuePair}
   */
  static fetch(name: string): RetrievedCookieNameValuePair {
    name = name.concat(name, '=');
    const collection = Cookie.getCookieCollection();

    let result: RetrievedCookieNameValuePair = {
      raw: null,
      name: null,
      value: null
    };

    const filteredResult = collection.filter((nameValuePair: string): boolean => {
      // tslint:disable-next-line:triple-equals
      return nameValuePair.trim().indexOf(name) == 0;
    });

    if (filteredResult.isEmpty()) {
      return null;
    }

    result.raw = filteredResult[0].trim();
    const [ rawName, rawValue ] = result.raw.split('=');
    result.name = rawName;
    result.value = rawValue || '';

    return result;
  }

  /**
   *
   *
   * @static
   */
  static check() {
    // TODO: apply check logic here - https://www.w3schools.com/js/js_cookies.asp
  }

}
