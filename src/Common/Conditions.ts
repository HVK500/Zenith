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
   * @memberOf Checks
   */
  private static isEmptyObject(value: any): boolean {
    for (let name in value) return false;
    return true;
  }

  /**
   * Checks whether the given value is empty.
   *
   * @static
   * @param {(any[] | any)} value
   * @returns {boolean}
   * @memberOf Checks
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
   * @memberOf Checks
   */
  static isFunction(value: any): value is Function {
    return Conditions.isType(value, 'function') &&
          !value['item']; // Item check is a work-around for webkit bug 14547
  }

  // /**
  //  * Checks whether the given value is a list.
  //  *
  //  * @static
  //  * @param {*} value
  //  * @returns {boolean}
  //  * @memberOf Checks
  //  */
  // static isList(value: any): boolean {
  // 	return !Conditions.isEmpty(value) &&
  // 				!Conditions.isEmpty(value.length) &&
  // 				!Conditions.isString(value) &&
  // 				!Conditions.isNode(value) &&
  // 				!Conditions.isFunction(value) &&
  // 				value !== window;
  // }

  /**
   * Checks whether the given value is an array.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   * @memberOf Checks
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
   * @memberOf Checks
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
   * @memberOf Checks
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
   * @memberOf Checks
   */
  static isObject(value: any): value is object {
    return !!value && Conditions.isType(value, 'object');
  }

  /**
   * Checks whether the given value is node.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   * @memberOf Checks
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
   * @memberOf Checks
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
   * @memberOf Checks
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
   * @memberOf Checks
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
   * @memberOf Conditions
   */
  static objectsEqual(value: any, comparison: any): boolean {
    if (!(Conditions.isObject(value) && Conditions.isObject(comparison))) {
      return false;
    }

    return JSON.stringify(value) === JSON.stringify(comparison);
  }

  // /**
  //  * Checks whether the given value is one of the basic types. (strings, booleans and numbers)
  //  *
  //  * @static
  //  * @param {*} value
  //  * @returns {boolean}
  //  * @memberOf Checks
  //  */
  // static isValue(value: any): boolean {
  // 	const type = typeof value;
  // 	// tslint:disable-next-line:triple-equals
  // 	return type == 'object' ? !!(value && value['getDay']) : (type == 'string' || type == 'number' || Conditions.isBool(value));
  // }

  /**
   * Checks whether the given value begins with the given character.
   *
   * @static
   * @param {string} value
   * @param {string} char
   * @returns {boolean}
   * @memberOf Checks
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
   * @memberOf Checks
   */
  static endsWith(value: string, char: string): boolean {
    return value[value.length - 1] === char;
  }

}
