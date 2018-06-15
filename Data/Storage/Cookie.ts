import { Common } from '../../Common';
import { Conditions } from '../../Common/Conditions';
import { cookieMetadata, retrievedCookieNameValuePair } from '../Storage/CookieInternals';
import { CookieModel } from '../Storage/Models/CookieModel';
import { List } from '../../Common/List';
import { StringExtensions } from '../../Common/Extensions/StringExtensions';

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
   * @memberOf Cookie
   */
  private static readonly standardRemovalDate = 'Thu, 01 Jan 1970 00:00:00 UTC';

  /**
   *
   *
   * @private
   * @static
   * @param {string} cookie
   * @memberOf Cookie
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
   * @memberOf Cookie
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
   * @memberOf Cookie
   */
  private static getCookieCollection(): string[] {
    return decodeURIComponent(Cookie.getContainer()).split(';');
  }

  /**
   *
   *
   * @static
   * @returns {number}
   * @memberOf Cookie
   */
  static count(): number {
    return Cookie.getCookieCollection().length;
  }

  /**
   *
   *
   * @static
   * @memberOf Cookie
   */
  static flush(): void {
    // TODO Get all cookies and set the expiry to 1970
    // Use the remove method
    const cookieCollection = Cookie.getCookieCollection();
    const removalItemNames = new List<string>();

    Common.each(cookieCollection, (raw: string) => {
      removalItemNames.add(StringExtensions.split(raw, '=')[0]);
    });

    Cookie.remove(removalItemNames.members);
  }

  /**
   *
   *
   * @static
   * @param {string} name
   * @param {string} value
   * @param {(Date | number | string)} [expiry]
   * @param {string} [path]
   * @memberOf Cookie
   */
  static add(name: string, value: string, expiry?: Date | number | string, path?: string): void {
    const cookie = new CookieModel(name, value, expiry, path);
    Cookie.setInContainer(cookie.raw);
  }

  /**
   *
   *
   * @static
   * @param {cookieMetadata[]} cookieCollection
   * @memberOf Cookie
   */
  static addMultiple(cookieCollection: cookieMetadata[]) {
    Common.each(cookieCollection, (cookie: cookieMetadata) => {
      if (Conditions.isNullOrEmpty(cookie)) return;
      Cookie.add(cookie.name, cookie.value, cookie.expiry, cookie.path);
    });
  }

  /**
   *
   *
   * @static
   * @param {(string | string[])} name
   * @memberOf Cookie
   */
  static remove(name: string | string[]): void {
    if (!Conditions.isArray(name)) {
      name = [<string>name];
    }

    Common.each(<string[]>name, (item) => {
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
   * @returns {retrievedCookieNameValuePair}
   * @memberOf Cookie
   */
  static fetch(name: string): retrievedCookieNameValuePair {
    name = StringExtensions.concat(name, '=');
    const collection = Cookie.getCookieCollection();

    let result = { raw: null, name: null, value: null };

    const filteredResult = Common.each(collection, (nameValuePair, index, array) => {
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
   * @memberOf Cookie
   */
  static check() {
    // TODO: apply check logic here - https://www.w3schools.com/js/js_cookies.asp
  }

}
