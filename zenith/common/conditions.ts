/**
 * A collection of conditional checks, that provide boolean results for given input values.
 *
 * @export
 * @class Conditions
 */
export class Conditions {
  /**
   * Checks whether the given value begins with the given character.
   *
   * @static
   * @param {string} value The value that the given character is matched against.
   * @param {string} char The character that should be matched with the end character of the given value.
   * @returns {boolean} Whether the given value begins with the given character.
   */
  public static beginsWith(value: string, char: string): boolean {
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
  public static endsWith(value: string, char: string): boolean {
    return value[value.length - 1] === char;
  }

  /**
   * Excutes a given callback. Voids the call if nothing was provided.
   *
   * @static
   * @param {Function} callback A function to be called.
   * @param {...any[]} args Any arguments to be passed in to the given callback.
   */
  public static callOrVoid(callback: Function, ...args: any[]): void {
    Conditions.isFunction(callback) && callback(...args);
  }

  /**
   *
   *
   * @static
   * @template T
   * @param {T} value
   * @param {T} defaultValue
   * @returns {T}
   */
  public static getValueOrDefault<T>(value: T, defaultValue: T): T {
    return Conditions.isNullOrEmpty(value) ? defaultValue : value;
  }

  /**
   * Checks whether the given value is an array.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is an array.
   */
  public static isArray(value: any): value is any[] {
    if (Array.isArray) return Array.isArray(value);
    return value instanceof Array;
  }

  /**
   * Checks whether the given array value has no elements.
   *
   * @static
   * @param {any[]} value The value to be checked.
   * @returns {boolean} Whether the given array value has no elements.
   */
  public static isArrayEmpty(value: any[]): boolean {
    return !~~value.length;
  }

  /**
   * Checks whether the given value is a boolean value.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a boolean value.
   */
  public static isBool(value: any): value is boolean {
    return value === true || value === false;
  }

  /**
   * Checks whether the given value is a date reference.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a date reference.
   */
  public static isDate(value: any): boolean {
    return Conditions.isObject(value) && !!value['getDay'];
  }

  /**
   * Checks whether the given value is a function.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a function.
   */
  public static isFunction(value: any): value is Function {
    return Conditions.isType(value, 'function') && !value['item'];
  }

  /**
   *
   *
   * @static
   * @template T
   * @param {*} value
   * @param {*} inst
   * @returns {value is T}
   */
  public static isInstance<T>(value: any, inst: any): value is T {
    return value instanceof inst;
  }

  /**
   * Checks whether the given value is a node.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a node.
   */
  public static isNode(value: any): boolean {
    return value && value['nodeType'];
  }

  /**
   * Checks whether the given value is a node list.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a node list.
   */
  public static isNodeList(value: any): boolean {
    return value && NodeList.prototype.isPrototypeOf(value);
  }

  /**
   * Checks whether the given value is empty.
   *
   * @static
   * @param {(any[] | any)} value The value to be checked.
   * @returns {boolean} Whether the given value is empty.
   */
  public static isNullOrEmpty(value: any | any[]): boolean {
    return value == null ||
      (Conditions.isString(value) && value === '') ||
      (Conditions.isArray(value) && Conditions.isArrayEmpty(value)) ||
      (Conditions.isObject(value) && Conditions.isEmptyObject(value));
  }

  /**
   * Checks whether the given value is numeric.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is numeric.
   */
  public static isNumber(value: any): value is number {
    return Conditions.isType(value, 'number');
  }

  /**
   * Checks whether the given value is a object.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is a object.
   */
  public static isObject(value: any): value is object {
    return !!value && Conditions.isType(value, 'object');
  }

  /**
   * Checks whether the given value is of type string.
   *
   * @static
   * @param {any} value The value to be checked.
   * @returns {boolean} Whether the given value is of type string.
   */
  public static isString(value: any): value is string {
    return Conditions.isType(value, 'string');
  }

  /**
   * Checks whether the given value is equal to the given type.
   *
   * @static
   * @param {*} value The value to be checked.
   * @param {string} type The type that the value is being checked for.
   * @returns {boolean} Whether the given value is equal to the given type.
   */
  public static isType(value: any, type: string): boolean {
    // tslint:disable-next-line:triple-equals
    return typeof value == type;
  }

  /**
   * Checks whether the given value is undefined.
   *
   * @static
   * @param {*} value The value to be checked.
   * @returns {boolean} Whether the given value is undefined.
   */
  public static isUndefined(value: any): value is undefined {
    return Conditions.isType(value, 'undefined');
  }

  /**
   * Checks whether the given object value contains the given property.
   *
   * @static
   * @param {object} value The object to be checked.
   * @param {string | number} prop The expected object property.
   * @returns {boolean} Whether the property is found in the given object value.
   */
  public static objectContains(value: object, prop: string | number): boolean {
    if (!Conditions.isObject(value)) return false;
    return value.hasOwnProperty(prop);
  }

  /**
   * Checks whether the given objects are the same.
   *
   * @static
   * @param {*} value The first comparison object.
   * @param {*} comparison The second comparison object.
   * @returns {boolean} Whether the given objects are the same.
   */
  public static objectsEqual(value: any, comparison: any): boolean {
    if (!Conditions.isObject(value) && !Conditions.isObject(comparison)) {
      return false;
    }

    return JSON.stringify(value) === JSON.stringify(comparison);
  }

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
}
