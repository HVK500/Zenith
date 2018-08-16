import { StringBuilder } from '../common/string-builder';
import { Util } from '../common/util';

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
   * @private
   * @static
   * @param {HTMLElement} element
   * @param {(string | string[])} className
   * @param {(classBuilder: StringBuilder) => (name: string) => void} processor
   */
  private static processClassName(element: HTMLElement, className: string | string[], processor: (classBuilder: StringBuilder) => (name: string) => void): void {
    const classBuilder = new StringBuilder(element.className);
    const classNames = Util.convertSingleToCollection(className);

    Util.each(classNames, processor(classBuilder));

    element.className = classBuilder.toString(true);
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @param {{ [styleName: string]: string }} styles
   */
  static css(element: HTMLElement, styles: { [styleName: string]: string }): void {
    Util.each(styles, (key: string, value: string) => {
      element.style[key] = value;
    });
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @param {string} className
   * @returns {boolean}
   */
  static hasClass(element: HTMLElement, className: string): boolean {
    return new RegExp(` ${className} `).test(` ${element.className} `);
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @param {(string | string[])} className
   */
  static addClass(element: HTMLElement, className: string | string[]): void {
    Styling.processClassName(element, className, (classBuilder) => {
      return (name) => {
        if (Styling.hasClass(element, name)) return;
        classBuilder.append(` ${name}`);
      };
    });
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @param {(string | string[])} className
   */
  static removeClass(element: HTMLElement, className: string | string[]): void {
    Styling.processClassName(element, className, (classBuilder) => {
      return (name) => {
        if (!Styling.hasClass(element, name)) return;
        classBuilder.remove(new RegExp(`\\s{0,1}${name}`));
      };
    });
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @returns {void}
   */
  static show(element: HTMLElement): void {
    return Styling.css(element, { display: '' });
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @returns {void}
   */
  static hide(element: HTMLElement): void {
    return Styling.css(element, { display: 'none' });
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   */
  static fadeIn(element: HTMLElement): void {
    // TODO: needs css()
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   */
  static fadeOut(element: HTMLElement): void {
    // TODO: needs css()
  }

}
