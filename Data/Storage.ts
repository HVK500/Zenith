import { BrowserStorage } from '../Data/Storage/Models/BrowserStorage';
import { Cookie } from '../Data/Storage/Cookie';

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
