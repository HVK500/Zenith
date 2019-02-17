/// <reference path="extensions/string-extensions.d.ts" />
import '../common/extensions/string-extensions';
/**
 * Represents a mutable string of characters.
 *
 * @export
 * @class StringBuilder
 */
export declare class StringBuilder {
    /**
     * The container string for the whole StringBuilder instance.
     *
     * @private
     * @type {string}
     */
    private base;
    /**
     * Gets the length of the current StringBuilder base string.
     *
     * @readonly
     */
    readonly length: number;
    /**
     * Creates an instance of a StringBuilder.
     * @param {string} [base]
     */
    constructor(base?: string);
    /**
     * Checks whether the given value is contained within the StringBuilder instance.
     *
     * @param {string | RegExp} value The value checked against the StringBuilder instance.
     * @returns {boolean} Whether or not the given value is contained in the StringBuilder instance.
     */
    contains(value: string | RegExp): boolean;
    /**
     * Append a given value to the start of the StringBuilder instance.
     *
     * @param {string} value The value to be added to the start.
     * @returns {this} The StringBuilder instance.
     */
    prepend(value: string): this;
    /**
     * Append a given value to the end of the StringBuilder instance.
     *
     * @param {string} value The value to added to the end.
     * @returns {this} The StringBuilder instance.
     */
    append(value: string): this;
    /**
     * Appends the break in text to the end of the StringBuilder instance.
     *
     * @param {string} value The value to be added to the start.
     * @returns {this} The StringBuilder instance.
     */
    appendBreak(): this;
    /**
     * Appends the default line terminator to the end of the StringBuilder instance.
     *
     * @param {string} value The value to be added to the start.
     * @returns {this} The StringBuilder instance.
     */
    appendLine(value: string): this;
    /**
     * Removes the specified range of characters from this instance.
     *
     * @param {string | RegExp} value The value to be removed.
     * @returns {this} The StringBuilder instance.
     */
    remove(value: string | RegExp): this;
    /**
     * Replaces all occurrences of a specified character or string in this instance with another specified character or string.
     *
     * @param {string} value The value to be replaced.
     * @param {string | RegExp} replacement The replacement value.
     * @returns {this} The StringBuilder instance.
     */
    replace(value: string | RegExp, replacement: string): this;
    /**
     * Removes all characters from the current StringBuilder instance.
     *
     * @returns {this} The StringBuilder instance.
     */
    clear(): this;
    /**
     * Converts the value of a StringBuilder to a String.
     *
     * @param {boolean} [trim=false] Whether or not to apply a trim to the result.
     * @returns {string} The resulting StringBuilder instance's string.
     */
    toString(trim?: boolean): string;
}
