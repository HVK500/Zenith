import { List } from './list';

/**
 * Represents a first-in, first-out collection of objects.
 *
 * @export
 * @class Queue
 * @template T As the provided type.
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
  private previous: T;

  /**
   * A callback to be executed whenever a item is queued into the Queue.
   *
   * @private
   */
  private enqueueCallback: (enqueuedItem: T) => void;

  /**
   * A callback to be executed whenever a item is dequeued from the Queue.
   *
   * @private
   */
  private dequeueCallback: (dequeuedItem: T) => void;

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
    return this.previous;
  }

  /**
   * A callback to be executed whenever a item is queued into the Queue.
   */
  set onEnqueue(func: (enqueuedItem: T) => void) {
    this.enqueueCallback = func;
  }

  /**
   * A callback to be executed whenever a item is dequeued from the Queue.
   */
  set onDequeue(func: (dequeuedItem: T) => void) {
    this.dequeueCallback = func;
  }

  /**
   * Creates an instance of a Queue.
   *
   * @param {...T[]} items
   */
  constructor(...items: T[]) {
    this.enqueueCallback = null;
    this.dequeueCallback = null;
    this.previous = undefined;
    this.container = new List(...items);
  }

  /**
   * Adds the given value(s) to the end of the Queue.
   *
   * @param {(T | T[])} value The value(s) to be added to the end of the Queue.
   * @returns {this} The Queue instance.
   */
  enqueue(value: T | T[]): this {
    this.container.onAdd = this.enqueueCallback;
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
    this.container.onRemove = this.dequeueCallback;
    const result = this.container.removeFirst();
    this.container.onRemove = null;
    this.previous = result;

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
   * Loop through all enqueued items in the Queue, passing the meta data of the given value to a given callback.
   * Loop through all enqueued items in the Queue, passing the meta data of the given value to a given callback.
   * Note: This method does not cater for en/de queuing items while looping.
   *
   * @param {(item: T, list?: T[], index?: number) => void} callback A function that is run over each item iteration of the Queue.
   * - item is the current element in the loop operation.
   * - list is the current collection of items.
   * - index is the current index of the item.
   * @returns {this} This Queue Instance.
   */
  each(callback: (item: T, list?: T[], index?: number) => void): this {
    this.container.each(callback);
    return this;
  }

  /**
   * Sorts the Queue according to the result from the given callback, if omitted it is sorted according to each character's Unicode point value.
   *
   * @param {(a: any, b: any) => number} [callback] Function that defines the sort order, where (a) and (b) are the elements being compared.
   * - If less than 0 sort (a) to lower index than (b), (a) comes first.
   * - If 0 leave (a) and (b) unchanged in respect to each other.
   * - If greater than 0 sort (b) to lower index than (a), (b) comes first.
   * - All undefined elements are sorted to the end of the array.
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
