import { ArrayExtensions } from '../common/extensions/array-extensions';

/**
 * Represents a strongly typed list of objects that can be accessed by index. Provides methods to search, sort, and manipulate lists.
 *
 * @export
 * @class List
 * @template T As the provided type.
 */
export class List<T> {

  /**
   * The container that holds all the List's elements.
   *
   * @private
   * @type {T[]}
   */
  private container: T[];

  /**
   * A callback to be executed whenever a item is added to the List.
   *
   * @private
   */
  private addCallback: (addedItem: T) => void;

  /**
   * A callback to be executed whenever a item is removed from the List.
   *
   * @private
   */
  private removeCallback: (addedItem: T) => void;

  /**
   * Returns the number of elements contained in the List.
   *
   * @readonly
   * @type {number}
   */
  get count(): number {
    return this.container.length;
  }

  /**
   * Returns the first element of the List, if List is empty undefined is returned.
   *
   * @readonly
   * @type {T}
   */
  get first(): T {
    return this.container[0];
  }

  /**
   * Returns the last element of the List, if List is empty undefined is returned.
   *
   * @readonly
   * @type {T}
   */
  get last(): T {
    return this.container[this.count - 1];
  }

  /**
   * A callback to be executed whenever a item is added to the List.
   */
  set onAdd(func: (addedItem: T) => void) {
    this.addCallback = func;
  }

  /**
   * A callback to be executed whenever a item is removed from the List.
   */
  set onRemove(func: (removedItem: T) => void) {
    this.removeCallback = func;
  }

  /**
   * Creates an instance of a List.
   *
   * @param {...T[]} items Rest parameter of all the items to be added to the List instance.
   */
  constructor(...items: T[]) {
    this.addCallback = null;
    this.removeCallback = null;
    this.container = items;
  }

  /**
   * Adds given value(s) to the end of the List.
   *
   * @param {T | T[]} value The value(s) to be added to the end of the List.
   * @returns {this} The List instance.
   */
  add(value: T | T[]): this {
    ArrayExtensions.add(this.container, value, this.addCallback);
    return this;
  }

  /**
   * Adds given value(s) to the start of the List.
   *
   * @param {T | T[]} value The value(s) to be added to the beginning of the List. Note: the first item will be the last item to added to the beginning of the List.
   * @returns {this} The List instance.
   */
  addToStart(value: T | T[]): this {
    ArrayExtensions.addToStart(this.container, value, this.addCallback);
    return this;
  }

  /**
   * Removes the first element of the List.
   *
   * @returns {T} The value removed from the List.
   */
  removeFirst(): T {
    return ArrayExtensions.removeFirst(this.container, this.removeCallback);
  }

  /**
   * Removes the last element of the List.
   *
   * @returns {T} The value removed from the List.
   */
  removeLast(): T {
    return ArrayExtensions.removeLast(this.container, this.removeCallback);
  }

  /**
   * Removes the given value(s) from the List.
   *
   * @param {(T | T[])} value The value(s) to be removed from the List.
   * @returns {this} The List instance.
   */
  removeByValue(value: T | T[]): this {
    ArrayExtensions.removeByValue(this.container, value, this.removeCallback);
    return this;
  }

  /**
   * Removes the given index/indices from the List.
   *
   * @param {(number | number[])} value The index/indices to be removed from the List.
   * @returns {this} The List instance.
   */
  removeByIndex(value: number | number[]): this {
    ArrayExtensions.removeByIndex(this.container, value, this.removeCallback);
    return this;
  }

  /**
   * Clears all elements from the List.
   *
   * @returns {this} The List instance.
   */
  clear(): this {
    this.container = [];
    return this;
  }

  /**
   * Returns the value of the first element in the List that satisfies the given test callback.
   *
   * @param {(item: T, index?: number, list?: T[]) => boolean} callback A function that returns true when a particular value is found.
   * - item is the current element in the finding operation.
   * - index is the current index of the item.
   * - list is the current collection of items.
   * @returns {T} Found value or undefined if nothing is found.
   */
  find(callback: (item: T, index?: number, list?: T[]) => boolean): T {
    return ArrayExtensions.find(this.container, callback);
  }

