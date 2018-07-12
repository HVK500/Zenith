import { Conditions } from '../Common/Conditions';
import { StringExtensions } from '../Common/Extensions/StringExtensions';
import { Util } from '../Common/Util';

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
   */
  static css(element: any, styles: { [styleName: string]: string }): void {
    Util.each(styles, (key: string, value: string) => {
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
   */
  static removeClass(element: any, className: string | string[]): void {
    let result = element.className;
    let collection = [];

    if (Conditions.isString(className)) {
      collection.push(className);
    } else {
      collection = <string[]>className;
    }

    Util.each(collection, (item) => {
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
   */
  static show(element: any): void {
    return Styling.css(element, { display: '' });
  }

  /**
   *
   *
   * @static
   * @param {*} element
   */
  static hide(element: any): void {
    return Styling.css(element, { display: 'none' });
  }

  static fadeIn(element: any): void {
    // TODO: needs css()
  }

  static fadeOut(element: any): void {
    // TODO: needs css()
  }

}
