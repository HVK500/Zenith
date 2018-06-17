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
   */
  private previousCache: T;

  /**
   * Creates an instance of a Queue.
   *
   * @param {...T[]} addItems
   */
  constructor(...addItems: T[]) {
    super(...addItems);
    this.previousCache = null;
  }

  /**
   *
   *
   * @returns {T}
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
   */
  previous(): T {
    return this.previousCache;
  }

  /**
   *
   *
   * @param {T} value
   * @returns {this}
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
   */
  sort(callback?: (a: any, b: any) => number): this {
    super.sort(callback);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  reverse(): this {
    super.reverse();
    return this;
  }

}
