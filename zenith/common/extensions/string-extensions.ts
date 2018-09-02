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
    return value.split('').reverse().join('');
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
   * Replaces any white space with dashes in the given value.
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
   * Replaces text in a given string, using a regular expression or search string.
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
   * Removes text in a given string, using a regular expression or search string.
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
   * @param {boolean} [right=false]
   * @returns {string}
   */
  static padZero(value: string | number, length: number = 1, right: boolean = false): string {
    value = value.toString();

    const result: string[] = [ new Array(length).join('0') ];
    let operation = 'unshift';

    if (right) operation = 'push';

    return result[operation](value).join('');
  }

}
