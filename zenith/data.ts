import { Conditions } from './common/conditions';
import { List } from './data/list';
import { Queue } from './data/queue';
import { Storage } from './data/storage';
import { Util } from './common/util';
import { Identifiers } from './data/identifiers';

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
   */
  static Storage = Storage;

  /**
   *
   *
   * @static
   */
  static List = List;

  /**
   *
   *
   * @static
   */
  static Queue = Queue;

  /**
   *
   *
   * @static
   */
  static Identifiers = Identifiers;

  /**
   *
   *
   * @static
   * @param {*} value
   * @returns {number}
   */
  static keyCount(value: any): number {
    let result = 0;

    if (Conditions.isObject(value)) {
      Util.each(value, (key) => {
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
   */
  static keys(value: any): any[] {
    let result = [];

    if (Conditions.isObject(value)) {
      Util.each(value, (key) => { result.push(key); });
    }

    return result;
  }

  /**
   * Parses the given JSON string value and returns the de-serialized object.
   *
   * @static
   * @param {string} value
   * @returns {JSON}
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
   */
  static stringJSON(value: any): string {
    try {
      if (Conditions.isString(value)) {
        return value;
      } else if (!Conditions.isObject(value)) {
        throw 'Invalid object';
      }

      return JSON.stringify(value);
    } catch (err) {
      throw err;
    }
  }

}
