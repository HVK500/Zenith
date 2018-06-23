import { Conditions } from '../../Common/Conditions';
import { ElementExtensions } from '../../Common/Extensions/ElementExtensions';
import { Events } from '../../Dom/Events';
import { Styling } from '../../Dom/Styling';

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
  get html(): string {
    return this.element.innerHTML;
  }

  set html(content: string) {
    this.element.innerHTML = content;
  }

  // get text(): string {
  // 	return this.element.textContent;
  // }

  // set text(content: string) {
  // 	this.element.innerHTML = content;
  // }

  /**
   *
   *
   * @type {string}
   */
  get val(): string {
    // 'HTMLInputElement' here counts for any controls that contain the value property
    return (<HTMLInputElement>this.element).value || null;
  }

  set val(content: string) {
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
    if (Conditions.beginsWith(selector, '<')) {
      const matches = this.selector.match(/<([\w-]*)>/);

      if (Conditions.isNullOrEmpty(matches) || !matches[1]) {
        throw 'Invalid Selector / Node';
      }

      // const nodeName = matches[0].replace(/\<|\>/g, '');
      this.element = document.createElement(matches[1]);
    } else {
      this.element = document.querySelector(this.selector);
    }
  }

  // https://schier.co/blog/2013/11/14/method-chaining-in-javascript.html

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
   * @param {string} content
   * @returns {this}
   */
  append(content: string): this {
    ElementExtensions.append(this.element, content);
    return this;
  }

  /**
   *
   *
   * @param {string} content
   * @returns {this}
   */
  prepend(content: string, beforeElement?: any): this {
    ElementExtensions.prepend(this.element, content, (beforeElement || this.element.firstChild));
    return this;
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
   * @param {*} styles
   * @returns {this}
   */
  css(styles: any): this {
    Styling.css(this.element, styles);
    return this;
  }

  /**
   *
   *
   * @param {string} className
   * @returns {boolean}
   */
  hasClass(className: string): boolean {
    return Styling.hasClass(this.element, className);
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
   * @param {(string | string[])} className
   * @returns {this}
   */
  removeClass(className: string | string[]): this {
    Styling.removeClass(this.element, className);
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