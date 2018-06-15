import { Common } from '../Common';
import { Conditions } from '../Common/Conditions';
import { StringExtensions } from '../Common/Extensions/StringExtensions';

/**
 *
 *
 * @export
 * @class Styling
 */
export class Styling {

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {{ [styleName: string]: string }} styles
   * @memberOf Styling
   */
  static css(element: any, styles: { [styleName: string]: string }): void {
    Common.each(styles, (key: string, value: string) => {
      element.style[key] = value;
    });
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} className
   * @returns {boolean}
   * @memberof Styling
   */
  static hasClass(element: any, className: string): boolean {
    return new RegExp(` ${className} `).test(` ${element.className} `);
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {(string | string[])} className
   * @memberof Styling
   */
  static addClass(element: any, className: string | string[]): void {
    let collection = [];

    if (Conditions.isString(className)) {
      collection.push(className);
    } else {
      collection = <string[]>className;
    }

    collection.forEach((item) => {
      if (Styling.hasClass(element, item)) return;
      element.className += ` ${item}`;
    });
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {(string | string[])} className
   * @memberof Styling
   */
  static removeClass(element: any, className: string | string[]): void {
    let result = element.className;
    let collection = [];

    if (Conditions.isString(className)) {
      collection.push(className);
    } else {
      collection = <string[]>className;
    }

    Common.each(collection, (item) => {
      if (!Styling.hasClass(element, item)) return;
      result = StringExtensions.replace(element.className, new RegExp(item));
    });

    element.className = result;
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @returns {void}
   * @memberof Styling
   */
  static show(element: any): void {
    return Styling.css(element, { display: '' });
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @returns {void}
   * @memberof Styling
   */
  static hide(element: any): void {
    return Styling.css(element, { display: 'none' });
  }

  /**
   *
   *
   * @static
   * @memberof Styling
   */
  static fadeIn(element: any): void {
    // TODO: needs css()
  }

  /**
   *
   *
   * @static
   * @memberof Styling
   */
  static fadeOut(element: any): void {
    // TODO: needs css()
  }

}
