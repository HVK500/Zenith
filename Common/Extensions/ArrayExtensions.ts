import { Conditions } from '../Conditions';
import { Util } from '../Util';

/**
 *
 *
 * @export
 * @class ArrayExtensions
 */
export class ArrayExtensions {

  /**
   * Takes a given value and converts it to an array containing just the passed value, if it is the only item.
   *
   * @private
   * @param {*} value
   * @returns {any[]}
   * @memberof ArrayExtensions
   */
  private static convertSingleToCollection(value: any | any[]): any[] {
    if (!Conditions.isArray(value)) {
      value = [value];
    }

    return value;
  }

  /**
   *
   *
   * @private
   * @static
   * @param {any[]} collection
   * @param {(any | any[])} value
   * @param {(item: any, value?: any, index?: number) => void} callback
   * @returns {any[]}
   * @memberof ArrayExtensions
   */
  private static processItems(collection: any[], value: any | any[], callback: (item: any, value?: any, index?: number) => void): any[] {
    ArrayExtensions.convertSingleToCollection(value);
    Util.each(value, callback);
    return collection;
  }

  /**
   * Adds the given value from the given collection.
   *
   * @static
   * @param {any[]} collection
   * @returns {any[]}
   * @memberof ArrayExtensions
   */
  static add(collection: any[], value: any | any[]): any[] {
    ArrayExtensions.processItems(collection, value, (item: any) => {
      collection.push(item);
    });
    return collection;
  }

  /**
   *
   *
   * @static
   * @param {any[]} collection
   * @param {(any | any[])} value
   * @returns {any[]}
   * @memberof ArrayExtensions
   */
  static addToStart(collection: any[], value: any | any[]): any[] {
    ArrayExtensions.processItems(collection, value, (item: any) => {
      collection.unshift(item);
    });
    return collection;
  }

  /**
   *
   *
   * @static
   * @param {any[]} collection
   * @param {(item: any, index: number, collection: any[]) => boolean} callback
   * @returns {boolean}
   * @memberof ArrayExtensions
   */
  static all(collection: any[], callback: (item: any, index: number, collection: any[]) => boolean): boolean {
    return collection.every(callback);
  }

  /**
   * Removes the given value(s) from the given collection.
   *
   * @static
   * @param {any[]} collection
   * @param {(any | any[])} value
   * @returns {any[]}
   * @memberof ArrayExtensions
   */
  static removeByValue(collection: any[], value: any | any[]): any[] {
    ArrayExtensions.processItems(collection, value, (targetValue: any) => {
      collection = Util.filter(collection, (listItem: any) => {
        return targetValue !== listItem;
      });
    });

    return collection;
  }

  /**
   * Removes the given index/indices from the given collection.
   *
   * @static
   * @param {any[]} collection
   * @param {(any | any[])} value
   * @returns {any[]}
   * @memberof ArrayExtensions
   */
  static removeByIndex(collection: any[], value: any | any[]): any[] {
    ArrayExtensions.processItems(collection, value, (targetIndex: number) => {
      collection.splice(targetIndex, 1);
    });

    return collection;
  }

}
