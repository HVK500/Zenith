import { ReplacementClass } from '../styling-internals';
/**
 *
 *
 * @export
 * @class DomElement
 */
export declare class DomElement {
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
    selector: string;
    /**
     * Creates an instance of a DomElement.
     *
     * @param {string} selector
     */
    constructor(selector: string);
    /**
     *
     *
     * @type {string}
     */
    id: string;
    setId(identifier: string): this;
    /**
     *
     *
     * @type {string}
     */
    inner: string;
    setInner(content: string): this;
    /**
     *
     *
     * @type {string}
     */
    text: string;
    setText(content: string): this;
    /**
     *
     *
     * @param {(string | string[])} className
     * @returns {this}
     */
    addClass(className: string | string[]): this;
    /**
     *
     *
     * @param {Node} content
     * @returns {this}
     */
    append(content: Node): this;
    /**
     *
     *
     * @param {{ [ styleName: string ]: string }} styles
     * @returns {this}
     */
    css(styles: {
        [styleName: string]: string;
    }): this;
    /**
     *
     *
     * @param {boolean} [value=null]
     * @returns {this}
     */
    disable(value?: boolean): this;
    /**
     *
     *
     * @returns {this}
     */
    fadeIn(): this;
    /**
     *
     *
     * @returns {this}
     */
    fadeOut(): this;
    /**
     *
     *
     * @param {string} name
     * @returns {string}
     */
    getAttribute(name: string): string;
    /**
     *
     *
     * @param {string} classNames
     * @returns {boolean}
     */
    hasClass(classNames: string): boolean;
    /**
     *
     *
     * @returns {this}
     */
    hide(): this;
    /**
     *
     *
     * @param {string} eventType
     * @param {EventListenerOrEventListenerObject} handler
     * @param {(boolean | AddEventListenerOptions)} [options]
     * @returns {this}
     */
    off(eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this;
    /**
     *
     *
     * @param {string} eventType
     * @param {EventListenerOrEventListenerObject} handler
     * @param {(boolean | AddEventListenerOptions)} [options]
     * @returns {this}
     */
    on(eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this;
    /**
     *
     *
     * @param {string} eventType
     * @param {EventListenerOrEventListenerObject} handler
     * @param {(boolean | AddEventListenerOptions)} [options]
     * @returns {this}
     */
    once(eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this;
    /**
     *
     *
     * @param {string} selector
     * @returns {this}
     */
    only(selector: string): this;
    /**
     *
     *
     * @param {Node} content
     * @param {Node} [beforeElement]
     * @returns {this}
     */
    prepend(content: Node, beforeElement?: Node): this;
    /**
     *
     *
     * @param {string} name
     * @returns {this}
     */
    removeAttribute(name: string): this;
    /**
     *
     *
     * @param {(string | string[])} classNames
     * @returns {this}
     */
    toggleClass(classNames: string | string[]): this;
    /**
     *
     *
     * @param {(string | string[])} classNames
     * @returns {this}
     */
    removeClass(classNames: string | string[]): this;
    /**
     *
     *
     * @param {(ReplacementClass | ReplacementClass[])} classNames
     * @returns {this}
     */
    replaceClass(classNames: ReplacementClass | ReplacementClass[]): this;
    /**
     *
     *
     * @param {string} name
     * @param {string} value
     * @returns {this}
     */
    setAttribute(name: string, value: string): this;
    /**
     *
     *
     * @returns {this}
     */
    show(): this;
    /**
     *
     *
     * @returns {string}
     */
    toString(): string;
}
