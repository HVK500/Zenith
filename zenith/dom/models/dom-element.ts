import { Conditions } from '../../common/conditions';
import { ElementExtensions } from '../../common/extensions/element-extensions';
import { Events } from '../events';
import { Styling, ReplacementClass } from '../styling';

/**
 *
 *
 * @export
 * @class DomElement
 */
export class DomElement {

  /**
   *
   *
   * @type {string}
   */
  selector: string;

  /**
   *
   *
   * @type {HTMLElement}
   */
  element: HTMLElement;

  /**
   *
   *
   * @type {string}
   */
  get id(): string {
    return this.element.id;
  }

  set id(identifier: string) {
    this.element.id = identifier;
  }

  /**
   *
   *
   * @type {string}
   */
  get inner(): string {
    return this.element.innerHTML;
  }

  set inner(content: string) {
    this.element.innerHTML = content;
  }

  /**
   *
   *
   * @type {string}
   */
  get text(): string {
    return this.element.innerText;
  }

  set text(content: string) {
    this.element.innerText = content;
  }

  /**
   *
   *
   * @type {string}
   */
  get inputText(): string {
    // 'HTMLInputElement' here counts for any controls that contain the value property
    return (<HTMLInputElement>this.element).value || null;
  }

  set inputText(content: string) {
    if ((<HTMLInputElement>this.element).value) {
      // 'HTMLInputElement' here counts for any controls that contain the value property
      (<HTMLInputElement>this.element).value = content;
    }
  }

  /**
   * Creates an instance of a DomElement.
   *
   * @param {string} selector
   */
  constructor(selector: string) {
    this.selector = Conditions.isNullOrEmpty(selector) ? null : selector;
    this.element = null;

    // Check whether the selector is a tag, if so create a new element
    if (!Conditions.beginsWith(selector, '<')) {
      this.element = document.querySelector(this.selector);

      if (Conditions.isNullOrEmpty(this.element)) {
        throw 'Invalid Selector / Node';
      }
    } else {
      const matches = this.selector.match(/<([\w-]*)>/);

      if (Conditions.isNullOrEmpty(matches) || !matches[1]) {
        throw 'Invalid Selector / Node';
      }

      this.element = document.createElement(matches[1]);
    }

    return this;
  }

  /**
   *
   *
   * @param {string} name
   * @returns {string}
   */
  getAttribute(name: string): string {
    return ElementExtensions.getAttribute(this.element, name);
  }

  /**
   *
   *
   * @param {string} name
   * @param {string} value
   * @returns {this}
   */
  setAttribute(name: string, value: string): this {
    ElementExtensions.setAttribute(this.element, name, value);
    return this;
  }

  /**
   *
   *
   * @param {string} name
   * @returns {this}
   */
  removeAttribute(name: string): this {
    ElementExtensions.removeAttribute(this.element, name);
    return this;
  }

  /**
   *
   *
   * @param {Node} content
   * @returns {this}
   */
  append(content: Node): this {
    ElementExtensions.append(this.element, content);
    return this;
  }

  /**
   *
   *
   * @param {Node} content
   * @param {Node} [beforeElement]
   * @returns {this}
   */
  prepend(content: Node, beforeElement?: Node): this {
    ElementExtensions.prepend(this.element, content, (beforeElement || this.element.firstChild));
    return this;
  }

  /**
   *
   *
   * @returns {string}
   */
  toString(): string {
    return this.element.outerHTML;
  }

  /**
   *
   *
   * @param {string} selector
   * @returns {this}
   */
  only(selector: string): this {
    ElementExtensions.only(this.element, selector);
    return this;
  }

  /**
   *
   *
   * @param {string} eventType
   * @param {EventListenerOrEventListenerObject} handler
   * @param {(boolean | AddEventListenerOptions)} [options]
   * @returns {this}
   */
  once(eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this {
    Events.once(this.element, eventType, handler, options);
    return this;
  }

  /**
   *
   *
   * @param {string} eventType
   * @param {EventListenerOrEventListenerObject} handler
   * @param {(boolean | AddEventListenerOptions)} [options]
   * @returns {this}
   */
  on(eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this {
    Events.on(this.element, eventType, handler, options);
    return this;
  }

  /**
   *
   *
   * @param {string} eventType
   * @param {EventListenerOrEventListenerObject} handler
   * @param {(boolean | AddEventListenerOptions)} [options]
   * @returns {this}
   */
  off(eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this {
    Events.off(this.element, eventType, handler, options);
    return this;
  }

  /**
   *
   *
   * @param {{ [ styleName: string ]: string }} styles
   * @returns {this}
   */
  css(styles: { [ styleName: string ]: string }): this {
    Styling.css(this.element, styles);
    return this;
  }

  /**
   *
   *
   * @param {string} classNames
   * @returns {boolean}
   */
  hasClass(classNames: string): boolean {
    return Styling.hasClass(this.element, classNames);
  }

  /**
   *
   *
   * @param {(string | string[])} className
   * @returns {this}
   */
  addClass(className: string | string[]): this {
    Styling.addClass(this.element, className);
    return this;
  }

  /**
   *
   *
   * @param {(string | string[])} classNames
   * @returns {this}
   */
  removeClass(classNames: string | string[]): this {
    Styling.removeClass(this.element, classNames);
    return this;
  }

  /**
   *
   *
   * @param {(ReplacementClass | ReplacementClass[])} classNames
   * @returns {this}
   */
  replaceClass(classNames: ReplacementClass | ReplacementClass[]): this {
    Styling.replaceClass(this.element, classNames);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  show(): this {
    Styling.show(this.element);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  hide(): this {
    Styling.hide(this.element);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  fadeIn(): this {
    Styling.fadeIn(this.element);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  fadeOut(): this {
    Styling.fadeOut(this.element);
    return this;
  }

}
