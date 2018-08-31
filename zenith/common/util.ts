import { ArrayLoopCallback, KeyValuePair, ObjectLoopCallback } from '../common-internals';
import { Conditions } from './conditions';

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
   * @template T As the provided type.
   * @param {{ [key: string]: T }} subject
   * @param {(value: T, key?: string, index?: number) => void} callback
   * @returns {T} The subject is returned.
   */
  private static eachObj<T>(subject: KeyValuePair<T>, callback: ObjectLoopCallback<T>): KeyValuePair<T> {
    if (!Conditions.isObject(subject)) return subject;

    let index = 0;
    for (let key in subject) {
      if (!subject.hasOwnProperty(key)) continue;
      callback.call(null, subject[key], key, index); // TODO: Pass the context through, currently null
      index++;
    }

    return <KeyValuePair<T>>subject;
  }

  /**
   * Builds up a custom callback with the child callbacks being integrated within the parent.
   *
   * @static
   * @param {(...callbacks: Function[]) => Function} parent The main callback that utilizes the child callbacks passed in.
   * @param {...Function[]} callbacks The callbacks the are required to be passed in to the parents context.
   * @returns A custom wrapped callback that is defined by the callbacks passed in.
   */
  static wrapCallback<T>(parent: (...callbacks: Function[]) => T, ...callbacks: Function[]) {
    return parent(...callbacks);
  }

  /**
   * Filters the given array value with the given filter condition or match item.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} subject
   * @param {(((value: T, index?: number, array?: T[]) => boolean) | T)} callbackOrItem
   * @returns {T[]} The subject is returned.
   */
  static filter<T>(subject: T[], callbackOrItem: ArrayLoopCallback<T, boolean> | T): T[] {
    const callback = Conditions.isFunction(callbackOrItem) ? callbackOrItem : (value: T): boolean => {
      // tslint:disable-next-line:triple-equals
      return <T>callbackOrItem != value;
    };

    return subject.filter(callback);
  }

  /**
   * Loop through all items in an given array or object, passing the meta data of the given value to a given callback.
   *
   * @static
   * @template T As the provided type.
   * @param {({ [key: string]: T } | T[])} subject
   * @param {(item: T, index?: number, array?: T[]) => void} callback for Array loop.
   * @param {(value: T, key?: string, index?: number) => void} callback for Object loop callback for Array loop
   * @returns {({ [key: string]: T } | T[])} The subject is returned.
   */
  static each<T>(subject: KeyValuePair<T> | T[], callback: ArrayLoopCallback<T, void> | ObjectLoopCallback<T>): KeyValuePair<T> | T[] {
    if (Conditions.isArray(subject) || Conditions.isNodeList(subject)) {
      for (let i = 0; i < (<T[]>subject).length; i++) {
        callback.call(null, (<T[]>subject)[i], <T[]>subject, i);
      }
    } else if (Conditions.isObject(subject)) {
      Util.eachObj(<KeyValuePair<T>>subject, <ObjectLoopCallback<T>>callback);
    }

    return <KeyValuePair<T> | T[]>subject;
  }

  /**
   * Excutes a given callback. Ignores the call if nothing was provided.
   *
   * @static
   * @param {Function} [callback] A function to be called.
   * @param {...any[]} [args] Any arguments to be passed in to the given callback.
   */
  static executeCallback(callback?: Function, ...args: any[]): void {
    Conditions.isFunction(callback) && callback(...args);
  }

  /**
   * Takes a given value and converts it to an array containing just the given value, if it is the only item.
   *
   * @param {*} value A starter value.
   * @returns {any[]} The value parameter wrapped in an array.
   */
  static convertSingleToCollection<T>(value: T | T[]): T[] {
    if (!Conditions.isArray(value)) {
      value = <T[]>[value];
    }

    return <T[]>value;
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
