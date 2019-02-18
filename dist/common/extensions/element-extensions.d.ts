/**
 *
 *
 * @export
 * @class ElementExtensions
 */
export declare class ElementExtensions {
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} name
     * @returns {string}
     */
    static getAttribute(element: Element, name: string): string;
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} name
     * @param {string} value
     */
    static setAttribute(element: Element, name: string, value: string): void;
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} name
     */
    static removeAttribute(element: Element, name: string): void;
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} content
     * @param {boolean} [overwrite=false]
     */
    static append(element: Element, content: Node): void;
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {*} beforeElement
     * @param {string} content
     * @param {boolean} [overwrite=false]
     */
    static prepend(element: Element, content: Node, beforeElement?: Node): void;
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} selector
     */
    static only(element: Element, selector: string): void;
}
