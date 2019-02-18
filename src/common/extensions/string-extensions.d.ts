declare interface String {

  /**
   *
   *
   * @param {string} value
   * @returns {string}
   */
  append(value: string): string;

  /**
   *
   *
   * @returns {string}
   */
  camelCase(): string;

  /**
   *
   *
   * @returns {string}
   */
  capitalize(): string;

  /**
   *
   *
   * @returns {string}
   */
  caseSwap(): string;

  /**
   *
   *
   * @param {string} value
   * @param {number} length
   * @returns {string[]}
   */
  chop(value: string, length: number): string[];

  /**
   *
   *
   * @param {(string | RegExp)} value
   * @returns {boolean}
   */
  contains(value: string | RegExp): boolean;

  /**
   *
   *
   * @returns {string}
   */
  dasherize(): string;

  /**
   *
   *
   * @returns {string}
   */
  escapeRegExp(): string;

  /**
   *
   *
   * @param {boolean} [all]
   * @returns {number}
   */
  extractNumber(all?: boolean): number;

  /**
   *
   *
   * @returns {boolean}
   */
  isEmpty(): boolean;

  /**
   *
   *
   * @param {number} [length]
   * @param {boolean} [right]
   * @returns {string}
   */
  padZero(length?: number, right?: boolean): string;

  /**
   *
   *
   * @param {string} value
   * @returns {string}
   */
  prepend(value: string): string;

  /**
   *
   *
   * @returns {string}
   */
  quote(): string;

  /**
   *
   *
   * @param {(string | RegExp)} search
   * @returns {string}
   */
  remove(search: string | RegExp): string;

  /**
   *
   *
   * @returns {string}
   */
  reverse(): string;

  /**
   *
   *
   * @returns {string}
   */
  titleize(): string;

  /**
   *
   *
   * @returns {string[]}
   */
  toArray(): string[];

  /**
   *
   *
   * @returns {number}
   */
  toNumber(): number;

  /**
   *
   *
   * @returns {string[]}
   */
  words(): string[];

  /**
   *
   *
   * @param {(string | { l?: string, r?: string })} wrapper
   * @returns {string}
   */
  wrap(wrapper: string | { l?: string, r?: string }): string;
}