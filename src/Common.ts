import { Conditions } from './Common/Conditions';
import { ElementExtensions } from './Common/Extensions/ElementExtensions';
import { Logger } from './Common/Logger';
import { NumberExtensions } from './Common/Extensions/NumberExtensions';
import { StringExtensions } from './Common/Extensions/StringExtensions';

/**
 *
 *
 * @export
 * @class Common
 */
export class Common {
  static Conditions = Conditions;
  static Extensions = {
    Element: ElementExtensions,
    Number: NumberExtensions,
    String: StringExtensions
  };
  static Logger = Logger;

  /**
   * Loop through all items in an given object, passing this information to a given callback.
   *
   * @private
   * @static
   * @param {{ [x: string]: any }} obj
   * @param {(key: any, value?: any, index?: number) => void} callback
   * @returns {*}
   * @memberOf Common
   */
  private static eachObj(obj: { [x: string]: any }, callback: (key: string, value?: any, index?: number) => void): any {
    if (!Conditions.isObject(obj)) return obj;

    let index = 0;
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      callback.call(key, obj[key], index);
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
   * @memberOf Common
   */
  static filter<T>(subject: T[], callbackOrItem: ((value: T, index: number, array: T[]) => boolean) | T): T[] { // TODO: possibly remove the generic T
    // tslint:disable-next-line:triple-equals
    const defaultCallback = (value: T, index: number, array: T[]) => { return <T>callbackOrItem != value; };
    const callback = Conditions.isFunction(callbackOrItem) ? callbackOrItem : defaultCallback;

    return subject.filter(callback);
  }

  /**
   * Loop through all items in an given array or object, passing this information to a given callback.
   *
   * @static
   * @param {({ [x: string]: any } | any[])} subject
   * @param {(item: any, value?: any | any[], index?: number) => void} callback
   * @returns {*}
   * @memberOf Common
   */
  static each(subject: { [x: string]: any } | any[], callback: (item: any, value?: any | any[], index?: number) => void): any {
    if (Conditions.isNode(subject) || Conditions.isArray(subject)) { // TODO: Investigate whether the node check is needed?
      for (let i = 0; i < (<any[]>subject).length; i++) {
        callback.call((<any[]>subject)[i], <any[]>subject, i);
      }
    } else if (Conditions.isObject(subject)) {
      Common.eachObj(subject, callback);
    }

    return subject;
  }

  /**
   * A method that does nothing.
   *
   * @static
   * @param {...any[]} value
   * @returns {*}
   * @memberOf Common
   */
  static noop(...value: any[]): any {
    return value;
  }

}
