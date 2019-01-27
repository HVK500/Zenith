import { Conditions } from '../../common/conditions';
import { ElementExtensions } from '../../common/extensions/element-extensions';
import { Events } from '../events';
import { Styling } from '../styling';
import { ReplacementClass } from '../styling-internals';

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
   * @type {HTMLElement}
   */
  public element: HTMLElement;

  /**
   *
   *
   * @type {string}
   */
  public selector: string;

  /**
   * Creates an instance of a DomElement.
   *
   * @param {string} selector
   */
  constructor(selector: string) {
    this.selector = Conditions.getValueOrDefault(selector, null);
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
   * @type {string}
   */
  get id(): string {
    return this.element.id;
  }

  set id(identifier: string) {
    this.element.id = identifier;
  }

  public setId(identifier: string): this {
    this.id = identifier;
    return this;
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

  public setInner(content: string): this {
    this.inner = content;
    return this;
  }

  // /**
  //  *
  //  *
  //  * @type {string}
  //  */
  // get inputText(): string {
  //   // 'HTMLInputElement' here counts for any controls that contain the value property
  //   return (<HTMLInputElement>this.element).value || null;
  // }

  // set inputText(content: string) {
  //   if ((<HTMLInputElement>this.element).value) {
  //     // 'HTMLInputElement' here counts for any controls that contain the value property
  //     (<HTMLInputElement>this.element).value = content;
  //   }
  // }

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

  public setText(content: string): this {
    this.text = content;
    return this;
  }

  /**
   *
   *
   * @param {(string | string[])} className
   * @returns {this}
   */
  public addClass(className: string | string[]): this {
    Styling.addClass(this.element, className);
    return this;
  }

  /**
   *
   *
   * @param {Node} content
   * @returns {this}
   */
  public append(content: Node): this {
    ElementExtensions.append(this.element, content);
    return this;
  }

  /**
   *
   *
   * @param {{ [ styleName: string ]: string }} styles
   * @returns {this}
   */
  public css(styles: { [ styleName: string ]: string }): this {
    Styling.css(this.element, styles);
    return this;
  }

  /**
   *
   *
   * @param {boolean} [value=null]
   * @returns {this}
   */
  public disable(value: boolean = null): this {
    // if left as null it will toggle
    if (value === null) {
      value = Conditions.isString(this.getAttribute('disabled'));
    }

    // if given a boolean value it will respect that
    Conditions.if(value,
      () => this.setAttribute('disabled', ''),
      () => this.removeAttribute('disabled')
    );

    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  public fadeIn(): this {
    Styling.fadeIn(this.element);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  public fadeOut(): this {
    Styling.fadeOut(this.element);
    return this;
  }

  /**
   *
   *
   * @param {string} name
   * @returns {string}
   */
  public getAttribute(name: string): string {
    return ElementExtensions.getAttribute(this.element, name);
  }

  /**
   *
   *
   * @param {string} classNames
   * @returns {boolean}
   */
  public hasClass(classNames: string): boolean {
    return Styling.hasClass(this.element, classNames);
  }

  /**
   *
   *
   * @returns {this}
   */
  public hide(): this {
    Styling.hide(this.element);
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
  public off(eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this {
    Events.off(this.element, eventType, handler, options);
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
  public on(eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this {
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
  public once(eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this {
    Events.once(this.element, eventType, handler, options);
    return this;
  }

  /**
   *
   *
   * @param {string} selector
   * @returns {this}
   */
  public only(selector: string): this {
    ElementExtensions.only(this.element, selector);
    return this;
  }

  /**
   *
   *
   * @param {Node} content
   * @param {Node} [beforeElement]
   * @returns {this}
   */
  public prepend(content: Node, beforeElement?: Node): this {
    ElementExtensions.prepend(this.element, content, (beforeElement || this.element.firstChild));
    return this;
  }

  /**
   *
   *
   * @param {string} name
   * @returns {this}
   */
  public removeAttribute(name: string): this {
    ElementExtensions.removeAttribute(this.element, name);
    return this;
  }

  /**
   *
   *
   * @param {(string | string[])} classNames
   * @returns {this}
   */
  public toggleClass(classNames: string | string[]): this {
    Styling.toggleClass(this.element, classNames);
    return this;
  }

  /**
   *
   *
   * @param {(string | string[])} classNames
   * @returns {this}
   */
  public removeClass(classNames: string | string[]): this {
    Styling.removeClass(this.element, classNames);
    return this;
  }

  /**
   *
   *
   * @param {(ReplacementClass | ReplacementClass[])} classNames
   * @returns {this}
   */
  public replaceClass(classNames: ReplacementClass | ReplacementClass[]): this {
    Styling.replaceClass(this.element, classNames);
    return this;
  }

  /**
   *
   *
   * @param {string} name
   * @param {string} value
   * @returns {this}
   */
  public setAttribute(name: string, value: string): this {
    ElementExtensions.setAttribute(this.element, name, value);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  public show(): this {
    Styling.show(this.element);
    return this;
  }

  /**
   *
   *
   * @returns {string}
   */
  public toString(): string {
    return this.element.outerHTML;
  }
}
