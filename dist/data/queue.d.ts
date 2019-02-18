import { ArrayLoopCallback } from '../common/common-internals';
/**
 * Represents a first-in, first-out collection of objects.
 *
 * @export
 * @class Queue
 * @template T As the provided type.
 */
export declare class Queue<T> {
    /**
     * The container List that holds all the Queue's elements.
     *
     * @private
     * @type {List<T>}
     */
    private container;
    /**
     * The previous value removed from the Queue.
     *
     * @private
     * @type {T}
     */
    private previous;
    /**
     * Creates an instance of a Queue.
     *
     * @param {...T[]} items
     */
    constructor(...items: T[]);
    /**
     * Returns the number of elements contained in the Queue.
     *
     * @readonly
     * @type {number}
     */
    readonly count: number;
    /**
     * Returns the previous item that was in the Queue, if no queue item was previously dequeued then undefined is returned.
     *
     * @readonly
     * @type {T}
     */
    readonly past: T;
    /**
     * Returns the next item in the Queue, if there is none then undefined is returned.
     *
     * @readonly
     * @type {T}
     */
    readonly peek: T;
    /**
     * Clears all elements from the Queue.
     *
     * @returns {this} The Queue instance.
     */
    clear(): this;
    /**
     * Determines whether a given value is contained in the Queue.
     *
     * @param {T} value Search value.
     * @returns {boolean} Whether or not the Queue contains the given value.
     */
    contains(value: T): boolean;
    /**
     * Removes first value in the Queue.
     *
     * @returns {T} The first value that is removed from the Queue.
     */
    dequeue(): T;
    /**
     * Loop through all enqueued items in the Queue, passing the meta data of the given value to a given callback.
     * Note: This method does not cater for en/de queuing items while looping.
     *
     * @param {(item: T, index?: number, list?: T[]) => void} callback A function that is run over each item iteration of the Queue.
     * - item is the current element in the loop operation.
     * - list is the current collection of items.
     * - index is the current index of the item.
     * @returns {this} This Queue Instance.
     */
    each(callback: ArrayLoopCallback<T, void>, exitCondition?: ArrayLoopCallback<T, boolean>): this;
    /**
     * Adds the given value(s) to the end of the Queue.
     *
     * @param {(T | T[])} value The value(s) to be added to the end of the Queue.
     * @returns {this} The Queue instance.
     */
    enqueue(value: T | T[]): this;
    /**
     * Reverses the order of the Queue.
     *
     * @returns {this} The Queue instance.
     */
    reverse(): this;
    /**
     * Sorts the Queue according to the result from the given callback, if omitted it is sorted according to each character's Unicode point value.
     *
     * @param {(a: T, b: T) => number} [callback] Function that defines the sort order, where (a) and (b) are the elements being compared.
     * - If less than 0 sort (a) to lower index than (b), (a) comes first.
     * - If 0 leave (a) and (b) unchanged in respect to each other.
     * - If greater than 0 sort (b) to lower index than (a), (b) comes first.
     * - All undefined elements are sorted to the end of the array.
     * @returns {this} The Queue instance.
     */
    sort(callback?: (a: T, b: T) => number): this;
    /**
     * Converts the Queue to an array.
     *
     * @returns {T[]} A clone of the Queue's container List array.
     */
    toArray(): T[];
}
