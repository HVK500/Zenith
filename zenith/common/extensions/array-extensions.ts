import { Conditions } from '../conditions';
import { Util } from '../util';
import { ArrayLoopCallback } from '../../common-internals';

/**
 * Collection of useful extensions to be used on Arrays.
 *
 * @export
 * @class ArrayExtensions
 */
export class ArrayExtensions {

  /**
   * Provides a loop layer that can be used in any methods that need to take in multiple values and loop through them.
   *
   * @private
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(T | T[])} value The value(s) to be looped through.
   * @param {(item: T, index?: number, collection?: T[]) => void} callback A generic loop function.
   * @returns {T[]} The given array.
   */
  private static processItems<T>(collection: T[], value: any | any[], callback: ArrayLoopCallback<any, void>): T[] {
    Util.each(Util.convertSingleToCollection<T>(value), callback);
    return collection;
  }

  /**
   * Adds the given value(s) to the end of a given collection.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(T | T[])} value The value(s) to be added to the end of the array.
   * @param {(addedItem: T) => void} [callback] A function that is called when a value as been added to the array.
   * @returns {T[]} The modified array.
   */
  static add<T>(collection: T[], value: T | T[], callback?: (addedItem: T) => void): T[] {
    ArrayExtensions.processItems<T>(collection, value, (item: T) => {
      collection.push(item);
      Util.executeCallback(callback, item);
    });

    return collection;
  }

  /**
   * Adds given value(s) to the start of the given array.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(T | T[])} value The value(s) to be added to beginning of the array. Note: the first item will be the last item to added to the beginning of the array.
   * @param {(addedItem: T) => void} [callback] A function that is called when a value as been added to the array.
   * @returns {T[]} The modified array.
   */
  static addToStart<T>(collection: T[], value: T | T[], callback?: (addedItem: T) => void): T[] {
    ArrayExtensions.processItems(collection, value, (item: T): void => {
      collection.unshift(item);
      Util.executeCallback(callback, item);
    });

    return collection;
  }

  /**
   * Removes the given value(s) from the given array.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(T | T[])} value The value(s) to be removed from the array.
   * @param {(addedItem: T) => void} [callback] A function that is called when a value as been removed from the array.
   * @returns {T[]} The modified array.
   */
  static removeByValue<T>(collection: T[], value: T | T[], callback?: (removedItem: T) => void): T[] {
    ArrayExtensions.processItems(collection, value, (targetItem: T): void => {
      collection = Util.filter(collection, (listItem: T): boolean => {
        const result = targetItem !== listItem;
        if (result) Util.executeCallback(callback, targetItem);
        return result;
      });
    });

    return collection;
  }

  /**
   * Removes the given index/indices from the given array.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(number | number[])} indices The index/indices to be removed from the array.
   * @param {(removedIndex: number) => void} [callback] A function that is called when a value as been removed from the array.
   * @returns {T[]} The modified array.
   */
  static removeByIndex<T>(collection: T[], indices: number | number[], callback?: (removedValue: T) => void): T[] {
    ArrayExtensions.processItems(collection, indices, (index: number): void => {
      const value = collection[index];
      collection.splice(index, 1);
      Util.executeCallback(callback, value);
    });

    return collection;
  }

  /**
   * Removes the first element of the given array.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(removedItem: T) => void} [callback] A function that is called when a value as been removed from the array.
   * @returns {T} The item that was removed.
   */
  static removeFirst<T>(collection: T[], callback?: (removedItem: T) => void): T {
    const removedItem = collection.shift();
    Util.executeCallback(callback, removedItem);

    return removedItem;
  }

  /**
   * Removes the last element of the given array.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(removedItem: T) => void} [callback] A function that is called when a value as been removed from the array.
   * @returns {T} The item that was removed.
   */
  static removeLast<T>(collection: T[], callback?: (removedItem: T) => void): T {
    const removedItem = collection.pop();
    Util.executeCallback(callback, removedItem);

    return removedItem;
  }

  /**
   * TODO
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collecion The subject array.
   * @param {number} index The index of the value that must get retrieved from the given collection.
   * @returns {T} The item at the given index.
   */
  static getValueByIndex<T>(collecion: T[], index: number): T { // TODO: Extend to accept multiple indices
    return collecion[index];
  }

  /**
   * Returns the value of the first element in the array that satisfies the given test callback.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(item: T, index?: number, collection?: T[]) => boolean} predicate A function that returns true when a particular value is found.
   * @returns {T} Found values.
   */
  static find<T>(collection: T[], predicate: ArrayLoopCallback<T, boolean>): T {
    return collection.find(predicate);
  }

