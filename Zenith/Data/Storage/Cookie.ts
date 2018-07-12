import { Conditions } from '../../Common/Conditions';
import { CookieMetadata, RetrievedCookieNameValuePair } from '../Storage/CookieInternals';
import { CookieModel } from '../Storage/Models/CookieModel';
import { StringExtensions } from '../../Common/Extensions/StringExtensions';
import { Util } from '../../Common/Util';

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
  private static readonly standardRemovalDate = 'Thu, 01 Jan 1970 00:00:00 UTC';

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
    const cookieCollection = Cookie.getCookieCollection();
    const removalItemNames = [];

    Util.each(cookieCollection, (raw: string) => {
      removalItemNames.push(StringExtensions.split(raw, '=')[0]);
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
  static addMultiple(cookieCollection: CookieMetadata[]) {
    Util.each(cookieCollection, (cookie: CookieMetadata) => {
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
    if (!Conditions.isArray(name)) {
      name = [<string>name];
    }

    Util.each(<string[]>name, (item) => {
      const cookie = Cookie.fetch(item);
      if (!cookie.raw) return;
      Cookie.add(cookie.name, cookie.value, Cookie.standardRemovalDate);
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
    name = StringExtensions.concat(name, '=');
    const collection = Cookie.getCookieCollection();

    let result = { raw: null, name: null, value: null };

    const filteredResult = Util.each(collection, (nameValuePair) => {
      nameValuePair = StringExtensions.trim(nameValuePair);
      // tslint:disable-next-line:triple-equals
      if (nameValuePair.indexOf(name) == 0) {
        return nameValuePair.substring(name.length, nameValuePair.length);
      }
    });

    if (!Conditions.isNullOrEmpty(filteredResult)) {
      result.raw = filteredResult[0];
      result.name = name;
      result.value = StringExtensions.split(result.raw, '=')[1] || '';
    }

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
