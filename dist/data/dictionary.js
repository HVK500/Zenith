"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../common/extensions/array-extensions.d.ts" />
require("../common/extensions/array-extensions");
/**
 *
 *
 * @export
 * @class Dictionary
 * @template TKey
 * @template TValue
 */
var Dictionary = /** @class */ (function () {
    /**
     * Creates an instance of Dictionary.
     * @param {...[ TKey, TValue ][]} items
     */
    function Dictionary() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.container = new Map(items);
    }
    Object.defineProperty(Dictionary.prototype, "entries", {
        /**
         *
         *
         * @readonly
         * @type {[ TKey, TValue ][]}
         */
        get: function () {
            return Array.from(this.container.entries());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "keys", {
        /**
         *
         *
         * @readonly
         * @type {TKey[]}
         */
        get: function () {
            return Array.from(this.container.keys());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "values", {
        /**
         *
         *
         * @readonly
         * @type {TValue[]}
         */
        get: function () {
            return Array.from(this.container.values());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "count", {
        /**
         *
         *
         * @readonly
         * @type {number}
         */
        get: function () {
            return this.container.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     *
     * @param {TKey[]} keys
     * @returns {TValue[]}
     */
    Dictionary.prototype.fetchMany = function (keys) {
        var _this = this;
        var result = [];
        keys.each(function (key) {
            result.push(_this.fetch(key));
        });
        return result;
    };
    /**
     *
     *
     * @param {TKey} key
     * @returns {TValue}
     */
    Dictionary.prototype.fetch = function (key) {
        return this.container.get(key);
    };
    /**
     *
     *
     * @param {TKey} key
     * @param {TValue} value
     * @returns {this}
     */
    Dictionary.prototype.add = function (key, value) {
        this.container.set(key, value);
        return this;
    };
    /**
     *
     *
     * @param {TKey} key
     * @returns {this}
     */
    Dictionary.prototype.remove = function (key) {
        this.container.delete(key);
        return this;
    };
    /**
     *
     *
     * @param {DictionaryLoopCallback<TKey, TValue>} callback
     * @returns {this}
     */
    Dictionary.prototype.each = function (callback) {
        var _this = this;
        this.container.forEach(function (value, key) {
            callback(value, key, _this);
        });
        return this;
    };
    /**
     *
     *
     * @returns {boolean}
     */
    Dictionary.prototype.isEmpty = function () {
        return this.count === 0;
    };
    /**
     *
     *
     * @returns {this}
     */
    Dictionary.prototype.clear = function () {
        this.container.clear();
        return this;
    };
    /**
     *
     *
     * @param {TKey} key
     * @returns {boolean}
     */
    Dictionary.prototype.contains = function (key) {
        return this.container.has(key);
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
