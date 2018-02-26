import { Conditions } from '../../../Common/Conditions';
import { StringExtensions } from '../../../Common/Extensions/StringExtensions';

/**
 *
 *
 * @export
 * @class CookieModel
 */
export class CookieModel {

	/**
	 *
	 *
	 * @type {string}
	 * @memberOf CookieModel
	 */
	name: string;

	/**
	 *
	 *
	 * @type {string}
	 * @memberOf CookieModel
	 */
	value: string;

	/**
	 *
	 *
	 * @type {string}
	 * @memberOf CookieModel
	 */
	expiry: string;

	/**
	 *
	 *
	 * @type {string}
	 * @memberOf CookieModel
	 */
	path: string;

	/**
	 *
	 *
	 * @type {string}
	 * @memberOf CookieModel
	 */
	raw: string;

	/**
	 * Creates a CookieModel instance.
	 *
	 * @param {string} name
	 * @param {string} value
	 * @param {(Date | number | string)} [expiry]
	 * @param {string} [path]
	 * @memberOf CookieModel
	 */
	constructor(name: string, value: string, expiry?: Date | number | string, path?: string) {
		this.name = name;
		this.value = value;

		let expiryDate = null;
		let expiryString = '';
		if (!Conditions.isNullOrEmpty(expiry) && Conditions.isNumber(expiry)) {
			expiryDate = new Date();
			expiryDate.setTime(expiryDate.getTime() + (expiry * 24 * 60 * 60 * 1000));
		} else if (Conditions.isString(expiry)) {
			expiryString = expiry;
		} else { // Otherwise this is a date already
			expiryDate = expiry;
		}

		this.expiry = !!expiryDate ? expiryDate.toUTCString() : expiryString;
		this.path = path || '';

		this.raw = StringExtensions.concat(this.name, '=', this.value, '; ');

		if (!!this.expiry) this.raw = StringExtensions.concat(this.raw, 'expires=', this.expiry, '; ');
		if (!!this.path) this.raw = StringExtensions.concat(this.raw, 'path=', this.path, '; ');
	}

}
