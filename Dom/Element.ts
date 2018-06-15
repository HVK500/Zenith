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
   * @memberof Element
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
   * @memberof Element
   */
  static get(selector: string): DomElement {
    return new DomElement(selector);
  }

  // Create combination of common controls like a div table http://divtable.com/generator/
  // and more

}
