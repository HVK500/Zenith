import { DomElement } from './models/dom-element';

export class Element {
  public static create(tagName: string): DomElement {
    return new DomElement(`<${tagName}>`);
  }

  public static fetch(selector: string): DomElement {
    return new DomElement(selector);
  }
  // Create combination of common controls like a div table http://divtable.com/generator/
  // and more
}
