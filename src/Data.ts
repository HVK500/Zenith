import { Common } from './Common';
import { Conditions } from './Common/Conditions';

/**
 *
 *
 * @export
 * @class Data
 */
export class Data {

  /**
   *
   *
   * @static
   * @param {*} value
   * @returns {number}
   * @memberOf Data
   */
  static keyCount(value: any): number {
    let result = 0;

    if (Conditions.isObject(value)) {
      Common.each(value, (key) => {
        result++;
      });
    }

    return result;
  }

  /**
   *
   *
   * @static
   * @param {*} value
   * @returns {any[]}
   * @memberOf Data
   */
  static keys(value: any): any[] {
    let result = [];

    if (Conditions.isObject(value)) {
      Common.each(value, (key) => { result.push(key); });
    }

    return result;
  }

  /**
   * Adds the given value from the given collection.
   *
   * @static
   * @param {any[]} collection
   * @param {(any | any[])} value
   * @returns {any[]}
   * @memberof Data
   */
  static addCollectionItem(collection: any[], value: any | any[]): any[] {
    if (!Conditions.isArray(value)) {
      value = [value];
    }

    Common.each(value, (item) => {
      collection.push(item);
    });

    return collection;
  }

  /**
   * Removes the given value from the given collection.
   *
   * @static
   * @param {any[]} collection
   * @param {(any | any[])} value
   * @returns {any[]}
   * @memberof Data
   */
  static removeCollectionItem(collection: any[], value: any | any[]): any[] {
    // If single item is passed in then convert it to an array
    if (!Conditions.isArray(value)) {
      value = [value];
    }

    Common.each(value, (item) => {
      const targetIndex = collection.findIndex((element) => {
        return element === item;
      });

      // Check if the Index was found, if not, return out
      if (!~targetIndex) return;

      collection.splice(targetIndex, 1);
    });

    return collection;
  }

  /**
   * Parses the given JSON string value and returns the de-serialized object.
   *
   * @static
   * @param {string} value
   * @returns {JSON}
   * @memberOf Data
   */
  static parseJSON(value: string): JSON {
    try {
      return JSON.parse(value);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Converts the given value into a JSON string.
   *
   * @static
   * @param {any} value
   * @returns {string}
   * @memberOf Data
   */
  static stringJSON(value: any): string {
    try {
      if (!Conditions.isObject(value)) {
        throw 'Invalid object';
      }

      return JSON.stringify(value);
    } catch (err) {
      throw err;
    }
  }

}