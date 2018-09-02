import { Util } from '../common/util';

export interface ReplacementClass { // TODO: Shift this out
  oldClass: string;
  newClass: string;
}

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
   * @param {(string | string[])} classNames
   * @param {(name: string) => void} callback
   */
  private static processClassName<T>(classNames: T | T[], callback: (item: T) => void): void {
    Util.each(Util.convertSingleToCollection(classNames), (item: T): void => callback(item));
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @param {{ [styleName: string]: string }} styles
   */
  static css(element: HTMLElement, styles: { [styleName: string]: string }): void {
    Util.each(styles, (value: string, key: string): void => {
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
    return element.classList.contains(className);
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @param {(string | string[])} classNames
   */
  static addClass(element: HTMLElement, classNames: string | string[]): void {
    Styling.processClassName<string>(classNames, (name: string): void => {
      if (Styling.hasClass(element, name)) return;
      element.classList.add(name);
    });
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @param {(string | string[])} classNames
   */
  static removeClass(element: HTMLElement, classNames: string | string[]): void {
    Styling.processClassName<string>(classNames, (name: string): void => {
      if (Styling.hasClass(element, name)) return;
      element.classList.remove(name);
    });
  }

  /**
   *
   *
   * @static
   * @param {HTMLElement} element
   * @param {(string | string[])} classNames
   */
  static replaceClass(element: HTMLElement, classNames: ReplacementClass | ReplacementClass[]): void {
    Styling.processClassName<ReplacementClass>(classNames, (replacement: ReplacementClass): void => {
      if (Styling.hasClass(element, replacement.oldClass)) return;
      element.classList.replace(replacement.oldClass, replacement.newClass);
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
