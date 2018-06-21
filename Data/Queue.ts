import { List } from './List';

/**
 *
 *
 * @export
 * @class Queue
 * @template T
 */
export class Queue<T> {

  /**
   * The container List that holds all the Queue's elements.
   *
   * @private
   * @type {List<T>}
   */
  private container: List<T>;

  /**
   * The previous value removed from the Queue.
   *
   * @private
   * @type {T}
   */
  private previousCache: T;

  /**
   * Returns the number of elements contained in the Queue.
   *
   * @readonly
   * @type {number}
   */
  get count(): number {
    return this.container.count;
  }

  /**
   * Returns the next item in the Queue, if there is none then undefined is returned.
   *
   * @readonly
   * @type {T}
   */
  get peek(): T {
    return this.container.first;
  }

  /**
   * Returns the previous item that was in the Queue, if no queue item was previously dequeued then undefined is returned.
   *
   * @readonly
   * @type {T}
   */
  get past(): T {
    return this.previousCache;
  }

  /**
   * A callback to be executed whenever a item is queued into the Queue.
   */
  set onEnqueue(func: (enqueueItem: T) => void) {
    this.onEnqueue = func;
  }

  /**
   * A callback to be executed whenever a item is dequeued from the Queue.
   */
  set onDequeue(func: (dequeueItem: T) => void) {
    this.onDequeue = func;
  }

  /**
   * Creates an instance of a Queue.
   *
   * @param {...T[]} items
   */
  constructor(...items: T[]) {
    this.previousCache = undefined;
    this.container = new List(...items);
    this.container.onAdd = null;
    this.container.onRemove = null;
  }

  /**
   * Adds the given value(s) to the end of the Queue.
   *
   * @param {(T | T[])} value
   * @returns {this} The Queue instance.
   */
  enqueue(value: T | T[]): this {
    this.container.onAdd = this.onEnqueue;
    this.container.add(value);
    this.container.onAdd = null;

    return this;
  }

  /**
   * Removes first value in the Queue.
   *
   * @returns {T} The first value that is removed from the Queue.
   */
  dequeue(): T {
    this.container.onRemove = this.onDequeue;
    const result = this.container.removeFirst();
    this.container.onRemove = null;
    this.previousCache = result;

    return result;
  }

  /**
   * Clears all elements from the Queue.
   *
   * @returns {this} The Queue instance.
   */
  clear(): this {
    this.container.clear();
    return this;
  }

  /**
   * Determines whether a given value is contained in the Queue.
   *
   * @param {T} value Search value.
   * @returns {boolean} Whether or not the Queue contains the given value.
   */
  contains(value: T): boolean {
    return this.container.contains(value);
  }

  /**
   * Sorts the Queue according to the result from the given callback, if omitted it is sorted according to each character's Unicode point value.
   *
   * @param {(a: any, b: any) => number} [callback]
   * @returns {this} The Queue instance.
   */
  sort(callback?: (a: any, b: any) => number): this {
    this.container.sort(callback);
    return this;
  }

  /**
   * Reverses the order of the Queue.
   *
   * @returns {this} The Queue instance.
   */
  reverse(): this {
    this.container.reverse();
    return this;
  }

  /**
   * Converts the Queue to an array.
   *
   * @returns {T[]} A clone of the Queue's container List array.
   */
  toArray(): T[] {
    return this.container.toArray();
  }

}
