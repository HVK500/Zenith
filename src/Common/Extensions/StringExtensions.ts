import { Conditions } from '../Conditions';

// https://github.com/epeli/underscore.string

/**
 *
 *
 * @export
 * @class StringExtensions
 */
export class StringExtensions {

	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static reverse(value: string): string {
		return StringExtensions.split(value, '').reverse().join('');
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static titleize(value: string): string {
		return value.toLowerCase().replace(/(?:^|\s|-)\S/g, (char: string): string => {
			return char.toUpperCase();
		});
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static caseSwap(value: string): string {
		return value.replace(/\S/g, (char: string): string => {
			return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
		});
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @param {(string | { l: string, r: string })} wrapper
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static wrap(value: string, wrapper: string | { l: string, r: string }): string {
		return [(<any>wrapper).l || wrapper, value, (<any>wrapper).r || wrapper].join('');
	}

	/**
	 * Takes a value and splits it with the given separator.
	 *
	 * @static
	 * @param {string} value
	 * @param {(string | RegExp)} separator
	 * @returns {string[]}
	 * @memberOf StringExtensions
	 */
	static split(value: string, separator: string | RegExp): string[] {
		return value.split(separator);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} base
	 * @param {(string | RegExp)} value
	 * @returns {boolean}
	 * @memberOf StringExtensions
	 */
	static contains(base: string, value: string | RegExp): boolean {
		const regex = Conditions.isString(value) ? new RegExp(<string>value, 'g') : <RegExp>value;
		return regex.test(base);
	}

	/**
	 *
	 *
	 * @static
	 * @param {...string[]} values
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static concat(...values: any[]): string {
		let result = '';

		values.forEach((value) => {
			if (!Conditions.isString(value)) {
				value = StringExtensions.toString(value);
			}

			result += value;
		});

		return result;
	}

	/**
	 * Convert the given value to match the camel case pattern.
	 *
	 * @static
	 * @param {string} value
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static camelCase(value: string): string {
		return value.replace(/-+(.)?/g, (match: string, char: string) => {
			return !Conditions.isNullOrEmpty(char) ? char.toUpperCase() : '';
		});
	}

	/**
	 * Add dashs to the given value.
	 *
	 * @static
	 * @param {string} value
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static dasherize(value: string): string {
		return value.replace(/([A-Z])/g, '-$1')
								.replace(/[-_\s]+/g, '-')
								.toLowerCase();
	}

	/**
	 * Escapes all reserved characters for regular expressions by preceding them with a backslash.
	 *
	 * @static
	 * @param {string} value
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static escapeRegExp(value: string): string {
		return StringExtensions.replace(value, /[\\\[\]\/{}()*+?.$|^-]/g, '\\$&');
	}

	/**
	 * Removes whitespace from the beginning and end of the given value.
	 *
	 * @static
	 * @param {any} value
	 * @returns {string}
	 * @memberOf Utils
	 */
	static trim(value: string): string {
		return StringExtensions.replace(value, /^\s+|\s+$/g);
	}

	/**
	 * Converts the given value to a string.
	 *
	 * @static
	 * @param {*} value
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static toString(value: any): string {
		return !Conditions.isNullOrEmpty(value) ? `${value}` : '';
	}

	/**
	 * Replaces text in a string, using a regular expression or search string.
	 *
	 * @static
	 * @param {string} value
	 * @param {(string | RegExp)} searchValue
	 * @param {string} [replaceValue]
	 * @returns {string}
	 * @memberOf StringExtensions
	 */
	static replace(value: string, searchValue: string | RegExp, replaceValue?: string): string {
		return StringExtensions.toString(value).replace(searchValue, !Conditions.isNullOrEmpty(replaceValue) ? replaceValue : '');
	}

}