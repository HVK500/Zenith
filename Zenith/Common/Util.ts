import { Conditions } from './Conditions';

/**
 *
 *
 * @export
 * @class Util
 */
export class Util {

  /**
   * Loop through all items in an given object, passing the meta data of the given value to a given callback.
   *
   * @private
   * @static
   * @param {{ [x: string]: any }} obj
   * @param {(key: any, value?: any, index?: number) => void} callback
   * @returns {*}
   */
  private static eachObj(obj: { [x: string]: any }, callback: (key: string, value?: any, index?: number) => void): any {
    if (!Conditions.isObject(obj)) return obj;

    let index = 0;
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      callback.call(null, key, obj[key], index); // TODO: Pass the context through, currently null
      index++;
    }

    return obj;
  }

  /**
   * Filters the given array value with the given filter condition or match item.
   *
   * @static
   * @template T The parent type of the subject to be iterated over.
   * @param {T[]} subject
   * @param {(((value: T, index: number, array: T[]) => boolean) | T)} callbackOrItem
   * @returns {T[]}
   */
  static filter<T>(subject: T[], callbackOrItem: ((value: T, index: number, array: T[]) => boolean) | T): T[] { // TODO: possibly remove the generic T
    // tslint:disable-next-line:triple-equals
    const defaultCallback = (value: T, index: number, array: T[]) => { return <T>callbackOrItem != value; };
    const callback = Conditions.isFunction(callbackOrItem) ? callbackOrItem : defaultCallback;

    return subject.filter(callback);
  }

  /**
   * Loop through all items in an given array or object, passing the meta data of the given value to a given callback.
   *
   * @static
   * @param {({ [x: string]: any } | any[])} subject
   * @param {(item: any, value?: any | any[], index?: number) => void} callback
   * @returns {*}
   */
  static each(subject: { [x: string]: any } | any[], callback: (item: any, value?: any | any[], index?: number) => void): any {
    if (Conditions.isNode(subject) || Conditions.isArray(subject)) { // TODO: Investigate whether the node check is needed?
      for (let i = 0; i < (<any[]>subject).length; i++) {
        callback.call(null, (<any[]>subject)[i], <any[]>subject, i);
      }
    } else if (Conditions.isObject(subject)) {
      Util.eachObj(subject, callback);
    }

    return subject;
  }

  /**
   * Runs a given callback if provided.
   *
   * @static
   * @param {Function} callback
   * @param {...any[]} args
   */
  static executeCallback(callback: Function, ...args: any[]): void {
    Conditions.isFunction(callback) && callback(...args);
  }

  /**
   * Takes a given value and converts it to an array containing just the given value, if it is the only item.
   *
   * @param {*} value A starter value.
   * @returns {any[]} The value parameter wrapped in an array.
   */
  static convertSingleToCollection(value: any | any[]): any[] {
    if (!Conditions.isArray(value)) {
      value = [value];
    }

    return value;
  }

  /**
   * A method that does nothing.
   *
   * @static
   * @param {...any[]} value
   * @returns {*}
   */
  static noop(...value: any[]): any {
    return value;
  }

}
