import { Conditions } from '../conditions';

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
   */
  static quote(value: string): string {
    return StringExtensions.wrap(value, '"');
  }

  /**
   *
   *
   * @static
   * @param {string} value
   * @param {number} amount
   * @param {string} [separator]
   * @returns {string}
   */
  static repeat(value: string, amount: number, separator?: string): string {
    let result = null;
    amount = ~~amount;

    if (amount < 1) return '';

    if (Conditions.isNullOrEmpty(separator)) {
      result = '';
      while (amount > 0) {
        if (amount & 1) result += value;
        amount >>= 1, value += value;
      }

      return result;
    }

    for (result = []; amount > 0; result[--amount] = value) {}
    return result.join(separator);
  }

  /**
   *
   *
   * @static
   * @param {string} value
   * @param {number} length
   * @returns {string[]}
   */
  static chop(value: string, length: number): string[] {
    if (Conditions.isNullOrEmpty(value)) return [];
    length = ~~length;
    return length > 0 ? value.match(new RegExp(`.{1,${length}}`, 'g')) : [ value ];
  }

  /**
   *
   *
   * @static
   * @param {string} value
   * @returns {string}
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
   * @param {(string | { l?: string, r?: string })} wrapper
   * @returns {string}
   */
  static wrap(value: string, wrapper: string | { l?: string, r?: string }): string {
    const result = [];

    if (Conditions.isString(wrapper)) {
      result.push(wrapper, value, wrapper);
    } else {
      result.push(wrapper.l || '', value, wrapper.r || '');
    }

    return result.join('');
  }

  /**
   * Takes a value and splits it with the given separator.
   *
   * @static
   * @param {string} value
   * @param {(string | RegExp)} separator
   * @returns {string[]}
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
   */
  static contains(base: string, value: string | RegExp): boolean {
    const regex = Conditions.isString(value) ? new RegExp(StringExtensions.escapeRegExp(<string>value), 'g') : <RegExp>value;
    return regex.test(base);
  }

  /**
   *
   *
   * @static
   * @param {...string[]} values
   * @returns {string}
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
   */
  static camelCase(value: string): string {
    return value.replace(/-+(.)?/g, (match: string, char: string) => {
      return Conditions.isNullOrEmpty(char) ? '' : char.toUpperCase();
    });
  }

  /**
   * Replaces any white space with dashs in the given value.
   *
   * @static
   * @param {string} value
   * @returns {string}
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
   */
  static toString(value: any): string {
    return Conditions.isNullOrEmpty(value) ? '' : value.toString();
  }

  /**
   * TODO
   *
   * @static
   * @param {string} value TODO
   * @returns {number} TODO
   */
  static toNumber(value: string): number {
    return +value;
  }

  /**
   * Replaces text in a string, using a regular expression or search string.
   *
   * @static
   * @param {string} value
   * @param {(string | RegExp)} search
   * @param {(string | ((substring: string, ...args: any[]) => string))} [replacer]
   * @returns {string}
   */
  static replace(value: string, search: string | RegExp, replacer?: string | ((substring: string, ...args: any[]) => string)): string {
    return value.replace(search, Conditions.isNullOrEmpty(replacer) ? '' : <string>replacer);
  }

  /**
   * Removes text in a string, using a regular expression or search string.
   *
   * @static
   * @param {string} value
   * @param {(string | RegExp)} search
   * @returns {string}
   */
  static remove(value: string, search: string | RegExp): string {
    return StringExtensions.replace(value, search);
  }

  /**
   * Pad the given value with the specified number of zeros.
   *
   * @static
   * @param {(string | number)} value
   * @param {number} [length=1]
   * @returns {string}
   */
  static padZero(value: string | number, length: number = 1): string {
    length -= StringExtensions.toString(value).length;

    if (length > 0) {
      return StringExtensions.concat(new Array(length + (/\./.test(<string>value) ? 2 : 1)).join('0'), value);
    }

    return <string>value;
  }

}
