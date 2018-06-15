import { List } from './List';

/**
 *
 *
 * @export
 * @class Queue
 * @template T
 */
export class Queue<T> extends List<T> {

  /**
   *
   *
   * @private
   * @type {T}
   * @memberOf Queue
   */
  private previousCache: T;

  /**
   * Creates an instance of a Queue.
   *
   * @param {...T[]} addItems
   * @memberOf Queue
   */
  constructor(...addItems: T[]) {
    super(...addItems);
    this.previousCache = null;
  }

  /**
   *
   *
   * @returns {T}
   * @memberOf Queue
   */
  next(): T { // TODO: and a callcback here and plugin the next value in to the callback, then proceed with the logic
    const result = super.members[0];
    this.previousCache = result;
    super.removeFirst();
    return result;
  }

  /**
   *
   *
   * @returns {T}
   * @memberOf Queue
   */
  previous(): T {
    return this.previousCache;
  }

  /**
   *
   *
   * @param {T} value
   * @returns {this}
   * @memberOf Queue
   */
  add(value: T): this {
    super.add(value);
    return this;
  }

  /**
   *
   *
   * @param {T} value
   * @returns {this}
   * @memberOf Queue
   */
  addToStart(value: T): this {
    super.addToStart(value);
    return this;
  }

  /**
   *
   *
   * @param {(T | T[])} value
   * @returns {this}
   * @memberOf Queue
   */
  removeByValue(value: T | T[]): this {
    super.removeByValue(value);
    return this;
  }

  /**
   *
   *
   * @param {(number | number[])} index
   * @returns {this}
   * @memberOf Queue
   */
  removeByIndex(index: number | number[]): this {
    super.removeByIndex(index);
    return this;
  }

  /**
   *
   *
   * @param {(a: any, b: any) => number} [callback]
   * @returns {this}
   * @memberOf Queue
   */
  sort(callback?: (a: any, b: any) => number): this {
    super.sort(callback);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   * @memberOf Queue
   */
  reverse(): this {
    super.reverse();
    return this;
  }

}
