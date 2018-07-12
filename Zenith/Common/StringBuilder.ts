/**
 *
 *
 * @export
 * @class StringBuilder
 */
export class StringBuilder {

  /**
   *
   *
   * @private
   * @type {string}
   */
  private base: string;

  /**
   *
   *
   * @readonly
   */
  get result() {
    return this.base;
  }

  /**
   * Creates an instance of a StringBuilder.
   * @param {string} [base]
   */
  constructor(base?: string) {
    this.base = base == null ? '' : base;
  }

  /**
   *
   *
   * @param {string} value
   * @returns {this}
   */
  add(value: string): this {
    this.base += value;
    return this;
  }
}
