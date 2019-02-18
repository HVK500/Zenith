"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../common/extensions/string-extensions.d.ts" />
require("common/extensions/string-extensions");
/**
 * Represents a mutable string of characters.
 *
 * @export
 * @class StringBuilder
 */
var StringBuilder = /** @class */ (function () {
    /**
     * Creates an instance of a StringBuilder.
     * @param {string} [base]
     */
    function StringBuilder(base) {
        this.base = base == null ? '' : base;
    }
    Object.defineProperty(StringBuilder.prototype, "length", {
        /**
         * Gets the length of the current StringBuilder base string.
         *
         * @readonly
         */
        get: function () {
            return this.base.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks whether the given value is contained within the StringBuilder instance.
     *
     * @param {string | RegExp} value The value checked against the StringBuilder instance.
     * @returns {boolean} Whether or not the given value is contained in the StringBuilder instance.
     */
    StringBuilder.prototype.contains = function (value) {
        return this.base.contains(value);
    };
    /**
     * Append a given value to the start of the StringBuilder instance.
     *
     * @param {string} value The value to be added to the start.
     * @returns {this} The StringBuilder instance.
     */
    StringBuilder.prototype.prepend = function (value) {
        this.base = this.base.prepend(value);
        return this;
    };
    /**
     * Append a given value to the end of the StringBuilder instance.
     *
     * @param {string} value The value to added to the end.
     * @returns {this} The StringBuilder instance.
     */
    StringBuilder.prototype.append = function (value) {
        this.base = this.base.append(value);
        return this;
    };
    /**
     * Appends the break in text to the end of the StringBuilder instance.
     *
     * @param {string} value The value to be added to the start.
     * @returns {this} The StringBuilder instance.
     */
    StringBuilder.prototype.appendBreak = function () {
        this.append('<br>');
        return this;
    };
    /**
     * Appends the default line terminator to the end of the StringBuilder instance.
     *
     * @param {string} value The value to be added to the start.
     * @returns {this} The StringBuilder instance.
     */
    StringBuilder.prototype.appendLine = function (value) {
        if (!this.base.isEmpty())
            value = value.prepend('\r\n');
        this.append(value);
        return this;
    };
    /**
     * Removes the specified range of characters from this instance.
     *
     * @param {string | RegExp} value The value to be removed.
     * @returns {this} The StringBuilder instance.
     */
    StringBuilder.prototype.remove = function (value) {
        this.base = this.base.remove(value);
        return this;
    };
    /**
     * Replaces all occurrences of a specified character or string in this instance with another specified character or string.
     *
     * @param {string} value The value to be replaced.
     * @param {string | RegExp} replacement The replacement value.
     * @returns {this} The StringBuilder instance.
     */
    StringBuilder.prototype.replace = function (value, replacement) {
        this.base = this.base.replace(value, replacement);
        return this;
    };
    /**
     * Removes all characters from the current StringBuilder instance.
     *
     * @returns {this} The StringBuilder instance.
     */
    StringBuilder.prototype.clear = function () {
        this.base = '';
        return this;
    };
    /**
     * Converts the value of a StringBuilder to a String.
     *
     * @param {boolean} [trim=false] Whether or not to apply a trim to the result.
     * @returns {string} The resulting StringBuilder instance's string.
     */
    StringBuilder.prototype.toString = function (trim) {
        if (trim === void 0) { trim = false; }
        return trim ? this.base.trim() : this.base;
    };
    return StringBuilder;
}());
exports.StringBuilder = StringBuilder;
