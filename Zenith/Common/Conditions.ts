/**
 *
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
   * @param {*} value
   * @returns {boolean}
   */
  private static isEmptyObject(value: any): boolean {
    for (let name in value) return false;
    return true;
  }

  /**
   * Checks whether the given array value has no elements.
   *
   * @static
   * @param {any[]} value
   * @returns {boolean}
   */
  static isArrayEmpty(value: any[]): boolean {
    return !!~~value.length;
  }

  /**
   * Checks whether the given value is undefined.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   */
  static isUndefined(value: any): value is undefined {
    return Conditions.isType(value, 'undefined');
  }

  /**
   * Checks whether the given value is empty.
   *
   * @static
   * @param {(any[] | any)} value
   * @returns {boolean}
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
   * @param {*} value
   * @returns {boolean}
   */
  static isFunction(value: any): value is Function {
    return Conditions.isType(value, 'function') && !value['item'];
  }

  /**
   * Checks whether the given value is an array.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   */
  static isArray(value: any): boolean {
    if (Array.isArray) return Array.isArray(value);
    return value instanceof Array;
  }

  /**
   * Checks whether the given value is equal to the given type.
   *
   * @static
   * @param {*} value
   * @param {string} type
   * @returns {boolean}
   */
  static isType(value: any, type: string): boolean {
    // tslint:disable-next-line:triple-equals
    return typeof value == type;
  }

  /**
   * Checks whether the given value is of type string.
   *
   * @static
   * @param {any} value
   * @returns {boolean}
   */
  static isString(value: any): value is string {
    // tslint:disable-next-line:triple-equals
    return Conditions.isType(value, 'string');
  }

  /**
   * Checks whether the given value is a object.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   */
  static isObject(value: any): value is object {
    return !!value && Conditions.isType(value, 'object');
  }

  /**
   * Checks whether the given value is a node.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   */
  static isNode(value: any): boolean {
    return value && value['nodeType'];
  }

  /**
   * Checks whether the given value is numeric.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   */
  static isNumber(value: any): value is number {
    return Conditions.isType(value, 'number');
  }

  /**
   * Checks whether the given value is a date reference.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   */
  static isDate(value: any): boolean {
    return Conditions.isObject(value) && !!value['getDay'];
  }

  /**
   * Checks whether the given value is true or false.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   */
  static isBool(value: any): value is boolean {
    return value === true || value === false;
  }


  /**
   * Checks whether the given objects are the same.
   *
   * @static
   * @param {*} value
   * @param {*} comparison
   * @returns {boolean}
   */
  static objectsEqual(value: any, comparison: any): boolean {
    if (!(Conditions.isObject(value) && Conditions.isObject(comparison))) {
      return false;
    }

    return JSON.stringify(value) === JSON.stringify(comparison);
  }

  /**
   * Checks whether the given value begins with the given character.
   *
   * @static
   * @param {string} value
   * @param {string} char
   * @returns {boolean}
   */
  static beginsWith(value: string, char: string): boolean {
    return value[0] === char;
  }

  /**
   * Checks whether the given value ends with the given character.
   *
   * @static
   * @param {string} value
   * @param {string} char
   * @returns {boolean}
   */
  static endsWith(value: string, char: string): boolean {
    return value[value.length - 1] === char;
  }

}
