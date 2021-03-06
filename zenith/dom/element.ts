import { DomElement } from './models/dom-element';

export class Element {
  public static create(tagName: string): DomElement {
    return new DomElement(`<${tagName}>`);
  }

  public static fetch(selector: string): DomElement {
    return new DomElement(selector);
  }

  public static fetchAll(selector: string): NodeList {
    return document.querySelectorAll(selector);
  }
}
