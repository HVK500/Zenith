import { ArrayExtensions } from '../Common/Extensions/ArrayExtensions';

/**
 *
 *
 * @export
 * @class List
 * @template T
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
   * Provides a number of all the elements in the List.
   *
   * @readonly
   * @type {number}
   */
  get count(): number {
    return this.container.length;
  }

  /**
   * Returns a clone of the List's containing array.
   *
   * @readonly
   * @type {T[]}
   */
  get items(): T[] {
    return this.container.slice(0);
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
   * A callback to be executed whenever a value is added to the List.
   */
  set onAdd(func: (addedItem: T) => void) {
    this.onAdd = func;
  }

  /**
   * A callback to be executed whenever a value is removed from the List.
   */
  set onRemove(func: (removedItem: T) => void) {
    this.onRemove = func;
  }

  /**
   * Creates an instance of a List.
   *
   * @param {...T[]} addItems
   */
  constructor(...addItems: T[]) {
    this.container = addItems;
  }

  /**
   * Adds given value(s) to the end of the List.
   *
   * @param {*} value
   * @returns {this} The List instance.
   */
  add(value: any | any[]): this {
    ArrayExtensions.add(this.container, value, this.onAdd);
    return this;
  }

  /**
   * Adds given value(s) to the start of the List.
   *
   * @param {*} value
   * @returns {this} The List instance.
   */
  addToStart(value: any | any[]): this {
    ArrayExtensions.addToStart(this.container, value, this.onAdd);
    return this;
  }

  /**
   * Removes the first element of the List.
   *
   * @returns {this} The value removed from the List.
   */
  removeFirst(): T {
    return ArrayExtensions.removeFirst(this.container, this.onRemove);
  }

  /**
   * Removes the last element of the List.
   *
   * @returns {T} The value removed from the List.
   */
  removeLast(): T {
    return ArrayExtensions.removeLast(this.container, this.onRemove);
  }

  /**
   * Removes the given value(s) from the List.
   *
   * @param {(any | any[])} value
   * @returns {this} The List instance.
   */
  removeByValue(value: T | T[]): this {
    ArrayExtensions.removeByValue(this.container, value, this.onRemove);
    return this;
  }

  /**
   * Removes the given index/indices from the List.
   *
   * @param {(number | number[])} value
   * @returns {this} The List instance.
   */
  removeByIndex(value: number | number[]): this {
    ArrayExtensions.removeByIndex(this.container, value, this.onRemove);
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
   * @param {(item: T, index: number, list: T[]) => boolean} callback
   * @returns {*} Found value or undefined if nothing is found.
   */
  find(callback: (item: T, index: number, list: T[]) => boolean): T {
    return ArrayExtensions.find(this.container, callback);
  }

  /**
   * Determines whether the given callback returns true for any element in the List.
   *
   * @param {(item: T, index: number, list: T[]) => boolean} callback
   * @returns {boolean}
   */
  exists(callback: (item: T, index: number, list: T[]) => boolean): boolean {
    return ArrayExtensions.exists(this.container, callback);
  }

  /**
   * Determines whether all the elements of a List satisfy the specified test.
   *
   * @param {(item: T, index: number, list: T[]) => boolean} callback Test logic to be executed against each element of the List.
   * @returns {boolean} Whether all elements have passed the specified test.
   */
  all(callback: (item: T, index: number, list: T[]) => boolean): boolean {
    return ArrayExtensions.all(this.container, callback);
  }

 /**
   * Determines whether a given value is contained in the List.
   *
   * @param {T} value Search value.
   * @param {number} [startIndex] The index to start searching from. Default is the start of the List.
   * @returns {boolean} Whether or not the List containes the given value.
   */
  contains(value: T, startIndex?: number): boolean {
    return ArrayExtensions.contains(this.container, value);
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

  // /**
  //  *
  //  *
  //  * @param {number} index
  //  * @param {T} value
  //  * @returns {this}
  //  */
  // replace(): this {
  //   // TODO look for the item at index, and replace it

  //   return this;
  // }

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
   * Sorts the List by the given callback, if omitted it is sorted according to each character's Unicode point value.
   *
   * @param {(a: any, b: any) => number} [callback] Function that determines the custom to sort by, If omitted, the elements are sorted in ascending order.
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

}
