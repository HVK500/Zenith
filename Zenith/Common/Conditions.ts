/**
 * A collection of conditional checks, that provide boolean results for given input values.
 *
 * @export
 * @class Conditions
 */
export class Conditions {

  /**
   * Checks whether the given value is an empty object.
   *
   * @private
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is an empty object.
   */
  private static isEmptyObject(value: any): boolean {
    for (let name in value) return false;
    return true;
  }

  /**
   * Checks whether the given array value has no elements.
   *
   * @static
   * @param {any[]} value The value to be checked.
   * @returns {boolean} Whether the given array value has no elements.
   */
  static isArrayEmpty(value: any[]): boolean {
    return !!~~value.length;
  }

  /**
   * Checks whether the given value is undefined.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is undefined.
   */
  static isUndefined(value: any): value is undefined {
    return Conditions.isType(value, 'undefined');
  }

  /**
   * Checks whether the given value is empty.
   *
   * @static
   * @param {(any[] | any)} value The value to be checked.
   * @returns {boolean} Whether the given value is empty.
   */
  static isNullOrEmpty(value: any | any[]): boolean {
    return value == null ||
          (Conditions.isString(value) && value === '') ||
          (Conditions.isArray(value) && !value.length) ||
          (Conditions.isObject(value) && Conditions.isEmptyObject(value));
  }

  /**
   * Checks whether the given value is a function.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a function.
   */
  static isFunction(value: any): value is Function {
    return Conditions.isType(value, 'function') && !value['item'];
  }

  /**
   * Checks whether the given value is an array.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is an array.
   */
  static isArray(value: any): boolean {
    if (Array.isArray) return Array.isArray(value);
    return value instanceof Array;
  }

  /**
   * Checks whether the given value is equal to the given type.
   *
   * @static
   * @param {*} value The value to be checked.
   * @param {string} type The type that the value is being checked for.
   * @returns {boolean} Whether the given value is equal to the given type.
   */
  static isType(value: any, type: string): boolean {
    // tslint:disable-next-line:triple-equals
    return typeof value == type;
  }

  /**
   * Checks whether the given value is of type string.
   *
   * @static
   * @param {any} value The value to be checked.
   * @returns {boolean} Whether the given value is of type string.
   */
  static isString(value: any): value is string {
    return Conditions.isType(value, 'string');
  }

  /**
   * Checks whether the given value is a object.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a object.
   */
  static isObject(value: any): value is object {
    return !!value && Conditions.isType(value, 'object');
  }

  /**
   * Checks whether the given value is a node.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a node.
   */
  static isNode(value: any): boolean {
    return value && value['nodeType'];
  }

  /**
   * Checks whether the given value is numeric.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is numeric.
   */
  static isNumber(value: any): value is number {
    return Conditions.isType(value, 'number');
  }

  /**
   * Checks whether the given value is a date reference.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a date reference.
   */
  static isDate(value: any): boolean {
    return Conditions.isObject(value) && !!value['getDay'];
  }

  /**
   * Checks whether the given value is a boolean value.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a boolean value.
   */
  static isBool(value: any): value is boolean {
    return value === true || value === false;
  }

  /**
   * Checks whether the given objects are the same.
   *
   * @static
   * @param {*} value The first comparison object.
   * @param {*} comparison The second comparison object.
   * @returns {boolean} Whether the given objects are the same.
   */
  static objectsEqual(value: any, comparison: any): boolean {
    if (!Conditions.isObject(value) && !Conditions.isObject(comparison)) {
      return false;
    }

    return JSON.stringify(value) === JSON.stringify(comparison);
  }

  /**
   * Checks whether the given value begins with the given character.
   *
   * @static
   * @param {string} value The value that the given character is matched against.
   * @param {string} char The character that should be matched with the end character of the given value.
   * @returns {boolean} Whether the given value begins with the given character.
   */
  static beginsWith(value: string, char: string): boolean {
    return value[0] === char;
  }

  /**
   * Checks whether the given value ends with the given character.
   *
   * @static
   * @param {string} value The value that the given character is matched against.
   * @param {string} char The character that should be matched with the end character of the given value.
   * @returns {boolean} Whether the given value ends with the given character.
   */
  static endsWith(value: string, char: string): boolean {
    return value[value.length - 1] === char;
  }

}
