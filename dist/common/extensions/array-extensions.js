"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conditions_1 = require("../conditions");
var pseudo_random_1 = require("../pseudo-random");
var XArray = /** @class */ (function () {
    function XArray() {
        /**
         * @inheritdoc
         */
        this.add = function (value) {
            var _this = this;
            XArray.processMultiple(value, function (item) {
                _this.push(item);
            });
            return this;
        };
        /**
         * @inheritdoc
         */
        this.addToStart = function (value) {
            var _this = this;
            XArray.processMultiple(value, function (item) {
                _this.unshift(item);
            });
            return this;
        };
        /**
         * @inheritdoc
         */
        this.all = function (callback) {
            return conditions_1.Conditions.isArrayEmpty(this) ? false : this.every(callback);
        };
        /**
         * @inheritdoc
         */
        this.applyAll = function (callback) {
            return this.map(callback);
        };
        /**
         * @inheritdoc
         */
        this.clone = function () {
            return this.splice(0);
        };
        /**
         * @inheritdoc
         */
        this.concatAll = function (separator) {
            if (separator === void 0) { separator = ' '; }
            return this.join(separator);
        };
        /**
         * @inheritdoc
         */
        this.contains = function (value, startIndex) {
            if (startIndex === void 0) { startIndex = 0; }
            return conditions_1.Conditions.isArrayEmpty(this) ? false : this.includes(value, startIndex);
        };
        /**
         * @inheritdoc
         */
        this.each = function (callback, exitCondition) {
            for (var i = 0; i < this.length; i++) {
                if (exitCondition && exitCondition(this[i], i, this))
                    break;
                callback.call(null, this[i], this, i);
            }
            return this;
        };
        /**
         * @inheritdoc
         */
        this.exists = function (predicate) {
            return this.some(predicate);
        };
        /**
         * @inheritdoc
         */
        this.getRandom = function (amount) {
            var _this = this;
            if (amount === void 0) { amount = 1; }
            amount = amount <= 0 ? 1 : (amount > this.length ? this.length : amount);
            var max = this.length - 1;
            var indicesUsed = [null];
            var getSeqenceItem = function () {
                var float = pseudo_random_1.PseudoRandom.generateRandomFloat(0, max);
                while (indicesUsed.some(function (i) { return i === float; })) { // False means find another, true means use current
                    float = pseudo_random_1.PseudoRandom.generateRandomFloat(0, max);
                }
                indicesUsed.push(float);
                return _this[float];
            };
            var result = [];
            for (var index = 0; index < amount; index++) {
                result.push(getSeqenceItem());
            }
            return result;
        };
        /**
         * @inheritdoc
         */
        this.isEmpty = function () {
            return conditions_1.Conditions.isArrayEmpty(this);
        };
        /**
         * @inheritdoc
         */
        this.removeByIndex = function (indices) {
            var result = this;
            XArray.processMultiple(indices, function (index) {
                result.splice(index, 1);
            });
            return result;
        };
        /**
         * @inheritdoc
         */
        this.removeByValue = function (values) {
            var result = this;
            this.processMultiple(values, function (value) {
                result = result.filter(function (filterValue) {
                    return value !== filterValue;
                });
            });
            return result;
        };
        /**
         * @inheritdoc
         */
        this.removeFirst = function () {
            this.shift();
            return this;
        };
        /**
         * @inheritdoc
         */
        this.removeLast = function () {
            this.pop();
            return this;
        };
    }
    /**
     * Provides a loop layer that can be used in T methods that need to take in multiple values and loop through them.
     *
     * @private
     * @static
     * @param {(T | T[])} value
     * @param {ArrayLoopCallback<T, void>} callback A generic loop function.
     */
    XArray.processMultiple = function (value, callback) {
        if (!conditions_1.Conditions.isArray(value)) {
            value = [value];
        }
        value.forEach(callback);
    };
    return XArray;
}());
/**
 * Collection of useful extensions to be used on Arrays.
 */
var ArrayExtensions;
(function (ArrayExtensions) {
    Object.setPrototypeOf(Array.prototype, new XArray());
})(ArrayExtensions = exports.ArrayExtensions || (exports.ArrayExtensions = {}));
