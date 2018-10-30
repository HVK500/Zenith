import { Conditions } from '../../../common/conditions';

/**
 *
 *
 * @export
 * @class CookieModel
 */
export class CookieModel {

  /**
   *
   *
   * @type {string}
   */
  public expiry: string;

  /**
   *
   *
   * @type {string}
   */
  public name: string;

  /**
   *
   *
   * @type {string}
   */
  public path: string;

  /**
   *
   *
   * @type {string}
   */
  public raw: string;

  /**
   *
   *
   * @type {string}
   */
  public value: string;

  /**
   * Creates a CookieModel instance.
   *
   * @param {string} name
   * @param {string} value
   * @param {(Date | number | string)} [expiry]
   * @param {string} [path]
   */
  constructor(name: string, value: string, expiry?: Date | number | string, path?: string) {
    this.name = name;
    this.value = value;

    let expiryDate = null;
    let expiryString = '';
    if (!Conditions.isNullOrEmpty(expiry) && Conditions.isNumber(expiry)) {
      expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + (expiry * 24 * 60 * 60 * 1000));
    } else if (Conditions.isString(expiry)) {
      expiryString = expiry;
    } else { // Otherwise this is a date already
      expiryDate = expiry;
    }

    this.expiry = !!expiryDate ? expiryDate.toUTCString() : expiryString;
    this.path = path || '';

    this.raw = `${this.name}=${this.value}; `;

    if (!!this.expiry) this.raw = `${this.raw}expires=${this.expiry}; `;
    if (!!this.path) this.raw = `${this.raw}path=${this.path}; `;
  }
}
