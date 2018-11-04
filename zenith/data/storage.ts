import { BrowserStorage } from './storage/browser-storage';
import { Cookie } from './storage/cookie';

/**
 *
 *
 * @export
 * @class Storage
 */
export class Storage {

  /**
   *
   *
   * @static
   */
  static Cookie = Cookie;

  /**
   *
   *
   * @static
   */
  static Local = new BrowserStorage(window.localStorage);

  /**
   *
   *
   * @static
   */
  static Session = new BrowserStorage(window.sessionStorage);

}
