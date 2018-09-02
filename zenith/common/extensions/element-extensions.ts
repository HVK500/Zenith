import { Util } from '../util';

/**
 *
 *
 * @export
 * @class ElementExtensions
 */
export class ElementExtensions {

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} name
   * @returns {string}
   */
  static getAttribute(element: Element, name: string): string {
    return element.getAttribute(name);
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} name
   * @param {string} value
   */
  static setAttribute(element: Element, name: string, value: string): void {
    element.setAttribute(name, value);
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} name
   */
  static removeAttribute(element: Element, name: string): void {
    element.removeAttribute(name);
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} content
   * @param {boolean} [overwrite=false]
   */
  static append(element: Element, content: Node): void {
    // if (overwrite || Conditions.isString(element)) {
    //   element.innerHTML = `${element.innerHTML}${content}`;
    //   return;
    // }
    element.appendChild(content);
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {*} beforeElement
   * @param {string} content
   * @param {boolean} [overwrite=false]
   */
  static prepend(element: Element, content: Node, beforeElement?: Node): void {
    // if (overwrite || Conditions.isString(element)) {
    //   element.innerHTML = `${content}${element.innerHTML}`;
    //   return;
    // }

    // TODO: Allow a slector to be passed in for the beforeElement
    element.insertBefore(content, (beforeElement || element.firstChild || null));
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} selector
   */
  static only(element: Element, selector: string): void {
    Util.each<Node>(<any>element.querySelectorAll(selector), (node: Node): void => {
      element.removeChild(node);
    });
  }

}