  /**
   * Loop through all items in an given array, passing the meta data of the given value to a given callback.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(item: T, index?: number, collection?: T[]) => void} callback A function that is run over each item iteration of the array.
   * - item is the current element in the loop operation.
   * - collecion is the current collection of items.
   * - index is the current index of the item.
   */
  static each<T>(collection: T[], callback: ArrayLoopCallback<T, void>): void {
    Util.each(collection, callback);
  }

  /**
   * TODO
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(item: T, collection?: T[], index?: number) => boolean} predicate TODO
   * - item is the current element in the loop operation.
   * - collecion is the current collection of items.
   * - index is the current index of the item.
   */
  static filter<T>(collection: T[], predicate: ArrayLoopCallback<T, boolean>): T[] {
    return Util.filter(collection, predicate);
  }

  /**
   * Determines whether a given value is contained in the given array.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {*} value The search value.
   * @param {number} [startIndex=0] The index to start searching from. Default is the start of the array.
   * @returns {boolean} Whether or not the given item was found.
   */
  static contains<T>(collection: T[], value: T, startIndex: number = 0): boolean {
    return collection.includes(value, startIndex);
  }

  /**
   * Determines whether all the elements of an array satisfies the given test callback.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(item: T, index?: number, collection?: T[]) => boolean} callback A function that tests each element of the array. Only if all elements are true then all will return true.
   * @returns {boolean} Whether or not all the elements of the given array satisfy the given test callback. A false will be returned if the given array is empty.
   */
  static all<T>(collection: T[], callback: ArrayLoopCallback<T, boolean>): boolean {
    if (Conditions.isArrayEmpty(collection)) return false;
    return collection.every(callback);
  }

  /**
   * Returns the index of the first occurrence of a given value in a array.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {T} value The search value.
   * @param {number} [startIndex=0] The index to start searching from. Default is the start of the array.
   * @returns {number} Index of matched value or null if nothing matchs.
   */
  static indexOf<T>(collection: T[], value: T, startIndex: number = 0): number {
    const result = collection.indexOf(value, startIndex);
    return result !== -1 ? result : null;
  }

  /**
   * Returns the index of the last occurrence of a given value in a array, if values is not found null is returned.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {T} value The search value.
   * @param {number} [startIndex=collection.length - 1] The index to start searching from. Default is the end of the array.
   * @returns {number} Index of matched value or null if nothing matchs.
   */
  static lastIndexOf<T>(collection: T[], value: T, startIndex: number = collection.length - 1): number {
    const result = collection.lastIndexOf(value, startIndex);
    return result !== -1 ? result : null;
  }

  /**
   * Sorts a given array by the given callback, if omitted it is sorted according to each character's Unicode point value.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(a: T, b: T) => number} [callback] A function that defines the sort order, where (a) and (b) are the elements being compared.
   * - If less than 0 sort (a) to lower index than (b), (a) comes first.
   * - If 0 leave (a) and (b) unchanged in respect to each other.
   * - If greater than 0 sort (b) to lower index than (a), (b) comes first.
   * - All undefined elements are sorted to the end of the array.
   * @returns {T[]} The sorted array. Note that the array is sorted in place, and no copy is made.
   */
  static sort<T>(collection: T[], callback?: (a: T, b: T) => number): T[] {
    return collection.sort(callback);
  }

  /**
   * Reverses the order of the given array.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @returns {T[]} The reversed array.
   */
  static reverse<T>(collection: T[]): T[] {
    return collection.reverse();
  }

  /**
   * Determines whether the given callback returns true for T element of an array.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {(item: T, index?: number, collection?: T[]) => boolean} [predicate] Function that outlines whether a item exists with the given match constraints.
   * @returns {boolean} Whether or not the callback matched any element in the given array.
   */
  static exists<T>(collection: T[], predicate: ArrayLoopCallback<T, boolean>): boolean {
    return collection.some(predicate);
  }

  /**
   * Adds all the elements of an array separated by the specified separator string.
   *
   * @static
   * @template T As the provided type.
   * @param {T[]} collection The subject array.
   * @param {string} [separator=' '] A optional separator that is inserted between each array element. Default value is a whitespace.
   * @returns {string} The given array's elements concatenated together with the given separator.
   */
  static concatAll<T>(collection: T[], separator: string = ' '): string {
    return collection.join(separator);
  }

}
