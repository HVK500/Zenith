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
   * Returns the next item in the Queue, if the Queue is empty then undefined is returned.
   *
   * @readonly
   * @type {T}
   */
  get nextItem(): T {
    return super.first;
  }

  /**
   * Returns the previous item that was in the Queue, if no item had previously been removed then null is returned.
   *
   * @readonly
   * @type {T}
   */
  get previousItem(): T {
    return this.previousCache;
  }

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
  next(): T {
    const result = super.removeFirst();
    this.previousCache = result;
    return result;
  }

  /**
   *
   *
   * @returns {T}
   */
  previous(): T {
    const previousItem = this.previousCache;
    this.previousCache = null;
    super.addToStart(previousItem);
    return this.previousCache;
  }

  /**
   *
   *
   * @param {T} value
   * @returns {this}
   */
  push(value: T): this {
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
