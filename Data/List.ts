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
   * The container that holds all the List's members.
   *
   * @private
   * @type {T[]}
   * @memberOf List
   */
  private container: T[];

  /**
   *
   *
   * @readonly
   * @memberOf List
   */
  get members() {
    return this.container.slice(0);
  }

  /**
   * Creates an instance of a List.
   *
   * @param {...T[]} addItems
   * @memberOf List
   */
  constructor(...addItems: T[]) {
    this.container = addItems;
  }

  /**
   * Provides a number of all the members in the List.
   *
   * @returns {number} Number of members in the List.
   * @memberOf List
   */
  count(): number {
    return this.container.length;
  }

  /**
   *
   *
   * @param {*} value
   * @returns {this}
   * @memberOf List
   */
  add(value: any | any[]): this {
    ArrayExtensions.add(this.container, value);
    return this;
  }

  /**
   *
   *
   * @param {*} value
   * @returns {this}
   * @memberOf List
   */
  addToStart(value: any | any[]): this {
    ArrayExtensions.addToStart(this.container, value);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   * @memberOf List
   */
  removeFirst(): this {
    this.container.shift();
    return this;
  }

  /**
   *
   *
   * @returns {this}
   * @memberOf List
   */
  removeLast(): this {
    this.container.pop();
    return this;
  }

  /**
   *
   *
   * @param {(any | any[])} value
   * @returns {this}
   * @memberOf List
   */
  removeByValue(value: T | T[]): this {
    ArrayExtensions.removeByValue(this.container, value);
    return this;
  }

  /**
   *
   *
   * @param {(number | number[])} value
   * @returns {this}
   * @memberOf List
   */
  removeByIndex(value: number | number[]): this {
    ArrayExtensions.removeByIndex(this.container, value);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   * @memberOf List
   */
  clear(): this {
    this.container = [];
    return this;
  }

  /**
   *
   *
   * @param {(item: T, index: number, list: T[]) => boolean} callback
   * @returns {*}
   * @memberOf List
   */
  find(callback: (item: T, index: number, list: T[]) => boolean): T {
    return this.container.find(callback) || null;
  }


  exists(callback: (item: T, index: number, list: T[]) => boolean): boolean {
    return ArrayExtensions.exists(this.container, callback);
  }

  /**
   * Determines whether all the members of a List satisfy the specified test.
   *
   * @param {(item: T, index: number, list: T[]) => boolean} callback Test logic to be executed against each member of the List.
   * @returns {boolean} Whether all members have passed the specified test.
   * @memberOf List
   */
  all(callback: (item: T, index: number, list: T[]) => boolean): boolean {
    return ArrayExtensions.all(this.container, callback);
  }

  /**
   *
   *
   * @returns {boolean}
   * @memberOf List
   */
  contains(value: any): boolean {
    // let result = false;
    // this.exists((item) => {
    //   return value === item;
    // });
    return false;
  }

  /**
   *
   *
   * @param {string} [separator]
   * @returns {string}
   * @memberOf List
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
  //  * @memberOf List
  //  */
  // replace(): this {
  //   // TODO look for the item at index, and replace it

  //   return this;
  // }

  /**
   *
   *
   * @param {T} value
   * @param {number} [fromIndex=0]
   * @returns {number}
   * @memberOf List
   */
  indexOf(value: T, fromIndex?: number): number {
    return ArrayExtensions.indexOf(this.container, value, fromIndex);
  }

  lastIndexOf(value: T, fromIndex?: number): number {
    return ArrayExtensions.lastIndexOf(this.container, value, fromIndex);
  }

  /**
   *
   *
   * @param {(a: any, b: any) => number} [callback] Function that determines the custom to sort by, If omitted, the elements are sorted in ascending order.
   * @returns {this}
   * @memberOf List
   */
  sort(callback?: (a: any, b: any) => number): this {
    this.container.sort(callback);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   * @memberOf List
   */
  reverse(): this {
    this.container.reverse();
    return this;
  }

  // /**
  //  *
  //  *
  //  * @returns {IterableIterator<T>}
  //  * @memberOf List
  //  */
  // getIterator(): IterableIterator<T> {
  // 	return this.container.values();
  // }

}
