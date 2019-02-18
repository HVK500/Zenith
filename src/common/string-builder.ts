/// <reference path="../common/extensions/string-extensions.d.ts" />
import '../common/extensions/string-extensions';

/**
 * Represents a mutable string of characters.
 *
 * @export
 * @class StringBuilder
 */
export class StringBuilder {

  /**
   * The container string for the whole StringBuilder instance.
   *
   * @private
   * @type {string}
   */
  private base: string;

  /**
   * Gets the length of the current StringBuilder base string.
   *
   * @readonly
   */
  get length() {
    return this.base.length;
  }

  /**
   * Creates an instance of a StringBuilder.
   * @param {string} [base]
   */
  constructor(base?: string) {
    this.base = base == null ? '' : base;
  }

  /**
   * Checks whether the given value is contained within the StringBuilder instance.
   *
   * @param {string | RegExp} value The value checked against the StringBuilder instance.
   * @returns {boolean} Whether or not the given value is contained in the StringBuilder instance.
   */
  contains(value: string | RegExp): boolean {
    return this.base.contains(value);
  }

  /**
   * Append a given value to the start of the StringBuilder instance.
   *
   * @param {string} value The value to be added to the start.
   * @returns {this} The StringBuilder instance.
   */
  prepend(value: string): this {
    this.base = this.base.prepend(value);
    return this;
  }

  /**
   * Append a given value to the end of the StringBuilder instance.
   *
   * @param {string} value The value to added to the end.
   * @returns {this} The StringBuilder instance.
   */
  append(value: string): this {
    this.base = this.base.append(value);
    return this;
  }

  /**
   * Appends the break in text to the end of the StringBuilder instance.
   *
   * @param {string} value The value to be added to the start.
   * @returns {this} The StringBuilder instance.
   */
  appendBreak(): this {
    this.append('<br>');

    return this;
  }

  /**
   * Appends the default line terminator to the end of the StringBuilder instance.
   *
   * @param {string} value The value to be added to the start.
   * @returns {this} The StringBuilder instance.
   */
  appendLine(value: string): this {
    if (!this.base.isEmpty()) value = value.prepend('\r\n');
    this.append(value);

    return this;
  }

  /**
   * Removes the specified range of characters from this instance.
   *
   * @param {string | RegExp} value The value to be removed.
   * @returns {this} The StringBuilder instance.
   */
  remove(value: string | RegExp): this {
    this.base = this.base.remove(value);
    return this;
  }

  /**
   * Replaces all occurrences of a specified character or string in this instance with another specified character or string.
   *
   * @param {string} value The value to be replaced.
   * @param {string | RegExp} replacement The replacement value.
   * @returns {this} The StringBuilder instance.
   */
  replace(value: string | RegExp, replacement: string): this {
    this.base = this.base.replace(value, replacement);
    return this;
  }

  /**
   * Removes all characters from the current StringBuilder instance.
   *
   * @returns {this} The StringBuilder instance.
   */
  clear(): this {
    this.base = '';
    return this;
  }

  /**
   * Converts the value of a StringBuilder to a String.
   *
   * @param {boolean} [trim=false] Whether or not to apply a trim to the result.
   * @returns {string} The resulting StringBuilder instance's string.
   */
  toString(trim: boolean = false): string {
    return trim ? this.base.trim() : this.base;
  }

}
