import { Common } from '../../../Common';
import { Conditions } from '../../../Common/Conditions';

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
	 * @memberOf BrowserStorage
	 */
	private storageContext: Storage;

	/**
	 * Creates an instance of BrowserStorage.
	 *
	 * @param {Storage} context
	 * @memberOf BrowserStorage
	 */
	constructor(context: Storage) {
		this.storageContext = context;
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberOf StorageController
	 */
	count(): number {
		return this.storageContext.length;
	}

	/**
	 *
	 *
	 * @memberOf StorageController
	 */
	flush(): void {
		this.storageContext.clear();
	}

	/**
	 *
	 *
	 * @param {string} key
	 * @param {*} value
	 * @memberOf StorageController
	 */
	add(key: string, value: any): void {
		this.storageContext.setItem(key, value);
	}

	/**
	 *
	 *
	 * @param {{ [key: string]: any }} keyAndValue
	 * @memberOf StorageController
	 */
	addMultiple(keyAndValue: { [key: string]: any }): void {
		Common.each(keyAndValue, (key, value, index) => {
			if (Conditions.isNullOrEmpty(key)) return;
			this.add(key, value);
		});
	}

	/**
	 *
	 *
	 * @param {(string | string[])} key
	 * @memberOf StorageController
	 */
	remove(key: string | string[]): void {
		if (!Conditions.isArray(key)) {
			key = [<string>key];
		}

		Common.each(<string[]>key, (item) => {
			this.storageContext.removeItem(item);
		});
	}

	/**
	 *
	 *
	 * @param {string} key
	 * @returns {string}
	 * @memberOf StorageController
	 */
	fetch(key: string): string {
		return this.storageContext.getItem(key);
	}

}
