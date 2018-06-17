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
   * Takes a given value and converts it to an array containing just the given value, if it is the only item.
   *
   * @private
   * @param {*} value A starter value.
   * @returns {any[]} The value parameter wrapped in an array.
   */
  private static convertSingleToCollection(value: any | any[]): any[] {
    if (!Conditions.isArray(value)) {
      value = [value];
    }

    return value;
  }

  /**
   * Provides a loop layer that can be used in any methods that need to take in multiple values and loop through them.
   *
   * @private
   * @static
   * @param {any[]} collection The subject array.
   * @param {(any | any[])} value The value(s) to be looped through.
   * @param {(item: any, value?: any, index?: number) => void} callback A generic loop function.
   * @returns {any[]} The given array.
   */
  private static processItems(collection: any[], value: any | any[], callback: (item: any, value?: any, index?: number) => void): any[] {
    ArrayExtensions.convertSingleToCollection(value);
    Util.each(value, callback);
    return collection;
  }

  /**
   * Adds the given value(s) to the end of a given collection.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(any | any[])} value
   * @param {(addedItem: any) => void} [callback]
   * @returns {any[]}
   */
  static add(collection: any[], value: any | any[], callback?: (addedItem: any) => void): any[] {
    ArrayExtensions.processItems(collection, value, (item: any) => {
      collection.push(item);
      Util.runCallback(callback, item);
    });

    return collection;
  }

  /**
   *
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(any | any[])} value
   * @param {(addedItem: any) => void} [callback]
   * @returns {any[]}
   */
  static addToStart(collection: any[], value: any | any[], callback?: (addedItem: any) => void): any[] {
    ArrayExtensions.processItems(collection, value, (item: any) => {
      collection.unshift(item);
      Util.runCallback(callback, item);
    });

    return collection;
  }

  /**
   * Removes the given value(s) from the given array.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(any | any[])} value
   * @param {(addedItem: any) => void} [callback]
   * @returns {any[]}
   */
  static removeByValue(collection: any[], value: any | any[], callback?: (removedItem: any) => void): any[] {
    ArrayExtensions.processItems(collection, value, (targetItem: any) => {
      collection = Util.filter(collection, (listItem: any) => {
        const result = targetItem !== listItem;
        if (result) Util.runCallback(callback, targetItem);
        return result;
      });
    });

    return collection;
  }

  /**
   * Removes the given index/indices from the given array.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(any | any[])} value
   * @param {(removedIndex: any) => void} [callback]
   * @returns {any[]}
   */
  static removeByIndex(collection: any[], value: any | any[], callback?: (removedIndex: any) => void): any[] {
    ArrayExtensions.processItems(collection, value, (index: number) => {
      collection.splice(index, 1);
      Util.runCallback(callback, index);
    });

    return collection;
  }

  /**
   * Removes the first element of the given array.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(removedIndex: any) => void} [callback]
   * @returns {*}
   */
  static removeFirst(collection: any[], callback?: (removedIndex: any) => void): any {
    const removedItem = collection.shift();
    Util.runCallback(callback, removedItem);

    return removedItem;
  }

  /**
   * Removes the last element of the given array.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(removedIndex: any) => void} [callback]
   * @returns {*} The value removed from the array.
   */
  static removeLast(collection: any[], callback?: (removedIndex: any) => void): any {
    const removedItem = collection.pop();
    Util.runCallback(callback, removedItem);

    return removedItem;
  }

  /**
   * Returns the value of the first element in the array that satisfies the given test callback.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(item: any, index: number, list: any[]) => boolean} callback
   * @returns {*} Found value or undefined if nothing is found.
   */
  static find(collection: any[], callback: (item: any, index: number, list: any[]) => boolean): any {
    return collection.find(callback);
  }

  /**
   * Determines whether a given value is contained in the given array.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {*} value The search value.
   * @param {number} [startIndex=0] The index to start searching from. Default is the start of the array.
   * @returns {boolean} Whether or not the given item was found.
   */
  static contains(collection: any[], value: any, startIndex: number = 0): boolean {
    return collection.includes(value, startIndex);
  }

  /**
   * Determines whether all the elements of an array satisfies the given test callback.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(item: any, index: number, collection: any[]) => boolean} callback
   * @returns {boolean} Whether or not all the elements of the given array satisfy the given test callback.
   */
  static all(collection: any[], callback: (item: any, index: number, collection: any[]) => boolean): boolean {
    return collection.every(callback);
  }

  /**
   * Returns the index of the first occurrence of a given value in a array.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {*} value The search value.
   * @param {number} [startIndex=0] The index to start searching from. Default is the start of the array.
   * @returns {number} Index of matched value or null if nothing matchs.
   */
  static indexOf(collection: any[], value: any, startIndex: number = 0): number {
    const result = collection.indexOf(value, startIndex);
    return result !== -1 ? result : null;
  }

  /**
   * Returns the index of the last occurrence of a given value in a array, if values is not found null is returned.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {*} value The search value.
   * @param {number} [startIndex=collection.length - 1] The index to start searching from. Default is the end of the array.
   * @returns {number} Index of matched value or null if nothing matchs.
   */
  static lastIndexOf(collection: any[], value: any, startIndex: number = collection.length - 1): number {
    const result = collection.lastIndexOf(value, startIndex);
    return result !== -1 ? result : null;
  }

  /**
   * Sorts a given array by the given callback, if omitted it is sorted according to each character's Unicode point value.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(a: any, b: any) => number} [callback] Function that defines the sort order.
   * @returns {any[]} The sorted array.
   */
  static sort(collection: any[], callback?: (a: any, b: any) => number): any[] {
    return collection.sort(callback);
  }

  /**
   * Reverses the order of the given array.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @returns {any[]} The reversed array.
   */
  static reverse(collection: any[]): any[] {
    return collection.reverse();
  }

  /**
   * Determines whether the given callback returns true for any element of an array.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {(item: any, index: number, collection: any[]) => boolean} [callback] Function that outlines whether a item exists with the given match constraints.
   * @returns {boolean} Whether or not the callback matched any element in the given array.
   */
  static exists(collection: any[], callback?: (item: any, index: number, collection: any[]) => boolean): boolean {
    return collection.some(callback);
  }

  /**
   * Adds all the elements of an array separated by the specified separator string.
   *
   * @static
   * @param {any[]} collection The subject array.
   * @param {string} [separator=' '] A optional separator that is inserted between each array element. Default value is a whitespace.
   * @returns {string} The given array's elements concatenated together with the given separator.
   */
  static concatAll(collection: any[], separator: string = ' '): string {
    return collection.join(separator);
  }

}
