import { DomElement } from '../Dom/Models/DomElement';

/**
 *
 *
 * @export
 * @class Element
 */
export class Element {

  /**
   *
   *
   * @static
   * @param {string} tagName
   * @returns {DomElement}
   */
  static create(tagName: string): DomElement {
    return new DomElement(`<${tagName}>`);
  }

  /**
   *
   *
   * @static
   * @param {string} selector
   * @returns {DomElement}
   */
  static fetch(selector: string): DomElement {
    return new DomElement(selector);
  }

  // Create combination of common controls like a div table http://divtable.com/generator/
  // and more

}
