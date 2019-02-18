"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./list");
/**
 * Represents a first-in, first-out collection of objects.
 *
 * @export
 * @class Queue
 * @template T As the provided type.
 */
var Queue = /** @class */ (function () {
    /**
     * Creates an instance of a Queue.
     *
     * @param {...T[]} items
     */
    function Queue() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.previous = undefined;
        this.container = new (list_1.List.bind.apply(list_1.List, [void 0].concat(items)))();
    }
    Object.defineProperty(Queue.prototype, "count", {
        /**
         * Returns the number of elements contained in the Queue.
         *
         * @readonly
         * @type {number}
         */
        get: function () {
            return this.container.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "past", {
        /**
         * Returns the previous item that was in the Queue, if no queue item was previously dequeued then undefined is returned.
         *
         * @readonly
         * @type {T}
         */
        get: function () {
            return this.previous;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "peek", {
        /**
         * Returns the next item in the Queue, if there is none then undefined is returned.
         *
         * @readonly
         * @type {T}
         */
        get: function () {
            return this.container.first;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clears all elements from the Queue.
     *
     * @returns {this} The Queue instance.
     */
    Queue.prototype.clear = function () {
        this.container.clear();
        return this;
    };
    /**
     * Determines whether a given value is contained in the Queue.
     *
     * @param {T} value Search value.
     * @returns {boolean} Whether or not the Queue contains the given value.
     */
    Queue.prototype.contains = function (value) {
        return this.container.contains(value);
    };
    /**
     * Removes first value in the Queue.
     *
     * @returns {T} The first value that is removed from the Queue.
     */
    Queue.prototype.dequeue = function () {
        var result = this.container.removeFirst();
        this.previous = result;
        return result;
    };
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
    Queue.prototype.each = function (callback, exitCondition) {
        this.container.each(callback);
        return this;
    };
    /**
     * Adds the given value(s) to the end of the Queue.
     *
     * @param {(T | T[])} value The value(s) to be added to the end of the Queue.
     * @returns {this} The Queue instance.
     */
    Queue.prototype.enqueue = function (value) {
        this.container.add(value);
        return this;
    };
    /**
     * Reverses the order of the Queue.
     *
     * @returns {this} The Queue instance.
     */
    Queue.prototype.reverse = function () {
        this.container.reverse();
        return this;
    };
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
    Queue.prototype.sort = function (callback) {
        this.container.sort(callback);
        return this;
    };
    /**
     * Converts the Queue to an array.
     *
     * @returns {T[]} A clone of the Queue's container List array.
     */
    Queue.prototype.toArray = function () {
        return this.container.toArray();
    };
    return Queue;
}());
exports.Queue = Queue;