  /**
   * Loop through all items in the List, passing the meta data of the given value to a given callback.
   * Note: This method does not cater for adding/removing items while looping.
   *
   * @param {(item: T, list?: T[], index?: number) => void} callback A function that is run over each item iteration of the List.
   * - item is the current element in the loop operation.
   * - list is the current collection of items.
   * - index is the current index of the item.
   * @returns {this} The List instance.
   */
  each(callback: (item: T, list?: T[], index?: number) => void): this {
    ArrayExtensions.each(this.container, callback);
    return this;
  }

  /**
   * TODO
   *
   * @param {(item: T, list?: T[], index?: number) => boolean} callback TODO
   * - item is the current element in the loop operation.
   * - list is the current collection of items.
   * - index is the current index of the item.
   * @returns {this} The List instance.
   */
  filter(callback: (item: T, list?: T[], index?: number) => boolean): this {
   this.container = ArrayExtensions.filter(this.container, callback);
   return this;
  }

  /**
   * Determines whether the given callback returns true for any element in the List.
   *
   * @param {(item: T, index?: number, list?: T[]) => boolean} callback A function that returns true when any value meets the conditions of the callback.
   * - item is the current element in the operation.
   * - index is the current index of the item.
   * - list is the current collection of items.
   * @returns {boolean} Whether or not any element in he List met the callback's conditions.
   */
  exists(callback: (item: T, index?: number, list?: T[]) => boolean): boolean {
    return ArrayExtensions.exists(this.container, callback);
  }

  /**
   * Determines whether all the elements of a List satisfy the specified test.
   *
   * @param {(item: T, index?: number, list?: T[]) => boolean} callback A function that tests each element of the List. Only if all elements are true then all will return true.
   * - item is the current element in the operation.
   * - index is the current index of the item.
   * - list is the current collection of items.
   * @returns {boolean} Whether or not all elements in the List met the callback's conditions.
   */
  all(callback: (item: T, index?: number, list?: T[]) => boolean): boolean {
    return ArrayExtensions.all(this.container, callback);
  }

  /**
   * Determines whether a given value is contained in the List.
   *
   * @param {T} value Search value.
   * @param {number} [startIndex] The index to start searching from. Default is the start of the List.
   * @returns {boolean} Whether or not the List contains the given value.
   */
  contains(value: T, startIndex?: number): boolean {
    return ArrayExtensions.contains(this.container, value, startIndex);
  }

  /**
   * Adds all the elements of the List separated by the specified separator string.
   *
   * @param {string} [separator] A optional separator that is inserted between each List element. Default value is a whitespace.
   * @returns {string} The List's elements concatenated together with the given separator.
   */
  concatAll(separator?: string): string {
    return ArrayExtensions.concatAll(this.container, separator);
  }

  /**
   * Returns the index of the first occurrence of a given value in the List.
   *
   * @param {T} value
   * @param {number} [startIndex=0]
   * @returns {number} Index of matched value or if nothing matchs null.
   */
  indexOf(value: T, startIndex?: number): number {
    return ArrayExtensions.indexOf(this.container, value, startIndex);
  }

  /**
   * Returns the index of the last occurrence of a given value in the List.
   *
   * @param {T} value
   * @param {number} [startIndex]
   * @returns {number} Index of matched value or if nothing matchs null.
   */
  lastIndexOf(value: T, startIndex?: number): number {
    return ArrayExtensions.lastIndexOf(this.container, value, startIndex);
  }

  /**
   * Sorts the List according to the result from the given callback, if omitted it is sorted according to each character's Unicode point value.
   *
   * @param {(a: any, b: any) => number} [callback] Function that defines the sort order, where (a) and (b) are the elements being compared.
   * - If less than 0 sort (a) to lower index than (b), (a) comes first.
   * - If 0 leave (a) and (b) unchanged in respect to each other.
   * - If greater than 0 sort (b) to lower index than (a), (b) comes first.
   * - All undefined elements are sorted to the end of the array.
   * @returns {this} The List instance.
   */
  sort(callback?: (a: any, b: any) => number): this {
    ArrayExtensions.sort(this.container, callback);
    return this;
  }

  /**
   * Reverses the order of the List.
   *
   * @returns {this} The List instance.
   */
  reverse(): this {
    ArrayExtensions.reverse(this.container);
    return this;
  }

  /**
   * Converts the List to an array.
   *
   * @returns {T[]} A clone of the List's container array.
   */
  toArray(): T[] {
    return this.container.slice(0);
  }

}
