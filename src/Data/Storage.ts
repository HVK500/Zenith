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
	 * @memberOf Storage
	 */
	static Cookie = Cookie;

	/**
	 *
	 *
	 * @static
	 * @memberOf Storage
	 */
	static Local = new BrowserStorage(window.localStorage);

	/**
	 *
	 *
	 * @static
	 * @memberOf Storage
	 */
	static Session = new BrowserStorage(window.sessionStorage);

}