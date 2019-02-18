/**
 * A collection of conditional checks, that provide boolean results for given input values.
 *
 * @export
 * @class Conditions
 */
export declare class Conditions {
    /**
     * Checks whether the given value begins with the given character.
     *
     * @static
     * @param {string} value The value that the given character is matched against.
     * @param {string} char The character that should be matched with the end character of the given value.
     * @returns {boolean} Whether the given value begins with the given character.
     */
    static beginsWith(value: string, char: string): boolean;
    /**
     * Excutes a given callback. Voids the call if nothing was provided.
     *
     * @static
     * @param {Function} callback A function to be called.
     * @param {...any[]} args Any arguments to be passed in to the given callback.
     */
    static callOrVoid(callback: Function, ...args: any[]): void;
    /**
     * Checks whether the given value ends with the given character.
     *
     * @static
     * @param {string} value The value that the given character is matched against.
     * @param {string} char The character that should be matched with the end character of the given value.
     * @returns {boolean} Whether the given value ends with the given character.
     */
    static endsWith(value: string, char: string): boolean;
    /**
     * Providess an inline method of checking whether the value exists,
     * if not the given default will be used instead.
     *
     * @static
     * @template T The resulting value type.
     * @param {T} value The value to be checked.
     * @param {T} defaultValue The default value to used when the given value
     * is empty.
     * @returns {T} The resulting value.
     */
    static getValueOrDefault<T>(value: T, defaultValue: T): T;
    /**
     * Provides an inline method of preforming an "if" check whether a given
     * condition is true or false, a respective callback will be execute depending
     * on the result of the condition.
     *
     * @static
     * @template T The resulting value type.
     * @param {boolean} condition The given condition that dictates which callback to execute.
     * @param {() => T} trueCallback The given truthy callback.
     * @param {() => T} falseCallback The given falsy callback.
     * @returns {T} The resulting condition callback value.
     */
    static if<T>(condition: boolean, trueCallback: () => T, falseCallback: () => T): T;
    /**
     * Checks whether the given value is an array.
     *
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is an array.
     */
    static isArray(value: any): value is any[];
    /**
     * Checks whether the given array value has no elements.
     *
     * @static
     * @param {any[]} value The value to be checked.
     * @returns {boolean} Whether the given array value has no elements.
     */
    static isArrayEmpty(value: any[]): boolean;
    /**
     * Checks whether the given value is a boolean value.
     *
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is a boolean value.
     */
    static isBool(value: any): value is boolean;
    /**
     * Checks whether the given value is a date reference.
     *
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is a date reference.
     */
    static isDate(value: any): value is Date;
    /**
     * Checks whether the given value is a function.
     *
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is a function.
     */
    static isFunction(value: any): value is Function;
    /**
     * Determines whether the given value is an expected given
     * instance of a class.
     *
     * @static
     * @template T The expected class type.
     * @param {*} value The value to be checked.
     * @param {*} inst The class that the given value will be compared against.
     * @returns {value is T} Whether the given value is an instance of
     * the given expected class.
     */
    static isInstance<T>(value: any, inst: any): value is T;
    /**
     * Checks whether the given value is a node.
     *
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is a node.
     */
    static isNode(value: any): value is Node;
    /**
     * Checks whether the given value is a node list.
     *
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is a node list.
     */
    static isNodeList(value: any): value is NodeList;
    /**
     * Checks whether the given value is empty.
     *
     * @static
     * @param {(any[] | any)} value The value to be checked.
     * @returns {boolean} Whether the given value is empty.
     */
    static isNullOrEmpty(value: any | any[]): boolean;
    /**
     * Checks whether the given value is numeric.
     *
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is numeric.
     */
    static isNumber(value: any): value is number;
    /**
     * Checks whether the given value is a object.
     *
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is a object.
     */
    static isObject(value: any): value is object;
    /**
     * Checks whether the given value is of type string.
     *
     * @static
     * @param {any} value The value to be checked.
     * @returns {boolean} Whether the given value is of type string.
     */
    static isString(value: any): value is string;
    /**
     * Checks whether the given value is equal to the given type.
     *
     * @static
     * @param {*} value The value to be checked.
     * @param {string} type The type that the value is being checked for.
     * @returns {boolean} Whether the given value is equal to the given type.
     */
    static isType(value: any, type: string): boolean;
    /**
     * Checks whether the given value is undefined.
     *
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is undefined.
     */
    static isUndefined(value: any): value is undefined;
    /**
     * Checks whether the given object value contains the given property.
     *
     * @static
     * @param {object} value The object to be checked.
     * @param {string | number} prop The expected object property.
     * @returns {boolean} Whether the property is found in the given object value.
     */
    static objectContains(value: object, prop: string | number): boolean;
    /**
     * Checks whether the given objects are the same.
     *
     * @static
     * @param {*} value The first comparison object.
     * @param {*} comparison The second comparison object.
     * @returns {boolean} Whether the given objects are the same.
     */
    static objectsEqual(value: any, comparison: any): boolean;
    /**
     * Checks whether the given value is an empty object.
     *
     * @private
     * @static
     * @param {*} value The value to be checked.
     * @returns {boolean} Whether the given value is an empty object.
     */
    private static isEmptyObject;
}
