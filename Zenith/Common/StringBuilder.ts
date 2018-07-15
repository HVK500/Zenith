import { StringExtensions } from './Extensions/StringExtensions';

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
   * @param {string} value The value checked against the StringBuilder instance.
   * @returns {boolean} Whether or not the given value is contained in the StringBuilder instance.
   */
  contains(value: string): boolean {
    return StringExtensions.contains(this.base, value);
  }

  /**
   * Append a given value to the start of the StringBuilder instance.
   *
   * @param {string} value The value to be added to the start.
   * @returns {this} This StringBuilder instance.
   */
  prepend(value: string): this {
    this.base = value + this.base;
    return this;
  }

  /**
   * Append a given value to the end of the StringBuilder instance.
   *
   * @param {string} value The value to added to the end.
   * @returns {this} This StringBuilder instance.
   */
  append(value: string): this {
    this.base += value;
    return this;
  }

  /**
   * Appends the default line terminator to the end of the StringBuilder instance.
   *
   * @param {string} [value] The value to be added to the start.
   * @returns {this} This StringBuilder instance.
   */
  appendLine(value?: string): this {
    value && this.append(value);

    // Add new line
    this.append('\r\n');

    return this;
  }

  /**
   * Removes the specified range of characters from this instance.
   *
   * @param {string} value The value to be removed.
   * @returns {this} This StringBuilder instance.
   */
  remove(value: string): this {
    return this.replace(value, '');
  }

  /**
   * Replaces all occurrences of a specified character or string in this instance with another specified character or string.
   *
   * @param {string} value The value to be replaced.
   * @param {string} replacement The replacement value.
   * @returns {this} This StringBuilder instance.
   */
  replace(value: string, replacement: string): this {
    this.base = StringExtensions.replace(this.base, value, replacement);
    return this;
  }

  /**
   * Removes all characters from the current StringBuilder instance.
   *
   * @returns {this} This StringBuilder instance.
   */
  clear(): this {
    this.base = '';
    return this;
  }

  /**
   * Converts the value of a StringBuilder to a String.
   *
   * @returns {string}
   */
  toString(): string {
    return this.base;
  }

}
